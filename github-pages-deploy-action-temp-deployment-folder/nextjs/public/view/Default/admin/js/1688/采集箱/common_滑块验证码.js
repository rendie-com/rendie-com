Object.assign(Tool, {
    captcha: {
        a01: function (url, next, This, t) {
            let oo = {
                url: url,
                next: next,
                This: This,
                t: t
            }
            gg.tabs_remove_create_indexOf(2, oo.url, 'aria-label="滑块"', false, this.a02, this, oo);
        },
        a02: function (t, oo) {
            Tool.Time("name", 500, this.a03, this, oo)
        },
        a03: function (oo) {
            gg.delAllCookies(["https://1688.com/", "https://s.1688.com/", "https://mmstat.com/"], this.a04, this, oo)
        },
        a04: function (t, oo) {
            let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=\'"等待RenDie软件来滑动滑块。"\' where @.js=\'1688滑块验证.js\'</r:>'
            Tool.ajax.a01(txt, 1, this.a05, this, oo);
        },
        a05: function (t, oo) {
            if (t == "ok") {
                oo.num = 0;//计数
                this.d01(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        //////////////////////////
        d01: function (oo) {
            let str = '\
		    {\
                <r:action db="sqlite.tool" size=1 where=" where @.js=\'1688滑块验证.js\'">\
	                "code":<:code tag=0/>\
                </r:action>\
            }'
            Tool.ajax.a01(str, 1, this.d02, this, oo)
        },
        d02: function (t, oo) {
            if (t.code == 0) {
                $("#state").html("已被软件处理了。");
                gg.highlightTab(1, this.d03, this, oo)
            }
            else {
                oo.num++;
                $("#state").html("等待RenDie软件【" + oo.num + "】秒。。。");
                Tool.Time("name", 1000, this.d01, this, oo);
            }
        },
        d03: function (t, oo) {
            oo.next.apply(oo.This, [oo.t]);
        },
    },
})