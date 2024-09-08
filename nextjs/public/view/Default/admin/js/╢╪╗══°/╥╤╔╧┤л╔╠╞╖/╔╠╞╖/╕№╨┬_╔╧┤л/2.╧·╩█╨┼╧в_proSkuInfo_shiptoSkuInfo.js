'use strict';
Object.assign(Tool.upDHgateSeep2, {
    proSkuInfo_shiptoSkuInfo: {
        a01: function (sku, unit, proid, c0_300, c300_1000, c1000_, ratio, NewBuyAttr) {
           let str01 = "", str02 = "", proCount = 0, count = 0;
            let oArr = Tool.upDHgateSeep2.country_group.a01(sku);//把国家组成分组，按价格分组，最多10组，并对分组中的国家按价格倒序。
            for (let k in oArr) {
                count++;
                str01 += this.b08(oArr[k], k, count);//以国家为标题
                let arr2 = this.b09(sku[oArr[k][0].country], count, k, unit, proid, c0_300, c300_1000, c1000_, ratio);
                proCount = arr2[0];//库存数量
                str02 += arr2[1];//表内数据
            }
            str01 = '<ul class="makeHtmlTab" id="proSkuInfo_shiptoSkuInfoSkuTitle">' + str01 + '</ul>';
            return this.a02(sku, proid, unit, NewBuyAttr, proCount, str01 + str02, oArr);
        },
        a02: function (sku, proid, unit, NewBuyAttr, proCount, str, oArr) {
            $("#body2").append('\
				<tbody>\
                <tr>\
					<td class="right">备货总量：</td>\
					<td>'+ proCount + ' ' + Tool.upDHgateSeep2.unmeasureid(unit) + '</td>\
				</tr>\
				</tbody>\
                <tr>\
					<td class="right">产品价格区间：</td>\
					<td class="p-0">\
						'+ str + '\
                        <table class="table table-hover mb-0 align-middle">\
						    <thead class="table-light"><tr><th colspan="3">设置产品的价格区间</th></tr></thead>\
						    <tr><td class="right w100">购买</td><td class="w100"><input class="form-control" type="text" disabled="disabled" value="0"></td><td>' + Tool.upDHgateSeep2.unmeasureid(unit) + '及以上时，为表格中填写的预计收入。</td></tr>\
                        </table>\
					</td>\
				</tr>');
            return this.a03(sku, proid, NewBuyAttr, oArr);
        },
        a03: function (sku, proid, NewBuyAttr, oArr) {
            $("#proSkuInfo_shiptoSkuInfoSkuTitle li").click(function () {
                $("#proSkuInfo_shiptoSkuInfoSkuTitle li").removeAttr('class')
                $(this).attr("class", "hover")
                $("table[val$='_proSkuInfo_shiptoSkuInfo']").hide();
                let val = $(this).attr("val")
                $("table[val='" + val + "_proSkuInfo_shiptoSkuInfo']").show();
            });
            return this.a04(sku, proid, NewBuyAttr, oArr);
        },
        a04: function (sku, proid, NewBuyAttr, oArr) {
            let proSkuInfo = {}, shiptoSkuInfo = [], count = 0, Rsku = [];
            for (let k in oArr) {
                //说明：敦煌只给10个【区域价】（注：没有美国）
                Rsku = sku[oArr[k][0].country];
                if (this.b04(oArr[k], "US")) {//没有美国那设置为【标准价格】
                    proSkuInfo = this.b12(Rsku, proid, NewBuyAttr);//注：这个是【标准格格】
                }
                else if (this.b04(oArr[k], "BR,IE,NL,UK,DE,SE,CA,AU,IT,FR,MY,IN,ES")) {//这些国家是可以设置【区域价】的。
                    count++;
                    shiptoSkuInfo.push(this.b15(Rsku, NewBuyAttr, oArr[k], count))

                } else {
                    Tool.pre(["这个国家能设置【区域价】吗？", oArr[k]]);
                    aaaaaaaaaaaaaaaaaaaaa
                }
            }
            return this.a05(proSkuInfo, shiptoSkuInfo, Rsku, proid, NewBuyAttr)
        },
        a05: function (proSkuInfo, shiptoSkuInfo, skuK, proid, NewBuyAttr) {
            ///////////如果去【美国】没有运费模板，就随便给个国家的价格，反正又不送过去的。//////////////////////////////////////
            if (!proSkuInfo.prodInvenLocationList) {
                proSkuInfo = this.b12(skuK, proid, NewBuyAttr);//注：这个是【标准价格】
            }
            ////////////////////////////////
            let Narr = [
                {
                    "name": "proSkuInfo",
                    "value": JSON.stringify(proSkuInfo)
                },
                {
                    "name": "shiptoSkuInfo",
                    "value": JSON.stringify(shiptoSkuInfo)
                }]
            return Narr;
        },
        b01: function (sku0) {
            let thead = '';
            for (let i = 2; i < sku0.length; i++) {
                thead += '<th>' + sku0[i].name.split("==")[1] + '</th>'
            }
            return thead
        },
        b02: function (stock) {
            return '<select class="form-select"><option value="1"' + (stock == 0 ? '' : 'selected=""') + '>可销售</option><option value="0"' + (stock == 0 ? 'selected=""' : '') + '>不可销售</option></select>'
        },
        b03: function (price, unit) {
            return '\
                <table>\
				<tr>\
					<td>US $</td>\
					<td><input class="form-control w100" type="text" disabled="disabled" value="'+ price + '"></td>\
					<td>/'+ Tool.upDHgateSeep2.unmeasureid(unit) + '</td>\
				</tr>\
				</table>'
        },
        //从arr1中找str,找到返回True，否则返回False
        b04: function (arr1, str) {
            let isbool = false, arr2 = str.split(",");
            for (let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < arr1.length; j++) {
                    if (arr1[j].country == arr2[i]) {
                        isbool = true;
                        break;
                    }
                }
                if (isbool) break;
            }
            return isbool;
        },
        b05: function (stock, unit) {
            return '<table>\
						    <tr>\
							    <td><input class="form-control w100" type="text" disabled="disabled" value="'+ stock + '"></td>\
							    <td>'+ Tool.upDHgateSeep2.unmeasureid(unit) + '</td>\
						    </tr>\
						</table>'
        },
        b06: function () {


        },
        b07: function (price, c0_300, c300_1000, c1000_, ratio) {
            let NewPrice = 0;
            if (price < 300) {
                NewPrice = price + (price * c0_300 / 100)
                NewPrice = NewPrice + (price * 0.0473)//0.0473      是怎么算出来的？已知填100时，显示124.23        可以得出：(124.23-(100*1.195))/100=0.0473            手续费为：4.73%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            else if (price < 1000) {
                NewPrice = price + (price * c300_1000 / 100)
                NewPrice = NewPrice + (price * 0.00696)//0.00696    是怎么算出来的？已知填500时，显示543.48        可以得出：(543.48-(500*1.08))/500=0.00696            手续费为：0.696%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            else {
                NewPrice = price + (price * c1000_ / 100);
                NewPrice = NewPrice + (price * 0.00127)//0.00127    是怎么算出来的？已知填2000时，显示2072.54      可以得出：(2072.54-(2000*1.035))/2000=0.00127         手续费为：0.127%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            /////////////////////////////////////////////
            //1.5       表示我要的利润。
            let Discount = 1.5 / ratio;
            let str = '<span style="font-size:20px;">$' + (Math.ceil((NewPrice * Discount) * 100) / 100) + '</span> <s> $' + NewPrice + '</s> <span style="color:#666"> ' + (Math.ceil(((1 - Discount) * 100) * 100) / 100) + '% off</span>'
            return str
        },
        //单选国家
        b08: function (cArr, val, count) {
            let nameArr = [], str = '';
            for (let i = 0; i < cArr.length; i++) {
                nameArr.push(cArr[i].name)

            }
            str = '<li val="' + val + '" ' + (count == 1 ? ' class="hover"' : '') + ' title=\'' + JSON.stringify(cArr, null, 2) + '\'>（' + count + '）' + nameArr.join("、") + '</li>'
            return str;
        },
        //显示价格
        b09: function (sku, count, val, unit, proid, c0_300, c300_1000, c1000_, ratio) {
            let str = '', num = 0, proCount = 1;
            for (let i = 1; i < sku.length; i++) {
                let td = '', isbool = true;
                for (let j = 2; j < sku[i].length; j++) {
                    if (sku[i][j][0].split("==")[1] == "DH属性值个数不足") { isbool = false; break; }//只要有一组有【DH属性值个数不足】，那么这行行就不要了。
                    td += '<td>' + sku[i][j][0].split("==")[0] + '</td>'
                }
                if (isbool) {
                    proCount += sku[i][0]
                    num++
                    str += '\
                        <tr>\
                            <td>' + num + '</td>\
                            ' + td + '\
                            <td>中国</td>\
                            <td>' + this.b02(sku[i][0]) + '</td>\
                            <td>' + this.b03(sku[i][1], unit) + '</td>\
                            <td>' + this.b07(sku[i][1], c0_300, c300_1000, c1000_, ratio) + '</td>\
                            <td>' + this.b05(sku[i][0], unit) + '</td>\
                            <td><input class="form-control w150" type="text" disabled="disabled" value="'+ proid + "_" + num + '"></td>\
                        </tr>'
                }
            }
            return [proCount, '<table class="table table-hover align-middle center' + (count == 1 ? '' : ' hide') + '" val="' + val + '_proSkuInfo_shiptoSkuInfo">' + this.b10(sku[0], c0_300, c300_1000, c1000_) + str + '</table>']

        },
        //显示价格标题
        b10: function (sku0, c0_300, c300_1000, c1000_) {
            return '\
                <thead class="table-light">\
                <tr>\
                    <th>编号</td>\
                    '+ this.b01(sku0) + '\
                    <th>备货地</th>\
                    <th>销售状态</th>\
                    <th>预计收入</th>\
                    <th><img src="/' + o.path + 'admin/img/dhgate/commission01.png" width="18" title="佣金\n\
订单金额US$300.0以下,佣金率为' + c0_300.toFixed(2) + '%;手续费为4.73%;\n\
订单金额大于等于US$300.0小于US$1000.0,佣金率为' + c300_1000.toFixed(2) + '%;手续费为0.696%;\n\
订单金额US$1000.0以上,佣金率为' + c1000_.toFixed(2) + '%;手续费为：0.127%;\n\
注意：预计收入中需扣减支付手续费"> <a href="https://seller.dhgate.com/help/c7001/363001.html" target="_blank">买家价格</a></th>\
                    <th>备货数量</th>\
                    <th>商品编码</th>\
                </tr>\
                </thead>'
        },
        //把SKU里面绑定的名称转成ID
        b11: function (name, value, NewBuyAttr1) {
            let NewBuyAttr2 = NewBuyAttr1.concat(this.b13())//敦煌提升一组(这里主要是提取ID用的)
            let oo = {
                "attrId": "",
                "attrVid": "",
                "type": "1",
                "class": "##"
            }
            for (let i = 0; i < NewBuyAttr2.length; i++) {
                if (NewBuyAttr2[i].name.name == name) {
                    oo.attrId = "" + NewBuyAttr2[i].attrId;
                    let arr = NewBuyAttr2[i].js;
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].lineAttrvalName == value) {
                            oo.attrVid = "" + arr[j].attrValId;
                            break;
                        }
                    }
                    break;
                }
            }
            return oo;
        },
        b12: function (newSku, proid, NewBuyAttr) {
            let NewArr = [], count = 0;
            for (let i = 1; i < newSku.length; i++) {
                let isbool = true, newTD = [];
                for (let j = 2; j < newSku[i].length; j++) {
                    if (newSku[i][j][0].split("==")[1] == "DH属性值个数不足") { isbool = false; break; }//只要有一组有【DH属性值个数不足】，那么这行行就不要了。
                    newTD.push(this.b11(newSku[0][j].name.split("==")[1], newSku[i][j][0].split("==")[1], NewBuyAttr))
                }
                if (isbool) {
                    newTD.push({
                        "attrId": "8888",
                        "attrVid": "CN",
                        "type": "1",
                        "class": "##"
                    })
                    count++
                    NewArr.push({
                        "class": "#",
                        "attrList": newTD,
                        "status": newSku[i][0] == 0 ? "0" : "1",
                        "price": "" + newSku[i][1],
                        "stock": "" + newSku[i][0],
                        "skuCode": proid + "_" + count,
                        "id": this.b14(newTD),
                    })
                }
            }
            return {
                "prodInvenLocationList": [
                    {
                        "class": "###",
                        "inventoryLocation": "CN",
                        "leadingTime": "4"
                    }
                ],
                "skuInfoList": NewArr
            }
        },
        //敦煌提升一组(这里主要是提取ID用的)
        b13: function () {
            let arr = []
            for (let i = 0; i < 20; i++) {
                arr.push({
                    "attrValId": 1000 + i,
                    "lineAttrvalName": "自定义规格" + (i + 1)
                })
            }
            return [{
                "name": {
                    "name": "self"
                },
                "nameCn": "自定义规格",
                "attrId": 9999,
                "js": arr
            }]
        },
        //做成这种格式“977639_1369528A977645_1369579A9999_1000A8888_CN”
        b14: function (newTD) {
            let attrIdArr = []
            for (let j = 0; j < newTD.length; j++) {
                attrIdArr.push(newTD[j].attrId + "_" + newTD[j].attrVid);
            }
            return attrIdArr.join("A")
        },
        //
        b15: function (newSku, NewBuyAttr, kArr, count) {
            let shiptoSkuList = []
            for (let i = 1; i < newSku.length; i++) {
                let isbool = true, newTD = [];
                for (let j = 2; j < newSku[i].length; j++) {
                    if (newSku[i][j][0].split("==")[1] == "DH属性值个数不足") { isbool = false; break; }//只要有一组有【DH属性值个数不足】，那么这行行就不要了。
                    newTD.push(this.b11(newSku[0][j].name.split("==")[1], newSku[i][j][0].split("==")[1], NewBuyAttr))
                }
                if (isbool) {
                    newTD.push({
                        "attrId": "8888",
                        "attrVid": "CN",
                        "type": "1",
                        "class": "##"
                    })
                    shiptoSkuList.push({
                        "class": "#",
                        "attrList": newTD,
                        "price": "" + newSku[i][1],
                        "buyerPrice": "",
                        "id": this.b14(newTD)
                    })
                }
            }
            ///////////////////////////////////////
            let shiptoCountry = []
            for (let i = 0; i < kArr.length; i++) {
                shiptoCountry.push({
                    "code": kArr[i].country,
                    "area": "Southeast Asia"//这个可能不重要
                })
            }
            /////////////////////////////
            return {
                "shiptoCountry": shiptoCountry,
                "regionCode": count,
                "shiptoSkuList": shiptoSkuList,
                "discountRange": [
                    {
                        "startqty": "1",
                        "discount": "0"
                    }
                ],
                "price": ""
            }
        },
    }
})
