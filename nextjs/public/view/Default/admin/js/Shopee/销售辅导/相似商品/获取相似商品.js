var fun =
{
    obj:
    {
        A1: 1, A2: 0, Barr: [],
        seller: {},//提交要用
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header('Shopee &gt; 销售辅导 &gt; 相似商品 &gt; 获取相似商品') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">相似商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
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
        this.a04()
    },
    a04: function () {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "sort_by=unit_sold.desc",
            "cat_id=",
            "keyword=",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/mydata/cnsc/shop/v2/seller-coach/similar-product/item/?" + pArr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开商品列表。。。");
        //说明1：这个在shopee好像不能翻页。
        //说明2：只显示已上架的商品。
        gg.getFetch(url,"json", this.a05, this)
    },
    a05: function (t) {
        if (t.msg == "ok") {
            this.obj.A2 = t.result.total;
            this.obj.Aarr = t.result.items;
            this.d01()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    ///////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this, null);
    },
    d02: function () {
        let oo = this.obj.Aarr[this.obj.A1 - 1];
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "itemid=" + oo.item_id,
            "l2catid=" + oo.l2_cat_id,
            "l3catid=" + oo.l3_cat_id,
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/mydata/cnsc/shop/v2/seller-coach/seller-competing-products/?" + pArr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开相似商品列表。。。");
        gg.getFetch(url,"json", this.d03, this)
    },
    d03: function (t) {
        if (t.msg == "ok") {
            this.d04(t.result)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d03: function (t) {
        let oo = this.obj.Aarr[this.obj.A1 - 1]
        let arrL = [
            "@.site",
            "@.l1_cat_id",
            "@.l2_cat_id",
            "@.l3_cat_id",
            "@.item_id",
            "@.min_price",
            "@.max_price",
            "@.price",
            "@.image",
            "@.title",
            "@.status",
            "@.similarProduct",
        ]
        let arrR = [
            "'" + obj.arr[5] + "'",
            oo.l1_cat_id,
            oo.l2_cat_id,
            oo.l3_cat_id,
            oo.item_id,
            oo.min_price,
            oo.max_price,
            oo.price,
            "'" + oo.image + "'",
            Tool.rpsql(oo.title),
            oo.status,
            Tool.rpsql(JSON.stringify(t)),
        ];
        let insert = '<r: db="sqlite.shopee">insert into @.similarProduct(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>'
        let updateArr = []; for (let i = 0; i < arrL.length; i++) { updateArr.push(arrL[i] + "=" + arrR[i]); }
        let update = '<r: db="sqlite.shopee">update @.similarProduct set ' + updateArr.join(",") + ' where @.item_id=' + oo.item_id + '</r:>'
        let select = 'Fun(Db(sqlite.shopee,select count(1) from @.similarProduct where @.item_id=' + oo.item_id + ',count))'
        let str = '<if ' + select + '==0>' + insert + '<else/>' + update + '</if>'
        Tool.ajax.a01('"ok"' + str, 1, this.d04, this);
    },
    d04: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错333", t])
        }
    },
}
fun.a01();