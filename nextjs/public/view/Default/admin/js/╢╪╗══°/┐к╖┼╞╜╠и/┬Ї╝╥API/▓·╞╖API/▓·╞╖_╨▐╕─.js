'use strict';
$(function(){
  $("#aeopAeProductPropertysAdd").click(function(){
	  $("#prodSpecSelfDefList").append('<li><input type="text" size="40">:<input type="text" size="80"><a href="javascript:" onClick="$(this).parent().remove();">删除</a><hr></li>');
  })
  $(".makeHtmlTab li").click(function(){
	  $(".makeHtmlTab li").removeAttr('class');
	  $(this).attr("class","hover");
	  let id=$(this).attr("val")
	  $("[id$=tbody]").hide()
	  $("#"+id).show()
  })
  $("#api_editAeProduct").click(function(){dh_item_update()})
  $("#api_addAeProduct").click(function(){dh_item_add()})
})
function pagelist(p){
	dh_item_get()//新版
	//dh_product_get()//旧版
}
function dh_item_get(){
  let URL="http://api.dhgate.com/dop/router?method=dh.item.get&v=2.0&timestamp="+(new Date).getTime()+"&itemCode="+obj.arr4+"&access_token=" +o.token
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<.WebClientPost("+URL+")/>")},success:function(txt){
	  let html
	  eval("let obj2="+txt);
	  html='<table>\
	  <tr><td align="right">产品售后模板id:</td><td id="afterSaleTemplateId">'+obj2.afterSaleTemplateId+'</td></tr>\
	  <tr><td align="right">发布类目id:</td><td id="catePubId">'+obj2.catePubId+'</td></tr>\
	  <tr><td align="right">过期时间:</td><td>'+obj2.expireDate+'</td></tr>\
	  <tr><td align="right" nowrap="nowrap">产品兼容属性列表:</td><td>'+JSON.stringify(obj2.itemAttrGroupList)+'</td></tr>\
	  <tr><td align="right">产品属性列表:</td><td id="itemAttrList"><pre>'+JSON.stringify(obj2.itemAttrList,null,2)+'</pre></td></tr>\
	  <tr><td align="right">产品基础信息:</td><td id="itemBase">'+JSON.stringify(obj2.itemBase)+'</td></tr>\
	  <tr><td align="right">产品itemCode:</td><td>'+obj2.itemCode+'</td></tr>\
	  <tr><td align="right">产品所属产品组id:</td><td>'+obj2.itemGroupId+'</td></tr>\
	  <tr><td align="right">产品图片列表:</td><td id="itemImgList">'+JSON.stringify(obj2.itemImgList)+'</td></tr>\
	  <tr><td align="right">产品备货信息:</td><td>'+JSON.stringify(obj2.itemInventory)+'</td></tr>\
	  <tr><td align="right">产品包装信息:</td><td>'+JSON.stringify(obj2.itemPackage)+'</td></tr>\
	  <tr><td align="right">产品销售属性设置:</td><td>'+JSON.stringify(obj2.itemSaleSetting)+'</td></tr>\
	  <tr><td align="right">产品SKU列表:</td><td id="itemSkuList">'+JSON.stringify(obj2.itemSkuList)+'</td></tr>\
	  <tr><td align="right">自定义规格列表:</td><td id="itemSpecSelfDefList">'+JSON.stringify(obj2.itemSpecSelfDefList)+'</td></tr>\
	  <tr><td align="right">产品折扣区间:</td><td>'+JSON.stringify(obj2.itemWholesaleRangeList)+'</td></tr>\
	  <tr><td align="right">产品最新修改时间:</td><td>'+obj2.operateDate+'</td></tr>\
	  <tr><td align="right">产品运费模板id:</td><td>'+obj2.shippingModelId+'</td></tr>\
	  <tr><td align="right">产品状态:</td><td>'+obj2.state+'</td></tr>\
	  <tr><td align="right">产品有效期:</td><td>'+obj2.vaildDay+'</td></tr>\
	  </table>'
	  $("#product").html(html)
  }});
}
function dh_product_get(){
	let URL="http://api.dhgate.com/dop/router?method=dh.product.get&v=1.1&timestamp="+(new Date).getTime()+"&itemcode="+obj.arr4+"&access_token=" +o.token
	$("#1_tbody").html('<tr align="center"><td colspan="10"><img src="'+obj.path+'admin/img/loading.gif" align="absmiddle"/><td></tr>')
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("{EFun(WebClientPost("+URL+"))}")},success:function(txt){
	  eval("let obj2="+txt);
	  obj2=obj2.product
	  Funtbody1(obj2)
	  Funtbody2()
	  Funtbody3(obj2)
	  Funtbody4(obj2)
	  FunprodAttrList(obj2.prodAttrList)//选中属性
	}});
}
function Funtbody4(obj){
	html='\
	<tr><td align="right" nowrap="nowrap">叶子类目编号：</td><td><input id="catePubId" value="'+obj.catePubId+'" type="text" size="20"></td></tr>\
<tr>\
		<td align="right">系统属性：</td>\
		<td id="prodAttrList">'+dh_category_get_20(obj.catePubId)+'</td>\
</tr>\
<tr>\
		<td align="right">价格属性：</td>\
		<td id="prodSkuList">'+FunprodSkuList(obj.prodSkuList)+'</td>\
</tr>\
<tr>\
		<td align="right" nowrap="nowrap">自定义属性：</td>\
		<td>\
		<ul id="prodSpecSelfDefList"></ul>\
		<input type="button" class="pn" id="aeopAeProductPropertysAdd" value="添加自定义属性">最多10条\
		</td>\
<tr>\
		<td align="right">折扣：</td>\
		<td id="prodWholesaleRangeList">'+JSON.stringify(obj.prodWholesaleRangeList)+'，即折扣值，如95折，为0.95</td>\
</tr>'
	$("#4_tbody").html(html)
}
function Funtbody3(obj){
	html='<tr>\
					<td align="right">产品首图md5：</td>\
					<td><input id="imageMd5" type="text" size="80" value="'+obj.imageMd5+'"></td>\
				</tr>\
				<tr>\
					<td align="right">产品首图URL：</td>\
					<td><input id="imageUrl" type="text" size="80" value="http://image.dhgate.com/'+obj.imageUrl+'/1.0x0.jpg"></td>\
				</tr>\
				<tr>\
					<td align="right">产品图片列表：</td>\
					<td><textarea cols="90" rows="10" id="prodAttachList">'+JSON.stringify(obj.prodAttachList)+'</textarea></td>\
				</tr>'
	$("#3_tbody").html(html)
}
function Funtbody1(obj2)
{
	//document.write(JSON.stringify(obj.prodBase))
	html='\
		<tr>\
			<td align="right">产品名称：</td>\
			<td><input id="productName" value="'+obj2.prodBase.productName+'" type="text" size="200"></td>\
		</tr>\
		<tr>\
			<td align="right">搜索关键字：</td>\
			<td>\
			<input id="keyWords" type="text" size="45" value="'+obj2.prodBase.keyWords+'">\
			<input id="keywords2" type="text" size="45" value="'+obj2.prodBase.keywords2+'">\
			<input id="keywords3" type="text" size="45" value="'+obj2.prodBase.keywords3+'">每个关键词最大25个字符\
			</td>\
		</tr>\
		<tr>\
			<td align="right">产品视频地址：</td>\
			<td><input id="videoUrl" type="text" size="150" value="'+obj2.prodBase.videoUrl+'">\
			<div colcor="fff">只允许输入YOUTUBE网站视频链接地址,例如:http://www.youtube.com/watch?v=*****</div></td>\
		</tr>\
		<tr>\
			<td align="right">产品简短描述：</td>\
			<td><textarea cols="108" rows="5" id="shortDesc">'+obj2.prodBase.shortDesc+'</textarea></td>\
		</tr>\
		<tr>\
			<td align="right">产品状态ID：</td>\
			<td>'+obj2.counterfeittypeid+'</td>\
		</tr>\
		<tr>\
			<td align="right">产品有效期：</td>\
			<td>'+js_date_time(obj2.expireDate)+'</td>\
		</tr>\
		<tr>\
			<td align="right">产品所属产品组id：</td>\
			<td><input id="productGroupId" type="text" size="50" value="'+obj2.productGroupId+'"></td>\
		</tr>\
		<tr>\
			<td align="right">产品运费模板id：</td>\
			<td><input id="shippingModelId" type="text" size="50" value="'+obj2.shippingModelId+'"></td>\
		</tr>\
		<tr>\
			<td align="right">卖家id：</td>\
			<td><input id="supplierId" type="text" size="50" value="'+obj2.supplierId+'"></td>\
		</tr>\
		<tr>\
			<td align="right">有效期,单位天：</td>\
			<td><input id="vaildday" type="text" size="10" value="'+obj2.vaildday+'"></td>\
		</tr>\
		<tr>\
			<td align="right">备货地：</td>\
			<td><input id="inventoryLocation" type="text" size="50" value="'+obj2.prodInventory.inventoryLocation+'"></td>\
		</tr>\
		<tr>\
			<td align="right">原备货量：</td>\
			<td><input id="inventoryOriQty" type="text" size="10" value="'+obj2.prodInventory.inventoryOriQty+'"></td>\
			</tr>\
		<tr>\
			<td align="right">备货数量：</td>\
			<td><input id="inventoryQty" type="text" size="10" value="'+obj2.prodInventory.inventoryQty+'"></td>\
		</tr>\
		<tr>\
			<td align="right">是否有备货：</td>\
			<td><input id="inventoryStatus" type="text" size="10" value="'+obj2.prodInventory.inventoryStatus+'">0否，1是</td>\
		</tr>\
		<tr>\
			<td align="right">备货期：</td>\
			<td><input id="leadingTime" type="text" size="20" value="'+obj2.prodSaleSetting.leadingTime+'"></td>\
		</tr>\
		<tr>\
			<td align="right">买家一次最大购买量：</td>\
			<td><input id="maxSaleQty" type="text" size="20" value="'+obj2.prodSaleSetting.maxSaleQty+'"></td>\
		</tr>\
		<tr>\
			<td align="right">最小起批量：</td>\
			<td><input id="minWholesaleQty" type="text" size="20" value="'+obj2.prodSaleSetting.minWholesaleQty+'"></td>\
		</tr>\
		<tr>\
			<td align="right">设置价格类型：</td>\
			<td><input id="priceConfigType" type="text" size="20" value="'+obj2.prodSaleSetting.priceConfigType+'">1 分别设置价格，2 统一设置价格</td>\
		</tr>\
		<tr>\
			<td align="right">单位重量：</td>\
			<td><input id="grossWeight" type="text" size="20" value="'+obj2.prodPackage.grossWeight+'"></td>\
		</tr>\
		<tr>\
			<td align="right">高度：</td>\
			<td>\
			<input id="height" type="text" size="20" value="'+obj2.prodPackage.height+'">\
			&nbsp;&nbsp;长度：\
			<input id="length" type="text" size="20" value="'+obj2.prodPackage.length+'">\
			&nbsp;&nbsp;宽度：\
			<input id="width" type="text" size="20" value="'+obj2.prodPackage.width+'">\
			</td>\
		</tr>\
		<tr>\
			<td align="right">数量：</td>\
			<td><input id="lots" type="text" size="20" value="'+obj2.prodPackage.height+'"></td>\
		</tr>\
		<tr>\
			<td align="right">单位ID：</td>\
			<td><input id="measureId" type="text" size="20" value="'+obj2.prodPackage.measureId+'"></td>\
		</tr>\
		<tr>\
			<td align="right">每包销售数量：</td>\
			<td><input id="packingQuantity" type="text" size="20" value="'+obj2.prodPackage.packingQuantity+'"></td>\
		</tr>\
		<tr>\
			<td align="right">产品阶梯重量：</td>\
			<td><input id="prodWeightRangeDto" type="text" size="20" value="'+obj2.prodPackage.prodWeightRangeDto+'"></td>\
		</tr>'
	$("#1_tbody").html(html)
}
function Funtbody2(){
	let URL,txt,html
	URL="http://api.dhgate.com/dop/router?method=dh.product.html.get&timestamp="+(new Date).getTime()+"&itemcode="+obj.arr4+"&v=1.0&access_token=" +o.token
	txt=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("{Fun(WebRequestGet("+URL+"))}")},async:false}).responseText;
	eval("let obj2=" + txt);
	txt=obj2.htmlContent
	txt=txt.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;")
	html='\
	<tr>\
	  <td colspan="2">\
	  <input type="hidden" id="htmlContent" value="'+txt+'" style="display:none" />\
	  <input type="hidden" id="htmlContent___Config" value="" style="display:none" />\
	  <iframe id="htmlContent___Frame" src="'+obj.path+'admin/fckeditor/editor/fckeditor.htm?InstanceName=htmlContent&amp;Toolbar=rendie" width="99%" height="500" frameborder="0" scrolling="no"></iframe>\
	  </td>\
   </tr>'
   
   $("#2_tbody").html(html)
}
function FunprodSkuList(obj){
	//document.write(JSON.stringify(obj))
	let htmlstr="",attrVal,attrValList
	for(let i=0;i<obj.length;i++)
	{	
		attrVal=''
		attrValList=obj[i].prodSkuAttrvalList
		if(attrValList){
			for(let j=0;j<attrValList.length;j++)
			{	
				attrVal+='<td name="sku'+attrValList[j].attrValId+'"></td>'
			}
		}
		htmlstr+="\
		<tr>"+attrVal+"\
		<td><input type=\"text\" value=\""+obj[i].inventory+"\" size=\"15\"></td>\
		<td>US $<input type=\"text\" value=\""+obj[i].retailPrice.toFixed(2)+"\" size=\"15\">/件</td>\
		<td>"+(obj[i].retailPrice/(1-0.08)).toFixed(2)+"</td>\
		<td>"+FunsaleStatus(obj[i].saleStatus)+"</td>\
		<td><input type=\"text\" value=\""+obj[i].skuCode+"\"></td>\
		</tr>"
	}
	attrVal=""
	if(attrValList)
	{
		for(let j=0;j<attrValList.length;j++)
		{	
			attrVal+='<td id="skuhead'+attrValList[j].attrId+'"></td>'
		}
	}
	htmlstr="<table><tr align=\"center\">"+attrVal+"<td>备货数量</td><td>实际收入</td><td>买家价格</td><td>销售状态</td><td>sku编码</td></tr></tr>"+htmlstr+"</table>"
	return htmlstr
}
function FunsaleStatus(id){
	let selected1,selected2
	if(id==1){selected1='selected="selected"';selected2="";}else{selected1='';selected2='selected="selected"';}
	let str='<select>\
	<option value="1" '+selected1+'>可销售</option>\
	<option value="0" '+selected2+'>不可销售</option>\
	</select>'
	return str
}
function FunprodAttrList(obj){
	//document.write(JSON.stringify(obj))
	let type
	for(let i=0;i<obj.length;i++)
	{	
		if(obj[i].attrName=="")
		{
			FunprodSpecSelfDefList(obj[i].prodAttrValList)//自定义属性
		}
		else
		{
			type=$("[name='attr"+obj[i].attrId+"']").attr("type")//判断形式 1：多选框 2：下拉框 4：字符型输入框 5：数值型输入框
			prodAttrValList(obj[i],type)
		}
	}
}
function prodAttrValList(obj,type){
	let skuhead,obj2=obj,val;
	obj=obj.prodAttrValList
	skuhead=$("#skuhead"+obj2.attrId)
	if(skuhead){
		skuhead.html(obj2.attrNameCn);
		for(let i=0;i<obj.length;i++)
		{
			
			val=obj[i].lineAttrvalNameCn
			if(obj[i].picUrl){
				val+='<input type="text" size="15" value="'+obj[i].lineAttrvalName+'"/><input type="text" size="50" value="'+obj[i].picUrl+'"/>'
			}
			$("[name='sku"+obj[i].attrValId+"']").html(val)
		}
	}
	for(let i=0;i<obj.length;i++)//选中
	{	
		if(type=="select")//选中下拉列表
		{$("[name='attr"+obj[i].attrId+"'] option[value='"+obj[i].attrValId+"']").attr("selected", true);}
		else if(type=="checkbox")
		{$("[name='attr"+obj[i].attrId+"']:checkbox[value='"+obj[i].attrValId+"']").attr('checked','true');}
	}
}
function FunprodSpecSelfDefList(obj){
	//document.write(JSON.stringify(obj))
	let htmlstr=""
	for(let i=0;i<obj.length;i++)
	{	
		htmlstr+='<li><input value="'+obj[i].attrName+'" type="text" size="40">:<input value="'+obj[i].lineAttrvalName+'" type="text" size="80"><a href="javascript:" onClick="$(this).parent().remove();">删除</a><hr></li>'
	}
	$("#prodSpecSelfDefList").html(htmlstr)
}
function dh_item_update()
{
  let DH=Object()
  DH.afterSaleTemplateId=$("#afterSaleTemplateId").html()//产品售后模板id
  DH.catePubId=$("#catePubId").html()//发布类目id
 // DH.itemAttrgroupList='[]'//兼容性属性列表
  DH.itemAttrList=$("#itemAttrList").html()//产品属性列表
  eval("let itemBase="+$("#itemBase").html())
  itemBase.htmlContent="aaaaaaaaaa"
  DH.itemBase=JSON.stringify(itemBase)//产品基础信息
  DH.itemCode=obj.arr4//产品itemCode
  DH.itemGroupId=""//产品所属产品组id
  eval("let itemImgList="+$("#itemImgList").html())
  itemImgList[0].type=1
  DH.itemImgList=JSON.stringify(itemImgList)//产品图片列表
  DH.itemInventory='{"invenLocationList":[{"inventoryLocation": "CN","leadingTime": 1,"sortVal":0}],"inventoryLocation": "111","inventoryQty": 0}'//产品备货信息
  DH.itemPackage='{"grossWeight": 11.1,"height": 11.1,"itemWeigthRange":{"baseQt": 11,"stepQt": 11,"stepWeight": 0.3},"length": 11.1,"measureId": "00000000000000000000000000000003","packingQuantity": 11,"width": 11.1}'//产品包装信息
  DH.itemSaleSetting='{"leadingTime": 1,"maxSaleQty": 11,"priceConfigType": 2}'//产品销售属性设置
  //DH.itemSkuList='[{"inventory":42,"itemSkuAttrvalList":[],"retailPrice": 216.3,"saleStatus": 1,"skuCode": "","itemSkuInvenList":[{"inventoryLocation": "CN","saleStatus": 1,"skuCode": "111","skuInventoryQty": 111,"skuMD5": "1111111"}]}]'//产品SKU列表(有备货信息)
  DH.itemSkuList=$("#itemSkuList").html()//产品SKU列表(无备货信息)
  DH.itemSpecSelfDefList=$("#itemSpecSelfDefList").html()//自定义规格列表
  DH.itemWholesaleRangeList='[]'//产品折扣区间
  DH.shippingModelId="1000001"//产品运费模板id
  DH.vaildDay="30"//产品有效期
  let txt,URL="http://api.dhgate.com/dop/router?method=dh.item.update&v=2.0&timestamp="+(new Date).getTime()+"&siteId=EN&access_token="+o.token+"&afterSaleTemplateId="+DH.afterSaleTemplateId+"&catePubId="+DH.catePubId+"&itemAttrList="+DH.itemAttrList+"&itemBase="+DH.itemBase+"&itemCode="+DH.itemCode+"&itemGroupId="+DH.itemGroupId+"&itemImgList="+DH.itemImgList+"&itemInventory="+DH.itemInventory+"&itemPackage="+DH.itemPackage+"&itemSaleSetting="+DH.itemSaleSetting+"&itemSkuList="+DH.itemSkuList+"&itemSpecSelfDefList="+DH.itemSpecSelfDefList+"&shippingModelId="+DH.shippingModelId+"&vaildDay="+DH.vaildDay
	txt = $.ajax({ type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") }, async: false }).responseText;
  alert(txt)
}
function dh_item_add()
{
  let shippingModelId,itemGroupId,catePubId,vaildDay,siteId,itemAttrList,itemImgList,itemInventory,itemPackage,itemSkuList,itemSpecSelfDefList,itemWholesaleRangeList,itemBase,itemSaleSetting
  itemGroupId=""
  shippingModelId="1000001"
  vaildDay="90"
  catePubId="019024004002"
  siteId="EN"
  itemAttrList='[{"isbrand":1,"itemAttrValList":[{"attrId":99,"attrName":"Brand Name","attrValId":99,"lineAttrvalName":"other","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":11,"attrName":"keyword1","attrValId":1,"lineAttrvalName":"lot computer","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"keyword2","attrValId":2,"lineAttrvalName":" toy mouse","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Warning","attrValId":3,"lineAttrvalName":"s","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Age Range","attrValId":4,"lineAttrvalName":"> 3 years old","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Remote Control","attrValId":5,"lineAttrvalName":"No","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Condition","attrValId":6,"lineAttrvalName":"In-Stock Items","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Version Type","attrValId":7,"lineAttrvalName":"Remastered Version","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Completion Degree","attrValId":8,"lineAttrvalName":"Finished Goods","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Dimensions","attrValId":9,"lineAttrvalName":"5cm","lineAttrvalNameCn":"","picUrl":""},{"attrId":11,"attrName":"Puppets Type","attrValId":10,"lineAttrvalName":"Model","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983016","attrName":"Gender","attrValId":"1377089","lineAttrvalName":"Unisex","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983020","attrName":"Material","attrValId":"1377147","lineAttrvalName":"PVC","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983018","attrName":"Theme","attrValId":"1377100","lineAttrvalName":"Movie & TV","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983016","attrName":"","attrValId":"1377087","lineAttrvalName":"","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983017","attrName":"","attrValId":"1377090","lineAttrvalName":"","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983018","attrName":"","attrValId":"1377100","lineAttrvalName":"","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983019","attrName":"","attrValId":"1377111","lineAttrvalName":"","lineAttrvalNameCn":"","picUrl":""}]},{"isbrand":0,"itemAttrValList":[{"attrId":"983020","attrName":"","attrValId":"1377142","lineAttrvalName":"","lineAttrvalNameCn":"","picUrl":""}]}]'
  itemImgList='[{"imgMd5": "c144fda3527aac8001be1b03aaaa2222ss1qqq111","imgUrl": "albu_731980120_00","type":3},{"imgMd5": "c144fda3527aac8001be1b03a11aaaff2222qqq1111","imgUrl": "albu_731980120_0011","type":1}]'
  itemInventory='{"invenLocationList":[{"inventoryLocation": "CN","leadingTime": 1,"sortVal":0}],"inventoryLocation": "111","inventoryQty": 0}'
  itemPackage='{"grossWeight": 11.1,"height": 11.1,"itemWeigthRange":{"baseQt": 11,"stepQt": 11,"stepWeight": 0.3},"length": 11.1,"measureId": "00000000000000000000000000000003","packingQuantity": 11,"width": 11.1}'
  //itemSkuList='[{"inventory":42,"itemSkuAttrvalList":[],"itemSkuInvenList":[{"inventoryLocation": "CN","saleStatus": 1,"skuCode": "111","skuInventoryQty": 111,"skuMD5": "1111111"}],"retailPrice": 216.3,"saleStatus": 1,"skuCode": ""}]'//(有备货信息)
  itemSkuList='[{"inventory":42,"itemSkuAttrvalList":[],"itemSkuInvenList":[],"retailPrice": 216.3,"saleStatus": 1,"skuCode": ""}]'//(无备货信息)
  itemSpecSelfDefList='[]'
  itemWholesaleRangeList='[]'
  itemBase='{"htmlContent": "111hjkkjkjhhhjkklllo111l333a22aa222qq","itemName": "1234567890","keyWord1": "11","shortDesc": "11","videoUrl": "http://www.youtube.com/1236111154"}'
  itemSaleSetting='{"leadingTime": 1,"maxSaleQty": 11,"priceConfigType": 2}'
  URL="http://api.dhgate.com/dop/router?method=dh.item.add&itemSaleSetting="+itemSaleSetting+"&itemBase="+itemBase+"&itemWholesaleRangeList="+itemWholesaleRangeList+"&itemWholesaleRangeList="+itemWholesaleRangeList+"&itemSpecSelfDefList="+itemSpecSelfDefList+"&itemSkuList="+itemSkuList+"&itemPackage="+itemPackage+"&itemInventory="+itemInventory+"&itemImgList="+itemImgList+"&itemAttrList="+itemAttrList+"&siteId="+siteId+"&catePubId="+catePubId+"&vaildDay="+vaildDay+"&itemGroupId="+itemGroupId+"&shippingModelId="+shippingModelId+"&v=2.0&timestamp="+(new Date).getTime()+"&access_token="+o.token
	txt = $.ajax({ type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") }, async: false }).responseText;
  alert(txt)
}