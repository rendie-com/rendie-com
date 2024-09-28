'use strict';
var fun =
{
    a01: function (username, password) {
        this.a02([username, password]);
    },
    a02: function (arr) {
        this.Time("name", 100, this.a03, this, arr);
    },
    a03: function (arr) {
        let oo = $('[name="name"]')
        if (oo.length == 0) {
            this.a02(arr)
        }
        else {
            this.c02($('input[name="name"]'), arr[0].split("@")[0]);
            this.c02($('input[name="email"]'), arr[0]);
            this.c02($('input[name="password"]'), arr[1]);
            $('button[type="submit"]').click();
        }
    },
    c01: function (name, ArrXY) {
        return event = new MouseEvent(name,
            {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: ArrXY[0],
                clientY: ArrXY[1],
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                button: 0,
                relatedTarget: null,
            });
    },
    c02: function (oo, value) {
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