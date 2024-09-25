'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "买家账户",
        database: "shopee/买家账户",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
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
                des: "用户名（登录用的）"
            },
            {
                name: "mail",
                type: "varchar(100)",
                default: "",
                des: "邮箱（如：huangxingjl03@gmail.com）"
            },
            {
                name: "site",
                type: "varchar(5)",
                default: "",
                des: "名称（如：my）"
            },
            {
                name: "loginMode",
                type: "varchar(50)",
                default: "",
                des: "登录方式（如：GitHub）"
            },
            {
                name: "password",
                type: "varchar(255)",
                default: "",
                des: "密码"
            },
            {
                name: "note",
                type: "varchar(255)",
                default: "",
                des: "备注"
            },
            {
                name: "cookies",
                type: "text",
                default: "",
                des: "登录用的cookies信息"
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