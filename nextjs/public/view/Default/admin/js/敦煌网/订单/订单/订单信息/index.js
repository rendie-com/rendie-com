'use strict';
var fun =
{
    obj: {}, token: "",
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//订单编号
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//订单状态
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//采购状态
        obj.arr[7] = obj.arr[7] ? parseInt(obj.arr[7]) : 1;//翻页
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//锁定该订单
        this.a02();
    },
    a02: function () {
        let num2 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 2) / 1000);//2天
        let str = '\
		{\
			"PurchaseStatusNum":[\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=6,count)/>,\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=0,count)/>,\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=12,count)/>,\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=5,count)/>,\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=10,count)/>,\
				<.Db(sqlite.dhgate,select count(1) as total from @.order where @.purchasestatus=11,count)/>\
			],\
			"statusNum":[\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'101003\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102001\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'103001\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105001\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105002\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105003\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105004\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'103002\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'101009\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106001\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106002\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106003\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102006\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102007\',count)/>,\
				<.Db(sqlite.dhgate,select count(1) from @.order where @.deliveryDeadline<'+ num2 + ' and @.status=\'103001\',count)/>\
			],\
			<r:order db="sqlite.dhgate" where=" where'+ this.b12() + '" size=1 page=2>\
				"id":<:id/>,\
				"orderid":<:orderid/>,\
				"BusinessBuyer":<:BusinessBuyer/>,\
				"orderid32":"<:orderid32/>",\
				"buyerId":"<:buyerId/>",\
				"status":"<:status/>",\
				"dhusername":"<:username/>",\
				"dhusernameCount":"000000",\
				"BeginDate":<:BeginDate/>,\
				"addtime":<:addtime/>,\
				"paytime":<:paytime/>,\
				"ArrivalTime":"<:ArrivalTime/>",\
				"deliveryDeadline":<:deliveryDeadline/>,\
				"DeliveryDate":"<:DeliveryDate/>",\
				"buyerConfirmDate":<:buyerConfirmDate/>,\
				"inAccountDate":<:inAccountDate/>,\
				"orderRefund":"<:orderRefund f=2/>",\
				"cancelDate":<:cancelDate/>,\
				"warnReason":"<:warnReason/>",\
				"Remark":"<:Remark tag=js/>",\
				"updateDate":<:updateDate/>,\
				"username":"<:fromuser/>",\
				"UserLevel":"<:UserLevel/>",\
				"orderFrom":"<:orderFrom/>",\
			    <r:seller db="sqlite.dhgate" where=" where @.username=\'<:fromuser/>\'" size=1>\
			        "password":"<:password/>",\
			        "fromhide":<:hide/>,\
			        "fromid":<:fromid/>,\
			        "cookies":<:cookies tag=0/>,\
			    </r:seller>\
			"itemTotalPrice":"<:itemTotalPrice f=2/>",\
			"ChargeDeliver":"<:ChargeDeliver f=2/>",\
			"DeliverType":"<:DeliverType/>",\
			"MoneyGoods":"<:MoneyGoods f=2/>",\
			"commissionAmount":"<:commissionAmount f=2/>",\
			"gatewayFee":"<:gatewayFee f=2/>",\
			"UseCouponMoney":"<:UseCouponMoney f=2/>",\
			"reducePrice":"<:reducePrice f=2/>",\
			"risePrice":"<:risePrice f=2/>",\
			"MoneyTotal":"<:MoneyTotal f=2/>",\
			"o3":\
			{\
				"firstName":<:firstName tag=json/>,\
				"lastName":<:lastName tag=json/>,\
				"address":"<:address tag=js/>",\
				"address2":"<:address2 tag=js/>",\
				"city":"<:city tag=js/>",\
				"province":"<:province  tag=js/>",\
				"country":"<:country tag=js/>",\
                <r:country db="sqlite.dhgate" where=" where @.name=\'<:country/>\' and @.upid=\'0\'" size=1>\
                    "countryid":"<:countryid/>",\
                    "countryName":"<:des/>",\
                </r:country>\
				"zip":"<:zip tag=js/>",\
				"phone":"<:phone tag=js/>",\
				"vatNumber":"<:vatNumber/>",\
				"abn":"<:abn/>",\
				"eClearanceCode":"<:eClearanceCode/>",\
				"logdeliver":\
				[{}\
				<r:logdeliver db="sqlite.dhgate" where=" where @.OrderID=\'<:orderid/>\'" size="10">\
				,{\
					"Express":"<:Express tag=js/>",\
					"ExpressNumber":"<:ExpressNumber tag=js/>",\
					"queryState":<:queryState/>,\
					"DeliverDate":"<:DeliverDate/>"\
				}\
				</r:logdeliver>\
				]\
			},\
			"PurchaseTime":<:PurchaseTime/>,\
			"PurchaseProcessingTime":<:PurchaseProcessingTime/>,\
			"PurchaseUserName":"<:PurchaseUserName/>",\
			"PurchaseOrderId":"<:PurchaseOrderId/>",\
			"PurchaseCost":"<:PurchaseCost f=2/>",\
			"PurchaseShipping":"<:PurchaseShipping/>",\
			"PurchaseStatus":<:PurchaseStatus/>,\
			"PurchaseRemark":"<:PurchaseRemark tag=js/>",\
			"PurchaseWaitingDelivery":<:PurchaseWaitingDelivery/>,\
			"PurchaseRefund":"<:PurchaseRefund f=2/>",\
			"PurchaseOrderStatus":"<:PurchaseOrderStatus/>",\
			"CommissionTime":<:CommissionTime/>,\
			"orderitem":\
			[{}\
				<r:orderitem db="sqlite.dhgate" where=" where @.OrderID=\'<:orderid/>\'" size=50>\
				,{\
					"pic":"<:pic/>",\
					"fromURL":"https://www.dhgate.com/product/-/<:fromid/>.html",\
					"name":"<:name tag=js/>",\
					"proid":"<:proid/>",\
					"Amount":"<:Amount/>",\
					"Unit":"<:Unit/>",\
					"RealPrice":"<:RealPrice f=2/>",\
					"AttributeCart":"<:AttributeCart tag=js/>",\
					"Remark":"<:Remark tag=js/>",\
					"fromid":"<:fromid/>"\
				}\
				</r:orderitem>\
			],\
			"msg":\
			[0\
				<r:msg size=20 db="sqlite.dhgate" where=" where @.fromuser=\'<:fromuser/>\' and @.param=\'<:orderid/>\' order by @.SendTime desc,@.id desc">\
				,{\
				"msgtype":"<:msgtype/>",\
				"fromid":"<:fromid/>",\
				"name":"<:name tag=js/>",\
				"msgreplycount":"<:msgreplycount/>",\
				"receiver":"<:receiver tag=js/>",\
				"receiverRead":<:receiverRead/>,\
				"receiverMark":<:receiverMark/>,\
				"receiverStatus":"<:receiverStatus/>",\
				"Sender":"<:Sender tag=js/>",\
				"senderRead":<:senderRead/>,\
				"senderMark":<:senderMark/>,\
				"senderStatus":<:senderStatus/>,\
				"Sendtime":"<:Sendtime/>"\
				}\
				</r:msg>\
			],\
			</r:order>\
			"count":<@count/>\
		}'
        Tool.ajax.a01(str, obj.arr[7], this.a03, this);
    },
    a03: function (arr) {
        if (arr.count == 0) { $("#table").html(this.b07(arr) + '<div class="Tul center">没有数据符合条件！</div>'); }
        else {
            arr.o3.contactPerson = arr.o3.firstName + " " + arr.o3.lastName
            arr.o3.contactPerson = Tool.Trim(arr.o3.contactPerson.replace(/’/g, "'"));//需要去空格的
            arr.o3.address = Tool.Trim(arr.o3.address.replace(/,/g, " "));//需要去空格的
            arr.o3.address2 = Tool.Trim(arr.o3.address2.replace(/,/g, " "));//需要去空格的
            arr.o3.country = Tool.Trim(arr.o3.country.replace(/,/g, " "));//把逗号变成空格，是因为，第5步获取时会以逗号分隔地址。
            arr.o3.province = Tool.Trim(arr.o3.province.replace(/,/g, " "));
            arr.o3.city = Tool.Trim(arr.o3.city.replace(/,/g, " "));
            arr.o3.zip = Tool.Trim(arr.o3.zip.replace(/,/g, " "));
            arr.o3.zip = arr.o3.zip.replace(/ +|-/ig, "");
            arr.o3.phone = arr.o3.phone.replace(/ +/ig, "");
            ////////////英国的zip中间有空格////////////////////
            //if(arr.o3.country=="United Kingdom")
            //{
            //  if(arr.o3.zip.indexOf(" ")==-1)
            //  {
            //    //把【Mk439bg】转成【Mk43 9bg】或【Se15hb】转成【Se1 5hb】
            //    let len=arr.o3.zip.length-3
            //    arr.o3.zip=arr.o3.zip.substr(0,len)+" "+arr.o3.zip.substr(len)
            //  }
            //}
            this.obj =
            {
                orderid: arr.orderid,
                PurchaseStatus: arr.PurchaseStatus,//核对商品前，检测到该订单【异常】
                PurchaseShipping: arr.PurchaseShipping,//采购运费
                orderitem: arr.orderitem,//订单商品
                warnReason: arr.warnReason,//警告原因
                Remark: arr.Remark,//订单管理_订单信息_5.获取采购信息
                status: arr.status,//订单状态
                MoneyTotal: arr.MoneyTotal,//实收金额   如果大于12，查看有没有优惠券
                msgCount: arr.msg.length - 1,
                orderid32: arr.orderid32,//订单ID(32位)
                buyerId: arr.buyerId,//买家ID(32位)
                fromid: arr.fromid,//seller表的
                cookies: arr.cookies,//seller表的
                username: arr.username,
                password: arr.password,
                PurchaseRemark: arr.PurchaseRemark,
                PurchaseOrderId: arr.PurchaseOrderId,
                PurchaseUserName: arr.PurchaseUserName,
                ChargeDeliver: arr.ChargeDeliver,
                DeliverType: arr.DeliverType,
                _o3: JSON.parse(JSON.stringify(arr.o3)),
                o3: arr.o3
            }
            this.a04(arr)
        }
    },
    a04: function (arr) {
        let commissionAmount2 = ((arr.commissionAmount / arr.MoneyGoods) * 100).toFixed(2)
        let gatewayFee2 = ((arr.gatewayFee / arr.MoneyGoods) * 100).toFixed(2)
        let html = this.b07(arr) + '\
    <table class="w-100">\
    <tr>\
    <td class="align-top">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center"><tr><th colspan="2">基本信息</th></tr></thead>\
        <tr><td class="right" style="width:40%;">订单号：</td><td class="p-0" style="width:60%;">'+ arr.orderid + ' <button type="button" class="btn btn-outline-secondary" onclick="Tool.openOrderItem.a01($(this),fun.obj.username,fun.obj.password,fun.obj.cookies,fun.obj.orderid32)">*在敦煌看该订单</button></td></tr>\
        <tr><td class="right">订单32：</td><td nowrap="nowrap">'+ arr.orderid32 + '</td></tr>\
        <tr><td class="right">订单来源：</td><td>'+ arr.orderFrom + '</td></tr>\
        <tr><td class="right">买家名称：</td><td>'+ arr.dhusername + ' <i class="vip-level-img-icon ' + arr.UserLevel + '"></i>' + (arr.BusinessBuyer ? ' <i class="u-icon" title="即平均客单价大于150美金的海外零售商或公司采购型买家"></i>' : '') + '（购买' + arr.dhusernameCount + '次）</td></tr>\
        <tr><td class="right">买家ID：</td><td>'+ arr.buyerId + '</td></tr>\
        <tr><td class="right">订单状态：</td><td>'+ this.b01(arr.status, arr.deliveryDeadline) + '</td></tr>\
        <tr><td class="right">下单日期：</td><td>'+ Tool.js_date_time2(arr.BeginDate, "-") + '</td></tr>\
        <tr><td class="right">付款日期：</td><td>'+ Tool.js_date_time2(arr.paytime, "-") + '</td></tr>\
        <tr><td class="right">发货截止日期：</td><td>'+ Tool.js_date_time2(arr.deliveryDeadline, "-") + '</td></tr>\
        <tr><td class="right">发货时间：</td><td>'+ this.b14(false, arr.DeliveryDate) + '</td></tr>\
        <tr><td class="right" nowrap="nowrap">买家确认收货时间：</td><td>'+ Tool.js_date_time2(arr.buyerConfirmDate, "-") + '</td></tr>\
        <tr><td class="right">入账时间：</td><td>'+ Tool.js_date_time2(arr.inAccountDate, "-") + '</td></tr>\
        <tr><td class="right">订单退款：</td><td>'+ arr.orderRefund + '</td></tr>\
        <tr><td class="right">交易【取消/完成】时间：</td><td>'+ Tool.js_date_time2(arr.cancelDate, "-") + '</td></tr>\
        <tr><td class="right">警告原因：</td><td>'+ arr.warnReason + '</td></tr>\
        <tr><td class="right">买家备注：</td><td>'+ arr.Remark + '</td></tr>\
      </table>\
    </td>\
    <td class="align-top">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center"><tr><th colspan="2">其它信息</th></tr></thead>\
        <tr><td class="right" style="width:40%;">添加时间：</td><td title="该数据什么时后添加的">'+ Tool.js_date_time2(arr.addtime, "-") + '</td></tr>\
        <tr><td class="right">采集更新时间：</td><td>'+ Tool.js_date_time2(arr.updateDate, "-") + '</td></tr>\
        <tr><td class="right">来源账户：</td><td>'+ arr.username + '</td></tr>\
        <tr><td class="right" nowrap="nowrap">来源账户状态：</td><td>'+ this.b13(arr.fromhide) + '</td></tr>\
        <tr><td class="right">运达时间：</td><td>'+ arr.ArrivalTime + ' 天</td></tr>\
        <tr><td class="right">产品总计：</td><td>	US $'+ arr.itemTotalPrice + '</td></tr>\
        <tr><td class="right">运费：</td><td nowrap="nowrap">US $'+ arr.ChargeDeliver + '（' + arr.DeliverType + '）</td></tr>\
        <tr><td class="right">卖家折扣：</td><td title="也是【订单降价金额】">US $'+ arr.reducePrice + '</td></tr>\
        <tr><td class="right">订单总额：</td><td>-</td></tr>\
        <tr><td class="right">佣金金额：</td><td title="佣金金额/实付金额">-US $'+ arr.commissionAmount + ' (' + commissionAmount2 + '%)</td></tr>\
        <tr><td class="right">卖家优惠券：</td><td title="订单3488601596有数据">-</td></tr>\
        <tr><td class="right">DH优惠券：</td><td>-US $'+ arr.UseCouponMoney + '</td></tr>\
        <tr><td class="right">实付金额：</td><td>US $'+ arr.MoneyGoods + '</td></tr>\
        <tr><td class="right">支付手续费：</td><td>-US $'+ arr.gatewayFee + ' (' + gatewayFee2 + '%)</td></tr>\
        <tr><td class="right">订单涨价金额：</td><td>US $'+ arr.risePrice + '</td></tr>\
        <tr><td class="right">订单实收：</td><td><font color="red">US $'+ arr.MoneyTotal + '</font></td></tr>\
      </table>\
    </td>\
    <td class="align-top">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center"><tr><th colspan="2">货运信息</th></tr></thead>\
        <tr><td class="right">Contact Name：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.contactPerson + '" id="contactPerson"/></td></tr>\
        <tr><td class="right">Address Line 1：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.address + '" id="address"/></td></tr>\
        <tr><td class="right">Address Line 2：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.address2 + '" id="address2"/></td></tr>\
        <tr><td class="right">city：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.city + '" id="city"/></td></tr>\
        <tr><td class="right">province/State：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.province + '" id="province"/></td></tr>\
        <tr><td class="right">country：</td><td nowrap="nowrap"><img src="https://image.dhgate.com/images/flag/'+ arr.o3.countryid + '.gif" style="vertical-align: middle;"/> ' + arr.o3.countryName + ' (' + arr.o3.country + ')</td></tr>\
        <tr><td class="right">Postal Code：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.zip + '" id="zip"/></td></tr>\
        <tr><td class="right">Phone Number：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.phone + '" id="phone"/></td></tr>\
        <tr><td class="right">Vat Number：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.o3.vatNumber + '" id="vatNumber"/></td></tr>\
        <tr><td class="right">BN/GST：</td><td>'+ arr.o3.abn + '</td></tr>\
        <tr><td class="right" nowrap="nowrap">e-Clearance Code：</td><td>'+ arr.o3.eClearanceCode + '</td></tr>\
        '+ this.b08(arr.o3.logdeliver) + '\
      </table>\
    </td>\
    <td class="align-top">\
      <table class="table table-hover align-middle">\
        <thead class="table-light center"><tr><th colspan="2">采购信息</th></tr></thead>\
        <tr><td class="right">采购用户：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.PurchaseUserName + '" onblur="fun.j01($(this),\'PurchaseUserName\',\'' + arr.PurchaseUserName + '\')"/></td></tr>\
        <tr><td class="right">采购单号：</td><td class="p-0"><input type="text" class="form-control" value="'+ arr.PurchaseOrderId + '" onblur="fun.j01($(this),\'PurchaseOrderId\',\'' + arr.PurchaseOrderId + '\')"/></td></tr>\
        <tr>\
          <td class="right">采购成本：</td>\
          <td class="p-0">\
            <div class="input-group">\
              <span class="input-group-text" id="inputGroup-sizing-sm">$</span>\
              <input type="text" class="form-control" value="'+ arr.PurchaseCost + '" onblur="fun.j01($(this),\'PurchaseCost\',\'' + arr.PurchaseCost + '\')"/>\
              <span class="input-group-text" id="inputGroup-sizing-sm">利润率：'+ this.b15(arr.MoneyTotal, arr.PurchaseCost) + '</span>\
            </div>\
          </td>\
        </tr>\
        <tr><td class="right">采购状态：</td><td class="p-0">'+ this.b02(arr.PurchaseStatus) + '</td></tr>\
        <tr><td class="right">采购备注：</td>\
				<td style="height: 114px;" class="p-0"><textarea class="form-control h-100" onblur="fun.j01($(this),\'PurchaseRemark\',\''+ arr.PurchaseRemark.replace(/\n/ig, '\\n') + '\')">' + arr.PurchaseRemark + '</textarea></td></tr>\
        <tr>\
					<td class="right" nowrap="nowrap">采购处理时间：</td>\
					<td class="p-0" nowrap="nowrap">'+ Tool.js_date_time2(arr.PurchaseProcessingTime, "-") + ' <button type="button" class="btn btn-outline-secondary" onclick="fun.c28()">记录当前时间</button></td>\
				</tr>\
        <tr>\
          <td class="right">采购退款：</td>\
          <td class="p-0">\
            <div class="input-group">\
              <span class="input-group-text" id="inputGroup-sizing-sm">$</span>\
              <input type="text" class="form-control" value="'+ arr.PurchaseRefund + '" onblur="fun.j01($(this),\'PurchaseRefund\',\'' + arr.PurchaseRefund + '\')"/>\
            </div>\
          </td>\
        </tr>\
        <tr><td class="right">采购运费：</td><td>'+ arr.PurchaseShipping + '</td></tr>\
        <tr><td class="right">采购时间：</td><td>'+ Tool.js_date_time2(arr.PurchaseTime, "-") + '</td></tr>\
        <tr><td class="right">订单到达时间：</td><td>'+ this.b14(true, arr.PurchaseWaitingDelivery) + '</td></tr>\
        <tr><td class="right">采购订单状态：</td><td>'+ arr.PurchaseOrderStatus + '</td></tr>\
        <tr><td class="right">提成时间：</td><td>'+ Tool.js_date_time2(arr.CommissionTime, "-") + '</td></tr>\
        <tr>\
          <td class="right">智能采购：</td>\
          <td class="p-0">\
            <div class="btn-group btn-group-sm">\
            <button id="seep1" type="button" class="btn btn-outline-secondary" onclick="Tool.ComparedProduct.a01(fun.obj.status,fun.obj.warnReason,fun.obj.PurchaseOrderId,fun.obj.PurchaseStatus,fun.obj.msgCount,fun.obj.PurchaseRemark,fun.obj.orderid)" title="核对商品">*(1)</button>\
            <button id="seep2" type="button" class="btn btn-outline-secondary" onclick="Tool.addCart.a01(fun.obj.orderid,fun.obj.o3.country)" title="加入购物车">*(2)</button>\
            <button id="seep3" type="button" class="btn btn-outline-secondary" onclick="Tool.CopyAddress.a01(fun.obj)" title="复制地址">*(3)</button>\
            <button id="seep4" type="button" class="btn btn-outline-secondary" onclick="Tool.SubmitPayment.a01(fun.obj)" title="提交待付">*(4)</button>\
            <button id="seep5" type="button" class="btn btn-outline-secondary" onclick="Tool.GetPurchasingInformation.a01('+ arr.orderid + ',\'' + arr.o3.countryid + '\',\'' + arr.o3.country + '\',' + arr.ChargeDeliver + ',' + arr.MoneyTotal + ')" title="获取采购信息">*(5)</button></div>\
          </td>\
        </tr>\
        <tr><td class="right">提示：</td><td id="state" class="col"></td></tr>\
      </table>\
    </td>\
    </tr>\
    <tr><td id="orderitem1" colspan="4"></td></tr>\
    <tr><td colspan="4">'+ this.b04(arr.msg) + '</td></tr>\
    <tr><td colspan="4">'+ this.b06(arr.PurchaseOrderId) + '</td></tr>\
    </table>'
        Tool.html(this.a06, this, html, arr.orderitem)
    },
    a06: function (orderitem)//orderitem表
    {
        let proid = "", desI = 0, arr2 = [], objProid = {}
        for (let i = 1; i < orderitem.length; i++) {
            proid = orderitem[i].proid.split("_")[0];
            ///////////////////////////
            desI = Tool.pronum(proid, 50)
            if (!objProid[desI]) { objProid[desI] = [] }
            objProid[desI].push(proid);
            ///////////////////////////////////
            arr2.push('{\
              <r:pro db="sqlite.aliexpress" where=" where @.proid=\''+ proid + '\'" size=1>\
                "minprice":<:minprice f=2/>,\
                "maxprice":<:maxprice f=2/>,\
                "price":<:price f=2/>,\
                "Discount":<:Discount f=0/>,\
                "datetime":<:datetime/>,\
                "typename":"<r:type db="sqlite.aliexpress" where=" where @.fromid=<:type/>" size=1><:name tag=js/>(<:enname/>)</r:type>",\
                "SaleNum":<:SaleNum/>,\
                "Review":"<:Review/>",\
                "lotNum":"<:lotNum/>",\
                "proid":"<:proid/>",\
                "unit":"<:unit/>",\
                "hide":<:hide/>,\
                "shopid":"<:shopid/>",\
                "fromid":"<:fromid/>",\
              </r:pro>\
              <r:proupdhgate db="sqlite.dhgate" where=" where @.proid=\''+ proid + '\'" size=1>\
                "ratio_Discount":<:ratio/>,\
                "ratio":"<:ratio/>",\
                "addtime":"<:addtime/>",\
                "uptime":"<:uptime/>",\
                "downtime":"<:downtime/>"\
              </r:proupdhgate>\
              }')
        }
        Tool.ajax.a01("[" + arr2.join(",") + "]", 1, this.a07, this, [orderitem, objProid])
    },
    a07: function (orderitemPro, oo) {
        let arr = []
        for (let k in oo[1]) {
            arr.push('\
              [0\
              <r:prodes db="sqlite.aliexpress_prodes/'+ k + '" where=" where @.proid in(\'' + oo[1][k].join("','") + '\')">,\
                {\
				        "proid":"<:proid/>",\
                "HistoryInfo":<:HistoryInfo/>\
				        }\
			        </r:prodes>\
              ]');
        }
        this.obj.A1 = 1;
        this.obj.A2 = arr.length;
        this.obj.Aarr = [arr, orderitemPro, oo[0]];
        //arr						本地商品表的详情
        //orderitemPro	本地商品表的商品信息
        //oo[0]					订单商品信息
        this.a08()
    },
    a08: function () {
        if (this.obj.A1 <= this.obj.A2) {
            Tool.ajax.a01(this.obj.Aarr[0][this.obj.A1 - 1], 1, this.a09, this)
        }
        else {
            let arr1 = this.obj.Aarr[0], arr2 = this.obj.Aarr[1];
            //arr1			本地商品表的详情
            //arr2			本地商品表的商品信息
            for (let i = 0; i < arr2.length; i++)//合并
            {
                for (let j = 0; j < arr1.length; j++) {
                    for (let k = 1; k < arr1[j].length; k++) {
                        if (arr2[i].proid == arr1[j][k].proid) {
                            arr2[i].HistoryInfo = arr1[j][k].HistoryInfo;
                            break;
                        }
                    }
                }
            }
            $("#orderitem1").html(this.b03(arr2, this.obj.Aarr[2]));
            ///////////////////////////////////////////////////



        }
    },
    a09: function (oo) {
        this.obj.Aarr[0][this.obj.A1 - 1] = oo;
        this.obj.A1++;
        this.a08();
    },
    b01: function (id, time) {
        let name = ""
        switch (id) {
            case "111000": name = "订单取消"; break;
            case "101003": name = "等待买家付款"; break;
            case "102001": name = "买家已付款，等待平台确认"; break;
            case "103001": name = "<font color=red>等待您发货</font> (还剩:" + Tool.dateDHM(time * 1000) + ")"; break;
            case "105001": name = "买家退款中，等待协商结果"; break;
            case "105002": name = "退款协议已达成"; break;
            case "105003": name = "部分退款后，等待发货"; break;
            case "105004": name = "买家取消退款申请"; break;
            case "103002": name = "已部分发货"; break;
            case "101009": name = "等待买家确认收货"; break;
            case "106001": name = "退款/退货协商中，等待协议达成"; break;
            case "106002": name = "买家投诉到平台"; break;
            case "106003": name = "协议已达成，执行中"; break;
            case "102006": name = "已确认收货"; break;
            case "102007": name = "超过预定期限，自动确认收货"; break;
            case "102111": name = "交易成功"; break;
            case "111111": name = "交易关闭"; break;
            default: name = "未知：" + id;
        }
        return name
    },
    b02: function (val) {
        let str = '\
			<Select onchange="fun.j01($(this),\'PurchaseStatus\',\''+ val + '\')" class="form-select">\
			<option value="">异常</Option>\
			<option value="6"'+ (val == '6' ? ' selected="selected"' : '') + '>无需采购</Option>\
			<Option value="0"'+ (val == '0' ? ' selected="selected"' : '') + '>等待采购</Option>\
			<Option value="4"'+ (val == '4' ? ' selected="selected"' : '') + '>取消</Option>\
			<Option value="2"'+ (val == '2' ? ' selected="selected"' : '') + '>已付款</Option>\
			<Option value="12"'+ (val == '12' ? ' selected="selected"' : '') + '>非正常采购</Option>\
			<Option value="5"'+ (val == '5' ? ' selected="selected"' : '') + '>问题订单</Option>\
			<Option value="10"'+ (val == '10' ? ' selected="selected"' : '') + '>退款成功</Option>\
			<Option value="11"'+ (val == '11' ? ' selected="selected"' : '') + '>退款失败</Option>\
			</Select>'
        return str;
    },
    b03: function (arr1, arr2) {
        //arr2					订单商品信息
        //arr1					本地商品表的商品信息（已合并）
        arr2.shift()
        let html = ""
        if (arr2.length == arr1.length) {
            for (let i = 0; i < arr1.length; i++) {
                html += '\
				<table class="table table-bordered table-hover">\
				<tr>\
					<td rowspan="2" class="w100">\
						<a target="_blank" href="'+ arr2[i].pic.replace("100x100", "0x0") + '"><img class="border" height="100" src="' + arr2[i].pic.replace("http://", "https://") + '" title="点击预览"></a>\
					</td>\
					<td>【'+ (i + 1) + '/' + (arr2.length) + '】 <a href="' + arr2[i].fromURL + '" target="_blank">' + arr2[i].name + '</a></td>\
					<td class="w-50">'+ this.b16(arr1[i]) + this.b17(arr1[i]) + '</td>\
				</tr>\
				<tr>\
					<td>\
						编码:'+ arr2[i].proid + '&nbsp;&nbsp;数量:' + arr2[i].Amount + '（' + arr2[i].Unit + '）&nbsp;&nbsp;价格:' + arr2[i].RealPrice + '&nbsp;&nbsp;属性:' + arr2[i].AttributeCart + '&nbsp;&nbsp;产品备注:' + arr2[i].Remark + '\
					</td>\
					 <td>'+ this.b18(arr1[i]) + '</td>\
				</tr>\
				</table>'
            }
        }
        else {
            alert("商品详情丢失。")
        }
        return html
    },
    b04: function (arr) {
        let html = "", msg = "", mystr = "", tostr = "", ismsg = false
        for (let i = 1; i < arr.length; i++) {
            if (this.obj.username.toLowerCase() == arr[i].receiver.toLowerCase()) {
                mystr = '\
        <td>\
        <span '+ (arr[i].receiverRead == 1 ? 'class="hasread" title="当前【已读】，点击设置【未读】" onClick="fun.c08(0,' + arr[i].fromid + ',$(this))"' : 'class="inb-smcheck" title="当前【未读】，点击设置【已读】" onClick="fun.c08(1,' + arr[i].fromid + ',$(this))"') + '></span>\
        </td>\
        <td>\
        <span '+ (arr[i].receiverMark == 1 ? 'class="hasmarked" title="已标记"' : 'class="inb-smmark" title="未标记"') + '></span>\
        </td>\
        <td>'+ (arr[i].receiverMark == 1 ? '回收站' : '正常') + '</td>\
        <td>'+ arr[i].receiver + '</td>'
                tostr = '\
        <td>\
        <span '+ (arr[i].senderRead == 1 ? 'class="hasread" title="他【已读】"' : 'class="inb-smcheck" title="他【未读】"') + ' style="cursor: default;"></span>\
        </td>\
        <td>\
        <span '+ (arr[i].senderMark == 1 ? ' class="hasmarked" title="他【已标记】"' : 'class="inb-smmark" title="他【未标记】') + '" style="cursor: default;"></span>\
        </td>\
        <td>'+ (arr[i].senderStatus == 1 ? '回收站' : '正常') + '</td>\
        <td>'+ arr[i].Sender + '</td>'
            }
            else if (this.obj.username.toLowerCase() == arr[i].Sender.toLowerCase()) {
                tostr = '\
        <td><span '+ (arr[i].receiverRead == 1 ? 'class="hasread" title="他【已读】"' : 'class="inb-smcheck" title="他【未读】"') + ' style="cursor: default;"></span></td>\
        <td><span '+ (arr[i].receiverMark == 1 ? 'class="hasmarked" title="他【已标记】"' : 'class="inb-smmark" title="他【未标记】"') + ' style="cursor: default;"></span></td>\
        <td>'+ (arr[i].receiverMark == 1 ? '回收站' : '正常') + '</td>\
        <td>'+ arr[i].receiver + '</td>'
                mystr = '\
        <td><span '+ (arr[i].senderRead == 1 ? 'class="hasread" title="已读" onClick="fun.c08(0,' + arr[i].fromid + ',$(this))"' : 'class="inb-smcheck" title="未读"  onClick="fun.c08(1,' + arr[i].fromid + ',$(this))"') + '></span></td>\
        <td><span '+ (arr[i].senderMark == 1 ? ' class="hasmarked" title="已标记"' : 'class="inb-smmark" title="未标记') + '"></span></td>\
        <td>'+ (arr[i].senderStatus == 1 ? '回收站' : '正常') + '</td>\
        <td>'+ arr[i].Sender + '</td>'
            } else { alert("没有第三种可能"); }
            /////////////////////////////////////////////////////////
            if (arr[i].name.substr(0, 3) == "PO#") { ismsg = true; }
            html += '\
      <tr>\
        <td>'+ this.b05(arr[i].msgtype) + '</td>\
        <td class="left">\
					<img src="/'+ o.path + 'admin/img/Announce.gif" align="absmiddle">\
					<a href="javascript:" onclick="Tool.main(\'js02/'+ arr[i].fromid + '\')">' + arr[i].name + '</a>\
					【'+ arr[i].msgreplycount + '】\
				</td>\
        '+ mystr + tostr + '\
        <td>'+ Tool.js_date_time2(arr[i].Sendtime) + '</td>\
      </tr>'
        }
        msg = '\
		<tr>\
      <td class="right">发送站内信：</td>\
      <td colspan="10" class="left"><textarea id="content" class="form-control" rows="5" placeholder="温馨提示：请用英文填写所有内容，不要在此处留下联系方式(电话、电子邮件、网址等)。敦煌网将对此内容进行监控， 违反者将受到惩罚。"></textarea><INPUT id="input_file_molding_1" type="file"><INPUT id="input_file_molding_2" type="file"><INPUT id="input_file_molding_3" type="file"></td>\
    </tr>\
    <tr><td></td><td colspan="10" class="left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c01()">发送</button></td></tr>'
        return '\
    <header class="panel-heading">相关站内信</header>\
      <table class="table table-bordered table-hover">\
			<thead class="table-light center">\
          <tr>\
            <th>类型</th>\
            <th class="left">主题的标题</th>\
            <th colspan="3">我的状态</th>\
            <th>我</th>\
            <th colspan="3">他的状态</th>\
            <th>他</th>\
            <th>最后回复时间</th>\
          </tr>\
        </thead>\
        <tbody class="center">'+ html + (ismsg ? "" : msg) + '</tbody>\
      </table>'
    },
    b05: function (id) {
        let name = ""
        switch (id) {
            case "001": name = "买卖家消息-询盘"; break;
            case "002": name = "买卖家消息-订单"; break;
            case "003": name = "买卖家消息-其它"; break;
            case "004": name = "系统消息-订单"; break;
            case "005": name = "系统消息-产品"; break;
            case "006": name = "系统消息-付款/退款"; break;
            case "007": name = "系统消息-促销"; break;
            case "008": name = "系统消息-账户"; break;
            case "009": name = "系统消息-其它"; break;
            case "010": name = "平台公告-活动宣传"; break;
            case "011": name = "平台公告-政策通知"; break;
            case "012": name = "平台公告-商品营销"; break;
            case "013": name = "平台公告-其它"; break;
            default: name = "未知：" + id; break;
        }
        return name
    },
    b06: function (id) {
        let str = ""
        if (id != "") {
            let arr = id.split("/")
            for (let i = 0; i < arr.length; i++) {
                str += '\
        <tr class="table-light">\
          <th class="right w100">【'+ (i + 1) + '】链接：</td>\
          <th>\
            <a href="http://trade.aliexpress.com/order_detail.htm?orderId='+ arr[i] + '" target="_blank">http://trade.aliexpress.com/order_detail.htm?orderId=' + arr[i] + '</a></th>\
        </tr>\
        <tr>\
          <td class="right">链接内容：</td><td id="iframe'+ arr[i] + '"><button type="button" class="btn btn-outline-secondary" onclick="fun.c19($(this),\'' + arr[i] + '\')">显示内容</button></td>\
        </tr>'
            }
        }
        return '\
    <header class="panel-heading">采购来源</header>\
    <div class="p-2">\
      <table class="table table-bordered table-hover align-middle"><tbody>'+ str + '</tbody><table>\
    </div>'
    },
    b07: function (arr) {
        let str = "", thispage = 0;
        if (obj.arr[8] == "lock") {
            str = '<a href="javascript:" onclick="Tool.main(\'' + obj.arr[3] + '/' + obj.arr[4] + '/' + obj.arr[5] + '/' + obj.arr[6] + '/' + obj.arr[7] + '\');" class="button">解除锁定</a>';
        }
        else {
            if (arr.count != 1) {
                str = '（' + obj.arr[7] + '/' + arr.count + '）'
                thispage = obj.arr[7]
                if (thispage > 1) {
                    str += '<button type="button" class="btn btn-outline-secondary" onclick="main.open(7,' + (thispage - 1) + ')">上一条</button>'
                }
                if (thispage < arr.count) {
                    str += '<button type="button" class="btn btn-outline-secondary" onclick="Tool.open(7,' + (thispage + 1) + ')">下一条</button>';
                }
                let arr2 = [thispage, this.obj.orderid, "lock"];
                str += '<button type="button" class="btn btn-outline-secondary" onclick="Tool.main(\'/' + arr2.join("/") + '\');">锁定该订单</button>';
            }
        }
        return '\
    <header class="panel-heading">订单信息\
		<table class="float-end">\
    <tbody>\
      <tr>\
        <td>\
          <Select onchange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
            <Option value="-_-20">订单状态</Option>\
            <Option value="111000" '+ (obj.arr[5] == "111000" ? 'selected="selected"' : '') + '>订单取消</Option>\
            <Option value="101003" '+ (obj.arr[5] == "101003" ? 'selected="selected"' : '') + '>(' + arr.statusNum[0] + ')等待买家付款</Option>\
            <Option value="102001" '+ (obj.arr[5] == "102001" ? 'selected="selected"' : '') + '>(' + arr.statusNum[1] + ')买家已付款，等待平台确认</Option>\
            <Option value="103001" '+ (obj.arr[5] == "103001" ? 'selected="selected"' : '') + '>(' + arr.statusNum[2] + ')等待您发货</Option>\
            <Option value="105001" '+ (obj.arr[5] == "105001" ? 'selected="selected"' : '') + '>(' + arr.statusNum[3] + ')买家退款中，等待协商结果</Option>\
            <Option value="105002" '+ (obj.arr[5] == "105002" ? 'selected="selected"' : '') + '>(' + arr.statusNum[4] + ')退款协议已达成</Option>\
            <Option value="105003" '+ (obj.arr[5] == "105003" ? 'selected="selected"' : '') + '>(' + arr.statusNum[5] + ')部分退款后，等待发货</Option>\
            <Option value="105004" '+ (obj.arr[5] == "105004" ? 'selected="selected"' : '') + '>(' + arr.statusNum[6] + ')买家取消退款申请</Option>\
            <Option value="103002" '+ (obj.arr[5] == "103002" ? 'selected="selected"' : '') + '>(' + arr.statusNum[7] + ')已部分发货</Option>\
            <Option value="101009" '+ (obj.arr[5] == "101009" ? 'selected="selected"' : '') + '>(' + arr.statusNum[8] + ')等待买家确认收货</Option>\
            <Option value="106001" '+ (obj.arr[5] == "106001" ? 'selected="selected"' : '') + '>(' + arr.statusNum[9] + ')退款/退货协商中，等待协议达成</Option>\
            <Option value="106002" '+ (obj.arr[5] == "106002" ? 'selected="selected"' : '') + '>(' + arr.statusNum[10] + ')买家投诉到平台</Option>\
            <Option value="106003" '+ (obj.arr[5] == "106003" ? 'selected="selected"' : '') + '>(' + arr.statusNum[11] + ')协议已达成，执行中</Option>\
            <Option value="102006" '+ (obj.arr[5] == "102006" ? 'selected="selected"' : '') + '>(' + arr.statusNum[12] + ')人工确认收货</Option>\
            <Option value="102007" '+ (obj.arr[5] == "102007" ? 'selected="selected"' : '') + '>(' + arr.statusNum[13] + ')超过预定期限，自动确认收货</Option>\
            <Option value="102111" '+ (obj.arr[5] == "102111" ? 'selected="selected"' : '') + '>交易成功</Option>\
            <Option value="111111" '+ (obj.arr[5] == "111111" ? 'selected="selected"' : '') + '>交易关闭</Option>\
            <Option value="1" '+ (obj.arr[5] == "1" ? 'selected="selected"' : '') + '>(' + arr.statusNum[14] + ')急需发货【48小时内】</Option>\
          </Select>\
        </td>\
        <td>\
          <Select onchange="Tool.open(6,this.options[this.selectedIndex].value)" class="form-select">\
          <Option value="-_-20">采购状态</Option>\
          <option value="6" '+ (obj.arr[6] == '6' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[0] + ')无需采购</Option>\
          <Option value="0" '+ (obj.arr[6] == '0' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[1] + ')等待采购</Option>\
          <Option value="4" '+ (obj.arr[6] == '4' ? 'selected="selected"' : '') + '>取消</Option>\
          <Option value="2" '+ (obj.arr[6] == '2' ? 'selected="selected"' : '') + '>已付款</Option>\
          <Option value="12" '+ (obj.arr[6] == '12' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[2] + ')非正常采购</Option>\
          <Option value="5" '+ (obj.arr[6] == '5' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[3] + ')问题订单</Option>\
          <Option value="10" '+ (obj.arr[6] == '10' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[4] + ')退款成功</Option>\
          <Option value="11" '+ (obj.arr[6] == '11' ? 'selected="selected"' : '') + '>(' + arr.PurchaseStatusNum[5] + ')退款失败</Option>\
          <Option value="3" '+ (obj.arr[6] == '3' ? ' selected="selected"' : '') + '>自动收款(0-6天)</Option>\
          </Select>\
        </td>\
        <td>'+ str + '</td>\
      </tr>\
    </tbody>\
    </table>\
		</header>'
    },
    b08: function (arr) {
        let str = '', ExpressNumber = ""
        for (let i = 1; i < arr.length; i++) {
            ExpressNumber = arr[i].ExpressNumber.substr(1, arr[i].ExpressNumber.length - 2)
            str += '\
      <tr>\
        <td class="right">发货物流：</td>\
        <td>'+ arr[i].Express.substr(1, arr[i].Express.length - 2) + '</td>\
			</tr>\
			<tr>\
				<td class="right">运单号：</td>\
				<td>\
					'+ ExpressNumber + '\
					<a href="http://global.cainiao.com/detail.htm?mailNoList='+ ExpressNumber.replace(/\//g, "%2C") + '" target="_blank" title="用【菜鸟】查询物流">\
						<img src="/'+ o.path + '/admin/img/logdeliver/cainiao.png" height="16"/>\
					</a>\
					<a href="https://t.17track.net/zh-cn#nums='+ ExpressNumber.replace(/\//g, ",") + '" target="_blank" title="用【17TRACK】查询物流">\
						<img src="/'+ o.path + '/admin/img/logdeliver/17track.ico" height="16"/>\
					</a>\
					<a href="https://www.sypost.net/search?orderNo='+ ExpressNumber.replace(/\//g, "%2C") + '" target="_blank" title="用【顺友】查询物流">\
						<img src="/'+ o.path + '/admin/img/logdeliver/sypost.png" height="16"/>\
					</a>\
					<a href="https://www.1tracking.net/zh-CN/detail?nums='+ ExpressNumber.replace(/\//g, "%2C") + '" target="_blank" title="用【1Tracking】查询物流">\
						<img src="/'+ o.path + '/admin/img/logdeliver/1tracking.ico" height="16"/>\
					</a>\
			  </td>\
			</tr>\
			<tr><td class="right">发货日期：</td><td>'+ this.b14(false, arr[i].DeliverDate) + '</td></tr>\
			<tr><td class="right">物流状态：</td><td>'+ Tool.queryState(arr[i].queryState) + '</td></tr>'
        }
        if (arr.length == 1) {
            str += '<tr><td>&nbsp;</td><td class="p-0"><button type="button" class="btn btn-outline-secondary" onclick="Tool.FakeDelivery.a01($(this),fun.obj.username,fun.obj.password,fun.obj.cookies,fun.obj.PurchaseRemark,fun.obj.orderid,fun.obj.orderid32,fun.obj.fromid)">*假运单号发货</button></td></tr>'
        }
        else {
            str += '<tr><td>&nbsp;</td><td class="p-0"><button type="button" class="btn btn-outline-secondary" onclick="Tool.Tracking.a01(fun.obj)">*同步运单号到敦煌网</button></td></tr>'
        }
        return str
    },
    b10: function (id) {
        let name = ""
        switch (id) {
            case 0: name = "正常"; break;
            case 1: name = "已下架"; break;
            case 2: name = "库存不足"; break;
            case 3: name = "首次404错误"; break;
            case 4: name = "首次正常"; break;
            case 5: name = "二次【已下架】"; break;
            case 6: name = "二次【库存不足】"; break;
            case 7: name = "销量&lt;2"; break;
            case 8: name = "评分&lt;4"; break;
            case 9: name = "首图重复"; break;
            case 10: name = "发布类目不对"; break;
            case 11: name = "图片不能为空"; break;
            case 12: name = "有速卖通网址"; break;
            case 13: name = "特别类目限制"; break;
            case 14: name = "错误为空"; break;
            case 15: name = "采集错误"; break;
            case 16: name = "属性错误"; break;
            case 17: name = "单词堆积"; break;
            case 18: name = "替换后改正常"; break;
            case 19: name = "首次404错误"; break;
            case 20: name = "内容超长"; break;
            case 21: name = "没有绑定分类"; break;
            case 22: name = "最低价格限制"; break;
            case 23: name = "标题不能包含"; break;
            case 24: name = "必须至少包含"; break;
            case 25: name = "sku数量错误"; break;
            case 26: name = "关键词错误"; break;
            case 27: name = "提交有:undefined"; break;
            case 28: name = "数据本身有问题"; break;
            case 29: name = "两张细节图"; break;
            case 30: name = "展示内容不一致"; break;
            case 31: name = "无当前类目发布权限"; break;
            case 32: name = "产品组ID为空"; break;
            case 33: name = "重设物流模板"; break;
            case 34: name = "评分低"; break;
            case 35: name = "销量低"; break;
            case 36: name = "错误数据"; break;
            case 37: name = "有中文"; break;
            case 38: name = "尺码模板必填"; break;
            case 51: name = "品牌商投诉"; break;
            case 52: name = "手动审核不通过"; break;
            case 52: name = "禁卖品牌"; break;
            case 54: name = "重复商品"; break;
            case 55: name = "标题重复"; break;
            case 56: name = "首图重复"; break;
            case 57: name = "审核未通过"; break;
            case 58: name = "二次【404错误】"; break;
            case 59: name = "三次【已下架】"; break;
            case 60: name = "三次【库存不足】"; break;
            case 61: name = "二次【销量&lt;2】"; break;
            case 62: name = "二次【评分&lt;4】"; break;
            case 63: name = "最低运费&gt;$5"; break;
            default: name = "未知：" + id; break;
        }
        return name
    },
    b11: function (HistoryInfo) {
        //[
        //  {
        //    "price": "1.49",
        //    "Discount": "47",
        //    "Review": "4.9",
        //    "SaleNum": "89",
        //    "ReviewsNum": "38",
        //    "time": "2021/12/08 10:06:23"
        //  },
        //  {
        //    "price": "1.49",
        //    "Discount": "47",
        //    "Review": "4.9",
        //    "SaleNum": "75",
        //    "ReviewsNum": "39",
        //    "time": "2021/12/23 17:53:46"
        //  },
        //  {
        //    "price": "1.49",
        //    "Discount": "47",
        //    "Review": "4.9",
        //    "SaleNum": "61",
        //    "ReviewsNum": "30",
        //    "time": "2022/01/29 18:57:30"
        //  }
        //]
        let minDiscount = 0, val
        if (HistoryInfo) {
            if (HistoryInfo.length == 3) {
                minDiscount = parseInt(HistoryInfo[0].Discount)
                for (let i = 0; i < HistoryInfo.length; i++) {
                    val = parseInt(HistoryInfo[i].Discount)

                    if (val < minDiscount) { minDiscount = val; }
                }
            }
        }
        return minDiscount;
    },
    b12: function () {
        let str = "";
        if (obj.arr[5] != "-_-20") {
            let num2 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 2) / 1000);//2天
            if (obj.arr[5] == 1) { str = " and @.deliveryDeadline<=" + num2 + " and @.status='103001'" }
            else { str = " and @.status='" + obj.arr[5] + "'"; }
        }
        //////////////////////////////////////////
        if (obj.arr[6] != "-_-20") {
            let num6 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 6) / 1000);//6天
            let num_6 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 6) / 1000);//-6天
            if (obj.arr[6] == 3) { str += " and @.PurchaseWaitingDelivery<=" + num6 + " and @.PurchaseWaitingDelivery&gt;-" + num_6 + " and @.isApplyMoney=0" }
            else { str += " and @.PurchaseStatus=" + obj.arr[6]; }
        }
        //////////////////////////////////////////
        if (obj.arr[8] == "lock") { str = " and @.orderid='" + obj.arr[4] + "'"; }
        else { if (obj.arr[5] == "-_-20" && obj.arr[6] == "-_-20") { str = " and @.orderid='" + obj.arr[4] + "'"; } }
        if (str != "") { str = str.substr(4); }
        return str;
    },
    b13: function (hide) {
        let name = ""
        switch (hide) {
            case 0: name = "正常"; break;
            case 1: name = "已禁用"; break;
            case 2: name = "限物流"; break;
            case 3: name = "受限"; break;
            default: name = "未知：" + id; break;
        }
        return name
    },
    b14: function (isbool, t1) {
        let str = ""
        if (t1 != 0) {
            str = Tool.js_date_time2(t1, "-") + "（"
            if (isbool) { str += Tool.datedifference(t1 * 1000, false) + "天）"; }
            else { str += Tool.datedifference(false, t1 * 1000) + "天）"; }
        }
        return str;
    },
    b15: function (MoneyTotal, PurchaseCost) {
        let Profit = 0
        if (PurchaseCost == 0) { Profit = ""; }
        else { Profit = ((MoneyTotal - PurchaseCost) / PurchaseCost * 100).toFixed(2) + "%"; }
        return Profit
    },
    b16: function (arr3) {
        let html3 = "", minDiscount = this.b11(arr3.HistoryInfo), minprice, maxprice
        if (arr3.addtime) {
            minprice = arr3.minprice * (1 - minDiscount * 0.01);
            maxprice = arr3.maxprice * (1 - minDiscount * 0.01);
            arr3.ratio_Discount = Math.round((1 - (1.5 / arr3.ratio_Discount)) * 100)
            //设置价格=(成本+20%税费手续费)*价格倍数 
            //折后价格=(成本+20%税费手续费)*30%利润
            html3 = '该商品已上传 ' + Tool.datedifference(false, arr3.addtime * 1000) + ' 天；\
      已更新 '+ Tool.datedifference(false, arr3.uptime * 1000) + ' 天；\
      在 '+ Tool.datedifference(arr3.downtime * 1000, false) + ' 天后下架；<br/>\
      历史最小折扣 <span style="color:#ff4747;background:#fff1f1;padding: 2px 5px;">-'+ minDiscount + '%</span>；&nbsp;&nbsp;使用 ' + arr3.ratio + ' 倍价格后为【$' + (arr3.maxprice == arr3.minprice ? ((minprice + (minprice * 0.2)) * arr3.ratio).toFixed(2) :
                    ((minprice + (minprice * 0.2)) * arr3.ratio).toFixed(2) + '-' + ((maxprice + (maxprice * 0.2)) * arr3.ratio).toFixed(2)) + '】；<br/>\
      全店打折后为【PC<span style="color:#ff4747;background:#fff1f1;padding: 2px 5px;">-'+ (arr3.ratio_Discount - 1) + '%</span>$' + (arr3.maxprice == arr3.minprice ? ((minprice + (minprice * 0.2)) * arr3.ratio * (1 - (arr3.ratio_Discount - 1) * 0.01)).toFixed(2) :
                    ((minprice + (minprice * 0.2)) * arr3.ratio * (1 - (arr3.ratio_Discount - 1) * 0.01)).toFixed(2) + '-' + ((maxprice + (maxprice * 0.2)) * arr3.ratio * (1 - (arr3.ratio_Discount - 1) * 0.01)).toFixed(2)) + ' 】【APP<span style="color:#ff4747;background:#fff1f1;padding: 2px 5px;">-' + arr3.ratio_Discount + '%</span>$' + (arr3.maxprice == arr3.minprice ? ((minprice + (minprice * 0.2)) * arr3.ratio * (1 - arr3.ratio_Discount * 0.01)).toFixed(2) :
                        ((minprice + (minprice * 0.2)) * arr3.ratio * (1 - arr3.ratio_Discount * 0.01)).toFixed(2) + '-' + ((maxprice + (maxprice * 0.2)) * arr3.ratio * (1 - arr3.ratio_Discount * 0.01)).toFixed(2)) + ' 】；<br/>';
        }
        else {
            html3 = '该商品在【DH已上传商品表】中【已不存在】；&nbsp;&nbsp;';
        }
        return html3
    },
    b17: function (arr3) {
        let html
        if (arr3.maxprice) {
            html = '当前采购价格:<b>$' + (arr3.maxprice == arr3.minprice ? (arr3.minprice * (1 - arr3.Discount * 0.01)).toFixed(2) : (arr3.minprice * (1 - arr3.Discount * 0.01)).toFixed(2) + '-' + (arr3.maxprice * (1 - arr3.Discount * 0.01)).toFixed(2)) + '</b> <s style="color:#999;">$' + (arr3.maxprice == arr3.minprice ? arr3.minprice : arr3.minprice + '-' + arr3.maxprice) + '</s> <span style="color:#ff4747;background:#fff1f1;padding: 2px 5px;">-' + arr3.Discount + '%</span> (' + (arr3.lotNum == 1 ? arr3.unit : arr3.unit + '/lot') + ')；<br/>\
			状态:'+ this.b10(arr3.hide) + '；&nbsp;&nbsp;类目:' + arr3.typename + '；&nbsp;&nbsp;\
			<a href="https://www.aliexpress.com/item/'+ arr3.fromid + '.html" target="_blank" class="detail-button">来源</a> |\
			<a href="https://www.aliexpress.com/store/'+ arr3.shopid + '" target="_blank" class="detail-button">来源店铺</a> |\
			<a class="detail-button" href="javascript:" onclick="fun.f01()">*询价</a>'
        }
        else { html = '该商品在【SMT商品表】中【已不存在】；'; }
        return html;
    },
    b18: function (arr3) {
        let html = "";
        if (arr3.HistoryInfo) {
            for (let j = 0; j < arr3.HistoryInfo.length; j++) {
                html += '【时间:' + Tool.userDate13(arr3.HistoryInfo[j].time) + '&nbsp;&nbsp;价格:$' + arr3.HistoryInfo[j].price + '&nbsp;&nbsp;折扣:-' + arr3.HistoryInfo[j].Discount + '%&nbsp;&nbsp;评分:' + arr3.HistoryInfo[j].Review + '&nbsp;&nbsp;销量:' + arr3.HistoryInfo[j].SaleNum + '】<br/>'
            }
        }
        return html;
    },
    c08: function (isRead, msgIds, This) {
        This = This.parent();
        This.html("<img src='/" + o.path + "admin/img/loading-16x16.gif' height='12'>");
        this.obj.msg = { isRead: isRead, msgIds: msgIds, This: This };
        Tool.message_status(this, this.c09);
    },
    c09: function () {
        if (this.obj.msg.isRead == 0) {
            this.obj.msg.This.html('<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.c08(1,' + this.obj.msg.msgIds + ',$(this))"></span>');
        }
        else {
            this.obj.msg.This.html('<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.c08(0,' + this.obj.msg.msgIds + ',$(this))"></span>');
        }
    },
    c12: function (This, id) { this.obj.o3[id] = This.val(); },
    c19: function (This, orderId) {
        This.remove();
        $("#iframe" + orderId).html('<iframe src="http://trade.aliexpress.com/order_detail.htm?orderId=' + orderId + '" width="100%" height="700" frameborder="0"scrolling="yes" style="overflow: visible;"></iframe>')
    },
    c20: function (This) {
        let html = "\"\"<r: tag=\"sql\">update @.seller set @.gathertime='" + This.val() + "' where @.fromid=" + this.obj.fromid + "</r:>";
        Tool.ajax.a01(html, 1, this.c21, this);
    },
    c21: function (t) {
        if (t == "") {
            alert("修改成功，采集订单后，可看到结果！")
        }
        else { alert("出错"); }
    },
    c28: function () {
        let txt = '"ok"<r: db="sqlite.dhgate">update @.order set @.PurchaseProcessingTime=' + Tool.gettime("") + ' where @.orderid=\'' + this.obj.orderid + '\'</r:>'
        Tool.ajax.a01(txt, 1, Tool.reload);
    },
    j01: function (This, L, V) {
        let val = Tool.Trim(This.val()), html = '';
        if (L == 'PurchaseCost' || L == 'PurchaseRefund') { val = eval(val); }
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            if (L == "PurchaseStatus") {
                let oo = This.find("option:selected");
                This.find("option").attr("selected", false);
                oo.attr("selected", true);
                html = This.html();//先选中，再取代码
                This.html("<option>加载加...</option>");
            }
            else { html = val; This.val("加载加..."); }
            let txt = "\"\"<r: db=\"sqlite.dhgate\">update @.order set @." + L + "='" + val + "' where @.orderid='" + this.obj.orderid + "'</r:>"
            Tool.ajax.a01(txt, 1, this.j02, this, [This, html]);
        }
    },
    j02: function (t, This) {
        if (t == "") {
            This[0].attr("disabled", false);
            if ((" " + This[1]).indexOf('</option>') == -1) { This[0].val(This[1]); }
            else { This[0].html(This[1]); }
        } else { alert("出错：" + t) }
    },

}
fun.a01();

/*
  c01:function(){F1.a01(this,this.c02);},
  c02:function()
  {
        let formData = new FormData(),This=this;//构造空对象，下面用append 方法赋值。 
        let bool=false,img={o1:$("#input_file_molding_1"),o2:$("#input_file_molding_2"),o3:$("#input_file_molding_3")}
        this.obj.des=($("#content").val()).replace(/'/ig,"''")
        $("#message").html("正在发送...");
        if(img.o1.val()!=""){formData.append("file",img.o1[0].files[0]);bool=true;}
        if(img.o2.val()!=""){formData.append("file",img.o2[0].files[0]);bool=true;}
        if(img.o3.val()!=""){formData.append("file",img.o3[0].files[0]);bool=true;}
        this.obj.img=[];this.obj.imgI=0;
        if(bool)
        {
            $.ajax({url:"exe/upload/"+encodeURIComponent(this.cacheFolder)+".html?"+Math.random(),type:'POST',data:formData,processData:false,contentType:false,success:function(Str){
             eval("fun.obj.img="+Str);This.c03();
            },error:function(Str){alert("失败:" + JSON.stringify(Str));}});
        }
        else{this.c05();}
  },
  c03:function()
    {
        if(this.obj.imgI<this.obj.img.length)
        {
            let html='<.WebClientPost(http://api.dhgate.com/dop/router?method=dh.album.img.upload&v=2.1&funType=albu&imgName='+(new Date).getTime()+'.jpg&imgBase64=Fun(imgToBase64('+this.obj.img[this.obj.imgI]+'))&timestamp='+(new Date).getTime()+'&access_token='+this.token+')/>'
            Tool.ajax.a01(html,1,this.c04,this); 
        }else{this.c05();}
  },
  c04:function(r){eval("let img="+r);this.obj.img[this.obj.imgI]=img.imgUrl;this.obj.imgI++;this.c03();},
  c05:function()
  {
        let URL = "http://api.dhgate.com/dop/router?access_token="+this.token+"&method=dh.message.send&timestamp=" + new Date().getTime() + "&v=2.0&sendMsgType=2&content="+this.obj.des+"&msgTitle=PO#"+this.obj.orderid+"&param="+this.obj.orderid+"&reciverId="+this.obj.buyerId+"&attUrls="+this.obj.img.join(",")
    alert(URL)
        //Tool.ajax.a01("<.WebClientPost("+escape(URL)+")/>",1,this.c06,this); 
  },
  c06:function(txt)
  {
        if(txt.indexOf(":\"OK\",")>0)
        {
            this.obj.des=[{
                content:this.obj.des.replace(/(\n)|(\t)/ig,"<br/>"),
                createTime:Tool.js_date_time(new Date().getTime()),
                senderNickName:this.obj.username.replace(/'/ig,"''"),
                senderId:"",
                receiverNickName:this.obj.username,
                receiverId:this.obj.buyerId,
                attUrls:this.obj.img.join(","),
                attNames:this.obj.img.join(",")
            }]
            eval("let obj2="+txt)
            let insert="insert into @.message(@.fromid,@.from,@.des,@.SendTime,@.name,@.msgType,@.fromuser,@.sender,@.senderRead,@.senderMark,@.senderStatus,@.receiverRead,@.receiverMark,@.receiverStatus,@.receiver,@.recieverId,@.msgReplyCount,@.param)values("+obj2.msgId+",'dhgate','"+JSON.stringify(this.obj.des).replace(/'/ig,"''")+"',now(),'PO#"+this.obj.orderid+"','002','"+this.obj.username.replace(/'/ig,"''")+"','"+this.obj.username.replace(/'/ig,"''")+"',1,0,0,0,0,0,'"+this.obj.username+"','"+this.obj.buyerId+"',0,'"+this.obj.orderid+"')"
            let html="<r: tag=\"sql\">"+insert+"</r:>"
            Tool.ajax.a01(html,1,this.c07,this); 
        }else{alert("回复站内信失败，请与管理员联系."+txt);}
  },
  c07:function(t)
    {
        if(t=="")
        {alert("操作成功");window.location.reload();}
        else
        {alert("回复站内信失败，请与管理员联系."+t);}
  },
  

  */