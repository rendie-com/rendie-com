import { self_config } from '../self/config.js'
import { fun } from '../fun.js'
import sqlite3 from 'sqlite3'

export const sqlite = {
    a01: async function (obj, database, sql) {
        let oo = {}
        try {
            oo = await this.SqliteAsync(database, sql);
        } catch (error) {
            oo = {
                status: "error",
                data: "查询数据库出错了：",
                error: error,
                obj: obj
            };
        }
        return oo;
    },
    // 创建token
    GetToken: async function (username, pwd, time, headers) {
        let oo = {}
        let ts2 = Date.now() - Date.parse("2025/7/21");
        if (ts2 > 0) {
            oo = { status: "error", data: "该用户已被锁定" + parseInt(ts2 / 1000 / 60 / 60 / 24) + "天。" }
        }
        else {
            let select = "select @.id,@.username,@.pwd,@.islocked,@.LastLoginTime,@.randomnum from @.manager where @.username='" + username.replace("'", "''") + "'";
            let table = await this.SqliteAsync("main", select);
            let data = table[0]
            let o2 = this.Login_verification(data, pwd, time);//验证登陆信息
            if (o2.status == "success") {
                //LastLoginTime         上次登陆时间
                let randomnum = fun.getRandom(data[self_config.TablePre + "randomnum"], data[self_config.TablePre + "LastLoginTime"]);//如果有10天没有登录，则更新randomnum字段
                let expires_in = parseInt(Date.now() / 1000 + 60 * 60 * 24);
                let access_token = fun.sha256(fun.vStr() + headers["user-agent"] + randomnum)
                let pre_name = data[self_config.TablePre + "username"]
                oo = {
                    status: "success",
                    name: pre_name,
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
                    "@.randomnum='" + randomnum + "'"
                ]
                await this.SqliteAsync("main", "update @.manager set " + sqlArr.join(",") + " where @.username='" + pre_name.replace(/'/g, "''") + "'");
            }
            else {
                oo = o2
            }
        }
        await this.Loginlog(username, oo, headers);
        return oo;
    },
    SqliteAsync: async function (database, sql) {
        sql = sql.replace(/@\./g, self_config.TablePre);
        let connStr = process.env.NEXTJS_CONFIG_SQLITE.replace("{database}", database);
        const db = new sqlite3.Database(connStr);// 创建一个新的SQLite数据库实例           
        return new Promise((resolve, reject) => {
            //查询所有的用户数据
            db.all(sql, (err, rows) => {
                db.close();
                if (err) {
                    reject(err.message);
                }
                resolve(rows)
            });
        });
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
            else if (data[self_config.TablePre + "islocked"] == 0) {
                oo = {
                    status: "error", data: "用户被锁定！"
                }
            }
            else {
                let vPwd = fun.sha256(time + data[self_config.TablePre + "pwd"])
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
    Loginlog: async function (name, oo, headers) {
        if (name.length > 47) { name = name.substring(0, 47) + "..."; }
        let ip = headers["x-forwarded-for"]; if (ip.length > 100) { ip = ip.substring(0, 97) + "..."; }
        let des = JSON.stringify(oo); if (des.length > 255) { des = des.substring(0, 252) + "..."; }
        let referer = headers["referer"]; if (referer.length > 255) { referer = referer.substring(0, 252) + "..."; }
        let lang = headers["accept-language"]; if (lang.length > 50) { lang = lang.substring(0, 47) + "..."; }
        let origin = headers["origin"]; if (origin.length > 255) { origin = origin.substring(0, 252) + "..."; }
        let UserAgent = headers["user-agent"]; if (UserAgent.length > 255) { UserAgent = UserAgent.substring(0, 252) + "..."; }
        ///////////////////////////////////
        let arrL = ["@.username", "@.ip", "@.des", "@.isstatus", "@.referer", "@.lang", "@.origin", "@.useragent", "@.logintime"]
        let arrR = [
            "'" + name.replace(/'/g, "''") + "'",
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
        await this.SqliteAsync("main", sql);
    },
    //登陆后token验证
    CheckPower: async function (token) {
        let obj = {}
        if (token == "") {
            obj = { status: "error", data: "【token】为空" };
        }
        else {
            let select = "select @.id,@.randomnum from @.manager where @.access_token=" + fun.rpsql(token);
            let data = await this.SqliteAsync("main", select);
            if (!data) { //查询数据库是否出错
                obj = {
                    status: "error",
                    token: "[sqlite]无效【access_token】=" + token,
                    data: data
                }
            }
            else if (obj.status == "error") {
                obj = data;
            }
            else {
                obj.status = "success";
            }
        }
        return obj;
    },
};