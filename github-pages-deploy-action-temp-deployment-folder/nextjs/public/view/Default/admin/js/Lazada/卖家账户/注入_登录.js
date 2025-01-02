'use strict';
var fun =
{
    a01: function (email, password) {
        this.c01($('input[id="account"]'), email);
        this.c01($("#password"), password);
        this.Time("time", 100, this.a02, this)
    },
    a02: function (arr) {
        $('button:contains("登录")').click();
        this.a03(30)
    },
    a03: function (time) {
        $("title").html("超时：" + time);
        this.Time("time", 1000, this.a04, this, time)
    },
    a04: function (time) {
        time--;
        if (time == 0) {
            $("title").html("已超时，已超时，已超时。");
        }
        else {
            this.a03(time);
        }
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