'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: []
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//手动审核状态
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//审核后本地状态
        this.a02();
    },
    a02: function () {
        let str = '[<@count/>\
        <r:pifa size=10 db="sqlite.pinduoduo" page=2 where="'+ this.b09() + '">,\
	    {\
		    "proid":"<:proid/>",\
		    "pic":<:pic tag=0/>,\
		    "ManualReview":<:ManualReview/>,\
		    "AfterReview":<:AfterReview/>,\
		    "goodsId":<:goodsId tag=json/>,\
		    "goodsId_Similarity":<:goodsId_Similarity/>,\
		    "fromid_1688":<:fromid_1688 tag=json/>,\
		    "fromid_Similarity_1688":<:fromid_Similarity_1688/>,\
		    "itemId_taobao":<:itemId_taobao tag=json/>,\
		    "itemId_Similarity_taobao":<:itemId_Similarity_taobao/>,\
		    "addtime":<:addtime/>\
	    }\
        </r:pifa>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html1 = ""
        for (let i = 1; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].proid + '</td>\
                <td>'+ this.b03(arr[i].pic) + '</td>\
                <td>'+ this.b04(arr[i].ManualReview, Tool.ManualReviewArr) + '</td>\
                <td>'+ this.b04(arr[i].AfterReview, Tool.AfterReviewArr) + '</td>\
                <td class="p-0">'+ this.b10(arr[i]) + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        html1 += '<tr><td colspan="6" class="left">' + Tool.page(arr[0], 10, 4) + '</td></tr>'
        let html2 = Tool.header() + '\
        <div class="p-2">\
			'+ this.b07() + '\
            <table class="table center table-hover">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html2);
    },
    ////////////////////////////////////////////////
    b01: function (oo) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w100">'+ this.b02() + '编码</th>\
          <th>首图</th>\
          <th class="p-0">'+ this.b05(obj.arr[7]) + '</th>\
          <th class="p-0">'+ this.b06(obj.arr[8]) + '</th>\
          <th>自动匹配的【详情ID】（相似度）</th>\
          <th class="w170">添加时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.open4(\'js01\');">\
                <a class="dropdown-item pointer" title="手动审核通过:敦煌网 &gt; 已上传商品 &gt; 商品 &gt; 手动审核状态 &gt; 9.图片且详情审核通过">获取敦煌网【手动审核通过】的商品</a>\
            </li>\
	        <li onClick="Tool.open4(\'js04\');"><a class="dropdown-item pointer">*给【首图】【放大镜图】【属性图】【详情图】搜货源</a></li>\
	        <li onClick="Tool.open4(\'js02\');"><a class="dropdown-item pointer">计算自动匹配的【详情ID】【相似度】</a></li>\
	        <li onClick="Tool.open4(\'js06\');"><a class="dropdown-item pointer">把【1688】和【淘宝】自动匹配的【详情ID】（相似度）同步过来</a></li>\
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
        return html;
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
    b05: function (val) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="fun.c03(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">手动审核状态</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b06: function (val) {
        let nArr = [], arr = Tool.AfterReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="fun.c04(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">敦煌审核后本地状态</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b07: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b08(obj.arr[5]) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="3">自动匹配的【详情ID】</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b08: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "自动匹配的【详情ID】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b09: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.goodsId=" + Tool.unescape(obj.arr[6])); break;//自动匹配的【详情ID】
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.ManualReview=" + obj.arr[7]); }
        if (obj.arr[8] != "-_-20") { arr.push("@.AfterReview=" + obj.arr[8]); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b10: function (oo) {
        let str = '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="拼多多的【自动匹配的【详情ID】（相似度）】"><a href="https://pifa.pinduoduo.com/goods/detail/?gid=' + oo.goodsId + '" target="_blank">' + oo.goodsId + '</a>（' + oo.goodsId_Similarity + '%）</td></tr>\
            <tr><td title="1688的【自动匹配的【详情ID】（相似度）】"><a href="https://detail.1688.com/offer/'+ oo.fromid_1688 + '.html" target="_blank">' + oo.fromid_1688 + '</a>（' + oo.fromid_Similarity_1688 + '%）</td></tr>\
            <tr><td title="淘宝的【自动匹配的【详情ID】（相似度）】"><a href="https://item.taobao.com/item.htm?id=' + oo.itemId_taobao + '" target="_blank">' + oo.itemId_taobao + '</a>（' + oo.itemId_Similarity_taobao + '%）</td></tr>\
        </table>'
        return str;
    },
    //////////////////////////////////////////
    c01: function (val) {
        let name = this.b08("" + val);
        $("#Field").html(name).val(val);
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },
    c03: function (val) {
        Tool.open(7, val);
    },
    c04: function (val) {
        Tool.open(8, val);
    },
}
fun.a01()