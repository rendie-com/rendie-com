'use strict';
var fun=
{
  obj: {A1:1,A2:0},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main(\'%20/1/4.html\')" class="arrow_back"></a>正在把订单【orderid】传入到【buyer】...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">卖家账户：</li><li id="username"></li></ul>\
    <ul class="Tul list-group-item-action"><li class="w100 right">卖家进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家页进度：</li>'+Tool.htmlProgress('B')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">状态：</li><li id="state">正在准备数据...</ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
   let str='{<r:APIaccount size=1 page=2 where=" where @.from=\'dhgate\' order by @.sort asc,@.id asc">"token":[APIaccount:token],"username":"[APIaccount:username]","fromid":"[APIaccount:fromid]"</r:APIaccount>,"A1":'+this.obj.A1+',"A2":<@page/>,"B1":1,"B2":0}';
    Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
  a03:function(oo)
  {
    this.obj=oo;
    this.a04();
  },
  a04:function()
  {
    if(this.obj.A1 <= this.obj.A2)
    {
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
      $("#username").html(this.obj.username);
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
      this.a05();
    }
    else
    {$("#state").html("全部完成。");}
  },
  a05:function()
  {
    let str = '[\
    {"B2":<@page/>}\
    <r:msguser size=20 page=2 where=" where @.sellerId='+this.obj.fromid+' and @.buyer=\'0\'">,\
    {\
      "orderid":"<r:order where=" where @.buyerId=\'[msguser:buyerOrgId]\' and @.fromuserid='+this.obj.fromid+'" size=1><:orderid/></r:order>",\
      "buyerOrgId":"[msguser:buyerOrgId]"\
    }\
    </r:msguser>]'
   Tool.ajax.a01(str,1,this.a06,this)
  },
  a06:function(oo)
  {
    if(!this.obj.B2){this.obj.B2=oo[0].B2;}
    if(this.obj.B1<=this.obj.B2)
		{
      let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
      $("#B1").html(p1+"%").css("width",p1+"%");
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）'); 
      this.a07(oo);
    }
    else
    {
      this.obj.B1=1;this.obj.B2=0
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
      this.obj.A1++;
      $("#state").html('下一个账号。。。');
      this.a02();
    }
  },
  a07:function(oo)
  {
    let sql=[]
    for(let i=1;i<oo.length;i++)
    {
      sql.push("update @.msguser set @.buyer='"+oo[i].orderid+"' where @.buyerOrgId='"+oo[i].buyerOrgId+"' and @.sellerId="+ this.obj.fromid)
    }
    let str='<r: db="sqlite.dhgate">'+sql.join("<1/>")+'</r:>';
   Tool.ajax.a01(str,1,this.a08,this)
  },
  a08:function(t)
  {
    if(t=="")
    {
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
      $("#state").html('这一页完。。。');
      this.obj.B1++;
      this.a05();
    }
    else
    {alert("出错："+t);}
  }
}
fun.a01();