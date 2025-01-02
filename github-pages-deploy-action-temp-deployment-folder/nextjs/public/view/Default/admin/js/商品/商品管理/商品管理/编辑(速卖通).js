'use strict';
$(function(){
  aeopAeProductSKUsFun()
  aeopAeProductPropertysFun()
	picFun()
})
function aeopAeProductPropertysFun()
{
  let aeopAeProductPropertys=eval($("#aeopAeProductPropertys").html()),str="<table class=\"tb2\"><tr><th>属性名</th><th>属性值</th></tr>"
	for(let i=0;i<aeopAeProductPropertys.length;i++)
	{
		str+="<tr><td>"+aeopAeProductPropertys[i].attrName+"</td><td>"+aeopAeProductPropertys[i].attrValue+"</td></tr>"
	}
	$("#aeopAeProductPropertys").html(str+"</table>")
}
function picFun()
{
  let picArr=$("#pic").html().split(";"),str=""
	for(let i=0;i<picArr.length;i++)
	{
		str+="<img src='"+picArr[i]+"' width=\"100\" style=\"margin:2px;padding:1px;border:1px solid #ccc\">"
	}
	$("#pic").html(str)
}
function aeopAeProductSKUsFun()
{
  let aeopAeProductSKUs=eval($("#aeopAeProductSKUs").html()),str="<table class=\"tb2\"><tr><th>库存</th><th>价格</th><th>SKU属性</th></tr>"
	for(let i=0;i<aeopAeProductSKUs.length;i++)
	{
		
		str+="<tr><td>"+aeopAeProductSKUs[i].ipmSkuStock+"</td><td>"+aeopAeProductSKUs[i].skuPrice+"</td><td><pre>"+JSON.stringify(aeopAeProductSKUs[i].aeopSKUProperty,null,2)+"</pre></td></tr>"
	}
	$("#aeopAeProductSKUs").html(str+"</table>")

}