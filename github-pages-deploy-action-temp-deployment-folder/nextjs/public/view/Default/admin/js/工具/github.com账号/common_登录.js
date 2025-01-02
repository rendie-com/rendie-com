'use strict';
Object.assign(Tool, {
    loginGithub:
    {
        a01: function (username, password, cookies, name, dom, next, This, t) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                name: name,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            oo.dom.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>先删除Cookies');
            gg.delAllCookies(["https://github.com/"], this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (oo.cookies == 0) {
                this.a03(oo)//去登录
            }
            else {
                this.d01(oo)
            }
        },
        a03: function (oo) {
            let url = "https://github.com/login"//打开登录页面
            gg.tabs_remove_create_indexOf(2, url, '<title>Sign in to GitHub · GitHub</title>',true, this.a04, this, oo)
        },
        a04: function (t, oo) {
            Tool.ajax.text("/" + o.path + "admin/js/工具/github.com账号/注入_登录.js", this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>正在注入。。。')
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.username + "','" + oo.password + "')", '>Home</h3><1/><h1>Device verification</h1><1/><h1>Two-factor authentication</h1>',true, this.a06, this, oo);
        },
        a06: function (t, oo) {
            if (t[0].indexOf('<h1>Device verification</h1>') != -1) {
                oo.dom.html("要Email验证。。。")
                this.e01(oo)
            }
            else if (t[0].indexOf('<h1>Two-factor authentication</h1>') != -1) {
                oo.dom.html("要令牌验证，需手动操作，通过后自动下一步。。。")
                this.e05("", ["", oo])
            }
            else {
                this.a07(t, oo)
            }
        },
        a07: function (t, oo) {
            oo.name = Tool.StrSlice(t[0], '<meta name="user-login" content="', '"');
            oo.dom.html("获取所有cookies")
            gg.getAllCookies(["https://github.com/"], this.a08, this, oo);
        },
        a08: function (cookies, oo) {
            let sql = 'update @.github set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ',@.name=' + Tool.rpsql(oo.name) + ' where @.username=' + Tool.rpsql(oo.username)
            let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a09, this, oo)
        },
        a09: function (t, oo) {
            if (t == "") {
                Tool.apply(null, oo.next, oo.This, oo.t)
            }
            else {
                alert("出错")
            }
        },
        //////////////////////////////////////////
        d01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时0.2秒,再确认是否登录...");
            Tool.Time("time", 200, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登录...");
            gg.tabs_remove_create_indexOf(2, "https://github.com/", '<meta name="user-login" content="' + oo.name + '"><1/><meta name="user-login" content="">',true, this.d04, this, oo)
        },
        d04: function (t, oo) {
            if (t[0].indexOf('<meta name="user-login" content="">') != -1) {
                oo.dom.html("登录失效“" + oo.username + "”...");
                this.a01(oo.username, oo.password, 0, oo.name, oo.dom, oo.next, oo.This, oo.t)
            }
            else {
                oo.dom.html("登录成功“" + oo.username + "”...");
                this.a09("", oo);
            }
        },
        ////////////////////////////////////////////////////
        e01: function (oo) {
            let str = '{\
            <r:exmail db="sqlite.tool" size=1 where=" where @.username=\''+ oo.username + '\' or @.alias like \'%' + oo.username + '%\'">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>,\
              "sid":"<:sid tag=js/>"\
            </r:exmail>}'
            oo.dom.html("正在找Email账号。。。")
            Tool.ajax.a01(str, 1, this.e02, this, oo)
        },
        e02: function (t, oo) {
            oo.dom.html("正在找Email内容。。。")
            Tool.getExmailDes.a01(3, t.username, t.password, t.sid, t.cookies, "[GitHub] Please verify your device", this.e03, this, oo)
        },
        e03: function (t, oo) {
            let code = Tool.Trim(Tool.StrSlice(t, 'Verification code:', "<br"))
            oo.dom.html("验证码：" + code);
            Tool.ajax.text("/" + o.path + "admin/js/工具/github.com账号/注入_输入验证码.js", this.e04, this, [code, oo]);
        },
        e04: function (t, arr) {
            arr[0] = t + "\nfun.a01('" + arr[0] + "')"
            gg.highlightTab(2, this.e05, this, arr)
        },
        e05: function (t, arr) {
            gg.tabs_executeScript_indexOf(2, "", arr[0], '>Home</h3>',true, this.a07, this, arr[1]);
        }
    },
})


