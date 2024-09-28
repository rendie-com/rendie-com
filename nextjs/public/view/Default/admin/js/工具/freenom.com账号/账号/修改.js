'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile         选择JS文件
    //obj.params.id 
    this.a02()
  },
  a02: function () {
    let data = [{
      action: "sqlite",
      database: "tool",
      sql: "select " + Tool.fieldAs("sort,email,firstname,password,note") + " FROM @.freenom where @.id=" + obj.params.id,
    }]
    Tool.ajax.a01(data, this.a03, this)
  },
  a03: function (t) {
    let oo = t[0][0]
    let html = Tool.header(obj.params.return, "FREENOM.COM账号 &gt; 修改") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle" id="div1">\
            <tbody>\
            <tr>\
              <td class="w150 right">邮件：</td>\
              <td><input type="text" class="form-control" value="'+ oo.email + '" onblur="fun.c01($(this),\'email\',\'' + oo.email + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">密码：</td>\
              <td><input type="text" class="form-control" value="'+ oo.password + '" onblur="fun.c01($(this),\'password\',\'' + oo.password + '\')"></td>\
              <td></td>\
            </tr>\
             <tr>\
              <td class="w150 right">姓氏：</td>\
              <td><input type="text" class="form-control" value="'+ oo.firstname + '" onblur="fun.c01($(this),\'firstname\',\'' + oo.firstname + '\')"></td>\
              <td></td>\
            </tr>\
           <tr>\
              <td class="right">排序：</td>\
              <td><input type="text" class="form-control" value="'+ oo.sort + '" onblur="fun.c01($(this),\'sort\',\'' + oo.sort + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">备注：</td>\
              <td><textarea rows="10" id="note" class="form-control" onblur="fun.c01($(this),\'note\',\'\')">'+ oo.note + '</textarea></td>\
              <td></td>\
            </tr>\
          </tbody>\
        </table>\
        </div>'
    Tool.html(null, null, html);
  },
  c01: function (This, L, V) {
    let val = This.val();
    if (val != V && !This.attr("disabled")) {
      This.val("加载加...");
      This.attr("disabled", true);
      let txt = '""<r: db="sqlite.tool">update @.freenom set @.' + L + '=\'' + val + '\' where @.id=' + obj.arr[4] + '</r:>'
      Tool.ajax.a01(txt, 1, this.c02, this, [This, val]);
    }
  },
  c02: function (t, This) {
    if (t == "") {
      This[0].attr("disabled", false);
      This[0].val(This[1]);
    }
    else { alert("出错：" + t); }
  },
}
$(function () {
  fun.a01();
})
