'use strict';
Object.assign(Tool, {
    getAliexpressSKU:
    {
        a01: function (sku, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo) {
            //思路：先把速卖通的价格，做成“二维表格”，然后在已知速卖通的"列数"做成敦煌网的“二维表格”，最后再做成敦煌网要上传的JSON。
            //“二维表格”格式如下：
            //			库存			价格		{name:Color:value:[[red,图片],[blue,图片],...]}			{name:Size:value:[[L,图片],[XL,图片],...]}                    ...
            //			100				10			[red,图片]				                                ...                                                           ...
            //			200				20			[blue,图片]			                                    ...                                                           ...
            //			300				30			[green,图片]			                                ...                                                           ...
            //			...				...			...				                                        ...                                                           ...
            return this.a02(sku, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo);
        },
        a02: function (sku, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo) {
            $("#state").html("正在把速卖通的价格，做成“二维表格”");
            let titleArr = {}, count = 0;
            for (let k in sku) {
                if (sku[k][1]) {//为什么有这个判断？404错误，就是【null】
                    if (count == 0) { count = sku[k][1].length; }
                    else if (count != sku[k][1].length) {
                        let errInfo = {
                            err: "国与国之间的价格个数不一样，没法继续。之前国家的价格个数：" + count + "；现在国家的价格个数：" + sku[k][1].length + "；",
                            BeforeReview: 5
                        }
                        return errInfo;
                    }
                    ///////////////////////////////////////////////////////
                    if (sku[k][0]) {//为什么有这个判断？单价格，就是【null】
                        sku[k][0] = this.b05(sku[k][0])//属性值如果重复，就在前面打“(编号)”
                        titleArr[k] = this.b01(sku[k][0]);//第一行是标题
                    }
                    else {
                        titleArr[k] = ["库存", "价格"]
                    }
                    sku[k][1] = this.b07(sku[k][1]);//库存小于10，就不是可销售,设置为0
                }
            }
            return this.a03(titleArr, sku, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo);
        },
        a03: function (titleArr, sku, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo) {
            let arr1 = {}
            for (let k in sku) {
                if (sku[k][1]) {//当该国不去，就是【null】
                    arr1[k] = [titleArr[k]];
                    for (let i = 0; i < sku[k][1].length; i++) {
                        let arr2 = [];
                        arr2.push(sku[k][1][i].skuVal.availQuantity)
                        arr2.push(sku[k][1][i].skuVal.skuAmount.value)
                        arr2 = arr2.concat(this.b02(sku[k][0], sku[k][1][i].skuAttr))//concat方法拼接(返回一个新数组)
                        arr1[k].push(arr2)
                    }
                }
            }
            $("#state").html("做成“二维表格”中。。。");
            return this.a04(arr1, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo)

        },
        a04: function (arr1, alifromid, fromid, typepath, dhtypepath, ratio, HistoryInfo) {
            $("#state").html("正在显示速卖通“二维表格”。");
            let str01 = '', str02 = '', count = 0;
            for (let k in arr1) {
                count++;
                str01 += this.b09(k, count)
                str02 += '<table class="table table-hover center mb-0 align-middle' + (count == 1 ? '' : ' hide') + '" val="' + k + '_aliexpress">' + this.b08(arr1[k]) + '</table>';
            }
            let urlA = "//www.aliexpress.com/item/" + alifromid + ".html";
            let urlB = "//www.dhgate.com/product/-----/" + fromid + ".html";
            let html = '\
            <table class="table align-middle align-middle border">\
                <tbody>\
                    <tr><td class="right w200">来源地址：</td><td colspan="2"><a href="' + urlA + '" target="_blank">' + urlA + '</a></td></tr>\
                    <tr><td class="right">更新后地址：</td><td colspan="2"><a href="' + urlB + '" target="_blank">' + urlB + '</a></td></tr>\
                    <tr><td class="right">【速卖通】类目：</td><td colspan="2">'+ typepath.join(" &gt; ") + '</td></tr>\
                    <tr><td class="right">绑定到【敦煌网】类目：</td><td colspan="2">'+ dhtypepath.join(" &gt; ") + '</td></tr>\
                    <tr><td class="right">价格倍数：</td><td colspan="2">'+ ratio + ' 倍</td></tr>\
                    <tr><td class="right">历史信息：</td><td colspan="2" class="p-0">'+ this.b10(HistoryInfo) + '</td></tr>\
                    <tr>\
                        <td colspan="3">\
                            <ul class="makeHtmlTab" id="DHandSMT"><li class="hover" val="aliexpress">【速卖通】价格</li><li val="dhgate">绑定到【敦煌网】价格</li></ul>\
                            <div class="border" id="aliexpress_Sku">\
                                <ul class="makeHtmlTab" id="aliexpressSkuTitle">'+ str01 + '</ul>\
                                ' + str02 + '\
                            </div>\
                            <div class="border hide" id="dhgate_Sku"></div>\
                        </td>\
                    </tr>\
                </tbody>\
            </table>'
            $("#body0").html(html);
            return this.a05(arr1);
        },
        a05: function (arr1) {
            $("#aliexpressSkuTitle li").click(function () {
                $("#aliexpressSkuTitle li").removeAttr('class')
                $(this).attr("class", "hover")
                $("table[val$='_aliexpress']").hide();
                let val = $(this).attr("val")
                $("table[val='" + val + "_aliexpress']").show();
            });
            $("#DHandSMT li").click(function () {
                $("#DHandSMT li").removeAttr('class')
                $(this).attr("class", "hover");
                $("div[id$='_Sku']").hide();
                let val = $(this).attr("val")
                $("div[id='" + val + "_Sku']").show();
            });
            $("#state").html("上事件。。。");
            return arr1;
        },
        b01: function (sku0) {
            $("#state").html("正在做速卖通“二维表格”的标题。");
            let nArr = ["库存", "价格"];
            for (let i = 0; i < sku0.length; i++) {
                nArr.push({
                    name: sku0[i].skuPropertyName,
                    value: this.b04(sku0[i].skuPropertyValues)
                })//速卖通“二维表格”的标题
            }
            return nArr;
        },
        //从sku标题中，找名称和图片
        b02: function (sku0, skuAttr) {
            let nArr = [];
            if (sku0) {//为什么有这个判断？单价格，就是【null】
                for (let i = 0; i < sku0.length; i++) {
                    //属性名ID
                    let isArr = []
                    for (let j = 0; j < sku0[i].skuPropertyValues.length; j++) {
                        //属性值ID
                        if (this.b03(skuAttr, sku0[i].skuPropertyId + ":" + sku0[i].skuPropertyValues[j].propertyValueIdLong)) {//是否找到ID
                            isArr = [sku0[i].skuPropertyValues[j].skuPropertyTips, sku0[i].skuPropertyValues[j].skuPropertyImageSummPath];//[名称,图片]
                            break;
                        }
                    }
                    $("#state").html("正在给这一列上数据。");
                    if (isArr.length == 0) {
                        isArr = ["没找到名称、速卖通也不显示", null]
                    }
                    nArr.push(isArr)
                }
            }

            return nArr


        },
        //是否找到ID
        b03: function (skuAttr, val) {
            let arr = skuAttr.split(";")
            let isbool = false;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].split("#")[0] == val) { isbool = true; break; }
            }
            return isbool;
        },
        b04: function (value) {
            let nArr = []
            for (let i = 0; i < value.length; i++) {
                nArr.push([value[i].skuPropertyTips, value[i].skuPropertyImageSummPath])
            }
            return nArr;
        },
        //属性值如果重复，就在后面打“编号 ”（主要应对“as pic”这种情况）
        b05: function (arr1) {
            for (let i = 0; i < arr1.length; i++) {
                let arr2 = arr1[i].skuPropertyValues, skuPropertyTipsArr = [];
                for (let j = 0; j < arr2.length; j++) {
                    arr2[j].skuPropertyTips = arr2[j].skuPropertyTips.replace(/ +/g, " ");//加这个很重要，花了我很长时间。
                    if (skuPropertyTipsArr.indexOf(arr2[j].skuPropertyTips) != -1) {//表示有重复         
                        arr2[j].skuPropertyTips = "("+(j + 1) + ") " + arr2[j].skuPropertyTips
                    }
                    skuPropertyTipsArr.push(arr2[j].skuPropertyTips)
                }
            }
            return arr1;
        },
        b06: function () {


        },
        //库存小于10，就不是可销售,设置为0
        b07: function (sku) {
            for (let i = 0; i < sku.length; i++) {
                if (sku[i].skuVal.availQuantity < 10) sku[i].skuVal.availQuantity = 0;
            }
            return sku;
        },
        b08: function (sku) {
            let td = "<th>编号</th><th>库存</th><th>价格</th>";
            if (sku[0]) {
                for (let j = 2; j < sku[0].length; j++) {
                    td += '<th title=\'提示(' + sku[0][j].value.length + '个)：\n' + JSON.stringify(sku[0][j], null, 2) + '\'>' + sku[0][j].name + '</th>'
                }
            }
            let str = '\
            <thead class="table-light">\
                <tr>' + td + '</tr>\
            </thead>\
            <tbody>'
            //////////////////////////////////////////
            for (var i = 1; i < sku.length; i++) {
                td = "<td>" + i + "</td>";
                for (let j = 0; j < sku[i].length; j++) {
                    if (j < 2) { td += '<td>' + sku[i][j] + '</td>' }
                    else {
                        if (sku[i][j][1]) {//是否有图片
                            td += '\
                                <td class="p-0 left">\
                                    <a target="_blank" href="' + sku[i][j][1].split("_50x50")[0] + '">\
                                    <img class="border" src="' + sku[i][j][1] + '" title="点击预览" width="50">\
                                    '+ sku[i][j][0] + '\
                                    </a>\
                                </td>'
                        }
                        else { td += '<td>' + sku[i][j][0] + '</td>' }
                    }
                }
                str += '<tr>' + td + '</tr>'
            }
            return '<tbody>' + str + '</tbody>';
        },
        b09: function (k, count) {
            let arr = Tool.country(), str = '';
            for (let i = 0; i < arr.length; i++) {
                if (k == arr[i].id) {
                    str = '<li val="' + k + '" ' + (count == 1 ? ' class="hover"' : '') + ' title="' + arr[i].enname + '（' + arr[i].id + '）">' + count + '.' + arr[i].name + '</li>'
                    break;
                }
            }
            return str;
        },
        b10: function (HistoryInfo) {
            let str = '<thead class="table-light"><tr><th>折扣</th><th>评分</th><th>销量</th><th>评论数</th><th>创建时间</th></tr></thead><tbody>';
            for (let i = 0; i < HistoryInfo.length; i++) {
                str += '\
                <tr>\
                    <td>' + HistoryInfo[i].Discount + '% off</td>\
                    <td>' + HistoryInfo[i].Review + '</td>\
                    <td>' + (HistoryInfo[i].SaleNum ? HistoryInfo[i].SaleNum : "-") + '</td>\
                    <td>' + HistoryInfo[i].ReviewsNum + '</td>\
                    <td>' + HistoryInfo[i].time + '</td>\
                </tr>'
            }
            return '<table class="table table-hover mb-0 center">' + str + '</tbody></table>';
        }
    }
})
