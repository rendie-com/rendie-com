'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 状态_置顶推广") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		    <tr><td class="right w150">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">条件：</td><td id="where" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
        $("#state").html("正在获取商品信息。。。");
        let where = ' where @.status=' + obj.arr[6] + ' order by @._1688_saleNum desc'
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:shopPro_' + obj.arr[5] + ' size=1 db="sqlite.shopee" page=2 where="' + where + '">,<:fromid/></r:shopPro_' + obj.arr[5] + '>]'
        $("#where").html(where)
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, arr[1])
    },
    ///////////////////////////////////  
    d01: function (fromid) {
        let pArr = [
            "version=3.1.0",
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/v3/product/boost_product/?" + pArr.join("&")
        $("#state").html("正在置顶推广。。。");
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
        ]
        gg.setHeaders_postHtml(url, headers, '{"id":' + fromid + '}', this.d02, this)
    },
    d02: function (oo) {
        if (oo.code == 0) {
            $("#state").html("已置顶推广。");
            this.d03()
        }
        else if (oo.code == 1000100216) {
            $("#state").html("已经【置顶推广】过了。");
            this.d03()
        }
        else if (oo.code == 1000100217) {
            $("#state").html("全部完成。");
        }
        else {
            Tool.pre(["出错：", oo])
        }
    },
    d03: function () {
        $("#state").html("置顶推广完成。。。");
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();
