'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        //obj.params.return         返回URL
        //obj.params.site            站点
        //obj.params.status          状态
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 折扣列表 &gt; 状态_删除") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
   		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
        </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        $("#state").html("正在获取商品信息。。。");
        let where = " where @.status=" + obj.params.status + " and @.site='" + obj.params.site + "'"
        let data = [{
            action: "sqlite",
            database: "shopee",
            sql: "select @.promotion_id as promotion_id FROM @.discount" + where + " limit 1",
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee",
                sql: "select count(1) as total FROM @.discount" + where,
            })
        }
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t[0][0].promotion_id)
    },
    ////////////////////////////////////////////////////////////////////////
    d01: function (promotion_id) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/discount/delete_stop_discount/?" + arr.join("&")
        let data = '{"promotion_id":' + promotion_id + ',"action":1}'
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在删除。。。");
        gg.postFetch(url, data, this.d02, this, promotion_id)
    },
    d02: function (t, promotion_id) {
        if (t.error_msg == null) {
            $("#state").html("删除成功。");
            this.d03(promotion_id)
        }
        else if (t.bff_meta==null) {
            $("#state").html("这个不给删除。【无效的活动期间，结束时间需晚于开始时间1小时以上】");
            this.d03(promotion_id)
        }
        else if (t.error_msg == "discount not exists") {
            $("#state").html("这个已经删除过了。");
            this.d03(promotion_id)
        }
        else {
            Tool.pre(["出错222", t])
        }
    },
    d03: function (promotion_id) {
        let data = [{
            action: "sqlite",
            database: "shopee",
            sql: "delete from @.discount where @.promotion_id=" + promotion_id,
        }]
        Tool.ajax.a01(data, this.d04, this);
    },
    d04: function (t) {
        if (t[0].length == 0) {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错111", t])
        }
    },
}
fun.a01();