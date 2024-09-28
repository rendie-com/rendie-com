'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        config: {},
        logistics: [],
    },
    a01: function () {
        //obj.params.site           站点
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 定价 &gt; 重新计算新折扣') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
            <tr><td class="right w150">说明：</td><td colspan="2">定价与原价相同，且不需要改价，则可以打折，否则不可以。</td></tr>\
            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
            <tr><td class="right">物流方式：</td><td id="logistics" colspan="2"></td></tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">商品ID：</td><td id="fromid" colspan="2"></td></tr>\
            <tr><td class="right">计算过程：</td><td id="fixedPrice" colspan="2"></td></tr>\
            <tr><td class="right">新折扣：</td><td id="newDiscount" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/卖家账户",
            sql: "select @.config as config FROM @.table limit 1",
        }]
        Tool.ajax.a01(data, this.a03, this)
    },
    a03: function (t) {
        this.obj.config = JSON.parse(t[0][0].config);
        Tool.logistics.a01(obj.params.site, $("#logistics"), this.a04, this)
    },
    a04: function (logistics) {
        this.obj.logistics = logistics;
        this.d01()
    },
    ////////////////////////////////////////////////////////
    d01: function () {
        //let where=" where @.fromid=27111436319"
        let where=""
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select " + Tool.fieldAs("fromid,unitweight,scale,discount,_1688_minimumorder,_1688_maxprice,_1688_freight,input_normal_price") + " FROM @.table" +where+ Tool.limit(10, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select count(1) as total FROM @.table"+where,
            })
        }
        $("#state").html("正在获取商品信息。。。")
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 10); }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, t[0])
    },
    d03: function (t) {
        let data = [];
        for (let i = 0; i < t.length; i++) {
            $("#fromid").html(t[i].fromid)
            let oo = Tool.fixedPrice.a01(t[i]._1688_maxprice,
                t[i].scale,
                t[i]._1688_minimumorder,
                t[i]._1688_freight,
                this.obj.config[obj.params.site],
                t[i].unitweight,
                this.obj.logistics,
                t[i].discount)
            $("#fixedPrice").html(oo.str.split("\n").join("<br/>"))
            /////////////////////////////////////////////////////////////////////////////
            let newDiscount = (1 - oo.discountPrice / t[i].input_normal_price) * 100
            $("#newDiscount").html(" = (1 - 打折后[含平台费] / 原价) * 100<br/>\
            = (1 - "+ oo.discountPrice +" / "+ t[i].input_normal_price + ") * 100<br/>\
            = (1 - "+ oo.discountPrice / t[i].input_normal_price + ") * 100<br/>\
            = " + newDiscount)
            /////////////////////////////////////////////////////////////////
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+obj.params.site,
                sql: "update @.table set @.newDiscount=" + newDiscount.toFixed(4) + ",@.min_purchase_limit=" + oo.min_purchase_limit + " where @.fromid=" + t[i].fromid
            })
        }
        $("#state").html("正在更新。。。");
        Tool.ajax.a01(data, this.d04, this)
    },
    d04: function (t) {
        let isErr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.obj.A1++;
            this.d01();
        }
    },
}
fun.a01();