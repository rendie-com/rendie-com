'use strict';
Object.assign(Tool, {
    sqlite: {
        obj: { B1: 0, B2: 0 },
        a01: function (table, database, B1, B2, next, This, t) {
            this.obj.B1 = B1;
            this.obj.B2 = B2;
            let data = [{
                action: "process",
                fun: "env",
                name: "NEXTJS_CONFIG_SQLITE"
            }]
            let oo = {
                table: table,
                database: database,
                next: next,
                This: This,
                t: t
            }
            Tool.ajax.a01(data, this.a02, this, oo);
        },
        a02: function (t, oo) {           
            oo.path = t[0].replace("{database}",oo.database)           
            let data = [{
                action: "fs",
                fun: "access",
                path: oo.path,
                mode: 0,
            }]
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {            
            if (t[0].length) {
                //文件已存在
                this.a04(["写入成功"], oo)
            }
            else {
                //文件不存在
                let data = [{
                    action: "fs",
                    fun: "writeFile",
                    path: oo.path,
                    data: "",
                    mode: 0,
                }]
                Tool.ajax.a01(data, this.a04, this, oo);
            }
        },
        a04: function (t, oo) {
            if (t[0] == "写入成功") {
                let data = [{
                    action: oo.table.action,
                    database: oo.database,
                    sql: 'select count(1) as total from sqlite_master WHERE name=\'@.' + oo.table.name + '\''                    
                }]       
                Tool.ajax.a01(data, this.a05, this, oo);
            }
            else {
                alert("创建数据库出错：" + t)
            }
        },
        a05: function (t, oo) {
            if (t[0][0].total == 0) {
                //要建表                   
                Tool.ajax.a01(this.b01(oo.table,oo.database), this.a06, this, oo);
            }
            else {
                $(".nr").append('（' + (this.obj.B2 == 1 ? "" : this.obj.B1 + '. ') + '已存在,跳过）');//建分数据库时要用
                this.a07(oo);
            }
        },
        a06: function (t, oo) {
            $(".nr").append("。")
            let iserr = false;
            for (let i = 0; i < t.length; i++) {
                if (t[i].length!=0) { iserr = true; break; }
            }
            if (iserr) {
                $(".nr").append("出错：" + JSON.stringify(t));
                $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            }
            else {
                $(".nr").append('（' + (this.obj.B2 == 1 ? "" : this.obj.B1 + '. ') + '不存在，创建成功<img src="/' + o.path + 'admin/img/install/correct.gif" style="position:relative;top:3px;"/>）');
                this.a07(oo);
            }
        },
        a07: function (oo) {
            $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            oo.next.apply(oo.This, [oo.t])
        },
        //////////////////////////////////////////////////
        //创建表
        b01: function (table,database) {           
            let arr = this.b02(table.table);//取字段
            let data = [{
                action: table.action,
                database: database,
                sql: 'create table @.' + table.name + '(' + arr.join(",") + ')',                
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
                defaultstr = "@." + table[j].name + " " + table[j].type
                if (table[j].default != "") {
                    arr[j] = defaultstr + " default " + table[j].default + " not null"
                }
                else {
                    arr[j] = defaultstr;
                }
            }
            return arr;
        },
    }
});
//SQLite常用语句     https://www.jianshu.com/p/918a7827bb0d