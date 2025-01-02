'use strict';
var fun =
{
    token: "", obj: {},
    a01: function () {
        let html = '\
        <r:seller db="sqlite.dhgate" size=1 where=" where @.fromid='+ obj.arr[4] + '">\
        {\
          "username":"<:username/>",\
          "password":"<:password/>",\
          "name":"<:name/>",\
          "APPKEY":"<:APPKEY/>",\
          "APPSECRET":"<:APPSECRET/>",\
          "industry":"<:industry/>",\
          "shippingModel":<:shippingModel/>,\
          "afterSaleID":"<:afterSaleID/>",\
          "Group":<:Group/>,\
          "token":<:token tag=0/>,\
          "SizeTemplate":<:SizeTemplate/>,\
          "fromid":<:fromid/>,\
          "upmode":<:upmode/>,\
          "time1":<:time1/>,\
          "time2":<:time2/>,\
          "time3":<:time3/>,\
          "time4":<:time4/>,\
          "time5":<:time5/>\
        }</r:seller>'
        Tool.ajax.a01(html, 1, this.a02, this)
    },
    a02: function (oo) {
        this.obj = oo;
        if (!oo.upmode.types) { oo.upmode.types = ""; }
        let html = '\
    <header class="panel-heading"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>卖家账户 -&gt; 修改</header>\
    <div class="p-2">\
      <ul class="makeHtmlTab">\
        <li class="hover" onclick="fun.c28($(this),1)">基础信息</li>\
        <li onclick="fun.c28($(this),2)">运费模板</li>\
        <li onclick="fun.c28($(this),3)">产品分组</li>\
      </ul>\
      <table class="table table-hover align-middle" id="div1">\
        <tbody>\
        <tr>\
          <td class="w150 right">用户名：</td>\
          <td class="w350"><input type="text" class="form-control" value="'+ this.obj.username + '" onblur="fun.c01($(this),\'username\',\'' + this.obj.username + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">密码：</td>\
          <td><input type="text" class="form-control" value="'+ this.obj.password + '" onblur="fun.c01($(this),\'password\',\'' + this.obj.password + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">App Key：</td>\
          <td><input type="text" class="form-control" value="'+ this.obj.APPKEY + '" onblur="fun.c01($(this),\'APPKEY\',\'' + this.obj.APPKEY + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">App Secret：</td>\
          <td><input type="text" class="form-control" value="'+ this.obj.APPSECRET + '" onblur="fun.c01($(this),\'APPSECRET\',\'' + this.obj.APPSECRET + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">提现人：</td>\
          <td><input class="form-control" type="text" value="'+ this.obj.name + '" onblur="fun.c01($(this),\'name\',\'' + this.obj.name + '\')"></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">按类目上传：</td>\
          <td colspan="2"><button type="button" class="btn btn-outline-secondary" id="uptype" onclick="fun.c14($(this),\''+ oo.upmode.types + '\');">' + (oo.upmode.types ? oo.upmode.typesname : '未选择') + '</button></td>\
        </tr>\
        <tr>\
          <td class="right">行业：</td>\
          <td>'+ this.obj.industry + ' 类（' + this.b04(this.obj.industry) + '）</td>\
          <td></td>\
        </tr>\
        <tr>\
          <td class="right">售后模板ID：</td>\
          <td>'+ oo.afterSaleID + '</td>\
          <td style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-c16"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown-c16">\
              <li><a class="dropdown-item pointer" onclick="fun.c16()">获取【售后模板ID】</a></li>\
            </ul>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">尺码模板：</td>\
          <td>'+ this.b05(oo.SizeTemplate) + '</td>\
          <td style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-d01"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown-c16">\
              <li><a onclick=\"fun.d01()\" class="dropdown-item pointer">获取【尺码模板】</a></li>\
            </ul>\
          </td>\
        </tr>\
        <tr>\
          <td class="right">token：<br/><button type="button" class="btn btn-outline-secondary" onclick="fun.c29();">清除token</button></td>\
          <td colspan="2"><textarea rows="7" disabled="disabled" class="form-control" onblur="fun.c01($(this),\'token\',0)">'+ JSON.stringify(oo.token, null, 2) + '</textarea></td>\
        </tr>\
    <tr>\
    <td class="right">店铺活动到期时间：</td>\
    <td colspan="2" class="p-0">\
		<table class="table mb-0 center">\
			<tr><th class="w200 right">活动名称</th><th class="w170">活动到期时间</th><th class="w70">天数</th><th></th></tr>\
			<tr>\
				<td class="right">拼团到期时间：</td><td>'+ Tool.js_date_time2(oo.time1) + '</td><td>' + Tool.datedifference(oo.time1 * 1000, false) + '</td>\
				<td class="p-0 left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c12(\'time1\');">清除时间</button></td>\
			</tr>\
			<tr>\
				<td class="right">限时限量到期时间：</td><td>'+ Tool.js_date_time2(oo.time2) + '</td><td>' + Tool.datedifference(oo.time2 * 1000, false) + '</td>\
				<td class="p-0 left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c12(\'time2\');">清除时间</button></td>\
			</tr>\
			<tr>\
				<td class="right">全店铺打折到期时间：</td><td>'+ Tool.js_date_time2(oo.time3) + '</td><td>' + Tool.datedifference(oo.time3 * 1000, false) + '</td>\
				<td class="p-0 left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c12(\'time3\');">清除时间</button></td>\
			</tr>\
			<tr>\
				<td class="right">全店铺满立减到期时间：</td><td>'+ Tool.js_date_time2(oo.time4) + '</td><td>' + Tool.datedifference(oo.time4 * 1000, false) + '</td>\
				<td class="p-0 left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c12(\'time4\');">清除时间</button></td>\
			</tr>\
			<tr>\
				<td class="right">店铺优惠券到期时间：</td><td>'+ Tool.js_date_time2(oo.time5) + '</td><td>' + Tool.datedifference(oo.time5 * 1000, false) + '</td>\
				<td class="p-0 left"><button type="button" class="btn btn-outline-secondary" onclick="fun.c12(\'time5\');">清除时间</button></td>\
			</tr>\
		</table>\
		</td>\
    </tr>\
      </tbody>\
    </table>\
    <table id="div2" class="table table-hover align-middle center" style="display: none;">'+ this.b01(oo.shippingModel) + '</table>\
    <table id="div3" class="table table-hover align-middle center" style="display: none;">'+ this.b02(this.obj.Group) + '</table>\
    </div>'
        Tool.html(null, null, html);
    },
    b01: function (arr) {
        let html = "", li1 = "", li2 = "", li3 = ""
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].shopid) {
                li1 = '\
        <div class="custom-control custom-checkbox">\
          <input type="checkbox" class="custom-control-input" title=\"按【运费模板】上传\" value="'+ arr[i].modelName + '" ' + this.b03(arr[i].modelName) + ' name="upshop" id="shippingTempId-' + arr[i].modelName + '" onchange=\"fun.c06()\">\
          <label class="custom-control-label" for="shippingTempId-'+ arr[i].modelName + '">' + arr[i].upNum2 + '</label>\
        </div>'
                li2 = '\
				<td>'+ (arr[i].upNum2 ? li1 : "") + '</td>\
				<td>'+ arr[i].upNum4 + '</td>\
				<td>'+ arr[i].upNum5 + '</td>\
				<td><a href=\"https://www.aliexpress.com/store/'+ arr[i].shopid + '/search" target="_blank">' + arr[i].shopid + '</a></td>\
        <td class="left" style="padding-left: 30px;position: relative;">\
          <button class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].shopid + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].shopid + '"></li>\
            <li><a class="dropdown-item pointer" onclick="fun.c04('+ arr[i].shopid + ',1)">审核该店</a></li>\
            <li><a class="dropdown-item pointer" onclick="fun.c15('+ arr[i].shopid + ')">运费模板_查看</a></li>\
            <li><a class="dropdown-item pointer" onclick=\'fun.c13($(this),"'+ arr[i].modelName + '","' + arr[i].shippingTempId + '")\'>查看类目</a></li>\
            <li><a class="dropdown-item pointer" onclick=\'fun.c08("'+ arr[i].shippingTempId + '")\' title=\"针对该模板已上传的数据的设置\">设置【需要更新】</a></li>\
            <li><a class="dropdown-item pointer" onclick=\'fun.h01("'+ arr[i].shippingTempId + '");\'>删除模板数据</a></li>\
          </ul>\
        </td>'
            }
            else {
                li2 = (arr[i].modelName == "新手运费模板" ? '<td colspan="6" class="left"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="fun.h01(\'' + arr[i].shippingTempId + '\');">删除模板数据</button></td>' : '<td colspan="6"></td>');
            }
            li3 += "\
      <tr class=\"list-group-item-action\">\
      <td>"+ (i + 1) + "</td>\
			<td>"+ arr[i].modelName + "</td>\
      <td>"+ arr[i].shippingTempId + "</td>\
			<td>"+ (arr[i].upNum1 ? arr[i].upNum1 : 0) + "</td>\
      <td>"+ (arr[i].upNum3 ? arr[i].upNum3 : 0) + "</td>" + li2 + "</tr>"
        }
        html = '\
    <thead class="table-light">\
      <tr>\
        <th class=\"w50\">编号</th>\
        <th class=\"w250\">模板编码</th>\
        <th class=\"w300\">模板ID</th>\
        <th class=\"w60\" title=\"总共上传的数量\">共上传</th>\
        <th class=\"w60\" title=\"上传的数量里，有多少已下架\">已下架</th>\
        <th class=\"w60\">可上传</th>\
        <th class=\"w60\">非正常</th>\
        <th class=\"w60\">总数量</th>\
        <th>店铺ID</th>\
      </tr>\
    </thead>\
    <tbody>'+ li3 + '</tbody>'
        return html
    },
    b02: function (obj2) {
        let html = "", li1 = "";
        for (let i = 1; i < obj2.length; i++) {
            if (!obj2[i].typename) { obj2[i].typename = ""; }
            li1 = '\
      <div class="custom-control custom-checkbox">\
        <input type="checkbox" class="custom-control-input" title=\按【剩余店铺】上传\" value="'+ obj2[i].remark + '" ' + this.b03(obj2[i].remark) + ' name="upshop" id="ch-' + i + '" onchange=\"fun.c06()\">\
        <label class="custom-control-label" for="ch-'+ i + '">' + obj2[i].Num3 + '</label>\
      </div>'
            html += "\
      <tr class=\"list-group-item-action\">\
        <td>"+ (obj2[i].isleaf == "False" ? "<a href=\"javascript:\" class=\"Mo MoA\" onclick=\"fun.f01($(this),'" + obj2[i].groupId + "')\"></a>" : "<a class=\"Mo\"></a>") + i + "</td>\
        <td>"+ obj2[i].groupName + "（" + obj2[i].groupEnName + "）</td>\
        <td>"+ (obj2[i].Num1 ? obj2[i].Num1 : "") + "</td>\
        <td>"+ (obj2[i].typename ? obj2[i].typename + obj2[i].Num4 : "") + "</td>\
        <td>"+ (obj2[i].Num2 ? obj2[i].Num2 : "") + "</td>\
        <td colspan=\"2\">"+ (obj2[i].Num3 ? li1 : "") + "</td>\
			</tr>"
        }
        html = '\
    <thead class="table-light">\
    <tr>\
      '+ this.b06() + '\
      <th style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-c24"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown-c24">\
          <li><a class="dropdown-item pointer" onclick="fun.c24()">获取【产品分组】</a></li>\
          <li><a class="dropdown-item pointer" onclick="Tool.open4(\'js25\')">*删除空分组</a></li>\
          <li><a class="dropdown-item pointer" onclick=\"fun.l01()\">*按当前分组排序</a></li>\
        </ul>\
      </th>\
    </tr>\
    </thead>\
    <tbody class="left">'+ html + '</tbody>'
        return html;
    },
    b03: function (id) {
        return JSON.stringify(this.obj.upmode).indexOf('"' + id + '"') != -1 ? 'checked="checked"' : "";
    },
    b04: function (val) {
        let str = ""
        switch (val) {
            case "A": str = "计算机和网络\n手机和手机附件\n消费类电子\n数码相机、摄影器材\n电玩游戏\n安全与监控\n家用电器"; break;
            case "B": str = "服装"; break;
            case "C": str = "表\n珠宝\n时尚配件"; break;
            case "D": str = "鞋类及鞋类辅料\n箱包及箱包辅料"; break;
            case "E": str = "婚纱礼服"; break;
            case "F": str = "健康与美容\n发制品"; break;
            case "G": str = "母婴用品\n玩具与礼物"; break;
            case "H": str = "运动与户外产品\n战术装备"; break;
            case "I": str = "家居与花园\n商业及工业"; break;
            case "J": str = "照明灯饰"; break;
            case "K": str = "汽车、摩托车"; break;
            case "L": str = "乐器"; break;
            case "M": str = "其他产品"; break;
            case "N": str = "食品饮料"; break;
            default: str = "未知"
        }
        return str;
    },
    b05: function (oo) {
        let str = ""
        if (oo.type) {
            str = '<div class="Title Tul center">模板类目：' + oo.type + '</div>\
      <ul class="Tul Title center">\
        <li class="w150">模板名称</li>\
        <li>模板ID</li>\
      </ul>'
            for (let i = 0; i < oo.SizeTemplate.length; i++) {
                str += '<ul class="Tul list-group-item-action center">\
        <li class="w150">'+ oo.SizeTemplate[i].templateNameCn + '</li>\
        <li>'+ oo.SizeTemplate[i].sizeTemplateId + '</li>\
        </ul>'
            }
        }
        return str;
    },
    b06: function () {
        return '\
    <th class="w70">编号</th>\
    <th class="left">分组名称</th>\
    <th class="w80">组内数量</th>\
    <th class="left">绑定分类</th>\
    <th class="w80">剩余商品</th>\
    <th class="w80">剩余店铺</th>'
    },
    c01: function (This, L, V) {
        let val = This.val();
        if (val != V && !This.attr("disabled")) {
            This.val("加载加...");
            This.attr("disabled", true);
            let txt = '""<r: db="sqlite.dhgate">update @.seller set @.' + L + '=\'' + val + '\' where @.fromid=' + obj.arr[4] + '</r:>'
            Tool.ajax.a01(txt, 1, this.c02, this, [This, val]);
        }
    },
    c02: function (t, This) {
        if (t == "") { This[0].attr("disabled", false); This[0].val(This[1]); }
        else { alert("出错：" + t); }
    },
    c03: function () {
    },
    c04: function (A, B) {
        Tool.main('/js21/' + A + '/' + B);
    },
    c05: function (ids) {
        //obj.arr[4]        账号ID
        obj.arr[5] = ids;   //类目ID
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改_一键创建分组.js']);
    },
    c06: function () {
        let upmode = { shop: [], type: [] };
        $('input[name="upshop"],input[name="uptype"]').each(function () { $(this).attr("disabled", true); });
        $('input[name="upshop"]:checked').each(function () { upmode.shop.push($(this).val()); });
        $('input[name="uptype"]:checked').each(function () { upmode.type.push($(this).val()); });
        alert("aaaaaaaaaaaaaaaaaaaa")
        let str = '<r: db="sqlite.dhgate">update @.seller set @.upmode=\'' + JSON.stringify(upmode) + '\' where @.from=\'dhgate\' and @.fromid=' + obj.arr[4] + '</r:>'
        Tool.ajax.a01(str, 1, this.c07, this);
    },
    c07: function (t) {
        if (t == "") { $('input[name="upshop"],input[name="uptype"]').each(function () { $(this).attr("disabled", false); }); } else { alert("出错:" + t); }
    },
    c08: function (shippingTempId) {
        let str = '<r: db="sqlite.dhgate">update @.proupdhgate set @.examine=2 where @.from=\'dhgate\' and @.upFreightId=\'' + shippingTempId + '\'</r:>'
        Tool.ajax.a01(str, 1, this.c09, this);
    },
    c09: function (txt) {
        if (txt == "") { window.location.reload(); } else { alert("出错:" + txt); }
    },
    c10: function (type) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/js29/' + obj.arr[4] + '/' + type + '/' + r);
    },
    c11: function (groupId) {
        this.obj.groupId = groupId;
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/在DH解散分组.js']);
    },
    c12: function (val) {
        let txt = '""<r: db="sqlite.dhgate">update @.seller set @.' + val + '=0 where @.fromid=' + obj.arr[4] + '</r:>'
        Tool.ajax.a01(txt, 1, Tool.reload);
    },
    c13: function (This, freid, shippingTempId) {
        this.obj.F3 = [This, freid, shippingTempId, this.obj.Group]
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/查看类目.js']);
    },
    c14: function (This, types) {
        this.obj.F3 = [This, types]
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/按类目上传.js']);
    },
    c15: function (shopid) {
        Tool.main('/js22/' + shopid)
    },
    c16: function () {
        F1.a01(this, this.c17);
    },
    c17: function () {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.aftersale.list&timestamp=" + new Date().getTime() + "&v=2.0"
        Tool.ajax.a01("<.WebClientPost(" + URL + ")/>", 1, this.c18, this)
    },
    c18: function (obj2) {
        let arr = obj2.afterSaleList, afterSaleTemplate = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == "售后服务") { afterSaleTemplate = arr[i]; break; }
        }
        if (afterSaleTemplate.length == 0) {
            alert("请创建一个售后模板名为：售后服务")
        }
        else {
            let str = '""<r: db="sqlite.dhgate">update @.seller set @.afterSaleID=\'' + afterSaleTemplate.afterSaleTemplateId + '\' where @.fromid=' + obj.arr[4] + ' and @.from=\'dhgate\'</r:>';
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c24: function () {
        $("#table").html('<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>')
        Tool.GetToken(this, this.c25);
    },
    c25: function () {
        let DH = {}
        DH.method = "dh.item.group.list";
        DH.v = "2.0";
        DH.timestamp = (new Date).getTime();
        DH.access_token = this.token;
        DH.containChildGroup = "true";
        DH.pageNo = "1";
        DH.pageSize = "61";
        Tool.ajax.a01("<.WebClientPost(http://api.dhgate.com/dop/router," + escape(JSON.stringify(DH)) + ")/>", 1, this.c26, this)
    },
    c26: function (obj2) {
        if (obj2.code == 38) {
            Tool.at(obj2)
        }
        else {
            let str = "{}", li1 = ""
            obj2 = obj2.itemGroupList;
            //Tool.at(obj2)
            for (let i = 0; i < obj2.length; i++) {
                //为什么空分组这么多，删除的只有一点点，因为不判断分组内是否有商品
                if (obj2[i].itemChildGroupList.length == 0) {
                    li1 = '\
            "isleaf":"True",\
            "Num2":<.Db(sqlite.aliexpress,select count(1) from @.pro a where a.@.hide=0 and a.@.type=\''+ obj2[i].remark + '\' and NOT EXISTS(select 1 from @.proupdhgate c where a.@.proid=c.:proid),count)/>,\
            "Num3":<.Db(sqlite.aliexpress,select count(distinct :shopid) from @.pro a where a.@.hide=0 and a.@.type=\''+ obj2[i].remark + '\' and NOT EXISTS(select 1 from @.proupdhgate c where a.@.shopid=c.:shopid and a.@.hide=0 and a.@.type=\'' + obj2[i].remark + '\'),count)/>,\
            "Num4":"",'
                }
                else {
                    li1 = '\
            "isleaf":"False",\
            "Num2":"",\
            "Num3":"",\
            "Num4":"['+ obj2[i].itemChildGroupList.length + ']",'
                }
                str += ',\
        {\
          "groupId":"'+ obj2[i].groupId + '",\
          "remark":"'+ obj2[i].remark + '",\
          "Num1":<.Db(sqlite.aliexpress,select count(1) as total from @.proupdhgate where @.upUserID='+ obj.arr[4] + ' and @.upGroupId=\'' + obj2[i].groupId + '\',count)/>,\
          '+ li1 + '\
          <r:smtType where=\" where @.fromid=\''+ obj2[i].remark + '\'" size=1>\
            "enname":"[smtType:enname tag=js]",\
            "cnname":"[smtType:name tag=js]",\
            "typename":"<r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1><r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1><r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1><a href=\'javascript:\' title=\'*在DH创建分组\' onclick=\\"fun.c10(\'[smtType:fromid]\')\\">[smtType:name tag=js]</a>&nbsp;&gt;&nbsp;</r:smtType><a href=\'javascript:\' title=\'*在DH创建分组\' onclick=\\"fun.c10(\'[smtType:fromid]\')\\">[smtType:name tag=js]</a>&nbsp;&gt;&nbsp;</r:smtType><a href=\'javascript:\' title=\'*在DH创建分组\' onclick=\\"fun.c10(\'[smtType:fromid]\')\\">[smtType:name tag=js]</a>&nbsp;&gt;&nbsp;</r:smtType><a href=\'javascript:\' title=\'*在DH创建分组\' onclick=\\"fun.c10(\'[smtType:fromid]\')\\">[smtType:name tag=js]</a>",\
          </r:smtType>\
          "itemChildGroupList":'+ JSON.stringify(obj2[i].itemChildGroupList) + ',\
          "groupName":"'+ obj2[i].groupName.replace(/"/ig, '\\"') + '",\
          "groupEnName":"'+ obj2[i].groupEnName.replace(/'/ig, "''") + '"\
        }'
            }
            Tool.ajax.a01("[" + str + "]", 1, this.c27, this)
        }
    },
    c27: function (obj2) {
        obj2 = Tool.objsort(obj2, "typename");
        let str = '""<r: db="sqlite.dhgate">update @.seller set @.Group=\'' + JSON.stringify(obj2).replace(/\'/g, "''") + '\' where @.fromid=' + obj.arr[4] + ' and @.from=\'dhgate\'</r:>';
        Tool.ajax.a01(str, 1, Tool.reload)
    },
    c28: function (This, val) {
        $(".makeHtmlTab li").removeAttr('class');
        This.attr("class", "hover");
        if (val == 1) { $("#div2,#div3").hide(); }
        else if (val == 2) { $("#div1,#div3").hide(); }
        else if (val == 3) { $("#div1,#div2").hide(); }
        $("#div" + val).show()
    },
    c29: function () {
        let txt = '""<r: db="sqlite.dhgate">update @.seller set @.token=null where @.fromid=' + obj.arr[4] + '</r:>'
        Tool.ajax.a01(txt, 1, Tool.reload);
    },
    h01: function (t) {
        let html = '[<@page/><r:proupdhgate size=60 page=2 where=" where @.from=\'dhgate\' and @.upuserid=' + obj.arr[4] + ' and @.upFreightId=\'' + t + '\'">,[proupdh:fromid]</r:proupdhgate>]'
        Tool.ajax.a01(html, 1, this.h02, this, t)
    },
    h02: function (arr, upFreightId) {
        if (arr[0] == 0) { location.reload(); }
        else {
            arr.shift();
            let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.delete.list&timestamp=" + new Date().getTime() + "&v=2.0&itemCodes=" + arr.join(",")
            Tool.ajax.a01("<.WebClientPost(" + URL + ")/>", 1, [arr, this.h03, this, upFreightId]);
        }
    },
    h03: function (t, arr) {
        if (t.indexOf('"message":"OK"') > 0) {
            let html = "<r: tag=\"sql\">delete from @.proupdhgate where @.from='dhgate' and @.fromid in(" + arr[0].join(",") + ")</r:>"
            Tool.ajax.a01(html, 1, this.h04, this, arr[1]);
        } else { alert("错误:002<hr/>" + t); }
    },
    h04: function (t, upFreightId) {
        if (t == "") { this.h01(upFreightId); }
        else { alert("错误:002<hr/>" + t); }
    },
    d01: function () {
        if (this.obj.industry == "D") {
            this.obj.industryType = ["141112", "141007", "141001", "141006", "141113001", "141004", "141003"]
            F1.a01(this, this.d02);
        }
        else { alert("未知【行业】，没有尺码模板。"); }
    },
    d02: function () {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.template.list&timestamp=" + new Date().getTime() + "&v=2.0&catePubId=" + this.obj.industryType[0]
        Tool.ajax.a01("<.WebClientPost(" + URL + ")/>", 1, this.d03, this);
    },
    d03: function (oo) {
        let obj2 = { SizeTemplate: oo.templateSzList, type: this.obj.industryType }
        let str = '<r: db="sqlite.dhgate">update @.seller set @.SizeTemplate=\'' + JSON.stringify(obj2).replace(/\'/g, "''") + '\' where @.fromid=' + obj.arr[4] + ' and @.from=\'dhgate\'</r:>';
        Tool.ajax.a01(str, 1, Tool.reload)
    },
    f01: function (This, groupId) {
        if (This.attr("Class") == "Mo MoB") {
            $("#_" + groupId).hide(); This.attr("Class", "Mo MoA");
        }
        else {
            This.attr("Class", "Mo MoB")
            if ($("#_" + groupId).length) { $("#_" + groupId).show(); }
            else {
                let obj2 = this.obj.Group, arr2 = []
                for (let i = 1; i < obj2.length; i++) {
                    if (obj2[i].groupId == groupId) {
                        for (let j = 0; j < obj2[i].itemChildGroupList.length; j++)//叶子类目
                        {
                            arr2.push('\
              {\
							<r:smtType where=" where @.fromid=\''+ obj2[i].itemChildGroupList[j].remark + '\'" size=1>\
							"typename":"<r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1><r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1><r:smtType where=" where @.fromid=\'[smtType:upid]\'" size=1>[smtType:name tag=js]&nbsp;&gt;&nbsp;</r:smtType>[smtType:name tag=js]&nbsp;&gt;&nbsp;</r:smtType>[smtType:name tag=js]&nbsp;&gt;&nbsp;</r:smtType>[smtType:name tag=js]",\
							"groupId":"'+ obj2[i].itemChildGroupList[j].groupId + '",\
							"name":"'+ obj2[i].itemChildGroupList[j].groupEnName.replace(/"/ig, '\\"') + '",\
							"enname":"[smtType:enname tag=js]",\
							"cnname":"[smtType:name tag=js]",\
							</r:smtType>\
							"Num1":<.Db(sqlite.aliexpress,select count(1) as total from @.proupdhgate where @.from=\'dhgate\' and @.upUserID='+ obj.arr[4] + ' and @.upGroupId=\'' + obj2[i].itemChildGroupList[j].groupId + '\',count)/>,\
							"Num2":<.Db(sqlite.aliexpress,select count(1) as total from @.pro a where a.@.hide=0 and a.@.type=\''+ obj2[i].itemChildGroupList[j].remark + '\' and NOT EXISTS(select 1 from @.proupdhgate c where a.@.proid=c.:proid),count)/>,\
							"Num3":<.Db(sqlite.aliexpress,select count(distinct :shopid) from @.pro a where a.@.hide=0 and a.@.type=\''+ obj2[i].itemChildGroupList[j].remark + '\' and NOT EXISTS(select 1 from @.proupdhgate c where a.@.shopid=c.:shopid and a.@.hide=0 and a.@.type=\'' + obj2[i].itemChildGroupList[j].remark + '\'),count)/>,\
							"remark":"'+ obj2[i].itemChildGroupList[j].remark + '"\
							}')
                        }
                        break;
                    }
                }
                This.parent().parent().after("<tr id=\"_" + groupId + "\"><td colspan=\"7\">正在统计【子分组】数据...</td></tr>")
                Tool.ajax.a01("[" + arr2.join(",") + "]", 1, this.f02, this, groupId)
            }
        }
    },
    f02: function (obj2, id) {
        let str = "", li1 = "";
        for (let j = 0; j < obj2.length; j++) {
            li1 = '\
      <div class="custom-control custom-checkbox">\
        <input type="checkbox" class="custom-control-input" title=\按【剩余店铺】上传\" value="'+ obj2[j].remark + '" ' + this.b03(obj2[j].remark) + ' name="upshop" id="ch-' + id + j + '" onchange=\"fun.c06()\">\
        <label class="custom-control-label" for="ch-'+ id + j + '">' + obj2[j].Num3 + '</label>\
      </div>'
            str += "\
      <tr>\
        <td>"+ (j + 1) + "</td>\
        <td class=\"left\">"+ obj2[j].cnname + "（" + obj2[j].name + "）</td>\
        <td>"+ obj2[j].Num1 + "</td>\
        <td class=\"left\"><a href=\"javascript:\" title=\"*在DH解散分组。注：当相同组名时，后最后一组开始解散。\" onclick=\"fun.c11(\'"+ obj2[j].groupId + "\')\">" + obj2[j].typename + "</a></td>\
        <td>"+ obj2[j].Num2 + "</td>\
        <td>"+ (obj2[j].Num3 ? li1 : "") + "</td>\
			</tr>"
        }
        str = '<td colspan="7">\
    <table class="table m-2 shadow bg-white rounded center table-hover">\
    <thead class="table-light"><tr>'+ this.b06() + '</tr></thead>\
    </thead><tbody>'+ str + '</tbody></table></td>'
        $("#_" + id).html(str)
    }
}
fun.a01()
/*
  l01:function()
  {
    let html='\
        <div class="thead"><a href="javascript:" onclick="location.reload();" class="arrow_back"></a>正在【按当前分组排序】...</div>\
        <ul class="Tul list-group-item-action"><li class="w100 right">账号：</li><li>'+this.obj.username+'</li></ul>\
    <ul class="Tul list-group-item-action"><li class="w100 right">提示：</li><li id="state"></li></ul>'
        Tool.html(this.l02,this,html)
    },
  l02:function(t)
  {win.isRD(This.l02,This);},
  l02A:function(t)
  {
    let url="http://seller.dhgate.com/usr/signin.do?act=login&username="+this.obj.username+"&password="+this.obj.password+"&pageType=main"
    $("#state").html("正在【登陆】...");
    win.WebNewUrl("2",url,this.l03,this);
    },
  l03:function()
  {
        if(win.WebIsHTML("2","title|我的摘要"))
        {
      $("#state").html("正在【产品组排序】...");
            let Group2=this.obj.Group2,arr=[];
            for(let i=0;i<Group2.length;i++){arr.push(Group2[i].groupId);}
            win.WebUrl("2","http://seller.dhgate.com/prodmanage/group/sortProductGroups.do?isBlank=true&groupIds="+arr.join(","),this.l04,this);
        }
        else
        {Tool.Time(this.l03,300,this,"1");}
    },
  l04:function()
  {
        let str=win.WebGetHTML("2",'html|');
        if(str.indexOf('产品组排序成功！')!=-1)
        {
      $("#state").html("正在设置排序类型。。。");
      win.WebUrl("2","http://seller.dhgate.com//store/setStoreDisplayRule.do?dhpath=08,0804&ruleType=1&sortType=1",this.l05,this);
    }
        else
        {Tool.Time(this.l04,300,this,"1");}
    },
  l05:function()
  {
        let str=win.WebGetHTML("2",'html|');
        if(str.indexOf('商铺类目')!=-1)
        {
      $("#state").html("正在【退出】...");
      win.WebUrl("2","http://seller.dhgate.com/usr/signin.do?act=loginout",this.k08,this);     
    }
        else
        {Tool.Time(this.l05,300,this,"1");}
    },
  i01:function(This,type)
  {
        let str='<r: db="sqlite.dhgate">update @.proupdhgate set @.proupdh.:examine=2 from @.pro,:proupdhgate where @.proupdh.:proid=:pro.:proid and @.pro.:from=\'aliexpress\' and @.pro.:type=\''+type+'\'</r:>'
            Tool.ajax.a01(str,1,this.c09,this)
    },
*/