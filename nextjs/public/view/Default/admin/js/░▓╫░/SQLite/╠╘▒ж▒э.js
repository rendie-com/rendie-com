'use strict';
mssql = mssql.concat([
    {
        "name": "proList",
        "des": "淘宝商品列表",
        "db": "taobao",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "itemId",
                "type": "nvarchar(100)",
                "default": "0",
                "des": "商品ID(如：nODM6D4cof38MO3anKsmVQc0tP-BxwXY4IgwwRJOxJuz)"
            },
            {
                "name": "shortTitle",
                "type": "nvarchar(100)",
                "default": "",
                "des": "短标题(如：mo cercoo莫奈花园小径系列复古耳环)"
            },
            {
                "name": "categoryName",
                "type": "nvarchar(10)",
                "default": "",
                "des": "类目名(如：耳环)"
            },
            {
                "name": "levelOneCategoryName",
                "type": "nvarchar(50)",
                "default": "",
                "des": "类型名(如：饰品/流行首饰/时尚饰品新)"
            },
            {
                "name": "shopTitle",
                "type": "nvarchar(50)",
                "default": "",
                "des": "店名(如：cercoo奢蔻饰品旗舰店)"
            },
            {
                "name": "picUrl",
                "type": "nvarchar(255)",
                "default": "",
                "des": "图片地址(如：//img.alicdn.com/i2/3990918216/O1CN0116X3d22AYyta4xtcS_!!0-item_pic.jpg)"
            },
            {
                "name": "provcity",
                "type": "nvarchar(50)",
                "default": "",
                "des": "发货地(如：广东 深圳)"
            },
            {
                "name": "reservePrice",
                "type": "numeric(18,2)",
                "default": "0",
                "des": "原价（如：296.00）"
            },
            {
                "name": "sellerId",
                "type": "integer",
                "default": "0",
                "des": "店铺ID(如：3990918216)"
            },
            {
                "name": "title",
                "type": "nvarchar(255)",
                "default": "",
                "des": "标题(如：Mo&Cercoo莫奈花园小径系列复古流苏耳环s925银长款气质耳坠女款)"
            },
            {
                "name": "url",
                "type": "nvarchar(512)",
                "default": "",
                "des": "详情URL(如：https://api.keyouyun.com/tui/api/huo/item?u=Ly9zLmNsaWNrLnRhb2Jhby5jb20vdD9lPW0lM0QyJTI2cyUzRGFoMGp4MEYzT3o5dzR2RkI2dDJaMnVlRURyWVZWYTY0ZkNuRWtZSFUlMkIydHlJTnRrVWhzdjBCeGNFbWhreWh1MWpUajRLSzV0SElPUmJxVlF4OGdoamtpT3B0dWVXRjZHNEMzV1hlWiUyRjZrV0RKUklsMEJSSSUyRk1MbVFvSlFVV24wa2JBSiUyQjMwMFViTjFXWVVxT1V5M25laWU3NW9WUENPbzQlMkJ5TFJQRVo3RjczVWpkWGtLZGZjR3IzbW1lWUZXbjMydSUyRnphdUtrZlJNdXZkS3pXbnZVVlkydE54VUkzT3Z3RWlNJTJGbFNHJTJGYlpUaW1EWGQ0MnVtdkVPRGczWlEzUFdGeGlYdkRmOERhUnMlM0QmdW5pb25fbGVucz1sZW5zSWQlM0FPUFQlNDAxNzA3NTczMDU1JTQwMjEzM2NmZTFfMGRhM18xOGQ5MzQ5MGZlMF9iMDMwJTQwMDElNDBleUptYkc5dmNrbGtJam8yT1RNME9IMGll)"
            },
            {
                "name": "priceAfterCoupon",
                "type": "numeric(18,2)",
                "default": "0",
                "des": "优惠券后的价格（如：5.86）"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "详情ID（打开详情要用的ID，如：2744026324）"
            },
            {
                "name": "SaleNum",
                "type": "integer",
                "default": "0",
                "des": "已销售数量"
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
        "name": "product",
        "des": "同步已审核过的商品表",
        "db": "taobao",
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
                "name": "itemId",
                "type": "nvarchar(100)",
                "default": "0 unique",
                "des": "自动匹配的【详情ID】(如：BxwXY4IgwwRJOxJuz)"
            },
            {
                "name": "itemId_Similarity",
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
        "db": "taobao",
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
        "name": "prodes",
        "des": "淘宝商品表-详情页展示",
        "db": "taobao_prodes/|99",
        "dbType": "sqlite",
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
                "name": "data",
                "type": "text",
                "default": "",
                "des": "详情属性，价格，图片信息。（json格式）"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "详情内容"
            }
        ]
    },

]);