'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品 &gt; 平台关联 &gt; 更新后违规类型 &gt; 从【违规或删除】中同步该信息') + '\
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
        let data = [{
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "select @.penalty_type as penalty_type,@.proid as proid FROM @.table" + Tool.limit(10, this.obj.A1),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/违规或删除",
                sql: "select count(1) as total FROM @.table",
            })
        }
        $("#state").html("正在获取信息。。。");
        Tool.ajax.a01(data, this.a03, this)
    },
    a03: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 10); }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t[0])
    },
    a04: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "update @.table set @.penalty_type=" + arr[i].penalty_type + " where @.proid='" + arr[i].proid + "'",
            })
        }
        $("#state").html("正在更新。。。");
        Tool.ajax.a01(data, this.a05, this)
    },
    a05: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.A1++;
            this.a02();
        }
    },
}

$(function () {
    fun.a01();
})
