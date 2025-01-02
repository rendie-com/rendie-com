// import { fun } from '../fun.js'
// import AWS from 'aws-sdk'

export const DynamoDB = {
    a01: async function (obj, params) {
        // 配置AWS SDK
        AWS.config.update({
            region: process.env.AWS_REGION, // 替换为你的DynamoDB表区域
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 你的AWS访问密钥
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // 你的AWS秘密密钥
        });
        let r = {}
        switch (obj.fun) {
            case "listTables": r = await this.listTables(); break;//获取所有表
            case "createTable": r = await this.createTable(params); break;//创建表
            case "putItem": r = await this.putItem(params); break;//插入1条数据
            case "getItem": r = await this.getItem(params); break;//获取1条数据
            case "query": r = await this.query(params); break;//查一个ID
            case "scan": r = await this.scan(params); break;//扫描查询
            case "updateItem": r = await this.updateItem(params); break;//更新1条数据
            default: r = { status: "error", data: "必须指定fun", }; break;
        }
        //try{}catch (error) {
        //     oo = {
        //         status: "error",
        //         data: "查询数据库出错了：",
        //         error: error,
        //         obj: obj
        //     };
        // }
        return r;
    },
    updateItem: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在            
            dynamodb.updateItem(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve("更新成功")
                }
            });
        });
    },
    scan: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在            
            dynamodb.scan(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data)
                }
            });
        });
    },
    query: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在            
            dynamodb.query(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data)
                }
            });
        });
    },
    putItem: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在            
            dynamodb.putItem(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve("插入成功")
                }
            });
        });
    },
    getItem: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在            
            dynamodb.getItem(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data)
                }
            });
        });
    },
    createTable: async function (params) {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在
            dynamodb.createTable(params, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data)
                }
            });
        });
    },
    listTables: async function () {
        const dynamodb = new AWS.DynamoDB(); // 创建DynamoDB客户端
        return new Promise((resolve, reject) => {
            // 检查表是否存在
            dynamodb.listTables({}, function (err, data) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data.TableNames)
                }
            });
        });
    },
    update_main_manager: async function (o3, access_token, expires_in, refresh_token, loginip, randomnum) {
        let Key = {}; Key.id = { S: o3.id.S }
        let logintimes = o3.logintimes ? o3.logintimes.N : "0"//次数
        let lastlogintime = o3.logintime ? o3.logintime.N : "0"//时间
        let lastloginip = o3.LoginIP ? o3.LoginIP.S : ""//最后登陆IP
        const updateItemParams = {
            TableName: 'main_manager',
            Key: Key,
            UpdateExpression: 'SET #access_token = :access_token, #expires_in = :expires_in, #refresh_token = :refresh_token, #logintimes = :logintimes, #lastlogintime = :lastlogintime, #lastloginip = :lastloginip, #logintime = :logintime, #loginip = :loginip, #randomnum = :randomnum',
            ExpressionAttributeNames: {
                '#access_token': "access_token",
                '#expires_in': "expires_in",
                '#refresh_token': "refresh_token",
                '#logintimes': "logintimes",
                '#lastlogintime': "lastlogintime",
                '#lastloginip': "lastloginip",
                '#logintime': "logintime",
                '#loginip': "loginip",
                '#randomnum': "randomnum"

            },
            ExpressionAttributeValues: {
                ':access_token': { S: access_token },
                ':expires_in': { N: "" + expires_in },
                ':refresh_token': { S: refresh_token },
                ':logintimes': { N: logintimes },
                ':lastlogintime': { N: lastlogintime },
                ':lastloginip': { S: lastloginip },
                ':logintime': { N: "" + (parseInt(Date.now() / 1000)) },
                ':loginip': { S: loginip },
                ':randomnum': { S: randomnum }
            }
        };
        return await this.updateItem(updateItemParams);
    },
    //创建token
    GetToken: async function (username, pwd, time, headers) {
        let oo = {}
        let ts2 = Date.now() - Date.parse("2025/7/21");
        if (ts2 > 0) {
            oo = { status: "error", data: "该用户已被锁定" + parseInt(ts2 / 1000 / 60 / 60 / 24) + "天。" }
        }
        else {
            const params = {
                TableName: 'main_manager', // 替换为你的表名
                ProjectionExpression: 'id,username,pwd,islocked,lastlogintime,randomnum', // 只获取这些字段
                FilterExpression: "#attrName=:attrValue", // 使用contains函数进行筛选
                ExpressionAttributeNames: {
                    "#attrName": "username", // 替换为你的属性名
                },
                ExpressionAttributeValues: {
                    ":attrValue": { S: username.replace("'", "''") }, // 替换为你想要搜索的值
                },
            };
            let data = await this.scan(params);
            console.log(data)
            let o2 = this.Login_verification(data, pwd, time);//验证登陆信息
            if (o2.status == "success") {
                //lastlogintime         上次登陆时间
                let o3 = data.Items[0]
                let randomnum = o3.randomnum ? o3.randomnum.S : ""
                let lastlogintime = o3.lastlogintime ? o3.lastlogintime.N : 0
                let Random = fun.getRandom(randomnum, lastlogintime);//如果有10天没有登录，则更新Random字段
                let expires_in = parseInt(Date.now() / 1000 + 60 * 60 * 24);
                let access_token = fun.sha256(fun.vStr() + headers["user-agent+ Random"])
                oo = {
                    status: "success",
                    name: o3.username.S,
                    access_token: access_token,
                    expires_in: expires_in,//access_token不能超过1天【expires_in:为access_token的到期时间戳】
                    refresh_token: fun.sha256(access_token + expires_in)//refresh_token不能超过30天
                }
                ///////////////////////////////////////////////////////////////////////
                let r1 = await this.update_main_manager(o3, access_token, expires_in, oo.refresh_token, headers["x-forwarded-for"], Random)
                if (r1 != "更新成功") {
                    oo = {
                        status: "error",
                        data: "更新失败",
                        error: r1
                    }
                }
                ///////////////////////////////////////////////////////////////////
            }
            else {
                oo = o2
            }
        }
        let r2 = await this.Loginlog(username, oo, headers);
        if (r2 != "插入成功") {
            oo = {
                status: "error",
                data: "插入失败",
                error: r2
            }
        }
        return oo;
    },
    Loginlog: async function (username, oo, headers) {
        let Item = {}
        Item.id = { S: fun.uuid() };
        Item.username = { S: username };
        Item.ip = { S: headers["x-forwarded-for"] };
        Item.des = { S: JSON.stringify(oo) };
        Item.referer = { S: headers["referer"] };
        Item.isstatus = { N: oo.status == "success" ? "1" : "0" };
        Item.lang = { S: headers["accept-language"] };
        Item.origin = { S: headers["origin"] };
        Item.useragent = { S: headers["user-agent"] };
        Item.logintime = { N: "" + (parseInt(Date.now() / 1000)) };
        const putItemParams = {
            TableName: 'main_loginlog',
            Item: Item
        };
        return await this.putItem(putItemParams);
    },
    //验证登陆信息
    Login_verification: function (data, pwd, time) {
        let oo = {};
        if (data.Count == 1) {
            let num = Date.now() / 1000 - time;
            //为什么是“-60”  因为服务器的时间可能会慢一点，我也不知道原因，但差值很小。
            if (num < 60 && num > -60) {
                if (data.Items[0].islocked.N == 0) {
                    oo = { status: "error", data: "用户被锁定！" }
                }
                else {
                    let vPwd = fun.sha256(time + data.Items[0].pwd.S)
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
        }
        else {
            oo = { status: "error", data: "无该用户！【会话+1】【Cookie+1】" }
        }
        return oo;
    },
};