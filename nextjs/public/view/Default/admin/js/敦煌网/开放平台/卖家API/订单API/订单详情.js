'use strict';
function pagelist(p){
	//dhorderget();
	dhorderproductget();
	}
function dhorderget(){
	URL = "http://api.dhgate.com/dop/router?access_token=" + access_token + "&method=dh.order.get&timestamp=" + new Date().getTime() + "&v=2.0&orderNo=<.arr(4)/>"
	txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
	eval("let obj=" + txt);
	let obj1=obj.orderContact
	let obj2=obj.orderdelivery
	if(obj2!=null){
		let html2="<tr class=\"thead2\"><td colspan=\"6\">订单处理信息:</td></tr>"
		for(let i=0;i<obj2.length;i++)
		{			
			html2+="\
				<tr>\
					<td align=\"right\">运单号:</td><td>"+obj2[i].deliveryNo+"</td>\
					<td align=\"right\">修改后运单号:</td><td>"+obj2[i].newDeliveryNo+"</td>\
					<td align=\"right\">发货时间:</td><td>"+obj2[i].deliveryDate+"</td>\
				</tr>\
				<tr>\
					<td align=\"right\" nowrap=\"nowrap\">物流方式(卖家填写的):</td><td>"+obj2[i].shippingType+"</td>\
					<td align=\"right\">修改后物流方式:</td><td>"+obj2[i].newShippingType+"</td>\
					<td align=\"right\">投诉状态:</td><td>"+obj2[i].complaintStatus+"</td>\
				</tr>\
				<tr><td align=\"right\">处理结果:</td><td colspan=\"5\">"+obj2[i].processingResults+"</td></tr>\
				<tr><td align=\"right\">备注:</td><td colspan=\"5\">"+obj2[i].remark+"</td></tr>\
				<tr><td align=\"right\">修改后备注:</td><td colspan=\"5\">"+obj2[i].newRemark+"</td></tr>\
			"
		}
	}
	html="<tr>\
				<td align=\"right\">订单号:</td><td>"+obj.orderNo+"</td>\
				<td align=\"right\">订单状态:</td><td>"+orderStatusId(obj.orderStatus)+"</td>\
				<td align=\"right\">下单日期:</td><td>"+obj.startedDate+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">付款时间:</td><td>"+obj.payDate+"</td>\
				<td align=\"right\">发货截止时间:</td><td>"+obj.deliveryDeadline+"</td>\
				<td align=\"right\">发货时间:</td><td>"+obj.deliveryDate+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">产品总计:</td><td>"+obj.itemTotalPrice+"</td>\
				<td align=\"right\">运费:</td><td>"+obj.shippingCost+"</td>\
				<td align=\"right\">订单总额:</td><td>"+obj.orderTotalPrice+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">佣金金额:</td><td>"+obj.commissionAmount+"</td>\
				<td align=\"right\">实收金额:</td><td>"+obj.actualPrice+"</td>\
				<td align=\"right\">seller优惠券:</td><td>"+obj.sellerCouponPrice+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">网关手续费:</td><td>"+obj.gatewayFee+"</td>\
				<td align=\"right\">订单补款金额:</td><td>"+obj.fillingMoney+"</td>\
				<td align=\"right\">订单退款金额:</td><td>"+obj.refundMoney+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">订单涨价金额:</td><td>"+obj.risePrice+"</td>\
				<td align=\"right\">订单降价金额:</td><td>"+obj.reducePrice+"</td>\
				<td align=\"right\">买家选择物流方式:</td><td>"+obj.shippingType+"</td>\
			</tr>\
			<tr class=\"thead2\"><td colspan=\"6\">收货人基本信息:</td></tr>\
			<tr>\
				<td align=\"right\">收货人姓名:</td><td>"+obj1.firstName+" "+obj1.lastName+"</td>\
				<td align=\"right\">税号:</td><td>"+obj1.vatNumber+"</td>\
				<td align=\"right\">发货国家:</td><td>"+obj1.country+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">省(发货信息):</td><td>"+obj1.state+"</td>\
				<td align=\"right\">城市(发货信息):</td><td>"+obj1.city+"</td>\
				<td align=\"right\">地址1(发货信息):</td><td>"+obj1.addressLine1+"</td>\
			</tr>\
			<tr>\
				<td align=\"right\">地址2(发货信息):</td><td>"+obj1.addressLine2+"</td>\
				<td align=\"right\">邮编(发货信息):</td><td>"+obj1.postalcode+"</td>\
				<td align=\"right\">电话(发货信息):</td><td>"+obj1.telephone+"</td>\
			</tr>\
			"+html2
	$("#dhorderget").html(html)
}
function dhorderproductget(){
	let URL = "http://api.dhgate.com/dop/router?access_token=" + obj.token + "&method=dh.order.product.get&timestamp=" + new Date().getTime() + "&v=2.0&orderNo="+obj.arr4
	txt = $.ajax({ type: "POST", url: obj.mode + "exe.html?" + Math.random(), data: { data: escape("<.WebClientPost(" + URL + ")/>") }, async: false }).responseText;
	eval("let obj2=" + txt);
	let obj2=obj2.orderProductList
	let html=""
	//document.write(txt)
	for(let i=0;i<obj2.length;i++)
	{			
		html+="<tr align=\"center\">\
						<td align=\"left\">\
							<table>\
							<tr>\
								<td>\
								<a target=\"_blank\" href=\"https://www.dhgate.com/"+obj2[i].itemUrl+"\">\
								<img style=\"margin:2px;padding:1px;border:1px solid #ccc\" src=\"http://image.dhgate.com/"+obj2[i].itemImage+"\" title=\"点击预览\" border=\"0\" width=\"50\" height=\"50\" align=\"left\">\
								</a>\
								</td>\
								<td>\
								<a target=\"_blank\" href=\"https://www.dhgate.com/"+obj2[i].itemUrl+"\">\
								"+obj2[i].itemName+"\
								</a>\
								<hr>\
								产品类目:"+obj2[i].categoryName+"&nbsp;&nbsp;&nbsp;&nbsp;\
								产品属性:"+obj2[i].itemAttr+"&nbsp;&nbsp;&nbsp;&nbsp;\
								</td>\
							</tr>\
							</table>\
						</td>\
						<td>"+obj2[i].itemcode+"</td>\
						<td>"+obj2[i].measureName+"</td>\
						<td>"+obj2[i].itemPrice+"</td>\
						<td>"+obj2[i].length+"</td>\
						<td>"+obj2[i].width+"</td>\
						<td>"+obj2[i].height+"</td>\
						<td>"+obj2[i].itemCount+"</td>\
						<td>"+obj2[i].grossWeight+"</td>\
						<td align=\"left\">"+obj2[i].buyerRemark+"</td>\
						<td>"+obj2[i].skuCode+"</td>\
					</tr>"
	}
	$("#dhorderproductget").html(html)
}
