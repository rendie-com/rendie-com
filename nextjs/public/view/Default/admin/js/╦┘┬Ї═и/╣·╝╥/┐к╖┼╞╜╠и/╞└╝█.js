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
		urlPath="param2/1/aliexpress.open/api.evaluation.querySellerEvaluationOrderList/"+this.obj.APPKEY
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
/*
function querySellerEvaluationorder(){//查询待卖家评价的订单信息
  let urlPath,Param,URL
  urlPath="param2/1/aliexpress.open/api.evaluation.querySellerEvaluationOrderList/"+obj.APPKEY
  Param="access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+obj.APPSECRET+",)/>")/>,success:function(txt){
    $("#table").html(txt)
	}});
}
*/