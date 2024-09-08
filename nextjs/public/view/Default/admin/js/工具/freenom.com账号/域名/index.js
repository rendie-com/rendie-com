'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile         选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "tool",
            sql: "select count(1) as total FROM @.freenom_domains",
        }, {
            action: "sqlite",
            database: "tool",
            sql: "select " + Tool.fieldAs("addtime,fromid,domain,dns,registrationdate,expirydate,sort,id") + " FROM @.freenom_domains order by @.sort asc,@.id asc" + Tool.limit(20, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this)
    },
    a03: function (t) {
        let html = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html += '\
            <tr>\
                <td>'+ arr[i].sort + '</td>\
                <td>'+ arr[i].fromid + '</td>\
                <td>'+ arr[i].domain + '</td>\
                <td>'+ arr[i].dns + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].registrationdate, "/") + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].expirydate, "/") + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
            </tr>'
        }
        html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
          <table class="table table-hover align-middle center">\
            <thead class="table-light">'+ this.b01() + '</thead>\
            <tbody>'+ html + '</tbody>\
          </table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
        <tr>\
          <th class="w70" style="padding-left: 30px;position: relative;">'+ this.b02() + '排序</th>\
          <th>来源ID</th>\
          <th>域名</th>\
          <th>dns服务器</th>\
          <th>注册时间</th>\
          <th>到期时间</th>\
          <th class="w170">添加时间</th>\
        </tr>';
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
            <li><a class="dropdown-item pointer" onClick="Tool.openR(\'?jsFile=js03\')">*获取所有域名</a></li>\
        </ul>'
    },
}
fun.a01();