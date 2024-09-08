'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; Shopee广告 &gt; 搜索关键词 &gt; 获取【店铺商品】的关键词") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">商品ID：</td><td id="fromid" colspan="2"></td></tr>\
		    <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : 0) + '<r:shopPro_' + obj.arr[5] + ' size=1 db="sqlite.shopee" page=2>,<:fromid/></r:shopPro_' + obj.arr[5] + '>]'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) this.obj.A2 = t[0];
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[1]);
    },
    //////////////////////////////////////////////
    d01: function (fromid) {
        $("#fromid").html(fromid)
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/setup_helper/list_recommended_keyword/?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取商品关键词。。。");
        let data = {
            "campaign_type": "product",
            "item_id": fromid,
            "suggest_log_data": {
                "page": "suggest_creation",
                "campaign_id": null
            }
        }
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d02, this, fromid)
    },
    d02: function (oo, fromid) {
        if (oo.code == 0) {
            Tool.common_add_keyword.a01(oo.data, obj.arr[5], this.d03, this)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d03: function () {
        this.obj.A1++;
        $("#state").html("正在进入第" + this.obj.A1 + "页。。。");
        this.a04();
    },
}
fun.a01();