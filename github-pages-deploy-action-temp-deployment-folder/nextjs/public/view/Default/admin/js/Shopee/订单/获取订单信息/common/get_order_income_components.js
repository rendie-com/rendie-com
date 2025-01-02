Object.assign(Tool, {
    //获取订单信息
    get_order_income_components: {
        a01: function (order_id, seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
            ]
            let url = "https://seller.shopee.cn/api/v4/accounting/cbpc/seller_income/income_detail/get_order_income_components?" + arr.join("&")
            let oo = {
                next: next,
                This: This,
                t: t
            }
            this.a02(order_id, url, oo)
        },
        a02: function (order_id, url, oo) {
            let data = {
                "order_id": order_id,
                "components": [2, 3, 4, 5]
            }          
            gg.postFetch(url, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.message == "success") {
                let data = {
                    seller_income_breakdown: t.data.seller_income_breakdown.breakdown,//卖家价格明细
                    buyer_payment_breakdown: t.data.buyer_payment_breakdown.breakdown,//买家价格明细
                }
                Tool.apply(data, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["出错01", t])
            }
        }
    },
})