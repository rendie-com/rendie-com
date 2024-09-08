'use strict';
var fun=
{
  a01:function()
	{
		let str='\
		<r:pro db="sqlite.aliexpress" size=1 where=" where @.id='+obj.arr[5]+'">\
		{\
			"id":"<:id/>",\
			"price":<:price f=2/>,\
			"minprice":<:minprice f=2/>,\
			"maxprice":<:maxprice f=2/>,\
			"keywords":<:keywords tag=json/>,\
			"description":<:description tag=json/>,\
			"name":"<:name tag=js/>",\
			"unit":"<:unit tag=js/>",\
			"SaleNum":"<:SaleNum/>",\
			"lotNum": "<:lotNum/>", \
			<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
				"pic":"<:pic/>",\
				"videoUrl":"<:videoUrl/>",\
				"des":<:des tag=json/>,\
				"HistoryPrice":<:HistoryPrice tag=0/>,\
				"aeopAeProductPropertys":<:aeopAeProductPropertys tag=0/>,\
				"freight":<:freight tag=0/>,\
				"aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
			</r:prodes>\
			"proid":"<:proid/>"\
		}\
		</r:pro>'
/*
			"weight":<:weight/>,\
			"freightTemplateId":"<:freightTemplateId/>",\
			"promiseTemplateId":"<:promiseTemplateId/>",\
			"deliveryTime":"<:deliveryTime/>",\
			"wsValidNum":"<:wsValidNum/>",\
			"isImageDynamic":"<:isImageDynamic/>",\
			"isImageWatermark":"<:isImageWatermark/>",\
			"pic":"<:pic/>",\
			"typename":"<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:type/>\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1><r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1><:name tag=js/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;</r:type><:name tag=js/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;</r:type><:name tag=js/>&nbsp;&nbsp;&raquo;&nbsp;&nbsp;</r:type><:name tag=js/></r:type>"
			\
*/
		Tool.ajax.a01(html,1,this.a02,this);
  },
	a02:function(arr)
	{
		let str='\
		<tr><td class="w250 right">ID：</td><td>'+arr.id+'</td><td class="right">编码(proid)：</td><td colspan="5">'+arr.proid+'</td></tr>\
		<tr><td class="right">标题(name)：</td><td colspan="7">'+arr.name+'</td></tr>\
		<tr><td class="right">图片URL：</td><td colspan="7">'+this.b01(arr.pic)+'</td></tr>\
		<tr><td class="right">来源网址(fromurl)：</td><td colspan="7">'+arr.fromurl+'</td></tr>\
		<tr>\
			<td class="right">平均价(price)：</td><td>'+arr.price+'</td>\
			<td class="right">最低价(minprice)：</td><td>'+arr.minprice+'</td>\
			<td class="right">最高价(maxprice)：</td><td colspan="3">'+arr.maxprice+'</td>\
		</tr>\
		<tr>\
      <td class="right">搜索关键词(keywords)：</td>\
      <td colspan="7">'+arr.keywords+'</td>\
    </tr>\
		<tr>\
      <td class="right">meta标签里的(description)：</td>\
      <td colspan="7">'+arr.description+'</td>\
    </tr>\
		<tr>\
      <td class="right">视频URL(videoUrl)：</td>\
      <td colspan="7">'+arr.videoUrl+'</td>\
    </tr>\
		<tr>\
			<td class="right">长(length)：</td>\
			<td>'+arr.length+'</td>\
			<td class="right">宽(width)：</td>\
			<td>'+arr.width+'</td>\
			<td class="right">高(height)：</td>\
			<td>'+arr.height+'</td>\
			<td class="right">单重量(weight)：</td>\
			<td>'+arr.weight+' KG</td>\
		</tr>\
		<tr>\
			<td class="right">运费模板(freightTemplateId)：</td>\
			<td>'+arr.freightTemplateId+'</td>\
			<td class="right">服务模板(promiseTemplateId)：</td>\
			<td>'+arr.promiseTemplateId+'</td>\
			<td class="right">单位(unit)：</td>\
			<td>'+arr.unit+'</td>\
			<td class="right">每包件数：</td>\
			<td>'+ arr.lotNum +'</td>\
		</tr>\
		<tr>\
			<td class="right">备货期(deliveryTime)：</td>\
			<td>'+arr.deliveryTime+'</td>\
			<td class="right">商品有效天数(wsValidNum)：</td>\
			<td>'+arr.wsValidNum+'</td>\
			<td class="right">已销售数量(SaleNum)：</td>\
			<td colspan="5">'+arr.SaleNum+'</td>\
		</tr>\
		<tr>\
			<td class="right">商品主图图片类型：</td>\
			<td>'+arr.isImageDynamic+'</td>\
			<td class="right">图片是否加水印的标识：</td>\
			<td colspan="5">'+ arr.isImageWatermark +'</td>\
		</tr>\
  	<tr><td class="right">类型：</td><td colspan="7">'+arr.typename+'</td></tr>\
		<tr><td class="right">价格：</td><td colspan="7"><textarea style="height:500px;"class="form-control">'+JSON.stringify(arr.aeopAeProductSKUs,null,2)+'</textarea></td></tr>\
		<tr><td class="right">历史价格：</td><td colspan="7"><textarea style="height:500px;"class="form-control">'+JSON.stringify(arr.HistoryPrice,null,2)+'</textarea></td></tr>\
		<tr><td class="right">自定义属性(aeopAeProductPropertys)：</td><td colspan="7"><textarea style="height:500px;"class="form-control">'+ JSON.stringify(arr.aeopAeProductPropertys, null, 2) +'</textarea></td></tr>\
		<tr><td class="right">系统属性：</td><td colspan="7">--</td></tr>\
		<tr><td class="right">运费(freight)：</td><td colspan="7"><textarea style="height:500px;"class="form-control">'+JSON.stringify(arr.freight,null,2)+'</textarea></td></tr>\
		<tr><td class="right">详情：</td><td colspan="7"><textarea style="height:200px;"class="form-control">'+arr.des+'</textarea></td></tr>'
    let html=Tool.header('查看【速卖通】商品详情')+'\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>'+str+'</tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html);
	},
  b01:function(pic)
  {
		return ""
    /*let str='',arr=pic.split(";")
    for(let i=0;i<arr.length;i++)
    {
      str+='<a target="_blank" href="'+arr[i]+'"><img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+arr[i]+'" title="点击预览" border="0" width="90"></a>'
    }
    return str;*/
  },
}
fun.a01();