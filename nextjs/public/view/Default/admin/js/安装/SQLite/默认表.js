'use strict';
mssql = mssql.concat([
    {
        name: "sqlhelp",
        des: "SQL帮助表",
        database: "main",
        action: "sqlite",
        /*
        "sql": [
          "insert into @.sqlhelp(@.note,@.sql) values ('列出某一栏目数据','select  *  from @.video where @.type =(select @.id from @.type where @.name = ''动作片'')')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除某一栏目数据','delete  from @.video where @.type =(select @.id from @.type where @.name = ''动作片'')')",
          "insert into @.sqlhelp(@.note,@.sql) values ('更新数据','update @.type set @.fromID=1 where @.type=0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('包含查询','select @.id,@.name from @.type where @.name like ''%综艺片%''')",
          "insert into @.sqlhelp(@.note,@.sql) values ('包含查询2','SELECT * from @.video where INSTR(@.cntype,@.publisharea&'','')>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('左截','update @.video set @.publisharea=Left(@.publisharea,INSTR(@.publisharea,'' '')-1) where INSTR(@.publisharea,'' '')>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('将字段中的\"、\"替换为\"|\"(查,acc)','SELECT  left(@.name,INSTR(@.name,''、'')-1)&''|''&mid(@.name,INSTR(@.name,''、'')+1) from @.pro  where INSTR(@.name,''、'')>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('将字段中的\"、\"替换为\"|\"(改,acc)','update @.pro set @.name=left(@.name,INSTR(@.name,''、'')-1)&''|''&mid(@.name,INSTR(@.name,''、'')+1) where  INSTR(@.name,''、'')>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('左截字符串(查,sql)','SELECT top 10 @.unit, left(@.unit,charindex(''('',@.unit)-1) from @.pro where charindex(''('',@.unit)>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('左截字符串(改,sql)','update @.pro set @.unit=left(@.unit,charindex(''('',@.unit)-1) where charindex(''('',@.unit)>0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('去掉前面的\",\"','update @.video set @.cntype=Mid(@.cntype,1) where left(@.cntype,1)='',''')",
          "insert into @.sqlhelp(@.note,@.sql) values ('新建表','create table [表名]([自动编号字段] int identity(1,1) primary key ,[字段1] nvarchar(50) default 默认值 null ,[字段2] text null ,[字段3] datetime,[字段4] money null ,[字段5] int default 0,[字段6] Decimal (12,4) default 0,[字段7] image null)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除数据','DELETE FROM [表名] WHERE [字段名]>100')",
          "insert into @.sqlhelp(@.note,@.sql) values ('新增字段','alter table [表名] add [字段名] nvarchar (50) NULL<br>alter table [表名] add [字段名] double default 0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除字段','alter table [表名] DROP column [字段名]')",
          "insert into @.sqlhelp(@.note,@.sql) values ('修改字段','alter table [表名] alter column [字段名] nvarchar (50) NULL')",
          "insert into @.sqlhelp(@.note,@.sql) values ('重命名表','sp_rename ''表名'', ''新表名'', ''OBJECT''')",
          "insert into @.sqlhelp(@.note,@.sql) values ('新建约束','alter table [表名] add CONSTRAINT 约束名 CHECK ([约束字段] <= ''2000-1-1'')')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除约束','alter table [表名] DROP CONSTRAINT 约束名')",
          "insert into @.sqlhelp(@.note,@.sql) values ('新建默认值','alter table [表名] add CONSTRAINT 默认值名 DEFAULT ''aaa'' FOR [字段名]')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除默认值','alter table [表名] DROP CONSTRAINT 默认值名')",
          "insert into @.sqlhelp(@.note,@.sql) values ('双表查询','Select a.@.ID,b.:ID from @.pro a Inner Join @.favorite b on a.@.id=b.@.InfoID')",
          "insert into @.sqlhelp(@.note,@.sql) values ('日期为空的更新','update @.pro set @.addtime=getdate() where @.addtime is null')",
          "insert into @.sqlhelp(@.note,@.sql) values ('跨表更新','update b set b.asd=a.sex, b.ddd=a.sex from a,b where a.name=b.name')",
          "insert into @.sqlhelp(@.note,@.sql) values ('查找替换（限SQL库数库）','update @.gatherurl set @.code=replace(cast(@.code AS varchar(8000)),''查找'',''替换'')')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除重复，保留一条','delete from @.pro where @.formid in (select @.formid from @.pro group by @.formid having count(@.formid) > 1) and @.id not in (select min(@.id) from @.pro group by @.formid having count(@.formid)>1)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('重复数据查询','select @.fromid,@.name from @.type where @.from=''dhgate'' and  @.fromid in (select @.fromid from @.type where @.from=''dhgate'' group by @.fromid having count(1) >= 2)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('添加字段1','alter table @.dhUpPro add @.upGroupId nvarchar(32)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('添加字段2','alter table @.APIaccount add @.upshelf integer default 0')",
          "insert into @.sqlhelp(@.note,@.sql) values ('baidu看IP','http://opendata.baidu.com/api.php?query=115.175.199.143&resource_id=6006&t=1429517349251&ie=utf8&format=json')",
          "insert into @.sqlhelp(@.note,@.sql) values ('taobao看IP','http://ip.taobao.com/outGetIpInfo?ip=47.88.18.117&accessKey=alibaba-inc')",
          "insert into @.sqlhelp(@.note,@.sql) values ('去掉一个店的所有商品','update @.product set @.hide=18 where @.id in(select @.proid from @.upproduct where @.upuserid=4025)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('删除12月的站内信','delete from @.message where month(rd_Sendtime)=12')",
          "insert into @.sqlhelp(@.note,@.sql) values ('去掉图片中的_640x640.jpg','update @.product set @.pic=replace(cast(rd_pic AS varchar(8000)),''_640x640.jpg'','')')",
          "insert into @.sqlhelp(@.note,@.sql) values ('---','delete  from @.images where datediff(day,rd_uptime,GETDATE())>100')",
          "insert into @.sqlhelp(@.note,@.sql) values ('SQL处理多级分类,查询结果呈树形结构','with area as(select @.fromID,rd_name,rd_isleaf from @.type where @.fromID=''200003498'' and @.from=''aliexpress'' union all select a.rd_fromID,a.rd_name,a.rd_isleaf from @.type a join area b on a.rd_upid=b.rd_fromid and a.rd_from=''aliexpress'') select * from area')",
          "insert into @.sqlhelp(@.note,@.sql) values ('【绑定分类】不对时，要需要更新','update @.dhUpPro  set @.examine=2 where @.proid in(select @.proid from @.product where @.from=''aliexpress'' and @.type=200003953)')",
          "insert into @.sqlhelp(@.note,@.sql) values ('把默认运费模板的数据改成问题数据','update @.product set @.hide=18 from @.dhUpPro as a,rd_product as b where a.rd_proid=b.rd_proid and a.rd_upFreightId=''ff8080815b0f792f015b7b36ed9f0fe3''')"
        ],
        */
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "note",
                type: "nvarchar(255)",
                default: "",
                des: "SQL说明"
            },
            {
                name: "sql",
                type: "text",
                default: "",
                des: "SQL例子"
            }
        ]
    },
    {
        name: "loginlog",
        des: "后台日志表",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "username",
                type: "varchar(50)",
                default: "",
                des: "用户"
            },
            {
                name: "ct",
                type: "nvarchar(10)",
                default: "",
                des: "国家 如：中国"
            },
            {
                name: "asn",
                type: "varchar(30)",
                default: "",
                des: "归属地"
            },
            {
                name: "status",
                type: "tinyint",
                default: "0",
                des: "橾作成功/橾作失败    0:表款失败；   1:表示成功；"
            },
            {
                name: "ip",
                type: "varchar(100)",
                default: "",
                des: "公网IP地址"
            },
            {
                name: "localip",
                type: "varchar(100)",
                default: "",
                des: "局域网IP地址"
            },
            {
                name: "logintime",
                type: "integer",
                default: "0",
                des: "登陆时间"
            },
            {
                name: "os",
                type: "varchar(255)",
                default: "",
                des: "操作系统"
            },
            {
                name: "des",
                type: "varchar(255)",
                default: "",
                des: "备注"
            },
            {
                name: "useragent",
                type: "varchar(255)",
                default: "",
                des: "客户信息"
            },
            {
                name: "origin",
                type: "varchar(255)",
                default: "",
                des: "当前URL"
            },
            {
                name: "referer",
                type: "varchar(255)",
                default: "",
                des: "来源URL"
            },
            {
                name: "browser",
                type: "varchar(255)",
                default: "",
                des: "浏览器"
            },
            {
                name: "lang",
                type: "varchar(50)",
                default: "",
                des: "语言"
            }
        ]
    },
    {
        name: "manager",
        des: "管理员表",
        database: "main",
        action: "sqlite",
        sql: [
            "insert into @.manager(@.name,@.pwd,@.state,@.GroupID)values('admin','1a55179d134cd8af19b11439eb6387472ae8ddc02a5190a3f47f8acf423d479e',1,1)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "username",
                type: "varchar(20)",
                default: "",
                des: "名称"
            },
            {
                name: "pwd",
                type: "varchar(64)",
                default: "",
                des: "密码（sha256加密）"
            },
            {
                name: "access_token",
                type: "varchar(64)",
                default: "",
                des: "access_token不能超过1天【expires_in:为access_token的到期时间戳】"
            },
            {
                name: "expires_in",
                type: "integer",
                default: "0",
                des: "access_token的到期时间戳"
            },
            {
                name: "refresh_token",
                type: "varchar(64)",
                default: "",
                des: "refresh_token不能超过30天"
            },
            {
                name: "islocked",
                type: "tinyint",
                default: "0",
                des: "是否锁定"
            },
            {
                name: "logintime",
                type: "integer",
                default: "0",
                des: "登陆时间"
            },
            {
                name: "loginip",
                type: "varchar(100)",
                default: "",
                des: "登陆IP"
            },
            {
                name: "randomnum",
                type: "varchar(64)",
                default: "",
                des: "加密的随机数"
            },
            {
                name: "GroupID",
                type: "integer",
                default: "0",
                des: "所属用户组ID"
            },
            {
                name: "RealName",
                type: "varchar(100)",
                default: "",
                des: "真实姓名"
            },
            {
                name: "TelPhone",
                type: "varchar(50)",
                default: "",
                des: "联系电话"
            },
            {
                name: "Sex",
                type: "varchar(5)",
                default: "",
                des: "性别"
            },
            {
                name: "email",
                type: "varchar(50)",
                default: "",
                des: "电子信箱"
            },
            {
                name: "LastLoginIP",
                type: "varchar(100)",
                default: "",
                des: "最后登陆IP"
            },
            {
                name: "LastLoginTime",
                type: "integer",
                default: "0",
                des: "上次登陆时间"
            },
            {
                name: "LoginTimes",
                type: "integer",
                default: "0",
                des: "登录次数"
            },
            {
                name: "des",
                type: "text",
                default: "",
                des: "简要说明"
            }
        ]
    },
    {
        name: "download",
        des: "应用商店-下载源",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "Name",
                type: "nvarchar(255)",
                default: "",
                des: "采集内容说明"
            },
            {
                name: "addTime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "url",
                type: "nvarchar(255)",
                default: "",
                des: "采集网址"
            },
            {
                name: "token",
                type: "nvarchar(255)",
                default: "",
                des: ""
            },
            {
                name: "sort",
                type: "integer",
                default: "0",
                des: "排序"
            }
        ]
    },
    {
        name: "usergroup",
        des: "用户组",
        database: "main",
        action: "sqlite",
        //"sql": [
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('网站管理员','开发者权限')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('超级管理员','最高管理权限')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('审核员','审核员')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('编辑员','编辑员')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('业务主管','管理业务员')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('业务员','管理订单，站内信')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('财务','财务审核付款')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('企业会员','企业注册会员')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('个人会员','个人注册会员,注册成功后您可以写日志,提问题等')",
        //  "insert into @.usergroup(@.name,@.Descript)VALUES ('匿名','前台访问')"
        //],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "groupid",
                type: "tinyint",
                default: "0",
                des: "会员组ID"
            },
            {
                name: "groupname",
                type: "varchar(100)",
                default: "",
                des: "会员组名称"
            },
            {
                name: "PowerList",
                type: "text",
                default: "",
                des: "权限"
            },
            {
                name: "Descript",
                type: "text",
                default: "",
                des: "备注"
            },
            {
                name: "Type",
                type: "tinyint",
                default: "0",
                des: "0系统默认1用户新建2管理员组3超级管理员组"
            },
            {
                name: "ChargeType",
                type: "tinyint",
                default: "0",
                des: "计费方式"
            },
            {
                name: "GroupPoint",
                type: "integer",
                default: "0",
                des: "默认点数"
            },
            {
                name: "ValidDays",
                type: "integer",
                default: "0",
                des: "有效期"
            },
            {
                name: "PowerType",
                type: "integer",
                default: "0",
                des: "1拥有前台的全部权限 2部分权限"
            },
            {
                name: "FormID",
                type: "integer",
                default: "0",
                des: "表单ID"
            },
            {
                name: "ShowOnReg",
                type: "tinyint",
                default: "0",
                des: "是否允许前台注册"
            },
            {
                name: "UserType",
                type: "tinyint",
                default: "0",
                des: "0个人会员 1企业会员"
            },
            {
                name: "TemplateFile",
                type: "varchar(255)",
                default: "",
                des: "模板"
            },
            {
                name: "SpaceSize",
                type: "integer",
                default: "0",
                des: "空间大小"
            },
            {
                name: "validtype",
                type: "tinyint",
                default: "0",
                des: ""
            },
            {
                name: "validEmail",
                type: "text",
                default: "",
                des: ""
            },
            {
                name: "GroupSetting",
                type: "text",
                default: "",
                des: "一些参数设置"
            },
            {
                name: "modelpower",
                type: "text",
                default: "",
                des: ""
            }
        ]
    },
    {
        name: "weblog",
        des: "访问日志",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "URL",
                type: "nvarchar(255)",
                default: "",
                des: "当前URL"
            },
            {
                name: "UserAgent",
                type: "nvarchar(255)",
                default: "",
                des: "客户信息"
            },
            {
                name: "fromURL",
                type: "nvarchar(255)",
                default: "",
                des: "来源URL"
            },
            {
                name: "IP",
                type: "nvarchar(100)",
                default: "",
                des: "ipv4最大长度15；ipv6最大长度63；获取是合在一起的共：15+63+1=79---这是网上的数据我这里给100"
            },
            {
                name: "OS",
                type: "nvarchar(50)",
                default: "",
                des: "操作系统"
            },
            {
                name: "Browser",
                type: "nvarchar(255)",
                default: "",
                des: "浏览器"
            },
            {
                name: "lang",
                type: "nvarchar(50)",
                default: "",
                des: "语言"
            },
            {
                name: "ASN",
                type: "nvarchar(30)",
                default: "",
                des: "归属地"
            },
            {
                name: "ct",
                type: "nvarchar(10)",
                default: "",
                des: "国家 如：中国"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
    {
        name: "weblog_os",
        des: "访问日志_操作系统占比",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "OS",
                type: "nvarchar(50)",
                default: "0 unique",
                des: "操作系统"
            },
            {
                name: "count",
                type: "integer",
                default: "0",
                des: "访问次数"
            }
        ]
    },
    {
        name: "ip",
        des: "ip库",
        database: "main",
        action: "sqlite",
        "sql": [
            "create UNIQUE index PK_ip ON @.ip(@.ip)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "ASN",
                type: "nvarchar(30)",
                default: "",
                des: "ASN归属地"
            },
            {
                name: "ip",
                type: "nvarchar(100)",
                default: "0 unique",
                des: "ipv4最大长度15；ipv6最大长度63；获取是合在一起的共：15+63+1=79---这是网上的数据我这里给100"
            },
            {
                name: "isp",
                type: "nvarchar(20)",
                default: "",
                des: "运营商 如：电信"
            },
            {
                name: "ct",
                type: "nvarchar(10)",
                default: "",
                des: "国家 如：中国"
            },
            {
                name: "prov",
                type: "nvarchar(20)",
                default: "",
                des: "省州 如：上海市"
            },
            {
                name: "city",
                type: "nvarchar(20)",
                default: "",
                des: "城市 如：上海市"
            },
            {
                name: "area",
                type: "nvarchar(20)",
                default: "",
                des: "地区 如：滨江区"
            },
            {
                name: "idc",
                type: "nvarchar(30)",
                default: "",
                des: "互联网数据中心 如：【360蜘蛛】或【中国电信股份有限公司富阳分公司】"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间"
            },
            {
                name: "hit",
                type: "integer",
                default: "0",
                des: "访问次数"
            }
        ]
    },
    {
        name: "dhgatelogimg",
        des: "上传到敦煌的图片访问日志",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "",
                des: "商品编码（如：R123456）"
            },
            {
                name: "URL",
                type: "varchar(255)",
                default: "",
                des: "当前URL"
            },
            {
                name: "UserAgent",
                type: "varchar(255)",
                default: "",
                des: "客户信息"
            },
            {
                name: "fromURL",
                type: "varchar(255)",
                default: "",
                des: "来源URL"
            },
            {
                name: "IP",
                type: "varchar(100)",
                default: "",
                des: "IP"
            },
            {
                name: "OS",
                type: "varchar(50)",
                default: "",
                des: "操作系统"
            },
            {
                name: "Browser",
                type: "varchar(255)",
                default: "",
                des: "浏览器"
            },
            {
                name: "lang",
                type: "varchar(50)",
                default: "",
                des: "语言"
            },
            {
                name: "ct",
                type: "varchar(10)",
                default: "",
                des: "国家 如：中国"
            },
            {
                name: "ASN",
                type: "varchar(30)",
                default: "",
                des: "归属地"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "uptime",
                type: "integer",
                default: "0",
                des: "更新时间"
            },
            {
                name: "timeLen",
                type: "integer",
                default: "0",
                des: "停留时长（通过用户刷新Session来获取）"
            },
            {
                name: "count",
                type: "integer",
                default: "0",
                des: "访问次数（通过用户Cookie来获取）"
            },
            {
                name: "user32",
                type: "varchar(50)",
                default: "",
                des: "用户（32位）"
            }
        ]
    },
    {
        name: "dhgatelogimg_os",
        des: "上传到敦煌的图片访问日志_操作系统占比",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "OS",
                type: "nvarchar(50)",
                default: "0 unique",
                des: "操作系统"
            },
            {
                name: "count",
                type: "integer",
                default: "0",
                des: "访问次数"
            }
        ]
    },
    {
        name: "dhgatelogpro",
        des: "上传到敦煌的商品访问日志",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "",
                des: "当前商品编码（如：R123456）"
            },
            {
                name: "proidr",
                type: "varchar(10)",
                default: "",
                des: "来源商品编码（如：R123456）"
            },
            {
                name: "URL",
                type: "varchar(255)",
                default: "",
                des: "当前URL"
            },
            {
                name: "UserAgent",
                type: "varchar(255)",
                default: "",
                des: "客户信息"
            },
            {
                name: "fromURL",
                type: "varchar(255)",
                default: "",
                des: "来源URL"
            },
            {
                name: "IP",
                type: "varchar(100)",
                default: "",
                des: "IP"
            },
            {
                name: "OS",
                type: "varchar(50)",
                default: "",
                des: "操作系统"
            },
            {
                name: "ct",
                type: "varchar(10)",
                default: "",
                des: "国家 如：中国"
            },
            {
                name: "Browser",
                type: "varchar(255)",
                default: "",
                des: "浏览器"
            },
            {
                name: "lang",
                type: "varchar(50)",
                default: "",
                des: "语言"
            },
            {
                name: "ASN",
                type: "varchar(30)",
                default: "",
                des: "归属地"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
    {
        name: "dhgatelogpro_os",
        des: "上传到敦煌商品的访问日志_操作系统占比",
        database: "main",
        action: "sqlite",
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "OS",
                type: "nvarchar(50)",
                default: "0 unique",
                des: "操作系统"
            },
            {
                name: "count",
                type: "integer",
                default: "0",
                des: "访问次数"
            }
        ]
    }
])