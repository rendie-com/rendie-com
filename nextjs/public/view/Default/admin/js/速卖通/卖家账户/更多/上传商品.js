'use strict';
var fun =
{
  obj:
	{
		A1:1,A2:0,
		where:""
	},
  a01:function()
  {
    let html=Tool.header("正在【上传商品】...")+'\
    <div class="p-2">\
      <table class="table table-hover mb-0">\
      <tbody>\
				<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
				<tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
				<tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
				<tr><td class="right">购物车图片：</td>'+Tool.htmlProgress('C')+'</tr>\
				<tr><td class="right">购物车中的图片：</td><td id="pic1" colspan="2"></td></tr>\
				<tr><td class="right">放大镜图片：</td>'+Tool.htmlProgress('D')+'</tr>\
				<tr><td class="right">放大镜中的图片：</td><td id="pic2" colspan="2"></td></tr>\
				<tr><td class="right">该账号统计：</td><td  id="doTime" colspan="2"></td></tr>\
				<tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
			<table class="table table-hover"><tbody id="body"></tbody></table>\
    </div>'
    Tool.html(this.a02,this,html)
	},
  a02:function()
  {
    gg.isRD(this.a09,this);
	},
  a03:function()
  {
		$("#state").html("正在获得配置参数");
		Tool.aliexpressSeller(this.a04,this);
	},
  a04:function()
  {
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this)
	},
  a05:function()
  {
		let url="https://gsp.aliexpress.com/"
		$("#state").html("正在登陆卖家后台。。。");
		gg.tabs_remove_create_indexOf(2,url,"<title>Seller Center</title>",true,this.a06,this)
	},
  a06:function(t)
  {
		$("#state").html("正在打开【发布商品】页面。。。");
		let url="https://gsp.aliexpress.com/apps/product/publish?spm=5261.newworkbench.aenewheader.1.32e94edfSe3UWd&page=category"
		gg.tabs_remove_create_indexOf(2,url,"<h2>基本信息",true,this.a07,this)
	},
  a07:function(t)
  {
		Tool.ajax.a01(this.b06(),1,this.a08,this); 
	},
  a08:function(oo)
  {
		let code='\
		$(function(){\
			$("input[aria-autocomplete=\'list\']").click();\
		})'
		$("#state").html("正在点击【下一步】。。。");
		gg.tabs_executeScript_indexOf(2,null,code,'<p class="text">其他特殊类</p>',true,this.a09,this);
	},
  a09:function(t)
  {
		gg.saveScreenshot(2,this.a10,this)
	},
  a10:function(t)
  {
		alert(t)
	},
  b02:function() 
  {
    return '\
		"type":<:type/>,\
		"id":<:ID/>,\
		"unit":"<:unit tag=js/>",\
		"name":"<:name tag=js/>",\
		"fromid":<:fromid/>,\
		"examine":<:examine/>,\
    "shipToUS":<:shipToUS/>,\
    "shipToAU":<:shipToAU/>,\
    "shipToRU":<:shipToRU/>,\
    "shipToCA":<:shipToCA/>,\
    "shipToIT":<:shipToIT/>,\
    "shipToFR":<:shipToFR/>,\
    "shipToSE":<:shipToSE/>,\
    "shipToUK":<:shipToUK/>,\
    "shipToIN":<:shipToIN/>,\
    "shipToDE":<:shipToDE/>,\
    "shipToES":<:shipToES/>,\
    "shipToBR":<:shipToBR/>,\
		"minprice":<:minprice/>,\
		"proid":"<:proid/>",\
		"DHshopid":<:shopid/>,\
		"DHfromid":<:fromid/>,\
		"lotNum":<:lotNum/>,\
    "keywords":"<:keywords tag=js/>",\
		"description":"<:description tag=js/>",'
  },
  b06:function()
  {
    return '\
    {\
      <r:pro db="sqlite.dhgate" size=1 where=" where @.isUpDHgate=0 and @.hide=0" page=2>\
				'+this.b02()+'\
			</r:pro>\
			"count":"<@count/>"\
		}';
  },
}
fun.a01()