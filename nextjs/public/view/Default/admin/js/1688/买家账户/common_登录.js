'use strict';
Object.assign(Tool, {
    login1688:
    {
        obj: {
            urlArr: [
                "https://1688.com/",
                "https://dj.1688.com/",
                "https://insights.1688.com/",
                "https://member.1688.com/",
                "https://page.1688.com/",
                "https://widget.1688.com/",
                "https://work.1688.com/",
                "https://xtore.insights.1688.com/",
                "https://mmstat.com/",
                "https://taobao.com/",
                "https://alicdn.com/",
                "https://www.1688.com/"
            ]
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
                this.d01(oo);//用Cookies去登录
            }
        },
        a04: function (oo) {
            let url = "https://login.taobao.com/?redirect_url=https%3A%2F%2Flogin.1688.com%2Fmember%2Fjump.htm%3Ftarget%3Dhttps%253A%252F%252Flogin.1688.com%252Fmember%252FmarketSigninJump.htm%253FDone%253Dhttps%25253A%25252F%25252Fmember.1688.com%25252Fmember%25252Foperations%25252Fmember_operations_jump_engine.htm%25253Ftracelog%25253Dlogin%252526operSceneId%25253Dafter_pass_from_taobao_new%252526defaultTarget%25253Dhttps%2525253A%2525252F%2525252Fwork.1688.com%2525252F%2525253Ftracelog%2525253Dlogin_target_is_blank_1688&style=tao_custom&from=1688web"
            oo.dom.html("打开登录页面" + url);
            gg.tabs_remove_create_indexOf(2, url, '>登录</button>', false, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.dom.html("注入_登录");
            Tool.ajax.text("/" + o.path + "admin/js/1688/买家账户/注入_登录.js", this.a06, this, oo);
        },
        a06: function (t, oo) {
            gg.tabs_executeScript_indexOf(2, "", t + "\nrendie_fun.a01('" + oo.username + "','" + oo.password + "')", '%3d' + oo.username + '%7c', true, this.a07, this, oo);
        },
        a07: function (t, oo) {
            if (t) {
                oo.dom.html("正在验证登录。。。")
                this.a08(t, oo)
            }
            else {
                oo.dom.html("有多个任务同时工作时，就会这样...");
                this.a04(oo);
            }
        },
        a08: function (t, oo) {
            oo.dom.html("已确认“" + oo.pifauser + "”登录...正在获取所有cookies");
            gg.getAllCookies(this.obj.urlArr, this.a09, this, [t, oo]);
        },
        a09: function (cookies, arr) {
            let sql = 'update @.buyer set @.cookies=' + Tool.rpsql(JSON.stringify(cookies)) + ' where @.username=' + Tool.rpsql(arr[1].username)
            let str = '""<r: db="sqlite.1688">' + sql + '</r:>';
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
        ////////////////////////////////////////////////////////////////
        d01: function (oo) {
            oo.dom.html("正在写入【cookies】...");
            gg.setAllCookies(oo.cookies, this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.dom.html("延时1秒,再确认是否登录...");
            Tool.Time("time", 500, this.d03, this, oo)
        },
        d03: function (oo) {
            oo.dom.html("正在确认“" + oo.username + "”是否登录.....");
            let url = "https://member.1688.com/member/profile/memberBaseInfo.htm"
            gg.getFetch(url,"json", this.d04, this, oo)
        },
        d04: function (t, oo) {
            if (t.indexOf('%3d' + oo.username + '%7c')) {
                oo.dom.html("已确认“" + oo.username + "”登录...");
                this.a11(t, oo)
                //if (t.data.user.userName == oo.username) {
                //}
                //else {
                //    oo.dom.html("账号不对，正在登录...");
                //    oo.cookies = 0
                //    this.a02(oo)
                //}
            }
            else {
                Tool.pre(["出错", t])
            }
        }
    }
})