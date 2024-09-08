'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;
        let str = '[\
        {\
            size:20,\
            count:<@count/>\
        }\
        <r:msghelp db="sqlite.dhgate" size=20 page=2 where=" order by @.id desc">,\
        {\
		    id:<:id/>,\
		    note:<:note tag=json/>,\
		    en:<:en tag=json/>,\
		    cn:<:cn tag=json/>\
        }\
        </r:msghelp>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html1 = ''
        for (let i = 1; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td class="center">'+ i + '</td>\
                <td>' + arr[i].note + '</td>\
                <td>' + arr[i].cn + '</td>\
                <td>' + arr[i].en + '</td>\
                <td style="padding-left: 30px;position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown' + arr[i].id + '"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu" aria-labelledby="dropdown' + arr[i].id + '">\
                <li><a class="dropdown-item pointer" onClick="Tool.open5(\'js09\',' + arr[i].id + ')">修改</a></li>\
                <li><a class="dropdown-item pointer" onClick="fun.c09(' + arr[i].id + ')">删除</a></li>\
                </ul>\
                </td>\
            </tr>'
        }
        html1 += '<tr><td colspan="5">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>';
        let html = Tool.header() + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <thead class="table-light center">'+ this.b01() + '</thead>\
            <tbody>'+ html1 + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
        <tr>\
            <th class="w50">编码</th>\
            <th class="w200">帮助说明</th>\
            <th class="left">中文内容</th>\
            <th class="left">英文内容</th>\
            <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
                <li><a class="dropdown-item pointer" onClick="fun.c03()">添加</a></li>\
            </ul>\
        </th>\
        </tr>'
    },
    c01: function (page) { obj.arr[4] = page; Tool.main("/" + obj.arr.join("/") + ".html"); },
    c02: function () {
        let searchword = encodeURIComponent(Tool.Trim($("#searchword").val()));
        Tool.main(o.mode + obj.arr[0] + "/list/" + obj.arr[2] + "/1/%20/%20/%20/%20/%20/%20/" + $("#Field").val() + "/" + searchword + ".html");
    },
    c03: function () {
        let html = '\"\"<r: db="sqlite.dhgate">insert into @.msghelp(@.note)VALUES(\'-\')</r:>'
        Tool.ajax.a01(html, 1, this.c04, this)
    },
    c04: function (t) {
        if (t == "") { location.reload(); } else { alert("出错：" + t); }
    },
    c09: function (id) {
        if (confirm('确定删除吗?')) {
            let html = "\"\"<r: db=\"sqlite.dhgate\">delete from @.msghelp where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, this.c10, this)
        }
    },
    c10: function (t) {
        if (t == "") {
            window.location.reload();
        }
        else { alert("出错：" + t); }
    }
}
fun.a01();