'use strict';
Object.assign(Tool, {
    OrderDelivery: {
        next: null, This: null, t: null,
        obj:
        {
            C1: 1, C2: 0, Carr: {},
            D1: 1, D2: 0, Darr: []
        },
        a01: function (username, next, This, t) {
            $("#taskDes").html("发货");
            this.next = next;
            this.This = This;
            this.t = t;
            this.a02(username);
        },
        a02: function (username) {
            //status=103001   等待您发货
            //status=105004   买家取消退款申请
            // C1							采购订单的个数
            // D1							1个采购订单，有多少个发货运单个数
            let html = '\
            {\
                <r:order db="sqlite.dhgate" page=2 size=1 where=" where (@.status=\'103001\' or @.status=\'105004\') and not(@.PurchaseOrderId=\'\') and @.fromuser=\''+ username + '\'  order by @.PayTime desc,@.id desc">\
                    "PurchaseOrderId":"<:PurchaseOrderId/>",\
                    "PurchaseUserName":"<:PurchaseUserName/>",\
                    "OrderId":"<:OrderId/>",\
                    "PurchaseRemark":"<:PurchaseRemark tag=js/>",\
                    "orderid32":"<:orderid32/>",\
                </r:order>\
                "C2":<@count/>\
            }'
            Tool.ajax.a01(html, this.obj.C1, this.a03, this,)
        },
        a03: function (oo) {
            if (oo.PurchaseOrderId) {
                if (this.obj.C2 == 0) { this.obj.C2 = oo.C2; }
                this.obj.Carr = oo;
                this.obj.Darr = oo.PurchaseOrderId.split("/");
                this.obj.D2 = this.obj.Darr.length;
                this.a04();
            }
            else {
                this.a17();
            }
        },
        a04: function () {
            Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a05, this, this.a00017)
        },
        a05: function () {
            Tool.x1x2("D", this.obj.D1, this.obj.D2, this.a06, this, this.a18)
        },
        a06: function () {
            let url = "https://track.aliexpress.com/logistic/getDetail.json?tradeId=" + this.obj.Darr[this.obj.D1 - 1];
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取【SMT订单内容】...");
            gg.getFetch(url,"json", this.a07, this)
        },
        a07: function (oo) {
            if (oo.success) {
                if (oo.data.packages[0].tradeOrderInfo.orderId == this.obj.Darr[this.obj.D1 - 1]) {
                    $("#state").html("已获得【SMT订单内容】...")
                    this.a08(oo);
                }
                else {
                    $("#state").html("订单号不对...")
                }
            }
            else {
                //要登陆
                let url = "https://login.aliexpress.com/?return_url=https%3A%2F%2Fwww.aliexpress.com%2Fp%2Forder%2Findex.html%3Fspm%3Da2g0o.cart.1000001.28.10c038da9fr91U"
                //gg.tabs_remove_create_indexOf(2, url, 'Deleted orders',true, this.a06, this)
                alert("要登陆")
            }
        },
        a08: function (oo) {
            let packages = oo.data.packages
            if (packages.length == 1) {
                if (packages[0].status == "AWAITING_SHIPMENT") {
                    $("#state").html("还没发货...")
                    this.a16("");
                }
                else {
                    let Express = packages[0].trackingNumbersInfo[0].serviceName
                    let ExpressNumber = packages[0].trackingNumbersInfo[0].logisticsNo
                    $("#state").html("订单号：" + ExpressNumber + " ； 物流公司：" + Express);
                    let o1 = {
                        Express: Express,//采购方物流
                        ExpressNumber: ExpressNumber,//采购方物流单号
                        Express2: "Cainiao",//实际物流名称---这个写死，我只有这个物流
                        ExpressNumber2: ""//实际物流单号
                    }
                    this.obj.Carr.Express = o1;
                    this.a09();
                }
            }
            else {
                alert("有了再说。")
            }
        },
        a09: function () {
            $("#state").html("正在找一个，查不到的物流单号......");
            let ran = "S00000" + Tool.randomRange(100000000, 999999999)
            let url = "https://global.cainiao.com/global/detail.json?mailNos=" + ran + "&lang=en-US&language=en-US"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a10, this);
        },
        a10: function (t) {
            if (t.module[0].detailList.length == 0) {
                //过
                this.a11(t.module[0].mailNo);
            }
            else {
                this.a09();
            }
        },
        a11: function (mailNo) {
            let oo = this.obj.Carr.Express;
            oo.ExpressNumber2 = mailNo;//敦煌用的物流--实际物流单号(假的)
            //oo.ExpressNumber          速卖通的物流单号
            $("#state").html("正在发货。。。");
            let Remark = "dear friend\n Your order has been shipped.We use fast logistics.\nYour tracking number is:" + oo.ExpressNumber + " \nyou can track it here: https://global.cainiao.com \n \n note:tracking number " + oo.ExpressNumber2 + " It's wrong"
            let arr = []
            arr.push("orderId=" + this.obj.Carr.orderid32);
            arr.push("hp=0");
            arr.push("logisticType=40");
            arr.push("shippingType=" + oo.Express2);
            arr.push("trankNo=" + mailNo);
            arr.push("deliveryState=1");
            arr.push("deliveryRemark=" + Remark);
            let url = "http://seller.dhgate.com/logistics/orderDetail/saveOrderDelivery.do?" + arr.join("&");
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a12, this);
        },
        a12: function (html) {
            $("#state").html("正在验证发货结果。。。");
            if (html.indexOf('<p><!--发出货物-->发出货物</p>') != -1) {
                $("#state").html("发出货物。。。");
                //this.d01();
            }
            else if (html.indexOf("DHLink无此运单号，不能使用发货") != -1) {
                $("#state").html("此运单号为非该物流公司的运单号，请核查后再重新填写")
                //this.a15([]);
            }
            else if (html.indexOf("此运单号为非该物流公司的运单号，请核查后再重新填写") != -1) {
                $("#state").html("订单：" + this.obj.Carr.OrderId + " ； 此运单号为非该物流公司的运单号，请核查后再重新填写")
                //this.obj.D2arr.Express = "Ocean";
                //this.a09(this.obj.D2arr);
            }
            else if (html.indexOf("此运单号已使用，请重新填写") != -1) {
                $("#state").html("此运单号已使用，请重新填写。")
                //if (this.obj.D2arr.ExpressNumber.indexOf("-1") == -1) {
                //    this.obj.D2arr.ExpressNumber += "-1";
                //    this.a09(this.obj.D2arr);
                //}
                //else {
                //    this.d01();
                //    //alert("aaaaaaaaaaaaaaaaaa")
                //}
            }
            else if (html.indexOf("<li>在进行操作时出错了!</li>") != -1) {
                $("#state").html('这个订单客户可能申请了退款，请拒绝后继续 。');
                Tool.at(html);
                //this.d01();
            }
            else {
                $("#state").html("发货未知内容");
                Tool.at(html);
            }
        },
        a16: function (t) {
            if (t == "") {
                this.obj.D1++;
                this.obj.D2arr = {}
                $("#state").html("正在准备该订单的下一个采购订单。。。")
                this.a05();
            }
            else { $("#state").html("出错01:" + Tool.pre(t)); }
        },

        a17: function () {
            $("#taskDes,#url").html("");
            $("#state").html("订单已发货完成");
            $("#C1").html("0%").css("width", "0%");
            $("#C2").html('');
            this.obj = {
                C1: 1, C2: 0, Carr: {},
                D1: 1, D2: 0, Darr: []
            };//下次还要用

            this.next.apply(this.This)
        },
        a18: function () {
            this.obj.Darr = []
            this.obj.D2arr = {}
            this.obj.D1 = 1;
            this.obj.D2 = 0;
            $("#D1").html("0%").css("width", "0%");
            $("#D2").html('');
            this.obj.C1++;
            this.a02()
        },
      d01: function ()//确认发货运单号
      {
          $("#state").html("正在确认发货运单号。。。")
          let url = "http://seller.dhgate.com/logistics/orderDetail/getOrderDeliveryDTOS.do?orderId=" + this.obj.Carr.orderid32 + "&isImmediateDelivery=false&language=zh"
          $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
          alert(url)
          //gg.getFetch(url,"json", this.a12, this);
      },
    }
})







    //  a12: function (t) {
    //      if (t.indexOf(this.obj.D2arr.ExpressNumber) != -1) {
    //          this.a13();
    //      }
    //      else {
    //          $("#state").html("已发货了，但找不到发货运单号【" + this.obj.D2arr.ExpressNumber + "】,未知内容");
    //      }
    //  },
    //  a13: function () {
    //      let select1 = "select count(1) from @.logdeliver where @.OrderID='" + this.obj.Carr.OrderId + "'";
    //      let arr = this.obj.D2arr;
    //      arr.Express = arr.Express.replace(/'/g, "''");
    //      arr.ExpressNumber = arr.ExpressNumber.replace(/'/g, "''");
    //      arr.Express2 = arr.Express2.replace(/'/g, "''");
    //      arr.ExpressNumber2 = arr.ExpressNumber2.replace(/'/g, "''");
    //      let INSERT = "INSERT into @.logdeliver(@.OrderID,@.DeliverDate,@.Express,@.ExpressNumber,@.Express2,@.ExpressNumber2,@.shopname,@.shopid)\
    //VALUES('"+ this.obj.Carr.OrderId + "'," + Tool.gettime("") + ",'/" + arr.Express + "/','/" + arr.ExpressNumber + "/','/" + arr.Express2 + "/','/" + arr.ExpressNumber2 + "/','" + this.This.obj.username + "'," + this.This.obj.fromid + ")"
    //      let str = '<if Fun(Db(sqlite.dhgate,' + select1 + ',count))==0><r: db="sqlite.dhgate">' + INSERT + '</r:><else/>添加更新</if>'
    //      Tool.ajax.a01(str, 1, this.a14, this);
    //  },
    //  a14: function (t) {
    //      if (t == "") {
    //          this.a15();
    //      }
    //      else if (t == "添加更新") {
    //          //this.a15();
    //          $("#state").html("商品已发货了，但还要发一条，没有做。。。。(在DH已发货，但本地没更新)");
    //          //let update="update @.logdeliver set @.Express='/"+Express.join("/")+"/',@.ExpressNumber='/"+ExpressNumber.join("/")+"/' where @.OrderID='"+this.obj.Carr.OrderId+"'"
    //          //<r: db="sqlite.dhgate">'+update+'</r:>
    //      }
    //      else { $("#state").html("出错02：" + t); }
    //  },
    //  a15: function () {
    //      let str = '<r: db="sqlite.dhgate">update @.order set @.Status=\'101009\',@.DeliveryDate=' + Tool.gettime("") + ' where @.orderid=\'' + this.obj.Carr.OrderId + '\'</r:>';
    //      $("#state").html("正在更新订单状态...");
    //      Tool.ajax.a01(str, 1, this.a16, this);
    //  },
