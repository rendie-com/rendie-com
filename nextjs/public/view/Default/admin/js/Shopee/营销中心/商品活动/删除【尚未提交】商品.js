'use strict';
var fun =
{
    //说明：只要报名成功，商品将：不能下架，不能删除，不能改价，部分可以修改，只能等活动结束，才有所有权。
    obj:
    {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 0, Barr: [],
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 我的活动 &gt; 删除【尚未提交】商品") + '\
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
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d05, this, this.e02);
    },

    d05: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1]
        $("#name2").html(oo.session_name)
        $("#description2").html(oo.description.split("\n").join("<br/>"))
        //oo.is_eligible=true       表示可以报名
        if (oo.is_eligible) {
            $("#state").html("正在获取【选中的商品】，用来删除。");
            Tool.common_ProductActivities.g01(this.obj.seller, obj.arr[5], oo.session_id, this.d06, this)
        }
        else {
            this.e01();
        }
    },
    d06: function (t) {
        let nomination_ids = [], arr = t.arr;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].product.models.length; j++) {
                nomination_ids.push(arr[i].product.models[j].nomination_id)
            }
        }
        if (nomination_ids.length == 0) {
            this.e01()
        }
        else {
            let data = {
                "session_id": this.obj.Barr[this.obj.B1 - 1].session_id,
                "preview_no": t.preview_no,
                "nomination_ids": nomination_ids
            }
            $("#state").html("正在删除【选中的商品】。");
            Tool.common_ProductActivities.j01(this.obj.seller, obj.arr[5], data, this.e01, this)
        }
    },
    //////////////////////////////
    e01: function () {
        this.obj.B1++;
        this.d04();
    },
    e02: function () {
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
