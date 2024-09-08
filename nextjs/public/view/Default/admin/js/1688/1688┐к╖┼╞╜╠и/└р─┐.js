'use strict';
////////////////////////////////////////////////一键采集所有类目  开始//////////////////////////////////////////////////////////
function collectionType(){
	$.ajax("/webcache/TypeList1688.txt?"+Math.random(),{type:'get',success:function(str){
		eval("obj.list="+str);
		$(".table").html('<li><progress style="width:80%" value="1" max="'+obj.list.length+'"/> 1/'+obj.list.length+' (条)</li>');
		alibaba_category_get(obj.list[0],0,0);
	},error:function(){$(".table").html("");obj.list=[0];alibaba_category_get(0,0,0);}});
}
function collectionType001(cateId)
{
  if(obj.GlobalI<obj.Global.length)
	{
		let urlPath,Param,URL
		urlPath="param2/1/com.alibaba.product/alibaba.category.get/"+obj.APPKEY
		Param="categoryID="+obj.Global[obj.GlobalI]+"&webSite=1688&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	  $.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") }, success: function (txt) { collectionType002(txt, cateId); } });
	}
	else
	{
		if(obj.list.length>0)
		{
			obj.list.shift();//下一步就要存了，这里删了
			let str='<r: tag="file" file="/webcache/TypeList1688.txt">'+JSON.stringify(obj.list)+'</r:>'
		  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(str)},success:function(html){
		    $(".table").html('<li><progress style="width:80%" value="1" max="'+obj.list.length+'"/> 1/'+obj.list.length+' (条)</li>');
			  alibaba_category_get(obj.list[0],0,0);
			}});
		}
		else
		{alert("完");}
	}
}
function collectionType002(txt,cateId)
{
	eval("let list="+txt);
	let val="insert into @.type(@.name,:upid,:from,:fromID,:sort,:isleaf)values('"+(list.categoryInfo[0].name).replace(/'/ig,"''")+"','"+cateId+"','1688',"+list.categoryInfo[0].categoryID+","+(obj.GlobalI+1)+","+(list.categoryInfo[0].isLeaf?1:0)+")"
	let val2="select top 1 :id from @.type where @.fromID='"+list.categoryInfo[0].categoryID+"' and @.from='1688'"
	let html='<ul class="Tul">\
	{if "Fun(Db('+val2+',count))"==""}\
		<li class="w40 center">'+(obj.GlobalI+1)+'</li><li class="w100">采集成功</li><li>'+val+'</li><r: tag="sql">'+val+'</r:></li>\
	<else/>\
		<li class="w40 center">'+(obj.GlobalI+1)+'</li><li class="w100">已存在，不采集</li><li>'+val2+'</li></li>\
	{/if}</ul>'
	if(!list.categoryInfo[0].isLeaf){obj.list[obj.list.length]=list.categoryInfo[0].categoryID;}
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt){
																																																		
		$(".table").append(txt);obj.GlobalI++;obj.t=setTimeout("collectionType001("+cateId+");",0);			
		
	}});
}
////////////////////////////////////////////////一键采集所有类目  结束//////////////////////////////////////////////////////////
////////////////////////////////////////////////一键采集所有类目属性  开始//////////////////////////////////////////////////////////
function TypeAttr001()
{
	$.ajax("/webcache/TypePage1688.txt?"+Math.random(),{type:'get',success:function(str){
		obj.page=parseInt(str)+1;collectionTypeAttr();
	},error:function(){$(".table").html("");obj.page=1;collectionTypeAttr();}});
}
function collectionTypeAttr()
{
 let str='<r:type where=" where @.from=\'1688\' and @.isleaf=1 order by @.id asc" size=1 page=2><:fromid/></r:type>,<@count/>';
  $.ajax({type:"POST",url:"exe/"+obj.page+".html?"+Math.random(),data:{data:escape(str)},success:function(txt){
    let arr=txt.split(",");
		if(obj.page>parseInt(arr[1]))
		{
		  alert("完")
		}
		else
		{
			$(".table").html('<li><progress style="width:80%" value="'+obj.page+'" max="'+arr[1]+'"/> '+obj.page+'/'+arr[1]+' (条)</li>');
			let urlPath,Param,URL
			urlPath="param2/1/cn.alibaba.open/productAttributes.get/"+obj.APPKEY
			Param="categoryID="+arr[0]+"&access_token="+obj.token
			URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
			$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") }, success: function (t) { collectionTypeAttr001(t); } });
		}
  }});
}
function collectionTypeAttr001(txt)
{
	let str="",attrinsert,attrselect;
	obj.SQL=[]
	if(txt.indexOf(" (502) 错误的网关")==-1)
	{
		eval("let obj2="+txt)
		for(let i=0;i<obj2.result.total;i++){
			attrinsert="insert into @.attributes(@.name,:from,:fromID,:sort)values('"+(obj2.result.toReturn[i].name).replace(/'/ig,"''")+"','1688',"+obj2.result.toReturn[i].fid+","+obj2.result.toReturn[i].order+")"
			attrselect="select top 1 :id from @.attributes where @.fromID="+obj2.result.toReturn[i].fid+" and @.from='1688'"
			Bindselect="select top 1 :id from @.attributesBind where @.fromID="+obj2.result.toReturn[i].fid+" and @.from='1688' and @.typeid='"+obj2.result.toReturn[i].categoryId+"' and @.ShowType='"+obj2.result.toReturn[i].showType+"' and @.sku="+(obj2.result.toReturn[i].keyAttr?1:0)+" and @.required="+(obj2.result.toReturn[i].required?1:0)+" and @.defined="+(obj2.result.toReturn[i].isSpecExtendedAttr?1:0)
			Bindinsert="insert into @.attributesBind(:from,:typeid,:fromID,:ShowType,:sku,:required,:defined)values('1688','"+obj2.result.toReturn[i].categoryId+"',"+obj2.result.toReturn[i].fid+","+obj2.result.toReturn[i].showType+","+(obj2.result.toReturn[i].specAttr?1:0)+","+(obj2.result.toReturn[i].required?1:0)+","+(obj2.result.toReturn[i].isSpecExtendedAttr?1:0)+")"
			obj.SQL[obj.SQL.length]="\
			<li>{if \"Fun(Db("+attrselect+",count))\"==\"\"}<r: tag=\"sql\">"+attrinsert+"</r:>"+attrinsert+"---已插入{else/}"+attrselect+"---已存在{/if}</li>\
			<li>{if \"Fun(Db("+Bindselect+",count))\"==\"\"}<r: tag=\"sql\">"+Bindinsert+"</r:>"+Bindinsert+"---已插入{else/}"+Bindselect+"---已存在{/if}</li>\
			"+collectionTypeAttr002(obj2.result.toReturn[i])
		}
		collectionTypeAttr003(0)
	}
	else
	{
		alert(txt)
		//obj.page++;obj.t=setTimeout("collectionTypeAttr();",500);
	}
}
function collectionTypeAttr002(obj2)
{
  let html="",Vinsert,Vselect,Bindselect,Bindinsert
  if(obj2.valueIds){
		for(let i=0;i<obj2.values.length;i++)
		{
			Vinsert="insert into @.attributesValues(@.name,:from,:fromID,:sort)values('"+(obj2.values[i]).replace(/'/ig,"''")+"','1688',"+obj2.valueIds[i]+","+(i+1)+")"
			Vselect="select top 1 :id from @.attributesValues where @.fromID="+obj2.valueIds[i]+" and @.from='1688'"
			Bindselect="select top 1 :id from @.attributesBind where @.fromID="+obj2.valueIds[i]+" and @.typeid='"+obj2.categoryId+"' and @.from='1688_attributes' and @.upid="+obj2.fid
			Bindinsert="insert into @.attributesBind(:from,:typeid,:fromID,:upid)values('1688_attributes','"+obj2.categoryId+"',"+obj2.valueIds[i]+","+obj2.fid+")"
			html+="\
			<li>{if \"Fun(Db("+Vselect+",count))\"==\"\"}<r: tag=\"sql\">"+Vinsert+"</r:>"+Vinsert+"---已插入{else/}"+Vselect+"---已存在</if><li>\
			<li>{if \"Fun(Db("+Bindselect+",count))\"==\"\"}<r: tag=\"sql\">"+Bindinsert+"</r:>"+Bindinsert+"---已插入{else/}"+Bindselect+"---已存在</if><li>"
		}
  }
  return html
}
function collectionTypeAttr003(i)
{
	if(i<obj.SQL.length)
	{
		$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(obj.SQL[i])},success:function(t){
			$(".table").append(t);
			i++;collectionTypeAttr003(i)
		}});
	}
	else
	{
		$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape('<r: tag="file" file="/webcache/TypePage1688.txt">'+obj.page+'</r:>')},success:function(t){
		  obj.page++;obj.t=setTimeout("collectionTypeAttr();",500);
		}});
	}
}
////////////////////////////////////////////////一键采集所有类目属性  结束//////////////////////////////////////////////////////////
function pagelist(p){alibaba_category_get(0,$(".table"),5);}
function alibaba_category_get(cateId,docObj,m1){
  let urlPath,Param,URL
  urlPath="param2/1/com.alibaba.product/alibaba.category.get/"+obj.APPKEY
  Param="categoryID="+cateId+"&webSite=1688&access_token="+obj.token
  URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	$.ajax({
		type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
		eval("let categoryInfo="+txt);obj.Global=categoryInfo.categoryInfo[0].childIDs;obj.GlobalI=0;
		if(docObj==0){collectionType001(cateId);}else{obj.obj=docObj;obj.m1=m1;childIDsFor(cateId);}
  }});
}
function childIDsFor(cateId)
{
  if(obj.GlobalI<obj.Global.length)
	{
		let urlPath,Param,URL,htmlstr='',Modified="",categoryId="",type=obj.Global[obj.GlobalI]
		urlPath="param2/1/com.alibaba.product/alibaba.category.get/"+obj.APPKEY
		Param="categoryID="+type+"&webSite=1688&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
    obj.obj.append('<ul id="Type'+type+'"><li class="center"><img src="'+obj.path+'admin/img/loading.gif" align="absmiddle"/></li></ul>')
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
			eval("let list="+txt);
			if(list.categoryInfo[0].isLeaf)
			{Modified="<a class=\"Mo\" style=\"margin-left:"+obj.m1+"px;\"></a>";categoryId=" <a href='javascript:' onClick=\"productAttributes_get($(this),"+type+");\" class=\"detail-button\">查看属性</a>";}
			else
			{Modified="<a href=\"javascript:\" class=\"Mo MoA\" style=\"margin-left:"+obj.m1+"px;\" onclick=\"ModifiedAB($(this),'"+type+"')\"></a>";categoryId=""}
			htmlstr+="<li class=\"tr\"><div class=\"w200\">"+Modified+list.categoryInfo[0].categoryID+"</div><div>"+list.categoryInfo[0].name+categoryId+"</div></li>";
			$("#Type"+type).html(htmlstr)
			obj.GlobalI++;obj.t=setTimeout("childIDsFor("+cateId+");",0);
    }});
	}
	else
	{
		if(cateId==0){obj.obj.append('<ul><li><a href="javascript:;" onclick="collectionType()" class="button left">一键采集所有【类目】</a><a href="javascript:;" onclick="TypeAttr001()" class="button middle">一键采集所有【类目属性】</a></li></ul>');}
	}
}
function ModifiedAB(This,fromID)
{
  if(This.attr("Class")=="Mo MoB")
  {$(".Mo"+fromID).hide();This.attr("Class","Mo MoA");}
  else
  {
		This.attr("Class","Mo MoB")
		if($(".Mo"+fromID).length)
		{$(".Mo"+fromID).show();}
		else
		{
			let m1=parseInt(This.css("margin-left"))+20
			This.parent().parent().after('<ul class="Mo'+fromID+'"></ul>')
			alibaba_category_get(fromID,$(".Mo"+fromID),m1);	  
		}
  }
}
///////////////////////////////////////开始///////////////////////////////////////////////////////////
function productAttributes_get(This,categoryId)//类目属性（旧）
{
  if($("#attributes"+categoryId).length==0)
  {
	let urlPath,Param,URL,txt,str2
	urlPath="param2/1/cn.alibaba.open/productAttributes.get/"+obj.APPKEY
	Param="categoryID="+categoryId+"&access_token="+obj.token
	URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
    alert(txt)
	  eval("let obj2="+txt)
	  let str="<table class=\"tb\" id=\"attributes"+categoryId+"\">"
	  for(let i=0;i<obj2.result.total;i++){
			switch(obj2.result.toReturn[i].showType)
			{
				case "1":str2=Funselect(obj2.result.toReturn[i]);break;
				case "2":str2=Funinput(obj2.result.toReturn[i]);break;
				case "3":str2="单选框";break;
				case "0":str2='<input type="text" size="50" placeholder="文本输入框">';break;
				case "-1":str2='<input type="text" size="50" placeholder="数字输入框">';break;
				case "4":str2="下拉框列表";break;
				case "5":str2="日期";break;
				default:str2="未知";break;
			}
			str+="<tr><td width=\"300\" align=\"right\" title=\"fid:"+obj2.result.toReturn[i].fid+"\nspecExtendedAttr:"+obj2.result.toReturn[i].specExtendedAttr+"\nvalueIds:"+obj2.result.toReturn[i].valueIds+"\nvalues:"+obj2.result.toReturn[i].values+"\norder:"+obj2.result.toReturn[i].order+"\nrequired:"+obj2.result.toReturn[i].required+"\nsupportDefinedValues:"+obj2.result.toReturn[i].supportDefinedValues+"\nkeyattribute:"+obj2.result.toReturn[i].keyattribute+"\ncategoryId:"+obj2.result.toReturn[i].categoryId+"\nkeyAttr:"+obj2.result.toReturn[i].keyAttr+"\nspecAttr:"+obj2.result.toReturn[i].specAttr+"\nofferType:"+obj2.result.toReturn[i].offerType+"\ninputMaxLength:"+obj2.result.toReturn[i].inputMaxLength+"\naspect:"+obj2.result.toReturn[i].aspect+"\nsuggestionType:"+obj2.result.toReturn[i].suggestionType+"\ndefaultValueId:"+obj2.result.toReturn[i].defaultValueId+"\nhasChildAttr:"+obj2.result.toReturn[i].hasChildAttr+"\nspecPicAttr:"+obj2.result.toReturn[i].specPicAttr+"\">"+obj2.result.toReturn[i].name+":</td><td>"+str2+"</td></tr>"
	  }
	  str+="</table>"
		//$(".table").html(str)
	  This.parent().parent().after(str)
	}});
  }
  else if($("#attributes"+categoryId).is(":visible"))
  {$("#attributes"+categoryId).hide()}
  else
  {$("#attributes"+categoryId).show()}
}
function Funselect(obj2)
{
	let str='<select><option value="">- 请选择'+obj2.name+' -</option>';
	for(let i=0;i<obj2.valueIds.length;i++)
	{
	  str+='<option value="'+obj2.valueIds[i]+'">'+obj2.values[i]+'</option>'
	}
  return  str+='</select>';
}
function Funinput(obj2)
{
  let str=""
  for(let i=0;i<obj2.valueIds.length;i++)
  {
    str+="<label class=\"checklabel\"><input type=\"checkbox\" value=\""+obj2.valueIds[i]+"\"/>"+obj2.values[i]+"</label>"
  }
  return str
}
//////////////////////////////////////结束//////////////////////////////////////////////////////////////////////
function alibaba_category_attribute_get(This,categoryId)//类目属性（新,暂时不能用，因为alibaba没做好）
{
  if($("#attributes"+categoryId).length==0)
  {
		let urlPath,Param,URL,txt,str2
		urlPath="param2/1/com.alibaba.product/alibaba.category.attribute.get/"+obj.APPKEY
		Param="categoryID="+categoryId+"&webSite=1688&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
			if(txt.indexOf("不能找到类目属性信息")==-1)
			{
				eval("let obj2="+txt)
				let str="<table class=\"tb\" id=\"attributes"+categoryId+"\">"
				for(let i=0;i<obj2.attributes.length;i++){
					switch(obj2.attributes[i].inputType)
					{
						case 1:str2=Fun1688select(obj2.attributes[i]);break;
						case 0:str2='<input type="text" size="50" placeholder="文本输入框">';break;
						case 2:str2=Fun1688checkbox(obj2.attributes[i]);break;
						case -1:str2='<input type="text" size="50" placeholder="数字输入框">';break;
						default:str2=obj2.attributes[i].inputType;break;
					}
					str+="<tr><td width=\"300\" align=\"right\" title=\"sign:"+obj2.attributes[i].sign+"\naspect:"+obj2.attributes[i].aspect+"\nattrID:"+obj2.attributes[i].attrID+"\nisSKUAttribute:"+obj2.attributes[i].isSKUAttribute+"\ninputType:"+obj2.attributes[i].inputType+"\nrequired:"+obj2.attributes[i].required+"\n\">"+obj2.attributes[i].name+":</td><td>"+str2+"</td></tr>"
				}
				str+="</table>"
				This.parent().parent().after(str)
			}else{alert(txt);}
		}});
  }
  else if($("#attributes"+categoryId).is(":visible"))
  {$("#attributes"+categoryId).hide()}
  else
  {$("#attributes"+categoryId).show()}
}
function Fun1688select(obj2)
{
	let str='<select><option value="">- 请选择'+obj2.name+' -</option>';
	for(let i=0;i<obj2.attrValues.length;i++)
	{
	  str+='<option value="'+obj2.attrValues[i].attrValueID+'">'+obj2.attrValues[i].name+'</option>'
	}
  return  str+='</select>';
}
function Fun1688checkbox(obj2)
{
  let str=""
  for(let i=0;i<obj2.attrValues.length;i++)
  {
    str+="<label class=\"checklabel\"><input type=\"checkbox\" value=\""+obj2.attrValues[i].attrValueID+"\"/>"+obj2.attrValues[i].name+"</label>"
  }
  return str
}