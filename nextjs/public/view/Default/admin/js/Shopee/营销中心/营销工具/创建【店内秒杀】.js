'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
        start_time: Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1,
        end_time: 0,
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 营销工具 &gt; 创建【店内秒杀】") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                    <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">活动开始时间：</td><td id="timeA" colspan="2">'+ Tool.js_date_time2(this.obj.start_time) + '</td></tr>\
                    <tr><td class="right">活动结束时间：</td><td id="timeB" colspan="2"></td></tr>\
                    <tr><td class="right">商品ID：</td><td id="ids" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        this.obj.end_time = this.obj.start_time - 1 + 60 * 60 * 24 * 3;//3天(因为每个活动都是从00:0:00到23:59:59)
        $("#timeB").html(Tool.js_date_time2(this.obj.end_time));
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "start_time=" + this.obj.start_time,
            "end_time=" + this.obj.end_time,
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/shop_flash_sale/time_slot/?" + arr.join("&")
        $("#state").html("正在获取秒杀时段的个数。。。");
        gg.getFetch(url,"json", this.a05, this)
    },
    a05: function (oo) {
        if (oo.code == 0) {
            this.obj.Aarr = oo.data
            this.obj.A2 = oo.data.length
            this.a06()
        }
        else {
            $("#state").html("到不了这里。。。");
        }
    },
    a06: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07, this, this.f01);
    },
    a07: function () {
        let Aarr = this.obj.Aarr[this.obj.A1 - 1]
        $("#timeA").html(Tool.js_date_time2(Aarr.start_time));
        $("#timeB").html(Tool.js_date_time2(Aarr.end_time));
        Tool.createFlashSale.a01(this.obj.seller, obj.arr[5], Aarr, this.a08, this)
    },
    a08: function () {
        this.obj.A1++
        this.a06();
    },
}
fun.a01();