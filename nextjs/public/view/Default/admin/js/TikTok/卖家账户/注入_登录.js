'use strict';
var fun01 =
{
    a01: function (email, password) {
        $("#TikTok_Ads_SSO_Login_Email_Panel_Button").click();
        let o1 = $('input[name="email"]')
        this.c01(o1, "r");
        o1.focus();
        o1.parent().append('<div style="color: rgb(var(--theme-arco-danger-6));" id="msgEmail">请手动删除输入框的值，正确的值会自动填充。</div>')
        this.a02({ email: email, password: password })
    },
    a02: function (oo) {
        this.Time("time", 500, this.a03, this, oo)
    },
    a03: function (oo) {
        let o1 = $('input[name="email"]')
        if (o1.val() == "") {
            this.c01(o1, oo.email);
            $("#msgEmail").html("已填入正确的值。")
            this.Time("time", 0, this.d01, this, oo)
        }
        else {
            this.a02(oo)
        }
    },
    /////////////////////////////////////
    c01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    c02: function (oo) {
        let elem = oo.get(0);
        // 创建事件.
        var event = document.createEvent('Event');
        // 初始化一个点击事件，可以冒泡，无法被取消
        event.initEvent('click', true, false);
        // 触发事件监听
        elem.dispatchEvent(event);
    },
    ///////////////////////////////
    d01: function (oo) {
        let o2 = $('input[name="password"]')
        o2.focus();
        this.c01(o2, "r");
        o2.parent().append('<div style="color: rgb(var(--theme-arco-danger-6));" id="msgPassword">请手动删除输入框的值，正确的值会自动填充。</div>')
        this.d02(oo)
    },
    d02: function (oo) {
        this.Time("time", 500, this.d03, this, oo)
    },
    d03: function (oo) {
        let o1 = $('input[name="password"]')
        if (o1.val() == "") {
            this.c01(o1, oo.password);
            $("#msgPassword").html("已填入正确的值。")
            this.Time("time", 0, this.e01, this)
        }
        else {
            this.d02(oo)
        }
    },
    /////////////////////////
    e01: function () {
        let o1 = $('button[id="TikTok_Ads_SSO_Login_Btn"]:contains("登录")')
        o1.parent().append('<div style="color: rgb(var(--theme-arco-danger-6));" id="msgPassword">请手动点登录。</div>')
        this.e02(30)
    },
    /////////////////////////
    e02: function (time) {
        $("title").html("计数:" + time);
        this.Time("time", 1000, this.e03, this, time)
    },
    e03: function (time) {
        time--;
        if (time == 0) {
            $("title").html("已超时，已超时，已超时。");
        }
        else {
            this.e02(time);
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    TimeNameArr: [],//定时器名称
    Time: function (name, time, next, This, t) {
        if (this.TimeNameArr[name]) {
            window.clearTimeout(this.TimeNameArr[name]);
            delete this.TimeNameArr[name];
        };
        //setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
        this.TimeNameArr[name] = window.setTimeout(function () {
            if (t == undefined) {
                next.apply(This);
            }
            else { next.apply(This, [t]); }
        }, time);
    }
}