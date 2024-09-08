'use strict';
Object.assign(Tool, {
    setIndexPic: function (oo, proid) {
        let str = '""<r: db="sqlite.aliexpress">update @.proupdhgate set @.pic=\'' + JSON.stringify(oo) + '\' where @.proid=\'' + proid + '\'</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    setManualReview: function (id, examine) {
        let str = '""<r: db="sqlite.aliexpress">update @.proupdhgate set @.ManualReview=' + examine + ' where @.id=' + id + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    delAllDHpic: function (proid) {
        //注：@.DHpic不能用设置为null,如果设置了，会被认为，没处理过。
        var str = "update @.prodes set @.DHpic='[]' where @.proid='" + proid + "'";
        str = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
        Tool.ajax.a01(str, 1, Tool.reload);
    },
    uploadImgDHgate: {
        //功能有：
        //（1）限制图片最大度为1000px；
        //（2）限制上传图片大小5M的图片以内；
        //（3）上传的敦煌网；
        a01: function (url, next, This, t) {
            $("#state").html('正在限制图片最大度度... <a href="' + url + '" target="_blank">' + url + '</a>')
            //先修改大小（宽：1000px,高：按比例）
            Tool.setImgMaxWidth.a01(url, 1000, this.a02, this, [next, This, t])///限制图片最大度度（返回blob）
        },
        a02: function (blob, arr) {
            if (blob) {
                let url = URL.createObjectURL(blob)
                $("#state").html('限制图片最大度度后... <a href="' + url + '" target="_blank">' + url + '</a>')
                let maxSize = 1024 * 1024 * 5//5M
                if (blob.size > maxSize)//因为敦煌最大只能上传5M的图片。
                {
                    $("#state").html('修改大小,直到5M以内。');
                    Tool.compressedImage.a01(url, maxSize, this.a06, this, arr);
                }
                else {
                    $("#state").html('小于5M，可以上传，通过。');
                    this.a03(url, arr)
                }
            }
            else {
                alert("图片打不开。" + blob)
            }
        },
        a03: function (urlA, arr) {
            $("#state").html('正在上传无水印图...<a href="' + urlA + '" target="_blank">' + urlA + '</a>')
            let urlB = "https://upload.dhgate.com/uploadfile?functionname=albu&supplierid=ff8080815fbe392b01608264ffbc779e&imagebannername=&token=-hwBEsUCl5XyIYsFzQ8sOUKOd4UeTq1PU03y3-Ryx369csJKcagjax3ITeT1bBPsm15SvLgyphrdlcDEEKsw6lhfnPsOSZOSY_8yF9PgrTU"
            let data = [
                {
                    name: "target_img",
                    value: "（二进制）" + urlA,
                    fileName: urlA.split("/").pop() + ".jpg"
                }
            ]
            gg.uploadFile(urlB, null, data, this.a04, this, [urlA, arr])
        },
        a04: function (oo, arr) {
            if (oo.l_imgurl) {
                $("#state").html("上传成功。")
                URL.revokeObjectURL(arr[0]);//静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
                this.a05(oo, arr[1][0], arr[1][1], arr[1][2]);
            }
            else if (oo.status == 404) {
                //this.a04();
                alert("qqqqqqqqqqqqqqqqq")
            }
            else if (oo.status == 0) {
                Tool.pre(["xxxxxxxxxxxx", oo])
                //this.a04(6, "【把速卖通的放大镜图片上传到敦煌网】图片太小了吧")
            }
            else if (oo.status == 403) {
                Tool.pre(["dfffffffffff", oo])
            }
            else if (oo.result == 0) {
                Tool.pre(["eeeeeee", oo])
            }
            else {
                Tool.pre(["上传失败2222。。", oo]);
            }
        },
        a05: function (oo, next, This, t) {
            let o1 = {
                height: Tool.int(oo.height),
                width: Tool.int(oo.width),
                size: Tool.int(oo.l_imgsize),
                fileurl: oo.l_imgurl,
                imgmd5: oo.l_imgmd5
            }
            Tool.apply(o1, next, This, t);

        },
        a06: function (blob, arr) {
            let url = URL.createObjectURL(blob)
            $("#state").html('压缩图片后... <a href="' + url + '" target="_blank">' + url + '</a>')
            this.a03(url, arr)
        },
    },
    DHpicB1B2C1C2: {
        //上传【放大镜图片】
        obj: {
            B1: 1, B2: 0, Barr: [],
            C1: 1, C2: 0,
            isDHpic: false, upUser: ""
        },
        a01: function (DHpic, upUser, next, This, t) {
            this.obj.upUser = upUser;
            this.obj.Barr = DHpic
            if (DHpic === 0) {
                $("#state").html("到不了这里。如果到了这里，说明没有审核这个商品。");
            }
            else {
                this.obj.B2 = DHpic.length;
                this.a02([next, This, t]);
            }
        },
        a02: function (arr) {
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a03, this, this.a04, arr)
        },
        a03: function (arr) {
            let pic = this.obj.Barr[this.obj.B1 - 1];
            if (pic.picB) {
                this.obj.B1++;
                this.a02(arr);
            }
            else {
                let urlA = "https://ae04.alicdn.com/kf/" + pic.picA.fileurl;
                $("#picBA").append('<a href="' + urlA + '" target="_blank"><img src="' + urlA + '" height="100" class="border"/></a>')
                $("#state").html("开始上传图片【picB】。。。");
                this.obj.isDHpic = true;//是否要改放大镜图
                Tool.uploadImgDHgate.a01(urlA, this.a07, this, arr)
            }
        },
        a04: function (arr) {
            this.obj.C1 = 1;
            this.obj.C2 = this.obj.B2;
            this.a05(arr);
        },
        a05: function (arr) {
            Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a06, this, this.a11, arr)
        },
        a06: function (arr) {
            let pic = this.obj.Barr[this.obj.C1 - 1];
            if (pic.picC) {
                this.obj.C1++;
                this.a05(arr);
            }
            else {
                $("#state").html("开始上传图片【picC】。。。");
                this.a08(pic.picB, arr);
            }
        },
        /////////////////////////////////////////////////
        a07: function (oo, arr) {
            this.obj.Barr[this.obj.B1 - 1].picB = oo;
            let urlB = 'https://image.dhgate.com/' + oo.fileurl
            $("#picB").append('<a href="' + urlB + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.B1++;
            this.a02(arr);

        },
        /////////////////////////////////////////////////
        a08: function (picB, arr) {
            let urlA = "https://image.dhgate.com/" + picB.fileurl;
            $("#state").html('正在上传有水印图...<a href="' + urlA + '" target="_blank">' + urlA + '</a>');
            let objmsg = {
                width: picB.width,
                height: picB.height,
                rotate: 20,//旋转角度   int类型  默认20
                fontsize: 12,//字体大小   默认20
                fontcolor: "255, 255, 255, 0.3",//字体颜色  rgba类型  默认 255, 255, 255, 0.2
                density: 4,//稠密度    数值越大，水印越多
                str: ["DHgate store : " + this.obj.upUser]    //水印文字 数组类型  最大三行（即lingth<=3）[必传]
            }
            Tool.drawWaterMark.a01(urlA, objmsg, this.a09, this, arr)
        },
        a09: function (blob, arr) {
            let urlA = URL.createObjectURL(blob)
            Tool.uploadImgDHgate.a01(urlA, this.a10, this, arr)
        },
        a10: function (oo, arr) {
            this.obj.Barr[this.obj.C1 - 1].picC = oo;
            let urlC = 'https://image.dhgate.com/' + oo.fileurl
            $("#picC").append('<a href="' + urlC + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.C1++;
            this.a05(arr);
        },
        //////////////////////////////////////
        a11: function (arr) {
            let newArr = [this.obj.Barr, this.obj.isDHpic]
            this.obj = {
                B1: 1, B2: 0, Barr: [],
                C1: 1, C2: 0,
                isDHpic: false, upUser: ""
            }
            Tool.apply(newArr, arr[0], arr[1], arr[2]);
        }
    },
    DHattrPicD1D2E1E2: {
        obj: {
            D1: 1, D2: 0, Darr: [],
            E1: 1, E2: 0,
            isDHattrPic: false,//是否要改属性图
            upUser: ""
        },
        a01: function (DHattrPic, upUser, next, This, t) {
            this.obj.upUser = upUser;
            this.obj.Darr = DHattrPic;
            if (DHattrPic === 0) {
                $("#state").html("跳过该商品【DHattrPic】。。。");
            }
            else {
                this.obj.D2 = DHattrPic.length;
                this.a02([next, This, t]);
            }
        },
        a02: function (arr) {
            Tool.x1x2("D", this.obj.D1, this.obj.D2, this.a03, this, this.a06, arr)
        },
        a03: function (arr) {
            let pic = this.obj.Darr[this.obj.D1 - 1];
            if (pic) {
                if (pic.picA) {//这个是老版本的，可以删除
                    this.a04(pic, arr);
                }
                else {
                    this.obj.isDHattrPic = true;//是否要改属性图
                    this.obj.Darr[this.obj.D1 - 1] = false;//改一下，数据库会跟着修改。
                    $("#picDA,#picD").append('<span href="javascript:;" class="w100 border center"style="height: 100px;">空位置</span>')
                    this.obj.D1++;
                    this.a02(arr);
                }
            }
            else {
                $("#picDA,#picD").append('<span href="javascript:;" class="w100 border center"style="height: 100px;">空位置</span>')
                this.obj.D1++;
                this.a02(arr);
            }
        },
        a04: function (pic, arr) {
            if (pic.picB) {
                this.obj.D1++;
                this.a02(arr);
            }
            else {
                let urlA = "https://ae04.alicdn.com/kf/" + pic.picA.fileurl;
                $("#picDA").append('<a href="' + urlA + '" target="_blank"><img src="' + urlA + '" height="100" class="border"/></a>')
                //////////////////////////////////////////////
                $("#state").html("开始上传图片【picB】。。。");
                this.obj.isDHattrPic = true;//是否要改属性图
                Tool.uploadImgDHgate.a01(urlA, this.a05, this, arr)
            }
        },
        a05: function (oo, arr) {
            this.obj.Darr[this.obj.D1 - 1].picB = oo;
            let urlB = 'https://image.dhgate.com/' + oo.fileurl
            $("#picD").append('<a href="' + urlB + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.D1++;
            this.a02(arr);
        },
        a06: function (arr) {
            this.obj.E1 = 1;
            this.obj.E2 = this.obj.D2;
            this.a07(arr);
        },
        a07: function (arr) {
            Tool.x1x2("E", this.obj.E1, this.obj.E2, this.a08, this, this.a12, arr)
        },
        a08: function (arr) {
            let pic = this.obj.Darr[this.obj.E1 - 1];
            if (pic) {
                if (pic.picC) {
                    this.obj.E1++;
                    this.a07(arr);
                }
                else {
                    $("#state").html("开始上传图片【picC】。。。");
                    this.a09(pic.picB, arr);
                }

            } else {
                $("#picE").append('<span href="javascript:;" class="w100 border center"style="height: 100px;">空位置</span>')
                this.obj.E1++;
                this.a07(arr);
            }
        },
        a09: function (picB, arr) {
            let urlA = "https://image.dhgate.com/" + picB.fileurl;
            $("#state").html('正在上传有水印图...<a href="' + urlA + '" target="_blank">' + urlA + '</a>');
            let objmsg = {
                width: picB.width,
                height: picB.height,
                rotate: 20,//旋转角度   int类型  默认20
                fontsize: 12,//字体大小   默认20
                fontcolor: "255, 255, 255, 0.3",//字体颜色  rgba类型  默认 255, 255, 255, 0.2
                density: 4,//稠密度    数值越大，水印越多
                str: ["DHgate store : " + this.obj.upUser]    //水印文字 数组类型  最大三行（即lingth<=3）[必传]
            }
            Tool.drawWaterMark.a01(urlA, objmsg, this.a10, this, arr)
        },
        a10: function (blob, arr) {
            let urlA = URL.createObjectURL(blob)
            Tool.uploadImgDHgate.a01(urlA, this.a11, this, arr)
        },
        a11: function (oo, arr) {
            this.obj.Darr[this.obj.E1 - 1].picC = oo;
            let urlC = 'https://image.dhgate.com/' + oo.fileurl
            $("#picE").append('<a href="' + urlC + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.E1++;
            this.a07(arr);
        },
        /////////////////////////////
        a12: function (arr) {
            let newArr = [this.obj.Darr, this.obj.isDHattrPic]
            this.obj = {
                D1: 1, D2: 0, Darr: [],
                E1: 1, E2: 0,
                isDHattrPic: false, upUser: ""
            }
            Tool.apply(newArr, arr[0], arr[1], arr[2]);
        }
    },
    DHdesPicF1F2G1G2: {
        obj: {

            F1: 1, F2: 0, Farr: [],
            G1: 1, G2: 0,
            isDHdesPic: false, upUser: ""
        },
        a01: function (DHdesPic, upUser, next, This, t) {
            this.obj.upUser = upUser;
            this.obj.Farr = DHdesPic
            if (DHdesPic === 0) {
                $("#state").html("跳过该商品。。。");
            }
            else {
                this.obj.F2 = DHdesPic.length;
                this.a02([next, This, t]);
            }
        },
        a02: function (arr) {
            Tool.x1x2("F", this.obj.F1, this.obj.F2, this.a03, this, this.a05, arr)
        },
        a03: function (arr) {
            let pic = this.obj.Farr[this.obj.F1 - 1];
            let urlA = ""
            if (pic.picA.fileurl.indexOf("//") == -1) {
                urlA = "https://ae04.alicdn.com/kf/" + pic.picA.fileurl;
            }
            else {
                urlA = pic.picA.fileurl;
            }
            if (pic.picB) {
                this.obj.F1++;
                this.a02(arr);
            }
            else {
                $("#picFA").append('<a href="' + urlA + '" target="_blank"><img src="' + urlA + '" height="100" class="border"/></a>')
                this.obj.isDHdesPic = true;
                $("#state").html("开始上传图片【picB】。。。");
                Tool.uploadImgDHgate.a01(urlA, this.a04, this, arr)
            }
        },
        a04: function (oo, arr) {
            this.obj.Farr[this.obj.F1 - 1].picB = oo;
            let urlB = 'https://image.dhgate.com/' + oo.fileurl
            $("#picF").append('<a href="' + urlB + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.F1++;
            this.a02(arr);
        },
        ////////////////////////////////////
        a05: function (arr) {
            this.obj.G1 = 1;
            this.obj.G2 = this.obj.F2;
            this.a06(arr);
        },
        a06: function (arr) {
            Tool.x1x2("G", this.obj.G1, this.obj.G2, this.a07, this, this.a11, arr)
        },
        a07: function (arr) {
            let pic = this.obj.Farr[this.obj.G1 - 1];
            if (pic.picC) {
                this.obj.G1++;
                this.a06(arr);
            }
            else {
                $("#state").html("开始上传图片【picC】。。。");
                this.a08(pic.picB, arr)
            }
        },
        a08: function (picB, arr) {
            let urlA = "https://image.dhgate.com/" + picB.fileurl;
            $("#state").html('正在上传有水印图...<a href="' + urlA + '" target="_blank">' + urlA + '</a>');
            let objmsg = {
                width: picB.width,
                height: picB.height,
                rotate: 20,//旋转角度   int类型  默认20
                fontsize: 12,//字体大小   默认20
                fontcolor: "255, 255, 255, 0.3",//字体颜色  rgba类型  默认 255, 255, 255, 0.2
                density: 4,//稠密度    数值越大，水印越多
                str: ["DHgate store : " + this.obj.upUser]    //水印文字 数组类型  最大三行（即lingth<=3）[必传]
            }
            Tool.drawWaterMark.a01(urlA, objmsg, this.a09, this, arr)
        },
        a09: function (blob, arr) {
            let urlA = URL.createObjectURL(blob)
            Tool.uploadImgDHgate.a01(urlA, this.a10, this, arr)
        },
        a10: function (oo, arr) {
            this.obj.Farr[this.obj.G1 - 1].picC = oo;
            let urlC = 'https://image.dhgate.com/' + oo.fileurl
            $("#picG").append('<a href="' + urlC + '" target="_blank"><img src="https://image.dhgate.com/100x100/' + oo.fileurl + '" height="100" class="border"/></a>')
            this.obj.G1++;
            this.a06(arr);
        },
        //////////////////////////////////////
        a11: function (arr) {
            let newArr = [this.obj.Farr, this.obj.isDHdesPic]
            this.obj = {
                F1: 1, F2: 0, Farr: [],
                G1: 1, G2: 0,
                isDHdesPic: false, upUser: ""
            }
            Tool.apply(newArr, arr[0], arr[1], arr[2]);
        }
    }
});