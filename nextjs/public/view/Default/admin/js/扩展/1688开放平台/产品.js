'use strict';
function pagelist(p){alibaba_product_getList(p);
}
function alibaba_product_getList(p){
  let urlPath,Param,URL
  urlPath="param2/1/com.alibaba.product/alibaba.product.getList/"+obj.APPKEY
  Param="pageNo="+p+"&webSite=1688&access_token="+obj.token
  URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") }, success: function (txt) { alibaba_product_getList001(txt); } });
}
function alibaba_product_getList001(txt)
{
	//document.write(txt)
	eval("let obj2="+txt);
	let list=obj2.productInfos,html='<ul class="Tul center"><li class="w150">商品ID</li><li class="w400 left" title="商品类型:productType\n语种:language\n是否图片私密:pictureAuth\n商品销售信息:saleInfo\n商品物流信息:shippingInfo\n商品属性和属性值:attributes\n商品扩展信息:extendInfos\n商品主图:image">商品标题</li><li class="w100">类目ID</li><li class="w100">商品状态</li><li class="w100">信息有效期</li><li class="w100">业务类型</li><li class="w150">创建时间</li><li class="w150">最后修改时间</li><li class="w150">审核通过时间</li><li class="w200">过期时间</li></ul>'
	for(let i=0;i<list.length;i++)
	{
	  html+='<ul class="Tul center lh60"><li class="w150"><a href="javasrcript:;" onclick="alibaba_product_get('+list[i].productID+');">'+list[i].productID+'</a></li><li class="w400 left" title="商品类型:'+list[i].productType+'\n语种:'+list[i].language+'\n是否图片私密:'+list[i].pictureAuth+'\n商品销售信息:'+list[i].saleInfo+'\n商品物流信息:'+list[i].shippingInfo+'\n商品属性和属性值:'+list[i].attributes+'">'+getList001_image(list[i].image)+'<div style="margin-left:60px;line-height: 25px;"><a href="https://detail.1688.com/offer/'+list[i].productID+'.html" target="_blank" >'+list[i].subject+'</a></div></li><li class="w100">'+list[i].categoryID+'</li><li class="w100">'+list[i].status+'</li><li class="w100">'+list[i].periodOfValidity+'</li><li class="w100">'+list[i].bizType+'</li><li class="w150">'+list[i].createTime+'</li><li class="w150">'+list[i].lastUpdateTime+'</li><li class="w150">'+list[i].approvedTime+'</li><li class="w200">'+list[i].expireTime+'</li></ul>';
	}
  $(".table").html(html);
}
function getList001_image(obj2)
{
	if(obj2)
	{return '<a target="_blank" href="https://cbu01.alicdn.com/'+obj2.images[0]+'" style="position: absolute;"><img style="margin:2px;padding:1px;border:1px solid #ccc;" src="https://cbu01.alicdn.com/'+obj2.images[0]+'" title="点击预览" border="0" width="50" height="50" align="left"></a>'}
	else
	{return '<img style="margin:2px;padding:1px;border:1px solid #ccc;position: absolute;" src="https://cbu01.alicdn.com/cms/upload/2016/108/049/2940801_1647165831.png" border="0" width="50" height="50">'}
	
}
function alibaba_product_get(id)
{
  let urlPath,Param,URL
  urlPath="param2/1/com.alibaba.product/alibaba.product.get/"+obj.APPKEY
  Param="productID="+id+"&webSite=1688&access_token="+obj.token
  URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") }, success: function (txt) { alibaba_product_get001(txt); } });
}
function alibaba_product_get001(txt)
{
	//document.write(txt)
	eval("let obj2="+txt);
	let html='\
	<ul class="Tul"><li class="w200 right">商品详细信息：<br/>（<a href="https://open.1688.com/api/message.htm?spm=a260s.8207937.0.0.r5KasX&n=alibaba.product.ProductInfo&ns=com.alibaba.product&cat=product_new&t=2&a=alibaba.product.get&v=1" target="_blank">说明</a>）</li><li>\
		<ul class="Tul"><li class="w250 right">商品ID：</li><li>'+obj2.productInfo.productID+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品类型：</li><li>'+obj2.productInfo.productType+'</li></ul>\
		<ul class="Tul"><li class="w250 right">类目ID：</li><li>'+obj2.productInfo.categoryID+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品属性和属性值：</li><li>'+productInfo_attributes(obj2.productInfo.attributes)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品状态：</li><li>'+obj2.productInfo.status+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品标题：</li><li>'+obj2.productInfo.subject+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品详情描述：</li><li>'+obj2.productInfo.description+'</li></ul>\
		<ul class="Tul"><li class="w250 right">语种：</li><li>'+obj2.productInfo.language+'</li></ul>\
		<ul class="Tul"><li class="w250 right">分组ID：</li><li>'+productInfo_groupID(obj2.productInfo.groupID)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">信息有效期：</li><li>'+obj2.productInfo.periodOfValidity+'</li></ul>\
		<ul class="Tul"><li class="w250 right">业务类型：</li><li>'+obj2.productInfo.bizType+'</li></ul>\
		<ul class="Tul"><li class="w250 right">是否图片私密：</li><li>'+obj2.productInfo.pictureAuth+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品主图：</li><li>'+productInfo_image(obj2.productInfo.image)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">sku信息：</li><li>'+productInfo_skuInfos(obj2.productInfo.skuInfos)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品销售信息：</li><li>'+productInfo_skuInfos(obj2.productInfo.saleInfo)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品物流信息：</li><li>'+productInfo_skuInfos(obj2.productInfo.shippingInfo)+'</li></ul>\
		<ul class="Tul"><li class="w250 right">商品扩展信息：</li><li>'+obj2.productInfo.extendInfos+'</li></ul>\
		<ul class="Tul"><li class="w250 right">供应商UserId：</li><li>'+obj2.productInfo.userId+'</li></ul>\
	</li></ul>\
	<ul class="Tul"><li class="w200 right">产品业务的支持信息：<br/>（<a href="https://open.1688.com/api/message.htm?spm=a260s.8207937.0.0.r5KasX&n=alibaba.product.ProductBizGroupInfo&ns=com.alibaba.product&cat=product_new&t=2&a=alibaba.product.get&v=1" target="_blank">说明</a>）</li><li>'+productInfo_skuInfos(obj2.bizGroupInfos)+'</li></ul>\
	<ul class="Tul"><li class="w200 right">创建时间：</li><li>'+obj2.createTime+'</li></ul>\
	<ul class="Tul"><li class="w200 right">最后修改时间：</li><li>'+obj2.lastUpdateTime+'</li></ul>\
	<ul class="Tul"><li class="w200 right">审核通过时间：</li><li>'+obj2.approvedTime+'</li></ul>\
	<ul class="Tul"><li class="w200 right">过期时间：</li><li>'+obj2.expireTime+'</li></ul>\
	'
  $(".table").html(html);
}
function productInfo_groupID(obj2)
{
  let html=""
	if(obj2)
	{
	  html="<pre>"+JSON.stringify(obj2,null,2)+"</pre>"
	}
	else{html="未填写"}
	return html
}
function productInfo_skuInfos(obj2)
{
  let html=""
	if(obj2)
	{
	  html="<pre>"+JSON.stringify(obj2,null,2)+"</pre>"
	}
	else{html="未填写"}
	return html
}
function productInfo_attributes(obj2)
{
  let html='<ul class="Tul center"><li class="w100">属性ID</li><li class="w100">属性名称</li><li class="w100">属性值</li><li class="w100">是否自定义</li></ul>'
	for(let i=0;i<obj2.length;i++)
	{
	  html+='<ul class="Tul center"><li class="w100">'+obj2[i].attributeID+'</li><li class="w100">'+obj2[i].attributeName+'</li><li class="w100">'+obj2[i].value+'</li><li class="w100">'+obj2[i].isCustom+'</li></ul>'
	}
	return html
}
function productInfo_image(obj2)
{
  let html=''
	if(obj2)
	{
		for(let i=0;i<obj2.images.length;i++)
		{
			html+='<a target="_blank" href="https://cbu01.alicdn.com/'+obj2.images[i]+'"><img style="margin:2px;padding:1px;border:1px solid #ccc" src="https://cbu01.alicdn.com/'+obj2.images[i]+'" title="点击预览" border="0" width="50" height="50" align="left"></a>'
		}
	}
	return html
}