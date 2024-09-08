'use strict';
var fun=
{
	token:"",obj:{TYPE:[0]},
  a01:function()
	{
		F1.b01(this,this.a02,false);
	},
  a02:function()
	{
		if(this.obj.TYPE.length==0)
		{alert("完")}
		else
		{this.a03();}
	},
  a03:function()
	{
		let urlPath,Param,URL
		urlPath="param2/1/aliexpress.open/api.getChildrenPostCategoryById/"+this.obj.APPKEY
		Param="cateId="+this.obj.TYPE[0]+"&access_token="+this.token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		Tool.ajax.a01("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",)/>",1,this.a04,this)
	},
  a04:function(t)
	{
		eval("let aeopPostCategoryList=" + t);
		aeopPostCategoryList=aeopPostCategoryList.aeopPostCategoryList
		let pcount=aeopPostCategoryList.length,fromID,isleaf,val1,val2,html=''
		for(let i=0;i<pcount;i++)
		{
			fromID=aeopPostCategoryList[i].id;isleaf=aeopPostCategoryList[i].isleaf
			if(!aeopPostCategoryList[i].names.zh){aeopPostCategoryList[i].names.zh="";}
			if(!aeopPostCategoryList[i].names.en){aeopPostCategoryList[i].names.en="";}
			val1="insert into @.type(@.name,:upid,:enname,:from,:fromID,:sort,:isleaf)values('"+(aeopPostCategoryList[i].names.zh).replace(/'/ig,"''")+"','"+this.obj.TYPE[0]+"','"+(aeopPostCategoryList[i].names.en).replace(/'/ig,"''")+"','aliexpress',"+fromID+","+(i+1)+","+(isleaf?1:0)+")"
			val2="select top 1 :id from @.type where @.fromID='"+fromID+"' and @.from='aliexpress'"
			html+="{if \"Fun(Db("+val2+",count))\"==\"\"}\
			<tr align=\"center\"><td>"+(i+1)+"</td><td nowrap=\"nowrap\">非叶子类目</td><td nowrap=\"nowrap\">采集成功</td><td align=\"left\">"+val1+"<r: tag=\"sql\">"+val1+"</r:></td></tr>\
			<else/>\
			<tr align=\"center\"><td>"+(i+1)+"</td><td nowrap=\"nowrap\">非叶子类目</td><td nowrap=\"nowrap\">已存在，不采集</td><td align=\"left\">"+val2+"</td></tr>\
			{/if}"	
			if(!isleaf){this.obj.TYPE.push(fromID);}			
		}
		Tool.ajax.a01(html,1,this.a05,this)
	},
  a05:function(t)
	{
		let p1=Math.ceil(1/this.obj.TYPE.length*100)
		$("#table").html('\
		<div class="Tul thead"><a href="javascript:Tool.main()" class="arrow_back"></a>正在采集类目...</div>\
		<ul class="Tul tr"><li class="w100 right">账号进度：</li><li class="w500" id="A1"><div class="progress"><span style="width:'+p1+'%;"><span>'+p1+'%</span></span></div></li><li id="A2">1/'+this.obj.TYPE.length+' (个)</li></ul>\
		<table class="tb"><tr align="center"><td nowrap="nowrap">编号</td><td nowrap="nowrap">消息类型</td><td nowrap="nowrap">返回结果</td><td align="left">执行SQL语句</td></tr>'+t+'</table>')
		this.obj.TYPE.shift();
		this.a03();
	}
}
fun.a01();
/*
	token:"",API:{},GlobalI1:0,GlobalI2:1,NowTime:new Date(),TYPE:Object(),url:obj.url,
	a10:function(txt,list)
	{
		this.getHTML(list.list.length+list.leaf.length+this.GlobalI1)
		if(txt.indexOf("出错")==-1)
		{this.a06();}
		else{document.write("采集出错，请与管理员联系,002:"+txt);}
	},
	a11:function(t)
	{
		eval("this.TYPE="+t)
		this.GlobalI1=this.TYPE.GlobalI1
		this.GlobalI1++;this.GlobalI2++;
		if(this.TYPE.list.length==0){this.a12(this.TYPE);}else{this.a07(this.TYPE.list[0],this.TYPE)}
	},
	a12:function(obj2)
	{
		if(obj2.leaf.length==0)
		{$(".table2").html("<tr><td colspan=\"4\">全部采集完成</td></tr>");}
		else
		{this.a13(obj2.leaf[0],obj2);}
	},
}
fun.a01();
let t;setTimeout("location.reload();",1000*60*30);//30分钟刷新一次

*/
