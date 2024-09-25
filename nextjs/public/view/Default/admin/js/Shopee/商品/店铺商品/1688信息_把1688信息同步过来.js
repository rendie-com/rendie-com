'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        //obj.params.site           站点
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 1688信息_把1688信息同步过来') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">同步字段：</td><td colspan="2">【销量】【最高价】【运费】【详情ID】</td></tr>\
            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
            <tr><td class="right">1688地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        // and @.proid=\'R493655\'
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("proid,manualreview_1688_fromid") + " FROM @.table where @.is" + obj.params.site + "=1" + Tool.limit(1, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select count(1) as total FROM @.table where @.is" + obj.params.site + "=1",
            })
        }
        //minprice  在做活动的时候能用上。
        Tool.ajax.a01(data, this.a03, this)
    },
    a03: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t[0][0])
    },
    a04: function (oo) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("freight,salenum,fromid") + " FROM @.proList where @.fromid=" + oo.manualreview_1688_fromid,
        },
        {
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(oo.manualreview_1688_fromid, 99),
            sql: "select @.sku as sku FROM @.prodes where @.fromid=" + oo.manualreview_1688_fromid,
        }]
        Tool.ajax.a01(data, this.a05, this, oo)
    },
    a05: function (t, oo) {
        let url = "https://detail.1688.com/offer/" + t[0][0].fromid + ".html"
        $("#proid").html(oo.proid)
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>')
        let o1 = Tool.maxPrice.a01(JSON.parse(t[1][0].sku))
        let updateArr = [
            "@._1688_fromid=" + t[0][0].fromid,
            "@._1688_freight=" + t[0][0].freight,
            "@._1688_saleNum=" + t[0][0].salenum,
            "@._1688_maxprice=" + o1.price,
            "@._1688_MinimumOrder=" + o1.beginAmount,
        ]
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/"+ obj.params.site,
            sql: "update @.table set " + updateArr.join(",") + " where @.proid='" + oo.proid + "'",
        }]
        $("#state").html("正在更新。。。");
        Tool.ajax.a01(data, this.a06, this)
    },
    a06: function (t) {
        if (t[0].length == 0) {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();