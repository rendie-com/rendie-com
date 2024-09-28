'use strict';
Object.assign(Tool, {
    loginOzon:
    {
        obj: {
            urlArr: ["https://ozon.ru/", "https://www.ozon.ru/", "https://seller.ozon.ru/"]
        },
        a01: function (email, sellerId, cookies, dom, next, This, t) {
            let oo = {
                email: email,
                sellerId: sellerId,//确认登录时能用上。
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
                this.e01(oo);
            }
        },
        a04: function (oo) {
            let url = "https://seller.ozon.ru/app/dashboard/main"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '>登录</span>',true, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/Ozon/卖家账户/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            oo.code = t;
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.c01()", '检查站点连接是否安全<1/>输入电话号码',true, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登录。。。")
                if (t[0].indexOf("检查站点连接是否安全") != -1) {
                    gg.tabs_executeScript_indexOf(2, "", oo.code + "\nfun.d01()", '输入电话号码',true, this.a08, this, oo);
                }
                else if (t[0].indexOf("输入电话号码") != -1) {
                    this.a08("", oo)
                }
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                alert("001aaaaaaaaaaaaaaaaa")
                //this.a04(oo);
            }
        },
        a08: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, "", oo.code + "\nfun.a01('" + oo.email + "')", '输入验证码',true, this.d01, this, oo);
        },
        //////////////////////////////////////////////////
        d01: function (t, oo) {
            let str = '{\
            <r:exmail db="sqlite.tool" size=1 where=" where @.username=\''+ oo.email + '\'">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>,\
              "sid":"<:sid tag=js/>"\
            </r:exmail>}'
            Tool.ajax.a01(str, 1, this.d02, this, oo)
        },
        d02: function (oo, o2) {
            o2.dom.html("登录邮件，去看一下，有没有发邮件过来。");
            Tool.getExmailDes.a01(3, oo.username, oo.password, oo.sid, oo.cookies, "确认Ozon个人信息", this.d03, this, o2)
        },
        d03: function (t, oo) {
            let code = Tool.StrSlice(t, 'font-weight: bold;">', "</td>")
            oo.dom.html("正在验证邮件。。。" + code);
            gg.tabs_executeScript_indexOf(2, "", "fun.e01('" + code + "')", "<title>Ozon:",true, this.d04, this, oo);
        },
        d04: function (t, oo) {
            oo.dom.html("已确认“" + oo.email + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.d05, this, [t, oo]);
        },
        d05: function (cookies, arr) {
            let sql = 'update @.seller set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.email=' + Tool.rpsql(arr[1].email)
            let str = '"ok"<r: db="sqlite.ozon">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.d06, this, arr)
        },
        d06: function (t, arr) {
            if (t == "ok") {
                this.d07(arr[0], arr[1])
            }
            else {
                alert("出错")
            }
        },
        d07: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        //////////////////////////////////////////////////////////////
        e01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.e02, this, oo)
        },
        e02: function (t, oo) {
            oo.dom.html("延时0.5秒,再确认是否登录...");
            Tool.Time("time", 500, this.e03, this, oo)
        },
        e03: function (oo) {
            oo.dom.html("正在确认“" + oo.email + "”是否登录.....");//
            let url = "https://seller.ozon.ru/api/company/finance-info";
            gg.postFetch(url, '{"marketplaceSellerId":"' + oo.sellerId + '"}', this.e04, this, oo)
        },
        e04: function (t, oo) {
            if (t.code == 401) {
                //    oo.cookies = 0
                //    this.a02(oo)
                Tool.pre(["登录失败", t])
            }
            else if (t.marketplaceSellerId == oo.sellerId) {
                oo.dom.html("已确认“" + oo.email + "”登录...");
                this.d07(t, oo)
            }
            else {
                Tool.pre(["【common_登录.js】出错", t])
            }
        }
    }
})
