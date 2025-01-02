'use strict';
setTimeout("IndexLink();",1000*60*15);//30分钟刷新一次
function IndexLink(){Tool.main(obj.nextlink+"1.html");}
$(function(){
	obj.arr4=obj.arr4==""?1:parseInt(obj.arr4)
	str='<r:APIaccount size=1 page=2 where=" where @.hide=0 and @.from=\'dhgate\' order by @.id asc">{username:"[APIaccount::username]",password:"[APIaccount::password]",apiID:"[APIaccount::id]",note:"[APIaccount:note]"</r:APIaccount>,pagecount:"<@page/>"}'
	$.ajax({type:"post",url:obj.mode+"exe/"+obj.arr4+".html?"+Math.random(),data:{data:escape(str)},success:function(txt){config(txt);}});
});
function config(txt)
{
	eval("let apiobj="+txt)
	obj.tokenID=apiobj.apiID
	obj.username=apiobj.username
  let html='<tr class="thead"><td colspan="2">正在【同步品牌商投诉】...</td></tr><tr><td class="label" width="100">总进度：</td><td id="progress"><progress style="width:80%" max="'+apiobj.pagecount+'" value="'+obj.arr4+'"/> '+obj.arr4+'/'+apiobj.pagecount+'</td></tr><tr><td class="label">细节：</td><td><table class="tb2" width="100%"><tr><th width="30">账号</th><th width="180">备注</th><th align="left">进度</th></tr><tr align="center"><td>'+apiobj.username+'</td><td>'+apiobj.note+'</td><td align="left" id="progress2"><progress style="width:60%"/></td></tr></table></td></tr>'
  $("#table").html(html)
	if(obj.arr4<=parseInt(apiobj.pagecount))
	{
		let today=new Date()
		obj.startDate=Tool.js_date_time(today.setDate(today.getDate()-365));
		if(obj.token=="")
		{
			let URL='https://secure.dhgate.com/dop/oauth2/access_token?grant_type=password&username='+apiobj.username+'&password='+apiobj.password+'&client_secret=<.Config(dhgate_client_secret)/>&client_id={r:Config(dhgate_client_id)/>&scope=basic'
			$.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<:WebRequestGet("+URL+")/>")},success:function(result){dhgate_token(result);}});}
		else
		{pagelist(1);}
	}
	else
	{
		$("#progress2").html("同步完成")
	}
}
function pagelist(p)
{
	$("#progress2").html('第'+p+'页')
	obj.page=p;
	let URL = "http://api.dhgate.com/dop/router?access_token=" + obj.token + "&method=dh.item.list&timestamp=" + new Date().getTime() + "&v=2.0&pages="+p+"&pageSize=10&operateDateStart="+obj.startDate+"&state=100500"
	$.ajax({ type: "post", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + escape(URL) + ")/>") }, success: function (result) { dh_item_list_ajax(result) } });
}
function dh_item_list_ajax(txt){
	eval("let obj2="+txt)
	let itemList,arr=[],itemCode=[],str="",sel,ins,name
	if(obj2.status.code=="00000000")
	{
		itemList=obj2.itemList
		for(let i=0;i<itemList.length;i++)
		{
			arr[arr.length]=dh_item_sku_list(itemList[i].itemCode);
			arr[arr.length]="delete from @.dhuppro where @.fromid="+itemList[i].itemCode
			name='(select top 1 @.shopname from @.product where @.id=(select top 1 @.proid from @.dhuppro where @.fromID=\''+itemList[i].itemCode+'\'))'
			sel='select count(1) FROM @.Restriction where @.name='+name
			ins='insert into @.Restriction(:from,:mode,:name,:des)values(\'aliexpress\',2,'+name+',\'同步【品牌商投诉】的商品\')'
			str+='{if "Fun(Db('+sel+',count))"=="0"}<r: tag=\"sql\">'+ins+'</r:>{/if}'
			itemCode[itemCode.length]=itemList[i].itemCode
		}
		if(arr[0])
		{
			dh_item_delete_list(itemCode,obj2.pageTotal,"<r: tag=\"sql\">"+arr.join("<1/>")+"</r:>",str)
		}
		else
		{
			Tool.main(obj.nextlink+(parseInt(obj.arr4)+1));
		}
	   
	}
}
function dh_item_sku_list(itemCode)
{
	let URL = "http://api.dhgate.com/dop/router?access_token=" + obj.token + "&method=dh.item.sku.list&timestamp=" + new Date().getTime() + "&v=2.0&itemCode="+itemCode,txt
	txt = $.ajax({ type: "post", url: obj.mode + "exe/" + obj.arr4 + ".html?" + Math.random(), data: { data: escape("<.WebClientPost(" + escape(URL) + ")/>") }, async: false }).responseText;
	eval("let obj2="+txt)
	let skuCode=(obj2.itemSkuList[0].skuCode).split("-")[0]
	return "update @.product set @.hide=4,:err='同步【品牌商投诉】的商品' where @.proid='"+skuCode+"'"
}
function dh_item_delete_list(ids,pageTotal,txt,str)//批量删除产品
{
	//先处理str，再处理txt
	let URL = "http://api.dhgate.com/dop/router?method=dh.item.delete.list&v=2.0&timestamp="+(new Date).getTime()+"&access_token="+obj.token+"&itemCodes="+ids.join(",")
	URL="<.WebClientPost("+URL+")/>"
	//document.write(str)
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(t){
		$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(URL+txt)},success:function(t){
		  if(obj.page>=parseInt(pageTotal))
		  {
			  Tool.main(obj.nextlink+(parseInt(obj.arr4)+1));
		  }
		  else
		  {setTimeout("pagelist(1);",1000);}
		}});
	}});
}