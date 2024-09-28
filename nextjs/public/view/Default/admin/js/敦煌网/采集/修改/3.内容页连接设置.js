'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
    let str='\
    <r:gather db="sqlite.dhgate" size=1 where=" where @.id='+obj.arr[4]+'">\
    {\
      "code":<:code/>,\
      "note":"<:note tag=js/>",\
      "sort":"<:sort/>",\
      "name":"<:name tag=js/>"\
    }\
    </r:gather>'
	  Tool.ajax.a01(str,1,this.a02,this)
  },
  a02:function(obj2)
  {
		this.obj=obj2;
		gg.isRD(this.a03,this)
  },
  a03:function(html)
  {
    this.obj.URL=this.b01(this.obj.code.a);
		gg.getFetch(this.obj.URL,"text",this.a04,this);
  },
  a04:function(html)
  {
		let txt=Tool.StrSlice(html,this.obj.code.b.listA,this.obj.code.b.listB);
		if(txt===false)
		{
			$("#table").html('<a href="'+this.obj.URL+'" target="_blank">'+this.obj.URL+'</a>')
			alert('获取【列表链接】不正确');
		}
		else
		{
			let proid=Tool.StrSlice(txt,this.obj.code.b.proidA,this.obj.code.b.proidB);
			if(proid===false){if(!confirm("截取 链接开始~数据链接结束 失败\n\n点[确定]忽略这错误提示，[取消]返回修改")){return;}};
			if(this.obj.code.b.isspecialmlink=="1"){proid=this.obj.code.b.mlinkRR.replace("[变量]",proid)}//特殊链接处理
			this.obj.URL2=proid;
			gg.getFetch(this.obj.URL2,"text",this.a05,this);
		}
  },
  a05:function(htmlcode)
	{
		let codeC=this.obj.code.c
    if(!codeC){codeC=this.b03();}
		let type=Tool.StrSlice(htmlcode,codeC.typeA,codeC.typeB)
		htmlcode=htmlcode.replace(/\<\/textarea\>/ig,"&lt;/textarea&gt;");
		let html='\
    <header class="panel-heading">\
			<a class="arrow_back" onclick="Tool.main();"></a>\
			<div onclick="Tool.main(\'js01/'+obj.arr[4]+'\');">１. 设置基本参数</div>\
			<div onclick="Tool.main(\'js02/'+obj.arr[4]+'\');">２. 列表页连接设置</div>\
			<div onclick="Tool.main(\'js03/'+obj.arr[4]+'\');" class="active">３. 内容页连接设置</div>\
			<div onclick="Tool.main(\'js04/'+obj.arr[4]+'/1\');">４. 预览结果</div>\
    </header>\
		<div class="p-2">\
		<table class="table table-hover mb-0 align-middle">\
			<tr>\
				<td class="w150 right">列表页地址：</td>\
				<td><a href="'+this.obj.URL+'" target="_blank">'+this.obj.URL+'</a></td>\
			</tr>\
			<tr>\
				<td class="right">内容页地址：</td>\
				<td><a href="'+this.obj.URL2+'" target="_blank">'+this.obj.URL2+'</a></td>\
			</tr>\
			<tr>\
				<td class="right">显示源码：</td>\
				<td><textarea id="htmlcode" style="height:200px;" class="form-control" wrap="off" readonly>'+htmlcode+'</textarea></td>\
			</tr>\
		</table>\
		<ul class="makeHtmlTab" style="clear: both;">\
      <li class="hover" onclick="fun.c01($(this),1)">基本信息</li>\
      <li onclick="fun.c01($(this),2)">放大镜图</li>\
      <li onclick="fun.c01($(this),3)">价格相关</li>\
      <li onclick="fun.c01($(this),4)">属性</li>\
      <li onclick="fun.c01($(this),5)">正文</li>\
      <li onclick="fun.c01($(this),6)">评论</li>\
      <li onclick="fun.c01($(this),7)">店铺</li>\
		</ul>\
		<table lable="1" class="table table-hover align-middle">\
      <tr>\
        <td class="w150 right">404错误特征：</td>\
        <td class="w-50"><textarea id="err404" rows="3" class="form-control">'+codeC.err404+'</textarea></td>\
        <td>如果内容中有【该字符串（每行一个特征）】，就表示是404错误。</td>\
      </tr>\
		  <tr>\
        <td class="right">已下架特征：</td>\
        <td><textarea id="shelf" rows="3" class="form-control">'+codeC.shelf+'</textarea></td>\
		    <td>如果内容中有【该字符串（每行一个特征）】，就表示是已下架。</td>\
      </tr>\
		  <tr class="table-light">\
        <th></th>\
        <th>截取开始位置：</th>\
        <th>截取结束位置：</th>\
      </tr>\
		  <tr>\
        <td class="w150 right">分类ID：</td>\
        <td><textarea id="typeA" rows="3" class="form-control">'+codeC.typeA+'</textarea></td>\
        <td><textarea id="typeB" rows="3" class="form-control">'+codeC.typeB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">标题：</td>\
        <td><textarea id="nameA" rows="3" class="form-control">'+codeC.nameA+'</textarea></td>\
        <td><textarea id="nameB" rows="3" class="form-control">'+codeC.nameB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">商品ID：</td>\
        <td><textarea id="productIDA" rows="3" class="form-control">'+codeC.productIDA+'</textarea></td>\
        <td><textarea id="productIDB" rows="3" class="form-control">'+codeC.productIDB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">已销售数量：</td>\
        <td><textarea id="SaleNumA" rows="3" class="form-control">'+codeC.SaleNumA+'</textarea></td>\
        <td><textarea id="SaleNumB" rows="3" class="form-control">'+codeC.SaleNumB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">评论数量：</li>\
        <td><textarea id="ReviewsNumA" rows="3" class="form-control">'+codeC.ReviewsNumA+'</textarea></td>\
        <td><textarea id="ReviewsNumB" rows="3" class="form-control">'+codeC.ReviewsNumB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">单位：</td>\
        <td><textarea id="unitA" rows="3" class="form-control">'+codeC.unitA+'</textarea></td>\
        <td><textarea id="unitB" rows="3" class="form-control">'+codeC.unitB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">每包件数：</td>\
        <td><textarea id="lotNumA" rows="3" class="form-control">'+codeC.lotNumA+'</textarea></td>\
        <td><textarea id="lotNumB" rows="3" class="form-control">'+codeC.lotNumB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">关键词：</td>\
        <td><textarea id="keywordsA" rows="3" class="form-control">'+codeC.keywordsA+'</textarea></td>\
        <td><textarea id="keywordsB" rows="3" class="form-control">'+codeC.keywordsB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">关键词描述：</td>\
        <td><textarea id="descriptionA" rows="3" class="form-control">'+codeC.descriptionA+'</textarea></td>\
        <td><textarea id="descriptionB" rows="3" class="form-control">'+codeC.descriptionB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">折扣率：</td>\
        <td><textarea id="DiscountA" rows="3" class="form-control">'+codeC.DiscountA+'</textarea></td>\
        <td><textarea id="DiscountB" rows="3" class="form-control">'+codeC.DiscountB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">备货期：</td>\
        <td><textarea id="deliveryTimeA" rows="3" class="form-control">'+codeC.deliveryTimeA+'</textarea></td>\
        <td><textarea id="deliveryTimeB" rows="3" class="form-control">'+codeC.deliveryTimeB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">视频地址：</td>\
        <td><textarea id="videoUrlA" rows="3" class="form-control">'+codeC.videoUrlA+'</textarea></td>\
        <td><textarea id="videoUrlB" rows="3" class="form-control">'+codeC.videoUrlB+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="2" class="table table-hover align-middle" style="display: none;">\
			<tr class="table-light">\
        <th class="w150"></th>\
        <th>截取开始位置：</th>\
				<th>截取结束位置：</th>\
      </tr>\
			<tr>\
        <td class="right">图片组列表：</td>\
        <td><textarea id="PicListA" rows="3" class="form-control">'+codeC.PicListA+'</textarea></td>\
        <td><textarea id="PicListB" rows="3" class="form-control">'+codeC.PicListB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">图片：</td>\
        <td><textarea id="PicA" rows="3" class="form-control">'+codeC.PicA+'</textarea></td>\
        <td><textarea id="PicB" rows="3" class="form-control">'+codeC.PicB+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="3" class="table table-hover align-middle" style="display: none;">\
			<tr class="table-light">\
        <th class="w150"></th>\
        <th>截取开始位置：</th>\
        <th>截取结束位置：</th>\
      </tr>\
			<tr>\
        <td class="right">SKU【JS代码】：</td>\
        <td><textarea id="skuA" rows="3" class="form-control">'+codeC.skuA+'</textarea></td>\
        <td><textarea id="skuB" rows="3" class="form-control">'+codeC.skuB+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="4" class="table table-hover align-middle" style="display: none;">\
			<tr class="table-light"><th class="w150"></th><th>截取开始位置:</th><th>截取结束位置:</th></tr>\
			<tr>\
        <td class="right" title="这个值 ，主要用于选择【运费模板】用的。">单重量：</td>\
        <td><textarea id="weightA" rows="3" class="form-control">'+codeC.weightA+'</textarea></td>\
        <td><textarea id="weightB" rows="3" class="form-control">'+codeC.weightB+'</textarea></td>\
			</tr>\
			<tr>\
        <td class="right">列表：</td>\
        <td><textarea id="PropertysListA" rows="3" class="form-control">'+codeC.PropertysListA+'</textarea></td>\
        <td><textarea id="PropertysListB" rows="3" class="form-control">'+codeC.PropertysListB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">左边：</td>\
        <td><textarea id="PropertysLeftA" rows="3" class="form-control">'+codeC.PropertysLeftA+'</textarea></td>\
        <td><textarea id="PropertysLeftB" rows="3" class="form-control">'+codeC.PropertysLeftB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">右边：</td>\
        <td><textarea id="PropertysRightA" rows="3" class="form-control">'+codeC.PropertysRightA+'</textarea></td>\
        <td><textarea id="PropertysRightB" rows="3" class="form-control">'+codeC.PropertysRightB+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="5" class="table table-hover align-middle" style="display: none;">\
			<tr class="table-light">\
        <th class="w150"></ht>\
        <th>截取开始位置：</th>\
        <th>截取结束位置：</th>\
      </tr>\
			<tr>\
        <td class="right">正文：</td>\
        <td><textarea id="desA" rows="3" class="form-control">'+codeC.desA+'</textarea></td>\
        <td><textarea id="desB" rows="3" class="form-control">'+codeC.desB+'</textarea></td>\
      </tr>\
			<tr>\
		    <td class="right">获取正文方式：</td>\
        <td colspan="2">\
          <div class="form-check form-check-inline">\
            <input type="radio" class="form-check-input" value="0" name="desmode" id="desmode0" '+(codeC.desmode=="0"?'checked="checked"':'')+'>\
            <label class="custom-control-label" for="desmode0">在该页获取</label>\
          </div>\
          <div class="form-check form-check-inline">\
            <input type="radio" class="form-check-input" value="1" name="desmode" id="desmode1" '+(codeC.desmode=="1"?'checked="checked"':'')+'>\
            <label class="custom-control-label" for="desmode1">在其它页获取</label>\
          </div>\
        </td>\
			</tr>\
			<tr>\
        <td class="right">基它页的链接：</td>\
        <td><input type="text" class="form-control" id="DesLink" value="'+codeC.DesLink+'"/></td>\
        <td>变量<font color="red">{$ID}</font></td>\
      </tr>\
			<tr>\
        <td class="right">其它页：</td>\
        <td><textarea id="des2A" rows="3" class="form-control">'+codeC.des2A+'</textarea></td>\
        <td><textarea id="des2B" rows="3" class="form-control">'+codeC.des2B+'</textarea></td>\
      </tr>\
	    <tr>\
        <td class="right">屏蔽内容：</td>\
        <td colspan="2"><textarea id="shield" rows="35" class="form-control">'+codeC.shield+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="6" class="table table-hover align-middle" style="display: none;">\
			<tr class="table-light"><th class="w150"></th><th>截取开始位置：</th><th>截取结束位置：</th></tr>\
			<tr>\
        <td class="right">变量：</td>\
        <td><textarea id="reviewIA" rows="3" class="form-control">'+codeC.review.IA+'</textarea></td>\
        <td><textarea id="reviewIB" rows="3" class="form-control">'+codeC.review.IB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">基它页的链接：</td>\
        <td><input type="text" size="100" id="reviewLink" value="'+codeC.review.Link+'" class="form-control"/></td>\
        <td><font color="red">{$变量}</font>;<font color="red">{$页码}</font>;</td>\
      </tr>\
			<tr>\
        <td class="right">总页数：</td>\
        <td><textarea id="reviewPageTotalA" rows="3" class="form-control">'+codeC.review.PageTotalA+'</textarea></td>\
        <td><textarea id="reviewPageTotalB" rows="3" class="form-control">'+codeC.review.PageTotalB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">用户名：</td>\
        <td><textarea id="reviewNameA" rows="3" class="form-control">'+codeC.review.NameA+'</textarea></td>\
        <td><textarea id="reviewNameB" rows="3" class="form-control">'+codeC.review.NameB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">国家代码：</td>\
        <td><textarea id="reviewCountryCodeA" rows="3" class="form-control">'+codeC.review.CountryCodeA+'</textarea></td>\
        <td><textarea id="reviewCountryCodeB" rows="3" class="form-control">'+codeC.review.CountryCodeB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">国家：</td>\
        <td><textarea id="reviewCountryNameA" rows="3" class="form-control">'+codeC.review.CountryNameA+'</textarea></td>\
        <td><textarea id="reviewCountryNameB" rows="3" class="form-control">'+codeC.review.CountryNameB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">等级：</td>\
        <td><textarea id="reviewRankA" rows="3" class="form-control">'+codeC.review.RankA+'</textarea></td>\
        <td><textarea id="reviewRankB" rows="3" class="form-control">'+codeC.review.RankB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">单价：</td>\
        <td><textarea id="reviewPriceA" rows="3" class="form-control">'+codeC.review.PriceA+'</textarea></td>\
        <td><textarea id="reviewPriceB" rows="3" class="form-control">'+codeC.review.PriceB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">数量：</td>\
        <td><textarea id="reviewQuantityA" rows="3" class="form-control">'+codeC.review.QuantityA+'</textarea></td>\
        <td><textarea id="reviewQuantityB" rows="3" class="form-control">'+codeC.review.QuantityB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">单位：</td>\
        <td><textarea id="reviewUnitA" rows="3" class="form-control">'+codeC.review.UnitA+'</textarea></td>\
        <td><textarea id="reviewUnitB" rows="3" class="form-control">'+codeC.review.UnitB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">每包数量：</td>\
        <td><textarea id="reviewLotNumA" rows="3" class="form-control">'+codeC.review.LotNumA+'</textarea></td>\
        <td><textarea id="reviewLotNumB" rows="3" class="form-control">'+codeC.review.LotNumB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">星级：</td>\
        <td><textarea id="reviewStarA" rows="3" class="form-control">'+codeC.review.StarA+'</textarea></td>\
        <td><textarea id="reviewStarB" rows="3" class="form-control">'+codeC.review.StarB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">日期：</td>\
        <td><textarea id="reviewDateA" rows="3" class="form-control">'+codeC.review.DateA+'</textarea></td>\
        <td><textarea id="reviewDateB" rows="3" class="form-control">'+codeC.review.DateB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">买家反馈：</td>\
        <td><textarea id="reviewBuyerFeedbackA" rows="3" class="form-control">'+codeC.review.BuyerFeedbackA+'</textarea></td>\
        <td><textarea id="reviewBuyerFeedbackB" rows="3" class="form-control">'+codeC.review.BuyerFeedbackB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">供应商的回复：</td>\
        <td><textarea id="reviewSupplierReplyA" rows="3" class="form-control">'+codeC.review.SupplierReplyA+'</textarea></td>\
        <td><textarea id="reviewSupplierReplyB" rows="3" class="form-control">'+codeC.review.SupplierReplyB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">买方的答复：</td>\
        <td><textarea id="reviewBuyerReplyA" rows="3" class="form-control">'+codeC.review.BuyerReplyA+'</textarea></td>\
        <td><textarea id="reviewBuyerReplyB" rows="3" class="form-control">'+codeC.review.BuyerReplyB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">顶：</td>\
        <td><textarea id="reviewDiggUpA" rows="3" class="form-control">'+codeC.review.DiggUpA+'</textarea></td>\
        <td><textarea id="reviewDiggUpB" rows="3" class="form-control">'+codeC.review.DiggUpB+'</textarea></td>\
      </tr>\
			<tr>\
        <td class="right">踩：</td>\
        <td><textarea id="reviewDiggDownA" rows="3" class="form-control">'+codeC.review.DiggDownA+'</textarea></td>\
        <td><textarea id="reviewDiggDownB" rows="3" class="form-control">'+codeC.review.DiggDownB+'</textarea></td>\
      </tr>'+this.b04()+'\
		</table>\
		<table lable="7" class="table table-hover align-middle" style="display: none;">\
      <tr>\
        <td class="w150 right">店铺名称：</td>\
        <td><textarea id="shopNameA" rows="3" class="form-control">'+codeC.shopNameA+'</textarea></td>\
        <td><textarea id="shopNameB" rows="3" class="form-control">'+codeC.shopNameB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">店铺ID：</td>\
        <td><textarea id="shopIdA" rows="3" class="form-control">'+codeC.shopIdA+'</textarea></td>\
        <td><textarea id="shopIdB" rows="3" class="form-control">'+codeC.shopIdB+'</textarea></td>\
      </tr>\
		  <tr>\
		    <td class="right">店铺地址：</td>\
        <td><textarea id="ShopUrlR" rows="3" class="form-control">'+codeC.ShopUrlR+'</textarea></td>\
        <td>实际连接:/list/?{$ID}.html<br/>{$ID}为店铺ID</td>\
		  </tr>\
      <tr>\
        <td class="right">店铺评分：</td>\
        <td><textarea id="shopScoreA" rows="3" class="form-control">'+codeC.shopScoreA+'</textarea></td>\
        <td><textarea id="shopScoreB" rows="3" class="form-control">'+codeC.shopScoreB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">店铺关注量：</td>\
        <td><textarea id="FollowersA" rows="3" class="form-control">'+codeC.FollowersA+'</textarea></td>\
        <td><textarea id="FollowersB" rows="3" class="form-control">'+codeC.FollowersB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">客户评分：</td>\
        <td><textarea id="ReviewA" rows="3" class="form-control">'+codeC.ReviewA+'</textarea></td>\
        <td><textarea id="ReviewB" rows="3" class="form-control">'+codeC.ReviewB+'</textarea></td>\
      </tr>\
		  <tr>\
        <td class="right">尺码模板：</td>\
        <td><textarea id="SizeTemplateA" rows="3" class="form-control">'+codeC.SizeTemplateA+'</textarea></td>\
        <td><textarea id="SizeTemplateB" rows="3" class="form-control">'+codeC.SizeTemplateB+'</textarea></td>\
      </tr>'+this.b04()+'\
    </table>\
		</div>'
		Tool.html(null,null,html)
  },
  b01:function(obj2)
  {
		let reverse,URL=obj2.pageurl1
		if(obj2.pageset=="1"||obj2.pageset=="3")
		{
			URL=URL.replace(/\{\$ID\}/,obj2.istart);
		}
		else if(obj2.pageset=="2")
		{
			let arr=(obj2.pageurl2).split("\n")
			if(obj2.reverse=="0"){reverse=0}else{reverse=arr.length-1}
			URL=arr[reverse];
		}
		else if(obj2.pageset=="2")
    {alert("【提交分页】还没做");}
		return URL
  },
  b02:function()
  {
		let attr=[],i=0,val
		$("[name='attr']").each(function(){
			val=$(this).attr("var");attr[i]=Object();
			attr[i].A=$(this).val();attr[i].B=$("#attr"+val+"B").val()
			attr[i].NameA=$("#attrName"+val+"A").val();attr[i].NameB=$("#attrName"+val+"B").val()
			i++
		})
		return attr;
  },
  b03:function()
  {
    let a=
    {
      typeA:"",typeB:"",
      err404:"",shelf:"",
      nameA:"",nameB:"",
      productIDA:"",productIDB:"",
      SaleNumA:"",SaleNumB:"",
      ReviewsNumA:"",ReviewsNumB:"",
      unitA:"",unitB:"",
      lotNumA:"",lotNumB:"",
      keywordsA:"",keywordsB:"",
      DiscountA:"",DiscountB:"",
      deliveryTimeA:"",deliveryTimeB:"",
      videoUrlA:"",videoUrlB:"",
      PicListA:"",PicListB:"",
      PicA:"",PicB:"",
      skuA:"",skuB:"",
      weightA:"",weightB:"",
      PropertysListA:"",PropertysListB:"",
      PropertysLeftA:"",PropertysLeftB:"",
      PropertysRightA:"",PropertysRightB:"",
      desA:"",desB:"",
      desmode:"0",DesLink:"",
      des2A:"",des2B:"",
      shield:"",
      shopNameA:"",shopNameB:"",
      shopIdA:"",shopIdB:"",
      ShopUrlR:"",
      shopScoreA:"",shopScoreB:"",
      FollowersA:"",FollowersB:"",
      ReviewA:"",ReviewB:"",
      SizeTemplateA:"",SizeTemplateB:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      err404:"",shelf:"",
      review:{}
    }
    return a;
  },
  b04:function()
  {
		return '\
		<tr>\
			<td></td>\
			<td colspan="2">\
				<button type="button" class="btn btn-outline-secondary" onclick="Tool.main(\'js01/'+obj.arr[4]+'\');">上一步</button>\
				<button type="button" class="btn btn-outline-secondary" onclick="fun.c02()">【保存】下一步</button>\
			</td>\
		</tr>'
  },
  c01:function(This,val)
	{
		$(".makeHtmlTab li").removeClass();
		This.addClass("hover");
		$('table[lable]').hide();
		$('table[lable="'+val+'"]').show();
  },
  c02:function()
  {
		let codeC={}
		codeC.err404=$("#err404").val();//404错误特征
		codeC.shelf=$("#shelf").val();//已下架特征
		codeC.typeA=$("#typeA").val();codeC.typeB=$("#typeB").val()//分类ID
		codeC.nameA=$("#nameA").val();codeC.nameB=$("#nameB").val()//标题
		codeC.productIDA=$("#productIDA").val();codeC.productIDB=$("#productIDB").val()//商品ID
		codeC.SaleNumA=$("#SaleNumA").val();codeC.SaleNumB=$("#SaleNumB").val()//已销售数量
		codeC.ReviewsNumA=$("#ReviewsNumA").val();codeC.ReviewsNumB=$("#ReviewsNumB").val()//评论数量
		codeC.unitA=$("#unitA").val();codeC.unitB=$("#unitB").val()//单位
		codeC.lotNumA=$("#lotNumA").val();codeC.lotNumB=$("#lotNumB").val()//每包件数
		codeC.keywordsA=$("#keywordsA").val();codeC.keywordsB=$("#keywordsB").val()//关键词,关键词一,关键词一
		codeC.descriptionA=$("#descriptionA").val();codeC.descriptionB=$("#descriptionB").val()//关键词,关键词一,关键词一
		codeC.DiscountA=$("#DiscountA").val();codeC.DiscountB=$("#DiscountB").val()//折扣率
		codeC.deliveryTimeA=$("#deliveryTimeA").val();codeC.deliveryTimeB=$("#deliveryTimeB").val()//备货期
		codeC.videoUrlA=$("#videoUrlA").val();codeC.videoUrlB=$("#videoUrlB").val()//视频地址
		codeC.shopNameA=$("#shopNameA").val();codeC.shopNameB=$("#shopNameB").val()//店铺名称
		codeC.shopIdA=$("#shopIdA").val();codeC.shopIdB=$("#shopIdB").val()//店铺ID
		codeC.PicListA=$("#PicListA").val();codeC.PicListB=$("#PicListB").val()//放大镜图（列表）
		codeC.PicA=$("#PicA").val();codeC.PicB=$("#PicB").val()//放大镜图
		codeC.SizeTemplateA=$("#SizeTemplateA").val();codeC.SizeTemplateB=$("#SizeTemplateB").val()//尺码模板
		codeC.attributemode=$("[name='attributemode']:checked").val();//获取商品属性方式
		codeC.skuA=$("#skuA").val();codeC.skuB=$("#skuB").val()//价格
		codeC.ShippingCostMode=$("[name='ShippingCostMode']:checked").val();//获取运费相关方式
		codeC.ShippingCostA=$("#ShippingCostA").val();codeC.ShippingCostB=$("#ShippingCostB").val()//基它页的{$ID}
		codeC.ShippingCostLink=$("#ShippingCostLink").val();//基它页的链接
		codeC.weightA=$("#weightA").val();codeC.weightB=$("#weightB").val()//单重量
		codeC.lengthA=$("#lengthA").val();codeC.lengthB=$("#lengthB").val()//长
		codeC.widthA=$("#widthA").val();codeC.widthB=$("#widthB").val()//宽
		codeC.heightA=$("#heightA").val();codeC.heightB=$("#heightB").val()//高
		codeC.ItemDescriptionMode=$("[name='ItemDescriptionMode']:checked").val();//获取描述相关方式
		codeC.ShopUrlR=$("#ShopUrlR").val();//店铺地址要替换的地址
		codeC.ItemDescriptionA=$("#ItemDescriptionA").val();codeC.ItemDescriptionB=$("#ItemDescriptionB").val()//基它页的{$ID}
		codeC.ItemDescriptionLink=$("#ItemDescriptionLink").val();//基它页的链接
		codeC.PropertysListA=$("#PropertysListA").val();codeC.PropertysListB=$("#PropertysListB").val()//自定义属性（列表）
		codeC.PropertysLeftA=$("#PropertysLeftA").val();codeC.PropertysLeftB=$("#PropertysLeftB").val()//自定义属性（左边）
		codeC.PropertysRightA=$("#PropertysRightA").val();codeC.PropertysRightB=$("#PropertysRightB").val()//自定义属性（右边）
		codeC.desmode=$("[name='desmode']:checked").val();//获取正文方式
		codeC.desA=$("#desA").val();codeC.desB=$("#desB").val()//正文
		codeC.DesLink=$("#DesLink").val()//基它页的链接
		codeC.des2A=$("#des2A").val();codeC.des2B=$("#des2B").val()//其它页（正文）
		codeC.shield=$("#shield").val();//屏蔽内容
		codeC.ReviewA=$("#ReviewA").val();codeC.ReviewB=$("#ReviewB").val()//客户评分
		codeC.FollowersA=$("#FollowersA").val();codeC.FollowersB=$("#FollowersB").val()//店铺关注量
		codeC.shopScoreA=$("#shopScoreA").val();codeC.shopScoreB=$("#shopScoreB").val()//店铺评分
		codeC.review={};
		codeC.review.IA=$("#reviewIA").val();codeC.review.IB=$("#reviewIB").val()//变量
		codeC.review.Link=$("#reviewLink").val();//基它页的链接
		codeC.review.PageTotalA=$("#reviewPageTotalA").val();codeC.review.PageTotalB=$("#reviewPageTotalB").val()//总页数
		codeC.review.NameA=$("#reviewNameA").val();codeC.review.NameB=$("#reviewNameB").val()//用户名
		codeC.review.CountryCodeA=$("#reviewCountryCodeA").val();codeC.review.CountryCodeB=$("#reviewCountryCodeB").val()//国家代码
		codeC.review.CountryNameA=$("#reviewCountryNameA").val();codeC.review.CountryNameB=$("#reviewCountryNameB").val()//国家
		codeC.review.RankA=$("#reviewRankA").val();codeC.review.RankB=$("#reviewRankB").val()//等级
		codeC.review.PriceA=$("#reviewPriceA").val();codeC.review.PriceB=$("#reviewPriceB").val()//单价
		codeC.review.QuantityA=$("#reviewQuantityA").val();codeC.review.QuantityB=$("#reviewQuantityB").val()//数量
		codeC.review.UnitA=$("#reviewUnitA").val();codeC.review.UnitB=$("#reviewUnitB").val()//单位
		codeC.review.LotNumA=$("#reviewLotNumA").val();codeC.review.LotNumB=$("#reviewLotNumB").val()//每包数量
		codeC.review.StarA=$("#reviewStarA").val();codeC.review.StarB=$("#reviewStarB").val()//星级
		codeC.review.DateA=$("#reviewDateA").val();codeC.review.DateB=$("#reviewDateB").val()//日期
		codeC.review.BuyerFeedbackA=$("#reviewBuyerFeedbackA").val();codeC.review.BuyerFeedbackB=$("#reviewBuyerFeedbackB").val()//买家反馈
		codeC.review.SupplierReplyA=$("#reviewSupplierReplyA").val();codeC.review.SupplierReplyB=$("#reviewSupplierReplyB").val()//供应商的回复
		codeC.review.BuyerReplyA=$("#reviewBuyerReplyA").val();codeC.review.BuyerReplyB=$("#reviewBuyerReplyB").val()//买方的答复
		codeC.review.DiggUpA=$("#reviewDiggUpA").val();codeC.review.DiggUpB=$("#reviewDiggUpB").val()//顶
		codeC.review.DiggDownA=$("#reviewDiggDownA").val();codeC.review.DiggDownB=$("#reviewDiggDownB").val()//踩
		codeC.skuattr=this.b02()		
		this.obj.code.c=codeC;
		let html="<r: db=\"sqlite.dhgate\">update @.gather set @.code='"+(JSON.stringify(this.obj.code)).replace(/'/ig, "''").replace(/\\/ig, "\\\\")+"' where @.id="+obj.arr[4]+"</r:>";  
		Tool.ajax.a01(html,1,this.c03,this)
  },
  c03:function(txt)
	{
		if(txt==""){Tool.main('/'+obj.arr[0]+'/list/'+obj.arr[2]+'/js04/'+obj.arr[4]+'/1');}else{alert(txt);}
	}
}
fun.a01();