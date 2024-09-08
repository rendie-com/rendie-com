'use strict';
var fun01 =
{
    a01: function (num) {
        $("title").html("延时次数：" + num);
        this.Time("time", 10, this.a02, this, num)
    },
    a02: function (num) {
        let dom = $("#main > div > div:nth-child(3) > div > div > div > div.u37U8O > section > fieldset > div.shopee-mini-page-controller > a.shopee-button-outline.shopee-mini-page-controller__next-btn")
        if (dom.length == 0) {
            num++;
            this.a01(num)
        }
        else {
            $("title").html("延时1秒后去点下一页。");
            this.Time("time", 1000 * 1, this.a03, this, dom)

        }
    },
    a03: function (dom) {
        $("title").html("已经点了下一页。");
        this.c02(dom);
    },
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