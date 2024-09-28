'use strict';
Object.assign(Tool, {
    common_price://价格
    {
        a01: function (logistics, siteObj, sku, _1688_freight, discount, ManualReview_1688_unitWeight, dom, next, This, t) {
            let oo = {
                logistics: logistics,//物流信息
                siteObj: siteObj,//费率
                sku: sku,//批发时还要用
                _1688_freight: _1688_freight,
                discount: discount,
                ManualReview_1688_unitWeight: ManualReview_1688_unitWeight,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let MaxCurrentPrices = Tool.maxPrice.a01(oo.sku)
            oo.dom.append('\
                <tr><td class="right">全球商品价：</td><td colspan="2">' + MaxCurrentPrices.price + '（人币民）</td></tr>\
                <tr><td class="right">1688单件购买数量：</td><td colspan="2">' + oo.sku.startAmount + '（一个属性的购买数量）</td></tr>\
                <tr><td class="right">1688最低购买数量：</td><td colspan="2">' + MaxCurrentPrices.beginAmount + '（混批合计数量）</td></tr>\
                <tr><td class="right">1688运费：</td><td colspan="2">' + oo._1688_freight + '（人币民）</td></tr>\
            ');
            let min_purchase_limit = (oo.sku.startAmount > 1 ? Math.ceil(MaxCurrentPrices.beginAmount / oo.sku.startAmount) : MaxCurrentPrices.beginAmount)//最低购买数量
            if (oo._1688_freight > 0) {
                //有运费的，就改【起订量】和【原价】，把运费要回来。
                this.a03(min_purchase_limit,MaxCurrentPrices, oo)
            }
            else {
                //oo.sku.startAmount 是什么？答：采购时，需按这个倍数增加数量。
                oo.dom.append('<tr><td class="right">最低购买数量：</td><td colspan="2">' + min_purchase_limit + '【不要运费，就不用改“最低购买数量”】</td></tr>')
                this.a04(0, min_purchase_limit, MaxCurrentPrices.price, oo)
            }
        },
        a03: function (min_purchase_limit,MaxCurrentPrices, oo) {
            //为什么不加贴单费？答：买家下同一个订单4单内都是不要钱的，也就是说，买家可以买不同的商品
            let promote_num = this.b04(MaxCurrentPrices.price * oo.sku.startAmount, min_purchase_limit, oo._1688_freight);//提升价格来要回运费，最多提升50%
            /////////////////////////////////////////////
            if (promote_num == 0) {
                let upPrice = MaxCurrentPrices.price * 0.5
                let maxLimit = this.b01((MaxCurrentPrices.price + upPrice) * oo.sku.startAmount, min_purchase_limit, oo._1688_freight)//提升价格要不到运费,那就提升【最低购买数量】加【提升50%价格】来要回来。
                if (maxLimit == 0) {
                    Tool.pre(["【提升50%价格】且【最低购买数量+1000】都没要到运费。程序已终止。"])
                }
                else {
                    oo.dom.append('<tr><td class="right">最低购买数量：</td><td colspan="2">' + maxLimit + '（采购单价提升50%还没要回运费才会增加）</td></tr>')
                    this.a04(upPrice, maxLimit, MaxCurrentPrices.price, oo)
                }
            }
            else {
                oo.dom.append('<tr><td class="right">最低购买数量：</td><td colspan="2">' + min_purchase_limit + '【' + promote_num + '%】（采购单价提升50%还没要回运费才会增加）</td></tr>')
                //提升价格可以要到运费
                let upPrice = MaxCurrentPrices.price * promote_num / 100
                this.a04(upPrice, min_purchase_limit, MaxCurrentPrices.price, oo)
            }
        },
        a04: function (upPrice, min_purchase_limit, normal_price, oo) {
            //要记得：免费活动，只免了买家运费，没有免卖家运费，所以要在包邮门槛，把运费加进去，别亏本。
            //在满多少包邮的情况下,还有10%的利润，如果没有就【上调价格】，直到有为止。
            ////////////////////////////////////////////////////////////
            //定价[不含平台费] = (全球商品价格 + 上调价格) * 件倍数 * 汇率
            let price01 = (normal_price + upPrice) * oo.sku.startAmount * oo.siteObj.exchangeRate
            let discountPrice = this.b05(price01, oo.siteObj)//打折后[含平台费]
           let MinimumOrder = this.b02(min_purchase_limit, discountPrice, oo.siteObj.fullPrice, oo.siteObj.taxRate);//免运需要的【最低购买数量】
          ///////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////
            //为什么要“*1000”？因为是按克算的，我的是千克，所以要“*1000”。
            let Weight = oo.ManualReview_1688_unitWeight * 1000 * MinimumOrder * oo.sku.startAmount//重量
            let freight = Tool.logistics.b03(Weight, oo.logistics, "Seller")//跨境物流成本[藏价]
            //免运价[不含平台费] = (全球商品价格 + 上调价格) * 汇率 * (件数 * 件倍数)
            let price02 = ((normal_price + upPrice) * oo.siteObj.exchangeRate) * MinimumOrder * oo.sku.startAmount
            //采购成本 = (采购价 * (件数 * 件倍数) + 运费 + 贴单费) * 汇率
            let price03 = (normal_price * (MinimumOrder * oo.sku.startAmount) + oo._1688_freight + 3) * oo.siteObj.exchangeRate
            /////////////////////////////////////////////////////
            //利润 = 免运价[不含平台费] - 跨境物流成本[藏价]  - 采购成本
            let price04 = price02 - freight[1] - price03
            //采购利润率 = 利润 / 采购成本 * 100
            let price05 = price04 / price03 * 100
            /////////////////////////////////
            if (price05 < 10) {
                //没有10%的利润则上调全球商品价格。
                $("#state").html("价格上调")
                this.a04(upPrice + 0.05, min_purchase_limit, normal_price, oo)
            }
            else {
                this.a05(freight, min_purchase_limit, MinimumOrder, upPrice, normal_price, discountPrice, price01, price02, price03, price04, price05, oo);
            }
        },
        a05: function (freight, min_purchase_limit, MinimumOrder, upPrice, normal_price, discountPrice, price01, price02, price03, price04, price05, oo) {
            let discount_normal_price = discountPrice / (1 - oo.discount / 100)//打折前定价
            oo.dom.append('\
                <tr><td class="right">满' + oo.siteObj.fullPrice + '需要件数：</td><td colspan="2">' + MinimumOrder + '</td></tr>\
                <tr><td class="right">手动审核1688后单位重量：</td><td colspan="2">' + oo.ManualReview_1688_unitWeight.toFixed(4) + ' KG （注：这个在上传到【全球商品】处理过了，这次直接用。另外需要注意的是计算运算用的是“克”，而不是“千克”。）</td></tr>\
                <tr><td class="right">跨境物流成本[藏价]：</td><td colspan="2">' + freight[0] + '（当地币）</td></tr>\
                <tr><td class="right">上调价格：</td><td colspan="2">' + upPrice.toFixed(4) + '（人币民）<font color="#999">在满多少包邮的情况下,还有10%的利润，如果没有就【上调价格】，直到有为止。<font/></td></tr>\
                <tr>\
                    <td class="right">定价[不含平台费]：</td>\
                    <td colspan="2">\
                        = (全球商品价格 + 上调价格) * 汇率 * 件倍数<br/>\
                        = ('+ normal_price + ' + ' + upPrice.toFixed(4) + ') * ' + oo.siteObj.exchangeRate + ' * ' + oo.sku.startAmount + '<br/>\
                        = <b>' + price01.toFixed(4) + '</b>（当地币）</td>\
                </tr>\
                <tr>\
                    <td class="right">定价[含平台费]：</td>\
                    <td colspan="2">\
                        = 定价[不含平台费] / (1 - 佣金费率 - 活动服务费率 - 交易手续费率) <br/>\
                        = ' + price01.toFixed(4) + ' / (1 - ' + (oo.siteObj.commissionRate / 100) + ' - ' + (oo.siteObj.activityServiceRate / 100) + ' - ' + (oo.siteObj.transactionFees / 100) +') <br/>\
                        = <b>' + discountPrice.toFixed(4) + '</b>（当地币）</td>\
                </tr>\
                <tr>\
                    <td class="right">定价[税后]：</td>\
                    <td colspan="2">\
                        = 定价[含平台费] * (1 + 税率) <br/>\
                        = ' + discountPrice.toFixed(4) + ' * (1 + ' + (oo.siteObj.taxRate / 100) + ' ) <br/>\
                        = <b>' + (discountPrice * (1 + (oo.siteObj.taxRate / 100))).toFixed(2) + '</b>（当地币）</td>\
                </tr>\
                <tr>\
                    <td class="right">定价[打折前]：</td>\
                    <td colspan="2">\
                         = 定价[含平台费]  / (1 - 折扣) <br/>\
                         = '+ discountPrice.toFixed(4) + " / (1 - " + (oo.discount / 100) + ')<br/>\
                         = <b>'+ discount_normal_price.toFixed(oo.siteObj.scale) + '</b>（当地币）\
                   </td>\
                </tr>\
                <tr>\
                    <td class="right">满定价[不含平台费] ：</td>\
                    <td colspan="2">\
                    = 定价[不含平台费] * 件数<br/>\
                    = '+ price01.toFixed(4) + ' * ' + MinimumOrder + ' <br/>\
                    = <b>' + price01.toFixed(2) + '</b>（当地币）</td>\
                </tr>\
                <tr>\
                    <td class="right">采购成本：</td>\
                    <td colspan="2">\
                    = (采购价 * 件数 * 件倍数 + 运费 + 贴单费) * 汇率<br/>\
                    = ('+ normal_price + ' * ' + MinimumOrder + ' * ' + oo.sku.startAmount+' + ' + oo._1688_freight + ' + 3)  * ' + oo.siteObj.exchangeRate + '<br/>\
                    = <b>' + price03.toFixed(2) + '</b>（当地币）</td></tr>\
                <tr>\
                    <td class="right">利润：</td>\
                    <td colspan="2">\
                    = 满定价[不含平台费] - 跨境物流成本[藏价] - 采购成本<br/>\
                    = ' + price01.toFixed(4) + ' - ' + freight[1] + ' - ' + price03.toFixed(4) + '<br/>\
                    = <b>' + price04.toFixed(4) + '</b>（当地币）</td></tr>\
                <tr>\
                    <td class="right">采购利润率：</td>\
                    <td colspan="2">\
                        = 利润 / 采购成本 * 100<br/>\
                        = ' + price04.toFixed(4) + ' / ' + price03.toFixed(4) + ' * 100<br/>\
                        = <b>' + price05.toFixed(4) + '%</b>\
                    </td>\
                </tr>\
            ');
            this.a06(min_purchase_limit, normal_price, upPrice, discount_normal_price, oo);
        },
        a06: function (min_purchase_limit, normal_price, upPrice, discount_normal_price, oo) {
            //算批发价
            let wholesale_list = [], len = oo.sku.currentPrices.length
            for (let i = 1; i < len; i++) {
                if (oo.sku.currentPrices[i].beginAmount > min_purchase_limit && parseFloat(oo.sku.currentPrices[i].price)  < normal_price ) {
                    let max_count = 0
                    if (i == len - 1) {
                        max_count = oo.sku.currentPrices[i].beginAmount * 2
                    }
                    else {
                        max_count = oo.sku.currentPrices[i + 1].beginAmount - 1
                    }
                    ////////////////////////////////////////////
                    if (max_count < 999999) {//shopee有这个限制
                        //商品涨价，这个就报错了。
                        //wholesale_list.push(
                        //    {
                        //        "min_count": oo.sku.currentPrices[i].beginAmount,
                        //        "max_count": max_count,
                        //        "input_price": this.b03((parseFloat(oo.sku.currentPrices[i].price) + upPrice) * oo.sku.startAmount, oo.siteObj, oo.discount).toFixed(2)
                        //    }
                        //)
                    }
                }
            }
            //wholesale_list        表示批发信息
            oo.dom.append('<tr><td class="right">批发：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(wholesale_list, null, 2) + '</textarea></td></tr>');
            let o1 = {
                min_purchase_limit: min_purchase_limit,// 最低购买数量
                wholesale_list: wholesale_list,//批发
                upPrice: upPrice,//上调价格
                discount_normal_price: discount_normal_price,//打折前定价
            }
            Tool.apply(o1, oo.next, oo.This, oo.t);
        },
        ///////////////////////////////////////////////
        //提升价格要不到运费,那就提升【最低购买数量】加【提升50%价格】来要回来。
        b01: function (price, min_purchase_limit, _1688_freight) {
            let maxLimit = 0
            for (let i = min_purchase_limit + 1; i < min_purchase_limit + 1000; i++) {
                if (price * i >= _1688_freight) {
                    maxLimit = i;
                    break;
                }
            }
            return maxLimit
        },
        //算计买家满多少的【最低购买量】
        b02: function (MinimumOrder, price1, fullPrice, taxRate) {
            let price2 = price1 + price1 * (taxRate / 100)//税后
            //scale 是什么？答：采购时，需按这个倍数增加数量。
            while (price2 * MinimumOrder < fullPrice) {
                MinimumOrder++;
            }                 
            return MinimumOrder;
        },
        //打折前定价
        b03: function (price, siteObj, discount) {
            //全球商品价格 * 汇率 
            let price1 = price * siteObj.exchangeRate
            //打折前 = 商品价格 / 40%折扣 = 100 / (1-0.40) = 166.66666666666666666666666666667（按这个 + 公式定原价）
            let price2 = price1 / (1 - discount / 100)
            //打折后 = 打折前 * 40%折扣 = 166.66666666666666666666666666667 * (1 - 0.40) = 100
            /////////////////////////////////////////
            //1 - 佣金费率 - 活动服务费率 - 2%交易手续费率
            let Rate = 1 - siteObj.commissionRate / 100 - siteObj.activityServiceRate / 100 - siteObj.transactionFees / 100
            ////////////////////////////////////////////////////////
            let price3 = (price2 / Rate)
            return price3
        },
        //提升价格来要回运费，最多提升50%
        b04: function (normal_price, min_purchase_limit, _1688_freight) {
            let promote_num = 0;
            for (let i = 0; i < 50; i++) {
                let price1 = normal_price * ((i + 1) / 100)//每次提升1%
                if (price1 * min_purchase_limit >= _1688_freight) {
                    promote_num = i + 1;
                    break;
                }
            }
            return promote_num
        },
        //打折后[含平台费]
        b05: function (price, siteObj) {
            //打折后[含平台费] = 打折后[不含平台费] / (1 - 佣金费率 - 活动服务费率 - 交易手续费率)
            let Rate = 1 - siteObj.commissionRate / 100 - siteObj.activityServiceRate / 100 - siteObj.transactionFees /100
            let discountPrice = price / Rate//店铺商品价格
            return discountPrice
        },
    },
})