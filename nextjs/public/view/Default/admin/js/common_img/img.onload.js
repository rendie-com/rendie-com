'use strict';
Object.assign(Tool, {
    //指定图片宽高(等比缩小)，返回【Base64】。（注：src图片可以是Base64,目的是为个改变图片大小）
    //设置的宽或高，必须大于实际宽或高，否则不修改。
    setImageWH: {
        a01: function (src, isMode, width, height, extend, next, This, t) {
            let oo = {
                src: src,
                isMode: isMode, //isMode    是否为最大匹配。最大匹配？答：比如实际图片宽比长小，则先固定宽。等比缩小。小于指定宽或高，则不修改。
                width,
                height,
                extend,//extend    扩展名。如：png 、 jpeg
                next,
                This,
                num: 0,//连续出错5次，就提示出错。
                t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let img = new Image();
            // 先设置图片跨域属性
            img.setAttribute("crossOrigin", 'anonymous');
            // 再给image赋值src属性，先后顺序不能颠倒
            img.src = oo.src;
            img.onerror = (e) => {
                oo.num++;
                if (oo.num == 5) {
                    Tool.pre(['【Tool.setImageWH.a01】连续出错5次', oo.src, e]);
                }
                else {
                    Tool.Time("name", 100, this.a02, this, oo)
                }
            }
            img.onload = function () {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                ////////////////////////////////////////
                let widthOrHeight
                if (oo.isMode) {
                    widthOrHeight = img.width > img.height ? "height" : "width";//取最小，用来固定的。
                }
                else {
                    widthOrHeight = img.width < img.height ? "height" : "width";//取最大，用来固定的。
                }
                let w2 = img.width, h2 = img.height;
                if (widthOrHeight == "height") {
                    if (oo.height < img.height) {//设置的高 > 实际的高，否则不修改。
                        img.height = oo.height;
                        img.width = parseInt((oo.height * w2) / h2);
                    }
                }
                else {
                    if (oo.width < img.width) {//设置的宽 > 实际的宽，否则不修改。
                        img.height = parseInt((oo.width * h2) / w2);
                        img.width = oo.width;
                    }
                }
                ////////////////////////////////////////////////////////
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(this, 0, 0, img.width, img.height);
                let Base64 = canvas.toDataURL("image/" + oo.extend);
                //let data = context.getImageData(0, 0, img.width, img.height);
                Tool.apply(Base64, oo.next, oo.This, oo.t);

            }
        },
    },
    //剪图并返回【Base64】
    //x y             开始位置
    //width height    剪图后大小
    //例如： Tool.getImageBase64(Tool.minimap.my_bottom3, 31, 196, 26, 26, this.a04, this)
    getImageBase64: function (src, x, y, width, height, next, This, t) {
        var canvas = document.createElement('canvas');
        canvas.width = width + x;
        canvas.height = height + y;
        var context = canvas.getContext('2d');
        var img = new Image();
        // 先设置图片跨域属性
        img.setAttribute("crossOrigin", 'anonymous')
        // 再给image赋值src属性，先后顺序不能颠倒
        img.src = src;
        img.onerror = () => {
            alert('图片流异常...');
        };
        img.onload = function () {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(this, -x, -y);
            let img = canvas.toDataURL("image/png");
            Tool.apply(img, next, This, t);
        }
    },
    //图片转png格式，返回url.
    imgToPng: function (src, img_width, next, This, t) {
        var myCanvas = document.createElement('canvas');
        var context = myCanvas.getContext('2d');
        var img = new Image();
        img.setAttribute("crossOrigin", 'anonymous')// 先设置图片跨域属性      
        img.src = src;  // 再给image赋值src属性，先后顺序不能颠倒
        img.onerror = () => {
            //alert('图片流异常...');
            Tool.apply(false, next, This, t);
        };
        img.onload = function () {
            if (img.width > img_width) {
                myCanvas.height = img_width * img.height / img.width//等比缩放
                myCanvas.width = img_width
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img_width, img_width * img.height / img.width);
            }
            else {
                myCanvas.height = img.height
                myCanvas.width = img.width
                context.drawImage(img, 0, 0)
            }
            /////////////////////////////////////////////
            let img2 = myCanvas.toDataURL("image/png");
            let blob = Tool.convertBase64ToBlob(img2);
            let url = URL.createObjectURL(blob);
            Tool.apply(url, next, This, t);
        }
    },
    //返回【图片像素信息数据】（注：src图片可以是Base64)
    getImageData: {
        a01: function (src, next, This, t) {
            let oo = {
                src: src,
                next,
                This,
                t,
                num: 0,//连续出错5次，就提示出错。
            }
            this.a02(oo)
        },
        a02: function (oo) {
            var img = new Image();
            // 先设置图片跨域属性
            img.setAttribute("crossOrigin", 'anonymous');
            // 再给image赋值src属性，先后顺序不能颠倒
            img.src = oo.src;
            img.onerror = (e) => {
                oo.num++;
                if (oo.num == 5) {
                    Tool.pre(['【Tool.getImageData.a01】连续出错5次', oo.src, e]);
                }
                else {
                    Tool.Time("name", 100, this.a02, this, oo)
                }
            };
            img.onload = function () {
                let canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(this, 0, 0);
                let data = context.getImageData(0, 0, img.width, img.height)
                //Tool.log(this);
                Tool.apply(data, oo.next, oo.This, oo.t);
            }
        },
    },
    getImgBase64: {
        a01: function (src, next, This, t) {
            let oo = {
                src: src,
                next,
                This,
                t,
                num: 0,//连续出错5次，就提示出错。
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let img = new Image();
            // 先设置图片跨域属性
            img.setAttribute("crossOrigin", 'anonymous')
            // 再给image赋值src属性，先后顺序不能颠倒
            img.src = oo.src;
            img.onerror = (e, errorType) => {
                oo.num++;
                if (oo.num == 5) {
                    //console.log(img,e, errorType)
                    //Tool.pre(['【Tool.getImgBase64.a01】连续出错5次', oo.src, e, errorType]);
                    Tool.apply(false, oo.next, oo.This, oo.t);
                }
                else {
                    Tool.Time("name",100,this.a02,this,oo)
                }
            };
            //////////////////////////////////////////////
            img.onload = function () {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(this, 0, 0);
                let o1 = {
                    width: img.width,
                    height: img.height,
                    base64: canvas.toDataURL("image/png")
                }
                Tool.apply(o1, oo.next, oo.This, oo.t);
            }
        },
    },
})