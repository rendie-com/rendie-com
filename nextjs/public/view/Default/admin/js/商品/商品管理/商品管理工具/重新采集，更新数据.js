'use strict';
alert()
if (!window.JSON) {
  window.JSON = {
    parse: function(sJSON) { return eval('(' + sJSON + ')'); },
    stringify: (function () {
      let toString = Object.prototype.toString;
      let isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
      let escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
      let escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
      let escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
      return function stringify(value) {
        if (value == null) {
          return 'null';
        } else if (typeof value === 'number') {
          return isFinite(value) ? value.toString() : 'null';
        } else if (typeof value === 'boolean') {
          return value.toString();
        } else if (typeof value === 'object') {
          if (typeof value.toJSON === 'function') {
            return stringify(value.toJSON());
          } else if (isArray(value)) {
            let res = '[';
            for (let i = 0; i < value.length; i++)
              res += (i ? ', ' : '') + stringify(value[i]);
            return res + ']';
          } else if (toString.call(value) === '[object Object]') {
            let tmp = [];
            for (let k in value) {
              if (value.hasOwnProperty(k))
                tmp.push(stringify(k) + ': ' + stringify(value[k]));
            }
            return '{' + tmp.join(', ') + '}';
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
      };
    })()
  };
}
////////////////////////////////////////////////////////////////////////////////////////



if(typeof(window.external.isBool)!="undefined"){if(window.external.getisinit()){window.external.init();}}
//obj.t=setTimeout("location.reload();",1000*60*60);//20秒刷新一次
$(function(){
  obj.size=1;obj.Pro=Object();obj.NowTime = new Date();obj.Pro.A1=0;obj.Pro.B1=0;
  alert("aaaaaaaaaaaaaaaaaaa")
  //if(obj.arr4=="true"){productID();}else{start(true);}
})
function productID()
{
  let html='<r:product page=5 size=1 where=" where @.ID='+obj.arr5+'">1&<:id/>=<:fromurl/></r:product>'  
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){pagehtml(txt);}});
}
function start(bool)
{
	let html=""
  //let html='<@count/><r:product page=5 size=1 with="with area as(select @.fromID,:isleaf from @.type where @.fromID=\'1524\' and @.from=\'aliexpress\' union all select a.@.fromID,a.:isleaf from @.type a join area b on a.@.upid=b.@.fromid and a.@.from=\'aliexpress\')" where=" a where a.@.datetime<\'2016/9/1\' and a.@.hide=0 and a.@.from=\'aliexpress\' and exists(select b.@.fromID from area b where a.@.type=b.@.fromID and b.@.isleaf=1)">&<:a.:id/>=<:a.:fromurl/></r:product>'  //按类目来
	if(obj.arr4=="time")
	{
    //html=(bool?'<@count/>':'')+'<r:product page=5 size='+obj.size+' where=" where @.from=\'aliexpress\' and @.hide=0 and @.datetime<\'2017/6/16 12:17:00\'">&<:id/>=<:fromurl/></r:product>'//按时间来
    html='<@count/><r:product page=5 size=1 where=" where @.id=92065">&<:id/>=https://www.aliexpress.com/item/Super-Hero-Theme-Pop-Sockets-Phone-Portable-Holder-with-Reusable-Silicone-Glue-and-Key-Strap-2017/32847510294.html</r:product>'  
	}
	else if(obj.arr4=="err")
	{
    //html='<@count/><r:product page=5 size=1 where=" where @.shopname =\'\' and @.from=\'aliexpress\' and @.hide=0">&<:id/>=<:fromurl/></r:product>'  
	}
	else
	{
    html=(bool?'<@count/>':'')+'<r:product page=5 size='+obj.size+' where=" a Inner Join @.dhuppro b on b.@.proid=a.:id where b.rd_upuserid='+obj.arr4+' and a.@.datetime<\'2017/6/16 12:17:00\'">&<:a.:id/>=<:a.:fromurl/></r:product>'//按上传店铺来
	}
  $.ajax({type:"POST",url:"exe/"+obj.arr4+"/"+obj.arr5+"/"+obj.arr6+".html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){pagehtml(txt);}});
}
function pagehtml(txt){
  let html="",items,arr=txt.split("&")
  if("0"!=arr[0])
  {
    if(arr[0]){obj.Pro.A2=arr[0];}		
		obj.sql=[arr.length]
		for(let i=1;i<arr.length;i++)
		{
			items=arr[i].split("=")
			html+='<tr><td>'+i+'</td><td id="fromurl'+i+'" align="left"><progress style="width:100px" value="0" max="5"/> 0/5</td><td><a href="'+items[1]+'" target="_blank">'+items[1]+'</a></td></tr>'
			AjaxItems(items[1],i);
		}
		html='<tr><td class="label" width="100">总进度：</td><td id="A"><progress style="width:80%" value="'+obj.Pro.A1+'" max="'+obj.Pro.A2+'"/> '+obj.Pro.A1+'/'+obj.Pro.A2+'</td></tr>\
		<tr><td class="label">当页进度：</td><td id="B"><progress style="width:80%" value="0" max="'+obj.size+'"/> 0/'+obj.size+'</td></tr>\
		<tr><td class="label">统计：</td><td id="state"></td></tr><tr><td class="label">细节：</td><td><table class="tb2" width="100%"><tr><th width="30">编号</th><th width="130" >进度</th><th align="left">来源地址</th></tr>'+html+'</table></td></tr>'
  }
  else
  {
	html='<tr><td>采集完成</td></tr>'
  }
  $("#gather").html(html);
}
function ProductAttr(htmlcode,I,attrStr){
	$("#fromurl"+I).html('<progress style="width:100px" value="2" max="5"/> 2/5');
	let val,fromidArr,skuattr,A,B,valName,arrV,valN,AN,BN;
	fromidArr=StrSplits(attrStr,'fromid="','"')
	skuattr=obj.code.c[obj.code.mode].skuattr
	//document.writeln("<pre>"+JSON.stringify(fromidArr.length,null,2)+"-----------------------</pre>")
	for(let i=0;i<fromidArr.length;i++)//
	{
		if(skuattr[i])
		{
			A=(skuattr[i].A).replace("{$ID}",fromidArr[i]);B=(skuattr[i].B).replace("{$ID}",fromidArr[i]);
			arrV=regSplits(htmlcode,A,B);val=arrV.join("[分隔符]")
			A=(skuattr[i].NameA).replace("{$ID}",fromidArr[i]);
			B=(skuattr[i].NameB).replace("{$ID}",fromidArr[i]);
			for(let j=0;j<arrV.length;j++)
			{
			  AN=A.replace("{$VID}",arrV[j]);BN=B.replace("{$VID}",arrV[j]);				  
				  valN=regSlice(htmlcode,AN,BN);if(!valN)valN="<r:attributesValues where=\" where @.fromid="+arrV[j]+"\" size=1>[attributesValues:enname]</r:attributesValues>";
			  if(j==0){valName=valN}else{valName+="[分隔符]"+valN}
			}
		}
		else{val="";valName="";}
		if(val!="")
		{attrStr=attrStr.replace("{attr"+(i+1)+"AB}",val+"[二维数组]"+valName);}
		else
		{attrStr=attrStr.replace("{attr"+(i+1)+"AB}","");}
	}
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),I:I,htmlcode:htmlcode,data:{data:encodeURIComponent(attrStr)},success:function(txt){
		let skuhtml=CommodityAttribute(obj.code.c[obj.code.mode],this.htmlcode,txt)//商品属性
		obj.sql[this.I].aeopAeProductSKUs=skuhtml[1];
		//document.writeln("<pre>"+JSON.stringify(txt,null,2)+"-----------------------</pre>")
		let sku=aeopAeProductSKUs(skuhtml[1]);
		obj.sql[this.I].MinPrice=sku[0]
		obj.sql[this.I].MaxPrice=sku[1]
		obj.sql[this.I].price=sku[2]
		let des=regSlice(htmlcode,obj.code.c[obj.code.mode].desA,obj.code.c[obj.code.mode].desB)
		FunisEdit(des,this.I)
	}});
}
function FunisEdit(des,I){
	let str='<if "Fun(Db(select count(1) as total from @.product where @.from=\'aliexpress\' and @.name=\''+obj.sql[I].name.replace(/\'/ig,"''")+'\' and @.pic1=\''+obj.sql[I].pic1+'\' and @.MinPrice='+obj.sql[I].MinPrice+' and @.MaxPrice='+obj.sql[I].MaxPrice+' and @.fromurl=\''+obj.sql[I].fromurl+'\',count))"=="0"><:Db(update @.product set @.isEdit=1 where @.fromurl=\''+obj.sql[I].fromurl+'\' and @.from=\'aliexpress\',count)/>有改变<else/>没改变</if>'
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),I:I,des:des,data:{data:encodeURIComponent(str)},success:function(t){
				if(t.indexOf("错误")==-1){returnDES(this.des,this.I)}else{alert(t);}																																																							 
	}});
}
function aeopAeProductSKUs(des)
{
	let minPrice,maxPrice,Price=0
	try{ 
		eval("let obj2="+des)
		if(obj2[0])
		{
			for(let i=0;i<obj2.length;i++)
			{
				if(i==0)
				{
					minPrice=parseFloat(obj2[0].skuPrice)
					maxPrice=parseFloat(obj2[0].skuPrice)
				}
				else
				{
					if(obj2[i].skuPrice<minPrice)minPrice=parseFloat(obj2[i].skuPrice)
					if(obj2[i].skuPrice>maxPrice)maxPrice=parseFloat(obj2[i].skuPrice)
				}
				Price+=parseFloat(obj2[i].skuPrice)
			}
			return [minPrice,maxPrice,(Price/obj2.length).toFixed(2)];		
		}else{return [0,0,0];}
	 }catch(e){return [0,0,0];}
}
function ProductTypeAttr(article,I){
	//type  商品分类
	let str='<table>\
	<r:attributesBind where=" where @.typeID=\''+obj.sql[I].type+'\' and @.sku=1 and @.from=\'aliexpress\' order by @.sku desc,@.id asc" size=50>\
	<r:attributes where=" where @.fromid=[attributesBind:fromid] and @.from=\'aliexpress\'" size=1>\
	<tr><td fromid="[attributesBind:fromid]" customizedPic="[attributesBind:customizedPic]" sku="True" align="right">[attributes:name]</td><td>{attr[attributesBind:i]AB}</td></tr>\
	</r:attributes>\
	</r:attributesBind>\
	</table>'
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape(str)},article:article,I:I,success:function(str){ProductAttr(this.article,this.I,str);}});
}

function articlehtml(article,fromurl,I)
{
  obj.code.mode=0;
  obj.sql[I]=Object()
  obj.sql[I].fromurl=fromurl
  let bool404=true,arr404=obj.code.c[obj.code.mode].err404.split("\n")
  for(let i=0;i<arr404.length;i++){if(article.indexOf(arr404[i])!=-1){bool404=false;break;}}
  if(bool404)
  {
		obj.sql[I].name=regSlice(article,obj.code.c[obj.code.mode].nameA,obj.code.c[obj.code.mode].nameB)
		if(obj.sql[I].name)
		{
			obj.sql[I].SaleNum=regSlice(article,obj.code.c[obj.code.mode].SaleNumA,obj.code.c[obj.code.mode].SaleNumB)//销量
			if(!obj.sql[I].SaleNum)obj.sql[I].SaleNum=0
			if(isNaN(obj.sql[I].SaleNum))obj.sql[I].SaleNum=0
			let pichtml=MagnifyingChart(obj.code.c[obj.code.mode],article)//放大镜图
			obj.sql[I].isImageDynamic=pichtml[0]
			obj.sql[I].pic=pichtml[1].replace("_640x640.jpg","").replace("_640x640.jpeg","")
			let arr=obj.sql[I].pic.split(";");
			if(arr.length>1){obj.sql[I].pic1=arr[1];}else{obj.sql[I].pic1=arr[0];}
			obj.sql[I].fromID=regSlice(article,obj.code.c[obj.code.mode].productIDA,obj.code.c[obj.code.mode].productIDB)
			obj.sql[I].type=regSlice(article,obj.code.c[obj.code.mode].typeA,obj.code.c[obj.code.mode].typeB);
			let Propertys=CustomAttributeGroup(obj.code.c[obj.code.mode],article)//自定义属性组
			obj.sql[I].aeopAeProductPropertys=Propertys[1]
			obj.sql[I].unit=regSlice(article,obj.code.c[obj.code.mode].unitA,obj.code.c[obj.code.mode].unitB)
			if(obj.sql[I].unit.indexOf("/")>0)
			{
			let unitArr=[];obj.sql[I].lotNum=obj.sql[I].unit;
			obj.sql[I].unit=obj.sql[I].unit.split("/")[0];
			unitArr=obj.sql[I].unit.split(" ")
			obj.sql[I].unit=unitArr[unitArr.length-1]
			obj.sql[I].lotNum=StrSlice(obj.sql[I].lotNum,"("," ");//每包件数
			}
			else{obj.sql[I].lotNum=1}
			let arrNameA=obj.code.c[obj.code.mode].shopNameA.split("\n"),arrNameB=obj.code.c[obj.code.mode].shopNameB.split("\n")
			for(let i=0;i<arrNameA.length;i++)
			{
				obj.sql[I].shopName=regSlice(article,arrNameA[i],arrNameB[i])
			  if(obj.sql[I].shopName) break;
			}
			if(!obj.sql[I].shopName)obj.sql[I].shopName=""
			obj.sql[I].shopName=obj.sql[I].shopName.replace(/(\n*)|(\r*)/ig,"").replace(/(^\s*)|(\s*$)/ig,"")
			if(obj.sql[I].shopName.indexOf("&#39;")!=-1){obj.sql[I].shopName=obj.sql[I].shopName.replace("&#39;","'")}//转义单引号
			if(obj.sql[I].shopName.indexOf("&amp;")!=-1){obj.sql[I].shopName=obj.sql[I].shopName.replace("&amp;","&")}//转义 & 符号
			let arrUrlA=obj.code.c[obj.code.mode].shopUrlA.split("\n"),arrUrlB=obj.code.c[obj.code.mode].shopUrlB.split("\n")
			for(let i=0;i<arrUrlA.length;i++)
			{
				obj.sql[I].shopUrl=regSlice(article,arrUrlA[i],arrUrlB[i])
			if(obj.sql[I].shopUrl) break;
			}
			obj.sql[I].keys=regSlice(article,obj.code.c[obj.code.mode].keysA,obj.code.c[obj.code.mode].keysB);
			if(!obj.sql[I].keys){obj.sql[I].keys=""}else{if(obj.sql[I].keys.length>255){obj.sql[I].keys=obj.sql[I].keys.split(" ")[0]}}
			obj.sql[I].keys1=regSlice(article,obj.code.c[obj.code.mode].keys1A,obj.code.c[obj.code.mode].keys1B);
			if(!obj.sql[I].keys1){obj.sql[I].keys1=""}else{if(obj.sql[I].keys1.length>255){obj.sql[I].keys1=obj.sql[I].keys1.split(" ")[0]}}
			obj.sql[I].keys2=regSlice(article,obj.code.c[obj.code.mode].keys2A,obj.code.c[obj.code.mode].keys2B);
			if(!obj.sql[I].keys2){obj.sql[I].keys2=""}else{if(obj.sql[I].keys2.length>255){obj.sql[I].keys2=obj.sql[I].keys2.split(" ")[0]}}
			obj.sql[I].weight=regSlice(article,obj.code.c[obj.code.mode].weightA,obj.code.c[obj.code.mode].weightB)
			obj.sql[I].length=regSlice(article,obj.code.c[obj.code.mode].lengthA,obj.code.c[obj.code.mode].lengthB)
			obj.sql[I].width=regSlice(article,obj.code.c[obj.code.mode].widthA,obj.code.c[obj.code.mode].widthB)
			obj.sql[I].height=regSlice(article,obj.code.c[obj.code.mode].widthA,obj.code.c[obj.code.mode].widthB)
			obj.sql[I].deliveryTime=regSlice(article,obj.code.c[obj.code.mode].deliveryTimeA,obj.code.c[obj.code.mode].deliveryTimeB)
			if(!obj.sql[I].deliveryTime)obj.sql[I].deliveryTime=0
			ProductTypeAttr(article,I);
		}
		else if(article.indexOf("title>SecurityMatrix</title>")!=-1)
		{
			alert("请输入验证码")

		}	
		else
		{
			$("#fromurl1").html('<textarea rows="10" cols=100 id="viewsource">'+article+'</textarea><br/><a href="javascript:" onclick="submitarticlehtml(\''+fromurl+'\','+I+')" class="button left">提交源码</a><a href="'+fromurl+'" target="_blank" class="button middle">查看源码</a><hr/>获取内容不正确.<hr>view-source:'+fromurl+"")
			obj.t=setTimeout("location.reload();",3000);//5分钟刷新一次
		}	
  }
  else
  {$("#fromurl"+I).html('<progress style="width:80%" value="100" max="100"/> 404错误');updateTempproduct(I,false);}
}
function submitarticlehtml(url,I)
{
  let str=$("#viewsource").val()
  $("#fromurl1").html('<progress style="width:80%" value="0" max="1"/> 正在提交');
  articlehtml(str,url,I)
}
function updateTempproduct(I,bool)
{
  obj.Pro.A1++;obj.Pro.B1++;getHTML(I,obj.Pro.A1)
  if(obj.arr4=="true")
  {
		alert()
		//updateAll(obj.sql[I])
	}
  else
	{
		updateAll(I,bool)
	}  
}
function AjaxItems(url,I)
{
  if(typeof(window.external.isBool)=="undefined")//是否用软件
  {
	  $.ajax({
		  type: "POST", url: "exe.html?" + Math.random(), data: { data: encodeURIComponent("<.GetHttpWebRequest(" + url + "," + obj.code.a[obj.code.mode].charset + ")/>") },fromurl:url,I:I,success:function(str){
	  $("#fromurl"+this.I).html('<progress style="width:100px" value="1" max="5"/> 1/5');
	  articlehtml(str,this.fromurl,this.I);
	}});
  }
  else
	{
		if(window.external.ieIsHTML("main2","html|"))//如果第二个窗口打开了，清空
			{
				window.external.ieSetHTML("main2","html|","")
				window.external.WebBrowserUrl('main2',url);
			}
			else{window.external.Web("newWeb",url);}
			obj.t=setTimeout('win_01("'+url+'");',500);
		//window.external.GetWebRequest(url);setTimeout('GetHtml001("'+url+'","'+I+'");',300);
	}
}
function win_01(URL)
{
	if(window.external.ieIsHTML("main2","body|div"))//是否加载完成
	{
		  let str=window.external.ieGetHTML("main2","html|div")
			if(str.indexOf("Join free now!")!=-1)
		  {
			  alert("请登陆")
			}
			else{
				$("#fromurl1").html('<progress style="width:100px" value="1" max="5"/> 1/5');
	       articlehtml(str,URL,1);
				//subList(str,URL);
				
				}
	}else{obj.t=setTimeout('win_01("'+URL+'");',500);}
}
function returnDES(des,I){
  if(obj.code.c[obj.code.mode].desmode=="1")
  {
	let DesLink=(obj.code.c[obj.code.mode].DesLink).replace(/\{\$ID\}/,des);
	$.ajax({type:"POST",url:"exe.html?"+Math.random(),I:I,data:{data:encodeURIComponent("<:GetHttpWebRequest("+DesLink+","+obj.code.a[obj.code.mode].charset+")/>")},success:function(txt2){DesLinkAjax(txt2,this.I);}});}
}
function DesLinkAjaxFor(url,I)
{
  let str=window.external.HTML
  if(str)
  {
	DesLinkAjax(str,I);
  }else{obj.t=setTimeout('DesLinkAjaxFor("'+url+'","'+I+'");',300);}
  
}
function DesLinkAjax(des,I)
{
	if(des.indexOf("错误")!=-1)
	{
		$("#fromurl"+I).html("3秒后自动刷新。")
		obj.t=setTimeout("location.reload();",1000*3);//3秒刷新一次
	}
	else
	{
		$("#fromurl"+I).html('<progress style="width:100px" value="3" max="5"/> 3/5');
		let result,ret=[],shield
		des=regSlice(des,obj.code.c[obj.code.mode].des2A,obj.code.c[obj.code.mode].des2B)
		if(des)
		{
			des=des.replace(/(<a [\S\s]*?<\/a>)/ig,"");
			shield=obj.code.c[obj.code.mode].shieldA+regSlice(des,obj.code.c[obj.code.mode].shieldA,obj.code.c[obj.code.mode].shieldB)+obj.code.c[obj.code.mode].shieldB
			des=des.replace(shield,"");	
			obj.sql[I].des=des;
			updateTempproduct(I,true);
		}else{location.reload();}
	}
}
function updateAll(I,bool){ 
  let props2="",str,sql=obj.sql[I]
  if(bool)
  {
		sql.from='aliexpress'
		sql.datetime='getdate()'
		sql.isLock=0
		sql.err=''
		for (let p in sql){
	  if("|MinPrice|MaxPrice|price|datetime|isImageDynamic|weight|length|width|height|deliveryTime|fromID|SaleNum|isLock|hide|".indexOf("|"+p+"|")==-1)
	  {
		  
		  if(sql[p])
		  {
			  sql[p]=(sql[p]+"").replace(/\'/ig,"''")
		  }
		  props2+=",:"+p+"='"+sql[p]+"'";
	  }else{props2+=",:"+p+"="+sql[p];}
	  }
	  str="update @.product set "+props2.substr(1)+" where @.from='aliexpress' and @.fromurl='"+sql.fromurl+"'"
  }
  else
  {
    str='update @.product set @.hide=19,:datetime=getdate(),:err=\'该商品404错误\' where @.from=\'aliexpress\' and @.fromurl=\''+sql.fromurl+'\''
  }
	str='<r: tag="sql">'+str+'</r:>'
	//document.write(str)
  $.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:encodeURIComponent(str)},I:I,success:function(t){
	  $("#fromurl"+this.I).html('<progress style="width:100px" value="5" max="5"/> 5/5');
		if(t.indexOf("错误")!=-1){$("#fromurl"+this.I).text(t);}
		else
		{
			$("#B").html('<progress style="width:80%;" value="'+obj.Pro.B1+'" max="'+obj.size+'"/> '+obj.Pro.B1+'/'+obj.size)
		  if(obj.size==obj.Pro.B1){
				obj.Pro.B1=0;obj.t=setTimeout("start(false);",100);
				}
		}		
  }});
}
function getHTML(I,num){
  $("#A").html('<progress style="width:80%;" value="'+num+'" max="'+obj.Pro.A2+'"/> '+num+'/'+obj.Pro.A2)
  obj.EndTime= new Date()
  let t,d,h,m,s,Implemented,age,Surplus
  t=obj.EndTime.getTime()-obj.NowTime.getTime();
  d=Math.floor(t/1000/60/60/24);h=Math.floor(t/1000/60/60%24);
  m=Math.floor(t/1000/60%60);
  s=Math.floor(t/1000%60);
  Implemented='<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒'
  age=t/1000/num;
  Surplus=obj.Pro.A2-num;
  d=Math.floor(Surplus*age/60/60/24);
  h=Math.floor(Surplus*age/60/60%24);
  m=Math.floor(Surplus*age/60%60);
  s=Math.floor(Surplus*age%60);
  $("#state").html('已执行'+Implemented+'，平均<b>'+age.toFixed(2)+'</b>秒/条，剩<b>'+Surplus+'</b>条，大约<b>'+d+'</b>天<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒完成。')
	$("#fromurl"+I).html('<progress style="width:100px" value="4" max="5"/> 4/5');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
