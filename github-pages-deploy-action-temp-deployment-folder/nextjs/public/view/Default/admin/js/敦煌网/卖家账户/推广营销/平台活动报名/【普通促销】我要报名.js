'use strict';
var fun=
{
  time:new Date(),
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],B2arr:[],
		C1:1,C2:0,//在【2.设置优惠信息】---【显示下30个↓】要用
		Cis100:false,//是否只要100条
		temp:"",//临时内容
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在报名【普通促销】活动...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">报名进度：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right">页进度：</td>'+Tool.htmlProgress('C')+'</tr>\
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
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
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
		let url="https://seller.dhgate.com/promoweb/platformacty/actylist.do?ptype=1&dhpath=10004,30,3009&actyoption=0&type=0";
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在【平台活动报名-我要报名】。。。");
		gg.getFetch(url,"json",this.a08,this);
  },
	a08:function(t)
	{
		let urlArr=[],promoidArr=Tool.StrSplits(t,'promoid="','"'),couponRulsArr=Tool.StrSplits(t,"couponRuls='","' promoType=");
		let url="https://seller.dhgate.com/promoweb/platformacty/selectPromoCoupon.do"
		for(let i=0;i<promoidArr.length;i++)
		{
			urlArr.push(url+"?promid="+promoidArr[i]+"&promoCouponJson="+couponRulsArr[i])
		}
		this.obj.B2arr=promoidArr;//有多少【promid】
		this.obj.Barr=urlArr//有多少要报名
		this.obj.B2=urlArr.length;
		this.a09();
	},
	a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a12);
	},
	a10:function()
	{
		let url="https://seller.dhgate.com/promoweb/platformacty/loadproduct.do?promid="+this.obj.B2arr[this.obj.B1-1]+"&dhpath=10004,30,3009"
    $("#state").html("正在打开【1.选择促销产品】。。。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.tabs_remove_create_indexOf(2,url,"全站:<1/>抱歉，您没有符合该活动要求的产品",true,this.a11,this);
	},
	a11:function(t)
	{
		let err="抱歉，您没有符合该活动要求的产品"
		if(t.indexOf(err)!=-1)
		{
			$("#state").html(err);
			this.obj.B1++;
			this.a09()
		}
		else
		{
			this.a13(t);
		}
	},
	a12:function()
	{
		this.obj.A1++;
		this.obj.B1=1;
		this.obj.B2=0;
		this.obj.Barr=[]
		this.obj.B2arr=[]
		$("#B1").css("width","0%");
		$("#B1,#B2").html("")
		$("#state").html("正在准备下一个账号...");		
		this.obj.username=""
		this.obj.password=""
		this.obj.fromid=0;
		this.a03()
	},
	a13:function(t)
	{
		let err='此类目允许报名商品数<b class="prompt-letter">100</b>个'
		if(t.indexOf(err)!=-1)
		{
			$("#state").html(err);
			this.obj.Cis100=true;
			$("#state").html("正在选中【部分商品】。。。");
			this.obj.C2=4//翻页到第4页就会100条了，因为每页30条。
			this.d01();
			
		}
		else
		{
			this.obj.Cis100=false;
			let url="https://seller.dhgate.com/promoweb/platformacty/selectall.do?promid="+this.obj.B2arr[this.obj.B1-1];
			$("#state").html("正在选中【所有商品】。。。");
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a14,this);
		}
	},
	a14:function(t)
	{
		if(t.indexOf('extraData":{"selectedNumber"')!=-1)
		{
			$("#url").html('');
			this.a15();
		}
		else
		{
		 	$("#state").html("正在选中所有商品[出错]。");
		}
	},
	a15:function()
	{
		let code='\
		$(function(){\
			$("#enterNextStep span").click();\
		})'
		$("#state").html("正在点击【下一步】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'全站',true,this.a16,this);
	},
	a16:function(t)
	{
		let count=Tool.StrSlice(t,'<b id="allProductList">','</b>');//总条数
		let size=30//每页条数
		this.obj.C2=Math.ceil(parseInt(count)/parseInt(size));
		this.a17();
	},
	a17:function()
	{
		Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a18,this,this.a20)
	},
	a18:function()
	{
		let code='\
		$(function(){\
			$("#showNextProductList").click();\
		})'
		let str='id="page" value="'+this.obj.C1+'"';
		$("#state").html("正在【显示下30个↓】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,str,true,this.a19,this);
	},
	a19:function(t)
	{
		this.obj.temp=t;
		this.obj.C1++;
		this.a17();
	},
	a20:function()
	{
		let itemCodeArr=Tool.StrSplits(this.obj.temp,'value="" name="','"')
		if(itemCodeArr.length!=0)
		{
			itemCodeArr=Tool.unique(itemCodeArr)
			this.a21(itemCodeArr)
		}
		else
		{
			$("#state").html("找不到商品编码。。。");
			Tool.at(t)
		}
	},
	a21:function(itemCodeArr)
	{
		let str='[0\
		<r:proupdhgate db="sqlite.dhgate" size='+itemCodeArr.length+' where=" where @.fromid in('+itemCodeArr.join(",")+')">,\
		{\
			"fromid":<:fromid/>,\
			"ratio":<:ratio f=2/>\
		}\
		</r:proupdhgate>]'
		$("#state").html("正在获取价格倍数。。。");
		Tool.ajax.a01(str,1,this.a22,this)
	},
	a22:function(t)
	{
		let arr2=[],discount;
		for(let i=1;i<t.length;i++)
		{
			discount=((1.25/t[i].ratio)*10).toFixed(1)
			if(discount<1.2){discount=1.2;}// DH只能： 全站:1.1-9.9折  APP专享:1-9.8折   
			arr2.push(t[i].fromid+'-'+discount+'-'+(discount-0.1).toFixed(1));
		}
		this.a23(arr2)
	},
	a23:function(arr2)
	{
		if(this.obj.Cis100)
		{
			$("#state").html("正在【js提交】。。。"+arr2.length);
			this.e01(arr2);//js 		
		}
		else
		{
			let url="https://seller.dhgate.com/promoweb/platformacty/commitdis.do"
			$("#url").html(url+'[post]');
			$("#state").html("正在【post提交】。。。"+arr2.length);
			let arr3={promid:this.obj.B2arr[this.obj.B1-1],DeliverData:arr2.join(",")}
			gg.postFetch(url,JSON.stringify(arr3),this.a24,this)
		}
	},
	a24:function(t)
	{
		if(t=="")
		{
			let url="https://seller.dhgate.com/promoweb/platformacty/confirm.do?promid="+this.obj.B2arr[this.obj.B1-1]
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			$("#state").html("正在【3.完成报名】。。。");
			gg.tabs_remove_create_indexOf(2,url,"恭喜您，",true,this.a25,this)
		}
		else
		{
			Tool.at("出错："+t)
		}
	},
	a25:function(t)
	{
		let code='\
		$(function(){\
			$("#email").val("574754058@qq.com");\
			$("#tel").val("19947341683");\
			$(".bigyellow-button span").click();\
		})'
		$("#state").html("正在【确认提交】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'查看已参与平台活动<1/>id="productSubmitErrorPop" style="display: block',true,this.a26,this);
	},
	a26:function(t)
	{
		if(t.indexOf("查看已参与平台活动")!=-1)
		{
			this.obj.C1=1;
			this.obj.C2=0;
			$("#C1").css("width","0%");
			$("#C1,#C2").html("")
			this.obj.B1++;
			this.a09()
		}
		else
		{
			$("#state").html("活动有问题。。。");
			Tool.save(t)
		}
	},
	d01:function()
	{
		Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d02,this,this.d04)
	},
	d02:function()
	{
		let code='\
		$(function(){\
			$("#showNextProductList").click();\
		})'
		let str='id="page" name="page" value="';
		$("#state").html("正在【显示下30个↓】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,str,true,this.d03,this);
	},
	d03:function(t)
	{
		this.obj.temp=t;
		this.obj.C1++;
		this.d01();
	},
	d04:function()
	{
		let itemCodeArr=Tool.StrSplits(this.obj.temp,'rel="checkit" itemCode="','"');
		let len=itemCodeArr.length>100?100:itemCodeArr.length,nArr=[]
		for(let i=0;i<len;i++)
		{
			nArr.push(itemCodeArr[i]);
		}
		$("#state").html("正在【选中商品】。。。");
		let url="https://seller.dhgate.com/promoweb/platformacty/savechoose.do?promid="+this.obj.B2arr[this.obj.B1-1]+"&searchtype=0&searchval=&vip=&prodgroup=&itemcodes="+nArr.join("&itemcodes=")+"&page="+this.obj.C2;
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		this.obj.C1=1;
		this.obj.C2=0;
		this.obj.temp="";
		$("#C1").css("width","0%");
		$("#C1,#C2").html("")
		gg.tabs_remove_create_indexOf(2,url,"全站:",true,this.a16,this);
	},
	e01:function(arr)
	{
		let str="",arr2;
		for(let i=0;i<arr.length;i++)
		{
			arr2=arr[i].split("-")
			str+='$("input[name=\''+arr2[0]+'\']").val("'+arr2[1]+'");'
		}
		let code='\
		$(function(){\
			'+str+'\
			$("#enterNextStep span").click();\
		})'
		let str='id="page" name="page" value="';
		$("#state").html("正在【设置折扣】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,str,true,this.e02,this);
	},
	e02:function(t)
	{
		$("#state").html("正在等待提交完成。。。");
		gg.statusComplete(2,"fun.a25")
	}
}
fun.a01();