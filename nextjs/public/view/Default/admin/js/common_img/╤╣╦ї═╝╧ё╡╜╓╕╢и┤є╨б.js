'use strict';
Object.assign(Tool, {
    //压缩图像到指定大小（返回blob）
    compressedImage: {
        a01: function (url, maxSize, next, This, t) {
            let img = new Image(), _this = this;
            img.src = url;
            img.setAttribute("crossOrigin", 'Anonymous');
            img.onload = function () {
                URL.revokeObjectURL(url);
                _this.a02(img, maxSize, next, This, t);
            }
        },
        a02: function (img, maxSize, next, This, t) {
            let w = img.width, h = img.height;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            /////////////////////////////////
            this.a03(canvas, maxSize, 1, next, This, t)
        },
        a03: function (canvas, maxSize, quality, next, This, t) {
            let _this = this;
            quality -= 0.01;
            //说明：这里只能是jpeg,用pngi不行
            canvas.toBlob(function (blob) {
                if (blob.size < maxSize) {
                    Tool.apply(blob, next, This, t)
                }
                else {
                    _this.a03(canvas, maxSize, quality, next, This, t)
                }
            }, 'image/jpeg', quality);
        }
    }
})