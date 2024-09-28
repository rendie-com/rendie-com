'use strict';
Object.assign(Tool, {
    loginReplit:
    {
        a01: function (username, password, cookies, loginmode, dom, next, This, t) {
            let oo = {
                username: username,
                password: password,
                cookies: cookies,
                loginmode: loginmode,
                dom: dom,
                next: next,
                This: This,
                t: t,
                bakemail: "表示备用邮箱,在用GitHub登录时，要用上。"
            }
            if (cookies == 0) {
                this.a02(oo);
            }
            else {
                oo.dom.html("先删除Cookies");
                gg.delAllCookies(["https://replit.com/~"], this.d01, this, oo)
            }
        },
        a02: function (oo) {
            oo.dom.html("先删除Cookies");
            gg.delAllCookies(["https://replit.com/~"], this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (oo.loginmode == "GitHub") {
                oo.dom.html("用GitHub去登录。。。");
                this.e01(oo);
            }
            else {
                this.a04(oo)//去登录
            }
        },
        a04: function (oo) {
            oo.dom.html("打开登录页面");
            let url = "https://replit.com/login"//
            gg.tabs_remove_create_indexOf(2, url, 'Log In</span>', false, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            let str = 'class="css-wtm5vu"<1/>>You don\'t have any  Repls</span'//注：用这个是为了在【同步信息】的时后，少走一步，他要在这里获取【项目数量】。
            str += '<1/>Something went wrong trying to submit. Please try again.</span>'
            str += '<1/>Something unexpected happened. Please try again, you may need to refresh the page.'
            gg.tabs_executeScript_indexOf(2, "", t + "\nfun.a01('" + oo.username + "','" + oo.password + "')", str, true, this.a07, this, oo);
        },
        a07: function (t, oo) {
            Tool.pre(t + "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            if (t) {
                if (t[0].indexOf("Something went wrong trying to submit. Please try again.</span>") != -1) {
                    oo.dom.html("要验证，但我不想验证。延时5秒,再登录...");
                    Tool.Time("time", 1000 * 5, this.a02, this, oo)
                }
                else if (t[0].indexOf("Something unexpected happened. Please try again, you may need to refresh the page.") != -1) {
                    oo.dom.html("要验证，但我不想验证。延时5秒,再登录...");
                    Tool.Time("time", 1000 * 5, this.a02, this, oo)
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
            //oo.bakemail         表示备用邮箱
            if (t[0].indexOf('"' + oo.username + '"') != -1 || t[0].indexOf('"' + oo.bakemail + '"') != -1) {
                oo.dom.html("已确认“" + oo.username + "”登录...正在获取所有cookies");
                gg.getAllCookies(["https://replit.com/~"], this.a09, this, [t, oo]);
            }
            else {
                oo.dom.html("登录账号不对，程序终止。");
            }
        },
        a09: function (cookies, arr) {
            let sql = 'update @.replit set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(arr[1].username) + ''
            let str = '""<r: db="sqlite.tool">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a10, this, arr)
        },
        a10: function (t, arr) {
            if (t == "") {
                this.a11(arr[0], arr[1])
            }
            else {
                alert("出错")
            }
        },
        a11: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t);
        },
        //////////////////////////////////////////////////////////
        d01: function (t, oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时0.5秒,再确认是否登录...");
            Tool.Time("time", 400, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登录.....");
            let str = '<title>Log In<1/>class="css-wtm5vu"<1/>>You don\'t have any  Repls</span'//注：用这个是为了在【同步信息】的时后，少走一步，他要在这里获取【项目数量】。
            gg.tabs_remove_create_indexOf(2, "https://replit.com/~", str, false, this.d04, this, oo);
        },
        d04: function (t, oo) {
            if (t[0].indexOf('<title>Log In') == -1) {
                if (t[0].indexOf('"' + oo.username + '"') != -1) {
                    oo.dom.html("主邮箱，已确认“" + oo.username + "”登录...");
                    this.a11(t, oo)
                }
                else if (t[0].indexOf('"' + oo.password + '"') != -1) {
                    //说明：当用github登录时，就有可能是备用邮箱登录。且password字段，一定是备用邮箱。
                    oo.dom.html("备用邮箱，已确认“" + oo.password + "”登录...");
                    this.a11(t, oo);
                }
                else {
                    oo.dom.html("登录账号不对，程序终止。");
                    this.a02(oo)
                }
            }
            else {
                oo.dom.html("去登录...");
                this.a02(oo)//去登录
            }
        },
        //////////////////////////////////////////////////////////
        e01: function (oo) {
            let str = '\
            {<r:github db="sqlite.tool" size=1 where=" where @.username=\''+ oo.username + '\'">\
              "name":"<:name tag=js/>",\
              "bakemail":"<:bakemail tag=js/>",\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:github>}';
            Tool.ajax.a01(str, 1, this.e02, this, oo);
        },
        e02: function (oo1, oo2) {
            oo2.bakemail = oo1.bakemail;
            Tool.loginGithub.a01(oo1.username, oo1.password, oo1.cookies, oo1.name, $("#state"), this.e03, this, oo2);
        },
        e03: function (t, oo) {
            oo.dom.html("打开登录页面");
            let url = "https://replit.com/login"
            gg.tabs_remove_create_indexOf(2, url, 'Log In</span>', true, this.e04, this, oo)
        },
        e04: function (t, oo) {
            oo.dom.html("注入_github登录");
            Tool.ajax.text("/" + o.path + "admin/js/工具/replit.com账号/注入_github登录.js", this.a06, this, oo);
        }
    }
})