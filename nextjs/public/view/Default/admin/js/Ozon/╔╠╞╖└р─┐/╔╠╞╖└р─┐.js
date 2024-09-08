'use strict';
var fun =
{
    a01: function () {
        let str = '[0\
		<r:type db="sqlite.ozon" where=" where @.upid=0 order by @.sort asc" size=50>,\
		{\
			"id":<:id/>,\
			"isleaf":<:isleaf/>,\
			"hide":<:hide/>,\
			"sort":<:sort/>,\
			"name":"<:name/>",\
			"fromID":"<:fromID/>"\
		}\
		</r:type>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let html = '', td1 = '';
        for (let i = 1; i < arr.length; i++) {
            td1 = arr[i].name  + (arr[i].count ? '【<strong>' + arr[i].count + '</strong>】' : '');
            html += '\
            <tr '+ (arr[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
                <td class="center">'+ i + '</td>\
                <td>'+ (arr[i].isleaf == 1 ? '<a href="javascript:" class="Mo"></a>' : '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),' + arr[i].fromID + ')"></a> ') + arr[i].fromID + '</td>\
                <td>'+ td1 + '</td>\
                <td class="center">'+ arr[i].sort + '</td>\
                <td class="left w30" style="padding-left: 30px;position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                <li onClick="fun.c09('+ arr[i].id + ',' + arr[i].hide + ')"><a class="dropdown-item pointer">已' + (arr[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
                </ul>\
                </td>\
            </tr>'
        }
        html = '\
        <header class="panel-heading">OZON -&gt; 类目列表</header>\
        <div class="p-2">\
            <table class="table table-hover">\
                <thead class="table-light">\
                <tr>\
                <th class="w50">编号</th>\
                <th class="w200 center">来源ID</th>\
                <th>分类名称（英文）</th>\
                <th class="w70 center">排序</th>\
                <th class="left w30" style="padding-left: 30px;position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                <li onClick="Tool.open4(\'js01\')"><a class="dropdown-item pointer">*采集类目</a></li>\
                <li onClick="Tool.open4(\'js02\')"><a class="dropdown-item pointer">*采集类目属性</a></li>\
                </ul>\
                </th>\
                </tr>\
                </thead>\
                <tbody>'+ html + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    c03: function (This, id) {
        if (This.attr("Class") == "Mo MoB") { This.attr("Class", "Mo MoA"); $(".Mo" + id).hide(); }
        else {
            This.attr("Class", "Mo MoB")
            if ($(".Mo" + id).length) { $(".Mo" + id).show(); }
            else {
                This.parent().parent().after('<tr><td class="Mo' + id + ' p-0" colspan="8"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>');
                let str = '[0\
                <r:type db="sqlite.ozon" where=" where @.upid='+ id + ' order by @.sort asc" size=200>,\
                {\
                  "id":<:id/>,\
                  "sort":<:sort/>,\
                  "hide":<:hide/>,\
                  "fromID":"<:fromID/>",\
                  "name":"<:name tag=js/>",\
                  "isleaf":"<:isleaf/>"\
                }\
                </r:type>]'
                let m1 = parseInt(This.css("margin-left")) + 20
                Tool.ajax.a01(str, 1, this.c04, this, [id, m1])
            }
        }
    },
    c04: function (o1, o2) {
        let html = "", t1 = ""
        for (let i = 1; i < o1.length; i++) {
            if (o1[i].isleaf == "1") {
                t1 = '<a href="javascript:"  onclick="fun.c01($(this),\'' + o1[i].fromID + '\')" class="detail-button">查看属性</a>'
            }
            else { t1 = ""; }
            html += '\
            <tr '+ (o1[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
                <td class="w50 center">'+ i + '</td>\
                <td class="w200">'+ (o1[i].isleaf == 0 ? '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),\'' + o1[i].fromID + '\')" style="margin-left:' + o2[1] + 'px;"></a>' : '<a class="Mo" style="margin-left:' + o2[1] + 'px;"></a>') + '&nbsp;' + o1[i].fromID + '</td>\
                <td class="p-0">'+ o1[i].name  + t1 + '</td>\
                <td class="w70 center">'+ o1[i].sort + '</td>\
                <td class="left w30" style="padding-left: 30px;position: relative;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                <li onClick="fun.c09('+ o1[i].id + ',' + o1[i].hide + ')"><a class="dropdown-item pointer">已' + (o1[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
                </ul>\
                </td>\
            </tr>'
        }
        $(".Mo" + o2[0]).html('\
          <table class="table align-middle table-hover mb-0">\
            <tbody>'+ html + '</tbody>\
          </table>');
    },
    c11: function () {
        let html = '""<r: db="sqlite.ozon">update @.type set @.hide=0 where @.upid=0<1/>update @.type set @.hide=1 where @.upid=0 and @.sort<500</r:>'
        Tool.ajax.a01(html, 1, Tool.reload)
    },
    c12: function () {
        let str = '[0<r:type db="sqlite.ozon" where=" where @.upid=0 and @.hide=0" size=50>,<:fromID/></r:type>]'
        Tool.ajax.a01(str, 1, this.c13, this);
    },
    c13: function (oo) {
        oo.shift();
        alert("有必要再说")
        let html = '""<r: db="sqlite.ozon">update @.type set @.hide=1 where @.upid in(' + oo.join(",") + ') and @.sort<1</r:>'
        //Tool.ajax.a01(html,1,Tool.reload)
    },
}
fun.a01();