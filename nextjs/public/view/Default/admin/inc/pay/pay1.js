var obj={APPKEY:"1354133",APPSECRET:"Ou8kkkzITmpO",aliexpressURL:"http://localhost:82/1.html"}
$(function(){

	var Param="client_id="+obj.APPKEY+"&site=china&redirect_uri="+obj.aliexpressURL
	var URL="http://gw.open.1688.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
	$.ajax({type:"POST",url:o.mode+"exe.html?"+Math.random(),data:{data:escape("{r.httpRequestPostParam("+URL+",,"+Param+","+obj.APPSECRET+",code)}")},success:function(txt){
																																																																																		 alert(txt)
	 location.href=txt;
	}})




});
