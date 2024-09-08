'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//手动审核状态
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//审核后本地状态
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//时间
        this.a02();
    },
    a02: function () {
        let str = '[\
		{\
            "size":10,\
            "count":<@count/>\
		}\
		<r:product size=10 db="sqlite.ozon" page=2 where="'+ this.b05() + '">,\
		{\
            "pic":<:pic tag=0/>,\
			"proid":"<:proid/>",\
			"fromID":<:fromID/>,\
			"addtime":<:addtime/>,\
			"ManualReview":<:ManualReview/>,\
			"AfterReview":<:AfterReview/>,\
			"isup":<:isup/>,\
			"uptime":<:uptime/>\
		}\
		</r:product>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr1) {
        let html = ""
        for (let i = 1; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td class="p-0">\
		            <table class="table mb-0 table-bordered">\
			            <tr><td title="编码">'+ arr1[i].proid + '</td></tr>\
			            <tr><td title="全球商品ID"><a href="https://seller.ozon.cn/portal/product/mtsku/'+ arr1[i].fromID + '" target="_blank">' + arr1[i].fromID + '</a></td></tr>\
		            </table>\
	            </td>\
                <td>'+ this.b08(arr1[i].pic) + '</td>\
                <td>'+ this.b04(arr1[i].ManualReview, Tool.ManualReviewArr) + '</td>\
                <td>'+ this.b04(arr1[i].AfterReview, Tool.AfterReviewArr) + '</td>\
                <td class="p-0 w160">'+ this.b11(arr1[i].addtime, arr1[i].uptime, arr1[i].isup) + '</td>\
            </tr>';
        }
        html += '<tr><td colspan="8" class="left">' + Tool.page(arr1[0].count, arr1[0].size, 4) + '</td></tr>'
        html = Tool.header() + '\
		<div class="p-2">\
			'+ this.b06() + '\
			<table class="table align-top table-hover center">\
				<thead class="table-light">'+ this.b01(arr1[0]) + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function (oo) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;">'+ this.b10() + '编码/商品ID</th>\
          <th class="w110">首图</th>\
          <th class="p-0">'+ this.b02(obj.arr[7]) + '</th>\
          <th class="p-0">'+ this.b03(obj.arr[8]) + '</th>\
          <th class="p-0">\
		    <select onChange="Tool.open(9,this.options[this.selectedIndex].value)" class="form-select">\
			    <option value="-_-20">时间</option>\
			    <option value="1" '+ (obj.arr[9] == "1" ? 'selected="selected"' : '') + '>上传时间_倒序</option>\
			    <option value="2" '+ (obj.arr[9] == "2" ? 'selected="selected"' : '') + '>更新时间_倒序</option>\
			    <option value="3" '+ (obj.arr[9] == "3" ? 'selected="selected"' : '') + '>未上传</option>\
			    <option value="4" '+ (obj.arr[9] == "4" ? 'selected="selected"' : '') + '>已上传</option>\
		    </select>\
	      </th>\
        </tr>'
        return html;
    },
    b02: function (val) {
        let nArr = [], arr = Tool.ManualReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="fun.c04(this.options[this.selectedIndex].value)" class="form-select">\
          <option value="-_-20">手动审核状态</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b03: function (val) {
        let nArr = [], arr = Tool.AfterReviewArr;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '</option>');
        }
        return '\
        <select onChange="fun.c05(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">敦煌审核后本地状态</option>\
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
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.proid='" + Tool.unescape(obj.arr[6]) + "'"); break;//商品编码
                case "2": arr.push("@.fromID=" + Tool.unescape(obj.arr[6])); break;//DH商品ID
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.ManualReview=" + obj.arr[7]); }
        if (obj.arr[8] != "-_-20") { arr.push("@.AfterReview=" + obj.arr[8]); }
        let str = ""
        switch (obj.arr[9]) {
            case "1": str = " order by @.addtime desc,@.id desc"; break;//【上传时间】倒序
            case "2": str = " order by @.uptime desc,@.id desc"; break;//【更新时间】倒序
            case "3": arr.push("@.isup=0"); break;
            case "4": arr.push("@.isup=1"); break;
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + str;
    },
    b06: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b07(obj.arr[5]) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">商品ID</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
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
              <a href=\"https://image.dhgate.com/webp/m/0x0/" + pic.picB.fileurl + "\" target=\"_blank\">\
                  <img src=\"https://image.dhgate.com/webp/m/100x100/"+ pic.picB.fileurl + "\" class=\"img-fluid rounded h100\">\
              </a>"
        }
        return html;
    },
    b10: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.open4(\'js01\');"><a class="dropdown-item pointer" title="手动审核通过:敦煌网 &gt; 已上传商品 &gt; 商品 &gt; 手动审核状态 &gt; 9.图片且详情审核通过">获取敦煌网【手动审核通过】的商品</a></li>\
            <li onClick="Tool.open4(\'js02\');"><a class="dropdown-item pointer">*将【未上传】的商品上传到【Ozon平台】</a></li>\
            <li onClick="Tool.open4(\'js05\');"><a class="dropdown-item pointer">*将【已上传】的商品进行【归档】</a></li>\
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
    /////////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b07("" + val)
        $("#Field").html(name).val(val)
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (Field == "2" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。")
        }
        else if (searchword) {
            searchword = encodeURIComponent(searchword)
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + Field + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function () {

    },
    c04: function (val) {
        Tool.open(7, val);
    },
    c05: function (val) {
        Tool.open(8, val);
    },
    /////////////////////////////////////////////////////
}
fun.a01();