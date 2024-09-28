'use strict';
mssql = mssql.concat([
    {
        "name": "fav",
        "des": "网址导航",
        "db": "tool",
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
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "网址说明"
            },
            {
                "name": "url",
                "type": "nvarchar(255)",
                "default": "",
                "des": "网址"
            },
            {
                "name": "ico",
                "type": "nvarchar(255)",
                "default": "",
                "des": "图标"
            },
            {
                "name": "type",
                "type": "integer",
                "default": "0",
                "des": "分类ID"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "记录时间"
            },
            {
                "name": "uptime",
                "type": "integer",
                "default": "0",
                "des": "修改时间"
            }
        ]
    },
    {
        "name": "task",
        "des": "定时任务管理表",
        "db": "tool",
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
                "type": "nvarchar(50)",
                "default": "",
                "des": "名称"
            },
            {
                "name": "week",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "Isenable",
                "type": "tinyint",
                "default": "0",
                "des": ""
            },
            {
                "name": "starttype",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "limitnum",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "addTime",
                "type": "integer",
                "default": "0",
                "des": ""
            },
            {
                "name": "URL",
                "type": "nvarchar(255)",
                "default": "",
                "des": ""

            },
            {
                "name": "time",
                "type": "text",
                "default": "",
                "des": ""
            },
            {
                "name": "remark",
                "type": "text",
                "default": "",
                "des": ""
            }
        ]
    },
    {
        "name": "action",
        "des": "动作",
        "db": "tool",
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
                "type": "nvarchar(255)",
                "default": "",
                "des": "动作名称"
            },
            {
                "name": "js",
                "type": "nvarchar(255)",
                "default": "",
                "des": "js文件"
            },
            {
                "name": "note",
                "type": "nvarchar(255)",
                "default": "",
                "des": "动作说明"
            },
            {
                "name": "code",
                "type": "text",
                "default": "",
                "des": "配置参数"
            },
            {
                "name": "video",
                "type": "nvarchar(255)",
                "default": "",
                "des": "一套动作效果视频"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序值"
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
        "name": "adminplan",
        "des": "工作计划",
        "db": "tool",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "user",
                "type": "nvarchar(50)",
                "default": "",
                "des": "用户名"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "工作计划内容"
            },
            {
                "name": "addtime",
                "type": "integer",
                "default": "0",
                "des": "记录时间"
            },
            {
                "name": "time",
                "type": "integer",
                "default": "0",
                "des": "完成时间"
            },
            {
                "name": "Status",
                "type": "bit",
                "default": "0",
                "des": "状态 0未完成 1已完成"
            },
            {
                "name": "TipsDays",
                "type": "integer",
                "default": "0",
                "des": "登录提醒天数"
            }
        ]
    },
    {
        "name": "dictionary",
        "des": "新华词典",
        "db": "tool",
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
                "type": "nvarchar(2)",
                "default": "",
                "des": "简体字"
            },
            {
                "name": "oldname",
                "type": "nvarchar(2)",
                "default": "",
                "des": "繁体字"
            },
            {
                "name": "part",
                "type": "nvarchar(50)",
                "default": "",
                "des": "拼音"
            },
            {
                "name": "areacode",
                "type": "nvarchar(5)",
                "default": "",
                "des": "汉字区位码"
            },
            {
                "name": "spell",
                "type": "nvarchar(20)",
                "default": "",
                "des": "偏旁"
            },
            {
                "name": "strokes",
                "type": "integer",
                "default": "0",
                "des": "笔划"
            },
            {
                "name": "partstrokes",
                "type": "integer",
                "default": "0",
                "des": "偏旁笔划"
            },
            {
                "name": "des",
                "type": "text",
                "default": "",
                "des": "说明"
            }
        ]
    },
    {
        "name": "exmail",
        "des": "腾讯企业邮箱",
        "db": "tool",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "sid",
                "type": "nvarchar(100)",
                "default": "",
                "des": "登陆后，每次访问都要用，相当于【token】"
            },
            {
                "name": "alias",
                "type": "nvarchar(100)",
                "default": "",
                "des": "别名（一个成员可以有多个邮箱账号）"
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
                "name": "toUse",
                "type": "nvarchar(255)",
                "default": "",
                "des": "使用该邮件的平台"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录用的cookies信息"
            },
            {
                "name": "note",
                "type": "nvarchar(255)",
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
        "name": "replit",
        "des": "replit账户",
        "db": "tool",
        "dbType": "sqlite",
        "table": [
            {
                "name": "id",
                "type": "integer primary key",
                "default": "",
                "des": "索引"
            },
            {
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "用户名（登录用的）"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "名称（如：web107）"
            },
            {
                "name": "loginMode",
                "type": "nvarchar(50)",
                "default": "",
                "des": "登录方式（如：github）"
            },
            {
                "name": "xray",
                "type": "nvarchar(512)",
                "default": "",
                "des": "Xray的配置信息"
            },
            {
                "name": "rendie",
                "type": "nvarchar(512)",
                "default": "",
                "des": "rendie网站的配置信息"
            },
            {
                "name": "serverLocation",
                "type": "nvarchar(100)",
                "default": "",
                "des": "服务器位置（如：Asia）"
            },
            {
                "name": "outboundSize",
                "type": "float(3, 1)",
                "default": "0",
                "des": "出站大小，已使用多少GB,出站数据（如：3.9）"
            },
            {
                "name": "sort",
                "type": "integer",
                "default": "0",
                "des": "排序"
            },
            {
                "name": "itemCount",
                "type": "bit",
                "default": "0",
                "des": "项目数量，主要是记录有多少个项目"
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
                "des": "登录用的cookies信息"
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
        "name": "github",
        "des": "github账户",
        "db": "tool",
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
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "用户名（登录用的）"
            },
            {
                "name": "bakEmail",
                "type": "nvarchar(100)",
                "default": "",
                "des": "备用邮箱（比如用github登录replit,同时也可以用google,登录replit，那replit只会记录一个邮件。方便确认replit登录是否正确）"
            },
            {
                "name": "name",
                "type": "nvarchar(100)",
                "default": "",
                "des": "名称（如：web40）"
            },
            {
                "name": "loginMode",
                "type": "nvarchar(50)",
                "default": "",
                "des": "登录方式（如：GitHub）"
            },
            {
                "name": "token",
                "type": "nvarchar(100)",
                "default": "",
                "des": "自动发布会用上token"
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
                "des": "登录用的cookies信息"
            },
            {
                "name": "authorizations",
                "type": "text",
                "default": "",
                "des": "授权账号JSON格式"
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
        "name": "vercel",
        "des": "vercel账户",
        "db": "tool",
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
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "github用户名（登录用的）"
            },
            {
                "name": "phone",
                "type": "nvarchar(15)",
                "default": "",
                "des": "手机号"
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
                "des": "登录用的cookies信息"
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
        "name": "cpolar",
        "des": "cpolar账户",
        "db": "tool",
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
                "name": "UserName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "cpolar用户名（登录用的）"
            },
            {
                "name": "phone",
                "type": "nvarchar(15)",
                "default": "",
                "des": "手机号"
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
                "des": "登录用的cookies信息"
            },
            {
                "name": "token",
                "type": "nvarchar(100)",
                "default": "",
                "des": "自动发布会用上token"
            },
            {
                "name": "password",
                "type": "nvarchar(255)",
                "default": "",
                "des": "密码"
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
        "name": "freenom",
        "des": "freenom账户",
        "db": "tool",
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
                "name": "email",
                "type": "nvarchar(100)",
                "default": "",
                "des": "邮件（登录用的）"
            },
            {
                "name": "FirstName",
                "type": "nvarchar(100)",
                "default": "",
                "des": "姓氏（登录时验证要用）"
            },
            {
                "name": "note",
                "type": "text",
                "default": "",
                "des": "备注"
            },
            {
                "name": "cookies",
                "type": "text",
                "default": "",
                "des": "登录用的cookies信息"
            },
            {
                "name": "password",
                "type": "nvarchar(255)",
                "default": "",
                "des": "密码"
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
        "name": "freenom_domains",
        "des": "freenom账户域名",
        "db": "tool",
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
                "name": "fromID",
                "type": "integer",
                "default": "0",
                "des": "来源ID"
            },
            {
                "name": "domain",
                "type": "nvarchar(100)",
                "default": "",
                "des": "域名"
            },
            {
                "name": "dns",
                "type": "nvarchar(255)",
                "default": "",
                "des": "dns服务器"
            },
            {
                "name": "RegistrationDate",
                "type": "integer",
                "default": "0",
                "des": "注册时间"
            },
            {
                "name": "ExpiryDate",
                "type": "integer",
                "default": "0",
                "des": "到期时间"
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