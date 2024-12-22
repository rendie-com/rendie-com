'use strict';
Object.assign(Tool, {
    pg: {
        a01: function (table, database, B1, B2, next, This, t) {
            let oo = {
                table: table,
                database: database,
                B1: B1,
                B2: B2,
                next: next,
                This: This,
                t: t
            }
            let data = [{
                action: "process",
                fun: "env",
                name: "NEXTJS_CONFIG_DEFAULT_DB"
            },
            {
                action: "config",
                name: "pg_database"
            }]
            Tool.ajax.a01(data, this.a02, this, oo);
        },
        a02: function (t, oo) {
            oo.DEFAULT_DB = t[0]
            oo.pg_database = t[1];
            let data = [{
                action: oo.DEFAULT_DB,
                fun: "connect",
                database: t[1],
            }]
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (t[0] == "数据库连接成功") {
                let data = [{
                    action: oo.DEFAULT_DB,
                    database: oo.pg_database,
                    sql: "SELECT count(1) FROM pg_catalog.pg_database WHERE lower(datname) = lower('" + oo.database + "');",
                }]
                //查询数据库是否存在   
                Tool.ajax.a01(data, this.a04, this, oo);
            }
            else {
                $(".nr").append("出错002：" + JSON.stringify(t));
            }
        },
        a04: function (t, oo) {
            if (t[0][0].count == 0) {
                this.d01(oo)
            }
            else {
                //数据库已存在
                this.d02([[]], oo)
            }
        },

        //////////////////////////////////////////////////
        //创建表
        b01: function (table, database) {
            let arr = this.b02(table.table);//取字段
            let data = [{
                action: table.action,
                database: database,
                sql: 'create table @.' + table.name + '(' + arr.join(",") + ')'
            }]
            if (table.sql) {
                //创建表后，加sql语名(如：建索引)
                for (let i = 0; i < table.sql.length; i++) {
                    data.push({
                        action: table.action,
                        database: database,
                        sql: table.sql[i],
                    })
                }
            }
            return data
        },
        //取字段
        b02: function (table) {
            let arr = [], defaultstr
            for (let j = 0; j < table.length; j++) {
                defaultstr = '@.' + table[j].name + " " + table[j].type
                if (table[j].default != "") {
                    arr[j] = defaultstr + " default " + table[j].default + " not null"
                }
                else {
                    arr[j] = defaultstr;
                }
            }
            return arr;
        },
        ///////////////////////////////////
        d01: function (oo) {
            let data = [{
                action: oo.DEFAULT_DB,
                database: oo.pg_database,
                sql: "CREATE DATABASE " + oo.database.replace(/\//g,"_") + ";",
            }]
            //创建数据库
            Tool.ajax.a01(data, this.d02, this, oo);
        },
        d02: function (t, oo) {
            if (t[0].length == 0) {
                let data = [{
                    action: oo.DEFAULT_DB,
                    database: oo.database,
                    sql: "select count(1) from information_schema.tables where table_name='@." + oo.table.name.replace(/\//g,"_") + "'",
                }]
                Tool.ajax.a01(data, this.d03, this, oo);
            }
            else {
                $(".nr").append("创建数据库出错：" + JSON.stringify(t));
            }
        },
        d03: function (t, oo) {
            if (t[0][0].count == 0) {
                //要建表      
                let data = this.b01(oo.table, oo.database)
                Tool.ajax.a01(data, this.d04, this, oo);
            }
            else {
                $(".nr").append('（' + (oo.B2 == 1 ? "" : oo.B1 + '. ') + '已存在,跳过）');//建分数据库时要用
                this.d05(oo);
            }
        },
        d04: function (t, oo) {
            $(".nr").append("。")
            let iserr = false;
            for (let i = 0; i < t.length; i++) {
                if (t[i].length != 0) { iserr = true; break; }
            }
            if (iserr) {
                $(".nr").append("出错：" + JSON.stringify(t));
                $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            }
            else {
                $(".nr").append('（' + (oo.B2 == 1 ? "" : oo.B1 + '. ') + '不存在，创建成功<img src="/' + o.path + 'admin/img/install/correct.gif" style="position:relative;top:3px;"/>）');
                this.d05(oo);
            }
        },
        d05: function (oo) {
            $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            oo.next.apply(oo.This, [oo.t])
        },
    }
});