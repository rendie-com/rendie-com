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
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 活动 &gt; 选出能做活动的商品') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
            <tr><td class="right w150">说明：</td><td colspan="2">定价与原价相同，且不需要改价，则可以打折，否则不可以。</td></tr>\
            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
            <tr><td class="right">物流方式：</td><td id="logistics" colspan="2"></td></tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">计算方式：</td><td id="method" colspan="2"></td></tr>\
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
    d01: function () {
        //where=" where @.proid=\'R222657\'"
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/"+ obj.params.site,
            sql: "select " + Tool.fieldAs("fromid,price_uptime,unitweight,scale,newdiscount,minimumorder,_1688_maxprice,_1688_freight,input_normal_price") + " FROM @.table" + Tool.limit(10, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "select count(1) as total FROM @.table",
            })
        }
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 10); }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, t[0])
    },
    d03: function (t) {
        let data = [], day7 = Tool.gettime("") - 60 * 60 * 24 * 7;
        for (let i = 0; i < t.length; i++) {
            let discount1 = Tool.profitRate.a01(t[i].newdiscount - 6, t[i].input_normal_price, t[i].scale, t[i].minimumorder, t[i]._1688_maxprice, t[i]._1688_freight, t[i].unitweight, this.obj.logistics, this.obj.config[obj.params.site], 1);
            let discount2 = Tool.profitRate.a01(t[i].newdiscount - 1, t[i].input_normal_price, t[i].scale, t[i].minimumorder, t[i]._1688_maxprice, t[i]._1688_freight, t[i].unitweight, this.obj.logistics, this.obj.config[obj.params.site], 1);
            let discount3 = Tool.profitRate.a01(t[i].newdiscount, t[i].input_normal_price, t[i].scale, t[i].minimumorder, t[i]._1688_maxprice, t[i]._1688_freight, t[i].unitweight, this.obj.logistics, this.obj.config[obj.params.site], 1);
            let isDiscount = discount1.profitRate >= 10 && t[i].price_uptime < day7 ? 1 : 0//改过价的不能打折，否则提示：【此页面上的11个规格在过去的7天内曾调涨价格。这将违反不实/误导性折扣政策，您将因此而被计分】
            let isSignUp = discount2.profitRate >= 10 && t[i].price_uptime < day7 ? 1 : 0
            let isSeckill = discount3.profitRate >= 10 && t[i].price_uptime < day7 ? 1 : 0
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "update @.table set @.isDiscount=" + isDiscount + ",@.isSignUp=" + isSignUp + ",@.isSeckill=" + isSeckill + " where @.fromid=" + t[i].fromid
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
//let oo = Tool.fixedPrice.a01(t[i]._1688_maxprice,
//    t[i].scale,
//    t[i]._1688_minimumorder,
//    t[i]._1688_freight,
//    this.obj.config[obj.params.site],
//    t[i].unitweight,
//    this.obj.logistics,
//    t[i].newdiscount)
//$("#method").html("指定折扣 = " + oo.str.split("\n").join("<br/>"))
//let isDiscount = 0;
////定价正确且不需要改价，就可以打折
//if (oo.price == t[i].input_normal_price && t[i].price_uptime == 0) {
//    isDiscount = 1;
//}