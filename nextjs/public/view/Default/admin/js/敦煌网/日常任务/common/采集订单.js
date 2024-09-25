'use strict';
let F2 =
{
    next: null, This: null,
    obj: {
        A1: 1, A2: 0, Aarr: [],
        B1: 1, B2: 1,
        C1: 1, C2: 0, CArr: [], C32Arr: []
    },
    a01: function (next, This) {
        this.obj.Aarr = this.b01();
        this.obj.A2 = this.obj.Aarr.length;//任务说明
        this.next = next;
        this.This = This;
        this.a02()
    },
    a02: function () {
        if (this.obj.A1 <= this.obj.A2) {
            $("#taskDes").html(this.b02());
            this.a03();
        }
        else {
            $("#taskDes,#url").html("");
            $("#state").html("订单已采集完成");
            this.obj.A1 = 1;
            this.obj.A2 = 0;//下次还要用
            this.next.apply(this.This);
        }
    },
    a03: function () {
        if (this.obj.B1 <= this.obj.B2)//页进度
        {
            //if(this.obj.B1<33&&this.obj.B2!=1){this.obj.B1=33}
            let url = this.obj.Aarr[this.obj.A1 - 1][0] + this.obj.B1;
            let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100);
            $("#B1").html(p1 + "%").css("width", p1 + "%");
            $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + '（页）');
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在打开【" + this.obj.Aarr[this.obj.A1 - 1][1] + "】页面。。。");
            gg.getFetch(url,"json", this.a04, this);
        }
        else {
            $("#B1").html("0%").css("width", "0%");
            $("#B2").html('');
            this.obj.A1++;
            this.obj.B1 = 1;
            this.obj.B2 = 1;//注：当要打开【待发货】页面时，B2=1是为了第一页要打开的。
            this.a02();
        }
    },
    a04: function (t) {
        if (t.indexOf('每页显示') != -1) {
            this.a05(t);
        }
        else if (t.indexOf('您暂时没有符合条件的订单，请更改条件后重试。') != -1) {
            this.a10();
        }
        else if (t.indexOf('{status:0}') != -1 || t.indexOf('{status:"timeout"}') != -1 || t.indexOf('<title>502 Bad Gateway</title>') != -1) {
            alert("cccccccccceeeeecccc")
            //this.a07();
        }
        else {
            alert("获取内容出错，可能已改版。");
            Tool.at(t);
        }
    },
    a05: function (t) {
        let orderidArr = Tool.strRepArr(t, "\&parm\=([0-9]+)\&", 1);
        let orderid32Arr = Tool.strRepArr(t, 'data-orderid="(.+)"', 1);
        ////////////////////////////////////
        let orderStatusArr = Tool.StrSplits(t, '<td class="col3">', "</strong>");
        for (let i = 0; i < orderStatusArr.length; i++) {
            orderStatusArr[i] = orderStatusArr[i].split('<strong>')[1].replace("<br/>", "，")
        }
        ////////////////////////////////////
        let rcount = Tool.strRepArr(t, '共有\\s*([0-9]+)\\s*条记录', 1)[0];
        let pcount = Tool.strRepArr(t, '每页显示([0-9]+) 条', 1)[0];
        this.obj.B2 = Math.ceil(parseInt(rcount) / parseInt(pcount));
        this.obj.CArr = orderidArr;//条进度
        this.obj.C32Arr = orderid32Arr;
        this.obj.orderStatusArr = orderStatusArr;
        this.obj.C2 = this.obj.CArr.length;
        if (orderidArr.length == orderid32Arr.length && orderid32Arr.length == orderStatusArr.length) {
            this.a06();
        }
        else {
            //Tool.echo([orderidArr,orderid32Arr])
            $("#state").html("orderid出错" + Tool.pre([orderidArr, orderid32Arr, orderStatusArr]));
            Tool.pre(t)
        }
    },
    a06: function () {
        this.a07();
    },
    a07: function () {
        if (this.obj.C1 <= this.obj.C2) {
            $("#state").html("正在判断本地数据。。。");
            let p1 = Math.ceil(this.obj.C1 / this.obj.C2 * 100);
            $("#C1").html(p1 + "%").css("width", p1 + "%");
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（条）');
            let str = '[<r:order db="sqlite.dhgate" size=1 where=" where @.orderid=\'' + this.obj.CArr[this.obj.C1 - 1] + '\'"><:status/></r:order>]';
            Tool.ajax.a01(str, 1, this.a08, this)
        }
        else {
            this.a10();
        }
    },
    a08: function (t) {
        if (t[0] == null)//无
        {
            $("#state").html("本地【无】。。。");
            if (this.obj.Aarr[this.obj.A1 - 1][3] == "【采集】") {
                this.a11();//更新 或 添加
            }
            else if (this.obj.Aarr[this.obj.A1 - 1][3] == "【提示错误】") {
                $("#state").html('有问题。订单号：' + this.obj.CArr[this.obj.C1 - 1] + '在本地数据库中没有！');
            }
            else { $("#state").html("本地无，未知操作：" + this.obj.Aarr[this.obj.A1 - 1][3]); }
        }
        else//有
        {
            $("#state").html("本地【有】。。。");
            if (this.obj.Aarr[this.obj.A1 - 1][2] == "【跳过】") {
                $("#state").html("本地有订单：" + this.obj.CArr[this.obj.C1 - 1] + "---【本地有则跳过】");
                this.a09([]);
            }
            else if (this.obj.Aarr[this.obj.A1 - 1][2] == "【更新】") {
                this.a11();//更新 或 添加
            }
            else if (this.obj.Aarr[this.obj.A1 - 1][2] == "【智能更新】") {
                let status = this.b04(Tool.Trim(this.obj.orderStatusArr[this.obj.C1 - 1]))
                if (status == t[0])//相同跳过
                {
                    this.a09([]);
                }
                else//不同更新
                {
                    this.a11();//更新 或 添加
                }
                //let html="\
                //				[\
                //					<if Fun(Db(sqlite.dhgate,select count(1) from @.order where @.orderid='"+this.obj.CArr[this.obj.C1-1]+"' and @.status='"+status+"',count))==0>\
                //						<r: db=\"sqlite.dhgate\">update @.order set @.status='"+status+"' where @.orderid='"+this.obj.CArr[this.obj.C1-1]+"'</r:>\
                //					<else/>\
                //						\"本地和来源相同【跳过】\"\
                //					</if>\
                //					]"
                //Tool.ajax.a01(html,1,this.a09,this);

            }
            else { alert("本地有，未知操作：" + this.obj.Aarr[this.obj.A1 - 1][2]); }
        }
    },
    a09: function (t) {
        if (t[0] == null) {
            $("#C2").html(this.obj.C1 + '/' + this.obj.C2 + '（完）');
            this.obj.C1++;
            this.a07();
        }
        /*
            else if(t[0]=="本地和来源相同【跳过】")//只要有一单相同，就跳过，这必须是敦煌【已发货订单】或【90天内交易完成】或【90天内交易取消】都是按时间倒序。
        {
                $("#state").html(t[0]);
                $("#B1,#C1").html("0%").css("width","0%");$("#B2,#C2").html('');
                this.obj.A1++;
                this.obj.B1=1;this.obj.B2=1;
                this.obj.C1=1;this.obj.C2=0;this.obj.CArr=[];this.obj.C32Arr=[];
                this.a02();
            }
            */
        else {
            pre(t);
            $("#state").html("出错002：" + Tool.pre(t));
        }
    },
    a10: function () {
        $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + '（完）');
        $("#C1").html("0%").css("width", "0%"); $("#C2").html('');
        this.obj.B1++;
        this.obj.C1 = 1; this.obj.C2 = 0; this.obj.CArr = []; this.obj.C32Arr = [];
        this.a03();
    },
    a11: function () {
        let url = "http://seller.dhgate.com/sellerordmng/sellerOrderDetail/pageload.do?orderId=" + this.obj.C32Arr[this.obj.C1 - 1]//订单详情
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取【订单(" + this.obj.CArr[this.obj.C1 - 1] + ")详情】...");
        gg.getFetch(url,"json", this.a12, this)
    },
    a12: function (t) {
        this.obj.sql1 = this.b03(t);//订单详细信息
        ////////////////////////////////////////////////////
        let orderid = Tool.Trim(Tool.StrSlice(t, '<!--转单订单拼接转单标识-->', '<!-- DH Faster -->'))
        if (this.obj.CArr[this.obj.C1 - 1] == orderid) {
            let url = "http://seller.dhgate.com/sellerordmng/sellerOrderDetail/getProdInfo.do?orderId=" + this.obj.C32Arr[this.obj.C1 - 1]//详情中的商品
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取【订单(" + this.obj.CArr[this.obj.C1 - 1] + ")详情中的商品】...");
            gg.getFetch(url,"json", this.a13, this)
        }
        else {
            alert("订单号不对。本来是(" + this.obj.CArr[this.obj.C1 - 1] + ")结果是（" + orderid + "）...");
            Tool.at(str)
        }
    },
    a13: function (str) {
        this.obj.sql2 = this.b05(str);
        this.obj.productList = this.b06(str);
        if (this.obj.productList) {
            let url = "http://seller.dhgate.com/sellerordmng/orderDelivery/getOrderDeliveryDTOS.do?orderId=" + this.obj.C32Arr[this.obj.C1 - 1]//详情中的收货地址
            $("#state").html("正在获取【订单(" + this.obj.CArr[this.obj.C1 - 1] + ")详情中的收货地址】...");
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a14, this)
        }
    },
    a14: function (str) {
        this.obj.sql3 = this.b07(str);//收货地址
        if (this.obj.orderStatusArr[this.obj.C1 - 1] == "等待买家付款")//表示没有发货
        {
            this.a16("");
        }
        else {
            let url = "http://seller.dhgate.com/logistics/orderDetail/getOrderDeliveryDTOS.do?orderId=" + this.obj.C32Arr[this.obj.C1 - 1]//发货记录信息
            $("#state").html("正在获取【订单(" + this.obj.CArr[this.obj.C1 - 1] + ")发货记录信息】...");
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a15, this);
        }
    },
    a15: function (str) {
        if (str.indexOf('<p>暂无发货记录信息</p>') == -1)//如果有发货
        {
            this.a16(this.b12(str));
        }
        else//没发货
        { this.a16(""); }
    },
    a16: function (code) {
        let o1 = this.obj.sql1;
        for (let k in o1) { this.obj.sql3[k] = o1[k]; }
        let o2 = this.obj.sql2;
        for (let k in o2) { this.obj.sql3[k] = o2[k]; }
        this.a17(code)//更新 或 添加
    },
    a17: function (code) {
        let arr2 = this.b08(this.obj.sql3), itemstr = this.b09(this.obj.productList);
        if (arr2[0]) { $("#state").html("有信息获取失败，不能更新...<hr>" + arr2[1]); }
        else {
            let html = "\
			[\
				<if Fun(Db(sqlite.dhgate,select count(1) from @.order where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "',count))==0>\
					<r: db=\"sqlite.dhgate\">"+ this.b10(this.obj.sql3) + "</r:>\
				<else/>\
					<r: db=\"sqlite.dhgate\">"+ arr2[1] + "</r:>" + itemstr + "\
				</if>\
				<if Fun(Db(sqlite.dhgate,select count(1) from @.orderitem where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "',count))==0>\
					<r: db=\"sqlite.dhgate\">"+ this.b11(this.obj.productList) + "</r:>\
				</if>\
			]"+ code
            Tool.ajax.a01(html, 1, this.a09, this, this.obj.productList);
        }
    },
    b01: function () {
        //["https://seller.dhgate.com/sellerordmng/orderList/list.do?params.orderStatus=100&params.queryType=0&params.linkType=111&params.operableType=search&params.orderDateFilter=%2B0%3B01&params.orderStatusFilter=&params.orderSort=01%3B0&params.notracking=1&params.isSymbol=&params.isFlag=&params.page=","一年以上订单","【更新】,【采集】"],
        //			["https://seller.dhgate.com/sellerordmng/orderList/list.do?params.orderStatus=100&params.queryType=0&params.linkType=111&params.operableType=search&params.orderDateFilter=-365%3B01&params.orderStatusFilter=&params.orderSort=01%3B0&params.notracking=1&params.isSymbol=&params.isFlag=&params.page=","一年内订单","【更新】","【采集】"],
        let arr = [
            ["https://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=102&params.page=", "待发货订单", "【更新】", "【采集】"],
            ["http://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=101&params.page=", "未付款订单", "【跳过】", "【采集】"],
            ["http://seller.dhgate.com/sellerordmng/orderList/disputeOrderList.do?params.linkType=200&dhpath=10002,06,0602&params.page=", "纠纷订单", "【更新】", "【提示错误】"],
            ["http://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=111&params.orderDateFilter=-7%3B01&params.orderStatusFilter=&params.orderSort=01%3B0&params.notracking=1&params.isSymbol=&params.isFlag=&params.page=", "7天内订单", "【跳过】", "【采集】"],//有【订单取消】的订单
            ["http://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=106&params.page=", "已发货订单", "【智能更新】", "【提示错误】"],
            ["http://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=108&params.page=", "90天内交易完成", "【智能更新】", "【提示错误】"],
            ["http://seller.dhgate.com/sellerordmng/orderList/list.do?params.linkType=110&params.page=", "90天内交易取消", "【智能更新】", "【提示错误】"]
        ]//说明：["带分页的url","url标题","如果本地有","如果本地不存在"]  	
        //【智能更新】   表示：当本地【订单状态】与采集到的【订单状态】不同就【更新】，不相同就跳出该URL的翻页。注：需确保DH更新时间是倒序。
        //【智能更新】   注：多次发货就不起做用了，还没想好解决方法。
        return arr;
    },
    b02: function () {
        let arr = this.obj.Aarr, newArr = [];
        for (let i = 0; i < this.obj.A2; i++) {
            if (i == this.obj.A1 - 1) { newArr.push('<b><font color="red" title="' + arr[i][2] + '">' + arr[i][1] + '</font></b>') }
            else { newArr.push('<span title="如果有：' + arr[i][2] + '；&nbsp;&nbsp;如果无：' + arr[i][3] + '">' + arr[i][1] + '</span>') }
        }
        return newArr.join(' <i class="fa fa-long-arrow-right"></i> ');
    },
    b03: function (str) {
        let sql = {}
        ////////////////////////////////////////////////
        let deliveryDeadline = Tool.StrSlice(str, '发货截止日期：\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t   </div>\r\n\t\t\t\t\t\t   \t\t\t\t\t\t\t <div class=\"order-imfor-dd\">', '</div>');
        if (!deliveryDeadline) { deliveryDeadline = Tool.StrSlice(str, '发货截止日期：\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t   </div>\n\t\t\t\t\t\t   \t\t\t\t\t\t\t <div class=\"order-imfor-dd\">', '</div>'); }
        if (deliveryDeadline) { sql.deliveryDeadline = Tool.gettime(deliveryDeadline); }
        let status = Tool.StrSlice(str, '<!--订单状态-->订单状态：</div>\n                   <div class="order-imfor-dd">', '</div>')
        if (!status) { status = Tool.StrSlice(str, '订单状态：</div>\r\n                   <div class="order-imfor-dd">', '</div>') }
        if (status) {
            sql.status = this.b04(Tool.Trim(status));
            let BeginDate = Tool.StrSlice(str, '下单日期：\n																\n						   </div>\n						   							 <div class="order-imfor-dd">', '</div>');
            if (!BeginDate) { BeginDate = Tool.StrSlice(str, '下单日期：\r\n																\r\n						   </div>\r\n						   							 <div class="order-imfor-dd">', '</div>') }
            if (BeginDate) { sql.BeginDate = Tool.gettime(BeginDate); }
            /////////////////////////////////////////////////////////
            let paytime = Tool.StrSlice(str, '付款日期：\n																\n						   </div>\n						   							 <div class="order-imfor-dd">', '</div>');
            if (!paytime) { paytime = Tool.StrSlice(str, '付款日期：\r\n																\r\n						   </div>\r\n						   							 <div class="order-imfor-dd">', '</div>') }
            if (paytime) { sql.paytime = Tool.gettime(paytime); }

            ////////////////////////////////////////////////////////
            let DeliveryDate = Tool.StrSlice(str, '发货日期：\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t   </div>\r\n\t\t\t\t\t\t   \t\t\t\t\t\t\t <div class=\"order-imfor-dd\">', '</div>');
            if (DeliveryDate) { sql.DeliveryDate = Tool.gettime(DeliveryDate); } else { sql.DeliveryDate = 0; }
            ///////////////////////////////////////////////////////////
            sql.username = Tool.strRepArr(str, '买家名称：</div>\n                    <div class="order-imfor-dd">\n						(.+)', 1)[0];
            if (!sql.username) { sql.username = Tool.strRepArr(str, '买家名称：</div>\r\n                    <div class="order-imfor-dd">\r\n						(.+)', 1)[0]; }
            sql.username = Tool.utf16toEntities(Tool.Trim(sql.username));
            //////////////////////////////////////////////////////
            let buyerConfirmDate = Tool.StrSlice(str, '确认收货日期:</div>\n    						   <div class="log-date">', '</div></li>');
            if (!buyerConfirmDate) { buyerConfirmDate = Tool.StrSlice(str, '确认收货日期:</div>\r\n    						   <div class="log-date">', '</div></li>'); }
            if (buyerConfirmDate) {
                buyerConfirmDate = Tool.Trim(buyerConfirmDate.replace(new RegExp("<.*?>", "ig"), ""))
                buyerConfirmDate = buyerConfirmDate.replace("<", "")
                sql.buyerConfirmDate = Tool.gettime(buyerConfirmDate);
            }
            //////////////////////////////////////////////////////////////////////////////////////////
            let inAccountDate = Tool.StrSlice(str, '入账日期:</div>\n    						   <div class="log-date">', '</div></li>');
            if (!inAccountDate) { inAccountDate = Tool.StrSlice(str, '入账日期:</div>\r\n    						   <div class="log-date">', '</div></li>'); }
            if (inAccountDate) {
                inAccountDate = Tool.Trim(inAccountDate.replace(new RegExp("<.*?>", "ig"), ""))
                inAccountDate = inAccountDate.replace("<", "")
                sql.inAccountDate = Tool.gettime(inAccountDate);
            }
            //////////////////////////////////////////////////////////////////////////////////////////
            let cancelDate = Tool.StrSlice(str, '交易取消日期:</div>\n    						   <div class="log-date">', '</div>');
            if (cancelDate) { sql.cancelDate = Tool.gettime(cancelDate); } else { sql.cancelDate = 0; }
            ///////////////////////////////////////////////////
            let ArrivalTime = Tool.strRepArr(str, '<!--运达时间-->运达时间：</div>\r\n\t\t\t\t\t   <div class=\"order-imfor-dd\">([0-9]+)天</div>', 1)[0];//运达时间
            if (!ArrivalTime) { ArrivalTime = Tool.strRepArr(str, '<!--运达时间-->运达时间：</div>\n\t\t\t\t\t   <div class=\"order-imfor-dd\">([0-9]+)天</div>', 1)[0]; }
            if (ArrivalTime) { sql.ArrivalTime = Tool.Trim(ArrivalTime); }
            /////////////////////////////////////////////////
            let warnReason = Tool.StrSlice(str, '<div class="flowstep-tips tips-info">', '</div>');
            if (warnReason) { sql.warnReason = Tool.Trim(warnReason.replace(/<.*?>/ig, "")); }
            ////////////////////////////////////////////////
            let Remark = Tool.StrSlice(str, '买家留言：', '</div>');
            if (Remark) { sql.Remark = Tool.Trim(Remark); }
            let MoneyTotal = Tool.StrSlice(str, '<strong class="c-org">US $', '</strong>')//订单实收
            sql.MoneyTotal = MoneyTotal;
            let UserLevel = Tool.StrSlice(str, 'vip-level-img-icon ', '"></i>')//买家的用户名等级
            sql.UserLevel = UserLevel;
            let orderFrom = Tool.StrSlice(str, '订单来源：</div>', '</div>')//订单来源：英语站
            orderFrom = Tool.Trim(orderFrom.replace(new RegExp("<.*?>", "ig"), ""))
            sql.orderFrom = orderFrom
            if (str.indexOf('即平均客单价大于150美金的海外零售商或公司采购型买家') != -1) { sql.BusinessBuyer = 1 }
            sql.orderid32 = this.obj.C32Arr[this.obj.C1 - 1];
            sql.fromuser = this.This.obj.username;
            sql.fromuserid = this.This.obj.fromid;
            return sql;
        }
        else {
            Tool.at("获取【订单状态】失败，可能DH已改版");
            //Tool.save(str)
            return false;
        }
    },
    b04: function (id) {
        let name = ""
        switch (id) {
            case "订单取消": name = "111000"; break;
            case "等待买家付款": name = "101003"; break;
            case "买家已付款，等待平台确认": name = "102001"; break;
            case "等待发货": name = "103001"; break;
            case "买家退款中，等待协商结果": name = "105001"; break;
            case "退款协议已达成": name = "105002"; break;
            case "部分退款后，等待发货": name = "105003"; break;
            case "买家取消退款申请": name = "105004"; break;
            case "已部分发货": name = "103002"; break;
            case "等待买家确认收货": name = "101009"; break;
            case "买家申请退款，等待协商结果":
            case "退款/退货协商中，等待协议达成": name = "106001"; break;
            case "买家投诉到平台": name = "106002"; break;
            case "协议已达成，执行中": name = "106003"; break;
            case "已确认收货": name = "102006"; break;
            case "超过预定期限，自动确认收货": name = "102007"; break;
            case "交易成功": name = "102111"; break;
            case "交易关闭": name = "111111"; break;
            default: name = "未知：" + id;
        }
        return name;
    },
    b05: function (str) {
        let sql = {};
        sql.itemTotalPrice = Tool.StrSlice(str, '产品总计：</td>\n                    <td><em class="price">US $', '</em>');
        if (sql.itemTotalPrice) {
            sql.ChargeDeliver = Tool.StrSlice(str, '运费：</td>\n                    <td><em class="price">US $', '</em>');
            sql.commissionAmount = Tool.StrSlice(str, '佣金金额：</td>\n                    <td><em class="price">-US $', '</em>');
            sql.UseCouponMoney = Tool.StrSlice(str, 'DH优惠券：</td>\n                    <td><em class="couponPrice price">-US $', '</em>');
            if (!sql.UseCouponMoney) { sql.UseCouponMoney = 0; }
            sql.reducePrice = Tool.StrSlice(str, '卖家折扣：</td>\n                    <td><em class="price">-US $', '</em>');//订单降价金额
            if (!sql.reducePrice) { sql.reducePrice = 0; }
            sql.MoneyGoods = Tool.StrSlice(str, '实付金额：</td>\n                    <td><em class="price">US $', '</em>');
            sql.gatewayFee = Tool.StrSlice(str, '支付手续费：</td>\n                    <td><em class="price">-US $', '</em>');
            sql.MoneyTotal = Tool.StrSlice(str, '实收金额：</td>\n                <td><em class="price c-org">US $', '</em>');
        }
        else {
            sql.itemTotalPrice = Tool.StrSlice(str, '产品总计：</td>\r\n                <td><em class=\"price\">US $', '</em>');
            sql.ChargeDeliver = Tool.StrSlice(str, '<!--运费-->运费：</td>\r\n                <td><em class=\"price\">US $', '</em>');
            sql.commissionAmount = Tool.StrSlice(str, '<!--佣金金额-->佣金金额：</td>\r\n                    <td><em class=\"price\">-US $', '</em>');
            sql.UseCouponMoney = Tool.StrSlice(str, 'DH优惠券：</td>\r\n                    <td><em class="couponPrice price">-US $', '</em>');
            if (!sql.UseCouponMoney) { sql.UseCouponMoney = 0; }
            sql.reducePrice = Tool.StrSlice(str, '<!--卖家折扣-->卖家折扣：</td>\r\n                        <td><em class=\"price\">-US $', '</em>');//订单降价金额
            if (!sql.reducePrice) { sql.reducePrice = 0; }
            sql.MoneyGoods = Tool.StrSlice(str, '<!--实付金额-->实付金额：</td>\r\n                    <td><em class=\"price\">US $', '</em>');
            sql.gatewayFee = Tool.StrSlice(str, '<!--支付手续费-->支付手续费：</td>\r\n                    <td><em class=\"price\">-US $', '</em>');
            sql.MoneyTotal = Tool.StrSlice(str, '<!--实收金额-->实收金额：</td>\r\n                    <td><em class=\"price c-org\">US\r\n                        $', '</em>');
        }
        return sql;
    },
    b06: function (str) {
        let picArr = Tool.StrSplits(str, '<img src="', '"');
        //for(let i=0;i<picArr.length;i++){picArr[i]="http://image.dhgate.com/100x100/f2/albu/"+picArr[i];}
        let len, nameArr = Tool.StrSplits(str, 'target="_self" class="products-title">', '</a>');
        let AttributeCartArr = [], AttributeCart = Tool.StrSplits(str, '产品规格：', '</li>');
        for (let i = 0; i < AttributeCart.length; i++) {
            AttributeCartArr[i] = Tool.StrSplits(AttributeCart[i], '<span class="c-org">', '</span>').join(" ")
        }
        let fromidArr = Tool.StrSplits(str, '<!--产品编号-->产品编号：<span class="c-org">', '</span>');
        if (fromidArr.length == 0) {
            fromidArr = Tool.StrSplits(str, '<!--产品编号-->产品编号：<span\r\n                                            class=\"c-org\">', '</span>');
        }
        let proidArr = Tool.StrSplits(str, '<!--商品编码-->商品编码：<span class="c-org">', '</span>');//商品编码
        if (proidArr.length == 0) {
            proidArr = Tool.StrSplits(str, '商品编码：<span\r\n                                            class=\"c-org\">', '</span>');
        }
        /////////////////////////////////////////////
        let UnitArr = [], RealPriceArr = [], Tarr = Tool.StrSplits(str, '<td width="20%">', '</td>');
        for (let i = 0; i < Tarr.length; i++) {
            RealPriceArr[i] = Tool.Trim(Tarr[i].split("/")[0].split("$")[1].replace(",", ""));
            UnitArr[i] = Tool.Trim(Tarr[i].split("/")[1]);
        }
        ////////////////////////////////////////////////////////
        let AmountArr = Tool.StrSplits(str, '<td width="15%">', '</td>');
        let RemarkArr = Tool.StrSplits(str, '<div class="j-order-remark">', '</div>');
        for (let i = 0; i < AmountArr.length; i++) { AmountArr[i] = Tool.Trim(AmountArr[i]); AmountArr[i] = AmountArr[i].split(" ")[0]; }
        let item = []
        if (picArr.length == nameArr.length &&
            picArr.length == fromidArr.length &&
            picArr.length == UnitArr.length &&
            picArr.length == RealPriceArr.length &&
            picArr.length == AmountArr.length)//产品规格不参与，因为可以没有规格。   picArr.length==proidArr.length &&
        {
            for (let i = 0; i < picArr.length; i++) {
                if (AttributeCartArr[i]) {
                    if (AttributeCartArr[i].length > 255) { AttributeCartArr[i] = AttributeCartArr[i].substr(0, 252) + "..." }
                }
                item[i] = {
                    orderid: this.obj.CArr[this.obj.C1 - 1],
                    pic: picArr[i],
                    name: nameArr[i].replace(/'/g, "''"),
                    AttributeCart: AttributeCartArr[i],
                    fromid: fromidArr[i],
                    proid: proidArr[i],
                    Unit: UnitArr[i],
                    RealPrice: RealPriceArr[i],
                    Amount: AmountArr[i],
                    Remark: (RemarkArr[i] ? RemarkArr[i].replace(/'/g, "''") : "")
                }
            }
            return item;
        }
        else {
            //Tool.at(str)
            $("#state").html(Tool.pre(["出错001", picArr, nameArr, AttributeCartArr, fromidArr, proidArr, UnitArr, RealPriceArr, AmountArr]));
        }

    },
    b07: function (str)//收货地址
    {
        let sql = {}
        sql.DeliverType = Tool.Trim(Tool.StrSlice(str, '买家选择的物流方式：<strong class="c-org">', '</strong>'));
        let contactPerson = Tool.StrSlice(str, 'Contact Name: </span>\n                   \n                    <span rel=\"data\">', '</span>');
        if (!contactPerson) { contactPerson = Tool.StrSlice(str, 'Contact Name: </span>\r\n                    <span rel="data">', '</span>'); }
        if (contactPerson) {
            contactPerson = Tool.Trim(contactPerson);
            let len = contactPerson.indexOf("&nbsp;")
            if (len == -1) {
                sql.firstName = contactPerson.replace(/'/g, "''")
                sql.lastName = "";
            }
            else {
                sql.firstName = contactPerson.substr(0, len).replace(/'/g, "''")
                sql.lastName = contactPerson.substr(len + 6, contactPerson.length).replace(/'/g, "''")
            }
            ////////////////////////////////////////////////
            sql.address = Tool.StrSlice(str, 'Address Line 1: </span>\n					<span rel="data">', '</span>');
            if (!sql.address) { sql.address = Tool.StrSlice(str, 'Address Line 1: </span>\r\n					<span rel="data">', '</span>'); }
            if (sql.address) { sql.address = Tool.Trim(sql.address); }
            if (sql.address.length > 255) { sql.address = sql.address.substr(0, 252) + "..."; }
            ///////////////////////////////////////////////
            sql.address2 = Tool.StrSlice(str, 'Address Line 2: </span>\n                    <span rel="data">', '</span>');
            if (!sql.address2) { sql.address2 = Tool.StrSlice(str, 'Address Line 2: </span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.address2) {
                sql.address2 = Tool.Trim(sql.address2);
                if (sql.address2.length > 255) { sql.address2 = sql.address2.substr(0, 252) + "..."; }
            }
            else { sql.address2 = ""; }
            ///////////////////////////////////////////////////////////
            sql.city = Tool.StrSlice(str, 'City:</span>\n                    <span rel="data">', '</span>');
            if (!sql.city) { sql.city = Tool.StrSlice(str, 'City:</span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.city) { sql.city = Tool.Trim(sql.city).replace(/'/g, "''") }
            ////////////////////////////////////////////////////////////////////////////////////////
            sql.province = Tool.StrSlice(str, 'State: </span>\n                    <span rel="data">', '</span>');
            if (!sql.province) { sql.province = Tool.StrSlice(str, 'State: </span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.province) { sql.province = Tool.Trim(sql.province); }
            ///////////////////////////////////////////////
            sql.country = Tool.StrSlice(str, 'Country/Region:</span>\n                    <span rel="data">', '</span>');
            if (!sql.country) { sql.country = Tool.StrSlice(str, 'Country/Region:</span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.country) { sql.country = Tool.Trim(sql.country); }
            ////////////////////////////////
            sql.zip = Tool.StrSlice(str, 'Postal Code: </span>\n                    <span rel="data">', '</span>');
            if (!sql.zip) { sql.zip = Tool.StrSlice(str, 'Postal Code: </span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.zip) { sql.zip = Tool.Trim(sql.zip); }
            /////////////////////////////////////////////////////////////////////////////////////////////
            sql.phone = Tool.StrSlice(str, 'Phone Number: </span>\n                    <span rel="data">', '</span>');
            if (!sql.phone) { sql.phone = Tool.StrSlice(str, 'Phone Number: </span>\r\n                    <span rel="data">', '</span>'); }
            if (sql.phone) { sql.phone = Tool.Trim(sql.phone); }
            ///////////////////////////////////////////////////////////////////////////////////////////
            let abn = Tool.StrSlice(str, 'BN/GST:</span>\n                    <span rel="data">', '</span>');
            if (!abn) { abn = Tool.StrSlice(str, 'BN/GST:</span>\r\n                    <span rel="data">', '</span>'); }
            if (abn) { sql.abn = Tool.Trim(abn); }
            let eClearanceCode = Tool.StrSlice(str, 'e-Clearance Code:</span>\n    					<span rel="data">', '</span>');
            if (!eClearanceCode) { eClearanceCode = Tool.StrSlice(str, 'e-Clearance Code:</span>\r\n    					<span rel="data">', '</span>'); }
            if (eClearanceCode) { sql.eClearanceCode = Tool.Trim(eClearanceCode); }
            return sql;

        }
        else {
            Tool.at("获取【收货地址】失败。")
            return false;
        }
    },
    b08: function (sql)//更新order
    {
        let isbool = false, str = ""
        for (let k in sql) {
            if (k == false) {
                isbool = true;
            }
            else if (k == "ArrivalTime" || k == "userid" || k == "fromuserid" || k == "itemTotalPrice" || k == "ChargeDeliver" || k == "commissionAmount" || k == "MoneyGoods" || k == "gatewayFee" || k == "MoneyTotal" || k == "BusinessBuyer" || k == "paytime" || k == "DeliveryDate" || k == "buyerConfirmDate") { str += ",@." + k + "=" + sql[k]; }
            else {
                if (typeof (sql[k]) == "string" && sql[k] != "") { sql[k] = sql[k].replace(/\'/g, "''").replace(/\\/g, "\\\\"); }
                str += ",@." + k + "='" + sql[k] + "'";
            }
        }
        str = "update @.order set @.updateDate=" + Tool.gettime("") + str + " where @.orderid='" + this.obj.CArr[this.obj.C1 - 1] + "'"
        return [isbool, str]
    },
    b09: function (item)//添加或更新【orderitem】
    {
        let str = "", str1 = "", arr = [], arr1 = [], arr2 = [], proid = 0, val = ""
        for (let i = 0; i < item.length; i++) {
            arr = []; proid = 0, val = ""
            for (let s in item[i]) {
                val = item[i][s];
                if (val) {
                    val = "'" + val.replace(/\'/g, "''").replace(/\\/g, "\\\\") + "'";
                } else {
                    val = "'" + val + "'";
                }
                arr.push("@." + s + "=" + val);
                if (s == "proid") { proid = item[i][s]; }
            }
            arr1 = []; arr2 = [];
            for (let k in item[i]) {
                arr1.push("@." + k);
                val = item[i][k];
                if (val) {
                    val = val.replace(/\'/g, "''").replace(/\\/g, "\\\\");
                }
                arr2.push("'" + val + "'");
            }
            str1 = 'insert into @.orderitem(' + arr1.join(",") + ')values(' + arr2.join(",") + ')'
            ///////////////////////////////////////////////////////////
            //主要是为了解决：当订单商品重复的问题。
            //比如：一个订单只可能有俩个不同的商品编码（R0004-1,R0004-2）。不可能有俩个相同的商品编码（R0004-1,R0004-1）
            str += "\
			<if Fun(Db(sqlite.dhgate,select count(1) from @.orderitem where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "' and @.proid='" + proid + "',count))!=1>\
				<r: db=\"sqlite.dhgate\">delete from @.orderitem where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "' and @.proid='" + proid + "'</r:>\
			</if>"
            str += "\
				<if 1==1>\
					<if 1==1>\
						<if Fun(Db(sqlite.dhgate,select count(1) from @.orderitem where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "' and @.proid='" + proid + "',count))==0>\
							<r: db=\"sqlite.dhgate\">"+ str1 + "</r:>\
						<else/>\
							<r: db=\"sqlite.dhgate\">update @.orderitem set "+ arr.join(",") + " where @.orderid='" + this.obj.CArr[this.obj.C1 - 1] + "' and @.proid='" + proid + "'</r:>\
						</if>\
					</if>\
				</if>"
        }
        return str
    },
    b10: function (sql) {
        if (this.obj.Aarr[this.obj.A1 - 1][1] == "未付款订单") { sql.PurchaseStatus = 6; }//【未付款订单】改成【无需采购】
        let arr1 = [], arr2 = [];
        sql.orderid = this.obj.CArr[this.obj.C1 - 1]
        for (let s in sql) {
            arr1.push("@." + s);
            if (typeof (sql[s]) == "string") {
                if (sql[s] != "") { sql[s] = sql[s].replace(/\'/g, "''").replace(/\\/g, "\\\\"); }
                arr2.push("'" + sql[s] + "'");
            }
            else { arr2.push(sql[s]); }
        }//注：加上 N 可以支持多国文字。如：قاتاىق
        return 'insert into @.order(' + arr1.join(",") + ',@.addtime)values(' + arr2.join(",") + ',' + Tool.gettime("") + ')';
    },
    b11: function (item) {
        let arr1 = [], arr2 = [], arr3 = [], str = "";
        for (let i = 0; i < item.length; i++) {
            arr1 = []; arr2 = [];
            for (let s in item[i]) { arr1.push("@." + s); arr2.push("'" + item[i][s] + "'"); }
            arr3.push('insert into @.orderitem(' + arr1.join(",") + ')values(' + arr2.join(",") + ')');
        }
        return arr3.join('<1/>')
    },
    b12: function (t) {
        let arr = Tool.StrSplits(t, "																<tr>", "								</tr>"), Express = [], ExpressNumber = [], DeliverDate = "", arr2 = []
        for (let i = 0; i < arr.length; i++)//注：多个发货日期，只要最后一个
        {
            arr2 = arr[i].split("</td>")
            ExpressNumber[i] = Tool.Trim(arr2[0].replace(new RegExp("<.*?>", "ig"), ""))
            Express[i] = Tool.Trim(arr2[2].replace(new RegExp("<.*?>", "ig"), ""))
            DeliverDate = Tool.Trim(arr2[4].replace(new RegExp("<.*?>", "ig"), ""))
        }
        //////////////////////////////////////////////////
        let str = "\
		<if Fun(Db(sqlite.dhgate,select count(1) from @.logdeliver where @.orderid='"+ this.obj.CArr[this.obj.C1 - 1] + "',count))==0>\
			<r: db=\"sqlite.dhgate\">insert into @.logdeliver(@.Express,@.ExpressNumber,@.DeliverDate,@.shopname,@.shopid,@.uptime,@.orderid)values('/"+ Express.join("/") + "/','/" + ExpressNumber.join("/") + "/'," + Tool.gettime(DeliverDate) + ",'" + this.This.obj.username + "'," + this.This.obj.fromid + "," + Tool.gettime("") + ",'" + this.obj.CArr[this.obj.C1 - 1] + "')</r:>\
		<else/>\
			<r: db=\"sqlite.dhgate\">update @.logdeliver set @.Express='/"+ Express.join("/") + "/',@.ExpressNumber='/" + ExpressNumber.join("/") + "/',@.DeliverDate=" + Tool.gettime(DeliverDate) + ",@.uptime=" + Tool.gettime("") + " where @.orderid='" + this.obj.CArr[this.obj.C1 - 1] + "'</r:>\
		</if>"
        return str
    }
}