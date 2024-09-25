//'use strict';
//var fun =
//{
//    obj: {
//        A1: 1, A2: 99,
//        B1: 1, B2: 0,
//    },
//    a01: function () {
//        //obj.arr[4]    返回URL
//        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 从data字段中提取信息") + '\
//        <div class="p-2">\
//          <table class="table  align-middle table-hover">\
//            <tbody>\
//                <tr><td class="right w150">数据库：</td><td>'+ this.b02() + '</td><td></td></tr>\
//                <tr><td class="right">数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
//                <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
//                <tr><td class="right">提取信息：</td><td colspan="2">【属性】【价格组】【视频地址】【价格起批量】【销量】【单位】【几天发货】【单位重量】</td></tr>\
//                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
//                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
//            </tbody>\
//          </table>\
//        </div>';
//        Tool.html(null, null, html);
//    },
//    a02: function () {
//        gg.isRD(this.a03, this)
//    },
//    a03: function () {
//        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null);
//    },
//    a04: function () {
//        let str = '{\
//        "B2":'+ (this.obj.B2 == 0 ? '<@page/>' : '0') + ',\
//        <r:prodes size=1 page=2 db="sqlite.1688_prodes/'+ this.obj.A1.toString().padStart(2, '0') + '">\
//            "fromid":<:fromid/>,\
//		    "data":<:data tag=json/>\
//        </r:prodes>}'
//        $("#state").html("正在获取商品信息...");
//        Tool.ajax.a01(str, this.obj.B1, this.a05, this);
//    },
//    a05: function (oo) {
//        if (this.obj.B2 == 0) { this.obj.B2 = oo.B2; }
//        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.e01, oo);
//    },
//    a06: function (oo) {
//        if (oo.fromid) {
//            let url = "https://detail.1688.com/offer/" + oo.fromid + ".html"
//            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>')
//            if (oo.data == 'false}') {
//                $("#state").html("要重新采集,有可能是404...");
//                this.a09("ok")
//            }
//            else {
//                let data = JSON.parse(oo.data)
//                this.a07(data, oo)
//            }
//        }
//        else {
//            $("#state").html("出错了...");
//            Tool.Time("name", 1000, this.a04, this)
//            //Tool.pre(["出错了...", oo]);
//        }
//    },
//    a07: function (data, oo) {
//        let attr = [],//【属性】
//            sku = {},//【价格组】
//            videoUrl = "",//【视频地址】
//            currentPrices = [],//【价格起批量】
//            ////////////////////////////////
//            saleNum = 0,//【销量】
//            unit = "",//【单位】
//            unitWeight = 0,//【单位重量】
//            deliveryLimit = 0, //【几天发货】
//            totalCost = 0, isErr = false;//运费（说明：这个有点不准，但比没有强。）

//        if (data.data) data = data.data;//有的改版就是这个样子
//        for (let k in data) {
//            if (data[k].componentType == "@ali/tdmod-od-pc-attribute-new") {
//                attr = data[k].data;
//            }
//            else if (data[k].componentType == "@ali/tdmod-od-pc-offer-price") {
//                if (data[k].data) {
//                    let tmpObj = JSON.parse(data[k].data.offerDomain);
//                    sku = {
//                        skuMap: tmpObj.tradeModel.skuMap,
//                        skuProps: tmpObj.offerDetail.skuProps
//                    }
//                    currentPrices = tmpObj.tradeModel.offerPriceModel.currentPrices
//                }
//                else {
//                    isErr = true;
//                }
//            }
//            else if (data[k].componentType == "@ali/tdmod-pc-od-main-pic") {
//                videoUrl = data[k].data.video.videoUrl
//            }
//            else if (data[k].componentType == "@ali/tdmod-od-pc-offer-title") {
//                saleNum = this.b01(data[k].data.saleNum)
//                unit = this.b01(data[k].data.unit)
//            }
//            else if (data[k].componentType == "@ali/tdmod-od-pc-offer-logistics") {
//                unitWeight = data[k].data.unitWeight
//                if (!unitWeight) unitWeight = -1;
//                deliveryLimit = data[k].data.freightInfo.deliveryLimit
//                if (!deliveryLimit) deliveryLimit = -1;
//                totalCost = data[k].data.freightInfo.totalCost
//                if (!totalCost) totalCost = 0;
//            }
//        }
//        if (isErr) {
//            this.e02(oo.fromid)

//        }
//        else {
//            this.a08(attr, sku, videoUrl, currentPrices, saleNum, unit, unitWeight, deliveryLimit, totalCost, oo.fromid)
//        }

//    },
//    a08: function (attr, sku, videoUrl, currentPrices, saleNum, unit, unitWeight, deliveryLimit, freight, fromid) {
//        $("#state").html("正在更新数据...");
//        let str1 = '<r: db="sqlite.1688">update @.proList set @.saleNum=' + saleNum + ',@.unit=\'' + unit + '\',@.unitWeight=' + unitWeight + ',@.deliveryLimit=' + deliveryLimit + ',@.freight=' + freight + ' where @.fromid=' + fromid + '</r:>'
//        let str2 = '<r: db="sqlite.1688_prodes/' + Tool.remainder(fromid, 99) + '">update @.prodes set @.attr=' + Tool.rpsql(JSON.stringify(attr)) + ',@.sku=' + Tool.rpsql(JSON.stringify(sku)) + ',@.videoUrl=' + Tool.rpsql(videoUrl) + ',@.currentPrices=' + Tool.rpsql(JSON.stringify(currentPrices)) + ' where @.fromid=' + fromid + '</r:>';
//        Tool.ajax.a01('"ok"' + str1 + str2, 1, this.a09, this)
//    },
//    a09: function (t) {
//        if (t == "ok") {
//            $("#state").html("等0秒后，再下一条...");
//            this.obj.B1++;
//            this.a04();
//        }
//        else {
//            $("#state").html("更新出错,延时1秒后再来。")
//            //Tool.Time("name", 1000, this.a02, this, oo)
//            Tool.pre(["更新出错01：", t]);
//        }
//    },
//    b01: function (val) {
//        let num = 0
//        if (val.indexOf("万") != -1) {
//            num = parseFloat(val.split("万")[0]) * 10000
//        }
//        else if (val.indexOf("+") != -1) {
//            num = parseFloat(val.split("+")[0])
//        }
//        else if (val.indexOf("<") != -1) {
//            num = parseFloat(val.split("<")[1])
//        }
//        else {
//            num = val;
//        }
//        return num
//    },
//    b02: function () {
//        let nArr = [];
//        for (let i = 1; i <= this.obj.A2; i++) {
//            nArr.push('<option value="' + i + '">从第' + i + '个数据库开始执行</option>');
//        }
//        return '\
//        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
//            <option value="-_-20">请选择从第几个数据库开始执行</option>\
//            ' + nArr.join("") + '\
//        </select>';
//    },
//    ///////////////////////////
//    c01: function (This, val) {
//        This.attr("disabled", "disabled")
//        this.obj.A1 = val;
//        this.a02();

//    },
//    ///////////////////////////
//    e01: function (t) {
//        this.obj.B1 = 1; this.obj.B2 = 0;
//        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
//        if (confirm("确定要进入下一个数据库吗？\n\n按\"确定\"继续，或按\"取消\"留在当前页面。")) {
//            this.obj.A1++;
//            this.a03()
//        }
//    },
//    e02: function (fromid) {
//        let str = '<r: db="sqlite.1688_prodes/' + Tool.remainder(fromid, 99) + '">update @.prodes set @.isErr=1 where @.fromid=' + fromid + '</r:>';
//        Tool.ajax.a01('"ok"' + str, 1, this.a09, this)
//    },

//}