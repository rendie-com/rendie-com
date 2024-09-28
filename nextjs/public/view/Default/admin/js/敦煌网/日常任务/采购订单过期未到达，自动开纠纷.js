'use strict';
var fun =
{
    obj: { A1: 1 },
    a01: function () {
        if (obj.arr[5]) {
            let str = F1.batchRun(obj.arr[5], 12)
            if (str == "") { alert("全部完"); }
            else { this.a02(str); }
        }
        else { this.a02(''); }
    },
    a02: function (t) {
        let html = '\
    <header class="panel-heading"><a href="javascript:" onclick="Tool.main();" class="arrow_back"></a>正在【采购订单过期未到达，自动开纠纷】...</header>'+ t + '\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
    <tbody>\
      <tr>\
        <td class="right w120">进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
      <tr><td class="right">采购账号：</td><td id="PurchaseUserName" colspan="2"></td></tr>\
      <tr><td class="right">采购单号：</td><td id="OrderId" colspan="2"></td></tr>\
      <tr><td class="right">采购金额：</td><td id="PurchaseCost" colspan="2"></td></tr>\
      <tr><td class="right">采购备注：</td><td id="PurchaseRemark" colspan="2"></td></tr>\
      <tr><td class="right">采购单号：</td><td id="PurchaseOrderId" colspan="2"></td></tr>\
      <tr><td class="right">订单到达时间：</td><td id="PurchaseWaitingDelivery" colspan="2"></td></tr>\
      <tr><td class="right">采购订单链接：</td><td id="url" colspan="2"></td></tr>\
      <tr><td class="right">物流运单号：</td><td id="logistics_num" colspan="2"></td></tr>\
      <tr><td class="right">物流状态：</td><td id="DeliveryStatus" colspan="2"></td></tr>\
      <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备订单...</td></tr>\
    </tbody>\
    </table>\
    </div>';
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        gg.isRD(this.a03A, this);
    },
    a03A: function () {
        //isapplymoney							是否请款
        //PurchaseCost							采购成本
        //purchasewaitingdelivery		采购等待发货天数
        //:purchasewaitingdelivery<0 and 
        let day1 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 1) / 1000)
        let day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000)
        let html = '\
    {\
    "A1":'+ this.obj.A1 + ',"A2":<@count/>,"num":0\
    <r:order page=2 db="sqlite.dhgate" size=1 where=" where '+ day20 + '<@.purchasewaitingdelivery and @.purchasewaitingdelivery<' + day1 + ' and 10<@.PurchaseCost order by @.PurchaseUserName desc,@.id desc">,\
      "PurchaseOrderId":"<:PurchaseOrderId/>",\
      "PurchaseCost":<:PurchaseCost f=2/>,\
      "PurchaseUserName":"<:PurchaseUserName/>",\
      "OrderId":"<:OrderId/>",\
      "PurchaseRemark":"<:PurchaseRemark tag=js/>",\
      "PurchaseWaitingDelivery":"<:PurchaseWaitingDelivery/>"\
    </r:order>\
    }'
        Tool.ajax.a01(html, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        this.obj = oo;
        if (this.obj.A1 <= this.obj.A2) {
            this.obj.PurchaseOrderId = this.obj.PurchaseOrderId.replace(/\s+/g, "");
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（条）');
            $("#PurchaseUserName").html(this.obj.PurchaseUserName);
            $("#PurchaseOrderId").html(this.obj.PurchaseOrderId);
            $("#PurchaseCost").html("$" + this.obj.PurchaseCost);
            $("#PurchaseRemark").html(this.obj.PurchaseRemark);
            $("#OrderId").html(this.obj.OrderId);
            $("#PurchaseWaitingDelivery").html(this.b01(this.obj.PurchaseWaitingDelivery));
            if (this.obj.PurchaseOrderId.indexOf("/") != -1) { this.obj.PurchaseOrderId = this.obj.PurchaseOrderId.split("/")[0]; }//如果有多个，只同步第一个
            this.a05()
        }
        else { alert("完"); }
    },
    a05: function () {
        this.obj.num = 0;
        $("#state").html("正在获取【SMT订单内容】...")
        let url = "https://www.aliexpress.com/p/order/detail.html?spm=a2g0o.order_list.0.0.21ef1802FTBv6I&orderId=" + this.obj.PurchaseOrderId
        let str = '<a href="' + url + '" target="_blank">' + url + '</a>'
        $("#url").html(str);
        gg.tabs_remove_create_indexOf(2, url, "Order ID:&nbsp;</span>",true, this.a06, this)
    },
    a06: function (str) {
        if (str.indexOf('<title>Buy Products Online from China Wholesalers at Aliexpress.com</title>') != -1) {
            $("#state").html("正在【登陆】...");
            F1.SMTlogin(this.a05, this, this.obj.PurchaseUserName);
        }
        else if (str.indexOf(this.obj.PurchaseOrderId) != -1) {
            $("#state").html("正在获取【SMT订单内容】正确")
            this.a07(str);
        }
        else if (str.indexOf('OOPS!</h2>') != -1)//要换账号了
        {
            $("#state").html("正在【要换账号】...");
            alert("wwwwwwww444wwwwwwwwwww")
            //this.a13();
        }
        else { $("#state").text("出错001：" + str); }
    },
    a07: function (str) {
        if (str.indexOf('Dispute in Progress</a>') != -1 ||
            str.indexOf('Dispute Finished</a>') != -1 ||
            str.indexOf('<dd class="order-status">\n                                                                                                            Closed') != -1)//是否为纠纷订单
        {
            this.a09([]);
        }
        else {
            let Status = Tool.Trim(Tool.StrSlice(str, '<div class="order-block-title">', "</div>"));
            let PurchaseWaitingDelivery = Tool.StrSlice(str, 'If your order does not arrive on', "you can apply");
            if (PurchaseWaitingDelivery != false) { PurchaseWaitingDelivery = Tool.StrSlice(PurchaseWaitingDelivery, ">", "<").replace(/(^\s*)|(\s*$)/g, ""); }
            else { PurchaseWaitingDelivery = ""; }
            this.obj.oo = { PurchaseOrderStatus: Status, PurchaseWaitingDelivery: PurchaseWaitingDelivery }
            ////////////////////////////////////////////////////////////////
            if (str.indexOf('<span>Dispute in progress</span') == -1)//不是纠纷的时后
            {
                let url = "https://track.aliexpress.com/logisticsdetail.htm?tradeId=" + this.obj.PurchaseOrderId
                $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>')
                gg.getFetch(url,"json", this.a09, this);
            }
            else { this.a10([]); }
        }
    },
    a09: function (t) {
        let status = Tool.StrSlice(t, '"status":"', '"')
        if (status == "DELIVERED")//包裹已妥投
        {
            let str3 = '[<r: db="sqlite.dhgate">' + this.b02(this.obj.oo, "") + '<1/>update @.logdeliver set @.querystate=5 where @.orderid=\'' + this.obj.OrderId + '\'</r:>]'
            Tool.ajax.a01(str3, 1, this.a10, this)
        }
        else {
            alert("应该可以开纠纷。。" + status)
            $("#state").html('看17妥投没有...  <button type="button" class="btn btn-sm btn-secondary" onclick="fun.a10([])">下一条</button>' + this.b03());
            //this.a10([]);
        }
        //$("#state").text(t)
    },
    a10: function (t) {
        if (t[0] == null) {
            $("#PurchaseUserName,#OrderId,#PurchaseOrderId,#PurchaseWaitingDelivery,#url,#logistics_num,#DeliveryStatus,#PurchaseRemark,#PurchaseCost").html("");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + ' (完)');
            this.obj.A1++;
            if (this.obj.A1 <= this.obj.A2) { this.a03A(); }
            else { $("#state").html("全部完"); }
        } else { $("#state").html("出错01：" + Tool.pre(t)); }
    },
    b01: function (t1) {
        let str = ""
        if (t1 != "") {
            str = Tool.js_date_time2(t1) + "（" + Tool.datedifference(t1 * 1000, false) + "天）"
        }
        return str;
    },
    b02: function (oo, str2)//采购到期时间
    {
        let str1 = ""
        if (oo.PurchaseWaitingDelivery != "") { str1 = ",:PurchaseWaitingDelivery=" + Tool.gettime(oo.PurchaseWaitingDelivery); }
        let str = 'update @.order set @.PurchaseOrderStatus=\'' + oo.PurchaseOrderStatus + '\'' + str1 + str2 + ' where @.orderid=\'' + this.obj.OrderId + '\''
        return str;
    },
    b03: function () {
        return '<button type="button" class="btn btn-sm btn-secondary" onclick="fun.c01()">设为【问题订单】再，下一条</button>'
    },
    c01: function () {
        let str1 = ""
        if (this.obj.PurchaseRemark.indexOf('[纠纷中') != -1)//纠纷中,则跳过,去开纠纷。
        {
            str1 = ',:PurchaseRemark=\'' + this.obj.PurchaseRemark + '[纠纷中' + Tool.userDate13(new Date(), "/") + ']\'';
        }
        let str2 = '""<r: db="sqlite.dhgate">update @.order set @.purchasestatus=5' + str1 + ' where @.orderid=\'' + this.obj.OrderId + '\'</r:>'
        Tool.ajax.a01(str2, 1, this.a10, this)
    }
}
fun.a01();
/*			
      let logistics_num=Tool.Trim(Tool.StrSlice(str,'<div class="logistics-num">','</div>')).replace(/\s+/g,"");
        	
      $("#logistics_num").html(logistics_num+' <a href="http://global.cainiao.com/detail.htm?mailNoList='+logistics_num+'" target="_blank" title="用【菜鸟】查询物流"><img src="http://img.alicdn.com/tps/TB1UdbzKFXXXXXhXFXXXXXXXXXX-32-32.png" height="16"/></a> <a href="https://t.17track.net/zh-cn#nums='+logistics_num+'" target="_blank" title="用【17TRACK】查询物流"><img src="https://res.17track.net/global-v2/favicon.ico" height="16"/></a> <a href="https://www.sypost.net/search?orderNo='+logistics_num+'" target="_blank" title="用【顺友】查询物流"><img src="https://www.sypost.net/index/images/shunyou_favicon.png" height="16"/></a> <a href="https://www.1tracking.net/zh-CN/detail?nums='+logistics_num+'" target="_blank" title="用【1Tracking】查询物流"><img src="https://api.1tracking.net/favicon.ico" height="16"/></a>');
      $("#state").html("正在获取【物流信息】。。。");
      gg.getFetch("http://global.cainiao.com/detail.htm?mailNoList=" + logistics_num,"text",this.a08,this)
*/
/* a08:function(t)
  {
    let str3,str = Tool.StrSlice(t, 'id="waybill_list_val_box">', '</textarea>'),len=str.lastIndexOf("}")+1
    if(str.length!=len){str=str.substr(0,len);}
    let c = document.createElement('body'); c.innerHTML = str; str = c.innerText || c.textContent; c = null;
    eval("let Arr=" + str)
    $("#DeliveryStatus").html(Arr.data[0].statusDesc);
    if(Arr.data[0].section2.detailList[0])
    {
      
    }
    else
    {
      this.a10(Arr.data[0].statusDesc,this.obj.oo);
    }
  },

  a10:function(statusDesc,oo)
    {
    if(oo.PurchaseWaitingDelivery=="")
    {
      this.a11(statusDesc,oo);
    }
    else
    {
      this.obj.A1--;
      let str3='[<r: db="sqlite.dhgate">'+this.b02(oo,"")+'</r:>]'
      Tool.ajax.a01(str3,1,this.a09,this)
    }
  },
  a11:function(statusDesc,oo)
    {
    if(statusDesc=="离开发件国"||statusDesc=="到达目的国"||statusDesc=="运输中"||statusDesc=="已揽件")
    {
      if(this.obj.PurchaseRemark.indexOf('[纠纷中')!=-1)//纠纷中,则跳过,去开纠纷。
      {this.a12([]);}
      else
      {
        let str='[<r: db="sqlite.dhgate">'+this.b02(oo,',:purchasestatus=5,:PurchaseRemark=\'' + this.obj.PurchaseRemark + '[纠纷中'+Tool.userDate13(new Date(),"/")+']\' ')+'</r:>]'
        Tool.ajax.a01(str,1,this.a12,this)
      }
    }
    else
    {
      $("#state").html('看17妥投没有...  <button type="button" class="btn btn-sm btn-secondary" onclick="fun.a09([])">下一条</button>'+this.b03());
    }
  },
  a12:function(t)
    {
    if(t[0]==null)
    {
      $("#state").html('可以开纠纷...  <button type="button" class="btn btn-sm btn-secondary" onclick="fun.a09([])">下一条</button>')//||statusDesc=="待揽件" 不用看，要看17
    }
    else
    {$("#state").html("出错"+Tool.pre(t));}
  },
	
    */
/*
  
  a13:function()//要换账号了
    {
    this.obj.num=0;
        win.WebUrl("2","https://login.aliexpress.com/xman/xlogout.htm",this.a14,this);		
    },
  a14:function()
    {
    this.obj.num++;
    $("#state").html("正在【退出】..."+this.obj.num);
    let str=win.WebGetHTML("2","html|div");
    if(str.indexOf('<button class="fm-button" type="submit">Sign In')!=-1)//要登陆 新
        {
      $("#state").html("正在【登陆】...");
      this.obj.num=0;
      F1.smtlogin(this,this.a05,this.obj.PurchaseUserName);
    }
    else if(this.obj.num>50)
    {
      this.a05();
    }
    else
        {Tool.Time(this.a14,500,this,"1");}  
  },
  
  
  
  a13:function()
    {  
    alert("开")
    //let url="https://trade.aliexpress.com/issue/fastissue/createIssueStep1.htm?orderId="+this.obj.Aarr[1]
    //win.WebUrl("2","https://login.aliexpress.com/xman/xlogout.htm",this.a14,this);	
  },
  a11:function(_csrf_token)
  {
    $("#state").html("正在【延期】...")
    let str='<form action="https://trade.aliexpress.com/order_detail.htm?orderId='+this.obj.Aarr[1]+'" method="post" name="myForm">\
    <input type="text" name="_csrf_token" value="'+_csrf_token+'">\
    <input type="text" name="action" value="logistics/accept_goods_action">\
    <input type="text" name="event_submit_do_request_extend_accept_goods_time" value="xxx">\
    <input type="text" name="_fm.p._0.d" value="20">\
    </form>'
    win.WebSetHTML("2",'body|',str);
    //win.WebFun('2','document.forms["myForm"].submit();');//提交
    
    //Tool.Time(this.a12,300,this,"1",_csrf_token);
  },
  a12:function(_csrf_token)
  {
    if(win.WebIsHTML('2',"h3|Request has been sent out"))//提交成功
    {
      $("#state").html("正在【延期】成功...")
      this.a13(true);
    }
    else
    {Tool.Time(this.a12,300,this,"1",_csrf_token);}  
  },
  
  */