'use strict';
Object.assign(Tool, {
    header: function () {
        let html = '\
		<header class="panel-heading">\
		  <div onclick="Tool.main()"'+ (obj.arr[3] == "-_-20" ? ' class="active"' : '') + '>订单管理</div>\
		  <div onclick="Tool.main(\'js03\')"'+ (obj.arr[3] == "js03" ? ' class="active"' : '') + '>发货管理</div>\
		</header>'
        return html;
    },
    openOrderItem://打开敦煌订单详请页
    {
        a01: function (This, username, password, cookies, orderid32) {
            This.attr("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');;
            let oo = {
                This: This,
                username: username,
                password: password,
                cookies: cookies,
                orderid32: orderid32
            }
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a03, this, oo)
        },
        a03: function (t,oo) {
            $("#state").html("正在【打开订单详情】...");
            let url = "http://seller.dhgate.com/sellerordmng/sellerOrderDetail/pageload.do?orderId=" + oo.orderid32;
            gg.tabs_remove_create_indexOf(2, url, "订单详细信息",true, this.a05, this, oo.This)
        },
        a05: function (t, This) {
            This.attr("disabled", false).html('*在敦煌看该订单')
            $("#state").html("已打开订单详情，等待你去查看该订单...");
        },
    },
    orderStatus: function (id) {
        let name = ""
        switch (id) {
            case "111000": name = "订单取消"; break;
            case "101003": name = "等待买家付款"; break;
            case "102001": name = "买家已付款，等待平台确认"; break;
            case "103001": name = "等待您发货"; break;
            case "105001": name = "买家退款中，等待协商结果"; break;
            case "105002": name = "退款协议已达成"; break;
            case "105003": name = "部分退款后，等待发货"; break;
            case "105004": name = "买家取消退款申请"; break;
            case "103002": name = "已部分发货"; break;
            case "101009": name = "等待买家确认收货"; break;
            case "106001": name = "退款/退货协商中，等待协议达成"; break;
            case "106002": name = "买家投诉到平台"; break;
            case "106003": name = "协议已达成，执行中"; break;
            case "102006": name = "已确认收货"; break;
            case "102007": name = "超过预定期限，自动确认收货"; break;
            case "102111": name = "交易成功"; break;
            case "111111": name = "交易关闭"; break;
            default: name = "未知：" + id;
        }
        return name
    },
})

