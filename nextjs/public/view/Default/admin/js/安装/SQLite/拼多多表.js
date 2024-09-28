'use strict';
mssql = mssql.concat([
    {
        "name": "pifa",
        "des": "拼多多批发表",
        "db": "pinduoduo",
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
                "type": "nvarchar(512)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "goodsId",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "自动匹配的【详情ID】（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "goodsId_Similarity",
                "type": "numeric(6,3)",
                "default": "0",
                "des": "自动匹配的【详情ID】相似度"
            },
            {
                "name": "fromid_1688",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "1688-----自动匹配的【详情ID】（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "fromid_Similarity_1688",
                "type": "numeric(6,3)",
                "default": "0",
                "des": "1688------自动匹配的【详情ID】相似度"
            },
            {
                "name": "itemId_taobao",
                "type": "nvarchar(100)",
                "default": "0 unique",
                "des": "taobao------自动匹配的【详情ID】(如：BxwXY4IgwwRJOxJuz)"
            },
            {
                "name": "itemId_Similarity_taobao",
                "type": "numeric(6,3)",
                "default": "0",
                "des": "taobao------自动匹配的【详情ID】相似度"
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
        "name": "seller",
        "des": "卖家账户--主要用来以图搜货源",
        "db": "pinduoduo",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "店铺编号（如：549815999）"
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
                "name": "pifauser",
                "type": "varchar(64)",
                "default": "",
                "des": "批发用户名---识别登录用的（如：P59282456251）"
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
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示/隐藏"
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
        "name": "goodsList",
        "des": "商品列表",
        "db": "pinduoduo",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "goodsId",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "goodsName",
                "type": "nvarchar(255)",
                "default": "",
                "des": "标题（如：年年有鱼招财汽车钥匙扣女精致可爱韩创意包挂件钥匙链圈礼品批发【6天内发货】）"
            },
            {
                "name": "goodsImgUrl",
                "type": "nvarchar(255)",
                "default": "",
                "des": "图片地址（如：https://img.pddpic.com/mms-material-img/2022-02-08/ee596ee3-46a0-4e26-b7fb-32f42d3b777d.jpeg）"
            },
            {
                "name": "salesTipAmount",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "已售1432件（如：1432）"
            },
            {
                "name": "goodsStagePrices",
                "type": "nvarchar(1024)",
                "default": "",
                "des": "价格组（包括起批量和价格）"
            },
            {
                "name": "minDiscount",
                "type": "integer",
                "default": "0",
                "des": "9.5折（如：95）"
            },
            {
                "name": "mallName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "店铺名（如：朵朵创意饰品）"
            },
            {
                "name": "mallGoodsRegion",
                "type": "nvarchar(100)",
                "default": "",
                "des": "发货地（如：广东深圳）"
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
        "des": "拼多多商品表-详情页展示",
        "db": "pinduoduo_prodes/|10",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "goodsId",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "goodsSkuInfos",
                "type": "text",
                "default": "",
                "des": "购物车属性组"
            },
            {
                "name": "goodsCarouselInfos",
                "type": "text",
                "default": "",
                "des": "放大镜图片组"
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