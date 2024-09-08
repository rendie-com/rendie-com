'use strict';
Object.assign(Tool, {
    //例如：Tool.ImgCompare.a01(Tool.minimap.my_bottom2, Tool.minimap.my_bottom1, 2, this.a04, this)//俩图比较取不同
    //let img = Tool.ImgArrToBase64(imgArr)
    //俩图比较取不同,返回imgA的数组
    ImgCompare: {
        a01: function (imgA, imgB, tolerance, next, This, t) {
            //tolerance   容差范围[0-255]
            Tool.getImageData.a01(imgA, this.a02, this, [imgB, tolerance, next, This, t])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a02: function (imgA, arr) {
            Tool.getImageData.a01(arr[0], this.a03, this, [imgA, arr[1], arr[2], arr[3], arr[4]])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a03: function (imgB, arr) {
            let imgBArr = Tool.ImgToTwoArr(imgB);//把图片颜色信息，转的二维位置数组
            let imgAArr = Tool.ImgToTwoArr(arr[0]);//把图片颜色信息，转的二维位置数组
            //imgAArr[0].length     表示有多少行
            //imgAArr.length        表示有多少列
            for (let i = 0; i < imgAArr[0].length; i++) {
                for (let j = 0; j < imgAArr.length; j++) {
                    let rgbaA = imgAArr[j][i]
                    let rgbaB = imgBArr[j][i]
                    if (Math.sqrt(
                        (rgbaA[0] - rgbaB[0]) * (rgbaA[0] - rgbaB[0]) +
                        (rgbaA[1] - rgbaB[1]) * (rgbaA[1] - rgbaB[1]) +
                        (rgbaA[2] - rgbaB[2]) * (rgbaA[2] - rgbaB[2])) <= arr[1]
                    ) {
                        imgAArr[j][i] = [0, 0, 0, 0];
                    }
                }
            }
            Tool.apply(imgAArr, arr[2], arr[3], arr[4]);
        }
    }
})