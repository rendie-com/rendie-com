'use strict';
Object.assign(Tool, {
    common_create_NewArrival_category:
    {
        obj: {
            tw: {
                name: "🍃新品上市",//新品上市
            },
            my: {
                name: "🍃New product",//新品上市
            },
            br: {
                name: "🍃Lançamento de novo produto",//新品上市
            }
        },
        a01: function (seller, site, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t,
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/create_collection_draft/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在创建shopee类目。。。");
            let data = {
                name: this.obj[oo.site].name//新品上市
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
                //{
                //    "name": "Origin",
                //    "value": 'https://seller.shopee.cn'
                //},
                //{
                //    "name": "Referer",
                //    "value": 'https://seller.shopee.cn/portal/category?cnsc_shop_id=911626103'
                //},
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            /*
            {
              "code": 0,
              "message": "success",
              "data": {
                "draft_id": 46731
              }
            }
            */
            if (t.message == "success") {
                this.a04(t.data.draft_id, oo);
            }
            else {
                Tool.pre(["出错03", t])
            }
        },
        a04: function (draft_id, oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/create_parent_or_sub_category/?" + arr.join("&")
            $("#url").html(url + '【post】');
            let data = {
                "independent_shop_category": {
                    "name": this.obj[oo.site].name,//新品上市
                    "collection_type": "rule_base",
                    "to_delete_draft_id": draft_id,
                    "cover_image": "",
                    "collection_rule": {
                        "brand_ids": [],
                        "filter_created_days": 21,
                        "filter_with_discount": 0
                    }
                }
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            $("#state").html("正在添加商品。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a05, this, oo)
        },
        a05: function (t, oo) {
            /*
            {
              "code": 0,
              "message": "success",
              "data": {
                "parent_shop_category_id": 252001034
              }
            }
           */
            if (t.message == "success") {
                this.a06(t.data.parent_shop_category_id, oo);
            }
            else {
                Tool.pre(["出错01", t])
            }
        },
        a06: function (parent_shop_category_id, oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/update_category/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在启用shopee子类目。。。");
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            let data = { "shop_category_id": parent_shop_category_id, "status": "active" }
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a07, this, oo)
        },
        a07: function (t, oo) {
            if (t.message = "message") {
                $("#state").html("新品完成。");
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["出错02", t])
            }
        },
    }
})