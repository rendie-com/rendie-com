'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "shopee类目表",
        database: "shopee/类目/类目",
        action: "sqlite",
        //"sql": [
        //  "create index pk_upid ON @.table(@.upid)",
        //  "create index pk_sort ON @.table(@.sort)",
        //  "create index pk_isleaf ON @.table(@.isleaf)",
        //  "create unique index pk_fromID ON @.table(@.fromID)"
        //],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "name",
                type: "varchar(100)",
                default: "",
                des: "分类名称"
            },
            {
                name: "enname",
                type: "varchar(255)",
                default: "",
                des: "分类名称（英文）"
            },
            {
                name: "sort",
                type: "integer",
                default: "0",
                des: "排序"
            },
            {
                name: "hide",
                type: "tinyint",
                default: "0",
                des: "显示/隐藏"
            },
            {
                name: "upid",
                type: "integer",
                default: "0",
                des: "父ID"
            },
            {
                name: "count1",
                type: "integer",
                default: "0",
                des: "可上传（发往美国免运费，且未上传的商品。）"
            },
            {
                name: "count2",
                type: "integer",
                default: "0",
                des: "收运费（是发往美国收运费。）"
            },
            {
                name: "count3",
                type: "integer",
                default: "0",
                des: "已上传（发往美国免运费，且已上传的商品。）"
            },
            {
                name: "fromID",
                type: "integer",
                default: "0 unique",
                des: "来源ID"
            },
            {
                name: "isleaf",
                type: "bit",
                default: "0",
                des: "是否叶子类目"
            }
        ]
    },
    {
        name: "table",
        des: "shopee类目属性表",
        database: "shopee/类目/属性",
        action: "sqlite",
        //"sql": [
        //  "create index pk_cateId ON @.table(@.cateId)"
        //],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "cateId",
                type: "varchar(20)",
                default: "0",
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
        des: "类目属性名翻译（shopee翻译的属性名不对，我用这个来翻译）",
        database: "shopee/类目/属性名翻译",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "fromId",
                type: "integer",
                default: "0",
                des: "来源ID"
            },
            {
                name: "cnName",
                type: "varchar(30)",
                default: "0",
                des: "中文名"
            },
            {
                name: "enName",
                type: "varchar(50)",
                default: "0",
                des: "英文名"
            }
        ]
    },
]);