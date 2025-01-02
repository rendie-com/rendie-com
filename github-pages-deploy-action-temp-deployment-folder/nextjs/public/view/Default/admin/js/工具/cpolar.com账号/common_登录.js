'use strict';
Object.assign(Tool, {
    loginCpolar:
    {
        a01: function (username, password, cookies, dom, next, This, t) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            oo.dom.html("先删除Cookies");
            gg.delAllCookies(["https://cpolar.com/", "https://www.cpolar.com/", "https://dashboard.cpolar.com/"], this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (oo.cookies == 0) {
                this.a04(oo);//去登录
            }
            else {
                this.d01(oo);//用Cookies去登录
            }
        },
        a04: function (oo) {
            let url = "https://dashboard.cpolar.com/login"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '登 录</h2>', false, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/工具/cpolar.com账号/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun1.a01('" + oo.username + "','" + oo.password + "')", '<h3 class="first">设置与安装</h3>', false, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                this.a08(t, oo)
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                this.a04(oo);
            }
        },
        a08: function (t, oo) {
            if (t.indexOf('"' + oo.username + '"') != -1) {
                oo.dom.html("已确认“" + oo.username + "”登录...正在获取所有cookies");
                gg.getAllCookies(["https://cpolar.com/", "https://www.cpolar.com/", "https://dashboard.cpolar.com/"], this.a09, this, [t, oo]);
            }
            else {
                oo.dom.html("登录账号不对，程序终止。");
            }
        },
        a09: function (cookies, arr) {
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "update @.cpolar set @.cookies=" + Tool.rpsql(JSON.stringify(cookies)) + " where @.username=" + Tool.rpsql(arr[1].username)
            }]
            Tool.ajax.a01(data, this.a10, this, arr)
        },
        a10: function (t, arr) {
            if (t[0].length == 0) {
                this.a11(arr[0], arr[1])
            }
            else {
                alert("出错")
            }
        },
        a11: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        ////////////////////////////////////////////////////////////
        d01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时0.5秒,再确认是否登录...");
            Tool.Time("time", 400, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登录.....");
            let str = '"' + oo.username + '"<1/><h2 class="first">登 录</h2>'
            gg.tabs_remove_create_indexOf(2, "https://dashboard.cpolar.com/status", str, false, this.d04, this, oo);
        },
        d04: function (t, oo) {
            if (t.indexOf('"' + oo.username + '"') != -1) {
                oo.dom.html("主邮箱，已确认“" + oo.username + "”登录...");
                this.a11(t, oo)
            }
            else if (t.indexOf('<h2 class="first">登 录</h2>') != -1) {
                oo.dom.html("登录失效“" + oo.username + "”，正在重新登录...");
                oo.cookies = 0;
                this.a02(oo)
            }
            else {
                Tool.pre(t)
                oo.dom.html("登录账号不对，程序终止。");
            }
        },
    }
})