'use strict';
Object.assign(Tool, {
    loginTikTok:
    {
        obj: {
            urlArr: ["https://seller.tiktokglobalshop.com/", "https://tiktokglobalshop.com/"]
        },
        a01: function (email, password, cookies, dom, next, This, t) {
            let oo = {
                email: email,
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
            let url = "https://seller.tiktokglobalshop.com/account/login"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '>登录<', false, this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录.js");
            Tool.ajax.text("/" + o.path + "admin/js/TikTok/卖家账户/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            oo.dom.html("正在执行登录");
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun01.a01('" + oo.email + "','" + oo.password + "')", '<title>TikTok Shop Seller Center | Cross Border</title>', false, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登录。。。")
                this.a08(oo)
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                alert("eeeeeeeeeegggggggggggggeeeeeeeeeeeee")
                //this.a04(oo);
            }
        },
        a08: function (oo) {
            oo.dom.html("已确认“" + oo.email + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.a09, this, oo);
        },
        a09: function (cookies, oo) {
            let sql = 'update @.seller set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.email=' + Tool.rpsql(oo.email)
            let str = '"ok"<r: db="sqlite.tiktok">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a10, this, oo)
        },
        a10: function (t, oo) {
            if (t == "ok") {
                this.a11(true, oo)
            }
            else {
                alert("出错")
            }
        },
        a11: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        ////////////////////////////////////////////////////////////////////
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
            let url = "https://seller.tiktokglobalshop.com/passport/account/info/v2/"
            gg.getFetch(url,"json", this.d04, this, oo)
        },
        d04: function (t, oo) {
            let arr = oo.email.split("@")
            let email = arr[0].substring(0, 1) + "***" + arr[0].substring(arr[0].length - 1) + "@" + arr[1]
            if (t.data.email == email) {
                oo.dom.html("已确认“" + oo.email + "”登录...");
                this.a11(false, oo)
            }
            else {
                oo.dom.html("cookies登录失败，要重新登录...");
                oo.cookies = 0;
                this.a02(oo);//去登录
            }
        }
    }
})