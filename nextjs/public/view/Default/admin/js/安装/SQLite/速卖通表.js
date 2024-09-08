'use strict';
mssql = mssql.concat([
    {
        "name": "discount",
        "des": "折扣（主要记录折扣占比，好给自己打折做参考）",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "discount",
                "type": "tinyint",
                "default": "0 unique",
                "des": "折扣（如：50% OFF,存值为：50）"
            },
            {
                "name": "count",
                "type": "integer",
                "default": "0",
                "des": "商品数量"
            }           
        ]
    },
    {
        "name": "brand",
        "des": "品牌",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
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
            },
            {
                "name": "name",
                "type": "varchar(50)",
                "default": "0 unique",
                "des": "品牌名称（如：TOMZN）"
            },
            {
                "name": "nameCn",
                "type": "varchar(50)",
                "default": "",
                "des": "品牌中文名称（如：TOMZN/同正）"
            },
            {
                "name": "location",
                "type": "varchar(30)",
                "default": "",
                "des": "品牌发源地（如：中国）"
            },
            {
                "name": "company",
                "type": "varchar(100)",
                "default": "",
                "des": "品牌注册人（如：浙江同正电气有限公司）"
            }
        ]
    },
    {
        "name": "gather",
        "des": "采集商品",
        "db": "aliexpress",
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
                "name": "iswin",
                "type": "bit",
                "default": "0",
                "des": "是否用软件采集"
            },
            {
                "name": "name",
                "type": "nvarchar(255)",
                "default": "",
                "des": "采集类目说明"
            },
            {
                "name": "note",
                "type": "nvarchar(255)",
                "default": "",
                "des": "采集配置信息说明"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "LastTime",
                "type": "integer",
                "default": "0",
                "des": "上次采集时间"
            },
            {
                "name": "code",
                "type": "text",
                "default": "",
                "des": "采集配置信息"
            }
        ]
    },
    {
        "name": "seller",
        "des": "卖家账户",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "提现人"
            },
            {
                "name": "isDefault",
                "type": "bit",
                "default": "0",
                "des": "是否默认账号（当你采购时就用的上）"
            },
            {
                "name": "time1",
                "type": "integer",
                "default": "0",
                "des": "【创建拼团】结束时间"
            },
            {
                "name": "time2",
                "type": "integer",
                "default": "0",
                "des": "【创建限时限量】结束时间"
            },
            {
                "name": "time3",
                "type": "integer",
                "default": "0",
                "des": "【创建全店铺打折】结束时间"
            },
            {
                "name": "time4",
                "type": "integer",
                "default": "0",
                "des": "【创建全店铺满立减】结束时间"
            },
            {
                "name": "time5",
                "type": "integer",
                "default": "0",
                "des": "【创建店铺优惠券】结束时间"
            },
            {
                "name": "msgLastTime",
                "type": "integer",
                "default": "0",
                "des": "站内信上次采集时间"
            },
            {
                "name": "gathertime",
                "type": "integer",
                "default": "0",
                "des": "订单上次采集时间"
            },
            {
                "name": "upProTime",
                "type": "integer",
                "default": "0",
                "des": "预设【更新商品时间】"
            },
            {
                "name": "binduserID",
                "type": "integer",
                "default": "0",
                "des": "绑定账户ID"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID（主要是导入数据索引ID不会跟着过来而设置的）"
            },
            {
                "name": "upperLimit",
                "type": "integer",
                "default": "0",
                "des": "上传上限"
            },
            {
                "name": "token",
                "type": "text",
                "default": "",
                "des": "取到的token的内容"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录的cookies信息"
            },
            {
                "name": "upmode",
                "type": "text",
                "default": "",
                "des": "【上传模式】数据格式:'{\"shop\":[],\"type\":[],\"types\":0,\"typesname\":\"\"}'"
            },
            {
                "name": "industry",
                "type": "nvarchar(255)",
                "default": "",
                "des": "主营行业"
            },
            {
                "name": "where",
                "type": "nvarchar(255)",
                "default": "",
                "des": "预设【上传条件】"
            },
            {
                "name": "Punish1",
                "type": "integer",
                "default": "0",
                "des": "交易违规;该类型累计周期为180天，30张黄牌将会被关闭账户"
            },
            {
                "name": "Punish2",
                "type": "integer",
                "default": "0",
                "des": "产品信息违规;该类型累计周期为180天，30张黄牌将会被关闭账户"
            },
            {
                "name": "Punish3",
                "type": "integer",
                "default": "0",
                "des": "知识产权禁限售；该类型累计周期为365天，30张黄牌将会被关闭账户"
            },
            {
                "name": "Punish4",
                "type": "integer",
                "default": "0",
                "des": "知识产权禁限售(第三方投诉);该类型累计周期为365天，单个品牌商投诉4次将会被关闭账户，当前展示您品牌商投诉处罚中次数最多的记录。"
            },
            {
                "name": "Punish5",
                "type": "integer",
                "default": "0",
                "des": "待查看处罚"
            },
            {
                "name": "Punish6",
                "type": "integer",
                "default": "0",
                "des": "可解除处罚"
            },
            {
                "name": "Punish7",
                "type": "integer",
                "default": "0",
                "des": "需申诉处理的处罚"
            },
            {
                "name": "Cash",
                "type": "Money",
                "default": "0",
                "des": "提现金额"
            },
            {
                "name": "dmrsaction",
                "type": "tinyint",
                "default": "1",
                "des": "商户评级(0:低于标准商户;1:标准商户;2:优秀商户;3:顶级商户;)----DH已经不有了，我这打算删除。"
            },
            {
                "name": "upshelf",
                "type": "integer",
                "default": "0",
                "des": "上架商品数量"
            },
            {
                "name": "upLimit",
                "type": "integer",
                "default": "0",
                "des": "上限数量"
            },
            {
                "name": "downshelf",
                "type": "integer",
                "default": "0",
                "des": "下架商品数量"
            },
            {
                "name": "NotThrough",
                "type": "integer",
                "default": "0",
                "des": "审核未通过数量"
            },
            {
                "name": "Pending",
                "type": "integer",
                "default": "0",
                "des": "待审核数量"
            },
            {
                "name": "Complaint",
                "type": "integer",
                "default": "0",
                "des": "品牌商投诉数量"
            },
            {
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示/隐藏"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "password",
                "type": "nvarchar(255)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "APPKEY",
                "type": "nvarchar(255)",
                "default": "",
                "des": "开发平台发布的APPKEY"
            },
            {
                "name": "APPSECRET",
                "type": "nvarchar(255)",
                "default": "",
                "des": "开发平台发布的APPSECRET"
            },
            {
                "name": "shippingModel",
                "type": "text",
                "default": "",
                "des": "预设运费模板【js型式】"
            },
            {
                "name": "SizeTemplate",
                "type": "text",
                "default": "",
                "des": "产品尺码模板代码"
            },
            {
                "name": "afterSaleID",
                "type": "nvarchar(32)",
                "default": "",
                "des": "预设售后模板"
            },
            {
                "name": "Group",
                "type": "text",
                "default": "",
                "des": "产品分组"
            },
            {
                "name": "note",
                "type": "nvarchar(255)",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "buyer",
        "des": "采购账户",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index @.from ON @.buyer(@.isDefault)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "isDefault",
                "type": "bit",
                "default": "0",
                "des": "是否默认账号（当你采购时就用的上）"
            },
            {
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "password",
                "type": "nvarchar(255)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "note",
                "type": "nvarchar(255)",
                "default": "",
                "des": "备注"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录的cookies信息"
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
        "name": "freight",
        "des": "免运费模板",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "freightID",
                "type": "nvarchar(15)",
                "default": "0",
                "des": "模板编码（在敦煌，用这个做模板名称,在敦煌创建运费模板最长只能15位）"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "0 unique",
                "des": "模板名称"
            },
            {
                "name": "freeCountry",
                "type": "nvarchar(255)",
                "default": "",
                "des": "免运费国家"
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
        "des": "速卖通分类表",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index pk_upid ON @.type(@.upid)",
            "create index pk_sort ON @.type(@.sort)",
            "create index pk_isleaf ON @.type(@.isleaf)",
            "create unique index pk_fromID ON @.type(@.fromID)"
        ],
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
                "name": "enname",
                "type": "varchar(255)",
                "default": "",
                "des": "分类名称（英文）"
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
                "name": "count1",
                "type": "integer",
                "default": "0",
                "des": "可上传（发往美国免运费，且未上传的商品。）"
            },
            {
                "name": "count2",
                "type": "integer",
                "default": "0",
                "des": "收运费（是发往美国收运费。）"
            },
            {
                "name": "count3",
                "type": "integer",
                "default": "0",
                "des": "已上传（发往美国免运费，且已上传的商品。）"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "bindShopee",
                "type": "integer",
                "default": "0",
                "des": "帮定Shopee的叶子类目【fromID】"
            },
            {
                "name": "isleaf",
                "type": "bit",
                "default": "0",
                "des": "是否叶子类目"
            }
        ]
    },
    {
        "name": "deliverytype",
        "des": "快递公司表",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Name",
                "type": "nvarchar(255)",
                "default": "",
                "des": "物流公司名称"
            },
            {
                "name": "bindDh",
                "type": "nvarchar(255)",
                "default": "",
                "des": "绑定到敦煌网"
            },
            {
                "name": "APIopen",
                "type": "nvarchar(100)",
                "default": "",
                "des": "物流公司代码"
            }
        ]
    },
    {
        "name": "country",
        "des": "国家地址",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index @.name ON @.country(@.name)",
            "create index @.upid ON @.country(@.upid)"
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
                "type": "nvarchar(20)",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "isleaf",
                "type": "bit",
                "default": "1",
                "des": "是否叶子类目(默认值为1)"
            },
            {
                "name": "countryid",
                "type": "nvarchar(10)",
                "default": "",
                "des": "国家代码"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "0",
                "des": "国家名称"
            },
            {
                "name": "upid",
                "type": "nvarchar(20)",
                "default": "0",
                "des": "父ID"
            },
            {
                "name": "des",
                "type": "nvarchar(255)",
                "default": "",
                "des": "描述"
            },
            {
                "name": "area",
                "type": "nvarchar(1)",
                "default": "",
                "des": "区域"
            },
            {
                "name": "chinaarea",
                "type": "nvarchar(10)",
                "default": "",
                "des": "区域洲"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序值"
            },
            {
                "name": "countrycode",
                "type": "nvarchar(3)",
                "default": "",
                "des": "国家代码"
            },
            {
                "name": "currency",
                "type": "nvarchar(3)",
                "default": "",
                "des": "币种"
            },
            {
                "name": "callingcode",
                "type": "nvarchar(5)",
                "default": "",
                "des": "国家区号代码"
            },
            {
                "name": "ipcount",
                "type": "integer",
                "default": "0",
                "des": "存国家的IP数量"
            }
        ]
    },
    {
        "name": "shop",
        "des": "速卖通店铺表",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index pk_Score ON @.shop(@.Score)",
            "create index pk_Followers ON @.shop(@.Followers)",
            "create index pk_UpTortNum ON @.shop(@.upTortNum)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0 unique",
                "des": "店铺ID"
            },
            {
                "name": "UpTortNum",
                "type": "integer",
                "default": "0",
                "des": "上传后侵权数量"
            },
            {
                "name": "count1",
                "type": "integer",
                "default": "0",
                "des": "商品总量"
            },
            {
                "name": "count2",
                "type": "integer",
                "default": "0",
                "des": "正常商品总量"
            },
            {
                "name": "replaceItem",
                "type": "text",
                "default": "",
                "des": "详情替换为空（正则表达式形式或【img:】形式）"
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
            },
            {
                "name": "Score",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "店铺评分"
            },
            {
                "name": "Followers",
                "type": "integer",
                "default": "0",
                "des": "店铺关注量"
            },
            {
                "name": "sellerId",
                "type": "integer",
                "default": "0",
                "des": "卖家ID(通过这个ID可以获取评分，关注量等)"
            },
            {
                "name": "name",
                "type": "nvarchar(255)",
                "default": "",
                "des": "店铺名称"
            }
        ]
    },
    {
        "name": "restriction",
        "des": "禁限",
        "db": "aliexpress",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "mode",
                "type": "tinyint",
                "default": "0",
                "des": "禁限方式(0:关键词禁限;1:类目禁限;2:店铺禁限)"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "关键词"
            },
            {
                "name": "type",
                "type": "nvarchar(20)",
                "default": "",
                "des": "禁限哪个类目"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "完整说明"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "time",
                "type": "integer",
                "default": "0",
                "des": "操作时间"
            }
        ]
    },
    {
        "name": "pro",
        "des": "速卖通商品表-（where要用字段）",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index pk_type ON @.pro(@.type)",
            "create index pk_hide ON @.pro(@.hide)",
            "create index pk_shopid ON @.pro(@.shopid)",
            "create index pk_isup ON @.pro(@.isUpDHgate)",
            "create index pk_Review ON @.pro(@.Review)",
            "create index pk_salenum ON @.pro(@.salenum)",
            "create index pk_ReviewsNum ON @.pro(@.ReviewsNum)",
            //"ALTER TABLE @.pro ADD CONSTRAINT FK_type_fromid FOREIGN KEY(@.type) REFERENCES @.type(@.fromid)",
            //"ALTER TABLE @.pro ADD CONSTRAINT FK_shop_shopid FOREIGN KEY(@.shopid) REFERENCES @.shop(@.shopid) on delete cascade"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "examine",
                "type": "tinyint",
                "default": "0",
                "des": "人工审核状态"
            },
            {
                "name": "proid",
                "type": "nvarchar(10)",
                "default": "0 unique",
                "des": "商品编码"
            },
            {
                "name": "keywords",
                "type": "nvarchar(255)",
                "default": "",
                "des": "meta标签里的keywords"
            },
            {
                "name": "description",
                "type": "nvarchar(512)",
                "default": "",
                "des": "meta标签里的description"
            },
            {
                "name": "attrValue",
                "type": "nvarchar(1024)",
                "default": "",
                "des": "属性值，主要用来禁限和搜索用的。（禁限：如【品牌名称】【产品接口HDMI--可能要授权才能用这个接口,但不确定，有机会就确认一下】在里面）"
            },
            {
                "name": "lotNum",
                "type": "integer",
                "default": "0",
                "des": "每包件数"
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": "商品分类ID"
            },
            {
                "name": "type1",
                "type": "integer",
                "default": "0",
                "des": "一级商品分类ID"
            },
            {
                "name": "type2",
                "type": "integer",
                "default": "0",
                "des": "二级商品分类ID"
            },
            {
                "name": "type3",
                "type": "integer",
                "default": "0",
                "des": "三级商品分类ID"
            },
            {
                "name": "typepath",
                "type": "nvarchar(255)",
                "default": "",
                "des": "商品分类路径（主要是为少查【分类表】）"
            },
            {
                "name": "name",
                "type": "nvarchar(255)",
                "default": "",
                "des": "商品名称"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0 unique",
                "des": "来源ID"
            },
            {
                "name": "SaleNum",
                "type": "integer",
                "default": "0",
                "des": "已销售数量"
            },
            {
                "name": "ReviewsNum",
                "type": "integer",
                "default": "0",
                "des": "评论数量"
            },
            {
                "name": "Review",
                "type": "numeric(2,1)",
                "default": "0",
                "des": "购买后客户给的评分"
            },
            {
                "name": "pic1",
                "type": "nvarchar(255)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "price",
                "type": "money",
                "default": "0",
                "des": "售价，当有多个价格时，该价格为平均价格"
            },
            {
                "name": "MinPrice",
                "type": "money",
                "default": "0",
                "des": "最小售价"
            },
            {
                "name": "MaxPrice",
                "type": "money",
                "default": "0",
                "des": "最大售价"
            },
            {
                "name": "Discount",
                "type": "money",
                "default": "0",
                "des": "折扣率（折）"
            },
            {
                "name": "isUpDHgate",
                "type": "bit",
                "default": "0",
                "des": "是否已被上传到敦煌网"
            },
            {
                "name": "isUpShopee",
                "type": "bit",
                "default": "0",
                "des": "是否已被上传到Shopee"
            },
            {
                "name": "isVideo",
                "type": "bit",
                "default": "0",
                "des": "是否有视频"
            },
            {
                "name": "Brand",
                "type": "nvarchar(50)",
                "default": "",
                "des": "品牌名称"
            },
            {
                "name": "ShipToAU",
                "type": "tinyint",
                "default": "0",
                "des": "发往【澳大利亚】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToRU",
                "type": "tinyint",
                "default": "0",
                "des": "发往【俄罗斯】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToUS",
                "type": "tinyint",
                "default": "0",
                "des": "发往【美国】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToCA",
                "type": "tinyint",
                "default": "0",
                "des": "发往【加拿大】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToIT",
                "type": "tinyint",
                "default": "0",
                "des": "发往【意大利】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToFR",
                "type": "tinyint",
                "default": "0",
                "des": "发往【法国】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToSE",
                "type": "tinyint",
                "default": "0",
                "des": "发往【瑞典】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToUK",
                "type": "tinyint",
                "default": "0",
                "des": "发往【英国】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToIN",
                "type": "tinyint",
                "default": "0",
                "des": "发往【印度】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToDE",
                "type": "tinyint",
                "default": "0",
                "des": "发往【德国】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToES",
                "type": "tinyint",
                "default": "0",
                "des": "发往【西班牙】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToBR",
                "type": "tinyint",
                "default": "0",
                "des": "发往【巴西】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToMY",
                "type": "tinyint",
                "default": "0",
                "des": "发往【马来西亚】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToNL",
                "type": "tinyint",
                "default": "0",
                "des": "发往【荷兰】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "ShipToIE",
                "type": "tinyint",
                "default": "0",
                "des": "发往【爱尔兰】（0:表示收运费;1:表示免运费;2:表示不到该国）"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID"
            },           
            {
                "name": "Unit",
                "type": "nvarchar(50)",
                "default": "",
                "des": "商品单位"
            },
            {
                "name": "time1",
                "type": "integer",
                "default": "0",
                "des": "扫描时间。主要判断【是否404】【是否已下架】"
            },
            {
                "name": "time2",
                "type": "integer",
                "default": "0",
                "des": "找出发往美国【运费太贵】的商品的扫描时间，当【运费模板】的【采商品时间】大于该时间，说明是要扫描的商品"
            },
            {
                "name": "timeUS",
                "type": "integer",
                "default": "0",
                "des": "发往【美国运费】更新时间"
            },
            {
                "name": "timeUK",
                "type": "integer",
                "default": "0",
                "des": "发往【英国运费】更新时间"
            },
            {
                "name": "timeFR",
                "type": "integer",
                "default": "0",
                "des": "发往【法国运费】更新时间"
            },
            {
                "name": "timeAU",
                "type": "integer",
                "default": "0",
                "des": "发往【澳大利亚运费】更新时间"
            },
            {
                "name": "timeRU",
                "type": "integer",
                "default": "0",
                "des": "发往【俄罗斯运费】更新时间"
            },
            {
                "name": "timeCA",
                "type": "integer",
                "default": "0",
                "des": "发往【加拿大运费】更新时间"
            },
            {
                "name": "timeIT",
                "type": "integer",
                "default": "0",
                "des": "发往【意大利运费】更新时间"
            },
            {
                "name": "timeSE",
                "type": "integer",
                "default": "0",
                "des": "发往【瑞典运费】更新时间"
            },
            {
                "name": "timeIN",
                "type": "integer",
                "default": "0",
                "des": "发往【印度运费】更新时间"
            },
            {
                "name": "timeDE",
                "type": "integer",
                "default": "0",
                "des": "发往【德国运费】更新时间"
            },
            {
                "name": "timeES",
                "type": "integer",
                "default": "0",
                "des": "发往【西班牙运费】更新时间"
            },
            {
                "name": "timeBR",
                "type": "integer",
                "default": "0",
                "des": "发往【巴西运费】更新时间"
            },
            {
                "name": "timeMY",
                "type": "integer",
                "default": "0",
                "des": "发往【马来西亚】更新时间"
            },
            {
                "name": "timeNL",
                "type": "integer",
                "default": "0",
                "des": "发往【荷兰】更新时间"
            },
            {
                "name": "timeIE",
                "type": "integer",
                "default": "0",
                "des": "发往【爱尔兰】更新时间"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": "修改时间"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示状态（0:显示;1:隐藏;2:数据错误;3:审核未通过;4:品牌商投诉;5:疑似侵权;6:禁卖品牌;7:重复商品;8:标题重复;9:首图重复;）"
            },
            {
                "name": "err",
                "type": "nvarchar(255)",
                "default": "",
                "des": "错误内容"
            },
            {
                "name": "ManualReview",
                "type": "tinyint",
                "default": "0",
                "des": "审核状态(0:未审核;1:审核通过;2:需要更新;3:需要替换;4:重新审核;)"
            }
        ]
    },
    {
        "name": "prodes",
        "des": "速卖通商品表-详情页展示",
        "db": "aliexpress_prodes/|50",
        "dbType": "sqlite",
        "sql": ["create unique index pk_proid ON @.prodes(@.proid)"],
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
                "default": "0 unique",
                "des": "商品编码"
            },
            {
                "name": "HistoryInfo",
                "type": "text",
                "default": "",
                "des": '历史价格。如：\
                [\
                    {\
                        minPriceUS:"美国最小价格",\
                        maxPriceUS:"美国最大价格",\
                        minPrice...:"其它最小价格",\
                        maxPrice...:"其它最大价格",\
                        Discount:"折扣",\
                        Review:"评分,"\
                        SaleNum:"销量",\
                        ReviewsNum:"评论数",\
                        time:"创建时间"\
                    },\
                    {\
                        minPriceUS:"美国最小价格",\
                        maxPriceUS:"美国最大价格",\
                        minPrice**:"其它最小价格",\
                        maxPrice**:"其它最大价格",\
                        Discount:"折扣",\
                        Review:"评分,"\
                        SaleNum:"销量",\
                        ReviewsNum:"评论数",\
                        time:"创建时间"\
                    },\
                    ......\
                ]'
            },
            {
                "name": "freight",
                "type": "text",
                "default": "",
                "des": "运费模板"
            },
            {
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            },
            {
                "name": "videoUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "视频地址"
            },
            {
                "name": "aeopAeProductPropertys",
                "type": "text",
                "default": "",
                "des": "自定义属性"
            },
            {
                "name": "aeopAeProductSKUs",
                "type": "text",
                "default": "",
                "des": "价格属性"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "商品图片"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "商品详情"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "商品备注"
            },
            {
                "name": "DHpic",
                "type": "text",
                "default": "",
                "des": "上传后，放大镜图片（把它单独复制出来，不管来源怎么变好手动修改）"
            },
            {
                "name": "DHattrPic",
                "type": "text",
                "default": "",
                "des": "上传后，敦煌属性中图片（把它单独复制出来，不管来源怎么变好手动修改）"
            },
            {
                "name": "DHdes",
                "type": "text",
                "default": "",
                "des": "上传后，敦煌详情，（把它单独复制出来，不管来源怎么变好手动修改）"
            },
            {
                "name": "DHdesPic",
                "type": "text",
                "default": "",
                "des": "上传后，敦煌详情图片，（把复制出来的详情图片，上传到敦煌，打上水印，并记录。主要是为了记录【DHdes】字段的原始图片，水印图片）"
            }
        ]
    },
    {
        "name": "typebind",
        "des": "速卖通类目绑定",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create unique index pk_smtType ON @.typebind(@.type)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "c0_300",
                "type": "numeric(4,2)",
                "default": "0",
                "des": "佣金率:订单金额[0-300]"
            },
            {
                "name": "c300_1000",
                "type": "numeric(4,2)",
                "default": "0",
                "des": "佣金率:订单金额[300-1000]"
            },
            {
                "name": "c1000_",
                "type": "numeric(4,2)",
                "default": "0",
                "des": "佣金率:订单金额[1000-]"
            },
            {
                "name": "time",
                "type": "integer",
                "default": "0",
                "des": "绑定时间"
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": "速卖通类目ID"
            },
            {
                "name": "dhType",
                "type": "nvarchar(18)",
                "default": "",
                "des": "绑定到敦煌类目ID"
            },
            {
                "name": "dhTypePath",
                "type": "varchar(255)",
                "default": "",
                "des": "绑定到敦煌类目完整路径（用于显示绑定了什么用的）"
            }
        ]
    },
    {
        "name": "attr",
        "des": "【速卖通】属性表",
        "db": "aliexpress",
        "dbType": "sqlite",
        "sql": [
            "create index pk_cateId ON @.attr(@.cateId)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "name",
                "type": "varchar(150)",
                "default": "",
                "des": "属性英文名"
            },
            {
                "name": "nameCn",
                "type": "nvarchar(150)",
                "default": "",
                "des": "属性中文名"
            },
            {
                "name": "attrId",
                "type": "integer",
                "default": "0",
                "des": "属性ID"
            },
            {
                "name": "cateId",
                "type": "integer",
                "default": "0",
                "des": "分类ID"
            },
            {
                "name": "buyAttr",
                "type": "bit",
                "default": "0",
                "des": "是否购买属性（购买时，必选项）"
            },

            {
                "name": "saleAttr",
                "type": "bit",
                "default": "0",
                "des": "是否销售属性（购买时，非必选项）"
            },
            {
                "name": "required",
                "type": "bit",
                "default": "0",
                "des": "是否必填"
            },
            {
                "name": "isother",
                "type": "bit",
                "default": "0",
                "des": "是否有other属性值"
            },
            {
                "name": "style",
                "type": "tinyint",
                "default": "0",
                "des": "类目选择样式(1：文本 2：图片 3：图文；)"
            },
            {
                "name": "defined",
                "type": "bit",
                "default": "0",
                "des": "属性的属性值是否可以自定义修改"
            },
            {
                "name": "ischild",
                "type": "bit",
                "default": "0",
                "des": "是否子属性（好加事件）"
            },
            {
                "name": "childUpId",
                "type": "integer",
                "default": "0",
                "des": "父属性值ID（好知道该组是从哪个属性值ID上出来的，就是子属性）"
            },
            {
                "name": "isshow",
                "type": "bit",
                "default": "0",
                "des": "初次是否显示(子属性会用上)"
            },
            {
                "name": "type",
                "type": "nvarchar(10)",
                "default": "",
                "des": "显示方式<br/>SMT:input:文字 list_box:单选类型 interval:单选类型 check_box:多选类型"
            },
            {
                "name": "sort",
                "type": "tinyint",
                "default": "0",
                "des": "排序（显示出来的时后很重要）"
            },
            {
                "name": "js",
                "type": "text",
                "default": "",
                "des": "js代码"
            }
        ]
    }
]);