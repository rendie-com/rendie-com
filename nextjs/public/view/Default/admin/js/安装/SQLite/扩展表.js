'use strict';
mssql = mssql.concat([
    {
        "name": "photo",
        "des": "图片",
        "db": "expand",
        "dbType": "sqlite",
        "sql": [
            "create index @.type ON @.photo(@.type)",
            "create index @.commend ON @.photo(@.commend)",
            "create index @.letter ON @.photo(@.letter)",
            "create index @.hide ON @.photo(@.hide)"
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
                "name": "KeyWord",
                "type": "varchar(255)",
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
                "name": "PhotoUrl",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "PictureContent",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "Author",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Origin",
                "type": "varchar(50)",
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
                "name": "datetime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Hit",
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
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByDay",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByWeek",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByMonth",
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
                "name": "Slide",
                "type": "tinyint",
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
                "name": "fromUrl",
                "type": "varchar(255)",
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
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": ""
            },
            {
                "name": "score",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "news",
        "des": "新闻表",
        "db": "expand",
        "dbType": "sqlite",
        //"sql": [
        //  "create index @.type ON @.news(@.type)",
        //  "create index @.commend ON @.news(@.commend)",
        //  "create index @.letter ON @.news(@.letter)",
        //  "create index @.hide ON @.news(@.hide)"
        //],
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
                "des": "分类"
            },
            {
                "name": "vid",
                "type": "integer",
                "default": "0",
                "des": "本站视频ID"
            },
            {
                "name": "name",
                "type": "varchar(255)",
                "default": "",
                "des": "名称"
            },
            {
                "name": "author",
                "type": "varchar(80)",
                "default": "",
                "des": "作者"
            },
            {
                "name": "color",
                "type": "varchar(20)",
                "default": "",
                "des": "颜色"
            },
            {
                "name": "pic",
                "type": "text",
                "default": "",
                "des": "图片"
            },
            {
                "name": "from",
                "type": "varchar(50)",
                "default": "",
                "des": "来源"
            },
            {
                "name": "keyword",
                "type": "text",
                "default": "",
                "des": "关键词"
            },
            {
                "name": "outline",
                "type": "text",
                "default": "",
                "des": "简述"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "内容"
            },
            {
                "name": "commend",
                "type": "tinyint",
                "default": "0",
                "des": "星级"
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
                "des": "每天点击量"
            },
            {
                "name": "weekhit",
                "type": "integer",
                "default": "0",
                "des": "每周点击量"
            },
            {
                "name": "monthhit",
                "type": "integer",
                "default": "0",
                "des": "每月点击量"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "topic",
                "type": "integer",
                "default": "0",
                "des": "专题ID"
            },
            {
                "name": "digg",
                "type": "integer",
                "default": "0",
                "des": "顶"
            },
            {
                "name": "tread",
                "type": "integer",
                "default": "0",
                "des": "踩"
            },
            {
                "name": "enname",
                "type": "varchar(120)",
                "default": "",
                "des": "标题（英文）"
            },
            {
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": "标题首字母"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "标题首字母"
            },
            {
                "name": "datetime",
                "type": "integer",
                "default": "",
                "des": "修改时间"
            },
            {
                "name": "hide",
                "type": "tinyint",
                "default": "0",
                "des": "是否隐藏"
            },
            {
                "name": "integer",
                "type": "integer",
                "default": "0",
                "des": "积分"
            },
            {
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": "来源URL"
            }
        ]
    },
    {
        "name": "tempphoto",
        "des": "图片临时库",
        "db": "expand",
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
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Author",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "from",
                "type": "varchar(50)",
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
                "name": "KeyWord",
                "type": "varchar(255)",
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
                "name": "fromUrl",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Hit",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByDay",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByWeek",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "HitsByMonth",
                "type": "integer",
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
                "name": "pic",
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
                "name": "datetime",
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
                "name": "Slide",
                "type": "tinyint",
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
                "name": "inbase",
                "type": "tinyint",
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
                "name": "letter",
                "type": "varchar(1)",
                "default": "",
                "des": ""
            }
        ]
    }, {
        "name": "guestmedal",
        "des": "贵宾",
        "db": "expand",
        "dbType": "sqlite",
        //"sql": [
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('创始人','medal1.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('管理员','medal2.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('超级版主','medal3.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('版主','medal4.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('论坛积极分子','medal5.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('乐于助人','medal6.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('灌水王','medal7.gif')",
        //  "insert into @.guestmedal(@.name,@.pic)VALUES ('论坛高手','medal8.gif')"
        //],
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
                "des": ""
            },
            {
                "name": "Status",
                "type": "integer",
                "default": "0",
                "des": ""

            },
            {
                "name": "Descript",
                "type": "varchar(255)",
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
                "name": "LQFS",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Expression",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "GradeID",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "user",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "askgrade",
        "des": "等级头衔",
        "db": "expand",
        "dbType": "sqlite",
        //"sql": [
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('管理员',0,'rank10.gif','red',0,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('超级版主',0,'rank9.gif','red',0,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('版主',0,'rank8.gif','red',0,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('学前班',0,'rank0.gif','red',0,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('一年级',0,'rank1.gif','red',100,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('二年级',0,'rank1.gif','red',200,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('三年级',0,'rank2.gif','red',300,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('三年级',0,'rank2.gif','red',400,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('四年级',0,'rank3.gif','red',500,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('五年级',0,'rank3.gif','red',600,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('六年级',0,'rank4.gif','red',800,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('七年级',0,'rank4.gif','red',1000,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('八年级',0,'rank5.gif','red',1200,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('九年级',0,'rank5.gif','red',1500,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('高一年',0,'rank6.gif','red',1800,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('高二年',0,'rank6.gif','red',2100,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('高三年',0,'rank6.gif','red',2500,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('大一',0,'rank7.gif','red',3000,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('大二',0,'rank7.gif','red',3500,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('大三',0,'rank7.gif','red',4000,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('博士生',0,'rank7.gif','red',5000,1)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('管理员',1000000,'rank5.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('管理团队',100000,'rank5.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('特聘专家',10000,'rank4.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('VIP用户',9000,'rank4.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('贵宾用户',8000,'rank3.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('新手上路',0,'rank0.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('侠客',100,'rank0.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('骑士',200,'rank1.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('圣骑士',500,'rank1.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('精灵王',700,'rank1.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('风云使者',1000,'rank1.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('光明使者',2000,'rank1.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('小天使',5000,'rank2.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('大天使',6000,'rank2.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('炽天使',7000,'rank2.gif','',0,0)",
        //  "insert into @.askgrade(@.name,@.Score,@.pic,@.color,@.ClubPostNum,@.TypeFlag)VALUES ('圣天使',8000,'rank3.gif','',0,0)"
        //],
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "name",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "Score",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "pic",
                "type": "varchar(50)",
                "default": "0",
                "des": ""
            },
            {
                "name": "ClubPower",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "ClubPostNum",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "color",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            },
            {
                "name": "TypeFlag",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "Special",
                "type": "tinyint",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "blog",
        "des": "博客",
        "db": "expand",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "UserID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "UserName",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "blogName",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Domain",
                "type": "varchar(100)",
                "default": "",
                "des": ""
            },
            {
                "name": "Logo",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "ClassID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Descript",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "Announce",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "ContentLen",
                "type": "integer",
                "default": "500",
                "des": ""
            },
            {
                "name": "ListblogNum",
                "type": "integer",
                "default": "15",
                "des": ""
            },
            {
                "name": "ListLogNum",
                "type": "integer",
                "default": "10",
                "des": ""
            },
            {
                "name": "ListReplayNum",
                "type": "integer",
                "default": "10",
                "des": ""
            },
            {
                "name": "ListGuestNum",
                "type": "integer",
                "default": "10",
                "des": ""
            },
            {
                "name": "TemplateID",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "addDate",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Recommend",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Status",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "hits",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "Banner",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "bgurl",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "bgrepeat",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "bgposition",
                "type": "integer",
                "default": "0",
                "des": ""
            }
        ]
    },
    {
        "name": "Client",
        "des": "客户表",
        "db": "expand",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "fromurl",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "contact",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Fixed",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "mobile",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "Email",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "address",
                "type": "varchar(255)",
                "default": "",
                "des": ""
            },
            {
                "name": "CompanyWeb",
                "type": "varchar(255)",
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
                "name": "send",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "time",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "sendtime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "sendemail",
                "type": "varchar(50)",
                "default": "",
                "des": ""
            }
        ]
    },
]);