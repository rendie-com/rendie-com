Object.assign(Tool, {
    //国内运单信息
    get_order_fm_code_multi_shop: {
        a01: function (order_id, order_sn, package_number, seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
            ]
            //国内运单信息
            let url = "https://seller.shopee.cn/api/v3/order/get_order_fm_code_multi_shop?" + arr.join("&")
            let data = {
                "orders": [
                    {
                        "order_id": "" + order_id,
                        "order_sn": order_sn,
                        "package_number": package_number,
                        "shop_id": seller[site].shopId,
                        "region_id": site.toUpperCase()
                    }]
            }
            let oo = {
                next: next,
                This: This,
                t: t
            }
            this.a02(url, data, oo)
        },
        a02: function (url, data, oo) {            
            gg.postFetch(url,JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.message == "success") {
                Tool.apply(t.data.list, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["获取订单出错", t])
            }
        }
    },
})