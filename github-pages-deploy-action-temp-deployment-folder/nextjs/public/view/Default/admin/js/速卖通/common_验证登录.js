'use strict';
Object.assign(Tool, {
    verifyAliexpressUser: {
        //输出：是否要打开新窗口
        urlArr: ["https://login.aliexpress.com/", "https://www.aliexpress.com/", "https://wp.aliexpress.com/", "https://www.aliexpress.us/"],
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
            gg.delAllCookies(this.urlArr, this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (oo.cookies == 0) {
                this.a03(oo)//去登录
            }
            else {
                this.c01(oo);
            }
        },
        a03: function (oo) {
            oo.dom.html("登录。。。");
            let url = "https://login.aliexpress.com/";
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.tabs_remove_create_indexOf(2, url, '<!-- AEM配置 -->',true, this.a04, this, oo);
        },
        a04: function (t, oo) {
            oo.dom.html("common_注入_登陆");
            Tool.ajax.text("/view/Default/admin/js/速卖通/common_注入_登陆.js", this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html("正在填写账号密码,再点登陆。");
            gg.tabs_executeScript_indexOf(2, null, t + ';fun.a01("' + oo.username + '","' + oo.password + '");', 'AliExpress - Online Shopping for<1/>要验证Email',true, this.a06, this, oo);//正在填写账号密码,再点登陆
        },
        a06: function (t, oo) {
            if (t[0].indexOf('Email verification code</div>') != -1) {
                oo.dom.html("要验证Email");
            }
            else {
                oo.dom.html("获取所有cookies");
                gg.getAllCookies(this.urlArr, this.a07, this, oo);
            }
        },
        a07: function (cookies, oo) {
            let sql = 'update @.buyer set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(oo.username)
            let str = '""<r: db="sqlite.aliexpress">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a08, this, oo)
        },
        a08: function (t, oo) {
            if (t == "") {
                Tool.apply(true, oo.next, oo.This, oo.t);
            }
            else {
                alert("出错")
            }
        },
        c01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.c02, this, oo)
        },
        c02: function (t, oo) {
            //超时为3次
            this.c03([3, oo]);
        },
        c03: function (arr) {
            arr[1].dom.html("【超时：" + arr[0] + "】延时0.2秒,再确认是否登录...");
            Tool.Time("time", 200, this.c04, this, arr)
        },
        c04: function (arr) {
            arr[1].dom.html("【超时：" + arr[0] + "】正在确认“" + arr[1].username + "”是否登录...");
            gg.getFetch("https://www.aliexpress.com/fn/an-account/index?timeZone=GMT%2B0800&pageVersion=106caa4cbe72523855928e514237a62a&needLogin=true","json", this.c05, this, arr);
        },
        c05: function (t, arr) {
            if (t.success) {
                arr[1].dom.html("已确认“" + arr[1].username + "”登录...");
                Tool.apply(false, arr[1].next, arr[1].This, arr[1].t)
            }
            else {
                arr[0]--;
                if (arr[0] == 0) {
                    arr[1].dom.html("设置了cookeis没有用，要重新登录...");
                    this.a01(arr[1].username, arr[1].password, 0, arr[1].dom, arr[1].next, arr[1].This, arr[1].t)//删除cookeis，去登录
                }
                else {
                    this.c03(arr);
                }
            }
        }
    }
})

