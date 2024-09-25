Object.assign(Tool, {
    translate_name: {
        a01: function (q, sl, tl, next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t
            }
            let url = "https://translate-pa.googleapis.com/v1/translateHtml"
            let data = [
                [
                    [q],
                    sl,
                    tl
                ],
                "te_lib"
            ]
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json+protobuf'
                },
                {
                    "name": "X-Goog-Api-Key",
                    "value": 'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (t[0][0]) {
                Tool.apply(t[0][0], oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["翻译出错", t])
            }
        },


    },
    translate: {
        a01: function (dom, id, q) {
            let oo = {
                dom: dom,
                id: id,
                q: q
            }
            gg.isRD(this.a02, this, oo)
        },
        //////////////////////////////////////
        a02: function (t, oo) {
            //正在翻译成台湾语。。。
            Tool.translate_name.a01(oo.q, "zh-CN", "zh-TW", this.a03, this, oo)
        },
        a03: function (t, oo) {
            oo.tw_name = [t];
            oo.dom.tw_nameLen.html(t.length)
            this.a04(oo);
        },
        a04: function (oo) {
            //正在反向翻译成中文。。。
            Tool.translate_name.a01(oo.tw_name[0], "zh-TW", "zh-CN", this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.tw_name.push(t);
            oo.dom.tw_name.html(oo.tw_name[0] + '<div style="color:#999">' + oo.tw_name[1] + '</div>')
            this.b01(oo);
        },
        //////////////////////////////////////
        b01: function (oo) {
            //正在翻译成马来语。。。
            Tool.translate_name.a01(oo.q, "zh-CN", "ms", this.b02, this, oo)
        },
        b02: function (t, oo) {
            oo.ms_name = [t];
            oo.dom.ms_nameLen.html(t.length)
            this.b03(oo);
        },
        b03: function (oo) {
            //正在反向翻译成中文。。。
            Tool.translate_name.a01(oo.ms_name[0], "ms", "zh-CN", this.b04, this, oo)
        },
        b04: function (t, oo) {
            oo.ms_name.push(t);
            oo.dom.ms_name.html(oo.ms_name[0] + '<div style="color:#999">' + oo.ms_name[1] + '</div>')
            this.d01(oo);
        },
        /////////////////////////////////////////////////
        d01: function (oo) {
            //正在翻译成英语。。。
            Tool.translate_name.a01(oo.q, "zh-CN", "en", this.d02, this, oo)
        },
        d02: function (t, oo) {
            oo.en_name = [t];
            oo.dom.en_nameLen.html(t.length)
            this.d03(oo);
        },
        d03: function (oo) {
            //正在反向翻译成中文。。。
            Tool.translate_name.a01(oo.en_name[0], "en", "zh-CN", this.d04, this, oo)
        },
        d04: function (t, oo) {
            oo.en_name.push(t);
            oo.dom.en_name.html(oo.en_name[0] + '<div style="color:#999">' + oo.en_name[1] + '</div>')
            this.e01(oo);
        },
        //////////////////////////////////////////
        e01: function (oo) {
            //正在翻译成葡萄牙语。。。
            Tool.translate_name.a01(oo.q, "zh-CN", "pt", this.e02, this, oo)
        },
        e02: function (t, oo) {
            oo.pt_name = [t];
            oo.dom.pt_nameLen.html(t.length)
            this.e03(oo);
        },
        e03: function (oo) {
            //正在反向翻译成中文。。。           
            Tool.translate_name.a01(oo.q, "pt", "zh-CN", this.e04, this, oo)
        },
        e04: function (t, oo) {
            oo.pt_name.push(t);
            oo.dom.pt_name.html(oo.pt_name[0] + '<div style="color:#999">' + oo.pt_name[1] + '</div>')
            this.f01(oo);
        },
        //////////////////////////////////////////
        f01: function (oo) {
            let updateArr = [
                '@.ManualReview_1688_subject=' + Tool.rpsql(oo.q),
                '@.tw_name=' + Tool.rpsql(oo.tw_name[0]),
                '@.tw_nameLen=' + oo.tw_name[0].length,
                '@.ms_name=' + Tool.rpsql(oo.ms_name[0]),
                '@.ms_nameLen=' + oo.ms_name[0].length,
                '@.en_name=' + Tool.rpsql(oo.en_name[0]),
                '@.en_nameLen=' + oo.en_name[0].length,
                '@.pt_name=' + Tool.rpsql(oo.pt_name[0]),
                '@.pt_nameLen=' + oo.pt_name[0].length,
            ]
            let html = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set ' + updateArr.join(",") + ' where @.id=' + oo.id + '</r:>'
            Tool.ajax.a01(html, 1, this.f02, this, oo.dom.This);
        },
        f02: function (t, This) {
            if (t == "ok") {
                This.attr("disabled", false);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
    },
})


//正在翻译成英文。。。
//Tool.ajax.json(this.b01(V, "zh-CN", "en"), this.a02, this, oo)

//b01: function (value, sl, tl) {
//    let pArr = [
//        "client=gtx",
//        "sl=" + sl,
//        "tl=" + tl,
//        "hl=" + tl,
//        "dt=t",
//        "dt=bd",
//        "dj=1",
//        "source=icon",
//        "tk=413755.413755",
//        "q=" + encodeURIComponent(value)
//    ]
//    return "https://translate.googleapis.com/translate_a/single?" + pArr.join("&")
//},
//b02: function (arr) {
//    let str = ""
//    for (let i = 0; i < arr.length; i++) {
//        str += arr[i].trans
//    }
//    return str;
//},