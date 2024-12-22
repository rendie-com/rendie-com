import { self_config } from './self/config.js'
import { self_fs } from './self/fs.js'
import { self_process } from './self/process.js'
import { sqlite } from './db/sqlite.js'
import { PostgreSQL } from './db/PostgreSQL.js'
import { DynamoDB } from './db/DynamoDB.js'

export const index = {
    init: async function (list) {
        let data = await this.for_list({}, list);
        return { status: "success", data: data };
    },
    for_list: async function (oo, list) {
        let newList = []
        for (let i = 0; i < list.length; i++) {
            newList[i] = await this.switch_action(oo, list[i]);
            if (list[i].list && newList[i].length != 0) {
                //返回结果有数据，运行list内的参数。 
                if (oo.fun == 'getItem') {
                    //在DynamoDB只有一条结果的情况。这个是因为返回结果不是数组了。
                    newList[i] = [newList[i]];
                }
                for (let j = 0; j < newList[i].length; j++) {
                    //查询出一条或多条的情况。
                    newList[i][j].list = await this.for_list(newList[i][j], list[i].list)
                }
            }
            else if (list[i].elselist && (newList[i].length == 0 || Object.keys(newList[i]).length === 0)) {
                //Object.keys   要检查一个对象是否为空
                //返回结果没数据，运行elselist内的参数。    
                //问：为什么要做成这种格式？
                //答：为了与正确的结果返回统一格式。
                newList[i] = [{
                    list: await this.for_list({}, list[i].elselist)
                }]
            }
        }
        return newList;
    },
    switch_action: async function (data, oo) {
        if (oo.action == "${default_db}") { oo.action = process.env.NEXTJS_CONFIG_DEFAULT_DB; }
        switch (oo.action) {
            case "sqlite": oo = await sqlite.a01(oo, this.database(data, oo.database), this.sql(data, oo.sql)); break;
            case "pg01": oo = await PostgreSQL.a01(oo, this.database(data, oo.database), this.sql(data, oo.sql), process.env.NEXTJS_CONFIG_PG01); break;
            case "pg02": oo = await PostgreSQL.a01(oo, this.database(data, oo.database), this.sql(data, oo.sql), process.env.NEXTJS_CONFIG_PG02); break;
            case "pg03": oo = await PostgreSQL.a01(oo, this.database(data, oo.database), this.sql(data, oo.sql), process.env.NEXTJS_CONFIG_PG03); break;
            case "pg04": oo = await PostgreSQL.a01(oo, this.database(data, oo.database), this.sql(data, oo.sql), process.env.NEXTJS_CONFIG_PG04); break;
            case "dynamodb": oo = await DynamoDB.a01(oo, oo.params); break;
            case "fs": oo = await self_fs.a01(oo); break;
            case "process": oo = await self_process.a01(oo); break;
            case "__dirname": oo = __dirname; break;
            case "config": oo = this.config(oo.name); break;
        }
        return oo
    },
    database: function (oo, database) {
        for (let k in oo) {
            if (database.indexOf("${proid50:" + k + "}") != -1) {
                let id = parseInt(oo[k].substring(1))
                database = this.replaceAll(database, "\\$\\{proid50\\:" + k + "\\}", this.remainder(id, 50))
            }
            else if (database.indexOf("${fromid99:" + k + "}") != -1) {
                database = this.replaceAll(database, "\\$\\{fromid99\\:" + k + "\\}", this.remainder(oo[k], 99))
            }
            else if (database.indexOf("${fromid300:" + k + "}") != -1) {
                database = this.replaceAll(database, "\\$\\{fromid300\\:" + k + "\\}", this.remainder(oo[k], 300))
            }
        }
        return database
    },
    remainder: function (id, num) {
        return (Math.abs(id % num) + 1).toString().padStart(2, '0');
    },
    sql: function (oo, sql) {
        for (let k in oo) {
            if (sql.indexOf("${" + k + "}") != -1) {
                sql = this.replaceAll(sql, "\\$\\{" + k + "\\}", oo[k])
            }
        }
        return sql;
    },
    replaceAll: function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    },
    config: function (name) {
        if (name) {
            return self_config[name];
        }
        else {
            return self_config;
        }
    }
}


//case "getDiskInfo": oo = await this.getDiskInfo(); break;//获取电脑磁盘信息
//case "exec": oo = await this.exec(oo.command); break;//我没时间来调试
//获取电脑磁盘信息----不用这个也能实现（用exec来实现）
//getDiskInfo: async function () {
//     //要安装【npm install node-disk-info】
//     const nodeDiskInfo = require('node-disk-info');
//     return await nodeDiskInfo.getDiskInfo();
//},
//import { child_process}  from 'child_process'//我没时间来调试

//我没时间来调试
//exec: async function (command) {
//解决调用cmd中文乱码（我没测式，要用了再来解决。）        https://www.lovestu.com/electroncmdcn.html
//     return new Promise((resolve) => {
//         child_process(command, { encoding: 'utf8' }, (err, stdout, stderr) => {
//             if (err) {
//                 resolve("")
//                 // resolve({
//                 //     status: "error",
//                 //     data: 'Error executing command:' + err
//                 // });
//             }
//             else if (stderr) {
//                 resolve({
//                     status: "error",
//                     data: 'Command stderr:' + stderr
//                 });
//             }
//             else {
//                 resolve(stdout);
//             }
//         });
//     })
//},