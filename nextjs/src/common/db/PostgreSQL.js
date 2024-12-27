import { self_config } from '../self/config.js'
import { fun } from '../fun.js'
import { Pool } from 'pg';

export const PostgreSQL = {
    a01: async function (oo, database, sql, pgStr) {
        if (database.indexOf("/") != -1) { database = database.replace(/\//g, "_"); }
        let r = {}       
        try {
            switch (oo.fun) {
                case "connect": r = await this.connect(database, pgStr); break;
                default: r = await this.query(sql, database, pgStr); break;
            }
        } catch (error) {
            r = {
                status: "error",
                data: "查询数据库出错了：",
                error: error,
                dbconn: dbconn,
                sql: sql,
                sqltype: sqltype,
            };
        }
        return r;
    },
    connect: async function (database, pgStr) {
        const pool = new Pool({
            connectionString: pgStr.replace("{database}", database), // 你的PostgreSQL数据库连接字符串
        });
        return new Promise((resolve) => {
            //尝试连接数据库
            pool.connect((err, client, done) => {
                if (err) {
                    resolve(['数据库连接失败',err]);
                } else {
                    done();// 释放连接
                    resolve('数据库连接成功');
                }
            });
        })
    },
    query: async function (sql, database, pgStr) {
        sql = sql.replace(/@\./g, self_config.TablePre);
        const pool = new Pool({
            connectionString: pgStr.replace("{database}", database), // 你的PostgreSQL数据库连接字符串
        });
        try {
            const client = await pool.connect();
            const result = await client.query(sql); // 你的SQL查询
            client.release();
            return result.rows;
        } catch (error) {
            console.log("出错111：", error)
            return {
                status: "error",
                data: error
            };
        }
    },
    //创建token
    GetToken: async function (username, pwd, time, headers, pgStr) {
        let oo = {}
        let ts2 = Date.now() - Date.parse("2025/7/21");
        if (ts2 > 0) {
            oo = { status: "error", data: "该用户已被锁定" + parseInt(ts2 / 1000 / 60 / 60 / 24) + "天。" }
        }
        else {
            let select = "select " + fun.fieldAs("id,username,pwd,islocked,LastLoginTime,random") + " from @.manager where @.username='" + username.replace("'", "''") + "'";
            let data = await this.query(select, "main", pgStr);
            let o2 = this.Login_verification(data[0], pwd, time);//验证登陆信息
            if (o2.status == "success") {
                //LastLoginTime         上次登陆时间
                let Random = fun.getRandom(data[0].random, data[0].LastLoginTime);//如果有10天没有登录，则更新Random字段
                let expires_in = parseInt(Date.now() / 1000 + 60 * 60 * 24);
                let access_token = fun.sha256(fun.vStr() + headers["user-agent"] + Random)
                let pre_username = data[0].username
                oo = {
                    status: "success",
                    username: pre_username,
                    access_token: access_token,
                    expires_in: expires_in,//access_token不能超过1天【expires_in:为access_token的到期时间戳】
                    refresh_token: fun.sha256(access_token + expires_in)//refresh_token不能超过30天
                }
                let sqlArr = [
                    "@.access_token='" + access_token + "'",
                    "@.expires_in=" + expires_in,
                    "@.refresh_token='" + oo.refresh_token + "'",
                    "@.LoginTimes=@.LoginTimes+1",
                    "@.LastLoginTime=@.LoginTime",
                    "@.LastLoginIP=@.LoginIP",
                    "@.logintime=" + parseInt(Date.now() / 1000),
                    "@.loginip='" + headers["x-forwarded-for"].replace(/'/g, "''") + "'",
                    "@.random='" + Random + "'"
                ]
                await this.query("update @.manager set " + sqlArr.join(",") + " where @.username='" + pre_username.replace(/'/g, "''") + "'", "main", pgStr);
            }
            else {
                oo = o2
            }
        }
        await this.Loginlog(username, oo, headers, pgStr);
        return oo;
    },
    Loginlog: async function (username, oo, headers, pgStr) {
        if (username.length > 47) { username = username.substring(0, 47) + "..."; }
        let ip = headers["x-forwarded-for"]; if (ip.length > 100) { ip = ip.substring(0, 97) + "..."; }
        let des = JSON.stringify(oo); if (des.length > 255) { des = des.substring(0, 252) + "..."; }
        let referer = headers["referer"]; if (referer.length > 255) { referer = referer.substring(0, 252) + "..."; }
        let lang = headers["accept-language"]; if (lang.length > 50) { lang = lang.substring(0, 47) + "..."; }
        let origin = headers["origin"]; if (origin.length > 255) { origin = origin.substring(0, 252) + "..."; }
        let UserAgent = headers["user-agent"]; if (UserAgent.length > 255) { UserAgent = UserAgent.substring(0, 252) + "..."; }
        ///////////////////////////////////
        let arrL = ["@.user", "@.IP", "@.des", "@.ResultTF", "@.fromURL", "@.lang", "@.url", "@.UserAgent", "@.LoginTime"]
        let arrR = [
            "'" + username.replace(/'/g, "''") + "'",
            "'" + ip.replace(/'/g, "''") + "'",
            "'" + des.replace(/'/g, "''") + "'",
            oo.status == "success" ? 1 : 0,
            "'" + referer.replace(/'/g, "''") + "'",
            "'" + lang.replace(/'/g, "''") + "'",
            "'" + origin.replace(/'/g, "''") + "'",
            "'" + UserAgent.replace(/'/g, "''") + "'",
            parseInt(Date.now() / 1000)
        ]
        let sql = "insert into @.loginlog(" + arrL.join(",") + ") values (" + arrR.join(",") + ")";
        await this.query(sql, "main", pgStr);
    },
    //验证登陆信息
    Login_verification: function (data, pwd, time) {
        let oo = {};
        let num = Date.now() / 1000 - time;
        //为什么是“-60”  因为服务器的时间可能会慢一点，我也不知道原因，但差值很小。
        if (num < 60 && num > -60) {
            if (!data) { //查询数据库是否出错
                oo = { status: "error", data: "无该用户！【会话+1】【Cookie+1】" }
            }
            else if (data.status == "error") {
                oo = data;
            }
            else if (data.islocked == 0) {
                oo = {
                    status: "error", data: "用户被锁定！"
                }
            }
            else {
                let vPwd = fun.sha256(time + data.pwd)
                if (pwd == vPwd) {
                    oo = { status: "success", data: "验证成功" }
                }
                else {
                    oo = { status: "error", data: "密码不正确！【会话+1】【Cookie+1】" }
                }
            }
        }
        else {
            oo = {
                status: "error",
                data: "服务器时间-客户瑞时间<60秒且值>-60秒。（" + (Date.now() / 1000) + " - " + time + " = " + num + "）【会话+1】【Cookie+1】"
            }
        }
        return oo;
    },
    //登陆后token验证
    CheckPower: async function (token, pgStr) {
        let obj = {}
        if (token == "") {
            obj = { status: "error", data: "【token】为空" };
        }
        else {
            let select = "select @.id as id,@.random as random from @.manager where @.access_token=" + fun.rpsql(token);
            let data = await this.query(select, "main", pgStr);
            if (!data[0]) { //查询数据库是否出错
                obj = {
                    status: "error",
                    data: data,
                    token: "【PostgreSQL】无效【access_token】=" + token
                }
            }
            else {
                obj.status = "success";
            }
        }
        return obj;
    },
}
/////////////备份这种连接方式////////
// const pool = new Pool({
//   user: 'default',
//   host: 'ep-lucky-butterfly-a4tu82np.us-east-1.aws.neon.tech',
//   database: 'verceldb',
//   password: 'i84vkbPgfqOW',
//   port: 5432,
//   ssl: { rejectUnauthorized: true } // 如果你的数据库使用了自签名证书，需要添加这个配置
// });
///////////////////////////////////