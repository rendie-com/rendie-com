'use strict';
Object.assign(Tool, {
    loginExmail:
    {
        a01: function (tabIndex, username, password, sid, cookies, dom, next, This, t) {
            let oo = {
                tabIndex: tabIndex,//第几个标签栏登录
                username: username,
                password: password,
                sid: sid,//访问
                cookies: cookies,//写入cookies要用
                dom: dom,//写入cookies要用
                next: next,
                This: This,
                t: t
            }
            if (oo.cookies == 0) {
                this.a02(oo)
            }
            else {
                gg.delAllCookies(["https://exmail.qq.com/", "https://qq.com/"], this.c01, this, oo)
            }
        },
        a02: function (oo) {
            gg.delAllCookies(["https://exmail.qq.com/", "https://qq.com/"], this.a03, this, oo)
        },
        a03: function (t, oo) {
            let url = "https://exmail.qq.com/login"
            gg.tabs_remove_create_indexOf(oo.tabIndex, url, "<title>腾讯企业邮箱-登录入口</title>",true, this.a04, this, oo)
        },
        a04: function (t, oo) {
            Tool.ajax.text("/" + o.path + "admin/js/工具/腾讯企业邮箱/注入_登录.js", this.a05, this, oo);
        },
        a05: function (t, oo) {
            gg.tabs_executeScript_indexOf(oo.tabIndex, null, t + "\nfun.a01('" + oo.username + "','" + oo.password + "')", '<title>腾讯企业邮箱</title>',true, this.a06, this, oo);
        },
        a06: function (t, oo) {
            let sid = Tool.StrSlice(t[0], '/sellonlinestatic?sid=', '&type=')
            if (sid) {
                oo.sid = sid;//保存sid要用
                this.a07(oo)
            }
            else {
                Tool.pre(["已改版", t])
            }
        },
        a07: function (oo) {
            //获取所有cookies
            gg.getAllCookies(["https://exmail.qq.com/", "https://qq.com/"], this.a08, this, oo);
        },
        a08: function (cookies, oo) {
            let update = '""<r: db="sqlite.tool">update @.exmail set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ',@.sid=' + Tool.rpsql(oo.sid) + ' where @.username=' + Tool.rpsql(oo.username) + '</r:>'
            Tool.ajax.a01(update, 1, this.a09, this, oo)
        },
        a09: function (t, oo) {
            if (t == "") {
                Tool.apply(oo.sid, oo.next, oo.This, oo.t)
            }
            else {
                Tool.at("保存sid出错:" + t)
            }
        },
        /////////////////////////////////////////////
        c01: function (t, oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.c02, this, oo)
        },
        c02: function (t, oo) {
            oo.time = 2;//超时为2次
            this.c03(oo);
        },
        c03: function (oo) {
            oo.dom.html("【" + oo.time + "】延时0.2秒,再确认是否登录...");
            Tool.Time("time", 200, this.c04, this, oo)
        },
        c04: function (oo) {
            oo.dom.html("【" + oo.time + "】正在确认“" + oo.username + "”是否登录...");
            let url = "https://exmail.qq.com/cgi-bin/setting4?action=migrate_from_domainmail&sid=" + oo.sid + "&opt=0&f=json&r=" + Math.random();
            gg.getFetch(url,"json", this.c05, this, oo)
        },
        c05: function (t, oo) {
            if (t.RetCode == "-2") {
                oo.time--;
                if (oo.time == 0) {
                    this.a02(oo)
                }
                else {
                    this.c04(oo);
                }
            }
            else {
                //登录成功
                this.a09("", oo);
            }
        }
    },
    //获取【腾讯企业邮箱】的内容
    getExmailDes: {
        a01: function (tabIndex, username, password, sid, cookies, sendEmail, next, This, t) {
            let oo = {
                sendEmail: sendEmail,
                next: next,
                This: This,
                t: t
            }
            $("#state").html("登录邮件，去看一下，有没有发邮件过来。");
            Tool.loginExmail.a01(tabIndex, username, password, sid, cookies, $("#state"), this.a02, this, oo)
        },
        a02: function (sid, oo) {
            oo.sid = sid
            this.a03(oo)
        },
        a03: function (oo) {
            let url = "https://exmail.qq.com/cgi-bin/mail_list?folderid=1&page=0&s=inbox&sid=" + oo.sid + "&nocheckframe=true"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取邮件列表。。。");
            gg.getFetch(url,"json", this.a04, this, oo)
        },
        a04: function (t, oo) {
            let arr1 = Tool.StrSplits(t, "<tr>", "</tr>"), mailid = "";
            $("#state").html("找出发的邮件ID。。。");
            for (let i = 1; i < arr1.length; i++) {
                if (arr1[i].indexOf("cir  Ru") != -1 && arr1[i].indexOf(oo.sendEmail) != -1 && arr1[i].indexOf("前") != -1) {//找出所有已读,且是【sendEmail】发来的邮件
                    mailid = Tool.StrSlice(arr1[i], " value=\"", "\"")
                    break;
                }
            }
            if (mailid) {
                this.a05(mailid, oo)
            }
            else {
                $("#state").html("延时500ms后再找。。。");
                Tool.Time("list", 500, this.a03, this, oo)
            }
        },
        a05: function (mailid, oo) {
            let url = "https://exmail.qq.com/cgi-bin/readmail"
            let o1 = {
                mailid: mailid,
                sid: oo.sid,
                f: "json",
                action: "checktranslate"
            }
            $("#url").html(url + '[post]' + JSON.stringify(o1));
            $("#state").html("正在设置为已读。。。");
            gg.postFetch(url, o1, this.a06, this, [mailid, oo])
        },
        a06: function (oo, arr) {
            if (oo.RetCode == "0") {
                let url = "https://exmail.qq.com/cgi-bin/readmail?folderid=1&t=readmail&mailid=" + arr[0] + "&mode=pre&maxage=3600&base=10.9010&ver=16456&show_ww_icon=false&sid=" + arr[1].sid + "&newwin=true&nocheckframe=true";
                $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
                $("#state").html("正在获取邮件内容。。。");
                gg.getFetch(url,"json", this.a07, this, arr[1])
            }
            else {
                $("#state").html("设置已读失败----，程序终止。");
            }
        },
        a07: function (t, oo) {
            Tool.apply(t, oo.next, oo.This, oo.t)
        }
    }
})