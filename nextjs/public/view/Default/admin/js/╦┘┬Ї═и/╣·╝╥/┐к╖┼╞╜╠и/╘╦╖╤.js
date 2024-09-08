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
		urlPath="param2/1/aliexpress.open/api.listFreightTemplate/"+this.obj.APPKEY
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

  <script type="text/javascript" src="/<.Path/>admin/js/扩展/速卖通开放平台.js"></script>
  <script type="text/javascript">
	let aliexpress_APPKEY,aliexpress_APPSECRET
	<r:APIaccount size=1 where=" where @.from='aliexpress' order by @.sort asc">
	aliexpress_APPKEY="[APIaccount:APPKEY]"
	aliexpress_APPSECRET="[APIaccount:APPSECRET]"
	</r:APIaccount>
	function pagelist(p){apilistFreightTemplate();return false;}
	function apilistFreightTemplate()
	{
		let html="",urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.listFreightTemplate/"+aliexpress_APPKEY
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let obj="+txt)
		obj=obj.aeopFreightTemplateDTOList
		html="<tr><td>模板ID</td><td>是否默认</td><td>模板名称</td></tr>"
		for(let i=0;i<obj.length;i++)
		{
			html+="<tr><td><a href='javascript:' onclick='apigetFreightSettingByTemplateQuery(\""+obj[i].templateId+"\")'>"+obj[i].templateId+"</a></td><td>"+obj[i].default+"</td><td>"+obj[i].templateName+"</td></tr>"
		}
		$("#listImagePagination").html(html)
	}
	function apicalculateFreight()
	{
		html="<tr><td align=\"right\">长:</td><td><input type=\"text\" name=\"length\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">宽:</td><td><input type=\"text\" name=\"width\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">高:</td><td><input type=\"text\" name=\"height\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">毛重:</td><td><input type=\"text\" name=\"weight\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">数量:</td><td><input type=\"text\" name=\"count\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">country:</td><td><input type=\"text\" name=\"country\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">是否为自定义打包计重,Y/N:</td><td><input type=\"text\" name=\"isCustomPackWeight\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">打包计重几件以内按单个产品计重:</td><td><input type=\"text\" name=\"packBaseUnit\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">打包计重超过部分每增加件数:</td><td><input type=\"text\" name=\"packAddUnit\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">打包计重超过部分续重:</td><td><input type=\"text\" name=\"packAddWeight\" size=\"150\" /></td></tr>\
					<tr><td align=\"right\">运费模板ID:</td><td><input type=\"text\" name=\"freightTemplateId\" size=\"150\" /></td></tr>\
					"
		$("#listImagePagination").html(html)
	}	
	$(function(){
		$(".tb .makeHtmlTab li").click(function(){
			$(".tb .makeHtmlTab li").removeAttr('class');$(this).attr("class","hover")
			if($(this).attr("val")=="1_tbody")
			{apilistFreightTemplate();}
			else if($(this).attr("val")=="2_tbody")
			{apicalculateFreight();}
		})
	})
	function apigetFreightSettingByTemplateQuery(id)
	{
		let html="",urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.getFreightSettingByTemplateQuery/"+aliexpress_APPKEY
		Param="templateId="+id+"&access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let obj="+txt)
		let str2,List2,str="",List=obj.freightSettingList
		for(let x in List)
		{
			str2=""
			List2=List[x].selfstandard
			for(let y in List2)
			{
				str2+="<tr>\
								<td align=\"right\" nowrap=\"nowrap\">自定义标准运费减免率(%):</td><td>"+List2[y].selfStandardDiscount+"</td>\
								<td align=\"right\" nowrap=\"nowrap\">自定义标准运费国家:</td><td class=\"AutoNewline\">"+List2[y].selfStandardCountry+"</td>\
							</tr>"
			}
			str2="<table>"+str2+"</table>"
			str+="<tr>\
			<td>\
				<table>\
				<tr><td align=\"right\" nowrap=\"nowrap\">自定义免运费国家:</td><td class=\"AutoNewline\">"+(List[x].template.freeShippingCountry?List[x].template.freeShippingCountry:"")+"</td></tr>\
				<tr><td align=\"right\" nowrap=\"nowrap\">物流公司:</td><td>"+List[x].template.logisticsCompany+"</td></tr>\
				<tr><td align=\"right\" nowrap=\"nowrap\">自定义标准运费的国家:</td><td class=\"AutoNewline\">"+(List[x].template.standardShippingCountry?List[x].template.standardShippingCountry:"")+"</td></tr>\
				<tr><td align=\"right\" nowrap=\"nowrap\">是否为全部标准运费:</td><td>"+List[x].template.allStandardShipping+"</td></tr>\
				<tr><td align=\"right\" nowrap=\"nowrap\">是否为全部免运费:</td><td>"+List[x].template.allFreeShipping+"</td></tr>\
				<tr><td align=\"right\" nowrap=\"nowrap\">标准运费减免率(%):</td><td>"+(List[x].template.allStandardDiscount?List[x].template.allStandardDiscount:"")+"</td></tr>\
				</table>\
			</td>\
			<td>"+List[x].selfdefine+"</td>\
			<td>"+str2+"</td>\
			</tr>"
		}
		str="<table class=\"tb\"><tr align=\"center\"><td>模板</td><td nowrap=\"nowrap\">自定义运费</td><td nowrap=\"nowrap\">自定义标准</td></tr>"+str+"</table>"
		html="\
		<tr><td align=\"right\"nowrap=\"nowrap\">运费模板ID:</td><td>"+obj.templateId+"</td></tr>\
		<tr><td align=\"right\"nowrap=\"nowrap\">是否默认模板:</td><td>"+obj.default+"</td></tr>\
		<tr><td align=\"right\"nowrap=\"nowrap\">运费模板名称:</td><td>"+obj.templateName+"</td></tr>\
		<tr><td align=\"right\"nowrap=\"nowrap\">运费设置列表:</td><td>"+str+"</td></tr>\
		"
		$("#listImagePagination").html(html)
	}
</script>
<load admin/html/头部.html/>
<table class="tb">
	<tr>
		<td>
			<ul class="makeHtmlTab">
				<li val="1_tbody" class="hover">用户的运费模板</li>
				<li val="2_tbody">运费计算</li>
			</ul>
		<table class="tb">
		<tbody id="listImagePagination"><tr align="center"><td><img src='<.Path/>admin/img/loading.gif' align='absmiddle'/><td></tr></tbody>
		</table>
	</td>
</tr>
</table>

*/