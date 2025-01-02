'use strict';
Object.assign(Tool, {
    common_update_product_info:
    {
        //pic1                          原始首图
        //proid                         商品编码
        //manualreview_1688_fromid      1688商品ID
        //GlobalPro_fromid              全球商品ID
        //scale                         每包件数
        //shopPro_fromid                店铺商品ID
        //seller                        店铺参数信息
        //site                          站点
        //min_purchase_limit            最低购买量
        //discount                      折扣
        //upPrice                       上调价格
        a01: function (pic1, proid, manualreview_1688_fromid, GlobalPro_fromid, scale, shopPro_fromid, seller, site, min_purchase_limit, discount, upPrice, next, This, t) {
            let oo = {
                pic1: pic1,
                manualreview_1688_fromid: manualreview_1688_fromid,
                GlobalPro_fromid: GlobalPro_fromid,
                scale: scale,
                shopPro_fromid: shopPro_fromid,
                seller: seller,
                site: site,
                min_purchase_limit: min_purchase_limit,//最低购买数量
                discount: discount,
                upPrice: upPrice,//上调价格
                next: next,
                This: This,
                t: t
            }
            this.a02(proid, oo)
        },
        a02: function (proid, oo) {
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select @." + oo.site + "_watermark as pic1_watermark FROM @.pic1 where @.src='" + oo.pic1 + "'",
            }, {
                action: "sqlite",
                database: "aliexpress_prodes/" + Tool.pronum(proid, 50),
                sql: "select @.dhpic as dhpic,@.dhdespic as dhdespic FROM @.prodes where @.proid='" + proid + "'",
            }]
            $("#state").html("正在获取商品图片...");
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            let arr1 = [], dhpic = JSON.parse(t[1][0].dhpic)
            for (let i = 0; i < dhpic.length; i++) {
                arr1.push(dhpic[i].picB.shopee)
            }
            /////////////////////////////////////
            let arr2 = [], dhdespic = JSON.parse(t[1][0].dhdespic)
            for (let i = 0; i < dhdespic.length; i++) {
                arr2.push(dhdespic[i].picB.shopee)
            }
            /////////////////////////////////////
            let data = [{
                action: "sqlite",
                database: "shopee_img",
                sql: "select @." + oo.site + "_watermark as watermark FROM @.pic where @.src in('" + arr1.join("','") + "')",
            }, {
                action: "sqlite",
                database: "shopee_img",
                sql: "select @." + oo.site + "_watermark as watermark FROM @.desPic where @.src in('" + arr2.join("','") + "')",
            }]
            if (t[0].length == 0) {
                //该商品没有首图水印
                this.a04(data, oo.pic1, oo)
            }
            else {
                this.a04(data, t[0][0].pic1_watermark, oo)
            }
        },
        a04: function (data, pic1_watermark, oo) {
            oo.product_info = {}
            if (pic1_watermark) {
                oo.product_info.images = [pic1_watermark]//首图关键词水印
            }
            else {
                //没有上架的商品，就没有【首图关键词水印】，因为没有搜广告，也没有没关键词。
                oo.product_info.images = [oo.pic1]//首图
            }
            Tool.ajax.a01(data, this.a05, this, oo);
        },
        a05: function (t, oo) {
            let picArr = this.b01(t[0]).concat(this.b01(t[1]));
            if (picArr.length == 0) {
                Tool.at("必须生成水印，才能更新")
            }
            else {
                //slice方法来实现数组的截取
                oo.product_info.images = oo.product_info.images.concat(picArr).slice(0, 9)//修改放大镜图                
                /////////////////////////////////////////////////////
                let data = [{
                    action: "sqlite",
                    database: "1688_prodes/" + Tool.remainder(oo.manualreview_1688_fromid, 99),
                    sql: "select @.attrpic_shopee as attrpic_shopee FROM @.prodes where @.fromid=" + oo.manualreview_1688_fromid,
                }]
                //思路：拿1688的水印图片覆盖更新。
                //已知信息1：【全球商品】增加了价格属性，那【店铺商品】也会增加。
                //已知信息2：在【店铺商品】是不能增加价格属性，也不能删除属性，只能改。
                //已知信息3：一组【属性图片】中，要么全部有图片，要么全部没有图片。（所以：当出现只有部分图片时后，用空图片填进去。）
                Tool.ajax.a01(data, this.a06, this, oo);
            }
        },
        a06: function (t, oo) {
            let arr = [], attrPic = [], attrpic_shopee = JSON.parse(t[0][0].attrpic_shopee);
            if (attrpic_shopee) {
                for (let i = 0; i < attrpic_shopee.length; i++) {
                    if (attrpic_shopee[i].shopee) { arr.push(attrpic_shopee[i].shopee) }
                    attrPic.push(attrpic_shopee[i].shopee)
                }
            }
            oo.temp_attrPic = attrPic;//临时放一下
            if (arr.length == 0) {
                this.d01(oo)
            }
            else {
                let data = [{
                    action: "sqlite",
                    database: "shopee_img",
                    sql: "select " + Tool.fieldAs("src," + oo.site + "_watermark") + " FROM @.attrpic_1688 where @.src in('" + arr.join("','") + "')",
                }]
                $("#state").html("正在获取水印图片...");
                Tool.ajax.a01(data, this.a07, this, oo);
            }
        },
        a07: function (t, oo) {
            let arr = oo.temp_attrPic, isErr = false;
            //说明一下：这里只会出现一组，因为1688不可能有俩组属性有图片,没有图片的属性不会来。
            for (let i = 0; i < arr.length; i++) {
                //替换成水印图
                if (arr[i]) {
                    let pic = this.b02(arr[i], t[0], oo.site)
                    if (pic) {
                        arr[i] = pic;
                    }
                    else {
                        isErr = true;
                        break;
                    }
                }
                else {
                    arr[i] = "cn-11134207-7r98o-lulrd4y2kboe7c"
                }
            }
            if (isErr) {
                Tool.pre(["有水印图找不到了", t, arr])
            }
            else {
                oo.temp_attrPic = arr;
                this.d01(oo)
            }
        },
        b01: function (arr) {
            let nArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].watermark) {
                    nArr.push(arr[i].watermark)
                }
            }
            return nArr;
        },
        //能否找得到水印图
        b02: function (pic, arr, site) {
            let rPic = "";
            for (let i = 0; i < arr.length; i++) {
                if (pic == arr[i].src) {
                    rPic = arr[i][site + "_watermark"];
                    break;
                }
            }
            return rPic;
        },
        ////////////////////////////////////////
        d01: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "mtsku_item_id=" + oo.GlobalPro_fromid,
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_info/?" + arr.join("&");
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取【全球商品】信息的价格。。。");
            //因为这是底价，用修改站点价格。
            gg.getFetch(url,"json", this.d02, this, oo);
        },

        d02: function (t, oo) {
            if (t.message == "success") {
                this.d03(t.data.model_list, oo)
            }
            else {
                Tool.pre(["出错", t]);
            }
        },
        d03: function (arr, oo) {
            let GlobalPro_price = {}
            for (let i = 0; i < arr.length; i++) {
                GlobalPro_price[arr[i].seller_sku] = arr[i].price_info.normal_price
            }
            oo.temp_GlobalPro_price = GlobalPro_price
            this.d04(oo)
        },
        d04: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "product_id=" + oo.shopPro_fromid,
                "is_draft=false",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/v3/product/get_product_info?" + arr.join("&")
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取【店铺商品】信息。。。");
            //用来获取价格的ID.
            gg.getFetch(url,"json", this.d05, this, oo);
        },
        d05: function (t, oo) {
            if (t.msg == "success") {
                this.e01(t.data.product_info.std_tier_variation_list, t.data.product_info.model_list, oo)
            }
            else {
                Tool.pre(["出错", t]);
            }
        },
        /////////////////////////////////////////////
        e01: function (arr, model_list, oo) {
            for (let i = 0; i < arr.length; i++) {
                let isImg = false;//是否有图片
                for (let j = 0; j < arr[i].value_list.length; j++) {
                    if (arr[i].value_list[j].image_id) {
                        isImg = true;
                        break;
                    }
                }
                /////////////////////////////////////////////
                if (isImg) {
                    for (let j = 0; j < arr[i].value_list.length; j++) {
                        if (oo.temp_attrPic[j]) {
                            arr[i].value_list[j].image_id = oo.temp_attrPic[j];
                        }
                        else {
                            arr[i].value_list[j].image_id = "cn-11134207-7r98o-lulrd4y2kboe7c";
                        }
                    }

                }
            }
            oo.product_info.std_tier_variation_list = arr;//修改属性图片
            this.e02(model_list, oo)
        },
        e02: function (arr, oo) {
            let model_list = [];
            let GlobalPro_price = 0;
            for (let i = 0; i < arr.length; i++) {
                GlobalPro_price = oo.temp_GlobalPro_price[arr[i].sku]
                if (GlobalPro_price) {
                    model_list.push({
                        "id": arr[i].id,
                        //"price": Tool.common_price.b03((parseFloat(GlobalPro_price) + oo.upPrice)*oo.scale, oo.seller[oo.site], oo.discount).toFixed(2),//-------不能在这里调价，会扣分，说我调价。
                        "tier_index": arr[i].tier_index,
                        //当属性的价格小于【最小够买量】，则不卖了。
                        "status": arr[i].stock_detail.total_seller_stock < oo.min_purchase_limit ? 2 : 1
                    })
                }
                else {
                    break;
                }
            }
            if (GlobalPro_price) {
                this.e03(model_list, oo)
            }
            else {
                Tool.pre("来源SKU发生改变，程序终止。")
            }
        },
        e03: function (model_list, oo) {
            oo.product_info.model_list = model_list;//修改价格
            Tool.apply(oo.product_info, oo.next, oo.This, oo.t);
        },
    }
})