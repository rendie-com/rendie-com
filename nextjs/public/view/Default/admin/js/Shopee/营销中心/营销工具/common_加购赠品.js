'use strict';
Object.assign(Tool, {
    PurchaseAdditionalGifts://加购赠品
    {
        a01: function (B1, arr, start_time, end_time, seller, site, next, This, t) {
            let oo = {
                B1: B1,
                arr: arr,
                start_time: start_time,
                end_time: end_time,
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/?" + arr.join("&")
            let timeStr = Tool.userDate13(oo.start_time * 1000, "/").substr(5) + " - " + Tool.userDate13(oo.end_time * 1000 + 1000, "/").substr(5)
            let data = {
                "add_on_deal_name": "【" + oo.B1 + "】加购赠品 —— " + timeStr,
                "sub_type": 1,//促销类型 0:加购折扣     1:赠品满最低消费
                "start_time": oo.start_time,
                "end_time": oo.end_time,
                "per_gift_num": 1,//获得 1 赠品
                "purchase_min_spend": 120//赠品规则:消费 RM120.00 以获得 1 赠品
            }
            gg.postFetch(url, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            /*
           {
              "code": 0,
              "message": "success",
              "data": {
                "add_on_deal_id": 201389536248102,
                "add_on_deal_name": "【1】加购赠品 —— 06/03 - 07/03",
                "start_time": 1717344000,
                "end_time": 1719935999,
                "create_time": 1717320706,
                "sub_item_limit": 1,
                "sub_item_priority": [],
                "sub_type": 1,
                "purchase_min_spend": "120.00",
                "per_gift_num": 1,
                "source": 1,
                "status": 1
              }
            }
            */
            if (t.message == "success") {
                oo.add_on_deal_id = t.data.add_on_deal_id
                this.a04(oo);
            }
            else {
                Tool.pre(["出错001", oo])
            }
        },
        a04: function (oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/main_item_list/?" + pArr.join("&");
            let main_item_list = []
            for (let i = 0; i < oo.arr.length; i++) {
                main_item_list.push({
                    "item_id": oo.arr[i],
                    "status": 1
                })
            }
            let data = {
                add_on_deal_id: oo.add_on_deal_id,
                main_item_list: main_item_list
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在添加主商品。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a05, this, oo)
        },
        a05: function (t, oo) {
            if (t.code == 0) {
                $("#state").html("主商品添加成功，准备去添加加购商品。。。");
                this.d01(oo)
            }
            else {
                Tool.pre(["主商品添加失败", oo]);
            }
        },
        /////////////////////////////////////////////////
        d01: function (oo) {
            //最多100个,因为我最多只能上架100条。
            //为什么是150条？答：要去掉主商品。
            //为什么【@.MinimumOrder=1】？答：因为只送一个。
            let str = '[0\
            <r:shopPro_' + obj.arr[5] + ' db="sqlite.shopee" size=150 where=" where @.status=1 and @.MinimumOrder=1 order by @._1688_saleNum desc">,\
                <:fromid/>\
            </r:shopPro_' + obj.arr[5] + '>]'
            $("#state").html("正在获取加购商品。。。");
            Tool.ajax.a01(str, 1, this.d02, this, oo);
        },
        d02: function (t, oo) {
            let nArr = []
            for (let i = 1; i < t.length; i++) {
                if (oo.arr.indexOf(t[i]) == -1 && nArr.length < 100) {
                    nArr.push(t[i]);
                }
            }
            let data = {
                "shop_id": oo.seller[oo.site].shopId,
                "product_id_list": nArr
            }
            //R703510
            //Tool.pre(data)
            //this.d03(data, oo)
        },
        //d03: function (data, oo) {
        //    let pArr = [
        //        "SPC_CDS=" + oo.seller.SPC_CDS,
        //        "SPC_CDS_VER=2",
        //        "cnsc_shop_id=" + oo.seller[oo.site].shopId,
        //        "cbsc_shop_region=" + obj.arr[5]
        //    ]
        //    let url = "https://seller.shopee.cn/api/marketing/v4/common/get_product_info_list/?" + pArr.join("&");
        //    let headers = [
        //        {
        //            "name": "Content-Type",
        //            "value": 'application/json;charset=UTF-8'
        //        },
        //    ]
        //    $("#state").html("正在获取加购商品信息。。。");
        //    gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d04, this, oo)
        //},
        //d04: function (t, oo) {
        //    if (t.error_msg == "success") {
        //        this.d05(t.data.product_info_list, oo)
        //    }
        //    else {
        //        Tool.pre(["出错002", t])
        //    }
        //},
        //d05: function (arr, oo) {
        //    let sub_item_list = []
        //    for (let i = 0; i < arr.length; i++) {
        //        for (let j = 0; j < arr[i].model_list.length; j++) {
        //            let price = parseFloat((arr[i].model_list[j].input_origin_price * (1 - 40 * 0.01) - 0.01).toFixed(2))//40%的折扣
        //            sub_item_list.push({
        //                "item_id": arr[i].model_list[j].item_id,
        //                "model_id": arr[i].model_list[j].model_id,
        //                "status": 1,
        //                "sub_item_limit": 100,
        //                "sub_item_input_price": price
        //            })
        //        }
        //    }
        //    let data = {
        //        "add_on_deal_id": oo.add_on_deal_id,
        //        "sub_item_list": sub_item_list,
        //        "create_type": 0
        //    }
        //    this.d06(data, oo)
        //},
        //d06: function (data, oo) {
        //    let pArr = [
        //        "SPC_CDS=" + oo.seller.SPC_CDS,
        //        "SPC_CDS_VER=2",
        //        "cnsc_shop_id=" + oo.seller[oo.site].shopId,
        //        "cbsc_shop_region=" + oo.site
        //    ]
        //    let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/sub_item_list/?" + pArr.join("&");
        //    let headers = [
        //        {
        //            "name": "Content-Type",
        //            "value": 'application/json;charset=UTF-8'
        //        },
        //        //{
        //        //    "name": "Origin",
        //        //    "value": 'https://seller.shopee.cn'
        //        //},
        //        //{
        //        //    "name": "Referer",
        //        //    "value": 'https://seller.shopee.cn/portal/marketing/add-on-deal/' + oo.add_on_deal_id + '?cnsc_shop_id=' + oo.seller[oo.site].shopId
        //        //},
        //    ]
        //    //说明：必须加【Origin，Referer】，否则到后面就保存不了了。
        //    $("#state").html("正在保存加购商品。。。");
        //    gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d07, this, oo)
        //},
        //d07: function (t, oo) {
        //    $("#state").html("保存加购出来了。");
        //    if (t.message == "success") {
        //        oo.next.apply(oo.This, [oo.t]);
        //    }
        //    else if (t.code == 500) {
        //        oo.next.apply(oo.This, [oo.t]);
        //    }
        //    else if (t.code == 0) {
        //        $("#state").html("延时5秒，再继续。");
        //        Tool.Time("name", 5000, this.d01, this, oo);
        //    }
        //    else {
        //        Tool.pre(["出错003", t])
        //    }
        //},
    }
});