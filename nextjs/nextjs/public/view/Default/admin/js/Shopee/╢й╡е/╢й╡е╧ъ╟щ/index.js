'use strict';
var fun =
{
    obj: {}, token: "",
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//订单编号
        this.a02();
    },
    a02: function () {
        let str = '\
		{\
		<r:orders db="sqlite.shopee" where=" where @.order_sn=\''+ obj.arr[5] + '\'" size=1>\
			"id":<:id/>,\
			"status":<:status/>,\
			"escrow_release_time":<:escrow_release_time/>,\
			"order_sn":<:order_sn tag=json/>,\
			"buyer_address_name":<:buyer_address_name tag=json/>,\
			"buyer_address_phone":<:buyer_address_phone tag=json/>,\
			"shipping_address":<:shipping_address tag=json/>,\
			"buyer_user":<:buyer_user tag=0/>,\
		</r:orders>\
		}'//
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (t) {
        let html = Tool.header("Shopee &gt; 订单  &gt; 订单详情") + '\
		<div class="p-2">\
          <table class="table table-hover align-middle">\
            <thead class="table-light"><tr><th colspan="2">买家取货记录</th></tr></thead>\
            <tr><td class="right w150">评级计数：</td><td>'+ t.buyer_user.rating_count + '</td></tr>\
            <tr><td class="right">交货订单计数：</td><td>'+ t.buyer_user.delivery_order_count + '</td></tr>\
            <tr><td class="right">评级星级：</td><td>'+ t.buyer_user.rating_star + '</td></tr>\
            <tr><td class="right">账号创建时间：</td><td>'+ Tool.js_date_time2(t.buyer_user.ext_info.address_info.mcount_create_time) + '</td></tr>\
            <tr><td class="right">性别：</td><td>'+ this.b01(t.buyer_user.ext_info.gender) + '</td></tr>\
            <tr><td class="right">语言：</td><td>'+ t.buyer_user.language + '</td></tr>\
            <thead class="table-light"><tr><th colspan="2">基本信息</th></tr></thead>\
            <tr><td class="right">订单编号：</td><td>'+ t.order_sn + '</td></tr>\
            <tr><td class="right">状态 | 发货时限：</td><td>'+ Tool.status_time(t.status, t.escrow_release_time) + '</td></tr>\
            <tr><td class="right">买家收件地址：</td><td>'+ t.buyer_address_name + ' , ' + t.buyer_address_phone + '<br/>' + t.shipping_address + '</td></tr>\
          </table>\
        </div>'
        //     <tr><td class="right">生日：</td><td>'+ (t.buyer_user.ext_info.address_info.mcount_create_time + t.buyer_user.ext_info.birth_timestamp) + '</td></tr>\
        Tool.html(null, null, html)
    },
    b01: function (gender) {
        let str = "未开发:" + gender
        switch (gender) {
            case 0: str = "未填写"; break;
            case 1: str = "男"; break;
            case 2: str = "女"; break;
        }
        return str;
    }
}
fun.a01();