'use strict';
var fun =
{
    a01: function () {
        let str = '\
		{\
            <r:action db="sqlite.tool" size=1 where=" where @.id='+ obj.arr[5] + '">\
	            "name":"<:name/>",\
	            "note":"<:note/>",\
	            "video":"<:video/>",\
	            "sort":<:sort/>,\
	            "js":"<:js/>"\
            </r:action>\
        }'
        Tool.ajax.a01(str, 1, this.a02, this)
    },
    a02: function (arr) {
        let str = '\
        <tr>\
	        <td class="w100 right">动作名称：</td>\
	        <td><input type="text" class="form-control w300" value="'+ arr.name + '" onblur="fun.c01($(this),\'name\',\'' + arr.name + '\')"></td>\
        </tr>\
        <tr>\
	        <td class="right">动作说明：</td>\
	        <td><input type="text" class="form-control w300" value="'+ arr.note + '" onblur="fun.c01($(this),\'note\',\'' + arr.note + '\')"></td>\
        </tr>\
        <tr>\
	        <td class="right">排序：</td>\
	        <td><input class="form-control center w50" type="text" value="'+ arr.sort + '" onblur="fun.c01($(this),\'sort\',\'' + arr.sort + '\')"></td>\
        </tr>\
        <tr>\
	        <td class="right">视频地址：</td>\
	        <td><input type="text" class="form-control" value="'+ arr.video + '" onblur="fun.c01($(this),\'video\',\'' + arr.video + '\')"></td>\
        </tr>\
        <tr>\
	        <td class="right">js文件地址：</td>\
	        <td colspan="2"><input type="text" class="form-control" value="'+ arr.js + '" onblur="fun.c01($(this),\'js\',\'' + arr.js + '\')"></td>\
        </tr>'
        let html = Tool.header('修改动作') + '<div class="p-2"><table class="table table-hover align-middle"><tbody>'+ str + '</tbody></table></div>'
        Tool.html(null, null, html);
    },
    c01: function (This, L, V) {
        let val = This.val(), html = '';
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            if (L == "PurchaseStatus") {
                let oo = This.find("option:selected");
                This.find("option").attr("selected", false);
                oo.attr("selected", true);
                html = This.html();//先选中，再取代码
                This.html("<option>加载加...</option>");
            }
            else {
                html = val; This.val("加载加...");
            }
            let txt = "\"\"<r: db=\"sqlite.tool\">update @.action set @." + L + "='" + val + "' where @.id=" + obj.arr[5] + "</r:>"
            Tool.ajax.a01(txt, 1, this.c02, this, [This, html]);
        }
    },
    c02: function (t, This) {
        if (t == "") {
            This[0].attr("disabled", false);
            if (This[1].indexOf('</option>') == -1) {
                This[0].val(This[1]);
            }
            else {
                This[0].html(This[1]);
            }
        } else { alert("出错：" + t) }
    }
}
fun.a01();