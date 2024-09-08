Object.assign(Tool, {
    //更新或添加订单信息
    updateOrInsert_orders: {

        a01: function (DomesticWaybill, order, site, next, This, t) {
            /*
                下面的还不知道有什么用，所以没有添加。
                "status_ext": 2,
                "logistics_status": 1,
                "list_type": 7,
                "cancel_reason_ext": 0,
                "dropshipping_info": {
                    "enabled": 0,
                    "name": "",
                    "phone_number": ""
                },
                "first_item_count": 10,
                "first_item_is_wholesale": false,
                "first_item_model": "Colorful,50g",
                "first_item_name": "Manik longgar akrilik longgar manik gelang manik aksesori rantai telefon bimbit",
                "first_item_return": false,
                "instant_buyercancel_toship": false,
                "is_buyercancel_toship": false,
                "logid": 1,
                "logistics_channel": 28016,
                "logistics_extra_data": "{\"discount_shipping_fees\":{\"seller\":0,\"shopee\":500000},\"discounted_shipping_fees\":{\"seller\":723000,\"shopee\":223000},\"extra_flag\":0,\"sls_info\":{\"last_mile_tracking_number\":\"SPXMY045734147336\"}}",
                "logistics_flag": 536870920,
                "pickup_attempts": 0,
                "rate_by_date": 0,
                "ratecancel_by_date": 0,
                "return_request_due_date": 0,
                "seller_address": {
                    "address_id": 0,
                    "user_id": 0,
                    "name": "Logistics Sorting Hub",
                    "phone": "8602160562952",
                    "country": "CN",
                    "state": "GuangDong",
                    "city": "Dongguan",
                    "address": "Logistics Sorting Hub, Xi Niu Yi Street, Maiyuan Village, Changping Town, Dongguan City",
                    "status": 1,
                    "ctime": 1667643730,
                    "mtime": 1715732560,
                    "zip_code": "523000",
                    "def_time": 0,
                    "full_address": "",
                    "district": "Changping",
                    "town": "",
                    "logistics_status": 0,
                    "icno": "",
                    "ext_info": {
                        "geo_info": "{\"region\":{\"latitude\":26.8406699,\"longitude\":112.77734},\"user_verified\":false,\"user_adjusted\":false,\"geoinfo_confirm\":false}"
                    }
                },
                "seller_address_id": 0,
                "seller_due_date": 0,
                "tax_amount": "0.00",
                "used_voucher": 0,
                "wallet_discount": "0.00",
                "fulfillment_channel_id": 28016,
                "fulfillment_carrier_name": "Standard Delivery",
                "fulfillment_shipping_method": 28016,
                "masking_channel_id": 0,
                "masking_carrier_name": "",
                "checkout_shipping_method": 28016,
                "checkout_carrier_name": "Standard Delivery",
                "checkout_channel_id": 28016,
                "cancellation_end_date": "",
                "coin_used": "0",
                "pay_by_credit_card": false,
                "return_id": 0,
                "express_channel": 0,
                "order_ratable": false,
                "order_unit_migration_toggle": 2,
                "is_tax_exempted": false,
                "shipment_config": true,
                "fulfill_by_shopee": false,
                "preferred_delivery_timeslot": null,
                "is_affiliated_shop_order": false,
                "invoice_data_status": 0,
                "invoice_download_status": null,
                "is_prescription_order": false,
                "prescription_check_status": 0,
                "prescription_images": null
            */
            let arrL = [
                "@.DomesticWaybill",//国内运单号
                "@.seller_income_breakdown",//卖家价格明细
                "@.buyer_payment_breakdown",//买家价格明细
                "@.package_number",//包裹编号---获取国内运单号要用
                "@.tracking_number",//国外运单号
                "@.tracking_info",//国外物流信息
                "@.site",//站点
                "@.shop_id",//店铺ID
                "@.user_id",//用户ID
                "@.order_id",//订单ID
                "@.order_sn",//订单编号
                "@.total_price",//订单总价
                "@.shipping_method",//装运_方法
                "@.shipping_address",//发货地址
                "@.shipping_fee",//运费
                "@.actual_carrier",//物流公司
                "@.order_type",//订单类型
                "@.payment_method",//付款方式
                "@.payment_method_name",//付款方式名称
                "@.remark",//买家备注
                "@.status",//状态
                "@.create_time",//创建时间
                "@.delivery_time",//交货_时间
                "@.complete_time",//完成时间
                "@.pickup_time",//拾取时间
                "@.shipping_confirm_time",//发货_确认_时间
                "@.arrange_pickup_by_date",//安排提货日期
                "@.auto_cancel_3pl_ack_date",//订单自动取消的时间---填了发货预报的取消的时间
                "@.auto_cancel_arrange_ship_date",//自动取消安排发货日期---没填发货预报的取消的时间
                "@.buyer_is_rated",//买方报价
                "@.buyer_last_change_address_time",//购买者最后更改地址时间
                "@.buyer_txn_fee",//买方txn费用
                "@.buyer_cancel_reason",//购买者取消原因
                "@.cancel_time",//取消时间
                "@.cancel_userid",//取消用户ID
                "@.coin_offset",//可能是shopee币
                "@.escrow_release_time",//托管释放时间---超过迟发货时间
                "@.pickup_cutoff_time",//拾取截止时间
                "@.shipping_proof",//装运证明
                "@.shipping_proof_status",//发货_发货_状态
                "@.payby_date",//付款日期
                "@.price_before_discount",//价格优惠
                "@.ship_by_date",//发货日期
                "@.voucher_absorbed_by_seller",//是否用了代金券
                "@.voucher_code",//优惠券码
                "@.coins_cash_by_voucher",//优惠金额
                "@.buyer_address_name",//买家地址名称
                "@.buyer_address_phone",//买家地址手机号
                "@.order_items",//订单商品信息
                "@.buyer_user",//买家账号信息
            ]
            let arrR = [
                Tool.rpsql(JSON.stringify(DomesticWaybill)),//国内运单号（如：json）
                Tool.rpsql(JSON.stringify(order.seller_income_breakdown)),//卖家价格明细（如：json）
                Tool.rpsql(JSON.stringify(order.buyer_payment_breakdown)),//买家价格明细（如：json）
                Tool.rpsql(order.package_number),//包裹编号（如：OFG172202595203743）---获取国内运单号要用
                Tool.rpsql(order.tracking_number),//国外运单号（如：MY240967550364Y）
                Tool.rpsql(JSON.stringify(order.tracking_info)),//国外物流信息（如：json）
                "'" + site + "'",//站点（如：my）
                order.orders.shop_id,//店铺ID（如：896010703）
                order.orders.user_id,//用户ID（如：40156834）
                order.orders.order_id,//订单ID（如：172202594288609）
                Tool.rpsql(order.orders.order_sn),//订单编号（如：2406165VNRY0Y1）
                order.orders.total_price,//订单总价（如：25.23）
                order.orders.shipping_method,//装运_方法（如：28016）
                Tool.rpsql(order.orders.shipping_address),//发货地址（如：NO******）
                order.orders.shipping_fee,//运费（如：2.23）
                Tool.rpsql(order.orders.actual_carrier),//物流公司（如：Standard Delivery）
                order.orders.order_type,//订单类型（如：2）
                order.orders.payment_method,//付款方式（如：4）
                Tool.rpsql(order.orders.payment_method_name),//付款方式名称（如：Online Banking）
                Tool.rpsql(order.orders.remark),//买家备注
                order.orders.status,//状态（如：2）
                order.orders.create_time,//创建时间（如：1718503395）
                order.orders.delivery_time,//交货_时间（如：0）
                order.orders.complete_time,//完成时间（如：0）
                order.orders.pickup_time,//拾取时间（如：0）
                order.orders.shipping_confirm_time,//发货_确认_时间（如：1718503456）
                order.orders.arrange_pickup_by_date,//安排提货日期（如：0）
                order.orders.auto_cancel_3pl_ack_date,//订单自动取消的时间（如：1718983800）
                order.orders.auto_cancel_arrange_ship_date,//自动取消安排发货日期（如：1718724600）
                order.orders.buyer_is_rated,//买方报价（如：0）
                order.orders.buyer_last_change_address_time,//购买者最后更改地址时间（如：0）
                order.orders.buyer_txn_fee,//买方txn费用（如：0.00）
                order.orders.buyer_cancel_reason,//购买者取消原因（如：0）
                order.orders.cancel_time,//取消时间（如：0）
                order.orders.cancel_userid,//取消用户ID（如：0）
                order.orders.coin_offset,//可能是shopee币（如：0.00）
                order.orders.escrow_release_time,//等待买家在2024/06/27前点选完成订单（如：1719329400）
                order.orders.pickup_cutoff_time,//拾取截止时间（如：0）
                Tool.rpsql(order.orders.shipping_proof),//装运证明（如：）
                order.orders.shipping_proof_status,//发货_发货_状态（如：0）
                order.orders.payby_date,//付款日期（如：1718524995）
                order.orders.price_before_discount,//价格优惠（如：25.23）
                order.orders.ship_by_date,//发货日期（如：1718724600）
                order.orders.voucher_absorbed_by_seller ? 1 : 0,//是否用了优惠券（如：true）
                Tool.rpsql(order.orders.voucher_code),//优惠券码（如：CHOI06161;FSV-902389432057872）
                order.orders.coins_cash_by_voucher,//优惠金额（如：0.69）
                Tool.rpsql(order.orders.buyer_address_name),//买家地址名称（如：R******P）
                Tool.rpsql(order.orders.buyer_address_phone),//买家地址手机号（如：******35）
                Tool.rpsql(JSON.stringify(order.orders.order_items)),//订单商品信息（如：json）
                Tool.rpsql(JSON.stringify(order.orders.buyer_user)),//买家账号信息（如：json）
            ]
            this.a02(arrL, arrR, site, order.orders.order_id, next, This, t)
        },
        a02: function (arrL, arrR, site, order_id, next, This, t) {
            let insert = "insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")";
            let updateArr = []
            for (let i = 0; i < arrL.length; i++) {
                if (arrL[i] != "@.order_id" && arrL[i] != "@.site") {
                    updateArr.push(arrL[i] + "=" + arrR[i]);
                }
            }
            let update = "update @.table set " + updateArr.join(",") + "  where @.site='" + site + "' and @.order_id=" + order_id
            let data = [{
                action: "sqlite",
                database: "shopee/订单",
                sql: "select count(1) as total from @.table where @.site='" + site + "' and @.order_id=" + order_id,
            }]
            //////////////////////////
            let oo = {
                insert: insert,
                update: update,
                next: next,
                This: This,
                t: t
            }
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            let sql = ""
            if (t[0][0].total == 0) {
                $("#state").html("正在添加商品。。。");
                sql = oo.insert
            }
            else {
                $("#state").html("正在更新商品。。。");
                sql = oo.update
            }
            let data = [{
                action: "sqlite",
                database: "shopee/订单",
                sql: sql,
            }]
            Tool.ajax.a01(data, this.a04, this, oo);
        },
        a04: function (t, oo) {
            if (t[0].length == 0) {
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["出错002", t]);
            }
        },
    },
})