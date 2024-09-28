'use strict';
var fun =
{
    a01: function () {
       this.a02(50)
    },
    a02: function (num) {
        $("title").html("【计划类型】是否能点，超时：" + num)
        this.Time("name", 200, this.a03, this, num)
    },
    a03: function (num) {
        num--
        if (num == 0) {
            $("title").html("【Authorize Vercel】按扭是否能点，已超时。")
        }
        else {
            let o1 = $("#js-oauth-authorize-btn")
            if (o1.length == 1) {
                o1.click();
                $("title").html("已点【Authorize Vercel】按扭。")
              
            }
            else {
                this.a02(num)
            }
        }
    },  
    /////////////////////////////////////////////////////////////
    b01: function (oo, value) {
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
fun.a01()