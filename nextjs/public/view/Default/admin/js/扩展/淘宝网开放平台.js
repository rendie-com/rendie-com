'use strict';
$(function(){taobao_tbk_item_get()})
function taobao_tbk_item_get()
{
  let ParamArr=[],URL,sortArr=[],sign,obj2=Object()
	obj2.app_key=obj.app_key
	obj2.appSecret=obj.appSecret
	obj2.method="taobao.tbk.item.get"
	obj2.timestamp=js_date_time((new Date).getTime())
	obj2.format="json"//返回格式,本demo仅支持xml
	obj2.v="2.0"//API版本号
	obj2.cat="16"//后台类目ID
	obj2.sign_method="md5"//签名方式
	obj2.fields="num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick"//返回字段
	for(let x in obj2){sortArr[sortArr.length]=x+obj2[x];ParamArr[ParamArr.length]=x+"="+obj2[x];}
	sortArr.sort()
	//document.write("<pre>"+JSON.stringify(ParamArr,null,2)+"</pre>")
	sign = CryptoJS.MD5(obj.appSecret+sortArr.join("")+obj.appSecret).toString().toUpperCase();
	URL="http://gw.api.taobao.com/router/rest?"+ParamArr.join("&")+"&sign="+sign
	$.ajax({ type: "POST", url: "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") }, success: function (txt) { taobao_tbk_item_get_001(txt); } });
}
function taobao_tbk_item_get_001(txt)
{
	let html='<tr align="center"><td>编号</td>\
	<td title="num_iid">商品ID</td>\
	<td>图片</td>\
	<td title="title" align="left">商品标题</td>\
	<td title="reserve_price">商品一口价格</td>\
	<td title="zk_final_price">商品折扣价格</td>\
	<td title="user_type">卖家类型</td>\
	<td title="provcity">所在地</td>\
	<td title="nick">卖家昵称</td>\
	<td title="seller_id">卖家id</td>\
	<td title="volume">30天销量</td>\
	</tr>',obj3
	eval("let obj2="+txt)
	if(!obj2.error_response)
	{
		obj3=obj2.tbk_item_get_response.results.n_tbk_item
		for(let i=0;i<obj3.length;i++)
		{
		  html+='<tr align="center"><td>'+(i+1)+'</td>\
			<td>'+obj3[i].num_iid+'</td>\
			<td title=\''+JSON.stringify(obj3[i].small_images)+'\'><img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+obj3[i].pict_url+'" border="0" width="50" height="50" align="left"></td>\
			<td align="left"><a target="_blank" href="'+obj3[i].item_url+'">'+obj3[i].title+'</a></td>\
			<td>'+obj3[i].reserve_price+'</td>\
			<td>'+obj3[i].zk_final_price+'</td>\
			<td>'+(obj3[i].user_type==0?"集市":"商城")+'</td>\
			<td>'+obj3[i].provcity+'</td>\
			<td>'+obj3[i].nick+'</td>\
			<td>'+obj3[i].seller_id+'</td>\
			<td>'+obj3[i].volume+'</td>\
			</tr>'
		}
		html+='<tr align="center"><td colspan="11">总数：'+obj2.tbk_item_get_response.total_results+'</td></tr>'
		$("#table").html(html)
	}
	else{alert("出错：\n"+txt);}
}