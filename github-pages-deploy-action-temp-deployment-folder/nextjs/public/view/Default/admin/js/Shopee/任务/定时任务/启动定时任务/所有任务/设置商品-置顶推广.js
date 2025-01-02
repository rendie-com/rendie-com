'use strict';
var task = {
    obj: {
        C1: 1, C2: 0,
    },
    a01: function (seller, site, next, This, t) {
        let oo = {
            seller: seller,
            site: site,
            next: next,
            This: This,
            t: t
        }
        $("#tbody").html('<tr><td class="right">置顶推广进度：</td>' + Tool.htmlProgress('C') + '</tr>')
        this.a02(oo);
    },
    a02: function (oo) {
        $("#state").html("正在获取商品信息。。。");
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + oo.site,
            sql: "select @.fromid as fromid FROM @.table where @.status=1 order by @._1688_saleNum desc" + Tool.limit(1, this.obj.C1, "sqlite"),
        }]
        if (this.obj.C2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + oo.site,
                sql: "select count(1) as total FROM @.table where @.status=1",
            })
        }
        Tool.ajax.a01(data, this.a03, this, oo);
    },
    a03: function (t, oo) {
        if (this.obj.C2 == 0) { this.obj.C2 = t[1][0].total }
        oo.fromid = t[0][0].fromid
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a04, this, this.d01, oo)
    },
    a04: function (oo) {
        let pArr = [
            "version=3.1.0",
            "SPC_CDS=" + oo.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + oo.seller[oo.site].shopId,
            "cbsc_shop_region=" + oo.site
        ]
        let url = "https://seller.shopee.cn/api/v3/product/boost_product/?" + pArr.join("&")
        let data = '{"id":' + oo.fromid + '}'
        $("#state").html("正在置顶推广。。。");
        gg.postFetch(url, data, this.a05, this, oo)
    },
    a05: function (t, oo) {
        if (t.message == "success") {
            $("#state").html("已置顶推广。");
            this.a06(oo)
        }
        else if (t.code == 1000100216) {
            $("#state").html("已经【置顶推广】过了。");
            this.a06(oo)
        }
        else if (t.code == 217) {
            // "message": "reached shop's bump slot limit",
            $("#state").html("已经【置顶推广】过了。");
            this.a06(oo)
        }
        else if (t.code == 1000100217) {
            $("#state").html("置顶完成。");
            this.d01(oo)
        }
        else if (t.message == "item status not normal or stock is 0") {
            //item status not normal or stock is 0
            $("#state").html("物料状态不正常或库存为");
            this.a06(oo)
        }
        else {
            Tool.pre(["出错222：", t])
        }
    },
    a06: function (oo) {
        $("#state").html("置顶推广完成。。。");
        this.obj.C1++;
        this.a02(oo);
    },
    d01: function (oo) {
        this.obj.C1 = 1; this.obj.C2 = 0;
        $("#tbody").html("");
        oo.next.apply(oo.This, [oo.t]);
    }
}


