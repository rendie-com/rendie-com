'use strict';
Object.assign(Tool, {
    //比较图片获取相似度，返回值【0-100】。
    getImgSimilarity: {
        //从大图中，切一小块，与小图比较，相似度是多少。
        a01: function (maxImg, oo, next, This, t) {
            //注：oo 里面必须要有：x, y, w, h, img
            //右下半区，第二个在不在（红）。
            Tool.getImageBase64(maxImg, oo.x, oo.y, oo.w, oo.h, this.a02, this, [oo.img, next, This, t])
        },
        a02: function (maxImg, arr) {
            Tool.getImageData.a01(maxImg, this.a03, this, arr)//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a03: function (maxImg, arr) {
            Tool.getImageData.a01(arr[0], this.a04, this, [maxImg, arr[1], arr[2], arr[3]])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a04: function (minImg, arr) {
            //注：这个时后，俩个图是一样大的。
            let maxImgArr = Tool.ImgToTwoArr(arr[0]);//把图片颜色信息，转的二维位置数组
            let minImgArr = Tool.ImgToTwoArr(minImg);//把图片颜色信息，转的二维位置数组
            //maxImgArr[0].length     表示有多少行----高度
            //maxImgArr.length        表示有多少列----宽度
            let count = 0; //相似点计数
            let num = 0;//小图非透明点计数
            for (let i = 0; i < maxImgArr[0].length; i++) {
                for (let j = 0; j < maxImgArr.length; j++) {
                    let maxRGBA = maxImgArr[j][i]
                    let mimRGBA = minImgArr[j][i]
                    if (mimRGBA[0] + mimRGBA[1] + mimRGBA[2] != 0) {
                        num++;
                        if (Math.sqrt(
                            (maxRGBA[0] - mimRGBA[0]) * (maxRGBA[0] - mimRGBA[0]) +
                            (maxRGBA[1] - mimRGBA[1]) * (maxRGBA[1] - mimRGBA[1]) +
                            (maxRGBA[2] - mimRGBA[2]) * (maxRGBA[2] - mimRGBA[2])) <= 10
                        ) {
                            count++;
                        }
                    }
                }
            }
            let ret = Tool.int((count / num) * 100);
            Tool.apply(ret, arr[1], arr[2], arr[3]);
        }
    }
})