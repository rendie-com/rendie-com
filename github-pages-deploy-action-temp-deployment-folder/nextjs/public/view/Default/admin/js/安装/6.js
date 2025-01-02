'use strict';
var fun =
{
    obj: {
        A1: 1, A2: mssql.length, Aarr: mssql,
        B1: 1, B2: 0
    },
    a01: function () {
        $(".bz").attr("class", "bz a6")
        $(".ct_box").attr("class", "ct_box")
        $("title").html("安装详细过程 - rendie 安装向导");
        $(".btn_box").html('<a href="/install/5" class="s_btn pre">上一步</a><a href="/install/7"  class="x_btn">下一步</a>');
        this.a02();
    },
    a02: function () {
        if (this.obj.A1 <= this.obj.A2) {
            this.a03();
        }
        else {
            $("#chkdata").html("<font color='white'>已安装完成！</font>");
        }
    },
    a03: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1];
        let p1 = (this.obj.A1 / this.obj.A2 * 100).toFixed(2)
        $(".l").html('<p id="chkdata" style="padding-top:240px;text-align:center;color:white;">' + p1 + '%</p>');
        $(".nr").append('（ ' + this.obj.A1 + '/' + this.obj.A2 + ' ） ' + oo.action + '.' + oo.database + '.' + oo.name + ' 【' + oo.des + '】');
        this.a04(oo);
    },
    a04: function (oo) {
        if (oo.database.indexOf("${100}") != -1)//要不要建多个表
        {
            let arr = oo.database.split("${100}");
            oo.database = arr[0];
            this.obj.B2 = parseInt(100);
            this.a05(oo);
        }
        else {
            this.obj.B2 = 1;
            this.a05(oo);
        }
    },
    a05: function (oo) {
        if (this.obj.B1 <= this.obj.B2) {
            this.a06(oo)
        }
        else {
            this.a08();
        }
    },
    a06: function (oo) {
        //数据库是否存在
        let database = this.obj.B2 != 1 ? oo.database + (this.obj.B1.toString().padStart(("" + this.obj.B2).length, '0')) : oo.database
        if (oo.action == "mysql") {
            alert("没做" + oo.action)
            //Tool.mysql.a01(oo, database, this.obj.B1, this.obj.B2, this.a07, this);
        }
        else if (oo.action == "pg01" || oo.action == "pg02" || oo.action == "pg03" || oo.action == "pg04") {
            Tool.pg.a01(oo, database, this.obj.B1, this.obj.B2, this.a07, this, oo);
        }
        else if (oo.action == "sqlite") {
            Tool.sqlite.a01(oo, database, this.obj.B1, this.obj.B2, this.a07, this, oo);
        }
        else if (oo.action == "dynamodb") {
            Tool.DynamoDB.a01(oo, database, this.obj.B1, this.obj.B2, this.a07, this, oo);
        }
        else {
            alert("没做" + oo.action)
        }
    },
    a07: function (oo) {
        this.obj.B1++;
        this.a05(oo);
    },
    a08: function () {
        $(".nr").append('<br/>&nbsp;');
        $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
        this.obj.A1++; this.obj.B1 = 1; this.obj.B2 = 0;
        this.a02();
    }
}
fun.a01();

//b02: function (oo) {
//    let select1 = ""
//    if (oo.dbType == "access") {
//        select1 = "select count(1) from Msysobjects where name = '@." + oo.name + "'"
//    }
//    else if (oo.dbType == "sql server 2012" || oo.dbType == "sql server 2005/2008") {
//        select1 = "select count(1) from sysobjects where id = object_id('@." + oo.name + "') and OBJECTPROPERTY(id, 'IsUserTable') = 1"
//    }
//
//    return '<if Fun(Db(' + oo.dbType + '.' + (this.obj.B2 != 1 ? oo.db + this.obj.B1 : oo.db) + ',' + select1 + ',count))==0>要建表</if>';
//},
/*
a05:function(t,oo)//正常建表
{
$(".nr").append("。")
if(t=="要建表")
{
        let str='<r: db="mysql.admin">'+this.b03(this.obj.ConnType,oo)+'</r:>'
       Tool.ajax.a01(str,1,this.a08, this,oo);
    }
else
{$(".nr").append("（已存在,跳过）"+t);this.a10();}
},
a08:function(t,oo)
{
$(".nr").append("。")
if(t.indexOf("建立数据连接失败！")!=-1)
{
  let str='<.FileCopy('+this.obj.path+'access2003.mdb,'+this.obj.path+(this.obj.B2!=1?oo.db+this.obj.B1:oo.db)+'.aspx)/>'
 Tool.ajax.a01(str,1,this.a07, this,oo);
}
else if(t=="要建表")
{
  //Tool.echo(oo)
 Tool.ajax.a01(oo)+'</r:>',1,this.a09,this.b05(oo.dbType,oo.db)+'<r: db="mysql.admin">'+this.b03(oo.dbType, this,oo);
}
else if(t=="")
{
   $(".nr").append('（'+(this.obj.B2==1?"":this.obj.B1+'. ')+'已存在,跳过）');
   $(".ct_box").scrollTop($(".ct_box").prop("scrollHeight"));
   this.obj.B1++;
   this.a07(oo);
}
else if(t.indexOf("不能读取记录；在 'Msysobjects' 上没有读取数据权限。")!=-1)
{
  Tool.Modal("不能读取记录；在 'Msysobjects' 上没有读取数据权限。",'请按以下图片对数据库进行操作：<img src="/'+o.path+'admin/img/Msysobjects.png"><hr/>另外需要说明的是，上面操作的是Access2002~2003版的文件，对于Access2007~2010版的文件，在授权操作的第一步的【信息】下没有【管理用户和权限】这一项。','<button type="button" class="btn btn-primary" onClick="location.reload();" data-bs-dismiss="modal">已操作完成</button>','');
}
else
{$(".nr").append("出错001："+t);}
},

*/
