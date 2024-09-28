'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 99,//数据库进度
        B1: 1, B2: 0,//页进度
        C1: 1, C2: 0, Carr: [],//放大镜图进度
        D1: 1, D2: 0, Darr: [],//属性图进度
        E1: 1, E2: 0, Earr: [],//详情图进度
        fromid: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 图片 &gt; 为图片生成hash值便于【以图搜图】") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">数据库：</td><td>'+ this.b03() + '</td><td></td></tr>\
                <tr><td class="right">数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">放大镜图进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                <tr><td class="right">属性图进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
                <tr><td class="right">详情图进度：</td>'+ Tool.htmlProgress('E') + '</tr>\
                <tr><td class="right">放大镜图：</td><td id="picC" colspan="2"></td></tr>\
                <tr><td class="right">属性图：</td><td id="picD" colspan="2"></td></tr>\
                <tr><td class="right">详情图：</td><td id="picE" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(null, null, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this, null);
    },
    a03: function () {
        let str = '{\
        "B2":'+ (this.obj.B2 == 0 ? '<@page/>' : '0') + ',\
        <r:prodes size=1 page=2 db="sqlite.1688_prodes/'+ this.obj.A1.toString().padStart(2, '0') + '" where=" where @.isHash=0">\
            "fromid":<:fromid/>,\
		    "pic":<:pic tag=0/>,\
		    "sku":<:sku tag=0/>,\
		    "des":<:des tag=json/>\
        </r:prodes>}'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo.B2; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a05, this, this.g04, oo);
    },
    a05: function (oo) {
        this.obj.fromid = oo.fromid;//保存要用
        let url = "https://detail.1688.com/offer/" + oo.fromid + ".html?sk=order"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("已得到数据...");
        this.obj.C2 = oo.pic.length;
        this.obj.Carr = oo.pic;
        if (oo.sku.skuProps) {
            this.obj.D2 = oo.sku.skuProps[0].value.length
            this.obj.Darr = oo.sku.skuProps[0].value
        }
        let arr = this.b01(oo.des);
        if (arr) {
            this.obj.E2 = arr[1].length;
            this.obj.Earr = arr[1];
        }
        this.d01()
        //this.f01();//修复用的
    },
    ////////////////////////////////////////////////////////////////////
    //取出图片
    b01: function (html) {
        let reg = /<img.*?>/ig
        // 提取出html中所有的img标签
        let arr = html.match(reg)
        if (arr == null) {
            return null;
        }
        else {
            let reg1 = /\s+src=['"](.*?)['"]/i
            let arr1 = arr.map(item => {
                if (item.match(reg1)) {//有时后img标签里面没有src属性。
                    return item.match(reg1)[1];
                }
                else { return null; }
            });
            //console.log([arr,arr1])
            //Tool.pre([arr, arr1])
            return [arr, arr1];
        }
    },
    b02: function (fileurl) {//上传前图片
        let str = '\
        <figure class="figure border ml-1 mb-1 mt-1 p-1">\
            <img src="'+ fileurl + '" class="figure-img img-fluid rounded w100 mb-0">\
        </figure>'
        return str;
    },
    b03: function () {
        let nArr = [];
        for (let i = 1; i <= this.obj.A2; i++) {
            nArr.push('<option value="' + i + '">从第' + i + '个数据库开始执行</option>');
        }
        return '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择从第几个数据库开始执行</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    /////////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.A1 = val;
        this.a02();
    },
    //////////////////////////////////////////////////////////////
    d01: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d02, this, this.e01);
    },
    d02: function () {
        let src = this.obj.Carr[this.obj.C1 - 1]
        if (src.indexOf('https://cbu01.alicdn.com/https://cbu01.alicdn.com') != -1) {//1688来源就有问题
            src = "https://cbu01.alicdn.com" + src.split("https://cbu01.alicdn.com/https://cbu01.alicdn.com")[1]
        }
        Tool.getImgBase64.a01(src, this.d03, this, src)
    },
    d03: function (t, src) {
        if (t) {
            let sql = {
                size: Tool.getBase64ImageSize(t.base64),
                src: src,
                width: t.width,
                height: t.height
            }
            $("#picC").append(this.b02(t.base64));
            Tool.GetAvgHash.a01(t.base64, this.d04, this, sql)
        }
        else {
            $("#state").html("图片403错误。");
            this.d05("ok")
        }
    },
    d04: function (t, sql) {
        let str = '\
        <if "Fun(Db(sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + ',select count(1) from @.pic where @.src=\'' + sql.src + '\',count))"=="0">\
            <r: db="sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + '">insert into @.pic(@.fromid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(' + this.obj.fromid + ',\'' + sql.src + '\',\'' + t + '\',' + Tool.gettime("") + ',' + sql.width + ',' + sql.height + ',' + sql.size + ')</r:>\
        </if>';
        Tool.ajax.a01('"ok"' + str, 1, this.d05, this);
    },
    d05: function (t) {
        if (t == "ok") {
            this.obj.C1++;
            this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    /////////////////////////////////
    e01: function () {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.e02, this, this.f01);
    },
    e02: function () {
        let src = this.obj.Darr[this.obj.D1 - 1].imageUrl
        Tool.getImgBase64.a01(src, this.e03, this, src)
    },
    e03: function (t, src) {
        if (t) {
            let sql = {
                size: Tool.getBase64ImageSize(t.base64),
                src: src,
                width: t.width,
                height: t.height
            }
            $("#picD").append(this.b02(t.base64));
            Tool.GetAvgHash.a01(t.base64, this.e04, this, sql)
        }
        else {
            $("#state").html("图片403错误。");
            this.e05("ok")
        }
    },
    e04: function (t, sql) {
        let str = '\
        <if Fun(Db(sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + ',select count(1) from @.attrPic where @.src=\'' + sql.src + '\',count))==0>\
            <r: db="sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + '">insert into @.attrPic(@.fromid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(' + this.obj.fromid + ',\'' + sql.src + '\',\'' + t + '\',' + Tool.gettime("") + ',' + sql.width + ',' + sql.height + ',' + sql.size + ')</r:>\
        </if>';
        Tool.ajax.a01('"ok"' + str, 1, this.e05, this);
    },
    e05: function (t) {
        if (t == "ok") {
            this.obj.D1++;
            this.e01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    ////////////////////////////////////////////////////
    f01: function () {
        Tool.x1x2("E", this.obj.E1, this.obj.E2, this.f02, this, this.g01);
    },
    f02: function () {
        let src = this.obj.Earr[this.obj.E1 - 1]
        Tool.getImgBase64.a01(src, this.f03, this, src)
    },
    f03: function (t, src) {
        if (t) {
            if (t.width < 600 || t.height < 600) {
                $("#state").html("不要小图片");
                this.f05("ok")
            }
            else {
                let sql = {
                    size: Tool.getBase64ImageSize(t.base64),
                    src: src,
                    width: t.width,
                    height: t.height
                }
                $("#picE").append(this.b02(t.base64));
                Tool.GetAvgHash.a01(t.base64, this.f04, this, sql)
            }
        }
        else {
            $("#state").html("图片403错误。");
            this.f05("ok")
        }
    },
    f04: function (t, sql) {
        let str = '\
        <if Fun(Db(sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + ',select count(1) from @.desPic where @.src=\'' + sql.src + '\',count))==0>\
            <r: db="sqlite.1688_img/'+ this.obj.A1.toString().padStart(2, '0') + '">insert into @.desPic(@.fromid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(' + this.obj.fromid + ',\'' + sql.src + '\',\'' + t + '\',' + Tool.gettime("") + ',' + sql.width + ',' + sql.height + ',' + sql.size + ')</r:>\
        </if>';
        Tool.ajax.a01('"ok"' + str, 1, this.f05, this);
    },
    f05: function (t) {
        if (t == "ok") {
            this.obj.E1++;
            this.f01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    //////////////////////////////////////////////////////////////////////
    g01: function () {
        let str = '<r: db="sqlite.1688_prodes/' + this.obj.A1.toString().padStart(2, '0') + '">update @.prodes set @.isHash=1 where @.fromid=' + this.obj.fromid + '</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.g02, this);
    },
    g02: function (t) {
        if (t == "ok") {
            this.g03();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    g03: function () {
        this.obj.C1 = 1; this.obj.C2 = 0; this.obj.Carr = [];
        this.obj.D1 = 1; this.obj.D2 = 0; this.obj.Darr = [];
        this.obj.E1 = 1; this.obj.E2 = 0; this.obj.Earr = [];
        $("#C1,#D1,#E1").css("width", "0%"); $("#C1,#C2,#D1,#E1,#D2,#picC,#picD,#picE").html("");
        this.obj.fromid = 0
        this.obj.B1++;
        this.a03();
    },
    g04: function () {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        if (confirm("确定要进入下一个数据库吗？\n\n按\"确定\"继续，或按\"取消\"留在当前页面。")) {
            this.obj.A1++;
            this.a02()
        }
    },
}
fun.a01();