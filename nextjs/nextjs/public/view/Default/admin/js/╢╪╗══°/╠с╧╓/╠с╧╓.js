'use strict';
var fun =
{
    obj: {},
    a01: function () {
        let urlArr
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//来源账户
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//提现状态
        if (obj.arr[3] == "js01") {
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                'admin/js/敦煌网/提现/人民币提现.js'
            ]
            Tool.scriptArr(urlArr);
        } else { this.a02(); }

    },
    a02: function () {
        let str = '[\
    {\
    "size":30,\
    "count":<@count/>,\
    "count2":"<.Db(sqlite.dhgate,select count(1) from @.seller where @.Cash1>15,count)/>",\
    "seller":\
    [{}\
      <r:seller db="sqlite.dhgate" size=50 where=" where @.binduserID=1 order by @.sort asc">\
      ,{"fromid":<:fromid/>,"UserName":"<:UserName/>","name":"<:name/>","industry":"<:industry/>","hide":<:hide/>}\
      </r:seller>\
    ]\
    }\
    <r:withdraw db="sqlite.dhgate" size=30 page=2 where=" where 1=1 '+ this.b03() + '">\
    ,{\
      "id":<:id/>,\
      "fromid":<:fromid/>,\
      "amount":<:amount/>,\
      "rate":<:rate/>,\
      "Fee":<:Fee/>,\
      "IsReceived":<:IsReceived/>,\
      "Money":<:Money/>,\
      "note":"<:note tag=js/>",\
      "addtime":<:addtime/>\
    }\
    </r:withdraw>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ i + '</td>\
        <td>'+ this.b02(arr[0].seller, 2, arr[i].fromid) + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
        <td>US $'+ arr[i].amount + '</td>\
        <td>'+ arr[i].rate + '</td>\
        <td>US $'+ arr[i].Fee + '</td>\
        <td>RMB ￥'+ arr[i].Money + '</td>\
        <td class="p-0">'+ this.b04(arr[i].IsReceived, arr[i].id) + '</td>\
        <td>'+ this.b02(arr[0].seller, 3, arr[i].fromid) + '</td>\
        <td class="left" onclick="fun.c05(\''+ arr[i].note + '\');" title="点击设置【该页该卡背景】">' + arr[i].note + '</td>\
      </tr>'
        }
        html += '\<tr><td colspan="10" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = '\
    <header class="panel-heading">提现管理</header>\
    <div class="p-2">\
      <table class="table table-hover center">\
      <thead class="table-light">'+ this.b01(arr[0]) + '</thead>\
      <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function (arr) {
        let str = '\
    <tr>\
      <th style="padding-left: 30px;position: relative;">'+ this.b07(arr.count2) + '编号</th>\
      <th class="p-0"><select onChange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select"><option value="-_-20">来源账户</option>'+ this.b02(arr.seller, 1) + '</select></th>\
      <th>提现时间</th>\
      <th>提现金额</th>\
      <th>当日汇率</th>\
      <th>手续费</th>\
      <th>实际提取金额</th>\
      <th class="p-0">'+ this.b06() + '</th>\
      <th>提现人</th>\
      <th class="left">备注</th>\
    </tr>'
        return str
    },
    b02: function (arr, mode, fromid) {
        let str = ""
        for (let i = 1; i < arr.length; i++) {
            if (mode == 1) {
                str += '\
        <Option value="'+ arr[i].fromid + '" ' + (obj.arr[5] == arr[i].fromid ? 'selected="selected"' : '') + '>\
          ('+ i + ')' + arr[i].UserName + '\
        </option>';
            }
            else if (mode == 2 && fromid == arr[i].fromid) {
                str = arr[i].UserName; break;
            }
            else if (mode == 3 && fromid == arr[i].fromid) {
                str = arr[i].name; break;
            }
        }
        return str;
    },
    b03: function () {
        let str = ""
        str += obj.arr[5] == "-_-20" ? "" : " and @.fromid=" + obj.arr[5];//来源账户
        str += obj.arr[6] == "-_-20" ? "" : " and @.IsReceived=" + obj.arr[6];//提现状态
        return str + " order by @.id desc";
    },
    b04: function (IsReceived, id) {
        let str = '\
    <select onchange="fun.c02(this.options[this.selectedIndex].value,'+ id + ',$(this))" class="form-select">\
    '+ this.b05(IsReceived) + '</select>'
        return str;
    },
    b05: function (IsReceived) {
        return '\
    <option value="0"'+ (0 == IsReceived ? ' selected="selected"' : '') + '>提现中</option>\
    <option value="1"'+ (1 == IsReceived ? ' selected="selected"' : '') + '>提现成功</option>\
    <option value="2"'+ (2 == IsReceived ? ' selected="selected"' : '') + '>提现失败</option>\
    <option value="3"'+ (3 == IsReceived ? ' selected="selected"' : '') + '>提现成功,待确认</option>\
    <option value="4"'+ (4 == IsReceived ? ' selected="selected"' : '') + '>提现失败,待确认</option>'
    },
    b06: function () {
        let str = '\
    <select onChange="Tool.open(6,this.options[this.selectedIndex].value)" class="form-select">\
     <option value="-_-20">提现状态</option>\
     '+ this.b05(obj.arr[6]) + '\
    </select>'
        return str;
    },
    b07: function (count2) {
        return '\
    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
			<li onClick="Tool.open4(\'js01\');"><a class="dropdown-item pointer">*人民币提现（'+ count2 + '）</a></li>\
    </ul>'
    },
    c01: function () { },
    c02: function (val, id, oo) {
        oo = oo.parent()
        oo.html('修改中...')
        let str = '<r: db="sqlite.dhgate">update @.withdraw set @.IsReceived=' + val + ' where @.id=' + id + '</r:>'
        Tool.ajax.a01(1, id, this.c03, str, this, [val, oo])
    },
    c03: function (t, oo) {
        if (t == "") {
            oo[2].html(this.b04(oo[0], oo[1]));
        }
        else { alert("出错：" + t); }
    },
    c04: function () {
    },
    c05: function (txt) {
        let str = "<.Db(sqlite.dhgate,select sum(@.Money) from @.withdraw where @.IsReceived=0 and @.note=\'" + Tool.Trim(txt) + "\',count)/>"
        Tool.ajax.a01(str, 1, this.c06, this, txt)
    },
    c06: function (t, txt) {
        $("tr").css("background", "").each(function () {
            if ($(this).text().indexOf(txt) != -1) {
                $(this).css("background", "antiquewhite");
                $(this).children('[onclick]').html(txt + "【该卡合计未到账：" + t + "】")
            }
        });
    }
}
fun.a01()