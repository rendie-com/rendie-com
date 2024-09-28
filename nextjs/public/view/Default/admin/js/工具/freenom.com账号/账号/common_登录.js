'use strict';
Object.assign(Tool, {
    loginFreenom:
    {
        obj: {
            url: ["https://my.freenom.com/clientarea.php", "https://freenom.com/"]
        },
        a01: function (email, password, FirstName, cookies, dom, next, This, t) {
            let oo = {
                email: email,
                password: password,
                FirstName: FirstName,
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
            gg.delAllCookies(this.obj.url, this.a03, this, oo)
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
            let url = "https://my.freenom.com/clientarea.php"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '<a class="hidden-xs" href="clientarea.php">Sign in</a>',false, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/工具/freenom.com账号/账号/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.email + "','" + oo.password + "')", '<h1 class="splash">Hello ' + oo.FirstName +'</h1>',true, this.a07, this, oo);
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
            oo.dom.html("已确认“" + oo.email + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.url, this.a09, this, [t, oo]);
        },
        a09: function (cookies, arr) {
            let sql = 'update @.freenom set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.email=' + Tool.rpsql(arr[1].email)
            let str = '"ok"<r: db="sqlite.tool">' + sql + '</r:>';
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
            oo.dom.html("正在确认“" + oo.email + "”是否登录.....");
            let str = '<h1 class="splash">Hello ' + oo.FirstName +'</h1><1/>>登录</span>'
            gg.tabs_remove_create_indexOf(2, "https://my.freenom.com/clientarea.php", str,true, this.d04, this, oo);
        },
        d04: function (t, oo) {
            if (t[0].indexOf('<h1 class="splash">Hello ' + oo.FirstName +'</h1>') != -1) {
                oo.dom.html("主邮箱，已确认“" + oo.email + "”登录...");
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