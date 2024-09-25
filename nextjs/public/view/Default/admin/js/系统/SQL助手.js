'use strict';
var fun =
{
    a01: function () {
        this.b02();
    },
    b01: function () {
        let dbName = "", str = "", dbArr = {};
        for (let i = 0; i < mssql.length; i++) {
            if (mssql[i].db) {
                if (mssql[i].db.indexOf("|") == -1) {
                    dbName = mssql[i].dbType + "." + mssql[i].db
                    if (!dbArr[dbName]) { dbArr[dbName] = []; }
                }
                else {
                    let arr = mssql[i].db.split("|"), num = parseInt(arr[1]);
                    for (let j = 1; j <= num; j++) {
                        dbName = mssql[i].dbType + "." + arr[0] + j
                        if (!dbArr[dbName]) { dbArr[dbName] = []; }
                    }
                }
            }
            else {
                if (!dbArr["默认"]) { dbArr["默认"] = []; }
            }
        }
        /////////////////////////////////////////////////
        for (let k in dbArr) {
            str += '<option value="' + k + '">' + k + '</option>'
        }
        return str;
    },
    b02: function () {
        let html = '\
		<header class="panel-heading">\
			<div onclick="fun.c03(1);" val="1" class="active">SQL助手</div>\
			<div onclick="fun.c03(2);" val="2">SQL帮助</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
        <tr><td class="right w100">数据库：</td><td><select class="form-select" id="db">'+ this.b01() + '</select></td></tr>\
        <tr>\
					<td class="right w100">SQL语句：</td>\
					<td>\
					<div class="bd-clipboard w-100">\
						<textarea id="sql" rows="5" class="form-control form-control-sm">update rd_ip set rd_ct=null where rd_ct=\'\'</textarea>\
						<button class="btn-clipboard" data-clipboard-target="#sql">复制</button>\
					</div>\
					</td>\
				</tr>\
        <tr>\
					<td></td>\
					<td>\
            <button type="button" class="btn btn-secondary" onclick="fun.c01($(this))">执行SQL语句</button>\
						（多条SQL语句用【&lt;1/&gt;】分隔）\
					</td>\
				</tr>\
        <tr>\
					<td class="right w100">返回结果：</td>\
					<td>\
					<div class="bd-clipboard w-100">\
						<textarea rows="20" class="form-control" id="ExecuteSQL_tbody"></textarea>\
						<button class="btn-clipboard" data-clipboard-target="#ExecuteSQL_tbody">复制</button>\
					</div>\
				</td></tr>\
        </tbody>\
      </table>\
    </div>'
        Tool.html(this.b03, this, html)
    },
    b03: function () {
        new ClipboardJS('.btn-clipboard');
    },
    c01: function (This) {
        This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
        $("#ExecuteSQL_tbody").val("加载中。。。")
        //Tool.ajax.a01(json"<r: db="'+$("#db").val()+>'+$("#sql").val()+'</r:>',1,this.c02, '',this,This)
    },
    c02: function (oo, This) {
        This.html("执行SQL语句").attr("disabled", false);
        $("#ExecuteSQL_tbody").val(JSON.stringify(oo, null, 2));
    },
    c03: function (val) {
        if (val == 1) { this.b02(); }
        else if (val == 2) { this.d01(); }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    d01: function () {
        let str = '\
    \
    [{}<r:sqlhelp size="100">,\
    {\
      "note":"<:note tag=js/>",\
      "sql":"<:sql tag=js/>"\
    }\
    </r:sqlhelp>]'
        Tool.ajax.a01(str, 1, this.d02, this)
        //let arr=[]
        /*for(let i=1;i<=9;i++)
        {
          //insert into @.smtProDes"+i+"(rd_proid,rd_HistoryPrice,rd_fromUrl,rd_videoUrl,rd_aeopAeProductPropertys,rd_aeopAeProductSKUs,rd_pic,rd_des,rd_note)select @.proid,rd_HistoryPrice,rd_fromUrl,rd_videoUrl,rd_aeopAeProductPropertys,rd_aeopAeProductSKUs,rd_pic,rd_des,rd_note from @.smtProDes___"+i+"
          //drop table @.smtProDes___"+i+"
          //exec sp_rename 'rd_smtProDes"+i+"','rd_smtProDes___"+i+"','object'
          //delete  from @.smtProDes"+i+" where @.proid not in(select @.proid FROM @.smtPro)
          Tool.write("exec sp_rename 'rd_smtPro_Des"+i+"','rd_smtProDes"+i+"','object'<br/>")
          
        }*/
        //Tool.write(arr.join("<1/>"))
    },
    d02: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
      <td>'+ i + '</td>\
      <td>'+ arr[i].note + '</td>\
      <td>\
				<div class="bd-clipboard w-100">\
					<textarea class="form-control" id="sql'+ i + '">' + arr[i].sql + '</textarea>\
					<button class="btn-clipboard" data-clipboard-target="#sql'+ i + '">复制</button>\
				</div>\
			</td>\
      </tr>'
        }
        html += '\
    <tr>\
      <td>--</td>\
      <td>创建数据库</td>\
      <td><textarea class="form-control">use master --选择要操作的数据库\n\
create database TestNewBase --数据库名称\n\
on primary --主文件组\n\
(\n\
  name=\'TestNewBase\',--数据库主要数据文件的逻辑名\n\
  filename=\'E:\\project\\db\\TestNewBase.mdf\',--主要数据文件的路径（绝对路径）\n\
  size=5MB,--数据库主要文件的初始大小\n\
  filegrowth=1MB--文件的增量\n\
)\n\
log on --创建日志文件\n\
(\n\
  name=\'TestNewBase_log\',--数据库主要数据文件的逻辑名\n\
  filename=\'E:\\project\\db\\TestNewBase_log.ldf\',--主要数据文件的路径（绝对路径）\n\
  size=1MB,--数据库主要文件的初始大小\n\
  filegrowth=10%--文件的增量\n\
)\
</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除数据库</td>\
      <td><textarea class="form-control">drop database TestNewBase</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建表(有约束)</td>\
      <td><textarea class="form-control">create table ProductType\n\
(\n\
  TypeId int identity(1,1) primary key not null,\n\
  TypeName nvarchar(20) not null\n\
)\n\
create table ProductInfos\n\
(\n\
  id int identity(101,1) primary key not null,--标识种子，增量\n\
  ProNo varchar(50) unique not null,--唯一约束\n\
  ProName nvarchar(50) not null,\n\
  TypeId int not null foreign key references ProductType(TypeId),\n\
  Price decimal(18,2) check(Price<10000) default (0.00) not null,--check约束\n\
  ProCount int default(0) null--默认约束\n\
)\
</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除表</td>\
      <td><textarea class="form-control">Drop table [表名]\ndrop table ProductInfos\ndrop table ProductType</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加一列</td>\
      <td><textarea class="form-control">alter table ProductInfos add ProRemark nvarchar(max) null</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除一列</td>\
      <td><textarea class="form-control">alter table ProductInfos drop column ProRemark</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改列类型</td>\
      <td><textarea class="form-control">alter table ProductInfos alter column ProRemark nvarchar(50) null</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改列名/表名</td>\
      <td><textarea class="form-control">exec sp_rename \'ProductInfos.ProCount\',\'Count\',\'column\'--修改列名\n\
exec sp_rename \'rd_smtProDes0\',\'rd_smt___ProDes0\',\'object\'--修改表名</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建表(没约束)</td>\
      <td><textarea class="form-control">create table ProductInfos\n\
(\n\
  id int identity(101,1) not null,--标识种子，增量\n\
  ProNo varchar(50) not null,\n\
  ProName nvarchar(50) not null,\n\
  TypeId int not null,\n\
  Price decimal(18,2) not null,\n\
  ProCount int null\n\
)\n\
create table ProductType\n\
(\n\
  TypeId int identity(1,1) primary key not null,\n\
  TypeName nvarchar(20) not null\n\
)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加主键约束</td>\
      <td>\
<textarea class="form-control">alter table ProductInfos add constraint PK_ProductInfos primary key(id)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加外键约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint FK_ProductInfos foreign key(TypeId) references ProductType(TypeId)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>唯一约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint IX_ProductInfos_ProNo unique(ProNo)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>联合唯一约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint IX_ProductInfos_ProNo unique(ProNo,ProName)--要让name和email两个结合起来唯一，单个不唯一</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>check约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint CK_ProductInfos_Price check(Price<10000)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>default约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint Df_ProductInfos_ProCount default(0) for ProCount</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>单条插入</td>\
      <td><textarea class="form-control">insert into ProductType(TypeName)values(\'工具类\')\ninsert into ProductType(TypeName)select \'工具类2\'\ninsert into ProductInfos(ProNo,ProName,TypeId)values(\'3344441\',\'工3具1\',1)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>多条插入</td>\
      <td><textarea class="form-control">insert into ProductType(TypeName)values(\'工具1\'),(\'工具2\'),(\'工具3\'),(\'工具4\')\n\insert into ProductType(TypeName)select \'工1\' union select \'工2\' union select\'工3\' union select \'工4\'\n\insert into ProductType(TypeName)select \'工\' union select \'工\' union select\'工\'--(结果：1 行受影响)原因：union会去重复，换成union all就不会，且还快</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>克隆表（目标表不存在）</td>\
      <td><textarea class="form-control">select TypeName into Test--目标表\n\
from ProductType--源表</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>克隆表（目标表存在）</td>\
      <td><textarea class="form-control">insert into Test(TypeName)--目标表\n\
select TypeName from ProductType--源表</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除数据且恢复初始值</td>\
      <td><textarea class="form-control">truncate table ProductInfos</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>范围查询 between and（推荐）</td>\
      <td><textarea class="form-control">select * from ProductInfos where ProCount between 21 and 33--等价于 ProCount>=20 and ProCount<=33</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建视图</td>\
      <td><textarea class="form-control">create view vProductInfos as\nselect u.ProName,t.TypeId,t.TypeName from ProductInfos u inner join ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改视图</td>\
      <td><textarea class="form-control">alter view vProductInfos as\nselect u.ProNo,u.ProName,t.TypeId,t.TypeName from ProductInfos u inner join ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>索引视图</td>\
      <td><textarea class="form-control">create view vProductInfos_index with schemabinding as\nselect u.ProNo,u.ProName,t.TypeId,t.TypeName from dbo.ProductInfos u inner join dbo.ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建唯一聚集索引</td>\
      <td><textarea class="form-control">create unique clustered index uq_vProductInfos_index on vProductInfos_index(ProNo)</textarea></td>\
    </tr>'
        html += '\
    <tr><td colspan="3" class="left">提示：<a href="http://www.1keydata.com/tw/sql/sql.html" target="_blank">更多sql语句应用教程</a>&nbsp;|&nbsp;<a href="http://blog.csdn.net/ch4230052/article/details/8230805" target="_blank">创建表、删除表 增加字段 删除字段操作</a>&nbsp;|&nbsp;<a href="http://blog.163.com/wxdl_1029/blog/static/44690988201022533'
        html = '\
    <header class="panel-heading">\
			<div onclick="fun.c03(1);" val="1">SQL助手</div>\
			<div onclick="fun.c03(2);" val="2" class="active">SQL帮助</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w200">说明</th>\
          <th class="left">案例</th>\
        </tr>\
        </thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(this.b03, this, html)
    }
}
fun.a01();

/*
    $('.panel-heading div').removeClass()
        $(".panel-heading div[val="+val+"]").addClass("active");
    let str=""
<td class="w80 right">【每页</td>\
<td class="w100"><input type="text" size="10" value="1000" id="size" class="form-control form-control-sm"></td>\
<td class="w90">条，结束ID</td>\
<td class="w100"><input type="text" size="10" value="500000" id="EndID" class="form-control form-control-sm"></td>\
<td class="w110"><input type="button"class="btn btn-sm btn-secondary" id="updateSQL" value="开始更新数据"></td>\
<td>】一次可以执行多条SQL语句，多条语句请用回车换行隔开。</td>\
//Tool.ajax.a01("<.ExecuteResult("+sql+")/>",1,this.c02,  this)
let date={}
$(function(){
    $("#ExecuteSQL").click(function(){
    });
    $("#updateSQL").click(function(){
        $("#ExecuteSQL_tbody").show()
        date.page=1
        date.maxID=0
        date.minID=1
        date.size=parseInt($("#size").val())
        date.EndID=parseInt($("#EndID").val())
        date.pcount=parseInt(date.EndID/date.size)
        date.sql=$("#sql").val()
        forFun()
    });
});
function forFun()
{
    date.maxID+=date.size
    let where=" and @.id>="+date.minID+" and @.id<"+date.maxID
    if(date.page<=date.pcount)
    {
        $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent("{"+"Fun(ExecuteResult("+encodeURIComponent(date.sql+where)+"))}")},success:function(txt)
        {
            date.page++
            date.minID=date.maxID
            $("#Execute").html("<img src='<.Path/>admin/img/loading.gif' alt='执行SQL语句 ...' align='absmiddle'/>"+txt);
            setTimeout("forFun();",1000);
        }});
    }
    else
    {
        $("#Execute").html("操作完成");
    }
}
 */'use strict';
var fun =
{
    a01: function () {
        this.b02();
    },
    b01: function () {
        let dbName = "", str = "", dbArr = {};
        for (let i = 0; i < mssql.length; i++) {
            if (mssql[i].db) {
                if (mssql[i].db.indexOf("|") == -1) {
                    dbName = mssql[i].dbType + "." + mssql[i].db
                    if (!dbArr[dbName]) { dbArr[dbName] = []; }
                }
                else {
                    let arr = mssql[i].db.split("|"), num = parseInt(arr[1]);
                    for (let j = 1; j <= num; j++) {
                        dbName = mssql[i].dbType + "." + arr[0] + j
                        if (!dbArr[dbName]) { dbArr[dbName] = []; }
                    }
                }
            }
            else {
                if (!dbArr["默认"]) { dbArr["默认"] = []; }
            }
        }
        /////////////////////////////////////////////////
        for (let k in dbArr) {
            str += '<option value="' + k + '">' + k + '</option>'
        }
        return str;
    },
    b02: function () {
        let html = '\
		<header class="panel-heading">\
			<div onclick="fun.c03(1);" val="1" class="active">SQL助手</div>\
			<div onclick="fun.c03(2);" val="2">SQL帮助</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
        <tr><td class="right w100">数据库：</td><td><select class="form-select" id="db">'+ this.b01() + '</select></td></tr>\
        <tr>\
					<td class="right w100">SQL语句：</td>\
					<td>\
					<div class="bd-clipboard w-100">\
						<textarea id="sql" rows="5" class="form-control form-control-sm">update rd_ip set rd_ct=null where rd_ct=\'\'</textarea>\
						<button class="btn-clipboard" data-clipboard-target="#sql">复制</button>\
					</div>\
					</td>\
				</tr>\
        <tr>\
					<td></td>\
					<td>\
            <button type="button" class="btn btn-secondary" onclick="fun.c01($(this))">执行SQL语句</button>\
						（多条SQL语句用【&lt;1/&gt;】分隔）\
					</td>\
				</tr>\
        <tr>\
					<td class="right w100">返回结果：</td>\
					<td>\
					<div class="bd-clipboard w-100">\
						<textarea rows="20" class="form-control" id="ExecuteSQL_tbody"></textarea>\
						<button class="btn-clipboard" data-clipboard-target="#ExecuteSQL_tbody">复制</button>\
					</div>\
				</td></tr>\
        </tbody>\
      </table>\
    </div>'
        Tool.html(this.b03, this, html)
    },
    b03: function () {
        new ClipboardJS('.btn-clipboard');
    },
    c01: function (This) {
        This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
        $("#ExecuteSQL_tbody").val("加载中。。。")
        //Tool.ajax.a01(json"<r: db="'+$("#db").val()+>'+$("#sql").val()+'</r:>',1,this.c02, '',this,This)
    },
    c02: function (oo, This) {
        This.html("执行SQL语句").attr("disabled", false);
        $("#ExecuteSQL_tbody").val(JSON.stringify(oo, null, 2));
    },
    c03: function (val) {
        if (val == 1) { this.b02(); }
        else if (val == 2) { this.d01(); }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    d01: function () {
        let str = '\
    \
    [{}<r:sqlhelp size="100">,\
    {\
      "note":"<:note tag=js/>",\
      "sql":"<:sql tag=js/>"\
    }\
    </r:sqlhelp>]'
        Tool.ajax.a01(str, 1, this.d02, this)
        //let arr=[]
        /*for(let i=1;i<=9;i++)
        {
          //insert into @.smtProDes"+i+"(rd_proid,rd_HistoryPrice,rd_fromUrl,rd_videoUrl,rd_aeopAeProductPropertys,rd_aeopAeProductSKUs,rd_pic,rd_des,rd_note)select @.proid,rd_HistoryPrice,rd_fromUrl,rd_videoUrl,rd_aeopAeProductPropertys,rd_aeopAeProductSKUs,rd_pic,rd_des,rd_note from @.smtProDes___"+i+"
          //drop table @.smtProDes___"+i+"
          //exec sp_rename 'rd_smtProDes"+i+"','rd_smtProDes___"+i+"','object'
          //delete  from @.smtProDes"+i+" where @.proid not in(select @.proid FROM @.smtPro)
          Tool.write("exec sp_rename 'rd_smtPro_Des"+i+"','rd_smtProDes"+i+"','object'<br/>")
          
        }*/
        //Tool.write(arr.join("<1/>"))
    },
    d02: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
      <td>'+ i + '</td>\
      <td>'+ arr[i].note + '</td>\
      <td>\
				<div class="bd-clipboard w-100">\
					<textarea class="form-control" id="sql'+ i + '">' + arr[i].sql + '</textarea>\
					<button class="btn-clipboard" data-clipboard-target="#sql'+ i + '">复制</button>\
				</div>\
			</td>\
      </tr>'
        }
        html += '\
    <tr>\
      <td>--</td>\
      <td>创建数据库</td>\
      <td><textarea class="form-control">use master --选择要操作的数据库\n\
create database TestNewBase --数据库名称\n\
on primary --主文件组\n\
(\n\
  name=\'TestNewBase\',--数据库主要数据文件的逻辑名\n\
  filename=\'E:\\project\\db\\TestNewBase.mdf\',--主要数据文件的路径（绝对路径）\n\
  size=5MB,--数据库主要文件的初始大小\n\
  filegrowth=1MB--文件的增量\n\
)\n\
log on --创建日志文件\n\
(\n\
  name=\'TestNewBase_log\',--数据库主要数据文件的逻辑名\n\
  filename=\'E:\\project\\db\\TestNewBase_log.ldf\',--主要数据文件的路径（绝对路径）\n\
  size=1MB,--数据库主要文件的初始大小\n\
  filegrowth=10%--文件的增量\n\
)\
</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除数据库</td>\
      <td><textarea class="form-control">drop database TestNewBase</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建表(有约束)</td>\
      <td><textarea class="form-control">create table ProductType\n\
(\n\
  TypeId int identity(1,1) primary key not null,\n\
  TypeName nvarchar(20) not null\n\
)\n\
create table ProductInfos\n\
(\n\
  id int identity(101,1) primary key not null,--标识种子，增量\n\
  ProNo varchar(50) unique not null,--唯一约束\n\
  ProName nvarchar(50) not null,\n\
  TypeId int not null foreign key references ProductType(TypeId),\n\
  Price decimal(18,2) check(Price<10000) default (0.00) not null,--check约束\n\
  ProCount int default(0) null--默认约束\n\
)\
</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除表</td>\
      <td><textarea class="form-control">Drop table [表名]\ndrop table ProductInfos\ndrop table ProductType</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加一列</td>\
      <td><textarea class="form-control">alter table ProductInfos add ProRemark nvarchar(max) null</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除一列</td>\
      <td><textarea class="form-control">alter table ProductInfos drop column ProRemark</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改列类型</td>\
      <td><textarea class="form-control">alter table ProductInfos alter column ProRemark nvarchar(50) null</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改列名/表名</td>\
      <td><textarea class="form-control">exec sp_rename \'ProductInfos.ProCount\',\'Count\',\'column\'--修改列名\n\
exec sp_rename \'rd_smtProDes0\',\'rd_smt___ProDes0\',\'object\'--修改表名</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建表(没约束)</td>\
      <td><textarea class="form-control">create table ProductInfos\n\
(\n\
  id int identity(101,1) not null,--标识种子，增量\n\
  ProNo varchar(50) not null,\n\
  ProName nvarchar(50) not null,\n\
  TypeId int not null,\n\
  Price decimal(18,2) not null,\n\
  ProCount int null\n\
)\n\
create table ProductType\n\
(\n\
  TypeId int identity(1,1) primary key not null,\n\
  TypeName nvarchar(20) not null\n\
)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加主键约束</td>\
      <td>\
<textarea class="form-control">alter table ProductInfos add constraint PK_ProductInfos primary key(id)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>添加外键约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint FK_ProductInfos foreign key(TypeId) references ProductType(TypeId)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>唯一约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint IX_ProductInfos_ProNo unique(ProNo)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>联合唯一约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint IX_ProductInfos_ProNo unique(ProNo,ProName)--要让name和email两个结合起来唯一，单个不唯一</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>check约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint CK_ProductInfos_Price check(Price<10000)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>default约束</td>\
      <td><textarea class="form-control">alter table ProductInfos add constraint Df_ProductInfos_ProCount default(0) for ProCount</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>单条插入</td>\
      <td><textarea class="form-control">insert into ProductType(TypeName)values(\'工具类\')\ninsert into ProductType(TypeName)select \'工具类2\'\ninsert into ProductInfos(ProNo,ProName,TypeId)values(\'3344441\',\'工3具1\',1)</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>多条插入</td>\
      <td><textarea class="form-control">insert into ProductType(TypeName)values(\'工具1\'),(\'工具2\'),(\'工具3\'),(\'工具4\')\n\insert into ProductType(TypeName)select \'工1\' union select \'工2\' union select\'工3\' union select \'工4\'\n\insert into ProductType(TypeName)select \'工\' union select \'工\' union select\'工\'--(结果：1 行受影响)原因：union会去重复，换成union all就不会，且还快</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>克隆表（目标表不存在）</td>\
      <td><textarea class="form-control">select TypeName into Test--目标表\n\
from ProductType--源表</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>克隆表（目标表存在）</td>\
      <td><textarea class="form-control">insert into Test(TypeName)--目标表\n\
select TypeName from ProductType--源表</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>删除数据且恢复初始值</td>\
      <td><textarea class="form-control">truncate table ProductInfos</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>范围查询 between and（推荐）</td>\
      <td><textarea class="form-control">select * from ProductInfos where ProCount between 21 and 33--等价于 ProCount>=20 and ProCount<=33</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建视图</td>\
      <td><textarea class="form-control">create view vProductInfos as\nselect u.ProName,t.TypeId,t.TypeName from ProductInfos u inner join ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>修改视图</td>\
      <td><textarea class="form-control">alter view vProductInfos as\nselect u.ProNo,u.ProName,t.TypeId,t.TypeName from ProductInfos u inner join ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>索引视图</td>\
      <td><textarea class="form-control">create view vProductInfos_index with schemabinding as\nselect u.ProNo,u.ProName,t.TypeId,t.TypeName from dbo.ProductInfos u inner join dbo.ProductType t on t.TypeId=u.TypeId</textarea></td>\
    </tr>\
    <tr>\
      <td>--</td>\
      <td>创建唯一聚集索引</td>\
      <td><textarea class="form-control">create unique clustered index uq_vProductInfos_index on vProductInfos_index(ProNo)</textarea></td>\
    </tr>'
        html += '\
    <tr><td colspan="3" class="left">提示：<a href="http://www.1keydata.com/tw/sql/sql.html" target="_blank">更多sql语句应用教程</a>&nbsp;|&nbsp;<a href="http://blog.csdn.net/ch4230052/article/details/8230805" target="_blank">创建表、删除表 增加字段 删除字段操作</a>&nbsp;|&nbsp;<a href="http://blog.163.com/wxdl_1029/blog/static/44690988201022533'
        html = '\
    <header class="panel-heading">\
			<div onclick="fun.c03(1);" val="1">SQL助手</div>\
			<div onclick="fun.c03(2);" val="2" class="active">SQL帮助</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w200">说明</th>\
          <th class="left">案例</th>\
        </tr>\
        </thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(this.b03, this, html)
    }
}
fun.a01();

/*
    $('.panel-heading div').removeClass()
        $(".panel-heading div[val="+val+"]").addClass("active");
    let str=""
<td class="w80 right">【每页</td>\
<td class="w100"><input type="text" size="10" value="1000" id="size" class="form-control form-control-sm"></td>\
<td class="w90">条，结束ID</td>\
<td class="w100"><input type="text" size="10" value="500000" id="EndID" class="form-control form-control-sm"></td>\
<td class="w110"><input type="button"class="btn btn-sm btn-secondary" id="updateSQL" value="开始更新数据"></td>\
<td>】一次可以执行多条SQL语句，多条语句请用回车换行隔开。</td>\
//Tool.ajax.a01("<.ExecuteResult("+sql+")/>",1,this.c02,  this)
let date={}
$(function(){
    $("#ExecuteSQL").click(function(){
    });
    $("#updateSQL").click(function(){
        $("#ExecuteSQL_tbody").show()
        date.page=1
        date.maxID=0
        date.minID=1
        date.size=parseInt($("#size").val())
        date.EndID=parseInt($("#EndID").val())
        date.pcount=parseInt(date.EndID/date.size)
        date.sql=$("#sql").val()
        forFun()
    });
});
function forFun()
{
    date.maxID+=date.size
    let where=" and @.id>="+date.minID+" and @.id<"+date.maxID
    if(date.page<=date.pcount)
    {
        $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent("{"+"Fun(ExecuteResult("+encodeURIComponent(date.sql+where)+"))}")},success:function(txt)
        {
            date.page++
            date.minID=date.maxID
            $("#Execute").html("<img src='<.Path/>admin/img/loading.gif' alt='执行SQL语句 ...' align='absmiddle'/>"+txt);
            setTimeout("forFun();",1000);
        }});
    }
    else
    {
        $("#Execute").html("操作完成");
    }
}
 */