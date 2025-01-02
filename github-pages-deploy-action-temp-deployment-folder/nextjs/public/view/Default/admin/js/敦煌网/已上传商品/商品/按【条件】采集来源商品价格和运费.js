'use strict';
var fun =
{
    obj:
    {
        A1: 1355, A2: 0,//商品进度
        proid: "",//更新时要用
        freight: "",//更新时要用
        aeopAeProductSKUs: "",//更新时要用
        time60: parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 60) / 1000)//-60天
    },
    time: new Date(),
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? Tool.int(obj.arr[5]) : 1;//第几个采购账号
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//国家 如：US
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//敦煌状态（如：未知、已上架、待审核、审核未通过、已下架、品牌商投诉、其它
        let html = Tool.header2(obj.arr[4], '敦煌网 &gt; 已上传商品 &gt; 商品 &gt; 按【条件】采集来源商品价格和运费') + '\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
          <tbody>\
            <tr><td class="right w150">请选择更新条件：</td><td colspan="2">'+ this.b02(obj.arr[5], obj.arr[6], obj.arr[7]) + '</td></tr>\
            <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">请求地址：</td><td id="url"  colspan="2"></td></tr>\
            <tr><td class="right">统计：</td><td id="doTime" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state"  colspan="2"></td></tr>\
            <tr><td class="right">价格：</td><td colspan="2"><textarea style="height:500px;" disabled="disabled" class="form-control" id="aeopAeProductSKUs"></textarea></td></tr>\
            <tr><td class="right">运费：</td><td colspan="2"><textarea style="height:300px;" disabled="disabled" class="form-control" id="freight"></textarea></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        if (obj.arr[6] != "-_-20" && obj.arr[7] != "-_-20") {
            gg.isRD(this.a03, this);
        }
    },
    a03: function () {
        let str = '\
		{\
			<r:proupdhgate size=1 db="sqlite.dhgate" page=2 where=" where @.status='+ obj.arr[7] + '">\
				"proid":"<:proid/>",\
                <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\' and @.time' + obj.arr[6] + '<' + this.obj.time60 + '">\
				    "fromid":<:fromid/>,\
				    <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
					    "freight":<:freight tag=0/>,\
					    "aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
				    </r:prodes>\
			    </r:pro>\
            </r:proupdhgate>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : 0) + '\
		}'
        $("#state").html("正在获取本地数据。。。");
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (oo.fromid) {
            this.obj.fromid = oo.fromid;
            this.obj.proid = oo.proid;//更新时要用
            if (oo.freight == 0) oo.freight = {};
            this.obj.freight = oo.freight;//更新时要用
            if (oo.aeopAeProductSKUs == 0) oo.aeopAeProductSKUs = {};
            this.obj.aeopAeProductSKUs = oo.aeopAeProductSKUs;//更新时要用
            if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null)
        }
        else {
            $("#state").html("【" + this.obj.A1 +"】已经采集，可以下一条。。。");
            this.obj.A1++;
            this.a03();
        }
    },
    a05: function () {
        let url;
        if (obj.arr[6] == "RU") {
            url = 'https://aliexpress.ru/item/' + this.obj.fromid + '.html';
        }
        else if (obj.arr[6] == "US") {
            url = 'https://aliexpress.us/item/' + this.obj.fromid + '.html';
            //url = 'https://www.aliexpress.com/item/' + this.obj.fromid +'.html?spm=a2g0o.productlist.main.17.59a21110wZYORV&pdp_ext_f=%7B"sku_id"%3A"12000034328481703"%7D&utparam-url=scene%3Asearch%7Cquery_from%3Acategory_navigate'
        }
        else {
            url = 'https://www.aliexpress.com/item/' + this.obj.fromid + '.html';
        }
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a06, this);
    },
    a06: function (t) {
        if (typeof (t) == "string") {
            this.e01(t)
        }
        else if (t.data) {
            $("#state").html("要验证。。。");
            this.d01(t.data)
        } else if (t.url) {
            $("#state").html("说明要换账号了。。。");
            Tool.at("说明要换账号了,需要手动操作。\n\n"+t.url)
        } else {
            Tool.pre(["aaaaaaaaaa", t])
        }
    },
    /////////////////////////////////////////////////////////////
    b01: function (arr6) {

    },
    b02: function (arr5, arr6, arr7) {
        let html = '\
        <table class="table mb-0 align-middle">\
            <tbody>\
                <tr><td class="right w150">第几个采购账号：</td><td>请手动登录账号</td></tr>\
                <tr><td class="right">国家：</td><td>'+ this.b03(arr6) + '</td></tr>\
                <tr><td class="right">敦煌状态：</td><td>'+ this.b04(arr7, config.proupdhgate_status_count) + '</td></tr>\
            </tbody>\
        </table>'
        return html;
    },
    b03: function (val) {
        let arr = Tool.country();
        let str = '<option value="-_-20">===请选择国家===</option>'
        for (let i = 0; i < arr.length; i++) {
            str += '<option value="' + arr[i].id + '"' + (val == arr[i].id ? ' selected="selected"' : '') + '>' + (i + 1) + '.国家【' + arr[i].id + '】' + arr[i].name + '（' + arr[i].enname + '）,商品更新时间在【' + Tool.js_date_time2(this.obj.time60) + '】之前的所有商品。(当天减60天的日期)</option>'
        }
        return '<select class="form-select" onchange="fun.c01(6,this.options[this.selectedIndex].value)">' + str + '</select>';
    },
    b04: function (status, configArr) {
        let nArr = [], arr = Tool.StatusArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == status ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select class="form-select" onchange="fun.c01(7,this.options[this.selectedIndex].value)">\
            <option value="-_-20">敦煌状态</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    /////////////////////////////////
    c01: function (I, val) {
        obj.arr[I] = val;
        if (obj.arr[6] != "-_-20" && obj.arr[7] != "-_-20") {
            Tool.open(3, obj.arr[3]);
        }
    },
    ///////////////////////////////////////////
    d01: function (t) {
        if (t.url) {
            $("#state").html("要【滑块验证】。。。");
            this.d02(t.url)
        }
        else {
            Tool.pre(["aaaaaaaaaa", t])
        }
        //if (t.rgv587_flag == "sm") {
        //    $("#state").html("说明这个账号不能用了，要明天才能用。也可能是没登陆。");
        //    Tool.pre(t)
        //    //this.e01()
        //}
        //else
    },
    d02: function (url) {
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, '亲，请拖动下方滑块完成验证', false, this.d03, this);
    },
    d03: function () {
        Tool.ajax.text("/view/Default/admin/js/速卖通/common_注入_移动滑块.js", this.d04, this);
    },
    d04: function (t) {
        $("#state").html("正在填写账号密码,再点登陆。");
        gg.tabs_executeScript_indexOf(2, null, t + "\nfun_rendie.a01()", '<title>AliExpress - Affordable Prices on Top<1/>验证失败<1/>刷新', true, this.a03, this);//请拖动滑块
    },
    /////////////////////////////////////////////////////////////////////
    e01: function (article) {
        if (article.indexOf("not-found.js") != -1) {
            //注：一个商品，在当前国家是404，但在其它国家就不一定是404，所以这里把当前国家的价格清空运费清空
            $("#freight").html("");
            this.e05([], 2, [null, null])
        }
        else if (article.indexOf('window.runParams.is23') != -1) {
            let skuhtml = Tool.regSplits(article, "window.runParams =", "window.runParams.is23")[0];
            let arr1; eval("arr1=" + skuhtml)
            let arr2 = [arr1.data.skuComponent.productSKUPropertyList, arr1.data.priceComponent.skuPriceList]//注：这个是死了。
            $("#aeopAeProductSKUs").html(JSON.stringify(arr2, null, 2))
            if (arr2[1][0].skuVal.skuAmount.currency == "USD") {
                this.e02(article, arr2)
            }
            else {
                Tool.at("当前货币是（" + arr2[1][0].skuVal.skuAmount.currency + "），但是货币必须是美元（USD），程序终止。")
                //this.e01()
            }
        }
        else {
            Tool.at("出错：" + article)
        }
    },
    e02: function (t, aeopAeProductSKUs) {
        $("#state").html("正在截数据...");
        let company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking;
        company = Tool.StrSplits(t, '"company":"', '"')//物流公司
        deliveryDayMax = Tool.StrSplits(t, '"deliveryDayMax":', ',')//运输天数
        fAmount = Tool.StrSplits(t, '\\"fAmount\\":', ',')//运费
        shipFromCode = Tool.StrSplits(t, '"shipFromCode":"', '"')//发货地
        shipToCountry = Tool.StrSplits(t, '\\"shipToCountry\\":\\"', '\\')//发住国家
        tracking = Tool.StrSplits(t, '"tracking=', '"')//能否跟踪
        this.e03(company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking, aeopAeProductSKUs);
    },
    e03: function (company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking, aeopAeProductSKUs) {
        if (company[0] == undefined) {
            $("#state").html("说明不到这个国家...");
            $("#freight").html("");
            this.e05([], 2, [null, null])
        }
        else if (shipToCountry[0] != obj.arr[6]) {
            $("#state").html("速卖通【发住国家】不正确，请修改。当前需要发往【" + obj.arr[6] + "】国家。但现在确是【" + shipToCountry[0] + "】国家。")
            //this.e01()
        }
        else if (company.length == deliveryDayMax.length && deliveryDayMax.length == fAmount.length && fAmount.length == shipFromCode.length && shipFromCode.length == shipToCountry.length && shipToCountry.length == tracking.length) {
            this.e04(company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking, aeopAeProductSKUs)
        }
        else {
            Tool.pre(["速卖通已改版：", company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking])
        }
    },
    e04: function (company, deliveryDayMax, fAmount, shipFromCode, shipToCountry, tracking, aeopAeProductSKUs) {
        //company               物流公司
        //deliveryDayMax        运输天数
        //fAmount               运费
        //shipFromCode          发货地
        //shipToCountry         发住国家
        //tracking              能否跟踪
        let freight = [], shipTo = 2;
        //shipTo        0:表示收运费;1:表示免运费;2:表示不到该国
        for (let i = 0; i < company.length; i++) {
            deliveryDayMax[i] = parseInt(deliveryDayMax[i])
            fAmount[i] = parseFloat(fAmount[i])
            //说明：因为我做的都是免邮，那些高收运费的都不要了。
            if (fAmount[i] < 10 && deliveryDayMax[i] <= 28 && tracking[i] == "visible") {//运费<10；运输天数<=28；能跟踪
                shipTo = 1;//表示免运费
                freight.push({
                    company: company[i],
                    deliveryDayMax: deliveryDayMax[i],
                    fAmount: fAmount[i],
                    shipFromCode: shipFromCode[i],
                    shipToCountry: shipToCountry[i],
                    tracking: tracking[i]
                })
            }
        }
        $("#freight").html(JSON.stringify(freight, null, 2));
        this.e05(freight, shipTo, aeopAeProductSKUs)
    },
    e05: function (freight, shipTo, aeopAeProductSKUs) {
        //shipTo        0:表示收运费;1:表示免运费;2:表示不到该国
        $("#state").html("正在更新...");
        let html = '"ok"<r: db="sqlite.aliexpress">update @.pro set @.time' + obj.arr[6] + '=' + Tool.gettime("") + ',@.shipTo' + obj.arr[6] + '=' + shipTo + ' where @.proid=\'' + this.obj.proid + '\'</r:>'
        this.obj.freight[obj.arr[6]] = freight//用在这
        this.obj.aeopAeProductSKUs[obj.arr[6]] = aeopAeProductSKUs//用在这
        html += '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(this.obj.proid, 50) + '">update @.prodes set @.freight=' + Tool.rpsql(JSON.stringify(this.obj.freight)) + ',@.aeopAeProductSKUs=' + Tool.rpsql(JSON.stringify(this.obj.aeopAeProductSKUs)) + ' where @.proid=\'' + this.obj.proid + '\'</r:>'
        Tool.ajax.a01(html, 1, this.e06, this);
    },
    e06: function (t) {
        if (t == "ok") {
            $("#doTime").html(Tool.doTime(this.time, this.obj.A1, this.obj.A2));
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            $("#freight,#aeopAeProductSKUs,#url").html('');
            $("#state").html('这条完成。');
            this.obj.A1++;
            this.obj.proid = "";//更新时要用
            this.obj.freight = "";//更新时要用
            this.obj.aeopAeProductSKUs = "";//更新时要用
            this.a03();
        }
        else {
            Tool.pre(["出错", t]);
        }
    },
}
fun.a01();










/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//e01: function () {
//    let cookies = [
//        {
//            "url": "https://www.aliexpress.com/",
//            "cookies": [
//                {
//                    "domain": ".aliexpress.com",
//                    "expirationDate": 1736912423.123007,
//                    "hostOnly": false,
//                    "httpOnly": false,
//                    "name": "aep_usuc_f",
//                    "path": "/",
//                    "sameSite": "no_restriction",
//                    "secure": true,
//                    "session": false,
//                    "storeId": "0",
//                    "value": "site=glo&c_tp=USD&region=" + obj.arr[6] + "&b_locale=en_US"
//                }
//            ]
//        }
//    ]
//    gg.setAllCookies(cookies, this.e02, this)
//},
//e02: function (t) {
//    Tool.Time("name", 200, this.a03, this)
//}


//e01: function () {
//       let url = "https://www.aliexpress.com/fn/an-account/index"
//       $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
//       gg.getFetch(url,"json", this.e02, this);
//   },
//   e02: function (t) {
//       if (t.data.data.info_1888.fields.taxApplyInfo) {
//           //有数据就主明是已登陆
//           let url = "https://login.aliexpress.com/xman/xlogout.htm"//退出
//           $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
//           gg.getFetch(url,"json", this.e03, this);
//       }
//       else {
//           //没有登陆
//           Tool.aliexpressLogin.a01(obj.arr[6]);//登陆成功后，会刷新
//       }
//   },
//   e03: function (t) {
//       obj.arr[6]++;
//       Tool.aliexpressLogin.a01(obj.arr[6]);//登陆成功后，会刷新
//   },
//if (t[0].indexOf(">Sorry, the page you requested can not be found:(</span></div></div>") != -1) {//404
//}
//else if (t[0].indexOf(">通过验证以确保正常访问</p>") != -1) {//404
//    this.d01();
//}
//else if (t[0].indexOf('aria-label="Sign in"') != -1) {//要登陆
//    this.e01();
//}
//else if (t[0].indexOf('\n            Dear, there have been too many visits today. Please come back tomorrow~\n') != -1) {//要换账号
//    this.e01();
//}
//else {

//    this.a09(t[0])
//}
//a08: function (t) {
//    $("#state").html("网页内容是否正常。。。");
//    else if (t.indexOf("window.runParams =") != -1) {
//        this.a09(t);

//    }
//    else if (t.indexOf('<script id="__AER_DATA__" type="application/json">') != -1) {//【俄罗斯】有这个
//        alert("【俄罗斯】有这个")
//        //this.a15(t);
//    }
//    else {
//        Tool.at("可能--已改版：\n\n" + t)
//    }

//},
//a07: function (t) {
//    //if (t.data) {//说明要验证
//    //     if (t.data.url) {
//    //         this.d01(t.data.url);
//    //     }
//    //     else if (t.url) {

//    //         this.d01(t.url);
//    //     }
//    //     else {
//    //         Tool.pre(t.data)
//    //     }
//    // }
//    // else {
//    //     Tool.pre(["出错：", t]);
//    // }
//},
//if (t.code == 404) {
//    $("#state").html("404错误...");
//    //this.a12([], 2, [null, null]);
//}
//else if (t.code == 429) {
//    $("#state").html("5秒后-----------------------------继续...")
//    //this.a12()
//}
//else if (typeof (t) == "string") {
//    $("#state").html("数据正常。。。")
//    this.a08(t)
//}
//else {
//    $("#state").html("已获得网页内容异常。。。");
//    this.a07(t)
//}
//Tool.pre(t)
//if (t.indexOf("Dear, there have been too many visits today. Please come back tomorrow") != -1) {


//    //要换账号
//    //this.e03()
//    //obj.arr[6]++;
//    //Tool.open(6, obj.arr[6])
//}
//else {
//    //要登陆

//}


//a15: function (article) {
//    let skuhtml = Tool.regSplits(article, '<script id="__AER_DATA__" type="application/json">', "</script>")[0];
//    let arr1; eval("arr1=" + skuhtml)
//    let arr2 = arr1.ctx.layout.widgetInstances[7].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].state.data.skuInfo;
//    let arr3 = [arr2.propertyList, arr2.priceList]//注：这个是死了。
//    //什么不统一？答：俄罗斯的分类ID都不一样，需要采【俄罗斯】的类目，如果要转换【美国】价格样子，要改太多了，如：采类目；价格转USD。还不如什么都不改来得快。
//    $("#aeopAeProductSKUs").html(JSON.stringify(arr3, null, 2))
//    //俄罗斯  是这个样子的
//    let t = Tool.StrSlice(article, ',"delivery":', ',"multipleFreightVersion"')
//    Tool.at("【俄罗斯】这个国家不一样，等用到再要处更吧！现在没时间。。。")
//    //company = Tool.StrSlice(t, '{\"service\":\"', '"')//物流公司
//    //deliveryDayMax = Tool.StrSplits(t, '"dateEstimated":"', '"')[0]//运输天数
//    //fAmount = Tool.StrSplits(t, '","amount":{"value":', ',')[0]//运费---注：有运费的时后这个是卢布。
//    //shipFromCode = Tool.StrSplits(t, '","countryCode":"', '"')[0]//发货地
//    //shipToCountry = Tool.StrSplits(t, '"to":{"country":"', '"')[0]//发住国家
//    //tracking = Tool.StrSplits(t, '"tracking":', ',')[0]//能否跟踪
//    //this.a10([company], [deliveryDayMax], [fAmount], [shipFromCode], [shipToCountry], [tracking], aeopAeProductSKUs);

//},

