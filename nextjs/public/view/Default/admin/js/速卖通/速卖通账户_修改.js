'use strict';
$(function(){
	list()
  $("#submit").click(function(){
	  let sql=Object()
	  sql.PriceRatio=$("#PriceRatio").val()
	  sql.afterSaleID=$("#afterSaleID").val()
	  sql.shippingModeID=$("#shippingModeID").val()
	  sql.Group=$("#Group").val()
	  sql.vaildDay=$("#vaildDay").val()
	  sql.leadingTime=$("#leadingTime").val()
	  sql.loadProType=$("#loadProType").attr("val")
	  sql.upProTime=$("#upProTime").val()
	  sql.sql="update @.APIaccount set @.vaildDay="+sql.vaildDay+",:leadingTime="+sql.leadingTime+",:PriceRatio="+sql.PriceRatio+",:afterSaleID='"+sql.afterSaleID+"',:shippingModeID='"+sql.shippingModeID+"',:Group='"+sql.Group+"',:upProTime='"+sql.upProTime+"',:loadProType="+sql.loadProType+" where @.id="+Arr4
	  sql.sql='<r: db="sqlite.aliexpress">'+sql.sql+'</r:>操作成功'
	  sql.sql=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(sql.sql)},async:false}).responseText;
	  alert(sql.sql)
	  window.location.reload();
  })
});
function returnGetToken(URL,type)
{
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") },success:function(txt){
	eval("let getToken="+txt)
	obj.token=getToken.access_token
	setCookie("aliexpress_token_"+Arr4,getToken.access_token,10)
	if(type==2)setCookie("aliexpress_refresh_"+Arr4,getToken.refresh_token,24*30)	 
	api_listFreightTemplate()
  }});
}
function list()
{
  obj.token=getCookie("aliexpress_token_"+Arr4)
  if(obj.token=="")
  {
	let URL,txt,Param
	if(getCookie("aliexpress_refresh_"+Arr4)=="")
	{
		let code=getQueryString("code")
		if(code==null)//是否要登陆
		{
		  Param="client_id="+obj.APPKEY+"&site=aliexpress&redirect_uri="+window.location.href
		  URL="http://gw.api.alibaba.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
			$.ajax({
				type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + ",," + Param + "," + obj.APPSECRET + ",code)/>") },success:function(txt){
			  //document.write(txt)
			  location.href=txt;
		  }})
		}
		else
		{
			URL = "https://gw.api.alibaba.com/openapi/http/1/system.oauth2/getToken/"+obj.APPKEY+"?grant_type=authorization_code&need_refresh_token=true&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET+"&redirect_uri="+window.location.href+"&code="+ code
			returnGetToken(URL,2)
		}
	}
	else
	{
		URL="https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/getToken/"+obj.APPKEY+"?refresh_token="+getCookie("aliexpress_refresh_token_"+Arr4)+"&grant_type=refresh_token&client_id="+obj.APPKEY+"&client_secret="+obj.APPSECRET
		returnGetToken(URL,1);
	}
  }else{api_listFreightTemplate();}
}
function api_listFreightTemplate()
{
  let urlPath,Param,URL,html="<select id=\"shippingModeID\"><option value=\"\">请选择运费模板</option>"
  urlPath="param2/1/aliexpress.open/api.listFreightTemplate/"+obj.APPKEY+""
  Param="access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
	  let htmlobj=$("#DH_shippingModelId"),val=htmlobj.attr("val")
		eval("let obj2="+txt);
		obj2=obj2.aeopFreightTemplateDTOList
		for(let i=0;i<obj2.length;i++)
		{
			html+="<option value=\""+obj2[i].templateId+"\" "+(obj2[i].templateId==val?"selected=\"selected\"":"")+">"+obj2[i].templateName+"</option>"
		}
		htmlobj.html(html+'</select>')
		api_queryPromiseTemplateById()
  }});
}
function api_queryPromiseTemplateById()
{
  let urlPath,Param,URL,html="<select id=\"afterSaleID\"><option value=\"\">请选择售后模板</option>"
  urlPath="param2/1/aliexpress.open/api.queryPromiseTemplateById/"+obj.APPKEY+""
  Param="templateId=-1&access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
	  let htmlobj=$("#DH_afterSaleList"),val=htmlobj.attr("val")
		eval("let obj2="+txt);
		obj2=obj2.templateList
		for(let i=0;i<obj2.length;i++)
		{
		  html+="<option value=\""+obj2[i].id+"\" "+(obj2[i].id==val?"selected=\"selected\"":"")+">"+obj2[i].name+"</option>"
		}
		htmlobj.html(html+'</select>')
		api_getProductGroupList()
  }});
}
function api_getProductGroupList()
{
  let urlPath,Param,URL
  urlPath="param2/1/aliexpress.open/api.getProductGroupList/"+obj.APPKEY+""
  Param="templateId=-1&access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
	  eval("let obj2="+txt);
	  //document.write(txt)
	  obj2=obj2.target
	  $("#Group").html(JSON.stringify(obj2))
	  let html=""
	  for(let i=0;i<obj2.length;i++)
	 {
		if(i!=0)html+="<hr/>";html+="<b>"+(i+1)+". "+obj2[i].groupName+"（<.Db(select count(1) as total from @.dhUpPro where @.upUserID="+Arr4+" and @.upGroupId='"+obj2[i].groupId+"',count)/>）</b>"
	}
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt){$("#GroupHtml").html(txt);}});
  }});
}