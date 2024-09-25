'use strict';
Object.assign(Tool, {
  Tracking:
  {
    obj: null,
    This: {}, temp: null,
    a01: function (oo) {
      this.obj = oo
      this.This = $('button[onclick="fun.c18()"]')
      this.This.html("正在【同步运单号到敦煌网】...").attr("disabled", true);;
      this.obj.o3.aliDeliver = [];//速卖通【所有】运单信息
      this.obj.o3.editDeliver = [];//要在DH【修改】的运单信息
      this.obj.o3.addDeliver = [];//要在DH【添加】的运单信息
      this.obj.o3.addDeliverA1 = 1;
      ////////////////////////////////////////
      this.obj.Aarr = this.obj.PurchaseOrderId.split("/");
      this.obj.A1 = 1;
      this.obj.A2 = this.obj.Aarr.length;
      gg.isRD(this.a02, this);
    },
    a02: function () {
      let url = "https://track.aliexpress.com/logistic/getDetail.json?tradeId=" + this.obj.Aarr[this.obj.A1 - 1];
      $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
      $("#state").html("正在获取【SMT订单内容】...");
      gg.getFetch(url,"json", this.a03, this)
    },
    a03: function (oo) {
      if (oo.success) {
        if (oo.data.packages[0].tradeOrderInfo.orderId == this.obj.Aarr[this.obj.A1 - 1]) {
          $("#state").html("已获得【SMT订单内容】...")
          this.a04(oo);
        }
        else {
          $("#state").html("订单号不对...")
        }
      }
      else {
        let url = "https://login.aliexpress.com/?return_url=https%3A%2F%2Fwww.aliexpress.com%2Fp%2Forder%2Findex.html%3Fspm%3Da2g0o.cart.1000001.28.10c038da9fr91U"
        alert(url)
        //gg.tabs_remove_create_indexOf(2, url, 'Deleted orders',true, this.a06, this)
      }
    },
    a04: function (oo) {
      $("#state").html("(" + this.obj.A1 + ")已【登陆】正在【验证发货】...");
      let packages = oo.data.packages
      if (packages.length == 1) {
        if (packages[0].status == "AWAITING_SHIPMENT") {
          Tool.Modal("提示", "<p>速卖通【没发货】，不能【同步运单号到敦煌网】。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
        }
        else {
          let Express = packages[0].trackingNumbersInfo[0].serviceName
          let ExpressNumber = packages[0].trackingNumbersInfo[0].logisticsNo
          $("#state").html("订单号：" + ExpressNumber + " ； 物流公司：" + Express);

          let o1 = [{
            Express: Express,
            ExpressNumber: ExpressNumber
          }]

          this.obj.o3.editDeliver = o1;//要在DH【修改】的运单信息
          //this.obj.o3.addDeliver = o1;//要在DH【添加】的运单信息
          this.a05();
        }
      }
      else {
        alert("有了再说。")
      }
    },
    a05: function () {
      /*
      输入：this.obj.username=xxxxxx
            this.obj.password=xxxxxx
      输出：无
      */
      Tool.verifyUser.a01(this.a06, this, this)
    },
    a06: function () {
      if (this.obj.o3.editDeliver.length == 0)//如果不用修改运单号
      {
        $("#state").html("正在【添加】运单号...");
        //this.a10();//那一定是添加
      }
      else {
        $("#state").html("正在【修改运单号】运单号...");
        this.obj.o3.editDeliver[0].Express = Tool.Express(this.obj.o3.editDeliver[0].Express.replace(/\s+/g, ' '))//先用个ePacket发下，看能否成功，不成功就改成万能的。
        this.a07();
      }
    },
    a07: function () {
      let url = "http://seller.dhgate.com/logistics/orderDetail/getOrderDeliveryDTOS.do?orderId=" + this.obj.orderid32
      gg.getFetch(url,"json", this.c01, this)
    },
    ////////////////////////////////////////////////////////
    c01: function (t) {

      let url = "http://seller.dhgate.com/messageweb/sellerconfig.do?act=pagetipdetail";
      $("#state").html(url);
      gg.getFetch(url,"json", this.c02, this, t);
    },
    c02: function (oo, t) {
      if (oo.isSuccess) {
        let d3 = this.obj.o3.editDeliver[0];
        if (d3.Express.indexOf("未知物流") == -1) {
          let bodystr = Tool.StrSlice(t, this.obj.orderid32 + "','", "');");
          if (bodystr) {
            let arr = bodystr.split("','")
            let url = 'http://seller.dhgate.com/logistics/orderDetail/saveUpdateOrderDelivery.do?updateShippingTypeBuyer=' + arr[1] + '&updateDeliveryRank=2&updateOrderDeliveryId=' + arr[0] + '&orderId=' + this.obj.orderid32 + '&updateHp=0&updateShippingType=' + d3.Express + '&updateTrankNo=' + d3.ExpressNumber + '&updateDeliveryState=1&updateDeliveryReason=6&updateHp=0&updateDeliveryRemark='
            $("#state").html(url);
            gg.getFetch(url,"json", this.c03, this);
          }
          else if (t.indexOf(d3.ExpressNumber) != -1)//运单号相同不需要发货
          {
            alert("aaaaaaa333333333aaaaaaaaa")
            //this.c03(t);
          }
          else {

            Tool.at(t)
            Tool.Modal("提示", '<p>DH页面已改版，原本是：frtShowUpdateDeliver(\'ff808081697120540169990cf8502bb0\',\'ff80808167bc5e6a0169af83d7604c64\',\'China Post Air\');"，请联系管理员，添加该物流<p>', '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
          }
        }
        else {
          Tool.Modal("提示", '<p>有' + d3.Express + '，请联系管理员，添加该物流<p>', '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '');
        }
      }
    },
    c03: function (str) {
      let d3 = this.obj.o3.editDeliver[0];
      if (str.indexOf('此运单号为非该物流公司的运单号，请核查后再重新填写') != -1) {
        if (d3.Express == "ePacket") {
          this.obj.o3.editDeliver[0].Express = "Ocean"//就改成万能的。
          this.a07();
        } else { alert("万能物流也报错：此运单号为非该物流公司的运单号，请核查后再重新填写"); }
      }
      else if (str.indexOf("此运单号已使用，请重新填写") != -1) {
        let txt = '物流公司【' + d3.Express + '】的运单号【' + d3.ExpressNumber + '】已使用。\
    		<ul class="Tul">\
    			<li>请重新填写运单号</li>\
    			<li class="w200"><input type="text" id="ExpressNumber" class="form-select" value="'+ d3.ExpressNumber + '-1"></li>\
    		</ul>'
        Tool.Modal("此运单号已使用，请重新填写", txt, '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="F3.c07()" data-bs-dismiss="modal">已修改,请重新发货</button>', 'modal-lg');
      }
      else {

        $("#state").html("可能是修改成功了，去看一下运单号对不对...");
        let url = "http://seller.dhgate.com/logistics/orderDetail/getOrderDeliveryDTOS.do?orderId=" + this.obj.orderid32
        gg.getFetch(url,"json", this.c04, this)
      }
    },
    c04: function (str) {
      let d3 = this.obj.o3.editDeliver[0];
      if (str.indexOf(d3.ExpressNumber) != -1) {
        let PurchaseWaitingDelivery = d3.PurchaseWaitingDelivery ? ",@.PurchaseWaitingDelivery=" + Tool.gettime(d3.PurchaseWaitingDelivery) : '';//当订单已完成，就不会有【到期时间了】
        let html = "[<r: db=\"sqlite.dhgate\">update @.order set @.purchasestatus=2,@.PurchaseRemark='" + this.obj.PurchaseRemark.replace("[没发货]", "").replace(/'/g, "''") + "'" + PurchaseWaitingDelivery + " where @.orderid='" + this.obj.orderid + "'<1/>update @.logdeliver set @.ExpressNumber='/" + d3.ExpressNumber + "/',@.Express='/" + d3.Express.replace(/'/g, "''") + "/' where @.orderid='" + this.obj.orderid + "'</r:>]"
        Tool.ajax.a01( html,1,this.c05, this);
      }
      else {
        $("#state").html("运单号不对..."); Tool.at(str);
      }
    },
    c05: function (t) {
      if (t[0] == null) { this.c06(); } else { Tool.at(t); }
    },
    c06: function () {
      if (this.obj.o3.addDeliver.length == 0)//如果不用添加
      {
        alert("不用添加");
        //this.c06();
      }
      else {
        $("#state").html("正在【添加】运单号...");
        alert("qqqqqqqqqqqqqqqqqwwwwwwwwwww")
        //this.n09();
      }
    },
    //  c06: function () { window.location.reload(); },
    //  c07: function () {
    //    this.obj.o3.editDeliver[0][1].ExpressNumber = $("#ExpressNumber").val();
    //    this.a09();
    //  }



    //    this.b01(arr1, arr2, PurchaseWaitingDelivery)//把发货单号组成数组
    //    this.obj.A1++
    //    if (this.obj.A1 <= this.obj.A2) { this.a02() }
    //    else {
    //      this.a05();
    //    }
    //  a05: function () {
    //    let d1 = this.obj.o3.logdeliver, d2 = this.obj.o3.aliDeliver, bool = false, d3 = [], d4 = [];
    //    //////////【DH】里面的运单号，在【SMT】那里有没有，如果有就给【this.obj.o3.editDeliver】传值//////////////////////////////////////
    //    for (let i = 1; i < d1.length; i++)//看要不要修改
    //    {
    //      bool = false
    //      for (let j = 0; j < d2.length; j++) {
    //        if (d1[i].ExpressNumber.indexOf("/" + d2[j].ExpressNumber + "/") != -1) { bool = true; break; }//是否有这个运单号
    //      }
    //      if (!bool) { d3.push([i, d2[0]]); d2.shift(); }//记下重复的，为【d3】
    //    }
    //    this.obj.o3.editDeliver = d3;//要在DH【修改】的运单信息
    //    ///////////////////////////////////////////////////
    //    //////////如果【DH】运单数小于【SMT】运单数，说明有运单要添加,如果有就给【this.obj.o3.addDeliver】传值/////////////////////////////////////////
    //    if (d1.length - 1 < d2.length)//要添加
    //    {
    //      for (let i = 0; i < d2.length; i++) {
    //        bool = false;
    //        for (let j = 1; j < d1.length; j++) {
    //          if (d1[j].ExpressNumber.indexOf("/" + d2[i].ExpressNumber + "/") != -1) { bool = true; break; }
    //        }
    //        if (!bool) { d4.push(d2[i]); }
    //      }
    //      this.obj.o3.addDeliver = d4;
    //    }
    //    ///////////////////////////////////////////////////
    //    if (d3.length != 0) {
    //      if (d3.length == 1) {

    //        $("#state").text("[要修改运单号]");
    //        this.a06();
    //      }
    //      else { Tool.Modal("提示", "<p>有多个运单要【修改】，需手动操作，并请联系管理员【开发该功能】。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', ''); }
    //    }
    //    else if (d4.length != 0) {
    //      $("#state").text("[要添加运单号]");
    //      this.a06();
    //    }
    //    else { Tool.Modal("提示", "<p>俩边运单号相同，无需【同步运单号到敦煌网】。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', ''); }
    //  },






    //  a10: function ()//那一定是添加
    //  {
    //    let d4 = this.obj.o3.addDeliver[this.obj.o3.addDeliverA1 - 1];
    //    d4.Express = F1.b02(d4.Express)
    //    $("#state").html(d4.Express);
    //    if (d4.Express.indexOf("未知物流") == -1) {
    //      this.a11(d4);
    //    }
    //    else {
    //      $("#state").html(d4.Express);
    //    }
    //  },
    //  a11: function (d4) {
    //    this.temp = d4;
    //    let URL = "http://seller.dhgate.com/logistics/orderDetail/saveOrderDelivery.do?orderId=" + this.obj.orderid32 + "&hp=0&deliveryRank=2&shippingType=" + d4.Express + "&trankNo=" + d4.ExpressNumber + "&deliveryState=1&deliveryRemark=" + encodeURI(d4.ExpressDes)
    //    gg.getFetch(url,"json", this.a12, this)
    //  },
    //  a12: function (str) {
    //    let d4 = this.temp;
    //    $("#state").html("可能是修改成功了，去看一下运单号对不对...");
    //    if (str.indexOf("此运单号为非该物流公司的运单号，请核查后再重新填写") != -1) {
    //      if (d4.Express == "Ocean") { alert("万能物流也报错：此运单号为非该物流公司的运单号，请核查后再重新填写"); }
    //      else {
    //        d4.Express = "Ocean"//就改成万能的。
    //        this.a11(d4);
    //      }
    //    }
    //    else if (str.indexOf("此运单号已使用，请重新填写") != -1) {
    //      alert("此运单号已使用，请重新填写\n【" + d4.Express + "】\n【" + d4.ExpressNumber + "】");
    //    }
    //    else {
    //      let url = "http://seller.dhgate.com/logistics/orderDetail/getOrderDeliveryDTOS.do?orderId=" + this.obj.orderid32
    //      gg.getFetch(url,"json", this.a13, this)
    //    }
    //  },
    //  a13: function (str) {
    //    let d4 = this.temp;
    //    if (str.indexOf(d4.ExpressNumber) != -1) {
    //      let html = "\
    //		[\
    //			<r: db=\"sqlite.dhgate\">update @.order set @.purchasestatus=2,@.PurchaseRemark='"+ this.obj.PurchaseRemark.replace("[没发货]", "").replace(/'/g, "''") + "',@.PurchaseWaitingDelivery='" + d4.PurchaseWaitingDelivery + "' where @.orderid='" + this.obj.orderid + "'<1/>INSERT into @.logdeliver(@.OrderID,@.DeliverDate,@.Express,@.ExpressNumber,@.shopname,@.shopid)VALUES('" + this.obj.orderid + "'," + Tool.gettime("") + ",'/" + d4.Express + "/','/" + d4.ExpressNumber + "/','" + this.obj.username + "'," + this.obj.fromid + ")</r:>]";
    //     Tool.ajax.a01( html,1,this.a14,this);
    //    }
    //    else {
    //      alert("内容不对");
    //      Tool.at(str);
    //    }
    //  },
    //  a14: function (t) {
    //    if (t[0] == null) {
    //      this.obj.o3.addDeliverA1++;
    //      if (this.obj.o3.addDeliverA1 - 1 < this.obj.o3.addDeliver.length) {
    //        this.a10();
    //      }
    //      else {
    //        Tool.pre(t)
    //        //this.m05("");
    //      }
    //    } else { alert("出错03：" + t); }
    //  },
    //  ////////////////////////////////////////////////////////
    //  b01: function (arr1, arr2, PurchaseWaitingDelivery)//把发货单号组成数组
    //  {
    //    let bool = false, Express, ExpressNumber
    //    if (arr1.length == arr2.length) {
    //      for (let i = 0; i < arr1.length; i++)//一个采购单可能有多个发货单号
    //      {
    //        Express = arr1[i];
    //        ExpressNumber = arr2[i];
    //        bool == false;
    //        for (let j = 0; j < this.obj.o3.aliDeliver.length; j++)//去重复，可以解决，SMT多个采购单号，用一个运单号
    //        {
    //          if (ExpressNumber == this.obj.o3.aliDeliver[j].ExpressNumber) { bool = true; break; }
    //        }
    //        if (!bool) {
    //          //存好当前页的，所有运单号
    //          this.obj.o3.aliDeliver.push(
    //            {
    //              Express: Express,
    //              ExpressNumber: ExpressNumber,
    //              PurchaseWaitingDelivery: PurchaseWaitingDelivery
    //            });
    //        }
    //      }
    //    }
    //    else { alert("发货公司与发货单号不一样。"); }
    //  },

  }
});