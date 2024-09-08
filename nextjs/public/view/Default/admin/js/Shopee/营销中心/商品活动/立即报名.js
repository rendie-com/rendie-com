'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0, Carr: [],
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 我的活动 &gt; 立即报名") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                    <tr><td class="right">说明：</td><td colspan="2">\
                        (1)只要报名成功，商品将：不能下架，不能删除，不能改价，部分可以修改，只能等活动结束，才有所有权。<br/>\
                        (2)单次报名活动最多选200个商品，可以通个多次提交报名10000个商品。</td></tr>\
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
                    <tr><td class="right">修改折扣进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
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
        this.obj.A1 = t.A2; this.obj.A2 = t.A2; this.obj.Aarr = t.Aarr;
        this.d01();
    },
    ////////////////////////////////
    b01: function (Carr, models) {
        let isErr = false;
        for (let i = 0; i < models.length; i++) {
            let price1 = this.b02(Carr, models[i].nomination_id)
            if (price1 != models[i].campaign_price) {
                isErr = true;
                break;
            }
        }
        return isErr
    },
    b02: function (Carr, nomination_id) {
        let price = 0;
        for (let i = 0; i < Carr.length; i++) {
            if (Carr[i].nomination_ids.indexOf(nomination_id) != -1) {
                price = Carr[i].campaign_price;
                break;
            }
        }
        return price;
    },
    /////////////////////////////////////
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
        this.d04();
    },
    d04: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d05, this, this.h03);
    },
    d05: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1]
        $("#name2").html(oo.session_name)
        $("#description2").html(oo.description.split("\n").join("<br/>"))
        //oo.is_eligible=true       表示可以报名
        if (oo.is_eligible) {
            Tool.common_addProduct.a01(this.obj.seller, obj.arr[5], oo.session_id, this.e01, this)
        }
        else {
            alert("aaaaaaaaaaaaaaaaaaaaaa")
            //this.h02();
        }
    },
    ////////////////////////////////
    e01: function (t) {
        Tool.common_editPrice.a01(this.obj.seller, obj.arr[5], this.obj.Barr[this.obj.B1 - 1].session_id, this.e02, this);
    },
    e02: function (t) {
        this.obj.Barr[this.obj.B1 - 1].preview_no = t.preview_no;
        this.obj.C2 = t.discountArr.length;
        this.obj.Carr = t.discountArr;
        this.e03()
    },
    e03: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.e04, this, this.f01);
    },
    e04: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1], Carr = this.obj.Carr[this.obj.C1 - 1]
        let data = {
            "session_id": oo.session_id,
            "preview_no": oo.preview_no,
            "update_product_preview_infos": [{
                "nomination_ids": Carr.nomination_ids,
                "campaign_price_type": 1,
                "campaign_stock": "" + Carr.campaign_stock,//库存
                "campaign_price": "" + Carr.campaign_price//价格
            }],
            "types": [2]
        }
        $("#state").html("正在修改折扣。。。");
        Tool.common_ProductActivities.h01(this.obj.seller, obj.arr[5], data, this.e05, this)
    },
    e05: function (oo) {
        this.obj.C1++;
        this.e03();
    },
    ////////////////////////////////////////
    f01: function () {
        $("#state").html("正在获取【选中的商品】，用来确认修改折扣是否设置成功。。。");
        Tool.common_ProductActivities.g01(this.obj.seller, obj.arr[5], this.obj.Barr[this.obj.B1 - 1].session_id, this.f02, this)
    },
    f02: function (oo) {
        let t = oo.arr, isErr = false;
        for (let i = 0; i < t.length; i++) {
            if (this.b01(this.obj.Carr, t[i].product.models)) {//价格是否设置出错
                isErr = true;
            }
        }
        if (!isErr) {
            $("#state").html("正在提交。。。");
            Tool.common_ProductActivities.i01(this.obj.seller, obj.arr[5], this.obj.Barr[this.obj.B1 - 1].session_id, this.h01, this)
        }
        else {
            $("#state").html("怎么还有商品要删除？我都已经删除过了。")
        }
    },
    /////////////////////////////
    h01: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.obj.Carr = [];
        $("#C1").css("width", "0%")
        $("#C1,#C2").html("");
        Tool.at("提交成功")
        //this.d04();
    },
    //h03: function () {
    //    this.obj.A1++;
    //    this.obj.B1 = 1;
    //    this.obj.B2 = 0;
    //    this.obj.Barr = [];
    //    $("#B1").css("width", "0%")
    //    $("#B1,#B2").html("");
    //    //this.d01();
    //},
}
fun.a01();