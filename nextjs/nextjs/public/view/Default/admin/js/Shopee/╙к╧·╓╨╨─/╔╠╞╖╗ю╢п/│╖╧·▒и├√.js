'use strict';
var fun =
{
    //说明：只要报名成功，商品将：不能下架，不能删除，不能改价，部分可以修改，只能等活动结束，才有所有权。
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0,
        D1: 1, D2: 0, Darr: [],
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 我的活动 &gt; 撤销报名") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                    <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">活动名称：</td><td id="name" colspan="2"></td></tr>\
                    <tr><td class="right">活动介绍：</td><td id="description" colspan="2"></td></tr>\
                    <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
                    <tr><td class="right">报名情况：</td><td id="RegistrationStatus" colspan="2"></td></tr>\
                    <tr><td class="right">子活动进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">子活动名称：</td><td id="name2" colspan="2"></td></tr>\
                    <tr><td class="right">子活动介绍：</td><td id="description2" colspan="2"></td></tr>\
                    <tr><td class="right">商品撤销页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                    <tr><td class="right">撤销sku进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
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
        $("#state").html("正在获取活动个数。。。");
        Tool.common_ProductActivities.a01(this.obj.seller, obj.arr[5], this.a05, this)
    },
    a05: function (t) {
        this.obj.A1 = t.A2;
        this.obj.A2 = t.A2;
        this.obj.Aarr = t.Aarr;
        this.d01();
    },
    /////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this);
    },
    d02: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1]
        $("#name").html(oo.name)
        $("#description").html(oo.description)
        $("#time").html(Tool.js_date_time2(oo.start_time) + " 至 " + Tool.js_date_time2(oo.end_time));
        $("#RegistrationStatus").html('<span class="p-2">可报名：' + oo.session_statistics.available_session_num + '</span><span class="p-2">已报名：' + oo.session_statistics.nominated_session_num + '<span>')
        $("#state").html("正在进入子活动报名页面。。。");
        Tool.common_ProductActivities.d01(this.obj.seller, obj.arr[5], oo.id, this.d03, this)
    },
    d03: function (t) {
        this.obj.B2 = t.B2;
        this.obj.Barr = t.Barr;
        this.e01();
    },   
    e01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e02, this, this.g03);
    },
    e02: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1]
        $("#name2").html(oo.session_name)
        $("#description2").html(oo.description.split("\n").join("<br/>"))
        let data = { "session_id": oo.session_id, "entity_type": [2], "entity_tab": 0, "page_num": 1, "page_size": 10 }
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/mkt/cmt/nominated/nominated_entity_list?" + arr.join("&")
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        $("#state").html("正在获取已报名商品。。。");
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e03, this)
    },
    e03: function (t) {
        if (t.code == 0) {
            if (t.page_info.total_count == 0) {
                $("#state").html("正在没有商品可撤销。。。");
                this.g02();
            }
            else {
                this.obj.C2 = Math.ceil(t.page_info.total_count / 10);
                this.e04(t.data.recruiting_entities);
            }
        }
        else {
            Tool.pre(["出错01", t])
        }
    },
    e04: function (arr) {
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].product.models.length; j++) {
                nArr.push(arr[i].product.models[j].nomination_id)
            }
        }
        this.obj.D2 = nArr.length;
        this.obj.Darr = nArr;
        this.f01()
    },
    f01: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.f02, this, this.g02);
    },
    f02: function () {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.f03, this, this.g01);
    },
    f03: function () {
        let data = { "session_id": this.obj.Barr[this.obj.B1 - 1].session_id, "nomination_id": this.obj.Darr[this.obj.D1 - 1] }
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/mkt/cmt/nominated/withdraw_entity?" + arr.join("&")
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        $("#state").html("正在获取已报名商品。。。");
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.f04, this)
    },
    f04: function (t) {
        if (t.code == 0) {
            this.obj.D1++;
            this.f02();
        }
        else {
            Tool.pre(["出错04", t])
        }
    },
    g01: function () {
        this.obj.D1 = 1;
        this.obj.D2 = 0;
        this.obj.Darr = [];
        $("#D1").css("width", "0%")
        $("#D1,#D2").html("");
        this.e02();
    },
    g02: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        $("#C1").css("width", "0%")
        $("#C1,#C2").html("");
        this.e01();
    },
    g03: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%")
        $("#B1,#B2").html("");
        this.d01();
    },
}
fun.a01();
