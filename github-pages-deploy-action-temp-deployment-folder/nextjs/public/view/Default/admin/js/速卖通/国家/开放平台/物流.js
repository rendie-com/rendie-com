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
		urlPath="param2/1/aliexpress.open/api.getPrintInfos/"+this.obj.APPKEY
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
	function apigetPrintInfos()//批量获取线上发货标签
	{
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.getPrintInfos/"+aliexpress_APPKEY+""
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		txt=$.ajax({type:"POST",url:"/inc/ajax.aspx/httpRequestPostParam.html?"+Math.random(),data:{URL:URL,urlPath:urlPath,Param:Param,APPSECRET:aliexpress_APPSECRET},async:false}).responseText;
		$("#listImagePagination").html("<tr><td>"+txt+"</td></tr>")
	}
	function apigetOnlineLogisticsInfo()//邮政小包订单信息
	{
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.getOnlineLogisticsInfo/"+aliexpress_APPKEY
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		$("#listImagePagination").html("<tr><td>"+txt+"</td></tr>")
	}
	function apilistLogisticsService()
	{
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.listLogisticsService/"+aliexpress_APPKEY
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let obj="+txt);
		let List=obj.result
		let htmlstr="<tr align=\"center\">\
			<td nowrap=\"nowrap\">推荐显示排序</td>\
			<td>物流公司名称</td>\
			<td nowrap=\"nowrap\">最小处理时间</td>\
			<td nowrap=\"nowrap\">最大处理时间</td>\
			<td>物流服务显示名称</td>\
			<td>物流服务key</td>\
			<td align=\"left\">物流追踪号码校验规则</td>\
			</tr>"
		for(let x in List)
		{
			htmlstr+="<tr align=\"center\">\
				<td>"+List[x].recommendOrder+"</td>\
				<td>"+List[x].logisticsCompany+"</td>\
				<td>"+List[x].minProcessDay+"</td>\
				<td>"+List[x].maxProcessDay+"</td>\
				<td>"+List[x].displayName+"</td>\
				<td>"+List[x].serviceName+"</td>\
				<td align=\"left\">"+List[x].trackingNoRegex+"</td>\
				</tr>"
		}
		$("#listImagePagination").html(htmlstr)
	}
	function apiqureyWlbDomesticLogisticsCompany()//中邮小包支持的国内快递公司信息
	{
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.qureyWlbDomesticLogisticsCompany/"+aliexpress_APPKEY+""
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		txt=$.ajax({type:"POST",url:"/inc/ajax.aspx/httpRequestPostParam.html?"+Math.random(),data:{URL:URL,urlPath:urlPath,Param:Param,APPSECRET:aliexpress_APPSECRET},async:false}).responseText;
		eval("let obj="+txt);
		let List=obj.result
		let htmlstr="<tr align=\"center\">\
			<td>国内快递公司名称</td>\
			<td>国内快递公司Id</td>\
			<td>国内快递公司Code</td>\
			</tr>"
		for(let x in List)
		{
			htmlstr+="<tr align=\"center\">\
				<td>"+List[x].name+"</td>\
				<td>"+List[x].companyId+"</td>\
				<td>"+List[x].companyCode+"</td>\
				</tr>"
		}
		$("#listImagePagination").html(htmlstr)
	}*/
