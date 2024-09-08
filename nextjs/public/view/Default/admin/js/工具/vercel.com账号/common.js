'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (username, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, { username: username, This: This });
        },
        a02: function (t, oo) {
            oo.This.html("获取vercel信息");
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "select @.cookies as cookies FROM @.vercel where @.username='" + oo.username + "'",
            }]
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            oo.cookies = JSON.parse(t[0][0].cookies);
            oo.This.html("先删除Cookies");
            gg.delAllCookies(["https://vercel.com/"], this.a04, this, oo)
        },
        a04: function (t, oo) {
            if (oo.cookies == 0) {
                oo.This.html("去登录");
                this.d01(oo)
            }
            else {
                oo.This.html("有Cookies");
                this.e01(oo)
            }
        },
        a05: function (oo) {
            oo.This.html('* <a href="javascript:;" onclick="Tool.SignIn.a01(\'' + oo.username + '\',$(this).parent())" title="点击登陆">' + oo.username + '</a>')
        },
        /////////////////////////////////////////////
        d01: function (oo) {
            let str = '\
            {<r:github db="sqlite.tool" size=1 where=" where @.username=\''+ oo.username + '\'">\
              "name":"<:name tag=js/>",\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:github>}';
            oo.This.html("获取登录信息");
            Tool.pre(str)
            //Tool.ajax.a01(str, 1, this.d02, this, oo);
        },
        d02: function (oo, o2) {
            Tool.loginGithub.a01(oo.username, oo.password, oo.cookies, oo.name, o2.This, this.d03, this, o2);
        },
        d03: function (t, oo) {
            let url = "https://vercel.com/login"//打开登录页面
            gg.tabs_remove_create_indexOf(2, url, '<title>Login – Vercel</title>', true, this.d04, this, oo)
        },
        d04: function (t, oo) {
            Tool.ajax.text("/" + o.path + "admin/js/工具/vercel.com账号/注入_登录.js", this.d05, this, oo);
        },
        d05: function (t, oo) {
            oo.This.html("正在注入。。。")
            gg.tabs_executeScript_indexOf(2, "", t, '<title>Dashboard – Vercel</title>', true, this.d06, this, oo);
        },
        d06: function (t, oo) {
            oo.This.html("获取所有cookies")
            gg.getAllCookies(["https://vercel.com/"], this.d07, this, oo);
        },
        d07: function (cookies, oo) {
            let sql = 'update @.vercel set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(oo.username)
            let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.d08, this, oo)
        },
        d08: function (t, oo) {
            if (t == "") {
                this.a05(oo);
            }
            else {
                alert("出错")
            }
        },
        //////////////////////////////
        e01: function (oo) {
            oo.This.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.e02, this, oo)
        },
        e02: function (t, oo) {
            oo.This.html("延时0.2秒,再确认是否登录...");
            Tool.Time("time", 200, this.e03, this, oo)
        },
        e03: function (oo) {
            oo.This.html("正在确认“" + oo.username + "”是否登录...");
            gg.tabs_remove_create_indexOf(2, "https://vercel.com/", '<title>Dashboard – Vercel</title>', true, this.e04, this, oo)
        },
        e04: function (t, oo) {
            oo.This.html("登录成功“" + oo.username + "”...");
            this.a05(oo);

        },
    }
})