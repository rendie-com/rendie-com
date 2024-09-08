'use strict';
var fun =
{
    a01: function (username, password) {
        this.a02([20, username, password])
    },
    a02: function (arr) {
        $("title").html("【用户名输入框】超时：" + arr[0]);
        this.Time("time", 200, this.a03, this, arr)
    },
    a03: function (arr) {
        arr[0]--;
        if (arr[0] == 0) {
            $("title").html("【用户名输入框】超时了。");
        }
        else {
            let oo = $('input[label="Email"]')
            if (oo.length == 0) {
                this.a02(arr)
            }
            else {
                $("title").html("正在填写用户名和密码。");
                this.b01($('input[label="Email"]'), arr[1]);
                this.b01($('#fm-login-password'), arr[2]);
                this.a04(10)
            }
        }
    },
    a04: function (num) {
        $("title").html("【提交按扭】超时：" + num);
        this.Time("time", 200, this.a05, this, num)
    },
    a05: function (num) {
        num--;
        if (num == 0) {
            $("title").html("【提交按扭】超时了。");
        }
        else {
            let oo = $('button[type="submit"]')
            if (oo.length == 1) {
                oo.click();
                this.c01(30)
            }
            else {
                this.a04(num);
            }
        }
    },
    //////////////////////////////////////
    b01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    b02: function (name, ArrXY) {
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
    ////////////////////////////////////////
    c01: function (num) {
        $("title").html("【滑块验证】超时：" + num);
        this.Time("time", 500, this.c02, this, num)
    },
    c02: function (num) {
        num--;
        if (num == 0) {
            $("title").html("【滑块验证】超时了。");
        }
        else {
            let oo = $("#baxia-dialog-content")
            if (oo.length == 1) {
                $("title").html("有滑块验证")
                this.c03(30)
            }
            else {
                this.c01(num);
            }
        }
    },
    c03: function (num) {
        $("title").html("【滑块验证内容】超时：" + num);
        this.Time("time", 200, this.c04, this, num)
    },
    c04: function (num) {
        num--;
        if (num == 0) {
            $("title").html("【滑块验证内容】超时了。");
        }
        else {
            let dom = $("iframe").contents().find("#nc_1_n1z")
            if (dom.length == 1) {
                $("title").html("可以滑动了")
                this.c05(dom)
            }
            else {
                this.c03(num);
            }
        }
    },
    c05: function (dom) {
        dom.get(0).dispatchEvent(this.b02('mousedown', 0, 0))// 触发
        this.c06([0, 0, dom]);
    },
    c06: function (ArrXY) {
        let distance=370//滑动位置
        if (ArrXY[0] > distance) {
            ArrXY[2].get(0).dispatchEvent(this.b02('mouseup', ArrXY))// 触发
            $("title").html("滑动完成");
        }
        else {
            //快到的时后慢点
            if (ArrXY[0] >= distance - 100) {
                ArrXY[0] += Math.ceil(Math.random() * 2);
            } else {
                ArrXY[0] += Math.ceil(Math.random() * 10);
            }
            let sign = Math.random() > 0.5 ? -1 : 1;//左右斗一下
            ArrXY[0] += Math.ceil(Math.random() * 3 * sign);
            this.Time("1",10,this.c07,  this,  ArrXY);
        }
    },
    c07: function (ArrXY) {
        $("title").html("滑块位置:" + ArrXY[0]);
        ArrXY[2].get(0).dispatchEvent(this.b02('mousemove', ArrXY))// 触发
        this.c06(ArrXY)
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
