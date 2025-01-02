'use strict';
Object.assign(Tool, {
    //限制图片最大度度（返回blob）-----自动转为png格式
    setImgMaxWidth:
    {
        a01: function (url, MaxWidth, next, This, t) {
            let img = new Image(), _this = this;
            img.src = url;
            img.setAttribute("crossOrigin", 'Anonymous');
            img.onload = function () {
                _this.a02(img, MaxWidth, next, This, t);
            }
            /////////////////////////////////////////
            let extensions = ["png", "jpeg", "gif", "jpg", "JPG", "JPEG", "PNG", "GIF"];
            let i = 0, len = url.lastIndexOf("."), urlA = url.substr(0, len + 1);
            img.onerror = function () {
                if (i < extensions.length) {
                    img.src = urlA + extensions[i];
                    i++;
                }
                else {
                    Tool.apply(null, next, This, t);
                }
            };
        },
        a02: function (img, MaxWidth, next, This, t) {
            let w = img.width, h = img.height;
            if (w > MaxWidth)//等比例缩小
            {
                //注：请不要调整【height】和【height】的顺序。
                h = Tool.int(1000 * h / w)
                w = 1000;
            }
            ///////////////////////////////////////////////
            //问：得到宽度，为什么不值接返回，为什么还要画一下？
            //答：第一个目的是，为了把gif格式图片，转为jpg图片。
            //    第二个目的是，马上就能知道图片的大小。
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            ////////////////////////////////////////////////
            canvas.toBlob(function (blob) { Tool.apply(blob, next, This, t); }, 'image/png');
        }
    }
})