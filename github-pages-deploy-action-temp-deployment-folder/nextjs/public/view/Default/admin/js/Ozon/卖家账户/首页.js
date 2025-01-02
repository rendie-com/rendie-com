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
        <r:seller db="sqlite.ozon" page=2 size=20>,\
        {\
            "phone":<:phone tag=json/>,\
            "addtime":<:addtime/>,\
            "email":"<:email tag=js/>",\
            "username":"<:username tag=js/>",\
            "cookies":<:cookies tag=json/>,\
            "note":"<:note tag=js/>",\
            "id":<:id/>\
        }\
        </r:seller>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let html = ""
        for (let i = 1; i < arr.length; i++) {
            html += '\
            <tr>\
            <td>'+ i + '</td>\
		    <td style="padding-left: 30px;position: relative;">\
			    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
			    <ul class="dropdown-menu">\
				    <li onClick="Tool.main(\'js01/'+ arr[i].id + '\')"><a class="dropdown-item pointer">修改</a></li>\
			        <li onClick="fun.c02('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
			    </ul>\
		    </td>\
            <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].email + '</a></td>\
            <td>' + arr[i].username + '</td>\
            <td>'+ arr[i].phone + '</td>\
            <td>'+ arr[i].note + '</td>\
            <td>'+ Tool.js_date_time2(arr[i].addtime, "/") + '</td>\
            </tr>'
        }
        html += '<tr><td colspan="7"  class="left">' + Tool.page(arr[0], 20, 4) + '</td></tr>'
        html = '\
        <header class="panel-heading">Ozon &gt; 卖家账户</header>\
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
          <th class="w50">编号</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="fun.c01()">添加</a></li>\
            </ul>\
          </th>\
          <th class="left">邮件</th>\
          <th >用户名</th>\
          <th>手机</th>\
          <th>备注</th>\
          <th class="w170">添加时间</th>\
        </tr>'
    },
    c01: function () {
        let html = "\"ok\"<r: db=\"sqlite.ozon\">insert into @.seller(@.addtime)values(" + Tool.gettime("") + ")</r:>"
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c02: function (id) {
        if (confirm('确定要删除吗？')) {
            let html = "\"ok\"<r: db=\"sqlite.ozon\">delete from @.seller where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, Tool.reload)
        }
    }
}
fun.a01();