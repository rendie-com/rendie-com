'use strict';
$(function(){
  $(".makeHtmlTab li").click(function(){
	 if($(this).attr("rel")=="1"){obj.code.mode=1;}else{obj.code.mode=0;}
	 $(".makeHtmlTab li").removeClass();
	 $(this).attr("class","hover");
	 returnURL();
  })
  $(".makeHtmlTab li[rel='"+obj.code.mode+"']").attr("class","hover");
  returnURL();
});
function listHtml(url)
{
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent("<.GetHtmlCode("+url+")/>")},success:function(htmlcode){
	  ArticleDes(htmlcode,url)
  }});
}
function returnURL(){
  $("#table").html("<tr align='center'><td><img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/></td></tr>")
  let reverse,URL,pageset
  URL=obj.code.a[obj.code.mode].pageurl1
  pageset=obj.code.a[obj.code.mode].pageset
  if(pageset=="1")
  {
	URL=URL.replace(/\{\$ID\}/,obj.code.a[obj.code.mode].istart);
    $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent("<.GetHtmlCode("+URL+")/>")},success:function(html){ListArticle(html,URL);}});
  }
  else if(pageset=="2")
  {let arr=(obj.code.pageurl2).split("\n");if(obj.code.reverse=="0"){reverse=0}else{reverse=arr.length-1};URL=arr[reverse];}
  else if(pageset=="3")
  {let arr=(obj.code.pageurlarticle).split("\n");if(obj.code.reverse=="0"){reverse=0}else{reverse=arr.length-1};URL=arr[reverse];}
}
function ArticleDes(htmlcode,url)
{
  let type=StrSlice(htmlcode,obj.code.c[obj.code.mode].typeA,obj.code.c[obj.code.mode].typeB)
		
	let html='\
	<tr><td colspan="3" align="center"><font id="stephit1">１. 设置基本参数</font>&nbsp;&nbsp;<font id="stephit2">２. 列表页连接设置</font>&nbsp;&nbsp;<font id="stephit3" color="red">３. 内容页连接设置</font>&nbsp;&nbsp;<font id="stephit4">４. 预览结果</font></td></tr>\
	<tr><td class="label">采集地址：</td><td colspan="2"><a href="'+url+'" target="_blank">'+url+'</a></td></tr>\
	<tr id="htmltable">\
	<td class="label">显示源码：</td><td colspan="2"><textarea id="htmlcode" style="width:950px;height:200px;font-family:Fixedsys" wrap="off" readonly>'+htmlcode+'</textarea>\
	</td>\
	</tr>\
	<tr><td class="label">说明</td><td width="425">截取开始位置</td><td>截取结束位置</td></tr>\
	<tr><td class="label">404错误特征：</td><td colspan="2"><textarea id="err404" rows="3" cols="104">'+obj.code.c[obj.code.mode].err404+'</textarea><br/>\
	如果内容中有【该字符串（每行一个特征）】，就表示是404错误，或不能用的数据。</td></tr>\
	<tr><td class="label">分类ID：</td><td><textarea id="typeA" rows="3" cols="50">'+obj.code.c[obj.code.mode].typeA+'</textarea></td><td><textarea id="typeB" rows="3" cols="50">'+obj.code.c[obj.code.mode].typeB+'</textarea></td></tr>\
	<tr><td class="label">标题：</td><td><textarea id="nameA" rows="3" cols="50">'+obj.code.c[obj.code.mode].nameA+'</textarea></td><td><textarea id="nameB" rows="3" cols="50">'+obj.code.c[obj.code.mode].nameB+'</textarea></td></tr>\
	<tr><td class="label">商品ID：</td><td><textarea id="productIDA" rows="3" cols="50">'+obj.code.c[obj.code.mode].productIDA+'</textarea></td><td><textarea id="productIDB" rows="3" cols="50">'+obj.code.c[obj.code.mode].productIDB+'</textarea></td></tr>\
	<tr><td class="label">已销售数量：</td><td><textarea id="SaleNumA" rows="3" cols="50">'+obj.code.c[obj.code.mode].SaleNumA+'</textarea></td><td><textarea id="SaleNumB" rows="3" cols="50">'+obj.code.c[obj.code.mode].SaleNumB+'</textarea></td></tr>\
	<tr><td class="label">价格：</td><td><textarea id="priceA" rows="3" cols="50">'+obj.code.c[obj.code.mode].priceA+'</textarea></td><td><textarea id="priceB" rows="3" cols="50">'+obj.code.c[obj.code.mode].priceB+'</textarea></td></tr>\
	<tr><td class="label">单位：</td><td><textarea id="unitA" rows="3" cols="50">'+obj.code.c[obj.code.mode].unitA+'</textarea><br/>自动采集【每包件数】。需格式例如：lot (4 pieces/lot)</td><td><textarea id="unitB" rows="3" cols="50">'+obj.code.c[obj.code.mode].unitB+'</textarea><br/> 结果:【单位:pieces,每包件数:4】</td></tr>\
	<tr><td class="label">关键词：</td><td><textarea id="keysA" rows="3" cols="50">'+obj.code.c[obj.code.mode].keysA+'</textarea></td><td><textarea id="keysB" rows="3" cols="50">'+obj.code.c[obj.code.mode].keysB+'</textarea></td></tr>\
	<tr><td class="label">关键词一：</td><td><textarea id="keys1A" rows="3" cols="50">'+obj.code.c[obj.code.mode].keys1A+'</textarea></td><td><textarea id="keys1B" rows="3" cols="50">'+obj.code.c[obj.code.mode].keys1B+'</textarea></td></tr>\
	<tr><td class="label">关键词二：</td><td><textarea id="keys2A" rows="3" cols="50">'+obj.code.c[obj.code.mode].keys2A+'</textarea></td><td><textarea id="keys2B" rows="3" cols="50">'+obj.code.c[obj.code.mode].keys2B+'</textarea></td></tr>\
	<tr><td class="label">折扣率：</td><td><textarea id="DiscountA" rows="3" cols="50">'+obj.code.c[obj.code.mode].DiscountA+'</textarea></td><td><textarea id="DiscountB" rows="3" cols="50">'+obj.code.c[obj.code.mode].DiscountB+'</textarea></td></tr>\
	<tr><td class="label">备货期：</td><td><textarea id="deliveryTimeA" rows="3" cols="50">'+obj.code.c[obj.code.mode].deliveryTimeA+'</textarea></td><td><textarea id="deliveryTimeB" rows="3" cols="50">'+obj.code.c[obj.code.mode].deliveryTimeB+'</textarea></td></tr>\
	<tr><td class="label">店铺名称：</td><td><textarea id="shopNameA" rows="3" cols="50">'+obj.code.c[obj.code.mode].shopNameA+'</textarea></td><td><textarea id="shopNameB" rows="3" cols="50">'+obj.code.c[obj.code.mode].shopNameB+'</textarea></td></tr>\
	<tr><td class="label">店铺地址：</td><td><textarea id="shopUrlA" rows="3" cols="50">'+obj.code.c[obj.code.mode].shopUrlA+'</textarea></td><td><textarea id="shopUrlB" rows="3" cols="50">'+obj.code.c[obj.code.mode].shopUrlB+'</textarea></td></tr>\
	<tr>\
		<td class="label">店铺地址特殊处理</td><td colspan="2">\
		<input type="radio" name="isspecialShopUrl" id="isspecialShopUrl-0" value="0" onClick="$(\'#ShopUrlTR\').hide();" '+(obj.code.c[obj.code.mode].isspecialShopUrl=="0"?'checked="checked"':'')+'/>\
		<label for="isspecialShopUrl-0">不作设置</label>\
		<input type="radio" name="isspecialShopUrl" id="isspecialShopUrl-1" value="1" onClick="$(\'#ShopUrlTR\').show()" '+(obj.code.c[obj.code.mode].isspecialShopUrl=="1"?'checked="checked"':'')+'/>\
		<label for="isspecialShopUrl-1">替换地址</label>（对于使用了JavaScript跳转形式的连接请使用此功能）\
		</td>\
	</tr>\
	<tr id="ShopUrlTR" '+(obj.code.c[obj.code.mode].isspecialShopUrl=="0"?'style="display:none"':'')+'>\
	<td class="label">店铺地址要替换的地址</td><td colspan="2"><textarea id="ShopUrlRR" rows="3" cols="100">'+obj.code.c[obj.code.mode].ShopUrlRR+'</textarea><p class="red">实际连接:/list/?[变量].html</p></td>\
	</tr>\
	<tr>\
		<td class="label">放大镜图：</td>\
		<td colspan="2">\
			<table class="tb2">\
				<tr><th>说明</th><th>截取开始位置</th><th>截取结束位置</th></tr>\
				<tr align="center"><td>首张</td><td><textarea id="picA" rows="3" cols="50">'+obj.code.c[obj.code.mode].picA+'</textarea></td><td><textarea id="picB" rows="3" cols="50">'+obj.code.c[obj.code.mode].picB+'</textarea></td></tr>\
				<tr align="center"><td>图片组列表</td><td><textarea id="PicListA" rows="3" cols="50">'+obj.code.c[obj.code.mode].PicListA+'</textarea></td><td><textarea id="PicListB" rows="3" cols="50">'+obj.code.c[obj.code.mode].PicListB+'</textarea></td></tr>\
				<tr align="center"><td>小图</td><td><textarea id="PicSmallA" rows="3" cols="50">'+obj.code.c[obj.code.mode].PicSmallA+'</textarea></td><td><textarea id="PicSmallB" rows="3" cols="50">'+obj.code.c[obj.code.mode].PicSmallB+'</textarea></td></tr>\
				<tr align="center"><td>中图</td><td colspan="2">从小图中查找<input type="text" id="PicCentreA" value="'+obj.code.c[obj.code.mode].PicCentreA+'" size=40/>替换<input type="text" id="PicCentreB" value="'+obj.code.c[obj.code.mode].PicCentreB+'" size=40/>做为中图</td></tr>\
				<tr align="center"><td>大图</td><td colspan="2">从小图中查找<input type="text" id="PicBigA" value="'+obj.code.c[obj.code.mode].PicBigA+'" size=40/>替换<input type="text" id="PicBigB" value="'+obj.code.c[obj.code.mode].PicBigB+'" size=40/>做为大图</td></tr>\
			</table>\
		</td>\
	</tr>\
	<tr>\
	  <td class="label" nowrap="nowrap">商品SKU属性：</td>\
	  <td colspan="2">\
		  <table class="tb2">\
			  <tr>\
				  <th colspan="3" style="text-align:left">获取商品属性方式：\
					  <input type="radio" name="attributemode" value="0" '+(obj.code.c[obj.code.mode].attributemode=="0"?'checked="checked"':'')+' id="attributemode-0"><label for="attributemode-0">不采集分类属性</label>\
					  <input type="radio" name="attributemode" value="1" '+(obj.code.c[obj.code.mode].attributemode=="1"?'checked="checked"':'')+' id="attributemode-1"><label for="attributemode-1">以【内部分类属性】为标准</label>\
					  <input type="radio" name="attributemode" value="2" '+(obj.code.c[obj.code.mode].attributemode=="2"?'checked="checked"':'')+' id="attributemode-2"><label for="attributemode-2">以【速卖通分类属性】为标准</label>\
					  <input type="radio" name="attributemode" value="3" '+(obj.code.c[obj.code.mode].attributemode=="3"?'checked="checked"':'')+' id="attributemode-3"><label for="attributemode-3">以【敦煌网分类属性】为标准</label>\
				  </th>\
			  </tr>\
			  <tr align="center"><td>说明</td><td>截取开始位置</td><td>截取结束位置</td></tr>\
			  <tr align="center"><td>价格组</td><td><textarea id="skuPriceA" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuPriceA+'</textarea></td><td><textarea id="skuPriceB" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuPriceB+'</textarea></td></tr>\
			  <tr align="center"><td>库存组</td><td><textarea id="skuInventoryA" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuInventoryA+'</textarea></td><td><textarea id="skuInventoryB" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuInventoryB+'</textarea></td></tr>\
			  <tr align="center"><td>图片组</td><td><textarea id="skuImgA" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuImgA+'</textarea></td><td><textarea id="skuImgB" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuImgB+'</textarea></td></tr>\
			  <tr align="center"><td>二次截取图片组</td><td><textarea id="skuImg2A" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuImg2A+'</textarea></td><td><textarea id="skuImg2B" rows="3" cols="50">'+obj.code.c[obj.code.mode].skuImg2B+'</textarea></td></tr>\
		  </table>\
	  </td>\
	</tr>\
	<tr>\
	  <td class="label">运费相关：</td>\
	  <td colspan="2">\
		<table class="tb2">\
		  <tr align="center"><td>说明</td><td>截取开始位置</td><td>截取结束位置</td></tr>\
		  <tr>\
		  <td class="label">获取运费相关方式:</td>\
		  <td colspan="2">\
		  <input type="radio" name="ShippingCostMode" value="0" '+(obj.code.c[obj.code.mode].ShippingCostMode=="0"?'checked="checked"':'')+'  id="ShippingCostMode-0" onClick="$(\'#ShippingCost\').hide()">\
		  <label for="ShippingCostMode-0">在该页获取</label>\
		  <input type="radio" name="ShippingCostMode" value="1" '+(obj.code.c[obj.code.mode].ShippingCostMode=="1"?'checked="checked"':'')+' id="ShippingCostMode-1" onClick="$(\'#ShippingCost\').show()">\
		  <label for="ShippingCostMode-1">在基它页获取</label>\
		  </td>\
		  </tr>\
		  <tbody id="ShippingCost" '+(obj.code.c[obj.code.mode].ShippingCostMode=="1"?'':'style="display:none"')+'>\
		  <tr><td class="label">基它页的{$ID}:</td><td><textarea id="ShippingCostA" rows="3" cols="50">'+obj.code.c[obj.code.mode].ShippingCostA+'</textarea></td><td><textarea id="ShippingCostB" rows="3" cols="50">'+obj.code.c[obj.code.mode].ShippingCostB+'</textarea></td></tr>\
		  <tr><td class="label">基它页的链接:</td><td colspan="2" align="left"><input type="text" size=100 id="ShippingCostLink" value="'+obj.code.c[obj.code.mode].ShippingCostLink+'"/>&nbsp;变量<font color="red">{$ID}</font></td></tr>\
		  </tbody>\
		  <tr><td class="label">单重量：</td><td><textarea id="weightA" rows="3" cols="50">'+obj.code.c[obj.code.mode].weightA+'</textarea></td><td><textarea id="weightB" rows="3" cols="50">'+obj.code.c[obj.code.mode].weightB+'</textarea></td></tr>\
		  <tr><td class="label">长：</td><td><textarea id="lengthA" rows="3" cols="50">'+obj.code.c[obj.code.mode].lengthA+'</textarea></td><td><textarea id="lengthB" rows="3" cols="50">'+obj.code.c[obj.code.mode].lengthB+'</textarea></td></tr>\
		  <tr><td class="label">宽：</td><td><textarea id="widthA" rows="3" cols="50">'+obj.code.c[obj.code.mode].widthA+'</textarea></td><td><textarea id="widthB" rows="3" cols="50">'+obj.code.c[obj.code.mode].widthB+'</textarea></td></tr>\
		  <tr><td class="label">高：</td><td><textarea id="heightA" rows="3" cols="50">'+obj.code.c[obj.code.mode].heightA+'</textarea></td><td><textarea id="heightB" rows="3" cols="50">'+obj.code.c[obj.code.mode].heightB+'</textarea></td></tr>\
		</table>\
	  </td>\
	</tr>\
	<tr>\
		<td class="label">描述相关：</td>\
		<td colspan="2">\
		<table>\
		  <tr align="center"><td>说明</td><td>截取开始位置</td><td>截取结束位置</td></tr>\
		  <tr>\
		  <td class="label">获取描述相关方式:</td>\
		  <td colspan="2">\
		  <input type="radio" name="ItemDescriptionMode" value="0" '+(obj.code.c[obj.code.mode].ItemDescriptionMode=="0"?'checked="checked"':'')+'  id="ItemDescriptionMode-0" onClick="$(\'#ItemDescription\').hide()">\
		  <label for="ItemDescriptionMode-0">在该页获取</label>\
		  <input type="radio" name="ItemDescriptionMode" value="1" '+(obj.code.c[obj.code.mode].ItemDescriptionMode=="1"?'checked="checked"':'')+' id="ItemDescriptionMode-1" onClick="$(\'#ItemDescription\').show()">\
		  <label for="ItemDescriptionMode-1">在基它页获取</label>\
		  </td>\
		  </tr>\
		  <tbody id="ItemDescription" '+(obj.code.c[obj.code.mode].ItemDescriptionMode=="1"?'':'style="display:none"')+'>\
		  <tr><td class="label">基它页的{$ID}:</td><td><textarea id="ItemDescriptionA" rows="3" cols="50">'+obj.code.c[obj.code.mode].ItemDescriptionA+'</textarea></td><td><textarea id="ItemDescriptionB" rows="3" cols="50">'+obj.code.c[obj.code.mode].ItemDescriptionB+'</textarea></td></tr>\
		  <tr><td class="label">基它页的链接:</td><td colspan="2" align="left"><input type="text" size=100 id="ItemDescriptionLink" value="'+obj.code.c[obj.code.mode].ItemDescriptionLink+'"/>&nbsp;变量<font color="red">{$ID}</font></td></tr>\
		  </tbody>\
		  <tr>\
			  <td class="label">自定义属性：</td>\
			  <td colspan="2">\
				<table class="tb2">\
				  <tr><th>说明</th><th>截取开始位置</th><th>截取结束位置</th></tr>\
				  <tr><td>列表</td><td><textarea id="PropertysListA" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysListA+'</textarea></td><td><textarea id="PropertysListB" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysListB+'</textarea></td></tr>\
				  <tr><td>左边</td><td><textarea id="PropertysLeftA" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysLeftA+'</textarea></td><td><textarea id="PropertysLeftB" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysLeftB+'</textarea></td></tr>\
				  <tr><td>右边</td><td><textarea id="PropertysRightA" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysRightA+'</textarea></td><td><textarea id="PropertysRightB" rows="3" cols="50">'+obj.code.c[obj.code.mode].PropertysRightB+'</textarea></td></tr>\
				</table>\
			  </td>\
		  </tr>\
		  <tr><td class="label">商品系统属性：</td><td colspan="2"><table class="tb2"><tr><th nowrap="nowrap">ID/属性名/英文</th><th>SKU</th><th>截取属性值ID开始</th><th>截取属性值ID结束</th><th>截取属性值名称开始</th><th>截取属性名称结束</th><th>显示方式</th><th>标签说明</th></tr><tbody id="attributeSTR"><tbody></table></td></tr>\
		  <tr id="desbody">\
			  <td class="label">正文：</td>\
			  <td colspan="2">\
				  <table class="tb2">\
					  <tr>\
					  <th style="text-align:left" colspan="3">获取正文方式:\
					  <input type="radio" name="desmode" value="0"'+(obj.code.c[obj.code.mode].desmode=="0"?'checked="checked"':'')+'  id="desmode-0">\
					  <label for="desmode-0">在该页获取</label>\
					  <input type="radio" name="desmode"'+(obj.code.c[obj.code.mode].desmode=="1"?'checked="checked"':'')+' value="1" id="desmode-1">\
					  <label for="desmode-1">在基它页获取</label>\
					  </th>\
					  </tr>\
					  <tr align="center"><td>说明</td><td>截取开始位置</td><td>截取结束位置</td></tr>\
					  <tr align="center"><td>正文</td><td><textarea id="desA" rows="3" cols="50">'+obj.code.c[obj.code.mode].desA+'</textarea></td><td><textarea id="desB" rows="3" cols="50">'+obj.code.c[obj.code.mode].desB+'</textarea></td></tr>\
					  <tr align="center"><td>基它页的链接</td><td colspan="2" align="left"><input type="text" size=100 id="DesLink" value="'+obj.code.c[obj.code.mode].DesLink+'"/>&nbsp;变量<font color="red">{$ID}</font></td></tr>\
					  <tr align="center"><td>说明</td><td>截取开始位置</td><td>截取结束位置</td></tr>\
					  <tr align="center"><td>其它页</td><td><textarea id="des2A" rows="3" cols="50">'+obj.code.c[obj.code.mode].des2A+'</textarea></td><td><textarea id="des2B" rows="3" cols="50">'+obj.code.c[obj.code.mode].des2B+'</textarea></td></tr>\
					  <tr align="center"><td>屏蔽内容</td><td><textarea id="shieldA" rows="3" cols="50">'+obj.code.c[obj.code.mode].shieldA+'</textarea></td><td><textarea id="shieldB" rows="3" cols="50">'+obj.code.c[obj.code.mode].shieldB+'</textarea></td></tr>\
				  </table>\
			  </td>\
		  </tr>\
		\
		</table>\
		</td>\
	</tr>\
	<tr>\
	  <td class="label">产品评论：</td>\
	  <td colspan="2">\
		<table class="tb2">\
		  <tr align="center"><th>说明</th><th>截取开始位置</th><th>截取结束位置</th></tr>\
		  <tr align="center"><td>变量</td><td><textarea id="reviewIA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.IA+'</textarea></td><td><textarea id="reviewIB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.IB+'</textarea></td></tr>\
		  <tr align="center"><td>基它页的链接</td><td colspan="2" align="left"><input type="text" size=130 id="reviewLink" value="'+obj.code.c[obj.code.mode].review.Link+'"/><font color="red">{$变量}</font>;<font color="red">{$页码}</font>;</td></tr>\
		  <tr align="center"><td>总页数</td><td><textarea id="reviewPageTotalA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.PageTotalA+'</textarea></td><td><textarea id="reviewPageTotalB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.PageTotalB+'</textarea></td></tr>\
		  <tr align="center"><td>用户名</td><td><textarea id="reviewNameA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.NameA+'</textarea></td><td><textarea id="reviewNameB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.NameB+'</textarea></td></tr>\
		  <tr align="center"><td>国家代码</td><td><textarea id="reviewCountryCodeA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.CountryCodeA+'</textarea></td><td><textarea id="reviewCountryCodeB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.CountryCodeB+'</textarea></td></tr>\
		  <tr align="center"><td>国家</td><td><textarea id="reviewCountryNameA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.CountryNameA+'</textarea></td><td><textarea id="reviewCountryNameB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.CountryNameB+'</textarea></td></tr>\
		  <tr align="center"><td>等级</td><td><textarea id="reviewRankA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.RankA+'</textarea></td><td><textarea id="reviewRankB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.RankB+'</textarea></td></tr>\
		  <tr align="center"><td>单价</td><td><textarea id="reviewPriceA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.PriceA+'</textarea></td><td><textarea id="reviewPriceB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.PriceB+'</textarea></td></tr>\
		  <tr align="center"><td>数量</td><td><textarea id="reviewQuantityA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.QuantityA+'</textarea></td><td><textarea id="reviewQuantityB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.QuantityB+'</textarea></td></tr>\
		  <tr align="center"><td>单位</td><td><textarea id="reviewUnitA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.UnitA+'</textarea></td><td><textarea id="reviewUnitB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.UnitB+'</textarea></td></tr>\
		  <tr align="center"><td>每包数量</td><td><textarea id="reviewLotNumA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.LotNumA+'</textarea></td><td><textarea id="reviewLotNumB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.LotNumB+'</textarea></td></tr>\
		  <tr align="center"><td>星级</td><td><textarea id="reviewStarA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.StarA+'</textarea></td><td><textarea id="reviewStarB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.StarB+'</textarea></td></tr>\
		  <tr align="center"><td>日期</td><td><textarea id="reviewDateA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DateA+'</textarea></td><td><textarea id="reviewDateB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DateB+'</textarea></td></tr>\
		  <tr align="center"><td>买家反馈</td><td><textarea id="reviewBuyerFeedbackA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.BuyerFeedbackA+'</textarea></td><td><textarea id="reviewBuyerFeedbackB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.BuyerFeedbackB+'</textarea></td></tr>\
		  <tr align="center"><td>供应商的回复</td><td><textarea id="reviewSupplierReplyA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.SupplierReplyA+'</textarea></td><td><textarea id="reviewSupplierReplyB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.SupplierReplyB+'</textarea></td></tr>\
		  <tr align="center"><td>买方的答复</td><td><textarea id="reviewBuyerReplyA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.BuyerReplyA+'</textarea></td><td><textarea id="reviewBuyerReplyB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.BuyerReplyB+'</textarea></td></tr>\
		  <tr align="center"><td>顶</td><td><textarea id="reviewDiggUpA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DiggUpA+'</textarea></td><td><textarea id="reviewDiggUpB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DiggUpB+'</textarea></td></tr>\
		  <tr align="center"><td>踩</td><td><textarea id="reviewDiggDownA" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DiggDownA+'</textarea></td><td><textarea id="reviewDiggDownB" rows="3" cols="50">'+obj.code.c[obj.code.mode].review.DiggDownB+'</textarea></td></tr>\
		</table>\
	  </td>\
	</tr>\
	<tr>\
	<td class="label"></td>\
	<td>\
	  <a href="javascript:" class="button left" onClick="prestep()">上一步</a>\
	  <a href="javascript:" class="button" onClick="nextstep()">下一步</a>\
	</td>\
	</tr>'
	$("#table").html(html)
	if(obj.code.c[obj.code.mode].attributemode=="2"){typestr(type);}
  
}
function ListArticle(html,URL)
{
  html=html.replace(/\<\/textarea\>/ig,"&lt;/textarea&gt;");
  let txt=StrSlice(html,obj.code.b[obj.code.mode].listA,obj.code.b[obj.code.mode].listB);
  if(txt===false)
  {
		$("#table").html('<tr><td colspan="2" align="center"><font id="stephit1">１. 设置基本参数</font>&nbsp;&nbsp;<font id="stephit2">２. 列表页连接设置</font>&nbsp;&nbsp;<font id="stephit3" color="red">３. 内容页连接设置</font>&nbsp;&nbsp;<font id="stephit4">４. 预览结果</font></td></tr><tr><td class="label">采集地址：</td><td><a href="'+URL+'" target="_blank">'+URL+'</a></td></tr><tr><td class="label">出错说明：</td><td>获取【列表链接】不正确</td></tr><tr><td class="label">出错内容：</td><td><textarea rows="10" style="width:98%;" id="viewsource" fromurl="'+URL+'">'+html+'</textarea></td></tr><tr><td class="label"></td><td><a href="javascript:" class="button left" onClick="prestep()">上一步</a><a href="javascript:" class="button left" onClick="subListStr()">提交源码</a></td></tr>');
	}
  else
  {
		txt=StrSlice(txt,obj.code.b[obj.code.mode].mlinkA,obj.code.b[obj.code.mode].mlinkB);
		if(txt===false){if(!confirm("截取 链接开始~数据链接结束 失败\n\n点[确定]忽略这错误提示，[取消]返回修改")){return;}}
		if(obj.code.b[obj.code.mode].isspecialmlink=="1"){txt=obj.code.b[obj.code.mode].mlinkRR.replace("[变量]",txt)}//特殊链接处理
	  listHtml(txt)
  }
}
function subListStr(){ListArticle($("#viewsource").val(),$("#viewsource").attr("fromurl"))}
function subArticleDes(){ArticleDes($("#viewsource").val(),$("#viewsource").attr("fromurl"))}
function StrSlice(Str,sStr,eStr){
  if(eStr=='') return false;
  let tStr=Str.toLowerCase(),iPos=tStr.indexOf(sStr.toLowerCase()),sLen=sStr.length;
  if(iPos==-1) return false;
  iPos=sLen>0 ? iPos+sLen : 0;
  return Str.substr(iPos,tStr.slice(iPos).indexOf(eStr.toLowerCase()));
}
function nextstep(){
  obj.code.mode=obj.code.mode//手机版  或   电脑版
  obj.code.c[obj.code.mode].err404=$("#err404").val();//404错误特征
  obj.code.c[obj.code.mode].typeA=$("#typeA").val();obj.code.c[obj.code.mode].typeB=$("#typeB").val()//分类ID
  obj.code.c[obj.code.mode].nameA=$("#nameA").val();obj.code.c[obj.code.mode].nameB=$("#nameB").val()//标题
  obj.code.c[obj.code.mode].productIDA=$("#productIDA").val();obj.code.c[obj.code.mode].productIDB=$("#productIDB").val()//商品ID
  obj.code.c[obj.code.mode].SaleNumA=$("#SaleNumA").val();obj.code.c[obj.code.mode].SaleNumB=$("#SaleNumB").val()//已销售数量
  obj.code.c[obj.code.mode].priceA=$("#priceA").val();obj.code.c[obj.code.mode].priceB=$("#priceB").val()//价格
  obj.code.c[obj.code.mode].unitA=$("#unitA").val();obj.code.c[obj.code.mode].unitB=$("#unitB").val()//单位
  obj.code.c[obj.code.mode].keysA=$("#keysA").val();obj.code.c[obj.code.mode].keysB=$("#keysB").val()//关键词
  obj.code.c[obj.code.mode].keys1A=$("#keys1A").val();obj.code.c[obj.code.mode].keys1B=$("#keys1B").val()//关键词一
  obj.code.c[obj.code.mode].keys2A=$("#keys2A").val();obj.code.c[obj.code.mode].keys2B=$("#keys2B").val()//关键词二
  obj.code.c[obj.code.mode].DiscountA=$("#DiscountA").val();obj.code.c[obj.code.mode].DiscountB=$("#DiscountB").val()//折扣率
  obj.code.c[obj.code.mode].deliveryTimeA=$("#deliveryTimeA").val();obj.code.c[obj.code.mode].deliveryTimeB=$("#deliveryTimeB").val()//备货期
  obj.code.c[obj.code.mode].shopNameA=$("#shopNameA").val();obj.code.c[obj.code.mode].shopNameB=$("#shopNameB").val()//店铺名称
  obj.code.c[obj.code.mode].shopUrlA=$("#shopUrlA").val();obj.code.c[obj.code.mode].shopUrlB=$("#shopUrlB").val()//店铺地址
  obj.code.c[obj.code.mode].picA=$("#picA").val();obj.code.c[obj.code.mode].picB=$("#picB").val()//放大镜图（首张）
  obj.code.c[obj.code.mode].PicListA=$("#PicListA").val();obj.code.c[obj.code.mode].PicListB=$("#PicListB").val()//放大镜图（列表）
  obj.code.c[obj.code.mode].PicSmallA=$("#PicSmallA").val();obj.code.c[obj.code.mode].PicSmallB=$("#PicSmallB").val()//放大镜图（小）
  obj.code.c[obj.code.mode].PicCentreA=$("#PicCentreA").val();obj.code.c[obj.code.mode].PicCentreB=$("#PicCentreB").val()//放大镜图（中）
  obj.code.c[obj.code.mode].PicBigA=$("#PicBigA").val();obj.code.c[obj.code.mode].PicBigB=$("#PicBigB").val()//放大镜图（大）
  obj.code.c[obj.code.mode].attributemode=$("[name='attributemode']:checked").val();//获取商品属性方式
  obj.code.c[obj.code.mode].skuPriceA=$("#skuPriceA").val();obj.code.c[obj.code.mode].skuPriceB=$("#skuPriceB").val()//价格组
  obj.code.c[obj.code.mode].skuInventoryA=$("#skuInventoryA").val();obj.code.c[obj.code.mode].skuInventoryB=$("#skuInventoryB").val()//库存组
  obj.code.c[obj.code.mode].skuImgA=$("#skuImgA").val();obj.code.c[obj.code.mode].skuImgB=$("#skuImgB").val()//图片组
  obj.code.c[obj.code.mode].skuImg2A=$("#skuImg2A").val();obj.code.c[obj.code.mode].skuImg2B=$("#skuImg2B").val()//二次截取图片组
  obj.code.c[obj.code.mode].ShippingCostMode=$("[name='ShippingCostMode']:checked").val();//获取运费相关方式
  obj.code.c[obj.code.mode].ShippingCostA=$("#ShippingCostA").val();obj.code.c[obj.code.mode].ShippingCostB=$("#ShippingCostB").val()//基它页的{$ID}
  obj.code.c[obj.code.mode].ShippingCostLink=$("#ShippingCostLink").val();//基它页的链接
  obj.code.c[obj.code.mode].weightA=$("#weightA").val();obj.code.c[obj.code.mode].weightB=$("#weightB").val()//单重量
  obj.code.c[obj.code.mode].lengthA=$("#lengthA").val();obj.code.c[obj.code.mode].lengthB=$("#lengthB").val()//长
  obj.code.c[obj.code.mode].widthA=$("#widthA").val();obj.code.c[obj.code.mode].widthB=$("#widthB").val()//宽
  obj.code.c[obj.code.mode].heightA=$("#heightA").val();obj.code.c[obj.code.mode].heightB=$("#heightB").val()//高
  obj.code.c[obj.code.mode].ItemDescriptionMode=$("[name='ItemDescriptionMode']:checked").val();//获取描述相关方式
  obj.code.c[obj.code.mode].isspecialShopUrl=$("[name='isspecialShopUrl']:checked").val();//店铺地址特殊处理
  obj.code.c[obj.code.mode].ShopUrlRR=$("#ShopUrlRR").val();//店铺地址要替换的地址
  obj.code.c[obj.code.mode].ItemDescriptionA=$("#ItemDescriptionA").val();obj.code.c[obj.code.mode].ItemDescriptionB=$("#ItemDescriptionB").val()//基它页的{$ID}
  obj.code.c[obj.code.mode].ItemDescriptionLink=$("#ItemDescriptionLink").val();//基它页的链接
  obj.code.c[obj.code.mode].PropertysListA=$("#PropertysListA").val();obj.code.c[obj.code.mode].PropertysListB=$("#PropertysListB").val()//自定义属性（列表）
  obj.code.c[obj.code.mode].PropertysLeftA=$("#PropertysLeftA").val();obj.code.c[obj.code.mode].PropertysLeftB=$("#PropertysLeftB").val()//自定义属性（左边）
  obj.code.c[obj.code.mode].PropertysRightA=$("#PropertysRightA").val();obj.code.c[obj.code.mode].PropertysRightB=$("#PropertysRightB").val()//自定义属性（右边）
  obj.code.c[obj.code.mode].desmode=$("[name='desmode']:checked").val();//获取正文方式
  obj.code.c[obj.code.mode].desA=$("#desA").val();obj.code.c[obj.code.mode].desB=$("#desB").val()//正文
  obj.code.c[obj.code.mode].DesLink=$("#DesLink").val()//基它页的链接
  obj.code.c[obj.code.mode].des2A=$("#des2A").val();obj.code.c[obj.code.mode].des2B=$("#des2B").val()//其它页（正文）
  obj.code.c[obj.code.mode].shieldA=$("#shieldA").val();obj.code.c[obj.code.mode].shieldB=$("#shieldB").val()//屏蔽内容
  obj.code.c[obj.code.mode].review.IA=$("#reviewIA").val();obj.code.c[obj.code.mode].review.IB=$("#reviewIB").val()//变量
  obj.code.c[obj.code.mode].review.Link=$("#reviewLink").val();//基它页的链接
  obj.code.c[obj.code.mode].review.PageTotalA=$("#reviewPageTotalA").val();obj.code.c[obj.code.mode].review.PageTotalB=$("#reviewPageTotalB").val()//总页数
  obj.code.c[obj.code.mode].review.NameA=$("#reviewNameA").val();obj.code.c[obj.code.mode].review.NameB=$("#reviewNameB").val()//用户名
  obj.code.c[obj.code.mode].review.CountryCodeA=$("#reviewCountryCodeA").val();obj.code.c[obj.code.mode].review.CountryCodeB=$("#reviewCountryCodeB").val()//国家代码
  obj.code.c[obj.code.mode].review.CountryNameA=$("#reviewCountryNameA").val();obj.code.c[obj.code.mode].review.CountryNameB=$("#reviewCountryNameB").val()//国家
  obj.code.c[obj.code.mode].review.RankA=$("#reviewRankA").val();obj.code.c[obj.code.mode].review.RankB=$("#reviewRankB").val()//等级
  obj.code.c[obj.code.mode].review.PriceA=$("#reviewPriceA").val();obj.code.c[obj.code.mode].review.PriceB=$("#reviewPriceB").val()//单价
  obj.code.c[obj.code.mode].review.QuantityA=$("#reviewQuantityA").val();obj.code.c[obj.code.mode].review.QuantityB=$("#reviewQuantityB").val()//数量
  obj.code.c[obj.code.mode].review.UnitA=$("#reviewUnitA").val();obj.code.c[obj.code.mode].review.UnitB=$("#reviewUnitB").val()//单位
  obj.code.c[obj.code.mode].review.LotNumA=$("#reviewLotNumA").val();obj.code.c[obj.code.mode].review.LotNumB=$("#reviewLotNumB").val()//每包数量
  obj.code.c[obj.code.mode].review.StarA=$("#reviewStarA").val();obj.code.c[obj.code.mode].review.StarB=$("#reviewStarB").val()//星级
  obj.code.c[obj.code.mode].review.DateA=$("#reviewDateA").val();obj.code.c[obj.code.mode].review.DateB=$("#reviewDateB").val()//日期
  obj.code.c[obj.code.mode].review.BuyerFeedbackA=$("#reviewBuyerFeedbackA").val();obj.code.c[obj.code.mode].review.BuyerFeedbackB=$("#reviewBuyerFeedbackB").val()//买家反馈
  obj.code.c[obj.code.mode].review.SupplierReplyA=$("#reviewSupplierReplyA").val();obj.code.c[obj.code.mode].review.SupplierReplyB=$("#reviewSupplierReplyB").val()//供应商的回复
  obj.code.c[obj.code.mode].review.BuyerReplyA=$("#reviewBuyerReplyA").val();obj.code.c[obj.code.mode].review.BuyerReplyB=$("#reviewBuyerReplyB").val()//买方的答复
  obj.code.c[obj.code.mode].review.DiggUpA=$("#reviewDiggUpA").val();obj.code.c[obj.code.mode].review.DiggUpB=$("#reviewDiggUpB").val()//顶
  obj.code.c[obj.code.mode].review.DiggDownA=$("#reviewDiggDownA").val();obj.code.c[obj.code.mode].review.DiggDownB=$("#reviewDiggDownB").val()//踩
  obj.code.c[obj.code.mode].skuattr=skuattr()
  let html="<r: tag=\"sql\">update @.gatherURL set @.code='"+(JSON.stringify(obj.code)).replace(/'/ig, "''")+"' where @.id="+obj.arr4+"</r:>";  
  $.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:encodeURIComponent(html)},success:function(txt){maincontent(obj.typeLink4);}});
}
function skuattr(){
  let attr=[],i=0,val
  $("[name='attr']").each(function(){
	  val=$(this).attr("var");attr[i]=Object();
	  attr[i].A=$(this).val();attr[i].B=$("#attr"+val+"B").val()
	  attr[i].NameA=$("#attrName"+val+"A").val();attr[i].NameB=$("#attrName"+val+"B").val()
	  i++
  })
  return attr
}
function prestep(){maincontent(obj.typeLink2);}