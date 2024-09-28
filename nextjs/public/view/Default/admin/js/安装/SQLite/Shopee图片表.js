'use strict';
mssql = mssql.concat([
    {
        "name": "pic1",
        "des": "shopee商品-首图",
        "db": "shopee_img",
        "dbType": "sqlite",
        "sql": [
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
                "type": "varchar(50)",
                "default": "0",
                "des": "图片地址"
            },
            {
                "name": "my_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "【马来站点】水印图片地址"
            },
            {
                "name": "br_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "【巴西站点】水印图片地址"
            },
            {
                "name": "tw_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "【台湾】水印图片地址"
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
        "des": "shopee商品-放大镜图片",
        "db": "shopee_img",
        "dbType": "sqlite",
        "sql": [
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
                "type": "varchar(50)",
                "default": "0",
                "des": "图片地址"
            },
            {
                "name": "tw_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "【台湾站点】水印图片地址"
            },
            {
                "name": "my_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "【马来站点】水印图片地址"
            },
            {
                "name": "br_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
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
        "des": "shopee商品-属性图片",
        "db": "shopee_img",
        "dbType": "sqlite",
        "sql": [
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
                "type": "varchar(50)",
                "default": "0",
                "des": "图片地址"
            },
            {
                "name": "my_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "br_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "tw_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "width",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "height",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "size",
                "type": "integer",
                "default": "0",
                "des": ""
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
        "des": "shopee商品-属性图片",
        "db": "shopee_img",
        "dbType": "sqlite",
        "sql": [
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
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "详情ID"
            },
            {
                "name": "hash",
                "type": "varchar(64)",
                "default": "0",
                "des": "计算hash值"
            },
            {
                "name": "src",
                "type": "varchar(50)",
                "default": "0",
                "des": "图片地址"
            },
            {
                "name": "tw_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "my_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "br_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
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
        "des": "shopee商品-详情图片",
        "db": "shopee_img",
        "dbType": "sqlite",
        "sql": [
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
                "type": "varchar(50)",
                "default": "0",
                "des": "图片地址"
            },
            {
                "name": "tw_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "my_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
            },
            {
                "name": "br_watermark",
                "type": "varchar(50)",
                "default": "",
                "des": "水印图片地址"
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