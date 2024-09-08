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
		urlPath="param2/1/aliexpress.open/api.findProductInfoListQuery/"+this.obj.APPKEY
    Param="productStatusType=offline&subject=&pageSize=30&currentPage=1&access_token="+this.token
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

<r:APIaccount size=1 where=" where @.from='aliexpress' order by @.sort asc">
  <script type="text/javascript">let obj={path:"<.Path/>",APPKEY:"[APIaccount:APPKEY]",APPSECRET:"[APIaccount:APPSECRET]",productStatusType:"onSelling",subject:"",pcount:20,href:"<.arr(1)/>/article/{r:arr(3)/>/"/></script>
</r:APIaccount>
<script type="text/javascript" src="/<.Path/>admin/js/扩展/速卖通开放平台.js"></script>
<script type="text/javascript" src="/<.Path/>admin/js/扩展/速卖通开放平台/产品.js"></script>
<load admin/html/头部.html/>
<table class="tb">
  <tr>
    <td colspan="7" id="StatusTypeclass">商品业务状态：<a href="javascript:" onClick="FunProductStatusType('onSelling',this)" style="color:#FF0000;">上架</a> &nbsp;|&nbsp; <a href="javascript:" onClick="FunProductStatusType('offline',this)">下架</a> &nbsp;|&nbsp; <a href="javascript:" onClick="FunProductStatusType('auditing',this)">审核中</a> &nbsp;|&nbsp; <a href="javascript:" onClick="FunProductStatusType('editingRequired',this)">审核未通过</a></td>
  </tr>
  <tr>
    <td align="left" colspan="7"><input type="text" size="50" id="searchword" value="" autocomplete="off">
      <input type="button" value="搜索" class="pn" onClick="selectBtn()"></td>
  </tr>
  <tr align="center">
    <td>ID</td>
    <td align="left">标题</td>
    <td>售价</td>
    <td>修改时间</td>
    <td nowrap="nowrap">下架原因</td>
    <td>产品下架时间</td>
    <td nowrap="nowrap" width="100">操作</td>
  </tr>
  <tbody id="findAeProductById">
    <tr align="center">
      <td colspan="7"><img src='<.Path/>admin/img/loading.gif' align='absmiddle'/>
      <td>
    </tr>
  </tbody>
  <tr align="left">
    <td colspan="7"><input type="button" class="pn" value="反选" onClick="checkOthers('input','pre_id')" />
      <input type="button" value="批量上架" class="pn" id="onlineAeProduct" onClick="FunOnlineAeProduct()"/>
      <input type="button" value="批量下架" class="pn" id="offlineAeProduct" onClick="FunOfflineAeProduct()"/>
      <input type="button" class="pn" value="一键采集所有" onClick="intoProduct()"/></td>
  </tr>
</table>


function product(){//显示产品列表
  let urlPath,Param,URL
  urlPath="param2/1/aliexpress.open/api.findProductInfoListQuery/"+obj.APPKEY+""
  Param="productStatusType="+obj.productStatusType+"&subject="+obj.subject+"&pageSize="+obj.pcount+"&currentPage="+obj.page+"&access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+obj.APPSECRET+",)/>")/>,success:function(txt){
	eval("let list=" + txt);
	productCount=list.productCount
	if(productCount==0)
	{$("#findAeProductById").html('<tr align="center"><td colspan="7">无商品<td></tr>');}
	else
	{
	  let htmlstr="",productPrice=""
	  list=list.aeopAEProductDisplayDTOList
	  for(let i=0;i<list.length;i++)
	  {
		  		
		productPrice=list[i].productMinPrice
		if(productPrice!=list[i].productMaxPrice)
		{productPrice=productPrice+" - "+list[i].productMaxPrice}
		htmlstr+="<tr align=\"center\">\
		<td align=\"left\" nowrap=\"nowrap\">\
		<input type=\"checkbox\" value=\""+list[i].productId+"\" name=\"pre_id\" class=\"checkbox\" id=\"check-"+list[i].productId+"\"><label for=\"check-"+list[i].productId+"\">"+list[i].productId+"</label></td>\
		<td align=\"left\">\
		"+imageURLs(list[i].imageURLs)+list[i].subject+"\
		</td>\
		<td nowrap=\"nowrap\">"+productPrice+"</td>\
		<td>"+gmtCreate(list[i].gmtModified)+"</td>\
		<td>"+wsDisplay(list[i].wsDisplay)+"</td>\
		<td>"+gmtCreate(list[i].wsOfflineDate)+"</td>\
		<td><a href='"+obj.href+list[i].productId+".html'>修改</a></td>\
		</tr>"
	  }
	  htmlstr+="<tr><td colspan=\"7\">"+pageshow(productCount,obj.size,obj.page,8)+"</td></tr>"//显示分页
	  $("#findAeProductById").html(htmlstr)
	}
  }});
}
function imageURLs(obj2){
  let str="<table><tr>"
  obj2=obj2.split(";")
  for(let i=0;i<obj.length;i++)
  {			
	  str+="<td><a target=\"_blank\" href=\""+obj2[i]+"\"><img style=\"margin:2px;padding:1px;border:1px solid #ccc\" src=\""+obj2[i]+"\" title=\"点击预览\" border=\"0\" width=\"40\" height=\"40\" align=\"left\"/></a></td>"
  }
  return str+"</tr></table>"
}
function pagelist(p){//内容
  $("#findAeProductById").html('<tr align="center"><td colspan="10"><img src="'+obj.path+'admin/img/loading.gif" align="absmiddle"/><td></tr>')
  obj.page=p;product()
}
function FunProductStatusType(name,event){//商品业务状态
	obj.productStatusType=name
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
function selectBtn(){subject=$("#searchword").val();pagelist(1)}

*/