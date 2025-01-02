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
		this.a03(0,$(".Mo0"),5);
	},
	a03:function(cateId,docObj,m1)
	{
		let urlPath,Param,URL
		urlPath="param2/1/aliexpress.open/api.getChildrenPostCategoryById/"+this.obj.APPKEY
		Param="cateId="+cateId+"&access_token="+this.token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		Tool.ajax.a01("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",)/>",1,this.a04,this,[docObj,m1,cateId])
	},
  a04:function(t,doc)
	{
		if(t.indexOf("远程服务器返回错误: (401) 未经授权")!=-1)
		{
			F1.b01(this,this.a02,true);
		}
		else
		{
			eval("let aeopPostCategoryList="+t);
			let htmlstr="",Modified="",categoryId=""
			for(let i=0;i<aeopPostCategoryList.aeopPostCategoryList.length;i++)
			{			
				if(!aeopPostCategoryList.aeopPostCategoryList[i].isleaf)
				{Modified="<a href=\"javascript:\" class=\"Mo MoA\" style=\"margin-left:"+doc[1]+"px;\" onclick=\"fun.c01($(this),'"+aeopPostCategoryList.aeopPostCategoryList[i].id+"')\"></a>";categoryId=""}
				else
				{Modified="<a class=\"Mo\" style=\"margin-left:"+doc[1]+"px;\"></a>";categoryId="<a href='javascript:' onClick=\"fun.c02($(this),"+aeopPostCategoryList.aeopPostCategoryList[i].id+");\" class=\"detail-button\">查看属性</a>";}
				htmlstr+="<ul class=\"Tul tr\">\
				<li class=\"w200\">"+Modified+aeopPostCategoryList.aeopPostCategoryList[i].id+"</li>\
				<li title=\"(语言).分类名称：\n(zh)."+aeopPostCategoryList.aeopPostCategoryList[i].names.zh+"\n(en)."+aeopPostCategoryList.aeopPostCategoryList[i].names.en+"\n(pt)."+aeopPostCategoryList.aeopPostCategoryList[i].names.pt+"\n(fr)."+aeopPostCategoryList.aeopPostCategoryList[i].names.fr+"\n(ru)."+aeopPostCategoryList.aeopPostCategoryList[i].names.ru+"\n(in)."+aeopPostCategoryList.aeopPostCategoryList[i].names.in+"\n(es)."+aeopPostCategoryList.aeopPostCategoryList[i].names.es+"\">\
				"+aeopPostCategoryList.aeopPostCategoryList[i].names.zh+"（"+aeopPostCategoryList.aeopPostCategoryList[i].names.en+"）"+categoryId+"\
				 </li></ul>"
			}
			
			if(doc[2]==0){htmlstr="<ul class='Tul'><li class=\"w200 center\">ID</li><li>分类名称</li></li></ul>"+htmlstr+"<ul class='Tul'><li><a href=\"javascript:Tool.main('"+obj.arr[0]+"/article/"+obj.arr[2]+".html');\" class=\"button\">一键采集所有类目</a></li></ul>"}
			doc[0].html(htmlstr)
		}
	},
	////////////////////////////////////////////////////////////////////////////
	b01:function(obj)
	{
		let str="<tr><td  align=\"right\" width=\"300\" id=\"type"+obj.id+"\" rel=\""+obj.attributeShowTypeValue+"\" name=\""+obj.names.zh+"\" title=\"spec:"+obj.spec+"\nvisible:"+obj.visible+"\ncustomizedName:"+obj.customizedName+"\nkeyAttribute:"+obj.keyAttribute+"\ncustomizedPic:"+obj.customizedPic+"\nsku:"+obj.sku+"\">"+obj.names.zh+":<br/>("+obj.names.en+"--"+obj.sku+")</td><td>"
		for(let i=0;i<obj.values.length;i++)
		{
			str+="<input type=\"checkbox\" value=\""+obj.values[i].id+"\" id=\"check-"+obj.values[i].id+"\"/><label for=\"check-"+obj.values[i].id+"\">"+obj.values[i].names.zh+"（"+obj.values[i].names.en+"）</label>"
		}
		return str+"</td></tr>"
	},
	b03:function (obj)
	{
		return "<tr><td  align=\"right\" width=\"300\" id=\"type"+obj.id+"\" rel=\""+obj.attributeShowTypeValue+"\"title=\"spec:"+obj.spec+"\nvisible:"+obj.visible+"\ncustomizedName:"+obj.customizedName+"\nkeyAttribute:"+obj.keyAttribute+"\ncustomizedPic:"+obj.customizedPic+"\nsku:"+obj.sku+"\">"+obj.names.zh+":<br/>("+obj.names.en+'--'+obj.sku+')</td><td><input type="text" size="50" id=\"input'+obj.id+'"></td></tr>'
	},
	b02:function(obj)
	{
		let str="<tr><td  align=\"right\" width=\"300\" id=\"type"+obj.id+"\" rel=\""+obj.attributeShowTypeValue+"\"title=\"spec:"+obj.spec+"\nvisible:"+obj.visible+"\ncustomizedName:"+obj.customizedName+"\nkeyAttribute:"+obj.keyAttribute+"\ncustomizedPic:"+obj.customizedPic+"\nsku:"+obj.sku+"\">"+obj.names.zh+":<br/>("+obj.names.en+"--"+obj.sku+")</td><td><select id=\"list_box"+obj.id+"\"><option>请选择"+obj.names.zh+"</option>"
		for(let i=0;i<obj.values.length;i++){
			str+="<option value='"+obj.values[i].id+"'>"+obj.values[i].names.zh+"("+obj.values[i].names.en+")</option>"
		}
		str+="</select></td></tr>"
		return str
	},
	////////////////////////////////////////////////////////////////////////////
	c01:function(This,fromID)
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
				This.parent().parent().after('<ul class="Mo'+fromID+'"><li class="center"><img src="/'+o.path+'admin/img/loading.gif" align="absmiddle"/></li></ul>')
				this.a03(fromID,$(".Mo"+fromID),m1);	  
			}
		}
	},
	c02:function(This,categoryId)
	{
		if($("#attributes"+categoryId).length==0)
		{
			let urlPath,Param,URL
			urlPath="param2/1/aliexpress.open/api.getAttributesResultByCateId/"+this.obj.APPKEY
			Param="cateId="+categoryId+"&access_token="+this.token
			URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
			/*
			urlPath="param2/1/aliexpress.open/getChildAttributesResultByPostCateIdAndPath/"+this.obj.APPKEY
			Param="cateId="+categoryId+"&access_token="+this.token
			URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
			*/
			Tool.ajax.a01()/>",1,[This,this.c03,"<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",this,categoryId])
		}
		else if($("#attributes"+categoryId).is(":visible"))
		{$("#attributes"+categoryId).hide()}
		else
		{$("#attributes"+categoryId).show()}
	},
	c03:function(txt,doc)
	{
		alert(txt)
		/*
		eval("let obj="+txt)
		let str="<table class=\"tb\" id=\"attributes"+doc[1]+"\">"
		for(let i=0;i<obj.attributes.length;i++)
		{
			switch(obj.attributes[i].attributeShowTypeValue)
			{
				case "list_box":str+=this.b02(obj.attributes[i]);break;
				case "input":str+=this.b03(obj.attributes[i]);break;
				case "check_box":str+=this.b01(obj.attributes[i]);break
				default:str+="<tr><td>未知</td><td>未知</td></tr>";break;
			}
		}
		str+="</table>"
		doc[0].parent().parent().after(str)
		*/
	}
}
fun.a01();