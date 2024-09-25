'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//状态
        let html = Tool.header("Shopee &gt; 营销中心 &gt; 优惠券 &gt; 状态_删除") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">优惠券名称：</td><td id="name" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t
        this.a04();
    },
    a04: function () {
        $("#state").html("正在获取商品信息。。。");
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:voucher size=1 db="sqlite.shopee" page=2 where=" where @.fe_status=1 and @.site=\'' + obj.arr[5] + '\'">,<:voucher_id/>,<:name tag=json/></r:voucher>]'
        Tool.ajax.a01(str, 1, this.a05, this);
    },
    a05: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, arr)
    },
    ////////////////////////////////
    d01: function (voucherArr) {
        $("#name").html(voucherArr[2]);
        if (voucherArr[2].indexOf("关注礼") != -1) {
            this.f01(voucherArr[1])
        }
        else {
            this.d02(voucherArr[1])
        }
    },
    d02: function (voucher_id) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/voucher/?" + arr.join("&")
        let data = '{"voucher_id":' + voucher_id + '}'
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在删除。。。");
        gg.typeHtml(url, "DELETE", data, this.d03, this, voucher_id)
    },
    d03: function (t, voucher_id) {
        if (t.code == 0) {
            $("#state").html("删除成功。");
            this.e01(voucher_id)
        }
        //else if (t.message == "voucher not exists") {
        //    $("#state").html("这个已经删除过了。");
        //    this.e01(voucher_id)
        //}
        //else if (t.message == "ERROR_VOUCHER_DEL_ONGOING_VOUCHER") {
        //    $("#state").html("结束出错。");
        //    this.e01(voucher_id)
        //}
        else {
            Tool.pre(["出错222", t]);
        }
    },
    ///////////////////////////////////
    e01: function (voucher_id) {
        let str = '"ok"<r: db="sqlite.shopee">delete from @.voucher where @.voucher_id=' + voucher_id + '</r:>'
        Tool.ajax.a01(str, 1, this.e02, this);
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错111", t]);
        }
    },
    /////////////////////////////////////
    f01: function (voucher_id) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/follow_prize/get_campaignids_by_promotionids/?" + arr.join("&")
        let data = '{"promotion_ids":[' + voucher_id + ']}'
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
        ]
        gg.setHeaders_postHtml(url, headers, data, this.f02, this, voucher_id)
    },
    f02: function (t, voucher_id) {
        if (t.message == "success") {
            this.f03(t.data.campaign_lites[0].campaign_id, voucher_id)
        }
        else {
            Tool.pre(["出错", t])
        }

    },
    f03: function (campaign_id, voucher_id) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/follow_prize/operation/?" + arr.join("&")
        let data = '{"action":"delete","campaign_id":' + campaign_id + '}'
        $("#url").html(url + '【post】');
        $("#state").html("正在结束关注礼。。。");
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
        ]
        gg.setHeaders_postHtml(url, headers, data, this.f04, this, voucher_id)
    },
    f04: function (t, voucher_id) {
        if (t.message == "success") {
            //说明：实测删除不掉，但就是这么做的，手动也删除不掉。
            $("#state").html("结束关注礼成功。");
            this.e01(voucher_id)
        }
        else {
            Tool.pre(["出错001", t])
        }
    },
}
fun.a01();