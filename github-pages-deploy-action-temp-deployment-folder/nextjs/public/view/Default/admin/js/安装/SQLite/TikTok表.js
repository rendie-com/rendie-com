'use strict';
mssql = mssql.concat([
    {
        "name": "attr",
        "des": "tiktok类目属性表",
        "db": "tiktok",
        "dbType": "sqlite",
        "sql": [
            "create index attr_fromId ON @.attr(@.fromId)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "fromId",
                "type": "integer",
                "default": "0",
                "des": "叶子类目ID"
            },
            {
                "name": "json",
                "type": "text",
                "default": "",
                "des": "json代码"
            }
        ]
    },
    {
        "name": "categories",
        "des": "类目表",
        "db": "tiktok",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "fromid",
                "type": "integer",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "parent_id",
                "type": "integer",
                "default": "0",
                "des": "父ID"
            },
            {
                "name": "level",
                "type": "tinyint",
                "default": "0",
                "des": "层次"
            },
            {
                "name": "is_leaf",
                "type": "bit",
                "default": "0",
                "des": "叶子节点"
            },
            {
                "name": "name",
                "type": "varchar(50)",
                "default": "",
                "des": "类目名（如：节日装饰）"
            },
            {
                "name": "images",
                "type": "text",
                "default": "",
                "des": "类目图片"
            },
        ]
    },
    {
        "name": "seller",
        "des": "买家账户--主要用来以图搜货源",
        "db": "tiktok",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "username",
                "type": "varchar(64)",
                "default": "",
                "des": "账号名--登录时用的（如：pdd54981599994）"
            },
            {
                "name": "password",
                "type": "varchar(64)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录用的cookies信息"
            },
            {
                "name": "phone",
                "type": "varchar(11)",
                "default": "",
                "des": "手机"
            },
            {
                "name": "email",
                "type": "varchar(50)",
                "default": "",
                "des": "邮箱"
            },
            {
                "name": "company",
                "type": "varchar(100)",
                "default": "",
                "des": "公司"
            },
            {
                "name": "note",
                "type": "varchar(255)",
                "default": "",
                "des": "备注"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
]);