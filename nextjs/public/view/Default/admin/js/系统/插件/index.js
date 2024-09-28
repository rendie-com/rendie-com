'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            obj.arr[6] = obj.arr[6] && obj.arr[6] != "-_-20" ? parseInt(obj.arr[6]) : 1;//翻页
            Tool.scriptArr(['admin/js/工具/API资源库/商品.js']);
        }
        else if (obj.arr[3] == "js02") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//采集模式---不清楚
            obj.arr[7] = obj.arr[7] ? parseInt(obj.arr[7]) : 1;//翻页
            Tool.scriptArr(['admin/js/工具/API资源库/商品_采集.js']);
        }
        else if (obj.arr[3] == "js03") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            Tool.scriptArr(['admin/js/工具/API资源库/类目.js']);
        }
        else if (obj.arr[3] == "js04") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            Tool.scriptArr(['admin/js/工具/API资源库/国家.js']);
        }
        else if (obj.arr[3] == "js05") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//采集模式---不清楚
            obj.arr[7] = obj.arr[7] ? parseInt(obj.arr[7]) : 1;//翻页
            Tool.scriptArr(['admin/js/工具/API资源库/类目_采集.js']);
        }
        else if (obj.arr[3] == "js06") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库id
            Tool.scriptArr(['admin/js/工具/API资源库/数据表.js']);
        }
        else if (obj.arr[3] == "js07") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库表名
            Tool.scriptArr(['admin/js/工具/API资源库/数据表_查看.js']);
        }
        else if (obj.arr[3] == "js08") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
            obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//API资源库表名
            Tool.scriptArr(['admin/js/工具/API资源库/数据表_采集.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
            this.a02();
        }
    },
    a02: function () {
        let str = '[\
        {\
          "size":20,\
          "count":<@count/>\
        }\
        <r:download size=20 page=2 where=" order by @.sort desc">,\
        {\
          "id":<:id/>,\
          "sort":<:sort/>,\
          "addtime":"<:addtime/>",\
          "token":"<:token/>",\
          "url":"<:url/>",\
          "name":"<:name/>"\
        }\
        </r:download>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ arr[i].id + '</td>\
        <td class="p-0"><input type="text" value="'+ arr[i].name + '" class="form-control form-control-sm" onblur="fun.c05($(this),' + arr[i].id + ',\'name\',\'' + arr[i].name + '\')"/></td>\
        <td class="p-0"><input type="text" value="'+ arr[i].url + '" class="form-control form-control-sm" onblur="fun.c05($(this),' + arr[i].id + ',\'url\',\'' + arr[i].url + '\')"/></td>\
        <td class="p-0"><input type="text" value="'+ arr[i].sort + '" class="form-control form-control-sm center" onblur="fun.c05($(this),' + arr[i].id + ',\'sort\',\'' + arr[i].sort + '\')"/></td>\
        <td class="p-0">'+ arr[i].token + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
        <td style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li onClick="fun.c04(\'js01\','+ arr[i].id + ')"><a class="dropdown-item pointer">查看应用</a></li>\
            <li onClick="fun.c09('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
          </ul>\
        </td>\
      </tr>'
        }
        html += '<tr><td colspan="7" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>';
        html = '\
    <header class="panel-heading">\
			<div class="active">工具</div>\
			<div>后台模板</div>\
			<div>前台模板</div>\
			<div>系统插件</div>\
		</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
      '+ this.b01() + '\
      <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
    <thead class="table-light">\
    <tr>\
      <th class="w70">id</th>\
      <th>名称</th>\
      <th>URL</th>\
      <th class="w100">排序</th>\
      <th>token</th>\
      <th class="w200">最近采集时间</li>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li onClick="fun.c07()"><a class="dropdown-item pointer">添加【下载源】</a></li>\
        </ul>\
      </th>\
    </tr>\
    </thead>'
        return str
    },
    c01: function () { },
    c04: function (val, id) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/' + val + '/' + r + '/' + id);
    },
    c05: function (This, id, L, V) {
        let val = This.val(), html = "<r: db=\"mysql.admin\">update @.download set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");
            Tool.ajax.a01(html, 1, this.c06, this, [This, val, L]);
        }
    },
    c06: function (t, oo) {
        if (t == "") {
            oo[0].attr("disabled", false); oo[0].val(oo[1]);
        }
        else { alert("出错：" + t); }
    },
    c07: function () {
        let html = '""<r: db="mysql.admin">INSERT into @.download(@.sort,@.addtime)VALUES(999,' + Tool.gettime("") + ')</r:>'
        Tool.ajax.a01(html, 1, this.c08, this);
    },
    c08: function (t) {
        if (t == "") {
            location.reload();
        }
        else { alert("出错：" + t); }
    },
    c09: function (id) {
        let html = '""<r: db="mysql.admin">delete from @.download where @.id=' + id + '</r:>'
        Tool.ajax.a01(html, 1, this.c08, this);
    }
}
fun.a01();