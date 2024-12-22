'use strict';
mssql = mssql.concat([{
    name: "table",
    des: "定时任务",
    database: "shopee/任务/定时任务",
    action: "sqlite",
    table: [
        {
            name: "id",
            type: "integer primary key",
            default: "",
            des: "索引"
        },
        {
            name: "taskname",
            type: "varchar(50)",
            default: "",
            des: "名称"
        },
        {
            name: "priority",
            type: "integer",
            default: "0",
            des: "优先级"
        },
        {
            name: "runuser",
            type: "varchar(10)",
            default: "",
            des: "执行者用户名"
        },
        {
            name: "runuserid",
            type: "integer",
            default: "0",
            des: "执行者用户名ID"
        },
        {
            name: "runcycle",
            type: "tinyint",
            default: "0",
            des: "执行周期"
        },
        {
            name: "isenable",
            type: "tinyint",
            default: "0",
            des: "是否启用"
        },
        {
            name: "addtime",
            type: "integer",
            default: "0",
            des: "添加时间"
        },
        {
            name: "jsfile",
            type: "varchar(255)",
            default: "",
            des: "js文件"

        },
        {
            name: "runtime",
            type: "integer",
            default: "0",
            des: "运行时间"
        },
        {
            name: "nexttime",
            type: "integer",
            default: "0",
            des: "下次运行时间"
        },
        {
            name: "remark",
            type: "text",
            default: "",
            des: "备注"
        }
    ]
},
]);