'use strict';
let F6 =
{
    next: null, This: null,
    obj: { A1: 1, A2: 0, AArr: [] },
    a01: function (next, This) {
        $("#taskDes").html("催款");
        this.next = next;
        this.This = This;
        this.a02()
    },
    a02: function () {
        let html = '\
		[{}\
    <r:order size=200 db="sqlite.dhgate" where=" where @.PurchaseStatus=6 and @.status=\'101003\' and @.isCuiMoney=0 and @.fromuser=\''+ this.This.obj.username + '\' order by @.BeginDate desc,@.id desc">,\
      {\
        "fromuser":"<:fromuser/>",\
        "orderID":"<:orderID/>"\
      }\
    </r:order>]'
       Tool.ajax.a01( html,1,this.a03,this);
    },
    a03: function (arr) {
        if (arr.length == 201) { $("#state").html("[无需采购]的数量超过200个，请与管理员联系！"); }
        else {
            if (arr.length == 1) {
                $("#state").html("没有要催款的【订单】。");
                this.obj.A1 = 1; this.obj.A2 = 0;//下次还要用
                this.next.apply(this.This)
            }
            else {
                this.obj.Aarr = arr;
                this.obj.A2 = arr.length - 1;
                this.a04();
            }
        }
    },
    a04: function () {
        if (this.obj.A1 <= this.obj.A2) {
            let arr2 = this.obj.Aarr[this.obj.A1]
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100);
            $("#C1").html(p1 + "%").css("width", p1 + "%");
            $("#C2").html(this.obj.A1 + '/' + this.obj.A2 + '（个）');
            this.a05();
        }
        else {
            this.a03([{}])
        }
    },
    a05: function () {
        $("#state").html("正在【搜索订单】...");
        let url = "http://seller.dhgate.com/sellerordmng/orderList/list.do?params.orderNo=" + this.obj.Aarr[this.obj.A1].orderID + "&params.itemCode=&params.buyerName=&params.orderStatus=100&params.shippingCountry=&params.fromPlatform=&params.fromSite=&params.fromMobile=&params.startDate=&params.endDate=&params.trackingno=&params.activeType=0&params.groupStatus=&params.sampleStatus=&params.isFlag=&params.queryType=0&params.linkType=111&params.operableType=search"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        
        gg.getFetch(url,"json", this.a06, this)

    },
    a06: function (str) {
        
        let url = "http://seller.dhgate.com" + Tool.StrSlice(str, '<a class="contact-buyer" title="联系卖家" href="', '">');
       
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在【打开订单站内信】...<hr/>");
        gg.getFetch(url,"json", this.a07, this)
    },
    a07: function (str) {
        if (str.indexOf("Thanks for you order") == -1) {
            let topicId = Tool.StrSlice(str, 'type="hidden" name="topicId" value="', '"');
            let fromSysuserbaseid = Tool.StrSlice(str, 'id="fromSysuserbaseid" value="', '"');
            let supplierid = Tool.StrSlice(str, 'id="supplierid" value="', '"');
            let toSysuserbaseid = "", url = "", parm = ""
            let content = "Dear Customer,\n Thanks for you order,\n The item you selected is a high quality one with competitive price. You would like it.\n Instant payment can ensure earlier arrangement to short of stock.\n Thank you and awaiting your payment.\n Best regards"
            //注：如果有站内信和没站内信回复是有区别的。为：发送 或 回复
            if (topicId)//说明以前有站内信内容
            {
                url = "http://seller.dhgate.com/messageweb/replytobuyer.do?msgtype=2&filesize=0"
                toSysuserbaseid = Tool.StrSlice(str, 'name="toSysuserbaseid" value="', '"');
                parm = Tool.StrSlice(str, '主题<!--主题-->：PO#', '</h2>');
                this.obj.Aarr[this.obj.A1].order32ID = Tool.StrSlice(str, '"/sellerordmng/sellerorderDetail/pageload.do?orderId=', '&dhpath=10002,06');
                ////////////////////////////////////////////////
                url = url + "&parm=" + parm + "&topicId=" + topicId + "&content=" + encodeURI(content) + "&fromSysuserbaseid=" + fromSysuserbaseid + "&toSysuserbaseid=" + toSysuserbaseid + "&supplierid=" + supplierid + "&title=PO%23" + parm
                $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                $("#state").html("正在【回复站内信】...");
                gg.getFetch(url,"json", this.a08, this)
            }
            else//说明以前没有站内信内容
            {
                url = "http://seller.dhgate.com/messageweb/sendtobuyer.do?msgtype=2&filesize=0"
                toSysuserbaseid = Tool.StrSlice(str, 'id="toSysuserbaseid" value="', '"');
                parm = Tool.StrSlice(str, 'id="parm" value="', '"');
                this.obj.Aarr[this.obj.A1].order32ID = Tool.StrSlice(str, '?act=pageload&rfxId=', '&dhpath=10002,06');
                //////////////////////////////////////////////////
                url = url + "&parm=" + parm + "&content=" + encodeURI(content) + "&supplierid=" + supplierid + "&fromSysuserbaseid=" + fromSysuserbaseid + "&toSysuserbaseid=" + toSysuserbaseid + "&title=PO%23" + parm
                $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                $("#state").html("正在【发送站内信】...");
                gg.getFetch(url,"json", this.a08, this)
            }
        }
        else {
            this.a10();//记录这条数据
        }
    },
    a08: function (oo) {
        if (oo.isSuccess == true) {
            let url = 'http://seller.dhgate.com/sellerordmng/orderOperation/paymentNotify.do?orderId=' + this.obj.Aarr[this.obj.A1].order32ID + '&paymentdeadline=5'
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在【提醒买家付款】...");
            gg.getFetch(url,"json", this.a09, this)
        }
        else {
            alert("aaaaaaaaaaaaaaaaaaaaa")
            /*
           if(t.indexOf('"您发送站内信太频繁啦，请稍后发送！"')!=-1)
           {this.a10();}
           else
           {$("#state").html("【提醒买家付款】失败..."+t);}
           */
        }
    },
    a09: function (oo) {
        if (oo.msg == "操作成功！") {
            //||oo.indexOf('订单当前状态不能进行此操作。')!=-1
            this.a10();
        }
        else { $("#state").html("提醒买家付款失败"); Tool.pre(oo); }
    },
    a10: function () {
        $("#state").html("正在【记录这条数据】...");
        let html = "[<r: db=\"sqlite.dhgate\">update @.order set @.isCuiMoney=1 where @.orderid='" + this.obj.Aarr[this.obj.A1].orderID + "'</r:>]"
       Tool.ajax.a01( html,1,this.a14,this)
    },
    a14: function (t) {
        if (t[0] == null) {
            $("#C2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            this.a04();
        }
        else {
            t.err = "出错001"
            Tool.pre(t);
        }
    }
}