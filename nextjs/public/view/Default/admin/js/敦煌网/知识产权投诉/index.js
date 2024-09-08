'use strict';
var fun =
{
    obj: {},
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let path = "admin/js/敦煌网/知识产权投诉/"
        switch (obj.arr[3]) {
            case "js01": Tool.scriptArr(['admin/js/common_img/index.js,' + path + '获取【知识产权投诉】js']); break;
            case "js02": Tool.scriptArr([path + '将【知识产权名称】做为品牌进行禁限js']); break;
            case "js03": Tool.scriptArr([path + '获取【知识产权类型】js']); break;
            default:
                obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
                obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
                obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
                obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//DH卖家账户
                obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//知识产权类型
                this.a02();
        }
    },
    a02: function () {
        let str = '[\
    {\
			"seller":[0\
			<r:seller size=50 db="sqlite.dhgate" where=" order by @.sort asc,@.id asc">,\
			 {\
				"fromid":<:fromid/>,\
			 	"UserName":"<:UserName/>"\
			 }\
			</r:seller>\
			],\
      "size":20,\
      "count":<@count/>\
    }\
    <r:beComplained size=20 db="sqlite.dhgate" page=2 where="'+ this.b10() + ' order by @.createTime desc">,\
		{\
			"itemcode":<:itemcode/>,\
			"sellerID":<:sellerID/>,\
			"sellerUser":"<:sellerUser/>",\
			"reportCompanyName":<:reportCompanyName tag=json/>,\
			"email":<:email tag=json/>,\
			"completeTime":<:completeTime/>,\
			"reason":<:reason tag=json/>,\
			"PropertyProveName":<:PropertyProveName tag=json/>,\
			"PropertyProveUrl":<:PropertyProveUrl tag=json/>,\
			"authorizationProveName":<:authorizationProveName tag=json/>,\
			"authorizationProveUrl":<:authorizationProveUrl tag=json/>,\
			"otherProveName":<:otherProveName tag=json/>,\
			"otherProveUrl":<:otherProveUrl tag=json/>,\
			"PropertyNumber":<:PropertyNumber tag=json/>,\
			"PlaceRegistration":<:PlaceRegistration tag=json/>,\
			"PropertyType":<:PropertyType tag=json/>,\
			"ReasonComplaint":<:ReasonComplaint tag=json/>,\
			"intelRightName":<:intelRightName tag=json/>,\
			"otherEmail":<:otherEmail tag=json/>,\
			"otherPhone":<:otherPhone tag=json/>,\
			"complainStatus":<:complainStatus/>,\
			"complainResult":<:complainResult/>,\
			"createTime":<:createTime/>\
		}\
    </r:beComplained>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (oo) {
        let html = ""
        for (let i = 1; i < oo.length; i++) {
            html += '\
      <tr>\
        <td>'+ oo[i].itemcode + '</td>\
        <td class="p-0">'+ this.b15(oo[i].sellerUser, oo[i].createTime, oo[i].completeTime) + '</td>\
        <td class="p-0">'+ this.b04(oo[i].reportCompanyName, oo[i].email, oo[i].intelRightName) + '</td>\
        <td class="p-0">'+ this.b11(oo[i].complainStatus, oo[i].complainResult, oo[i].reason) + '</td>\
        <td class="p-0">'+ this.b14(oo[i].PropertyType, oo[i].ReasonComplaint, oo[i].PlaceRegistration, oo[i].PropertyNumber) + '</td>\
        <td class="p-0">'+ this.b12(oo[i].PropertyProveUrl, oo[i].PropertyProveName, oo[i].authorizationProveUrl, oo[i].authorizationProveName, oo[i].otherProveUrl, oo[i].otherProveName) + '</td>\
        <td class="p-0">'+ this.b13(oo[i].otherEmail, oo[i].otherPhone) + '</td>\
      </tr>';
        }
        html += '<tr><td colspan="7" class="left">' + Tool.page(oo[0].count, oo[0].size, 4) + '</td></tr>'
        html = '\
    <header class="panel-heading">知识产权投诉</header>\
    <div class="p-2">\
			'+ this.b08() + '\
      <table class="table table-hover">\
      <thead class="table-light">'+ this.b01(oo[0]) + '</thead>\
      <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function (oo) {
        let str = '\
    <tr>\
      <th style="padding-left: 30px;position: relative;" class="w100">'+ this.b02() + '产品编号</th>\
      <th class="p-0">'+ this.b07(oo.seller, obj.arr[7]) + '</th>\
      <th>投诉人/联系邮箱/知识产权名称</th>\
      <th>投诉状态/投诉结果/裁决原因</th>\
      <th class="p-0">'+ this.b16(obj.arr[8]) + '</th>\
      <th>知识产权证明/授权证明/其他文件</th>\
      <th>其它投诉信息</th>\
    </tr>'
        return str
    },
    b02: function () {
        return '\
    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
      <li onClick="Tool.open4(\'js01\');"><a class="dropdown-item pointer">*获取【知识产权投诉】</a></li>\
      <li onClick="Tool.open4(\'js02\');" title="结果在【速卖通_采集箱_商品_状态_疑似侵权】和【速卖通_采集箱_商品_状态_禁卖品牌】中展示。\n注：【禁卖品牌】高于【疑似侵权】。"><a class="dropdown-item pointer">将【知识产权名称】做为品牌进行禁限</a></li>\
    </ul>'
    },
    b03: function (arr, upuserid) {
        let str = "未知"
        for (let i = 1; i < arr.length; i++) {
            if (upuserid == arr[i].fromid) { str = arr[i].UserName; break; }
        }
        return str
    },
    b04: function (reportCompanyName, email, intelRightName) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="投诉人">'+ reportCompanyName + '</td></tr>\
      <tr><td title="联系邮箱">'+ email + '</td></tr>\
      <tr><td title="知识产权名称">'+ intelRightName + '</td></tr>\
    </table>'
    },
    b05: function (complainStatus) {
        //投诉状态（2：等待被投诉方处理；3:等待投诉方处理;4等待DHgate裁决；5：投诉完结）
        let str = "未知:" + complainStatus;
        if (complainStatus == 5) {
            str = "投诉完结";
        }
        return str;
    },
    b06: function (complainResult) {
        //投诉结果（4：投诉成功；7：投诉失败）
        let str = "未知:" + complainResult;
        if (complainResult == 4) {
            str = "投诉成立,产品已处理";
        } else if (complainResult == 7) {
            str = "投诉不成立，产品正常";
        }
        return str;
    },
    b07: function (arr, userid) {
        let li4 = ""
        for (let i = 1; i < arr.length; i++) {
            li4 += '<option value="' + arr[i].fromid + '" ' + (userid == arr[i].fromid ? 'selected="selected"' : '') + '>' + i + '.' + arr[i].UserName + '</option>';
        }
        return '<select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select"><option value="-_-20">敦煌卖家账户</option>' + li4 + '</select>'
    },
    b08: function () {
        return '\
    <div class="input-group w-50 mb-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b09(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">知识产权名称</li>\
        <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">投诉人</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">联系邮箱</a></li>\
        <li class="dropdown-item pointer" onclick="fun.c01(4)" value="4">产品编号</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>'
    },
    b09: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "知识产权名称"; break;
            case "2": name = "投诉人"; break;
            case "3": name = "联系邮箱"; break;
            case "4": name = "产品编号"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b10: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.intelRightName like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//知识产权名称
                case "2": arr.push("@.reportCompanyName like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//投诉人
                case "3": arr.push("@.email like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//联系邮箱
                case "4": arr.push("@.itemcode=" + Tool.unescape(obj.arr[6])); break;//产品编号
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.sellerID=" + obj.arr[7]) }
        if (obj.arr[8] != "-_-20") { arr.push("@.PropertyType=" + Tool.rpsql(Tool.unescape(obj.arr[8]))); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b11: function (complainStatus, complainResult, reason) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="投诉状态">'+ this.b05(complainStatus) + '</td></tr>\
      <tr><td title="投诉结果">'+ this.b06(complainResult) + '</td></tr>\
      <tr><td title="裁决原因">'+ reason + '</td></tr>\
    </table>'
    },
    b12: function (PropertyProveUrl, PropertyProveName, authorizationProveUrl, authorizationProveName, otherProveUrl, otherProveName) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="知识产权证明"><a href = "'+ PropertyProveUrl + '" target = "_blank" > ' + PropertyProveName + '</a></td></tr>\
      <tr><td title="授权证明"><a href = "'+ authorizationProveUrl + '" target = "_blank" > ' + authorizationProveName + '</a>&nbsp;</td></tr>\
      <tr><td title="其他文件"><a href = "'+ otherProveUrl + '" target = "_blank" > ' + otherProveName + '</a>&nbsp;</td></tr>\
    </table>'
    },
    b13: function (otherEmail, otherPhone) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="联系邮箱">'+ otherEmail + '</td></tr>\
      <tr><td title="联系电话">'+ otherPhone + '</td></tr>\
    </table>'
    },
    b14: function (PropertyType, ReasonComplaint, PlaceRegistration, PropertyNumber) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="知识产权类型">'+ PropertyType + '</td></tr>\
      <tr><td title="投诉原因">'+ ReasonComplaint + '</td></tr>\
      <tr><td title="注册地">'+ PlaceRegistration + '</td></tr>\
      <tr><td title="知识产权编号">'+ PropertyNumber + '</td></tr>\
    </table>'
    },
    b15: function (itemcode, createTime, completeTime) {
        return '\
    <table class="table mb-0 table-bordered">\
      <tr><td title="敦煌卖家账户">'+ itemcode + '</td></tr>\
      <tr><td title="投诉日期">'+ Tool.js_date_time2(createTime) + '</td></tr>\
      <tr><td title="完成时间">'+ Tool.js_date_time2(completeTime) + '</td></tr>\
    </table>'
    },
    b16: function (val) {
        let li4 = '<option value="-1">获取【知识产权类型】</option>';
        let arr = config.beComplained_PropertyType;
        for (let i = 0; i < arr.length; i++) {
            li4 += '<option  value="' + arr[i][0] + '" ' + (Tool.unescape(val) == arr[i][0] ? 'selected="selected"' : '') + '>' + arr[i][0] + "（" + arr[i][1] + "）" + '</option>'
        }
        return '<select onChange="fun.c03(this.options[this.selectedIndex].value)" class="form-select"><option value="-_-20">知识产权类型</option>' + li4 + '</select>'
    },
    c01: function (val) {
        let name = this.b09("" + val)
        $("#Field").html(name).val(val)
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = Tool.escape(searchword)
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        if (val == "-1") {
            Tool.open4("js03");
        }
        else {
            Tool.open(8, Tool.escape(val));
        }
    }

}
fun.a01()