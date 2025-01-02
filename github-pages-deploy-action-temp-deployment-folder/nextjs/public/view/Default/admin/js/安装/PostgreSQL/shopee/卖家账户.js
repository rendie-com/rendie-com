'use strict';
mssql = mssql.concat([{
    name: "table",
    des: "卖家账户",
    database: "shopee/卖家账户",
    action: "pg04",
    table: [
        {
            name: "id",
            type: "serial primary key",
            default: "",
            des: "索引"
        },
        {
            name: "name",
            type: "varchar(100)",
            default: "",
            des: "提现人"
        },
        {
            name: "company",
            type: "varchar(100)",
            default: "",
            des: "公司"
        },
        {
            name: "sort",
            type: "integer",
            default: "0",
            des: "排序"
        },
        {
            name: "UserName",
            type: "varchar(100)",
            default: "",
            des: "用户名"
        },
        {
            name: "password",
            type: "varchar(255)",
            default: "",
            des: "密码"
        },
        {
            name: "cookies",
            type: "text",
            default: "",
            des: "登录用的cookies信息"
        },
        {
            name: "localStorage",
            type: "text",
            default: "",
            des: "登录用的localStorage信息"
        },
        {
            name: "phone",
            type: "varchar(11)",
            default: "",
            des: "手机"
        },
        {
            name: "note",
            type: "varchar(255)",
            default: "",
            des: "备注"
        },
        {
            name: "config",
            type: "text",
            default: "",
            des: "配置信息（如：店铺ID，店铺名，等等）"
        },
        {
            name: "addtime",
            type: "integer",
            default: "0",
            des: "添加时间"
        }
    ]
}
]);