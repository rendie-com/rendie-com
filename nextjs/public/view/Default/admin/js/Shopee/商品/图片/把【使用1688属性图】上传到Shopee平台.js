'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: {},
        seller: {},
    },
    a01: function () {
        //obj.params.jsFile       选择JS文件
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 图片 &gt; 把【使用1688属性图】上传到Shopee平台") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">属性图进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">上传前属性图：</td><td id="picB1" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">上传后属性图：</td><td id="picB2" colspan="2" class="p-0"></td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.d01()
    },
    //////////////////////////////////////////////
    b01: function (src) {//上传后图片
        let str = '\
            <figure class="figure border ml-1 mb-1 mt-1 p-1">\
                <a href="https://s-cf-sg.shopeesz.com/file/' + src + '" target="_blank">\
                    <img src="https://s-cf-sg.shopeesz.com/file/' + src + '_tn" class="figure-img img-fluid rounded w100 mb-0">\
                </a>\
            </figure>'
        return str;
    },
    b02: function (fileurl) {//上传前图片
        let str = '\
            <figure class="figure border ml-1 mb-1 mt-1 p-1">\
                <a href="'+ fileurl + '" target="_blank">\
                    <img src="'+ fileurl + '" class="figure-img img-fluid rounded w100 mb-0">\
                </a>\
            </figure>'
        return str;
    },
    b03: function (attrPic_shopee, skuProps) {//图片是否都能找到
        let isBool = false;
        if (skuProps) {
             if (attrPic_shopee) {
                let _1688_attrPic = this.b04(skuProps)//取出1688属性图片           
                if (attrPic_shopee.length == _1688_attrPic.length) {
                    isBool = this.b05(attrPic_shopee, _1688_attrPic)//在1688属性图中，是否都能找到上传到shopee的图。
                }
             }            
        }
        return isBool;
    },
    b04: function (skuProps) {//取出1688属性图片
        let nArr = []
        for (let i = 0; i < skuProps.length; i++) {
            for (let j = 0; j < skuProps[i].value.length; j++) {
                if (skuProps[i].value[j].imageUrl) {
                    nArr = skuProps[i].value;
                    break;
                }
            }
            if (nArr.length != 0) { break; }
        }
        return nArr
    },
    b05: function (attrPic_shopee, _1688_attrPic) {//在1688属性图中，是否都能找到上传到shopee的图。
        let isbool = false;//是否能找到
        for (let i = 0; i < _1688_attrPic.length; i++) {
            if (_1688_attrPic[i].imageUrl) {
                isbool = this.b06(_1688_attrPic[i].imageUrl, attrPic_shopee)
                if (isbool === false) {//只要有一次没找到，就是找不到。
                    break;
                }
            }
        }
        return isbool;
    },
    //已上传的shopee图中，能不能找到1688的图片
    b06: function (url, arr) {
        let isbool = false;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j]) {
                if (url == arr[j].imageUrl) {
                    isbool = true;
                    break;
                }
            }
        }
        return isbool;
    },
    /////////////////////////////////////////
    d01: function () {
        let where = " where @.ManualReview_1688=1"//表示【使用1688属性图】
        //and @.fromid=652505949599
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("manualreview_1688_fromid") + " FROM @.product" + where + Tool.limit(1, this.obj.A1),
            list: [{
                action: "sqlite",
                database: "1688_prodes/${fromid99:manualreview_1688_fromid}",
                sql: "select " + Tool.fieldAs("sku,attrPic_shopee,attrPic") + " FROM @.prodes where @.fromid=${manualreview_1688_fromid} limit 1"
            }]
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "1688",
                sql: "select count(1) as total FROM @.product" + where,
            })
        }
        $("#state").html("正在获取商品...");
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, oo[0][0])
    },
    d03: function (oo) {
        let url = "https://detail.1688.com/offer/" + oo.manualreview_1688_fromid + ".html"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        let sku = JSON.parse(oo.list[0][0].sku)
        $("#state").html("正在检查内容...");
        if (this.b03(JSON.parse(oo.list[0][0].attrPic_shopee), sku.skuProps)) {//图片是否都能找到
            $("#state").html("可以跳过")
            this.f02([[]]);
        }
        else {
            if (sku.skuProps) {
                this.d04(sku.skuProps, oo.manualreview_1688_fromid)
            }
            else {
                $("#state").html("没有属性价格，只是单价格")
                this.f02([[]]);
            }
        }
    },
    d04: function (skuProps, manualreview_1688_fromid) {
        $("#state").html("正在找图片...");
        let imgArr = []
        for (let i = 0; i < skuProps.length; i++) {
            let isImg = false;
            for (let j = 0; j < skuProps[i].value.length; j++) {
                if (skuProps[i].value[j].imageUrl) { isImg = true; break; }
            }
            if (isImg) {
                imgArr = skuProps[i].value
            }
        }
        this.d05(imgArr, manualreview_1688_fromid)
    },
    d05: function (imgArr, fromid) {
        this.obj.B2 = imgArr.length;
        this.obj.Barr = {
            attrPic: imgArr,
            fromid: fromid
        }
        this.e01()
    },
    ////////////////////////////////////////////
    e01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e02, this, this.f01)
    },
    e02: function () {
        let fileurl = this.obj.Barr.attrPic[this.obj.B1 - 1].imageUrl;
        if (fileurl) {
            $("#picB1").append(this.b02(fileurl))
            $("#state").html("正在上传图片...");
            Tool.upPic.a01(fileurl, this.obj.seller, "my", this.e03, this);//上传图片
        }
        else {
            $("#state").html("空位置...");
            this.e07([[{list:[[]]}]]);
        }
    },
    e03: function (src) {
        $("#picB2").append(this.b01(src))
        this.obj.Barr.attrPic[this.obj.B1 - 1].shopee = src;
        this.e04(src)
    },
    e04: function (src) {
        let url = "https://s-cf-sg.shopeesz.com/file/" + src;
        $("#state").html("正在新图Base64...");
        Tool.getImgBase64.a01(url, this.e05, this, src)
    },
    e05: function (t, src) {
        if (t) {
            let oo = {
                size: Tool.getBase64ImageSize(t.base64),
                src: src,
                width: t.width,
                height: t.height
            }
            $("#state").html("正在获取【均值哈希】...");
            Tool.GetAvgHash.a01(t.base64, this.e06, this, oo)
        }
        else {
            $("#state").html("图片403错误，延时1秒再打开。");
            Tool.Time("name", 1000, this.e01, this)
        }
    },
    e06: function (t, oo) {
        let data = [{
            action: "sqlite",
            database: "shopee_img",
            sql: "select @.id from @.attrPic_1688 where @.src='" + oo.src + "' limit 1",
            elselist: [{
                action: "sqlite",
                database: "shopee_img",
                sql: "insert into @.attrPic_1688(@.fromid,@.src,@.hash,@.addtime,@.width,@.height,@.size)values(" + this.obj.Barr.fromid + ",'" + oo.src + "','" + t + "'," + Tool.gettime("") + "," + oo.width + "," + oo.height + "," + oo.size + ")"
            }]
        }]
        Tool.ajax.a01(data, this.e07, this);
    },
    e07: function (t) {
        if (t[0][0].list[0].length == 0) {
            this.obj.B1++;
            this.e01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    //////////////////////////////////////
    f01: function () {
        $("#state").html("正在更新数据...");
        let data = [{
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(this.obj.Barr.fromid, 99),
            sql: "update @.prodes set @.attrPic_shopee=" + Tool.rpsql(JSON.stringify(this.obj.Barr.attrPic)) + " where @.fromid=" + this.obj.Barr.fromid
        }]
        Tool.ajax.a01(data, this.f02, this)
    },
    f02: function (t) {
        if (t[0].length == 0) {
            $("#state").html("下一步...");
            this.obj.A1++;
            this.obj.B1 = 1; this.obj.B2 = 0; this.obj.Barr = {};
            $("#B1").html("0%").css("width", "0%");
            $("#B2").html("");
            $("#picB1,#picB2").html("")
            this.d01();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
}
fun.a01()