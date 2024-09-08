'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('Shopee - 商品列表 - 全球商品 - 敦煌手动审核状态_获取【敦煌手动审核状态】') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let html = '[\
            {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
            <r:proupdhgate size=30 page=2 db="sqlite.dhgate">,\
            {\
                "proid":"<:proid/>",\
                "ManualReview":<:ManualReview/>\
            }\
            </r:proupdhgate>\
        ]'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(html, this.obj.A1, this.a03, this)
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0].A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let newArr = [];
        for (let i = 1; i < arr.length; i++) {
            newArr.push('update @.GlobalPro set @.ManualReview=' + arr[i].ManualReview + ' where @.proid=\'' + arr[i].proid + '\'')
        }
        Tool.ajax.a01('"ok"<r: db="sqlite.shopee">' + newArr.join("<1/>") + '</r:>', 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.pre(["出错", t])
        }
    },

}
fun.a01();