'use strict';
Object.assign(Tool, {
    //例如：Tool.RemoveOverlap.a01(imgA, imgB, this.a04, this)
    //let img = Tool.ImgArrToBase64(imgArr)
    //俩图片合并删除重叠（返回【imgA】）
    RemoveOverlap: {
        //在imgA中，删除imgB.
        a01: function (imgA, imgB, next, This, t) {
            Tool.getImageData.a01(imgA, this.a02, this, [imgB, next, This, t])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a02: function (imgA, arr) {
            Tool.getImageData.a01(arr[0], this.a03, this, [imgA, arr[1], arr[2], arr[3]])//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a03: function (imgB, arr) {
            let imgBArr = Tool.ImgToTwoArr(imgB);//把图片颜色信息，转的二维位置数组
            let imgAArr = Tool.ImgToTwoArr(arr[0]);//把图片颜色信息，转的二维位置数组
            //imgAArr[0].length     表示有多少行---高
            //imgAArr.length        表示有多少列---宽           
            for (let i = 0; i < imgAArr[0].length; i++) {
                for (let j = 0; j < imgAArr.length; j++) {
                    let rgbaB = imgBArr[j][i]
                    if (rgbaB[0] + rgbaB[1] + rgbaB[2] != 0) {//imgB有信息，就在imgA中删除。
                        imgAArr[j][i] = [0, 0, 0, 0];
                    }
                }
            }
            Tool.apply(imgAArr, arr[1], arr[2], arr[3]);
        },
    }
})