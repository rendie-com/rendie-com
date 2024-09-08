'use strict';
Object.assign(Tool, {

    drawPic1WaterMark: {
        a01: function (src, width, height, url, keyword, next, This, t) {
            keyword = Tool.titleCase(keyword);
            let img = new Image(), _this = this;
            img.src = src;
            img.setAttribute("crossOrigin", 'Anonymous');
            img.onload = function () {
                _this.a02(img, width, height, url, keyword, next, This, t);
            }
        },

        a02: function (img, width, height, url, keyword, next, This, t) {
            var canvas = document.createElement('canvas');
            //绘制和图片大小
            canvas.width = width; canvas.height = height;
            ////////////////////////////////////////////////////
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, width, height);
            let urlWidth = context.measureText(url).width
            this.b02(context, width, height, urlWidth)//画边框
            this.b03(context, url, height, urlWidth)//画网址
            ////////////////////////////////////////////
            context.font = "60px Microsoft Yahei";//字体大小
            let keywordWidth = context.measureText(keyword).width
            let keywordHeight = 270;
            if (keywordWidth + 100 > width) {
                context.font = "30px Microsoft Yahei";//字体大小
                keywordWidth = context.measureText(keyword).width
                keywordHeight = 260;
            }
            this.b01(context, width - keywordWidth - 50, 200, keywordWidth + 50, 100);
            context.fillStyle = "#fff";//填充和字体颜色
            context.fillText(keyword, (width - keywordWidth - 25), keywordHeight);
            if (width > 0) {
                canvas.toBlob(function (blob) { Tool.apply(blob, next, This, t); }, 'image/jpeg');
            }
            else {
                Tool.pre(["图片宽高有问题", width, height])
            }
        },
        //画流海
        b01: function (ctx, x, y, width, height) {
            let radius = 20
            ctx.fillStyle = "#d0011b";//填充和字体颜色
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.lineTo(x + width, y);//横线
            ctx.lineTo(x + width, y + height);//竖线
            ctx.lineTo(x + radius, y + height);//底横线
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#850515";//填充和字体颜色
            ctx.beginPath()
            ctx.moveTo(x + width, y + height);
            ctx.lineTo(x + width - 10, y + height + 10);
            ctx.lineTo(x + width - 10, y + height);
            ctx.closePath();
            ctx.fill();
            ;
        },
        //画边框
        b02: function (ctx, width, height, urlWidth) {
            ctx.strokeStyle = '#ee4d2d'; // 设置边框颜色
            ctx.lineWidth = 10; // 设置边框宽度
            ctx.moveTo(15, (height - urlWidth * 2) / 2 - 5);
            ctx.lineTo(15, 15);
            ctx.lineTo(width - 15, 15);//右坚线
            ctx.lineTo(width - 15, height - 15);
            ctx.lineTo(15, height - 15);
            ctx.lineTo(15, height / 2 + urlWidth - 15 * 2 + 5+10);
            ctx.stroke();
        },
        //画网址
        b03: function (ctx, url, height, urlWidth) {
            ctx.font = "18px Microsoft Yahei";//字体大小[默认20px]
            ctx.fillStyle = "#ee4d2d";//填充和字体颜色
            ctx.translate(10, (height - urlWidth * 2) / 2);// 设置旋转中心点
            ctx.rotate(Math.PI / 180 * 90);
            ctx.fillText(url, 0, 0); // 在旋转后的坐标系中绘制文字
            // 恢复原来的坐标系
            ctx.rotate(Math.PI / 180 * -90);
            ctx.translate(-10, -(height - urlWidth * 2) / 2);
        },
    }
})