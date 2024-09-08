'use strict';
Object.assign(Tool, {
    prodes_DHpic: {
        obj: {
            DHpic: []//删除时要用
        },
        a01: function (pic, DHpic, proid) {
            this.obj.DHpic = DHpic;//删除时要用
            let str = '\
            <td colspan="4" class="p-0">\
                <ul class="makeHtmlTab" id="DHpicTab">\
                    <li val="1000"> 1.放大镜图片</li>\
                    <li val="0100" class="hover">2.放大镜【DHpic.picA】来源图片</li>\
                    <li val="0010">3.放大镜【DHpic.picB】无水印图片</li>\
                    <li val="0001">4.放大镜【DHpic.picC】有水印图片</li>\
                </ul>\
                <div name="1000_DHpic" class="hide">'+ this.b01(pic) + '</div>\
                <div name="0100_DHpic">'+ this.b02(DHpic, "picA", proid) + '</div>\
                <div name="0010_DHpic" class="hide">'+ this.b02(DHpic, "picB") + '</div>\
                <div name="0001_DHpic" class="hide">'+ this.b02(DHpic, "picC") + '</div>\
            </td>'
            return str;
        },
        b01: function (pic) {
            let arr = pic.split(";"), str = "";
            for (let i = 0; i < arr.length; i++) {
                str += '\
                <figure class="figure border mb-1 mt-1 p-1">\
				    <a href="'+ arr[i] + '" target="_blank"><img src="' + arr[i] + '_200x200.jpg" class="figure-img img-fluid rounded w200"></a>\
                    <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
			    </figure>';
            }
            return str;
        },
        b02: function (arr, picABC, proid) {
            var str = "";
            if (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        if (picABC == "picA") {
                            str += this.b03(arr[i], i, proid);
                        }
                        else if (picABC == "picB" || picABC == "picC") {
                            if (arr[i][picABC]) {
                                str += this.b04(arr[i][picABC].fileurl, i);
                            }
                            else {
                                str += ' <figure class="figure border mb-1 mt-1 p-1 w200 center">' + (i + 1) + '.未上传图片</figure>';
                            }
                        }
                    }
                    else {
                        str += ' <figure class="figure border mb-1 mt-1 p-1 w200 center">' + (i + 1) + '.空位置图片</figure>';
                    }
                }
                if (picABC == "picA") {
                    str += '<button onclick="Tool.delAllDHpic(\'' + proid + '\')" type="button" class="btn btn-secondary p-1" style="position: relative;top: -5px;left: 5px;">删除放大镜图片【DHpic】</button>';
                }
            }
            else {
                if (picABC == "picA") {
                    str = '<figure class="figure border mb-1 p-1 mt-1 w200 center">没有放大镜图片</figure>';
                }
                else {
                    str = '<figure class="figure border mb-1 mt-1 p-1">没有放大镜图片，审核通过后，上传到敦煌网，就可以看在到。</figure>'
                }
            }
            return str;
        },
        b03: function (oo, i, proid) {
            let str = '\
            <figure class="figure border mb-1 mt-1 p-1">\
                <a href="https://ae02.alicdn.com/kf/' + oo.picA.fileurl + '" target="_blank">\
                    <img src="https://ae02.alicdn.com/kf/' + oo.picA.fileurl + '_200x200.jpg" class="figure-img img-fluid rounded w200">\
                </a>\
                <figcaption class="figure-caption text-center">'+ (i + 1) + '.\
                    <a href="javascript:;" onclick=\'Tool.setIndexPic(' + JSON.stringify(oo) + ',"' + proid + '")\' title="设置为【首图】">设置为【首图】</a>\
                    | \
                <a href="javascript:;" onclick="Tool.prodes_DHpic.c01($(this),\'' + oo.picA.fileurl + '\',\'' + proid + '\')">删除</a>\
                </figcaption>\
            </figure>'
            return str;
        },
        b04: function (fileurl, i) {
            let str = '\
            <figure class="figure border mb-1 mt-1 p-1">\
                <a href="https://image.dhgate.com/' + fileurl + '" target="_blank">\
                    <img src="https://image.dhgate.com/webp/m/170x170/' + fileurl + '" class="figure-img img-fluid rounded w200">\
                </a>\
                <figcaption class="figure-caption text-center">'+ (i + 1) + '</figcaption>\
            </figure>'
            return str;
        },
        c01: function (This, src, proid) {
            This = This.parent();
            This.html("正在删除。。。");
            let arr = this.obj.DHpic, newDHpic = []
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].picA.fileurl != src) {
                    newDHpic.push(arr[i]);
                }
            }
            this.obj.DHpic = newDHpic;
            this.c02(This, proid)
        },
        c02: function (This, proid) {
            let str = "update @.prodes set @.DHpic=" + Tool.rpsql(JSON.stringify(this.obj.DHpic)) + " where @.proid='" + proid + "'";
            let html = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
            Tool.ajax.a01(html, 1, this.c03, this, This);
        },
        c03: function (t, This) {
            if (t == "") {
                This.parent().remove();
            }
            else {
                Tool.pre(t)
            }
        }
    }
});
