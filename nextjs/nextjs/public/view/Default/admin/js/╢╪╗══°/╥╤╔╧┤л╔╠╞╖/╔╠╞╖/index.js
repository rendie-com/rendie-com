'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//DH卖家账户
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//手动审核状态
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//类目
        obj.arr[10] = obj.arr[10] ? obj.arr[10] : "-_-20";//审核前本地状态
        obj.arr[11] = obj.arr[11] ? obj.arr[11] : "-_-20";//审核后本地状态
        obj.arr[12] = obj.arr[12] ? obj.arr[12] : "-_-20";//敦煌状态
        obj.arr[13] = obj.arr[13] ? obj.arr[13] : "-_-20";//时间
        this.a02();
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
                </r:seller>],\
                "type":[0\
                <r:type size=50 db="sqlite.aliexpress" where=" where  @.upid=0 and @.isleaf=0  order by @.sort desc,@.id asc">,\
                {\
                    "fromid":<:fromid/>,\
                    "name":"<:name/>"\
                }\
                </r:type>],\
            "size":10,\
            "count":<@count/>\
        }\
        <r:proupdhgate size=10 db="sqlite.dhgate" page=2 where="'+ this.b05() + '">,\
	    {\
		    "proid":"<:proid/>",\
		    "fromID":"<:fromID/>",\
		    "ReviewsNum":<:ReviewsNum/>,\
		    "MaxPrice":<:MaxPrice/>,\
		    "isActivity1":<:isActivity1/>,\
		    "isActivity2":<:isActivity2/>,\
		    "isActivity3":<:isActivity3/>,\
		    "upuserid":"<:upuserid/>",\
		    "ratio13":<:ratio/>,\
		    "ratio":<:ratio/>,\
		    "upFreightId":"<:upFreightId/>",\
		    "BeforeReview":<:BeforeReview/>,\
		    "AfterReview":<:AfterReview/>,\
		    "status":<:status/>,\
		    "ManualReview":<:ManualReview/>,\
		    "pic":<:pic tag=0/>,\
		    "typepath":<:typepath tag=0/>,\
		    "addtime":<:addtime/>,\
		    "uptime":<:uptime/>,\
		    "err":<:err tag=json/>,\
		    "downtime":<:downtime/>\
	    }\
        </r:proupdhgate>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr1) {
        let html = "";
        for (let i = 1; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td class="p-0">\
                    <table class="table mb-0 table-bordered">\
                        <tr><td title="编码"style="padding-left:22px;position:relative;">'+ this.b11(arr1[i]) + arr1[i].proid + '</td></tr>\
                        <tr><td title="敦煌商品ID"><a href="https://www.dhgate.com/product/-/'+ arr1[i].fromID + '.html" target="_blank">' + arr1[i].fromID + '</a></td></tr>\
                        <tr><td class="p-0">'+ this.b15(arr1[i].ReviewsNum, arr1[i].MaxPrice) + '</td></tr>\
                    </table>\
                </td>\
                <td class="p-0">'+ this.b02(arr1[0].seller, arr1[i].upuserid, arr1[i].pic) + '</td>\
                <td>'+ this.b16(arr1[i].ManualReview, Tool.ManualReviewArr) + '</td>\
                <td class="p-0">'+ this.b13(arr1[i]) + '</td>\
                <td>'+ this.b10(arr1[i].BeforeReview, Tool.BeforeReviewArr) + '</td>\
                <td>'+ this.b10(arr1[i].AfterReview, Tool.AfterReviewArr) + '</td>\
                <td>'+ this.b10(arr1[i].status, Tool.StatusArr) + '</td>\
                <td class="p-0">'+ this.b18(arr1[i].addtime, arr1[i].uptime, arr1[i].downtime) + '</td>\
            </tr>';
        }
        html += '<tr><td colspan="8" class="left">' + Tool.page(arr1[0].count, arr1[0].size, 4) + '</td></tr>'
        let html2 = Tool.header() + '\
        <div class="p-2">\
			'+ this.b06() + '\
			<table class="table align-top center table-hover">\
				<thead class="table-light">'+ this.b01(arr1[0]) + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html2)
    },
    b01: function (oo) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;"> '+ this.b12() + '基本信息</th>\
          <th class="p-0">'+ this.b08(oo.seller, obj.arr[7]) + '</th>\
          <th class="p-0">'+ this.b04(obj.arr[8], config.proupdhgate_ManualReview_count) + '</th>\
          <th class="p-0">'+ this.b09(obj.arr[9], config.proupdhgate_type_count, oo.type) + '</th>\
          <th class="p-0">'+ this.b14(obj.arr[10], config.proupdhgate_BeforeReview_count) + '</th>\
          <th class="p-0">'+ this.b17(obj.arr[11], config.proupdhgate_AfterReview_count) + '</th>\
          <th class="p-0">'+ this.b03(obj.arr[12], config.proupdhgate_status_count) + '</th>\
          <th class="p-0">\
            <select onChange="Tool.open(13,this.options[this.selectedIndex].value)" class="form-select">\
                <option value="-_-20">时间</option>\
                <option value="1" '+ (obj.arr[13] == "1" ? 'selected="selected"' : '') + '>上传时间_倒序</option>\
                <option value="2" '+ (obj.arr[13] == "2" ? 'selected="selected"' : '') + '>更新时间_倒序</option>\
                <option value="3" '+ (obj.arr[13] == "3" ? 'selected="selected"' : '') + '>48小时内会下架_升序</option>\
                <option value="4" '+ (obj.arr[13] == "4" ? 'selected="selected"' : '') + '>评论量_倒序</option>\
                <option value="5" '+ (obj.arr[13] == "5" ? 'selected="selected"' : '') + '>价格&lt;1且评论量_倒序</option>\
                <option value="6" '+ (obj.arr[13] == "6" ? 'selected="selected"' : '') + '>价格&lt;2且评论量_倒序</option>\
                <option value="7" '+ (obj.arr[13] == "7" ? 'selected="selected"' : '') + '>价格&lt;3且评论量_倒序</option>\
                <option value="8" '+ (obj.arr[13] == "8" ? 'selected="selected"' : '') + '>价格&lt;4且评论量_倒序</option>\
                <option value="9" '+ (obj.arr[13] == "9" ? 'selected="selected"' : '') + '>价格&lt;5且评论量_倒序</option>\
                <option value="10" '+ (obj.arr[13] == "10" ? 'selected="selected"' : '') + '>价格&lt;6且评论量_倒序</option>\
            </select>\
        </th>\
        </tr>'
        return html;
    },
    b02: function (arr, upuserid, pic) {
        let str = "未知"
        for (let i = 1; i < arr.length; i++) {
            if (upuserid == arr[i].fromid) { str = arr[i].UserName; break; }
        }
        let pic2 = "";
        if (pic != 0) {
            if (pic.picC) {
                pic2 = "\
                <a href=\"https://image.dhgate.com/" + pic.picC.fileurl + "\" target=\"_blank\">\
                <img src=\"https://image.dhgate.com/webp/m/100x100/"+ pic.picC.fileurl + "\" class=\"img-fluid rounded h100\">\
                </a>"
            } else {
                pic2 = "\
                <a href=\"https://ae01.alicdn.com/kf/" + pic.picA.fileurl + "\" target=\"_blank\">\
                <img src=\"https://ae01.alicdn.com/kf/"+ pic.picA.fileurl + "_200x200.jpg\" class=\"img-fluid rounded h100\">\
                </a>"
            }
        }
        str = "\
        <table class=\"table mb-0 table-bordered\">\
            <tr><td>" + str + "</td></tr>\
            <tr><td>&nbsp;"+ pic2 + "</td></tr>\
        </table>"
        return str
    },
    b03: function (status, configArr) {
        let nArr = [], arr = Tool.StatusArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == status ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c13(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">敦煌状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b04: function (ManualReview, configArr) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == ManualReview ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c01(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">手动审核状态</option>\
          <option value="-1">更新数量</option>\
          <option value="-2" '+ (ManualReview == "-2" ? 'selected="selected"' : '') + '>非【9.图片且详情审核通过】</option>\
          <option value="-3">归类【18.成人用品】</option>\
         ' + nArr.join("") + '\
        </select>';
    },
    b05: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + Tool.unescape(obj.arr[6])); break;//DH商品ID
                case "3": arr.push("@.upFreightId='" + Tool.unescape(obj.arr[6]) + "'"); break;//运费模板ID
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.upuserid=" + obj.arr[7]) }
        if (obj.arr[8] != "-_-20") {
            if (obj.arr[8] == "-2") {
                arr.push("@.ManualReview<&gt;9")
            }
            else {
                arr.push("@.ManualReview=" + obj.arr[8])
            }

        }
        if (obj.arr[9] != "-_-20") { arr.push("@.type1=" + obj.arr[9]) }
        if (obj.arr[10] != "-_-20") {
            if (obj.arr[10] == "-2") {
                arr.push("@.BeforeReview<&gt;1")
            }
            else {
                arr.push("@.BeforeReview=" + obj.arr[10])
            }
        }
        if (obj.arr[11] != "-_-20") { arr.push("@.AfterReview=" + obj.arr[11]) }
        if (obj.arr[12] != "-_-20") { arr.push("@.status=" + obj.arr[12]) }
        let str = ""
        switch (obj.arr[13]) {
            case "1": str = " order by @.addtime desc,@.id desc"; break;//【上传时间】倒序
            case "2": str = " order by @.uptime desc,@.id desc"; break;//【更新时间】倒序
            case "3":
                let time = parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 2) / 1000)
                arr.push("@.downtime<" + time)//2天前
                str = " order by @.downtime asc,@.id asc";
                break;//【48小时内】会下架商品
            case "4": str = " order by @.ReviewsNum desc,@.id desc"; break;//【评论量】倒序
            case "5":
                arr.push("@.MaxPrice<1")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
            case "6":
                arr.push("@.MaxPrice<2")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
            case "7":
                arr.push("@.MaxPrice<3")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
            case "8":
                arr.push("@.MaxPrice<4")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
            case "9":
                arr.push("@.MaxPrice<5")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
            case "10":
                arr.push("@.MaxPrice<6")
                str = " order by @.ReviewsNum desc,@.id desc"; break;
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + str;
    },
    b06: function () {
        return '\
        <div class="input-group w-50 mb-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b07(obj.arr[5]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c11(1)" value="1">商品编码</li>\
            <li class="dropdown-item pointer" onclick="fun.c11(2)" value="2">DH商品ID</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c11(3)" value="3">运费模板ID</a></li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "DH商品ID"; break;
            case "3": name = "运费模板ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b08: function (arr, userid) {
        let li4 = ""
        for (let i = 1; i < arr.length; i++) {
            li4 += '<option value="' + arr[i].fromid + '" ' + (userid == arr[i].fromid ? 'selected="selected"' : '') + '>' + i + '.' + arr[i].UserName + '</option>';
        }
        let str = '\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">敦煌卖家账户</option>\
            <option value="0">0.未知</option>\
            ' + li4 + '\
        </select>'
        return str
    },
    b09: function (type, configArr, typeArr) {
        let nArr = [];
        for (let i = 1; i < typeArr.length; i++) {
            nArr.push('<option value="' + typeArr[i].fromid + '" ' + ("" + typeArr[i].fromid == type ? 'selected="selected"' : '') + '>' + i + '.' + typeArr[i].name + '(' + configArr["" + typeArr[i].fromid] + ')</option>');
        }
        return '\
        <select onChange="fun.c14(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">速卖通类目</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b10: function (val, arr) {
        let str = "未知:" + val
        for (let i = 0; i < arr.length; i++) {
            if (val == arr[i][0]) {
                str = arr[i][1] + (arr[i][2] ? arr[i][2] : "");
                break;
            }
        }
        return str
    },
    b11: function (oo) {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
			<li onClick="Tool.main(\'js01/1/'+ oo.proid + '\');"><a class="dropdown-item pointer">*重新采集</a></li>\
			<li onClick=""><a class="dropdown-item pointer">查看详情</a></li>\
			<li onClick="fun.c03('+ oo.fromID + ');"><a class="dropdown-item pointer">设置需要更新--暂时不要了</a></li>\
			<li onClick="fun.c10(\''+ oo.type + '\',\'' + oo.dhbind + '\');"><a class="dropdown-item pointer">重新绑定类目</a></li>\
			<li onClick="fun.c09(\''+ oo.type + '\');"><a class="dropdown-item pointer">设置类目需要更新</a></li>\
			<li onClick="fun.c05(\''+ oo.proid + '\');"><a class="dropdown-item pointer" title="删除【proupdhgate表】【pro表】【DH在卖】的数据">删除源数据</a></li>\
			<li onClick="fun.c16(\''+ oo.proid + '\');"><a class="dropdown-item pointer" title="只删除【proupdhgate表】的数据">删除</a></li>\
		</ul>'
    },
    b12: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="fun.f01();">\
                <a class="dropdown-item pointer" title="做活动，做推扩要用\n同步字段有：评论量、最大价格、一级类目、类目路径">将SMT的商品信息同步过来</a>\
            </li>\
	        <li onClick="Tool.open4(\'js30\');;">\
                <a class="dropdown-item pointer" title="【条件1】分别为：\n敦煌卖家账户：非【0.未知】\n审核前本地状态：大于1\n审核后本地状态：【0.正常】">按【条件1】把【25.待认领商品】填进去</a>\
            </li>\
	        <li onClick="Tool.open4(\'js31\');;">\
                <a class="dropdown-item pointer" title="【条件1】分别为：\n敦煌卖家账户：非【0.未知】\n审核前本地状态：大于1\n审核后本地状态：【0.正常】">按【条件1】把【未上传数据】填进去</a>\
            </li>\
	        <li onClick="Tool.open4(\'js33\');;">\
                <a class="dropdown-item pointer">按【条件】采集来源商品价格和运费</a>\
            </li>\
        </ul>'
    },
    b13: function (oo) {
        let off = Math.round((1 - (1.5 / oo.ratio13)) * 100);
        return '\
        <table class="table mb-0 table-bordered left">\
            <tr><td title="分类路径">'+ (oo.typepath ? oo.typepath.join(" &gt; ") : "<font color=red>找不到类目</font>") + '</td></tr>\
            <tr><td title="DH运费模板ID">'+ oo.upFreightId + (oo.isActivity1 == 1 ? '【满几件打几折】' : '') + (oo.isActivity2 == 1 ? '【拼团】' : '') + (oo.isActivity3 == 1 ? '【限时限量】' : '') + '</td></tr>\
            <tr><td title="出错说明">'+ (oo.err ? oo.err : '&nbsp;') + '</td></tr>\
            <tr><td title="敦煌APP折扣(价格倍数)">'+ off + '% OFF (' + oo.ratio + ' 倍)</td></tr>\
        </table>';
    },
    b14: function (examine, configArr) {
        let nArr = [], arr = Tool.BeforeReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == examine ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c19(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">审核前本地状态</option>\
            <option value="-1">更新数量</option>\
            <option value="-2" '+ ("-2" == examine ? 'selected="selected"' : '') + '>非【1.更新成功】</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b15: function (ReviewsNum, MaxPrice) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="SMT商品评论量">'+ ReviewsNum + '</td><td title="SMT商品最大价格">' + MaxPrice + '</td></tr>\
        </table>'
    },
    b16: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = arr[i][1] + (arr[i][2] ? arr[i][2].replace("$1", "fun.c04('@.ManualReview=" + ManualReview + "')") : "");
                str = arr[i][1] + (arr[i][2] ? arr[i][2].replace("$2", "fun.c21('@.ManualReview=" + ManualReview + "')") : "");
                str = arr[i][1] + (arr[i][2] ? arr[i][2].replace("$3", "Tool.open4(\'js25\')") : "");
                str = arr[i][1] + (arr[i][2] ? arr[i][2].replace("$4", "Tool.open4(\'js26\')") : "");
                str = arr[i][1] + (arr[i][2] ? arr[i][2].replace("$5", "Tool.open4(\'js27\')") : "");
                break;
            }
        }
        return str
    },
    b17: function (val, configArr) {
        let nArr = [], arr = Tool.AfterReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c12(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">审核后本地状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b18: function (addtime, uptime, downtime) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="上传时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
            <tr><td title="下架时间">'+ Tool.js_date_time2(downtime) + '</td></tr>\
        </table>'
    },
    c01: function (val) {
        if (val == "-1") {
            Tool.open4("js19");
        }
        else if (val == "-3") {
            Tool.open4("js32");
        }
        else {
            Tool.open(8, val);
        }
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (Field == "2" && isNaN(searchword)) {
            alert("【DH商品ID】必须是数字。")
        }
        else if (searchword) {
            searchword = encodeURIComponent(searchword)
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },
    c03: function (fromid) {
        let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.examine=2,@.status=0 where @.fromid=' + fromid + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c04: function (val) {
        let str = '<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=0,@.err=null where ' + val + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c05: function (proid) {
        if (confirm("确定要删除")) {
            let str = '\
			{\
				<r:proupdhgate size=1 where=" where @.proid=\''+ proid + '\'" db="sqlite.dhgate">\
					<r:seller size=1 where=" where and @.fromid=<:upuserid/>">\
						"token":<:token tag=0/>,\
						"fromid":"<:fromid/>"\
					</r:seller>,\
					"upfromID":"<:fromID/>",\
					"proid":"'+ proid + '"\
				</r:proupdhgate>\
			}'
            Tool.ajax.a01(str, 1, this.c06, this)
        }
    },
    c06: function (oo) {
        this.obj = oo;
        F1.a01(this, this.c07);
    },
    c07: function () {
        let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.delete.list&timestamp=" + new Date().getTime() + "&v=2.0&itemCodes=" + this.obj.upfromID
        Tool.ajax.a01("<.WebClientPost(" + URL + ")/>", 1, this.c08, this);
    },
    c08: function (oo) {
        //{"status":{"code":"00000000","message":"OK","solution":"","subErrors":[]},"isSuccess":true,"resultList":null}
        if (oo.status.code == "00000000") {
            let str = '<r: db="sqlite.dhgate">delete from @.proupdhgate where @.proid=\'' + this.obj.proid + '\'<1/>delete from @.smtPro where @.proid=\'' + this.obj.proid + '\'</r:>'
            Tool.ajax.a01(str, 1, Tool.reload);
        }
        else { Tool.echo(oo); }
    },
    c09: function (type) {
        let str = '""<r: db="sqlite.dhgate">update @.proupdhgate set @.proupdhgate.@.examine=2,:status=0 from @.smtPro,:proupdhgate where @.proupdhgate.@.proid=:smtPro.:proid and @.smtPro.:type=\'' + type + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c10: function (type, dhbind) {
        obj.F4 = [type, dhbind];
        Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/查看类目_绑定DH后类目.js']);
    },
    c11: function (val) {
        let name = this.b07("" + val)
        $("#Field").html(name).val(val)
    },
    c12: function (val) {
        if (val == "-1") {
            Tool.open4("js18");
        }
        else {
            Tool.open(11, val);
        }
    },
    c13: function (val) {
        if (val == "-1") {
            Tool.open4("js28");
        }
        else {
            Tool.open(12, val);
        }
    },
    c14: function (val) {
        if (val == "-1") {
            Tool.open4("js29");
        }
        else {
            Tool.open(9, val);
        }
    },
    c16: function (proid) {
        let str = '""<r: db="sqlite.aliexpress">delete from @.proupdhgate where @.proid=\'' + proid + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    c19: function (val) {
        if (val == "-1") {
            Tool.open4("js20");
        }
        else {
            Tool.open(10, val);
        }
    },
    c20: function (val) {
        if (confirm("确定要修改码？")) {
            let str = '"ok"<r: db="sqlite.dhgate">update @.proupdhgate set @.BeforeReview=0,@.err=null where @.BeforeReview=' + val + '</r:>'
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c21: function (val) {
        let str = '<r: db="sqlite.dhgate">update @.proupdhgate set @.ManualReview=9,@.err=null where ' + val + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    d01: function () {
        let sql = 'update @.proupdhgate SET @.ManualReview=0 WHERE @.ManualReview=10';
        let str = '""<r: db="sqlite.dhgate">' + sql + '</r:>'
        Tool.ajax.a01(str, 1, this.d02, this);
    },
    d02: function () {
        let sql = 'update @.proupdhgate set @.ManualReview=10 where @.proid=(select @.proid from @.pro where @.proid=@.proupdhgate.@.proid and @.hide>0)'
        let str = '""<r: db="sqlite.dhgate">' + sql + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    e01: function () {
        let sql = 'update @.proupdhgate SET @.BeforeReview=26 WHERE not(@.ManualReview=9) and @.BeforeReview=25';
        let str = '""<r: db="sqlite.dhgate">' + sql + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    f01: function () {
        let sql = "update @.proupdhgate SET \
        @.ReviewsNum = (select @.ReviewsNum from @.pro where @.proid = @.proupdhgate.@.proid),\
        @.MaxPrice = (select @.MaxPrice from @.pro where @.proid = @.proupdhgate.@.proid),\
        @.typepath = (select @.typepath from @.pro where @.proid = @.proupdhgate.@.proid),\
        @.type1 = (select @.type1 from @.pro where @.proid = @.proupdhgate.@.proid)\
        where @.proid = (select @.proid from @.pro where @.proid = @.proupdhgate.@.proid)"
        let str = '""<r: db="sqlite.dhgate">' + sql + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
}
fun.a01();