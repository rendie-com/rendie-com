'use strict';
Object.assign(Tool, {
    GetPurchasingInformation:
    {
        obj: {//下一步的时后要用。
            PurchaseOrderId: "",
            PurchaseCost: 0,
            dhgate_orderid: 0,
        },
        a01: function (orderid, countryid, country, shipping, total) {
            let oo = {
                aliexpress: {
                    addressArr: [],
                    orderIdArr: [],//后期要用
                    total: {//合计
                        shipping: 0,//运费
                        total: 0,//采购成本
                        quantity: 0//件数
                    },
                },
                dhgate: {
                    shipping: shipping,
                    total: total,
                    contactPerson: $("#contactPerson").val(),
                    address: $("#address").val(),
                    address2: $("#address2").val(),
                    city: $("#city").val(),
                    state: $("#province").val(),
                    countryid: countryid,
                    country: country,
                    zip: $("#zip").val(),
                    phone: $("#phone").val(),
                    vatNumber: $("#vatNumber").val(),
                },
                isErr: false
            }
            this.obj = { PurchaseOrderId: "", PurchaseCost: 0, dhgate_orderid: orderid }//下一步的时后要用。
            $("#seep5").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>').attr("disabled", true);
            $("#state").html("正在开打【订单列表】页面...");
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            this.a03(oo)
        },
        a03: function (oo) {
            let url = "https://www.aliexpress.com/p/order/index.html"
            gg.tabs_remove_create_getHeaders(2, url, ["https://acs.aliexpress.com/h5/mtop.aliexpress.trade.buyer.order.list/1.0/"], true, this.a04, this, oo)
        },
        a04: function (t, oo) {
            gg.getFetch(t.url, "text",this.a05, this, oo)
        },
        a05: function (t, oo) {
            if (t.code == 200) {
                let str = t.error.substring(12)
                str = str.substring(0, str.length - 1)
                let data = JSON.parse(str)
                this.a06(data.data.data, oo)
            }
            else {
                Tool.pre(["内容出错", t]);
            }
        },
        a06: function (data, oo) {
            let sqlArr = [], PurchaseorderIdArr = []
            for (let k in data) {
                if (k.indexOf('pc_om_list_order_') != -1) {
                    sqlArr.push('@.PurchaseOrderId like \'%' + data[k].id + '%\'')
                    PurchaseorderIdArr.push(data[k].id)
                }
            }
            if (PurchaseorderIdArr.length == 0) {
                $("#state").html("获取信息失败，0.5秒后重试。。")
                Tool.Time("name", 500, this.a03, this, oo);
            }
            else {
                oo.aliexpress.orderIdArr = PurchaseorderIdArr;
                this.a07(sqlArr, oo)
            }
        },
        a07: function (sqlArr, oo) {
            if (sqlArr.length > 50) {
                Tool.at("获取的采购订单，不可能超过50个。")
            }
            else {
                let str = '[0<r:order db="sqlite.dhgate" where=" where ' + sqlArr.join(" or ") + '" size=50>,"<:PurchaseOrderId/>"</r:order>]'
                Tool.ajax.a01(str, 1, this.a08, this, oo)
            }
        },
        a08: function (arr, oo) {
            if (arr.length - 1 == oo.aliexpress.orderIdArr.length) {
                Tool.Modal("提示", "没有需要采购的订单信息。", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
            }
            else {
                this.a09(arr, oo)
            }
        },
        a09: function (arr, oo) {
            let nArr = []
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].indexOf("/") != -1) {
                    nArr = nArr.concat(arr[i].split("/"));
                }
                else {
                    nArr.push(arr[i])
                }
            }
            this.a10(nArr, oo)
        },
        a10: function (arr, oo) {
            let nArr = []
            for (let i = 0; i < oo.aliexpress.orderIdArr.length; i++) {
                if (arr.indexOf(oo.aliexpress.orderIdArr[i]) == -1) {
                    nArr.push(oo.aliexpress.orderIdArr[i])
                }
            }
            oo.aliexpress.orderIdArr = nArr;//以前的值没用的，给个新值----(表示还未获取的采购订单)。
            this.d01(oo)
        },
        ///////////////////////////////////////////////////////
        b01: function (dhgate, aliexpress) {
            return '\
            <tr>\
				<td class="right">Contact Name：</td>\
				<td>'+ dhgate.contactPerson + '</td>\
				<td class="center">'+ (aliexpress.contactName == dhgate.contactPerson ? '正确' : '<font color=red>错误</font>') + '</td>\
				<td>'+ aliexpress.contactName + '</td>\
			</tr>\
            <tr>\
                <td class="right">Address Line 1：</td>\
                <td>'+ dhgate.address + '</td>\
                <td class="center">'+ (aliexpress.detailAddress == dhgate.address ? '正确' : '<font color=red>错误</font>') + '</td>\
                <td>'+ aliexpress.detailAddress + '</td>\
            </tr>\
            <tr>\
            	<td class="right">Address Line 2：</td>\
            	<td>'+ dhgate.address2 + '</td>\
            	<td class="center">'+ (aliexpress.detailAddress2 == dhgate.address2 ? '正确' : '<font color=red>错误</font>') + '</td>\
            	<td>'+ aliexpress.detailAddress2 + '</td>\
            </tr>\
            <tr>\
                <td class="right">City, State, Country：</td>\
                <td>'+ dhgate.city + ', ' + dhgate.state + ', ' + dhgate.country + '</td>\
                <td class="center">'+ ((dhgate.city + ", " + dhgate.state + ", " + dhgate.country).toLowerCase() == aliexpress.regionAddress.toLowerCase() ? '正确' : '<font color=red>错误</font>') + '</td>\
                <td>'+ aliexpress.regionAddress + '</td>\            \
            </tr>\
            <tr>\
                <td class="right">Postal Code：</td>\
                <td>'+ dhgate.zip + '</td>\
                <td class="center">'+ (dhgate.zip == aliexpress.postCode ? '正确' : '<font color=red>错误</font>') + '</td>\
                <td>'+ aliexpress.postCode + '</td>\
            </tr>\
            <tr>\
                <td class="right">Phone Number：</td>\
                <td>'+ dhgate.phone + '</td>\
                <td class="center">'+ (dhgate.phone.replace(/-/, " ").replace(/\+/, "") == aliexpress.fullPhoneNo ? '正确' : '<font color=red>错误</font>') + '</td>\
                <td>'+ aliexpress.fullPhoneNo + '</td>\
            </tr>'
        },
        b02: function (order_price, total) {
            //total的值会被修改传出
            let arr = order_price.priceDetails, str = '<tr class="table-light"><th colspan="2">小计</th></tr>'
            for (let i = 0; i < arr.length; i++) {
                str += '<tr><td class="right">' + arr[i].title + ' : </td><td>' + arr[i].value + '</td></tr>'
                ///////////////////////////////////////
                if (arr[i].title == "Shipping" && arr[i].value != "Free shipping") {
                    total.shipping += parseFloat(arr[i].value.split("$")[1])
                }
            }
            total.total += parseFloat(order_price.totalPrice.value.split("$")[1])
            str += '<tr><td class="right">' + order_price.totalPrice.title + " : </td><td>" + order_price.totalPrice.value + '</td></tr>'
            return str
        },
        b03: function (productVOList) {
            let newArr = []
            for (let i = 0; i < productVOList.length; i++) {
                newArr.push({
                    itemDetailUrl: productVOList[i].itemDetailUrl,
                    itemTitle: productVOList[i].itemTitle,
                    itemImgUrl: productVOList[i].itemImgUrl,
                    skuAttrs: this.b04(productVOList[i].skuAttrs),
                    itemPriceText: productVOList[i].itemPriceText,
                    quantity: productVOList[i].quantity
                })
            }
            return newArr
        },
        b04: function (skuAttrs) {
            let newArr = []
            for (let i = 0; i < skuAttrs.length; i++) {
                newArr.push(skuAttrs[i].text)
            }
            return newArr.join(", ")
        },
        b05: function (productVOList, order_price, total, AttributeCartArr, oo) {
            //total的值会被修改传出
            let str = ""
            for (let i = 0; i < productVOList.length; i++) {
                let str2
                if (AttributeCartArr.indexOf(productVOList[i].skuAttrs) == -1) {
                    str2 = ' （<font color="red">异常</font>）';
                    oo.isErr = true;
                }
                else {
                    str2 = ' （正常）';
                }
                str += '\
                <tr>\
                    <td class="w100" rowspan="3">\
                        <a href="'+ productVOList[i].itemImgUrl.split("_220x220")[0] + '" target="_blank">\
                            <img src="' + productVOList[i].itemImgUrl + '" title="点击预览" class="border" height="100">\
                        </a>\
                    </td>\
                    <td><a href="'+ productVOList[i].itemDetailUrl + '" target="_blank">' + productVOList[i].itemTitle + '</a></td>\
                </tr>\
                <tr><td>'+ productVOList[i].skuAttrs + str2 + '</td></tr>\
                <tr><td>'+ productVOList[i].itemPriceText + ' x ' + productVOList[i].quantity + '</td></tr>'
                total.quantity += productVOList[i].quantity//合计
            }
            str += this.b02(order_price, total)
            return '<table class="table mb-0"><tbody>' + str + '</tbody></table>';
        },
        b06: function (orderitem, oo) {
            let str = "", Amount = 0, AttributeCartArr = []
            for (let i = 1; i < orderitem.length; i++) {
                if (orderitem[i].Remark) {
                    oo.isErr = true;
                    orderitem[i].Remark += ' （<font color="red">有【买家备注】，需要手动在【速卖通】发送站内信</font>）'
                }
                str += '\
                <tr>\
                    <td class="w100" rowspan="3">\
                        <a href="'+ orderitem[i].pic + '" target="_blank">\
                            <img src="' + orderitem[i].pic.replace('image.dhgate.com/f3/', 'image.dhgate.com/100x100/f3/') + '" title="点击预览" class="border" height="100">\
                        </a>\
                    </td>\
                    <td><a href="https://www.dhgate.com/product/-/'+ orderitem[i].fromid + '.html" target="_blank">' + orderitem[i].name + '</a></td>\
                </tr>\
                <tr><td title="属性">'+ orderitem[i].AttributeCart + '</td></tr>\
                <tr><td title="价格">'+ orderitem[i].RealPrice + ' x ' + orderitem[i].Amount + '（' + orderitem[i].Unit + '）</td></tr>\
                <tr><td class="right">编码：</td><td>'+ orderitem[i].proid + '</td></tr>\
                <tr><td class="right">产品备注：</td><td>' + orderitem[i].Remark + '</td></tr>'
                Amount += orderitem[i].Amount
                //去掉尾部的“,”号。敦煌自己就是这个样子的。
                let AttributeCart = orderitem[i].AttributeCart
                let last1 = AttributeCart.substring(AttributeCart.length - 1)
                if (last1 == ",") AttributeCart = AttributeCart.substring(0, AttributeCart.length - 1)
                AttributeCartArr.push(AttributeCart)
            }
            return {
                html: '<table class="table mb-0"><tbody>' + str + '</tbody></table>',
                Amount: Amount,
                AttributeCartArr: AttributeCartArr,
            };
        },
        b07: function (dhgate_shipping, aliexpress_shipping, oo) {
            let str;
            if (aliexpress_shipping < dhgate_shipping - 3 || aliexpress_shipping > dhgate_shipping + 6) {
                oo.isErr = true;
                str = '<font color="red">异常</font>';
            }
            else {
                str = '正常';
            }
            return str;
        },
        b08: function (total100, oo) {
            let str
            if (total100 < 30 || total100 > 90) {
                oo.isErr = true;
                str = '<font color="red">异常</font>';
            }
            else {
                str = '正常';
            }
            return str;
        },
        b09: function (dhgate_quantity, aliexpress_quantity, oo) {
            let str
            if (dhgate_quantity != aliexpress_quantity) {
                oo.isErr = true;
                str = '<font color="red">异常</font>';
            }
            else {
                str = '正常';
            }
            return str
        },
        ///////////////////////////////////////////////////////
        d01: function (oo) {
            if (oo.aliexpress.orderIdArr.length == 0) {
                //获取信息完成
                this.e01(oo)
            }
            else {
                let url = "https://www.aliexpress.com/p/order/detail.html?orderId=" + oo.aliexpress.orderIdArr[0]
                gg.tabs_remove_create_getHeaders(2, url, ["https://acs.aliexpress.com/h5/mtop.aliexpress.trade.buyer.order.detail/1.0/"], true, this.d02, this, oo)
            }
        },
        d02: function (t, oo) {
            gg.getFetch(t.url,"text", this.d03, this, oo)
        },
        d03: function (t, oo) {
            if (t.code == 200) {
                let str = t.error.substring(12)
                str = str.substring(0, str.length - 1)
                let data = JSON.parse(str)
                this.d04(data.data.data, oo)
            }
            else {
                Tool.pre(["内容出错", t]);
            }
        },
        d04: function (data, oo) {
            let o1 = data.detail_simple_order_info_component_111820.fields.addressVO
            o1.orderId = oo.aliexpress.orderIdArr[0]
            o1.order_price = data.detail_order_price_block_111823.fields
            o1.productVOList = this.b03(data.detail_product_block_111822.fields.productVOList)
            oo.aliexpress.addressArr.push(o1)
            oo.aliexpress.orderIdArr.shift();
            this.d01(oo);
        },
        ///////////////////////////////////////////////////////
        e01: function (oo) {
            let str = '[0\
				<r:orderitem db="sqlite.dhgate" where=" where @.OrderID='+ this.obj.dhgate_orderid + '" size=50>\
				,{\
					"pic":"<:pic/>",\
					"name":"<:name tag=js/>",\
					"proid":"<:proid/>",\
					"Amount":<:Amount/>,\
					"Unit":"<:Unit/>",\
					"RealPrice":"<:RealPrice f=2/>",\
					"AttributeCart":"<:AttributeCart tag=js/>",\
					"Remark":"<:Remark tag=js/>",\
					"fromid":"<:fromid/>"\
				}\
				</r:orderitem>\
			]'
            Tool.ajax.a01(str, 1, this.e02, this, oo)
        },
        e02: function (t, oo) {
            if (t.length == 51) {
                Tool.at("异常，订单的产品限制在50个，如果要修改，请联系开发者。")
            }
            else {
                this.e03(t, oo)
            }
        },
        e03: function (orderitem, oo) {
            let str = '', arr = oo.aliexpress.addressArr, orderitemObj = this.b06(orderitem, oo)
            for (let i = 0; i < arr.length; i++) {
                str += '\
                <tr class="table-light">\
                    <th colspan="2"></th>\
                    <th colspan="2">\
                        【' + (i + 1) + '/' + arr.length + '】\
                        采购单号：<a href="https://www.aliexpress.com/p/order/detail.html?orderId=' + arr[i].orderId + '" target="_blank">' + arr[i].orderId + '</a>\
                    </th>\
                </tr>'
                str += '\
                <tr>\
				    <th></th>\
				    <th>敦煌网地址</th>\
				    <th class="center">对比</th>\
				    <th>通卖通地址</th>\
			    </tr>'+ this.b01(oo.dhgate, arr[i]) + '\
                <tr>\
                    <td class="right">Vat Number：</td>\
                    <td colspan="3">'+ oo.dhgate.vatNumber + '</td>\
                </tr>\
                <tr class="table-light">\
                    <td colspan="2">敦煌网</td>\
                    <td colspan="2">速卖通</td>\
                </tr>\
                <tr>\
                    <td colspan="2" class="p-0 w-50">'+ orderitemObj.html + '</td>\
                    <td colspan="2" class="p-0 w-50">' + this.b05(arr[i].productVOList, arr[i].order_price, oo.aliexpress.total, orderitemObj.AttributeCartArr, oo) + '</td>\
                </tr>'
                if (
                    oo.dhgate.contactPerson != arr[i].contactName ||
                    oo.dhgate.address != arr[i].detailAddress ||
                    oo.dhgate.address2 != arr[i].detailAddress2 ||
                    (oo.dhgate.city + ", " + oo.dhgate.state + ", " + oo.dhgate.country).toLowerCase() != arr[i].regionAddress.toLowerCase() ||
                    oo.dhgate.zip != arr[i].postCode ||
                    oo.dhgate.phone.replace(/-/, " ").replace(/\+/, "") != arr[i].fullPhoneNo
                ) { oo.isErr = true; }
            }
            this.e04(orderitemObj.Amount, str, oo)
        },
        e04: function (dhgate_quantity, str, oo) {
            let total100 = ((oo.dhgate.total - oo.aliexpress.total.total) / oo.aliexpress.total.total * 100).toFixed(2)
            str += '\
			<tr class="table-light center"><th colspan="4">合计</th></tr>\
			<tr class="table-light">\
				<th></th>\
				<th>敦煌网</th>\
				<th class="center">对比</th>\
				<th>速卖通</th>\
			</tr>\
			<tr>\
				<td class="right">运费：</td>\
				<td>$'+ oo.dhgate.shipping + '</td>\
				<td class="center" title="超出±3会提示，否则不会提示。">'+ this.b07(oo.dhgate.shipping, oo.aliexpress.total.shipping, oo) + '</td>\
				<td>$'+ oo.aliexpress.total.shipping.toFixed(2) + '</td>\
			</tr>\
			<tr>\
				<td class="right">订单实收：</td>\
				<td>$'+ oo.dhgate.total + '</td>\
				<td class="center" title="30%>利润率>90%会提示，否则不会提示。">'+ this.b08(total100, oo) + '</td>\
				<td>$' + oo.aliexpress.total.total.toFixed(2) + '（' + total100 + '%）</td>\
			</tr>\
			<tr>\
				<td class="right">商品件数：</td>\
				<td>'+ dhgate_quantity + '</td>\
				<td class="center">'+ this.b09(dhgate_quantity, oo.aliexpress.total.quantity, oo) + '</td>\
				<td>'+ oo.aliexpress.total.quantity + '</td>\
			</tr>'
            this.e05(str, oo)
        },
        e05: function (str, oo) {
            let PurchaseOrderId = []
            for (let i = 0; i < oo.aliexpress.addressArr.length; i++) {
                PurchaseOrderId.push(oo.aliexpress.addressArr[i].orderId)
            }
            this.obj.PurchaseOrderId = PurchaseOrderId.join("/")
            this.obj.PurchaseCost = oo.aliexpress.total.total
            //////////////////////////////////////
            if (oo.isErr) {
                let title = "获取采购信息【异常】"
                let button = '\
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>\
                <button type="button" class="btn btn-primary" onclick="Tool.GetPurchasingInformation.c01()" data-bs-dismiss="modal">忽略提示【继续】</button>'
                Tool.Modal(title, '<table class="table table-hover mb-0 table-bordered"><tbody>' + str + '</tbody></table>', button, 'modal-xl');
            }
            else {
                this.c01()
            }
        },
        c01: function () {
            $("#seep5").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
            let str = '{"PurchaseUserName":"<r:buyer db="sqlite.aliexpress" where=" where @.isdefault=1" size=1><:UserName/></r:buyer>"}'
            Tool.ajax.a01(str, 1, this.c02, this)
        },
        c02: function (t) {
            if (t.PurchaseUserName) {
                let str = '"ok"<r: db="sqlite.dhgate">update @.order set @.PurchaseTime=' + Tool.gettime("") + ',@.PurchaseOrderId=\'' + this.obj.PurchaseOrderId + '\',@.PurchaseCost=' + this.obj.PurchaseCost + ',@.PurchaseStatus=2,@.PurchaseUserName=\'' + t.PurchaseUserName + '\' where @.orderid=\'' + this.obj.dhgate_orderid + '\'</r:>'
                Tool.ajax.a01(str, 1, this.c03, this);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        c03: function (t) {
            if (t == "ok") {
                $("#seep5").html("*(5)")
                location.reload();
            } else { Tool.pre(["出错", t]); }
        },
    }
})