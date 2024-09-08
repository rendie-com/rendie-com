'use strict';
var fun =
{
    a01: function (serverLocation) {
        $("title").html("点创建项目")
        $('.css-z20xlz').click();
        let oo = {
            serverLocation: serverLocation,
            num: 50
        }
        this.a02(oo)
    },
    a02: function (oo) {
        $("title").html("超时" + oo.num + ",找搜索框");
        this.Time("name", 300, this.a03, this, oo);
    },
    a03: function (oo) {
        oo.num--;
        if (oo.num == 0) {
            $("title").html("搜索框,已超时。");
        }
        else {
            let o1 = $('input[placeholder="Search Templates"]')//
            if (o1.length == 0) {
                this.a02(oo)
            }
            else {
                $("title").html("在搜索框内填写“Bash”...");
                this.b01(o1, "Bash");
                oo.num = 50;
                this.d01(oo)
            }
        }
    },
    /////////////////////////////////////////////
    b01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    },
    ////////////////////////////////////////////////
    d01: function (oo) {
        oo.num--;
        $("title").html("找“Bash”按扭,超时" + oo.num + "...");
        this.Time("name", 300, this.d02, this, oo);
    },
    d02: function (oo) {
        oo.num--;
        if (oo.num == 0) {
            $("title").html("找“Bash”按扭,已超时。");
        }
        else {
            let o1 = $("li[role=\"option\"]:contains('Bash')")
            if (o1.length == 0) {
                $("title").html("再去找【项目搜索框】...");
                this.d01(oo);
            }
            else {
                $("title").html("选中搜索的项目");
                o1.click();
                oo.num = 50;
                this.e01(oo)
            }
        }

    },
    ////////////////////////////////////////
    e01: function (oo) {
        $("title").html("超时" + oo.num + ",延时300ms");
        this.Time("name", 300, this.e02, this, oo);
    },
    e02: function (oo) {
        oo.num--;
        if (oo.num == 0) {
            $("title").html("找“提交”按扭,已超时。");
        }
        else {
            let o1 = $('button[class="css-10k4d9x"]')//提交
            if (o1.length == 0) {
                this.e01(oo)
            }
            else {
                this.b01($('input[data-cy="create-repl-title-input"]'), oo.serverLocation);//项目名称
                o1.click();//提交
                $("title").html("已提交，点完了");
                this.f01(1)
            }
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    f01: function (num) {
        $("title").html("计数" + num + "。");
        this.Time("name", 1000, this.f02, this, num);
    },
    f02: function (num) {
        num++;
        let o1 = $('button[class="css-10k4d9x"]')//提交
        if (o1.length == 0) {
            $("title").html("计时结束，等结果。");
        } else {
            this.f01(num)
        }
    },
    ////////////////////////
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