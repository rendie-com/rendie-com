'use strict';
var fun =
{
    a01: function (email) {
        let dom = $('button:contains("通过邮件进行登录")')
        dom.click();
        this.a02({ email: email, num: 50 })
    },
    a02: function (oo) {
        $("title").html("【" + oo.num + "】延时0.5秒");
        this.Time("time", 500, this.a03, this, oo)
    },
    a03: function (oo) {
        oo.num--;
        if (oo.num == 0) {
            $("#title").html("超时")
        }
        else {
            let dom = $('input[id="email"]')
            if (dom.length == 0) {
                this.a02(oo);
            }
            else {
                this.b01($('input[id="email"]'), oo.email);
                $('button[type="submit"]:contains("登录")').click()
                $("title").html("完");
            }
        }
    },
    ///////////////////////////////////////
    b01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    /////////////////////////////////////////
    c01: function () {
        this.Time("time", 1000, this.c02, this)
    },
    c02: function () {
        $('button[type="submit"]:contains("登录")').click();//点“登录”
        this.c01();
    },
    ///////////////////////////////////////////
    d01: function () {
        this.Time("time", 500, this.d02, this, 30);
    },
    d02: function (num) {
        $("title").html("请手动操作！！！");
    },
    //let dom = $('iframe[tabindex="0"]').contents().find('span')
    //if (dom.length == 0) {
    //    this.d03(num)
    //}
    //else {
    //    alert("wwwwwwwwwwwww")
    //}
    //d03: function (num) {
    //    num--
    //    if (num == 0) {
    //        $("title").html("超时！！！");
    //        console.log($('iframe[tabindex="0"]').contents())
    //    }
    //    else {
    //        $("title").html("【" + num + "】延时1秒");
    //        this.Time("time", 1000, this.d02, this, num);
    //    }
    //},
    //////////////////////////////////////////////////////////////
    e01: function (code) {
        this.b01($('input[name="otp"]'), code);
        $("title").html("已填完验证码。");        
    },
    ////////////////////////////////////////////
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