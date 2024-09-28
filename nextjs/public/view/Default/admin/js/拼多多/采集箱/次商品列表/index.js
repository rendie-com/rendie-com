'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        this.a02();
    },
    a02: function () {
        let str = '[<@count/>\
        <r:goodsList size=10 db="sqlite.pinduoduo" page=2 where="'+ this.b05() + '">,\
	    {\
		    "goodsId":<:goodsId/>,\
		    "salesTipAmount":<:salesTipAmount/>,\
		    "minDiscount":<:minDiscount/>,\
		    "state":<:state/>,\
		    "errorMsg":<:errorMsg tag=json/>,\
		    "goodsName":<:goodsName tag=json/>,\
		    "goodsImgUrl":<:goodsImgUrl tag=json/>,\
		    "mallName":<:mallName tag=json/>,\
		    "mallGoodsRegion":<:mallGoodsRegion tag=json/>,\
		    "goodsStagePrices":<:goodsStagePrices tag=json/>,\
		    "uptime":<:uptime/>,\
		    "addtime":<:addtime/>\
	    }\
        </r:goodsList>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html1 = ""
        for (let i = 1; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td><a href="https://pifa.pinduoduo.com/goods/detail/?gid='+ arr[i].goodsId + '" target="_blank">' + arr[i].goodsId + '</a></td>\
                <td>'+ this.b03(arr[i].goodsImgUrl) + '</td>\
                <td class="left">'+ arr[i].goodsName + '<hr/>' + arr[i].goodsStagePrices + '</td>\
                <td class="p-0">'+ this.b09(arr[i].state, arr[i].errorMsg) + '</td>\
                <td>'+ arr[i].salesTipAmount + '</td>\
                <td>'+ arr[i].minDiscount + '</td>\
                <td>'+ arr[i].mallName + '</td>\
                <td>'+ arr[i].mallGoodsRegion + '</td>\
                <td class="p-0">'+ this.b07(arr[i].addtime, arr[i].uptime) + '</td>\
            </tr>'
        }
        html1 += '<tr><td colspan="9" class="left">' + Tool.page(arr[0], 10, 4) + '</td></tr>'
        let html2 = Tool.header() + '\
        <div class="p-2">\
			'+ this.b02() + '\
			<table class="table center table-hover">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html2)
    },
    b01: function (oo) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w200">'+ this.b06() + '详情ID</th>\
          <th class="w100">首图</th>\
          <th class="left">标题</th>\
          <th class="w200">状态</th>\
          <th class="w70">销量</th>\
          <th class="w70">折扣</th>\
          <th class="w200">店铺名称</th>\
          <th class="w200">发货地</th>\
          <th class="w170">时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b04(obj.arr[5]) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">详情ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">店铺名称</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">标题</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b03: function (pic) {
        let html = "<a href=\"" + pic + "\" target=\"_blank\"><img src=\"" + pic + "?imageView2/2/w/100/q/85\" class=\"img-fluid rounded h100\"></a>"
        return html
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "详情ID"; break;
            case "2": name = "店铺名称"; break;
            case "3": name = "标题"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.goodsId=" + Tool.unescape(obj.arr[6])); break;//详情ID
                case "2": arr.push("@.mallName='" + Tool.unescape(obj.arr[6]) + "'"); break;//店铺名称
                case "3": arr.push("@.goodsName like'%" + Tool.unescape(obj.arr[6]) + "%'"); break;//标题
            }
        }
        let str = ' order by @.uptime desc'
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + str;
    },
    b06: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.open4(\'js05\');"><a class="dropdown-item pointer">*采集商品详情</a></li>\
        </ul>'
    },
    b07: function (addtime, uptime) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
        </table>'
    },
    b09: function (state, errorMsg) {
        let str = '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="商品状态">'+ this.b10(state) + '</td></tr>\
            <tr><td title="出错原因">'+ errorMsg + '&nbsp;</td></tr>\
        </table>'
        return str;
    },
    b10: function (state) {
        let str = ""
        switch (state) {
            case 0: str = "正常"; break;
            case 1: str = "已下架"; break;
            default: str = "未知"; break;
        }
        return str;
    },
    //////////////////////////////
    c01: function (val) {
        let name = this.b04("" + val);
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
}
fun.a01()