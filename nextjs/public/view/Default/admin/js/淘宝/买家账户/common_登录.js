'use strict';
Object.assign(Tool, {
    loginTaobao:
    {
        obj: {
            urlArr: ["https://taobao.com/", "https://www.taobao.com/", "https://cart.taobao.com/", "https://uland.taobao.com/", "https://h5api.m.taobao.com/"]
        },
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
            gg.delAllCookies(this.obj.urlArr, this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (oo.cookies == 0) {
                this.a04(oo);//去登录
            }
            else {
                oo.dom.html("用Cookies去登录");
                this.d01(oo);
            }
        },
        a04: function (oo) {
            let url = "https://login.taobao.com/member/login.jhtml?spm=a21bo.jianhua.754894437.1.5af92a89VOknsp&f=top&redirectURL=https%3A%2F%2Fwww.taobao.com%2F"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '>登录</button>', false, this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/淘宝/买家账户/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            oo.dom.html("执行登录。。。");
            gg.tabs_executeScript_indexOf(2, "", t + ";\nrendie_fun.a01('" + oo.username + "','" + oo.password + "')", '>' + oo.username + '<',true, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登录。。。")
                this.a08(t, oo)
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                //this.a04(oo);
            }
        },
        a08: function (t, oo) {
            oo.dom.html("已确认“" + oo.username + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.a09, this, [t, oo]);
        },
        a09: function (cookies, arr) {
            let sql = 'update @.buyer set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(arr[1].username)
            let str = '"ok"<r: db="sqlite.taobao">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a10, this, arr)
        },
        a10: function (t, arr) {
            if (t == "ok") {
                this.a11(arr[0], arr[1])
            }
            else {
                alert("出错")
            }
        },
        a11: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        ////////////////////////////////////////////////////////////////
        d01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时0.5秒,再确认是否登录...");
            Tool.Time("time", 500, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登录.....");
            let url = "https://member1.taobao.com/member/fresh/account_security.htm?t="+ Math.random()
            gg.getFetch(url,"json", this.d04, this, oo)
        },
        d04: function (t, oo) {
            if (t.indexOf('>' + oo.username + '<') != -1) {
                oo.dom.html("已确认“" + oo.username + "”登录...");
                this.a11(t, oo)
            }
            else {
                oo.dom.html("登录失败，要重新登录...");
                oo.cookies = 0;
                this.a02(oo);//去登录
            }

        }
    }
})