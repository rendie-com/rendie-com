'use strict';
var fun =
{
    obj: {},
    a01: function (obj) {
        this.obj = obj;
        this.Time("name", 10, this.a02, this);
    },
    a02: function () {
        $("button:contains(Edit)").click();
        this.a03();
    },
    a03: function () {
        this.Time("name", 100, this.a04, this);
    },
    a04: function () {
        let dom = $(".country-item")
        if (dom.length != 0) {
            dom.click();//点开国家
            this.a05();
        }
        else {
            this.a03();
        }
    },
    a05: function () {
        this.Time("name", 100, this.a06, this);
    },
    a06: function () {
        let dom = $("#ae-search-select-1")
        if (dom.length != 0) {
            $(".next-menu-item:contains(" + this.obj.country + ")").click();
            this.a07()
        }
        else {
            this.a05();
        }
    },
    a07: function () {
        this.Time("name", 100, this.a08, this);
    },
    a08: function () {
        let dom = $("em:contains(" + this.obj.country + ")")
        if (dom.length != 0) {
            this.Time("name", 1000, this.a09, this);
        }
        else {
            this.a07();
        }
    },
    a09: function () {
        //澳大利亚 (Australia)----的写法
        this.b01($('input[placeholder="Contact name*"]'), this.obj.contactPerson)
        this.b01($('.pre-part input'), this.obj.phoneCountry)
        this.b01($('input[placeholder="Mobile number*"]'), this.obj.mobileNo)
        //注：我没做完，因为订单少，花时间做这个功能，也没多大用。。。
        //this.b01($("[placeholder=\'请输入登录密码\']"), "sssssssssssss")
        // $('input[placeholder="Contact name*"]').val(this.obj.country)

    },
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
    }//延时执行
}