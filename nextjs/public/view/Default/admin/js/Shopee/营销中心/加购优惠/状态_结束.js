'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//状态
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 折扣 &gt; 状态_结束") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
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
        this.obj.seller = t
        this.a04();
    },
    a04: function () {
        $("#state").html("正在获取信息。。。");
        let str = '\
        [\
            ' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
            <r:add_on_deal size=1 db="sqlite.shopee" page=2 where=" where @.status='+ obj.arr[6] + ' and @.site=\'' + obj.arr[5] + '\'">,\
               <:add_on_deal_id/>\
            </r:add_on_deal>\
        ]'
        Tool.ajax.a01(str, 1, this.a05, this);
    },
    a05: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, arr[1])
    },
    a06: function (add_on_deal_id) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/operation/?" + arr.join("&")
        let data = '{"add_on_deal_id":' + add_on_deal_id + ',"action":2}'
        $("#state").html("正在结束。。。");
        gg.postFetch(url, data, this.a07, this, add_on_deal_id)
    },
    a07: function (t, add_on_deal_id) {
        if (t.code == 0) {
            $("#state").html("结束成功。");
            this.a08(add_on_deal_id)
        }
        else if (t.message == "only ongoing campaign can stop") {
            $("#state").html("这个已经结束过了。");
            this.a08(add_on_deal_id)
        }
        else {
            Tool.pre(["出错222", t])
        }
    },
    a08: function (add_on_deal_id) {
        let str = '"ok"<r: db="sqlite.shopee">update @.add_on_deal set @.status=3 where @.add_on_deal_id=' + add_on_deal_id + '</r:>'
        Tool.ajax.a01(str, 1, this.a09, this);
    },
    a09: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错111", t])
        }
    },
}
fun.a01();