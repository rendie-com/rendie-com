'use strict';
Object.assign(Tool, {
    //计算geetest.com网站验证码的滑动位置
    geetest: {
        a01: function (minPic, maxPic, top, next, This, t) {
            let arr = [
                {
                    imgA: { minPic, maxPic, top },//网络上的图片
                    imgB: null,//数据库里的图片
                    imgC: {},//当前图片信息
                }, next, This, t]
            Tool.getImageData.a01(maxPic, this.a02, this, arr)//获取图片颜色信息
        },
        //算出左边的MD5
        a02: function (imgData, arr) {
            let imgArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            let arr1 = [], w = imgArr[0].length, h = imgArr.length
            let width = parseInt(w / 2);//大图拖动位置，都在右半边，算出左边的md5值。
            for (let i = 0; i < h; i++) {//截取左边图片的图片信息
                let arr2 = [];
                for (let j = 0; j < width; j++) {
                    arr2.push(imgArr[i][j]);
                }
                arr1.push(arr2);
            }
            arr[0].imgA.leftMd5 = md5(JSON.stringify(arr1), 32)
            this.a03(arr)
        },
        a03: function (arr) {
            let str = '{\
            <r:geetest db="sqlite.dhgate" size=1 where=" where @.leftMd5=\'' + arr[0].imgA.leftMd5 + '\'">\
                "minPic":"<:minPic/>",\
                "maxPic":"<:maxPic/>",\
                "top":<:top/>\
            </r:geetest>}';
            Tool.ajax.a01(str, 1, this.a04, this, arr)
        },
        a04: function (t, arr) {
            arr[0].imgB = t;//数据库图片
            if (t.maxPic) {
                $("#state").html("数据库有这个图。");
                this.a06(arr)
            }
            else {
                $("#state").html("数据库没这个图，则入库......");
                let txt = '""<r: db="sqlite.dhgate">insert into @.geetest(@.minPic,@.maxPic,@.top,@.leftMd5,@.addtime)values\(\'' + arr[0].minPic + '\',\'' + arr[0].maxPic + '\',' + arr[0].top + ',\'' + arr[0].leftMd5 + '\',' + Tool.gettime("") + ')</r:>'
                Tool.ajax.a01(txt, 1, this.a05, this, arr);
            }
        },
        a05: function (t, arr) {
            if (t == "") {
                $("#state").html("需要刷新验证码.....");
                Tool.apply("需要刷新验证码", arr[1], arr[2], arr[3])
            }
            else {
                Tool.pre(["出错", t]);
            }
        },
        a06: function (arr) {
            //arr[0].imgA        表示网络上的图片
            //arr[0].imgB        表示数据库中的图片信息
            //arr[1]             表示【next】
            //arr[2]             表示【This】
            //arr[3]             表示【This】
            /////////////////////////////////////////////////////
            $("#state").html("获取网络上小图的颜色信息.....");
            Tool.getImageData.a01(arr[0].imgA.minPic, this.a07, this, arr)
        },
        a07: function (imgData, arr) {
            let imgArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            let img1 = this.b01(imgArr);//找第一个【非透明点】的top位置
            let y = arr[0].imgA.top;//y轴，是已知条件。
            y = y + img1//y轴 + 小图【非透明点】的位置
            //////////////////////////////////
            let img2 = this.b02(imgArr);//最后个【非透明点】的top位置
            let height = img2 - img1;//最后个【非透明点】的位置 - 第一个【非透明点】的位置
            ////////////////////////////////////////////
            arr[0].imgA.temp = {
                x: 300 / 2,
                y: y,      //y轴，是已知条件。
                width: (300 / 2),
                height: height//最后个【非透明点】的位置 - 第一个【非透明点】的位置
            }
            this.a08(arr)
        },
        a08: function (arr) {
            $("#state").html("获取数据库小图的颜色信息.....");
            Tool.getImageData.a01(arr[0].imgB.minPic, this.a09, this, arr)
        },
        a09: function (imgData, arr) {
            let imgArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            let img1 = this.b01(imgArr);//找第一个【非透明点】的top位置
            let y = arr[0].imgB.top;//y轴，是已知条件。
            y = y + img1//y轴 + 小图【非透明点】的位置
            //////////////////////////////////
            let img2 = this.b02(imgArr);//最后个【非透明点】的top位置
            let height = img2 - img1;//最后个【非透明点】的位置 - 第一个【非透明点】的位置
            ////////////////////////////////////////////
            arr[0].imgB.temp = {
                x: 300 / 2,
                y: y,
                width: (300 / 2),
                height: height
            }
            this.a10(arr)
        },
        a10: function (arr) {
            let imgA = arr[0].imgA.temp;
            let imgB = arr[0].imgB.temp;
            if (imgB.y > imgA.y) {//如果【数据库y轴位置】大于【当前y轴位置】
                //用头部的图片
                arr[0].imgC.t_y = imgA.y
                arr[0].imgC.t_height = imgB.y - imgA.y;
                this.a11(arr)
            }
            else {
                if (imgB.y + imgB.height <= imgA.y) {
                    //不用改动
                    arr[0].imgC.t_y = imgA.y
                    arr[0].imgC.t_height = imgA.height
                    this.a11(arr)
                }
                else {
                    //用尾部的图片
                    arr[0].imgC.t_y = imgB.y + imgB.height//截图的起点位置，用当前位置。
                    arr[0].imgC.t_height = imgA.y + imgA.height - arr[0].imgC.t_y;
                    if (arr[0].imgC.t_height < 5) {//为什么有这判断？因为：y轴重叠了。
                        this.a05("", arr)//【刷新验证码】
                    }
                    else {
                        this.a11(arr)
                    }
                }
            }
        },
        a11: function (arr) {
            $("#state").html("正在剪数据库大图并返回【Base64】。");
            Tool.getImageBase64(arr[0].imgB.maxPic,
                arr[0].imgB.temp.x,
                arr[0].imgC.t_y,
                arr[0].imgB.temp.width,
                arr[0].imgC.t_height,
                this.a12, this, arr)
        },
        a12: function (t, arr) {
            $("#state").html("获取数据库截取完后大图的颜色信息.....");
            Tool.getImageData.a01(t, this.a13, this, arr)
        },
        a13: function (imgData, arr) {
            let imgArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            $("#state").html("正在剪当前大图并返回【Base64】。");
            Tool.getImageBase64(arr[0].imgA.maxPic,
                arr[0].imgB.temp.x,
                arr[0].imgC.t_y,
                arr[0].imgB.temp.width,
                arr[0].imgC.t_height,
                this.a14, this, [imgArr, arr])
        },
        a14: function (t, arr) {
            $("#state").html("获取数据库截取完后大图的颜色信息.....");
            Tool.getImageData.a01(t, this.a15, this, arr)
        },
        a15: function (imgData, arr) {
            let imgArr1 = arr[0];//数据库图
            let imgArr2 = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            //列扫描，不同则跳出，返回x轴位置
            let i = 0;
            for (i = 0; i < imgArr1[0].length; i++) {
                let isbool = false;
                for (let j = 0; j < imgArr1.length; j++) {
                    let r1 = imgArr1[j][i][0];
                    let g1 = imgArr1[j][i][1];
                    let b1 = imgArr1[j][i][2];
                    let r2 = imgArr2[j][i][0];
                    let g2 = imgArr2[j][i][1];
                    let b2 = imgArr2[j][i][2];
                    if (r1 != r2 || g1 != g2 || b1 != b2) {
                        isbool = true;
                        break;
                    }
                }
                if (isbool) { break; }
            }
            arr[1][0].imgC.start_x = i;
            this.a16(arr[1])
        },
        a16: function (arr) {
            //从y轴哪个位置，开始切小图
            //为什么要切小图？答：小图在x轴的位置信息，切小图，高度改变，x轴也会变。
            $("#state").html("正在剪当前小图并返回【Base64】。");
            Tool.getImageBase64(arr[0].imgA.minPic,
                0,
                arr[0].imgC.t_y - arr[0].imgA.top,
                80,//小图的宽为80px
                arr[0].imgC.t_height,
                this.a17, this, arr)
        },
        a17: function (t, arr) {
            $("#state").html("获取当前截取完后小图的颜色信息.....");
            Tool.getImageData.a01(t, this.a18, this, arr)
        },
        a18: function (imgData, arr) {
            let imgArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            //列扫描，找到【非透明点】，返回x轴位置
            let i = 0;
            for (i = 0; i < imgArr[0].length; i++) {
                let isbool = false;
                for (let j = 0; j < imgArr.length; j++) {
                    if (imgArr[j][i][0] + imgArr[j][i][1] + imgArr[j][i][2] != 0) {
                        isbool = true;
                        break;
                    }
                }
                if (isbool) { break; }
            }
            //Tool.show2dImg(imgArr)
            arr[0].imgC.satrt_x_minPic = i;
            this.a19(arr)
        },
        a19: function (arr) {
            arr[0].location = 150 + arr[0].imgC.start_x - arr[0].imgC.satrt_x_minPic
            Tool.apply(arr[0], arr[1], arr[2], arr[3])
        },
        //找第一个【非透明点】的top位置
        b01: function (arr) {
            let i = 0;
            for (i = 0; i < arr.length; i++) {//找第一个【非透明点】的位置
                let isbool = false;//是否【非透明】
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j][0] + arr[i][j][1] + arr[i][j][2] != 0) {//这一行是否【非透明】
                        isbool = true;
                        break;
                    }
                }
                if (isbool) break;
            }
            return i;
        },
        //最后个【非透明点】的top位置
        b02: function (arr) {
            let i = 0;
            for (i = arr.length - 1; i > 0; i--) {//找第最后个【非透明点】的位置
                let isbool = false;//是否【非透明】
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[i][j][0] + arr[i][j][1] + arr[i][j][2] != 0) {//这一行是否【非透明】
                        isbool = true;
                        break;
                    }
                }
                if (isbool) break;
            }
            return i + 1;//为什么加1？答：i是【非透明点】，下一个肯定是【透明点】
        },

    }
})