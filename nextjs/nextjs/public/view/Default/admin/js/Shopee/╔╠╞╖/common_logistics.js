'use strict';
Object.assign(Tool, {
    logistics:
    {
        a01: function (site, dom, next, This, t) {
            let oo = {
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            let data = [{
                action: "sqlite",
                database: "shopee/物流方式",
                sql: "select @.cargo_types as cargo_types FROM @.table where @.name='" + site.toUpperCase() + "'"                
            }]
            Tool.ajax.a01(data, this.a02, this, oo);
        },
        a02: function (t, oo) {
            let cargo_types = JSON.parse(t[0][0].cargo_types)
            if (oo.dom) {
                oo.dom.html(this.b01(cargo_types));
            }
            Tool.apply(cargo_types[0].channels[0].zones[0].fee_modes, oo.next, oo.This, oo.t)
        },
        b01: function (oo) {
            return '\
            <table class="table mb-0 center align-middle">\
                 <tr class="table-light">\
                     <th class="">【第一个】货品种类</th>\
                     <th class="">【第一个】渠道</th>\
                     <th class="">【第一个】地区</th>\
                     <th class="">跨境物流成本（藏价）</th>\
                 </tr>\
                 <tr>\
                     <td>'+ oo[0].cn_name + '</td>\
                     <td>'+ oo[0].channels[0].cn_name + '</td>\
                     <td>'+ oo[0].channels[0].zones[0].cn_name + '</td>\
                     <td>'+ this.b02(oo[0].channels[0].zones[0].fee_modes, "Seller") + '</td>\
                 </tr>\
                 <tr>\
                     <td colspan="4" class="left">\
                         为什么要用【第一个】？答：因为【第一个】一定是“普货”，基本我的商品都是“普货”，没有“重货”和“大件”，地区的“藏价”也相同。\
                     </td>\
                 </tr>\
                 <tr>\
                     <td colspan="4" class="left">\
                         运费公式为：首重价格 + 阶梯运费1 + 阶梯运费2 + 阶梯运费3 + 阶梯运费n <br/>\
                         阶梯运费：向上取整(（续重范围【大】 - 续重范围【小】）/ 续重) * 续重价格）<br/>\
                         例如：商品重量：500g，那么不包邮运费价格为：' + this.b03(500, oo[0].channels[0].zones[0].fee_modes, "Seller")[0] + '\
                     </td>\
                 </tr>\
             </table>'
        },
        b02: function (arr, type) {
            let nArr = [], Flat = "";
            arr.sort(function (a, b) {
                return a.start_weight - b.start_weight;
            });
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    if (arr[i].start_weight != null) {
                        nArr.push(
                            (
                                arr[i].end_weight ?
                                    (
                                        arr[i].start_weight ?
                                            arr[i].start_weight + 'g ~ ' + arr[i].end_weight + 'g : ' :
                                            '&lt;=' + arr[i].end_weight + 'g : '
                                    ) :
                                    (
                                        arr[i].start_weight ?
                                            '&gt;' + arr[i].start_weight + "g : " : ''
                                    )
                            ) +
                            (
                                arr[i].original_fee ?
                                    arr[i].original_fee :
                                    arr[i].increment_amount + '/' + arr[i].increment_unit + "g"
                            )
                        )
                    }
                    else {
                        Flat = arr[i].original_fee
                    }
                }
            }
            return nArr.join("<hr/>") + Flat
        },
        b03: function (pro_weight, arr, type) {
            arr.sort(function (a, b) {
                return a.start_weight - b.start_weight;
            });
            let nArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    nArr.push({
                        start_weight: arr[i].start_weight,//续重范围【小】
                        end_weight: arr[i].end_weight,//续重范围【大】
                        increment_amount: arr[i].increment_amount,//续重价格
                        increment_unit: arr[i].increment_unit,//续重
                        original_fee: arr[i].original_fee,//首重价格 
                    })
                }
            }
            ///////////////////////////////////////
            let showArr = [], price = 0
            for (let i = 0; i < nArr.length; i++) {
                if (nArr[i].original_fee) {//有【首重价格】
                    showArr.push(nArr[i].original_fee)
                    price += nArr[i].original_fee
                }
                else {
                    if (pro_weight >= nArr[i].start_weight) {
                        //!nArr[i].end_weight               表示最后一个阶梯为“null”
                        //pro_weight < nArr[i].end_weight   表示商品重量小于阶梯的最大值，那就是最后一个阶梯了。
                        if (!nArr[i].end_weight || pro_weight < nArr[i].end_weight) { nArr[i].end_weight = pro_weight; }
                        showArr.push("Math.ceil((" + nArr[i].end_weight.toFixed(4) + " - " + nArr[i].start_weight + ") / " + nArr[i].increment_unit + ") * " + nArr[i].increment_amount)
                        price += Math.ceil((nArr[i].end_weight - nArr[i].start_weight) / nArr[i].increment_unit) * nArr[i].increment_amount
                    }
                    else {
                        break;
                    }
                }
            }
            return [(showArr.length == 1 ? price : showArr.join(" + ") + " = " + price), price]
        },
    },
})