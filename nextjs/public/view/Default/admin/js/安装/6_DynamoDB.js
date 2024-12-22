'use strict';
Object.assign(Tool, {
    DynamoDB: {
        a01: function (table, database, B1, B2, next, This, t) {
            let oo = {
                table: table,
                database: Tool.getChinaAscii(database.replace(/\//g, "_")),
                B1: B1,
                B2: B2,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let data = [{
                action: "dynamodb",
                database: oo.database,
                fun: "listTables",
            }]
            //获取所有表
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (t[0]) {
                if (t[0].indexOf(oo.database + "_" + oo.table.name) == -1) {
                    //要建表   
                    let data = this.b01(oo.table, oo.database)
                    Tool.ajax.a01(data, this.a04, this, oo);
                }
                else {
                    $(".nr").append('（' + (oo.B2 == 1 ? "" : oo.B1 + '. ') + '已存在,跳过）');//建分数据库时要用
                    this.d04(oo);
                }
            }
            else {
                $(".nr").append("<br/>出错,请查看console.log输出结果。");
                console.log(t);
            }
        },
        a04: function (t, oo) {
            $(".nr").append("。")
            if (t[0].TableDescription) {
                $(".nr").append('（' + (oo.B2 == 1 ? "" : oo.B1 + '. ') + '不存在，创建成功<img src="/' + o.path + 'admin/img/install/correct.gif" style="position:relative;top:3px;"/>）');

                this.d01(oo)
            }
            else {
                $(".nr").append("出错：" + JSON.stringify(t));
                $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            }
        },
        //////////////////////////////////////////////////
        //创建表
        b01: function (table, database) {
            let data = [{
                action: table.action,
                fun: "createTable",
                params: this.b02(database + "_" + table.name)//取字段
            }]
            return data
        },
        //取字段
        b02: function (database) {
            return {
                TableName: database,
                AttributeDefinitions: [
                    {
                        AttributeName: 'id',
                        AttributeType: 'S'
                    }
                    // ,{
                    //     AttributeName: 'logintime',
                    //     AttributeType: 'N'
                    // }
                ],
                KeySchema: [
                    {
                        AttributeName: 'id',
                        KeyType: 'HASH'//HASH哈希键
                    }
                    // , {
                    //     AttributeName: 'logintime',
                    //     KeyType: 'RANGE'
                    // }
                ],
                ProvisionedThroughput: {//设置吞吐量
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            };
        },
        ////////////////////////////////////////////////
        d01: function (oo) {
            //必须延时，否则插入不了。
            Tool.Time("time", 1000, this.d02, this, oo);
        },
        d02: function (oo) {
            if (oo.table.sql) {
                let data = [];
                //创建表后，加建表参数(如：插入数据)
                for (let i = 0; i < oo.table.sql.length; i++) {
                    data.push({
                        action: oo.table.action,
                        fun: "putItem",
                        params: oo.table.sql[i],
                    })
                }
                Tool.ajax.a01(data, this.d03, this, oo);
            }
            else {
                this.d04(oo);
            }
        },
        d03: function (t, oo) {
            $(".nr").append("+")
            if (t[0] == "插入成功") {
                this.d04(oo)
            } else if (t[0].message == "Requested resource not found") {
                this.d01(oo)
            } else {
                $(".nr").append("插入失败：" + JSON.stringify(t));
                $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            }
        },
        d04: function (oo) {
            $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
            oo.next.apply(oo.This, [oo.t])
        },
    }
});