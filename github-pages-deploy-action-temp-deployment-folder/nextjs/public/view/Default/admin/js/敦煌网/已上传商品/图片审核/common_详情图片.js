'use strict';
Object.assign(Tool, {
    prodes_DHes: {
        obj: {
            DHdes: "",//删除时要用
            DHdesPic: ""//删除时要用
        },
        a01: function (des, DHdes, DHdesPic, proid) {
            this.obj.DHdes = DHdes;
            this.obj.DHdesPic = DHdesPic;
            let str = '\
            <td colspan="4" class="p-0">\
                <ul class="makeHtmlTab" id="DHdesPicTab">\
                    <li val="1000">1.【des】详情图片</li>\
                    <li val="0100" class="hover">2.【DHdesPic.picA】来源图片</li>\
                    <li val="0010">3.【DHdesPic.picB】无水印图片</li>\
                    <li val="0001">4.【DHdesPic.picC】有水印图片</li>\
                </ul>\
                <div name="1000_DHdesPic" class="hide">'+ this.b01(des) + '</div>\
                <div name="0100_DHdesPic" class="">'+ this.b04(DHdesPic, "picA", proid) + '</div>\
                <div name="0010_DHdesPic" class="hide">'+ this.b04(DHdesPic, "picB", proid) + '</div>\
                <div name="0001_DHdesPic" class="hide">'+ this.b04(DHdesPic, "picC", proid) + '</div>\
            </td>';
            return str;
        },
        b01: function (des) {
            let arr = this.b02(des), str = "";
            if (arr == null) {
                str = '<figure class="figure border mb-1 mt-1 p-1">没有详情图片</figure>'
            }
            else {
                for (let i = 0; i < arr[1].length; i++) {
                    str += '\
                <figure class="figure border mb-1 mt-1 p-1">\
				    <a href="https://ae02.alicdn.com/kf/'+ arr[1][i] + '" target="_blank"><img src="https://ae02.alicdn.com/kf/' + arr[1][i] + '_300x300.jpg" class="figure-img img-fluid rounded w260"></a>\
                    <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
			    </figure>';
                }
            }

            return str;
        },
        //取出图片
        b02: function (html) {
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
                            pic = this.b03(pic);
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
        b03: function (pic) {
            if (pic.indexOf(".jpg") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".jpg").split("/")[0] + ".jpg"
            }
            else if (pic.indexOf(".png") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".png").split("/")[0] + ".png";
            }
            else if (pic.indexOf(".gif") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".gif").split("/")[0] + ".gif";
            }
            else if (pic.indexOf(".jpeg") != -1) {
                pic = Tool.StrSlice(pic, ".com/kf/", ".jpeg").split("/")[0] + ".jpeg";
            }
            else {
                Tool.pre(["是什么扩展？", pic])
                aaaaaaaaaaaaaaaa
            }
            return pic;
        },
        b04: function (arr, picABC, proid) {
            var str = "";
            if (arr) {
                if (arr.length == 0) {
                    str += '<figure class="figure border mb-1 mt-1 p-1 w260 center">没有详情图片</figure>'
                }
                else {
                    for (let i = 0; i < arr.length; i++) {
                        if (picABC == "picA") {
                            str += this.b05(arr[i], picABC, i, proid)
                        }
                        else if (picABC == "picB" || picABC == "picC") {
                            if (arr[i][picABC]) {
                                str += this.b06(arr[i][picABC].fileurl, i)
                            }
                            else {
                                str += ' <figure class="figure border mb-1 mt-1 p-1 w260 center">' + (i + 1) + '.还没上传图片到敦煌网</figure>'
                            }
                        }
                    }
                }
            }
            else {
                if (picABC == "picA") {
                    str = '<figure class="figure border mb-1 mt-1 p-1">没有详情图片，请先“<b>归类【劣质图片】</b>”，然后再来审核！</figure>'
                }
                else {
                    str = '<figure class="figure border mb-1 mt-1 p-1">没有详情图片，审核通过后，上传到敦煌网，就可以看在到。</figure>'
                }
            }
            return str
        },
        b05: function (arri, picABC, i, proid) {
            let fileurlA = "", fileurlB = "", str = ""
            if (arri[picABC]) {
                if (arri[picABC].fileurl.indexOf("//") == -1) {
                    fileurlA = "https://ae02.alicdn.com/kf/" + arri[picABC].fileurl
                    fileurlB = "https://ae02.alicdn.com/kf/" + arri[picABC].fileurl + "_200x200.jpg"
                }
                else {
                    fileurlA = arri[picABC].fileurl
                    fileurlB = arri[picABC].fileurl
                }
                let str1 = '\
                <a href="javascript:;" onclick=\'Tool.setIndexPic(' + JSON.stringify(arri) + ',"' + proid + '")\' title="设置为【首图】">\
                    设置为【首图】\
                </a>\
                | \
                <a href="javascript:;" onclick=\'Tool.prodes_DHes.c01($(this),' + JSON.stringify(arri) + ',"' + proid + '")\' title="删除【DHdesPic】图片时字段【DHdes】内的图片也会跟着删除">\
                    删除\
                </a>';
                str = '\
			    <figure class="figure border mb-1 mt-1 p-1">\
				    <a href="' + fileurlA + '" target="_blank">\
                        <img src="' + fileurlB + '" class="figure-img img-fluid rounded w260">\
                    </a>\
				    <figcaption class="figure-caption text-center">\
                        '+ (i + 1) + '.' + str1 + '\
                    </figcaption>\
			    </figure>'
            }
            return str;
        },
        b06: function (fileurl, i) {
            let str = '\
            <figure class="figure border mb-1 mt-1 p-1">\
                <a href="https://image.dhgate.com/'+ fileurl + '" target="_blank">\
                <img src="https://image.dhgate.com/webp/m/170x170/' + fileurl + '" class="figure-img img-fluid rounded w260">\
            </a>\
            <figcaption class="figure-caption text-center">'+ (i + 1) + '</figcaption>\
            </figure>'
            return str;
        },
        c01: function (This, objPic, proid) {
            This = This.parent();
            This.html("正在删除。。。")
            let isDel = false;
            let desArr = this.b02(this.obj.DHdes)
            for (let i = 0; i < desArr[1].length; i++) {
                let isBool = false;
                if (objPic.picC) {//picC可以没有
                    isBool = desArr[0][i].indexOf(objPic.picC.fileurl) != -1//找到就能进来
                }
                if (desArr[0][i].indexOf(objPic.picA.fileurl) != -1 || isBool) {
                    isDel = true;
                    this.obj.DHdes = this.obj.DHdes.replace(desArr[0][i], "");//注：这里修改了
                    break;
                }
            }
            if (isDel) {
                this.c02(This, objPic, proid);
            }
            else {
                This.html("删除失败，请检查原因。")
            }
        },
        c02: function (This, objPic, proid) {
            let DHdesPic = this.obj.DHdesPic;
            let nArr = [];
            for (let i = 0; i < DHdesPic.length; i++) {
                let isBool = false;
                if (objPic.picC) {//picC可以没有
                    isBool = objPic.picC.fileurl != DHdesPic[i].picC.fileurl//不相同的picC,就能进来
                }
                if (objPic.picA.fileurl != DHdesPic[i].picA.fileurl || isBool) {
                    nArr.push(DHdesPic[i]);
                }
            }
            this.obj.DHdesPic = nArr
            this.c03(This, proid)
        },
        c03: function (This, proid) {
            let str = "update @.prodes set @.DHdes=" + Tool.rpsql(this.obj.DHdes) + ",@.DHdesPic=" + Tool.rpsql(JSON.stringify(this.obj.DHdesPic)) + " where @.proid='" + proid + "'";
            let html = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
            Tool.ajax.a01(html, 1, this.c04, this, This);
        },
        c04: function (t, This) {
            if (t == "") {
                This.parent().remove();
            }
            else {
                Tool.pre(t)
            }
        },
    }
});

