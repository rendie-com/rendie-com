'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "品牌",
        database: "shopee/品牌",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "brand_id",
                type: "integer",
                default: "0 unique",
                des: "品牌ID"
            },
            {
                name: "name",
                type: "varchar(100)",
                default: "0",
                des: "品牌名称"
            },
            {
                name: "category_ids",
                type: "text",
                default: "",
                des: "品牌有哪些分类ID"
            }
        ]
    },
]);