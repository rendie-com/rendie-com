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
		urlPath="param2/1/aliexpress.open/api.listImagePagination/"+this.obj.APPKEY
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
/*	let page,pcount,pagelen,productCount,aliexpress_APPKEY,aliexpress_APPSECRET
	page=1;pcount=24;pagelen=8-1;

	<r:APIaccount size=1 where=" where @.from='aliexpress' order by @.sort asc">
	aliexpress_APPKEY="[APIaccount:APPKEY]"
	aliexpress_APPSECRET="[APIaccount:APPSECRET]"
	</r:APIaccount>
	
	function pagelist(p){//内容
		$("#listImagePagination").html('<tr align="center"><td colspan="10"><img src="/<.Path/>admin/img/loading.gif" align="absmiddle"/><td></tr>')
		page=p
		$("#listImagePagination").html(listImagePagination())
		return false;
	}
	function listImagePagination(){
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.listImagePagination/"+aliexpress_APPKEY
		Param="locationType=allGroup&pageSize="+pcount+"&currentPage="+page+"&access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		//document.write(txt)
		eval("let listImagePagination="+txt);
		productCount=listImagePagination.total
		msgList=listImagePagination.images
		let htmlstr="<tr align=\"center\"><td><ul>"
		for(let x in msgList)
		{
			htmlstr+="<li style=\"width:200px;float:left;\"><a href=\""+msgList[x].url + "\" target=\"_blank\"><img src='"+msgList[x].url + "' height=\"150\" width=\"150\"></a></li>"
		}
		htmlstr=htmlstr+"</ul><td></tr>"
		htmlstr+="<tr><td colspan=\"9\">"+pageshow(productCount,pcount,page,pagelen)+"</td></tr>"//显示分页
		return htmlstr
	}
*/