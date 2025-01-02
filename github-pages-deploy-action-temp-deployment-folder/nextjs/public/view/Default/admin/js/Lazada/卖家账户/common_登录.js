'use strict';
Object.assign(Tool, {
    loginLazada:
    {
        obj: {
            urlArr: ["https://lazada-seller.cn", "https://mmstat.com", "https://sellercenter-th.lazada-seller.cn/"]
        },
        a01: function (email, password, shopname, cookies, dom, next, This, t) {
            let oo = {
                email: email,
                password: password,
                shopname: shopname,
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
            let url = "https://sellercenter-th.lazada-seller.cn/apps/seller/login?redirect_url=https%3A%2F%2Fsellercenter-th.lazada-seller.cn%2Fapps%2Fhome%2Fnew%3F__ARMS_PID__%3Dgiiryrcz16%25405386c34ee4b8d85%26userId%3D100687824263"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '>登录<',true, this.a05, this, oo);
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/Lazada/卖家账户/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.email + "','" + oo.password + "')", '>' + oo.shopname + '<',true, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登录。。。")
                this.a08(t, oo)
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                alert("eeeeeeeeeegggggggggggggeeeeeeeeeeeee")
                //this.a04(oo);
            }
        },
        a08: function (t, oo) {
            oo.dom.html("已确认“" + oo.email + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.a09, this, [t, oo]);
        },
        a09: function (cookies, arr) {
            let sql = 'update @.seller set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.email=' + Tool.rpsql(arr[1].email)
            let str = '"ok"<r: db="sqlite.lazada">' + sql + '</r:>';
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
            oo.dom.html("正在确认“" + oo.shopname + "”是否登录.....");
            let str = '>' + oo.shopname + '</<1/>>登录<'
            gg.tabs_remove_create_indexOf(2, "https://sellercenter-th.lazada-seller.cn/apps/home/new", str,true, this.d04, this, oo);
        },
        d04: function (t, oo) {
            if (t[0].indexOf('>' + oo.shopname + '<') != -1) {
                oo.dom.html("已确认“" + oo.email + "”登录...");
                this.a11(t, oo)
            }
            else if (t[0].indexOf('>登录<') != -1) {
                this.a05("",oo)
            }
            else {
                oo.dom.html("登录失败，要重新登录...");
                oo.cookies = 0;
                //this.a02(oo);//去登录
            }
        }
    }
})