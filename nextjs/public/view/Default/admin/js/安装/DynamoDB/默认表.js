/*
以下字段不能用，因为会冲突：user,status,state,name,random,cycle
*/
'use strict';
mssql = mssql.concat([
    {
        name: "sqlhelp",
        des: "SQL帮助表",
        database: "main",
        action: "dynamodb",
        table: [
            {
                name: "id",
                type: "S",
                default: "HASH",
                des: "索引"
            },
            {
                name: "note",
                type: "S",
                des: "SQL说明"
            },
            {
                name: "sql",
                type: "S",
                des: "SQL例子"
            }
        ]
    },
    {
        name: "loginlog",
        des: "后台日志表",
        database: "main",
        action: "dynamodb",
        table: [
            //     {
            //         name: "id",
            //         type: "integer primary key",
            //         default: "",
            //         des: "索引"
            //     },
            //     {
            //         name: "user",
            //         type: "varchar(50)",
            //         default: "",
            //         des: "用户"
            //     },
            //     {
            //         name: "ct",
            //         type: "nvarchar(10)",
            //         default: "",
            //         des: "国家 如：中国"
            //     },
            //     {
            //         name: "asn",
            //         type: "varchar(30)",
            //         default: "",
            //         des: "归属地"
            //     },
            //     {
            //         name: "isstatus",
            //         type: "tinyint",
            //         default: "0",
            //         des: "橾作成功/橾作失败    0:表款失败；   1:表示成功；"
            //     },
            //     {
            //         name: "IP",
            //         type: "varchar(100)",
            //         default: "",
            //         des: "公网IP地址"
            //     },
            //     {
            //         name: "LocalIp",
            //         type: "varchar(100)",
            //         default: "",
            //         des: "局域网IP地址"
            //     },
            //     {
            //         name: "LoginTime",
            //         type: "integer",
            //         default: "0",
            //         des: "登陆时间"
            //     },
            //     {
            //         name: "OS",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "操作系统"
            //     },
            //     {
            //         name: "des",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "备注"
            //     },
            //     {
            //         name: "UserAgent",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "客户信息"
            //     },
            //     {
            //         name: "URL",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "当前URL"
            //     },
            //     {
            //         name: "fromURL",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "来源URL"
            //     },
            //     {
            //         name: "Browser",
            //         type: "varchar(255)",
            //         default: "",
            //         des: "浏览器"
            //     },
            //     {
            //         name: "Lang",
            //         type: "varchar(50)",
            //         default: "",
            //         des: "语言"
            //     }
        ]
    },
    {
        name: "manager",
        des: "管理员表",
        database: "main",
        action: "dynamodb",
        sql: [
            {
                TableName: "main_manager",
                Item: {
                    id: { S: Tool.guid() },
                    username: { S: "admin" },
                    pwd: { S: "1a55179d134cd8af19b11439eb6387472ae8ddc02a5190a3f47f8acf423d479e" },
                    islocked: { N: "1" },
                    groupid: { N: "1" },
                }
            }
        ],
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "name",
        //         type: "varchar(20)",
        //         default: "",
        //         des: "名称"
        //     },
        //     {
        //         name: "pwd",
        //         type: "varchar(64)",
        //         default: "",
        //         des: "密码（sha256加密）"
        //     },
        //     {
        //         name: "access_token",
        //         type: "varchar(64)",
        //         default: "",
        //         des: "access_token不能超过1天【expires_in:为access_token的到期时间戳】"
        //     },
        //     {
        //         name: "expires_in",
        //         type: "integer",
        //         default: "0",
        //         des: "access_token的到期时间戳"
        //     },
        //     {
        //         name: "refresh_token",
        //         type: "varchar(64)",
        //         default: "",
        //         des: "refresh_token不能超过30天"
        //     },
        //     {
        //         name: "state",
        //         type: "tinyint",
        //         default: "0",
        //         des: "是否锁定"
        //     },
        //     {
        //         name: "logintime",
        //         type: "integer",
        //         default: "0",
        //         des: "登陆时间"
        //     },
        //     {
        //         name: "loginip",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "登陆IP"
        //     },
        //     {
        //         name: "randomnum",
        //         type: "varchar(64)",
        //         default: "",
        //         des: "加密的随机数"
        //     },
        //     {
        //         name: "GroupID",
        //         type: "integer",
        //         default: "0",
        //         des: "所属用户组ID"
        //     },
        //     {
        //         name: "RealName",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "真实姓名"
        //     },
        //     {
        //         name: "TelPhone",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "联系电话"
        //     },
        //     {
        //         name: "Sex",
        //         type: "varchar(5)",
        //         default: "",
        //         des: "性别"
        //     },
        //     {
        //         name: "email",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "电子信箱"
        //     },
        //     {
        //         name: "LastLoginIP",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "最后登陆IP"
        //     },
        //     {
        //         name: "LastLoginTime",
        //         type: "integer",
        //         default: "0",
        //         des: "上次登陆时间"
        //     },
        //     {
        //         name: "LoginTimes",
        //         type: "integer",
        //         default: "0",
        //         des: "登录次数"
        //     },
        //     {
        //         name: "des",
        //         type: "text",
        //         default: "",
        //         des: "简要说明"
        //     }
        // ]
    },
    {
        name: "download",
        des: "应用商店-下载源",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "Name",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "采集内容说明"
        //     },
        //     {
        //         name: "addTime",
        //         type: "integer",
        //         default: "0",
        //         des: "添加时间"
        //     },
        //     {
        //         name: "url",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "采集网址"
        //     },
        //     {
        //         name: "token",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: ""
        //     },
        //     {
        //         name: "sort",
        //         type: "integer",
        //         default: "0",
        //         des: "排序"
        //     }
        // ]
    },
    {
        name: "usergroup",
        des: "用户组",
        database: "main",
        action: "dynamodb",
        sql: [
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "1" },
                    groupname: { S: "网站管理员" },
                    descript: { S: "开发者权限" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "2" },
                    groupname: { S: "超级管理员" },
                    descript: { S: "最高管理权限" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "3" },
                    groupname: { S: "审核员" },
                    descript: { S: "审核员" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "4" },
                    groupname: { S: "编辑员" },
                    descript: { S: "编辑员" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "5" },
                    groupname: { S: "业务主管" },
                    descript: { S: "管理业务员" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "6" },
                    groupname: { S: "业务员" },
                    descript: { S: "管理订单，站内信" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "7" },
                    groupname: { S: "财务" },
                    descript: { S: "财务审核付款" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "8" },
                    groupname: { S: "企业会员" },
                    descript: { S: "企业注册会员" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "9" },
                    groupname: { S: "个人会员" },
                    descript: { S: "个人注册会员,注册成功后您可以写日志,提问题等" },
                }
            },
            {
                TableName: "main_usergroup",
                Item: {
                    id: { S: Tool.guid() },
                    groupid: { N: "10" },
                    groupname: { S: "匿名" },
                    descript: { S: "前台访问" },
                }
            }
        ],
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "Name",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "会员组名称"
        //     },
        //     {
        //         name: "PowerList",
        //         type: "text",
        //         default: "",
        //         des: "权限"
        //     },
        //     {
        //         name: "descript",
        //         type: "text",
        //         default: "",
        //         des: "备注"
        //     },
        //     {
        //         name: "Type",
        //         type: "tinyint",
        //         default: "0",
        //         des: "0系统默认1用户新建2管理员组3超级管理员组"
        //     },
        //     {
        //         name: "ChargeType",
        //         type: "tinyint",
        //         default: "0",
        //         des: "计费方式"
        //     },
        //     {
        //         name: "GroupPoint",
        //         type: "integer",
        //         default: "0",
        //         des: "默认点数"
        //     },
        //     {
        //         name: "ValidDays",
        //         type: "integer",
        //         default: "0",
        //         des: "有效期"
        //     },
        //     {
        //         name: "PowerType",
        //         type: "integer",
        //         default: "0",
        //         des: "1拥有前台的全部权限 2部分权限"
        //     },
        //     {
        //         name: "FormID",
        //         type: "integer",
        //         default: "0",
        //         des: "表单ID"
        //     },
        //     {
        //         name: "ShowOnReg",
        //         type: "tinyint",
        //         default: "0",
        //         des: "是否允许前台注册"
        //     },
        //     {
        //         name: "UserType",
        //         type: "tinyint",
        //         default: "0",
        //         des: "0个人会员 1企业会员"
        //     },
        //     {
        //         name: "TemplateFile",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "模板"
        //     },
        //     {
        //         name: "SpaceSize",
        //         type: "integer",
        //         default: "0",
        //         des: "空间大小"
        //     },
        //     {
        //         name: "validtype",
        //         type: "tinyint",
        //         default: "0",
        //         des: ""
        //     },
        //     {
        //         name: "validEmail",
        //         type: "text",
        //         default: "",
        //         des: ""
        //     },
        //     {
        //         name: "GroupSetting",
        //         type: "text",
        //         default: "",
        //         des: "一些参数设置"
        //     },
        //     {
        //         name: "modelpower",
        //         type: "text",
        //         default: "",
        //         des: ""
        //     }
        // ]
    },
    {
        name: "weblog",
        des: "访问日志",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "URL",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "当前URL"
        //     },
        //     {
        //         name: "UserAgent",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "客户信息"
        //     },
        //     {
        //         name: "fromURL",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "来源URL"
        //     },
        //     {
        //         name: "IP",
        //         type: "nvarchar(100)",
        //         default: "",
        //         des: "ipv4最大长度15；ipv6最大长度63；获取是合在一起的共：15+63+1=79---这是网上的数据我这里给100"
        //     },
        //     {
        //         name: "OS",
        //         type: "nvarchar(50)",
        //         default: "",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "Browser",
        //         type: "nvarchar(255)",
        //         default: "",
        //         des: "浏览器"
        //     },
        //     {
        //         name: "lang",
        //         type: "nvarchar(50)",
        //         default: "",
        //         des: "语言"
        //     },
        //     {
        //         name: "ASN",
        //         type: "nvarchar(30)",
        //         default: "",
        //         des: "归属地"
        //     },
        //     {
        //         name: "ct",
        //         type: "nvarchar(10)",
        //         default: "",
        //         des: "国家 如：中国"
        //     },
        //     {
        //         name: "addtime",
        //         type: "integer",
        //         default: "0",
        //         des: "添加时间"
        //     }
        // ]
    },
    {
        name: "weblog_os",
        des: "访问日志_操作系统占比",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "OS",
        //         type: "nvarchar(50)",
        //         default: "0 unique",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "count",
        //         type: "integer",
        //         default: "0",
        //         des: "访问次数"
        //     }
        // ]
    },
    {
        name: "ip",
        des: "ip库",
        database: "main",
        action: "dynamodb",
        //    sql: [
        //         "create UNIQUE index PK_ip ON ip(ip)"
        //     ],
        //     table: [
        //         {
        //             name: "id",
        //             type: "integer primary key",
        //             default: "",
        //             des: "索引"
        //         },
        //         {
        //             name: "ASN",
        //             type: "nvarchar(30)",
        //             default: "",
        //             des: "ASN归属地"
        //         },
        //         {
        //             name: "ip",
        //             type: "nvarchar(100)",
        //             default: "0 unique",
        //             des: "ipv4最大长度15；ipv6最大长度63；获取是合在一起的共：15+63+1=79---这是网上的数据我这里给100"
        //         },
        //         {
        //             name: "isp",
        //             type: "nvarchar(20)",
        //             default: "",
        //             des: "运营商 如：电信"
        //         },
        //         {
        //             name: "ct",
        //             type: "nvarchar(10)",
        //             default: "",
        //             des: "国家 如：中国"
        //         },
        //         {
        //             name: "prov",
        //             type: "nvarchar(20)",
        //             default: "",
        //             des: "省州 如：上海市"
        //         },
        //         {
        //             name: "city",
        //             type: "nvarchar(20)",
        //             default: "",
        //             des: "城市 如：上海市"
        //         },
        //         {
        //             name: "area",
        //             type: "nvarchar(20)",
        //             default: "",
        //             des: "地区 如：滨江区"
        //         },
        //         {
        //             name: "idc",
        //             type: "nvarchar(30)",
        //             default: "",
        //             des: "互联网数据中心 如：【360蜘蛛】或【中国电信股份有限公司富阳分公司】"
        //         },
        //         {
        //             name: "addtime",
        //             type: "integer",
        //             default: "0",
        //             des: "添加时间"
        //         },
        //         {
        //             name: "uptime",
        //             type: "integer",
        //             default: "0",
        //             des: "更新时间"
        //         },
        //         {
        //             name: "hit",
        //             type: "integer",
        //             default: "0",
        //             des: "访问次数"
        //         }
        //     ]
    },
    {
        name: "dhgatelogimg",
        des: "上传到敦煌的图片访问日志",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "proid",
        //         type: "varchar(10)",
        //         default: "",
        //         des: "商品编码（如：R123456）"
        //     },
        //     {
        //         name: "URL",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "当前URL"
        //     },
        //     {
        //         name: "UserAgent",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "客户信息"
        //     },
        //     {
        //         name: "fromURL",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "来源URL"
        //     },
        //     {
        //         name: "IP",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "IP"
        //     },
        //     {
        //         name: "OS",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "Browser",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "浏览器"
        //     },
        //     {
        //         name: "lang",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "语言"
        //     },
        //     {
        //         name: "ct",
        //         type: "varchar(10)",
        //         default: "",
        //         des: "国家 如：中国"
        //     },
        //     {
        //         name: "ASN",
        //         type: "varchar(30)",
        //         default: "",
        //         des: "归属地"
        //     },
        //     {
        //         name: "addtime",
        //         type: "integer",
        //         default: "0",
        //         des: "添加时间"
        //     },
        //     {
        //         name: "uptime",
        //         type: "integer",
        //         default: "0",
        //         des: "更新时间"
        //     },
        //     {
        //         name: "timeLen",
        //         type: "integer",
        //         default: "0",
        //         des: "停留时长（通过用户刷新Session来获取）"
        //     },
        //     {
        //         name: "count",
        //         type: "integer",
        //         default: "0",
        //         des: "访问次数（通过用户Cookie来获取）"
        //     },
        //     {
        //         name: "user32",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "用户（32位）"
        //     }
        // ]
    },
    {
        name: "dhgatelogimg_os",
        des: "上传到敦煌的图片访问日志_操作系统占比",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "OS",
        //         type: "nvarchar(50)",
        //         default: "0 unique",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "count",
        //         type: "integer",
        //         default: "0",
        //         des: "访问次数"
        //     }
        // ]
    },
    {
        name: "dhgatelogpro",
        des: "上传到敦煌的商品访问日志",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "proid",
        //         type: "varchar(10)",
        //         default: "",
        //         des: "当前商品编码（如：R123456）"
        //     },
        //     {
        //         name: "proidr",
        //         type: "varchar(10)",
        //         default: "",
        //         des: "来源商品编码（如：R123456）"
        //     },
        //     {
        //         name: "URL",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "当前URL"
        //     },
        //     {
        //         name: "UserAgent",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "客户信息"
        //     },
        //     {
        //         name: "fromURL",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "来源URL"
        //     },
        //     {
        //         name: "IP",
        //         type: "varchar(100)",
        //         default: "",
        //         des: "IP"
        //     },
        //     {
        //         name: "OS",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "ct",
        //         type: "varchar(10)",
        //         default: "",
        //         des: "国家 如：中国"
        //     },
        //     {
        //         name: "Browser",
        //         type: "varchar(255)",
        //         default: "",
        //         des: "浏览器"
        //     },
        //     {
        //         name: "lang",
        //         type: "varchar(50)",
        //         default: "",
        //         des: "语言"
        //     },
        //     {
        //         name: "ASN",
        //         type: "varchar(30)",
        //         default: "",
        //         des: "归属地"
        //     },
        //     {
        //         name: "addtime",
        //         type: "integer",
        //         default: "0",
        //         des: "添加时间"
        //     }
        // ]
    },
    {
        name: "dhgatelogpro_os",
        des: "上传到敦煌商品的访问日志_操作系统占比",
        database: "main",
        action: "dynamodb",
        // table: [
        //     {
        //         name: "id",
        //         type: "integer primary key",
        //         default: "",
        //         des: "索引"
        //     },
        //     {
        //         name: "OS",
        //         type: "nvarchar(50)",
        //         default: "0 unique",
        //         des: "操作系统"
        //     },
        //     {
        //         name: "count",
        //         type: "integer",
        //         default: "0",
        //         des: "访问次数"
        //     }
        // ]
    }
])