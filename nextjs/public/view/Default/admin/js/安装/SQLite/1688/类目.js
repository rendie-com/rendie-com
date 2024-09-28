'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "现货类目",
        database: "1688/类目/现货类目",
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
                type: "varchar(50)",
                default: "",
                des: "分类名称"
            },
            {
                name: "catIdPath",
                type: "varchar(255)",
                default: "",
                des: "分类ID路径"
            },
            {
                name: "catNamePath",
                type: "varchar(255)",
                default: "",
                des: "分类名称路径"
            },
            {
                name: "sort",
                type: "integer",
                default: "0",
                des: "排序"
            },
            {
                name: "upid",
                type: "integer",
                default: "0",
                des: "父ID"
            },
            {
                name: "fromID",
                type: "integer",
                default: "0",
                des: "来源ID"
            },
            {
                name: "bindShopee",
                type: "integer",
                default: "0",
                des: "帮定Shopee的叶子类目【fromID】"
            },
            {
                name: "isleaf",
                type: "bit",
                default: "0",
                des: "是否叶子类目"
            },
            {
                name: "isAttr",
                type: "bit",
                default: "0",
                des: "是否采集类目属性"
            }
        ]
    },
    {
        name: "table",
        des: "现货类目属性",
        database: "1688/类目/现货类目属性",
        action: "sqlite",
        sql: [
            "create unique index attr1_catId ON @.table(@.catId)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "catId",
                type: "integer",
                default: "0 unique",
                des: "叶子类目ID"
            },
            {
                name: "json",
                type: "text",
                default: "",
                des: "json代码"
            }
        ]
    },
    {
        name: "table",
        des: "加工定制类目",
        database: "1688/类目/加工定制类目",
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
                type: "varchar(50)",
                default: "",
                des: "分类名称"
            },
            {
                name: "catIdPath",
                type: "varchar(255)",
                default: "",
                des: "分类ID路径"
            },
            {
                name: "catNamePath",
                type: "varchar(255)",
                default: "",
                des: "分类名称路径"
            },
            {
                name: "sort",
                type: "integer",
                default: "0",
                des: "排序"
            },
            {
                name: "upid",
                type: "integer",
                default: "0",
                des: "父ID"
            },
            {
                name: "fromID",
                type: "integer",
                default: "0",
                des: "来源ID"
            },
            {
                name: "bindShopee",
                type: "integer",
                default: "0",
                des: "帮定Shopee的叶子类目【fromID】"
            },
            {
                name: "isleaf",
                type: "bit",
                default: "0",
                des: "是否叶子类目"
            },
            {
                name: "isAttr",
                type: "bit",
                default: "0",
                des: "是否采集类目属性"
            }
        ]
    },
    {
        name: "table",
        des: "加工定制类目属性",
        database: "1688/类目/加工定制类目属性",
        action: "sqlite",
        sql: [
            "create unique index attr0_catId ON @.table(@.catId)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "catId",
                type: "integer",
                default: "0 unique",
                des: "叶子类目ID"
            },
            {
                name: "json",
                type: "text",
                default: "",
                des: "json代码"
            }
        ]
    },
]);