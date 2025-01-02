'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        //obj.params.site       站点
        //obj.params.price
        obj.params.price = obj.params.price ? obj.params.price : "-_-20";//新折扣类型
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 定价 &gt; 删除新折扣") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">条件：</td><td colspan="2">'+ this.b01(obj.params.price) + '</td></tr>\
		    <tr><td class="right w150">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
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
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select @.fromid as fromid FROM @.table where @.newDiscount" + this.b02(obj.params.price) + " limit 10",
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select count(1) as total FROM @.table where @.newDiscount" + this.b02(obj.params.price),
            })
        }
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 10); }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[0])
    },
    b01: function (val) {
        let str = "未知：" + val;
        switch (val) {
            case "-3": str = "删除【新折扣&gt;=80】"; break;
            case "-4": str = "删除【新折扣&lt;=8】"; break;
        }
        return str;
    },
    b02: function (val) {
        let str = "未知：" + val;
        switch (val) {
            case "-3": str = ">=80"; break;
            case "-4": str = "<=8"; break;
        }
        return str;
    },

    /////////////////////////////////////    
    d01: function (t) {
        let arr = []
        for (let i = 0; i < t.length; i++) {
            arr.push(t[i].fromid)
        }
        let nArr = { product_id_list: arr }
        let pArr = [
            "version=3.1.0",
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/v3/product/delete_product/?" + pArr.join("&")
        $("#url").html(url + '【post】');
        $("#state").html("正在删除shopee商品。。。");
        gg.postFetch(url, JSON.stringify(nArr), this.d02, this)
    },
    d02: function (oo) {
        if (oo.code == 0) {
            $("#state").html("正在删除本地商品。。。");
            this.d03(oo.data.result)
        }
        else if (oo.code == 1000105005) {
            //无法删除项目：锁定：｛项目ID:24882549804，[锁定ID:51，消息：MPSKU有促销，无法删除MPSKU]｝
            this.d03(oo.data.result)
        }
        else {
            Tool.pre(["出错：", oo])
        }
    },
    d03: function (arr) {
        let fromidArr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].code == 0) {
                fromidArr.push(arr[i].id)
            }
        }
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "delete from @.table where @.fromId in (" + fromidArr.join(",") + ")",
        }]
        Tool.ajax.a01(data, this.d04, this);
    },
    d04: function (t) {
        if (t[0].length == 0) {
            $("#state").html("这一页下架完成。。。");
            this.obj.A1++;
            this.a04()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();