'use strict';
var fun=
{
	token:"",obj:{},mode:0,menu:0,
	api:
	[
		{client_id:"-rendie-SBX-d1e6ba2c1-f2d70518",redirect_uri:"_--rendie-SBX-d1e-uwsvgnoj",client_secret:"SBX-1e6ba2c13404-ca63-4556-9b8e-4693",scope:"https://api.ebay.com/oauth/api_scope"},//沙箱
		{client_id:"huangxin-rendie-PRD-b1e8de676-91465ddc",redirect_uri:"huang_xing-huangxin-rendie-jshark",client_secret:"PRD-1e8de6767d12-ddad-4076-9d8b-abc2",scope:"https://api.ebay.com/oauth/api_scope"}//正式
	],
  a01:function(val)
	{
		this.menu=val;
		if(val==1)
		{this.a02();}
		else if(val==2)
		{F1.a01(this,this.a03);}
		else
		{
		  alert("aaaaaaa")
		}
	},
  a02:function()
	{
    let html = '\
    <header class="panel-heading">\
      <div onclick="" class="active">配置</div>\
      <div onclick="">API分析</div>\
      <div onclick="">帐户API</div>\
      <div onclick="">库存API</div>\
      <div onclick="">履行API</div>\
      <div onclick="">营销API</div>\
      <div onclick="">推荐API</div>\
      <div onclick="">Analytics API</div>\
      <div onclick="">元数据API</div>\
		</header>\
		<div class="p-2">\
			<table class="table align-middle table-hover">\
				<tbody>'+this.b01()+'</tbody>\
			</table>\
		</div>'
		Tool.html(null,null,html);
	},
  b01:function()
  {
		return '\
		<tr>\
      <td class="w200 right">账号：</td>\
      <td><input type="text" value="574754058@qq.com" class="form-control w300"></td>\
		</ul>\
		<tr>\
      <td class="right">密码：</td>\
      <td><input type="text" value="abc123456!!" class="form-control w300"></td>\
		</tr>\
		<tr>\
      <td class="right">开发者入口：</td>\
      <td><a href="https://developer.ebay.com/" target="_blank">https://developer.ebay.com/</a></td>\
		</tr>\
		<tr class="table-light"><th colspan="2">沙箱</th></tr>\
		<tr>\
			<td class="right">App ID (Client ID)：</td>\
			<td>'+this.api[0].client_id+'</td>\
		</tr>\
		<tr>\
		<td class="right">Cert ID (Client Secret)：</td>\
		<td>'+this.api[0].client_secret+'</td>\
		</tr>\
		<tr>\
			<td class="right"> redirect_uri(RuName)：</td>\
			<td>'+this.api[0].redirect_uri+'</td>\
		</tr>\
		<tr class="table-light"><th colspan="2">正式</th></tr>\
		<tr>\
			<td class="right">App ID (Client ID)：</td>\
			<td>'+this.api[1].client_id+'</td>\
		</tr>\
		<tr>\
			<td class="right">Cert ID (Client Secret)：</td>\
			<td>'+this.api[1].client_secret+'</td>\
		</tr>\
		<tr>\
			<td class="right">redirect_uri(RuName)：</td>\
			<td>'+this.api[1].redirect_uri+'</td>\
		</tr>'
	}
}
fun.a01(1)
/*
  
  a03:function()
	{
		let url="https://api"+(this.obj.mode?"":".sandbox")+".ebay.com/developer/analytics/v1_beta/rate_limit/?api_name=&api_context="
		let head="Content-Type=application/json&Authorization=Bearer "+this.token
		Tool.ajax.a01("<.ebayGet("+url+","+head+")/>",1,this.a04,this)
	},
  a04:function(t)
	{
		eval("let arr="+t)		
		F1.b01('<ul class="Tul"><li><pre>'+JSON.stringify(arr,null,2)+'</pre></li></ul>',this.menu);
	}
*/