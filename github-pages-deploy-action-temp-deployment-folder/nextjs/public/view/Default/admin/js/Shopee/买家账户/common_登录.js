'use strict';
Object.assign(Tool, {
    loginShopeeBuyer:
    {
        a01: function (username, password, cookies, site, dom, next, This, t) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                site: site,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            oo.dom.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>先删除Cookies');
            gg.delAllCookies(["https://shopee.com." + site], this.a02, this, oo)
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
            let url = "https://shopee.com." + oo.site + "/buyer/login?next=https%3A%2F%2Fshopee.com." + oo.site + "%2F"//打开登录页面
            gg.tabs_remove_create_indexOf(3, url, 'name="loginKey"', false, this.a04, this, oo)
        },
        a04: function (t, oo) {
            Tool.ajax.text("/" + o.path + "admin/js/Shopee/买家账户/注入_登录.js", this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>正在注入。。。')
            gg.tabs_executeScript_indexOf(3, "", t + "\nfun01.a01('" + oo.username + "','" + oo.password + "')", '<div class="navbar__username">' + oo.username + '</div>', false, this.a06, this, oo);
        },
        a06: function (t, oo) {
            this.a07(t, oo)
        },
        a07: function (t, oo) {
            oo.dom.html("获取所有cookies")
            gg.getAllCookies(["https://shopee.com." + oo.site], this.a08, this, oo);
        },
        a08: function (cookies, oo) {
            let sql = 'update @.buyer set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(oo.username)
            let str = '"ok"<r: db="sqlite.shopee">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a09, this, oo)
        },
        a09: function (t, oo) {
            if (t == "ok") {
                Tool.apply(true, oo.next, oo.This, oo.t)
            }
            else {
                Tool.at("出错" + t)
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
            gg.getFetch("https://shopee.com."+oo.site+"/api/v4/account/basic/get_account_info","json", this.d04, this, oo)
        },
        d04: function (t, oo) {
            if (t.data) {
                if (t.data.username == oo.username) {
                    oo.dom.html("登录成功“" + oo.username + "”...");
                    Tool.apply(false, oo.next, oo.This, oo.t)
                }
                else {
                    Tool.pre(["登陆出错01", t])
                }
            }
            else {
                oo.dom.html("登录失效“" + oo.username + "”...");
                this.a01(oo.username, oo.password, 0, oo.site, oo.dom, oo.next, oo.This, oo.t)
               
            }
            
        },
    },
})


