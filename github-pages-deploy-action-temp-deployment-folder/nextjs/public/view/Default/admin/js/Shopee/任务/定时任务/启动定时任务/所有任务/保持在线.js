'use strict';
var task = {
    a01: function (seller, site, next, This, t) {
        let pArr = [
            "SPC_CDS=" + seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + seller[site].shopId,
            "cbsc_shop_region=" + site
        ]
        let url = "https://seller.shopee.cn/api/report/miscellaneous/last_active?" + pArr.join("&")
        let data = {
            "platform_id": 2,
            "shop_id": seller[site].shopId,
            "timestamp": Tool.gettime(""),
            "action_type": "impression",
            "page_url": "https://seller.shopee.cn/"
        }
        //打开聊聊（目的是为了保持在线。）        
        let oo = {
            next: next,
            This: This,
            t: t
        }
        gg.postFetch(url,  JSON.stringify(data), this.a02, this, oo)
    },
    a02: function (t, oo) {
        if (t.code == 0) {
            oo.next.apply(oo.This, [oo.t])
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}