'use strict';
Object.assign(Tool, {
    //查找图片的位置
    //Tool.FindImgLocation.a01(Tool.minimap.my_bottom3, Tool.minimapHero.PainfulRmbrace, 5, this.a04, this);//在大图中，找小图的位置
    FindImgLocation: {
        //在大图中，找小图的位置(注：小图透明点不算)
        a01: function (maxImg, minImg, tolerance, next, This, t) {
            //tolerance   容差范围[0-255]
            Tool.getImageData.a01(maxImg, this.a02, this, [minImg, tolerance, next, This, t])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a02: function (maxImg, arr) {
            Tool.getImageData.a01(arr[0], this.a03, this, [maxImg, arr[1], arr[2], arr[3], arr[4]])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a03: function (minImg, arr) {
            let minImgArr = Tool.ImgToTwoArr(minImg);//把图片颜色信息，转的二维位置数组
            let maxImgArr = Tool.ImgToTwoArr(arr[0]);//把图片颜色信息，转的二维位置数组
            //maxImgArr[0].length     表示有多少行----高度
            //maxImgArr.length        表示有多少列----宽度
            let maxCount = [0,0],//取最多相同颜色点
                X = 0, Y = 0;
            for (let i = 0; i < maxImgArr.length - minImgArr.length; i++) {
                for (let j = 0; j < maxImgArr[0].length - minImgArr[0].length; j++) {
                    let count = this.b01(maxImgArr, i, j, minImgArr, arr[1])
                    if (count[0] > maxCount[0]) {
                        maxCount = count;
                        X = j;
                        Y = i;
                    }
                }
            }
            //maxCount[0]      有多少个相同点
            //maxCount[1]      共有多少个点
            //Tool.pre([X, Y, maxCount])
            Tool.apply([X, Y, Tool.int(maxCount[0] / maxCount[1]*100),], arr[2], arr[3], arr[4]);
        },
        //返回相同点的个数(注：小图透明点不算)
        b01: function (maxImgArr, I, J, minImgArr, tolerance) {
            //I = 52;J = 212;//这个是测式时要用
            //I = 38;J = 206;//这个是测式时要用
            let newArr = []
            for (let i = I; i < minImgArr.length + I; i++) {
                let tmpArr = []
                for (let j = J; j < minImgArr[0].length + J; j++) {
                    tmpArr.push(maxImgArr[i][j])
                }
                newArr.push(tmpArr)
            }
            //$("#minimap").html('<img src="' + Tool.ImgArrToBase64(newArr) + '">');aaaaaaaaaaaaaaaaaaa//这个是测式时要用
            /////////////////////////////////////////
            let num = 0;//相同点计数
            let count = 0;//小图共有多少个点
            if (newArr[0].length == minImgArr[0].length && newArr.length == minImgArr.length) {
                for (let i = 0; i < newArr.length; i++) {
                    for (let j = 0; j < newArr[0].length; j++) {
                        ////////////////////////////////
                        let maxRGBA = newArr[i][j]
                        let mimRGBA = minImgArr[i][j]
                        if (mimRGBA[0] + mimRGBA[1] + mimRGBA[2] != 0) {//小图透明点不算
                            count++;
                            if (Math.sqrt(
                                (maxRGBA[0] - mimRGBA[0]) * (maxRGBA[0] - mimRGBA[0]) +
                                (maxRGBA[1] - mimRGBA[1]) * (maxRGBA[1] - mimRGBA[1]) +
                                (maxRGBA[2] - mimRGBA[2]) * (maxRGBA[2] - mimRGBA[2])) <= tolerance
                            ) {
                                num++;
                            }
                        }
                        //////////////////////////////////////////
                    }
                }
            }
            else {
                Tool.at("异常")
            }
            return [num,count];
        },
    }
})

