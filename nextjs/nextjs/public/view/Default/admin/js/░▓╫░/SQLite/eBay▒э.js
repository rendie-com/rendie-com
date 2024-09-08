'use strict';
mssql=mssql.concat([
  {
    "name": "seller",
    "des": "卖家账户",
    "db":"ebay",
    "dbType":"sqlite",
    //"sql": [
    //  "create unique index pk_fromID ON @.seller(@.fromID)"
    //],
    "table": [
      {
        "name": "id",
        "type": "int identity(1,1) primary key",
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
        "type": "varchar(100)",
        "default": "",
        "des": "用户名"
      },
      {
        "name": "from",
        "type": "varchar(50)",
        "default": "",
        "des": "来源"
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
    "name": "type",
    "des": "ebay分类表",
    "db":"ebay",
    "dbType":"sqlite",
    //"sql": [
    //  "create index pk_upid ON @.type(@.upid)",
    //  "create index pk_sort ON @.type(@.sort)",
    //  "create index pk_isleaf ON @.type(@.isleaf)",
    //  "create unique index pk_fromid ON @.type(@.fromid)"
    //],
    "table": [
      {
        "name": "id",
        "type": "int identity(1,1) primary key",
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
        "name": "upid",
        "type": "varchar(20)",
        "default": "0",
        "des": "父ID"
      },
      {
        "name": "des",
        "type": "varchar(255)",
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
  }
]);