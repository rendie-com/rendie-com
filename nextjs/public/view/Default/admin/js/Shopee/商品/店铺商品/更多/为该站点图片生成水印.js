'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        //obj.params.return        返回URL
        //obj.params.site          站点
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 更多 &gt; 为该站点图片生成水印") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="w250 right">获取站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">1688_属性图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">aliexpress_放大镜图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		    <tr><td class="right">aliexpress_详情图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
		    <tr><td class="right">店铺商品ID：</td><td id="fromid" colspan="2"></td></tr>\
		    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
		    <tr><td class="right">1688商品ID：</td><td id="manualreview_1688_fromid" colspan="2"></td></tr>\
		    <tr><td class="right">（上传前）1688_属性图：</td><td id="attrpicA" colspan="2"></td></tr>\
		    <tr><td class="right">（上传后）1688_属性图：</td><td id="attrpicB" colspan="2"></td></tr>\
		    <tr><td class="right">（上传前）aliexpress_放大镜图：</td><td id="picA" colspan="2"></td></tr>\
		    <tr><td class="right">（上传后）aliexpress_放大镜图：</td><td id="picB" colspan="2"></td></tr>\
		    <tr><td class="right">（上传前）aliexpress_详情图：</td><td id="desPicA" colspan="2"></td></tr>\
		    <tr><td class="right">（上传后）aliexpress_详情图：</td><td id="desPicB" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          <tbody id="tbody"></tbody>\
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
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select " + Tool.fieldAs("fromid,pic,proid") + " FROM @.table order by @.self_uptime desc" + Tool.limit(1, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select count(1) as total FROM @.table",
            })
        }
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[0][0])
    },
    ///////////////////////////////////////////////////////////////
    d01: function (oo) {
        $("#fromid").html('<a href="https://seller.shopee.cn/portal/product/' + oo.fromid + '" target="_blank">' + oo.fromid + '</a>')
        $("#proid").html(oo.proid);
        this.e01(oo)
    },
    /////////////////////////////////////
    e01: function (oo) {
        let dom = {
            manualreview_1688_fromid: $("#manualreview_1688_fromid"),
            attrpicA: $("#attrpicA"),
            attrpicB: $("#attrpicB"),
        }
        Tool.common_attrPic_waterMark.a01(oo.proid, this.obj.seller, obj.params.site, "B", dom, this.e02, this, oo)
    },
    e02: function (oo) {
        let dom = {
            picA: $("#picA"),
            picB: $("#picB"),
            desPicA: $("#desPicA"),
            desPicB: $("#desPicB"),
        }
        Tool.common_desPic_waterMark.a01(oo.proid, this.obj.seller, obj.params.site, "C", "D", dom, this.e03, this)
    },
    e03: function () {
        this.obj.A1++;
        $("#attrpicA,#attrpicB").html("")
        $("#picA,#picB").html("")
        $("#desPicA,#desPicB").html("")
        $("#B1,#C1,#D1").css("width", "0%")
        $("#B1,#B2,#C1,#C2,#D1,#D2,#fromid,#proid,#manualreview_1688_fromid").html("");
        this.a04();
    },
}
fun.a01();