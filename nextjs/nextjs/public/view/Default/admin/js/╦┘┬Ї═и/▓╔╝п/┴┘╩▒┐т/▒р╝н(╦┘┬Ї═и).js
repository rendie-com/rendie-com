'use strict';
$(function(){
  $("#checkSubmitEdit").click(function(){
	  let type,des,html
	  let IdValArr=["name","keys","keys1","keys2","pic"]
	  let IdNumArr=["price","length","width","height","weight","freightTemplateId","promiseTemplateId","deliveryTime"]
	  let IdTFArr=["isImageDynamic","isImageWatermark"]
	  for(let i=0;i<IdValArr.length;i++){IdValArr[i]=":"+IdValArr[i]+"='"+($("#"+IdValArr[i]).val()).replace(/'/ig,"''")+"'";}
	  for(let i=0;i<IdNumArr.length;i++){IdNumArr[i]=$("#"+IdNumArr[i]).val()===""?":"+IdNumArr[i]+"=0":":"+IdNumArr[i]+"="+$("#"+IdNumArr[i]).val();}
	  type=$("#type").attr("val")
	  let oEditor = FCKeditorAPI.GetInstance("des");des=":des='"+(oEditor.GetXHTML(true)).replace(/'/ig,"''")+"'"
	  html="update @.tempproduct set "+IdValArr.join(",")+","+IdNumArr.join(",")+",:type="+type+","+des+" where @.from='aliexpress' and @.fromid='<.arr(4)/>'"
	  html='{r:area db="sqlite.aliexpress">'+html+'{/r:area}修改成功'
	  html=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	  alert(html)
	  window.location.reload();
  })
  $(".makeHtmlTab li").click(function(){
	  $(".makeHtmlTab li").removeAttr('class');$(this).attr("class","hover")
	  let id=$(this).attr("val");$("[id$=tbody]").hide();$("#"+id).show()
  })
  $("#buttontype").click(function(){$("#producttype").show();})
  //aeopAeProductPropertys(<:aeopAeProductPropertys/>)
  //$("#aeopAeProductSKUs").html(aeopAeProductSKUs(<:aeopAeProductSKUs/>))//价格属性
  //selectedType(<:aeopAeProductPropertys/>,<:aeopAeProductSKUs/>)
});
function selecttype(val,id){
  let str='{r:type where=" where @.from=\'aliexpress\' and @.upid=\''+val+'\'" size=100><option value=\'[typeli'+'st:fromid]\'>[typeli'+'st:name]</option>{/r:type}'
  str=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
  $("#"+id).html(str)
  if(str){$("#"+id).show()}
}
	function selectedType(obj,obj2)
	{
		//document.write(JSON.stringify(obj))
		let typerel,skuArr
		if(obj){
			for(let i=0;i<obj.length;i++)
			{
				if(obj[i].attrValue&&obj[i].attrNameId){//这样肯定是input
					$("#input"+obj[i].attrNameId).val(obj[i].attrValue)
				}
				else if(obj[i].attrValueId&&obj[i].attrNameId)//这样有“list_box”和“check_box”,或未知
				{
					typerel=$("#type"+obj[i].attrNameId).attr("rel")
					if(typerel=="check_box"){$("#check-"+obj[i].attrValueId).attr("checked",'checked');}
					else if(typerel=="list_box"){$("#list_box"+obj[i].attrNameId).val(obj[i].attrValueId);}
				}
			}
		}
		for(let i=0;i<obj2.length;i++)
		{
			skuArr=obj2[i].aeopSKUProperty
			for(let j=0;j<skuArr.length;j++)
			{
				typerel=$("#type"+skuArr[j].skuPropertyId).attr("rel")
				if(typerel){//有未知的所以用了if
					$("#check-"+skuArr[j].propertyValueId).attr("checked",'checked');
					if(skuArr[j].skuImage)
					{
						$("[name='skuPropertyId"+skuArr[j].propertyValueId+"']").html($("[for='check-"+skuArr[j].propertyValueId+"']").html()+"<img src='"+skuArr[j].skuImage+"' height=26/><input size=50 value=\""+skuArr[j].skuImage+"\" type=\"text\">")
					}
					else
					{
						$("[name='skuPropertyId"+skuArr[j].propertyValueId+"']").html($("[for='check-"+skuArr[j].propertyValueId+"']").html())
					}
				}
			}
		}
		for(let j=0;j<skuArr.length;j++)
		{
			$("[name='skuPropertyId"+j+"']").html($("#type"+skuArr[j].skuPropertyId).attr("name"))
		}
	} 
	function aeopAeProductSKUs(obj){//价格属性
		//document.write(JSON.stringify(obj))
		let checked,obj2,SKUstr,SKU2str,str=""
		for(let i=0;i<obj.length;i++)
		{
			obj2=obj[i].aeopSKUProperty
			if(obj2)//判断是否有多个价格（以防出错）
			{
				SKUstr=""
				for(let j=0;j<obj2.length;j++)
				{
					SKUstr+='<td name="skuPropertyId'+obj2[j].propertyValueId+'"></td>'
				}
				if(obj[i].skuStock){checked='checked="checked"'}else{checked=''}
				str+='<tr align=\"center\">'+SKUstr+'\
						<td>US $<input type="text" value="'+obj[i].skuPrice+'" size="15">/件</td>\
						<td>US $'+(obj[i].skuPrice-(obj[i].skuPrice*0.05)).toFixed(2)+'</td>\
						<td><input type="text" value="'+obj[i].ipmSkuStock+'" size="15"><input type="checkbox" value="true" '+checked+' id="skuStock-'+i+'"/><label for="skuStock-'+i+'">有货</label></td>\
						<td><input type="text" value="'+obj[i].skuCode+'" size="15"></td>\
					</tr>'
			}
		}
		SKU2str=""
		for(let j=0;j<obj2.length;j++)
		{
			SKU2str+='<td name="skuPropertyId'+j+'"></td>'
		}
		str="<table>\
					<tr align=\"center\">\
						"+SKU2str+"\
						<td>零售价</td>\
						<td>实际收入</td>\
						<td>库存</td>\
						<td>商品编码</td>\
					</tr>\
					"+str+"\
				</table>"
		return str
	}
	function aeopAeProductPropertys(Propertys){
		let str2=""
		for(let i=0;i<Propertys.length;i++){
			if(!Propertys[i].attrNameId)
			{
				str2+='<li><input value="'+Propertys[i].attrName+'" type="text" size="40">:<input value="'+Propertys[i].attrValue+'" type="text" size="80"><a href="javascript:" onclick="$(this).parent().remove();">删除</a><hr></li>'
			}
		}
		$("#aeopAeProductPropertys").html(str2)
	}
