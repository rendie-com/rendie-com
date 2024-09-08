'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0, Carr: [],
        D1: 1, D2: 0, Darr: []
    },
    a01: function () {
        //obj.arr[4]    返回URL
        this.obj.A1 = obj.arr[5] ? parseInt(obj.arr[5]) : this.obj.A1;//翻页
        let html = Tool.header("拼多多 &gt; 采集箱 &gt; 正在给【首图】【放大镜图】【属性图】【详情图】搜货源。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
		    <tr><td class="right">首图上传前：</td><td id="picA1" colspan="2"></td></tr>\
		    <tr><td class="right">首图上传后：</td><td id="picA2" colspan="2"></td></tr>\
		    <tr><td class="right">放大镜图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">放大镜图上传前：</td><td id="picB1" colspan="2"></td></tr>\
		    <tr><td class="right">放大镜图上传后：</td><td id="picB2" colspan="2"></td></tr>\
		    <tr><td class="right">属性图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		    <tr><td class="right">属性图上传前：</td><td id="picC1" colspan="2"></td></tr>\
		    <tr><td class="right">属性图上传后：</td><td id="picC2" colspan="2"></td></tr>\
		    <tr><td class="right">详情图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
		    <tr><td class="right">详情图上传前：</td><td id="picD1" colspan="2"></td></tr>\
		    <tr><td class="right">详情图上传后：</td><td id="picD2" colspan="2"></td></tr>\
		    <tr><td class="right">手动验证链接：</td><td id="captchaLink" colspan="2"></td></tr>\
		    <tr><td class="right">验证码识别步骤：</td><td id="captchaImg" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let str = '\
        {\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
            <r:pifa size=1 page=2 db="sqlite.pinduoduo">,\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "DHpic":<:DHpic tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "DHdesPic":<:DHdesPic tag=0/>,\
                </r:prodes>\
                "pic":<:pic tag=0/>,\
                "proid":"<:proid/>"\
            </r:pifa>\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        $("#proid").html(oo.proid);
        this.obj.B2 = oo.DHpic.length
        this.obj.Barr = oo.DHpic
        this.obj.C2 = oo.DHattrPic.length
        this.obj.Carr = oo.DHattrPic
        this.obj.D2 = oo.DHdesPic.length
        this.obj.Darr = oo.DHdesPic
        if (oo.pic == 0) {
            $("#picA1,#picA2").html("没有首图，跳过。")
            this.d01(oo)
        }
        else if (oo.pic.picA.pinduoduo) {
            $("#picA1,#picA2").html("已前处理过了，跳过。")
            this.d01(oo)
        }
        else {
            Tool.searchImg.a01(oo.pic, $("#picA1"), $("#picA2"), this.a06, this, oo)
        }
    },
    a06: function (picObj, oo) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.pinduoduo">update @.pifa set @.pic=' + Tool.rpsql(JSON.stringify(picObj)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a07, this, oo)
    },
    a07: function (t, oo) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.d01(oo)
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    a08: function () {
        this.obj.A1++;
        Tool.open(5, this.obj.A1);
        //$("#proid,#picA1,#picA2,#captchaImg").html("");
        //this.obj.B1 = 1; this.obj.B2 = 0; this.obj.Barr = [];
        //$("#B1").css("width", "0%"); $("#B1,#B2,#picB1,#picB2").html("");
        //this.obj.C1 = 1; this.obj.C2 = 0; this.obj.Carr = [];
        //$("#C1").css("width", "0%"); $("#C1,#C2,#picC1,#picC2").html("");
        //this.obj.D1 = 1; this.obj.D2 = 0; this.obj.Darr = [];
        //$("#D1").css("width", "0%"); $("#D1,#D2,#picD1,#picD2").html("");
        //this.a03();
    },
    d01: function (oo) {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.d04, oo);
    },
    d02: function (oo) {
        let Barr = this.obj.Barr[this.obj.B1 - 1]
        if (Barr == 0) {
            $("#picB1,#picB2").html("没有放大镜图，跳过。")
        }
        else if (Barr.picA.pinduoduo) {
            $("#picB1,#picB2").html("已前处理过了，跳过。")
            this.e01(oo)
        }
        else {
            Tool.searchImg.a01(Barr, $("#picB1"), $("#picB2"), this.d03, this, oo)
        }
    },
    d03: function (picObj, oo) {
        this.obj.Barr[this.obj.B1 - 1] = picObj;
        this.obj.B1++;
        this.d01(oo)
    },
    d04: function (oo) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid,50) + '">update @.prodes set @.DHpic=' + Tool.rpsql(JSON.stringify(this.obj.Barr)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('""' + str, 1, this.d05, this, oo)
    },
    d05: function (t, oo) {
        if (t == "") {
            $("#state").html("下一步...");
            this.e01(oo)
        }
        else {
            $("#state").html("俩条语句同时执行就这样子...");
            this.d04(oo)//
            //Tool.at("更新出错02：" + t)
        }
    },
    ///////////////////////////////
    e01: function (oo) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.e02, this, this.e04, oo);
    },
    e02: function (oo) {
        let Carr = this.obj.Carr[this.obj.C1 - 1]
        if (Carr === 0) {
            $("#picC1,#picC2").html("没有属性图，跳过。")
        }
        else if (Carr === false || Carr.picB.fileurl == "") {
            $("#state").html("空位置，过。")
            this.e03(false, oo)
        }
        else if (Carr.picA.pinduoduo) {
            $("#picC1,#picC2").html("已前处理过了，跳过。")
            this.f01(oo)
        }
        else {
            Tool.searchImg.a01(Carr, $("#picC1"), $("#picC2"), this.e03, this, oo)
        }
    },
    e03: function (picObj, oo) {
        this.obj.Carr[this.obj.C1 - 1] = picObj;
        this.obj.C1++;
        this.e01(oo)
    },
    e04: function (oo) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid,50) + '">update @.prodes set @.DHattrPic=' + Tool.rpsql(JSON.stringify(this.obj.Carr)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.e05, this, oo)
    },
    e05: function (t, oo) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.f01(oo)
        }
        else {
            Tool.at("更新出错03：" + t)
        }
    },
    ///////////////////////////////
    f01: function (oo) {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.f02, this, this.f04, oo);
    },
    f02: function (oo) {
        let Darr = this.obj.Darr[this.obj.D1 - 1]
        if (Darr === 0) {
            $("#picD1,#picD2").html("没有属性图，跳过。");
        }
        else if (Darr === false || Darr == null) {
            $("#state").html("空位置，过。");
            this.f03(false, oo)
        }
        else if (Darr.picA.pinduoduo) {
            $("#picD1,#picD2").html("已前处理过了，跳过。");
            this.a08();
        }
        else {
            Tool.searchImg.a01(Darr, $("#picD1"), $("#picD2"), this.f03, this, oo)
        }
    },
    f03: function (picObj, oo) {
        this.obj.Darr[this.obj.D1 - 1] = picObj;
        this.obj.D1++;
        this.f01(oo)
    },
    f04: function (oo) {
        $("#state").html("正在更新数据...");
        let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid,50) + '">update @.prodes set @.DHdesPic=' + Tool.rpsql(JSON.stringify(this.obj.Darr)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.f05, this, oo)
    },
    f05: function (t, oo) {
        if (t == "ok") {
            $("#state").html("下一步...");
            this.a08();
        }
        else {
            Tool.at("更新出错03：" + t)
        }
    },
}
fun.a01();