'use strict';
var rendie_fun =
{
    distance: 0,
    domObj: $(".geetest_box_wrap .geetest_slide .geetest_slider .geetest_track .geetest_btn"),
    a01: function (distance) {
        this.distance = distance
        $(".geetest_title").html("移动：" + distance + " px")
        this.domObj.mousemove(function (event) {
            console.log(event);
        })
        this.domObj.get(0).dispatchEvent(this.b01('mousedown', 0, 0))// 触发
        this.a02([0, 0]);
    },
    a02: function (ArrXY) {
        if (ArrXY[0] > this.distance) {
            this.domObj.get(0).dispatchEvent(this.b01('mouseup', ArrXY))// 触发
        }
        else {
            //快到的时后慢点
            if (ArrXY[0] >= this.distance - 20) {
                ArrXY[0] += Math.ceil(Math.random() * 2);
            } else {
                ArrXY[0] += Math.ceil(Math.random() * 10);
            }
            let sign = Math.random() > 0.5 ? -1 : 1;//左右斗一下
            ArrXY[0] += Math.ceil(Math.random() * 3 * sign);
            this.Time("1", 10, this.a03, this, ArrXY);
        }
    },
    a03: function (ArrXY) {
        this.domObj.get(0).dispatchEvent(this.b01('mousemove', ArrXY))// 触发
        this.a02(ArrXY)
    },
    b01: function (name, ArrXY) {
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
    b02: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    c01: function (username, password) {
        this.Time("1", 300, this.c02, this, [username, password]);
    },
    c02: function (arr) {
        this.b02($("[placeholder=\'请输入用户名\']"), arr[0])
        this.b02($("[placeholder=\'请输入登录密码\']"), arr[1])
        $(".login-btn").click();
    },
    d01: function () {
        $('.geetest_text_tips').html("刷新中。。。")
        this.Time("1", 10, this.d02, this);
    },
    d02: function () {
        $('button[aria-label="刷新验证"]').click();
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
    }//延时执行
}