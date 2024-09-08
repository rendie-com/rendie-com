'use strict';
var fun =
{

    a01: function (username, password) {
        let arr = [username, password];
        this.a02(arr)
    },
    a02: function (arr) {
        this.Time("name", 100, this.a03, this, arr);
    },
    a03: function (arr) {
        let oo = $('span[data-target="typing-effect.content"]:contains("begin the adventure")')
        if (oo.length == 1) {
            this.c01($("#email"), arr[0]);
            this.a04(arr)
        }
        else {
            this.a02(arr);
        }
    },
    a04: function (arr) {
        this.Time("name", 100, this.a05, this, arr);
    },
    a05: function (arr) {
        let oo = $('button[data-optimizely-event="click.signup_continue.email"]');
        if (oo.attr("disabled") == "disabled") {
            this.a04(arr);
        }
        else {
            $("title").html("第1行，点确认")
            oo.click();
            this.c01($("#password"), arr[1]);
            this.a06(arr[0].split("@")[0])
        }
    },
    a06: function (name) {
        this.Time("name", 100, this.a07, this, name);
    },
    a07: function (name) {
        let oo = $('button[data-optimizely-event="click.signup_continue.password"]')
        if (oo.attr("disabled") == "disabled") {
            this.a06(name);
        }
        else {
            $("title").html("第2行，点确认")
            oo.click();
            this.c01($("#login"), name);
            this.a08([0, name])
        }
    },
    a08: function (arr) {
        this.Time("name", 100, this.a09, this, arr);
    },
    a09: function (arr) {
        let oo = $("#login-err:contains('available')")
        if (oo.length == 1) {
            let text = oo.text()
            if (text.indexOf("Username") != -1) {
                arr[0]++;
                oo.html("清空")
                this.c01($("#login"), arr[1] + arr[0]);
                this.a08(arr);
            }
            else {
                this.a10();
            }
        } else { this.a08(arr) }
    },
    a10: function () {
        $("title").html("第3行，点确认【验证用户名称】")
        $('button[data-optimizely-event="click.signup_continue.username"]').click();
        this.a11();
    },
    a11: function () {
        this.Time("name", 100, this.a12, this);
    },
    a12: function () {
        $("title").html("第4行，确认中。。。")
        let o1 = $('#opt-in-container')
        if (o1.attr("data-step-state") == "active") {
            $('button[data-continue-to="captcha-and-submit-container"]').click();
           this.a13(15)
        }
        else {
            this.a11();
        }
    },
    a13: function (num) {
        $("title").html(num)
        this.Time("name", 500, this.a14, this,num);
    },
    a14: function (num) {
        num--
        if (num == 0) {
            this.a15() 
        }
        else {
            $('button[data-continue-to="captcha-and-submit-container"]').click();
            this.a13(num);
        }
    },
    a15: function () {
       // let oo=$('iframe[title="Please verify by completing this captcha."]')
       // console.log(oo.length)
       //let dom = oo.contents()
       // console.log(dom.find("title").html())

        this.Time("name", 1000, this.a16, this);
    },
    a16: function () {
        $("title").html("最后提交是否可用")
        let oo = $('button[data-optimizely-event="click.signup_continue.create_account"]')
        if (oo.attr("disabled") == "disabled") {
            this.a15();
        }
        else {
            oo.click();
            $("title").html("点完了")
        }
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

//let o1 = $('#captcha-and-submit-container')
//console.log("------------")
//console.log(o1.parent().html())
//console.log("------------")
//if (o1.attr("hidden") == "active") { }
//else {
//    this.a12();
//}