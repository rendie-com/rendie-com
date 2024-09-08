'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
        this.a02();
    },
    a02: function () {
        let str = '[\
    {\
      "count":<@count/>,\
      "size":20\
    }\
    <r:gather db="sqlite.aliexpress" size=20 page=2 where=" order by @.sort desc,@.id desc">,\
    {\
      "id":<:id/>,\
      "name":"<:name tag=js/>",\
      "note":"<:note tag=js/>",\
      "addtime":<:addtime/>,\
      "LastTime":<:LastTime/>,\
      "iswin":"<:iswin/>",\
      "sort":<:sort/>\
    }\
    </r:gather>]'
        Tool.ajax.a01(str, obj.arr[4],this.a03,  this);
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ arr[i].id + '</td>\
        <td class="left">'+ arr[i].name + '</td>\
        <td>'+ arr[i].note + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].addtime, "-") + '</td>\
        <td>'+ Tool.js_date_time2(arr[i].LastTime, "-") + '</td>\
        <td>'+ arr[i].iswin + '</td>\
        <td>'+ arr[i].sort + '</td>\
        <td style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04/'+ arr[i].id + '/2\')">*采集</a></li>\
            <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04/'+ arr[i].id + '/1\')">*预览</a></li>\
            <li><a class="dropdown-item pointer" onClick="Tool.main(\'js01/'+ arr[i].id + '\')">*编辑</a></li>\
            <li><a class="dropdown-item pointer" onClick="fun.c11('+ arr[i].id + ')">克隆</a></li>\
            <li><a class="dropdown-item pointer" onClick="Tool.open5(\'js06\','+ arr[i].id + ')">文本编辑</a></li>\
            <li><a class="dropdown-item pointer" onClick="fun.c04('+ arr[i].id + ')">删除</a></li>\
          </ul>\
        </td>\
      </tr>'
        }
        html += '<tr><td colspan="8" class="left">' + Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>';
        html = this.b02() + '\
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
        <th class="w40">ID</th>\
        <th>采集类目说明</th>\
        <th>采集配置信息说明</th>\
        <th>添加时间</th>\
        <th>上次采集时间</th>\
        <th>是否用软件</th>\
        <th>排序</th>\
        <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown">\
                <li><a class="dropdown-item pointer" onClick="Tool.open4(\'js05\')">批量替换</a></li>\
            </ul>\
        </th>\
    </tr>'
    },
    b02: function () {
        return '\
        <header class="panel-heading">\
	        <div class="active">商品采集</div>\
	        <div onclick="">临时库</div>\
	        <div onclick="">临时库审核</div>\
	        <div onclick="">导入采集规则</div>\
	        <div onclick="">添加采集规则</div>\
	        <div onclick="">评论临时库</div>\
        </header>'
    },
    c04: function (id) {
        let str = '<r: db="sqlite.aliexpress">delete from @.gather where @.id=' + id + '</r:>'
       Tool.ajax.a01( str,1,this.c05,this)
    },
    c01: function () {
    },
    c05: function (txt) { if (txt == "") { alert("删除成功"); window.location.reload(); } else { alert(txt); } },


    c11: function (id) {
        let str = '\
		<r:gather db="sqlite.aliexpress" size=1 where=" where @.id='+ id + '">\
		{\
			"name":"<:name tag=js/>",\
			"note":"<:note tag=js/>",\
			"code":<:code tag=json/>\
		}\
		</r:gather>'
       Tool.ajax.a01( str,1,this.c12,this)
    },
    c12: function (oo) {
        let str = "insert into @.gather(@.name,@.note,@.code,@.addtime)values(" + Tool.rpsql(oo.name) + "," + Tool.rpsql(oo.note) + "," + Tool.rpsql(oo.code) + "," + Tool.gettime("") + ")"
        str = '""<r: db="sqlite.aliexpress">' + str + '</r:>'
        Tool.ajax.a01(str,1,Tool.reload)
    },
}
fun.a01()