'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        let html = Tool.header("cpolar.com账号 -&gt; 修改密码") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">注册进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">用户名：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">旧密码：</td><td id="password" colspan="2"></td></tr>\
                <tr><td class="right">新密码：</td><td id="newPassword" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
       let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '\
        <r:cpolar db="sqlite.tool" page=2 size=1 where=" order by @.sort asc,@.id asc">,\
        {\
          "username":"<:username tag=js/>",\
          "password":"<:password tag=js/>",\
          "cookies":<:cookies tag=0/>\
        }\
        </r:cpolar>]'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0]
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, arr[1]);
    },
    a05: function (oo) {
        $("#username").html(oo.username)
        $("#password").html(oo.password)
        Tool.loginCpolar.a01(oo.username, oo.password, oo.cookies, $("#state"), this.a06, this, oo)
    },
    a06: function (t, oo) {
        let str = '<h2>用户设置</h2>'
        gg.tabs_remove_create_indexOf(2, "https://dashboard.cpolar.com/user", str,true, this.a07, this, oo);
    },
    a07: function (t, oo) {
        $("#state").html("注入_修改密码");
        Tool.ajax.text("/" + o.path + "admin/js/工具/cpolar.com账号/注入_修改密码.js", this.a08, this, oo);
    },
    a08: function (t, oo) {
        $("#state").html("正在修改密码..");
        oo.password = "cpolar" + Math.random().toString(36)
        $("#newPassword").html(oo.password + "（如果程序出错，有可能是这个密码。）");
        gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.password + "')", 'password changed success.',true, this.a09, this, oo);
    },
    a09: function (t, oo) {
        if (t) {
           this.a10(oo)
        }
        else {
            oo.dom.html("有多个任务同时工作时，就会这样...");           
        }
    },
    a10: function (oo) {
        let sql = 'update @.cpolar set @.password=' + Tool.rpsql(oo.password) + ' where @.username=' + Tool.rpsql(oo.username)
        let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
        Tool.ajax.a01(str, 1, this.a11, this)
    },
    a11: function (t) {
        if (t == "") {
            this.obj.A1++;
            $("#state").html("准备下一条。");
            this.a03()
        }
        else {
            alert("出错")
        }
    },
}
fun.a01();
