'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 为该站点首图生成关键词水印") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="w250 right">获取站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">店铺商品ID：</td><td id="fromid" colspan="2"></td></tr>\
		    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
		    <tr><td class="right">（上传前）首图：</td><td id="pic1A" colspan="2"></td></tr>\
		    <tr><td class="right">（上传后）首图：</td><td id="pic1B" colspan="2"></td></tr>\
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
        //@.ispic1watermark=0      表示【没有生成首图水印】
        let data = [{
            action: "sqlite",
            ///////////修复数数要用下面的代码//////////////////////////////////////////
            // database: "shopee_img",
            // sql: "update @.pic1 set @." +  obj.params.site + "_watermark=null",
            // database: "shopee/商品/店铺商品/" + obj.params.site,
            // sql: "update @.table set @.ispic1watermark=0",
            ////////////////////////////////////////////////////
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select " + Tool.fieldAs("fromid,ispic1watermark,proid") + " FROM @.table" + Tool.limit(1, this.obj.A1, "sqlite"),
            list: [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select " + Tool.fieldAs("pic," + obj.params.site + "_ads_key") + " FROM @.table where @.proid='${proid}' limit 1",
            }]
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
        if (oo.ispic1watermark == 0) {
            this.d02(oo)
        }
        else {
            this.d03();
        }
    },
    d02: function (oo) {
        let key = oo.list[0][0][obj.params.site + "_ads_key"]
        if (key) {
            let dom = {
                pic1A: $("#pic1A"),
                pic1B: $("#pic1B"),
            }
            Tool.common_pic1_waterMark.a01(oo.proid, oo.list[0][0].pic, key, this.obj.seller, obj.params.site, dom, this.d03, this, oo)
        }
        else if (key == null) {
            //Tool.pre(["还没有关键词,请在搜索广告中添加【主推关键词】", oo])
            this.d03()
        }
        else {
            let str = "下架的商品，不能创建【搜索广告】,所以终止。" + key;
            $("#state").html(str);
            //Tool.at(str)
        }
    },
    d03: function () {
        this.obj.A1++;
        $("#pic1A,#pic1B").html("")
        this.a04();
    },
}
fun.a01();

// let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : '') + '\
// <r:shopPro_'+ obj.params.site + ' size=1 db="sqlite.shopee" page=2 where=" where @.status=1">,\
// {\
//     <r:ads size=1 db="sqlite.shopee" where=" where @.productID=<:fromid/> and @.editStatus<3 and @.site=\''+ obj.params.site + '\' and @.product_placement=\'all\' and not(@.state=\'deleted\' or @.state=\'closed\')">\
//         "isTrue":true,\
//     </r:ads>\
// }\
// </r:shopPro_'+ obj.params.site + '>]'