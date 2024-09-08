'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//状态
        this.a02();
    },
    a02: function () {
        let str = '[<@count/>\
        <r:proList size=10 db="sqlite.1688" page=2 where="'+ this.b05() + '">,\
	    {\
		    "fromid":<:fromid/>,\
		    "freight":<:freight/>,\
		    "unit":<:unit tag=json/>,\
		    "imgUrl":<:imgUrl tag=json/>,\
            "subject":<:subject tag=json/>,\
            "companyName":<:companyName tag=json/>,\
            "province":<:province tag=json/>,\
            "city":<:city tag=json/>,\
            "companyUrl":<:companyUrl tag=json/>,\
            "brand":<:brand tag=json/>,\
            "categoryId":<:categoryId tag=json/>,\
		    "state":<:state/>,\
		    "errorMsg":<:errorMsg tag=json/>,\
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
                <td>'+ this.b03(arr[i].imgUrl) + '</td>\
                <td class="left">\
                    <a href="https://detail.1688.com/offer/'+ arr[i].fromid + '.html" target="_blank">' + arr[i].subject + '</a><hr/>\
                    <span class="mx-2">详情ID：' + arr[i].fromid + '</span><span class="mx-2">单位：' + arr[i].unit + '</span>\
                </td>\
                <td class="p-0">'+ this.b07(arr[i].state, arr[i].errorMsg) + '</td>\
                <td> ' + arr[i].freight + '</td>\
                <td><a href="'+ arr[i].companyUrl + '" target="_blank">' + arr[i].companyName + '</a></td>\
                <td>'+ arr[i].province + ' ' + arr[i].city + '</td>\
                <td>'+ arr[i].brand + '</td>\
                <td>'+ arr[i].categoryId + '</td>\
                <td class="p-0">'+ this.b09(arr[i].addtime, arr[i].uptime) + '</td>\
            </tr>'
        }
        let html2 = Tool.header() + '\
        <div class="p-2">\
			'+ this.b02() + '\
			<table class="table center table-hover">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>\
            ' + Tool.page(arr[0], 10, 4) + '\
		</div>'
        Tool.html(null, null, html2)
    },
    ////////////////////////////////////
    b01: function (oo) {
        let html = '\
        <tr>\
          <th style="padding-left: 30px;position: relative;" class="w100">'+ this.b06() + '首图</th>\
          <th class="left">标题</th>\
          <th class="w230 p-0">'+ this.b10(obj.arr[7], config.proList_state_count) + '</th>\
          <th>运费</th>\
          <th>公司</th>\
          <th>发货地</th>\
          <th>品牌</th>\
          <th>类目ID</th>\
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
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">公司</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)" value="3">品牌</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)" value="4">标题</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b03: function (pic) {
        return "<a href=\"" + pic + "\" target=\"_blank\"><img src=\"" + pic.split(".jpg")[0] + ".120x120.jpg\" class=\"img-fluid rounded h100\"></a>"
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "详情ID"; break;
            case "2": name = "公司"; break;
            case "3": name = "品牌"; break;
            case "4": name = "标题"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function () {
        let arr = [];
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.fromid=" + Tool.unescape(obj.arr[6])); break;//详情ID
                case "2": arr.push("@.companyName='" + Tool.unescape(obj.arr[6]) + "'"); break;//公司
                case "3": arr.push("@.brand='" + Tool.unescape(obj.arr[6]) + "'"); break;//品牌
                case "4": arr.push("@.subject like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//品牌
            }
        }
        if (obj.arr[7] != "-_-20") { arr.push("@.state=" + obj.arr[7]); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and ")) + " order by @.uptime desc";
    },
    b06: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.open4(\'js05\');"><a class="dropdown-item pointer">*首次采集商品详情</a></li>\
	        <li onClick="Tool.open4(\'js12\');"><a class="dropdown-item pointer">*重新采集商品详情</a></li>\
	        <li onClick="Tool.open4(\'js13\');"><a class="dropdown-item pointer">把详情的99个旧数据库复制到新版详情的99个数据库中</a></li>\
	        <li onClick="Tool.open4(\'js07\');"><a class="dropdown-item pointer">把【offerList表】复制到【proList表】中</a></li>\
	        <li onClick="Tool.open4(\'js19\');"><a class="dropdown-item pointer">从data字段中提取信息【prodes】</a></li>\
	        <li onClick="Tool.open4(\'js20\');"><a class="dropdown-item pointer">从data字段中提取信息【prolist】</a></li>\
	        <li onClick="Tool.open4(\'js26\');"><a class="dropdown-item pointer">获取属性内有【主要下游平台】</a></li>\
        </ul>'
    },
    b07: function (state, errorMsg) {
        let str = '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="商品状态">'+ this.b08(state) + '</td></tr>\
            <tr><td title="出错原因">'+ errorMsg + '&nbsp;</td></tr>\
        </table>'
        return str;
    },
    b08: function (state) {
        let str = ""
        switch (state) {
            case 0: str = "正常"; break;
            case 1: str = "404错误"; break;
            case 2: str = "商品已下架"; break;
            case 3: str = "采集内容已改变"; break;
            case 4: str = "xxxxx"; break;
            case 5: str = "xxxxx"; break;
            case 6: str = "库存为零"; break;
            case 7: str = "1688自已出错了"; break;
            case 8: str = "1688的另一个版本"; break;
            case 9: str = "xxxxx"; break;
            default: str = "未知：" + state;
        }
        return str;
    },
    b09: function (addtime, uptime) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
            <tr><td title="更新时间">'+ Tool.js_date_time2(uptime) + '</td></tr>\
        </table>'
    },
    b10: function (val, configArr) {
        let nArr = [], arr = [
            [0, "正常"],
            [1, "404错误"],
            [2, "商品已下架"],
            [3, "采集内容已改变"],
            [4, "xxxxx"],
            [5, "xxxxx"],
            [6, "库存为零"],
            [7, "1688自已出错了"],
            [8, "1688的另一个版本"],
            [9, "xxxxx"]
        ];
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (arr[i][0] == val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '(' + configArr[i] + ')</option>');
        }
        return '\
        <select onChange="fun.c03(this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    //////////////////////////////////
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
    c03: function (val) {
        if (val == "-1") {
            Tool.open4("js21");
        }
        else {
            Tool.open(7, val);
        }
    },
}
fun.a01()