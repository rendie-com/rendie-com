'use strict';
var fun1 =
{
    a01: function (username, password) {
        this.c01($('input[name="login"]'), username);
        this.c01($('input[name="password"]'), password);
        $("#loginBtn").click();
        this.a02(30)
    },
    a02: function (time) {
        $("title").html("超时：" + time);
        this.Time("time", 1000, this.a03, this, time)
    },
    a03: function (time) {
        time--;
        if (time == 0) {
            $("title").html("给个指定内容，能跳出去后，刷新后，再来。");
            $("body").html('<span>Something went wrong trying to submit. Please try again.</span>')
        }
        else { this.a02(time); }
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