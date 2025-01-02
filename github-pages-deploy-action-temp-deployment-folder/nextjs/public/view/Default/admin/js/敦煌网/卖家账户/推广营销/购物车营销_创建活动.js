'use strict';
var fun=
{
	obj:{A1:1,A2:0,B1:1,B2:0,C1:1,C2:0,Carr:[],Carr2:[],username:"",password:"",fromid:0},
  a01:function()
  {
    let html=Tool.header('购物车营销_创建活动...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">活动进度（页）：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right">活动进度（个）：</td>'+Tool.htmlProgress('C')+'</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr></tbody>\
      </table>\
    </div>'
		Tool.html(this.a02,this,html)
  },
	a02:function()
	{
    gg.isRD(this.a03,this);
  },
	a03:function()
	{
    Tool.getDHuser(this.a04,this);//遍历DH用户信息
  },
	a04:function()
	{
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this)
  },
	a05:function()
	{
    $("#state").html("正在退出。。。");
    Tool.SignOut(this.a06,this);
  },
	a06:function()
	{
    $("#state").html("正在登陆。。。");
    Tool.SignIn(this.a07,this);//登陆
  },
  a07:function()
  {
    let URL="http://seller.dhgate.com/promoweb/cartpromo/productList.do?dhpath=10004,30,3007&page="+this.obj.B1;
    $("#state").html("正在打开【"+URL+"】页面。。。");
    gg.getFetch(url,"json",this.a08,this);
  },
  a08:function(t)
	{
    if(this.obj.B2==0)
    {
      let arr=Tool.StrSplits(t,'javascript:turnpage(',',');
      this.obj.B2=parseInt(arr[arr.length-2])//倒数第二个为页码
      if(!this.obj.B2){this.obj.B2=1;}
    }
    this.obj.Carr=Tool.StrSplits(t,'<a class="j-ac-create" data-href="','"');
    this.obj.Carr2=Tool.StrSplits(t,'<a class="j-ac-create" data-href="','"');
    this.obj.C2=this.obj.Carr.length;
		if(this.obj.Carr)
		{this.a09()}
		else
		{Tool.at("可能改版");}
  },
  a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a19)
  },
  a10:function()
	{
		Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a11,this,this.a18)
  },
  a11:function()
	{
		let URL='http://seller.dhgate.com'+this.obj.Carr[this.obj.C1-1];
		$("#state").html("正在打开【"+URL+"】页面。。。");
		gg.getFetch(url,"json",this.a12,this);
  },
  a12:function(t)
	{
    if(t.indexOf('<p>购物车营销产品未上架！</p>')!=-1)
    {
      this.a17();
    }
    else
    {
      let url="http://seller.dhgate.com/promoweb/cartpromo/saveStep1.do"
      let itemcode=Tool.StrSlice(t,'name="cartProd.itemcode" value="','"');
      let skuMd5=Tool.StrSlice(t,'name="cartProd.skuMd5" value="','"');
      let skuId=Tool.StrSlice(t,'name="cartProd.skuId" value="','"');
      let date1=new Date()
      let date2=Tool.js_date_time(new Date(date1.getTime()),"-")//当天
      let date3=Tool.js_date_time(new Date(date1.getTime() + 1000*60*60*24*7),"-")//7天
      url+="?cartProd.itemcode="+itemcode+"&cartProd.skuMd5="+skuMd5+"&cartProd.skuId="+skuId+"&promoDto.name="+Tool.userDate13(date1)+"【"+this.obj.B1+"-"+this.obj.C1+"】&startDate="+date2+"&endDate="+date3+"&promoDto.promoTypeId=10"
      //////////////////////////////////////////////////////////
      let html='{\
      <r:proupdhgate db="sqlite.dhgate" size="1" where=" where @.fromid='+itemcode+'">\
        <r:pro db="sqlite.aliexpress" size="1" where=" where @.proid=\'<:proid/>\'">\
          "maxprice":<:maxprice/>,\
          "Discount":<:Discount/>\
        </r:pro>\
      </r:proupdhgate>}'
      Tool.ajax.a01(html,1,this.a13,this,url)//详情数据链接	  
    }
  },
  a13:function(oo,url)
	{
    let price=oo.maxprice*(1-(oo.Discount/100))//折扣后的价格
    this.obj.price=price*1.2;//想赚20%
    $("#state").html("正在 1.设置活动信息【"+url+"】。。。");
    gg.getFetch(url,"json",this.a14,this);
  },
	a14:function(t)
	{
    let arr=Tool.StrSplits(t,'name="cartIDs" value="','"');
    let promoId=Tool.StrSlice(t,'id="promoId" value="','"');
    let url="http://seller.dhgate.com/promoweb/cartpromo/savechoose.do?from=9&page=1&promoId="+promoId+"&cartIDs="+arr.join("&cartIDs=")
    $("#state").html("正在 2.选择买家【"+url+"】。。。");
    gg.getFetch(url,"json",this.a15,this);
  },
  a15:function(t)
	{
    let price=parseInt(Tool.StrSlice(t,'当前SKU买家最小价格：$ ','</p>'));
    let url="http://seller.dhgate.com/promoweb/cartpromo/commitdis.do";
    let retailPrice=Tool.StrSlice(t,'name="cartProd.retailPrice" value="','"');
    let promoId=Tool.StrSlice(t,'name="promoId" value="','"');
    let data=Tool.StrSlice(t,'class="buyer-name" cartId="','"');
    let p=(price-this.obj.price).toFixed(2)
    url+="?cartProd.retailPrice="+retailPrice+"&promoId="+promoId+"&data="+data+"-"+p+"&cheapen="+p
    $("#state").html("正在 3.设置促销规则【"+url+"】。。。");
    if(p>0)
    {
      gg.getFetch(url,"json",this.a16,this);
    }
    else
    {
      alert("不能降价，会亏本。");
      $("#state").html("因为不打算多价格，就用最大的价格，所以不能降价。【原价："+price+" - 成本："+this.obj.price+" = "+p+"】【"+url+"】。。。");
      //this.a15();
    }
  },
  a16:function(t)
	{
    if(t.indexOf('<span class="s">购物车活动创建成功。</span>')!=-1)
    {
      this.a17();
    }
    else
    {
      alert("购物车活动创建失败。");
      $("#state").html("购物车活动创建失败。");
      Tool.at(t);
    }
  },
  a17:function()
	{
    this.obj.C1++;
    this.a10();
  },
  a18:function()
	{
    this.obj.B1++;
		this.obj.C1=1;
		this.obj.C2=0;
		this.obj.Carr=[]
		this.obj.Carr2=[]
		$("#C1").html("0%").css("width","0%");
		$("#C2").html("");
		this.a09();
  },
  a19:function()
	{
		this.obj.A1++;
		this.obj.B1=1;
		this.obj.B2=0;
		$("#B1").html("0%").css("width","0%");
		$("#B2").html("");
		this.a03();
  }
}
fun.a01();
