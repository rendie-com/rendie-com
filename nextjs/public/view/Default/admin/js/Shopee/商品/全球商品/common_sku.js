'use strict';
Object.assign(Tool, {
    sku://价格
    {
        //说明：shopee 的价格，最多只能是俩组属性。
        a01: function (sku_1688, attrPic_shopee, freight, proid) {
            let maxPrice = this.b07(sku_1688)//统一价格（选最高价格）
            if (sku_1688.skuProps)//有多个价格属性
            {
                if (maxPrice) {
                    return this.a02(sku_1688, attrPic_shopee, freight, proid, maxPrice.toFixed(2))
                }
                else {
                    return "没有取到最高价格"
                }
            }
            else {
                //一个价格，也有批发价的。
                $("#state").html("只有一个价格")
                let oo = {
                    tier_variation: [{
                        "name": "",
                        "options": [""],
                        "images": []
                    }],
                    model_list: [
                        {
                            "tier_index": [0],
                            "is_default": true,
                            "normal_price": maxPrice.toFixed(2),//商品原价
                            "stock_setting_list": [{
                                "sellable_stock": sku_1688.canBookedAmount
                            }],
                        }
                    ]
                }
                return oo;
            }
        },
        a02: function (sku_1688, attrPic_shopee, freight, proid, maxPrice) {
            if (attrPic_shopee != 0) {
                sku_1688.skuProps = this.b03(sku_1688.skuProps, attrPic_shopee)//把属性中图片替换成已上传好的图片。
                if (typeof (sku_1688.skuProps) == "string")//表示出错了
                {
                    $("#state").html("返回出错信息。。。")
                    return sku_1688.skuProps;
                }
                else {
                    return this.a03(sku_1688, freight, proid, maxPrice)
                }
            }
            else {
                $("#state").html("没有图片")
                return this.a03(sku_1688, freight, proid, maxPrice)
            }
        },
        a03: function (sku_1688, freight, proid, maxPrice) {
            let tier_variation = this.b02(sku_1688.skuProps)//做成shopee要的属性
            if (tier_variation.length == 1) {
                $("#state").html("一维。。。");
                return this.a05(tier_variation, sku_1688, freight, proid, maxPrice)//一维
            }
            else if (tier_variation.length == 2) {
                $("#state").html("二组。。。");
                return this.a04(tier_variation, sku_1688, freight, proid, maxPrice)//二组
            }
            else {
                alert("不可能到这。")
            }
        },
        a04: function (tier_variation, sku_1688, freight, proid, maxPrice) {
            let model_list = []
            let arr1 = tier_variation[0].options, arr2 = tier_variation[1].options
            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    model_list.push(this.b06([i, j], arr1[i] + "&gt;" + arr2[j], sku_1688, freight, proid, maxPrice))
                }
            }
            return {
                tier_variation: tier_variation,
                model_list: model_list
            }
        },
        ////////////////////////////////////////////////////
        a05: function (tier_variation, sku_1688, freight, proid, maxPrice)//一维
        {
            let model_list = [], arr1 = tier_variation[0].options;
            for (let i = 0; i < arr1.length; i++) {
                model_list.push(this.b06([i], arr1[i], sku_1688, freight, proid, maxPrice))
            }
            return {
                tier_variation: tier_variation,
                model_list: model_list
            }
        },
        //////////////////////////////////////////////////////////////////
        b01: function (arr) {
            let imagesArr = [], optionsArr = [], isImg = false;//这一组属性是否有图片
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].imageUrl) { isImg = true; break; }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].imageUrl == null && isImg) { arr[i].imageUrl = "cn-11134207-7r98o-lulrd4y2kboe7c"; }
                if (isImg) { imagesArr.push(arr[i].imageUrl) }
                optionsArr.push(arr[i].name)
            }
            return {
                images: imagesArr,
                options: optionsArr
            }
        },
        b02: function (arr) {
            let arr1 = []
            for (let i = 0; i < arr.length; i++) {
                let oo = this.b01(arr[i].value)
                arr1.push(
                    {
                        name: arr[i].prop,
                        images: oo.images,
                        options: oo.options
                    })
            }
            return arr1
        },
        b03: function (arr, attrPic_shopee)//把属性中图片替换成已上传好的图片。
        {
            for (let i = 0; i < arr.length; i++) {
                arr[i].value = this.b04(arr[i].value, attrPic_shopee)
            }
            return arr;
        },
        b04: function (attrPic_1688, attrPic_shopee)//换图片
        {
            for (let i = 0; i < attrPic_1688.length; i++) {
                if (attrPic_1688[i].imageUrl) {
                    attrPic_1688[i].imageUrl = this.b05(attrPic_1688[i].imageUrl, attrPic_shopee)
                }
            }
            return attrPic_1688;
        },
        b05: function (url, arr)//换图片
        {
            for (let i = 0; i < arr.length; i++) {
                if (url == arr[i].imageUrl) {
                    url = arr[i].shopee
                }
            }
            return url;
        },
        b06: function (ijArr, val, sku_1688, freight, proid, maxPrice)//一维和二组的post提交json并装
        {
            let oo = {}
            let o1 = sku_1688.skuInfoMap[val]
            if (o1) {
                let sellable_stock = o1.canBookCount > 9999 ? 9999 : o1.canBookCount
                oo = {
                    tier_index: ijArr,
                    is_default: false,
                    mtsku_model_id: 0,
                    seller_sku: proid + "-" + ijArr.join("-"),
                    normal_price: maxPrice,
                    stock_setting_list: [{
                        sellable_stock: sellable_stock
                    }]
                }
            }
            else {
                $("#state").html("找不到【" + val + "】对应的价格和库存。");
                oo = {
                    tier_index: ijArr,
                    is_default: false,
                    mtsku_model_id: 0,
                    seller_sku: proid + "-" + ijArr.join("-"),
                    normal_price: maxPrice,//商品原价
                    stock_setting_list: [
                        {
                            sellable_stock: 0
                        }]
                }
            }
            return oo;
        },
        b07: function (sku_1688)//统一价格（选最高价格）
        {
            //说明：【currentPrices】里面的价格是批发价格，会比【skuInfoMap】的价格要低。
            let arr = sku_1688.skuInfoMap, maxPrice = 0
            if (arr) {//如果没有价格，那就是统一价格
                for (let i = 0; i < arr.length; i++) {
                    if (parseFloat(arr[i].price) > maxPrice) {//取最大
                        maxPrice = parseFloat(arr[i].price);
                    }
                }
            }
            if (maxPrice == 0) {
                for (let i = 0; i < sku_1688.currentPrices.length; i++) {
                    if (parseFloat(sku_1688.currentPrices[i].price) > maxPrice) {//取最大
                        maxPrice = parseFloat(sku_1688.currentPrices[i].price);
                    }
                }
            }
            return maxPrice;
        },
    },
})