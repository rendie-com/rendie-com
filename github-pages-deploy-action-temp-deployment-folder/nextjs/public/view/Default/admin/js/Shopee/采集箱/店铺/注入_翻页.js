'use strict';
var fun01 =
{
    a01: function (num) {
        $("title").html("延时次数：" + num);
        this.Time("time", 10, this.a02, this, num)
    },
    a02: function (num) {
        let dom = $(".shopee-icon-button--right")
        if (dom.length == 0) {
            num++;
            this.a01(num)
        }
        else {
            $("title").html("延时5秒后去点下一页。");
            this.Time("time", 1000 * 5, this.a03, this, dom)

        }
    },
    a03: function (dom) {
        dom.click();
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
fun01.a01(0)