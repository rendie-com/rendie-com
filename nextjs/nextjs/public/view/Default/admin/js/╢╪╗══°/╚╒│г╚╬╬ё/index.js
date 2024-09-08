'use strict';
var fun =
{
    sql: {},
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let path = "admin/js/敦煌网/日常任务/", urlArr
        if (obj.arr[3] == "js01") {
            urlArr = [
                '../../plugins/md5.js',
                "admin/js/common_img/index.js",
                "admin/js/common_img/img.onload.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + 'common/采集订单.js',
                path + 'common/采集站内信.js',
                path + 'common/更新店铺状态.js',
                path + 'common/更新【审核不通过原因】.js',
                path + 'common/催款.js',
                path + 'common/发货.js',
                path + 'common/请款.js',
                path + 'common/采集店铺统计信息.js',
                path + '每天采集一次.js'
            ]
            Tool.scriptArr(urlArr);
        }
        else if (obj.arr[3] == "js02") {

            Tool.scriptArr(['admin/js/敦煌网/日常任务/采购订单过期未到达，自动开纠纷.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
            this.a02();
        }
    },
    a02: function () {
        let str = '[\
        {\
          "size":50,\
          "count":<@count/>\
        }\
        <r:dailytasks db="sqlite.dhgate" size=50 page=2 where=" order by @.time desc,@.id desc">\
        ,{\
            "id":<:id/>,\
            "isPurchaseWaitingDelivery":<:isPurchaseWaitingDelivery/>,\
            "isProExtend":<:isProExtend/>,\
            "isProInfringement":<:isProInfringement/>,\
            "isDunning":<:isDunning/>,\
            "isShip":<:isShip/>,\
            "isRequest":"<:isRequest/>",\
            "PurchaseNotPaymentNum":<:PurchaseNotPaymentNum/>,\
            "WaitingPurchaseNum":<:WaitingPurchaseNum/>,\
            "WaitingPurchaseAmount":<:WaitingPurchaseAmount/>,\
            "AmountReceived":<:AmountReceived/>,\
            "PurchasePaymentNum":<:PurchasePaymentNum/>,\
            "PurchasePaymentAmount":<:PurchasePaymentAmount/>,\
            "PurchaseNotPaymentAmount":<:PurchaseNotPaymentAmount/>,\
            "isMsgNum":<:isMsgNum/>,\
            "isProblemOrderNum":<:isProblemOrderNum/>,\
            "note":"<:note tag=js/>",\
            "addtime":<:addtime/>,\
            "time":<:time/>\
        }\
        </r:dailytasks>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = "", NewDate = Tool.userDate13(new Date(), "/");
        for (let i = 1; i < arr.length; i++) {
            arr[i].time = arr[i].time ? Tool.userDate13(arr[i].time * 1000) : ""
            if (NewDate == arr[i].time) {
                this.sql = arr[i]
                html += this.b02(arr[i], false)
            }
            else {
                html += this.b02(arr[i], true)
            }
        }
        if (!this.sql.id && obj.arr[4] == 1) {
            this.sql =
            {
                id: 0,
                isPurchaseWaitingDelivery: 0,
                isProExtend: 0,
                isProInfringement: 0,
                isDunning: 0,
                isShip: 0,
                isRequest: 0,
                PurchaseNotPaymentNum: 0,
                AmountReceived: 0,
                PurchasePaymentNum: 0,
                WaitingPurchaseNum: 0,
                WaitingPurchaseAmount: 0,
                PurchasePaymentAmount: 0,
                PurchaseNotPaymentAmount: 0,
                isMsgNum: 0,
                isProblemOrderNum: 0,
                note: "",
                addtime: 0,
                time: NewDate
            }
            html = this.b02(this.sql, false) + html;
        }
        html += '<tr><td colspan="20">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = this.b01() + '\
      <div class="p-2">\
        <table class="table table-hover align-middle">\
          <thead class="table-light center">'+ this.b03() + '</thead>\
          <tbody>'+ html + '</tbody>\
        </table>\
      </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let str = '\
    <header class="panel-heading">日常任务</header>\
    <table class="table table-hover align-middle mb-0">\
    <tbody>\
    <tr>\
      <td class="w120 right">每天采集一次：</td>\
      <td class="p-0">\
        <button type="button" class="btn btn-sm btn-secondary" onclick="Tool.open4(\'js01\')">开始执行</button> （采集订单，采集站内信，更新店铺状态，催款，发货，查物流状态，请款，延期，采集店铺统计信息）\
      </td>\
    </tr>\
    <tr>\
      <td class="right">一周采集一次：</td>\
      <td class="p-0">\
        <button type="button" class="btn btn-sm btn-secondary" onClick="Tool.open4(\'js02\');" title="并更新【采购订单状态】，【订单到达时间】。">*采购订单过期未到达，自动开纠纷</button>\
      </td>\
    </tr>\
    </tbody>\
    </table>'
        return str
    },
    b02: function (arr, isbool) {
        let li1 = ((arr.AmountReceived - arr.PurchasePaymentAmount) / arr.PurchasePaymentAmount * 100).toFixed(2)
        return '\
        <tr class="center">\
        <td><a href="javascript:;" title="删除这条数据" onclick="fun.c06('+ arr.id + ')">' + arr.id + '</a></td>\
        <td title="添加时间：'+ Tool.js_date_time2(arr.addtime, "-") + '">' + arr.time + '（' + Tool.getDay(arr.time) + '）' + '</td>\
        <td>\
        <input type="checkbox" class="form-check-input"'+ (isbool ? ' disabled="disabled"' : '') + (arr.isPurchaseWaitingDelivery ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isPurchaseWaitingDelivery\')">\
        </td>\
        <td>\
        <input type="checkbox" class="form-check-input"'+ (isbool ? ' disabled="disabled"' : '') + (arr.isProExtend ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isProExtend\')">\
        <td>\
        <input type="checkbox" class="form-check-input"'+ (isbool ? ' disabled="disabled"' : '') + (arr.isProInfringement ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isProInfringement\')">\
        </td>\
        <td>\
        <input type="checkbox" class="form-check-input"'+ (isbool ? ' disabled="disabled"' : '') + (arr.isDunning ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isDunning\')">\
        </td>\
        <td>\
        <input type="checkbox" class="form-check-input" '+ (isbool ? ' disabled="disabled"' : '') + (arr.isShip ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isShip\')">\
        </td>\
        <td>\
        <input type="checkbox" class="form-check-input" '+ (isbool ? ' disabled="disabled"' : '') + (arr.isRequest ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isRequest\')">\
        </td>\
        <td>'+ arr.WaitingPurchaseNum + '</td>\
        <td>$'+ arr.WaitingPurchaseAmount + '</td>\
        <td>$'+ arr.AmountReceived.toFixed(2) + '</td>\
        <td>'+ arr.PurchasePaymentNum + '</td>\
        <td>$'+ arr.PurchasePaymentAmount.toFixed(2) + '</td>\
        <td>$'+ (arr.AmountReceived - arr.PurchasePaymentAmount).toFixed(2) + '</td>\
        <td>'+ (li1 != "NaN" ? li1 + "%" : "") + '</td>\
        <td class="p-0 w60">'+ (isbool ? arr.PurchaseNotPaymentNum : '<input type="text" value="' + arr.PurchaseNotPaymentNum + '" class="form-control form-control-sm center" onblur="fun.c02($(this),\'PurchaseNotPaymentNum\')">') + '</td>\
        <td class="p-0 w80">'+ (isbool ? arr.PurchaseNotPaymentAmount : '<input type="text" value="' + arr.PurchaseNotPaymentAmount + '" class="form-control form-control-sm center" onblur="fun.c02($(this),\'PurchaseNotPaymentAmount\')">') + '</td>\
        <td>\
        <input type="checkbox" class="form-check-input" '+ (isbool ? ' disabled="disabled"' : '') + (arr.isMsgNum ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isMsgNum\')">\
        </td>\
        <td>\
        <input type="checkbox" class="form-check-input" '+ (isbool ? ' disabled="disabled"' : '') + (arr.isProblemOrderNum ? ' checked="checked"' : '') + ' onclick="fun.c02($(this),\'isProblemOrderNum\')">\
        </td>\
        <td class="p-0">'+ (isbool ? arr.note : '<input type="text" value="' + arr.note + '" class="form-control form-control-sm" onblur="fun.c02($(this),\'note\')">') + '</td>\
        </tr>'
    },
    b03: function () {
        let str = '\
    <tr>\
      <th>ID</th>\
      <th>日期</th>\
      <th>未到纠纷</th>\
      <th>商品延期</th>\
      <th>商品侵权</th>\
      <th>催款</th>\
      <th>发货</th>\
      <th>请款</th>\
      <th>待采购量</th>\
      <th>待采购金额</th>\
      <th>实收金额</th>\
      <th>采购量</th>\
      <th>采购金额</th>\
      <th>利润</th>\
      <th>利润率</th>\
      <th>未付量</th>\
      <th>未付金额</th>\
      <th>站内信</th>\
      <th>问题订单</th>\
      <th>备注</th>\
    </tr>'
        return str;
    },
    c01: function () {


    },
    c02: function (This, L) {
        let str = "", R = ""
        if (L == "note") { R = "'" + This.val().replace("'", "''") + "'"; }
        else if (L == "PurchaseNotPaymentNum" || L == "PurchaseNotPaymentAmount") { R = This.val(); }
        else { R = This.is(":checked") ? 1 : 0; }
        let timeA = Tool.gettime(Tool.userDate13(Date.now(), "/")), timeB = timeA + 60 * 60 * 24
        //Tool.at(Tool.js_date_time2(timeA)+"------"+Tool.js_date_time2(timeB))
        str = '\
        {\
          "WaitingPurchaseNum":<.Db(sqlite.dhgate,select count(1) from @.order where @.PurchaseStatus=0,count)/>,\
          "AmountReceived":"0<.Db(sqlite.dhgate,select sum(@.MoneyTotal) from @.order where @.PurchaseTime>'+ timeA + ' and @.PurchaseTime<' + timeB + ',count)/>",\
          "PurchasePaymentAmount":"0<.Db(sqlite.dhgate,select sum(@.PurchaseCost) from @.order where @.PurchaseTime>'+ timeA + ' and @.PurchaseTime<' + timeB + ',count)/>",\
          "PurchasePaymentNum":<.Db(sqlite.dhgate,select count(1) from @.order where @.PurchaseTime>'+ timeA + ' and @.PurchaseTime<' + timeB + ',count)/>,\
          "WaitingPurchaseAmount":"0<.Db(sqlite.dhgate,select sum(@.MoneyTotal) from @.order where @.PurchaseStatus=0,count)/>"\
        }'
        //WaitingPurchaseNum			等待采购数量
        //AmountReceived					订单实收金额
        //PurchasePaymentAmount		采购付款金额
        //PurchasePaymentNum			采购付款数量
        //WaitingPurchaseAmount		等待采购金额
        Tool.ajax.a01(str, 1, this.c03, this, [L, R])
    },
    c03: function (oo, o2) {
        let str = "";
        if (this.sql.id == 0) {
            str = "insert into @.dailytasks(@." + o2[0] + ",@.time,@.addtime,@.WaitingPurchaseNum,@.WaitingPurchaseAmount,@.AmountReceived,@.PurchasePaymentAmount,@.PurchasePaymentNum)values\
			("+ o2[1] + "," + (Date.parse(new Date(this.sql.time)) / 1000) + "," + Date.now() / 1000 + "," + oo.WaitingPurchaseNum + "," + oo.WaitingPurchaseAmount + "," + oo.AmountReceived + "," + oo.PurchasePaymentAmount + "," + oo.PurchasePaymentNum + ")";
        }
        else {
            str = "update @.dailytasks set @." + o2[0] + "=" + o2[1] + ",@.WaitingPurchaseNum=" + oo.WaitingPurchaseNum + ",@.WaitingPurchaseAmount=" + oo.WaitingPurchaseAmount + ",@.AmountReceived=" + oo.AmountReceived + ",@.PurchasePaymentAmount=" + oo.PurchasePaymentAmount + ",@.PurchasePaymentNum=" + oo.PurchasePaymentNum + " where @.id=" + this.sql.id;
        }
        str = '""<r: db="sqlite.dhgate">' + str + '</r:>'
        Tool.ajax.a01(str, 1, this.c04, this)
    },
    c04: function (t) {
        if (t == "") {
            window.location.reload();
        }
        else {
            Tool.at("出错：" + t);
        }
    },
    c05: function () {

    },
    c06: function (id) {
        let str = "delete from @.dailytasks where @.id =" + id
        str = '<r: db="sqlite.dhgate">' + str + '</r:>'
        Tool.ajax.a01(str, 1, this.c04, this)
    }
}
fun.a01()