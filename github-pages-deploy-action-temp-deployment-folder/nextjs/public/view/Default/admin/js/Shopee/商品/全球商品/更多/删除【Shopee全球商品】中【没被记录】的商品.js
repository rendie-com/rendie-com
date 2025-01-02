'use strict';
var fun =
{
    obj:
    {
        //注：这个不能跳转页面的，打开第一页就知道下一页和总条数和每页条数。
        A1: 1, A2: 0,
        fromid: 0
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 删除【Shopee全球商品】中【没被记录】的商品") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
            <tbody>\
            <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        //为什么要给“{}”，因为下次翻页要来。
        this.a04({})
    },
    a04: function (oo) {
        let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_list/?SPC_CDS=888fffb6-df89-4b97-901b-c29eab5150fd&SPC_CDS_VER=2" + (oo.nextPage ? "&cursor=" + oo.nextPage : "") + "&page_size=48&cnsc_shop_id=" + this.obj.fromid + "&cbsc_shop_region=my"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        //为什么把“nextPage”值传给“thisPage”？因为打开了，所以这里的下一页，就应该是当前页。
        gg.getFetch(url,"json", this.a05, this, oo.nextPage)
    },
    a05: function (t, thisPage) {
        if (t.message == "success") {
            this.obj.A2 = Math.ceil(t.data.page_info.total / t.data.page_info.page_size);
            //说明：不需要当心内容是否正确，因为如果内容不对，上一行就会出错。
            this.a06(t.data.list, encodeURIComponent(t.data.page_info.cursor), thisPage)
        }
        else {
            Tool.pre(["出错01", t])
        }
    },
    a06: function (arr, nextPage, thisPage) {
        let idArr = [];
        for (let i = 0; i < arr.length; i++) {
            idArr.push(arr[i].mtsku_item_id)
        }
        this.d01({ idArr: idArr, nextPage: nextPage, thisPage: thisPage })
    },
    /////////////////////////////////////////////
    d01: function (oo) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this, null, oo)
    },
    d02: function (oo) {
        if (oo.idArr.length == 0) {
            $("#state").html("这一页没数据，程序终止。")
        }
        else {
            let str = '["success"<r:GlobalPro db="sqlite.shopee" size=50 where=" where @.fromid in(' + oo.idArr.join(",") + ')">,"<:fromid/>"</r:GlobalPro>]'
            $("#state").html("正在获取商品信息。。。");
            Tool.ajax.a01(str, 1, this.d03, this, oo);
        }
    },
    d03: function (arr, oo) {
        if (arr[0] == "success") {
            if (arr.length - 1 == oo.idArr.length) {
                $("#state").html("这一页，未发现没记录的，可以下一页了。");
                oo.idArr = [];
                this.obj.A1++;
                this.a04(oo)
            }
            else {
                $("#state").html("这一页，有没记录的。");
                this.d04(arr, oo)
            }
        }
        else {
            Tool.at("出错了\n\n" + arr)
        }
    },
    d04: function (arr, oo) {
        let nArr = []
        for (let i = 0; i < oo.idArr.length; i++) {
            if (arr.indexOf(oo.idArr[i]) == -1) {
                nArr.push(parseInt(oo.idArr[i]))
            }
        }
        $("#state").html("找出哪个没被记录。");
        Tool.pre([arr, oo, nArr])
        //this.d05(nArr, oo)
    },
    d05: function (arr, oo) {
        let url = "https://seller.shopee.cn/api/v3/mtsku/delete_mtsku/?SPC_CDS_VER=2"
        $("#state").html("正在删除。。。");
        let data = {
            mtsku_item_id_list: arr
        }
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            }
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d06, this, oo)
    },
    d06: function (o1, o2) {
        if (o1.message == "success") {
            o2.idArr = [];
            //o2.thisPage  不用改，因为如果下次还来，也给他这一页。
            o2.nextPage = o2.thisPage
            this.a04("", o2)//因为是删除，所以当前页，再来一次。
        }
        else {
            Tool.pre(["删除出错", o1])
        }
    },
}
fun.a01();