Object.assign(Tool, {
    //获取订单价格信息
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
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.message == "success") {
                let data = {
                    seller_income_breakdown: t.data.seller_income_breakdown.breakdown,
                    buyer_payment_breakdown: t.data.buyer_payment_breakdown.breakdown
                }
                Tool.apply(data, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["出错01", t])
            }
        }
    },
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
            gg.getHtml(url, this.a02, this, oo)
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
    //获取订单信息
    get_order_list_by_order_ids_multi_shop: {
        a01: function (order_id, seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
            ]
            let url = "https://seller.shopee.cn/api/v3/order/get_order_list_by_order_ids_multi_shop?" + arr.join("&")
            let data = {
                "orders": [{
                    "order_id": order_id,
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
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.message == "success") {
                if (t.data.orders.length == 1) {
                    Tool.apply(t.data.orders[0], oo.next, oo.This, oo.t)
                }
                else {
                    Tool.pre(["只查一个订单，应该到不了这里...", t])
                }
            }
            else {
                Tool.pre(["获取订单出错", t])
            }
        },
    },
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
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
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