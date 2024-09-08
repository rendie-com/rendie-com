'use strict';
Object.assign(Tool, {
    upDHgateSeep2:
    {
        //单位 和 销售方式（按件卖，按包卖）
        sortby_packquantity_measureid: function (unit, lotNum) {
            let measureid = this.measureid(unit), proLeadingtime = "4"
            let Narr = [
                //销售计量单位
                {
                    "name": "measureid",
                    "value": measureid
                },
                //销售方式:   (1)按件卖      (2)按包卖
                {
                    "name": "sortby",
                    "value": lotNum == 1 ? 1 : 2
                },
                //每包产品的数量：xxx 件
                {
                    "name": "packquantity",
                    "value": lotNum
                },
                //备货状态:     (1)有备货  (2)备货途中  (3)待备货 
                {
                    "name": "inventoryStatus",
                    "value": "1"
                },
                //库存扣减方式： (1)下单扣减库存  (2)支付扣减库存
                {
                    "name": "subtractStockType",
                    "value": "1"
                },
                //备货地：中国
                {
                    "name": "inventoryLocation",
                    "value": "CN"
                },
                //备货期：xx 天
                {
                    "name": "proLeadingtime",
                    "value": proLeadingtime
                }]
            ////////////////////////////////////////////////////////
            let str = '\
			<tbody>\
            <tr>\
				<td class="right w200">销售计量单位：</td>\
				<td>'+ this.select_measureid(measureid, unit) + '</td>\
			</tr>\
			<tr>\
				<td class="right">销售方式：</td>\
				<td>\
					<table>\
                    <tr>\
                    <td><label class="radio-inline" style="margin-right:25px;">\
						<input type="radio" disabled="disabled" class="form-check-input" name="sortby" '+ (lotNum == 1 ? 'checked="checked"' : '') + '> 按件卖【单位：' + Tool.upDHgateSeep2.unmeasureid(unit) + '】\
					</label>\
					</td>\
                    <td><label class="radio-inline">\
						<input type="radio" disabled="disabled" class="form-check-input" name="sortby" '+ (lotNum == 1 ? '' : 'checked="checked"') + '> 按包卖【每包产品的数量：\
					</label>\
                    </td>\
                    <td><input name="packquantity" value="' + lotNum + '" type="text" class="form-control w100 center" disabled="disabled" size="6" maxlength="8"></td>\
                    <td>' + Tool.upDHgateSeep2.unmeasureid(unit) + '】</td>\
                    </tr>\
                    </table>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">备货状态：</td>\
				<td>\
					<label class="radio-inline" style="margin-right:25px;">\
						<input type="radio" disabled="disabled" class="form-check-input" name="inventoryStatus" checked="checked"> 有备货\
					</label>\
					<label class="radio-inline" style="margin-right:25px;">\
						<input type="radio" disabled="disabled" class="form-check-input" name="inventoryStatus"> 备货途中\
					</label>\
					<label class="radio-inline">\
						<input type="radio" disabled="disabled" class="form-check-input" name="inventoryStatus"> 待备货\
					</label>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">库存扣减方式：</td>\
				<td>\
					<label class="radio-inline" style="margin-right:25px;">\
						<input type="radio" disabled="disabled" class="form-check-input" name="subtractStockType" checked="checked"> 下单扣减库存\
					</label>\
					<label class="radio-inline">\
						<input type="radio" disabled="disabled" class="form-check-input" name="subtractStockType"> 支付扣减库存\
					</label>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">备货地：</td>\
				<td><input class="form-control w100" maxlength="40" name="inventoryLocation" type="text" disabled="disabled" value="中国"></td>\
			</tr>\
			<tr>\
				<td class="right">备货期：</td>\
				<td><input class="form-control w100" maxlength="40" name="proLeadingtime" type="text" disabled="disabled" value="'+ proLeadingtime + '天"></td>\
			</tr>\
            </tbody>'
            $("#body2").html(str);
            return Narr;
        },
        select_measureid: function (measureid, unit) {
            return '<table class="w-100">\
			<tr>\
			<td class="w-25">\
			<select class="form-select" name="measureid">\
				<option value=""> --未知单位 --</option>\
				<option value="00000000000000000000000000000001" '+ (measureid == "00000000000000000000000000000001" ? 'selected="selected"' : '') + '>打(Dozen)</option>\
				<option value="00000000000000000000000000000002" '+ (measureid == "00000000000000000000000000000002" ? 'selected="selected"' : '') + '>英尺(Feet)</option>\
				<option value="00000000000000000000000000000003" '+ (measureid == "00000000000000000000000000000003" ? 'selected="selected"' : '') + '>件(Piece)</option>\
				<option value="00000000000000000000000000000004" '+ (measureid == "00000000000000000000000000000004" ? 'selected="selected"' : '') + '>套(Set)</option>\
				<option value="00000000000000000000000000000005" '+ (measureid == "00000000000000000000000000000005" ? 'selected="selected"' : '') + '>克(Gram)</option>\
				<option value="00000000000000000000000000000008" '+ (measureid == "00000000000000000000000000000008" ? 'selected="selected"' : '') + '>英寸(Inch)</option>\
				<option value="00000000000000000000000000000009" '+ (measureid == "00000000000000000000000000000009" ? 'selected="selected"' : '') + '>千克(Kilogram)</option>\
				<option value="00000000000000000000000000000010" '+ (measureid == "00000000000000000000000000000010" ? 'selected="selected"' : '') + '>千米(Kilometre)</option>\
				<option value="00000000000000000000000000000011" '+ (measureid == "00000000000000000000000000000011" ? 'selected="selected"' : '') + '>升(Liter)</option>\
				<option value="00000000000000000000000000000012" '+ (measureid == "00000000000000000000000000000012" ? 'selected="selected"' : '') + '>吨(Metric Tonne)</option>\
				<option value="00000000000000000000000000000013" '+ (measureid == "00000000000000000000000000000013" ? 'selected="selected"' : '') + '>米(Meter)</option>\
				<option value="00000000000000000000000000000015" '+ (measureid == "00000000000000000000000000000015" ? 'selected="selected"' : '') + '>毫升(Milliliter)</option>\
				<option value="00000000000000000000000000000016" '+ (measureid == "00000000000000000000000000000016" ? 'selected="selected"' : '') + '>盎司(Ounce)</option>\
				<option value="00000000000000000000000000000017" '+ (measureid == "00000000000000000000000000000017" ? 'selected="selected"' : '') + '>双(Pair)</option>\
				<option value="00000000000000000000000000000018" '+ (measureid == "00000000000000000000000000000018" ? 'selected="selected"' : '') + '>磅(Pound)</option>\
				<option value="00000000000000000000000000000022" '+ (measureid == "00000000000000000000000000000022" ? 'selected="selected"' : '') + '>平方码(Square Yard)</option>\
				<option value="00000000000000000000000000000023" '+ (measureid == "00000000000000000000000000000023" ? 'selected="selected"' : '') + '>平方米(Square Meter)</option>\
				<option value="00000000000000000000000000000024" '+ (measureid == "00000000000000000000000000000024" ? 'selected="selected"' : '') + '>平方英尺(Square Feet)</option>\
				<option value="00000000000000000000000000000028" '+ (measureid == "00000000000000000000000000000028" ? 'selected="selected"' : '') + '>码(Yard)</option>\
				<option value="00000000000000000000000000000029" '+ (measureid == "00000000000000000000000000000029" ? 'selected="selected"' : '') + '>厘米(Centimeter)</option>\
				<option value="00000000000000000000000000000033" '+ (measureid == "00000000000000000000000000000033" ? 'selected="selected"' : '') + '>箱(Carton)</option>\
				<option value="00000000000000000000000000000100" '+ (measureid == "00000000000000000000000000000100" ? 'selected="selected"' : '') + '>立方米(Cubic metre)</option>\
			</select></td>\
			<td class="right w-25">速卖通单位：</td>\
			<td>'+ unit + '</td>\
			</tr>\
		</table>'
        },
        measureid: function (unit) {
            let ret
            unit = (unit.toLowerCase()).replace(/(^\s*)|(\s*$)/g, '')
            switch (unit) {
                case "dozen": ret = "00000000000000000000000000000001"; break;//打(Dozen)
                case "feet": ret = "00000000000000000000000000000002"; break;//英尺(Feet)
                case "piece":
                case "combo":
                case "barrel":
                case "pieces":
                    ret = "00000000000000000000000000000003"; break;//件(Piece)
                case "set":
                case "sets":
                case "pack":
                case "packs":
                case "lot":
                case "barrels":
                case "bag":
                case "bags":
                    ret = "00000000000000000000000000000004"; break;//套(Set)
                case "gram": ret = "00000000000000000000000000000005"; break;//克(Gram)
                case "inch": ret = "00000000000000000000000000000008"; break;//英寸(Inch)
                case "kilogram": ret = "00000000000000000000000000000009"; break;//千克(Kilogram)
                case "kilometre": ret = "00000000000000000000000000000010"; break;//千米(Kilometre)
                case "liter":
                case "liters":
                    ret = "00000000000000000000000000000011"; break;//升(Liter)
                case "metrictonne": ret = "00000000000000000000000000000012"; break;//吨(MetricTonne)
                case "meter": ret = "00000000000000000000000000000013"; break;//米(Meter)
                case "milliliter": ret = "00000000000000000000000000000015"; break;//毫升(Milliliter)
                case "ounce": ret = "00000000000000000000000000000016"; break;//盎司(Ounce)
                case "pair": ret = "00000000000000000000000000000017"; break;//双(Pair)
                case "pound": ret = "00000000000000000000000000000018"; break;//磅(Pound)
                case "squareyard": ret = "00000000000000000000000000000022"; break;//平方码(SquareYard)
                case "squaremeter":
                case "square meter":
                    ret = "00000000000000000000000000000023"; break;//平方米(SquareMeter)
                case "squarefeet": ret = "00000000000000000000000000000024"; break;//平方英尺(SquareFeet)
                case "yard":
                case "yards":
                    ret = "00000000000000000000000000000028"; break;//码(Yard)
                case "centimeter": ret = "00000000000000000000000000000029"; break;//厘米(Centimeter)
                case "carton": ret = "00000000000000000000000000000033"; break;//箱(Carton)
                default: ret = "未知单位"
            }
            return ret;
        },
        unmeasureid: function (unit) {
            let measureid = Tool.upDHgateSeep2.measureid(unit)
            let ret
            switch (measureid) {
                case "00000000000000000000000000000001": ret = "打(Dozen)"; break;
                case "00000000000000000000000000000002": ret = "英尺(Feet)"; break;
                case "00000000000000000000000000000003": ret = "件(Piece)"; break;
                case "00000000000000000000000000000004": ret = "套(Set)"; break;
                case "00000000000000000000000000000005": ret = "克(Gram)"; break;
                case "00000000000000000000000000000008": ret = "英寸(Inch)"; break;
                case "00000000000000000000000000000009": ret = "千克(Kilogram)"; break;
                case "00000000000000000000000000000010": ret = "千米(Kilometre)"; break;
                case "00000000000000000000000000000011": ret = "升(Liter)"; break;
                case "00000000000000000000000000000012": ret = "吨(MetricTonne)"; break;
                case "00000000000000000000000000000013": ret = "米(Meter)"; break;
                case "00000000000000000000000000000015": ret = "毫升(Milliliter)"; break;
                case "00000000000000000000000000000016": ret = "盎司(Ounce)"; break;
                case "00000000000000000000000000000017": ret = "双(Pair)"; break;
                case "00000000000000000000000000000018": ret = "磅(Pound)"; break;
                case "00000000000000000000000000000022": ret = "平方码(SquareYard)"; break;
                case "00000000000000000000000000000023": ret = "平方米(SquareMeter)"; break;
                case "00000000000000000000000000000024": ret = "平方英尺(SquareFeet)"; break;
                case "00000000000000000000000000000028": ret = "码(Yard)"; break;
                case "00000000000000000000000000000029": ret = "厘米(Centimeter)"; break;
                case "00000000000000000000000000000033": ret = "箱(Carton)"; break;
                default: ret = "未知单位：" + measureid
            }
            return ret
        },
        //把国家组成分组，按价格分组，最多10组，并对分组中的国家按价格倒序。
        country_group: {
            //取出价格
            a01: function (sku) {
                let priceArr = [];
                for (let k in sku) {
                    if (sku[k][0][1].freight.company) {//没有运费模板的国家不要
                        priceArr.push({
                            country: k,
                            price: sku[k][1][1]//第一个价格。
                        })
                    }
                }
                return this.a02(priceArr)
            },
            //按价格分组，最多10组
            a02: function (priceArr) {
                priceArr = this.b03(priceArr)//翻译
                let arrSku = {};
                let nArr = this.b01(priceArr, 0)//需要数组【priceArr】在10个以内（包含）【默认误差为正负0%】
                for (let i = 0; i < nArr.length; i++) {
                    let min_max = "_" + parseInt(nArr[i].min) + "_" + parseInt(nArr[i].max)
                    arrSku[min_max] = [];
                    for (let j = 0; j < priceArr.length; j++) {
                        if (priceArr[j]) {
                            if (nArr[i].min <= priceArr[j].price && priceArr[j].price <= nArr[i].max) {
                                arrSku[min_max].push(priceArr[j])//国家   
                                priceArr[j] = null;//去重用的。比如：当前价13；范围10至15和13至18；就会重复，所以用这个去重（先到先得）
                            }
                        }
                    }
                }
                return this.a03(arrSku)
            },
            //并对分组中的国家按价格倒序。
            a03: function (arrSku) {
                for (let k in arrSku) {
                    arrSku[k] = Tool.objsortZ_A(arrSku[k], "price")//倒序
                }
                return arrSku;
            },
            //需要数组【priceArr】在10个以内（包含）
            b01: function (priceArr, I) {
                //当I=0时，误差为正负0%
                //当I=1时，误差为正负1%
                //当I=2时，误差为正负2%
                //当I=3时，误差为正负3%
                let nArr = [];
                for (let i = 0; i < priceArr.length; i++) {
                    let oo = {
                        price: priceArr[i].price,
                        min: priceArr[i].price - (priceArr[i].price * (I / 100)),
                        max: priceArr[i].price + (priceArr[i].price * (I / 100))
                    }
                    /////////////////////////////////////////////////
                    if (i == 0) {
                        nArr.push(oo)
                    }
                    else {
                        nArr = this.b02(nArr, oo);//给【nArr】增加长度
                    }
                }
                if (nArr.length > 10) {
                    I++;
                    return this.b01(nArr, I)
                }
                else {
                    return nArr;
                }
            },
            //给【nArr】增加长度
            b02: function (nArr, priceObj) {
                let isbool = false;
                for (let j = 0; j < nArr.length; j++) {
                    //priceObj.price       是否在【nArr】范围内。
                    if (nArr[j].min <= priceObj.price && priceObj.price <= nArr[j].max) {
                        isbool = true;
                        break;
                    }
                }
                if (!isbool) nArr.push(priceObj);
                return nArr;
            },
            //翻译
            b03: function (arr1) {
                let arr2 = Tool.country()
                for (let i = 0; i < arr1.length; i++) {
                    let name = "", enname = "";
                    for (let j = 0; j < arr2.length; j++) {
                        if (arr1[i].country == arr2[j].id) {
                            name = arr2[j].name;
                            enname = arr2[j].enname;
                            break;
                        }
                    }
                    arr1[i].name = name
                    arr1[i].enname = enname
                }
                return arr1;
            }
        }
    }
})
