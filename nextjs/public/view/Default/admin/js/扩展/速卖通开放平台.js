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
function wsDisplay(name){
	switch(name)
	{
		case "expire_offline":return "过期下架";break;
		case "user_offline":return "用户下架";break;
		case "violate_offline":return "违规下架";break;
		case "punish_offline":return "交易违规下架";break;
		case "degrade_offline":return "降级下架";break;
		default:return "未知"
	}
}
	function issueStatus(name){
		switch(name)
		{
			case "NO_ISSUE":return "无纠纷";break;
			case "IN_ISSUE":return "纠纷中";break;
			case "END_ISSUE":return "纠纷结束";break;
			default:return "未知"
		}
	}
	function FunfrozenStatus(name){
		switch(name)
		{
			case "NO_FROZEN":return "无冻结";break;
			case "IN_FROZEN":return "冻结中";break;
			default:return "未知"
		}
	}
	function FunloanStatus(name){
		switch(name)
		{
			case "wait_loan":return "未放款";break;
			case "loan_ok":return "已放款";break;
			case "pay_success":return "付款成功";break;
			case "not_pay":return "未付款";break;
			default:return "未知:"+name
		}
	}
	function FunbizType(name){
		switch(name)
		{
			case "AE_COMMON":return "AE普通订单";break;
			default:return "未知"
		}
	}
	function FunfundStatus(name){
		switch(name)
		{
			case "NOT_PAY":return "未付款";break;
			case "PAY_SUCCESS":return "付款成功";break;
			case "WAIT_SELLER_CHECK":return "卖家验款";break;
			default:return "未知"
		}
	}
	function FunorderStatus(name){
		switch(name)
		{
			case "PLACE_ORDER_SUCCESS":return "等待买家付款";break;
			case "IN_CANCEL":return "买家申请取消";break;
			case "WAIT_SELLER_SEND_GOODS":return "<font color=red>等待您发货</font>";	break;
			case "SELLER_PART_SEND_GOODS":return "部分发货";break;
			case "WAIT_BUYER_ACCEPT_GOODS":return "等待买家收货";break;
			case "FUND_PROCESSING":return "买家确认收货后，等待退放款处理的状态";break;
			case "FINISH":return "已结束的订单";break;
			case "IN_ISSUE":return "含纠纷的订单";break;
			case "IN_FROZEN":return "冻结中的订单";break;
			case "WAIT_SELLER_EXAMINE_MONEY":return "等待您确认金额";break;
			case "RISK_CONTROL":return "订单处于风控24小时中，从买家在线支付完成后开始，持续24小时";break;
			default:return "未知"
		}
	}
	function FunlogisticsStatus(name){
		switch(name)
		{
			case "WAIT_SELLER_SEND_GOODS":return "等待卖家发货";break;
			case "SELLER_SEND_PART_GOODS":return "卖家部分发货";break;
			case "SELLER_SEND_GOODS":return "卖家已发货";break;
			case "BUYER_ACCEPT_GOODS":return "买家已确认收货";break;
			case "NO_LOGISTICS":return "没有物流流转信息";break;
			default:return "未知"
		}
	}
	function gmtCreate(name){return name.substr(0,4)+"/"+name.substr(4,2)+"/"+name.substr(6,2)+" "+name.substr(8,2)+":"+name.substr(10,2)+":"+name.substr(12,2);}
function returnGetToken(URL,type)
{
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") },success:function(txt){
		eval("let getToken="+txt)
		obj.token=getToken.access_token
		setCookie("aliexpress_access_token",getToken.access_token,10)
		if(type==2)	setCookie("aliexpress_refresh_token",getToken.refresh_token,24*30)	 
		pagelist(1)
  }});
}
$(function(){
	//aliexpress_APPKEY,aliexpress_APPSECRET这2个变量从其它地方传入
	//pagelist函数也是	
	//setCookie("aliexpress_access_token","",1)
	//setCookie("aliexpress_refresh_token","",1)
	obj.aliexpress_URL=getCookie("aliexpress_token")
	if(obj.aliexpress_URL=="")
	{
		setCookie("aliexpress_URL",window.location.href,30*24);
		obj.aliexpressURL=getCookie("aliexpress_URL")
	}
	obj.token=getCookie("aliexpress_token")
	if(obj.token=="")
	{
		let URL,txt,Param
		if(getCookie("aliexpress_refresh_token")=="")
		{
			let code=getQueryString("code")
			if(code==null)//是否要登陆
			{
			  Param="client_id="+obj.APPKEY+"&site=aliexpress&redirect_uri="+obj.aliexpressURL
			  URL="http://gw.api.alibaba.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
				$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + ",," + Param + "," + obj.APPSECRET + ",code)/>") }, success: function (txt) { location.href = txt; } })
			}
			else
			{
				URL = "https://gw.api.alibaba.com/openapi/http/1/system.oauth2/getToken/"+obj.APPKEY+"?grant_type=authorization_code&need_refresh_token=true&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET+"&redirect_uri="+obj.aliexpressURL+"&code="+ code
				returnGetToken(URL,2)
			}
		}
		else
		{
			URL="https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/getToken/"+obj.APPKEY+"?refresh_token="+getCookie("aliexpress_refresh_token")+"&grant_type=refresh_token&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET
			//document.write(URL)
			returnGetToken(URL,1);
		}
	}
	else
	{pagelist(1);}
});
