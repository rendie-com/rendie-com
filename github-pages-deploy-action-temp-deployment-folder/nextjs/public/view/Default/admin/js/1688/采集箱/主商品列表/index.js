'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        // obj.arr[7] = obj.arr[7] ? obj.arr[7] : "";//速卖通类目
        // obj.arr[8] = obj.arr[8] ? obj.arr[8] : "";//手动审核状态
        // obj.arr[9] = obj.arr[9] ? obj.arr[9] : "";//审核后本地状态
        // obj.arr[10] = obj.arr[10] ? obj.arr[10] : "";//手动审核1688状态
        this.a02();
    },
    a02: function () {
        let where = this.b09()
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select count(1) as total FROM @.product" + where,
        }, {
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("proid,pic,type1,ManualReview,ManualReview_1688,ManualReview_1688_fromid,DHAfterReview,fromid,fromid_Similarity,goodsId_pinduoduo,goodsId_Similarity_pinduoduo,itemId_taobao,itemId_Similarity_taobao,addtime") + " FROM @.product " + where + Tool.limit(10, obj.params.page),
        }, {
            action: "sqlite",
            database: "aliexpress",
            sql: "select " + Tool.fieldAs("fromid,name") + " FROM @.type where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc",
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].proid + '</td>\
                <td>'+ this.b03(JSON.parse(arr[i].pic)) + '</td>\
                <td>'+ this.b15(arr[i].type1, t[2]) + '</td>\
                <td>'+ this.b08(arr[i].ManualReview, Tool.ManualReviewArr) + '</td>\
                <td>'+ this.b08(arr[i].DHAfterReview, Tool.AfterReviewArr) + '</td>\
                <td class="p-0">'+ this.b12(arr[i].ManualReview_1688, arr[i].ManualReview_1688_fromid) + '</td>\
                <td class="p-0">'+ this.b10(arr[i]) + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        let html2 = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
			'+ this.b04() + '\
			<table class="table center table-hover">\
				<thead class="table-light">'+ this.b01(t[2]) + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html2)
    },
    b01: function (type) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w100">'+ this.b02() + '编码</th>\
          <th>首图</th>\
          <th class="p-0">'+ this.b14("obj.arr[7]", config.proupdhgate_type_count, type) + '</th>\
          <th class="p-0">'+ this.b06("obj.arr[8]", config.proupdhgate_ManualReview_count) + '</th>\
          <th class="p-0">'+ this.b07("obj.arr[9]", config.proupdhgate_AfterReview_count) + '</th>\
          <th class="p-0">'+ this.b11("obj.arr[10]", config.GlobalPro_ManualReview_1688_count) + '</th>\
          <th class="w220">自动匹配的【详情ID】(相似度)</th>\
          <th class="w170">添加时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.openR(\'?jsFile=js01\');">\
                <a class="dropdown-item pointer" title="手动审核通过:敦煌网 &gt; 已上传商品 &gt; 商品 &gt; 手动审核状态 &gt; 9.图片且详情审核通过">获取敦煌网【手动审核通过】的商品</a>\
            </li>\
	        <li onClick="Tool.openR(\'?jsFile=js04\');"><a class="dropdown-item pointer">*给【首图】【放大镜图】【属性图】【详情图】搜货源</a></li>\
	        <li onClick="Tool.openR(\'?jsFile=js02\');"><a class="dropdown-item pointer">计算自动匹配的【详情ID】【相似度】</a></li>\
	        <li onClick="Tool.openR(\'?jsFile=js06\');"><a class="dropdown-item pointer">把【拼多多】和【淘宝】自动匹配的【详情ID】（相似度）同步过来</a></li>\
        </ul>'
    },
    b03: function (pic) {
        let html = "";
        if (pic != 0) {
            html = "\
            <a href=\"https://image.dhgate.com/webp/m/0x0/" + pic.picB.fileurl + "\" target=\"_blank\">\
                <img src=\"https://image.dhgate.com/webp/m/100x100/"+ pic.picB.fileurl + "\" class=\"img-fluid rounded h100\">\
            </a>"
        }
        return html
    },
    b04: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b05(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">自动匹配的【详情ID】</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)">手动选中的【详情ID】</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "自动匹配的【详情ID】"; break;
            case "3": name = "手动选中的【详情ID】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c03(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">手动审核敦煌状态</option>\
          <option value="-1">更新数量</option>\
          <option value="-2">获取【敦煌手动审核状态】</option>\
         ' + nArr.join("") + '\
        </select>';
    },
    b07: function (val, configArr) {
        let nArr = [], arr = Tool.AfterReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c04(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">敦煌审核后本地状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b08: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b09: function () {
        return ""
        // let arr = [];
        // if (obj.params.searchword != "") {
        //     switch (obj.params.field) {
        //         case "1": arr.push("@.proid='" + Tool.unescape(obj.params.searchword) + "'"); break;//商品编码
        //         case "2": arr.push("@.fromid=" + Tool.unescape(obj.params.searchword)); break;//自动匹配的【详情ID】
        //         case "3": arr.push("@.ManualReview_1688_fromid=" + Tool.unescape(obj.params.searchword)); break;//手动选中的【详情ID】
        //     }
        // }
        // if (obj.arr[7] != "") { arr.push("@.type1=" + obj.arr[7]); }
        // if (obj.arr[8] != "") { arr.push("@.ManualReview=" + obj.arr[8]); }
        // if (obj.arr[9] != "") { arr.push("@.DHAfterReview=" + obj.arr[9]); }
        // if (obj.arr[10] != "") { arr.push("@.ManualReview_1688=" + obj.arr[10]); }
        // return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b10: function (oo) {
        let str = '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="1688的【自动匹配的【详情ID】（相似度）】"><a href="https://detail.1688.com/offer/'+ oo.fromid + '.html" target="_blank">' + oo.fromid + '</a>（' + oo.fromid_Similarity + '%）</td></tr>\
            <tr><td title="拼多多的【自动匹配的【详情ID】（相似度）】"><a href="https://pifa.pinduoduo.com/goods/detail/?gid=' + oo.goodsId_pinduoduo + '" target="_blank">' + oo.goodsId_pinduoduo + '</a>（' + oo.goodsId_Similarity_pinduoduo + '%）</td></tr>\
            <tr><td title="淘宝的【自动匹配的【详情ID】（相似度）】"><a href="https://item.taobao.com/item.htm?id=' + oo.itemId_taobao + '" target="_blank">' + oo.itemId_taobao + '</a>（' + oo.itemId_Similarity_taobao + '%）</td></tr>\
        </table>'
        return str;
    },
    b11: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange=" fun.c05(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">手动审核1688状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b12: function (ManualReview_1688, ManualReview_1688_fromid) {
        let str = '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="手动审核1688状态">' + this.b13(ManualReview_1688) + '</td></tr>\
            <tr><td title="手动选中的【详情ID】"><a href="https://detail.1688.com/offer/'+ ManualReview_1688_fromid + '.html" target="_blank">' + ManualReview_1688_fromid + '</a></td></tr>\
        </table>'
        return str;
    },
    b13: function (val) {
        let name = "";
        switch (val) {
            case 0: name = "未审核"; break;
            case 1: name = "使用1688属性图"; break;
            case 2: name = "需要修改"; break;
            case 3: name = "审核不通过"; break;
            case 4: name = "异常"; break;
            default: name = "未知：" + val;
        }
        return name;
    },
    b14: function (type, configArr, typeArr) {
        let nArr = [];
        for (let i = 0; i < typeArr.length; i++) {
            nArr.push('<option value="' + typeArr[i].fromid + '" ' + ("" + typeArr[i].fromid == type ? 'selected="selected"' : '') + '>' + i + '.' + typeArr[i].name + '(' + configArr["" + typeArr[i].fromid] + ')</option>');
        }
        return '\
        <select onChange="fun.c06(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">速卖通类目</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b15: function (val, arr) {
        let name = "未知：" + val;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fromid == val) {
                name = arr[i].name;
                break;
            }
        }
        return name;
    },
    //////////////////////////////////////////
    c01: function (val) {
        let name = this.b05("" + val);
        $("#field").html(name).val(val);
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.arr[3] + "/1/" + field + "/" + searchword);
        }
        else {
            alert("请输入搜索内容");
        }
    },
    c03: function (val) {
        if (val == "-1") {
            Tool.open4("js15");
        }
        else if (val == "-2") {
            Tool.open4("js16");
        }
        else {
            Tool.open(8, val);
        }
    },
    c04: function (val) {
        if (val == "-1") {
            Tool.open4("js17");
        }
        else {
            Tool.open(9, val);
        }
    },
    c05: function (val) {
        if (val == "-1") {
            Tool.open4("js18");
        }
        else {
            Tool.open(10, val);
        }
    },
    c06: function (val) {
        if (val == "-1") {
            Tool.open4("js22");
        }
        else {
            Tool.open(7, val);
        }
    },

}
fun.a01()