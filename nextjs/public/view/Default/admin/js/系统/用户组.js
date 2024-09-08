'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") {
            Tool.scriptArr(['admin/js/系统/用户组_修改.js']);
        }
        else {
            this.a02();
        }
    },
    a02: function () {
        let str = '[{}\
    <r:usergroup size=20 where=" order by @.id asc">,\
    {\
      "name":"<:name/>",\
      "descript":"<:Descript tag=js/>",\
      "count1":"<r:manager size=1 where=" where @.GroupID=<:id/>"><:count(1)/></r:manager>",\
      "id":"<:id/>"\
    }\
    </r:usergroup>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ arr[i].id + '</td>\
        <td>'+ arr[i].name + '</td>\
        <td class="left">'+ arr[i].descript + '</td>\
        <td>'+ arr[i].count1 + ' 位</td>\
        <td style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li onClick="Tool.main(\'js01/'+ arr[i].id + '\')"><a class="dropdown-item pointer">编辑</a></li>\
            <li onclick="ManagerDel('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
          </ul>\
        </td>\
      </tr>'
        }
        html = '\
    <header class="panel-heading">用户组管理</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
    <tr>\
      <th>ID</th>\
      <th>用户组名称</th>\
      <th class="left">用户组简介</th>\
      <th>管理员数量</th>\
      <th style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li onclick="Tool.main(\'js01\')"><a class="dropdown-item pointer">添加用户组</a></li>\
        </ul>\
      </th>\
    </tr>'
        return str;
    }
}
fun.a01();