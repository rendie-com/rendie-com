'use strict';
var fun =
{
    a01: function () {
        let str = '[0\
		<r:categories db="sqlite.tiktok" where=" where @.parent_id=0 order by @.sort asc" size=50>,\
		{\
			"id":<:id/>,\
			"is_leaf":<:is_leaf/>,\
			"sort":<:sort/>,\
			"name":"<:name/>",\
			"fromID":"<:fromID/>"\
		}\
		</r:categories>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let html1 = ''
        for (let i = 1; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ i + '</td>\
		        <td class="left">'+ (arr[i].is_leaf == 1 ? '<a href="javascript:" class="Mo"></a>' : '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),' + arr[i].fromID + ')"></a> ') + arr[i].fromID + '</td>\
                <td class="left">'+ arr[i].name + '</td>\
                <td>'+ arr[i].sort + '</td>\
            </tr>'
        }
        let html2 = '<header class="panel-heading">TikTok &gt; 类目</header>\
        <div class="p-2">\
            <table class="table table-hover center">\
                <thead class="table-light">\
                    <tr>\
                        <th class="left w70" style="padding-left: 30px;position: relative;">\
                            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                            <ul class="dropdown-menu">\
                                <li onClick="Tool.open4(\'js01\')"><a class="dropdown-item pointer">*采集类目</a></li>\
                                <li onClick="Tool.open4(\'js02\')"><a class="dropdown-item pointer">*采集类目属性</a></li>\
                            </ul>编号\
                        </th>\
                        <th class="w200">来源ID</th>\
                        <th class="left">分类名称</th>\
                        <th class="w70">排序</th>\
                    </tr>\
                </thead>\
                <tbody>'+ html1 +'</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html2);
    },
}
fun.a01();