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
		urlPath="param2/1/aliexpress.open/api.findProductinfoQuery/"+this.obj.APPKEY
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
/*  <script type="text/javascript" src="/<.Path/>admin/js/扩展/速卖通开放平台.js"></script>
	<script type="text/javascript">
		let page,pcount,pagelen,productCount,aliexpress_APPKEY,aliexpress_APPSECRET,productStatusType,subject
		page=1;pcount=10;pagelen=8-1;productStatusType="onSelling";	subject=""	
		<r:APIaccount size=1 where=" where @.from='aliexpress' order by @.sort asc">
		aliexpress_APPKEY="[APIaccount:APPKEY]"
		aliexpress_APPSECRET="[APIaccount:APPSECRET]"
		</r:APIaccount>
		function product(){//显示产品列表
			let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
			urlPath="param2/1/aliexpress.open/api.findProductinfoQuery/"+aliexpress_APPKEY+""
			Param="productStatusType="+productStatusType+"&subject="+subject+"&pageSize="+pcount+"&currentPage="+page+"&access_token="+access_token
			URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
			txt=$.ajax({type:"POST",url:"/inc/ajax.aspx/httpRequestPostParam.html?"+Math.random(),data:{URL:URL,urlPath:urlPath,Param:Param,APPSECRET:aliexpress_APPSECRET},async:false}).responseText;
			//document.write(txt)
			eval("let aeopAEProductDisplayDTOList=" + txt);
			productCount=aeopAEProductDisplayDTOList.productCount
			let htmlstr="",productPrice=""
			for(let i=0;i<aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList.length;i++)
			{		
			  productPrice=aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productMinPrice
			  if(productPrice!=aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productMaxPrice)
			  {productPrice=productPrice+" - "+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productMaxPrice}
			  htmlstr+="<tr align=\"center\">\
			  <td align=\"left\" nowrap=\"nowrap\">\
			  <input type=\"checkbox\" value=\""+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productId+"\" name=\"pre_id\" class=\"checkbox\" id=\"check-"+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productId+"\"><label for=\"check-"+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productId+"\">"+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productId+"</label></td>\
			  <td align=\"left\">\
			  "+imageURLs(aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].imageURLs)+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].subject+"\
			  </td>\
			  <td nowrap=\"nowrap\">"+productPrice+"</td>\
			  <td>"+gmtCreate(aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].gmtModified)+"</td>\
			  <td>"+wsDisplay(aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].wsDisplay)+"</td>\
			  <td>"+gmtCreate(aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].wsOfflineDate)+"</td>\
			  <td><a href='<.arr(1)/>/article/{r:arr(3)/>/"+aeopAEProductDisplayDTOList.aeopAEProductDisplayDTOList[i].productId+".html'>修改</a></td>\
			  </tr>"
			}
			htmlstr+="<tr><td colspan=\"7\">"+pageshow(productCount,pcount,page,pagelen)+"</td></tr>"//显示分页
			return htmlstr
		}
		function imageURLs(obj){
			let str="<table><tr>"
			obj=obj.split(";")
			for(let i=0;i<obj.length;i++)
			{			
				str+="<td><a target=\"_blank\" href=\""+obj[i]+"\"><img style=\"margin:2px;padding:1px;border:1px solid #ccc\" src=\""+obj[i]+"\" title=\"点击预览\" border=\"0\" width=\"40\" height=\"40\" align=\"left\"/></a></td>"
			}
			return str+"</tr></table>"
		}
		function pagelist(p){//内容
			switch(productStatusType)
			{
				case "onSelling":$('#onlineAeProduct').hide();$('#offlineAeProduct').show();break;//上架时后
				case "offline":$('#offlineAeProduct').hide();$('#onlineAeProduct').show();break;//上架时后
			}		
			$("#findAeProductById").html('<tr align="center"><td colspan="10"><img src="/<.Path/>admin/img/loading.gif" align="absmiddle"/><td></tr>')
			page=p	
			$("#findAeProductById").html(product())
			return false;
		}
		function FunProductStatusType(name,event){//商品业务状态
			productStatusType=name
			$("#StatusTypeclass a").css("color","");
			event.style.color="red"; 
		  	pagelist(1)
		}
		function FunOnlineAeProduct(){//商品上架
		  let ids=""
		  $('input[name="pre_id"]:checked').each(function(){if(ids==""){ids=$(this).val();}else{ids=ids+";"+$(this).val();}});
		  let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		  urlPath="param2/1/aliexpress.open/api.onlineAeProduct/"+aliexpress_APPKEY
		  Param="productIds="+ids+"&access_token="+access_token
		  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		  txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		  alert(txt)
		  pagelist(1)
		}
		function FunOfflineAeProduct(){//商品下架
		  let ids=""
		  $('input[name="pre_id"]:checked').each(function(){if(ids==""){ids=$(this).val();}else{ids=ids+";"+$(this).val();}});
		  let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		  urlPath="param2/1/aliexpress.open/api.offlineAeProduct/"+aliexpress_APPKEY
		  Param="productIds="+ids+"&access_token="+access_token
		  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		  txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		  alert(txt);pagelist(1);
		}
		function intoProduct(){
			<r:type where=" where @.from='rendie' and @.upid='Fun(arr(3))'" size=1>
			location.href='<.arr(1)/>/list/<:id/>.html';
			</r:type>
		}
		function selectBtn(){subject=$("#searchword").val();pagelist(1)}
	</script>
<load admin/html/头部.html/>
<table class="tb">
  <tr>
      <td colspan="7" id="StatusTypeclass">商品业务状态：
	  <a href="javascript:" onClick="FunProductStatusType('onSelling',this)" style="color:#FF0000;">上架</a>
	  &nbsp;|&nbsp;
	  <a href="javascript:" onClick="FunProductStatusType('offline',this)">下架</a>
	  &nbsp;|&nbsp;
	  <a href="javascript:" onClick="FunProductStatusType('auditing',this)">审核中</a>
	  &nbsp;|&nbsp;
	  <a href="javascript:" onClick="FunProductStatusType('editingRequired',this)">审核未通过</a>
	  </td>
  </tr>
  <tr><td align="left" colspan="7">
  关键字<input type="text" size="70" id="searchword" value="" autocomplete="off">
  <input type="button" value="搜索" class="pn" onClick="selectBtn()">
  </td></tr>
  <tr align="center">
      <td>ID</td>
      <td align="left">标题</td>
      <td>售价</td>
      <td>修改时间</td>
      <td nowrap="nowrap">下架原因</td>
      <td>产品下架时间</td>
      <td nowrap="nowrap" width="100">操作</td>
  </tr>
  <tbody id="findAeProductById"><tr align="center"><td colspan="7"><img src='<.Path/>admin/img/loading.gif' align='absmiddle'/><td></tr></tbody>
  <tr align="left">
     <td colspan="7">
        <input type="button" class="pn" value="反选" onClick="checkOthers('input','pre_id')" />  
        <input type="button" value="批量上架" class="pn" id="onlineAeProduct" onClick="FunOnlineAeProduct()"/>
        <input type="button" value="批量下架" class="pn" id="offlineAeProduct" onClick="FunOfflineAeProduct()"/>
				<input type="button" class="pn" value="一键采集所有" onClick="intoProduct()"/>
     </td>
  </tr>
</table>

*/