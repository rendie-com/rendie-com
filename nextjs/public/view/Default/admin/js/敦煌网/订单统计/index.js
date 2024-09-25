'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let path = "admin/js/敦煌网/订单统计/"
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        switch (obj.arr[3]) {
            case "js01": Tool.scriptArr([path + '纠纷金额.js']); break;
            default:
                obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
                this.a02();
        }
    },
    a02: function () {
        let str = '[\
        {\
            "count":<@count/>,\
            "size":48\
        }\
		<r:ordermonth db="sqlite.dhgate" page=2 size=48 where=" order by @.month desc">\
		,{\
			 "id":<:id/>,\
			 "month":"<:month/>",\
			 "sumOrder":<:sumOrder/>,\
			 "MoneyTotal":"<:MoneyTotal f=2/>",\
			 "orderRefund":"<:orderRefund/>",\
			 "PurchaseCost":"<:PurchaseCost/>",\
			 "PurchaseRefund":"<:PurchaseRefund/>",\
			 "order_111000":"<:order_111000/>",\
			 "order_111000_count":"<:order_111000_count/>",\
			 "order_4":"<:order_4/>",\
			 "order_4count":"<:order_4count/>",\
			 "order_102111_111111":"<:order_102111_111111/>",\
			 "order_3":"<:order_3/>",\
			 "order_3count":"<:order_3count/>",\
			 "order_078":"<:order_078/>",\
			 "order_078count":"<:order_078count/>",\
			 "order_Purchase8":"<:order_Purchase8 f=2/>",\
			 "order_Purchase8count":"<:order_Purchase8count/>",\
			 "month":"<:month/>"\
		 }\
		</r:ordermonth>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let str = "", profit, ProfitMargin, A1 = [], A2 = [], A3 = [], month = "";
        for (let i = 1; i < arr.length; i++) {
            //=实收金额(MoneyTotal)-订单退款金额(orderRefund)-采购金额(PurchaseCost)+采购退款金额(PurchaseRefund)-未采购金额(order_078)
            profit = arr[i].MoneyTotal - arr[i].orderRefund - arr[i].PurchaseCost + arr[i].PurchaseRefund - arr[i].order_078
            if (arr[i].PurchaseCost - arr[i].PurchaseRefund == 0) { ProfitMargin = "0.00" }
            else { ProfitMargin = ((profit / (arr[i].PurchaseCost - arr[i].PurchaseRefund)) * 100).toFixed(2) }//利润率
            month = arr[i].month.substr(0, 4) + "年" + arr[i].month.substr(4) + "月"
            str += '\
            <tr>\
            <td>'+ i + '</li>\
            <td>'+ month + '</td>\
            <td>'+ arr[i].sumOrder + '</td>\
            <td>'+ arr[i].order_102111_111111 + '</td>\
            <td>'+ arr[i].order_111000 + '（' + arr[i].order_111000_count + '）</td>\
            <td>'+ (arr[i].orderRefund == 0 ? "" : arr[i].orderRefund) + '</td>\
            <td><a href="javascript:;" onclick="Tool.open5(\'js01\','+ arr[i].month + ')">' + (arr[i].order_4 == "0" ? "" : arr[i].order_4 + '（' + arr[i].order_4count + '）') + '</a></td>\
            <td>'+ (arr[i].order_3 == "0" ? "" : arr[i].order_3 + '（' + arr[i].order_3count + '）') + '</td>\
            <td>'+ arr[i].MoneyTotal + '</td>\
            <td>'+ (arr[i].order_078 == "0" ? "" : arr[i].order_078 + '（' + arr[i].order_078count + '）') + '</td>\
            <td>'+ arr[i].PurchaseCost + '</td>\
            <td>'+ (arr[i].order_Purchase8 == "0" ? "" : arr[i].order_Purchase8 + '（' + arr[i].order_Purchase8count + '）') + '</td>\
            <td>'+ (arr[i].PurchaseRefund == "0" ? "" : arr[i].PurchaseRefund) + '</td>\
            <td>'+ profit.toFixed(2) + '</td>\
            <td>'+ ProfitMargin + '%</td>\
            <td>-</td>\
            </tr>'
            ///////////////////////////////////////////////
            A1.push([arr.length - i, arr[i].sumOrder]);
            A2.push([arr.length - i, profit.toFixed(2)]);
            A3.push([arr.length - i, '', month])
            ////////////////////////////////////////////////////////
        }
        let html = '\
    <header class="panel-heading">数据统计</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead>'+ this.b01(arr[0]) + '</thead>\
        <tbody>'+ str + '</tbody>\
      </table>\
    </div>'
        Tool.html(this.a04, this, html, [A1, A2, A3])
    },
    a04: function (arr) {
        $.plot($("#visitors-container"),
            [
                {
                    data: arr[0],
                    label: "订单数量",
                    points: { show: true },
                    yaxis: 1
                },
                {
                    data: arr[1],
                    label: "利润",
                    points: { show: true },
                    lines: { show: true, fill: true },
                    yaxis: 2
                }
            ],
            {
                series: {
                    lines: { show: true, fill: false },
                    points: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                colors: ["#424F63", "#65CEA7"],
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: false,
                    content: "%x<br/>%s：%y"
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return "<b>" + arr[2][arr[2].length - val][2] + "</b>";
                    },
                    ticks: arr[2]
                },
                yaxes: [{
                    tickFormatter: function (axis) {
                        return axis.toString() + "（单）";
                    }
                },
                {
                    tickFormatter: function (axis) {
                        return axis.toString() + "（美元）";
                    },
                    position: "right"
                }]
            });

    },
    b01: function (arr0) {
        return '\
        <tr><td colspan="16" class="p-3"><div id="visitors-container" style="width: 100%;height:500px;"></div></td></tr>\
        <tr><td colspan="16" class="left">'+ Tool.page(arr0.count, arr0.size, 4) + '</td></tr>\
        <tr class="table-light">\
        <th class="w40" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
        <li onClick="fun.c02()"><a class="dropdown-item pointer">同步一年内的订单</a></li>\
        <li onClick="fun.c06()"><a class="dropdown-item pointer">同步一年外的订单</a></li>\
        </ul>\
        </th>\
        <th class="w100" title="以支付时间为标准">月份</th>\
        <th class="w50" title="当前月所有订单">订单</th>\
        <th class="w100" title="【交易成功】和【交易关闭】的所有数据">已收款金额</th>\
        <th class="w150" title="【订单取消】的所有数据">订单取消金额</th>\
        <th class="w110" title="订单退款大于零">订单退款金额</th>\
        <th class="w100" title="【买家退款中，等待协商结果】【退款/退货协商中，等待协议达成】【协议已达成，执行中】【退款协议已达成】">纠纷金额</th>\
        <th class="w120" title="非（【交易成功】【交易关闭】【订单取消】【等待买家付款】【买家已付款，等待平台确认】）的所有数据">未入账</th>\
        <th class="w100" title="为当前月所有【实收金额】-【等待买家付款】金额-【买家已付款，等待平台确认】-【订单取消】金额。">实收金额</th>\
        <th class="w100" title="统计【待采购】【问题订单(未发货)】【假运单号(已发货)】且不包含订单【退款成功,交易成功】的【实收金额】之和">未采购金额</th>\
        <th class="w100">采购金额</th>\
        <th class="w110" title="订单没取消【采购金额】大于【实收金额】时，合计（采购金额-实收金额）亏多少，\n加上【订单取消】了，还有【采购金额】，合计（采购金额-采购退款金额）亏多少。">亏本金额</th>\
        <th class="w110" title="采购退款大于零">采购退款金额</th>\
        <th class="w100" title="=【实收金额】-订单退款金额-采购金额+采购退款金额-未采购金额">利润</th>\
        <th class="w100" title="=利润/(采购金额-采购退款)">利润率</th>\
        <th title="=按【提成时间】且【可以提现】区分月份。【实收金额】减【订单退款金额】">已入账</th>\
        </tr>'
    },
    c01: function () { },
    c02: function () {
        let html = '\
		<header class="panel-heading"><a href="javascript:" onclick="location.reload();" class="arrow_back"></a>正在【同步一年以内的订单】。。。</header>\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w100">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right w100">统计时间：</td><td id="time" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">正在统计...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        this.obj.A2 = 12
        Tool.html(this.c03, this, html);
    },
    c03: function () {
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100);
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + ' (条)');
            let month = new Date((new Date).getFullYear(), (new Date).getMonth() - this.obj.A1 + 1, 1)
            let monthNext = new Date((new Date).getFullYear(), (new Date).getMonth() - this.obj.A1 + 2, 1)
            $("#time").html("下单时间从：" + Tool.js_date_time(month) + " &lt;= 当前时间 &lt; " + Tool.js_date_time(monthNext))
            let where = ' where ' + Tool.gettime(month) + '<=@.BeginDate and @.BeginDate<' + Tool.gettime(monthNext)
            let str = '\
			{\
			<r:order size=1 db="sqlite.dhgate" where="'+ where + '">\
				"sumOrder":<:count(1)/>,\
				"MoneyTotal":<:sum(@.MoneyTotal) f=2/>,\
				"orderRefund":<:sum(@.orderRefund) f=2/>,\
				"PurchaseCost":<:sum(@.PurchaseCost) f=2/>,\
				"PurchaseRefund":<:sum(@.PurchaseRefund) f=2/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.Status=\'101003\'">\
				"order_101003":<:sum(@.MoneyTotal) f=2/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.Status=\'102001\'">\
				"order_102001":<:sum(@.MoneyTotal) f=2/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.Status=\'111000\'">\
				"order_111000":<:sum(@.MoneyTotal) f=2/>,\
				"order_111000_count":<:count(1)/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.Status in(\'105001\',\'106001\',\'106003\',\'105002\')">\
				"order_4":"<:sum(@.MoneyTotal) f=2/>",\
				"order_4count":<:count(1)/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.Status in(\'102111\',\'111111\')">\
				"order_102111_111111":<:sum(@.MoneyTotal) f=2/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and not(@.Status in(\'101003\',\'102001\',\'102111\',\'111111\',\'111000\'))">\
				"order_3":"<:sum(@.MoneyTotal) f=2/>",\
				"order_3count":<:count(1)/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.PurchaseStatus=0 and not(@.Status in(\'102111\',\'111111\',\'111000\'))">\
				"order_078":<:sum(@.MoneyTotal) f=2/>,\
				"order_078count":<:count(1)/>,\
			</r:order>\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and @.MoneyTotal<@.PurchaseCost and not(@.Status=\'111000\')">\
				"order_PurchaseCost8":<:sum(@.PurchaseCost) f=2/>,\
				"order_MoneyTotal8":<:sum(@.MoneyTotal) f=2/>,\
				"order_Purchase8count":<:count(1)/>\
			</r:order>,\
			<r:order db="sqlite.dhgate" size=1 where="'+ where + ' and 0<@.PurchaseCost and @.Status=\'111000\'">\
				"order_PurchaseCost8A":<:sum(@.PurchaseCost) f=2/>,\
				"order_PurchaseRefund8A":<:sum(@.PurchaseRefund) f=2/>,\
				"order_PurchaseCost8Acount":<:count(1)/>\
			</r:order>,\
			"month":"'+ Tool.userDate13(month, "-") + '"\
			}'
            Tool.ajax.a01(str, 1, this.c04, this);
            //order_101003									等待买家付款
            //order_102001									买家已付款，等待平台确认
            //order_3									未入账
            //order_3count						未入账数量
            //order_078								未采购金额
            //order_078count					未采购金额数量

            //订单没取消【采购金额】大于【实收金额】时，合计（采购金额-实收金额）亏多少，
            //order_PurchaseCost8				采购金额
            //order_MoneyTotal8					实收金额
            //order_Purchase8count		合计订单数

            //加上【订单取消】了，还有【采购金额】，合计（采购金额-采购退款金额）亏多少。
            //order_PurchaseCost8A						采购金额
            //order_PurchaseRefund8A				采购退款金额
            //order_PurchaseCost8Acount				合计订单数

        }
        else {
            $("#state").html("全部完成")
        }
    },
    c04: function (oo) {
        let arr2 = oo.month.split("-")
        let month = arr2[0] + arr2[1]
        let order_Purchase8 = oo.order_PurchaseCost8 - oo.order_MoneyTotal8 + oo.order_PurchaseCost8A - oo.order_PurchaseRefund8A
        let order_Purchase8count = oo.order_Purchase8count + oo.order_PurchaseCost8Acount
        let str = '\
			[\
			<if Fun(Db(sqlite.dhgate,select count(1) from @.ordermonth where @.month=\''+ month + '\',count))==0>\
				<r: db="sqlite.dhgate">insert into @.ordermonth(@.month,@.sumOrder,@.MoneyTotal,@.PurchaseCost,@.orderRefund,@.order_111000,@.order_111000_count,@.order_4,@.order_4count,@.order_102111_111111,@.order_3,@.order_3count,@.order_078,@.order_078count,@.order_Purchase8,@.order_Purchase8count)values(\''+ month + '\',' + oo.sumOrder + ',' + oo.MoneyTotal + ',' + oo.PurchaseCost + ',' + oo.orderRefund + ',' + oo.order_111000 + ',' + oo.order_111000_count + ',' + oo.order_4 + ',' + oo.order_4count + ',' + oo.order_102111_111111 + ',' + oo.order_3 + ',' + oo.order_3count + ',' + oo.order_078 + ',' + oo.order_078count + ',' + order_Purchase8 + ',' + order_Purchase8count + ')</r:>\
			<else/>\
				<r: db="sqlite.dhgate">update @.ordermonth set @.order_3='+ oo.order_3 + ',@.order_3count=' + oo.order_3count + ',@.order_078=' + oo.order_078 + ',@.order_078count=' + oo.order_078count + ',@.order_Purchase8=' + order_Purchase8 + ',@.order_Purchase8count=' + order_Purchase8count + ',@.order_102111_111111=' + oo.order_102111_111111 + ', @.order_4count=' + oo.order_4count + ',@.order_4=' + oo.order_4 + ',@.sumOrder=' + oo.sumOrder + ',@.MoneyTotal=' + (oo.MoneyTotal - oo.order_101003 - oo.order_102001 - oo.order_111000) + ',@.PurchaseCost=' + oo.PurchaseCost + ',@.orderRefund=' + oo.orderRefund + ',@.order_111000=' + oo.order_111000 + ',@.order_111000_count=' + oo.order_111000_count + ' where @.month=\'' + month + '\'</r:>\
			</if>\
			]'
        Tool.ajax.a01(str, 1, this.c05, this);
    },
    c05: function (t) {
        if (t[0] == null) {
            this.obj.A1++;
            this.c03()
        }
        else {
            Tool.at("出错：" + t)
        }
    },
    c06: function () {
        let html = '\
		<header class="panel-heading"><a href="javascript:" onclick="location.reload();" class="arrow_back"></a>正在【同步一年以外的订单】。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right w100">统计时间：</td><td id="time" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在统计...</td></tr>\
      </tbody>\
      </table>\
    </div>'
        this.obj.A2 = 120
        Tool.html(this.c03, this, html);
    }
}
fun.a01();
/*

  b03:function(status,deliveryDeadline,isApplyMoney)
  {
    let name="";
    switch(status) 
    {
     case "111000":name="订单取消";break;
     case "101003":name="等待买家付款";break;        
     case "102001":name="买家已付款，等待平台确认";break;        
      case "103001":name="等待您发货 <br/>超时时间:"+deliveryDeadline;break;        
     case "105001":name="买家退款中，等待协商结果";break;        
     case "105002":name="退款协议已达成";break;        
     case "105003":name="部分退款后，等待发货";break;        
     case "105004":name="买家取消退款申请";break;        
     case "103002":name="已部分发货";break;        
     case "101009":name="等待买家确认收货";break;        
     case "106001":name="退款/退货协商中，等待协议达成";break;        
     case "106002":name="买家投诉到平台";break;        
     case "106003":name="协议已达成，执行中";break;        
     case "102006":name="已确认收货";break;        
     case "102007":name="超过预定期限，自动确认收货";break;        
     case "102111":name="交易成功";break;        
     case "111111":name="交易关闭";break;               
     default:name="未知:"+status;    
    } 
    if(isApplyMoney=="True"){name+='<hr/><font style="color:#999999">已请款</font>';}
    return name
  },
  b04:function(PurchaseStatus)
  {
    let name="";
    switch(PurchaseStatus) 
    {
     case "0":name="待采购";break;             
     case "1":name="待付款";break;             
     case "2":name="已付款";break;             
     case "3":name="退款中";break;             
     case "4":name="取消";break;             
     case "5":name="已付款(问题订单)";break;             
     case "6":name="待取消";break;             
     case "7":name="问题订单(未发货)";break;             
     case "8":name="假运单号(已发货)";break;             
     case "9":name="申请二次采购";break;             
     case "10":name="采购退款成功";break;             
     case "11":name="采购退款失败";break;    
     default:name="未知:"+PurchaseStatus;    
    } 
    return name;
  },
  b05:function(arr)
  {
    let str="";
    for(let i=1;i<arr.length;i++)
    {
      str+='\
      <ul class="Tul center list-group-item-action">\
      <li rowspan="3" align="center"><a target="_blank" href="'+arr[i].pic+'"><img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+arr[i].pic+'" title="点击预览" border="0" height="75" align="left"></a></li>\
      <li style="text-align:left"><a href="'+arr[i].fromURL+'" target="_blank">'+arr[i].name+'</a></li>\
      </ul>\
      <ul class="Tul center list-group-item-action"><li>产品数量:'+arr[i].Amount+'（'+arr[i].Unit+'）&nbsp;&nbsp;产品价格:'+arr[i].RealPrice+'&nbsp;&nbsp;产品属性:'+arr[i].AttributeCart+'</li></ul>\
      <ul class="Tul center list-group-item-action"><li>产品备注:'+arr[i].Remark+'</li></ul>'
    }
    return str;
  },
  obj:{A1:1,Y:0,M:0},
    Tool.ajax.a01(str,1,this.a02,this);
  },
  c02:function(Y,M)
  {
    this.obj.A1=1;
    this.obj.Y=Y;
    this.obj.M=M;
    this.c03();    
  },
  c03:function()
  {
    $("#table").html('<img src="/'+o.path+'admin/img/loading-128x128.gif" class="mx-auto d-block"/>')
    let str='[{pagecount:10,recordcount:<@count/>}\
    <r:order size=10 page=2 where=" where year(:PayTime)='+this.obj.Y+'\
    and month(:PayTime)='+this.obj.M+'\
    and ((:Status<&gt;\'111000\' and @.PurchaseCost&gt;@.MoneyTotal) or (@.Status=\'111000\' and @.PurchaseRefund&lt;@.PurchaseCost))">\
      ,{\
        orderid:"<:orderid/>",\
        BeginDate:"<:BeginDate/>",\
        paytime:"<:paytime/>",\
        MoneyTotal:"<:MoneyTotal f=2/>",\
        fromhead:"<:fromhead/>",\
        fromuser:"<:fromuser/>",\
        status:"<:status/>",\
        List:[\
        <r:OrderItem where=" where @.OrderID=\'<:OrderID/>\'" size=50>\
        ,{\
          pic:"[OrderItem:pic]",\
          name:"[OrderItem:name tag=js]",\
          fromURL:"[OrderItem:fromURL]",\
          Amount:"[OrderItem:Amount]",\
          Unit:"[OrderItem:Unit]",\
          RealPrice:"[OrderItem:RealPrice f=2]",\
          AttributeCart:"[OrderItem:AttributeCart]",\
          Remark:"[OrderItem:Remark tag=js]"\
        }\
        </r:OrderItem>\
        ],\
        PurchaseStatus:"<:PurchaseStatus/>",\
        orderRefund:"<:orderRefund f=2/>",\
        PurchaseCost:"<:PurchaseCost f=2/>",\
        PurchaseRefund:"<:PurchaseRefund f=2/>",\
        deliveryDeadline:"<:deliveryDeadline/>",\
        isApplyMoney:"<:isApplyMoney/>"\
       }\
    </r:order>]'
    Tool.ajax.a01(str,this.obj.A1,this.c04,this);
  },
  c04:function(t)
  {
    let str='';
    eval("let arr="+t)
    for(let i=1;i<arr.length;i++)
    {
      str+='\
      <ul class="Tul center list-group-item-action">\
      <li><a href="javascript:" onclick="Tool.main(\'19/'+arr[i].orderid+'\')">'+arr[i].orderid+'</a></li>\
      <li>'+this.b05(arr[i].List)+'</li>\
      <li>'+arr[i].BeginDate+'<hr/>'+arr[i].paytime+'</li>\
      <li title="账户负责人:'+arr[i].fromhead+'">'+arr[i].fromuser+'</li>\
      <li>'+this.b03(arr[i].status,arr[i].deliveryDeadline,arr[i].isApplyMoney)+'</li>\
      <li>'+this.b04(arr[i].PurchaseStatus)+'</li>\
      <li>'+arr[i].MoneyTotal+'</li>\
      <li>'+arr[i].PurchaseCost+'</li>\
      <li>'+arr[i].orderRefund+'</li>\
      <li>'+arr[i].PurchaseRefund+'</li>\
      </ul>'
    }
    str='<div class="Tul thead"><a href="javascript:location.reload();" class="arrow_back"></a>【亏本金额】统计'+this.obj.Y+'年'+this.obj.M+'月所有数据</div>\
    <ul class="Tul center list-group-item-action">\
    <li>订单号</li>\
    <li>商品信息</li>\
    <li>下单时间/支付时间</li>\
    <li>来源账户</li>\
    <li>订单状态</li>\
    <li>采购状态</li>\
    <li>实收金额</li>\
    <li>采购成本</li>\
    <li>订单退款</li>\
    <li>采购退款</li>\
    </ul>'+str+'<ul class="Tul center list-group-item-action"><li>'+Tool.page(arr[0].count,arr[0].pagecount,4)+'</li></ul>'
    $("#table").html(str);
  },

  c06:function()
  {
    $("#table").html('<img src="/'+o.path+'admin/img/loading-128x128.gif" class="mx-auto d-block"/>')
    let str='[{pagecount:10,recordcount:<@count/>}\
    <r:order size=10 page=2 where=" where year(:PayTime)='+this.obj.Y+'\
    and month(:PayTime)='+this.obj.M+'\
    and not(@.Status in(\'102111\',\'111111\',\'111000\'))">\
      ,{\
        orderid:"<:orderid/>",\
        BeginDate:"<:BeginDate/>",\
        paytime:"<:paytime/>",\
        MoneyTotal:"<:MoneyTotal f=2/>",\
        fromhead:"<:fromhead/>",\
        fromuser:"<:fromuser/>",\
        status:"<:status/>",\
        List:[\
        <r:OrderItem where=" where @.OrderID=\'<:OrderID/>\'" size=50>\
        ,{\
          pic:"[OrderItem:pic]",\
          name:"[OrderItem:name tag=js]",\
          fromURL:"[OrderItem:fromURL]",\
          Amount:"[OrderItem:Amount]",\
          Unit:"[OrderItem:Unit]",\
          RealPrice:"[OrderItem:RealPrice f=2]",\
          AttributeCart:"[OrderItem:AttributeCart]",\
          Remark:"[OrderItem:Remark tag=js]"\
        }\
        </r:OrderItem>\
        ],\
        PurchaseStatus:"<:PurchaseStatus/>",\
        orderRefund:"<:orderRefund f=2/>",\
        PurchaseCost:"<:PurchaseCost f=2/>",\
        PurchaseRefund:"<:PurchaseRefund f=2/>",\
        deliveryDeadline:"<:deliveryDeadline/>",\
        isApplyMoney:"<:isApplyMoney/>"\
       }\
    </r:order>]'
    Tool.ajax.a01(str,this.obj.A1,this.c07,this);    
  },
  c07:function(t)
  {
    let str='';
    eval("let arr="+t)
    for(let i=1;i<arr.length;i++)
    {
      str+='\
      <ul class="Tul center list-group-item-action">\
      <li><a href="javascript:" onclick="Tool.main(\'19/'+arr[i].orderid+'\')">'+arr[i].orderid+'</a></li>\
      <li>'+this.b05(arr[i].List)+'</li>\
      <li>'+arr[i].BeginDate+'<hr/>'+arr[i].paytime+'</li>\
      <li title="账户负责人:'+arr[i].fromhead+'">'+arr[i].fromuser+'</li>\
      <li>'+this.b03(arr[i].status,arr[i].deliveryDeadline,arr[i].isApplyMoney)+'</li>\
      <li>'+this.b04(arr[i].PurchaseStatus)+'</li>\
      <li>'+arr[i].MoneyTotal+'</li>\
      <li>'+arr[i].PurchaseCost+'</li>\
      <li>'+arr[i].orderRefund+'</li>\
      <li>'+arr[i].PurchaseRefund+'</li>\
      </ul>'
    }
    str='<div class="Tul thead"><a href="javascript:location.reload();" class="arrow_back"></a>【亏本金额】统计'+this.obj.Y+'年'+this.obj.M+'月所有数据</div>\
    <ul class="Tul center list-group-item-action">\
    <li>订单号</li>\
    <li>商品信息</li>\
    <li>下单时间/支付时间</li>\
    <li>来源账户</li>\
    <li>订单状态</li>\
    <li>采购状态</li>\
    <li>实收金额</li>\
    <li>采购成本</li>\
    <li>订单退款</li>\
    <li>采购退款</li>\
    </ul>'+str+'<ul class="Tul center list-group-item-action"><li>'+Tool.page(arr[0].count,arr[0].pagecount,4)+'</li></ul>'
    $("#table").html(str);
  },
  c08:function(page)
  {
    this.obj.A1=page
    this.c06();
  }
  */

/*
//更新年月日
a01:function()
{
},
a02:function(oo)
{
  $("#table").html(this.obj.A1+"/"+oo[0].A2)
  if(this.obj.A1<=oo[0].A2)
  {
    let arr=[],arr2=[],time=""
    for(let i=1;i<oo.length;i++)
    {
      time=Tool.js_date_time2(oo[i].time,"-")
      arr2=time.split(" ")[0].split("-")
      arr.push('update @.order set @.year='+arr2[0]+',@.month='+arr2[1]+',@.day='+arr2[2]+' where @.id='+oo[i].id)
    }
    let str='<r: db="sqlite.dhgate">'+arr.join("<1/>")+'</r:>'
    Tool.ajax.a01(str,1,this.a03,this);
  }
  else
  {
    alert("完。。。。。。。。。。。。。。")
  }
},
a03:function(t)
{
  if(t=="")
  {
    this.obj.A1++;
    this.a01()
  }
  else
  {alert(t)}
}*/