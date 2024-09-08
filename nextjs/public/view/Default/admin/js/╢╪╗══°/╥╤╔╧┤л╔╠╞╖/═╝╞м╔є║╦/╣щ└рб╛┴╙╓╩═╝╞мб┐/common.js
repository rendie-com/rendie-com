'use strict';
Object.assign(Tool, {
    showPic: function (arr) {
        var str = "", fileurlA = "", fileurlB = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                if (arr[i].picC) {
                    fileurlA = 'https://image.dhgate.com/' + arr[i].picC.fileurl
                    fileurlB = 'https://image.dhgate.com/webp/m/100x100/' + arr[i].picC.fileurl
                    str += '\
                    <figure class="figure border mb-0 mt-1 p-1 w100">\
                        <a href="'+ fileurlA + '" target="_blank"><img src="' + fileurlB + '" class="figure-img img-fluid rounded w100"></a>\
                        <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
                    </figure>'
                }
                else {
                    if (arr[i].picA) {//有的图片就是个空值
                        if (arr[i].picA.fileurl.indexOf("//") != -1) {//有http的就显示http的图片                        
                            fileurlA = arr[i].picA.fileurl;
                            fileurlB = arr[i].picA.fileurl;
                        }
                        else {
                            //没有，就用这个。
                            fileurlA = 'https://ae01.alicdn.com/kf/' + arr[i].picA.fileurl;
                            fileurlB = 'https://ae01.alicdn.com/kf/' + arr[i].picA.fileurl + '_200x200.jpg';
                        }
                        str += '\
                        <figure class="figure border mb-0 mt-1 p-1 w100">\
                            <a href="'+ fileurlA + '" target="_blank"><img src="' + fileurlB + '" class="figure-img img-fluid rounded w100"></a>\
                            <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
                        </figure>'
                    }
                    else {
                        str += ' <figure class="figure border mb-1 mt-1 p-1 w100 center">' + (i + 1) + '.空位置图片</figure>';
                    }
                }

            } else {
                str += ' <figure class="figure border mb-1 mt-1 p-1 w100 center">' + (i + 1) + '.空位置图片</figure>';
            }
        }
        return str;
    },
    getImgWH: function (src, next, This, t) {
        let img = new Image();
        img.src = src;
        img.setAttribute("crossOrigin", 'Anonymous');
        img.onload = function () {
            next.apply(This, [img.width, img.height, t]);
        }
        img.onerror = function (msg, url, l) {   
            
            //Tool.log(msg);
            $("#state").html("图片打不开...");
            next.apply(This, [0, 0, t]);
        }
    },
    prodes_DHpic: {
        obj: {
            C1: 1, C2: 0, Carr: []
        },
        proid: "",
        next: null, This: null, t: null,
        a01: function (pic, proid, next, This, t) {
            let arr = pic.split(";");
            this.obj.C2 = arr.length;
            this.obj.Carr = arr;
            //////////////////////////////////////
            this.proid = proid;
            this.next = next;
            this.This = This;
            this.t = t;
            this.a02();
        },
        a02: function () {
            Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a03, this, this.a07)
        },
        a03: function () {
            let pic = this.obj.Carr[this.obj.C1 - 1];
            let urlA = "https://ae04.alicdn.com/kf/" + Tool.StrSlice(pic, "alicdn.com/kf/", "/") + pic.substr(pic.lastIndexOf("."));
            //注：放大镱图不可能有速卖通以外的网址，做为图片。
            Tool.getImgWH(urlA, this.a04, this, urlA);
        },
        a04: function (width, height, url) {
            if (width == 0) {
                this.obj.Carr[this.obj.C1 - 1] = false;
                this.a06();
            }
            else {
                this.a05(width, height, url)
            }
        },
        a05: function (width, height, url) {
            this.obj.Carr[this.obj.C1 - 1] = {
                fileurl: url.substr(url.lastIndexOf("/") + 1),
                width: width,
                height: height
            }
            this.a06();
        },
        a06: function () {
            this.obj.C1++;
            this.a02();
        },
        a07: function () {
            $("#state").html("【picA】不要高度小于300px的图片...")
            let Carr = this.obj.Carr, DHpic = [];
            for (let i = 0; i < Carr.length; i++) {
                if (Carr[i].height >= 300) {
                    DHpic.push({ picA: Carr[i] })
                }
            }
            $("#DHpic").html(Tool.showPic(DHpic))
            this.a08(DHpic, this.proid);
        },
        a08: function (DHpic, proid) {
            this.t.prodes.DHpic = DHpic;//注：是因为知道，t是什么才这么写的。
            let str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes SET @.DHpic=' + Tool.rpsql(JSON.stringify(DHpic)) + ' where @.proid=\'' + proid + '\'</r:>';
            Tool.ajax.a01(str, 1, this.a09, this);
        },
        a09: function (t) {
            if (t == "") {
                this.obj.C1 = 1;
                this.obj.C2 = 0;
                this.obj.Carr = [];
                this.proid = "";
                let next = this.next, This = this.This, t = this.t;
                this.next = null;
                this.This = null;
                this.t = null;
                next.apply(This, [t]);
            }
            else {
                Tool.pre(["出错：", t])
            }
        },
    },
    prodes_DHattrPic: {
        obj: {
            C1: 1, C2: 0, Carr: []
        },
        proid: "",
        next: null, This: null, t: null,
        a01: function (aeopAeProductSKUs, proid, next, This, t) {
            let arr = this.b01(aeopAeProductSKUs);
            this.obj.C2 = arr.length;
            this.obj.Carr = arr;
            //////////////////////////////////////
            this.proid = proid;
            this.next = next;
            this.This = This;
            this.t = t;
            this.a02();
        },
        a02: function () {
            Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a03, this, this.a07)
        },
        a03: function () {
            let pic = this.obj.Carr[this.obj.C1 - 1];
            if (pic == "") {//属性图，不一定要全放图片
                this.obj.Carr[this.obj.C1 - 1] = false;
                this.a06();
            }
            else {
                //也不可能出现，速卖通站外的图片。
                let urlA = "https://ae04.alicdn.com/kf/" + pic;
                Tool.getImgWH(urlA, this.a04, this, urlA);
            }

        },
        a04: function (width, height, url) {
            if (width == 0) {
                this.obj.Carr[this.obj.C1 - 1] = false;
                this.a06();
            }
            else {
                this.a05(width, height, url)
            }
        },
        a05: function (width, height, url) {
            this.obj.Carr[this.obj.C1 - 1] = {
                fileurl: url.substr(url.lastIndexOf("/") + 1),
                width: width,
                height: height
            }
            this.a06();
        },
        a06: function () {
            this.obj.C1++;
            this.a02();
        },
        a07: function () {
            $("#state").html("做成【picA】，注：属性国不能去判断高度小于300px的图片，因为位置要留着...")
            let Carr = this.obj.Carr, DHattrPic = [];
            for (let i = 0; i < Carr.length; i++) {
                DHattrPic.push({ picA: Carr[i] })
            }
            $("#DHattrPic").html(Tool.showPic(DHattrPic))
            this.a08(DHattrPic, this.proid);
        },
        a08: function (DHattrPic, proid) {
            this.t.prodes.DHattrPic = DHattrPic;//注：是因为知道，t是什么才这么写的。
            let str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes SET @.DHattrPic=' + Tool.rpsql(JSON.stringify(DHattrPic)) + ' where @.proid=\'' + proid + '\'</r:>';
            Tool.ajax.a01(str, 1, this.a09, this);
        },
        a09: function (t) {
            if (t == "") {
                this.obj.C1 = 1;
                this.obj.C2 = 0;
                this.obj.Carr = [];
                this.proid = "";
                let next = this.next, This = this.This, t = this.t;
                this.next = null;
                this.This = null;
                this.t = null;
                next.apply(This, [t]);
            }
            else {
                Tool.pre(["出错：", t])
            }
        },
        b01: function (aeopAeProductSKUs) {
            let arr = [];
            for (let k in aeopAeProductSKUs) {
                arr = aeopAeProductSKUs[k][0];
                break;
            }
            return this.b02(arr)
        },
        b02: function (arr) {
            let picArr = [], isboolArr = [];
            if (arr) {
                for (let i = 0; i < arr.length; i++) {//属性名
                    let arr2 = arr[i].skuPropertyValues;
                    for (let j = 0; j < arr2.length; j++) {//属性值
                        //怎么知道是图片那一组？答：只要当前组有一个图片，那就是图片组。
                        //（注1：购物车属性，只能出现一个组片。比如：颜色有图片，尺寸有图片，那是不行的，我这只会出来第一组图片）
                        //为什么不判断第一个是不为图片？答：因为图片给中可以不放图片，也可以放一个图片，并不需要全放图片。
                        let url40 = "";
                        let pic = arr2[j].skuPropertyImagePath
                        if (pic) {
                            isboolArr.push(true);
                            url40 = Tool.StrSlice(pic, "alicdn.com/kf/", "/") + pic.substr(pic.lastIndexOf("."));
                        }
                        picArr.push(url40)
                    }
                    if (isboolArr.length > 0) {
                        break;
                    }
                    else {
                        picArr = [];
                    }
                }
            }
            return picArr
        }
    },
    prodes_DHdesPic: {
        obj: {
            C1: 1, C2: 0, Carr: [], C2arr: []
        },
        proid: "", des: "",
        next: null, This: null, t: null,
        a01: function (des, proid, next, This, t) {
            let arr = this.b01(des);
            if (arr) {//没有图片，就是null
                this.obj.C2 = arr[1].length;
                this.obj.Carr = arr[1];
                this.obj.C2arr = arr[0];
            } else {
                this.obj.C2 = 0;
                this.obj.Carr = [];
                this.obj.C2arr = [];
            }
            //////////////////////////////////////
            this.proid = proid;
            this.des = des;
            this.next = next;
            this.This = This;
            this.t = t;
            this.a02();

        },
        a02: function () {
            Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a03, this, this.a07)
        },
        a03: function () {
            let pic = this.obj.Carr[this.obj.C1 - 1], urlA;
            if (pic == ""||!pic) {//有的详情图片src里面，就是个空的
                this.obj.Carr[this.obj.C1 - 1] = false;
                this.a06();
            }
            else if (pic.indexOf("//") == -1) {
                //说明：详情可以放第三方图片。
                urlA = "https://ae04.alicdn.com/kf/" + pic;
                Tool.getImgWH(urlA, this.a04, this, urlA);
            }
            else {
                Tool.getImgWH(pic, this.a04, this, pic);
            }
        },
        a04: function (width, height, url) {
           if (width == 0) {//图片打不开，就会等于0。
                this.obj.Carr[this.obj.C1 - 1] = false;
                this.a06();
            }
            else {
                this.a05(width, height, url)
            }
        },
        a05: function (width, height, url) {
            let fileurl;
            if (url.indexOf("alicdn.com/kf/") != -1) {//有速卖通的图片就截断
                fileurl = url.substr(url.lastIndexOf("/") + 1);
            }
            else {
                fileurl = url;
            }
            this.obj.Carr[this.obj.C1 - 1] = {
                fileurl: fileurl,
                width: width,
                height: height
            }
            this.a06();
        },
        a06: function () {
            this.obj.C1++;
            this.a02();
        },
        a07: function () {
            $("#state").html("【picA】不要高度小于300px的图片...")
            let Carr = this.obj.Carr, C2arr = this.obj.C2arr, des = this.des, DHdesPic = [];
            for (let i = 0; i < Carr.length; i++) {
                if (Carr[i].height < 300) {
                    des = des.replace(C2arr[i], "");
                }
                else {
                    if (Carr[i]) {//图片打不开，就是false
                        DHdesPic.push({ picA: Carr[i] })
                        if (Carr[i].fileurl.indexOf("//") == -1) {//
                            des = des.replace(C2arr[i], '<img src="https://ae04.alicdn.com/kf/' + Carr[i].fileurl + '" width="800"/>');//注：下载到敦煌后，还要替换成敦煌的图片。
                        }
                        else {
                            des = des.replace(C2arr[i], '<img src="' + Carr[i].fileurl + '" width="800"/>');//注：下载到敦煌后，还要替换成敦煌的图片。
                        }                        
                    }
                    else {
                        des = des.replace(C2arr[i], "");
                    }
                }
            }
            $("#DHdesPic").html(Tool.showPic(DHdesPic))
            this.a08(DHdesPic, des, this.proid);
        },
        a08: function (DHdesPic, des, proid) {
            des = Tool.removeHTMLCode(des, "SCRIPT");
            this.t.prodes.DHdesPic = DHdesPic;//注：是因为知道，t是什么才这么写的。
            let str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">update @.prodes SET @.DHdesPic=' + Tool.rpsql(JSON.stringify(DHdesPic)) + ',@.DHdes=' + Tool.rpsql(des) + ' where @.proid=\'' + proid + '\'</r:>';
            Tool.ajax.a01(str, 1, this.a09, this);
        },
        a09: function (t) {
            if (t == "") {
                this.obj.C1 = 1;
                this.obj.C2 = 0;
                this.obj.Carr = [];
                this.obj.C2arr = [];
                this.proid = "";
                this.des = "";
                let next = this.next, This = this.This, t = this.t;
                this.next = null;
                this.This = null;
                this.t = null;
                next.apply(This, [t]);
            }
            else {
                Tool.pre(["出错：", t])
            }
        },
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
                        let pic = item.match(reg1)[1];
                        if (pic.indexOf("alicdn.com/kf/") != -1) {
                            pic = this.b02(pic);
                        }
                        return pic;
                    }
                    else { return null; }
                });
                //console.log([arr,arr1])
                //Tool.pre([arr, arr1])
                return [arr, arr1];
            }
        },
        b02: function (pic) {
            if (pic.indexOf(".jpg") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".jpg").split("/")[0] + ".jpg"
            }
            else if (pic.indexOf(".JPG") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".png").split("/")[0] + ".JPG";
            }
            else if (pic.indexOf(".png") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".png").split("/")[0] + ".png";
            }
            else if (pic.indexOf(".PNG") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".png").split("/")[0] + ".PNG";
            }
            else if (pic.indexOf(".gif") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".gif").split("/")[0] + ".gif";
            }
            else if (pic.indexOf(".gif") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".GIF").split("/")[0] + ".GIF";
            }
            else if (pic.indexOf(".jpeg") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".jpeg").split("/")[0] + ".jpeg";
            }
            else if (pic.indexOf(".JPEG") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".jpeg").split("/")[0] + ".JPEG";
            }
            else {
                Tool.pre(["是什么扩展？", pic])
                aaaaaaaaaaaaaaaa
            }
            return pic;
        },
    }
});