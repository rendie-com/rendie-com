'use strict';
var fun =
{
    a01: function (username, password) {
        this.a02([30, username, password])
    },
    a02: function (arr) {
        $("title").html("【Register】超时：" + arr[0]);
        this.Time("time", 300, this.a03, this, arr);
    },
    a03: function (arr) {
        arr[0]--;
        if (arr[0] == 0) {
            $("title").html("【Register】超时了。");
        }
        else {
            let oo = $('.comet-tabs-nav-item:contains("Register")')
            if (oo.length == 0) {
                this.a02(arr)
            }
            else {
                oo.click();
                arr[0] = 30;
                this.a04(arr)
            }
        }
    },
    a04: function (arr) {
        $("title").html("【输入】超时：" + arr[0]);
        this.Time("time", 300, this.a05, this, arr);
    },
    a05: function (arr) {
        this.b01($('input[label="Email address"]'), arr[1]);
        this.b01($('input[label="Password"]'), arr[2])
        this.a06(arr);
    },
    a06: function (arr) {
        $("title").html("【点击】超时：" + arr[0]);
        this.Time("time", 300, this.a07, this, arr);
    },
    a07: function (arr) {
        arr[0]--;
        if (arr[0] == 0) {
            $("title").html("【Create account】超时了。");
        }
        else {
            let oo = $('button[aria-label="Create account"]')
            if (oo.length == 0) {
                this.a06(arr)
            }
            else {
                oo.click();
                $("title").html("点完了。。。");
                this.c01(30)
            }
        }
    },
    ////////////////////////////////////////////////////////////////
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
    /////////////////////////////////////////////////////////////////////
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
        let distance = 370//滑动位置
        if (ArrXY[0] > distance) {
            ArrXY[2].get(0).dispatchEvent(this.b02('mouseup', ArrXY))// 触发
            $("title").html("滑动完成");
            this.c08(30)
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
            this.Time("time", 10, this.c07, this, ArrXY);
        }
    },
    c07: function (ArrXY) {
        $("title").html("滑块位置:" + ArrXY[0]);
        ArrXY[2].get(0).dispatchEvent(this.b02('mousemove', ArrXY))// 触发
        this.c06(ArrXY)
    },
    c08: function (num) {
        $("title").html("滑动已完成---超时：" + num);
        this.Time("time", 1000, this.c09, this, num)
    },
    c09: function (num) {
        num--;
        if (num == 0) {
            $("title").html("超时了,就认为是已经注册过了。");
        }
        else {
            if ($("body").html().indexOf('<span>Verify email</span>') == -1) {
                let dom = $("iframe").contents().find(".errloading")
                if (dom.length == 1) {
                    $("title").html("验证失败");
                }
                else {
                    this.c08(num);
                }
            }
            else {
                $("title").html("可以等邮件了。。。");
            }
        }
    },    
    ///////////////////////////////////////////////////////////////////////////////
    d01: function (code) {
        $("title").html("验证码:" + code);
        this.b01($('input[type="number"]:eq(0)'), code.substring(0, 1))
        this.b01($('input[type="number"]:eq(1)'), code.substring(1, 2))
        this.b01($('input[type="number"]:eq(2)'), code.substring(2, 3))
        this.b01($('input[type="number"]:eq(3)'), code.substring(3, 4))
        $('button[type="submit"]:contains("Verify email")').click();
    },
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