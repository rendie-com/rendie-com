'use strict';
function pagelist(p)
{
  let urlPath,Param,URL
  urlPath="param2/1/aliexpress.open/api.findAeProductById/"+obj.APPKEY
  Param="productId="+obj.arr4+"&access_token="+obj.token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({
		type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
  eval("let obj2="+txt)
  tbody_1(obj2)
  tbody_2(obj2)
  tbody_3(obj2)
  /*tbody_4(obj)
  selectedType(obj.aeopAeProductPropertys,obj.aeopAeProductSKUs)*/
  }});
}
function tbody_3(obj2){
  let html='\
  <tr>\
  <td align="right">商品主图图片类型：</td>\
  <td><input id="isImageDynamic" type="text" size="50" value="'+obj2.isImageDynamic+'">多动态图填true,静态单图填false。</td>\
  </tr>\
  <tr>\
  <td align="right">图片是否加水印的标识：</td>\
  <td><input id="isImageWatermark" type="text" size="50" value="'+obj2.isImageWatermark+'">图片是否加水印的标识。true为打水印,false不打水印.</td>\
  </tr>\
  <tr>\
  <td align="right">图片URL：</td>\
  <td><textarea cols="90" rows="10" id="imageURLs">'+obj2.imageURLs+'</textarea><br/>图片URL.静态单图主图个数为1,动态多图主图个数为2-6.可从图片接口uploadTempImage上传，也可以从图片银行引入. 多个图片url用';'分隔符连接。</td>\
  </tr>'
  $("#3_tbody").html(html)
}
function tbody_2(obj2){
  let detail=obj2.detail
  detail= detail.replace(/</ig, "&lt;")
  detail = detail.replace(/>/ig, "&gt;")
  detail = detail.replace(/\"/ig, "&quot;")
  let html='\
  <tr>\
  <td colspan="2">\
  <input type="hidden" id="detail" value="'+detail+'" style="display:none" />\
  <input type="hidden" id="detail___Config" value="" style="display:none" />\
  <iframe id="detail___Frame" src="/template/Default/admin/fckeditor/editor/fckeditor.htm?InstanceName=detail&amp;Toolbar=rendie" width="99%" height="500" frameborder="0" scrolling="no"></iframe>\
  </td>\
  </tr>\
  '
  $("#2_tbody").html(html)
}
function tbody_1(obj2){
  let html='\
  <tr>\
	<td align="right">商品标题：</td>\
	<td><input id="subject" type="text" size="100" value="'+obj2.subject+'">长度在1-128之间英文。</td>\
  </tr>\
  <tr>\
  <td align="right">运费模板：</td>\
  <td>'+obj2.freightTemplateId+'</td>\
  </tr>\
  <tr>\
  <td align="right">服务模板：</td>\
  <td>'+obj2.promiseTemplateId+'</td>\
  </tr>\
  <tr>\
  <td align="right">备货期：</td>\
  <td><input id="deliveryTime" type="text" size="10" value="'+obj2.deliveryTime+'">取值范围:1-60;单位:天。</td>\
  </tr>\
  <tr>\
  <td align="right">商品有效天数：</td>\
  <td><input id="wsValidNum" type="text" size="10" value="'+obj2.wsValidNum+'">取值范围:1-30,单位:天。</td>\
  </tr>\
  <tr>\
  <td align="right">商品单位：</td>\
  <td><select id="productUnit">'+productUnit(obj2.productUnit)+'</select></td>\
  </tr>\
  <tr>\
  <td align="right">商品毛重：</td>\
  <td><input id="grossWeight" type="text" size="10" value="'+obj2.grossWeight+'">取值范围:0.001-70.000,保留三位小数,采用进位制,单位:公斤。</td>\
  </tr>\
  <tr>\
  <td align="right">是否自定义计重：</td>\
  <td>\
  <input id="isPackSell" type="text" size="10" value="'+obj2.isPackSell+'">true为自定义计重,false反之.<hr>\
  <input id="baseUnit" type="text" size="10" value="'+obj2.baseUnit+'">isPackSell为true时,此项必填。购买几件以内不增加运费。取值范围1-1000<hr>\
  <input id="addUnit" type="text" size="10" value="'+obj2.addUnit+'">isPackSell为true时,此项必填。 每增加件数.取值范围1-1000。<hr>\
  <input id="addWeight" type="text" size="10" value="'+obj2.addWeight+'">isPackSell为true时,此项必填。 每增加件数.取值范围1-1000。\
  </td>\
  </tr>\
  <tr>\
  <td align="right">商品包装长度：</td>\
  <td><input id="packageLength" type="text" size="10" value="'+obj2.packageLength+'">取值范围:1-270,单位:厘米。产品包装尺寸的最大值+2×（第二大值+第三大值）不能超过419厘米。</td>\
  </tr>\
  <tr>\
  <td align="right">商品包装宽度：</td>\
  <td><input id="packageWidth" type="text" size="10" value="'+obj2.packageWidth+'">取值范围:1-270,单位:厘米。</td>\
  </tr>\
  <tr>\
  <td align="right">商品包装高度：</td>\
  <td><input id="packageHeight" type="text" size="10" value="'+obj2.packageHeight+'">取值范围:1-270,单位:厘米。</td>\
  </tr>\
  <tr>\
  <td align="right">打包销售：</td>\
  <td><input id="packageType" type="text" size="10" value="'+obj2.packageType+'">打包销售: true 非打包销售:false</td>\
  </tr>\
  <tr>\
  <td align="right">每包件数：</td>\
  <td><input id="lotNum" type="text" size="10" value="'+obj2.lotNum+'">每包件数。 打包销售情况，lotNum>1,非打包销售情况,lotNum=1</td>\
  </tr>\
  <tr>\
  <td align="right">商品一口价：</td>\
  <td><input id="productPrice" type="text" size="10" value="'+obj2.productPrice+'">取值范围:0-100000,保留两位小数;单位:美元。如:200.07，表示:200美元7分。需要在正确的价格区间内。</td>\
  </tr>\
  <tr>\
  <td align="right" nowrap="nowrap">批发最小数量：</td>\
  <td><input id="bulkOrder" type="text" size="10" value="'+obj2.bulkOrder+'">取值范围2-100000。批发最小数量和批发折扣需同时有值或无值。</td>\
  </tr>\
  <tr>\
  <td align="right">批发折扣：</td>\
  <td><input id="bulkDiscount" type="text" size="10" value="'+obj2.bulkDiscount+'">扩大100倍，存整数。取值范围:1-99。注意：这是折扣，不是打折率。 如,打68折,则存32。批发最小数量和批发折扣需同时有值或无值。</td>\
  </tr>\
  <tr>\
  <td align="right">发布来源：</td>\
  <td><input id="src" type="text" size="10" value="'+obj2.src+'">指此商品发布的来源，用于区分后台商品发布来源。调用此接口时，需将原数据值传回，请不要进行修改。</td>\
  </tr>\
  <tr>\
  <td align="right">商品分组：</td>\
  <td id="getProductGroupList">'+obj2.groupId+'</td>\
  </tr>\
'
/*
  <tr>\
  <td align="right">运费模板：</td>\
  <td><select id="freightTemplateId">'+listFreightTemplate(obj2.freightTemplateId)+'</select></td>\
  </tr>\
  <tr>\
  <td align="right">服务模板：</td>\
  <td><select id="promiseTemplateId">'+queryPromiseTemplateById(obj2.promiseTemplateId)+'</select></td>\
  </tr>\
  <tr>\
  <td align="right">商品分组：</td>\
  <td id="getProductGroupList">'+api_getProductGroupList(obj2.groupId)+'</td>\
  </tr>\
*/
  $("#1_tbody").html(html)
}
function tbody_4(obj){
  let html='\
  <tr>\
	<td align="right">商品分类：</td>\
	<td>'+api_getPostCategoryById(obj.categoryId)+'</td>\
	</tr>\
	<tr>\
	<td align="right">系统属性：</td>\
	<td>'+dh_category_get_20(obj.categoryId)+'</td>\
	</tr>\
	<tr>\
	<td align="right">价格属性：</td>\
	<td id="aeopAeProductSKUs">'+aeopAeProductSKUs(obj.aeopAeProductSKUs)+'</td>\
	</tr>\
	<tr>\
	<td align="right" nowrap="nowrap">自定义属性：</td>\
	<td>\
		<ul>'+aeopAeProductPropertys(obj.aeopAeProductPropertys)+'</ul>\
		<input type="button" class="pn" id="aeopAeProductPropertysAdd" value="添加自定义属性">\
	</td>\
  </tr>\
  '
  $("#4_tbody").html(html)
}
function api_getPostCategoryById(name){
  let urlPath,Param,URL,txt
  urlPath="param2/1/aliexpress.open/api.getPostCategoryById/"+aliexpress_APPKEY
  Param="cateId="+name+"&access_token="+access_token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
  txt=$.ajax({type:"POST",url:"/inc/ajax.aspx/httpRequestPostParam.html?"+Math.random(),data:{URL:URL,urlPath:urlPath,Param:Param,APPSECRET:aliexpress_APPSECRET},async:false}).responseText;
  eval("let aeopPostCategoryList="+txt)
  return '<input id="categoryId" type="text" size="20" value="'+aeopPostCategoryList.aeopPostCategoryList[0].id+'"> ('+aeopPostCategoryList.aeopPostCategoryList[0].names.zh+")"
}
function api_getProductGroupList(name){
  let urlPath,Param,URL,txt
  urlPath="param2/1/aliexpress.open/api.getProductGroupList/"+aliexpress_APPKEY
  Param="access_token="+access_token
  URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
  txt=$.ajax({type:"POST",url:"/inc/ajax.aspx/httpRequestPostParam.html?"+Math.random(),data:{URL:URL,urlPath:urlPath,Param:Param,APPSECRET:aliexpress_APPSECRET},async:false}).responseText;
  eval("let obj="+txt)
  return childGroupList(obj.target,0,name)
}
	function childGroupList(obj,c,name)
	{
		let str='',checked=""
		for(let i=0;i<obj.length;i++){
			if(obj[i].childGroup)
			{
				str+='<div style="padding-left:'+c+'0px;border-bottom:1px solid #DEEFFA;">'+obj[i].groupName+'</div>'
				str+=childGroupList(obj[i].childGroup,c+1,name)
			}
			else
			{
				if(name==obj[i].groupId){checked='checked="checked"'}else{checked=''}
				str+='<div style="padding-left:'+c+'0px;border-bottom:1px solid #DEEFFA;"><input type="checkbox" value="'+obj[i].groupId+'" name="groupId" class="checkbox" '+checked+' id="check-'+obj[i].groupId+'"/><label for="check-'+obj[i].groupId+'">'+obj[i].groupName+'</label></div>'
			}
		}
		return str
	}
	function listFreightTemplate(name){
		let urlPath,Param,URL,txt
		urlPath="param2/1/aliexpress.open/api.listFreightTemplate/"+aliexpress_APPKEY
		Param="access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let a="+txt)
		a=a.aeopFreightTemplateDTOList
		let str='<option value="0">请选择运费模板</option>'
		for(let i=0;i<a.length;i++)
		{
			if(a[i].templateId==name)
			{
				str+='<option value="'+a[i].templateId+'" selected="selected">'+a[i].templateName+'</option>'
			}
			else
			{
				str+='<option value="'+a[i].templateId+'">'+a[i].templateName+'</option>'
			}
		}
		return str
	}
	function queryPromiseTemplateById(name){
		let urlPath,Param,URL,txt
		urlPath="param2/1/aliexpress.open/api.queryPromiseTemplateById/"+aliexpress_APPKEY
		Param="templateId=-1&access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let a="+txt)
		a=a.templateList
		let str='<option value="0">请选择服务模板</option>'
		for(let i=0;i<a.length;i++)
		{
			if(a[i].id==name)
			{
				str+='<option value="'+a[i].id+'" selected="selected">'+a[i].name+'</option>'
			}
			else
			{
				str+='<option value="'+a[i].id+'">'+a[i].name+'</option>'
			}
		}
		return str
	}
	function aeopAeProductPropertys(obj){
		let str=""
		if(obj)
		{
			for(let i=0;i<obj.length;i++)
			{
				if(obj[i].attrName){
				str+='<li><input value="'+obj[i].attrName+'" type="text" size="40">:<input value="'+obj[i].attrValue+'" type="text" size="80"><a href="javascript:" onClick="$(this).parent().remove();">删除</a><hr></li>'
				}
			}
		}
		return str
	}
	function getlist(ValueId,ID){
		let check=false,str="",checkid,labelFor
		check=$("input[type='checkbox'][name='"+ID+"'][value='"+ValueId+"']:checked").val()//当前是否已被选中
		eval("let obj="+OBJaeopAeProductSKUs)
		if(check)//选中一个就要
		{
			str=JSON.stringify(obj)
			str='[{"skuPrice":"0.00","skuStock":true,"aeopSKUProperty":[{"propertyValueId":'+ValueId+',"skuPropertyId":'+ID+'}],"skuCode":""},'+str.substr(1)
			
		}
		else
		{
			for(let i=0;i<obj.length;i++)//将没选中的删除
			{
				if(ValueId==obj[i].aeopSKUProperty[0].propertyValueId){delete obj[i];break;break;}
			}
			str=(JSON.stringify(obj)).replace("null,","")
			str=str.replace("[null]","[]")
		}
		OBJaeopAeProductSKUs=str
		eval("obj="+OBJaeopAeProductSKUs)
		$("#aeopAeProductSKUs").html(aeopAeProductSKUs(obj))
		$("#skuPropertyId").html($("td[id"+ID+"]").attr("id"+ID))
		$("input[type='checkbox'][name='"+ID+"']:checked").each(function()
		{
			checkid=$(this).val()
			labelFor=$("label[for='check-"+checkid+"']").html()
		 	$("#skuPropertyId"+checkid).html(labelFor)
	   });
		
	}
	function SubmitAeopAeProductPropertys()//保存
	{
		let i=0,attrName="",attrValue="",str=""
		$("#aeopAeProductPropertys li input").each(function()
		{
			if(i%2==0){attrName=$(this).val();}else{
				attrValue=$(this).val()
				if(attrValue!=""){str+=',{"attrName":"'+attrName+'","attrValue":"'+$(this).val()+'"}';attrName="";}
			}
			i++
		});
		$("#getAttributesResultByCateId table tr td select").each(function()
		{
			attrValue=$(this).val();//如果没填写则跳过
			if(attrValue==0){str+=',{"attrValueId":'+attrValue+',"attrNameId":"'+$(this).attr("id")+'"}';}
			
		});
		$("#getAttributesResultByCateId table tbody tr td input[type='text']").each(function()
		{
			attrValue=$(this).val();//如果没填写则跳过
			if(attrValue!=""){str+=',{"attrValue":"'+attrValue+'","attrNameId":"'+$(this).attr("id")+'"}';}
		});
		str='['+str.substr(1)+']'
		return str
	}
	function SubmitAeopAeProductSKUs(){
		let str="",i=0,skuPrice="",val1,skuStock
		$("#aeopAeProductSKUs table tbody tr td input[type='text']").each(function()
		{
		
			if(i%2==0){skuPrice=$(this).val();}
			else
			{
				val1=$(this).attr("val1")
				skuStock=$("#PropertyId-"+val1+":checked").val();if(!skuStock){skuStock=false}
				str+=',{"skuPrice":"'+skuPrice+'","skuStock":'+skuStock+',"aeopSKUProperty":[{"propertyValueId":'+val1+',"skuPropertyId":'+$(this).attr("val2")+'}],"skuCode":"'+$(this).val()+'"}'
			}
			i++
		});
		return '['+str.substr(1)+']'
	}
	$(function(){
		$(".makeHtmlTab li").click(function(){
			$(".makeHtmlTab li").removeAttr('class')
			$(this).attr("class","hover")
			let id=$(this).attr("val")
			$("[id$=tbody]").hide()
			$("#"+id).show()
		})
		$("#aeopAeProductPropertysAdd").click(function(){
			$("#aeopAeProductPropertys").append('<li><input type="text" size="40">:<input type="text" size="80"><a href="javascript:" onClick="$(this).parent().remove();">删除</a><hr></li>');
		})
		$("#api_editAeProduct").click(function(){
			let urlPath,Param,URL,txt
			let detail,aeopAeProductSKUs,deliveryTime,categoryId,subject,keyword,productMoreKeywords1,productMoreKeywords2,groupId,promiseTemplateId,productPrice,freightTemplateId,isImageDynamic,imageURLs,isImageWatermark,productUnit,packageType,lotNum,packageLength,packageWidth,packageHeight,grossWeight,isPackSell,baseUnit,addUnit,addWeight,wsValidNum,src,aeopAeProductPropertys,bulkOrder,bulkDiscount
			let oEditor = FCKeditorAPI.GetInstance("detail");
			detail=escape(oEditor.GetXHTML(true))
			aeopAeProductSKUs=SubmitAeopAeProductSKUs()
			deliveryTime=$("#deliveryTime").val()
			categoryId=$("#categoryId").val()
			subject=$("#subject").val()
			keyword=$("#keyword").val()
			productMoreKeywords1=$("#productMoreKeywords1").val()
			productMoreKeywords2=$("#productMoreKeywords2").val()
			groupId="";$('input[name="groupId"]:checked').each(function(){if(groupId==""){groupId=$(this).val();}else{groupId=groupId+";"+$(this).val();}});
			promiseTemplateId=$("#promiseTemplateId").val()
			productPrice=$("#productPrice").val()
			freightTemplateId=$("#freightTemplateId").val()
			isImageDynamic=$("#isImageDynamic").val()
			imageURLs=$("#imageURLs").val()
			isImageWatermark=$("#isImageWatermark").val()
			productUnit=$("#productUnit").val()
			packageType=$("#packageType").val()
			lotNum=$("#lotNum").val()
			packageLength=$("#packageLength").val()
			packageWidth=$("#packageWidth").val()
			packageHeight=$("#packageHeight").val()
			grossWeight=$("#grossWeight").val()
			isPackSell=$("#isPackSell").val()
			baseUnit=$("#baseUnit").val()
			addUnit=$("#addUnit").val()
			addWeight=$("#addWeight").val()
			wsValidNum=$("#wsValidNum").val()
			src=$("#src").val()
			aeopAeProductPropertys=SubmitAeopAeProductPropertys()
			bulkOrder=$("#bulkOrder").val()
			bulkDiscount=$("#bulkDiscount").val()
			urlPath="param2/1/aliexpress.open/api.editAeProduct/"+aliexpress_APPKEY
			Param="productId=<.arr(4)/>&detail="+detail+"&deliveryTime="+deliveryTime+"&productMoreKeywords1="+productMoreKeywords1+"&productMoreKeywords2="+productMoreKeywords2+"&keyword="+keyword+"&productPrice="+productPrice+"&freightTemplateId="+freightTemplateId+"&imageURLs="+imageURLs+"&isImageDynamic="+isImageDynamic+"&productUnit="+productUnit+"&packageType="+packageType+"&packageLength="+packageLength+"&packageWidth="+packageWidth+"&packageHeight="+packageHeight+"&grossWeight="+grossWeight+"&src="+src+"&subject="+subject+"&categoryId="+categoryId+"&wsValidNum="+wsValidNum+"&lotNum="+lotNum+"&aeopAeProductPropertys="+aeopAeProductPropertys+"&aeopAeProductSKUs="+aeopAeProductSKUs+"&bulkOrder="+bulkOrder+"&bulkDiscount="+bulkDiscount+"&access_token="+access_token
			URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
			txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
			alert(txt);location.reload();
		})
	})
