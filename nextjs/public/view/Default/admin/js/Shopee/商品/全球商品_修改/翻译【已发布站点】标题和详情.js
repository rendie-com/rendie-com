'use strict';
var fun =
{
    translate: {
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
            gg.postFetch(url, JSON.stringify(data), this.a02, this, oo)
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
    obj: {
        A1: 1, Aarr: ["tw", "my", "br"],
        B1: 1, B2: 0,
    },
    a01: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 全球商品_修改 &gt; 翻译【已发布站点】标题和详情") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                <tr><td class="right">站点：</td><td colspan="2" id="site"></td></tr>\
                <tr><td class="right w150">站点进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.Aarr.length, this.a04, this)
    },
    a04: function () {
        let site = this.obj.Aarr[this.obj.A1 - 1]
        $("#site").html(Tool.site(site));
        let where = " where @.isup=1 and @.is" + site + "=1"
        //and @.proid=\'R837763\'
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("ManualReview_1688_subject,tw_name,ms_name,en_name,pt_name,ManualReview_1688_description,tw_description,ms_description,en_description,pt_description,proid") + " FROM @.table" + where + Tool.limit(1, this.obj.B1),
        }]
        if (this.obj.B2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select count(1) as total FROM @.table" + where,
            })
        }
        $("#state").html("正在获取商品信息。。。")
        Tool.ajax.a01(data, this.a05, this)
    },
    a05: function (t) {
        if (this.obj.B2 == 0) this.obj.B2 = t[1][0].total;
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d01, this, this.k01, t[0][0])
    },
    /////////////////////////////////////
    b01: function (t) {
        //处理单位，后面的括号。
        let arr1 = t.split("✅")
        let str = "✅" + arr1[1] + "\n"
        if (str.indexOf("(") != -1) {
            let arr2 = Tool.StrSlice(str, "(", ")").split("=");
            if (Tool.Trim(arr2[0]) == Tool.Trim(arr2[1])) {
                str = str.split("(")[0] + "\n"
            }
        }
        for (let i = 2; i < arr1.length; i++) {
            str += "✅" + arr1[i] + "\n"
        }
        return str;
    },
    /////////////翻译成马来语///////////////////////
    d01: function (oo) {
        $("#proid").html(oo.proid)
        oo.updateArr = []//更新时要用
        if (oo.tw_name) {
            $("#state").html("不用翻译成台湾语---跳过")
            this.d04(oo);
        }
        else {
            this.d02(oo)
        }
    },
    d02: function (oo) {
        $("#state").html("正在翻译成马来语。。。")
        this.translate.a01(oo.ManualReview_1688_subject, "zh-CN", "zh-TW", this.d03, this, oo)
    },
    d03: function (t, oo) {
        oo.updateArr.push("@.tw_name=" + Tool.rpsql(t))
        oo.updateArr.push("@.tw_nameLen=" + t.length)
        this.d04(oo);
    },
    d04: function (oo) {
        $("#proid").html(oo.proid)
        if (oo.ms_name) {
            $("#state").html("不用翻译成马来语---跳过")
            this.e01(oo);
        }
        else {
            this.d05(oo)
        }
    },
    d05: function (oo) {
        $("#state").html("正在翻译成马来语。。。")
        this.translate.a01(oo.ManualReview_1688_subject, "zh-CN", "ms", this.d06, this, oo)
    },
    d06: function (t, oo) {
        oo.updateArr.push("@.ms_name=" + Tool.rpsql(t))
        oo.updateArr.push("@.ms_nameLen=" + t.length)
        this.e01(oo);
    },
    ///////////////////////////////////////////////////////////
    e01: function (oo) {
        if (oo.en_name) {
            $("#state").html("不用翻译成英语---跳过")
            this.f01(oo);
        }
        else {
            this.e02(oo)
        }
    },
    e02: function (oo) {
        $("#state").html("正在翻译成英文。。。")
        this.translate.a01(oo.ManualReview_1688_subject, "zh-CN", "en", this.e03, this, oo)
    },
    e03: function (t, oo) {
        oo.updateArr.push("@.en_name=" + Tool.rpsql(t))
        oo.updateArr.push("@.en_nameLen=" + t.length)
        this.f01(oo);
    },

    //////////////翻译成葡萄牙语/////////////////////////////////
    f01: function (oo) {
        if (oo.pt_name) {
            $("#state").html("不用翻译成葡萄牙语---跳过")
            this.g01(oo);
        }
        else {
            this.f02(oo)
        }
    },
    f02: function (oo) {
        $("#state").html("正在翻译成葡萄牙语。。。")
        this.translate.a01(oo.ManualReview_1688_subject, "zh-CN", "pt", this.f03, this, oo)
    },
    f03: function (t, oo) {
        oo.updateArr.push("@.pt_name=" + Tool.rpsql(t))
        oo.updateArr.push("@.pt_nameLen=" + t.length)
        this.g01(oo);
    },
    ///////////////////////////////////////////////
    g01: function (oo) {
        if (oo.tw_description) {
            $("#state").html("不用翻译成台湾语---跳过")
            this.g04(oo);
        }
        else {
            this.g02(oo)
        }
    },
    g02: function (oo) {
        $("#state").html("正在翻译成台湾语。。。")
        this.translate.a01(oo.ManualReview_1688_description, "zh-CN", "zh-TW", this.g03, this, oo)
    },
    g03: function (t, oo) {
        oo.updateArr.push("@.tw_description=" + Tool.rpsql(this.b01(t)))
        this.g04(oo);
    },
    /////////////////////////
    g04: function (oo) {
        if (oo.ms_description) {
            $("#state").html("不用翻译成马来语---跳过")
            this.h01(oo);
        }
        else {
            this.g05(oo)
        }
    },
    g05: function (oo) {
        $("#state").html("正在翻译成英语。。。")
        this.translate.a01(oo.ManualReview_1688_description, "zh-CN", "ms", this.g06, this, oo)
    },
    g06: function (t, oo) {
        oo.updateArr.push("@.ms_description=" + Tool.rpsql(this.b01(t)))
        this.h01(oo);
    },
    //////////////////////////////////////
    h01: function (oo) {
        if (oo.en_description) {
            $("#state").html("不用翻译成英语---跳过")
            this.i01(oo);
        }
        else {
            this.h02(oo)
        }
    },
    h02: function (oo) {
        $("#state").html("正在翻译成英语。。。")
        this.translate.a01(oo.ManualReview_1688_description, "zh-CN", "en", this.h03, this, oo)
    },
    h03: function (t, oo) {
        oo.updateArr.push("@.en_description=" + Tool.rpsql(this.b01(t)))
        this.i01(oo);
    },
    ////////////////////////////////////
    i01: function (oo) {
        if (oo.pt_description) {
            $("#state").html("不用翻译成葡萄牙语---跳过")
            this.j01(oo)
        }
        else {
            this.i02(oo);
        }
    },
    i02: function (oo) {
        $("#state").html("正在翻译成葡萄牙语。。。")
        this.translate.a01(oo.ManualReview_1688_description, "zh-CN", "pt", this.i03, this, oo)
    },
    i03: function (t, oo) {
        oo.updateArr.push("@.pt_description=" + Tool.rpsql(this.b01(t)))
        this.j01(oo);
    },
    ///////////////////////////////////////
    j01: function (oo) {
        if (oo.updateArr.length != 0) {
            let data = [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "update @.table set " + oo.updateArr.join(",") + " where @.proid=" + Tool.rpsql(oo.proid),
            }]
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01(data, this.j02, this)
        }
        else {
            this.j02([])
        }
    },
    j02: function (t) {
        this.obj.B1++;
        $("#state").html("正在进入第" + this.obj.B1 + "页。。。");
        this.a04();
    },
    ////////////////////////////////////////
    k01: function () {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a03();
    },
}
fun.a01();










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
//        "tk=217757.217757",
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