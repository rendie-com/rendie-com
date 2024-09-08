'use strict';
Object.assign(Tool, {
    //例如：Tool.CutDiagram.a01(Tool.minimap.my_bottom2, 0, 220, 60, 40, Tool.minimap.my_bottom1, this.a03, this)//切图复制粘贴
    //let img = Tool.ImgArrToBase64(imgArr)
    //////////////////////////////////////////
    //切图复制粘贴
    CutDiagram: {
        //从imgA中，切一块，放到imgB中，返回imgB的数组
        a01: function (imgA, x, y, w, h, imgB, next, This, t) {
            Tool.getImageBase64(imgA, x, y, w, h, this.a02, this, [x, y, w, h, imgB, next, This, t])
        },
        a02: function (imgA, arr) {
            //$("#runningState").html('<img src="' + imgA + '">')
            Tool.getImageData.a01(imgA, this.a03, this, arr)//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a03: function (imgA, arr) {
            arr.push(imgA)
            Tool.getImageData.a01(arr[4], this.a04, this, arr)//返回【图片像素信息数据】（注：src图片可以是Base64)
        },
        a04: function (imgB, arr) {
            let imgAArr = Tool.ImgToTwoArr(arr[8]);//把图片颜色信息，转的二维位置数组
            let imgBArr = Tool.ImgToTwoArr(imgB);//把图片颜色信息，转的二维位置数组
            let x = arr[0], y = arr[1], w = arr[2], h = arr[3]
            for (let i = x; i < w; i++) {//宽
                for (let j = y; j < y + h; j++) {//高
                    imgBArr[j][i] = imgAArr[j - y][i]
                }
            }
            Tool.apply(imgBArr, arr[5], arr[6], arr[7]);
        }
    }
})