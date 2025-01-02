'use strict';
mssql = mssql.concat([
    {
        "name": "info",
        "des": "报错处理",
        "db": "video",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "author",
                "type": "varchar(80)",
                "default": "",
                "des": ""
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "type",
                "type": "varchar(20)",
                "default": "",
                "des": ""
            },
            {
                "name": "videoid",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "ip",
                "type": "varchar(20)",
                "default": "",
                "des": ""
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "color",
                "type": "varchar(20)",
                "default": "",
                "des": ""
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "tempvideo",
        "des": "视频临时库",
        "db": "video",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "from",
                "type": "varchar(120)",
                "default": "",
                "des": ""
            },
            {
                "name": "name",
                "type": "varchar(120)",
                "default": "",
                "des": ""
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": ""
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "state",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "pic",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "actor",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "playdata",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "publishyear",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "publisharea",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "director",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "lang",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "typename",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "inbase",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "fromurl",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "keyword",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "cntype",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "color",
                "type": "varchar(10)",
                "default": "",
                "des": ""
            },
            {
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": ""
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "video",
        "des": "视频表",
        "db": "video",
        "dbType": "sqlite",
        "sql": [
            "create index @.type ON @.video(@.type)",
            "create index @.commend ON @.video(@.commend)",
            "create index @.wrong ON @.video(@.wrong)",
            "create index @.letter ON @.video(@.letter)",
            "create index @.hide ON @.video(@.hide)"
        ],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "cntype",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "state",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "hit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "digg",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "actor",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "topic",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "color",
                "type": "varchar(10)",
                "default": "",
                "des": ""
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "wrong",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "year",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "area",
                "type": "varchar(10)",
                "default": "0",
                "des": ""
            },
            {
                "name": "downdata",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "isunion",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": ""
            },
            {
                "name": "keyword",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "director",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "lang",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "dayhit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "weekhit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "monthhit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": ""
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "fromurl",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "playdata",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "selflabel",
        "des": "自定义标签表",
        "db": "video",
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
                "type": "varchar(40)",
                "default": "",
                "des": ""
            },
            {
                "name": "content",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "leaveword",
        "des": "留言表",
        "db": "video",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "author",
                "type": "varchar(80)",
                "default": "",
                "des": "评论人"
            },
            {
                "name": "replyid",
                "type": "integer",
                "default": "0",
                "des": "回复ID"
            },
            {
                "name": "qq",
                "type": "varchar(30)",
                "default": "",
                "des": "QQ"
            },
            {
                "name": "email",
                "type": "varchar(50)",
                "default": "",
                "des": "邮件"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "内容"
            },
            {
                "name": "ip",
                "type": "varchar(50)",
                "default": "",
                "des": "IP"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "添加时间"
            },
            {
                "name": "state",
                "type": "varchar(10)",
                "default": "",
                "des": "评分"
            },
            {
                "name": "mobile",
                "type": "varchar(20)",
                "default": "",
                "des": "手机"
            }
        ]
    },
    {
        "name": "link",
        "des": "友情链接",
        "db": "video",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "type",
                "type": "varchar(10)",
                "default": "",
                "des": ""
            },
            {
                "name": "name",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "pic",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "url",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "des",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "ads",
        "des": "广告",
        "db": "video",
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
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "file",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "enname",
                "type": "varchar(125)",
                "default": "",
                "des": ""
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "filters",
        "des": "过滤器表",
        "db": "video",
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
                "type": "varchar(50)",
                "default": "",
                "des": "名称"
            },
            {
                "name": "Field",
                "type": "varchar(100)",
                "default": "",
                "des": "表和字段"
            },
            {
                "name": "Type",
                "type": "tinyint",
                "default": "0",
                "des": "类型1-简单替换,2-高级替换,3-正则替换"
            },
            {
                "name": "substr",
                "type": "varchar(255)",
                "default": "",
                "des": "查找"
            },
            {
                "name": "FisString",
                "type": "varchar(255)",
                "default": "",
                "des": "开始标记"
            },
            {
                "name": "FioString",
                "type": "varchar(255)",
                "default": "",
                "des": "结束标记"
            },
            {
                "name": "Rep",
                "type": "varchar(255)",
                "default": "",
                "des": "正则查找"
            },
            {
                "name": "Content",
                "type": "varchar(255)",
                "default": "",
                "des": "替换的结果"
            },
            {
                "name": "Flag",
                "type": "tinyint",
                "default": "0",
                "des": "启用/禁用"
            }
        ]
    },
    {
        "name": "cls",
        "des": "分类转换表",
        "db": "video",
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
                "des": ""
            },
            {
                "name": "ClsID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
]);