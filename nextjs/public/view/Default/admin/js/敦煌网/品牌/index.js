'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        let path = "admin/js/敦煌网/品牌/"
        switch (obj.arr[3]) {
            case "js01": Tool.scriptArr([path + '获取敦煌网品牌.js']); break;
            default:
                obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
                obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//搜索关键词
                this.a02();

        }
    },
    a02: function () {
        let str = '\
        [{\
            "size":20,\
            "count":<@count/>\
        }\
		<r:brand db="sqlite.dhgate" page=2 size="20" '+ (obj.arr[5] == '-_-20' ? '' : 'where=" where @.name like\'%' + Tool.unescape(obj.arr[5]) + '%\'"') + '>,\
        {\
			    "id":<:id/>,\
			    "name":"<:name/>",\
			    "addtime":<:addtime/>\
        }\
        </r:brand>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html2 = "";
        for (let i = 1; i < arr.length; i++) {
            html2 += '\
      <tr>\
        <td class="center">'+ arr[i].id + '</td>\
        <td>'+ arr[i].name + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
      </tr>'
        }
        html2 += '<tr><td colspan="3">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        let html = '\
        <header class="panel-heading">【敦煌网】品牌</header>\
        <div class="p-2">\
        '+ this.b02() + '\
        <table class="table table-hover align-middle">\
        <thead class="table-light">\
        <tr>\
        <th class="w70" style="padding-left: 30px;position: relative;">'+ this.b01() + 'ID</th>\
        <th class="w200">品牌名称</th>\
        <th>添加时间</th>\
        </ul>\
        </thead>\
        <tbody>'+ html2 + '</tbody>\
        </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function (id) {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
            <li onClick="Tool.open4(\'js01\')"><a class="dropdown-item pointer">获取敦煌网品牌</a></li>\
        </ul>'
    },
    b02: function () {
        return '\
    <div class="input-group w-50 mb-2">\
      <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[5])) + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
    </div>'
    },
    c01: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + Tool.escape(searchword));
        } else { alert("请输入搜索内容"); }
    },
}
fun.a01();