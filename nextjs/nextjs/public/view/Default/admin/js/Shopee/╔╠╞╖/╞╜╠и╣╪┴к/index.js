'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile=obj.params.jsFile?obj.params.jsFile:""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页   
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        //obj.params.manualReview               敦煌手动审核状态
        //obj.params.penalty_type               更新后违规类型
        // obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//速卖通类目
        // obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//敦煌手动审核状态
        // obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//敦煌审核后本地状态
        // obj.arr[10] = obj.arr[10] ? obj.arr[10] : "-_-20";//更新前本地状态
        // obj.arr[11] = obj.arr[11] ? obj.arr[11] : "-_-20";//更新后违规类型
        // obj.arr[12] = obj.arr[12] ? obj.arr[12] : "-_-20";//手动审核1688状态
        // obj.arr[13] = obj.arr[13] ? obj.arr[13] : "-_-20";//手动审核后1688商品状态
        // obj.arr[14] = obj.arr[14] ? obj.arr[14] : "-_-20";//时间
        // obj.arr[15] = obj.arr[15] ? obj.arr[15] : "-_-20";//人工审核1688视频状态
        this.a02();
    },
    a02: function () {
        let where = this.b05()
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select count(1) as total FROM @.table" + where,
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("pic,video,proid,fromID,ManualReview,DHAfterReview,isup,penalty_type,ManualReview_1688_video_status,addtime,uptime") + " FROM @.table" + where + Tool.limit(10, obj.params.page, "sqlite"),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let arr1 = t[1];
        let html = ""
        for (let i = 0; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td>'+ arr1[i].proid + '</td>\
                <td>'+ this.b08(arr1[i].pic) + '</td>\
                <td>'+ this.b04(arr1[i].ManualReview, Tool.ManualReviewArr) + '</td>\
                <td>'+ this.b04(arr1[i].DHAfterReview, Tool.AfterReviewArr) + '</td>\
                <td>'+ this.b09(arr1[i].penalty_type, Tool.penalty_type) + '</td>\
                <td>'+ this.b04(arr1[i].ManualReview_1688_video_status, Tool.ManualReview_1688_video_status) + '</td>\
                <td class="p-0">'+ this.b11(arr1[i].addtime, arr1[i].uptime, arr1[i].isup) + '</td>\
            </tr>';
        }
        html = Tool.header2(obj.params.jsFile) + '\
		<div class="p-2">\
			'+ this.b06() + '\
			<table class="table align-top table-hover center">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function () {
        let html = '\
        <tr>\
          <th style="padding-left:25px;position: relative;" class="w120">'+ this.b10() + '编码</th>\
          <th class="w110">首图</th>\
          <th class="p-0">'+ this.b02(obj.params.manualReview, config.proupdhgate_ManualReview_count) + '</th>\
          <th class="p-0">'+ this.b03("", config.proupdhgate_AfterReview_count) + '</th>\
          <th class="p-0">'+ this.b15("") + '</th>\
          <th class="p-0">'+ this.b17("", config.product_ManualReview_video_status_count) + '</th>\
          <th class="p-0 w170">'+ this.b16(0) + '</th>\
        </tr>'
        return html;
    },
    b02: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c04(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">敦煌手动审核状态</option>\
          <option value="-1">更新数量</option>\
          <option value="-2">获取【敦煌手动审核状态】</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b03: function (val, configArr) {
        let nArr = [], arr = Tool.AfterReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ') </option>');
        }
        return '\
        <select onChange="fun.c05(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">敦煌审核后本地状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b04: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b05: function () {
        let arr = [];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + obj.params.searchword); break;//DH商品ID
            }
        }
        // if (obj.arr[7] != "-_-20") { arr.push("@.type1=" + obj.arr[7]); }
        // if (obj.arr[8] != "-_-20") { arr.push("@.ManualReview=" + obj.arr[8]); }
        // if (obj.arr[9] != "-_-20") { arr.push("@.DHAfterReview=" + obj.arr[9]); }
        // if (obj.arr[10] != "-_-20") { arr.push("@.BeforeReview=" + obj.arr[10]); }
        if (obj.params.penalty_type) { arr.push("@.penalty_type=" + obj.params.penalty_type); }
        // if (obj.arr[12] != "-_-20") { arr.push("@.ManualReview_1688=" + obj.arr[12]); }
        // if (obj.arr[13] != "-_-20") { arr.push("@.ManualReview_1688_state=" + obj.arr[13]); }
        // if (obj.arr[15] != "-_-20") { arr.push("@.ManualReview_1688_video_status=" + obj.arr[15]); }
        // let str = ""
        // switch (obj.arr[14]) {
        //     case "1": str = " order by @.addtime desc,@.id desc"; break;//【上传时间】倒序
        //     case "2": str = " order by @.uptime desc,@.id desc"; break;//【更新时间】倒序
        //     case "3": arr.push("@.isMY=1"); break;//已发布到【马来西亚】站点
        //     case "4": arr.push("@.isBR=1"); break;//已发布到【巴西】站点
        //     case "5": arr.push("@.isup=0"); break;//未上传
        //     case "6": arr.push("@.isup=1"); break;//已上传
        // }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b06: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b07(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">商品ID</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "商品ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b08: function (pic) {
        let html = "";
        if (pic != 0) {
            html = "\
            <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
                <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid rounded h100\">\
            </a>"
        }
        return html;
    },
    b09: function (penalty_type, arr) {
        let str = "未知:" + penalty_type
        for (let i = 0; i < arr.length; i++) {
            if (penalty_type == arr[i][0]) {
                let str2 = ""
                if (penalty_type == 8 || penalty_type == 5) {
                    str2 = '\
                    <div style="position: relative;top: -7px;left: -7px;">\
                        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                        <ul class="dropdown-menu">\
                            <li onClick="fun.c03('+ penalty_type + ');"><a class="dropdown-item pointer">设置为【0.未违规】</a></li>\
		                </ul>\
                    </div>'
                }
                str = str2 + penalty_type + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b10: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.open4(\'js05\');">\
                <a class="dropdown-item pointer" title="手动审核通过:敦煌网 &gt; 已上传商品 &gt; 商品 &gt; 手动审核状态 &gt; 9.图片且详情审核通过">获取敦煌网【手动审核通过】的商品</a>\
            </li>\
            <li onClick="Tool.open4(\'js06\');"><a class="dropdown-item pointer">*将【未上传】的商品上传到【Shopee全球商品】</a></li>\
            <li onClick="Tool.open4(\'js02\');" title="当你上传商品时，出现错误，上传了，没被记录，就要用到该功能。"><a class="dropdown-item pointer">*删除【Shopee全球商品】中【没被记录】的商品</a></li>\
            <li onClick="Tool.open4(\'js09\');" title="当你直接在【Shopee全球商品】删除商品时，但记录的信息还在，就要用到该功能。"><a class="dropdown-item pointer">*重新记录【已上传】的商品</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js63&table=GlobalPro&database=shopee_bak&newdatabase=shopee/商品/全球商品\');"><a class="dropdown-item pointer">把旧表复制到新表</a></li>\
		</ul>'
    },
    b11: function (addtime, uptime, isup) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="上传时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
			<tr><td title="是否已上传">'+ (isup == 1 ? "已上传" : "<font color=red>未上传</font>") + '</td></tr>\
        </table>'
    },
    b15: function (val) {
        let nArr = [], arr = Tool.penalty_type;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + config.GlobalPro_penalty_type_count[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c07(this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">更新后违规类型</option>\
            <option value="-1">更新数量</option>\
            <option value="-2">从【违规或删除】中同步该信息</option>\
            ' + nArr.join("") + '\
		</select>'
    },
    b16: function (val) {
        return '\
		<select onChange="fun.c11(this.options[this.selectedIndex].value)" class="form-select">\
			<option value="">时间</option>\
			<option value="1" '+ (val == "1" ? 'selected="selected"' : '') + '>上传时间_倒序</option>\
			<option value="2" '+ (val == "2" ? 'selected="selected"' : '') + '>更新时间_倒序</option>\
			<option value="3" '+ (val == "3" ? 'selected="selected"' : '') + '>已发布到【马来西亚】站点</option>\
			<option value="4" '+ (val == "4" ? 'selected="selected"' : '') + '>已发布到【巴西】站点</option>\
			<option value="5" '+ (val == "5" ? 'selected="selected"' : '') + '>未上传</option>\
			<option value="6" '+ (val == "6" ? 'selected="selected"' : '') + '>已上传</option>\
		</select>'
    },
    b17: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688_video_status;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange=" fun.c12(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">人工审核1688视频状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    ///////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b07("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (field == "2" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。");
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (penalty_type) {
        //@.BeforeReview=0      表示【0.未更新】
        //@.penalty_type=0      表示【0.未违规】
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "update @.table set @.penalty_type=0,@.BeforeReview=0 where @.penalty_type=" + penalty_type,
        }]
        Tool.ajax.a01(data, Tool.reload);
    },
    c04: function (val) {
        if (val == "-1") {
            Tool.open4("js12");
        }
        else if (val == "-2") {
            Tool.open4("js13");
        }
        else {
            Tool.open(8, val);
        }
    },
    c05: function (val) {
        if (val == "-1") {
            Tool.open4("js31");
        }
        else {
            Tool.open(9, val);
        }
    },

    c07: function (val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js25");
        }
        else if (val == "-2") {
            Tool.openR("?jsFile=js24");
        }
        else {
            Tool.open("penalty_type", val);
        }
    },
    c10: function (val) {
        if (confirm("确定要修改码？")) {
            let str = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.BeforeReview=0,@.err=null where @.ManualReview_1688=' + val + '</r:>'
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c12: function (val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js42");
        }
        else {
            Tool.open(15, val);
        }
    },
}
fun.a01();
///////////////////////////////////////////////////////////////////////////////////////////////////////
//<li onClick="Tool.open4(\'js03\');"><a class="dropdown-item pointer" title="获取信息包括：【商品ID】【浏览量】【关注量】">*从Shopee获取【马来西亚站点】商品信息</a></li>\
//b09: function (oo) {
//    return '\
//        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
//        <ul class="dropdown-menu">\
//            <li onClick="Tool.main(\'js01/1/'+ oo.proid + '\');"><a class="dropdown-item pointer">*重新采集</a></li>\
//            <li onClick=""><a class="dropdown-item pointer">查看详情</a></li>\
//            <li onClick="fun.c10(\''+ oo.type + '\',\'' + oo.dhbind + '\');"><a class="dropdown-item pointer">重新绑定类目</a></li>\
//            <li onClick="fun.c09(\''+ oo.type + '\');"><a class="dropdown-item pointer">设置类目需要更新</a></li>\
//            <li onClick="fun.c05(\''+ oo.proid + '\');"><a class="dropdown-item pointer" title="删除【proupdhgate表】【pro表】【DH在卖】的数据">删除源数据</a></li>\
//        </ul>'
//},