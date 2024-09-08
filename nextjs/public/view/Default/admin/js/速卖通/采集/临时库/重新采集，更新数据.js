'use strict';
setTimeout("location.reload();",1000*60*3);//30分钟刷新一次
$(function(){pagehtml(1);})
function pagehtml(page){
	let obj2,fromurl,articlecode,sqlupdate,html="",str=Producthtml(page)
	eval("let objPro="+str)
	obj2=objPro.product
	if(page<=objPro.pagecount)
	{
		for(let i=0;i<obj2.length;i++)//
		{
			fromurl=obj2[i].fromurl
			articlecode=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<.WebRequestGet("+fromurl+")/>")},async:false}).responseText;
			/*
			let attrStr=ProductAttributes(items,articlecode,obj[i].type)//产品属性
			let skuhtml=CommodityAttribute(items,articlecode,attrStr)//商品属性
			sqlupdate="update @.tempproduct set @.aeopAeProductSKUs='"+skuhtml[1]+"',:datetime="+time+" where @.fromurl='"+fromurl+"'"
			*/
			let SaleNum=StrSlice(articlecode,obj.items.SaleNumA,obj.items.SaleNumB)
			if(!isNaN(SaleNum))SaleNum=0
			sqlupdate="update @.tempproduct set @.SaleNum="+SaleNum+",:datetime="+obj.time+" where @.fromurl='"+fromurl+"'"
			html+='<tr><td nowrap="nowrap">更新成功</td><td>类目：'+obj2[i].typename+'（'+obj2[i].type+'）<hr>'+sqlupdate+'{ren'+'die:area db="sqlite.aliexpress">'+sqlupdate+'{/ren'+'die:area}</td></tr>'
		}
		html=$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
		if(html.indexOf("sql语句错误")!=-1)
		{
			html='<tr><td colspan="4">'+html+'</td></tr>'
			clearTimeout(t);alert("采集出错，请与管理员联系。")
			$("#gather").html(html);
		}
		else
		{
			html+='<tr><td colspan="4">每天显示10条，页次:'+page+'/'+objPro.pagecount+' 总数据'+objPro.recordcount+'条，暂1停秒后，即将采集下一页...</td></tr>'
			$("#gather").html(html);
			t=setTimeout("pagehtml(1);",2000);
		}
	}
	else
	{
		html='<tr><td colspan="4">采集完成</td></tr>'
		$("#gather").html(html);
	}
}
function Producthtml(page){
	//let examine='<if "'+obj.arr4+'"!="_20"}:examine='+obj.arr4+' and </if>:datetime<#'+obj.arr5+'#'
	//examine="CONTAINS(rd_aeopaeproductskus,'null')"
	let html='\
	{"product":[\
		<r:tempproduct size=10 page=3 where=" where @.datetime is null order by @.id asc">\
		<if "<:i/>"!="1"},</if>\
		{\
			"name":"<:name tag=js/>",\
			"fromurl":"<:fromurl tag=js/>",\
			"aeopAeProductSKUs":"<:aeopAeProductSKUs tag=js/>",\
			"typename":"<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:type/>\'" size=1>\
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
			"type":"<:type/>"\
		}\
		</r:tempproduct>\
	],"pagecount":<@page/>,"count":<@count/>}'
	html=$.ajax({type:"POST",url:obj.mode+"exe/"+page+".html?"+Math.random(),data:{data:escape(html)},async:false}).responseText;
	return html
}
