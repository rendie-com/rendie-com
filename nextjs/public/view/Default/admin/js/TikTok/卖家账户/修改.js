'use strict';
var fun =
{
    a01: function () {
        let html = '\
        <r:seller db="sqlite.tiktok" size=1 where=" where @.id='+ obj.arr[4] + '">\
        {\
          "password":"<:password/>",\
          "email":"<:email/>",\
          "phone":<:phone tag=json/>,\
          "company":<:company tag=json/>,\
          "note":<:note tag=json/>,\
          "sort":<:sort/>\
        }</r:seller>'
        Tool.ajax.a01(html, 1, this.a02, this)
    },
    a02: function (oo) {
        let html = '\
        <header class="panel-heading"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>TikTok  -&gt; 卖家账户 -&gt; 修改</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle" id="div1">\
            <tbody>\
            <tr>\
              <td class="right w150">密码：</td>\
              <td><input type="text" class="form-control" value="'+ oo.password + '" onblur="fun.c01($(this),\'password\',\'' + oo.password + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">邮箱：</td>\
              <td><input class="form-control" type="text" value="'+ oo.email + '" onblur="fun.c01($(this),\'email\',\'' + oo.email + '\')"></td>\
              <td></td>\
            </tr>\
             <tr>\
              <td class="right">排序：</td>\
              <td><input type="number" class="form-control" value="'+ oo.sort + '" onblur="fun.c01($(this),\'sort\',\'' + oo.sort + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">手机号：</td>\
              <td><input type="text" class="form-control" value="'+ oo.phone + '" onblur="fun.c01($(this),\'phone\',\'' + oo.phone + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">公司：</td>\
              <td><input type="text" class="form-control" value="'+ oo.company + '" onblur="fun.c01($(this),\'company\',\'' + oo.company + '\')"></td>\
              <td></td>\
            </tr>\
            <tr>\
              <td class="right">备注：</td>\
              <td><input type="text" class="form-control" value="'+ oo.note + '" onblur="fun.c01($(this),\'note\',\'' + oo.note + '\')"></td>\
              <td></td>\
            </tr>\
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
            let txt = '""<r: db="sqlite.tiktok">update @.seller set @.' + L + '=\'' + val + '\' where @.id=' + obj.arr[4] + '</r:>'
            Tool.ajax.a01(txt, 1, this.c02, this, [This, val]);
        }
    },
    c02: function (t, This) {
        if (t == "") { This[0].attr("disabled", false); This[0].val(This[1]); }
        else { alert("出错：" + t); }
    },
}
fun.a01()