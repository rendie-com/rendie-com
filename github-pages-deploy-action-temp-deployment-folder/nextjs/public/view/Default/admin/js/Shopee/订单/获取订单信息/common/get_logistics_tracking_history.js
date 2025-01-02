Object.assign(Tool, {
    //获取订单国际物流信息
    get_logistics_tracking_history: {
        a01: function (order_id, seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
                "order_id=" + order_id,
            ]
            let url = "https://seller.shopee.cn/api/v3/logistics/get_logistics_tracking_history?" + arr.join("&")
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.getFetch(url,"json", this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (t.message == "success") {
                if (t.data.list.length == 1) {
                    Tool.apply(t.data.list[0], oo.next, oo.This, oo.t)
                }
                else if (t.data.list.length == 0) {
                    Tool.apply({
                        package_number: "",
                        tracking_number: "",
                        tracking_info: [],
                    }, oo.next, oo.This, oo.t)
                }
                else {
                    Tool.pre(["只查一个订单，应该到不了这里", t])
                }
            }
            else {
                Tool.pre(["出错02", t])
            }
        }
    },
})