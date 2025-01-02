'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        this.a02();
    },
    a02: function () {
        let str = '[<@count/>\
        <r:buyer db="sqlite.aliexpress" page=2 size=20 where=" order by @.sort asc,@.id asc">,\
        {\
          "sort":<:sort/>,\
          "addtime":<:addtime/>,\
          "isdefault":<:isdefault/>,\
          "username":"<:username tag=js/>",\
          "note":"<:note tag=js/>",\
          "isdefault":"<:isdefault/>",\
          "id":<:id/>\
        }\
        </r:buyer>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = ''
        for (let i = 1; i < arr.length; i++) {
            html += '\
            <tr>\
            <td>'+ arr[i].sort + '</td>\
            <td><input type="radio" class="form-check-input" value="'+ arr[i].id + '" name="pre_id" ' + (arr[i].isdefault == 1 ? 'checked="checked"' : '') + ' onclick="fun.c01(' + arr[i].id + ']);"></td>\
		    <td style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu">\
				    <li onClick="Tool.main(\'js01/'+ arr[i].id + '\')"><a class="dropdown-item pointer">修改</a></li>\
				    <li onClick="fun.c03('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
			    </ul>\
		    </td>\
            <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a></td>\
            <td>'+ arr[i].note + '</td>\
            <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
            </tr>'
        }
        html += '<tr><td colspan="10"  class="left">' + Tool.page(arr[0], 20, 4) + '</td></tr>'
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
          <th class="w60">排序</th>\
          <th class="w60">默认</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c02()">添加</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js02\')" title="用【腾讯企业邮箱】注册">*企业邮箱注册账号</a></li>\
            </ul>\
          </th>\
          <th class="w250 left">用户名</th>\
          <th>备注</th>\
          <th>添加时间</th>\
        </tr>'
    },
    c01: function (id) {
        let html = '""<r: db="sqlite.aliexpress">update @.buyer set @.isdefault=0 where @.isdefault=1<1/>update @.buyer set @.isdefault=1 where @.id=' + id + '</r:>'
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c02: function () {
        let html = '""<r: db="sqlite.aliexpress">INSERT into @.buyer(@.addtime)VALUES(' + Tool.gettime("") + ')</r:>'
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c03: function (id) {
        if (confirm('确定要删除吗？')) {
            let html = '""<r: db="sqlite.aliexpress">delete from @.buyer where @.id=' + id + '</r:>'
            Tool.ajax.a01(html, 1, Tool.reload)
        }
    },
}
fun.a01();