'use strict';
var fun = {
    obj: { fromid: 0, token: [], A1: 1, A2: 0, Aarr: [], B1: 1, B2: 0, Barr: [] }, token: "",
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//订单【来源/国家/编号】
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//订单状态/警告原因/请款/订单站内信
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//采购【状态/到期时间/备注】
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "1";//搜索字段  
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//搜索关键词  
        this.a02();
    },
    a02: function () {
        let str = '[' + this.b02() + '\
        <r:order size=10 db="sqlite.dhgate" page=2 where=" where 1=1 '+ this.b01() + '">,\
        {\
			    "id":<:id/>,\
			    "orderid":"<:orderid/>",\
                "deliveryDeadline":"<:deliveryDeadline/>",\
			    "buyerConfirmDate":<:buyerConfirmDate/>,\
			    "updateDate":<:updateDate/>,\
			    "BeginDate":<:BeginDate/>,\
			    "PayTime":<:PayTime/>,\
			    "fromuser":"<:fromuser/>",\
			    "orderFrom":"<:orderFrom/>",\
          <r:seller db="sqlite.dhgate" where=" where @.UserName=\'<:fromuser tag=sql/>\'" size=1>\
			    "hide":<:hide/>,\
          </r:seller>\
          "warnReason":<:warnReason tag=json/>,\
			    "status":"<:status/>",\
			    "isApplyMoney":"<:isApplyMoney/>",\
			    "PurchaseRemark":<:PurchaseRemark tag=json/>,\
			    "PurchaseTime":<:PurchaseTime/>,\
			    "PurchaseStatus":<:PurchaseStatus/>,\
			    "PurchaseWaitingDelivery":<:PurchaseWaitingDelivery/>,\
			    "msgCount":<:orderid Fun="Db(sqlite.dhgate,select count(1) from @.msg where @.param=\'$1\',count)"/>,\
			    "orderid":"<:orderid/>",\
          <r:country  db="sqlite.dhgate" where=" where @.name=\'<:country/>\' and @.upid=\'0\'" size=1>\
			    "countryid":"<:countryid/>",\
			    "countryname":"<:des/>",\
          </r:country>\
			    "orderitem":\
          [0\
            <r:orderitem db="sqlite.dhgate" where=" where @.OrderID=\'<:OrderID/>\'" size=50>\
            ,{\
              "pic":"<:pic/>",\
              "name":"<:name tag=js/>",\
              "fromid":"<:fromid/>",\
              "proid":"<:proid/>",\
              "Amount":<:Amount/>,\
              "Unit":"<:Unit/>",\
              "AttributeCart":"<:AttributeCart tag=js/>",\
              "Remark":"<:Remark tag=js/>",\
              "RealPrice":"<:RealPrice f=2/>"\
            }\
            </r:orderitem>\
          ]\
        }\
        </r:order>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = this.b03(), str2 = "";
        for (let i = 1; i < arr.length; i++) {
            str2 += '\
      <tr class="center">\
      <td class="p-0">\
        <table class="table table-bordered">\
          <tr title="订单编码"><td><a href="javascript:" onclick="Tool.main(\'js01/'+ arr[i].orderid + '\')">' + arr[i].orderid + '</a></td></tr>\
          <tr title="来源国家">\
						<td>\
							<img src="//image.dhgate.com/images/flag/'+ arr[i].countryid + '.gif"/>\
							'+ arr[i].countryname + '（' + arr[i].orderFrom + '）\
						</td>\
					</tr>\
          <tr title="来源店铺">\
						<td>'+ arr[i].fromuser + '（' + this.b06(arr[i].hide) + '）</td>\
					</tr>\
        </table>\
      </td>\
      <td class="p-0"><table class="table mb-0 table-bordered mb-0">'+ this.b09(arr[i].orderitem) + '</table></td>\
      <td class="p-0">\
        <table class="table table-bordered mb-0">\
          <tr title="下单时间"><td>'+ this.b10(arr[i].BeginDate) + '</td></tr>\
          <tr title="支付时间"><td>'+ this.b10(arr[i].PayTime) + '</td></tr>\
          <tr title="收货时间"><td>'+ this.b10(arr[i].buyerConfirmDate) + '</td></tr>\
          <tr title="更新时间"><td>'+ this.b10(arr[i].updateDate) + '</td></tr>\
        </table>\
      </td>\
      <td class="p-0">\
        <table class="table table-bordered">\
          <tr title="订单状态"><td>'+ this.b05(arr[i].status, arr[i].deliveryDeadline) + '</td></tr>\
          <tr title="警告原因"><td>'+ (arr[i].warnReason ? arr[i].warnReason : '无警告') + '</td></tr>\
          <tr title="是否请款"><td>'+ (arr[i].isApplyMoney == 1 ? '<font style="color:#999999">已请款</font>' : '') + '</td></tr>\
          <tr title="有无订单站内信"><td>'+ (arr[i].msgCount ? '<span style="color:#ccc;">有订单站内信</span>' : '') + '</td></tr>\
        </table>\
      </td>\
      <td class="p-0">\
        <table class="table table-bordered">\
          <tr title="采购状态"><td>'+ Tool.PurchaseStatus(arr[i].PurchaseStatus) + '</td></tr>\
          <tr title="采购到期时间"><td>'+ (arr[i].PurchaseWaitingDelivery ? Tool.dateDHM(arr[i].PurchaseWaitingDelivery * 1000) : '') + '</td></tr>\
          <tr title="采购备注"><td>'+ arr[i].PurchaseRemark + '</td></tr>\
          <tr title="采购时间"><td>'+ this.b10(arr[i].PurchaseTime) + '</td></tr>\
        </table>\
      </td>\
      </tr>'
        }
        str2 += '<tr><td colspan="5">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html += '\
        <div class="p-2">\
          <table class="table table-hover">\
            <thead class="table-light center">'+ this.b07(arr[0]) + '</thead>\
            <tbody>'+ str2 + '</tbody>\
          </table>\
          <div class="attention">\
            说明：<br/>\
            订单状态/警告原因/请款/订单站内信:急需发货【48小时】---(显示【(卖)超时时间】前后3天且【(卖)等待您发货】的所有数据.)\
          </div>\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function (arr) {
        let str = obj.arr[5] == "-_-20" ? "" : " and @.fromuserid=" + obj.arr[5];//订单【来源/国家/编号】
        if (obj.arr[6] == "-1")//订单状态/警告原因/请款/订单站内信
        {
            let num2 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 2) / 1000);//2天
            str += " and @.deliveryDeadline<=" + num2 + " and @.status='103001'";
        }
        else { str += obj.arr[6] == "-_-20" ? "" : " and @.status='" + obj.arr[6] + "'"; }
        ////////////////////////////////////////////
        if (obj.arr[7] == "-1") {
            let num6 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 6) / 1000);//6天
            let num_6 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 6) / 1000);//6天
            str += " and @.PurchaseWaitingDelivery<=" + num6 + " and @.PurchaseWaitingDelivery&gt;" + num_6 + " and @.isApplyMoney=0 and (:PurchaseStatus=2 or @.PurchaseStatus=5)"
        }
        else if (obj.arr[7] == "-2" || obj.arr[7] == "-3") { }
        else { str += obj.arr[7] == "-_-20" ? "" : " and @.PurchaseStatus=" + obj.arr[7]; }
        ///////////////////////////////////////////////
        if (obj.arr[9] != "-_-20") {
            switch (obj.arr[8]) {
                case "1": str += " and @.orderid like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//订单编号
                case "2": str += " and @.username like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//用户名
                case "3": str += " and @.PurchaseOrderId like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//采购单号
                case "4": str += " and @.PurchaseRemark like '%" + Tool.unescape(obj.arr[9]) + "%'"; break;//采购单号
                case "5": str += " and @.firstName='" + Tool.unescape(obj.arr[9]) + "'"; break;//采购单号
            }
        }
        if (obj.arr[7] == "-2") { str += " order by @.PurchaseTime desc" }
        else if (obj.arr[7] == "-3") { str += " order by @.updateDate desc" }
        else { str += " order by @.BeginDate desc" }//:BeginDate desc,
        return str;
    },
    b02: function () {
        let num2 = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 2) / 1000);//2天
        let str = '{\
            "size":10,\
            "count":<@count/>,\
            "count1":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'101003\',count)/>,\
            "count2":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102001\',count)/>,\
            "count3":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'103001\',count)/>,\
            "count4":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105001\',count)/>,\
            "count5":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105002\',count)/>,\
            "count6":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105003\',count)/>,\
            "count7":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'105004\',count)/>,\
            "count8":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'103002\',count)/>,\
            "count9":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'101009\',count)/>,\
            "count10":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106001\',count)/>,\
            "count11":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106002\',count)/>,\
            "count12":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'106003\',count)/>,\
            "count13":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102006\',count)/>,\
            "count14":<.Db(sqlite.dhgate,select count(1) from @.order where @.status=\'102007\',count)/>,\
            "count15":<.Db("sqlite.dhgate","select count(1) from @.order where @.deliveryDeadline<='+ num2 + ' and @.status=\'103001\'","count")/>,\
            "count16":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=6,count)/>,\
            "count17":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=0,count)/>,\
            "count18":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=12,count)/>,\
            "count19":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=5,count)/>,\
            "count20":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=10,count)/>,\
            "count21":<.Db(sqlite.dhgate,select count(1) from @.order where @.purchasestatus=11,count)/>,\
            "seller":[0<r:seller db="sqlite.dhgate" size=50 where=" where @.binduserID=1 order by @.sort asc">,{"fromid":<:fromid/>,"UserName":"<:UserName/>"}</r:seller>]\
        }'
        return str;
    },
    b03: function () {
        let html = Tool.header() + '\
        <div class="input-group w-50 m-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[8] + '">' + this.b08(obj.arr[8]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">订单编号</li>\
            <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">买家用户名</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c03(3)" value="3">采购单号</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c03(4)" value="4">采购备注</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c03(5)" value="5">收货人性名</a></li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[9] == "-_-20" ? "" : Tool.unescape(obj.arr[9])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
        return html;
    },
    b04: function (arr) {
        let str = ""
        for (let i = 1; i < arr.length; i++) {
            str += '<Option value="' + arr[i].fromid + '" ' + (obj.arr[5] == arr[i].fromid ? 'selected="selected"' : '') + '>(' + i + ')' + arr[i].UserName + '</option>';
        }
        return str;
    },
    b05: function (status, time) {
        let str = "";
        switch (status) {
            case "111000": str = "订单取消"; break;
            case "101003": str = "等待买家付款"; break;
            case "102001": str = "买家已付款，等待平台确认"; break;
            case "103001": str = "<font color=red>等待您发货</font><br/>（" + Tool.dateDHM(time * 1000) + "）"; break;
            case "105001": str = "买家退款中，等待协商结果"; break;
            case "105002": str = "退款协议已达成"; break;
            case "105003": str = "部分退款后，等待发货"; break;
            case "105004": str = "买家取消退款申请"; break;
            case "103002": str = "已部分发货"; break;
            case "101009": str = "等待买家确认收货"; break;
            case "106001": str = "退款/退货协商中，等待协议达成"; break;
            case "106002": str = "买家投诉到平台"; break;
            case "106003": str = "协议已达成，执行中"; break;
            case "102006": str = "已确认收货"; break;
            case "102007": str = "超过预定期限，自动确认收货"; break;
            case "102111": str = "交易成功"; break;
            case "111111": str = "交易关闭"; break;
            default: str = "未知：" + status;
        }
        return str;
    },
    b06: function (hide) {
        let name = ""
        switch (hide) {
            case 0: name = "正常"; break;
            case 1: name = "已禁用"; break;
            case 2: name = "限物流"; break;
            case 3: name = "受限"; break;
            default: name = "未知：" + hide; break;
        }
        return name
    },
    b07: function (arr) {
        let str = '\
    <tr>\
      <th class="p-0">\
        <Select onChange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
        <Option value="">基本信息</Option>'+ this.b04(arr.seller) + '</Select>\
      </th>\
      <th class="left">商品信息</th>\
      <th class="w110">时间</th>\
      <th class="p-0">\
        <Select onChange="Tool.open(6,this.options[this.selectedIndex].value)" class="form-select">\
          <Option value="-_-20">状态信息</Option>\
          <Option value="111000" '+ (obj.arr[6] == "111000" ? 'selected="selected"' : '') + '>订单取消</Option>\
          <Option value="101003" '+ (obj.arr[6] == "101003" ? 'selected="selected"' : '') + '>(' + arr.count1 + ')等待买家付款</Option>\
          <Option value="102001" '+ (obj.arr[6] == "102001" ? 'selected="selected"' : '') + '>(' + arr.count2 + ')买家已付款，等待平台确认</Option>\
          <Option value="103001" '+ (obj.arr[6] == "103001" ? 'selected="selected"' : '') + '>(' + arr.count3 + ')等待您发货</Option>\
          <Option value="105001" '+ (obj.arr[6] == "105001" ? 'selected="selected"' : '') + '>(' + arr.count4 + ')买家退款中，等待协商结果</Option>\
          <Option value="105002" '+ (obj.arr[6] == "105002" ? 'selected="selected"' : '') + '>(' + arr.count5 + ')退款协议已达成</Option>\
          <Option value="105003" '+ (obj.arr[6] == "105003" ? 'selected="selected"' : '') + '>(' + arr.count6 + ')部分退款后，等待发货</Option>\
          <Option value="105004" '+ (obj.arr[6] == "105004" ? 'selected="selected"' : '') + '>(' + arr.count7 + ')买家取消退款申请</Option>\
          <Option value="103002" '+ (obj.arr[6] == "103002" ? 'selected="selected"' : '') + '>(' + arr.count8 + ')已部分发货</Option>\
          <Option value="101009" '+ (obj.arr[6] == "101009" ? 'selected="selected"' : '') + '>(' + arr.count9 + ')等待买家确认收货</Option>\
          <Option value="106001" '+ (obj.arr[6] == "106001" ? 'selected="selected"' : '') + '>(' + arr.count10 + ')退款/退货协商中，等待协议达成</Option>\
          <Option value="106002" '+ (obj.arr[6] == "106002" ? 'selected="selected"' : '') + '>(' + arr.count11 + ')买家投诉到平台</Option>\
          <Option value="106003" '+ (obj.arr[6] == "106003" ? 'selected="selected"' : '') + '>(' + arr.count12 + ')协议已达成，执行中</Option>\
          <Option value="102006" '+ (obj.arr[6] == "102006" ? 'selected="selected"' : '') + '>(' + arr.count13 + ')人工确认收货</Option>\
          <Option value="102007" '+ (obj.arr[6] == "102007" ? 'selected="selected"' : '') + '>(' + arr.count14 + ')超过预定期限，自动确认收货</Option>\
          <Option value="102111" '+ (obj.arr[6] == "102111" ? 'selected="selected"' : '') + '>交易成功</Option>\
          <Option value="111111" '+ (obj.arr[6] == "111111" ? 'selected="selected"' : '') + '>交易关闭</Option>\
          <Option value="-1" '+ (obj.arr[6] == "-1" ? 'selected="selected"' : '') + '>(' + arr.count15 + ')急需发货【48小时】</Option>\
        </Select>\
      </th>\
      <th class="p-0">\
        <Select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <Option value="-_-20">采购信息</Option>\
        <option value="6" '+ (obj.arr[7] == "6" ? 'selected="selected"' : '') + '>(' + arr.count16 + ')无需采购</Option>\
        <Option value="0" '+ (obj.arr[7] == "0" ? 'selected="selected"' : '') + '>(' + arr.count17 + ')等待采购</Option>\
        <Option value="4" '+ (obj.arr[7] == "4" ? 'selected="selected"' : '') + '>取消</Option>\
        <Option value="2" '+ (obj.arr[7] == "2" ? 'selected="selected"' : '') + '>已付款</Option>\
        <Option value="12" '+ (obj.arr[7] == "12" ? 'selected="selected"' : '') + '>(' + arr.count18 + ')非正常采购</Option>\
        <Option value="5" '+ (obj.arr[7] == "5" ? 'selected="selected"' : '') + '>(' + arr.count19 + ')问题订单</Option>\
        <Option value="10" '+ (obj.arr[7] == "10" ? 'selected="selected"' : '') + '>(' + arr.count20 + ')退款成功</Option>\
        <Option value="11" '+ (obj.arr[7] == "11" ? 'selected="selected"' : '') + '>(' + arr.count21 + ')退款失败</Option>\
        <Option value="-1" '+ (obj.arr[7] == "-1" ? 'selected="selected"' : '') + '>自动收款(0-6天)</Option>\
        <Option value="-2" '+ (obj.arr[7] == "-2" ? 'selected="selected"' : '') + '>采购时间倒序</Option>\
        <Option value="-3" '+ (obj.arr[7] == "-3" ? 'selected="selected"' : '') + '>更新时间倒序</Option>\
        </Select>\
      </th>\
    </tr>'
        return str;
    },
    b08: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "订单编号"; break;
            case "2": name = "买家用户名"; break;
            case "3": name = "采购单号"; break;
            case "4": name = "采购备注"; break;
            case "5": name = "收货人性名"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b09: function (arr) {
        let str = ""
        for (let j = 1; j < arr.length; j++) {
            str += '\
            <tr>\
                <td class="w100" rowspan="3">\
                <a href="'+ arr[j].pic.replace("100x100", "0x0") + '" target="_blank"><img src="' + arr[j].pic.replace("http://", "https://") + '" title="点击预览" class="border" height="100"></a>\
                </td>\
                <td class="left" colspan="6"><a href="https://www.dhgate.com/product/-/'+ arr[j].fromid + '.html" target="_blank">' + arr[j].name + '</a></td>\
            </tr>\
            <tr class="left">\
                <td class="right">编码:</td>\
                <td>'+ arr[j].proid + '</td>\
                <td class="right">数量:</td>\
                <td>'+ arr[j].Amount + '（' + arr[j].Unit + '）</td>\
                <td class="right">价格:</td>\
                <td>$'+ arr[j].RealPrice + '</td>\
                </tr>\
                <tr class="left">\
                <td class="right">属性:</td>\
                <td>'+ arr[j].AttributeCart + '</td>\
                <td class="right">备注:</td>\
                <td colspan="3">'+ arr[j].Remark + '</td>\
            </tr>'
        }
        return str;
    },
    b10: function (time) {
        return Tool.js_date_time2(time, "-").replace(" ", "<br/>")
    },
    c01: function () { },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = Tool.escape(searchword);
            Tool.main(obj.arr[3] + "/1/-_-20/-_-20/-_-20/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        let name = this.b08("" + val)
        $("#Field").html(name).val(val)
    }
}
fun.a01();