'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: []
    },
    a01: function () {
        let html = Tool.header('TikTok &gt; 商品类目 &gt; 采集类目') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="right w150">邮箱：</td><td id="email" colspan="2"></td></tr>\
                <tr><td class="right">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function () {
        let url = "https://api16-normal-useast1a.tiktokglobalshop.com/api/v1/product/global/product_creation/preload_all_categories?locale=zh-CN&oec_seller_id=7495633903253555252&require_image=true"
        $("#state").html("正在获取网址中的内容。。。");
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a04, this)
    },
    a04: function (t) {
        if (t.message == "success") {
            this.a05(t.data)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    a05: function (arr) {
        let Aarr = [];
        for (let i = 0; i < arr.length; i++) {
            Aarr.push(this.b01(arr[i], i))
        }
        $("#state").html("正在拼装SQL。。。");
        this.obj.Aarr = Aarr
        this.obj.A2 = Math.ceil(Aarr.length / 50)
        this.d01()
    },
    /////////////////////////////////////////////////////////////////////////////////
    b01: function (oo, i) {
        let selectType, insertType;
        selectType = "select count(1) from @.categories where @.fromID=" + oo.id
        insertType = "insert into @.categories(@.name,@.parent_id,@.fromID,@.sort,@.is_leaf)values('" + (oo.name).replace(/'/ig, "''") + "'," + oo.parent_id + "," + oo.id + "," + (i + 1) + "," + (oo.is_leaf ? 1 : 0) + ")"
        return '<if Fun(Db(sqlite.tiktok,' + selectType + ',count))==0><r: db="sqlite.tiktok">' + insertType + '</r:></if>'
    },
    //////////////////////////////
    d01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d02, this)
    },
    d02: function () {
        let nArr = [], len = this.obj.Aarr.length > 50 ? 50 : this.obj.Aarr.length
        for (let i = 0; i < this.obj.Aarr.length; i++) {
            nArr.push(this.obj.Aarr[0])
            this.obj.Aarr.shift();
        }
        Tool.ajax.a01('"ok"' + nArr.join(""), 1, this.d03, this)
    },
    d03: function (t) {
        this.obj.A1++;
        this.d01();
    },
}
fun.a01();