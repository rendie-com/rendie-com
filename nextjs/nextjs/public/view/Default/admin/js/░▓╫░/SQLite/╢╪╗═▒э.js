'use strict';
mssql = mssql.concat([
    {
        //思路：俩个相同的大图相减，不一样的就是let的位置
        "name": "geetest",
        "des": "[geetest.com]验证码图片",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index @.leftMd5 ON @.geetest(@.leftMd5)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "leftMd5",
                "type": "varchar(32)",
                "default": "",
                "des": "大图左边的MD5（验证码大图，左边有很多一样的）"
            },
            {
                "name": "minPic",
                "type": "varchar(255)",
                "default": "0",
                "des": "小图地址"
            },
            {
                "name": "maxPic",
                "type": "varchar(255)",
                "default": "0",
                "des": "大图地址"
            },
            {
                "name": "top",
                "type": "integer",
                "default": "0",
                "des": "小图在大图的top位置（这个是已知的）"
            },
            {
                "name": "left",
                "type": "integer",
                "default": "0",
                "des": "小图在大图的left位置"
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
        "name": "beComplained",
        "des": "被投诉",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index @.PropertyType ON @.beComplained(@.PropertyType)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "reportid",
                "type": "integer",
                "default": "0",
                "des": "报告者ID"
            },
            {
                "name": "sellerID",
                "type": "integer",
                "default": "0",
                "des": "卖家ID"
            },
            {
                "name": "sellerUser",
                "type": "varchar(30)",
                "default": "",
                "des": "卖家用户"
            },
            {
                "name": "ProcessedBy",
                "type": "varchar(30)",
                "default": "",
                "des": "处理人"
            },
            {
                "name": "createTime",
                "type": "integer",
                "default": "0",
                "des": "投诉日期"
            },
            {
                "name": "completeTime",
                "type": "integer",
                "default": "0",
                "des": "完成时间"
            },
            {
                "name": "intelRightName",
                "type": "varchar(100)",
                "default": "",
                "des": "知识产权名称"
            },
            {
                "name": "reason",
                "type": "varchar(255)",
                "default": "",
                "des": "裁决原因"
            },
            {
                "name": "ReasonComplaint",
                "type": "varchar(255)",
                "default": "",
                "des": "投诉原因"
            },
            {
                "name": "PropertyType",
                "type": "varchar(30)",
                "default": "0",
                "des": "知识产权类型(注：默认值不为空，因为是索引)"
            },
            {
                "name": "PlaceRegistration",
                "type": "varchar(30)",
                "default": "",
                "des": "注册地"
            },
            {
                "name": "PropertyNumber",
                "type": "varchar(50)",
                "default": "",
                "des": "知识产权编号"
            },
            {
                "name": "PropertyProveName",
                "type": "varchar(255)",
                "default": "",
                "des": "知识产权证明(名称)"
            },
            {
                "name": "PropertyProveUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "知识产权证明(地址)"
            },
            {
                "name": "authorizationProveName",
                "type": "varchar(100)",
                "default": "",
                "des": "授权证明(名称)"
            },
            {
                "name": "authorizationProveUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "授权证明(地址)"
            },
            {
                "name": "otherProveName",
                "type": "varchar(100)",
                "default": "",
                "des": "其他文件(名称)"
            },
            {
                "name": "otherProveUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "其他文件(地址)"
            },
            {
                "name": "otherEmail",
                "type": "varchar(50)",
                "default": "",
                "des": "其它投诉信息(联系邮箱)"
            },
            {
                "name": "otherPhone",
                "type": "varchar(50)",
                "default": "",
                "des": "其它投诉信息(联系电话)"
            },
            {
                "name": "complainStatus",
                "type": "tinyint",
                "default": "0",
                "des": "投诉状态（2：等待被投诉方处理；3:等待投诉方处理;4等待DHgate裁决；5：投诉完结）"
            },
            {
                "name": "complainResult",
                "type": "tinyint",
                "default": "0",
                "des": "投诉结果（4：投诉成功；7：投诉失败）"
            },
            {
                "name": "itemcode",
                "type": "integer",
                "default": "0 unique",
                "des": "产品编号"
            },
            {
                "name": "reportCompanyName",
                "type": "varchar(50)",
                "default": "",
                "des": "投诉人"
            },
            {
                "name": "email",
                "type": "varchar(50)",
                "default": "",
                "des": "联系邮箱"
            }
        ]
    },
    {
        "name": "brand",
        "des": "品牌",
        "db": "dhgate",
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
                "name": "name",
                "type": "varchar(50)",
                "default": "0 unique",
                "des": "品牌名称"
            }
        ]
    },
    {
        "name": "keys",
        "des": "搜索词追踪",
        "db": "dhgate",
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
                "name": "keys",
                "type": "varchar(50)",
                "default": "0",
                "des": "关键词"
            },
            {
                "name": "searchIdx",
                "type": "integer",
                "default": "0",
                "des": "搜索热度"
            },
            {
                "name": "searchPopularity",
                "type": "integer",
                "default": "0",
                "des": "搜索人气"
            },
            {
                "name": "searchIdxChange",
                "type": "integer",
                "default": "0",
                "des": "热度变化"
            },
            {
                "name": "clickIdx",
                "type": "integer",
                "default": "0",
                "des": "点击量"
            },
            {
                "name": "clickSearchRate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "点击率"
            },
            {
                "name": "productNumber",
                "type": "integer",
                "default": "0",
                "des": "平台产品数"
            },
            {
                "name": "confirmVisitRate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "浏览-成交转化率"
            },
            {
                "name": "country",
                "type": "varchar(50)",
                "default": "0",
                "des": "国家(TOP3)"
            },
            {
                "name": "myRanking",
                "type": "integer",
                "default": "0",
                "des": "我的排名"
            },
            {
                "name": "myshop",
                "type": "varchar(50)",
                "default": "",
                "des": "我的排名店铺"
            },
            {
                "name": "rankingtime",
                "type": "integer",
                "default": "0",
                "des": "排名时间"
            }
        ]
    },
    {
        "name": "msguser",
        "des": "站内信用户",
        "db": "dhgate",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "seller",
                "type": "varchar(100)",
                "default": "",
                "des": "卖家账户"
            },
            {
                "name": "sellerId",
                "type": "integer",
                "default": "0",
                "des": "卖家账户fromID"
            },
            {
                "name": "keys",
                "type": "text",
                "default": "",
                "des": "买家商品关键词"
            },
            {
                "name": "types",
                "type": "text",
                "default": "",
                "des": "买家商品类目"
            },
            {
                "name": "buyer",
                "type": "varchar(100)",
                "default": "",
                "des": "买家账户(当【buyerId】为空的时后，该值为订单号ID(32位的那个)。主要是为了修复【buyerId】的值)"
            },
            {
                "name": "buyerId",
                "type": "varchar(32)",
                "default": "",
                "des": "买家账户ID（发站内信要用上）"
            },
            {
                "name": "buyerOrgId",
                "type": "varchar(32)",
                "default": "",
                "des": "买家账户原始ID（买家名称去重复）"
            },
            {
                "name": "time1",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "time2",
                "type": "integer",
                "default": "0",
                "des": "群发时间"
            },
            {
                "name": "time3",
                "type": "integer",
                "default": "0",
                "des": "站内信最后回复时间"
            }
        ]
    },
    {
        "name": "gather",
        "des": "采集商品",
        "db": "dhgate",
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
                "type": "varchar(255)",
                "default": "",
                "des": "采集类目说明"
            },
            {
                "name": "note",
                "type": "varchar(255)",
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
        "name": "shopanalysis",
        "des": "店铺分析",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index @.year ON @.shopanalysis(@.year)",
            "create index @.month ON @.shopanalysis(@.month)",
            "create index @.day ON @.shopanalysis(@.day)"//,"alter table @.shopanalysis add constraint pk_fromid_time unique(@.fromid,@.year,@.month,@.day)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Exposure",
                "type": "integer",
                "default": "0",
                "des": "搜索曝光量"
            },
            {
                "name": "Browse",
                "type": "integer",
                "default": "0",
                "des": "商铺浏览量"
            },
            {
                "name": "visitors",
                "type": "integer",
                "default": "0",
                "des": "访客数"
            },
            {
                "name": "money",
                "type": "money",
                "default": "0",
                "des": "成交金额"
            },
            {
                "name": "orderNum",
                "type": "integer",
                "default": "0",
                "des": "订单数"
            },
            {
                "name": "ConversionRate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "转化率(100.00%)"
            },
            {
                "name": "OnShelves",
                "type": "integer",
                "default": "0",
                "des": "已上架"
            },
            {
                "name": "DelayQuantity",
                "type": "integer",
                "default": "0",
                "des": "延期量"
            },
            {
                "name": "UploadVolume",
                "type": "integer",
                "default": "0",
                "des": "上传量"
            },
            {
                "name": "DelVolume",
                "type": "integer",
                "default": "0",
                "des": "删除量"
            },
            {
                "name": "UpdateVolume",
                "type": "integer",
                "default": "0",
                "des": "更新量"
            },
            {
                "name": "ServiceCapability",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "服务能力(100.00分)"
            },
            {
                "name": "Disputes",
                "type": "integer",
                "default": "0",
                "des": "纠纷中"
            },
            {
                "name": "Complaint",
                "type": "integer",
                "default": "0",
                "des": "投诉量"
            },
            {
                "name": "DeliverGoods",
                "type": "integer",
                "default": "0",
                "des": "发货量"
            },
            {
                "name": "Appropriate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "妥投率(100.00%)"
            },
            {
                "name": "AuditFailed",
                "type": "integer",
                "default": "0",
                "des": "审核未通过"
            },
            {
                "name": "year",
                "type": "integer",
                "default": "0",
                "des": "统计时间-年"
            },
            {
                "name": "month",
                "type": "tinyint",
                "default": "0",
                "des": "统计时间-月"
            },
            {
                "name": "day",
                "type": "tinyint",
                "default": "0",
                "des": "统计时间-日"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
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
                "name": "fromid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID(API账户表（APIaccount）表的fromid)"
            },
            {
                "name": "name",
                "type": "varchar(150)",
                "default": "",
                "des": "店铺名(API账户表（APIaccount）表的UserName)"
            }
        ]
    },
    {
        "name": "shopanalysis_day",
        "des": "店铺分析_所有店铺按天统计",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create unique index pk_day ON @.shopanalysis_day(@.day)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Exposure",
                "type": "integer",
                "default": "0",
                "des": "曝光量"
            },
            {
                "name": "Browse",
                "type": "integer",
                "default": "0",
                "des": "浏览量"
            },
            {
                "name": "ImgBrowse",
                "type": "integer",
                "default": "0",
                "des": "图片浏览量（放在详情页的图片）"
            },
            {
                "name": "visitors",
                "type": "integer",
                "default": "0",
                "des": "访客数"
            },
            {
                "name": "money",
                "type": "money",
                "default": "0",
                "des": "成交金额"
            },
            {
                "name": "orderNum",
                "type": "integer",
                "default": "0",
                "des": "订单数"
            },
            {
                "name": "ConversionRate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "转化率(100.00%)"
            },
            {
                "name": "OnShelves",
                "type": "integer",
                "default": "0",
                "des": "已上架"
            },
            {
                "name": "DelayQuantity",
                "type": "integer",
                "default": "0",
                "des": "延期量"
            },
            {
                "name": "UploadVolume",
                "type": "integer",
                "default": "0",
                "des": "上传量"
            },
            {
                "name": "DelVolume",
                "type": "integer",
                "default": "0",
                "des": "删除量"
            },
            {
                "name": "UpdateVolume",
                "type": "integer",
                "default": "0",
                "des": "更新量"
            },
            {
                "name": "ServiceCapability",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "服务能力(100.00分)"
            },
            {
                "name": "Disputes",
                "type": "integer",
                "default": "0",
                "des": "纠纷中"
            },
            {
                "name": "Complaint",
                "type": "integer",
                "default": "0",
                "des": "投诉量"
            },
            {
                "name": "DeliverGoods",
                "type": "integer",
                "default": "0",
                "des": "发货量"
            },
            {
                "name": "Appropriate",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "妥投率(100.00%)"
            },
            {
                "name": "AuditFailed",
                "type": "integer",
                "default": "0",
                "des": "审核未通过"
            },
            {
                "name": "day",
                "type": "integer",
                "default": "0 unique",
                "des": "统计时间-日。格式：20020304"
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
        "name": "countrybind",
        "des": "国家地址绑定",
        "db": "dhgate",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "addressA",
                "type": "varchar(255)",
                "default": "",
                "des": "DH地址"
            },
            {
                "name": "addressB",
                "type": "varchar(255)",
                "default": "",
                "des": "SMT地址"
            },
            {
                "name": "isleafB",
                "type": "bit",
                "default": "0",
                "des": "【地址B】是否叶子节点"
            }
        ]
    },
    {
        "name": "dailytasks",
        "des": "每天的任务",
        "db": "dhgate",
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
                "name": "time",
                "type": "integer",
                "default": "0 unique",
                "des": "任务时间(以天为单位)"
            },
            {
                "name": "isPurchaseWaitingDelivery",
                "type": "bit",
                "default": "0",
                "des": "是否延长采购到期时间"
            },
            {
                "name": "isProExtend",
                "type": "bit",
                "default": "0",
                "des": "是否延长商品有效期"
            },
            {
                "name": "isProInfringement",
                "type": "bit",
                "default": "0",
                "des": "是否处理商品侵权"
            },
            {
                "name": "isDunning",
                "type": "bit",
                "default": "0",
                "des": "是否催款"
            },
            {
                "name": "isShip",
                "type": "bit",
                "default": "0",
                "des": "是否发货"
            },
            {
                "name": "isRequest",
                "type": "bit",
                "default": "0",
                "des": "是否请款"
            },
            {
                "name": "PurchasePaymentNum",
                "type": "integer",
                "default": "0",
                "des": "采购付款数量"
            },
            {
                "name": "WaitingPurchaseNum",
                "type": "integer",
                "default": "0",
                "des": "等待采购数量"
            },
            {
                "name": "WaitingPurchaseAmount",
                "type": "Money",
                "default": "0",
                "des": "等待采购金额"
            },
            {
                "name": "PurchaseNotPaymentNum",
                "type": "integer",
                "default": "0",
                "des": "采购未付款数量"
            },
            {
                "name": "AmountReceived",
                "type": "Money",
                "default": "0",
                "des": "订单实收金额"
            },
            {
                "name": "PurchasePaymentAmount",
                "type": "Money",
                "default": "0",
                "des": "采购付款金额"
            },
            {
                "name": "PurchaseNotPaymentAmount",
                "type": "Money",
                "default": "0",
                "des": "采购未付款金额"
            },
            {
                "name": "isMsgNum",
                "type": "bit",
                "default": "0",
                "des": "是否处理完站内信"
            },
            {
                "name": "isProblemorderNum",
                "type": "bit",
                "default": "0",
                "des": "是否处理完单题订单"
            },
            {
                "name": "note",
                "type": "varchar(150)",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "msghelp",
        "des": "站内信帮助",
        "db": "dhgate",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "note",
                "type": "varchar(255)",
                "default": "",
                "des": "帮助说明"
            },
            {
                "name": "en",
                "type": "text",
                "default": "",
                "des": "英文内容"
            },
            {
                "name": "cn",
                "type": "text",
                "default": "",
                "des": "中文内容"
            },
            {
                "name": "time1",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            }
        ]
    },
    {
        "name": "deliverytype",
        "des": "快递公司表",
        "db": "dhgate",
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
                "type": "varchar(255)",
                "default": "",
                "des": "物流公司名称"
            },
            {
                "name": "bindSmt",
                "type": "varchar(255)",
                "default": "",
                "des": "绑定到速卖通"
            },
            {
                "name": "APIopen",
                "type": "varchar(100)",
                "default": "",
                "des": "物流公司代码"
            }
        ]
    },
    {
        "name": "country",
        "des": "国家地址",
        "db": "dhgate",
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
                "type": "varchar(20)",
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
                "type": "varchar(10)",
                "default": "",
                "des": "国家代码"
            },
            {
                "name": "name",
                "type": "varchar(100)",
                "default": "0",
                "des": "国家名称"
            },
            {
                "name": "upid",
                "type": "varchar(20)",
                "default": "0",
                "des": "父ID"
            },
            {
                "name": "des",
                "type": "varchar(255)",
                "default": "",
                "des": "描述"
            },
            {
                "name": "area",
                "type": "varchar(1)",
                "default": "",
                "des": "区域"
            },
            {
                "name": "chinaarea",
                "type": "varchar(10)",
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
                "type": "varchar(3)",
                "default": "",
                "des": "国家代码"
            },
            {
                "name": "currency",
                "type": "varchar(3)",
                "default": "",
                "des": "币种"
            },
            {
                "name": "callingcode",
                "type": "varchar(5)",
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
        "name": "withdraw",
        "des": "提现",
        "db": "dhgate",
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
                "type": "integer",
                "default": "0",
                "des": "来源id（如：来自哪个账号）"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "提现时间"
            },
            {
                "name": "amount",
                "type": "numeric(10,2)",
                "default": "0",
                "des": "提现金额： US $167.00 "
            },
            {
                "name": "rate",
                "type": "numeric(8,4)",
                "default": "0",
                "des": "当日汇率： 6.9439 (USD/RMB)"
            },
            {
                "name": "Fee",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "手续费：US $1.67"
            },
            {
                "name": "Money",
                "type": "numeric(10,2)",
                "default": "0",
                "des": "实际提取金额： RMB ￥1148.03 "
            },
            {
                "name": "IsReceived",
                "type": "tinyint",
                "default": "0",
                "des": "是否到账"
            },
            {
                "name": "note",
                "type": "varchar(250)",
                "default": "",
                "des": "提现账户： 人民币账户 中国邮政储蓄 621799******9507"
            }
        ]
    },
    {
        "name": "seller",
        "des": "卖家账户",
        "db": "dhgate",
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
                "type": "varchar(100)",
                "default": "",
                "des": "提现人"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录用的cookies信息"
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
                "name": "time6",
                "type": "integer",
                "default": "0",
                "des": "【满几件打几折】结束时间"
            },
            {
                "name": "time7",
                "type": "integer",
                "default": "0",
                "des": "【创建智能优惠券】结束时间"
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
                "default": "0 unique",
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
                "name": "upmode",
                "type": "text",
                "default": "",
                "des": "【上传模式】数据格式:'{\"shop\":[],\"type\":[],\"types\":0,\"typesname\":\"\"}'"
            },
            {
                "name": "industry",
                "type": "varchar(255)",
                "default": "",
                "des": "主营行业"
            },
            {
                "name": "where",
                "type": "varchar(255)",
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
                "des": "不要了。。。。。。。。知识产权禁限售(第三方投诉);该类型累计周期为365天，单个品牌商投诉4次将会被关闭账户，当前展示您品牌商投诉处罚中次数最多的记录。"
            },
            {
                "name": "Punish5",
                "type": "integer",
                "default": "0",
                "des": "不要了。。。。。。。。待查看处罚"
            },
            {
                "name": "DHtotal",
                "type": "integer",
                "default": "0",
                "des": "DH商品总数量"
            },
            {
                "name": "total",
                "type": "integer",
                "default": "0",
                "des": "本地商品总数量"
            },
            {
                "name": "Cash1",
                "type": "Money",
                "default": "0",
                "des": "可用余额"
            },
            {
                "name": "Cash2",
                "type": "Money",
                "default": "0",
                "des": "冻结余额"
            },
            {
                "name": "Cash3",
                "type": "Money",
                "default": "0",
                "des": "账户欠款"
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
                "des": "品牌商投诉数量---要弃用"
            },
            {
                "name": "UserName",
                "type": "varchar(100)",
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
                "type": "varchar(255)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "APPKEY",
                "type": "varchar(255)",
                "default": "",
                "des": "开发平台发布的APPKEY"
            },
            {
                "name": "APPSECRET",
                "type": "varchar(255)",
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
                "type": "varchar(32)",
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
                "type": "varchar(255)",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "buyer",
        "des": "买家账户",
        "db": "dhgate",
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
                "type": "varchar(100)",
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
                "type": "varchar(255)",
                "default": "",
                "des": "密码"
            },
            {
                "name": "note",
                "type": "varchar(255)",
                "default": "",
                "des": "备注"
            }
        ]
    },
    {
        "name": "msg",
        "des": "站内信表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_fromuserid ON @.msg(@.fromuserid)",
            "create index pk_msgType ON @.msg(@.msgType)",
            "create index pk_param ON @.msg(@.param)",
            "create unique index pk_fromID ON @.msg(@.fromID)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "userid",
                "type": "integer",
                "default": "0",
                "des": "用户ID(如:小明有三个敦煌账户，那【用户ID】表式小明)"
            },
            {
                "name": "fromuser",
                "type": "varchar(100)",
                "default": "",
                "des": "来源用户(敦煌账户名)"
            },
            {
                "name": "fromuserid",
                "type": "integer",
                "default": "0",
                "des": "来源用户ID(敦煌账户名，的来源ID，即：fromid)"
            },
            {
                "name": "param",
                "type": "varchar(32)",
                "default": "",
                "des": "取值说明：当msgType=001时，此值为产品编码（即proid），当msgType =002时此值为订单号，其余为空值"
            },
            {
                "name": "recieverId",
                "type": "varchar(32)",
                "default": "",
                "des": "收信人systemuserbaseid 示例值：402880f100f59ccd0100f59cd37d0005"
            },
            {
                "name": "senderId",
                "type": "varchar(32)",
                "default": "",
                "des": "发送人的systemuserbaseid"
            },
            {
                "name": "PurchaseURL",
                "type": "varchar(255)",
                "default": "",
                "des": "采购URL"
            },
            {
                "name": "PurchaseNote",
                "type": "varchar(255)",
                "default": "",
                "des": "采购备注"
            },
            {
                "name": "receiverRead",
                "type": "bit",
                "default": "0",
                "des": "收信人是否已读"
            },
            {
                "name": "receiverMark",
                "type": "bit",
                "default": "0",
                "des": "收信人是否标记"
            },
            {
                "name": "receiverStatus",
                "type": "bit",
                "default": "0",
                "des": "收信人状态"
            },
            {
                "name": "senderStatus",
                "type": "bit",
                "default": "0",
                "des": "发送人状态"
            },
            {
                "name": "senderMark",
                "type": "bit",
                "default": "0",
                "des": "发送人是否标记"
            },
            {
                "name": "senderRead",
                "type": "bit",
                "default": "0",
                "des": "发送人是否已读"
            },
            {
                "name": "msgType",
                "type": "varchar(3)",
                "default": "",
                "des": "类型 001=买卖家消息-询盘,002=买卖家消息-订单,003=买卖家消息-其它,004=系统消息-订单,005=系统消息-产品,006=系统消息-付款/退款,007=系统消息-促销,008=系统消息-账户,009=系统消息-其它,010=平台公告-活动宣传,011=平台公告-政策通知,012=平台公告-商品营销,013=平台公告-其它"
            },
            {
                "name": "Sender",
                "type": "varchar(150)",
                "default": "",
                "des": "消息发送人"
            },
            {
                "name": "receiver",
                "type": "varchar(150)",
                "default": "",
                "des": "消息接收人"
            },
            {
                "name": "SendTime",
                "type": "integer",
                "default": "0",
                "des": "短消息时间"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": "短消息标题"
            },
            {
                "name": "msgreplycount",
                "type": "integer",
                "default": "0",
                "des": "回复数"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0 unique",
                "des": "来源ID"
            },
            {
                "name": "Flag",
                "type": "integer",
                "default": "0",
                "des": "短消息状态 inbox收信箱,outbox发信箱,issend已发送,recycle废件箱"
            },
            {
                "name": "DelR",
                "type": "integer",
                "default": "0",
                "des": "删除回复"
            },
            {
                "name": "DelS",
                "type": "integer",
                "default": "0",
                "des": "0未操作， 1发送者删除， 2发送者从回收站删除"
            },
            {
                "name": "IsSend",
                "type": "integer",
                "default": "0",
                "des": "是否发送 0草稿 1已发送"
            },
            {
                "name": "isQA",
                "type": "tinyint",
                "default": "0",
                "des": "采购问答:0未提问；1暂不处理；2已提问；3已回答；"
            }
        ]
    },
    {
        "name": "msgdes",
        "des": "站内信表",
        "db": "dhgatemsgdes",
        "dbType": "sqlite",
        "sql": [
            "create unique index pk_fromID ON @.msgdes(@.fromID)"
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
                "default": "0 unique",
                "des": "来源ID"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "短消息内容"
            }
        ]
    },
    {
        "name": "ordermonth",
        "des": "订单按月统计",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create unique index pk_Month ON @.ordermonth(@.Month)",
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "Month",
                "type": "integer",
                "default": "0 unique",
                "des": "月份；如：202203"
            },
            {
                "name": "sumOrder",
                "type": "integer",
                "default": "0",
                "des": "订单数，只要下单就算"
            },
            {
                "name": "MoneyTotal",
                "type": "Money",
                "default": "0",
                "des": "订单总金额(实收金额)"
            },
            {
                "name": "order_102111_111111",
                "type": "Money",
                "default": "0",
                "des": "已收款金额(【交易成功】和【交易关闭】的所有数据)"
            },
            {
                "name": "orderRefund",
                "type": "Money",
                "default": "0",
                "des": "订单退款"
            },
            {
                "name": "order_111000",
                "type": "Money",
                "default": "0",
                "des": "订单取消金额"
            },
            {
                "name": "order_111000_count",
                "type": "integer",
                "default": "0",
                "des": "订单取消数量"
            },
            {
                "name": "order_4",
                "type": "Money",
                "default": "0",
                "des": "纠纷订单金额（'105001','106001','106003','105002'）"
            },
            {
                "name": "order_4count",
                "type": "integer",
                "default": "0",
                "des": "纠纷订单数量"
            },
            {
                "name": "PurchaseCost",
                "type": "Money",
                "default": "0",
                "des": "采购金额"
            },
            {
                "name": "PurchaseRefund",
                "type": "Money",
                "default": "0",
                "des": "采购退款金额"
            },
            {
                "name": "order_3",
                "type": "Money",
                "default": "0",
                "des": "未入账"
            },
            {
                "name": "order_3count",
                "type": "integer",
                "default": "0",
                "des": "未入账数量"
            },
            {
                "name": "order_078",
                "type": "Money",
                "default": "0",
                "des": "未采购金额"
            },
            {
                "name": "order_078count",
                "type": "integer",
                "default": "0",
                "des": "未采购金额数量"
            },
            {
                "name": "order_Purchase8",
                "type": "Money",
                "default": "0",
                "des": "亏本金额"
            },
            {
                "name": "order_Purchase8count",
                "type": "integer",
                "default": "0",
                "des": "亏本金额数量"
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
        ]
    },
    {
        "name": "order",
        "des": "订单表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_Status ON @.order(@.Status)",
            "create index pk_purchasestatus ON @.order(@.purchasestatus)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "isApplyMoney",
                "type": "bit",
                "default": "0",
                "des": "是否请款"
            },
            {
                "name": "BusinessBuyer",
                "type": "bit",
                "default": "0",
                "des": "是否,即平均客单价大于150美金的海外零售商或公司采购型买家"
            },
            {
                "name": "isCuiMoney",
                "type": "bit",
                "default": "0",
                "des": "是否催款"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "入录时间，记录这条数据什么时间添加的。"
            },
            {
                "name": "PurchaseRemark",
                "type": "text",
                "default": "",
                "des": "采购备注"
            },
            {
                "name": "CommissionTime",
                "type": "integer",
                "default": "0",
                "des": "提成时间"
            },
            {
                "name": "updateDate",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
            },
            {
                "name": "PurchaseTime",
                "type": "integer",
                "default": "0",
                "des": "采购时间"
            },
            {
                "name": "PurchaseProcessingTime",
                "type": "integer",
                "default": "0",
                "des": "采购处理时间"
            },
            {
                "name": "PurchaseWaitingDelivery",
                "type": "integer",
                "default": "0",
                "des": "采购订单到达时间"
            },
            {
                "name": "PurchaseRefundTime",
                "type": "integer",
                "default": "0",
                "des": "采购退款成功时间"
            },
            {
                "name": "itemTotalPrice",
                "type": "Money",
                "default": "0",
                "des": "产品总计"
            },
            {
                "name": "gatewayFee",
                "type": "Money",
                "default": "0",
                "des": "支付手续费"
            },
            {
                "name": "PurchaseRefund",
                "type": "Money",
                "default": "0",
                "des": "采购退款"
            },
            {
                "name": "orderRefund",
                "type": "Money",
                "default": "0",
                "des": "订单退款"
            },
            {
                "name": "PurchaseCost",
                "type": "Money",
                "default": "0",
                "des": "采购成本"
            },
            {
                "name": "fromuser",
                "type": "varchar(100)",
                "default": "",
                "des": "来源用户(用于记住是从哪个用户采集过来的数据)"
            },
            {
                "name": "fromuserid",
                "type": "integer",
                "default": "0",
                "des": "来源用户ID(同上)"
            },
            {
                "name": "orderFrom",
                "type": "varchar(20)",
                "default": "",
                "des": "订单来源：英语站"
            },
            {
                "name": "ArrivalTime",
                "type": "integer",
                "default": "0",
                "des": "运达时间(天)"
            },
            {
                "name": "UserName",
                "type": "varchar(100)",
                "default": "",
                "des": "买家的用户名"
            },
            {
                "name": "UserLevel",
                "type": "varchar(10)",
                "default": "",
                "des": "买家的用户名等级"
            },
            {
                "name": "fromHead",
                "type": "varchar(100)",
                "default": "",
                "des": "来源负责人(谁来负责来源用户)"
            },
            {
                "name": "userid",
                "type": "integer",
                "default": "0",
                "des": "用户ID(如:小明有三个敦煌账户，那【用户ID】表式小明)"
            },
            {
                "name": "lastName",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名(姓)"
            },
            {
                "name": "eClearanceCode",
                "type": "varchar(50)",
                "default": "",
                "des": "电子结算代码(当国家为韩国时要填写这个)"
            },
            {
                "name": "buyerId",
                "type": "varchar(32)",
                "default": "",
                "des": "买家ID（示例值：ff808081416839d5014168e43ab30033）"
            },
            {
                "name": "orderId32",
                "type": "varchar(32)",
                "default": "",
                "des": "订单32位ID（示例值：ff808081416839d5014168e43ab30033,在【智能崔款】时和【修改运单号】时有用）"
            },
            {
                "name": "firstName",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名(名)"
            },
            {
                "name": "PurchaseorderId",
                "type": "varchar(255)",
                "default": "",
                "des": "采购单号"
            },
            {
                "name": "PurchaseUserName",
                "type": "varchar(50)",
                "default": "",
                "des": "采购用户"
            },
            {
                "name": "PurchaseShipping",
                "type": "varchar(150)",
                "default": "",
                "des": "采购运费"
            },
            {
                "name": "PurchaseStatus",
                "type": "tinyint",
                "default": "0",
                "des": "采购状态（0:待采购;1:待付款;2:已付款;3:退款中;4:取消;5:已付款（问题订单）;6:待取消（废弃）;7:问题订单(未发货);8:假运单号(已发货);9:申请二次采购;10:退款完成;11:采购退款失败;）"
            },
            {
                "name": "PurchaseorderStatus",
                "type": "varchar(50)",
                "default": "",
                "des": "采购订单状态（同步采购后的订单状态）"
            },
            {
                "name": "deliveryDeadline",
                "type": "integer",
                "default": "0",
                "des": "发货截止时间"
            },
            {
                "name": "city",
                "type": "varchar(50)",
                "default": "",
                "des": "买家城市"
            },
            {
                "name": "country",
                "type": "varchar(50)",
                "default": "",
                "des": "买家国家"
            },
            {
                "name": "orderID",
                "type": "varchar(15)",
                "default": "0 unique",
                "des": "订单编号"
            },
            {
                "name": "province",
                "type": "varchar(50)",
                "default": "",
                "des": "买家州/省"
            },
            {
                "name": "vatNumber",
                "type": "varchar(50)",
                "default": "",
                "des": "税号"
            },
            {
                "name": "abn",
                "type": "varchar(20)",
                "default": "",
                "des": "识别号码"
            },
            {
                "name": "commissionAmount",
                "type": "Money",
                "default": "0",
                "des": "佣金金额(来源平台收的金额)"
            },
            {
                "name": "MoneyTotal",
                "type": "Money",
                "default": "0",
                "des": "订单总金额(实收金额)"
            },
            {
                "name": "MoneyGoods",
                "type": "Money",
                "default": "0",
                "des": "订单总额(加运费后的价格)"
            },
            {
                "name": "Remark",
                "type": "text",
                "default": "",
                "des": "买家备注"
            },
            {
                "name": "MoneyReceipt",
                "type": "Money",
                "default": "0",
                "des": "已收款"
            },
            {
                "name": "reducePrice",
                "type": "Money",
                "default": "0",
                "des": "订单降价金额"
            },
            {
                "name": "risePrice",
                "type": "Money",
                "default": "0",
                "des": "订单涨价金额"
            },
            {
                "name": "BeginDate",
                "type": "integer",
                "default": "0",
                "des": "开始服务日期"
            },
            {
                "name": "InputTime",
                "type": "integer",
                "default": "0",
                "des": "录入时间"
            },
            {
                "name": "ContactMan",
                "type": "varchar(50)",
                "default": "",
                "des": "收货人姓名"
            },
            {
                "name": "address",
                "type": "varchar(255)",
                "default": "",
                "des": "收货地址"
            },
            {
                "name": "address2",
                "type": "varchar(255)",
                "default": "",
                "des": "收货地址2"
            },
            {
                "name": "Zip",
                "type": "varchar(10)",
                "default": "",
                "des": "邮编"
            },
            {
                "name": "Phone",
                "type": "varchar(50)",
                "default": "",
                "des": "联系电话"
            },
            {
                "name": "PaymentType",
                "type": "integer",
                "default": "0",
                "des": "付款方式"
            },
            {
                "name": "DeliverType",
                "type": "varchar(100)",
                "default": "",
                "des": "送货方式 (存放物流APIopen，买家选择物流方式)"
            },
            {
                "name": "Status",
                "type": "varchar(50)",
                "default": "",
                "des": "<table><tr class=\"thead2\"><td colspan=\"2\">订单状态【速卖通】</td></tr><tr align=\"center\"><td>状态</td><td>说明</td></tr><tr align=\"center\"><td>PLACE_order_SUCCESS</td><td>等待买家付款</td></tr><tr align=\"center\"><td>IN_CANCEL</td><td>买家申请取消</td></tr><tr align=\"center\"><td>WAIT_SELLER_SEND_GOODS</td><td>等待您发货</td></tr><tr align=\"center\"><td>SELLER_PART_SEND_GOODS</td><td>部分发货</td></tr><tr align=\"center\"><td>WAIT_BUYER_ACCEPT_GOODS</td><td>等待买家收货</td></tr><tr align=\"center\"><td>FUND_PROCESSING</td><td>买家确认收货后，等待退放款处理的状态</td></tr><tr align=\"center\"><td>FINISH</td><td>已结束的订单</td></tr><tr align=\"center\"><td>IN_ISSUE</td><td>含纠纷的订单</td></tr><tr align=\"center\"><td>IN_FROZEN</td><td>冻结中的订单</td></tr><tr align=\"center\"><td>WAIT_SELLER_EXAMINE_MONEY</td><td>等待您确认金额</td></tr><tr align=\"center\"><td>RISK_CONTROL</td><td>订单处于风控24小时中，从买家在线支付完成后开始，持续24小时</td></tr><tr class=\"thead2\"><td colspan=\"2\">订单状态【敦煌网/本站】</td></tr><tr align=\"center\"><td>状态</td><td>说明</td></tr><tr align=\"center\"><td>111000</td><td>订单取消</td></tr><tr align=\"center\"><td>101003</td><td>等待买家付款</td></tr><tr align=\"center\"><td>102001</td><td>买家已付款，等待平台确认</td></tr><tr align=\"center\"><td>103001</td><td>等待您发货</td></tr><tr align=\"center\"><td>105001</td><td>买家退款中，等待协商结果</td></tr><tr align=\"center\"><td>105002</td><td>退款协议已达成</td></tr><tr align=\"center\"><td>105003</td><td>部分退款后，等待发货</td></tr><tr align=\"center\"><td>105004</td><td>买家取消退款申请</td></tr><tr align=\"center\"><td>103002</td><td>已部分发货</td></tr><tr align=\"center\"><td>101009</td><td>等待买家确认收货</td></tr><tr align=\"center\"><td>106001</td><td>退款/退货协商中，等待协议达成</td></tr><tr align=\"center\"><td>106002</td><td>买家投诉到平台</td></tr><tr align=\"center\"><td>106003</td><td>协议已达成，执行中</td></tr><tr align=\"center\"><td>102006</td><td>已确认收货</td></tr><tr align=\"center\"><td>102007</td><td>超过预定期限，自动确认收货</td></tr><tr align=\"center\"><td>102111</td><td>交易成功</td></tr><tr align=\"center\"><td>111111</td><td>交易关闭</td></tr></table>"
            },
            {
                "name": "ChargeDeliver",
                "type": "Money",
                "default": "0",
                "des": "运费"
            },
            {
                "name": "UseCouponMoney",
                "type": "Money",
                "default": "0",
                "des": "DH优惠券"
            },
            {
                "name": "PayTime",
                "type": "integer",
                "default": "0",
                "des": "支付时间"
            },
            {
                "name": "DeliveryDate",
                "type": "integer",
                "default": "0",
                "des": "发货时间"
            },
            {
                "name": "buyerConfirmDate",
                "type": "integer",
                "default": "0",
                "des": "买家确认收货时间"
            },
            {
                "name": "inAccountDate",
                "type": "integer",
                "default": "0",
                "des": "入账时间"
            },
            {
                "name": "cancelDate",
                "type": "integer",
                "default": "0",
                "des": "交易取消时间"
            },
            {
                "name": "warnReason",
                "type": "varchar(255)",
                "default": "",
                "des": "警告原因(对于来源平台，会给订单的警告)"
            }
        ]
    },
    {
        "name": "orderitem",
        "des": "订购项目表",
        "db": "dhgate",
        "dbType": "sqlite",
        //"sql": ["create index pk_orderId ON @.orderitem(@.orderId)","alter table @.orderitem add constraint FK_orderitem foreign key(@.orderID) references @.order(@.orderID) on delete cascade"],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "orderID",
                "type": "varchar(15)",
                "default": "0",
                "des": "订单ID"
            },
            {
                "name": "ProID",
                "type": "varchar(20)",
                "default": "",
                "des": "产品编码（非产品ID,本数据库编码）"
            },
            {
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID（产品ID，下单时的来源ID）"
            },
            {
                "name": "CostPrice",
                "type": "money",
                "default": "0",
                "des": "成本单价"
            },
            {
                "name": "RealPrice",
                "type": "money",
                "default": "0",
                "des": "实际销售价"
            },
            {
                "name": "Amount",
                "type": "integer",
                "default": "0",
                "des": "订购数量"
            },
            {
                "name": "Remark",
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "AttributeCart",
                "type": "varchar(255)",
                "default": "",
                "des": "产品属性"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "图片"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "PurchaseURL",
                "type": "varchar(255)",
                "default": "",
                "des": "采购链接"
            }
        ]
    },
    {
        "name": "logdeliver",
        "des": "发退货日志表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_queryState ON @.logdeliver(@.queryState)",
            "create index pk_shopID ON @.logdeliver(@.shopID)",
            "create unique index pk_orderID ON @.logdeliver(@.orderID)"//,			"alter table @.logdeliver add constraint FK_logdeliver foreign key(@.orderID) references @.order(@.orderID) on delete cascade"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "orderID",
                "type": "varchar(15)",
                "default": "0 unique",
                "des": "订单ID"
            },
            {
                "name": "shopName",
                "type": "varchar(30)",
                "default": "",
                "des": "卖家店铺名"
            },
            {
                "name": "shopID",
                "type": "integer",
                "default": "0",
                "des": "卖家店铺名ID"
            },
            {
                "name": "DeliverDate",
                "type": "integer",
                "default": "0",
                "des": "发货日期"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "更新时间"
            },
            {
                "name": "queryState",
                "type": "tinyint",
                "default": "0",
                "des": "查询物流状态(0:未查询;1:【菜鸟】查询不到;2:【菜鸟】揽收;3:【菜鸟】运输中;4:【菜鸟】妥投失败;5:【菜鸟】妥投;6:【17track】查询不到;)"
            },
            {
                "name": "Express",
                "type": "varchar(255)",
                "default": "",
                "des": "实际物流名称"
            },
            {
                "name": "ExpressNumber",
                "type": "varchar(255)",
                "default": "",
                "des": "实际物流单号"
            },
            {
                "name": "Express2",
                "type": "varchar(255)",
                "default": "",
                "des": "采购方物流"
            },
            {
                "name": "ExpressNumber2",
                "type": "varchar(255)",
                "default": "",
                "des": "采购方物流单号"
            },
            {
                "name": "status",
                "type": "tinyint",
                "default": "0",
                "des": "是否请款0--未请款 1--已请款"
            }
        ]
    },
    {
        "name": "pro",
        "des": "敦煌商品表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_type ON @.pro(@.type)",
            "create index pk_examine ON @.pro(@.examine)",
            "create unique index pk_proid ON @.pro(@.proid)",
            "create index pk_hide ON @.pro(@.hide)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "shopName",
                "type": "varchar(100)",
                "default": "",
                "des": "店铺名称"
            },
            {
                "name": "shopScore",
                "type": "numeric(5,2)",
                "default": "0",
                "des": "店铺评分"
            },
            {
                "name": "SizeTemplate",
                "type": "text",
                "default": "",
                "des": "产品尺码模板代码"
            },
            {
                "name": "Followers",
                "type": "integer",
                "default": "0",
                "des": "店铺关注量"
            },
            {
                "name": "HistoryPrice",
                "type": "varchar(255)",
                "default": "",
                "des": "历史价格。如：[{price:\"均价1*\",price:\"时间1\"},{price:\"均价2\",price:\"重采时间2\"}]"
            },
            {
                "name": "shopUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "店铺地址"
            },
            {
                "name": "videoUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "视频地址"
            },
            {
                "name": "keywords",
                "type": "varchar(255)",
                "default": "",
                "des": "meta标签里的keywords"
            },
            {
                "name": "description",
                "type": "varchar(512)",
                "default": "",
                "des": "meta标签里的description"
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
                "name": "freightTemplateId",
                "type": "integer",
                "default": "0",
                "des": "运费模板"
            },
            {
                "name": "promiseTemplateId",
                "type": "integer",
                "default": "0",
                "des": "服务模板"
            },
            {
                "name": "deliveryTime",
                "type": "integer",
                "default": "0",
                "des": "备货期"
            },
            {
                "name": "wsValidNum",
                "type": "integer",
                "default": "0",
                "des": "商品有效天数"
            },
            {
                "name": "packageType",
                "type": "bit",
                "default": "0",
                "des": "打包销售"
            },
            {
                "name": "isLock",
                "type": "bit",
                "default": "0",
                "des": "是否锁定（将正在更新的数据锁定，防止重复更新）0:不锁定;1:锁定;"
            },
            {
                "name": "checkPrice",
                "type": "bit",
                "default": "0",
                "des": "False:【单价格】与True:【多价格】"
            },
            {
                "name": "lotNum",
                "type": "integer",
                "default": "0",
                "des": "每包件数"
            },
            {
                "name": "bulkorder",
                "type": "integer",
                "default": "0",
                "des": "批发最小数量"
            },
            {
                "name": "bulkDiscount",
                "type": "integer",
                "default": "0",
                "des": "批发折扣 扩大100倍，存整数。取值范围:1-99。注意：这是折扣，不是打折率。 如,打68折,则存32。批发最小数量和批发折扣需同时有值或无值。"
            },
            {
                "name": "isImageDynamic",
                "type": "bit",
                "default": "0",
                "des": "商品主图图片类型：多动态图填true,静态单图填false。"
            },
            {
                "name": "isUpAliexpress",
                "type": "bit",
                "default": "0",
                "des": "是否已被上传"
            },
            {
                "name": "isImageWatermark",
                "type": "bit",
                "default": "0",
                "des": "图片是否加水印的标识。true为打水印,false不打水印"
            },
            {
                "name": "type",
                "type": "varchar(18)",
                "default": "",
                "des": "商品分类ID"
            },
            {
                "name": "typeID",
                "type": "integer",
                "default": "",
                "des": "内容页的模板ID（即TYPE表中的ID）"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": "商品名称"
            },
            {
                "name": "fromid",
                "type": "numeric(18,0)",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "Review",
                "type": "numeric(2,1)",
                "default": "0",
                "des": "购买后客户给的评分"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0",
                "des": "店铺ID"
            },
            {
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            },
            {
                "name": "color",
                "type": "varchar(20)",
                "default": "",
                "des": "商品标题颜色"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "商品图片"
            },
            {
                "name": "pic1",
                "type": "varchar(255)",
                "default": "",
                "des": "首图"
            },
            {
                "name": "pic1Md5",
                "type": "varchar(32)",
                "default": "",
                "des": "首图MD5"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "商品详情"
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": "推荐星级"
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": "点击量"
            },
            {
                "name": "dayhit",
                "type": "integer",
                "default": "0",
                "des": "日点击量"
            },
            {
                "name": "weekhit",
                "type": "integer",
                "default": "0",
                "des": "周点击量"
            },
            {
                "name": "monthhit",
                "type": "integer",
                "default": "0",
                "des": "月点击量"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "商品备注"
            },
            {
                "name": "digg",
                "type": "integer",
                "default": "0",
                "des": "【顶】次数"
            },
            {
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": "【踩】次数"
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": "英文标题"
            },
            {
                "name": "StartDate",
                "type": "integer",
                "default": "0",
                "des": "开始时间"
            },
            {
                "name": "EndDate",
                "type": "integer",
                "default": "0",
                "des": "结束时间"
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
                "name": "IsLimitbuy",
                "type": "tinyint",
                "default": "0",
                "des": "是否限时限量 0:限时抢购 1:限量抢购"
            },
            {
                "name": "totalnum",
                "type": "integer",
                "default": "0",
                "des": "库存数量"
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": "积分"
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
                "name": "downdata",
                "type": "text",
                "default": "",
                "des": "上传附件地址"
            },
            {
                "name": "attribute",
                "type": "text",
                "default": "",
                "des": "购物车属性"
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
                "name": "PriceMarket",
                "type": "money",
                "default": "0",
                "des": "市场价"
            },
            {
                "name": "LimitBuyPrice",
                "type": "money",
                "default": "0",
                "des": "抢购价"
            },
            {
                "name": "AttributeCart",
                "type": "text",
                "default": "",
                "des": "购物车属性"
            },
            {
                "name": "Discount",
                "type": "money",
                "default": "0",
                "des": "折扣率（折）"
            },
            {
                "name": "Unit",
                "type": "varchar(50)",
                "default": "",
                "des": "商品单位"
            },
            {
                "name": "AlarmNum",
                "type": "integer",
                "default": "0",
                "des": "库存报警下限数量"
            },
            {
                "name": "Weight",
                "type": "numeric(10,2)",
                "default": "0",
                "des": "单重量"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "显示状态（0:显示;1:隐藏;2:数据错误;3:审核未通过;4:品牌商投诉;5:疑似侵权;6:禁卖品牌;7:重复商品;8:标题重复;9:首图重复;）"
            },
            {
                "name": "err",
                "type": "text",
                "default": "",
                "des": "错误内容"
            },
            {
                "name": "ScoreSend",
                "type": "integer",
                "default": "0",
                "des": "赚送积分"
            },
            {
                "name": "LimitBuyTaskID",
                "type": "integer",
                "default": "0",
                "des": "抢购任务ID"
            },
            {
                "name": "brand",
                "type": "varchar(50)",
                "default": "",
                "des": "品牌"
            },
            {
                "name": "proid",
                "type": "varchar(50)",
                "default": "0 unique",
                "des": "商品编码"
            },
            {
                "name": "height",
                "type": "varchar(50)",
                "default": "",
                "des": "高"
            },
            {
                "name": "width",
                "type": "varchar(50)",
                "default": "",
                "des": "宽"
            },
            {
                "name": "length",
                "type": "varchar(50)",
                "default": "",
                "des": "长"
            },
            {
                "name": "Property",
                "type": "varchar(255)",
                "default": "",
                "des": "商品属性（0:无;1:新品;2热卖;3:特价;4:抢;5:首发;6:清仓;7:独家;8:人气;9:话费;10:惊爆价;11:分期优惠;12:抢完;）"
            },
            {
                "name": "ServiceTerm",
                "type": "integer",
                "default": "0",
                "des": "升级年限"
            },
            {
                "name": "IsDiscount",
                "type": "tinyint",
                "default": "0",
                "des": "允许折扣"
            },
            {
                "name": "FreeShipping",
                "type": "integer",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "WholesaleNum",
                "type": "integer",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "WholesalePrice",
                "type": "Money",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "PriceMember",
                "type": "Money",
                "default": "0",
                "des": "未知"
            },
            {
                "name": "examine",
                "type": "tinyint",
                "default": "0",
                "des": "审核状态(0:未审核;1:审核通过;2:需要更新;3:需要替换;4:重新审核;)"
            }
        ]
    },
    //{
    //    "name": "prodes",
    //    "des": "速卖通商品表-详情页展示",
    //    "db": "dhgateprodes|9",
    //    "dbType": "sqlite",
    //    "sql": [
    //        "create unique index pk_proid ON @.prodes(@.proid)"
    //    ],
    //    "table": [
    //        {
    //            "name": "id",
    //            "type": "integer primary key",
    //            "default": "",
    //            "des": "索引"
    //        },
    //        {
    //            "name": "proid",
    //            "type": "varchar(10)",
    //            "default": "0 unique",
    //            "des": "商品编码"
    //        },
    //        {
    //            "name": "HistoryPrice",
    //            "type": "text",
    //            "default": "",
    //            "des": "历史价格。如：[{price:\"均价1*\",price:\"时间1\"},{price:\"均价2\",price:\"重采时间2\"}]"
    //        },
    //        {
    //            "name": "freight",
    //            "type": "text",
    //            "default": "",
    //            "des": "运费模板"
    //        },
    //        {
    //            "name": "fromUrl",
    //            "type": "varchar(255)",
    //            "default": "",
    //            "des": "来源URL"
    //        },
    //        {
    //            "name": "videoUrl",
    //            "type": "varchar(255)",
    //            "default": "",
    //            "des": "视频地址"
    //        },
    //        {
    //            "name": "aeopAeProductPropertys",
    //            "type": "text",
    //            "default": "",
    //            "des": "自定义属性"
    //        },
    //        {
    //            "name": "aeopAeProductSKUs",
    //            "type": "text",
    //            "default": "",
    //            "des": "价格属性"
    //        },
    //        {
    //            "name": "pic",
    //            "type": "text",
    //            "default": "",
    //            "des": "商品图片"
    //        },
    //        {
    //            "name": "des",
    //            "type": "text",
    //            "default": "",
    //            "des": "商品详情"
    //        },
    //        {
    //            "name": "note",
    //            "type": "text",
    //            "default": "",
    //            "des": "商品备注"
    //        }
    //    ]
    //},
    {
        "name": "type",
        "des": "敦煌网分类表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_upid ON @.type(@.upid)",
            "create index pk_sort ON @.type(@.sort)",
            "create index pk_isleaf ON @.type(@.isleaf)"
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
                "name": "upid",
                "type": "varchar(20)",
                "default": "0",
                "des": "父ID"
            },
            {
                "name": "des",
                "type": "varchar(512)",
                "default": "",
                "des": "简介"
            },
            {
                "name": "fromID",
                "type": "varchar(20)",
                "default": "0 unique",
                "des": "来源ID"
            },
            {
                "name": "excludeKeywords",
                "type": "text",
                "default": "",
                "des": "不能包含的关键词"
            },
            {
                "name": "inlucdeKeywords",
                "type": "text",
                "default": "",
                "des": "必须包含的关键词"
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
        "name": "attr",
        "des": "【敦煌网】属性表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create index pk_cateId ON @.attr(@.cateId)",
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
                "type": "varchar(150)",
                "default": "",
                "des": "属性中文名"
            },
            {
                "name": "attrId",
                "type": "integer",
                "default": "0",
                "des": "属性ID（注：非唯一）"
            },
            {
                "name": "cateId",
                "type": "varchar(20)",
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
                "default": "0 check(@.style<4)",
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
                "type": "tinyint",
                "default": "0 check(@.type<6)",
                "des": "显示方式<br/>DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框"
            },
            {
                "name": "sort",
                "type": "tinyint",
                "default": "0 check(@.sort<50)",
                "des": "排序（显示出来的时后很重要）"
            },
            {
                "name": "js",
                "type": "text",
                "default": "",
                "des": "js代码"
            }
        ]
    },
    {
        "name": "proupdhgate",
        "des": "速卖通上传到敦煌-反馈表",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": [
            "create unique index pk_proid ON @.proupdhgate(@.proid)",
            "create index pk_upUserID ON @.proupdhgate(@.upUserID)",
            "create index pk_ManualReview ON @.proupdhgate(@.ManualReview)",
            "create index pk_status ON @.proupdhgate(@.status)",
            "create index pk_upFreightId ON @.proupdhgate(@.upFreightId)"//,"alter table @.proupdhgate add constraint FK_proid foreign key(@.proid) references @.pro(@.proid)"
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
                "type": "nvarchar(10)",
                "default": "0 unique",
                "des": "产品编码(如：R12345)"
            },
            {
                "name": "type1",
                "type": "integer",
                "default": "0",
                "des": "一级商品分类ID（把【25.待认领商品】填进去，要用）"
            },
            {
                "name": "typepath",
                "type": "nvarchar(255)",
                "default": "",
                "des": "分类名称"
            },
            {
                "name": "err",
                "type": "nvarchar(255)",
                "default": "",
                "des": "出错说明"
            },
            {
                "name": "isRanking",
                "type": "bit",
                "default": "0",
                "des": "是否有排名"
            },
            {
                "name": "isActivity1",
                "type": "bit",
                "default": "0",
                "des": "是否为【满几件打几折】活动"
            },
            {
                "name": "isActivity2",
                "type": "bit",
                "default": "0",
                "des": "是否为【拼团】活动"
            },
            {
                "name": "isActivity3",
                "type": "bit",
                "default": "0",
                "des": "是否为【限时限量-直接降价】活动"
            },
            {
                "name": "isActivity4",
                "type": "bit",
                "default": "0",
                "des": "是否为【限时限量-打折】活动"
            },
            {
                "name": "upUser",
                "type": "nvarchar(50)",
                "default": "",
                "des": "上传去哪的用户名"
            },
            {
                "name": "ReviewsNum",
                "type": "integer",
                "default": "0",
                "des": "速卖通商品的评论量"
            },
            {
                "name": "MaxPrice",
                "type": "money",
                "default": "0",
                "des": "速卖通商品的最大售价"
            },
            {
                "name": "upUserID",
                "type": "integer",
                "default": "0",
                "des": "上传去哪的用户名的ID"
            },
            {
                "name": "shopid",
                "type": "integer",
                "default": "0",
                "des": "速卖通店铺ID"
            },
            {
                "name": "upGroupId",
                "type": "nvarchar(32)",
                "default": "",
                "des": "上传去哪的分组ID"
            },
            {
                "name": "upFreightId",
                "type": "nvarchar(32)",
                "default": "",
                "des": "上传去哪的运费ID"
            },
            {
                "name": "video",
                "type": "nvarchar(255)",
                "default": "",
                "des": "视频信息"
            },
            {
                "name": "pic",
                "type": "nvarchar(512)",
                "default": "",
                "des": "主图（上传更新时要用）"
            },
            {
                "name": "fromID",
                "type": "numeric(18,0)",
                "default": "0 unique",
                "des": "来源ID（上传成功返回的数据ID）"
            },
            {
                "name": "ratio",
                "type": "numeric(7,5)",
                "default": "0",
                "des": "价格倍数"
            },
            {
                "name": "keysScanTime",
                "type": "integer",
                "default": "0",
                "des": "关键词排名扫描时间"
            },
            {
                "name": "keysClickTime",
                "type": "integer",
                "default": "0",
                "des": "关键词排名点击时间"
            },
            {
                "name": "downtime",
                "type": "integer",
                "default": "0",
                "des": "下架时间"
            },
            {
                "name": "status",
                "type": "tinyint",
                "default": "0",
                "des": "商品状态(0:已上架;1:已下架;2:待审核;3:审核未通过;4:品牌商投诉;5:其它)"
            },
            {
                "name": "BeforeReview",
                "type": "tinyint",
                "default": "0",
                "des": "审核前本地状态(主要是记录更新时，出现的错误信息)"
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
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "上传时间"
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
        "name": "proupdhgatekeysranking",
        "des": "速卖通上传到敦煌-搜索词排名",
        "db": "dhgate",
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
                "type": "varchar(10)",
                "default": "0",
                "des": "商品编码（如：R123456）"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "keys1",
                "type": "varchar(50)",
                "default": "",
                "des": "关键词一"
            },
            {
                "name": "keys1ranking",
                "type": "integer",
                "default": "1000",
                "des": "关键词一排名"
            },
            {
                "name": "keys1ClickNum",
                "type": "integer",
                "default": "0",
                "des": "关键词一模拟点击次数"
            },
            {
                "name": "keys2",
                "type": "varchar(50)",
                "default": "",
                "des": "关键词二"
            },
            {
                "name": "keys2ranking",
                "type": "integer",
                "default": "1000",
                "des": "关键词二排名"
            },
            {
                "name": "keys2ClickNum",
                "type": "integer",
                "default": "0",
                "des": "关键词一模拟点击次数"
            },
            {
                "name": "keys3",
                "type": "varchar(50)",
                "default": "",
                "des": "关键词三"
            },
            {
                "name": "keys3ranking",
                "type": "integer",
                "default": "1000",
                "des": "关键词三排名"
            },
            {
                "name": "keys3ClickNum",
                "type": "integer",
                "default": "0",
                "des": "关键词一模拟点击次数"
            }
        ]
    },
    {
        "name": "proupdhgatekeysranking_avg",
        "des": "速卖通上传到敦煌-搜索词平均排名（按天排名）",
        "db": "dhgate",
        "dbType": "sqlite",
        "sql": ["create index pk_time ON @.proupdhgatekeysranking_avg(@.time)"],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "keys1ranking",
                "type": "integer",
                "default": "0",
                "des": "关键词一平均排名"
            },
            {
                "name": "keys1Click",
                "type": "integer",
                "default": "0",
                "des": "关键词一平均模拟点击次数"
            },
            {
                "name": "keys2ranking",
                "type": "integer",
                "default": "0",
                "des": "关键词二平均排名"
            },
            {
                "name": "keys2Click",
                "type": "integer",
                "default": "0",
                "des": "关键词二平均模拟点击次数"
            },
            {
                "name": "keys3ranking",
                "type": "integer",
                "default": "0",
                "des": "关键词三平均排名"
            },
            {
                "name": "keys3Click",
                "type": "integer",
                "default": "0",
                "des": "关键词三平均模拟点击次数"
            },
            {
                "name": "time",
                "type": "integer",
                "default": "0",
                "des": "统计时间"
            },
            {
                "name": "count",
                "type": "integer",
                "default": "0",
                "des": "有排名的商品数量"
            }
        ]
    },

]);