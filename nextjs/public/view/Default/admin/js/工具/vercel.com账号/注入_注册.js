'use strict';
var fun =
{
    a01: function (username) {
        let oo = {
            username: username,
            num:20
        }
        this.a02(oo)
    },
    a02: function (oo) {
        $("title").html("【计划类型】是否能点，超时：" + oo.num)
        this.Time("name", 200, this.a03, this, oo)
    },
    a03: function (oo) {
        oo.num--
        if (oo.num == 0) {
            $("title").html("【计划类型】是否能点，已超时。")
        }
        else {
            let o1 = $("#hobby")
            if (o1.length == 1) {
                o1.click();
                $("title").html("已点【计划类型】。")
                oo.num=50
                this.d01(oo)
            }
            else {
                this.a02(oo)
            }
        }
    },
    ///////////////////////////////////////////////////////////
    d01: function (oo) {
        $("title").html("【输入框】是否显示，超时：" + oo.num)
        this.Time("name", 200, this.d02, this, oo)
    },
    d02: function (oo) {
        oo.num--
        if (oo.num == 0) {
            $("title").html("【输入框】是否显示，已超时。")
        }
        else {
            let o1 = $('input[aria-label="Your Name"]')
            if (o1.length == 1) {
                this.b01(o1, oo.username.split("@")[0]);
                $("title").html("已输入信息。")
                $('button[data-testid="signup-v2/hobby-continue-button"]').click();//点继续
                this.e01(50)
            }
            else {
                this.d01(num)
            }
        }
    },
    ///////////////////////////////////////////////////////////
    e01: function (num) {
        $("title").html("超时：" + num + "【Continue with Email →】是否显示.")
        this.Time("name", 200, this.e02, this, num)
    },
    e02: function (num) {
        num--
        if (num == 0) {
            $("title").html("已超时，【Continue with Email →】是否显示。")
        }
        else {
            let oo = $('button[data-testid="login/github-button"]')//这个是 github 按扭
            if (oo.length == 1) {
                oo.click();
                $("title").html("已点github 按扭")
            }
            else {
                this.e01(num)
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