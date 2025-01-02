'use strict';
////////////////////////////////////////////////一键采集所有类目  开始//////////////////////////////////////////////////////////
function collectionType(){
	$.ajax("/webcache/TypeListalibaba.txt?"+Math.random(),{type:'get',success:function(str){
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
		Param="categoryID="+obj.Global[obj.GlobalI]+"&webSite=alibaba&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	  $.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") }, success: function (txt) { collectionType002(txt, cateId); } });
	}
	else
	{
		if(obj.list.length>0)
		{
			obj.list.shift();//下一步就要存了，这里删了
			let str='<rendie:area tag="file" file="/webcache/TypeListalibaba.txt">'+JSON.stringify(obj.list)+'</rendie:area>'
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
	if(list.categoryInfo[0])
	{
		let val="insert into @.type(@.name,:enname,:upid,:from,:fromID,:sort,:isleaf)values('"+(list.categoryInfo[0].name).replace(/'/ig,"''")+"','"+(list.categoryInfo[0].enName).replace(/'/ig,"''")+"','"+cateId+"','alibaba',"+list.categoryInfo[0].categoryID+","+(obj.GlobalI+1)+","+(list.categoryInfo[0].isLeaf?1:0)+")"
		let val2="select top 1 :id from @.type where @.fromID='"+list.categoryInfo[0].categoryID+"' and @.from='alibaba'"
		let html='<ul class="Tul">\
		{if "Fun(Db('+val2+',count))"==""}\
			<li class="w40 center">'+(obj.GlobalI+1)+'</li><li class="w100">采集成功</li><li>'+val+'</li><rendie:area tag="sql">'+val+'</rendie:area></li>\
		<else/>\
			<li class="w40 center">'+(obj.GlobalI+1)+'</li><li class="w100">已存在，不采集</li><li>'+val2+'</li></li>\
		{/if}</ul>'
		if(!list.categoryInfo[0].isLeaf){obj.list[obj.list.length]=list.categoryInfo[0].categoryID;}
		$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt){
			$(".table").append(txt);obj.GlobalI++;obj.t=setTimeout("collectionType001("+cateId+");",0);			
		}});
	}
	else
	{obj.GlobalI++;obj.t=setTimeout("collectionType001("+cateId+");",0);}
}
////////////////////////////////////////////////一键采集所有类目  结束//////////////////////////////////////////////////////////
function pagelist(p){
	//alibaba_category_attribute_get(null,138)
	alibaba_category_get(0,$(".table"),5);
}
function alibaba_category_get(cateId,docObj,m1){
  let urlPath,Param,URL,txt
  urlPath="param2/1/com.alibaba.product/alibaba.category.get/"+obj.APPKEY
  Param="categoryID="+cateId+"&webSite=alibaba&access_token="+obj.token
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
		Param="categoryID="+type+"&webSite=alibaba&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
    obj.obj.append('<ul id="Type'+type+'"><li class="center"><img src="'+obj.path+'admin/img/loading.gif" align="absmiddle"/></li></ul>')
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
			eval("let list="+txt);
			if(!list.categoryInfo[0].isLeaf)
			{Modified="<a href=\"javascript:\" class=\"Mo MoA\" style=\"margin-left:"+obj.m1+"px;\" onclick=\"ModifiedAB($(this),'"+type+"')\"></a>";categoryId=""}
			else
			{Modified="<a class=\"Mo\" style=\"margin-left:"+obj.m1+"px;\"></a>";categoryId=" <a href='javascript:' onClick=\"alibaba_category_attribute_get($(this),"+type+");\" class=\"detail-button\">查看属性</a>";}
			htmlstr+="<li class=\"tr\" title='level:"+list.categoryInfo[0].level+"\nisLeaf:"+list.categoryInfo[0].isLeaf+"\nparentIDs:"+list.categoryInfo[0].parentIDs+"\n'><div class=\"w200\">"+Modified+list.categoryInfo[0].categoryID+"</div><div>"+list.categoryInfo[0].name+"（"+list.categoryInfo[0].enName+"）"+categoryId+"</div></li>";
			$("#Type"+type).html(htmlstr)
			obj.GlobalI++;obj.t=setTimeout("childIDsFor("+cateId+");",0);
    }});
	}
	else
	{
		if(cateId==0){obj.obj.append('<ul><li><div class="w200">&nbsp;</div><div><a href="javascript:;" onclick="collectionType()" class="button">一键采集所有类目</a></div></li></ul>');}
	}
}
function ModifiedAB(This,fromID)
{
  if(This.attr("Class")=="Mo MoB")
  {
	$(".Mo"+fromID).hide();This.attr("Class","Mo MoA");
  }
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
function alibaba_category_attribute_get(This,categoryId)//类目属性（新,暂时不能用，因为alibaba没做好）
{
  if($("#attributes"+categoryId).length==0)
  {
		let urlPath,Param,URL,txt
		urlPath="param2/1/com.alibaba.product/alibaba.category.attribute.get/"+obj.APPKEY
		Param="categoryID="+categoryId+"&webSite=alibaba&access_token="+obj.token
		URL="https://gw.open.1688.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.httpRequestPostParam(" + URL + "," + urlPath + "," + Param + "," + obj.APPSECRET + ",)/>") },success:function(txt){
			eval("let obj2="+txt)
			let str="<table class=\"tb\" id=\"attributes"+categoryId+"\">",str2=""
			for(let i=0;i<obj2.attributes.length;i++){
				switch(obj2.attributes[i].inputType)
				{
					case "input":str2='<input type="text" size="50" placeholder="文本输入框">';break;
					case "single_select":str2=Funselect(obj2.attributes[i]);break;
					case "multi_select":str2=Funinput(obj2.attributes[i]);break;
					default:str2="未知";break;
				}
			  str+="<tr><td width=\"300\" align=\"right\" title=\"required:"+obj2.attributes[i].required+"\nattrValues:"+obj2.attributes[i].attrValues+"\ninputType:"+obj2.attributes[i].inputType+"\">"+obj2.attributes[i].name+"("+obj2.attributes[i].enName+"):</td><td>"+str2+"</td></tr>"
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
  for(let i=0;i<obj2.attrValues.length;i++)
	{
	  str+='<option value="'+obj2.attrValues[i].attrValueID+'" title="sKU:'+obj2.attrValues[i].sKU+'\nname:'+obj2.attrValues[i].name+'">'+obj2.attrValues[i].enName+'</option>'
	}
  return  str+='</select>';
}
function Funinput(obj2)
{
  let str=""
  for(let i=0;i<obj2.attrValues.length;i++)
  {
    str+='<label class="checklabel" title="sKU:'+obj2.attrValues[i].sKU+'\nname:'+obj2.attrValues[i].name+'"><input type="checkbox" value="'+obj2.attrValues[i].attrValueID+'"/>'+obj2.attrValues[i].enName+'</label>'
  }
  return str
}
