'use strict';
Object.assign(Tool, {
    mysql: {
        obj: { B1: 0, B2: 0 },
        a01: function (oo, dbname, B1, B2, next, This, t) {
            this.obj.B1 = B1;
            this.obj.B2 = B2;
            let str = "\"<.Db(mysql.mysql,show databases like '" + dbname + "',count)/>\"";
            Tool.ajax.a01(str, 1, this.a02, this, [dbname, oo, next, This, t]);
        },
        a02: function (t, arr) {
            if (t == "") {
                //要建数据库
                let str = '""<r: db="mysql.mysql">create database ' + arr[0] + ';</r:>'// charset utf8
                Tool.ajax.a01(str, 1, this.a03, this, arr);
            }
            else if (t == arr[0]) {
                this.a03("", arr);
            }
            else {
                Tool.pre(["mysql出错:", t, arr]);
            }
        },
        a03: function (t, arr) {
            if (t == "") {
                let select1 = "select count(1) from INFORMATION_SCHEMA.TABLES t where t.TABLE_SCHEMA ='" + arr[0] + "' and t.TABLE_NAME='@." + arr[1].name + "'"
                let str = '"<if Fun(Db(' + arr[1].dbType + '.' + arr[0] + ',' + select1 + ',count))==0>要建表</if>"'
                Tool.ajax.a01(str, 1, this.a04, this, arr);
            }
            else {
                Tool.at("建数据库出错。\n" + t);
            }
        },
        a04: function (t, arr) {
            if (t == "要建表") {
                let str = '""<r: db="' + arr[1].dbType + '.' + arr[0] + '">' + this.b01(arr[1]) + '</r:>'
                Tool.ajax.a01(str, 1, this.a05, this, arr);
            }
            else if (t == "") {
                $(".nr").append('（' + (this.obj.B2 == 1 ? "" : this.obj.B1 + '. ') + '已存在,跳过）');//建分数据库时要用
                this.a06(arr);
            }
            else { Tool.at("出错01：" + t); }
        },
        a05: function (t, arr) {
            $(".nr").append("。")
            if (t == "") {
                $(".nr").append('（' + (this.obj.B2 == 1 ? "" : this.obj.B1 + '. ') + '不存在，创建成功<img src="/' + o.path + 'admin/img/install/correct.gif" style="position:relative;top:3px;"/>）');
                this.a06(arr);
            }
            else { $(".nr").append("出错：" + t); $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight")); }
        },
        a06: function (arr) {
            $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            arr[2].apply(arr[3], [arr[1], arr[4]]);
        },
        //创建表
        b01: function (oo) {
            let defaultstr = "", arr = this.b02(oo);//取字段
            if (oo.sql) {
                //创建表后，加sql语名
                defaultstr = '<1/>' + oo.sql.join('<1/>');
            }
            else { defaultstr = ''; }
            return 'create table @.' + oo.name + '(' + arr.join(",") + ')' + defaultstr
        },
        //取字段
        b02: function (oo) {
            let arr = [], defaultstr
            for (let j = 0; j < oo.table.length; j++) {
                defaultstr = "@." + oo.table[j].name + " " + this.b03(oo.table[j].type)
                if (oo.table[j].default != "") {
                    if (oo.table[j].default.indexOf("check(") != -1)//access没有check约束,由于MySQL目前字段的默认值不支持函数
                    {
                        arr[j] = defaultstr + " default 0 not null"
                    }
                    else {
                        arr[j] = defaultstr + " default " + oo.table[j].default + " not null"
                    }

                }
                else {
                    if (oo.table[j].name == "id") {
                        arr[j] = "@." + oo.table[j].name + " int primary key auto_increment"  //设置为int类型，自增字段，主键
                    }
                    else { arr[j] = defaultstr; }
                }
            }
            return arr;
        },
        b03: function (type) {
            let str = "";
            if (type == "text") { str = "longtext"; }
            else if (type.indexOf("numeric(") != -1) { str = type.replace("numeric(", "decimal("); }
            else if (type.toLowerCase() == "money") { str = "double(8,2)"; }
            else {
                str = type;
            }
            return str;
        }
    }
});
//MySQL基本语句（全）      https://zhuanlan.zhihu.com/p/97132780


//                    if (ConnType == "access") {
//                        if (oo.table[j].default.indexOf("check(") != -1)//access没有check约束
//                        {
//                            arr[j] = defaultstr + " default 0 not null"
//                        }
//                        else {
//                            arr[j] = defaultstr + " default " + oo.table[j].default + " not null"
//                        }
//                    }
//                    else if (ConnType == "sql server 2012" || ConnType == "sql server 2005/2008") {
//                        arr[j] = defaultstr + " default " + oo.table[j].default + " not null"
//                    }
