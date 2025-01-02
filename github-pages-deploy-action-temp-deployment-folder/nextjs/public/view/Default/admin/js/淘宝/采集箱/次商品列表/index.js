'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//DH卖家账户
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//手动审核状态
        this.a02();
    },
    a02: function () {
        let str = '[<@count/>\
        <r:proList size=10 db="sqlite.taobao" page=2 where="'+ this.b06() + '">,\
	    {\
		    "itemId":<:itemId tag=json/>,\
		    "title":<:title tag=json/>,\
		    "shortTitle":<:shortTitle tag=json/>,\
		    "categoryName":<:categoryName tag=json/>,\
		    "levelOneCategoryName":<:levelOneCategoryName tag=json/>,\
		    "shopTitle":<:shopTitle tag=json/>,\
		    "provcity":<:provcity tag=json/>,\
		    "reservePrice":<:reservePrice/>,\
		    "sellerId":<:sellerId/>,\
		    "priceAfterCoupon":<:priceAfterCoupon/>,\
		    "url":<:url tag=json/>,\
		    "picUrl":<:picUrl tag=json/>,\
		    "fromid":<:fromid/>,\
		    "SaleNum":<:SaleNum/>,\
		    "uptime":<:uptime/>,\
		    "addtime":<:addtime/>\
	    }\
        </r:proList>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html1 = ""
        for (let i = 1; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td class="p-0">'+ this.b11(arr[i].itemId, arr[i].fromid, arr[i].SaleNum) + '</td>\
                <td>'+ this.b03(arr[i].picUrl) + '</td>\
                <td class="left p-0">'+ this.b02(arr[i].title, arr[i].url, arr[i].shortTitle, arr[i].reservePrice, arr[i].priceAfterCoupon) + '</td>\
                <td class="p-0">'+ this.b10(arr[i].levelOneCategoryName, arr[i].categoryName) + '</td>\
                <td class="p-0">'+ this.b09(arr[i].shopTitle, arr[i].sellerId) + '</td>\
                <td>'+ arr[i].provcity + '</td>\
                <td class="p-0">'+ this.b08(arr[i].addtime, arr[i].uptime) + '</td>\
            </tr>'
        }
        html1 += '<tr><td colspan="7" class="left">' + Tool.page(arr[0], 10, 4) + '</td></tr>'
        let html2 = Tool.header() + '\
        <div class="p-2">\
			'+ this.b04() + '\
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
            <th style="padding-left: 30px;position: relative;" class="w200">'+ this.b07() + '详情ID/销量</th>\
            <th class="w100">首图</th>\
            <th class="left">标题</th>\
            <th>类目</th>\
            <th>店铺名称</th>\
            <th>发货地</th>\
            <th class="w170">添加时间</th>\
        </tr>'
        return html;
    },
    b02: function (title, url, shortTitle, reservePrice, priceAfterCoupon) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="标题"><a href="' + url + '" target="_blank">' + title + '</a></td></tr>\
            <tr><td title="短描">'+ shortTitle + '</td></tr>\
            <tr><td title="价格">'+ (reservePrice == priceAfterCoupon ? '' : '<s style="color: #999;margin-right:5px;">¥' + reservePrice + '</s>')+'<b>¥' + priceAfterCoupon + '</b></td></tr>\
        </table>'

        let html = ""
        return html
    },
    b03: function (pic) {
        return "<a href=\"" + pic + "\" target=\"_blank\"><img src=\"" + pic + "\" class=\"img-fluid rounded h100\"></a>"
    },
    b04: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b05(obj.arr[5]) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">详情ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">店铺名称</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">标题</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)" value="4">短标题</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(5)" value="5">类型名</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(6)" value="6">类目名</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "详情ID"; break;
            case "2": name = "店铺名称"; break;
            case "3": name = "标题"; break;
            case "4": name = "短标题"; break;
            case "5": name = "类型名"; break;
            case "6": name = "类目名"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.itemId='" + Tool.unescape(obj.arr[6]) + "'"); break;//详情ID
                case "2": arr.push("@.shopTitle='" + Tool.unescape(obj.arr[6]) + "'"); break;//店铺名称
                case "3": arr.push("@.title like'%" + Tool.unescape(obj.arr[6]) + "%'"); break;//标题
                case "4": arr.push("@.shortTitle like'%" + Tool.unescape(obj.arr[6]) + "%'"); break;//短标题
                case "5": arr.push("@.levelOneCategoryName like'%" + Tool.unescape(obj.arr[6]) + "%'"); break;//类型名
                case "6": arr.push("@.categoryName like'%" + Tool.unescape(obj.arr[6]) + "%'"); break;//类目名
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b07: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.open4(\'js07\');"><a class="dropdown-item pointer">*访问详情得到【fromId】</a></li>\
	        <li onClick="Tool.open4(\'js05\');"><a class="dropdown-item pointer">*采集商品详情</a></li>\
        </ul>'
    },
    b08: function (addtime, uptime) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
        </table>'
    },
    b09: function (shopTitle, sellerId) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="店铺名称">'+ shopTitle + '</td></tr>\
            <tr><td title="店铺ID">'+ sellerId + '</td></tr>\
        </table>'
    },
    b10: function (levelOneCategoryName, categoryName) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="类型名">'+ levelOneCategoryName + '</td></tr>\
            <tr><td title="类目名">'+ categoryName + '</td></tr>\
        </table>'
    },
    b11: function (itemId, fromid, SaleNum) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="【客优云】的详情ID">'+ itemId + '</td></tr>\
            <tr><td title="详情ID"><a href="https://item.taobao.com/item.htm?id=' + fromid + '" target="_blank">' + fromid + '</a></td></tr>\
            <tr><td title="销量">'+ SaleNum + '</td></tr>\
        </table>'
    },
    c01: function (val) {
        let name = this.b05("" + val);
        $("#Field").html(name).val(val);
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else {
            alert("请输入搜索内容");
        }
    },
}
fun.a01()