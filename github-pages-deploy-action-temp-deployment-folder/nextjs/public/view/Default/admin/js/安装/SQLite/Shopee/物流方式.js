'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "物流方式",
        database: "shopee/物流方式",
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
                type: "varchar(5)",
                default: "",
                des: "国家代码（如：SG）"
            },
            {
                name: "cn_name",
                type: "varchar(10)",
                default: "",
                des: "国家（如：新加坡）"
            },
            {
                name: "currency_unit",
                type: "varchar(5)",
                default: "",
                des: "货币单位（如：SGD）"
            },
            {
                name: "currency_symbol",
                type: "varchar(5)",
                default: "",
                des: "货币符号（如：$）"
            },
            {
                name: "description",
                type: "varchar(255)",
                default: "",
                des: "说明"
            },
            {
                name: "cargo_types",
                type: "text",
                default: "",
                des: "物流信息json格式"
            },
        ]
    },
]);