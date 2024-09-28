'use strict';
mssql = mssql.concat([
    {
        "name": "seller",
        "des": "买家账户--主要用来以图搜货源",
        "db": "lazada",
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
                "name": "shopname",
                "type": "varchar(64)",
                "default": "",
                "des": "店铺名称--登录后验证是否为当前账号用的"
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