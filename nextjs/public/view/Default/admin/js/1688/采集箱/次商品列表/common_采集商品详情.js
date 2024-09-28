Object.assign(Tool, {
    gatherDetail: {
        a01: function (fromid, next, This, t) {
            let oo = {
                fromid: fromid,
                next: next,
                This: This,
                t: t
            }
            //this.e01(oo)//拿老数据修复用的
            this.a02(oo)
        },
        a02: function (oo) {
            let url = 'https://detail.1688.com/offer/' + oo.fromid + '.html?spm=a260k.dacugeneral.0.0.663335e4WNUj1W&cosite=-&tracelog=p4p&_p_isad=1&clickid=69afeffe7f5747679173f80a787dad08&sessionid=a98746cc3a639490310950d8052d200c';
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在打开详情...");
            gg.getFetch(url,"text",  this.a03, this, oo)
        },
        // a03A: function (t, oo) {
        //     //获取讲解视频的链接，我没时间做。https://h5api.m.1688.com/h5/mtop.alibaba.wireless.live.offer.getliveinfobyofferidwap/1.0/?jsv=2.4.11&appKey=12574478&t=1727320825765&sign=4035e56fcb4ea2afa37bcf4cfd23556d&api=mtop.alibaba.wireless.live.offer.getLiveInfoByOfferIdWap&v=1.0&type=jsonp&isSec=0&timeout=20000&dataType=jsonp&callback=mtopjsonp3&data=%7B%22offerId%22%3A%22677529164934%22%7D
        //     Tool.pre(t);
        // },
        a03: function (t, oo) {
            if (t.indexOf("_____tmd_____/verify") != -1) {
                $("#state").html("验证码拦截。")
                let url = 'https://detail.1688.com/offer/' + oo.fromid + '.html'
                Tool.captcha.a01(url, this.a02, this, oo)
            }
            else if (t.indexOf('<title>404-阿里巴巴</title>') != -1) {
                this.d01(1, "404错误", oo);
            }
            else if (t.indexOf('>商品已下架<') != -1) {
                this.d01(2, "商品已下架", oo);
            }
            else if (t.indexOf('<meta name="b2c_auction" content="') != -1) {
                this.d01(3, "采集内容已改变", oo);
            }
            else if (t.indexOf(':' + oo.fromid + ',') != -1) {
                Tool.pre(t)
                //this.a04(t, oo);
            }
            else {
                Tool.at("出错002：\n" + t)
            }
        },
        a04: function (t, oo) {
            let __INIT_DATA = Tool.StrSlice(t, ' window.__INIT_DATA=', '</script>')
            if (__INIT_DATA) {
                let o1 = JSON.parse(__INIT_DATA)
                let o2 = this.b02(o1.data,o1.globalData.skuModel,o1.globalData.orderParamModel.orderParam.sellUnit);
                if (o2.error) {
                    this.d01(o2.state, o2.error, oo)
                }
                else if (o2.detailUrl) {
                    oo.return = o2;
                    this.a05(oo)
                }
            }
            else {
                Tool.at("数据不对01" + t);
            }
        },
        a05: function (oo) {
            let detailUrl = oo.return.detailUrl
            $("#detailUrl").html('<a href="' + detailUrl + '" target="_blank">' + detailUrl + '</a>');
            $("#state").html("正在打开详情...");
            if (detailUrl.indexOf("var=desc") == -1) {
                Tool.ajax.text(detailUrl, this.a06, this, oo);
            }
            else {
                gg.getFetch(detailUrl,"text", this.a06, this, oo);
            }
        },
        a06: function (t, oo) {
            if (t.indexOf('var offer_details=') != -1) {
                let data = t.split("var offer_details=")[1]
                data = JSON.parse(data.substring(0, data.length - 1))
                this.a07(data.content, oo);
            }
            else if (t.indexOf("var desc='") != -1) {
                let data = t.split("var desc='")[1]
                data = data.substring(0, data.length - 2)
                this.a07(data, oo);
            }
            else {
                Tool.at('到不了这里。。。\n\n\n' + t);
            }
        },
        a07: function (des, oo) {
            oo.return.details = des;
            oo.return.fromid = oo.fromid;
            Tool.apply(oo.return, oo.next, oo.This, oo.t);
        },
        /////////////////////////////////////////
        b01: function (val) {
            let num = 0
            if (val.indexOf("万") != -1) {
                num = parseFloat(val.split("万")[0]) * 10000
            }
            else if (val.indexOf("+") != -1) {
                num = parseFloat(val.split("+")[0])
            }
            else if (val.indexOf("<") != -1) {
                num = parseFloat(val.split("<")[1])
            }
            else {
                num = val;
            }
            return num
        },
        b02: function (data,skuModel,sellUnit) {
            let attr = [],//【属性】               
                videoUrl = "",//【视频地址】
                ////////////////////////////////
                saleNum = 0,//【销量】
                unit = "",//【单位】
                unitWeight = 0,//【单位重量】
                deliveryLimit = 0, //【几天发货】
                totalCost = 0,//运费（说明：这个有点不准，但比没有强。）
                detailUrl = "",//详情内容URL
                pic = [],//放大镜图
                startAmount=0,//件倍数。每件的个数（如：100）
                currentPrices=[],//价格阶梯--多少件起卖。
                count = 6;//计数，没有6个就是出错了
            //////////////////////////////////  

            for (let k in data) {
                if (data[k].componentType == "@ali/tdmod-od-pc-attribute-new" || data[k].componentType == "@ali/tdmod-od-pc-attribute" || data[k].componentType == "@ali/cmod-od-wap-offer-attribute") {
                    attr = data[k].data;
                    count--;
                }
                else if (data[k].componentType == "@ali/tdmod-od-pc-offer-description" || data[k].componentType == "@ali/cmod-odw-basic-description") {
                    detailUrl = data[k].data.detailUrl;
                    count--;
                }
                else if (data[k].componentType == "@ali/tdmod-od-pc-offer-price" || data[k].componentType == "@ali/tdmod-factory-od-pc-offer-price") {
                   if (data[k].data) {
                        currentPrices = data[k].data.priceModel.currentPrices;
                    }
                    else {
                        return {
                            error: "1688自已出错了",
                            state: 7,
                        }
                    }
                    count--;
                }
                else if (data[k].componentType == "@ali/tdmod-pc-od-main-pic" || data[k].componentType == "@ali/tdmod-od-gyp-pc-main-pic") {
                    videoUrl = data[k].data.video.videoUrl
                    pic = data[k].data.offerImgList
                    count--;
                }
                else if (data[k].componentType == "@ali/tdmod-od-pc-offer-title") {
                    saleNum = this.b01(data[k].data.saleNum)
                    unit = data[k].data.unit
                    count--;
                }
                else if (data[k].componentType == "@ali/tdmod-od-pc-offer-logistics" || data[k].componentType == "@ali/tdmod-od-pc-logistics") {
                    unitWeight = data[k].data.unitWeight;if (!unitWeight) unitWeight = -1;
                    deliveryLimit = data[k].data.freightInfo.deliveryLimit;if (!deliveryLimit) deliveryLimit = -1;
                    totalCost = data[k].data.freightInfo.totalCost;if (!totalCost) totalCost = 0;
                    startAmount= data[k].data.startAmount//件倍数。每件的个数（如：100）
                    count--;
                }
                if (count == 0) break;
            }
            //////////////////////////////
            if (count != 0) {
                Tool.pre(["要调式", count, data])
            }
            else {
                let r={
                    detailUrl: detailUrl,//详情内容URL
                    pic: pic,//放大镜图
                    attr: attr,//【属性】                    
                    videoUrl: videoUrl,//【视频地址】
                    saleNum: saleNum,//【销量】
                    unit: unit,//【单位】
                    unitWeight: unitWeight,//【单位重量】
                    deliveryLimit: deliveryLimit,//【几天发货】
                    sku : {
                        skuProps:skuModel.skuProps,
                        skuInfoMap:skuModel.skuInfoMap,
                        sellUnit:sellUnit,//销售单位（按包卖）
                        startAmount:startAmount,//件倍数。每件的个数（如：100）
                        currentPrices:currentPrices//价格阶梯--多少件起卖。
                    },//【价格组】
                    freight: totalCost,//运费（说明：这个有点不准，但比没有强。）
                }
                return r
            }
        },
        ///////////////////////////////////////////////////
        d01: function (state, error, oo) {
            let o1 = {
                error: error,
                state: state,
                fromid: oo.fromid
            }
            Tool.apply(o1, oo.next, oo.This, oo.t);
        },
    }
})
        ////////////////////以下代码是拿老数据修复用的////////////////////////////////////////////
        //e01: function (oo) {
        //    let str = '{\
        //    <r:prodes size=1 db="sqlite.1688_prodes_bak/'+ Tool.remainder(oo.fromid, 99) + '" where=" where @.fromid=' + oo.fromid + '">\
        //        "data":<:data tag=json/>\
        //    </r:prodes>}'
        //    $("#state").html("正在获取商品信息...");
        //    Tool.ajax.a01(str, 1, this.e02, this, oo);
        //},
        //e02: function (t, oo) {
        //    if (t.data == 'false}') {
        //        $("#state").html("要重新采集,有可能是404...");
        //        this.a02(oo)
        //    }
        //    else {
        //        let data = JSON.parse(t.data)
        //        data = data.data
        //        if (data) {
        //            this.e03(data, oo)
        //        }
        //        else {
        //            this.a02(oo)
        //        }

        //    }
        //},
        //e03: function (o1, oo) {            
        //    let o2 = this.b02(o1);
        //    if (o2.error) {
        //        this.d01(o2.state, o2.error, oo)
        //    }
        //    else if (o2.detailUrl) {
        //        oo.return = o2;
        //        oo.return.fromid = oo.fromid;
        //        Tool.apply(oo.return, oo.next, oo.This, oo.t);
        //    }
        //}
        ///////////////////////////////////////////////////////////////////////
//*
//心得：
//要提取运费，就要请求网址：
//https://h5api.m.1688.com/h5/mtop.1688.freightinfoservice.getfreightinfowithscene/1.0/?jsv=2.4.11&appKey=12574478&t=1712144526925&sign=854e95b8311ec6695f38ba9399672c5c&api=mtop.1688.freightInfoService.getFreightInfoWithScene&v=1.0&type=jsonp&isSec=0&timeout=20000&dataType=jsonp&callback=mtopjsonp27&data=%7B%22offerId%22%3A676754629462%2C%22sellerUserId%22%3A0%2C%22sendAddressCode%22%3A%2231624022%22%2C%22receiveAddressCode%22%3A%22310100%22%2C%22freeEndAmount%22%3A-1%2C%22pageScene%22%3A%22dsc%22%2C%22skuCalParams%22%3A%22%5B%5D%22%2C%22extendMap%22%3A%22%7B%5C%22officialLogistics%5C%22%3Afalse%2C%5C%22unitWeight%5C%22%3A0%2C%5C%22sellerLoginId%5C%22%3A%5C%22tzm13262986909%5C%22%2C%5C%22templateId%5C%22%3A13693776%2C%5C%22amount%5C%22%3A1%7D%22%7D
//结果为：mtopjsonp29({
//    "api": "mtop.1688.freightinfoservice.getfreightinfowithscene",
//    "v": "1.0",
//    "ret": [
//        "SUCCESS::调用成功"
//    ],
//    "data": {
//        "freeDeliverFee": "false",
//        "officialLogistics": "false",
//        "totalCost": 15
//    }
//})
//*/
///*

//心得：
//要提取[评论数]，就要请求网址：https://h5api.m.1688.com/h5/mtop.1688.trade.service.mtoprateservice.querydsrratedatav2/1.0/?jsv=2.4.11&appKey=12574478&t=1712147024613&sign=208d45d164c39363e779341a33a61f43&api=mtop.1688.trade.service.MtopRateService.queryDsrRateDataV2&v=1.0&type=jsonp&isSec=0&timeout=20000&dataType=jsonp&callback=mtopjsonp27&data=%7B%22offerId%22%3A623609706251%2C%22loginId%22%3A%22tzm13262986909%22%2C%22scene%22%3A%22item%22%2C%22site%22%3Anull%7D
//结果为：
//mtopjsonp27({
//    "api": "mtop.1688.trade.service.mtoprateservice.querydsrratedatav2",
//    "data": {
//        "headers": {},
//        "httpStatusCode": "200",
//        "model": {
//            "commonTagNodeList": [
//                {
//                    "count": "31",
//                    "name": "全部",
//                    "type": "common"
//                },
//                {
//                    "count": "31",
//                    "name": "好评",
//                    "type": "common"
//                },
//                {
//                    "count": "1",
//                    "name": "最新#1",
//                    "type": "common"
//                }
//            ],
//            "fulfillmentDataList": [
//                {
//                    "name": "商品好评",
//                    "value": "100%"
//                },
//                {
//                    "name": "按时发货",
//                    "value": "50%"
//                },
//                {
//                    "name": "商品退款",
//                    "value": "0%"
//                }
//            ],
//            "goodRates": "100.0",
//            "goodsGrade": "5.0",
//            "impressionTagNodeList": [],
//            "mixTbRate": "false",
//            "showUserHisRec": "true",
//            "switchRedirect": "true",
//            "systemRemarkCnt": "31"
//        }
//    },
//    "ret": [
//        "SUCCESS::调用成功"
//    ],
//    "v": "1.0"
//})
//*/
///*

//心得：
//要提取[包装信息]，就要请求网址：https://h5api.m.1688.com/h5/mtop.taobao.widgetservice.getjsoncomponent/1.0/?jsv=2.4.11&appKey=12574478&t=1712198015214&sign=56439f989c5b0e3971767ab7c1f5cb34&api=mtop.taobao.widgetService.getJsonComponent&v=1.0&type=jsonp&isSec=0&timeout=20000&dataType=jsonp&callback=mtopjsonp14&data=%7B%22cid%22%3A%22getOfferOtherAttr%3AgetOfferOtherAttr%22%2C%22methodName%22%3A%22execute%22%2C%22params%22%3A%22%7B%5C%22offerId%5C%22%3A521656117142%2C%5C%22memberId%5C%22%3A%5C%22b2b-1820986509%5C%22%7D%22%7D

//mtopjsonp14({
//    "api": "mtop.taobao.widgetservice.getjsoncomponent",
//    "data": {
//        "kjAttributes": {
//            "packagingHeight": 2.0,
//            "merchandiseWeight": 1.28,
//            "packagingLength": 35.0,
//            "merchandiseNetWeight": 1.28,
//            "packagingWidth": 28.0
//        }
//    },
//    "ret": [
//        "SUCCESS::调用成功"
//    ],
//    "v": "1.0"
//})
//*/