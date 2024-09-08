'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 5,// 活动进度
        start_time: 0,
        end_time: 0,
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        if (this.obj.start_time < Tool.gettime("")) {
            this.obj.start_time = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1
        }
        let html = Tool.header("SHOPEE &gt; 营销中心 &gt; 营销工具 &gt; 创建【套装优惠】") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">活动开始时间：</td><td id="timeA" colspan="2">'+ Tool.js_date_time2(this.obj.start_time) + '</td></tr>\
                <tr><td class="right">活动结束时间：</td><td id="timeB" colspan="2"></td></tr>\
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
        alert("aaaaaaaaaaaaaaaaaa")
    },   
}
fun.a01();