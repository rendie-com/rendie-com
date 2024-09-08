'use strict';
var fun =
{
    a01: function () {
        this.a02();
    },
    a02: function () {
        let html = '<r:msghelp db="sqlite.dhgate" size=1 where=" where @.id=' + obj.arr[5] + '">\
        {\
            "id":<:id/>,\
            "note":"<:note tag=js/>",\
            "en":"<:en tag=js/>",\
            "cn":"<:cn tag=js/>"\
        }\
        </r:msghelp>'
        Tool.ajax.a01(html, 1, this.a03, this);
    },
    a03: function (arr) {
        let html = '\
        <header class="panel-heading"><a href="javascript:;" onclick="Tool.main()" class="arrow_back"></a> 站内信帮助_修改</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <tr>\
              <td class="w200 right">帮助说明：</td>\
              <td class="Fnone"><input type="text" value="'+ arr.note + '" onblur=\'fun.c07($(this), ' + arr.id + ', "note","' + arr.note + '")\' class="form-control"></td>\
            </tr>\
            <tr>\
              <td class="right">中文内容：</td>\
              <td class="Fnone"><textarea id="content" rows="10" class="form-control" onblur=\'fun.c07($(this), ' + arr.id + ', "cn","")\'>' + arr.cn + '</textarea></td>\
            </tr>\
            <tr>\
              <td class="right">英文内容：</td>\
              <td class="Fnone"><textarea id="content" rows="10" class="form-control" onblur=\'fun.c07($(this), ' + arr.id + ', "en","")\'>' + arr.en + '</textarea></td>\
            </tr>\
          </table>\
        </div>'
        $("#table").html(html);
    },
    c07: function (This, id, L, V) {
        let val = This.val();
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            let html = val; This.val("加载加...");
            let txt = "\"\"<r: db=\"sqlite.dhgate\">update @.msghelp set @." + L + "='" + val.replace(/'/g, "''") + "' where @.id=" + id + "</r:>"
            Tool.ajax.a01(txt, 1, this.c08, this, [This, html]);
        }
    },
    c08: function (t, oo) {
        if (t == "") {
            oo[0].attr("disabled", false);
            oo[0].val(oo[1]);
        } else { alert("出错：" + t) }
    },
}
fun.a01();