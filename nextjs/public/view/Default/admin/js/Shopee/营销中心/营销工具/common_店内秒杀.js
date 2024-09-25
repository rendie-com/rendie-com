'use strict';
Object.assign(Tool, {
    createFlashSale://创建新的店内秒杀。
    {
        obj: {
            tw: {
                size: 20//剩余限额： 20
            },
            my: {
                size: 10//剩余限额： 10
            },
            br: {
                size: 20//剩余限额： 20
            }
        },
        a01: function (seller, site, Aarr, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                Aarr: Aarr,
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
            let url = "https://seller.shopee.cn/api/marketing/v4/shop_flash_sale/set/?" + arr.join("&")
            let data = {
                time_slot_id: oo.Aarr.timeslot_id
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            $("#state").html("正在创建活动。。。");
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            /*
            {
              "code": 0,
              "message": "success",
              "data": {
                "ctime": 0,
                "enabled_item_count": 0,
                "end_time": 1717030799,
                "flash_sale_id": 12662545387520,
                "item_count": 0,
                "mtime": 0,
                "start_time": 1716998400,
                "status": 1,
                "timeslot_id": 5710121598976,
                "type": 1
              }
            }
            */
            if (t.code == 0) {
                $("#state").html("活动创建成功，准备去添加商品。。。");
                oo.Aarr.flash_sale_id = t.data.flash_sale_id
                this.d01(oo)
            }
            else {
                Tool.pre(["活动创建失败", t]);
            }
        },
        ////////////////////////////////
        b01: function (itemId, price, arr) {
            let oo = {};
            for (let i = 0; i < arr.length; i++) {
                if (itemId == arr[i].fromid) {
                    oo = {
                        price: Tool.fomatFloat(price * (1 - arr[i].newDiscount / 100) - 0.01, 2),
                        MinimumOrder: arr[i].MinimumOrder//最低购买量
                    }
                    break;
                }
            }
            return oo;
        },
        b02: function (o1, o2, arr2) {
            let o3 = this.b01(o1.item_id, o2.price_info.input_normal_price, arr2)
            if (o3.MinimumOrder) {
                return {
                    "item_id": o1.item_id,
                    "status": 1,
                    "model_id": o2.model_id,
                    "input_promo_price": o3.price,
                    "stock": o3.MinimumOrder * 3,
                    "purchase_limit": o3.MinimumOrder * 3//买家在限时选购期间，每件商品可购买的最多次数。
                }
            }
            else {
                Tool.pre(["有问题，没有找到商品ID.", o1, o2, arr2]);
            }
        },
        ///////////////////////////////
        d01: function (oo) {
            //@.status=1        表示【上架商品】
            //为什么要“*2”？答：有的库存太小，有的价格太低，这些都不要，所以“*2”，可以把坑位填满。
            let str = '[0\
            <r:shopPro_'+ oo.site + ' db="sqlite.shopee" size=' + (this.obj[oo.site].size * 2) + ' where=" where @.status=1 and @.isSeckill=1 order by @._1688_saleNum desc">,\
            {\
                "fromid":<:fromid/>,\
                "MinimumOrder":<:MinimumOrder/>,\
                "newDiscount":<:newDiscount/>,\
            }\
            </r:shopPro_' + oo.site + '>]'
            $("#state").html("正在获取本地商品。。。");
            Tool.ajax.a01(str, 1, this.d02, this, oo);
        },
        d02: function (arr, oo) {
            arr.shift()
            $("#ids").html('<pre>' + JSON.stringify(arr, 2, null) + '</pre>');
            let search_content = []
            for (let i = 0; i < arr.length; i++) {
                search_content.push(arr[i].fromid)
            }
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
                "cursor=",
                "limit=100",
                "is_ads=0",
                "need_brand=0",
                "need_item_model=0",
                "search_type=1",
                "search_content=" + search_content.join(","),
            ]
            let url = "https://seller.shopee.cn/api/marketing/v4/public/product_selector/?" + pArr.join("&")
            $("#state").html("正在获取远和商品信息。。。");
            oo.fromidArr = arr;
            gg.getFetch(url,"json", this.d03, this, oo)
        },
        d03: function (t, oo) {
            if (t.code == 0) {
                this.e01(t.data.item_stock_price_infos, oo)//启用
            }
            else {
                $("#state").html("不可能到这里。");
                Tool.pre(t)
            }
        },
        ////////////////////////////
        e01: function (arr1, oo)//启用
        {
            //arr1   	        价格信息
            //oo.fromidArr		本地来源ID
            let items1 = [], item_list = [], arr2 = []//限商品ID个数
            for (let i = 0; i < arr1.length; i++) {
                let Tarr = arr1[i].sku_stock_price_list
                for (let j = 0; j < Tarr.length; j++) {
                    //////////////////////////////////////////
                    let items2 = this.b02(arr1[i], Tarr[j], oo.fromidArr)
                    if (Tarr[j].seller_stock_info.normal_stock > items2.stock & items2.input_promo_price > 0.1)//库存要大于20才能做秒杀活动
                    {
                        if (arr2.indexOf(arr1[i].item_id) == -1 && arr2.length < this.obj[oo.site].size) {//限商品ID个数
                            arr2.push(arr1[i].item_id)
                            items1.push(items2)
                            /////////////为什么要【item_list】变量?答：搜索出来的结果到最后必须关闭，否则报错。////////////////////////////////
                            item_list.push({
                                "itemid": arr1[i].item_id,
                                "modelid": Tarr[j].model_id
                            })
                            //////////////////////////////////////////
                        }
                        else {
                            break;
                        }
                    }
                    if (arr2.length >= this.obj[oo.site].size) { break; }
                    ////////////////////////////////////////////////////////
                }
            }
            oo.item_list = item_list;//后面要用
            this.e02(items1, oo)
        },
        e02: function (items, oo) {
            //说明：首次添加的【启用】，是这个样子。
            $("#state").html("正在【启用】。。。");
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            /*
            {
                "flash_sale_id":12724742721536,
                "items":[
                    {"item_id":26950594715,"status":0,"model_id":215117634136,"input_promo_price":0.35,"stock":100,"purchase_limit":200},
                    {"item_id":26950594715,"status":0,"model_id":215117634137,"input_promo_price":0.35,"stock":100,"purchase_limit":200},
                    {"item_id":26950594715,"status":0,"model_id":215117634138,"input_promo_price":0.35,"stock":100,"purchase_limit":200},
                    {"item_id":26950594715,"status":1,"model_id":215117634135,"input_promo_price":0.35,"stock":100,"purchase_limit":200}
                ],
                "use_global_category":true
            }
            */
            let url = "https://seller.shopee.cn/api/marketing/v4/shop_flash_sale/batch_items/set/?" + pArr.join("&")
            let data = {
                flash_sale_id: oo.Aarr.flash_sale_id,
                items: items,
                use_global_category: true
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e03, this, oo)
        },
        e03: function (t, oo) {
            if (t.code == 0) {
                if (t.data.failed_items.length == 0) {
                    $("#state").html("正在【确认】。。。");
                    this.f01(oo)//说明：下面这个请求必须要做，否则提示错误【"err_msg": "ERROR_FLASH_SALE_ITEM_NOT_ENOUGH_STOCK",】----错误快闪销售项目库存不足
                }
                else {
                    $("#state").html("有出错的，删除出错的，添加新的，再来。");
                    Tool.pre(["出错01", t])
                }
            }
            else {
                $("#state").html("不可能到这里");
                Tool.pre(["出错001", t])
            }
        },
        f01: function (oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/marketing/v4/public/misleading_discount/?" + pArr.join("&")
            let data = {
                item_list: oo.item_list
            }
            /*
            {
              "item_list": [
                {
                  "itemid": 26950594715,
                  "modelid": 215117634138
                },
                {
                  "itemid": 26950594715,
                  "modelid": 215117634135
                },
                {
                  "itemid": 26950594715,
                  "modelid": 215117634136
                },
                {
                  "itemid": 26950594715,
                  "modelid": 215117634137
                }
              ]
            }
            */
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.f02, this, oo)
        },
        f02: function (t, oo) {
            if (t.message == "success") {
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["解除锁定出错", t])
            }
        },
    }
});
