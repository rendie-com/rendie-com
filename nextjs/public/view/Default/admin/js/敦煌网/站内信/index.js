'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//订单编号
            Tool.scriptArr(['admin/js/敦煌网/站内信/站内信/内容信息.js']);
        }
        else if (obj.arr[3] == "js2") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//订单编号
            Tool.scriptArr(['admin/js/敦煌网/敦煌网订单/订单信息.js']);
        }
        else if (obj.arr[3] == "js3") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户_获取站内信中的用户.js']);
        }
        else if (obj.arr[3] == "js4") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户_90天没联系的买家发送推广站内信.js']);
        }
        else if (obj.arr[3] == "js5") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户_获取订单中的用户.js']);
        }
        else if (obj.arr[3] == "js6") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户_修复买家ID.js']);
        }
        else if (obj.arr[3] == "js7") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户_2.把【orderid】传入到【buyer】.js']);
        }
        else if (obj.arr[3] == "js08") {
            Tool.scriptArr(['admin/js/敦煌网/站内信/站内信帮助/index.js']);
        }
        else if (obj.arr[3] == "js09") {
            Tool.scriptArr(['admin/js/敦煌网/站内信/站内信帮助/修改.js']);
        }
        else if (obj.arr[3] == "js10") {
            Tool.scriptArr(['admin/js/敦煌网/敦煌站内信/站内信用户.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//买卖家消息/系统消息/平台公告/群发站内信
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//全部/询盘/订单/其它
            obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//来源账户
            obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//处理状态
            obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//消息状态
            obj.arr[10] = obj.arr[10] ? obj.arr[10] : "-_-20";//最近3个月
            obj.arr[11] = obj.arr[11] ? obj.arr[11] : "-_-20";//搜索字段
            obj.arr[12] = obj.arr[12] ? obj.arr[12] : "-_-20";//搜索关键词
            this.a02();
        }
    },
    a02: function () {
        let arr = this.b04();
        let str = '[\
        {\
            "size":20,\
            "count":<@count/>,\
            "Tab1":['+ arr[0] + '],\
            "Tab2":[<.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.isqa=0 ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.isqa=1 ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.isqa=2 ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.isqa=3 ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.isqa=4 ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.receiverread=0 and @.receiver=@.fromuser ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.senderread=0 and @.sender=@.fromuser ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.receiverMark=1 and @.receiver=@.fromuser ' + arr[1] + '\",\"count\")/>,\
            <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.senderMark=1 and @.sender=@.fromuser ' + arr[1] + '\",\"count\")/>],\
            "seller":[0'+ this.b06() + ']\
        }\
        <r:msg size=20 db="sqlite.dhgate" page=2 where=" where 1=1 '+ arr[1] + ' order by @.SendTime desc,@.id desc">,\
        {\
            "id":<:id/>,\
            "isqa":<:isqa/>,\
            "fromid":<:fromid/>,\
            "name":"<:name tag=js/>",\
            "PurchaseNote":"<:PurchaseNote tag=js/>",\
            "fromuser":"<:fromuser tag=js/>",\
            "fromuserid":"<:fromuserid/>",\
            "receiver":"<:receiver tag=js/>",\
            "receiverid":"<:recieverId/>",\
            "sender":"<:sender tag=js/>",\
            "senderid":"<:senderid/>",\
            "msgtype":"<:msgtype/>",\
            "msgreplycount":<:msgreplycount/>,\
            "Sendtime":"<:Sendtime/>",\
            "receiverRead":"<:receiverRead/>",\
            "receiverMark":"<:receiverMark/>",\
            "receiverStatus":"<:receiverStatus/>",\
            "senderRead":"<:senderRead/>",\
            "senderMark":"<:senderMark/>",\
            "senderStatus":"<:senderStatus/>"\
        }\
        </r:msg>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let li1 = "", html = '';
        for (let i = 1; i < arr.length; i++) {
            li1 = '<td>';
            if (arr[i].receiver.toLowerCase() == arr[i].fromuser.toLowerCase()) {
                if (arr[i].receiverRead == 1) { li1 += '<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.e01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',0)"></span>'; }
                else { li1 += '<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.e01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',1)"></span>'; }
                li1 += '</td><td>'
                if (arr[i].receiverMark == 1) { li1 += '<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.f01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',0)"></span>'; }
                else { li1 += '<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.f01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',1)"></span>'; }
                li1 += '</td><td nowrap="nowrap">'
                if (arr[i].receiverStatus == 1) { li1 += '回收站'; } else { li1 += '正常'; }
            }
            else {
                if (arr[i].senderRead == 1) { li1 += '<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.e01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',0)"></span>'; }
                else { li1 += '<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.e01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',1)"></span>'; }
                li1 += '</td><td>'
                if (arr[i].senderMark == 1) { li1 += '<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.f01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',0)"></span>'; }
                else { li1 += '<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.f01($(this),' + arr[i].fromid + ',' + arr[i].fromuserid + ',1)"></span>'; }
                li1 += '</td><td nowrap="nowrap">'
                if (arr[i].senderStatus == 1) { li1 += '回收站'; } else { li1 += '正常'; }
            }
            li1 += '</td>';
            html += '\
      <tr>\
        <td>'+ arr[i].fromuser + '</td>\
        <td>\
          '+ this.b02(arr[i].isqa) + '<hr/>\
          <input type="text" class="form-control form-control-sm" value="' + arr[i].PurchaseNote + '" onblur="fun.c03($(this),' + arr[i].id + ',\'PurchaseNote\',\'' + arr[i].PurchaseNote + '\')">\
        </td>\
        '+ li1 + '\
        <td nowrap="nowrap">'+ (arr[i].receiver.toLowerCase() == arr[i].fromuser.toLowerCase() ? arr[i].sender + '<hr/>' + arr[i].senderid : arr[i].receiver + '<hr/>' + arr[i].receiverid) + '</td>\
        <td class="left"><a href="javascript:" onclick="Tool.main(\'js01/' + arr[i].fromid + '\')">' + arr[i].name + '</a>【' + arr[i].msgreplycount + '】</td>\
        <td>'+ this.b03(arr[i].msgtype) + '</td>\
        <td nowrap="nowrap">' + Tool.js_date_time2(arr[i].Sendtime).replace(" ", "<br/>") + '</td>\
      </tr>'
        }
        html += '\
    <tr><td colspan="9"><button type="button" class="btn btn-sm btn-secondary" onclick="fun.a01()">*同步【已答待问】</button></td></tr>\
    <tr><td colspan="9">'+ Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        let html1 = Tool.header() + this.b01(arr[0]) + '\
      <div class="p-2">\
        <table class="table table-hover align-middle center">\
          <thead class="table-light">'+ this.b07(arr[0]) + '</thead>\
          <tbody>'+ html + '</tbody>\
        </table>\
      </div>'
        Tool.html(null, null, html1)
    },
    //////////////////////////////////////////////////
    b01: function (oo) {
        let ul = "";
        switch (obj.arr[5]) {
            case "-_-20": //买卖家消息
                ul = '\
      <ul class="makeHtmlTab">\
        <li onclick="Tool.main(\''+ obj.arr[3] + '\')" ' + (obj.arr[6] == "-_-20" ? 'class= "hover"' : '') + '>全部（' + oo.Tab1[0] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/%20/001\')" ' + (obj.arr[6] == "001" ? 'class= "hover"' : '') + '>询盘（' + oo.Tab1[1] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/%20/002\')" ' + (obj.arr[6] == "002" ? 'class= "hover"' : '') + '>订单（' + oo.Tab1[2] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/%20/003\')" ' + (obj.arr[6] == "003" ? 'class= "hover"' : '') + '>其它（' + oo.Tab1[3] + '）</li>\
      </ul>'; break;
            case "2"://系统消息
                ul = '\
      <ul class="makeHtmlTab">\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '\')"  ' + (obj.arr[6] == "-_-20" ? 'class= "hover"' : '') + '>全部（' + oo.Tab1[0] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/004\')"  ' + (obj.arr[6] == "004" ? 'class= "hover"' : '') + '>订单（' + oo.Tab1[1] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/005\')"  ' + (obj.arr[6] == "005" ? 'class= "hover"' : '') + '>产品（' + oo.Tab1[2] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/006\')"  ' + (obj.arr[6] == "006" ? 'class= "hover"' : '') + '>付款/退款（' + oo.Tab1[3] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/007\')"  ' + (obj.arr[6] == "007" ? 'class= "hover"' : '') + '>促销（' + oo.Tab1[4] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/008\')"  ' + (obj.arr[6] == "008" ? 'class= "hover"' : '') + '>账户（' + oo.Tab1[5] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/009\')"  ' + (obj.arr[6] == "009" ? 'class= "hover"' : '') + '>其它（' + oo.Tab1[6] + '）</li>\
      </ul>'; break;
            case "3"://平台公告
                ul = '\
      <ul class="makeHtmlTab">\
        <li onclick = "Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '\')" ' + (obj.arr[6] == "-_-20" ? 'class= "hover"' : '') + '>全部（' + oo.Tab1[0] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/010\')" ' + (obj.arr[6] == "010" ? 'class= "hover"' : '') + '>活动宣传（' + oo.Tab1[1] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/011\')" ' + (obj.arr[6] == "011" ? 'class= "hover"' : '') + '>政策通知（' + oo.Tab1[2] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/012\')" ' + (obj.arr[6] == "012" ? 'class= "hover"' : '') + '>商品营销（' + oo.Tab1[3] + '）</li>\
        <li onclick="Tool.main(\''+ obj.arr[3] + '/1/' + obj.arr[5] + '/013\')" ' + (obj.arr[6] == "013" ? 'class= "hover"' : '') + '>其它（' + oo.Tab1[4] + '）</li>\
      </ul>'; break;
        }

        let str = ul + '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[11] + '">' + this.b08(obj.arr[11]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c05(1)" value="1">主题</li>\
        <li class="dropdown-item pointer" onclick="fun.c05(2)" value="2">联系人</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c05(3)" value="3">采购备注</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c05(4)" value="4">采购链接</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[12] == "-_-20" ? "" : Tool.unescape(obj.arr[12])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
        return str;
    },
    b02: function (isqa) {
        let str = "";
        switch (isqa) {
            case 0: str = "无需处理"; break;
            case 1: str = "异常消息"; break;
            case 2: str = "已提问等待回答"; break;
            case 3: str = "已答待问"; break;
            case 4: str = "处理完成"; break;
            default: str = "未知：" + isqa;
        }
        return str
    },
    b03: function (msgtype) {
        let str = "";
        switch (msgtype) {
            case "001": str = "询盘"; break;
            case "002": str = "订单"; break;
            case "003": str = "其它"; break;
            case "004": str = "订单"; break;
            case "005": str = "产品"; break;
            case "006": str = "付款/退款"; break;
            case "007": str = "促销"; break;
            case "008": str = "账户"; break;
            case "009": str = "其它"; break;
            case "010": str = "活动宣传"; break;
            case "011": str = "政策通知"; break;
            case "012": str = "商品营销"; break;
            case "013": str = "其它"; break;
            default: str = "未知：" + msgtype;
        }
        return str;
    },
    b04: function () {
        let ul1 = "", where = "";
        switch (obj.arr[5]) {
            case "-_-20": //买卖家消息
                ul1 = "\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype in('001','002','003') and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='001' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='002' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='003' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>";
                where = " and @.msgtype in('001','002','003')";
                break;
            case "2"://系统消息
                ul1 = "\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype in('004','005','006','007','008','009') and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='004' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='005' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='006' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='007' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='008' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='009' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>";
                where = " and @.msgtype in('004','005','006','007','008','009')";
                break;
            case "3"://系统消息
                ul1 = "\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype in('010','011','012','013') and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='010' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='011' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='012' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='013' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='014' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>,\
      <.Db(\"sqlite.dhgate\",\"select count(1) as total from @.msg where @.msgtype='015' and ((@.receiverread=0 and @.receiver=@.fromuser) or (@.senderread=0 and @.sender=@.fromuser))\",\"count\")/>";
                where = " and @.msgtype in('010','011','012','013')";
                break;
        }
        if (obj.arr[6] != "-_-20") { where = " and @.msgtype=\'" + obj.arr[6] + "\'"; }
        if (obj.arr[7] != "-_-20") { where += " and @.fromuserid=" + obj.arr[7]; }
        if (obj.arr[8] != "-_-20") { where += " and @.isqa=" + obj.arr[8]; }
        switch (obj.arr[9]) {
            case "1": where += " and @.receiverRead=1 and @.receiver=@.fromuser"; break;
            case "2": where += " and @.senderRead=1 and @.sender=@.fromuser"; break;
            case "3": where += " and @.receiverRead=0 and @.receiver=@.fromuser"; break;
            case "4": where += " and @.senderRead=0 and @.sender=@.fromuser"; break;
            case "5": where += " and @.receiverMark=1 and @.receiver=@.fromuser"; break;
            case "6": where += " and @.senderMark=1 and @.sender=@.fromuser"; break;
            case "7": where += " and @.receiverMark=0 and @.receiver=@.fromuser"; break;
            case "8": where += " and @.receiverStatus=0 and @.receiver=@.fromuser"; break;
            case "9": where += " and @.receiverStatus=1 and @.receiver=@.fromuser"; break;
        }
        if (obj.arr[10] == "-_-20") {
            where += " and " + parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 90) / 1000) + "<@.Sendtime";
        }
        else {
            where += " and " + parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * obj.arr[10]) / 1000) + "<@.Sendtime";
        }
        if (obj.arr[12] != "-_-20") {
            switch (obj.arr[11]) {
                case "1": where += " and @.name like '%" + Tool.unescape(obj.arr[12]) + "%'"; break;//主题
                case "2": where += " and (:sender like '%" + Tool.unescape(obj.arr[12]) + "%' or @.receiver like '%" + Tool.unescape(obj.arr[12]) + "%')"; break;//联系人        
                case "3": where += " and @.PurchaseNote like '%" + Tool.unescape(obj.arr[12]) + "%'"; break;//采购备注
                case "4": where += " and @.PurchaseURL like '%" + Tool.unescape(obj.arr[12]) + "%'"; break;//采购链接
            }
        }
        return [ul1, where]
    },
    b06: function () {
        let str = '<r:seller size=50 db="sqlite.dhgate" where=" where @.binduserID=1 order by @.sort asc">,{"fromid":<:fromid/>,"UserName":"<:UserName/>"}</r:seller>'
        return str;
    },
    b07: function (oo) {
        let li1 = "", arr = oo.seller
        for (let i = 1; i < arr.length; i++) {
            li1 += '<Option value="' + arr[i].fromid + '" ' + (obj.arr[7] == arr[i].fromid ? 'selected="selected"' : '') + '>(' + i + ')' + arr[i].UserName + '</option>';
        }
        return '\
      <tr>\
      <th class="p-0"><Select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
      <Option value="-_-20">来源账户</Option>'+ li1 + '</Select></th>\
      <th class="p-0">\
      <select name="showMsgId" onchange="Tool.open(8,this.options[this.selectedIndex].value)" class="form-select">\
      <option value="-_-20">处理【状态/备注】</option>\
      <option value="0" ' + (obj.arr[8] == "0" ? 'selected="selected"' : '') + '>无需处理(' + oo.Tab2[0] + ')</option>\
      <option value="1" ' + (obj.arr[8] == "1" ? 'selected="selected"' : '') + '>异常消息(' + oo.Tab2[1] + ')</option>\
      <option value="2" ' + (obj.arr[8] == "2" ? 'selected="selected"' : '') + '>已提问【等待回答】(' + oo.Tab2[2] + ')</option>\
      <option value="3" ' + (obj.arr[8] == "3" ? 'selected="selected"' : '') + '>已回答【等待提问】(' + oo.Tab2[3] + ')</option>\
      <option value="4" ' + (obj.arr[8] == "4" ? 'selected="selected"' : '') + '>处理完成(' + oo.Tab2[4] + ')</option>\
      </select>\
    </th>\
    <th colspan="4" class="p-0">\
    <select name="showMsgId" onChange="Tool.open(9,this.options[this.selectedIndex].value)" class="form-select">\
      <option value="-_-20">消息状态/联系人</option>\
      <option value="1" ' + (obj.arr[9] == "1" ? 'selected="selected"' : '') + '>已读(接收者)</option>\
      <option value="2" ' + (obj.arr[9] == "2" ? 'selected="selected"' : '') + '>已读(发送者)</option>\
      <option value="3" ' + (obj.arr[9] == "3" ? 'selected="selected"' : '') + '>未读【' + oo.Tab2[5] + '】(接收者)</option>\
      <option value="4" ' + (obj.arr[9] == "4" ? 'selected="selected"' : '') + '>未读【' + oo.Tab2[6] + '】(发送者)</option>\
      <option value="5" ' + (obj.arr[9] == "5" ? 'selected="selected"' : '') + '>已标记【' + oo.Tab2[7] + '】(接收者)</option>\
      <option value="6" ' + (obj.arr[9] == "6" ? 'selected="selected"' : '') + '>已标记【' + oo.Tab2[8] + '】(发送者)</option>\
      <option value="7" ' + (obj.arr[9] == "7" ? 'selected="selected"' : '') + '>未标记(接收者)</option>\
      <option value="8" ' + (obj.arr[9] == "8" ? 'selected="selected"' : '') + '>正常(接收者)</option>\
      <option value="9" ' + (obj.arr[9] == "9" ? 'selected="selected"' : '') + '>回收站(接收者)</option>\
    </select>\
    </th>\
    <th class="left">主题</th>\
    <th class="w50">类型</th>\
    <th class="p-0">\
      <select name="beforeDate" onChange="Tool.open(10,this.options[this.selectedIndex].value)" class="form-select">\
      <option value="30" ' + (obj.arr[10] == "30" ? 'selected="selected"' : '') + '>最近1个月</option>\
      <option value="60" ' + (obj.arr[10] == "60" ? 'selected="selected"' : '') + '>最近2个月</option>\
      <option value="-_-20" ' + (obj.arr[10] == "-_-20" ? 'selected="selected"' : '') + '>最近3个月</option>\
      <option value="180" ' + (obj.arr[10] == "180" ? 'selected="selected"' : '') + '>最近6个月</option>\
      <option value="270" ' + (obj.arr[10] == "270" ? 'selected="selected"' : '') + '>最近9个月</option>\
      <option value="366" ' + (obj.arr[10] == "366" ? 'selected="selected"' : '') + '>最近12个月</option>\
      </select>\
    </th>\
    </tr>'
    },
    b08: function (val) {
        let name = "";
        switch (val) {
            case "1":
            case "-_-20":
                name = "主题"; break;
            case "2": name = "联系人"; break;
            case "3": name = "采购备注"; break;
            case "4": name = "采购链接"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    /////////////////////////////////////////////////
    c01: function (page) { obj.arr[4] = page; Tool.main(obj.arr.join("/")); },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(o.mode + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/%20/%20/%20/%20/%20/%20/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (This, id, L, V) {
        let val = This.val(), html = '';
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            if (L == "PurchaseStatus") {
                let oo = This.find("option:selected"); This.find("option").attr("selected", false); oo.attr("selected", true); html = This.html();//先选中，再取代码
                This.html("<option>加载加...</option>");
            }
            else { html = val; This.val("加载加..."); }
            let txt = "<r: tag=\"sql\">update @.msg set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
            Tool.ajax.a01(this, [This, this.c04, txt, 1, html]);
        }
    },
    c04: function (t, This) {
        if (t == "") {
            This[0].attr("disabled", false);
            if (This[1].indexOf('</option>') == -1) { This[0].val(This[1]); }
            else { This[0].html(This[1]); }
        } else { alert("出错：" + t) }
    },
    c05: function (val) {
        let name = this.b08("" + val)
        $("#Field").html(name).val(val)
    },
    ////////////////////////////////////////////////////
    e01: function (This, msgid, fromid, Read) {
        This = This.parent();
        This.html("<img src='/" + o.path + "admin/img/loading-16x16.gif' height='12'>");
        let str = '{<r:seller db="sqlite.dhgate" size=1 where=" where @.fromid=' + fromid + '">"token":<:token tag=0/>,"fromid":<:fromid/>,"username":"<:UserName/>","password":"<:password/>"</r:seller>}'
        Tool.ajax.a01(1, msgid, this.e02, str, this, [Read, This])
    },
    e02: function (oo, arr) {
        this.obj = oo;
        this.obj.msg = { isRead: arr[0], msgIds: arr[1], This: arr[2] };
        F1.c01(this, this.e03);
    },
    e03: function () {
        if (this.obj.msg.isRead == 0) {
            this.obj.msg.This.html('<span class="inb-smcheck" title="当前【未读】\n点击设置【已读】" onclick="fun.e01($(this),' + this.obj.msg.msgIds + ',' + this.obj.fromid + ',1)"></span>');
        }
        else {
            this.obj.msg.This.html('<span class="hasread" title="当前【已读】\n点击设置【未读】" onclick="fun.e01($(this),' + this.obj.msg.msgIds + ',' + this.obj.fromid + ',0)"></span>');
        }
    },
    f01: function (This, msgid, fromid, Mark) {
        This = This.parent();
        This.html("<img src='/" + o.path + "admin/img/loading-16x16.gif' height='12'>");
        let str = '{<r:seller db="sqlite.dhgate" size=1 where=" where @.fromid=' + fromid + '">token:<:token tag=0/>,fromid:<:fromid/></r:seller>}'
        Tool.ajax.a01([This, fromid, this.f02, str, this, 1, msgid, Mark])
    },
    f02: function (t, arr) {
        eval("this.obj=" + t);
        F1.a01(this, this.f03, arr);
    },
    f03: function (arr)//接收者和发送者的【已读/未读】
    {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.message.status.update&timestamp=" + new Date().getTime() + "&v=2.0&msgIds=" + arr[1] + "&markStatus=" + arr[3]
        Tool.ajax.a01("<.WebClientPost(" + escape(URL) + ")/>", 1, this.f04, this, arr)
    },
    f04: function (t, arr) {
        if (t == "") { alert("返回值为空，网络不好。"); }
        else if (t.indexOf(":\"OK\",") > 0) {
            let str = '<r: db="sqlite.dhgate">update @.msg set @.receiverMark=' + arr[3] + ',:senderMark=' + arr[3] + ' where @.fromid=' + arr[1] + '</r:>'
            Tool.ajax.a01(str, 1, this.f05, this, arr)//接收者和发送者的【已标记/未标记】
        } else { alert("回复站内信失败，请与管理员联系." + t); }
    },
    f05: function (t, arr) {
        if (t == "") {
            if (arr[3] == 0) {
                arr[0].html('<span class="inb-smmark" title="当前【未标记】\n点击设置【已标记】" onclick="fun.f01($(this),' + arr[1] + ',' + arr[2] + ',1)"></span>');
            }
            else {
                arr[0].html('<span class="hasmarked" title="当前【已标记】\n点击设置【未标记】" onclick="fun.f01($(this),' + arr[1] + ',' + arr[2] + ',0)"></span>');
            }
        } else { alert(t); }
    },
}
fun.a01();