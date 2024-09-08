'use strict';
Object.assign(Tool, {
    //给图片增加水印（返回blob）
    //来源：https://blog.csdn.net/wzard/article/details/127338662
    //  objmsg = {
    //  imgpath: "",//图片路径  string类型  [必传]
    //  rotate: 20,//旋转角度   int类型  默认20
    //  fontsize: 20,//字体大小   默认20
    //  fontcolor: "",//字体颜色  rgba类型  默认 255, 255, 255, 0.2
    //  density: 3,//稠密度    数值越大，水印越多
    //  str: ["我是水印", "2022-10-15", "over"],    //水印文字 数组类型  最大三行（即lingth<=3）[必传]
    //}
    drawWaterMark: {
        a01: function (urlA, objmsg, next, This, t) {
            let img = new Image(), _this = this;
            img.src = urlA;
            img.setAttribute("crossOrigin", 'Anonymous');
            img.onload = function () {
                _this.a02(img, objmsg, next, This, t);
            }
            img.onerror = function () {
                Tool.apply("err", next, This, t);
            }
        },
        a02: function (img, objmsg, next, This, t) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            //绘制和图片大小
            canvas.width = objmsg.width;
            canvas.height = objmsg.height;
            ctx.drawImage(img, 0, 0, objmsg.width, objmsg.height);
            //绘制水印
            if (objmsg.rotate != undefined && objmsg.rotate != null) {//旋转角度[默认20]
                ctx.rotate((Math.PI / 120) * -objmsg.rotate);
            } else {
                ctx.rotate((Math.PI / 120) * -20);
            }
            var fontsize = 20;
            if (objmsg.fontsize != undefined && objmsg.fontsize != null) {//字体大小[默认20px]
                fontsize = objmsg.fontsize;
            }
            ctx.font = fontsize + "px Microsoft Yahei";
            var fontcolor = '255, 255, 255, 0.2';
            if (objmsg.fontcolor != undefined && objmsg.fontcolor != null) {//字体颜色透明度[默认白色]
                fontcolor = objmsg.fontcolor;
            }
            ctx.fillStyle = "rgba(" + fontcolor + ")";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            var density = 3;
            if (objmsg.density != undefined && objmsg.density != null) {//稠密度[默认3]
                density = objmsg.density
            }
            /////////////////////////////////////////////
            if (objmsg.width > 0) {
                for (var i = -1000; i < objmsg.height; i += objmsg.width / (density - 1)) {
                    for (var k = 370; k < objmsg.height; k += objmsg.width / density) {
                        var str = objmsg.str;
                        if (str.length == 1) {
                            ctx.fillText(str[0], i, k);
                        } else if (str.length == 2) {
                            ctx.fillText(str[0], i, k);
                            ctx.fillText(str[1], i, k + (fontsize - 100 + 5));//多行
                        } else if (str.length == 3 || str.length > 3) {
                            ctx.fillText(str[0], i, k);
                            ctx.fillText(str[1], i, k + (fontsize - 100 + 5));//多行
                            ctx.fillText(str[2], i, k + (fontsize * 2 - 100 + 5));//多行
                        }
                    }
                }
                canvas.toBlob(function (blob) { Tool.apply(blob, next, This, t); }, 'image/jpeg');
            }
            else {
                Tool.pre(["图片宽高有问题", objmsg])
            }
        }
    }
})