Object.assign(Tool, {
    //获取订单信息
    get_one_order: {
        a01: function (order_id, seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
                "order_id=" + order_id,
            ]
            let url = "https://seller.shopee.cn/api/v3/order/get_one_order?" + arr.join("&")
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.getFetch(url,"json", this.a02, this, oo);
        },
        a02: function (t, oo) {
            if (t.message == "success") {
                this.a03(t.data, oo);
            }
            else {
                Tool.pre(["出错01", t])
            }
        },
        a03: function (o1, o2) {
            let oo = {
                "@.shop_id": o1.shop_id,//店铺ID
                "@.order_id": o1.order_id,//订单ID（如：172202594288609）
                "@.order_sn": Tool.rpsql(o1.order_sn),//订单编号（如：2406165VNRY0Y1）
                "@.order_items": Tool.rpsql(JSON.stringify(o1.order_items)),//订单商品信息（如：json）
                "@.total_price": o1.total_price,//订单总价（如：25.23）
                "@.shipping_method": o1.shipping_method,//装运_方法（如：28016）
                "@.shipping_address": Tool.rpsql(o1.shipping_address),//发货地址（如：NO******）
                "@.shipping_fee": o1.shipping_fee,//运费（如：2.23）
                "@.actual_carrier": Tool.rpsql(o1.actual_carrier),//物流公司（如：Standard Delivery）
                "@.order_type": o1.order_type,//订单类型（如：2）
                "@.payment_method": o1.payment_method,//付款方式（如：4）
                "@.payment_method_name": Tool.rpsql(o1.payment_method_name),//付款方式名称（如：Online Banking）
                "@.remark": Tool.rpsql(o1.remark),//买家备注
                "@.status": o1.status,//状态（如：2）
                "@.create_time": o1.create_time,//创建时间（如：1718503395）
                "@.delivery_time": o1.delivery_time?o1.delivery_time:0,//交货_时间（如：0）
                "@.complete_time": o1.complete_time,//完成时间（如：0）
                "@.pickup_time": o1.pickup_time,//拾取时间（如：0）
                "@.shipping_confirm_time": o1.shipping_confirm_time,//发货_确认_时间（如：1718503456）
                "@.arrange_pickup_by_date": o1.arrange_pickup_by_date,//安排提货日期（如：0）
                "@.auto_cancel_3pl_ack_date": o1.auto_cancel_3pl_ack_date,//订单自动取消的时间---填了发货预报的取消的时间（如：1718983800）
                "@.auto_cancel_arrange_ship_date": o1.auto_cancel_arrange_ship_date,//自动取消安排发货日期---没填发货预报的取消的时间（如：1718724600）
                "@.buyer_is_rated": o1.buyer_is_rated?o1.buyer_is_rated:0,//买方报价（如：0）
                "@.buyer_last_change_address_time": o1.buyer_last_change_address_time,//购买者最后更改地址时间（如：0）
                "@.buyer_txn_fee": o1.buyer_txn_fee?o1.buyer_txn_fee:0,//买方txn费用（如：0.00）
                "@.buyer_cancel_reason": o1.buyer_cancel_reason,//购买者取消原因（如：0）
                "@.cancel_userid": o1.cancel_time?o1.cancel_time:0,//取消用户ID（如：0）
                "@.escrow_release_time": o1.escrow_release_time,//托管释放时间---超过迟发货时间（如：1719329400）
                "@.pickup_cutoff_time": o1.pickup_cutoff_time,//拾取截止时间（如：0）
                "@.shipping_proof": Tool.rpsql(o1.shipping_proof),//装运证明（如：）
                "@.payby_date": o1.payby_date,//付款日期（如：1718524995）
                "@.price_before_discount": o1.price_before_discount,//价格优惠（如：25.23）
                "@.ship_by_date": o1.ship_by_date,//发货日期（如：1718724600）
                "@.buyer_address_name": Tool.rpsql(o1.buyer_address_name),//买家地址名称（如：R******P）
                "@.buyer_address_phone": Tool.rpsql(o1.buyer_address_phone),//买家地址手机号（如：******35）
                "@.buyer_user": Tool.rpsql(JSON.stringify(o1.buyer_user)),//买家账号信息（如：json）
            }
            Tool.apply(oo, o2.next, o2.This, o2.t)
        },
    },
})
//"@.cancel_time",//取消时间                                这个字段要删除
//"@.user_id",                                             这个字段要删除
//"@.coin_offset",//可能是shopee币                          这个字段要删除
//"@.shipping_proof_status"//发货_发货_状态（如：0）         这个字段要删除
//"@.voucher_absorbed_by_seller",//是否用了代金券           这个字段要删除
//"@.voucher_code",//优惠券码                               这个字段要删除
//"@.coins_cash_by_voucher",//优惠金额                      这个字段要删除