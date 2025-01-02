'use strict';
Object.assign(Tool, {
    dh_order_list_get:
    {
        access_token: "",
        a01: function (access_token) {
            this.access_token = access_token;
            //obj.arr[3]        选择JS文件
            //obj.arr[4]        翻页
            //obj.arr[5]        切换账户
            this.a02();
        },
        a02: function () {
            let oo = {}, url = "http://api.dhgate.com/dop/router", today = new Date();
            oo.access_token = this.access_token;
            oo.method = "dh.order.list.get";
            oo.timestamp = today.getTime();
            oo.v = "2.0";
            oo.endDate = Tool.js_date_time(today.getTime(), "-");
            oo.pageNo = obj.arr[4];
            oo.pageSize = "10";
            oo.querytimeType = "1";
            oo.startDate = Tool.js_date_time(today.setDate(today.getDate() - 365), "-");
            $("#thisUrl").val(url);
            $("#thisPost").html(JSON.stringify(oo, null, 2));
            gg.postFetch(url, oo, this.a03, this)
        },
        a03: function (oo) {
            $("#thisJson").html(JSON.stringify(oo, null, 2));
            let obj2 = oo.orderBaseInfoList, html = "";
            for (let i = 0; i < obj2.length; i++) {
                html += '\
                <tr>\
				    <td><a href="javascript:;" onclick="fun.b01(\''+ obj2[i].orderNo + '\')">' + obj2[i].orderNo + '</a><hr/><a href="javaxcript:;" onclick="fun.c01(\'' + obj2[i].orderNo + '\')" class="detail-button">查看产品</a></td>\
				    <td>'+ obj2[i].updateDate + '</td>\
				    <td>'+ obj2[i].startedDate + '<hr/>&nbsp;' + obj2[i].payDate + '<hr/>' + obj2[i].cancelDate + '</td>\
				    <td>'+ obj2[i].deliveryDeadline + '<hr/>' + obj2[i].deliveryDate + '</td>\
				    <td>'+ obj2[i].buyerConfirmDate + '<hr/>' + obj2[i].inAccountDate + '</td>\
				    <td>'+ obj2[i].orderTotalPrice + '</td>\
				    <td>'+ obj2[i].orderRemark + '</td>\
				    <td>'+ this.b04(obj2[i].orderStatus) + '</td>\
				    <td>'+ obj2[i].isWarn + '</td>\
				    <td>'+ obj2[i].warnReason + '</td>\
				    <td  align="left">订单ID（orderId）:'+ obj2[i].orderId + '<hr/>买家ID（buyerId）:' + obj2[i].buyerId + '<hr/>收货国家:' + obj2[i].country + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;买家别名:' + obj2[i].buyerNickName + '</td>\
				</tr>'
            }
            html = this.b05()+'\
            <div>显示：按【下单时间】倒序，从 <span id="startDate">'+URL[2]+'</span> 到 <span id="endDate">'+URL[1]+'</span> 的数据。</div>\
            <table class="tb">\
            <tr align="center">\
            	<td>订单号</td>\
            	<td>更新时间</td>\
            	<td>【下单/付款/取消】时间</td>\
            	<td>【发货截止/发货】时间</td>\
            	<td>【收货/入账】时间</td>\
            	<td>金额</td>\
            	<td nowrap="nowrap">备注</td>\
            	<td>\
            	<select onChange="FastQuery(this.options[this.selectedIndex].value)" class="form-select">\
            		<option value="">订单状态</option>\
            		<option value="&orderStatus=111000">订单取消</option>\
            		<option value="&orderStatus=101003">等待买家付款</option>\
            		<option value="&orderStatus=102001">买家已付款，等待平台确认</option>\
            		<option value="&orderStatus=103001">等待发货</option>\
            		<option value="&orderStatus=105001">买家退款中，等待协商结果</option>\
            		<option value="&orderStatus=105002">退款协议已达成</option>\
            		<option value="&orderStatus=105003">部分退款后，等待发货</option>\
            		<option value="&orderStatus=105004">买家取消退款申请</option>\
            		<option value="&orderStatus=103002">已部分发货</option>\
            		<option value="&orderStatus=101009">等待买家确认收货</option>\
            		<option value="&orderStatus=106001">退款/退货协商中，等待协议达成</option>\
            		<option value="&orderStatus=106002">买家投诉到平台</option>\
            		<option value="&orderStatus=106003">协议已达成，执行中</option>\
            		<option value="&orderStatus=102006">人工确认收货</option>\
            		<option value="&orderStatus=102007">超过预定期限，自动确认收货</option>\
            		<option value="&orderStatus=102111">交易成功</option>\
            		<option value="&orderStatus=111111">交易关闭</option>\
            		</select>\
            	</td>\
            	<td>非正常采购</td>\
            	<td>警告原因</td>\
            	<td align="left">更多信息</td>\
            	</tr>'+html+'\
            	<tr><td colspan="11">'+ Tool.page(oo.count,30,4)+'</td></tr>\
            </table>'
            $("#dh_order_list_get").html(html)
        },
        b04: function (orderStatus) {
            switch (orderStatus) {
                case "111000": return "订单取消"; break;
                case "101003": return "等待买家付款"; break;
                case "102001": return "买家已付款，等待平台确认"; break;
                case "103001": return "等待发货"; break;
                case "105001": return "买家退款中，等待协商结果"; break;
                case "105002": return "退款协议已达成"; break;
                case "105003": return "部分退款后，等待发货"; break;
                case "105004": return "买家取消退款申请"; break;
                case "103002": return "已部分发货"; break;
                case "101009": return "等待买家确认收货"; break;
                case "106001": return "退款/退货协商中，等待协议达成"; break;
                case "106002": return "买家投诉到平台"; break;
                case "106003": return "协议已达成，执行中"; break;
                case "102006": return "已确认收货"; break;
                case "102007": return "超过预定期限，自动确认收货"; break;
                case "102111": return "交易成功"; break;
                case "111111": return "交易关闭"; break;
                default: return "未知"
            }
        },
        b05: function () {
            return '\
            <div class="input-group w500">\
                <div class="input-group-prepend">\
                <select id="Field" class="form-select">\
            			<option value="&orderNo=$1">订单号</option>\
            			<option value="&buyerNickName=$1">买家昵称</option>\
            			<option value="&deliveryNo=$1">运单号</option>\
            			<option value="&itemCode=$1">产品编号</option>\
            			</select>\
                </div>\
                <input id="searchword" type="text" class="form-select">\
                <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="fun.d01();">搜索</button></div>\
            </div>'
        },
    }
})



//	a06:function(page)
//	{
//		this.page=page;
//		$(".pages").html("正在加载中......")
//		this.a01();
//	},
//	b01:function(orderNo)
//	{
//		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.order.get&timestamp=" + new Date().getTime() + "&v=2.0&orderNo="+orderNo
//		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.b02,this,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,'&amp;'))
//	},
//  b02:function(t,URL)
//  {
//		if(t.indexOf("00000000")!=-1)
//		{
//		  eval("let arr="+t)
//		  let html='<table class="tb">\
//			<tr><td colspan="3" id="URL">'+URL+'</td></tr>\
//			<tr><td>编号</td><td align="right" width="200">数据有无变动:</td><td>'+(Object.getOwnPropertyNames(arr).length==24?"数据无变动，可以用。":"数据有变动，请更新API")+'</td></tr>\
//			<tr><td width="50">1</td><td align="right">订单编号(orderNo):</td><td>'+arr.orderNo+'</td></tr>\
//			<tr><td>2</td><td align="right">订单备注(orderRemark):</td><td>'+arr.orderRemark+'</td></tr>\
//			<tr><td>3</td><td align="right">订单状态(orderStatus):</td><td>'+this.a04(arr.orderStatus)+'</td></tr>\
//			<tr><td>4</td><td align="right">下单日期(startedDate):</td><td>'+arr.startedDate+'</td></tr>\
//			<tr><td>5</td><td align="right">付款时间(payDate):</td><td>'+arr.payDate+'</td></tr>\
//			<tr><td>6</td><td align="right">发货截止时间(deliveryDeadline):</td><td>'+arr.deliveryDeadline+'</td></tr>\
//			<tr><td>7</td><td align="right">发货时间(deliveryDate):</td><td>'+arr.deliveryDate+'</td></tr>\
//			<tr><td>8</td><td align="right">产品总计(itemTotalPrice):</td><td>'+arr.itemTotalPrice+'</td></tr>\
//			<tr><td>9</td><td align="right">运费(shippingCost):</td><td>'+arr.shippingCost+'</td></tr>\
//			<tr><td>10</td><td align="right">订单总额(orderTotalPrice):</td><td>'+arr.orderTotalPrice+'</td></tr>\
//			<tr><td>11</td><td align="right">佣金金额(commissionAmount):</td><td>'+arr.commissionAmount+'</td></tr>\
//			<tr><td>12</td><td align="right">实收金额(actualPrice):</td><td>'+arr.actualPrice+'</td></tr>\
//			<tr><td>13</td><td align="right">seller优惠券(sellerCouponPrice):</td><td>'+arr.sellerCouponPrice+'</td></tr>\
//			<tr><td>14</td><td align="right">网关手续费(gatewayFee):</td><td>'+arr.gatewayFee+'</td></tr>\
//			<tr><td>15</td><td align="right">订单补款金额(fillingMoney):</td><td>'+arr.fillingMoney+'</td></tr>\
//			<tr><td>16</td><td align="right">订单退款金额(refundMoney):</td><td>'+arr.refundMoney+'</td></tr>\
//			<tr><td>17</td><td align="right">订单涨价金额(risePrice):</td><td>'+arr.risePrice+'</td></tr>\
//			<tr><td>18</td><td align="right">订单降价金额(reducePrice):</td><td>'+arr.reducePrice+'</td></tr>\
//			<tr><td>19</td><td align="right">买家选择物流方式(shippingType):</td><td>'+arr.shippingType+'</td></tr>\
//			<tr><td>20</td><td align="right">收货人基本信息(orderContact):</td><td>\
//			  <table class="tb">\
//				  <tr><td align="right" width="200">买家ID(buyerId):</td><td>'+arr.orderContact.buyerId+'</td></tr>\
//				  <tr><td align="right">买家别名(buyerNickName):</td><td>'+arr.orderContact.buyerNickName+'</td></tr>\
//				  <tr><td align="right">收货人姓名(firstName):</td><td>'+arr.orderContact.firstName+'</td></tr>\
//				  <tr><td align="right">收货人姓名(lastName):</td><td>'+arr.orderContact.lastName+'</td></tr>\
//				  <tr><td align="right">收货人的邮件(email):</td><td>'+arr.orderContact.email+'</td></tr>\
//				  <tr><td align="right">发货国家(country):</td><td>'+arr.orderContact.country+'</td></tr>\
//				  <tr><td align="right">省(state):</td><td>'+arr.orderContact.state+'</td></tr>\
//				  <tr><td align="right">城市(city):</td><td>'+arr.orderContact.city+'</td></tr>\
//				  <tr><td align="right">地址1(addressLine1):</td><td>'+arr.orderContact.addressLine1+'</td></tr>\
//				  <tr><td align="right">地址2(addressLine2):</td><td>'+arr.orderContact.addressLine2+'</td></tr>\
//				  <tr><td align="right">邮编(postalcode):</td><td>'+arr.orderContact.postalcode+'</td></tr>\
//				  <tr><td align="right">电话(telephone):</td><td>'+arr.orderContact.telephone+'</td></tr>\
//				  <tr><td align="right">税号(vatNumber):</td><td>'+arr.orderContact.vatNumber+'</td></tr>\
//				  <tr><td align="right">识别号码(abn):</td><td>'+arr.orderContact.abn+'</td></tr>\
//				</table>\
//			</td></tr>\
//			<tr><td>21</td><td align="right">订单处理信息(orderDeliveryList):</td><td>'+this.b03(arr.orderDeliveryList)+'</td></tr>\
//			<tr><td>22</td><td align="right">优选订单(preferOrder):</td><td>'+arr.preferOrder+'</td></tr>\
//			<tr><td>23</td><td align="right">买家下单备注(buyerRemark):</td><td>'+arr.buyerRemark+'</td></tr>\
//			</table>'
//		  F2.b01(html,this.obj.fromid)
//		}else{alert(t);}
//	},
//	b03:function(arr)
//	{
//		let html='';
//		if(arr!=null)
//		{
//			for(let i=0;i<arr.length;i++)
//			{
//				html+='\
//				<table class="tb">\
//					<tr><td align="right" width="200">运单号(deliveryNo):</td><td>'+arr[i].deliveryNo+'</td></tr>\
//					<tr><td align="right">修改后运单号(newDeliveryNo):</td><td>'+arr[i].newDeliveryNo+'</td></tr>\
//					<tr><td align="right">发货时间(deliveryDate):</td><td>'+arr[i].deliveryDate+'</td></tr>\
//					<tr><td align="right">物流方式(卖家填写的)(shippingType):</td><td>'+arr[i].shippingType+'</td></tr>\
//					<tr><td align="right">修改后物流方式(newShippingType):</td><td>'+arr[i].newShippingType+'</td></tr>\
//					<tr><td align="right">备注(remark):</td><td>'+arr[i].remark+'</td></tr>\
//					<tr><td align="right">修改后备注(newRemark):</td><td>'+arr[i].newRemark+'</td></tr>\
//					<tr><td align="right">投诉状态(complaintStatus):</td><td>'+arr[i].complaintStatus+'</td></tr>\
//					<tr><td align="right">处理结果(processingResults):</td><td>'+arr[i].processingResults+'</td></tr>\
//				</table>'
//			}
//		}
//		return html
//	},
//	c01:function(orderNo)
//	{
//		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.order.product.get&timestamp=" + new Date().getTime() + "&v=2.0&orderNo="+orderNo
//		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.c02,this,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,'&amp;'))
//	},
//  c02:function(t,URL)
//  {
//		if(t.indexOf("00000000")!=-1)
//		{
//			let html='';
//		  eval("let arr="+t)
//			arr=arr.orderProductList
//			for(let i=0;i<arr.length;i++)
//			{
//			  html+='<table class="tb">\
//				<tr><td align="right" width="200">产品名称(itemName):</td><td>'+arr[i].itemName+'</td></tr>\
//				<tr><td align="right">产品编号(itemcode):</td><td>'+arr[i].itemcode+'</td></tr>\
//				<tr><td align="right">商品售卖单位(measureName):</td><td>'+arr[i].measureName+'</td></tr>\
//				<tr><td align="right">产品单价(itemPrice):</td><td>'+arr[i].itemPrice+'</td></tr>\
//				<tr><td align="right">【包装尺寸】长(length):</td><td>'+arr[i].length+' cm</td></tr>\
//				<tr><td align="right">【包装尺寸】宽(width):</td><td>'+arr[i].width+' cm</td></tr>\
//				<tr><td align="right">【包装尺寸】高(height):</td><td>'+arr[i].height+' cm</td></tr>\
//				<tr><td align="right">产品数量(itemCount):</td><td>'+arr[i].itemCount+'</td></tr>\
//				<tr><td align="right">包装重量(grossWeight):</td><td>'+arr[i].grossWeight+'</td></tr>\
//				<tr><td align="right">产品类目(categoryName):</td><td>'+arr[i].categoryName+'</td></tr>\
//				<tr><td align="right">产品属性(itemAttr):</td><td>'+arr[i].itemAttr+'</td></tr>\
//				<tr><td align="right">买家备注(buyerRemark):</td><td>'+arr[i].buyerRemark+'</td></tr>\
//				<tr><td align="right">产品图片(itemImage):</td><td><img style="margin:2px;padding:1px;border:1px solid #ccc" src="http://image.dhgate.com/'+arr[i].itemImage+'" title="点击预览" border="0" width="50" height="50" align="left"></td></tr>\
//				<tr><td align="right">产品地址(itemUrl):</td><td><a href="https://www.dhgate.com/'+arr[i].itemUrl+'" target="_blank">https://www.dhgate.com/'+arr[i].itemUrl+'</a></td></tr>\
//				<tr><td align="right">商品编码(skuCode):</td><td>'+arr[i].skuCode+'</td></tr>\
//				<tr><td align="right">商品编码(skuId):</td><td>'+arr[i].skuId+'</td></tr>\
//				<tr><td align="right">打包数量(packingQuantity):</td><td>'+arr[i].packingQuantity+'</td></tr>\
//				</tr></table>'
//			}
//		  html='<table class="tb"><tr><td>'+URL+'</td></tr><tr><td>'+html+'</td><tr></table>'
//		  F2.b01(html,this.obj.fromid)
//		}else{alert(t);}
//  },
//	d01:function()
//	{
//		let Field,searchword
//		Field=$("#Field").val()
//		searchword=($("#searchword").val()).replace(/(^\s*)|(\s*$)/g, "");
//		this.where=Field.replace("$1",searchword)
//		this.a01()
//  },
//	e01:function(){F.a01(this.e02,this);},
//	e02:function(tokenID,token)
//	{
//		this.tokenID=tokenID;this.token=token;
//		let today=new Date();
//		let endDate=Tool.js_date_time(today.getTime());
//		let startDate=Tool.js_date_time(today.setDate(today.getDate()-365))
//		let paymentList={"endDate":endDate,"moneyMode":"USD","pagenum":1,"pagesize":10,"startDate":startDate,"supplierId":"ff8080814c4658d6014c55bf289b2993"}
//		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.seller.payment.get&timestamp=" + new Date().getTime() + "&v=1.0&paymentList="+JSON.stringify(paymentList)
//		Tool.ajax.a01("<.WebClientPost("+encodeURIComponent(URL)+")/>",1,this.e03,this,[URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,'&amp;'),endDate,startDate])
//  },
//	e03:function(t,URL)
//	{
//		let html='\
//			<div class="tb">\
//			<ul class="makeHtmlTab">\
//				<li onclick="fun.a01()">订单列表</li>\
//				<li class="hover" onclick="fun.e01()">虚拟账户记录</li>\
//			</ul>\
//			<table class="tb">\
//				<tr><td colspan="2" id="URL">'+URL[0]+'</td></tr>\
//				<tr><td colspan="2">显示：从 <span id="startDate">'+URL[2]+'</span> 到 <span id="endDate">'+URL[1]+'</span> 的数据。</td></tr>\
//				<tr><td colspan="2">'+t+'</td></tr>\
//			</table></div>'
//		F.b01(html)
//	}
//}
//fun.a01();