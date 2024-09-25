'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0,//放大镜图进度
        C1: 1, C2: 0,//属性图进度
        D1: 1, D2: 0,//详情图进度
    },
    a01: function () {
        let html = Tool.header("Ozon &gt; 商品列表 &gt; 图片 &gt; 把【Ozon】商品列表的图片上传到Ozon平台") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">放大镜图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">属性图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                    <tr><td class="right">详情图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
                    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                    <tr><td class="right">上传前首图：</td><td id="pic1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后首图：</td><td id="pic2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前放大镜图：</td><td id="picB1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后放大镜图：</td><td id="picB2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前属性图：</td><td id="picC1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后属性图：</td><td id="picC2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传前详情图：</td><td id="picD1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后详情图：</td><td id="picD2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
            <table class="table table-hover"><tbody id="body"></tbody></table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获得配置参数");
        let str = '\
        {<r:seller db="sqlite.ozon" size=1>\
            "sellerId":"<:sellerId/>",\
            "email":"<:email tag=js/>",\
            "cookies":<:cookies tag=0/>\
        </r:seller>}'
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        $("#username").html(oo.email);
        Tool.loginOzon.a01(oo.email, oo.sellerId, oo.cookies, $("#state"), this.a05, this)
    },
    a05: function (t) {
        let str = '\
        {\
            <r:product size=1 page=2 db="sqlite.ozon" where=" where @.isUpImg=1">\
                "proid":"<:proid/>",\
                "pic":<:pic tag=0/>,\
                <r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "DHpic":<:DHpic tag=0/>,\
                    "DHattrPic":<:DHattrPic tag=0/>,\
                    "DHdesPic":<:DHdesPic tag=0/>,\
                </r:prodes>\
            </r:product>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, oo)
    },
    
    b01: function (src) {//上传后图片
        let str = '\
        <figure class="figure border ml-1 mb-1 mt-1 p-1">\
            <a href="' + src + '" target="_blank">\
                <img src="' + src + '" class="figure-img img-fluid rounded w100 mb-0">\
            </a>\
        </figure>'
        return str;
    },
    b02: function (fileurl) {//上传前图片
        let str = '\
        <figure class="figure border ml-1 mb-1 mt-1 p-1">\
            <a href="https://image.dhgate.com/'+ fileurl + '" target="_blank">\
                <img src="https://image.dhgate.com/100x100/'+ fileurl + '" class="figure-img img-fluid rounded w100 mb-0">\
            </a>\
        </figure>'
        return str;
    },
    /////////////////////////////////////////
    d01: function (oo) {
        $("#proid").html(oo.proid);
        if (oo.pic == 0) {
            $("#state").html("没有首图，不处理，跳过。");
            //this.a07(oo);
        }
        else {
            Tool.pre(oo)
            //this.d02(oo)
        }
    },
    //d02: function (oo) {
    //    if (oo.pic.picB.ozon) {
    //        $("#pic1,#pic2").html("已前处理过了，跳过。");
    //        this.e01(oo);
    //    }
    //    else {
    //        let fileurl = "https://image.dhgate.com/" + oo.pic.picB.fileurl;
    //        $("#pic1").append(this.b02(oo.pic.picB.fileurl))
    //        $("#state").html("正在上传图片...");
    //        Tool.upPic.a01(fileurl, this.d03, this, oo);//上传图片
    //    }
    //},
    //d03: function (o1, oo) {
    //    $("#pic2").append(this.b01(o1.url))
    //    oo.pic.picB.ozon = o1
    //    $("#state").html("正在更新数据...");
    //    let str = '<r: db="sqlite.ozon">update @.product set @.pic=' + Tool.rpsql(JSON.stringify(oo.pic)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
    //    Tool.ajax.a01('"ok"' + str, 1, this.d04, this, oo);
    //},
    //d04: function (t, oo) {
    //    if (t == "ok") {
    //        $("#state").html("下一步...");
    //        this.e01(oo);
    //    }
    //    else {
    //        Tool.at("更新出错：" + t);
    //    }
    //},
    ////////////////////////////////////////////////////
    //e01: function (oo) {
    //    this.obj.B2 = oo.DHpic.length
    //    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e02, this, this.e04, oo)//放大镜中的图片
    //},
    //e02: function (oo) {
    //    let o1 = oo.DHpic[this.obj.B1 - 1];
    //    if (o1.picB.ozon) {
    //        $("#picB1,#picB2").html("已前处理过了，跳过。");
    //        this.f01(oo);
    //    }
    //    else {
    //        let fileurl = "https://image.dhgate.com/" + o1.picB.fileurl;
    //        $("#picB1").append(this.b02(o1.picB.fileurl))
    //        $("#state").html("正在上传图片...");
    //        Tool.upPic.a01(fileurl, this.e03, this, oo);//上传图片
    //    }
    //},
    //e03: function (o1, oo) {
    //    $("#picB2").append(this.b01(o1.url))
    //    oo.DHpic[this.obj.B1 - 1].picB.ozon = o1;
    //    this.obj.B1++;
    //    this.e01(oo);
    //},
    //e04: function (oo) {
    //    $("#state").html("正在更新数据...");
    //    let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid, 50) + '">update @.prodes set @.DHpic=' + Tool.rpsql(JSON.stringify(oo.DHpic)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
    //    Tool.ajax.a01('"ok"' + str, 1, this.e05, this, oo)
    //},
    //e05: function (t, oo) {
    //    if (t == "ok") {
    //        $("#state").html("下一步...");
    //        this.f01(oo);
    //    }
    //    else {
    //        Tool.at("更新出错：" + t)
    //    }
    //},
    ////////////////////////////////////////////////////
    //f01: function (oo) {
    //    this.obj.C2 = oo.DHattrPic.length
    //    Tool.x1x2("C", this.obj.C1, this.obj.C2, this.f02, this, this.f05, oo)//属性图片
    //},
    //f02: function (oo) {
    //    let o1 = oo.DHattrPic[this.obj.C1 - 1]
    //    if (o1) {
    //        if (o1.picB.ozon) {
    //            $("#picC1,#picC2").html("已前处理过了，跳过。");
    //            this.g01(oo)
    //        }
    //        else {
    //            let fileurl = "https://image.dhgate.com/" + o1.picB.fileurl;
    //            $("#picC1").append(this.b02(o1.picB.fileurl));
    //            $("#state").html("正在上传图片...");
    //            Tool.upPic.a01(fileurl, this.f03, this, oo);//上传图片
    //        }
    //    }
    //    else {
    //        $("#picC1,#picC2").append("空位置");
    //        this.f04(oo)
    //    }
    //},
    //f03: function (o1, oo) {
    //    $("#picC2").append(this.b01(o1.url))
    //    oo.DHattrPic[this.obj.C1 - 1].picB.ozon = o1;
    //    this.f04(oo)
    //},
    //f04: function (oo) {
    //    this.obj.C1++;
    //    this.f01(oo);
    //},
    //f05: function (oo) {
    //    $("#state").html("正在更新数据...");
    //    let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid, 50) + '">update @.prodes set @.DHattrPic=' + Tool.rpsql(JSON.stringify(oo.DHattrPic)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
    //    Tool.ajax.a01('"ok"' + str, 1, this.f06, this, oo)
    //},
    //f06: function (t, oo) {
    //    if (t == "ok") {
    //        $("#state").html("下一步...");
    //        this.g01(oo)
    //    }
    //    else {
    //        Tool.Time("name", 1000, this.f05, this, oo)
    //        //Tool.pre(["更新出错03：", t])
    //        //console.log(t)
    //    }
    //},
    ////////////////////////////////////////////////////
    //g01: function (oo) {
    //    this.obj.D2 = oo.DHdesPic.length
    //    Tool.x1x2("D", this.obj.D1, this.obj.D2, this.g02, this, this.g05, oo)//详情图片
    //},
    //g02: function (oo) {
    //    let o1 = oo.DHdesPic[this.obj.D1 - 1]
    //    if (o1) {
    //        if (o1.picB.ozon) {
    //            $("#picD1,#picD2").html("已前处理过了，跳过。");
    //            this.a07(oo);
    //        }
    //        else {
    //            let fileurl = "https://image.dhgate.com/" + o1.picB.fileurl;
    //            $("#picD1").append(this.b02(o1.picB.fileurl))
    //            $("#state").html("正在上传图片...");
    //            Tool.upPic.a01(fileurl, this.g03, this, oo);//上传图片
    //        }
    //    }
    //    else {
    //        this.g04(oo)
    //    }
    //},
    //g03: function (o1, oo) {
    //    $("#picD2").append(this.b01(o1.url));
    //    oo.DHdesPic[this.obj.D1 - 1].picB.ozon = o1;
    //    this.g04(oo)
    //},
    //g04: function (oo) {
    //    this.obj.D1++;
    //    this.g01(oo);
    //},
    //g05: function (oo) {
    //    $("#state").html("正在更新数据...");
    //    let str = '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(oo.proid, 50) + '">update @.prodes set @.DHdesPic=' + Tool.rpsql(JSON.stringify(oo.DHdesPic)) + ' where @.proid=\'' + oo.proid + '\'</r:>'
    //    Tool.ajax.a01('"ok"' + str, 1, this.g06, this, oo)
    //},
    //g06: function (t, oo) {
    //    if (t == "ok") {
    //        $("#state").html("下一步...");
    //        this.a07(oo);
    //    }
    //    else {
    //        Tool.Time("name", 1000, this.g05, this, oo)
    //        //Tool.at("更新出错03：" + t)
    //    }
    //},
}
fun.a01()
//a07: function (oo) {
//    let str = '<r: db="sqlite.ozon">update @.product set @.isUpImg=1 where @.proid=\'' + oo.proid + '\'</r:>'
//    Tool.ajax.a01('"ok"' + str, 1, this.a08, this);
//},
//a08: function (t) {
//    if (t == "ok") {
//        this.obj.A1++;
//        this.obj.B1 = 1; this.obj.B2 = 0;
//        this.obj.C1 = 1; this.obj.C2 = 0;
//        this.obj.D1 = 1; this.obj.D2 = 0;
//        $("#B1,#C1,#D1").html("0%").css("width", "0%");
//        $("#B2,#C2,#D2").html("");
//        $("#pic1,#pic2,#picB1,#picB2,#picC1,#picC2,#picD1,#picD2").html("")
//        this.a05("");
//    }
//    else {
//        Tool.pre(["出错", t])
//    }
//},