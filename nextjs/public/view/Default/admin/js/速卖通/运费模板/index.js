'use strict';
var fun =
{
    obj: {},
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") {
            Tool.scriptArr(['admin/js/速卖通/运费模板/从商品表中获取运费模板.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//绑定敦煌账号
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//[添加/采模板/采商品/启用]时间
            obj.arr[7] = obj.arr[7] ? parseInt(obj.arr[7]) : 1;//搜索字段
            obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//搜索关键词
            this.a02();
        }
    },
    a02: function () {
        let str = '[\
        {"count":<@count/>,"size":20}\
        <r:freight db="sqlite.aliexpress" size=20 page=2 where="'+ this.b04() + '">,\
		{\
            "id":<:id/>,\
            "freightID":"<:freightID/>",\
            "name":"<:name/>",\
            "freeCountry":"<:freeCountry/>",\
            "addtime":<:addtime/>\
        }\
        </r:freight>]'
        Tool.ajax.a01(str, obj.arr[4],this.a03,  this);
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
              <tr>\
                <td>'+ arr[i].id + '</td>\
                <td>'+ arr[i].freightID + '</td>\
                <td>'+ arr[i].name + '</td>\
                <td class="left">'+ arr[i].freeCountry + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime, "-") + '</td>\
              </tr>'
                }
                html += '<tr><td colspan="7" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>';
                html = this.b06() + '\
            <div class="p-2">\
              <table class="table table-hover center">\
              <thead class="table-light">'+ this.b01(arr[0]) + '</thead>\
              <tbody>'+ html + '</tbody></table>\
            </div>'
        Tool.html(null, null, html);
    },
    b01: function (arr) {
        let str = '\
        <tr>\
            <th style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu" aria-labelledby="dropdown0">\
                    <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js01\')" title="包括28天">从商品表中获取运费模板</a></li>\
                </ul>\
				ID\
			</th>\
            <th>模板ID</th>\
            <th>模板名称</th>\
            <th class="left" title="包括28天">承诺28天内送达的国家且运费小于10美元（用于做免运费模板）</th>\
            <th class="w170">添加时间</th>\
        </tr>'
        return str;
    },
    b04: function () {
        let whereArr = []
        /////////////////////////////////////////////////////////////////////////////////////////
        if (obj.arr[8] != "-_-20") {
            switch (obj.arr[7]) {
                case 1: whereArr.push("@.name='" + Tool.unescape(obj.arr[8]) + "'"); break;//模板名称
                case 2: whereArr.push("@.freightID='" + Tool.unescape(obj.arr[8]) + "'"); break;//模板ID
            }
        }
        /////////////////////////////////////////////
        let str = (whereArr[0] ? " where " + whereArr.join(" and ") : "") + " order by @.addtime desc,@.id desc"
        return str;
    },
    b06: function () {
        return '\
        <header class="panel-heading">【速卖通】运费模板</header>\
        <div class="input-group w-50 m-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[7] + '">' + this.b07(obj.arr[7]) + '</button>\
          <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">模板名称</li>\
            <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">模板ID</a></li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[8] == "-_-20" ? "" : Tool.unescape(obj.arr[8])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (val) {
        let name = "";
        switch (val) {
            case 1: name = "模板名称"; break;
            case 2: name = "模板ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    c01: function (val) {
        let name = this.b07(val)
        $("#Field").html(name).val(val)
    },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = Tool.escape(searchword);
            Tool.main(obj.arr[3] + "/1/-_-20/-_-20/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    }
}
fun.a01();