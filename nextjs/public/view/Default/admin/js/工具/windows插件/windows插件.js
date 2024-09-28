'use strict';
var fun =
{
    a01: function () {
        //obj.arr[3]            选择JS文件
        this.a02();
    },
    a02: function () {
        let str = '\
		[0\
		<r:action db="sqlite.tool" size=30 page=2 where=" order by @.sort asc,@.id asc">\
		,{\
			"id":<:id/>,\
			"name":"<:name/>",\
			"note":"<:note/>",\
			"video":"<:video/>",\
			"sort":<:sort/>,\
			"addtime":"<:addtime/>"\
		}\
		</r:action>]'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (arr) {
        let str = ''
        for (let i = 1; i < arr.length; i++) {
            str += '\
            <tr>\
            <td>'+ arr[i].id + '</td>\
            <td>'+ arr[i].name + '</td>\
            <td>'+ arr[i].note + '</td>\
            <td>'+ arr[i].video + '</td>\
            <td>'+ arr[i].sort + '</td>\
            <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            <td style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ arr[i].id + '"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown'+ arr[i].id + '">\
            <li><a class="dropdown-item pointer" onClick="Tool.open5(\'js02\','+ arr[i].id + ')">打开</a></li>\
            <li><a class="dropdown-item pointer" onClick="Tool.open5(\'js01\','+ arr[i].id + ')">修改</a></li>\
            <li><a class="dropdown-item pointer" onClick="fun.c03('+ arr[i].id + ')">删除</a></li>\
            </ul>\
            </td>\
            </tr>'
        }
        let html = '\
        <header class="panel-heading">Windows插件（注：此功能只对【RenDie软件】有效）</header>\
        <div class="p-2">\
            <table class="table table-hover align-middle center">\
                <thead class="table-light">\
                    <tr>\
                    <th class="w50">ID</th>\
                    <th>名称</th>\
                    <th>说明</th>\
                    <th>视频</th>\
                    <th class="w50">排序</th>\
                    <th class="w170">添加时间</th>\
                    <th class="w30" style="padding-left: 30px;position: relative;">\
                    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
                    <ul class="dropdown-menu" aria-labelledby="dropdown0">\
                    <li><a class="dropdown-item pointer" onClick="fun.c01()">添加</a></li>\
                    </ul>\
                    </th>\
                    </tr>\
                </thead>\
                <tbody>'+ str + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    c01: function () {
        let html = '""<r: db="sqlite.tool">insert into @.action(@.addtime)values(' + Tool.gettime("") + ')</r:>';
        Tool.ajax.a01(html, 1, this.c02, this);
    },
    c02: function (t) {
        if (t == "") {
            window.location.reload();
        } else {
            alert("出错：" + t);
        }
    },
    c03: function (id) {
        if (confirm('确定删除吗?')) {
            let html = "\"\"<r: db=\"sqlite.tool\">delete from @.action where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, this.c02, this)
        }
    }
}
fun.a01();