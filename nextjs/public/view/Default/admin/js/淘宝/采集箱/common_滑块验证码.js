Object.assign(Tool, {
    captcha: {
        a01: function (name, next, This, t) {
            let oo = {
                name: name,
                next: next,
                This: This,
                t: t
            }
            this.a04("", oo)
        },
        //a02: function (oo) {
        //    Tool.Time("name", 500, this.a03, this, oo)
        //},
        //a03: function (oo) {
        //    gg.delAllCookies(["https://uland.taobao.com/", "https://h5api.m.taobao.com/"], this.a04, this, oo)
        //},
        a04: function (t, oo) {
            let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=\'"' + oo.name + '"\' where @.js=\'淘宝滑块验证.js\'</r:>'
            Tool.ajax.a01(txt, 1, this.a05, this, oo);
        },
        a05: function (t, oo) {
            if (t == "ok") {
                oo.num = 0;//计数
                this.a06(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        a06: function (oo) {
            let str = '\
		    {\
                <r:action db="sqlite.tool" size=1 where=" where @.js=\'淘宝滑块验证.js\'">\
	                "code":<:code tag=0/>\
                </r:action>\
            }'
            Tool.ajax.a01(str, 1, this.a07, this, oo)
        },
        a07: function (t, oo) {
            if (t.code == 0) {
                $("#state").html("已被软件处理了。");
                gg.highlightTab(1, this.a08, this, oo)
            }
            else {
                oo.num++;
                $("#state").html("等待RenDie软件【" + oo.num + "】秒。。。");
                Tool.Time("name", 1000, this.a06, this, oo);
            }
        },
        a08: function (t, oo) {
            oo.next.apply(oo.This, [oo.t]);
        },
    },
})