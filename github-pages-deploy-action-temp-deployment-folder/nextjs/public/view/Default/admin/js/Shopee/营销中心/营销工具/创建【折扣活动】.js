'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0,
        start_time: config[obj.params.site].discount_time,
        end_time: 0,
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件        
        //obj.params.site           站点
        //obj.params.return         返回URL 
        if (this.obj.start_time < Tool.gettime("")) {
            this.obj.start_time = Tool.gettime("") + 60 * 60 * 2//初始化 开始时间
        }
        const oneDay = 24 * 60 * 60; // 一天的毫秒数
        let day = (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 10) - this.obj.start_time//计算到活动结束速差多少天。
        this.obj.A2 = Math.ceil(day / (oneDay * 2))//为什么“*2”？答：因为活动一次2天。
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 营销工具 &gt; 创建【折扣活动】(活动一次2天，准备10天的活动)") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">时间段进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">活动开始时间：</td><td id="timeA" colspan="2">'+ Tool.js_date_time2(this.obj.start_time) + '</td></tr>\
                <tr><td class="right">活动结束时间：</td><td id="timeB" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        //说明：一个活动，最多可以添加1000个商品。我每个活动50个商品，不影响速度。
        Tool.html(this.a03, this, html);
    },
    a03: function (t) {
        Tool.login.a01(this.a04, this)
    },
    a04: function (t) {
        this.obj.seller = t;
        this.a05();
    },
    a05: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this);
    },
    //////////////////////////////////////
    b01: function (itemId, price, arr) {
        let val = false;//等于false 说明有问题，没有找到商品ID。
        for (let i = 0; i < arr.length; i++) {
            if (itemId == arr[i].fromid) {
                val = parseInt(price * (1 - (arr[i].newDiscount - 6) / 100) * 100000)
                break;
            }
        }
        return val;
    },
    b02: function (item_id, arr) {
        let min_purchase_limit = 0;
        for (let i = 0; i < arr.length; i++) {
            if (item_id == arr[i].itemid) {
                min_purchase_limit = arr[i].min_purchase_limit;
                break;
            }
        }
        if (min_purchase_limit == 0) {
            Tool.pre(["出错", min_purchase_limit])
        }
        return min_purchase_limit;
    },
    ///////////////////////////////////////////////
    d01: function () {
        this.obj.end_time = this.obj.start_time - 1 + 60 * 60 * 24 * 2;//2天(因为每个活动都是从00:0:00到23:59:59)
        $("#timeA").html(Tool.js_date_time2(this.obj.start_time))
        $("#timeB").html(Tool.js_date_time2(this.obj.end_time) + "（2天）")
        //@.status=1        表示【上架商品】
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select @.fromid as fromid,@.newDiscount as newDiscount from @.table where @.status=1 and @.isDiscount=1 order by @._1688_saleNum desc" + Tool.limit(10, this.obj.B1),
        }]
        if (this.obj.B2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select count(1) as total from @.table where @.status=1 and @.isDiscount=1",
            })
        }
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.B2 == 0) { this.obj.B2 = Math.ceil(t[1][0].total / 10); }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d03, this, null, t[0])
    },
    d03: function (arr) {
        $("#state").html("正在搜索商品。。。");
        let ids = []
        for (let i = 0; i < arr.length; i++) {
            ids.push(arr[i].fromid)
        }
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "offset=0",
            "limit=100",
            "is_ads=0",
            "need_brand=0",
            "need_item_model=0",
            "search_type=1",
            "search_content=" + ids.join(","),
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/public/product_selector/?" + pArr.join("&")
        gg.getFetch(url,"json", this.d04, this, arr)
    },
    d04: function (t, arr) {
        if (t.code == 0) {
            this.d05(t.data.item_stock_price_infos, t.data.item_list, arr)
        }
        else {
            Tool.pre(["出错：", t])
        }
    },
    d05: function (arr1, item_list, arr2) {
        let nArr = []
        for (let i = 0; i < arr1.length; i++) {
            let arr3 = arr1[i].sku_stock_price_list
            for (let j = 0; j < arr3.length; j++) {
                if (arr3[j].seller_stock_info.normal_stock > this.b02(arr1[i].item_id, item_list))//库存不能低于【最小购买量】
                {
                    nArr.push({
                        item_id: arr1[i].item_id,
                        model_id: arr3[j].model_id,
                        promotion_price: this.b01(arr1[i].item_id, arr3[j].price_info.input_normal_price, arr2),
                        user_item_limit: 0,
                        status: 1
                    })
                }
            }
        }
        this.e01(nArr)
    },
    //////////////////////////////////////////////
    e01: function (nArr) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        //思路：先创建活动，后添加商品。
        //为什么？因为，shopee就是这么干的。
        let url = "https://seller.shopee.cn/api/marketing/v4/discount/create_discount/?" + arr.join("&")
        let timeStr = Tool.userDate13(this.obj.start_time * 1000, "/").substr(5) + " - " + Tool.userDate13(this.obj.end_time * 1000 + 1000, "/").substr(5)
        let data = {
            "title": "【" + this.obj.A1 + "-" + this.obj.B1 + "】打折 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "status": 1
        }
        $("#state").html("正在创建活动");
        gg.postFetch(url, JSON.stringify(data), this.e02, this, nArr)
    },
    e02: function (oo, nArr) {
        if (oo.error == 0) {
            $("#state").html("活动创建成功，正在添加商品");
            this.e03(oo.data.promotion_id, nArr)
        }
        else if (oo.bff_meta == null) {
            //oo={"bff_meta":null,"error":0,"error_msg":null,"data":{"promotion_id":688287161391807,"error_list":null}}
            this.e03(oo.data.promotion_id, nArr)
        }
        else {
            Tool.pre(["出错001：", oo])
        }
    },
    e03: function (promotion_id, nArr) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/discount/update_seller_discount_items/?" + arr.join("&")
        let data = {
            promotion_id: promotion_id,
            discount_model_list: nArr
        }
        $("#state").html("正在【提交活动】。。。");
        gg.postFetch(url, JSON.stringify(data), this.e04, this)
    },
    e04: function (oo) {
        //{"bff_meta":null,"error":0,"error_msg":null,"data":{"total_count":211,"success_count":211,"failed_item_list":null,"error_list":null}}
        if (oo.error == 0 || oo.error == 1400101314 || oo.error == 1400101307 || oo.error == 1400100025) {
            //1400101314     表示：iscount model price invalid（折扣型号价格无效）
            //1400101307     表示：some item has participated in promotion(某些项目已参与促销)
            //1400100025     表示：promo_price cannot be more than or equal to item's normal price [促销价格不能大于或等于商品的正常价格]
            this.e05()
        }
        else if (oo.bff_meta == null) {
            //discount item illega
            this.e05()
        }
        else {
            Tool.pre(["出错002：", oo]);
        }
    },
    e05: function () {
        this.obj.B1++;
        if (this.obj.B1 > this.obj.B2) {
            this.f01();
        }
        else {
            this.d01();
        }
    },
    ////////////////////////////////////////////////
    f01: function () {
        $("#state").html("正在更新活动时间。")
        config[obj.params.site].discount_time = this.obj.end_time + 1;
        let data = [{
            action: "fs",
            fun: "writeFile",
            path: "public/" + o.path + "admin/js/Shopee/营销中心/config.js",
            data: "let config=" + JSON.stringify(config, null, 2),
        }]
        Tool.ajax.a01(data, this.f02, this);
    },
    f02: function (t) {
        if (t[0] == "写入成功") {
            $("#state").html("更新活动时间成功。")
            this.f03()
        }
        else { Tool.pre(["出错", t]); }
    },
    f03: function (t) {
        this.obj.A1++
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.start_time = this.obj.end_time + 1//修改开始时间，准备做下一个时段的活动。
        this.a05();
    },
}
fun.a01();