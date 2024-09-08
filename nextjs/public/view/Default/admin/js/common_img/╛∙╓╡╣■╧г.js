'use strict';
Object.assign(Tool, {
    //参考：https://blog.csdn.net/jiangjunshow/article/details/100657183
    GetAvgHash: {
        a01: function (src, next, This, t) {
            let oo = {
                src: src,
                next: next,
                This: This,
                t: t,
            }
            this.a02(oo)
        },
        a02: function (oo) {
            $("#state").html("正在获取图片Base64...");
            Tool.setImageWH.a01(oo.src, false, 8, 8, "png", this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (t == "data:,") {//图片太小了，就是这样子了。
                Tool.apply("0", oo.next, oo.This, oo.t);
            }
            else {
                $("#state").html('已获得Base64...')
                Tool.getImageData.a01(t, this.a04, this, oo)
            }
        },
        a04: function (t, oo) {
            $("#state").html('将图片转换为灰度图像...')
            let imgArr = Tool.ImgToTwoArr(t);//把图片颜色信息，转的二维位置数组
            let nArr = []
            for (let i = 0; i < imgArr.length; i++) {
                for (let j = 0; j < imgArr[0].length; j++) {
                    nArr.push(imgArr[i][j][0] * 0.3 + imgArr[i][j][1] * 0.59 + imgArr[i][j][2] * 0.11);
                }
            }
            this.a05(nArr, oo)
        },
        a05: function (nArr, oo) {
            let avg = this.getAverage(nArr)//计算所有64个像素的灰度平均值。
            let rArr = [];
            //比较像素的灰度
            for (let i = 0; i < nArr.length; i++) {
                rArr.push(nArr[i] >= avg ? 1 : 0);//将比较结果进行组合
            }
            Tool.apply(rArr.join(""), oo.next, oo.This, oo.t);
        },
        getAverage: function (arr) {
            if (arr.length === 0) return 0; // 如果数组为空，返回0
            const sum = arr.reduce((acc, current) => acc + current, 0); // 累加数组元素
            return sum / arr.length; // 计算平均值
        }

    }
})