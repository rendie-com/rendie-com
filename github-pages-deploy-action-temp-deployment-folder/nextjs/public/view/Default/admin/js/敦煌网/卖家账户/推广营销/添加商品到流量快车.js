'use strict';
var fun=
{
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在【添加商品到流量快车】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w100 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">商品页进度：</td>'+Tool.htmlProgress('B')+'</tr>\
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
    Tool.getDHuser(this.a04,this);
  },
  a04:function()
	{
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this)
  },
  a05:function()
  {
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a07, this);
  },
  a07:function()
  {
    let URL="http://seller.dhgate.com/marketweb/trafficbus/pageload.do?dhpath=10004,33,3301";
    $("#state").html("正在打开【"+URL+"】页面。。。注：比较久");
    gg.getFetch(url,"json",this.a08,this);
  },
  a08:function(t)
	{
    if(t.indexOf('<title>流量快车 </title>')!=-1)
    {
      this.obj.Barr=Tool.StrSplits(t,'type="checkbox" name="itemcodes" value="','"');//获得的可能有1000条以上
			//每次删除100条
      this.obj.B2=Math.ceil(this.obj.Barr.length/100);
      this.a09();
    }
    else if(t.indexOf('title>商铺信息 </title>')!=-1||t=='{status:500}'||t=='{status:0}'||t.indexOf('class="inputGray" id="username"')!=-1)
    {
			alert("aaaaaaaaaaa")
      //this.a14();
    }
    else
    {alert("没打开页面，请查看保存结果。");Tool.at(t);}
  },
  a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a13)
  },
  a10:function()
	{
    let arr1=this.obj.Barr,arr2=[];
    let num=arr1.length>100?100:arr1.length
    for(let i=0;i<num;i++)
    {
      arr2.push(this.obj.Barr[0]);
      this.obj.Barr.shift();
    }
		this.a11(arr2);
  },
  a11:function(arr2)
	{
		let URL="http://seller.dhgate.com/marketweb/trafficbus/cancle.do?&itemcodes="+arr2.join("%2C")+"&_="+Math.random();
		$("#state").html("正在删除以前的商品【"+URL+"】。。。");
		gg.getFetch(url,"json",this.a12,this);
  },
	a12:function(t)
	{
    if(t.indexOf('数据更新成功！')!=-1)
    {
      this.obj.B1++;
      this.a09();
    }
    else
    {alert("出错："+t);}
  },
  a13:function()
	{
		this.obj.Barr=[]
		this.obj.B1=1;
		this.obj.B2=1;//添加的时后就给30条，给多了没用。
		//
    let html='[0<r:proupdhgate db="sqlite.dhgate" size=30 where=" where @.upuserid='+this.obj.fromid+' and @.status=0">,<:fromid/></r:proupdhgate>]'
		Tool.ajax.a01(html,1,this.a14,this)//详情数据链接	
  },
  a14:function(oo)
	{
    oo.shift();
		this.obj.Barr=oo;
		this.a15();
  },
  a15:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a16,this,this.a19)
  },
  a16:function()
	{
		let oo=this.obj.Barr
		if(oo.length==0)
		{
			this.a18();
		}
		else
		{
			let URL="http://seller.dhgate.com/marketweb/trafficbus/saveprod.do?itemcodes="+oo.join("%2C");
			$("#state").html("正在打开【选择快车产品】。。。"+URL);
			gg.getFetch(url,"json",this.a17,this);
		}
  },
  a17:function(t)
	{
    if(t.indexOf('"flag":true')!=-1)
    {
			$("#state").html("快车产品添加成功。。。");
			this.a18();
    }
		else if(t.indexOf('"flag":false')!=-1)
		{
			$("#state").html("快车产品添加失败，正在删除产品，重新提交。。。");
			this.a20(t);
		}
    else
    {alert("出错："+t);Tool.at(t);}   
  },
  a18:function()
	{
		this.obj.B1++;
		this.a15();
  },
  a19:function()
	{
    this.obj.A1++;
		$("#B1").html("0%").css("width","0%");
		$("#B2").html('');
		this.obj.Barr=[]
		this.obj.B1=1;
		this.obj.B2=0;
		this.a03();
  },
  a20:function(t)
	{
		//t的结果为：{"flag":false,"itemcode":"421903117,455359652,455359741,455359776,542595287,543005938"}
		let o1,arr1=this.obj.Barr,arr2=[],nArr=[],isbool=false
		eval("o1="+t)
		arr2=o1.itemcode.split(",")
		for(let i=0;i<arr1.length;i++)
		{
			if(arr2.indexOf(""+arr1[i])==-1){nArr.push(arr1[i]);}			
		}
		this.obj.Barr=nArr;
		this.a16();
  }
}
fun.a01();