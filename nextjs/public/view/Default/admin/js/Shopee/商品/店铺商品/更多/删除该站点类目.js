'use strict';
var fun =
{
    obj:
    {
        seller: {},
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 店铺商品 &gt;  更多 &gt; 删除该站点类目") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">获取站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
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
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/shopcategory/v4/category/get_collection_draft_list/?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取shopee空类目。。。");
        gg.getFetch(url,"json", this.a05, this);
    },
    a05: function (oo) {
        if (oo.message == "success") {
            let arr = oo.data.draft_list
            if (arr) {
                let nArr = []
                for (let i = 0; i < arr.length; i++) {
                    nArr.push(arr[i].id);
                }
                this.a06(nArr)
            }
            else {
                this.d01();
            }
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    a06: function (nArr) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5],
        ]
        let url = "https://seller.shopee.cn/api/shopcategory/v4/category/delete_collection_draft/?" + arr.join("&")
        $("#url").html(url + '【post】');
        $("#state").html("正在删除shopee空类目。。。");
        let data = { "ids": nArr }
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a07, this)
    },
    a07: function (oo) {
        if (oo.message == "success") {
            this.d01()
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    /////////////////////////////////////////////////////////////////////////
    d01: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5],
            "need_parent_shop_category=true"
        ]
        let url = "https://seller.shopee.cn/api/shopcategory/v4/category/get_collection_list/?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取shopee类目。。。");
        gg.getFetch(url,"json", this.d02, this);
    },
    d02: function (oo) {
        if (oo.message == "success") {
            let arr = oo.data.list
            if (arr.length == 0) {
                this.e01()
            }
            else {
                let nArr = []
                for (let i = 0; i < arr.length; i++) {
                    nArr.push(arr[i].id);
                }
                this.d03(nArr)
            }
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d03: function (nArr) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5],
        ]
        let url = "https://seller.shopee.cn/api/shopcategory/v4/category/batch_delete_category/?" + arr.join("&")
        $("#url").html(url + '【post】');
        $("#state").html("正在删除shopee有商品的类目。。。");
        let data = {
            "shop_category_ids": nArr
        }
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d04, this)
    },
    d04: function (oo) {
        if (oo.message == "success") {
            this.e01()
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    ////////////////////////
    e01: function () {
        $("#state").html("全部完成。。。");
    },
}
fun.a01();