'use strict';
var fun=
{
  time:new Date(),
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],B2arr:[],
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在【添加产品到橱窗】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="w150 right">橱窗类型：</td><td id="typename" colspan="2"></td></tr>\
		    <tr><td class="right">橱窗进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">统计：</td><td  id="doTime" colspan="2"></td></tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
				</tbody>\
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
    Tool.getDHuser(this.a04,this);
  },
	a04:function()
	{
    $("#username").html(this.obj.username);
    this.obj.B1=1;
    this.obj.B2=3;
    this.obj.Barr=["https://seller.dhgate.com/store/storeWindowManage.do?dhpath=08,0803","",""];
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
	a05:function()
	{
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a07, this);
  },
  a07:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08,this,this.a15);
  },
  a08:function()
  {
    $("#typename").html(this.b01());
    let url=this.obj.Barr[this.obj.B1-1];
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在打开【橱窗管理】页面。。。");
    gg.getFetch(url,"json",this.a09,this);
  },
  a09:function(t)
	{
    if(this.obj.Barr[1]=="")
    {
      let arr=Tool.StrSplits(t,"changePage('","'")
      this.obj.Barr=//打开删除要用
      [
        this.obj.Barr[0]+"&sellerswindowid="+arr[0],//本橱窗展示最新到货的产品
        this.obj.Barr[0]+"&sellerswindowid="+arr[1],
        this.obj.Barr[0]+"&sellerswindowid="+arr[2],
      ]
      this.obj.B2arr=//添加要用
      [
        "http://seller.dhgate.com/store/addpro.do?windowType=100&windowId="+arr[0],//本橱窗展示最新到货的产品
        "http://seller.dhgate.com/store/addpro.do?windowType=101&windowId="+arr[1],
        "http://seller.dhgate.com/store/addpro.do?windowType=102&windowId="+arr[2],
      ]
    }
    /////////////////////////////////////////////////
    if(t.indexOf('本橱窗展示最新到货的产品')!=-1&&this.obj.B1==1)
		{
      this.a10(t);
    }
    else if(t.indexOf('本橱窗展示最热销的产品')!=-1&&this.obj.B1==2)
    {
      this.a10(t);
    }
    else if(t.indexOf('本橱窗展示免运费的产品')!=-1&&this.obj.B1==3)
    {
      this.a10(t);
    }
    else if(t.indexOf('title>商铺信息 </title>')!=-1||t=='{status:500}'||t=='{status:0}')
    {
			//$("#state").html("您违反了商铺管理规定，目前已被查封。");
			this.a15();
		}
    else
    {alert("没打开页面，请查看保存结果。");Tool.at(t);}
  },
  a10:function(t)
	{
    let arr=Tool.StrSplits(t,'name="storeproduct" value="','"');
    if(arr.length==0)
    {
      this.a11();
    }
    else
    {
      let url="http://seller.dhgate.com/store/removeProToWindow.do?dhpath=08,0803&storeproduct="+arr.join("&storeproduct=")
    	$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
      $("#state").html("正在删除【橱窗商品】。。。");
      gg.getFetch(url,"json",this.a07,this);
    }
  },
  a11:function()
	{
    let url=this.obj.B2arr[this.obj.B1-1];
    $("#state").html("正在打开【橱窗商品】。。。");
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.getFetch(url,"json",this.a12,this);
  },
  a12:function(t)
	{
    let add=Tool.StrSlice(t,"addProductToWin('","');").split("','")//addProductToWin('ff8080814b25d034014c927fcff95081','102','ff8080814bfe3ba6014c169d6c4f3a31');
    let arr1=Tool.StrSplits(t,'name="itemcodesCheck"  value = "','"');
    let num=parseInt(Tool.StrSlice(t,'<b class="color-ys" id="checkProMax">','</b>'))
    if(num==0)//有的店可以添加12个，有的只能添加8个。但每次最多只能添加10个，所有要重复执行,直到无法添加为止。
    {
      this.a14();
    }
    else
    {
      num=num>arr1.length?arr1.length:num;
      let arr2=[];for(let i=0;i<num;i++){arr2.push(arr1[i]);}
      let url="http://seller.dhgate.com/store/addproToWindow.do?windowId="+add[0]+"&windowType="+add[1]+"&cursupplierid="+add[2]+"&itemcode="+arr2.join(",")
    	$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
      $("#state").html("正在添加【橱窗商品】。。。");
      gg.getFetch(url,"json",this.a13,this);
    }
  },
  a13:function(t)
	{
    if(t.indexOf('"产品添加成功。"')!=-1)
    {
      this.a11();
    }
    else if(t.indexOf('没有选择产品，请重新操作')!=-1)
    {
      this.a14();
    }
    else
    {
      alert("出错："+t);
    }    
  },
  a14:function()
	{
    this.obj.B1++;
    this.a07();
  },
  a15:function()
	{
		$("#doTime").html(Tool.doTime(this.time,this.obj.A1,this.obj.A2));
		this.obj.A1++;
		this.obj.B1=1;
		this.obj.B2=0;
		this.obj.Barr=[];
		this.obj.B2arr=[];
		this.obj.username=""
		this.obj.password=""
		this.obj.fromid=0
		$("#B1").html("0%").css("width","0%");
		$("#B2,#typename,#url").html('');
		this.a03();
  },
  b01:function()
	{
    let name=""
		switch(this.obj.B1)
		{
		  case 1:name="本橱窗展示【最新到货】的产品";break;
		  case 2:name="本橱窗展示【最热销】的产品";break;
		  case 3:name="本橱窗展示【免运费】的产品";break;
      default:name="未知："+this.obj.B1;
		}
		return name;
  }
}
fun.a01();