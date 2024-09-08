'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        if (obj.arr[3] == "js01") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//ID
            Tool.scriptArr(['admin/js/敦煌网/商品采集/修改/1.设置基本参数.js']);
        }
        else if (obj.arr[3] == "js02") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//ID
            Tool.scriptArr(['admin/js/敦煌网/商品采集/修改/2.列表页连接设置.js']);
        }
        else if (obj.arr[3] == "js03") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//ID
            Tool.scriptArr(['admin/js/敦煌网/商品采集/修改/3.内容页连接设置.js']);
        }
        else if (obj.arr[3] == "js04") {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//ID
            Tool.scriptArr(['admin/js/敦煌网/商品采集/修改/common.js','admin/js/敦煌网/商品采集/修改/4.预览结果.js']);
        }
        else {
            obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
            this.a02();
        }
    },
    a02: function () {
        let str = '[\
    {\
      "count":<@count/>,\
      "size":20\
    }\
    <r:gather db="sqlite.dhgate" size=20 page=4 where=" order by @.sort desc,@.id desc">,\
    {\
      "id":<:id/>,\
      "name":"<:name tag=js/>",\
      "note":"<:note tag=js/>",\
      "addtime":"<:addtime/>",\
      "LastTime":"<:LastTime/>",\
      "iswin":"<:iswin/>",\
      "sort":<:sort/>\
    }\
    </r:gather>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this);
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
      <td>'+ arr[i].id + '</td>\
      <td>'+ arr[i].name + '</td>\
      <td>'+ arr[i].note + '</td>\
      <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
      <td>'+ Tool.js_date_time2(arr[i].LastTime) + '</td>\
      <td>'+ arr[i].sort + '</td>\
      <td style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04/'+ arr[i].id + '/2\')">*采集</a></li>\
          <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04/'+ arr[i].id + '/1\')">*预览</a></li>\
          <li><a class="dropdown-item pointer" onClick="Tool.main(\'js01/'+ arr[i].id + '\')">*编辑</a></li>\
          <li><a class="dropdown-item pointer" onClick="fun.c05('+ arr[i].id + ')">克隆</a></li>\
          <li><a class="dropdown-item pointer" onClick="fun.c04('+ arr[i].id + ')">删除</a></li>\
        </ul>\
      </td>\
      </tr>'
        }
        html += '<tr><td colspan="7" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>';
        html = '\
    <header class="panel-heading">\
      <div class="active">商品采集</div>\
      <div>临时库</div>\
      <div>临时库[审核]</div>\
      <div>评论临时库</div>\
    </header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
    <tr>\
      <th class="w50">ID</th>\
      <th>采集类目说明</th>\
      <th>采集配置信息说明</th>\
      <th>添加时间</th>\
      <th>上次采集时间</th>\
      <th class="w50">排序</th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li><a class="dropdown-item pointer" onClick="fun.c02()">添加</a></li>\
        </ul>\
      </th>\
    </tr>'
    },
    c01: function () {

    },
    c02: function () {
        let str = '""<r: db="sqlite.dhgate">insert into @.gather(@.addtime)values(' + Tool.gettime("") + ')</r:>'
        Tool.ajax.a01(str,1,this.c03,  this);
    },
    c03: function (t) {
        if (t == "") { location.reload(); }
        else { Tool.pre(["出错", t]); }
    },
    c04: function (id) {
        let str = '""<r: db="sqlite.dhgate">delete from @.gather where @.id=' + id + '</r:>'
        Tool.ajax.a01( str,1,this.c03, this)
    },
    c05: function (id) {
        let str = '\
		<r:gather db="sqlite.dhgate" size=1 where=" where @.id='+ id + '">\
		{\
			"name":"<:name tag=js/>",\
			"note":"<:note tag=js/>",\
      "sort":<:sort/>,\
			"code":<:code tag=0/>\
		}\
		</r:gather>'
        Tool.ajax.a01( str,1, this.c06,this)
    },
    c06: function (obj2) {
        let code = (JSON.stringify(obj2.code)).replace(/'/ig, "''").replace(/\\/ig, "\\\\")
        let note = (obj2.note).replace(/'/ig, "''")
        let str = "insert into @.gather(@.name,@.note,@.code,@.sort,@.addtime)values('" + (obj2.name).replace(/'/ig, "''") + "','" + note + "','" + code + "'," + (obj2.sort + 1) + "," + Tool.gettime("") + ")"
        str = '<r: db="sqlite.dhgate">' + str + '</r:>'
        Tool.ajax.a01( str,1,this.c07, this)
    },
    c07: function (txt) { if (txt == "") { alert("克隆成功"); window.location.reload(); } else { Tool.pre(txt); } },
}
fun.a01()