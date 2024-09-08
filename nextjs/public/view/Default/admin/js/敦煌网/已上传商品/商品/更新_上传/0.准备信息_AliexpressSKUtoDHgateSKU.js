'use strict';
Object.assign(Tool, {
    AliexpressSKUtoDHgateSKU:
    {
        a01: function (DHattr, AliexpressSKU, freight, ratio, DHattrPic, HistoryInfo) {
            //DHattr.name           属性英文名
            //DHattr.nameCn  	    属性中文名
            //DHattr.required       是否必填
            //DHattr.isother        是否有other属性值
            //DHattr.defined        属性的属性值是否可以自定义修改
            //DHattr.buyAttr        是否购买属性（购买时，必选项）
            //DHattr.ischild        是否子属性（好加事件）
            //DHattr.attrId         属性ID
            //DHattr.type           DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
            //DHattr.js    	        js代码
            let buyAttr = [];
            for (let i = 0; i < DHattr.length; i++) {
                if (DHattr[i].buyAttr == "1") { buyAttr.push(DHattr[i]); }
            }
            ////////////////////////////////////////////////////
            AliexpressSKU = this.b13(AliexpressSKU, freight, ratio, this.b25(HistoryInfo))//免邮价格 = （(成本 + 运费 + 10%采购税费 + 5%换汇差) * 价格倍数）+ 敦煌网阶梯手续费
            AliexpressSKU = this.b15(AliexpressSKU, DHattrPic)//替换成敦煌网的图片。
            if (AliexpressSKU.err) {
                return AliexpressSKU;
            }
            else {
                return this.a02(buyAttr, AliexpressSKU);
            }
        },
        a02: function (buyAttr, AliexpressSKU) {
            for (let k in AliexpressSKU) {
                $("#state").html('速卖通有' + (AliexpressSKU[k][0].length - 2) + "组，敦煌网有" + buyAttr.length + "组。");
                switch (AliexpressSKU[k][0].length) {
                    case 2: AliexpressSKU[k] = this.b27(buyAttr, AliexpressSKU[k]);; break;//速卖通有0组，说明是单价格。
                    case 3: AliexpressSKU[k] = this.b17(buyAttr, AliexpressSKU[k]); break;//速卖通有1组
                    case 4: AliexpressSKU[k] = this.b26(buyAttr, AliexpressSKU[k]); break;//速卖通有2组
                    case 5: AliexpressSKU[k] = this.b18(buyAttr, AliexpressSKU[k]); break;//速卖通有3组
                    case 6: AliexpressSKU[k] = this.b29(buyAttr, AliexpressSKU[k]); break;//速卖通有4组
                    case 7: AliexpressSKU[k] = this.b30(buyAttr, AliexpressSKU[k]); break;//速卖通有5组
                    case 8: AliexpressSKU[k] = this.b31(buyAttr, AliexpressSKU[k]); break;//速卖通有6组
                    default: bbbbbbbbbbbbbb; break;
                }
            }
            return this.a03(AliexpressSKU);
        },
        //显示绑定结果。
        a03: function (AliexpressSKU) {
            $("#state").html("正在显示绑定后“二维表格”。");
            let str01 = '', str02 = '', count = 0;
            for (let k in AliexpressSKU) {
                count++;
                str01 += this.b23(k, count)
                str02 += '<table class="table table-hover center mb-0 align-middle' + (count == 1 ? '' : ' hide') + '" val="' + k + '_dhgate">' + this.b24(AliexpressSKU[k]) + '</table>';
            }
            str01 = '<ul class="makeHtmlTab" id="dhgateSkuTitle">' + str01 + '</ul>' + str02
            $("#dhgate_Sku").html(str01);
            return this.a04(AliexpressSKU);
        },
        //加事件
        a04: function (AliexpressSKU) {
            $("#dhgateSkuTitle li").click(function () {
                $("#dhgateSkuTitle li").removeAttr('class')
                $(this).attr("class", "hover")
                $("table[val$='_dhgate']").hide();
                let val = $(this).attr("val")
                $("table[val='" + val + "_dhgate']").show();
            });
            return this.a05(AliexpressSKU)
        },
        //如果加购属性值名称长度大于40，则库存设置为0；
        //并且改名为“Non saleable 编号”格式；
        a05: function (AliexpressSKU) {
            for (let k in AliexpressSKU) {
                for (let j = 2; j < AliexpressSKU[k][0].length; j++) {
                    let valueArr = AliexpressSKU[k][0][j].value, arr = []
                    for (let i = 0; i < valueArr.length; i++) {
                        arr = valueArr[i][0].split("==")
                        if (arr[0].length > 40) {
                            valueArr[i][0] = "Non saleable " + i + "==" + arr[1];//注：会改变【AliexpressSKU】的值
                        }
                    }
                }
                /////////////////////////////
                for (let i = 1; i < AliexpressSKU[k].length; i++) {
                    let isbool = false, arr = [];
                    for (let j = 2; j < AliexpressSKU[k][i].length; j++) {
                        arr = AliexpressSKU[k][i][j][0].split("==")
                        if (arr[0].length > 40) {
                            isbool = true;
                            AliexpressSKU[k][i][j][0] = "长度大于40,库存设置为0==" + arr[1];//在【2.销售信息】显示
                        }
                        if (isbool) AliexpressSKU[k][i][0] = 0;//库存设置为0
                    }
                }
            }
            return AliexpressSKU;
        },
        //敦煌提升一组
        b01: function () {
            let arr = []
            for (let i = 0; i < 20; i++) {
                arr.push({
                    "attrValId": 1000 + i,
                    "lineAttrvalName": "自定义规格" + (i + 1)
                })
            }
            return {
                "name": "self",
                "nameCn": "自定义规格",
                "attrId": 9999,
                "js": arr
            }
        },
        //获取敦煌属性名。
        b02: function (buyAttr) {
            let nArr = [];
            for (let i = 0; i < buyAttr.length; i++) {
                nArr.push(buyAttr[i].name)
            }
            return nArr;
        },

        //属性值绑定1。
        b03: function (buyAttr, AliexpressSKU0i) {
            let name = AliexpressSKU0i.name.split("==")[1]//表示绑定的敦煌标题。
            let dhValue = [];
            for (let i = 0; i < buyAttr.length; i++) {
                if (buyAttr[i].name == name) {
                    dhValue = this.b06(buyAttr[i].js)
                    break;
                }
            }
            return this.b04(dhValue, AliexpressSKU0i.value)
        },
        //属性值绑定2。
        b04: function (dhValue, aliexpressValue) {
            for (let i = 0; i < aliexpressValue.length; i++) {
                let name = "没绑定上属性值", aliValue = ""
                for (let j = 0; j < dhValue.length; j++) {
                    aliValue = aliexpressValue[i][0] == "3XL" ? "XXXL" : aliexpressValue[i][0];//在敦煌这边用的是“XXXL”，所以转换一下。
                    if (aliValue == dhValue[j]) {
                        name = dhValue[j];
                        dhValue[j] = null;
                        break;
                    }
                }
                aliexpressValue[i][0] += "==" + name
            }

            return this.b07(dhValue, aliexpressValue);
        },
        //显示属性值绑定结果。
        b05: function (dhValue, aliexpressName) {
            let name = "找不到"
            for (let i = 0; i < dhValue.length; i++) {
                if (dhValue[i][0].split("==")[0] == aliexpressName) {
                    name = dhValue[i][0];
                    break;
                }
            }
            if (name == "找不到") { name = "这一行不要,因为速卖通不显示==DH属性值个数不足" }
            return name;
        },
        //获取敦煌属性值。
        b06: function (dhValue) {
            let nArr = [];
            for (let i = 0; i < dhValue.length; i++) {
                nArr.push(dhValue[i].lineAttrvalName)
            }
            return nArr;
        },
        //属性值绑定3,(属性值绑定不上的，就随便绑了)。
        b07: function (dhValue, aliexpressValue) {
            for (let i = 0; i < aliexpressValue.length; i++) {
                let Rstr = "DH属性值个数不足", valueArr = aliexpressValue[i][0].split("==")
                if (valueArr[1] == "没绑定上属性值") {
                    for (let j = 0; j < dhValue.length; j++) {
                        if (dhValue[j]) {
                            Rstr = dhValue[j]
                            dhValue[j] = null;
                            break;
                        }
                    }
                    aliexpressValue[i][0] = valueArr[0] + "==" + Rstr


                }
            }

            return aliexpressValue;
        },
        //速卖通N组合并（向尾部合并）
        //表示要保留几组
        b08: function (AliexpressSKU, I) {
            I++;//保留1组，下标为2；保留2组，下标为3；...
            let arr0 = ["库存", AliexpressSKU[0][1]], len0 = AliexpressSKU[0].length;
            for (let i = 2; i < len0; i++) {
                //如：当速卖通有2组长度为4，并合成1组(即I下标为2)。
                //当i为2时开始
                //当i为3时false
                //当i为4时跳出
                //i为2，3时合并。
                /////////////////////////////////////
                //如：当速卖通有3组长度为5，并合成2组(即I下标为3)。
                //当i为2时true
                //当i为3时开始
                //当i为4时false
                //当i为5时跳出。
                //i为3，4时合并。i为2不变。
                /////////////////////////////////////
                //如：当速卖通有3组长度为5，并合成1组(即I下标为2)。
                //当i为2时开始
                //当i为3时false
                //当i为4时false
                //当i为5时跳出。
                //i为2，3，4时合并。
                /////////////////////////////////////
                //如：当速卖通有4组长度为6，并合成3组(即I下标为4)。
                //当i为2时true
                //当i为3时true
                //当i为4时开始
                //当i为5时false
                //当i为6时跳出
                //i为4，5时合并。i为2，3不变。
                ////////////////////////////////////////////
                if (i < I) {//I前面的标题保留                    
                    arr0[i] = AliexpressSKU[0][i];
                }
                else if (i == I) {
                    arr0[I] = { name: AliexpressSKU[0][I].name, value: AliexpressSKU[0][I].value }
                }
                else {
                    //I后面的标题合并到这个里                    
                    arr0[I].name += " " + AliexpressSKU[0][i].name
                    arr0[I].value = this.b09(arr0[I].value, AliexpressSKU[0][i].value);
                }
            }
            AliexpressSKU[0] = arr0;
            return this.b10(AliexpressSKU, I, len0);
        },
        //速卖通属性值合并.                
        b09: function (arr1, arr2) {
            let arr3 = [];
            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    let pic = "";//图片是单选
                    if (arr1[i][1]) { pic = arr1[i][1]; }
                    else if (arr2[j][1]) { pic = arr2[j][1]; }
                    ///////////////////////////////
                    arr3.push([
                        arr1[i][0] + " " + arr2[j][0],
                        pic
                    ])

                }

            }
            return arr3;
        },
        //速卖通属性值合并.                
        b10: function (AliexpressSKU, I, len0) {
            for (let i = 1; i < AliexpressSKU.length; i++) {
                let arri = [AliexpressSKU[i][0], AliexpressSKU[i][1]];
                for (let j = 2; j < len0; j++) {
                    //说明：同上
                    if (j < I) {
                        arri[j] = AliexpressSKU[i][j];
                    }
                    else if (j == I) {
                        arri[I] = [AliexpressSKU[i][I][0], AliexpressSKU[i][I][1]];
                    }
                    else {
                        arri[I] = this.b11(arri[I], AliexpressSKU[i][j])
                    }
                }
                AliexpressSKU[i] = arri;
            }
            return AliexpressSKU;
        },
        //速卖通属性值合并.                
        b11: function (arr1, arr2) {
            let arr3 = [];
            if (arr1[1]) arr3.push(arr1[1]);
            if (arr2[1]) arr3.push(arr1[1]);
            arr1[1] = arr3.join(" ")
            arr1[0] += " " + arr2[0]
            //下标0是属性值名称
            //下标1是图片地址
            return arr1;
        },
        //选最小运费
        b12: function (freight) {
            //注：deliveryDayMax  不可能大于28天，也不能可超过$10，因为采集时就没进来。
            let free = {}, minFamount = 100;
            for (let i = 0; i < freight.length; i++) {
                let fre = parseFloat(freight[i].fAmount);
                if (fre < minFamount) {//选最小
                    free = freight[i];
                    minFamount = fre;
                }
            }
            return free
        },
        //免邮价格 = （(((成本 * 最小折扣) + 运费) + 10%采购税费) + 5%换汇差) * 价格倍数）+ 敦煌网阶梯手续费
        b13: function (AliexpressSKU, freight, ratio, minDiscount) {
            for (let k in AliexpressSKU) {
                let free = this.b12(freight[k]);
                AliexpressSKU[k][0][1] = { name: "价格", freight: free };
                //////////////////////////////////
                for (let i = 1; i < AliexpressSKU[k].length; i++) {
                    if (free.company) {
                        let price = AliexpressSKU[k][i][1] * ((100 - minDiscount) * 0.01);//成本 * 最小折扣
                        price = price + free.fAmount;//成本 + 运费
                        price = price * 1.1//+ 10%采购税费
                        price = price * 1.05//+ 5%换汇差
                        price = price * ratio//* 价格倍数
                        price = this.b14(price)// + 敦煌网阶梯手续费
                        AliexpressSKU[k][i][1] = price
                    }
                    else {
                        AliexpressSKU[k][i][1] = "无运费模板"
                    }
                }
            }
            return AliexpressSKU
        },
        //敦煌网阶梯手续费
        b14: function (price) {
            let NewPrice = 0;
            if (price < 300) {
                NewPrice = price + (price * 0.0473)//0.0473      是怎么算出来的？已知填100时，显示124.23        可以得出：(124.23-(100*1.195))/100=0.0473            手续费为：4.73%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            else if (price < 1000) {
                NewPrice = price + (price * 0.00696)//0.00696    是怎么算出来的？已知填500时，显示543.48        可以得出：(543.48-(500*1.08))/500=0.00696            手续费为：0.696%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            else {
                NewPrice = price + (price * 0.00127)//0.00127    是怎么算出来的？已知填2000时，显示2072.54      可以得出：(2072.54-(2000*1.035))/2000=0.00127         手续费为：0.127%
                NewPrice = Math.ceil(NewPrice * 100) / 100//向上取整
            }
            return NewPrice
        },
        //替换成敦煌网的图片。
        b15: function (sku, DHattrPic) {
            let isbool = false,
                ispic = false,//是否有图
                picLen = 0;//是否找到相同的图片个数
            for (let k in sku) {
                let sku0 = sku[k][0];
                for (let i = 2; i < sku0.length; i++) {
                    picLen = this.b32(sku0[i].value);
                    if (picLen) ispic = true;
                    //“DHattrPic.length != 0”是什么意思？【已审核过的属性图个数】没有，但当前有。
                    if (picLen == DHattrPic.length && DHattrPic.length != 0) {
                        isbool = true;
                        sku0[i].value = this.b16(sku0[i].value, DHattrPic);//替换
                        break;
                    }
                }
            }
            if (isbool || !ispic) {//速卖通没有图就不用替换
                return sku;
            }
            else {
                let errInfo = {
                    err: "速卖通的属性图片与敦煌的属性图片个数不一样，没法继续。当前属性图个数：" + picLen + "；已审核过的属性图个数：" + DHattrPic.length + "；",
                    BeforeReview: 6
                }
                return errInfo;
            }

        },
        //替换成敦煌网的图片。
        b16: function (arr, DHattrPic) {
            for (let i = 0; i < arr.length; i++) {
                if (DHattrPic[i]) {//表示有图替换
                    arr[i][1] = DHattrPic[i].picC.fileurl;
                }
                else {//表示不给图片
                    arr[i][1] = "";
                }
            }
            return arr;
        },
        //速卖通有1组，敦煌N组
        b17: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    //this.b01()     敦煌提升一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有1组。
                case 2:
                    AliexpressSKU = this.b28(AliexpressSKU)//速卖通提升一组
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有2组。
                default: alert("敦煌网大于3组，没做"); break;
            }
            return AliexpressSKU;
        },
        //速卖通有3组，敦煌N组
        b18: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    AliexpressSKU = this.b08(AliexpressSKU, 1);//速卖通3组合并成一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b08(AliexpressSKU, 2);//速卖通3组合并成二组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有1组。
                case 2:
                    //this.b01()      敦煌提升一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有2组。
                case 3:
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有3组。
                default: alert("敦煌网大于3组，没做"); break;
            }
            return AliexpressSKU;
        },
        //速卖通与敦煌的组数相同
        b19: function (buyAttr, AliexpressSKU) {
            //标题绑定到速卖通“二维表格”中。
            let arr = this.b02(buyAttr)//获取敦煌属性名。
            for (let i = 2; i < AliexpressSKU[0].length; i++) {
                let title = "没绑定";
                for (let j = 0; j < arr.length; j++) {
                    if (AliexpressSKU[0][i].name == arr[j]) {
                        title = arr[j];
                        arr[j] = null;
                        break;
                    }
                }
                AliexpressSKU[0][i].name = AliexpressSKU[0][i].name + "==" + title
            }
            return this.b20(arr, buyAttr, AliexpressSKU)//把没绑定的“属性名”随便绑定一下
        },
        //把没绑定的“属性名”随便绑定一下。因为：“属性名”不一样就只能这样了。（注：这里俩边是组数是一样的）
        b20: function (arr, buyAttr, AliexpressSKU) {
            for (let i = 2; i < AliexpressSKU[0].length; i++) {
                if (AliexpressSKU[0][i].name.indexOf("==没绑定") != -1) {
                    let title = "没绑定";
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j]) { title = arr[j]; arr[j] = null; break; }
                    }
                    AliexpressSKU[0][i].name = AliexpressSKU[0][i].name.split("没绑定")[0] + title;
                }
            }
            return this.b21(buyAttr, AliexpressSKU)//“属性值”绑定。
        },
        //“属性值”绑定。
        b21: function (buyAttr, AliexpressSKU) {
            //获取俩边的属性值,进行绑定。
            for (let i = 2; i < AliexpressSKU[0].length; i++) {
                AliexpressSKU[0][i].value = this.b03(buyAttr, AliexpressSKU[0][i]);//属性名绑定。
            }
            /////////////////////////////////////////////////
            for (let i = 1; i < AliexpressSKU.length; i++) {
                for (let j = 2; j < AliexpressSKU[0].length; j++) {
                    AliexpressSKU[i][j][0] = this.b05(AliexpressSKU[0][j].value, AliexpressSKU[i][j][0])
                }
            }
            return AliexpressSKU;
        },
        //显示标题
        b22: function (sku0) {
            let td = '<th>编号</th><th>库存</th><th title=\'免邮价格 = (((((成本 * 最小折扣) + 最低运费) + 10%采购税费) + 5%换汇差) * 价格倍数) + 敦煌网阶梯手续费\n换汇差=采购汇差+提现汇差\n敦煌网阶梯手续费：敦煌网会在你设置价格的时后扣手续费，所以我加了这个，可确保手续费不会要太多。\n运费：【28天送达】且【运费<$10】\n最低运费模板:\n' + JSON.stringify(sku0[1].freight, null, 2) + '\'>设置成本</th>';
            for (let j = 2; j < sku0.length; j++) {
                td += '<th title=\'提示：（' + sku0[j].value.length + '个）\n' + JSON.stringify(sku0[j], null, 2) + '\'>' + sku0[j].name + '</th>'
            }
            return '<thead class="table-light"><tr>' + td + '</tr></thead>'
        },
        b23: function (k, count) {
            let arr = Tool.country(), str = '';
            for (let i = 0; i < arr.length; i++) {
                if (k == arr[i].id) {
                    str = '<li val="' + k + '" ' + (count == 1 ? ' class="hover"' : '') + ' title="' + arr[i].enname + '（' + arr[i].id + '）">' + count + '.' + arr[i].name + '</li>'
                    break;
                }
            }
            return str;
        },
        b24: function (sku) {
            let str = this.b22(sku[0]) + '<tbody>';
            for (var i = 1; i < sku.length; i++) {
                let td = "";
                for (let j = 0; j < sku[0].length; j++) {
                    if (j < 2) {
                        td += '<td>' + sku[i][j] + '</td>'
                    }
                    else if (sku[i][j][1]) {//是否有图片
                        td += '\
                        <td class="p-0 left">\
                            <a target="_blank" href="' + sku[i][j][1].split("_50x50")[0] + '">\
                            <img class="border" src="' + sku[i][j][1] + '" title="点击预览" width="50">\
                            '+ sku[i][j][0] + '\
                            </a>\
                        </td>'
                    }
                    else {
                        td += '<td>' + sku[i][j][0] + '</td>'
                    }
                }
                str += '<tr><td>' + i + '</td>' + td + '</tr>'
            }
            return str + '<tbody>';
        },
        //取3次中的最小折扣
        b25: function (HistoryInfo) {
            let Min = 0, val;//取3次中的最小折扣
            if (HistoryInfo.length >= 3) {
                Min = parseInt(HistoryInfo[0].Discount)
                for (let i = 1; i < HistoryInfo.length; i++) {
                    val = parseInt(HistoryInfo[i].Discount)
                    if (val < Min) { Min = val; }
                }
            }
            return Min
        },
        //速卖通有2组，敦煌N组
        b26: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    AliexpressSKU = this.b08(AliexpressSKU, 1);//速卖通2组合并成一组
                    //this.b01()     敦煌提升一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    //this.b01()     敦煌提升一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有1组。
                case 2:
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有2组。
                case 3:
                    AliexpressSKU = this.b28(AliexpressSKU)//速卖通提升一组
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有3组。
                default: ttttttttttt; break;
            }
            return AliexpressSKU;
        },
        //速卖通有0组，敦煌N组
        b27: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0: AliexpressSKU = this.b19(buyAttr, AliexpressSKU); break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b28(AliexpressSKU)//速卖通提升一组
                    AliexpressSKU = this.b19(buyAttr, AliexpressSKU);
                    break;//敦煌网有1组。
                default: ffffffff; break;
            }
            return AliexpressSKU;
        },
        //速卖通提升一组
        b28: function (AliexpressSKU) {
            AliexpressSKU[0].push({
                "name": "self",
                "value": [["option 1", null]]
            })
            for (let i = 1; i < AliexpressSKU.length; i++) {
                AliexpressSKU[i].push(["option 1", null])
            }
            return AliexpressSKU
        },
        //速卖通有4组，敦煌N组
        b29: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    AliexpressSKU = this.b08(AliexpressSKU, 1);//速卖通4组合并成一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b08(AliexpressSKU, 2);//速卖通4组合并成二组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有1组。
                case 2:
                    AliexpressSKU = this.b08(AliexpressSKU, 3);//速卖通4组合并成3组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有2组。
                case 3:
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有3组。
                default: alert("敦煌网大于3组，没做"); ffffffff; break;
            }
            return AliexpressSKU;
        },
        //速卖通有5组，敦煌N组
        b30: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    AliexpressSKU = this.b08(AliexpressSKU, 1);//速卖通5组合并成一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b08(AliexpressSKU, 2);//速卖通5组合并成二组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有1组。
                case 2:
                    AliexpressSKU = this.b08(AliexpressSKU, 3);//速卖通5组合并成三组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有2组。
                case 3:
                    AliexpressSKU = this.b08(AliexpressSKU, 4);//速卖通5组合并成四组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有3组。
                default: ffffffff; break;
            }
            return AliexpressSKU;
        },
        //速卖通有6组，敦煌N组
        b31: function (buyAttr, AliexpressSKU) {
            switch (buyAttr.length) {
                case 0:
                    AliexpressSKU = this.b08(AliexpressSKU, 1);//速卖通6组合并成一组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有0组，说明没有价格属性。
                case 1:
                    AliexpressSKU = this.b08(AliexpressSKU, 2);//速卖通6组合并成二组
                    AliexpressSKU = this.b19(buyAttr.concat(this.b01()), AliexpressSKU);
                    break;//敦煌网有1组。
                default: ffffffff; break;
            }
            return AliexpressSKU;
        },
        //获取图片个数
        b32: function (arr) {
            let len = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][1]) len++;
            }
            return len;
        },

    }
})

