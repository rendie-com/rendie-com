'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        let str = '[\
		{\
      "size":30,\
      "count":<@count/>\
		}\
    <r:buyer size=30 db="sqlite.dhgate" page=2 where=" order by @.sort asc,@.id asc">,\
    {\
      "sort":<:sort/>,\
      "isdefault":"<:isdefault/>",\
      "UserName":"<:UserName tag=js/>",\
      "password":"<:password tag=js/>",\
      "note":"<:note tag=js/>",\
      "isdefault":"<:isdefault/>",\
      "id":<:id/>\
    }\
    </r:buyer>]'
        Tool.ajax.a01(str, obj.arr[4], this.a02, this)
    },
    a02: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td class="p-0">\
          <input type="text" value="'+ arr[i].sort + '" class="form-control center" onblur="fun.c04($(this),' + arr[i].id + ',\'sort\',\'' + arr[i].sort + '\')">\
        </td>\
        <td>\
          <div class="custom-control custom-radio">\
          <input type="radio" class="custom-control-input" value="'+ arr[i].id + '" name="pre_id" id="customradio' + arr[i].id + '" ' + (arr[i].isdefault == "1" ? 'checked="checked"' : '') + ' onclick="fun.c06(' + arr[i].id + ');">\
          <label class="custom-control-label" for="customradio'+ arr[i].id + '"></label>\
          </div>\
        </td>\
        <td class="p-0">\
          <input type="text" value="'+ arr[i].UserName + '" class="form-control" onblur="fun.c04($(this),' + arr[i].id + ',\'UserName\',\'' + arr[i].UserName + '\')">\
        </td>\
        <td class="p-0">\
          <input type="text" value="'+ arr[i].password + '" class="form-control" onblur="fun.c04($(this),' + arr[i].id + ',\'password\',\'' + arr[i].password + '\')">\
        </td>\
        <td class="p-0">\
          <input type="text" value="'+ arr[i].note + '" class="form-control" onblur="fun.c04($(this),' + arr[i].id + ',\'note\',\'' + arr[i].note + '\')">\
        </td>\
      </tr>'
        }
        html += '<tr><td colspan="5" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = '\
    <header class="panel-heading">采购账户</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
    <tr>\
      <th class="w70" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="fun.c03()"><a class="dropdown-item pointer">添加</a></li>\
        </ul>\
			</th>\
      <th class="w50">默认</th>\
      <th class="w200">用户名</th>\
      <th class="w200">密码</th>\
      <th class="left">备注</th>\
    </tr>'
    },
    c01: function () { },
    c02: function (t) {

    },
    c03: function () {
        let html = "<r: db=\"sqlite.dhgate\">insert into @.buyer(@.sort)VALUES(0)</r:>"
        Tool.ajax.a01( html,1,this.c02, this)
    },
    c04: function (This, id, L, V) {
        let val = This.val(), html = "<r: db=\"sqlite.dhgate\">update @.buyer set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");
            Tool.ajax.a01(html,1, this.c05, this, [This, val, L]);
        }
    },
    c05: function (t, oo) {
        if (t == "") {
            oo[0].attr("disabled", false); oo[0].val(oo[1]);
        }
        else { alert(t); }
    },
    c06: function (id) {
        let html = '""<r: db="sqlite.dhgate">update @.buyer set @.isdefault=0 where @.isdefault=1<1/>update @.buyer set @.isdefault=1 where @.id=' + id + '</r:>'
        Tool.ajax.a01(html,1,Tool.reload)
    }
}
fun.a01();