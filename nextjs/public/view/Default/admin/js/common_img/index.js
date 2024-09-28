'use strict';
Object.assign(Tool, {
    //base64转化为Blob对象
    convertBase64ToBlob: function (imageEditorBase64) {
        var base64Arr = imageEditorBase64.split(",");
        var imgtype = "";
        var base64String = "";
        if (base64Arr.length > 1) {
            //如果是图片base64，去掉头信息
            base64String = base64Arr[1];
            imgtype = base64Arr[0].substring(
                base64Arr[0].indexOf(":") + 1,
                base64Arr[0].indexOf(";")
            );
        }
        // 将base64解码
        var bytes = atob(base64String);
        //var bytes = base64;
        var bytesCode = new ArrayBuffer(bytes.length);
        // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode);

        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        // 生成Blob对象（文件对象）
        return new Blob([bytesCode], { type: imgtype });
    },
    //计算base64编码图片大小
    getBase64ImageSize: function (base64) {
        const indexBase64 = base64.indexOf('base64,');
        if (indexBase64 < 0) return -1;
        const str = base64.substr(indexBase64 + 6);
        // 大小单位：字节
        return str.length * 0.75;
    },
    //获取文件的blob
    getFileBlob: function (url, next, This, t) {
        fetch(url).then(response => {
            // 确保请求成功
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.blob(); // 将Response转换为Blob
        }).then(blob => {
            // 处理Blob对象
            Tool.apply(blob, next, This, t)
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    },
    //将Blob转换成ArrayBuffer的函数
    blobToArrayBuffer: function (blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsArrayBuffer(blob);
        });
    },
    //获取图片左边竖线【非透明】的所有值-----行扫描
    imgLeftLine: function (width, height, arr) {
        let yArr = []
        for (let i = 0; i < height; i++) {
            let widthObj = {};
            for (let j = 0; j < width; j++) {
                let len = (i * 4 * width) + j * 4;
                //第一行第一列：(0*4*150)+0*4=0
                //第一行第二列：(0*4*150)+1*4=4
                //第一行第三列：(0*4*150)+2*4=8
                //......
                //第二行第一列：(1*4*150)+0*4=600
                //第二行第二列：(1*4*150)+1*4=604
                //第二行第三列：(1*4*150)+2*4=608
                //......
                let r = arr[len];
                let g = arr[len + 1];
                let b = arr[len + 2];
                let a = arr[len + 3];
                if (r + g + b != 0) {//agb都是0，【.png】格式就是透明的，【.jpg】格式就是黑色。
                    widthObj = {
                        xy: [j, i],
                        rgba: [r, g, b, a]
                    };
                    break;
                }
            }
            yArr.push(widthObj)
        }
        return yArr;
    },
    //把图片颜色信息，转的二维位置数组
    ImgToTwoArr: function (data) {
        let width = data.width, height = data.height
        let newArr = []
        for (let i = 0; i < height; i++) {
            let Arr = [];
            for (let j = 0; j < width; j++) {
                let len = (i * 4 * width) + j * 4;
                let r = data.data[len];
                let g = data.data[len + 1];
                let b = data.data[len + 2];
                let a = data.data[len + 3];
                Arr[j] = [r, g, b, a];
            }
            newArr[i] = Arr;
        }
        return newArr;
    },
    //二维数组图像转Base64
    ImgArrToBase64: function (ImgArr) {
        let width = ImgArr[0].length, height = ImgArr.length;
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext('2d');
        ////////////////////////////////////////////////
        let count = 0;
        const imgData = context.getImageData(0, 0, width, height)
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                imgData.data[count] = ImgArr[i][j][0]
                count++;
                imgData.data[count] = ImgArr[i][j][1]
                count++;
                imgData.data[count] = ImgArr[i][j][2]
                count++;
                imgData.data[count] = ImgArr[i][j][3]
                count++;
            }
        }
        /////////////////////////////////////
        context.putImageData(imgData, 0, 0);//将data对象放回画布
        let img = canvas.toDataURL("image/png");//Base64
        /////////////////////////////////////////
        //let blob = Tool.convertBase64ToBlob(img);
        //let url = URL.createObjectURL(blob);
        //Tool.at(url);
        //URL.revokeObjectURL(url);
        return img;
    },
    //在大图中清空小图---主要是看在结果用的
    delMinImg: function (minX, maxImgArr, minImgArr) {
        let width = maxImgArr[0].length, height = maxImgArr.length;
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext('2d');
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < minImgArr[0].length; j++) {
                if (minImgArr[i][j][0] != 0 && minImgArr[i][j][1] != 0 && minImgArr[i][j][2] != 0) {//小图是透明的不清空
                    maxImgArr[i][j + minX] = minImgArr[i][j];
                }
            }
        }
        ///////////////////////////////////////////////////////
        let count = 0;
        const imgData = context.getImageData(0, 0, width, height)
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                imgData.data[count] = maxImgArr[i][j][0]
                count++;
                imgData.data[count] = maxImgArr[i][j][1]
                count++;
                imgData.data[count] = maxImgArr[i][j][2]
                count++;
                imgData.data[count] = maxImgArr[i][j][3]
                count++;
            }
        }
        /////////////////////////////////////
        context.putImageData(imgData, 0, 0);//将data对象放回画布
        let img = canvas.toDataURL("image/png");
        return img;
        //let blob = Tool.convertBase64ToBlob(img);
        //let url = URL.createObjectURL(blob);
        //Tool.at(url);
    },
    //画圆--返回Base64
    drawCircleBase64: function (width, height, x, y, r, color) {
        //width, height     画布宽高
        //x,y               圆在画布中的位置
        //r                 圆的半径
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(x + r, y + r, r, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        /////////////////////////////////////
        let img = canvas.toDataURL("image/png");
        //let url = URL.createObjectURL(Tool.convertBase64ToBlob(img));
        return img;
    },
})