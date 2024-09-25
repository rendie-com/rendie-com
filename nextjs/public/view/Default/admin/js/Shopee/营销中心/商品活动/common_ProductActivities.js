Object.assign(Tool, {
    common_ProductActivities: {
        a01: function (seller, site, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/campaign/v2/list?" + arr.join("&")
            $("#state").html("正在获取活动个数。。。");
            let oo = {
                next: next, This: This, t: t
            }
            this.a02(url, oo);
        },
        a02: function (url, oo) {
            let data = {
                "condition": {
                    "name": "",
                    "view_flag": 1,
                    "campaign_scene": 4,
                    "archived_flag": 0
                },
                "pagination": {
                    "offset": 0,
                    "limit": 10,
                    "sort_type": 7,
                    "total_cnt": 0,
                    "sort_order": 0
                }
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.code == 0) {
                Tool.apply({ A2: t.data.pagination.total_cnt, Aarr: t.data.list }, oo.next, oo.This, oo.t)
            } else {
                Tool.pre(["出错01", t])
            }
        },
        //////////////////////////////////////
        b01: function (oo) {
            let arr = []
            for (let k in oo) {
                arr.push(k)
            }
            return arr;
        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        d01: function (seller, site, campaign_id, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/session/get_session_list_for_sc_v2?" + arr.join("&")
            $("#state").html("正在进入子活动报名页面。。。");
            let oo = {
                next: next, This: This, t: t
            }
            this.d02(url, campaign_id, oo)
        },
        d02: function (url, campaign_id, oo) {
            let data = {
                "campaign_scene": "CAMPAIGN_SCENE_PRODUCT_PROMOTION_CAMPAIGN",
                "page_info": { "offset": 0, "limit": 20 },
                "view_type": 0,
                "mechanic_label_ids": [],
                "sorting": 7,
                "show_available_only": false,
                "campaign_id": "" + campaign_id,
                "recruiting_type": 2
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d03, this, oo)
        },
        d03: function (t, oo) {
            if (t.code == 0) {
                Tool.apply({ B2: t.data.page_info.total_count, Barr: t.data.list }, oo.next, oo.This, oo.t)
            } else {
                Tool.pre(["出错02", t])
            }
        },
        //////下面的可以不要了//////////////////////////////////////////////////
        //e01: function (seller, site, next, This, t) {
        //    let arr = [
        //        "SPC_CDS=" + seller.SPC_CDS,
        //        "SPC_CDS_VER=2",
        //        "cnsc_shop_id=" + seller[site].shopId,
        //        "cbsc_shop_region=" + site,
        //        "cursor=" ,
        //        "limit=200",//提交一次活动最多200个（shopee限制的）
        //        "is_ads=0",
        //        "need_brand=0",
        //        "need_item_model=0",
        //        "sort_by=-sales",
        //        //"search_type=1",
        //        //"search_content=28402383974",
        //    ]
        //    let url = "https://seller.shopee.cn/api/marketing/v4/public/product_selector/?" + arr.join("&")
        //    $("#state").html("正在获取【商品】信息。。。");
        //    let oo = {
        //        next: next, This: This, t: t
        //    }
        //    gg.getFetch(url,"json", this.e02, this, oo);
        //},
        //e02: function (t, oo) {
        //    if (t.code == 0) {
        //        Tool.apply(t.data.item_stock_infos, oo.next, oo.This, oo.t)
        //    } else {
        //        Tool.pre(["出错03", t])
        //    }
        //},
        ///////////////////////////////////
        f01: function (seller, site, session_id, recruiting_entities, next, This, t) {
            let data = {
                "session_id": session_id,
                "preview_no": "",
                "entity_list_data": {
                    "recruiting_entities": recruiting_entities
                },
                "fill_recommend_price": true,
                "operate_start_time": Tool.gettime("")
            }
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/preview/add?" + arr.join("&")
            let oo = {
                next: next, This: This, t: t
            }
            this.f02(url, data, oo)
        },
        f02: function (url, data, oo) {
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在添加商品。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.f03, this, oo)
        },
        f03: function (t, oo) {
            /*
            {
              "code": 0,
              "data": {
                "preview_no": "1797183504226050048",
                "product_failed_num": 0,
                "product_success_num": 3,
                "voucher_failed_num": null,
                "voucher_success_num": null
              },
              "msg": "OK"
            }
            */
            if (t.code == 0) {
                Tool.apply(t.data.preview_no, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["出错04", t])
            }
        },
        ////////////////////////////////////
        g01: function (seller, site, session_id, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/preview/preview_list?" + arr.join("&")
            let oo = {
                next: next, This: This, t: t
            }
            this.g02(url, session_id, oo)
        },
        g02: function (url, session_id, oo) {
            let data = { "session_id": session_id, "entity_type": [2] }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在获取选中的商品。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.g03, this, oo)
        },
        g03: function (t, oo) {
            if (t.code == 0) {
                Tool.apply({
                    arr: t.data.entity_list_data.recruiting_entities,
                    preview_no: t.data.preview_no
                }, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["出错04", t])
            }
        },
        ////////////////////////////
        h01: function (seller, site, data, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/preview/edit?" + arr.join("&")
            let oo = {
                next: next, This: This, t: t
            }
            this.h02(url, data, oo)
        },
        h02: function (url, data, oo) {
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在修改折扣。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.h03, this, oo)
        },
        h03: function (t, oo) {
            /*
            {
              "code": 0,
              "data": {
                "operate_preview_product_result_map": {【出错就有数据】},
                "operate_preview_voucher_result_map": null
              },
              "msg": "OK"
            }
            */
            if (t.code == 0) {
                //每次只修改一条，所以这么写。
                let errObj = {},o1 = t.data.operate_preview_product_result_map
                for (let k in o1) {
                    errObj={
                        fromid: k,
                        model_list: this.b01(o1[k].operate_preview_model_result_map)
                    }
                }
                Tool.apply(errObj,oo.next,oo.This,oo.t)
            }
            else {
                Tool.pre(["出错05", t])
            }
        },
        //////////////////////////////////////////////////
        i01: function (seller, site, session_id, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/preview/submit_entity_online?" + arr.join("&")
            let data = {
                "session_id": session_id,
                "entity_type": 2,
                "confirm_risky": false
            }
            let oo = {
                next: next, This: This, t: t
            }
            this.i02(url, data, oo)
        },
        i02: function (url, data, oo) {
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在提交。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.i03, this, oo)
        },
        i03: function (t, oo) {
            /*
            {
              "code": 0,
              "data": {
                "is_async": null,
                "product_result": {
                  "failed_item_num": 0,
                  "failed_list_url": null,
                  "failed_model_num": 0,
                  "risky_model_num": 0,
                  "success_item_num": 2,
                  "success_model_num": 10
                },
                "task": null,
                "voucher_result": null
              },
              "msg": "success"
            }
            */
            if (t.code == 0) {
                oo.next.apply(oo.This, [oo.t]);
            }
            else {
                Tool.pre(["出错05", t])
            }
        },
        j01: function (seller, site, data, next, This, t) {
            let arr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/mkt/cmt/preview/delete?" + arr.join("&")
            let oo = {
                next: next, This: This, t: t
            }
            this.j02(url, data, oo)
        },
        j02: function (url, data, oo) {
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在删除【尚未提交】商品。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.j03, this, oo)
        },
        j03: function (t, oo) {
            /*
            {
              "code": 0,
              "data": null,
              "msg": null
            }
            */
            if (t.code == 0) {
                oo.next.apply(oo.This, [oo.t]);
            }
            else {
                Tool.pre(["出错06", t])
            }
        },
    }
})