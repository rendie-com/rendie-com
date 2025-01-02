'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},//提交要用
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 重新记录【已上传】的商品") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right w150">操作方法：</td><td colspan="2">先把所有商品，设置成【未上传】，然后在【Shopee全球商品】中翻页，找到了，就是【已上传】的商品。</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {     
        this.obj.seller = t;
        $("#state").html("正在设置所有商品未上传。。。");
        let str = '<r: db="sqlite.shopee">update @.GlobalPro set @.isup=0</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a04, this);
    },
    a04: function (t) {
        if (t == "ok") {
            this.a05(false)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    a05: function (nextPage) {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cursor=" + (nextPage ?  nextPage : ""),
            "page_size=48",
            "cnsc_shop_id=" + this.obj.seller["my"].shopId,
            "cbsc_shop_region=my"//全球商品，写不写这个一样。
        ]
        let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_list/?"  + pArr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        //为什么把“nextPage”值传给“thisPage”？因为打开了，所以这里的下一页，就应该是当前页。
        gg.getFetch(url,"json", this.a06, this)
    },
    a06: function (t) {
        if (t.message == "success") {
            this.obj.A2 = Math.ceil(t.data.page_info.total / t.data.page_info.page_size);
            //说明：不需要当心内容是否正确，因为如果内容不对，上一行就会出错。
            this.a07(t.data.list, encodeURIComponent(t.data.page_info.cursor))
        }
        else {
            Tool.pre(["出错01", t])
        }
    },
    a07: function (arr, nextPage) {
        let idArr = [];
        for (let i = 0; i < arr.length; i++) {
            idArr.push(arr[i].mtsku_item_id)
        }
        this.d01({ idArr: idArr, nextPage: nextPage })
    },
    /////////////////////////////////
    d01: function (oo) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this, null, oo)
    },
    d02: function (oo) {
        if (oo.idArr.length == 0) {
            $("#state").html("这一页没数据，程序终止。")
        }
        else {
            let str = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.isup=1 where @.fromid in(' + oo.idArr.join(",") + ')</r:>'
            $("#state").html("正在已上传信息。。。");
            Tool.ajax.a01(str, 1, this.d03, this, oo.nextPage);
        }
    },
    d03: function (t, nextPage) {
        if (t == "ok") {
            $("#state").html("可以下一页了。");
            this.obj.A1++;
            this.a05(nextPage)
        }
        else {
            Tool.at("出错了\n\n" + t)
        }
    },
}
fun.a01();