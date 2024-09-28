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
    let html=Tool.header("正在【骆驼客添加商品】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right">请求地地址：</td><td id="url" colspan="2"></td></tr>\
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
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
  a05:function()
	{
		$("#state").html("正在验证登陆。。。");
		Tool.verifyUser.a01(this.a07, this);
  },
  a07:function()
  {
    let url="http://seller.dhgate.com/promoweb/camelCustomerManagement/rebateProductList.do?dhpath=10004,86,8601";
    $("#state").html("正在打开【骆驼客CPS推广管理】页面。。。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.getFetch(url,"json",this.a08,this);
  },
  a08:function(t)
  {
		if(t.indexOf("骆驼客CPS推广管理")!=-1)
		{
			let B2=Tool.StrSlice(t,'				共有','条记录');
			let arr1=Tool.StrSplits(t,'<a class="j-item-delete" id="','" href="#');//<a class="j-item-delete" id="903806949236318211" itemcode="544160186" href="#">移除推广</a>
			if(B2)
			{
				if(this.obj.B2==0){this.obj.B2=Math.ceil(parseInt(B2)/arr1.length);}
				///////////////////////////////////////////////////////////
				let arr2=[]
				for(let i=0;i<arr1.length;i++)
				{
					arr2.push(arr1[i].split('" itemcode="'))
				}
				this.obj.Barr=arr2;
				this.a09();
			}
			else
			{
				$("#state").html("以前的商品删除，不用删除");
				this.obj.B1=1;
				this.obj.B2=0;
				this.obj.Barr=[]
				this.a12();
			}
		}
		else
		{
			Tool.at("出错：页同不对。\n\n"+t)
		}
  },
  a09:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this)
  },
  a10:function()
	{
		if(this.obj.Barr.length==0)
		{
			this.obj.B1++;
			this.a07();
		}
		else
		{
			let url="http://seller.dhgate.com/promoweb/camelCustomerManagement/deleteRebateProduct.do?id="+this.obj.Barr[0][0]+"&itemcode="+this.obj.Barr[0][1]
			$("#state").html("正在删除【已有的商品："+this.obj.Barr[0][1]+"】。。。");
			this.obj.Barr.shift();
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a11,this);
		}
  },
  a11:function(oo)
  {
		if (oo.desc=='删除成功')
    {
      this.a10();
    }
    else
    {
      $("#state").html("正在失败。。。");
      Tool.pre(oo);
    }
  },
  ///////开始添加////////////////////////////////////////////////////////
  a12:function()
  {
		let url="https://seller.dhgate.com/promoweb/camelCustomerManagement/confirm.do"
    $("#state").html("打开这个页面主要是为了，清空已选中的商品（因为提交完后，选中的商品还在）。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		gg.getFetch(url,"json",this.a13,this);
  },
  a13:function()
  {
		//注：是每选一页就，提交一页。
    let url="https://seller.dhgate.com/promoweb/camelCustomerManagement/chooseRebateProduct.do?dhpath=10004,86,8601&selectpagesize=20&page="+this.obj.B1
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在【设置骆驼客商品】。。。");
    gg.getFetch(url,"json",this.a14,this);
  },
  a14:function(t)
  {
		if(t.indexOf('<div class="nopro" style="">抱歉，您没有符合该条件的产品，免运费商品才能设置返佣。</div>')==-1)
		{
			let B2=Tool.StrSlice(t,'				共有','条记录');
			let arr1=Tool.StrSplits(t,'status="Y" itemcode="','"');//<input class="j-chk" type="checkbox"  status="Y" itemcode="536325509" name="itemcodes"
			if(this.obj.B2==0){this.obj.B2=Math.ceil(parseInt(B2)/arr1.length);}
			this.obj.Barr=this.obj.Barr.concat(arr1);
			this.a15();
		}
		else
		{
    	$("#state").html("抱歉，您没有符合该条件的产品，免运费商品才能设置返佣。");
			//this.a12()
		}
  },
  a15:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a16,this,this.a19)
  },
  a16:function()
  {
		let url="https://seller.dhgate.com/promoweb/camelCustomerManagement/settingRebatePrice.do?dhpath=10004,86,8601&itemcodes="+this.obj.Barr.join("&itemcodes=")
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		$("#state").html("正在选中商品。。。");
		gg.getFetch(url,"json",this.a17,this);
  },
  a17:function()
  {
    let URL="https://seller.dhgate.com/promoweb/camelCustomerManagement/validate.do?_t="+Math.random()
    let arr1={deliverData:this.obj.Barr.join("-2,")+"-2"}
    $("#state").html("正在提交【"+JSON.stringify(arr1)+"】。。。");
    gg.postFetch(URL,arr1,this.a18,this);
  },
  a18:function(oo)
	{

		if (oo.validate==1)
    {
      $("#state").html("提交成功，正在准备下一页。。。");
    	this.obj.B1++
			this.obj.Barr=[]
			this.a12();
    }
    
    else
    {
			Tool.pre(["出错:", t]);
    }
  },
  a19:function()
	{
    this.obj.A1++;
    this.obj.B1=1;
    this.obj.B2=0;
		this.obj.Barr=[]
		$("#B1").html("0%").css("width","0%");
		$("#B2").html('');
		this.a03();
  }
}
fun.a01();
