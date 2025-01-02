'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "【店小秘】违禁词",
        database: "shopee/违禁词/店小秘",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "name",
                type: "varchar(150)",
                default: "0 unique",
                des: "违禁词名称"
            },
            {
                name: "count",
                type: "integer",
                default: "0",
                des: "违禁次数"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
    {
        name: "table",
        des: "【客优云】违禁词",
        database: "shopee/违禁词/客优云",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "name",
                type: "varchar(150)",
                default: "0 unique",
                des: "违禁词名称"
            },
            {
                name: "isWhitelist",
                type: "bit",
                default: "0",
                des: "是否白名单"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
]);