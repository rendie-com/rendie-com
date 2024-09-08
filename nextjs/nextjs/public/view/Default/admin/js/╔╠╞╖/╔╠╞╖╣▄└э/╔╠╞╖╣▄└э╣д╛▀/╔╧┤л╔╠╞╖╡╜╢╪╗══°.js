'use strict';
//setTimeout("location.reload();",1000*60*3);//3分钟刷新一次
$(function(){
	obj.token=getCookie("65756756756756_"+obj.arr5)
	if(obj.token=="")
	{
		let URL="<r:APIaccount size=1 where=\" where @.from='dhgate' and @.id="+obj.arr5+"\">https://secure.dhgate.com/dop/oauth2/access_token?grant_type=password&username=[APIaccount:UserName]&password=[APIaccount:password]&client_id=<.Config(dhgate_client_id)/>&client_secret={r:Config(dhgate_client_secret)/>&scope=basic</r:APIaccount>"
		$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<:WebRequestGet("+URL+")/>")},success:function(txt){
			if(txt.indexOf("access_token")!=-1)
			{}
			else{alert("获取令牌失败。")}
		}});
	}
	else
	{pagelist();}
});
function showProducthtml(objPro)
{
	let html='<tr class="thead"><th colspan="2"><span id="dhgatetype"></span>正在上传到【敦煌网】...</th></tr>\
		<tr><td align="right">帮助说明：</td><td align="left"><a href="http://developer.dhgate.com/apiList.html#008" target="_blank">接口文档地址帮助</a></td></tr>\
		<tr><td align="right">商品来源地址：</td><td align="left"><a href="'+obj.objPro.fromurl+'" target="_blank">'+obj.objPro.fromurl+'</a></td></tr>\
		<tr><td align="right">剩余上传数量：</td><td>'+obj.objPro.recordcount+'</td></tr>\
		<tr><td align="right">上传状态：</td><td id="UploadStatus"></td></tr>\
		<tr>\
			<td align="right" nowrap="nowrap">绑定前【速卖通类目】：</td>\
			<td>'+obj.objPro.typename+'<input type="hidden" id="type" value="'+obj.objPro.type+'"/></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">绑定后【敦煌网类目】：</td>\
			<td><span id="selectcheckboxtype">'+obj.objPro.typebindname+'</span><input type="button" class="pn" value="选择绑定分类"" onClick="producttype();$(\'#producttype\').show();"><input type="hidden" id="typebind" value="'+obj.objPro.typebind+'"/></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">自定义规格列表：</td>\
			<td>'+obj.objPro.itemSpecSelfDefList+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品折扣区间：</td>\
			<td>'+obj.objPro.itemWholesaleRangeList+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">【敦煌网】系统属性：</td>\
			<td>'+attributesType(obj.objPro.typebind)+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">属性绑定：<br/>【敦煌网】与【速卖通】</td>\
			<td id="dhgateAndAliexpress"></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">属性价格绑定：<br/>【敦煌网】与【速卖通】</td>\
			<td id="ProSkuList"></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">【敦煌网】属性列表：</td>\
			<td id="aliexpressToDhgateAttr"></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品SKU列表：<br/>价格=原价*'+(obj.arr8)+'</td>\
			<td id="ItemSkuList"></td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品运费模板id：</td>\
			<td>'+obj.objPro.shippingModelId+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品所属产品组id：</td>\
			<td>'+obj.arr6+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品有效期：</td>\
			<td>'+obj.objPro.vaildDay+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品图片列表：</td>\
			<td>'+obj.objPro.itemImgList+'</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品销售属性设置：</td>\
			<td>\
				<table class="tb2">\
				<tr><th style="text-align:right">备货期：</th><th style="text-align:left;">9</th></tr>\
				<tr><td align="right">买家一次最大购买量：</td><td>10000</td></tr>\
				<tr><td align="right">设置价格类型：</td><td>1 （1分别设置价格，2 统一设置价格；）</td></tr>\
				</table>\
			</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品包装信息：</td>\
			<td>\
				<table class="tb2">\
				<tr><th style="text-align:right">产品包装后重量：</th><th style="text-align:left;">'+obj.objPro.weight+' KG</th></tr>\
				<tr><td align="right">产品包装后高度：</td><td>'+obj.objPro.height+' cm</td></tr>\
				<tr><td align="right">产品包装后长度：</td><td>'+obj.objPro.length+' cm</td></tr>\
				<tr><td align="right">产品包装后宽度：</td><td>'+obj.objPro.width+' cm</td></tr>\
				<tr><td align="right">按包卖时每包产品数量：</td><td>'+obj.objPro.lotNum+'</td></tr>\
				<tr><td align="right">产品销售单位ID：</td><td>'+obj.objPro.measureId+'</td></tr>\
				</table>\
			</td>\
		</tr>\
		<tr>\
			<td align="right" nowrap="nowrap">产品基础信息：</td>\
			<td>\
				<table class="tb2">\
				<tr><th style="text-align:right">产品名称：</th><th style="text-align:left;">'+obj.objPro.name+'</th></tr>\
				<tr><td align="right">搜索关键字：</td><td>'+obj.objPro.keys+'</td></tr>\
				<tr><td align="right">搜索关键字一：</td><td>'+obj.objPro.keys1+'</td></tr>\
				<tr><td align="right">搜索关键字二：</td><td>'+obj.objPro.keys2+'</td></tr>\
				<tr><td align="right" nowrap="nowrap">产品简短描述：</td><td>'+obj.objPro.name+" "+obj.objPro.keys+" "+obj.objPro.keys1+" "+obj.objPro.keys2+'</td></tr>\
				<tr><td align="right" nowrap="nowrap">产品视频地址：</td><td></td></tr>\
				<tr><td align="right" nowrap="nowrap">详情内容描述：</td><td>'+obj.objPro.des+'</td></tr>\
				</table>\
			</td>\
		</tr>'
		$("#dhorderget").html(html)
}
function Upload_images()//选上传图片
{
	let ret=[],reg=/<img[\s\S]+?src=[\"']?([^\"']{4,}?)[\"'][\S\s]*?[\/]?>/ig
  while(tem=reg.exec(obj.objPro.des))
	{
	  ret[ret.length]=tem[1];
	  if(ret.length==7)break;
  }
	if(ret.length==0)
	{uploadnext(obj.objPro.id,"");}
	else
	{
		for(let i=0;i<ret.length;i++)
		{
			ret[i]='\
			<if "Fun(Db(select top 1 :id from @.images where @.url=\''+ret[i]+'\' and @.from=\'dhgate\',count))"=="">\
				[true,"'+ret[i]+'",{Fun(WebClientPost(http://api.dhgate.com/dop/router?method=dh.album.img.upload&v=2.1&funType=albu&imgName='+(i+1)+'.jpg&imgBase64=Fun(URLtoBase64('+(ret[i])+'))&timestamp='+(new Date).getTime()+'&access_token='+obj.token+'))}]\
			<else/>\
				<r:images where=" where @.url=\''+ret[i]+'\'" size=1>\
					[false,"",{"imgUrl":"[images:fromurl]","imgMd5":"[images:fromMd5]"}]\
				</r:images>\
			</if>'
		}
		$.ajax(obj.mode+"exe.html?"+Math.random(),{type:'POST',data:{data:escape("["+ret.join(",")+"]")},success:function(img){dhalbumimgupload(img);}});
	}
}
function dhalbumimgupload(img){
	let sqltxt="",dharr=[]
	eval("let imgObj="+img);
	for(let i=0;i<imgObj.length;i++)
	{
		dharr[i]=Object();
		if(i==0){dharr[i].type=3;}else{dharr[i].type=1;}
		dharr[i].imgMd5=imgObj[i][2].imgMd5;
		dharr[i].imgUrl=imgObj[i][2].imgUrl;
		if(imgObj[i][0])
		{
			sqltxt+='<r: tag="sql">insert into @.images(:url,:from,:fromurl,:frommd5)values(\''+imgObj[i][1]+'\',\'dhgate\',\''+imgObj[i][2].imgUrl+'\',\''+imgObj[i][2].imgMd5+'\')</r:>操作成功'
		}
	}
	obj.objPro.itemImgList=JSON.stringify(dharr)
	$("#dhorderget").html("<tr align=\"center\"><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>正在上传【产品】，请稍等。。。</td></tr>");
	if(sqltxt)
	{
		$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(sqltxt)},success:function(){uploadall();}});
	}
	else{uploadall();}
}
function itemBase(obj)
{
	obj.itemBase=Object()
	obj.itemBase.htmlContent=obj.des;
	if((obj.name).length>140)obj.name=obj.name.substr(1,140)
	obj.itemBase.itemName=obj.name;
	if((obj.keys).length>130)obj.keys=obj.keys.substr(1,130)//产品关键词不为空的时候不能超过130个字符！
	obj.itemBase.keyWord1=obj.keys
	if((obj.keys1).length>130)obj.keys1=obj.keys1.substr(1,130)//产品关键词不为空的时候不能超过130个字符！
	obj.itemBase.keyWord2=obj.keys1;
	if((obj.keys2).length>130)obj.keys2=obj.keys2.substr(1,130)//产品关键词不为空的时候不能超过130个字符！
	obj.itemBase.keyWord3=obj.keys2
	obj.itemBase.shortDesc=obj.name+" "+obj.keys+" "+obj.keys1+" "+obj.keys2
	obj.itemBase.videoUrl=""
	return JSON.stringify(obj.itemBase)
}
function itemPackage(obj){
	obj.itemPackage=Object()
	obj.itemPackage.grossWeight=obj.weight
	obj.itemPackage.height=obj.height
	obj.itemPackage.length=obj.length
	obj.itemPackage.measureId=obj.measureId//单位
	obj.itemPackage.packingQuantity=1
	obj.itemPackage.width=obj.width
	return JSON.stringify(obj.itemPackage)
}
function Upload_dhgate(dhobj){//上传
	let URL,txt
	dhobj.itemGroupId=obj.arr6//产品组
	dhobj.catePubId=dhobj.typebind
	dhobj.itemSaleSetting='{"leadingTime":9,"maxSaleQty":10000,"priceConfigType":1}'
	dhobj.itemPackage=itemPackage(dhobj)
	dhobj.itemBase=itemBase(dhobj)
	URL="http://api.dhgate.com/dop/router?method=dh.item.add&itemSaleSetting="+dhobj.itemSaleSetting+"&itemBase="+dhobj.itemBase+"&itemWholesaleRangeList="+dhobj.itemWholesaleRangeList+"&itemWholesaleRangeList="+dhobj.itemWholesaleRangeList+"&itemSpecSelfDefList="+dhobj.itemSpecSelfDefList+"&itemSkuList="+dhobj.itemSkuList+"&itemPackage="+dhobj.itemPackage+"&itemImgList="+dhobj.itemImgList+"&itemAttrList="+dhobj.itemAttrList+"&siteId=EN&catePubId="+dhobj.catePubId+"&vaildDay="+dhobj.vaildDay+"&itemGroupId="+dhobj.itemGroupId+"&shippingModelId="+dhobj.shippingModelId+"&v=2.0&timestamp="+(new Date).getTime()+"&access_token="+obj.token
	txt = $.ajax({ type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + encodeURIComponent(URL) + ")/>") }, async: false }).responseText;
	if(txt.indexOf(":\"OK\"")!=-1||txt.indexOf("产品首图不能重复，请选择其他的图作为产品首图！")!=-1)
	{
		txt='<r: tag="sql">insert into @.dhUpPro(@.name,@.proid,:bool)values(\''+obj.arr5+'\','+dhobj.id+',1)</r:>上传成功'
		txt=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
		$("#UploadStatus").html(txt)
		setTimeout("location.href='"+obj.mode+obj.arr1+"/list/"+obj.arr3+"/"+obj.arr4+"/"+obj.arr5+"/"+obj.arr6+"/"+obj.arr7+"/"+obj.arr8+".html';",1000);
	}
	else if(txt.indexOf("不能再上传产品")!=-1)
	{
		alert(txt)
	}
	else if(txt.indexOf("请重新选择类目")!=-1)
	{
		alert(txt)
	}
	else
	{uploadnext(obj.objPro.id,txt);}
}
function uploadnext(id,txt){
	txt+='<r: tag="sql">insert into @.dhUpPro(@.name,@.proid,:bool)values(\''+(obj.arr5)+'\','+id+',0)</r:>'
	txt=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(txt)},async:false}).responseText;
	$("#UploadStatus").html(txt)
	setTimeout("location.href='"+mode+arr1+"/list/"+arr3+"/"+arr4+"/"+username+"/"+arr6+"/"+arr7+"/"+arr8+".html';",1000);
}
function uploadall(){
	obj.objPro.itemSpecSelfDefList='[]'
	obj.objPro.itemWholesaleRangeList='[]'
	obj.objPro.shippingModelId=obj.arr7
	obj.objPro.vaildDay="90"
	obj.objPro.measureId=dhbasemeasuresget(obj.objPro.unit)
	showProducthtml(obj.objPro)//显示结果
	if((obj.objPro.typebindname).replace(/\n|\t/ig,"").length==0){
		alert("请绑定分类再继续");
	}
	else
	{
		let arr=aliexpressattriden(obj.objPro.aeopAeProductSKUs)
		//document.writeln("<pre>"+JSON.stringify(arr,null,2)+"</pre>")
		var	dhgateattr=dhgate_enname()
		arr=ProSkuList(arr,dhgateattr)//显示SKU信息并从新返回arr数组（注：该属性已被绑定）
		dhgateAndAliexpress(obj.objPro.aeopAeProductPropertys,dhgateattr)//【敦煌网】与【速卖通】属性合并（自定义属性合并）
		obj.objPro.itemAttrList=aliexpressToDhgateAttr(arr,dhgateattr)//【敦煌网】属性列表
		obj.objPro.itemSkuList=funItemSkuList(arr,obj.objPro.proid)
		Upload_dhgate(obj.objPro)//上传
	}
}
function dhgate_enname()
{
	let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[]
	$("[name='dhgate_enname']").each(function(){
		arr1[arr1.length]=$(this).attr("enname");//英文名
		arr2[arr2.length]=$(this).html();//属性值英文名
		arr3[arr3.length]=$(this).attr("ShowType");//显示方式
		arr4[arr4.length]=$(this).attr("fromid");//英文名ID
		arr5[arr5.length]=$(this).attr("valid");//属性值英文名ID
		arr6[arr6.length]=$(this).attr("issku");//是否购买属性	
		arr7[arr7.length]=$(this).attr("required1");//是否必填	
	});
	return [arr1,arr2,arr3,arr4,arr5,arr6,arr7]
}
function dhgateAndAliexpress(obj,dhgateattr){//绑定操作
	obj=obj.replace(/\n|\t|\r/ig," ")//从速卖通过来的内容可能有这些东西出现
	eval("obj="+obj)
	let Repeat="",j=0,html="<table class=\"tb2\"><tr><th nowrap=\"nowrap\">编号</th><th nowrap=\"nowrap\">合并后属性名</th><th nowrap=\"nowrap\">合并后属性值名</th><th nowrap=\"nowrap\">敦煌网显示方式</th><th nowrap=\"nowrap\">敦煌网属性名ID</th><th>绑定敦煌网属性值ID</th><th>绑定敦煌网属性值名</th></tr>"
	for(let i=0;i<obj.length;i++)
	{
		if(Repeat.indexOf("|"+obj[i].attrName+"|")==-1)//去重复
		{
			j++
			html+="<tr align=\"center\"><td>"+j+"</td><td name=\"dhgate_attrbind\" val='"+j+"'>"+obj[i].attrName+"</td><td id=\"dhgate_attrValue_"+j+"\" class=\"AutoNewline\">"+obj[i].attrValue+"</td>"+dhgateforattr(dhgateattr,obj[i].attrName,obj[i].attrValue,j)+"</tr>"
		}
		Repeat+="|"+obj[i].attrName+"|"
	}
	html+="</table>"
	$("#dhgateAndAliexpress").html(html)
}
function dhgateforattr(arr,name,val,j){//遍历敦煌网（注：用for是因为可以反向查询）
	let ShowType="自定义",fromid="",valid="",valname="",alival
	for(let i=0;i<arr[0].length;i++)
	{
		name=name.replace(/[\/]/ig,",")//将"/"也考虑在内
		if(name.indexOf(arr[0][i])>-1||arr[0][i].indexOf(name)>-1)//速卖通属性名能找到敦煌网属性名或【反过来】(即属性名绑定操作)
		{
			ShowType=arr[2][i]
			ShowType=ShowType==1?"多选":(ShowType==2?"单选":ShowType)
			fromid=arr[3][i]
			alival=AliexpressAttrVal(val,arr[1][i],ShowType,arr[4][i])
			valname=alival[0]
			valid=alival[1]
			break;
		}
	}
	return "<td id='dhgate_ShowType_"+j+"'>"+ShowType+"</td><td id='dhgate_fromid_"+j+"'>"+fromid+"</td><td id='dhgate_valid_"+j+"' class=\"AutoNewline\">"+valid+"</td><td id='dhgate_valname_"+j+"' class=\"AutoNewline\">"+valname+"</td>"
}
function AliexpressAttrVal(Alival,DHval,ShowType,valid){
	let aliexpressArr=[],valI=0,DHval2="",DHval3=""
	aliexpressArr=Alival.split(",");
	for(let k=0;k<aliexpressArr.length;k++)//速卖能的属性值，敦煌网是否能找到
	{
		if(DHval.indexOf(aliexpressArr[k])!=-1)//只要敦煌网的属性值有速卖能的属性值就行(即属性值绑定操作)
		{
			valI=(DHval.split(aliexpressArr[k])[0]).split(",").length//取出绑定的属性值位置
			DHval2+=","+DHval.split(",")[valI-1]//属性值
			DHval3+=","+valid.split(",")[valI-1]//属性值
			if(ShowType=="单选"){break;}//只要是单选就跳出for(注：1：为多选)
		}
	}
	DHval2=DHval2.substr(1)
	DHval3=DHval3.substr(1)
	return [DHval2,DHval3]
}
function ProSkuList(Arr,dhgateattr)
{
	let html="",dhgateskuname=[],dhgateskuval=[],dhgateskuvalid=[],dhgatefromid=[],dhhtml="",valI,dhname,BindArr=[]
	for(let i=0;i<dhgateattr[5].length;i++)//取出【购物车属性】的所有内容用来与速卖通绑定
	{
		if(dhgateattr[5][i]=="True")
		{
			dhgateskuname[dhgateskuname.length]=dhgateattr[0][i]
			dhgateskuval[dhgateskuval.length]=dhgateattr[1][i]
			dhgateskuvalid[dhgateskuvalid.length]=dhgateattr[4][i]
			dhgatefromid[dhgatefromid.length]=dhgateattr[3][i]//来源ID【属性名ID】
		}
	}
	///////////////////先输出速卖通的购物车属性的价格//////////////////////////////////////
	for(let i=0;i<Arr.length;i++)//速卖通有多少行（Arr.length行数）
	{
		html+="<tr align=\"center\">"
		for(let j=0;j<Arr[i].length;j++)//有多少列
		{
			if(i==0)
			{
				html+="<th nowrap=\"nowrap\">"+(Arr[i][j]==""?"空":Arr[i][j])+"</th>";
			}
			else
			{
				html+="<td>"+(Arr[i][j]==""?"空":Arr[i][j])+"</td>";
			}
		}
		html+="</tr>"
	}
	//////////////////////////////////////////////////////////////////////////////////
	////////////////////////后输出敦煌网的购物车属性的价格//////////////////////////////////////////////////////////
	BindArr[0]=[]
	BindArr[0][0]="图片"
	BindArr[0][1]="价格"
	BindArr[0][2]="库存"
	for(let k=0;k<dhgateskuname.length;k++)
	{
		dhhtml+="<th>"+dhgateskuname[k]+"[ID]</th>";
		BindArr[0][k+3]=dhgateskuname[k]+"="+dhgatefromid[k]
	}
	dhhtml="<tr><th nowrap=\"nowrap\">图片</th><th nowrap=\"nowrap\">价格</th><th nowrap=\"nowrap\">库存</th>"+dhhtml+"</tr>"
	if(dhgateskuname.length==0)
	{
		BindArr[1]=[]
		dhhtml+="<tr align=\"center\">"
		for(let k=0;k<3;k++){dhhtml+="<td>"+Arr[1][k]+"</td>";BindArr[1][k]=Arr[1][k];}
		dhhtml+="</tr>"
	}
	else
	{
		if(Arr[0].length-3<=dhgateskuname.length)//俩边的【购物车属性】个数是否一样
		{
			for(let i=1;i<Arr.length;i++)//速卖通有多少行（即然一样，那行数一定相等）
			{
				BindArr[i]=[];
				dhhtml+="<tr align=\"center\">"
				for(let k=0;k<3;k++){dhhtml+="<td>"+Arr[i][k]+"</td>";BindArr[i][k]=Arr[i][k];}
				for(let k=0;k<dhgateskuname.length;k++)
				{
					let boolJ=0
					for(let j=3;j<Arr[i].length;j++)//敦煌的这个，你速卖通能不能绑
					{
						if(""!=Arr[0][j]&&((dhgateskuname[k]).indexOf(Arr[0][j])!=-1||(Arr[0][j]).indexOf(dhgateskuname[k])!=-1))
						{
							boolJ=j
						}
					}
					if(boolJ==0)//如果敦煌，速卖通绑定不上
					{dhhtml+="<td>"+dhgateskuval[k].split(",")[0]+"["+dhgateskuvalid[k].split(",")[0]+"]</td>";BindArr[i][k+3]=dhgateskuval[k].split(",")[0]+"="+dhgateskuvalid[k].split(",")[0];}
					else
					{
						if(dhgateskuname[k]=="Size")
						{
							valI=((","+dhgateskuval[k]+",").split(","+funSize(Arr[i][boolJ])+",")[0]).split(",").length
							dhname=(","+dhgateskuvalid[k]+",").split(",")[valI]
						}
						else
						{
							valI=((","+dhgateskuval[k]+",").split(","+Arr[i][boolJ]+",")[0]).split(",").length
							dhname=(","+dhgateskuvalid[k]+",").split(",")[valI]
						}
						dhhtml+="<td>"+Arr[i][boolJ]+"["+dhname+"]</td>";
						BindArr[i][k+3]=Arr[i][boolJ]+"="+dhname;
					}
				}
				dhhtml+="</tr>"
			}
		}
		else
		{
			alert("不一样")
		}
		
	}
	html="<table class=\"tb2\"><tr><th><table class=\"tb2\">"+html+"</table></th><th>绑定到敦煌网=&gt;</th><th><table class=\"tb2\">"+dhhtml+"</table></th></table>"
	$("#ProSkuList").html(html)
	return BindArr
}
function funSize(str)
{
	str=str.replace("XXXXX","5X")
	str=str.replace("XXXX","4X")
	str=str.replace("XXX","3X")
	str=str.replace("XX","2X")
	return str
}
function aliexpressattriden(obj)//速卖通性ID转英文
{
	let SKU,arr=[],html
	eval("obj="+obj)
	for(let i=0;i<obj.length;i++)//取出【速卖通】系统性属性值（注：与价格相关）
	{
		SKU=obj[i].aeopSKUProperty//有多少个属性值
		if(SKU.length!=0)//如果有多价格
		{
			if(i==0)
			{
				arr[0]=[];arr[1]=[];
				arr[0][0]="图片"	//表示第一行的第一列【图片】名
				arr[0][1]="价格"//第一行的第二列【价格】名
				arr[0][2]="库存"//第一行的第三列
				
				arr[1][0]=""//表示第二行的第一列【图片】值
				arr[1][1]=obj[i].skuPrice//第二列的第二行【价格】值
				arr[1][2]=obj[i].ipmSkuStock//第二行的第三列
				for(let j=0;j<SKU.length;j++)
				{
					if(SKU[j])//采集过来的值可能会不正常
					{
							arr[0][j+3]="<r:attributes where=双引号 where @.fromid="+SKU[j].skuPropertyId+" and @.from='aliexpress'双引号 size=1>[attributes:enname]</r:attributes>"//第一行的第n列
							arr[1][j+3]="<r:attributesValues where=双引号 where @.fromid="+SKU[j].propertyValueId+" and @.from='aliexpress'双引号 size=1>[attributesValues:enname]</r:attributesValues>"//第二行的第n列
							if(SKU[j].skuImage)
							{
								arr[1][0]='<a href="'+SKU[j].skuImage+'" target="_blank"><img src="'+SKU[j].skuImage+'" height="26" /></a>'//表示第二行的第一列【图片】值
							}
					}
				}
			}
			else
			{
				arr[i+1]=[]
				arr[i+1][0]=""
				arr[i+1][1]=obj[i].skuPrice
				arr[i+1][2]=obj[i].ipmSkuStock
				for(let j=0;j<SKU.length;j++)
				{
					if(SKU[j])//采集过来的值可能会不正常
					{
						arr[i+1][j+3]="<r:attributesValues where=双引号 where @.fromid="+SKU[j].propertyValueId+" and @.from='aliexpress'双引号 size=1>[attributesValues:enname]</r:attributesValues>"//第3行的第3+n列（为什么是3，是因为前三列分别为图片，价格，库存）
						//arr[i+1][j+3]=""//第3行的第3+n列（为什么是3，是因为前三列分别为图片，价格，库存）
						if(SKU[j].skuImage)
						{
							arr[i+1][0]='<a href="'+SKU[j].skuImage+'" target="_blank"><img src="'+SKU[j].skuImage+'" height="26" /></a>'//表示第二行的第一列【图片】值
							//arr[i+1][0]=SKU[j].skuImage//表示第二行的第一列【图片】值
						}
					}
				}			
			}
		}
		else//那就是单个价格了
		{
			arr[0]=[];arr[0][0]="图片"	//表示第一行的第一列【图片】名
			arr[1]=[];arr[1][0]=""		//表示第二行的第一列【图片】值
								arr[0][1]="价格"//第一行的第二列【价格】名
								arr[1][1]=obj[i].skuPrice//第二列的第二行【价格】值
								arr[0][2]="库存"
								arr[1][2]=obj[i].ipmSkuStock
		}
	}
	////////////////////////主要目的是把数组变成字符串去运算///////////////////////////////////////////////
	let rarr=[]
	for(let i=0;i<arr.length;i++){rarr[i]=arr[i].join("[行分隔符]");	}
	html=(rarr.join("[列分隔符]")).replace(/双引号/ig, "\"")
	html=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	rarr=html.split("[列分隔符]")
	for(let i=0;i<rarr.length;i++){rarr[i]=rarr[i].split("[行分隔符]");	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	return rarr
	/*
		返回行列关系的数组：
					列1			列2			列2			列2			列2				列n
		行1		图片		,价格		,库存		,属性1		,	属性2		,	属性n
		行2	：图片值	,价格值	,库存		,属性1值	,	属性2值	,	属性n值	
		行3	：图片值	,价格值	,库存		,属性1值	,	属性2值	,	属性n值	
		行n	：图片值	,价格值	,库存		,属性1值	,	属性2值	,	属性n值	
	*/
}
function attributesType(id){
	if(id)
	{
		let str='\
			<table width="98%" class="tb2">\
				<tbody><tr align="center"><th nowrap="nowrap">是否购买属性</th><th nowrap="nowrap">是否必填</th><th nowrap="nowrap">属性名ID</th><th>属性名</th><th align="left">属性值</th></tr>\
				<r:attributesBind where=" where @.typeID=\''+id+'\' and @.from=\'dhgate\'" size=50>\
					<r:attributes where=" where @.fromid=[attributesBind:fromid] and @.from=\'dhgate\'" size=1>\
						<tr>\
							<td align="center" id="[attributes:fromid]">[attributesBind:sku]</td>\
							<td align="center">[attributesBind:required]</td>\
							<td align="center" nowrap="nowrap">[attributes:fromid]</td>\
							<td align="right" nowrap="nowrap">[attributes:name] ([attributes:enname])</td>\
							<td class="atcs">\
							<if "[attributesBind:ShowType]"=="4"||"[attributesBind:ShowType]"=="5"}<input type="text" size="50">\
							<elseif "[attributesBind:ShowType]"=="1">\
								<ul>\
								<r:attributesBind where=" where @.from=\'dhgate_attributes\' and @.upid=[attributesBind:fromid] and @.typeID=\'[attributesBind:typeID]\'" size=100>\
								<r:attributesValues where=" where @.fromid=[attributesBind:fromid]" size=1>\
								<li><label><input type="checkbox" name="checkbox[attributesBind-3list:fromid]" value="[attributesValues:enname]">[attributesValues:name] ([attributesValues:enname])</label></li>\
								</r:attributesValues>\
								</r:attributesBind>\
								</ul>\
							<elseif "[attributesBind:ShowType]"=="2"}\
								<select id="select[attributesBind:fromid]">\
								<option>请选择[attributes:name]</option>\
								<r:attributesBind where=" where @.from=\'dhgate_attributes\' and @.upid=[attributes:fromid] and @.typeID=\'[attributesBind:typeID]\'" size=100>\
								<r:attributesValues where=" where @.fromid=[attributesBind:fromid]" size=1>\
								<option val="[attributesValues:enname]">[attributesValues:name] ([attributesValues:enname])</option>\
								</r:attributesValues>\
								</r:attributesBind>\
								</select>\
							</if>\
							<div name="dhgate_enname" style="display:none" required1="[attributesBind:required]" enname="[attributes:enname]" issku="[attributesBind:sku]" fromid="[attributes:fromid]" ShowType="[attributesBind:ShowType]" valid="<r:attributesBind where=" where @.from=\'dhgate_attributes\' and @.upid=[attributesBind:fromid] and @.typeID=\'[attributesBind:typeID]\'" size=100><r:attributesValues where=" where @.fromid=[attributesBind:fromid]" size=1>{if [attributesBind:i]!=1},</if>[attributesValues:fromid]</r:attributesValues></r:attributesBind>" class="AutoNewline"><r:attributesBind where=" where @.from=\'dhgate_attributes\' and @.upid=[attributesBind:fromid] and @.typeID=\'[attributesBind:typeID]\'" size=100><r:attributesValues where=" where @.fromid=[attributesBind:fromid]" size=1>{if [attributesBind:i]!=1},</if>[attributesValues:enname]</r:attributesValues></r:attributesBind></div>\
							</td>\
						</tr>\
					</r:attributes>\
				</r:attributesBind>\
				</tbody>\
			</table>'
		str=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
	}
	else{str=""}
	return str
}
function funItemSkuList(arr,proid){
	//document.writeln("<pre>"+JSON.stringify(arr,null,2)+"</pre>")
	let itemSkuList=[],itemSku=[],attrId,skuI=0,itemSkuAttrvalList,attrValId,bool,len=1,html="",head
	head="<table class=\"tb2\">\
	<tr align=\"center\">\
		<th nowrap=\"nowrap\">产品备货数量</th>\
		<th>产品SKU属性值列表</th>\
		<th nowrap=\"nowrap\">产品sku零售价</th>\
		<th nowrap=\"nowrap\">是否可销售</th>\
		<th nowrap=\"nowrap\">卖家自定义产品sku编码</th>\
	</tr>"
	for(let i=1;i<arr.length;i++)
	{
		itemSkuAttrvalList="";attrValId="";itemSku=[];attrId=""
		for(let j=3;j<arr[0].length;j++)
		{
			attrValId=arr[i][j].split("=")[1]//例如：arr[i][j]为Size=867234
			attrId=arr[0][j].split("=")[1]
			//////////////////////////////////////////////////////////////////
			itemSku[j-3]=Object()
			itemSku[j-3].attrId=attrId
			itemSku[j-3].attrValId=attrValId
			itemSku[j-3].sizeSpecType=1
			/////////////////////////////////////////////////////////////////
			itemSkuAttrvalList+='<tr align="center"><td>'+attrId+'</td><td>'+attrValId+'</td><td>1</td></tr>'
		}
		itemSkuAttrvalList="\
		<table class=\"tb2\">\
		<tr align=\"center\"><th>sku属性id</th><th>sku属性值id</th><th>规格类型</th></tr>"+itemSkuAttrvalList+"\
		</table>"
		html+='<tr align="center">\
							<td>'+arr[i][2]+'</td>\
							<td>'+itemSkuAttrvalList+'</td>\
							<td>'+(arr[i][1]*(obj.arr8)).toFixed(2)+'</td>\
							<td>是</td>\
							<td>'+proid+'</td>\
						</tr>'
			///////////////////////////////////////////////////////////////
			itemSkuList[skuI]=Object()
			itemSkuList[skuI].inventory=arr[i][2]
			itemSkuList[skuI].retailPrice=(arr[i][1]*(obj.arr8)).toFixed(2)
			itemSkuList[skuI].saleStatus=1
			itemSkuList[skuI].skuCode=proid
			itemSkuList[skuI].itemSkuAttrvalList=itemSku
			skuI++
	}
	if(itemSkuList.length==0)//当一个都绑定不到的时候
	{
			html+='<tr align="center">\
								<td>'+arr[1][2]+'</td>\
								<td>[]</td>\
								<td>'+(arr[1][1]*(obj.arr8)).toFixed(2)+'</td>\
								<td>是</td>\
								<td>'+proid+'</td>\
							</tr>'
			itemSkuList[0]=Object()
			itemSkuList[0].inventory=arr[1][2]
			itemSkuList[0].retailPrice=(arr[1][1]*(obj.arr8)).toFixed(2)
			itemSkuList[0].saleStatus=1
			itemSkuList[0].skuCode=proid
			itemSkuList[0].itemSkuAttrvalList=[]
	}
	html=head+html+"</table>"
	
	$("#ItemSkuList").html(html)
	//document.writeln("<pre>"+JSON.stringify(itemSkuList,null,2)+"</pre>")
	return JSON.stringify(itemSkuList)
}
function aliexpressToDhgateAttr(aliarr,dhgateattr){
	let j,arr=[],arrlen=0,ShowTypeI=0,arrbind=[]
	arr[0]=[];arr[1]=[];arr[2]=[];arr[3]=[];arr[4]=[];arr[5]=[]
	$("[name='dhgate_attrbind']").each(function(){//查看绑定的结果
		j=$(this).attr("val")
		arr[0][arrlen]=$(this).html()//合并后属性名
		arr[1][arrlen]=$("#dhgate_ShowType_"+j).html()//敦煌网显示方式
		arr[2][arrlen]=$("#dhgate_fromid_"+j).html()//敦煌网属性名ID
		arr[3][arrlen]=$("#dhgate_valid_"+j).html()//绑定敦煌网属性值ID
		arr[4][arrlen]=$("#dhgate_attrValue_"+j).html()//合并后属性值名
		arr[5][arrlen]=$("#dhgate_valname_"+j).html()//绑定敦煌网属性值名
		if(arr[0][arrlen].toUpperCase().indexOf("BRAND")!=-1){arr[1][arrlen]=99;arr[3][arrlen]=99;}//是否品牌
		else
		{
			if(arr[1][arrlen]=="自定义"){arr[1][arrlen]=11;ShowTypeI++;arr[3][arrlen]=ShowTypeI;}//自定义的showtype=11;valid的值从1到10
			else
			{
				if(arr[3][arrlen]=="")//如果可以绑定但一个都没绑定到，则转为自定义
				{arr[1][arrlen]=11;ShowTypeI++;arr[3][arrlen]=ShowTypeI;}
			}
		}
		arrlen++
	});//有多少行是绑定的
	////////////////////加上【敦煌网】系统属性要求的必填项  开始//////////////////////////
	for(let i=0;i<arr[1].length;i++)
	{
		if(arr[1][i]!=11&&arr[1][i]!=99)//只要【敦煌网属性名ID】不为11,99，也就是说把那些已成功绑定的取出来
		{
			arrbind[arrbind.length]=arr[1][i]//存属性名ID，用来告诉"【敦煌网】系统属性"这个我已绑定了，你不要给它绑定了
		}
	}
	for(let i=0;i<dhgateattr[6].length;i++){
		if(dhgateattr[6][i]=="True"&&dhgateattr[3][i]!="99"&&dhgateattr[5][i]=="False")
		{
			if(!inarray(dhgateattr[3][i],arrbind))//继续增加已绑定（做为必填默认绑定）
			{
				arr[0][arrlen]=""
				arr[1][arrlen]=""
				arr[2][arrlen]=dhgateattr[3][i];
				arr[3][arrlen]=(dhgateattr[4][i]).split(",")[0];
				if(!arr[3][arrlen]){arr[3][arrlen]="null"}//当必选项为空值时
				arr[4][arrlen]=""
				arr[5][arrlen]=""
				arrlen++
			}
		}
	}
	///////////////////加上【敦煌网】系统属性要求的必填项  结束////////////////////////////////////////////////////////
	//document.writeln("<pre>"+JSON.stringify(arr,null,2)+"</pre>")//
	//document.writeln("<pre>"+JSON.stringify(dhgateattr,null,2)+"</pre>")//
	aliexpressToDhgateAttrshow(arr,aliarr)
	return returnDhgateAttr(arr,aliarr)
	/////////////////////////////////////////////////////////////////////
}
function inarray(obj,arr){
  if(typeof obj=='string'){
   for(let i in arr) {
    if(arr[i] == obj) {
      return true;
    }
   }
  }
  return false;
}
function returnDhgateAttr(arr,aliarr){
	let obj=[],itemAttrValList11=[],i11=0,itemAttrValList99=[],attrvalueArr=[],IDArr=[],itemAttrValList=[],objI=2
	if(itemAttrValList99.length==0)//不想要多个品牌
	{
		itemAttrValList99[0]=Object()
		itemAttrValList99[0].attrId=99
		itemAttrValList99[0].attrName=""
		itemAttrValList99[0].attrValId=99
		itemAttrValList99[0].lineAttrvalName=""
		itemAttrValList99[0].lineAttrvalNameCn=""
		itemAttrValList99[0].picUrl=""
	}
	obj[0]=Object()
	obj[0].isbrand=1
	obj[0].itemAttrValList=itemAttrValList99
	for(let i=0;i<arr[0].length;i++)
	{
		if(arr[1][i]==11)//只要是自定义
		{
			if(i11<10&&(arr[4][i]).length<=40)
			{
				itemAttrValList11[i11]=Object()
				itemAttrValList11[i11].attrId=arr[1][i]
				itemAttrValList11[i11].attrName=arr[0][i]
				itemAttrValList11[i11].attrValId=arr[3][i]
				itemAttrValList11[i11].lineAttrvalName=arr[4][i]
				itemAttrValList11[i11].lineAttrvalNameCn=""
				itemAttrValList11[i11].picUrl=""
				i11++
			}
		}
		else if(arr[1][i]==99)
		{
			/*if(itemAttrValList99.length==0)//不想要多个品牌
			{
				itemAttrValList99[0]=Object()
				itemAttrValList99[0].attrId=arr[1][i]
				itemAttrValList99[0].attrName=arr[0][i]
				itemAttrValList99[0].attrValId=arr[3][i]
				itemAttrValList99[0].lineAttrvalName=arr[4][i]
				itemAttrValList99[0].lineAttrvalNameCn=""
				itemAttrValList99[0].picUrl=""
			}*/
		}
		else
		{
			if(arr[3][i].indexOf(",")!=-1)
			{
				attrvalueArr=arr[4][i].split(",")
				IDArr=arr[3][i].split(",")
				itemAttrValList=[]
				for(let j=0;j<IDArr.length;j++)
				{
					itemAttrValList[0]=Object()
					itemAttrValList[0].attrId=arr[2][i]
					itemAttrValList[0].attrName=arr[0][i]
					itemAttrValList[0].attrValId=IDArr[j]
					itemAttrValList[0].lineAttrvalName=attrvalueArr[j]
					itemAttrValList[0].lineAttrvalNameCn=""
					itemAttrValList[0].picUrl=""
					obj[objI]=Object()
					obj[objI].isbrand=0
					obj[objI].itemAttrValList=itemAttrValList
					objI++
				}
				
			}
			else
			{
				itemAttrValList=[]
				itemAttrValList[0]=Object()
				itemAttrValList[0].attrId=arr[2][i]
				itemAttrValList[0].attrName=arr[0][i]
				itemAttrValList[0].attrValId=arr[3][i]
				itemAttrValList[0].lineAttrvalName=arr[4][i]
				itemAttrValList[0].lineAttrvalNameCn=""
				itemAttrValList[0].picUrl=""
				obj[objI]=Object()
				obj[objI].isbrand=0
				obj[objI].itemAttrValList=itemAttrValList
				objI++
			}
		}
	}
	if(itemAttrValList11.length)
	{
		obj[1]=Object()
		obj[1].isbrand=0
		obj[1].itemAttrValList=itemAttrValList11
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	let attrValId=[],attrId=[],dharr=[],ValList=[],ValListi=0
	for(let j=3;j<aliarr[0].length;j++)//列数------数组列转行（先看有多少行）
	{
		dharr[j-3]=[]
		for(let i=1;i<aliarr.length;i++)//行数
		{
			dharr[j-3][i-1]=aliarr[i][j]
		}
		dharr[j-3]=unique(dharr[j-3])//去重复
		attrId=aliarr[0][j].split("=")
		ValList=[];ValListi=0
		for(let i=0;i<dharr[j-3].length;i++)
		{
			attrValId=dharr[j-3][i].split("=")
			if(attrValId[1])
			{
				ValList[ValListi]=Object()
				ValList[ValListi].attrId=attrId[1]
				ValList[ValListi].attrName=attrId[0]
				ValList[ValListi].attrValId=attrValId[1]
				ValList[ValListi].lineAttrvalName=attrValId[0]
				ValList[ValListi].lineAttrvalNameCn=""
				ValList[ValListi].picUrl=""
				ValListi++
			}
		}
		if(ValList.length!=0)//如果没有
		{
			obj[objI]=Object()
			obj[objI].isbrand=0
			obj[objI].itemAttrValList=ValList
			objI++
		}
	}
	//document.writeln("<pre>"+JSON.stringify(obj,null,2)+"</pre>")
	return JSON.stringify(obj)
}
function aliexpressToDhgateAttrshow(arr,aliarr){//把结果写成敦煌网格式
	let str11="",str99="",str="",i11=1
	for(let i=0;i<arr[0].length;i++)
	{
		if(arr[1][i]==11)//只要是自定义
		{
			if(i11<11&&(arr[4][i]).length<=40)//敦煌网只要10个自定义属性且值的长度不能大于40
			{
				str11+="<tr align=\"center\"><td>"+arr[1][i]+"</td><td>"+arr[0][i]+"</td><td>"+arr[3][i]+"</td><td>"+arr[4][i]+"</td><td></td><td></td></tr>"
			}
			i11++
		}
		else if(arr[1][i]==99)
		{
			if(str99=="")//不想要多个品牌
			{
				str99="<tr align=\"center\"><td>"+arr[1][i]+"</td><td>"+arr[0][i]+"</td><td>"+arr[3][i]+"</td><td>other</td><td></td><td></td></tr>"
			}
		}
		else//为系统属性的时后
		{
			if(arr[3][i].indexOf(",")>-1)
			{
				let attrvalueArr=arr[4][i].split(",")
				let ShowTypeIDArr=arr[3][i].split(",")
				for(let j=0;j<ShowTypeIDArr.length;j++)
				{
					str+="<tr align=\"center\">\
							<td>否</td>\
							<td align=\"left\">\
								<table><th width=\"100\">属性Id</th><th width=\"150\">产品属性英文名称</th><th width=\"100\">产品属性值id</th><th width=\"300\">产品属性值英文名称</th><th width=\"100\">属性值中文名称</th><th width=\"100\">产品属性图片路径</th><tr align=\"center\"><td>"+arr[2][i]+"</td><td>"+arr[0][i]+"</td><td>"+ShowTypeIDArr[j]+"</td><td>"+attrvalueArr[j]+"</td><td></td><td></td></tr></table>\
							</td>\
						</tr>"
				}
			}
			else
			{
				str+="<tr align=\"center\">\
							<td>否</td>\
							<td align=\"left\">\
								<table><th width=\"100\">属性Id</th><th width=\"150\">产品属性英文名称</th><th width=\"100\">产品属性值id</th><th width=\"300\">产品属性值英文名称</th><th width=\"100\">属性值中文名称</th><th width=\"100\">产品属性图片路径</th><tr align=\"center\"><td>"+arr[2][i]+"</td><td>"+arr[0][i]+"</td><td>"+arr[3][i]+"</td><td>"+arr[5][i]+"</td><td></td><td></td></tr></table>\
							</td>\
						</tr>"
			}
		}
	}
	////////////////////////////与价格相关的系统属性////////////////////////////////////////////////////////////////////////////
	let attrValId=[],attrId=[],dharr=[],attrstr=""
	for(let j=3;j<aliarr[0].length;j++)//【速卖通】列数------数组列转行（先看有多少行）
	{
		dharr[j-3]=[]
		for(let i=1;i<aliarr.length;i++){dharr[j-3][i-1]=aliarr[i][j]}//【速卖通】的行数
		dharr[j-3]=unique(dharr[j-3])//去重复
		attrId=aliarr[0][j].split("=")
		attrstr=""
		for(let i=0;i<dharr[j-3].length;i++)
		{
			attrValId=dharr[j-3][i].split("=")
			if(attrValId[1])
			{
				attrstr+="<tr align=\"center\"><td>"+attrId[1]+"</td><td>"+attrId[0]+"</td><td>"+attrValId[1]+"</td><td>"+attrValId[0]+"</td><td></td><td></td></tr>"
			}
		}
		if(attrstr)
		{
			str+="\
			<tr align=\"center\">\
			<td>否</td>\
			<td align=\"left\">\
				<table><th width=\"100\">属性Id</th><th width=\"150\">产品属性英文名称</th><th width=\"100\">产品属性值id</th><th width=\"300\">产品属性值英文名称</th><th width=\"100\">属性值中文名称</th><th width=\"100\">产品属性图片路径</th>"+attrstr+"</table>\
			</td>\
			</tr>"
		}
	}
	///////////////////把结果写成敦煌网格式////////////////////////////////////////////////////////////////////
	if(str99==""){str99="<tr align=\"center\"><td>99</td><td></td><td>99</td><td></td><td></td><td></td></tr>";}
	let html="\
	<table class=\"tb2\">\
	<tr align=\"center\">\
		<th nowrap=\"nowrap\">是否品牌</th>\
		<th>产品属性值列表</th>\
	</tr>\
	<tr align=\"center\">\
		<td>否</td>\
		<td align=\"left\">\
			<table><th width=\"100\">属性Id</th><th width=\"150\">产品属性英文名称</th><th width=\"100\">产品属性值id</th><th width=\"300\">产品属性值英文名称</th><th width=\"100\">属性值中文名称</th><th width=\"100\">产品属性图片路径</th>"+str11+"</table>\
		</td>\
	</tr>\
	<tr align=\"center\">\
			<td>是</td>\
			<td align=\"left\">\
				<table><th width=\"100\">属性Id</th><th width=\"150\">产品属性英文名称</th><th width=\"100\">产品属性值id</th><th width=\"300\">产品属性值英文名称</th><th width=\"100\">属性值中文名称</th><th width=\"100\">产品属性图片路径</th>"+str99+"</table>\
			</td>\
		</tr>"+str
	html+="</table>"
	$("#aliexpressToDhgateAttr").html(html)
}
function BindUpload(){
	let smttype,dhtype,html,select1
	smttype=$("#type").val()
	dhtype=$("#typebind").val()
	select1="select top 1 count(1) from @.smtTypeBind where @.smtType="+type//如果要绑定的ID不在
	let html='\
		<if "Fun(Db('+select1+',count))"=="0">\
		<r: tag="sql">insert into @.smtTypeBind(:smtType,:dhType)values (\''+type+'\',\''+dhtype+'\')</r:>\
		<else/>\
		<r: tag="sql">update @.smtTypeBind set @.dhType=\''+dhtype+'\' where @.smtType='+smttype+'</r:>\
		</if>'
	html=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	alert(html+"已绑定成功")
}
function Producthtml(){
	let html='\
	{\
		<r:product size=1 where=" a where @.hide=0 and @.from=\'aliexpress\' and not EXISTS(select @.proid from @.dhUpPro b where a.@.hide=0 and a.@.from=\'aliexpress\' and a.@.id=b.@.proid)" page=4>\
		<if "Fun(Db(select top 1 :id from @.smtTypeBind where @.smtType=<:a.:type/>,count))"=="">"isbind":"false",<else/>"isbind":"true",</if>\
		"type":"<:a.:type/>",\
		"typename":"<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:a.:type/>\'" size=1>\
									<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
										<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
											<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
											<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
											</r:type>\
										<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
										</r:type>\
									<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
									</r:type>\
									<:name/>\
								</r:type>",\
		"shippingModelId":"<:a.:freightTemplateId/>",\
		"pic":"<:a.:pic tag=js/>",\
		"des":"<:a.:des tag=js/>",\
		"unit":"<:a.:unit/>",\
		"name":"<:a.:name/>",\
		"id":"<:a.:id/>",\
		"proid":"<:a.:proid/>",\
		"lotNum":"<:a.:lotNum/>",\
		"length":"<:a.:length/>",\
		"width":"<:a.:width/>",\
		"height":"<:a.:height/>",\
		"aeopAeProductPropertys":"<:a.:aeopAeProductPropertys tag=js/>",\
		"aeopAeProductSKUs":"<:a.:aeopAeProductSKUs tag=js/>",\
		"keys":"<:a.:keys tag=js/>",\
		"keys1":"<:a.:keys1 tag=js/>",\
		"keys2":"<:a.:keys2 tag=js/>",\
		"fromurl":"<:a.:fromurl tag=js/>",\
		"from":"<:a.:from tag=js/>",\
		"fromid":"<:a.:fromid/>",\
		"UploadUser":"<:a.:UploadUser/>",\
		"weight":"<:a.:weight/>",\
		"deliveryTime":"<:a.:deliveryTime/>",\
		"typebind":"<r:smtTypeBind size=1 where=" where @.smttype=<:a.:type/>"}[smtTypeBind:typebind]</r:smtTypeBind>",\
		"typebindname":"<r:smtTypeBind size=1 where=" where @.smttype=<:a.:type/>"}\
			<r:type where=" where @.from=\'dhgate\' and @.fromid=\'[smtTypeBind:typebind]\'" size=1>\
					<r:type where=" where @.from=\'dhgate\' and @.fromid=\'<:upid/>\'" size=1>\
						<r:type where=" where @.from=\'dhgate\' and @.fromid=\'<:upid/>\'" size=1>\
							<r:type where=" where @.from=\'dhgate\' and @.fromid=\'<:upid/>\'" size=1>\
							<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
							</r:type>\
						<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
						</r:type>\
					<:name/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;\
					</r:type>\
					<:name/>\
				</r:type>\
			</r:smtTypeBind>"\
		,</r:product>\
		"recordcount":"<@count/>"\
	}'
	html=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	return html
}
function pagelist(){
	eval("obj.objPro="+Producthtml())
	if(obj.objPro.fromurl){$("#dhorderget").html("<tr align=\"center\"><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>正在上传【图片】，请稍等。。。</td></tr>");Upload_images();}else{$("#dhorderget").html("<tr><td>全部上传完成</td></tr>");}
}
function producttype(){
	let html=$("#dhgatetype").html()
	if(!html)
	{
		html='\
			<div id="producttype" class="popdiv" style="width:830px;position:absolute;top:150px;margin-left:15%;z-index:1000; display:none;">\
				<div class="poptitie"><img src="/<.Path/>admin/img/btn_close.gif" onClick="$(\'#producttype\').hide();selectcheckboxtype();BindUpload();" />选择敦煌网分类</div>\
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tb2" style="overflow:auto;">\
				<tr>\
					<td valign="top" >\
					<ul class="cmblock">\
					<li>\
					<select size="5" style="width:200px;height:300px" id="prolist1" onChange="selecttype(this.value,\'prolist2\')">\
					<r:type where=" where @.from=\'dhgate\' and @.upid is null order by @.sort asc" size=200><option value=\'<:fromid/>\'><:name/></option></r:type>\
					</select>\
					<select size="5" style="width:200px;height:300px" id="prolist2" onChange="selecttype(this.value,\'prolist3\')"></select>\
					<select size="5" style="width:200px;height:300px" id="prolist3" onChange="selecttype(this.value,\'prolist4\')"></select>\
					<select size="5" style="width:200px;height:300px" id="prolist4" onChange="selecttype(this.value,\'prolist5\')"></select>\
					<select size="5" style="width:200px;height:300px;display:none" id="prolist5" onChange="selecttype(this.value,\'prolist6\')"></select>\
					<select size="5" style="width:200px;height:300px;display:none" id="prolist6"></select>\
					</li>\
					</ul>\
					</td>\
				</tr>\
				</table>\
			</div>'
		html=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
		$("#dhgatetype").html(html);
	}
}
function selectcheckboxtype(){
	let prolist2,prolist3,prolist4,prolist1=$("#prolist1").find("option:selected").text()
	if(prolist1)
	{
		prolist2=$("#prolist2").find("option:selected").text()
		if(prolist2){
			prolist3=$("#prolist3").find("option:selected").text()
			if(prolist3)
			{
				prolist4=$("#prolist4").find("option:selected").text()
				if(prolist4){
					$("#selectcheckboxtype").html(prolist1+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist2+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist3+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist4)
					$("#typebind").val($("#prolist4").val())
				}
				else
				{
					$("#selectcheckboxtype").html(prolist1+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist2+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist3)
					$("#typebind").val($("#prolist3").val())
				}
			}
			else
			{
				$("#selectcheckboxtype").html(prolist1+"&nbsp;&nbsp;&raquo;&nbsp;&nbsp;"+prolist2)
				$("#typebind").val($("#prolist2").val())
			}
		}
		else
		{
			$("#selectcheckboxtype").html(prolist1)
		}
	}
	else
	{alert("选择绑定分类")}
}
function selecttype(val,id){
	let str='<r:type where=" where @.from=\'dhgate\' and @.upid=\''+val+'\' order by @.sort asc" size=200>\
	<option value=\'<:fromid/>\'><:name/></option>\
	</r:type>'
	str=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},async:false}).responseText;
	$("#"+id).html(str);if(str){$("#"+id).show()}
}
function dhbasemeasuresget(name){//跟据英文查找，敦煌网对应的单位ID
	let aa=name.indexOf("(")
	if(aa!=-1){name=name.substr(0,aa-1);}
	let a=["00000000000000000000000000000","00000000000000000000000000000002","00000000000000000000000000000003","00000000000000000000000000000004","00000000000000000000000000000005","00000000000000000000000000000006","00000000000000000000000000000007","00000000000000000000000000000008","00000000000000000000000000000009","00000000000000000000000000000","00000000000000000000000000001","00000000000000000000000000002","00000000000000000000000000003","00000000000000000000000000004","00000000000000000000000000005","00000000000000000000000000006","00000000000000000000000000007","00000000000000000000000000008","00000000000000000000000000009","00000000000000000000000000000020","00000000000000000000000000000021","00000000000000000000000000000022","00000000000000000000000000000023","00000000000000000000000000000024","00000000000000000000000000000025","00000000000000000000000000000026","00000000000000000000000000000027","00000000000000000000000000000028","00000000000000000000000000000029","00000000000000000000000000000030","00000000000000000000000000000031","00000000000000000000000000000032","00000000000000000000000000000033"]
	let b=["Dozens","Feet","Pieces","Sets/pack/lot/bag","Grams","Inches","Kilograms","Kilometers","Liters","Metric Tonnes","Meters","Milliliters","Ounces","Pairs","Pounds","Square Yards","Square Meters","Square Feet","Yards","Centimeters","Cartons"]
	let r=""
	name=name.toUpperCase()
	for(let i=0;i<b.length;i++)
	{
		if(name.indexOf(b[i].toUpperCase())!=-1||(b[i].toUpperCase()).indexOf(name)!=-1)
		{
			r=a[i]
			break; 
		}
	}
	if(!r){alert("商品单位为空（"+name+"）")}
	return r
}
