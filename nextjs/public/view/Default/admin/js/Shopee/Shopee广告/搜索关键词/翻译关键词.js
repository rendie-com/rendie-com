'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; Shopee广告 &gt; 搜索关键词 &gt; 翻译关键词") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">关键词：</td><td id="keyword" colspan="2"></td></tr>\
            <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        let str = '{\
        <r:keyword size=1 db="sqlite.shopee" page=2 where=" where @.site=\'' + obj.arr[5] + '\' and @.cn_keyword=0 order by @.relevance desc">\
            "keyword":<:keyword tag=json/>,\
            "id":<:id/>,\
        </r:keyword>\
        "A2":' + (this.obj.A2 == 0 ? '<@count/>' : 0) + '\
        }'
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) this.obj.A2 = t.A2;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t);
    },
    a04: function (oo) {
        $("#keyword").html(oo.keyword)
        let sl = this.b01(obj.arr[5])
        let pArr = [
            "client=gtx",
            "sl=" + sl,
            "tl=zh-CN",
            "hl=zh-CN",
            "dt=t",
            "dt=bd",
            "dj=1",
            "source=icon",
            "tk=217757.217757",
            "q=" + oo.keyword
        ]
        let url = "https://translate.googleapis.com/translate_a/single?" + pArr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在翻译。。。");
        if (sl) {
            Tool.ajax.json(url, this.a05, this, oo)
        }
        else {
            Tool.at("未知语言，需要开发。")
        }        
    },
    a05: function (t, oo) {
        if (t.sentences) {
            this.a06(t.sentences[0].trans, oo)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    a06: function (cn_keyword, oo) {
        $("#state").html("正在更新关键词。。。");
        let update = "update @.keyword set @.cn_keyword=" + Tool.rpsql(cn_keyword) + " where @.id=" + oo.id
        let str = '"ok"<r: db="sqlite.shopee">' + update + '</r:>'
        Tool.ajax.a01(str, 1, this.a07, this);
    },
    a07: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            $("#state").html("正在进入第" + this.obj.A1 + "条。。。");
            this.a02();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    b01: function (val) {
        let str = ""
        if (val == "my") {
            str = "en"//英语
        }
        else if (val == "br") {
            str = "pt";//葡萄牙语
        }
        else if (val == "tw") {
            str = "zh-TW";//葡萄牙语
        }
        else {
            Tool.at("未开发")
            aaaaaaa
        }
        return str;
   },
}
fun.a01();