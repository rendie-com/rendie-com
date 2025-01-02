'use strict';
var fun =
{
    obj:
    {
        A1: 1, Aarr: ["tw", "my", "br"],
        B1: 1, B2: 0,
        C1: 1, C2: 0, Carr: [],
        seller: {},
    },
    a01: function () {
        //obj.params.return         返回URL 
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 违规或删除 &gt; 获取【搜索排名降低】的商品") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">站点进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">商品条进进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
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
        this.obj.seller = t
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.Aarr.length, this.a05, this)
    },
    a05: function () {
        let site = this.obj.Aarr[this.obj.A1 - 1]
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "page_number=" + this.obj.B1,
            "page_size=12",
            "list_type=deboosted",
            "count_list_types=sold_out,banned,deboosted,deleted,unlisted,reviewing,unpublished",
            "cnsc_shop_id=" + this.obj.seller[site].shopId,
            "cbsc_shop_region=" + site
        ]
        let url = "https://seller.shopee.cn/api/v3/mpsku/list/search_deboosted_product_list?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.B1 + "页商品。。。");
        gg.getFetch(url,"json", this.a06, this);
    },
    a06: function (oo) {
        if (oo.code == 0) {
            if (!oo.data.page_info.page_size) oo.data.page_info.page_size = 1;//说明：这里这么写，是因为，没有测式数据，不知道下一页是什么样子。
            this.obj.B2 = Math.ceil(oo.data.page_info.total / oo.data.page_info.page_size)
            if (oo.data.products) {
                this.obj.Carr = oo.data.products
                this.obj.C2 = oo.data.products.length;
            }
            this.d01()
        }
        else if (oo.code == 429) {
            $("#state").html("请不要要求太频繁");
            //Tool.Time("1" 500,,this.a07, this,);
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    /////////////////////////////////
    b01: function (id, oo) {
        let proid = "'【proid】丢失'"
        if (oo.fromid == id) {
            proid = "'" + oo.proid + "'"
        }
        return proid;
    },
    ///////////////////////////////////
    d01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.e02)
    },
    d02: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d03, this, this.e01)
    },
    d03: function () {
        let data = [], products = this.obj.Carr[this.obj.C1 - 1];
        if (products.deboosted_infos.reasons) {
            //将shopee给的类目ID,翻译成中文.
            let arr1 = products.deboosted_infos.reasons[0].suggested_category_path;//shoppe要我绑定这个类目。
            for (let i = 0; i < arr1.length; i++) {
                data.push({
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select @.name as name FROM @.table where @.fromid=" + arr1[i],
                })
            }
        }
        else {
            products.deboosted_infos.reasons = [
                {
                    explanation: "",//建议
                    hint_message: "",
                    deboost_type: "5",//违规类型
                    description: "",//违规原因
                }
            ]
        }
        this.d04(data, products)
    },
    d04: function (data1, products) {
        let site = this.obj.Aarr[this.obj.A1 - 1]
        let data2 = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + site,
            sql: "select " + Tool.fieldAs("fromid,proid") + " FROM @.table where @.fromid=" + products.id,
        },
        {
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "select 1 from @.table where @.site='" + site + "' and @.productId=" + products.id,
        }].concat(data1)
        Tool.ajax.a01(data2, this.d05, this, products)
    },
    d05: function (t, products) {
        let category_path = [];
        for (let i = 2; i < t.length; i++) {
            category_path.push(t[i][0].name)
        }
        let explanation = Tool.rpsql(products.deboosted_infos.reasons[0].explanation + "<hr/>" + products.deboosted_infos.reasons[0].hint_message + " " + category_path.join(" &gt; "));
        this.d06(t, products, explanation)
    },
    d06: function (t, products, explanation) {
        let proid = this.b01(products.id, t[0][0])
        if (proid == "'【proid】丢失'") {
            Tool.pre(proid)
        }
        else {
            let site = this.obj.Aarr[this.obj.A1 - 1]
            let arrL = [
                "@.productId",//商品ID
                "@.proid",//商品编码
                "@.name",//商品名称
                "@.status",//商品状态
                "@.pic",//图片
                "@.addtime",//添加时间
                "@.uptime",//修改时间
                "@.banned_time",//违规时间
                "@.penalty_type",//违规类型
                "@.description",//违规原因
                "@.explanation",//建议
                "@.site"//站点
            ]
            let arrR = [
                products.id,//商品ID
                proid,//商品编码
                Tool.rpsql(products.name),//商品名称
                products.status,//商品状态
                Tool.rpsql(products.cover_image),//图片
                products.create_time,//添加时间
                products.modify_time,//修改时间
                products.deboosted_infos.deboosted_time,//违规时间
                products.deboosted_infos.reasons[0].deboost_type,//违规类型
                Tool.rpsql(products.deboosted_infos.reasons[0].description),//违规原因
                explanation,//建议
                "'" + site + "'"//站点
            ];
            let sql = ""
            if (t[1].length == 0) {
                sql = "insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")"

            }
            else {
                sql = "update @.table set @.penalty_type=" + products.deboosted_infos.reasons[0].deboost_type + ",@.explanation=" + explanation + ",@.proid=" + proid + " where @.site='" + site + "' and @.productId=" + products.id
            }
            let data = [{
                action: "sqlite",
                database: "shopee/商品/违规或删除",
                sql: sql,
            }]
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01(data, this.d07, this)
        }
    },
    d07: function (t) {
        if (t[0].length == 0) {
            this.obj.C1++
            this.d02()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    //////////////////////////////////////
    e01: function () {
        this.obj.C1 = 1; this.obj.C2 = 0; this.obj.Carr = [];
        $("#C1").css("width", "0%"); $("#C1,#C2").html("");
        this.obj.B1++;
        $("#state").html("正在进入第" + this.obj.B1 + "页。。。");
        this.d01();
    },
    e02: function () {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();