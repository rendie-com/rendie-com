'use strict';
var fun =
{
    a01: function (num) {
        $("title").html("超时：" + num + "，【GitHub登录】是否可能点。")
        this.Time("name", 200, this.a02, this, num)
    },
    a02: function (num) {
        num--
        if (num == 0) {
            $("title").html("【计划类型】是否可能点，已超时。")
        }
        else {
            let oo = $('button[data-testid="login/github-button"]')
            if (oo.length == 1) {
                oo.click();
                $("title").html("已点登录");
            }
            else {
                this.a01(num)
            }
        }
    },
    /////////////////////////////////////////
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
fun.a01(50);