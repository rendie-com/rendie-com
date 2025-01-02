'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        seller: {},
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件       
        //obj.params.site           站点
        //obj.params.return         返回URL  
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 获取订单信息") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="w150 right">获取站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site,
        ]
        let url = "https://seller.shopee.cn/api/v3/order/search_order_list_index?" + arr.join("&")
        let data = {
            "order_list_tab": 100,
            "entity_type": 1,
            "filter": {
                "fulfillment_type": 0,
                "is_drop_off": 0
            },
            "pagination": {
                "from_page_number": 1,
                "page_number": 1,
                "page_size": 40
            }, "sort": {
                "sort_type": 3,
                "ascending": false
            }
        }
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.A1 + "页商品。。。");
        gg.postFetch(url, JSON.stringify(data), this.a05, this)
    },
    a05: function (oo) {
        if (oo.message == "success") {
            this.obj.A2 = Math.ceil(oo.data.pagination.total / 40)
            this.obj.B2 = oo.data.index_list.length;
            this.obj.Barr = oo.data.index_list;
            this.d01();
        }
        else {
            Tool.pre(["出错11", oo])
        }
    },
    /////////////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this, null)
    },
    d02: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d03, this, null)
    },
    d03: function () {
        let Barr = this.obj.Barr[this.obj.B1 - 1];
        $("#state").html("获取订单信息");
        Tool.get_one_order.a01(Barr.order_id, this.obj.seller, obj.params.site, this.d04, this, Barr)
    },
    d04: function (t, Barr) {
        Barr.order = t;
        Tool.get_order_income_components.a01(Barr.order_id, this.obj.seller, obj.params.site, this.d05, this, Barr)
    },
    d05: function (t, Barr) {
        Barr.order["@.seller_income_breakdown"] = Tool.rpsql(JSON.stringify(t.seller_income_breakdown))//买家价格明细
        Barr.order["@.buyer_payment_breakdown"] = Tool.rpsql(JSON.stringify(t.buyer_payment_breakdown))//买家价格明细        
        $("#state").html("获取订单国际物流信息");
        Tool.get_logistics_tracking_history.a01(Barr.order_id, this.obj.seller, obj.params.site, this.d06, this, Barr)
    },
    d06: function (t, Barr) {
        Barr.order["@.package_number"] = Tool.rpsql(t.package_number);//包裹编号（如：OFG172202595203743）---获取国内运单号要用
        Barr.order["@.tracking_number"] = Tool.rpsql(t.tracking_number);//国外运单号（如：MY240967550364Y）
        Barr.order["@.tracking_info"] = Tool.rpsql(JSON.stringify(t.tracking_info));//国外物流信息（如：json）
        $("#state").html("国内运单信息");
        Tool.get_order_fm_code_multi_shop.a01(Barr.order_id, Barr.order["@.order_sn"], Barr.order.package_number, this.obj.seller, obj.params.site, this.d07, this, Barr)
    },
    d07: function (t, Barr) {
        $("#state").html("更新或添加订单信息");
        Barr.order["@.DomesticWaybill"] = Tool.rpsql(JSON.stringify(t))//国内运单号（如：json）
        Barr.order["@.site"] = "'" + obj.params.site + "'",//站点（如：my）
            Tool.updateOrInsert_orders.a01(Barr.order, this.d08, this)
    },
    d08: function () {
        this.obj.B1++;
        $("#state").html("正在进入第" + this.obj.B1 + "条。。。");
        this.d02()
    },
}
fun.a01();