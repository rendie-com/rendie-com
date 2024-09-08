'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 图片 &gt; 把【全球商品】的图片上传到Shopee平台") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">放大镜图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">属性图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                    <tr><td class="right">详情图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
                    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                    <tr><td class="right">上传前首图：</td><td id="pic11" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后首图：</td><td id="pic12" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前放大镜图：</td><td id="picB1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后放大镜图：</td><td id="picB2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前属性图：</td><td id="picC1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后属性图：</td><td id="picC2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前详情图：</td><td id="picD1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后详情图：</td><td id="picD2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.d01, this)
    },
    /////////////////////////////////////////
    d01: function (t) {
        let str = '\
        {\
            <r:GlobalPro size=1 page=2 db="sqlite.shopee" where=" where @.isUpImg=0">\
                "proid":"<:proid/>",\
                "pic":<:pic tag=json/>,\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "DHpic":<:DHpic tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "DHdesPic":<:DHdesPic tag=0/>,\
                </r:prodes>\
            </r:GlobalPro>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(str, 1, this.d02, this);
    },
    d02: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, oo)
    },
    d03: function (oo) {
        $("#proid").html(oo.proid);
        Tool.shopee_img_pic1.a01(oo.pic, oo.proid, this.d04, this, oo)
    },
    d04: function (t, oo) {
        //放大镜图进度
        Tool.shopee_img_pic_attrPic_desPic.a01("B", oo.DHpic, oo.proid, "#picB1", "#picB2", "@.DHpic", this.d05, this, oo);
    },
    d05: function (t, oo) {
        //属性图进度
        Tool.shopee_img_pic_attrPic_desPic.a01("C", oo.DHattrPic, oo.proid, "#picC1", "#picC2", "@.DHattrPic", this.d06, this, oo);
    },
    d06: function (t, oo) {
        //详情图进度
        Tool.shopee_img_pic_attrPic_desPic.a01("D", oo.DHdesPic, oo.proid, "#picD1", "#picD2", "@.DHdesPic", this.d07, this, oo);
    },
    d07: function (t, oo) {
        let str = '<r: db="sqlite.shopee">update @.GlobalPro set @.isUpImg=1 where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.d08, this);
    },
    d08: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            $("#B1,#C1,#D1").html("0%").css("width", "0%");
            $("#B2,#C2,#D2").html("");
            $("#pic11,#pic12,#picB1,#picB2,#picC1,#picC2,#picD1,#picD2").html("")
            this.d01("");
        }
        else {
            Tool.pre(["出错00", t])
        }
    },
}
fun.a01()