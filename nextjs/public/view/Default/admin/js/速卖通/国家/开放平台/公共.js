'use strict';
var fun=
{
	token:"",obj:{},
  a01:function()
	{
		F1.b01(this,this.a02,false);
	},
  a02:function()
	{
		let urlPath,Param,URL
		urlPath="param2/1/aliexpress.open/api.queryAeAnouncement/"+this.obj.APPKEY
    Param="access_token="+this.token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		Tool.ajax.a01("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",)/>",1,this.a03,this)
	},
  a03:function(t)
	{
		alert(t)
	},
}
fun.a01();