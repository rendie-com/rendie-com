'use strict';
//日期和时间戳互换
function js_date_time(unixtime){return userDate(unixtime)+" "+userTime(unixtime)}
//时间戳转换成四位时间10:10:00
function userTime(uTime){
    let myDate = new Date(uTime*1000);
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let second = myDate.getSeconds();
    return hours + ':' + minutes + ':' + second;
}
//时间戳转换成八位日期2014-5-5 
function userDate(uData){
	let myDate = new Date(uData*1000);
	let year = myDate.getFullYear();
	let month = myDate.getMonth() + 1;
	let day = myDate.getDate();
	return year + '/' + month + '/' + day;
}
function returnGetToken(URL,type)
{
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") },success:function(txt){
		eval("let getToken="+txt)
		obj.token=getToken.access_token
		setCookie("1688_token",getToken.access_token,10)
		if(type==2){setCookie("1688_refresh_token",getToken.refresh_token,24*30)}	 
		pagelist(1)
  }});
}
$(function(){
	obj.token=getCookie("1688_token")
	if(obj.token=="")
	{
		let URL,txt,Param
		if(getCookie("1688_refresh_token")=="")
		{
			let code=getQueryString("code")
			if(code==null)//是否要登陆
			{
				setCookie("URL1688",window.location.href,30*24);
			  Param="client_id="+obj.APPKEY+"&site=china&redirect_uri="+window.location.href
			  URL="http://gw.open.1688.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
				$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + ",," + Param + "," + obj.APPSECRET + ",code)/>") }, success: function (txt) { location.href = txt; } })
			}
			else
			{
				URL = "https://gw.open.1688.com/openapi/http/1/system.oauth2/getToken/"+obj.APPKEY+"?grant_type=authorization_code&need_refresh_token=true&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET+"&redirect_uri="+getCookie("URL1688")+"&code="+ code
				returnGetToken(URL,2)
			}
		}
		else
		{
			URL="https://gw.open.1688.com/openapi/param2/1/system.oauth2/getToken/"+obj.APPKEY+"?refresh_token="+getCookie("1688_refresh_token")+"&grant_type=refresh_token&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET
			returnGetToken(URL,1);
		}
	}
	else
	{
		pagelist(1);
	}
});