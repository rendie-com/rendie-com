'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 0;//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : 0;//ID
        this.a02(obj.arr[5])
    },
    a02: function (id) {
        let str = '{\
        <r:buyer db="sqlite.shopee" size=1 where=" where @.id='+ id + '">\
            "sort":<:sort/>,\
            "site":<:site tag=json/>,\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "note":"<:note tag=js/>",\
            "mail":"<:mail tag=js/>",\
            "id":<:id/>\
        </r:buyer>}'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (oo) {
        let html = Tool.header("Shopee &gt; 修改") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle" id="div1">\
            <tbody>\
            <tr>\
              <td class="w150 right">站点：</td>\
              <td><input type="text" class="form-control" value="'+ oo.site + '" onblur="fun.c01($(this),\'site\',\'' + oo.site + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="w150 right">用户名：</td>\
              <td><input type="text" class="form-control" value="'+ oo.username + '" onblur="fun.c01($(this),\'username\',\'' + oo.username + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">密码：</td>\
              <td><input type="text" class="form-control" value="'+ oo.password + '" onblur="fun.c01($(this),\'password\',\'' + oo.password + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">排序：</td>\
              <td><input type="text" class="form-control" value="'+ oo.sort + '" onblur="fun.c01($(this),\'sort\',\'' + oo.sort + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">邮箱：</td>\
              <td><input type="text" class="form-control" value="'+ oo.mail + '" onblur="fun.c01($(this),\'mail\',\'' + oo.mail + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">备注：</td>\
              <td><input type="text" class="form-control" value="'+ oo.note + '" onblur="fun.c01($(this),\'note\',\'' + oo.note + '\')"></td>\
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
            let txt = '""<r: db="sqlite.shopee">update @.buyer set @.' + L + '=\'' + val + '\' where @.id=' + obj.arr[5] + '</r:>'
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
fun.a01();