'use strict';
mssql = mssql.concat([
    {
        "name": "product",
        "des": "商品表",
        "db": "1688",
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
                "name": "type1",
                "type": "integer",
                "default": "0",
                "des": "一级商品分类ID（人工审核商品时要用）"
            },
            {
                "name": "dhAfterReview",
                "type": "tinyint",
                "default": "0",
                "des": "审核后本地状态(主要是记录更新成功后，被敦煌审核后，出现审核不通过，按原因划分的状态)"
            },
            {
                "name": "ManualReview",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核状态_敦煌网"
            },
            {
                "name": "ManualReview_1688",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核1688状态"
            },
            {
                "name": "ManualReview_video_status",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核主视频状态"
            },
            {
                "name": "ManualReview_ExplanationVideo_status",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核讲解视频状态"
            },
            {
                "name": "ManualReview_1688_fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "人工审核的来源ID，用来当采购货源。"
            },
            {
                "name": "pic",
                "type": "nvarchar(512)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "自动匹配的【详情ID】（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "fromid_Similarity",
                "type": "numeric(6,3)",
                "default": "0",
                "des": "自动匹配的【详情ID】相似度"
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
        "name": "buyer",
        "des": "买家账户--主要用来以图搜货源",
        "db": "1688",
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
    {
        "name": "proList",
        "des": "1688商品列表",
        "db": "1688",
        "dbType": "sqlite",
        "sql": [
            "create unique index proList_fromid ON @.proList(@.fromid)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "saleNum",
                "type": "integer",
                "default": "0",
                "des": "销量---从详情页获取"
            },
            {
                "name": "unit",
                "type": "varchar(10)",
                "default": "",
                "des": "单位---从详情页获取"
            },
            {
                "name": "unitWeight",
                "type": "numeric(8,3)",
                "default": "0",
                "des": "单位重量---从详情页获取"
            },
            {
                "name": "deliveryLimit",
                "type": "tinyint",
                "default": "0",
                "des": "几天发货---从详情页获取"
            },
            {
                "name": "freight",
                "type": "numeric(8,3)",
                "default": "0",
                "des": "运费（说明：这个有点不准，但比没有强。）---从详情页获取"
            },
            {
                "name": "companyName",
                "type": "varchar(50)",
                "default": "",
                "des": "公司（如：义乌市彤鑫贸易有限公司）"
            },
            {
                "name": "province",
                "type": "varchar(20)",
                "default": "",
                "des": "发货地（如：浙江）"
            },
            {
                "name": "city",
                "type": "varchar(20)",
                "default": "",
                "des": "发货地（如：金华市）"
            },
            {
                "name": "imgUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "图片URL（如：https://cbu01.alicdn.com/O1CN019ACabW1kiR7VheE8G_!!2216523644717-0-cib.jpg）"
            },
            {
                "name": "subject",
                "type": "varchar(255)",
                "default": "",
                "des": "标题（如：跨境欧美创意眼睛烫钻钥匙扣时尚包包恶魔之眼流苏挂件）"
            },
            {
                "name": "companyUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "店铺URL（如：https://yisiya.1688.com）"
            },
            {
                "name": "brand",
                "type": "varchar(20)",
                "default": "",
                "des": "品牌（如：伊思雅）"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0 unique",
                "des": "详情ID"
            },
            {
                "name": "categoryId",
                "type": "integer",
                "default": "0",
                "des": "类目ID"
            },
            {
                "name": "categoryId1",
                "type": "integer",
                "default": "0",
                "des": "一级类目ID"
            },
            {
                "name": "state",
                "type": "bit",
                "default": "0",
                "des": "商品状态（0：未知；1：此商品不存在）"
            },
            {
                "name": "errorMsg",
                "type": "nvarchar(255)",
                "default": "",
                "des": "出错信息"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
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
        "name": "prodes",
        "des": "1688商品表-详情页展示",
        "db": "1688_prodes/|99",
        "dbType": "sqlite",
        "sql": [
            "create unique index prodes_fromid ON @.prodes(@.fromid)"
        ],
        //"update @.prodes set @.uptime=0",
        //"ALTER TABLE @.prodes ADD COLUMN @.currentPrices varchar(255)"
        //"ALTER TABLE @.prodes DROP COLUMN @.skuRangePrices"
        //"ALTER TABLE @.prodes ADD COLUMN @.isDes bit DEFAULT 0"
        //"ALTER TABLE @.prodes ADD COLUMN @.sku text",
        //"ALTER TABLE @.prodes ADD COLUMN @.attr text",
        //"ALTER TABLE @.prodes ADD COLUMN @.videoUrl varchar(255)",
        //                {
        //    "name": "currentPrices",
        //    "type": "varchar(255)",
        //    "default": "",
        //    "des": "价格起批量"
        //},

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
                "default": "0  unique",
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "isHash",
                "type": "bit",
                "default": "0",
                "des": "是否创建Hash值"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "详情页的内容"
            },
            {
                "name": "attr",
                "type": "text",
                "default": "",
                "des": "属性"
            },
            {
                "name": "sku",
                "type": "text",
                "default": "",
                "des": "商品价格相联信息（如：名称，折扣，价格，图片，库存）"
            },
            {
                "name": "attrPic",
                "type": "text",
                "default": "",
                "des": "属性图"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "放大镜图"
            },
            {
                "name": "attrPic_shopee",
                "type": "text",
                "default": "",
                "des": "属性图-上传到shopee后"
            },
            {
                "name": "pic_shopee",
                "type": "text",
                "default": "",
                "des": "放大镜图-上传到shopee后"
            },
            {
                "name": "desPic_shopee",
                "type": "text",
                "default": "",
                "des": "详情图-上传到shopee后"
            },
            {
                "name": "videoUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "镜大镜那里的视频地址"
            },
            {
                "name": "ExplanationVideo",
                "type": "varchar(255)",
                "default": "",
                "des": "讲解视频地址"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    ////////////////////////////////////////////////////////////////
    {
        "name": "pic",
        "des": "1688商品-放大镜图片",
        "db": "1688_img/|99",
        "dbType": "sqlite",
        "sql": [
            "create index pic_hash ON @.pic(@.hash)"
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
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
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
        "name": "attrPic",
        "des": "1688商品-属性图片",
        "db": "1688_img/|99",
        "dbType": "sqlite",
        "sql": [
            "create index attrPic_hash ON @.attrPic(@.hash)"
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
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
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
        "des": "1688商品-详情图片",
        "db": "1688_img/|99",
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
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
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