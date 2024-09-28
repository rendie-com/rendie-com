'use strict';
var fun =
{
    obj: {
        A1: 9, A2: 0
    },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回url
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//账号位置
        let html = Tool.header("用github.com账号去注册---vercel.com账号") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right w150">注册进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">邮件账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '\
        <r:github db="sqlite.tool" page=2 size=1 where=" order by @.sort asc,@.id asc">,\
        {\
            "name":"<:name tag=js/>",\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>"\
        }\
        </r:github>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0]
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr[1]);
    },
    a04: function (oo) {
        $("#username").html(oo.username);
        Tool.loginGithub.a01(oo.username, oo.password, 0, oo.name, $("#state"), this.a05, this, oo.username);
    },
    a05: function (username) {
        $("#state").html("先删除Cookies");
        gg.delAllCookies(["https://vercel.com/"], this.a06, this, username)
    },
    a06: function (t, username) {
        $("#state").html("正在进入注册页面。。。");
        let url = "https://vercel.com/signup"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.tabs_remove_create_indexOf(2, url, 'Create Your',true, this.a07, this, username)
    },
    a07: function (t, username) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/vercel.com账号/注入_注册.js", this.a08, this, username);
    },
    a08: function (t, username) {
        $("#state").html("正在填写信息。");
        gg.tabs_executeScript_indexOf(2, "", t + ';fun.a01("' + username + '")', '<title>Authorize Vercel</title>',true, this.a09, this, username);
    },
    a09: function (t, username) {
        Tool.ajax.text("/" + o.path + "admin/js/工具/vercel.com账号/注入_注册点授权.js", this.a10, this, username);
    },
    a10: function (t, username) {
        $("#state").html("正在填写信息。");
        gg.tabs_executeScript_indexOf(2, "", t, '<title>Dashboard – Vercel</title>',true, this.d01, this, username);
    },
    ////////////////////////////////////////////
    d01: function (t, username) {
        let select = "select count(1) From @.vercel Where @.username=" + Tool.rpsql(username);
        arrL.push("@.username"); arrR.push(Tool.rpsql(username))
        arrL.push("@.note"); arrR.push("'不要手机号'")
        let insert = '<r: db="sqlite.tool">insert into @.github(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>';
        let str = '"ok"<if Fun(Db(sqlite.tool,' + select + ',count))==0>' + insert + '</if>'
        Tool.ajax.a01(str, 1, this.d02, this)
    },
    d02: function (t) {
        this.obj.A1++;
        if (t == "ok") {
            $("#state").html("下一条");
            //this.a03();
        }
        else if (t == "") {
            $("#state").html("准备下一条。");
            this.a03()
        }
        else {
            alert("出错：" + t);
        }
    }

}
fun.a01();
