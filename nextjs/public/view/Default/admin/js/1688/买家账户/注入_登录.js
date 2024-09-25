'use strict';
var rendie_fun =
{
    a01: function (username, password) {
        this.c01($('input[id="fm-login-id"]'), username);
        this.c01($('input[id="fm-login-password"]'), password);
        this.Time("time", 100, this.a02, this)
    },
    a02: function () {
        //说明：必须延时再点“登录”按扭，否则要输入手机验证码。
        $('button[type="submit"]:contains("登录")').click();
        this.a03(0)
    },
    a03: function (num) {
        num++
        $("title").html("延时" + num+"秒");
        this.Time("time", 1000, this.a03, this, num)
    },   
    c01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
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