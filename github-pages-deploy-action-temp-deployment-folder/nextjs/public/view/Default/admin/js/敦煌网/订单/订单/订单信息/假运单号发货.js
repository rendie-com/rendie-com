'use strict';
Object.assign(Tool, {
    FakeDelivery:
    {
        a01: function (This, username, password, cookies, PurchaseRemark, orderid, orderid32, fromid) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                PurchaseRemark: PurchaseRemark,
                orderid: orderid,
                orderid32: orderid32,
                fromid: fromid
            }
            This.html("正在发货...").attr("disabled", true);
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            let ran = "S00000" + Tool.randomRange(100000000, 999999999)//运单号
            oo.ran = ran;
            let url = "https://global.cainiao.com/global/detail.json?mailNos=" + ran + "&lang=zh-CN";
            $("#state").html(url);
            gg.getFetch(url,"json", this.a03, this, oo)
        },
        a03: function (oo, o2) {
            if (oo.success == true) {
                if (oo.module[0].detailList[0] == null) {
                    $("#state").html("找不到，说明可以去发货。");
                    this.a04(o2)
                }
                else { this.a02(0, o2) }
            }
            else {
                Tool.pre(["不可能到这里。", oo])
            }
        },
        a04: function (oo) {
            $("#state").html("正在验证登陆。。。");
            Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a05, this, oo);
        },
        a05: function (t, oo) {
            $("#state").html("正在发货...");
            let arr = []
            arr.push("orderId=" + oo.orderid32);
            arr.push("hp=0");
            arr.push("logisticType=40");
            arr.push("shippingType=Cainiao");
            arr.push("trankNo=" + oo.ran);
            arr.push("deliveryState=1");
            arr.push("deliveryRemark=");
            let url = "http://seller.dhgate.com/logistics/orderDetail/saveOrderDelivery.do?" + arr.join("&");
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a06, this, oo);
        },
        a06: function (oo, o2) {
            if (oo.status == "error") {
                $("#state").html("发货失败...");
                Tool.pre(t);
                //alert("DHLink无此运单号，不能使用发货")        
            }
            else if (typeof (oo) == "string") {
                if (oo.indexOf('<p><!--发出货物-->发出货物</p>') != -1) {
                    this.a07(o2);
                }
                else {
                    Tool.pre(["不可能到这里\n\n", oo]);
                }
            }
            else {
                Tool.pre(["出错001：", oo])
            }
        },
        a07: function (oo) {
            $("#state").html("正在更新发货信息...");
            let PurchaseWaitingDelivery = 28
            let html = "\"\"\
            <r: db=\"sqlite.dhgate\">\
            update @.order set @.purchasestatus=5,@.PurchaseRemark='"+ oo.PurchaseRemark + "[没发货]',@.Status='101009',@.PurchaseWaitingDelivery=" + PurchaseWaitingDelivery + ",@.DeliveryDate=" + Tool.gettime("") + " where @.orderid='" + oo.orderid + "'\
            <1/>\
            INSERT into @.logdeliver(@.OrderID,@.DeliverDate,@.Express,@.ExpressNumber,@.shopname,@.shopid)VALUES('"+ oo.orderid + "'," + Tool.gettime("") + ",'/Cainiao/','/" + oo.ran + "/','" + oo.username + "'," + oo.fromid + ")\
            </r:>";
            Tool.ajax.a01(html, 1, this.a08, this);
        },
        a08: function (t) {
            if (Tool.Trim(t) == "") { window.location.reload(); } else { alert("出错：" + t); }
        }
    }
});