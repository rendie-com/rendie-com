'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 0;//ID
        this.a02(obj.arr[4])
    },
    a02: function (id) {
        let str = '{\
        <r:seller db="sqlite.ozon" size=1 where=" where @.id='+ id + '">\
          "sort":<:sort/>,\
          "phone":<:phone tag=json/>,\
          "username":"<:username tag=js/>",\
          "email":"<:email tag=js/>",\
          "note":"<:note tag=js/>",\
          "sellerId":<:sellerId/>,\
          "id":<:id/>\
        </r:seller>}'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (oo) {
        let html = '\
        <header class="panel-heading"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>ozon &gt; 卖家账户 &gt; 修改</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle" id="div1">\
            <tbody>\
            <tr>\
              <td class="right">卖家ID：</td>\
              <td><input type="text" class="form-control" value="'+ oo.sellerId + '" onblur="fun.c01($(this),\'sellerId\',\'' + oo.sellerId + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">邮件：</td>\
              <td><input type="text" class="form-control" value="'+ oo.email + '" onblur="fun.c01($(this),\'email\',\'' + oo.email + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="w150 right">用户名：</td>\
              <td><input type="text" class="form-control" value="'+ oo.username + '" onblur="fun.c01($(this),\'username\',\'' + oo.username + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">排序：</td>\
              <td><input type="text" class="form-control" value="'+ oo.sort + '" onblur="fun.c01($(this),\'sort\',\'' + oo.sort + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">手机号：</td>\
              <td><input type="text" class="form-control" value="'+ oo.phone + '" onblur="fun.c01($(this),\'phone\',\'' + oo.phone + '\')"></td>\
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
            let txt = '""<r: db="sqlite.ozon">update @.seller set @.' + L + '=\'' + val + '\' where @.id=' + obj.arr[4] + '</r:>'
            Tool.ajax.a01(txt, 1, this.c02, this, [This, val]);
        }
    },
    c02: function (t, This) {
        if (t == "") { This[0].attr("disabled", false); This[0].val(This[1]); }
        else { alert("出错：" + t); }
    },
}
fun.a01();