'use strict';
mssql = mssql.concat([
    {
        "name": "product",
        "des": "商品列表",
        "db": "ozon",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "nvarchar(10)",
                "default": "0 unique",
                "des": "产品编码(如：R12345)"
            },
            {
                "name": "AfterReview",
                "type": "tinyint",
                "default": "0",
                "des": "审核后本地状态(主要是记录更新成功后，被敦煌审核后，出现审核不通过，按原因划分的状态)"
            },
            {
                "name": "ManualReview",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核状态"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "首图"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "上传成功后【详情ID】"
            },
            {
                "name": "isUp",
                "type": "bit",
                "default": "0",
                "des": "是否已上传到【Ozon平台】"
            },
            {
                "name": "isUpImg",
                "type": "bit",
                "default": "0",
                "des": "是否已上传图片到【Ozon平台】，为什么要这个字段？答：上传图片太慢了，用这个会快一点。"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
            }
        ]
    },
    {
        "name": "seller",
        "des": "卖家账户",
        "db": "ozon",
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
                "des": "用户名"
            },
            {
                "name": "email",
                "type": "varchar(64)",
                "default": "",
                "des": "邮件--登录时用的"
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
                "name": "note",
                "type": "varchar(255)",
                "default": "",
                "des": "备注"
            },
            {
                "name": "sellerId",
                "type": "integer",
                "default": "0",
                "des": "卖家ID"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }

        ]
    },
    {
        "name": "type",
        "des": "Ozon类目表",
        "db": "ozon",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "分类名称"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示/隐藏"
            },
            {
                "name": "upid",
                "type": "integer",
                "default": "0",
                "des": "父ID"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "isleaf",
                "type": "bit",
                "default": "0",
                "des": "是否叶子类目"
            }
        ]
    },
    ////////////////////////////////////////////////////////////////
    {
        "name": "pic1",
        "des": "ozon商品-首图",
        "db": "ozon_img",
        "dbType": "sqlite",
        "sql": [
            "create index pic1_hash ON @.pic1(@.hash)",
            "create unique index pic1_src ON @.pic1(@.src)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(255)",
                "default": "",
                "des": "详情页的所有信息"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    {
        "name": "pic",
        "des": "ozon商品-放大镜图片",
        "db": "ozon_img",
        "dbType": "sqlite",
        "sql": [
            "create index pic_hash ON @.pic(@.hash)",
            "create unique index pic_src ON @.pic(@.src)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(255)",
                "default": "",
                "des": "详情页的所有信息"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    {
        "name": "attrPic_aliexpress",
        "des": "ozon商品-属性图片",
        "db": "ozon_img",
        "dbType": "sqlite",
        "sql": [
            "create index attrPic_aliexpress_hash ON @.attrPic_aliexpress(@.hash)",
            "create unique index attrPic_aliexpress_src ON @.attrPic_aliexpress(@.src)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(255)",
                "default": "",
                "des": "详情页的所有信息"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    {
        "name": "attrPic_1688",
        "des": "ozon商品-属性图片",
        "db": "ozon_img",
        "dbType": "sqlite",
        "sql": [
            "create index attrPic_1688_hash ON @.attrPic_1688(@.hash)",
            "create unique index attrPic_1688_src ON @.attrPic_1688(@.src)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(255)",
                "default": "",
                "des": "详情页的所有信息"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    {
        "name": "desPic",
        "des": "ozon商品-详情图片",
        "db": "ozon_img",
        "dbType": "sqlite",
        "sql": [
            "create index desPic_hash ON @.desPic(@.hash)",
            "create unique index desPic_src ON @.desPic(@.src)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "proid",
                "type": "varchar(10)",
                "default": "",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(255)",
                "default": "",
                "des": "详情页的所有信息"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
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