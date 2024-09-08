'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: " 黑名单",
        database: "shopee/黑名单",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "fromid",
                type: "integer",
                default: "0 unique",
                des: "来源ID"
            },
            {
                name: "userAccount",
                type: "varchar(100)",
                default: "0",
                des: "买家ID"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间"
            },
            {
                name: "reason",
                type: "varchar(255)",
                default: "",
                des: "被标记的原因"
            }
        ]
    },
]);