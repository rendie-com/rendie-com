'use strict';
Object.assign(Tool, {
    prodes_DHattrPic: {
        obj: { DHattrPic: [] },
        a01: function (aeopAeProductSKUs, DHattrPic, proid) {
            this.obj.DHattrPic = DHattrPic;//删除时要用
            let str = '\
            <td colspan="4" class="p-0">\
                <ul class="makeHtmlTab" id="DHattrPicTab">\
                    <li val="1000">1.【aeopAeProductSKUs】购物车图片</li>\
                    <li val="0100" class="hover">2.【DHattrPic.picA】来源图片</li>\
                    <li val="0010">3.【DHattrPic.picB】无水印图片</li>\
                    <li val="0001">4.【DHattrPic.picC】有水印图片</li>\
                </ul>\
                <div name="1000_DHattrPic" class="hide">'+ this.b01(aeopAeProductSKUs) + '</div>\
                <div name="0100_DHattrPic" class="">'+ this.b04(DHattrPic, "picA", proid) + '</div>\
                <div name="0010_DHattrPic" class="hide">'+ this.b04(DHattrPic, "picB", proid) + '</div>\
                <div name="0001_DHattrPic" class="hide">'+ this.b04(DHattrPic, "picC", proid) + '</div>\
            </td>'
            return str;
        },
        b01: function (aeopAeProductSKUs) {
            let arr = [];
            for (let k in aeopAeProductSKUs) {
                arr = aeopAeProductSKUs[k][0];
                break;
            }
            if (arr == null) {//单价格就是null
                arr = []
            }
            return this.b02(arr)
        },
        b02: function (arr) {
            let picArr = [], isboolArr = [];
            for (let i = 0; i < arr.length; i++) {
                let arr2 = arr[i].skuPropertyValues;
                picArr = [];
                for (let j = 0; j < arr2.length; j++) {
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
            }
            return this.b03(picArr)
        },
        b03: function (arr) {
            var str = "";
            if (arr.length != 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        str += '\
                    <figure class="figure border mb-1 mt-1 p-1">\
                        <a href="https://ae02.alicdn.com/kf/'+ arr[i] + '" target="_blank">\
                            <img src="https://ae02.alicdn.com/kf/'+ arr[i] + '_200x200.jpg" class="figure-img img-fluid rounded w170">\
                        </a>\
                        <figcaption class="figure-caption text-center">' + (i + 1) + '</figcaption>\
                    </figure>'
                    }
                    else {
                        str += ' <figure class="figure border mb-1 mt-1 p-1">' + (i + 1) + '.空位置图片</figure>'
                    }
                }
            }
            else {
                str = '<figure class="figure border mb-1 mt-1 p-1">没有属性图片</figure>'
            }
            return str 
        },
        b04: function (arr, picABC, proid) {
            var str = "";
            if (arr.length!=0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        if (picABC == "picA") {
                            str += this.b05(arr[i], picABC, i, proid)
                        }
                        else if (picABC == "picB" || picABC == "picC") {
                            if (arr[i][picABC]) {
                                str += this.b06(arr[i][picABC].fileurl, i)
                            }
                            else {
                                str += ' <figure class="figure border mb-1 mt-1 p-1">' + (i + 1) + '.未上传图片</figure>'
                            }
                        }
                    }
                    else {
                        str += ' <figure class="figure border mb-1 mt-1 p-1">' + (i + 1) + '.空位置图片</figure>'
                    }
                }
            }
            else {
                if (picABC == "picA") {
                    str = '<figure class="figure border mb-1 mt-1 p-1">没有属性图片</figure>'
                }
                else {
                    str = '<figure class="figure border mb-1 mt-1 p-1">没有属性图片，审核通过后，上传到敦煌网，就可以看在到。</figure>'
                }
            }
            return str
        },
        b05: function (arri, picABC, i, proid) {
            let str1 = '\
            <a href="javascript:;" onclick=\'Tool.setIndexPic(' + JSON.stringify(arri) + ',"' + proid + '")\' title="设置为【首图】">设置为【首图】</a>\
            | \
            <a href="javascript:;" onclick="Tool.prodes_DHattrPic.c01($(this),\'' + arri[picABC].fileurl + '\',\'' + proid + '\')">删除</a>'
            let str = '\
			<figure class="figure border mb-1 mt-1 p-1">\
				<a href="https://ae02.alicdn.com/kf/'+ arri[picABC].fileurl + '" target="_blank">\
                    <img src="https://ae02.alicdn.com/kf/' + arri[picABC].fileurl + '_200x200.jpg" class="figure-img img-fluid rounded w170">\
                </a>\
				<figcaption class="figure-caption text-center">\
                    '+ (i + 1) + '.' + str1 + '\
                </figcaption>\
			</figure>'
            return str;
        },
        b06: function (fileurl, i) {
            let str = '\
			<figure class="figure border mb-1 mt-1 p-1">\
				<a href="https://image.dhgate.com/'+ fileurl + '" target="_blank">\
                    <img src="https://image.dhgate.com/webp/m/170x170/' + fileurl + '" class="figure-img img-fluid rounded w170">\
                </a>\
				<figcaption class="figure-caption text-center">'+ (i + 1) + '</figcaption>\
			</figure>'
            return str;
        },
        c01: function (This, src, proid) {
            This = This.parent();
            This.html("正在删除。。。");
            let arr = this.obj.DHattrPic
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {//空位置时，值为：false
                    if (arr[i].picA.fileurl == src) {
                        arr[i] = false;//说明：this.obj.DHattrPic也会被改动
                    }
                }                
            }
            this.c02(This, proid)
        },
        c02: function (This, proid) {
            let str = "update @.prodes set @.DHattrPic=" + Tool.rpsql(JSON.stringify(this.obj.DHattrPic)) + " where @.proid='" + proid + "'";
            let html = '""<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '">' + str + '</r:>'
            Tool.ajax.a01(html, 1, this.c03, this, This);
        },
        c03: function (t, This) {
            if (t == "") {
                This.parent().html('空位置图片');
            }
            else {
                Tool.pre(t)
            }
        }
    }
});