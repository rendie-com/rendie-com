var rendie_fun =
{
    a01: function (username, password) {
        this.a02({ username: username, password: password })

    },
    a02: function (oo) {
        let dom1 = $('input[placeholder="子母账号登录名(XX:main)/手机/邮箱"]').get(0)
        if (dom1) {
            this.c01(dom1, oo.username);
            this.c01($('input[placeholder="密码"]').get(0), oo.password);
            this.Time("time", 100, this.a03, this)
        }
        else {
            this.Time("time", 100, this.a02, this, oo)
        }
    },
    a03: function () {
        $('button[type="button"]:contains("登入")').click();
        this.a04(30)
    },
    a04: function (time) {
        $("title").html("超时：" + time);
        this.Time("time", 1000, this.a05, this, time)
    },
    a05: function (time) {
        time--;
        if (time == 0) {
            $("title").html("已超时，已超时，已超时。");
        }
        else {
            this.a04(time);
        }
    },
    c01: function (casess, value) {
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