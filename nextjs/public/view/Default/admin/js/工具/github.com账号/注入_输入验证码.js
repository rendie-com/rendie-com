'use strict';
var fun =
{
    a01: function (code) {
        this.a02([50, code])
    },
    a02: function (arr) {
        $("title").html("找验证码框超时：" + arr[0]);
        this.Time("name", 100, this.a03, this, arr);
    },
    a03: function (arr) {
        arr[0]--;
        if (arr[0] == 0) {
            $("title").html("找验证码框已超时。");
        }
        else {
            let oo = $('input[name="otp"]')
            if (oo.length == 0) {
                this.a02(arr)
            }
            else {
                this.c01(oo, arr[1]);
                $("title").html("已输入验证码：" + arr[1]);
            }
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
fun.a01();