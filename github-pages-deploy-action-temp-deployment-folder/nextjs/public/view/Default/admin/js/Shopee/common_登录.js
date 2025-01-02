'use strict';
Object.assign(Tool, {
    loginShopee:
    {
        obj: {
            urlArr: ["https://shopee.cn/", "https://seller.shopee.cn/"]
        },
        a01: function (username, password, cookies, localStorage, dom, next, This, t) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                localStorage: localStorage,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
            //说明：localStorage参数我没有用它，因为我还没有俩个账号，所以用不上。
            //localStorage参数,想要写进去，必须打开页面注入才行，那对我来说还慢了不少。
        },
        a02: function (oo) {
            oo.dom.html("先删除Cookies");
            gg.delAllCookies(this.obj.urlArr, this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (!oo.cookies) {
                this.a04(oo);//去登入
            }
            else {
                oo.dom.html("用Cookies去登入");
                this.d01(oo);
            }
        },
        a04: function (oo) {
            let url = "https://seller.shopee.cn/account/signin?next=%2F"
            oo.dom.html("打开登入页面" + url);
            gg.tabs_remove_create_indexOf(2, url, false, false, this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登入");
            let url = "/" + o.path + "admin/js/Shopee/卖家账户/注入_登录.js"
            Tool.ajax.text(url, this.a06, this, oo);
        },
        a06: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, ["jquery"], t + "\nrendie_fun.a01('" + oo.username + "','" + oo.password + "');", ['> ' + oo.username + ' <', '操作过于频繁，您的尝试将冷却几分钟或1天'], false, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登入。。。")
                if (t.indexOf("操作过于频繁，您的尝试将冷却几分钟或1天") != -1) {
                    oo.dom.html("操作过于频繁，您的尝试将冷却几分钟或1天");
                }
                else {
                    this.a08(t, oo)
                }
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                //this.a04(oo);
            }
        },
        a08: function (t, oo) {
            oo.dom.html("已确认“" + oo.username + "”登入...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.a09, this, [t, oo]);
        },
        a09: function (cookies, arr) {
            let data = [{
                action: "sqlite",
                database: "shopee/卖家账户",
                sql: 'update @.table set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(arr[1].username),
            }]
            Tool.ajax.a01(data, this.a10, this, arr)
        },
        a10: function (t, arr) {
            if (t[0].length == 0) {
                this.a11(arr[0], arr[1])
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        a11: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        //////////////////////////////////////////////////////////////////
        d01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时0.5秒,再确认是否登入...");
            Tool.Time("time", 500, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登入.....");
            let url = "https://seller.shopee.cn/webchat/api/coreapi/v1.2/mini/cbsc/login?csrf_token=&source=sc&_api_source=sc"
            gg.postFetch(url, null, this.d04, this, oo)//注：必须要post提交
        },
        d04: function (t, oo) {
            if (t.message == "token not found") {
                oo.dom.html("登入失败，要重新登入...");
                oo.cookies = 0;
                this.a02(oo);//去登入
            }
            else {
                if (t.user.name == oo.username) {
                    oo.dom.html("已确认“" + oo.username + "”登入...");
                    this.a11(t, oo);
                }
                else {
                    Tool.at(["账号不对", t])
                }
            }
        }
    }
})