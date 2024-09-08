'use strict';
var fun=
{
  obj: {A1:1},
  a01:function()
  {
    let html='\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main(\'%20/1/4.html\')" class="arrow_back"></a>正在【修复买家ID】...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">卖家账户：</li><li id="username"></li></ul>\
    <ul class="Tul list-group-item-action"><li class="w100 right">卖家进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家页进度：</li>'+Tool.htmlProgress('B')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家名称：</li><li id="buyer"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">买家条进度：</li>'+Tool.htmlProgress('C')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">修复后买家ID：</li><li id="buyerid"></li></ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">状态：</li><li id="state">正在准备数据...</ul>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
    win.isRD(this.a02A,this);
  },
  a02A:function()
  {
    let str='\
    {\
      "A1":'+this.obj.A1+',"A2":<@page/>,\
      "B1":1,"B2":0,"C1":1,"C2":0,"Carr":[],\
      <r:APIaccount size=1 page=2 where=" where @.from=\'dhgate\' order by @.sort asc,@.id asc">\
        "fromid":[APIaccount:fromid],\
        "UserName":"[APIaccount:UserName]",\
        "password":"[APIaccount:password]"\
      </r:APIaccount>\
    }'
		Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
  a03:function(oo)
  {
    this.obj=oo;
		if(this.obj.A1<=this.obj.A2)
		{
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
      $("#username").html(this.obj.UserName);
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
      this.a04();
		}else{$("#state").html("全部完成")}
  },
  a04:function()
  {
    let str='[\
    {"B2":<@page/>}\
    <r:msguser size=10 page=2 where=" where @.sellerId='+this.obj.fromid+' and '+(obj.arr[4]=="orderid32"?':buyerid is null':":buyerid ='0'")+' order by @.id asc">\
      ,{"buyer":"[msguser:buyer]","buyerOrgId":"[msguser:buyerOrgId]"}\
    </r:msguser>]'
		Tool.ajax.a01($2,$4,$1,$3);
  },
  a05:function(oo)
  {
    if(!this.obj.B2){this.obj.B2=oo[0].B2;}
    if(this.obj.B1<=this.obj.B2)
		{
      let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
      $("#B1").html(p1+"%").css("width",p1+"%");
      $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）'); 
      this.obj.C2=oo.length-1
      this.obj.Carr=oo
      this.a06();
    }
    else
    {
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
      if(this.obj.B2==0)
      {
        this.obj.A1++;
        this.a02A();
      }
      else
      {
        win.WebUrl("2","http://seller.dhgate.com/usr/signin.do?act=loginout",this.a12,this);
      }      
    }
  },
  a06:function()
  {
    if(this.obj.B1==1)      
    {
      $("#state").html("正在【登陆账号】...")
      win.WebNewUrl("2","http://seller.dhgate.com/usr/signin.do?act=login&username="+this.obj.UserName+"&password="+this.obj.password+"&pageType=main",this.a07,this);
    }
    else
    {this.a08();}
  },
  a07:function()
  {
    if(win.WebIsHTML("2",'span|class="numberlink"'))
		{this.a08();
      
		}
		else
		{Tool.Time(this.a07,300,this,"1");}  
  },
  //////////////////////////////////////////////////////////////////////
  a08:function()
  {
    if(obj.arr[4]=="orderid32")
    {
      if(this.obj.C1<=this.obj.C2)
      {
        $("#buyer").html(this.obj.Carr[this.obj.C1].buyer+"（注：当修复买家ID前，买家名称是订单号orderid32）")
        let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
        $("#C1").html(p1+"%").css("width",p1+"%");
        $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（条）'); 
        $("#state").html("正在打开【订单详情】...")
        if(this.obj.Carr[this.obj.C1].buyer.length==32)
        {
          let url="http://seller.dhgate.com/sellerordmng/sellerOrderDetail/pageload.do?orderId="+this.obj.Carr[this.obj.C1].buyer
          win.WebUrl('2',url,this.a09,this);//进"未通过审核的产品"页面
        }
        else
        {
          //注：以前的订单没有这个orderid32
          this.a10("0","0");
        }
      }
      else
      {
        $("#state").html("正在准备下一页。。。")
        this.obj.B1++;
        this.obj.C1=1;
        this.obj.C2=0;
        this.obj.Carr=[];
        this.a04();
      }
    }
    else{this.d01();}
  },
  a09:function()
  {
    if(win.WebIsHTML("2",'input|name="orderId" type="hidden" value="'))
		{
      let t=win.WebGetHTML("2","body|");
      let buyerid=Tool.StrSplits(t,'id="buyerSystemId" type="hidden" value="','"')
      let buyer=Tool.Trim(Tool.StrSlice(t,'买家名称：</div>\n                    <div class="order-imfor-dd">','<'))
      let orderNo32=Tool.StrSlice(t,'name="orderId" type="hidden" value="','"')
      if(orderNo32==this.obj.Carr[this.obj.C1].buyer)
      {
        $("#buyer").html(buyer)
        $("#buyerid").html(buyerid)
        $("#state").html("正在保存【买家ID】...")
        this.a10(buyer,buyerid);        
      }
      else
      {
        Tool.at(t)
        alert("页面不对");
      }
		}
		else
		{Tool.Time(this.a09,300,this,"1");} 
  },
  a10:function(buyer,buyerid)
  {
    let html='<r: db="sqlite.dhgate">update @.msguser set @.buyer=\''+buyer.replace(/'/ig,"''")+'\',:buyerid=\''+buyerid+'\' where @.buyerOrgId=\''+this.obj.Carr[this.obj.C1].buyerOrgId+'\'</r:>'
   Tool.ajax.a01(html,1,this.a11,this);
  },
  a11:function(t)
  {
    if(t=="")
    {
      win.WebSetHTML(2,'html|',"加载中。。。");
      $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（完）');
      this.obj.C1++;
      this.a08();      
    }
    else
    {alert("出错："+t);}
  },
  a12:function()
  {
    if(win.WebIsHTML("2","title|敦煌网中小商家的快速外贸平台"))
		{
      this.obj.A1++;
      this.a02()
    }
    else
    {Tool.Time(this.a12,300,this,"1");}
  },
  ////////////////////////////////////////////////////////////////////////////////////////////
  d01:function()
  {
    if(this.obj.C1<=this.obj.C2)
		{
      $("#buyer").html(this.obj.Carr[this.obj.C1].buyer+"（注：当修复买家ID前，买家名称是订单号orderid）")
      let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
      $("#C1").html(p1+"%").css("width",p1+"%");
      $("#C2").html(this.obj.C1+'/'+this.obj.C2+'（条）'); 
      $("#state").html("正在搜索【订单号】...")
      if(!isNaN(this.obj.Carr[this.obj.C1].buyer))
      {
        //注：这里俩个链接都有用，第一个找不到的，可以用第二个找到它。
        //update @.msguser set @.buyer='0',:buyerid='0' where @.buyerId='1'
        let url="http://seller.dhgate.com/sellerordmng/orderList/list.do?params.orderNo="+this.obj.Carr[this.obj.C1].buyer+"&params.orderStatus=100&params.queryType=1&params.linkType=111&params.operableType=search&params.page=1&params.orderDateFilter=%2B365%3B01&params.orderStatusFilter=&params.orderSort=01%3B0&params.notracking=1&params.isSymbol=&params.isFlag="
        //let url="http://seller.dhgate.com/sellerordmng/orderList/list.do?params.orderNo="+this.obj.Carr[this.obj.C1].buyer+"&params.itemCode=&params.buyerName=&params.orderStatus=100&params.shippingCountry=&params.fromPlatform=&params.fromSite=&params.fromMobile=&params.startDate=&params.endDate=&params.trackingno=&params.activeType=0&params.groupStatus=&params.sampleStatus=&params.isFlag=&params.queryType=0&params.linkType=111&params.operableType=search"
        win.WebUrl('2',url,this.d02,this);
      }
      else
      {alert("订单号非数字(即buyer非数字)");}
    }
    else
    {
      $("#state").html("正在准备下一页。。。")
      this.obj.B1++;
      this.obj.C1=1;
      this.obj.C2=0;
      this.obj.Carr=[];
      this.a04();
    }
  },
  d02:function()
  {
    let t=win.WebGetHTML("2","body|");
    if(t.indexOf('class="price">US')!=-1)
		{
      let buyerid=Tool.StrSplits(t,'msgtype=2&amp;to=','&amp;parm')
      let buyer=Tool.Trim(Tool.StrSlice(t,'<a class="buyer-name"','</a>'))
      buyer=Tool.Trim(buyer.split(">")[1])
      let orderid=Tool.StrSlice(t,'&amp;parm=','&amp;')
      if(orderid==this.obj.Carr[this.obj.C1].buyer)
      {
        $("#buyer").html(buyer)
        $("#buyerid").html(buyerid)
        $("#state").html("正在保存【买家ID】...")
        this.a10(buyer,buyerid);        
      }
      else
      {
        Tool.at(t);alert("页面不对");
      }
		}
		else if(t.indexOf('您暂时没有符合条件的订单，请更改条件后重试')!=-1)
		{
      this.a10("1","1");
    }
		else
		{Tool.Time(this.d02,300,this,"1");}
  }
}
fun.a01();