'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页         
        obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        obj.params.BeforeReview = obj.params.BeforeReview ? obj.params.BeforeReview : "";//更新前本地状态
        obj.params.aliexpress_type1 = obj.params.aliexpress_type1 ? obj.params.aliexpress_type1 : "";//速卖通类目
        obj.params.ManualReview_1688_state = obj.params.ManualReview_1688_state ? obj.params.ManualReview_1688_state : "";//手动审核后1688商品状态

        //obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//手动审核1688状态
        //obj.arr[11] = obj.arr[11] ? obj.arr[11] : "-_-20";//修改状态

        this.a02();
    },
    a02: function () {
        let where = this.b17();
        let data = [{
            action: "sqlite",
            database: "shopee/类目/类目",
            sql: "select @.fromid as fromid,@.name as name FROM @.table where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc",
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select count(1) as total FROM @.table" + where,
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("proid,fromID,discount,type1,editStatus,BeforeReview,pic,err,ManualReview_1688_subject,ManualReview_1688,ManualReview_1688_fromid,ManualReview_1688_state,ManualReview_1688_unitWeight,ManualReview_1688_categoryId") + " FROM @.table" + where + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this, where);
    },
    a03: function (t, where) {
        let html = "", arr1 = t[2]
        for (let i = 0; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td class="p-0">'+ this.b18(arr1[i].proid, arr1[i].fromID, arr1[i].discount) + '</td>\
                <td>'+ this.b05(arr1[i].pic) + '</td>\
                <td class="left">'+ arr1[i].ManualReview_1688_subject + '</td>\
                <td>'+ this.b14(arr1[i].type1, t[0]) + '</td>\
                <td class="p-0">'+ this.b08(arr1[i].BeforeReview, arr1[i].err) + '</td>\
                <td class="p-0">'+ this.b11(arr1[i].ManualReview_1688, Tool.ManualReview_1688, arr1[i].ManualReview_1688_fromid, arr1[i].ManualReview_1688_categoryId) + '</td>\
                <td class="p-0">'+ this.b15(this.b16(arr1[i].ManualReview_1688_state, Tool.ManualReview_1688_stateArr), arr1[i].ManualReview_1688_unitWeight) + '</td>\
                <td>'+ this.b16(arr1[i].editStatus, Tool.GlobalPro_editStatus) + '</td>\
            </tr>';
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        html = Tool.header2(obj.params.jsFile) + '\
		<div class="p-2">\
			'+ this.b03() + '\
			<table class="table align-top table-hover center">\
				<thead class="table-light">\
                    <tr><td class="right" style="padding-left:25px;position: relative;">'+ this.b02() + '查询条件：</td><td colspan="7" class="left">' + where + '</td></tr>\
                    ' + this.b01(t[0]) + '\
                </thead>\
				<tbody>\
                '+ html + '</tbody>\
			</table>\
            <div>' + Tool.page(t[1][0].total, 10, obj.params.page) + '</div>\
		</div>'
        Tool.html(null, null, html);
    },
    //////////////////////////////////////////////
    b01: function (type) {
        let html = '\
        <tr>\
          <th class="w140">编码/商品ID</th>\
          <th class="w110">首图</th>\
          <th class="left">标题</th>\
          <th class="p-0">'+ this.b06(obj.params.aliexpress_type1, "aliexpress_type1", config.proupdhgate_type_count, type) + '</th>\
          <th class="p-0">'+ this.b07(obj.params.BeforeReview, config.GlobalPro_BeforeReview_count) + '</th>\
          <th class="p-0 w170">'+ this.b10("obj.arr[9]", 9, config.GlobalPro_ManualReview_1688_count) + '</th>\
          <th class="p-0">'+ this.b13(obj.params.ManualReview_1688_state, "ManualReview_1688_state", config.GlobalPro_ManualReview_1688_state_count) + '</th>\
          <th class="p-0">'+ this.b19("obj.arr[11]", 11, config.GlobalPro_editStatus_count) + '</th>\
       </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
    	<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js14\');"><a class="dropdown-item pointer">*发布到【店铺商品】中去</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js52\');" title="字段有：主推关键词、启用的关键词\n为什么要同步？答：方便删除后，再发布商品。"><a class="dropdown-item pointer">把【Shopee广告】中的关键词同步过来</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js39\');"><a class="dropdown-item pointer">把速卖通的【折扣】同步过来</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js26\');">\
                <a class="dropdown-item pointer" title="\
手动审核1688状态：1688 & gt; 采集箱 & gt; 【1688】主商品列表 & gt; 手动审核1688状态\n\
更新字段有：\n\
[@.ManualReview_1688]                   表示手动审核1688状态。\n\
[@.ManualReview_1688_fromid]            表示手动审核1688后来源ID。\n\
[@.ManualReview_1688_categoryId]        表示手动审核1688后分类ID，主要来来绑定shopee类目用的。\n\
[@.ManualReview_1688_state]             表示手动审核1688后商品状态，主要看是不是404用的。\n\
[@.ManualReview_1688_video_status]      人工审核视频状态（0：未审核；1：无视频；2：有视频；3：审核不通过；4：带中文审核通过；5：完全审核通过；）\n\n\
注：[@.ManualReview_1688_subject]       标题字段不要同步过来，这个只在更新【全球商品】时只做首次添加。（就是无则添加，有则不更新，因为这个要人工修改用的。）\n\
注：[@.ManualReview_1688_unitWeight]    手动审核1688后单位重量，不要同步过来（原因：同上）。\n\
">把1688的【手动审核1688状态】同步过来</a>\
            </li>\
    	</ul>'
    },
    b03: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b04(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">商品ID</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)" value="2">手动选中的【详情ID】</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "商品ID"; break;
            case "3": name = "手动选中的【详情ID】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function (pic) {
        let html = "";
        if (pic != 0) {
            html = "\
            <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
                <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded h100\">\
            </a>"
        }
        return html;
    },
    b06: function (type, name, configArr, typeArr) {
        let nArr = [];
        for (let i = 1; i < typeArr.length; i++) {
            nArr.push('<option value="' + typeArr[i].fromid + '" ' + ("" + typeArr[i].fromid == type ? 'selected="selected"' : '') + '>' + i + '.' + typeArr[i].name + '(' + configArr["" + typeArr[i].fromid] + ')</option>');
        }
        return '\
        <select onChange="fun.c05(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">速卖通类目</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b07: function (val, configArr) {
        let nArr = [], arr = Tool.BeforeReview;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c03(\'BeforeReview\',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">更新前本地状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
		</select>'
    },
    b08: function (BeforeReview, err) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="上传前本地状态">'+ this.b09(BeforeReview, Tool.BeforeReview) + '</td></tr>\
            <tr><td title="出错信息">'+ err + '&nbsp;</td></tr>\
        </table>'
    },
    b09: function (ManualReview, arr) {
        let str = "未知:" + ManualReview;
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                let str2 = ""
                if (arr[i][0] == 0) {
                    str2 = '\
                    <div style="position: relative;top: -7px;left: -7px;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                        <ul class="dropdown-menu">\
                            <li onClick="Tool.openR(\'?jsFile=js08\');"><a class="dropdown-item pointer">更新商品</a></li>\
		                </ul>\
                    </div>'
                }
                else if (arr[i][0] == 1 || arr[i][0] == 2 || arr[i][0] == 8 || arr[i][0] == 9 || arr[i][0] == 12 || arr[i][0] == 13 || arr[i][0] == 15 || arr[i][0] == 14) {
                    str2 = '\
                    <div style="position: relative;top: -7px;left: -7px;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                        <ul class="dropdown-menu">\
                            <li onClick="fun.c07(\'BeforeReview\','+ arr[i][0] + ');"><a class="dropdown-item pointer">设置为【未更新】</a></li>\
		                </ul>\
                    </div>'
                }
                str = str2 + ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b10: function (val, I, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c04('+ I + ',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="-_-20">手动审核1688状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
		</select>'
    },
    b11: function (val, arr, ManualReview_1688_fromid, ManualReview_1688_categoryId) {
        let str = "未知:" + val
        for (let i = 0; i < arr.length; i++) {
            if (val == arr[i][0]) {
                let str2 = ""
                if (arr[i][0] == 1) {
                    str2 = '\
                    <div style="position: relative;top: -7px;left: -7px;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                        <ul class="dropdown-menu">\
                            <li onClick="fun.c10(1);"><a class="dropdown-item pointer">设置为【未更新】</a></li>\
                            <li onClick="Tool.openR(\'?jsFile=js41\');"><a class="dropdown-item pointer">*上传视频到shopee</a></li>\
                            <li onClick="Tool.openR(\'?jsFile=js35\');"><a class="dropdown-item pointer">*重新采集1688商品状态</a></li>\
                            <li onClick="Tool.openR(\'?jsFile=js55\');"><a class="dropdown-item pointer">*重新采集1688商品</a></li>\
                            <li onClick="Tool.openR(\'?jsFile=js64\');"><a class="dropdown-item pointer">*重新采集1688商品讲解视频</a></li>\
		                </ul>\
                    </div>'
                }
                str = str2 + val + "." + arr[i][1];
                break;
            }
        }
        return this.b12(str, ManualReview_1688_fromid, ManualReview_1688_categoryId)
    },
    b12: function (str, ManualReview_1688_fromid, ManualReview_1688_categoryId) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="手动审核1688状态">' + str + '</td></tr>\
            <tr><td title="手动选中的【详情ID】"><a href="https://detail.1688.com/offer/'+ ManualReview_1688_fromid + '.html" target="_blank">' + ManualReview_1688_fromid + '</a></td></tr>\
            <tr>\
            <td title="1688叶子类目ID" style="position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onClick="Tool.BindCategory0.a01(\''+ ManualReview_1688_categoryId + '\');"><a class="dropdown-item pointer">绑定类目</a></li>\
		        </ul>\
                '+ ManualReview_1688_categoryId + '\
            </td>\
            </tr>\
        </table>'
    },
    b13: function (val, name, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688_stateArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (""+arr[i][0] == ""+val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c06(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">手动审核后1688商品状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
		</select>'
    },
    b14: function (val, arr) {
        let name = "未知：" + val;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].fromid == val) {
                name = arr[i].name;
                break;
            }
        }
        return name;
    },
    b15: function (ManualReview_1688_state, ManualReview_1688_unitWeight) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="手动审核后1688商品状态">'+ ManualReview_1688_state + '</td></tr>\
            <tr><td title="手动审核1688后单位重量">'+ ManualReview_1688_unitWeight + ' KG</td></tr>\
        </table>'
    },
    b16: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b17: function () {
        let arr = [
            "@.isup=1",
            "@.ManualReview=9",
            "@.DHAfterReview=0",
            //"@.penalty_type=0"
        ];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + obj.params.searchword); break;//DH商品ID
                case "3": arr.push("@.ManualReview_1688_fromid=" + obj.params.searchword); break;//DH商品ID
            }
        }
        // if ( obj.params.aliexpress_type1 != "-_-20") { arr.push("@.type1=" +  obj.params.aliexpress_type1); }
        if (obj.params.BeforeReview != "") { arr.push("@.BeforeReview=" + obj.params.BeforeReview); }
        // if (obj.arr[9] != "-_-20") { arr.push("@.ManualReview_1688=" + obj.arr[9]); }
        if (obj.params.ManualReview_1688_state != "") { arr.push("@.ManualReview_1688_state=" + obj.params.ManualReview_1688_state); }
        // if (obj.arr[11] != "-_-20") { arr.push("@.editStatus=" + obj.arr[11]); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b18: function (proid, fromID, discount) {
        let str = '\
        <div style="position: relative;top: -7px;left: -7px;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
                <li onClick="fun.c07(\'fromID\','+ fromID + ');"><a class="dropdown-item pointer">设置为【未更新】</a></li>\
		    </ul>\
        </div>'
        return '\
        <table class="table mb-0 table-bordered">\
			<tr><td title="编码">'+ proid + '</td></tr>\
			<tr><td title="全球商品ID">'+ str + '<a href="https://seller.shopee.cn/portal/product/mtsku/' + fromID + '" target="_blank">' + fromID + '</a></td></tr>\
			<tr><td title="折扣">-'+ discount + '%</td></tr>\
        </table>'
    },
    b19: function (val, I, configArr) {
        let nArr = [], arr = Tool.GlobalPro_editStatus;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c08('+ I + ',this.options[this.selectedIndex].value)" class="form-select">\
			<option value="-_-20">修改状态</option>\
            <option value="-1">更新数量</option>\
           ' + nArr.join("") + '\
		</select>'
    },
    //////////////////////////////////////
    c01: function (val) {
        let name = this.b04("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (field == "2" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。")
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js11");
        }
        else {
            Tool.open(name, val);
        }
    },
    c04: function (I, val) {
        if (val == "-1") {
            Tool.open4("js27");
        }
        else {
            Tool.open(I, val);
        }
    },
    c05: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js33");
        }
        else {
            Tool.open(name, val);
        }
    },
    c06: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js32");
        }
        else {
            Tool.open(name, val);
        }
    },
    c07: function (field, val) {
        if (confirm("确定要修改码？")) {
            let data = [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "update @.table set @.BeforeReview=0,@.err=null where @." + field + "=" + val,
            }]
            Tool.ajax.a01(data, Tool.reload);
        }
    },
    c08: function (I, val) {
        if (val == "-1") {
            Tool.open4("js47");
        }
        else {
            Tool.open(I, val);
        }
    },
}
fun.a01();