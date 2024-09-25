'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 2, Aarr: [
            "banned",//已禁卖
            "deleted",//Shopee删除
        ],
        B1: 1, B2: 0,
        site: "",//站点
        seller: {},
    },
    a01: function () {
        //obj.params.return         返回URL  
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 违规或删除 &gt; 获取【违规或删除】信息") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                <tr><td class="right">站点：</td><td>'+ this.b01() + '</td><td></td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">类进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null)
    },
    /////////////////////////////////
    b01: function () {
        return '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择获取的站点</option>\
            <option value="tw">台湾虾皮</option>\
            <option value="my">马来西亚</option>\
            <option value="br">巴西</option>\
        </select>';
    },
    b02: function (id, arr) {
        let proid = "'【proid】丢失'"
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fromid == id) {
                proid = "'" + arr[i].proid + "'"
                break;
            }
        }
        return proid;
    },
    b03: function (id, arr) {
        let isNull = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].productId == id) {
                isNull = false;
                break;
            }
        }
        return isNull;
    },
    /////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.site = val;
        this.a02();
    },
    /////////////////////////////////
    d01: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "page_number=" + this.obj.B1,
            "page_size=12",
            "list_type=" + this.obj.Aarr[this.obj.A1 - 1],
            "count_list_types=sold_out,banned,deboosted,deleted,unlisted,reviewing,unpublished",
            "cnsc_shop_id=" + this.obj.seller[this.obj.site].shopId,
            "cbsc_shop_region=" + this.obj.site
        ]
        let url = "https://seller.shopee.cn/api/v3/mpsku/list/"
        url += "get_banned_product_list"
        url += "?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.A1 + "页商品。。。");
        gg.getFetch(url,"json", this.d02, this);
    },
    d02: function (oo) {
        if (oo.code == 0) {
            this.obj.B2 = Math.ceil(oo.data.page_info.total / oo.data.page_info.page_size)
            this.d03(oo.data.products)
        }
        else if (oo.code == 429) {
            $("#state").html("请不要要求太频繁");
            //Tool.Time("1" 500,,this.a07, this,);
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d03: function (products) {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d04, this, this.e01, products)
    },
    d04: function (products) {
        let arr = []
        for (let i = 0; i < products.length; i++) {
            arr.push(products[i].id);
        }
        //为什么是12？答：因为在获取时要的是12条。
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + this.obj.site,
            sql: "select @.fromid as fromid, @.proid as proid from @.table where @.fromid in(" + arr.join(",") + ")",
        }, {
            action: "sqlite",
            database: "shopee/商品/违规或删除",
            sql: "select @.productId from @.table where @.productId in(" + arr.join(",") + ")",
        }]
        $("#state").html("获取【proid】和查询id是否存在。");
        Tool.ajax.a01(data, this.d05, this, products)
    },
    d05: function (t, products) {
        let data = [];
        for (let i = 0; i < products.length; i++) {
            let proid = this.b02(products[i].id, t[0])
            if(proid=="'【proid】丢失'"){
                //放商商品那边删除用的
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/"+ this.obj.site ,
                    sql: "insert into @.table(@.fromid,@.proid)values(" + products[i].id + "," + proid + ")",
                })
            }
            if (this.b03(products[i].id, t[1])) {
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/违规或删除",
                    sql: "insert into @.table(@.productId,@.proid,@.name,@.status,@.pic,@.addtime,@.uptime,@.banned_time,@.penalty_type,@.description,@.explanation,@.site)values(" + products[i].id + "," + proid + "," + Tool.rpsql(products[i].name) + "," + products[i].status + "," + Tool.rpsql(products[i].cover_image) + "," + products[i].create_time + "," + products[i].modify_time + "," + products[i].banned_info.banned_time + "," + products[i].banned_info.reasons[0].penalty_type + "," + Tool.rpsql(products[i].banned_info.reasons[0].description) + "," + Tool.rpsql(products[i].banned_info.reasons[0].explanation) + ",'" + this.obj.site + "')",
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/违规或删除",
                    sql: "update @.table set @.proid=" + proid + " where @.productId=" + products[i].id,
                })
            }

        }
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.d06, this)
    },
    d06: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.B1++;
            $("#state").html("正在进入第" + this.obj.B1 + "页。。。");
            this.d01()
        }
    },
    //////////////////////////////
    e01: function (t) {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();