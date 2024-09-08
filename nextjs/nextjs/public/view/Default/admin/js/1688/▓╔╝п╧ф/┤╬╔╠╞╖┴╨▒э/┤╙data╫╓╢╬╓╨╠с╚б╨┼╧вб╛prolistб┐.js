'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 从data字段中提取信息【prolist】") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提取信息：</td><td colspan="2">【价格组】</td></tr>\
                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        let str = '{\
        "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + ',\
        <r:proList size=1 page=2 db="sqlite.1688" where=" where @.state=5">\
            <r:prodes size=1 page=2 db="sqlite.1688_prodes_bak/<:fromid Fun=ProidNum(+$1,99)/>" where=" where @.fromid=<:fromid/>">\
		        "data":<:data tag=json/>,\
             </r:prodes>\
            "fromid":<:fromid/>\
        </r:proList>}'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.e01, oo);
    },
    a05: function (oo) {
        let url = "https://detail.1688.com/offer/" + oo.fromid + ".html"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>')
        if (oo.data == 'false}') {
            $("#state").html("要重新采集,有可能是404...");
            this.d01(1, oo.fromid)
        }
        else {
            let data = JSON.parse(oo.data);
            this.a06(data, oo);
        }
    },
    a06: function (data, oo) {
        let isErr = false, sku = {}//【价格组】
        if (data.data) data = data.data;//有的改版就是这个样子
        for (let k in data) {
            if (data[k].componentType == "@ali/tdmod-od-pc-offer-price" || data[k].componentType == "@ali/tdmod-factory-od-pc-offer-price") {
                if (data[k].data) {
                    let tmpObj = JSON.parse(data[k].data.offerDomain);
                    sku = {
                        skuMap: tmpObj.tradeModel.skuMap,
                        skuProps: tmpObj.offerDetail.skuProps,
                        canBookedAmount: tmpObj.tradeModel.canBookedAmount,//库存--如果是单价格，这个就有用了。
                        currentPrices: tmpObj.tradeModel.offerPriceModel.currentPrices//价格阶梯--多少件起卖。
                    }
                    //Tool.pre(tmpObj.tradeModel)
                }
                else {
                    $("#state").html("1688自已出错了");
                    isErr = true;
                }
            }
        }
        if (isErr) {
            this.d01(7, oo.fromid)
        }
        else {
            this.a07(sku, oo.fromid)
        }
    },
    a07: function (sku, fromid) {
        if (sku.canBookedAmount == 0) {
            //Tool.pre(["出错了-----sku.canBookedAmount", sku])
            this.d01(6, fromid)
        }
        else if (!sku.canBookedAmount) {
            $("#state").html("1688的另一个版本");
            //Tool.pre("出错了---sku.canBookedAmount")
            this.d01(8, fromid)
        }
        else if (!sku.currentPrices) {
            Tool.pre("出错了---sku.disPriceRanges")
        }
        else {
            this.a08(sku, fromid)
        }
    },
    a08: function (sku, fromid) {
        $("#state").html("正在更新数据...");
        let str2 = '<r: db="sqlite.1688">update @.proList set @.state=0 where @.fromid=' + fromid + '</r:><r: db="sqlite.1688_prodes/' + Tool.remainder(fromid, 99) + '">update @.prodes set @.sku=' + Tool.rpsql(JSON.stringify(sku)) + ' where @.fromid=' + fromid + '</r:>';
        Tool.ajax.a01('"ok"' + str2, 1, this.a09, this)
    },
    a09: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            this.obj.A1++;
            this.a03();
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
    /////////////////////////////
    d01: function (state, fromid) {
        let str = '<r: db="sqlite.1688">update @.proList set @.state=' + state + ' where @.fromid=' + fromid + '</r:>';
        Tool.ajax.a01('"ok"' + str, 1, this.a09, this)
    },
}
fun.a01()


