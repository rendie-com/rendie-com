'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 2,//1:为加购折扣；     2：加购赠品
        B1: 1, B2: 0,
        start_time: config[obj.arr[5]].add_on_deal_time,
        end_time: 0,
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        if (this.obj.start_time < Tool.gettime("")) {
            this.obj.start_time = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 2
        }
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 营销工具 &gt; 创建【加购优惠】") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                    <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">活动开始时间：</td><td id="timeA" colspan="2">'+ Tool.js_date_time2(this.obj.start_time) + '</td></tr>\
                    <tr><td class="right">活动结束时间：</td><td id="timeB" colspan="2"></td></tr>\
                    <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                   <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        this.obj.end_time = this.obj.start_time - 1 + 60 * 60 * 24 * 30;//30天(因为每个活动都是从00:0:00到23:59:59)
        $("#timeB").html(Tool.js_date_time2(this.obj.end_time));
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.d01();
    },
    ///////////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this);
    },
    d02: function () {
        let str = '[' + (this.obj.B2 == 0 ? '<@page/>' : 0) + '\
        <r:shopPro_' + obj.arr[5] + ' db="sqlite.shopee" size=10  where=" where @.status=1 and @.isSeckill=1" page=2>,\
            <:fromid/>\
        </r:shopPro_' + obj.arr[5] + '>]'
        $("#state").html("正在获取加购主商品。。。");
        Tool.ajax.a01(str, this.obj.B1, this.d03, this);
    },
    d03: function (t) {
        if (this.obj.B2 == 0) { this.obj.B2 = t[0]; }
        t.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d04, this, this.f01, t);
    },
    d04: function (arr) {
        Tool.AdditionalPurchaseDiscounts.a01(this.obj.B1, arr, this.obj.start_time, this.obj.end_time, this.obj.seller, obj.arr[5], this.d06, this)
    },
    d05: function (arr) {
        //Tool.PurchaseAdditionalGifts.a01(this.obj.B1, arr, this.obj.start_time, this.obj.end_time, this.obj.seller, obj.arr[5], this.d06, this)
    },
    d06: function () {
        this.obj.B1++;
        this.d02();
    },
    ////////////////////////////////////////////////////
    f01: function () {
        $("#state").html("正在更新活动时间。")
        config[obj.arr[5]].add_on_deal_time = this.obj.end_time + 1;
        let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/营销中心/config.js">let config=' + JSON.stringify(config, null, 2) + '</r:>';
        Tool.ajax.a01(str, 1, this.f02, this);
    },
    f02: function (t) {
        if (t == "ok") {
            $("#state").html("更新活动时间成功。全部完成。")
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();