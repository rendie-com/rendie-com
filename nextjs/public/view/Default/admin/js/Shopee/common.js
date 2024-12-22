Object.assign(Tool, {
    site: function (val) {
        let name = "未知站点：" + val
        switch (val) {
            case "sg": name = "【新加坡】站点"; break;
            case "tw": name = "【台湾虾皮】站点"; break;
            case "my": name = "【马来西亚】站点"; break;
            case "br": name = "【巴西】站点"; break;
        }
        return name
    },
    header3: function (jsFile, site) {
        let html = '\
          <ul class="makeHtmlTab">\
              <li'+ (site == "sg" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=sg\')">新加坡</li>\
              <li'+ (site == "tw" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=tw\')">台湾虾皮</li>\
              <li'+ (site == "my" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=my\')">马来西亚</li>\
              <li'+ (site == "br" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=' + jsFile + '&site=br\')">巴西</li>\
          </ul>'
        return html;
    },
    profitRate: {
        //已知shopee的信息算利润率
        a01: function (discountNum, input_normal_price, scale, MinimumOrder, _1688_maxPrice, _1688_freight, unitWeight, logistics, siteObj, num) {
            let discountPrice = (input_normal_price * (1 - discountNum / 100))//折后价
            let discountPricetaxRate = discountPrice + discountPrice * (siteObj.taxRate / 100)
            let discountMinimumOrder = this.b01(MinimumOrder, discountPrice, siteObj.fullPrice * num, siteObj.taxRate)//满15的购买量
            //平台费 = 折后价 * (佣金费率 + 活动服务费率 + 交易手续费率)
            let PlatformFees = discountPrice * (siteObj.commissionRate / 100 + siteObj.activityServiceRate / 100 + siteObj.transactionFees / 100)
            let PlatformFeesStr = "-" + discountNum.toFixed(4) + "%\n\
满件数 = " + discountMinimumOrder + "件（订单满" + siteObj.currency_symbol + (siteObj.fullPrice * num) + "应该买的件数）\n\
折后价 = 原价  * (1 - 折扣 / 100)\n\
       = "+ input_normal_price + " * (1 - " + discountNum.toFixed(4) + " / 100)\n\
       = "+ input_normal_price + " * " + (1 - discountNum / 100).toFixed(4) + "\n\
       = "+ discountPrice.toFixed(4) + "\n\n\
税率 = " + siteObj.taxRate + "%\n\
税后折扣价 = 折扣价 + 折扣价 * 税率\n\
           = "+ discountPrice.toFixed(4) + " + " + discountPrice.toFixed(4) + " * " + (siteObj.taxRate / 100) + "\n\
           = "+ discountPricetaxRate.toFixed(2) + "\n\
\n\
平台费 = 折后价 * (佣金费率 + 活动服务费率 + 交易手续费率)\n\
       = "+ discountPrice.toFixed(4) + " * (" + (siteObj.commissionRate / 100) + " + " + (siteObj.activityServiceRate / 100) + " + " + (siteObj.transactionFees / 100) + ")\n\
       = "+ discountPrice.toFixed(4) + " * " + (((siteObj.commissionRate / 100) + (siteObj.activityServiceRate / 100) + (siteObj.transactionFees / 100))).toFixed(4) + "\n\
       = "+ PlatformFees.toFixed(4)
            //////////////////////////////////////////////
            //满价格 = (折后价 - 平台费) * 满件数
            let amountReceived = (discountPrice - PlatformFees) * discountMinimumOrder;
            let amountReceivedStr = "\
满价格 = (折后价 - 平台费) * 满件数\n\
     = ("+ discountPrice.toFixed(4) + " - " + PlatformFees.toFixed(4) + ") * " + discountMinimumOrder + "\n\
     = "+ (discountPrice - PlatformFees).toFixed(4) + " * " + discountMinimumOrder + "\n\
     = "+ amountReceived.toFixed(4) + "\n\n\
满总额 = 税后折扣价 * 满件数\n\
         = "+ discountPricetaxRate.toFixed(4) + " * " + discountMinimumOrder + "\n\
         = "+ (discountPricetaxRate * discountMinimumOrder).toFixed(2)
            ///////////////////////////////////////////////////////////////
            //成本 = (采购价 * 件倍数 * 满件数 + 运费 + 贴单费) * 汇率
            let cost = (_1688_maxPrice * scale * discountMinimumOrder + _1688_freight + 3) * siteObj.exchangeRate
            let costStr = "运费 = " + _1688_freight + "元\n\
成本 = (采购价 * 件倍数 * 满件数 + 运费 + 贴单费) * 汇率\n\
     = ("+ _1688_maxPrice + " * " + scale + " * " + discountMinimumOrder + " + " + _1688_freight + " + 3) * " + siteObj.exchangeRate + "\n\
     = ("+ (_1688_maxPrice * scale * discountMinimumOrder).toFixed(4) + " + " + _1688_freight + " + 3) * " + siteObj.exchangeRate + "\n\
     = "+ (_1688_maxPrice * scale * discountMinimumOrder + _1688_freight + 3).toFixed(4) + " * " + siteObj.exchangeRate + "\n\
     = "+ cost.toFixed(2)
            //////////////////////////////////////////
            let freight = Tool.logistics.b03(unitWeight * 1000 * discountMinimumOrder * scale, logistics, "Seller")//跨境物流成本（藏价）
            let freightStr = "单位重量 = " + (unitWeight * 1000) + "克\n\
跨境物流成本（藏价） = " + freight[0]
            //////////////////////////////////////////
            let profit = amountReceived - cost - parseFloat(freight[1])
            let profitStr = "\
利润 = 实收 - 成本 - 跨境物流成本（藏价） \n\
     = " + amountReceived.toFixed(4) + " - " + cost.toFixed(2) + " - " + freight[1] + "\n\
     = " + profit.toFixed(4)
            ////////////////////////////////////////////////////
            let profitRate = profit / cost * 100
            let profitRateStr = "利润率 = 利润 / 成本 * 100 = " + profit.toFixed(2) + " / " + cost.toFixed(2) + " * 100 = " + profitRate.toFixed(2) + "%"
            /////////////////////////////////////
            let oo = {
                txt: PlatformFeesStr + "\n\n" + amountReceivedStr + "\n\n" + costStr + "\n\n" + freightStr + "\n\n" + profitStr + "\n\n" + profitRateStr,
                profit: profit.toFixed(2),
                profitRate: Number(profitRate.toFixed(0)),
            }
            return oo
        },
        //算计买家满15的【最低购买量】
        b01: function (MinimumOrder, price1, fullPrice, taxRate) {
            let price2 = price1 + price1 * (taxRate / 100)//税后
            while (price2 * MinimumOrder < fullPrice) {
                MinimumOrder++;
            }
            return MinimumOrder;
        },
    },
    maxPrice: {
        //取最高价，和起订量
        a01: function (sku) {
            let arr = sku.currentPrices
            let maxPriceObj = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (parseFloat(arr[i].price) > parseFloat(maxPriceObj.price)) {//取最高价的起订量（因为批发价的价格只会越来越小。）
                    maxPriceObj = arr[i];
                }
            }
            //说明：【currentPrices】里面的价格是批发价格，会比【skuMap】的价格要低。
            return {
                beginAmount: maxPriceObj.beginAmount,
                price: this.b01(sku),
            }
        },
        b01: function (sku_1688)//统一价格（选最高价格）
        {
            let arr = sku_1688.skuMap, maxPrice = 0
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
    fixedPrice: {
        //已知1688的信息开始定价
        a01: function (_1688_maxPrice, scale, _1688_MinimumOrder, _1688_freight, siteObj, unitWeight, logistics, discount) {
        let oo = {}
            if (unitWeight) {
                let str = "1688最高单价 = " + _1688_maxPrice + "（人民币）\n\
1688单件够买量 = " + scale + "（件倍数）\n\
1688最小够买量 = " + _1688_MinimumOrder + "\n\
运费 = " + _1688_freight + "（人民币）\n"
                let min_purchase_limit = (scale > 1 ? Math.ceil(_1688_MinimumOrder / scale) : _1688_MinimumOrder)//最低购买数量
                if (_1688_freight == 0) {
                    oo = this.b01(0, _1688_maxPrice, scale, 0, min_purchase_limit, siteObj, unitWeight, logistics, _1688_freight, discount)
                    oo.str = str + oo.str;
                }
                else {
                    let promote_num = this.b04(_1688_maxPrice * scale, min_purchase_limit, _1688_freight);//提升价格来要回运费，最多提升50%
                    //////////////////////////////
                    if (promote_num == 0) {
                        let upPrice = _1688_maxPrice * 0.5
                        let maxLimit = this.b05((_1688_maxPrice + upPrice) * scale, min_purchase_limit, _1688_freight)//上调起订量
                        if (maxLimit == 0) {
                            oo.str = "上调起订量超限。" + oo.str;
                        }
                        else {
                            oo = this.b01(50, _1688_maxPrice, scale, upPrice, maxLimit, siteObj, unitWeight, logistics, _1688_freight, discount)
                            oo.str = str + oo.str;
                        }
                    }
                    else {
                        let upPrice = _1688_maxPrice * promote_num / 100
                        oo = this.b01(promote_num, _1688_maxPrice, scale, upPrice, min_purchase_limit, siteObj, unitWeight, logistics, _1688_freight, discount)
                        oo.str = str + oo.str;
                    }
                }
            }
            return oo;
        },
        b01: function (promote_num, _1688_maxPrice, scale, upPrice, min_purchase_limit, siteObj, unitWeight, logistics, _1688_freight, discount) {
            let oo = this.b02(upPrice, min_purchase_limit, _1688_maxPrice, scale, siteObj, unitWeight, logistics, _1688_freight, discount)
            return {
                min_purchase_limit: min_purchase_limit,//要运费最低购买量
                discountPrice: oo.discountPrice,//打折后[含平台费]
                price: oo.price,//定价
                str: "要运费折扣 = " + promote_num + "%【不会超过50%】\n\
要运费价 = " + ((_1688_maxPrice + upPrice) * scale).toFixed(4) + "（人民币）\n\
要运费最低购买量 = " + min_purchase_limit + "（1688最高单价提升50%还没要回运费才会增加）\n\n" + oo.str
            };
        },
        //满RM15还有10%利润定价
        b02: function (upPrice, min_purchase_limit, normal_price, scale, siteObj, ManualReview_1688_unitWeight, logistics, _1688_freight, discount) {
            //要记得：免费活动，只免了买家运费，没有免卖家运费，所以要在包邮门槛，把运费加进去，别亏本。
            //在满多少包邮的情况下,还有10%的利润，如果没有就【上调价格】，直到有为止。
            ////////////////////////////////////////////////////////////
            let discountPrice = this.b06((normal_price + upPrice) * scale, siteObj)//打折后[含平台费]
            let MinimumOrder = this.b07(min_purchase_limit, discountPrice, siteObj.fullPrice, siteObj.taxRate);//满多少的【最低购买数量】
            /////////////////////////////////////////////////////////
            ////为什么要“*1000”？因为是按克算的，我的是千克，所以要“*1000”。
            let freight2 = Tool.logistics.b03(ManualReview_1688_unitWeight * 1000 * MinimumOrder * scale, logistics, "Seller")//跨境物流成本[藏价]
            //免运价[不含平台费] = (1688最高单价 + 上调价格) * 汇率 * 件数 * 件倍数
            let price01 = ((normal_price + upPrice) * siteObj.exchangeRate) * MinimumOrder * scale
            //////////为什么不加下面这个判断？答：本来用的是折扣调价的，要是用了，那价格就有点高了。/////////////////////////////////////////
            //折后减六免运价[不含平台费] = 免运价[不含平台费] / (1 - (折扣 - 6) / 100) * (1 - 折扣 / 100)
            //let price01_6 = price01 / (1 - (discount - 6) / 100) * (1 - discount / 100)
            //折后减一免运价[不含平台费] =  免运价[不含平台费] / (1 - (折扣 - 1) / 100) * (1 - 折扣 / 100)
            //let price01_1 = price01 / (1 - (discount - 1) / 100) * (1 - discount / 100)
            ////////////////////////////////////////////////////
            //采购成本 = (采购价 * 件数 * 件倍数 + 运费 + 贴单费) * 汇率
            let price02 = (normal_price * MinimumOrder * scale + _1688_freight + 3) * siteObj.exchangeRate
            //利润 = 免运价[不含平台费] - 跨境物流成本[藏价]  - 采购成本
            let price03 = price01 - parseFloat(freight2[1]) - price02
            //let price03_6 = price01_6 - parseFloat(freight2[1]) - price02
            //let price03_1 = price01_1 - parseFloat(freight2[1]) - price02
            //采购利润率 = 利润 / 采购成本 * 100
            let price05 = price03 / price02 * 100
            //let price05_6 = price03_6 / price02 * 100
            //let price05_1 = price03_1 / price02 * 100
            if (price05 < 10) {//|| price05_6 < 10 || price05_1 < 10
                //没有10%的利润则上调1688最高单价。
                return this.b02(upPrice + 0.05, min_purchase_limit, normal_price, scale, siteObj, ManualReview_1688_unitWeight, logistics, _1688_freight, discount)
            }
            else {
                return this.b03(normal_price, upPrice, scale, siteObj, discountPrice, MinimumOrder, price01, freight2, _1688_freight, price02, price03, price05, discount, ManualReview_1688_unitWeight)
            }
        },
        b03: function (normal_price, upPrice, scale, siteObj, discountPrice, MinimumOrder, price01, freight2, _1688_freight, price02, price03, price05, discount, unitWeight) {
            let price1 = (normal_price + upPrice) * scale * siteObj.exchangeRate
            let Rate = 1 - (siteObj.commissionRate / 100) - (siteObj.activityServiceRate / 100) - siteObj.transactionFees / 100
            let price2 = (price1 / (1 - discount / 100) / Rate)
            return {
                discountPrice: discountPrice,//打折后[含平台费]
                price: price2.toFixed(2),//shopee定价[折扣前]
                str: "\
上调价格 = " + upPrice.toFixed(2) + "\n\
折后价[不含平台费] = (1688最高单价 + 上调价格) * 件倍数 * 汇率\n\
                  = ("+ normal_price + " + " + upPrice.toFixed(2) + ") * " + scale + " * " + siteObj.exchangeRate + "\n\
                  = "+ ((normal_price + upPrice) * scale).toFixed(4) + " * " + siteObj.exchangeRate + "\n\
                  = "+ price1.toFixed(4) + "（当地币）\n\
打折后[含平台费] =  折后价[不含平台费] / (1 - 佣金费率 - 活动服务费率 - 交易手续费率)\n\
                = "+ price1.toFixed(4) + " / (1 - " + (siteObj.commissionRate / 100) + " - " + (siteObj.activityServiceRate / 100) + " - " + (siteObj.transactionFees / 100) + ")\n\
                = "+ price1.toFixed(4) + " / " + Rate.toFixed(4) + "\n\
                = "+ discountPrice.toFixed(4) + "\n\
税后折扣价 = 打折后[含平台费] * (1 + 税率)\n\
          = " + discountPrice.toFixed(4) + " * (1 + " + (siteObj.taxRate / 100) + " )\n\
          = " + (discountPrice * (1 + (siteObj.taxRate / 100))).toFixed(2) + "（当地币）\n\
满" + siteObj.fullPrice + "需要件数 = " + MinimumOrder + "（【税后折扣价 * 件数 &lt; " + siteObj.fullPrice + "】才会增加）\n\
\n\
免运价[不含平台费] = 折后价[不含平台费] * 件数 = "+ price1.toFixed(4) + " * " + MinimumOrder + " = " + price01.toFixed(2) + "（当地币）\n\
单位重量 = " + (unitWeight * 1000) + "（克）\n\
跨境物流成本[藏价] = " + freight2[0] + "（当地币）\n\
采购成本 = (采购价  * 件数 * 件倍数 + 运费 + 贴单费) * 汇率\n\
        = ("+ normal_price + " * " + MinimumOrder + " * " + scale + " + " + _1688_freight + " + 3) * " + siteObj.exchangeRate + "\n\
        = "+ (normal_price * MinimumOrder * scale + _1688_freight + 3).toFixed(4) + " * " + siteObj.exchangeRate + "\n\
        = " + price02.toFixed(4) + "（当地币）\n\
利润 = 免运价[不含平台费] - 跨境物流成本[藏价] - 采购成本\n\
     = " + price01.toFixed(4) + " - " + freight2[1] + " - " + price02.toFixed(4) + "\n\
     = " + price03.toFixed(4) + "（当地币）\n\
采购利润率 = 利润 / 采购成本 * 100\n\
          = " + price03.toFixed(4) + " / " + price02.toFixed(4) + " * 100 \n\
          = " + price05.toFixed(4) + "%\n\
最终定价 = 折后价[不含平台费]  / (1-折扣) / (1 - 佣金费率 - 活动服务费率 - 交易手续费率)\n\
          = "+ price1.toFixed(4) + "  / " + (1 - discount / 100).toFixed(4) + " / (1 - " + (siteObj.commissionRate / 100) + " - " + (siteObj.activityServiceRate / 100) + " - " + (siteObj.transactionFees / 100) + ")\n\
          = "+ price1.toFixed(4) + "  / " + (1 - discount / 100).toFixed(4) + " / " + Rate.toFixed(4) + "\n\
          = "+ price2.toFixed(2)
            }
        },
        //提升价格来要回运费，最多提升50%
        b04: function (_1688_maxPrice, _1688_MinimumOrder, _1688_freight) {
            let promote_num = 0
            for (let i = 0; i < 50; i++) {
                let price1 = _1688_maxPrice * ((i + 1) / 100)//每次提升1%
                if (price1 * _1688_MinimumOrder >= _1688_freight) {
                    promote_num = i + 1;
                    break;
                }
            }
            return promote_num;
        },
        //上调起订量
        b05: function (price, _1688_MinimumOrder, _1688_freight) {
            let maxLimit = 0;
            for (let i = _1688_MinimumOrder + 1; i < _1688_MinimumOrder + 1000; i++) {
                if (price * i >= _1688_freight) {
                    maxLimit = i;
                    break;
                }
            }
            return maxLimit;
        },
        //打折后[含平台费]
        b06: function (price1, siteObj) {
            let price2 = price1 * siteObj.exchangeRate //打折后[不含平台费] = 1688最高单价 + 上调价格 * 汇率 
            //打折后[含平台费] = 打折后[不含平台费] / (1 - 佣金费率 - 活动服务费率 - 交易手续费率)
            let Rate = 1 - siteObj.commissionRate / 100 - siteObj.activityServiceRate / 100 - siteObj.transactionFees / 100
            let discountPrice = price2 / Rate//店铺商品价格
            if(discountPrice<0.01)discountPrice=0.01
            return discountPrice
        },
        //算计买家满多少的【最低购买量】
        b07: function (MinimumOrder, price1, fullPrice, taxRate) {
            let price2 = price1 + price1 * (taxRate / 100)//税后
            while (price2 * MinimumOrder < fullPrice) {
                MinimumOrder++;
            }
            return MinimumOrder;
        },
    },
})