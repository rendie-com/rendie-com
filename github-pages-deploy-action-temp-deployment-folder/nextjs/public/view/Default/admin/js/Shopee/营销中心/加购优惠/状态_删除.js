'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 加购优惠 &gt; 状态_删除") + '\
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
        this.obj.seller = t;
        this.d01();
    },
    /////////////////////
    d01: function () {
        $("#state").html("正在获取信息。。。");
        let str = '\
        {\
            "A2":' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
            <r:add_on_deal size=1 db="sqlite.shopee" page=2 where=" where @.status='+ obj.arr[6] +' and @.site=\'' + obj.arr[5] + '\'">,\
                "add_on_deal_id":<:add_on_deal_id/>,\
            </r:add_on_deal>\
        }'
        Tool.ajax.a01(str, 1, this.d02, this);
    },
    d02: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, oo)
    },
    d03: function (oo) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/operation/?" + arr.join("&")
        let data = {
            "add_on_deal_id": oo.add_on_deal_id,
            "action": 1
        }
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            }
        ]
        $("#state").html("正在删除。。。");
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d04, this, oo)
    },
    d04: function (t, oo) {
        if (t.code == 0) {
            $("#state").html("删除成功。");
            this.d05(oo)
        }
        else if (t.message == "add-on deal not exists") {
            $("#state").html("这个已经删除过了。");
            this.d05(oo)
        }
        else {
            Tool.pre(["出错222", t])
        }
    },
    d05: function (oo) {
        let str = '"ok"<r: db="sqlite.shopee">delete from @.add_on_deal where @.add_on_deal_id=' + oo.add_on_deal_id + '</r:>'
        Tool.ajax.a01(str, 1, this.d06, this);
    },
    d06: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.d01();
        }
        else {
            Tool.pre(["出错111", t])
        }
    },
}
fun.a01();