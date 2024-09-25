'use strict';
var fun=
{
  time:new Date(),
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在报名【跨店满减】活动...")+'\
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
		let url="https://seller.dhgate.com/promoweb/platformacty/actylist.do?ptype=1&dhpath=10004,30,3009&actyoption=0&type=10";
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在【平台活动报名-跨店满减-我要报名】。。。");
		gg.getFetch(url,"json",this.a08,this);
  },
	a08:function(t)
	{
		let urlArr=[],promoidArr=Tool.StrSplits(t,'promoid="','"');
		let url="https://seller.dhgate.com/promoweb/platformacty/loadproduct.do?dhpath=10004,30,3009&promid="
		for(let i=0;i<promoidArr.length;i++)
		{
			urlArr.push(url+promoidArr[i])
		}
		this.obj.Barr=urlArr//有多少要报名
		this.obj.B2arr=promoidArr
		this.obj.B2=urlArr.length;
		this.a09();
	},
	a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a12);
	},
	a10:function()
	{
		let url=this.obj.Barr[this.obj.B1-1]
    $("#state").html("正在打开【1.选择促销产品】。。。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.tabs_remove_create_indexOf(2,url,'<td class="col5"<1/>抱歉，您没有符合该活动要求的产品',true,this.a11,this);
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
		$("#state").html("正在选中【所有商品】。。。");
		let code='\
		$(function(){\
			$("#filterCondition label").click();\
		})'
		gg.tabs_executeScript_indexOf(2,null,code,'<td class="col5"',true,this.a14,this);
	},
	a14:function(t)
	{
		$("#state").html("正在点全选。。。");
		let code='\
		$(function(){\
			$("[conduct=\'submitAllSelectPop\']").click();\
		})'
		gg.tabs_executeScript_indexOf(2,null,code,'当前列表中有部分产品未展示，是否选中全部产品？',true,this.a15,this);
	},
	a15:function(t)
	{
		let code='\
		$(function(){\
			$("#unClickButton span").click();\
		})'
		$("#state").html("正在确认全选。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'全选',true,this.a16,this);
	},
	a16:function(t)
	{
		let code='\
		$(function(){\
			$("#enterNextStep span").click();\
		})'
		$("#state").html("正在点击【下一步】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'id="enterNextStep"',true,this.a17,this);
	},
	a17:function()
	{
		this.a18()
	},
	a18:function()
	{
		let code='\
		$(function(){\
			$("#enterNextStep span").click();\
		})'
		$("#state").html("正在【提交】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'恭喜您，您',true,this.a19,this);
	},
	a19:function(t)
	{
		this.a20()
	},
	a20:function()
	{
		let code='\
		$(function(){\
			$("#email").val("574754058@qq.com");\
			$("#tel").val("19947341683");\
			$(".bigyellow-button span").click();\
		})'
		$("#state").html("正在【确认提交】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'您现在可以',true,this.a21,this);
	},
	a21:function(t)
	{
		if(t.indexOf("查看已参与平台活动")!=-1)
		{
			this.obj.B1++;
			this.a09()
		}
		else
		{
			$("#state").html("活动有问题。。。");
			Tool.save(t)
		}
	}
}
fun.a01();