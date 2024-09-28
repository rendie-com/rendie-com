'use strict';
var fun =
{
    obj: {
        A1: 1,
        A2: 0,
        config: {},
        logistics: [],
    },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 更多 &gt; 选出要修改价格的商品') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
            <tr><td class="right w150">说明：</td><td colspan="2">定价错误的，设置【价格更新时间为1】，否则为0。</td></tr>\
            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">1688详情ID：</td><td id="_1688_fromid" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:shopPro_'+ obj.arr[5] + ' size=10 db="sqlite.shopee" page=2>,\
	    {\
		    "fromid":<:fromid/>,\
		    "_1688_fromid":<:_1688_fromid/>,\
            <r:prodes db="sqlite.1688_prodes/<:_1688_fromid Fun=ProidNum(+$1,99)/>" size=1 where=" where @.fromid=<:_1688_fromid/>">\
                "sku":<:sku tag=0/>,\
            </r:prodes>\
	    }\
        </r:shopPro_'+ obj.arr[5] + '>]'
        //update rd_shopPro_my set rd_price_uptime=0 where rd_price_uptime=1
        //update rd_shopPro_br set rd_price_uptime=0 where rd_price_uptime=1
        Tool.at("要个功能要重做")
        //Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    //a03: function (t) {
    //    if (this.obj.A2 == 0) { this.obj.A2 = t[0]; }
    //    t.shift();
    //    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t)
    //},
    //a04: function (t) {
    //    let updateArr = [];
    //    for (let i = 0; i < t.length; i++) {
    //        $("#_1688_fromid").html('<a href="https://detail.1688.com/offer/' + t[i]._1688_fromid + '.html" target="_blank">' + t[i]._1688_fromid + '</a>')
    //        if (t[i].sku.startAmount > 1) {
    //            updateArr.push("update @.shopPro_" + obj.arr[5] + " set @.price_uptime=1 where @.fromid=" + t[i].fromid)
    //        }
    //    }
    //    if (updateArr.length == 0) {
    //        this.a05("ok")
    //    }
    //    else {
    //        let txt = '"ok"<r: db="sqlite.shopee">' + updateArr.join("<1/>") + '</r:>'
    //        $("#state").html("正在更新。。。");
    //        Tool.ajax.a01(txt, 1, this.a05, this)
    //    }
    //},
    //a05: function (t) {
    //    if (t == "ok") {
    //        this.obj.A1++;
    //        this.a02();
    //    }
    //    else {
    //        Tool.pre(["出错", t])
    //    }
    //},
}
fun.a01();