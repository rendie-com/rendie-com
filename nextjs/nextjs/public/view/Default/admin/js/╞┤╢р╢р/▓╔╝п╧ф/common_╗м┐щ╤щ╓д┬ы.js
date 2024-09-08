Object.assign(Tool, {
    captcha: {
        a01: function (url, headers, next, This, t) {
            let oo = {
                url: url,
                headers: headers,
                next: next,
                This: This,
                t: t,
                isRD: false,//是否用rendie软件来移动滑块。
                errCount: 0//搜索同一个图片，连续验证出错，就延长一倍的时间再继续。
            }
            this.a02(oo);
        },
        a02: function (oo) {
            gg.tabs_remove_create_indexOf(2, oo.url, '</body>',true, this.a03, this, oo);
        },
        a03: function (t, oo) {
            $("#state").html("正在注入【common_滑块验证码_注入.js】文件...");
            Tool.ajax.text("/" + o.path + "admin/js/拼多多/采集箱/common_滑块验证码_注入.js", this.a04, this, oo);
        },
        a04: function (t, oo) {
            $("#state").html("正在刷新验证码。。。");
            gg.tabs_executeScript_indexOf(2, "", t + ";fun.e01()", '有验证码，通过。<1/>等待RenDie软件来操作出现验证码。',true, this.a05, this, oo);
        },
        a05: function (t, oo) {
            if (t[0].indexOf("有验证码，通过。") != -1) {
                this.d01(t[0], oo);
            }
            else if (t[0].indexOf("等待RenDie软件来操作出现验证码。") != -1) {
                this.g01(oo);
            }
            else {






                alert("wwwwwwwwww-------------------wwwwwwwwwwwwwwwwwwwww")







            }
        },
        d01: function (t, oo) {
            oo.captcha = {
                maxPic: Tool.StrSlice(t, 'class="slider-img-bg" src="', '"'),//大图base64
                minPic: Tool.StrSlice(t, 'class="slider-item" src="', '"')//小图base64
            }
            $("#captchaImg").append('<img src="' + oo.captcha.maxPic + '" border="1" class="m-1">')
            $("#captchaImg").append('<img src="' + oo.captcha.minPic + '" border="1" class="m-1">')
            $("#state").html("获取小图的颜色信息.....");
            Tool.getImageData.a01(oo.captcha.minPic, this.d02, this, oo)//获取图片颜色信息（注：src图片可以是Base64,目的是为个改变图片大小）
        },
        d02: function (imgData, oo) {
            $("#state").html("获取小图的上和下。。。");
            let minPicArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            let y = this.b01(minPicArr);//找第一个【非透明点】的top位置
            let height = this.b02(minPicArr) - y;//最后个【非透明点】的top位置
            oo.captcha.tmp = {
                y: y,
                height: height
            }
            this.d03(oo)
        },
        d03: function (oo) {
            $("#state").html("正在剪数据库大图并返回【Base64】。");
            Tool.getImageBase64(oo.captcha.maxPic,
                0,
                oo.captcha.tmp.y,
                320,
                oo.captcha.tmp.height,
                this.d04, this, oo);
        },
        d04: function (base64, oo) {
            $("#captchaImg").append('<img src="' + base64 + '" border="1" class="m-1">')
            $("#state").html("获取切完大图的颜色信息.....");
            Tool.getImageData.a01(base64, this.d05, this, oo);
        },
        d05: function (imgData, oo) {
            oo.captcha.tmp.maxPicArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            /////////////////////////////////////////////
            $("#state").html("正在剪小图并返回【Base64】。");
            Tool.getImageBase64(oo.captcha.minPic,
                0,
                oo.captcha.tmp.y,
                60,
                oo.captcha.tmp.height,
                this.d06, this, oo)
        },
        d06: function (base64, oo) {
            $("#captchaImg").append('<img src="' + base64 + '" border="1" class="m-1">')
            Tool.getImageData.a01(base64, this.d07, this, oo)
        },
        d07: function (imgData, oo) {
            //思路：因为边框的颜色都是一样的，所以误差最小，那就是验证码的位置
            let minPicArr = Tool.ImgToTwoArr(imgData);//把图片颜色信息，转的二维位置数组
            let maxPicArr = oo.captcha.tmp.maxPicArr;
            let len = maxPicArr[0].length - minPicArr[0].length;
            let CountArr = [];
            $("#state").html('找最黑的小图。。。')
            for (let i = 80; i < len; i++) {
                //i为什么从80开始，因为验证码在大图4/3的位置，所以可以从80（320/4=80）开始找。
                CountArr.push(this.b04(i, maxPicArr, minPicArr) + "-" + i);
            }
            CountArr.sort();//这个排序很重要
            this.d08(CountArr, maxPicArr, minPicArr, oo)
        },
        d08: function (arr, maxPicArr, minPicArr, oo) {
            $("#state").html('取出俩个黑的小图位置。。。')
            let left1 = parseInt(arr[0].split("-")[1]), left2 = 0;
            for (let i = 1; i < arr.length; i++) {
                let num = parseInt(arr[i].split("-")[1])
                if (Math.abs(num - left1) > 40) {
                    left2 = num;
                    break;
                }
            }
            ////////////////////////////////////////
            let num1 = this.b03(left1, maxPicArr, minPicArr);//和计外边框颜色值。（因为如果能拼好，那外边框的黑色，会比较少，那就是验证码的位置。）
            let num2 = this.b03(left2, maxPicArr, minPicArr);//和计外边框颜色值。（因为如果能拼好，那外边框的黑色，会比较少，那就是验证码的位置。）
            let left3 = num1 > num2 ? left1 : left2//取最大（黑色RGB:[0,0,0]）
            //////////////////////////////////////////////////////
            $("#captchaImg").append('<img src="' + Tool.delMinImg(left3, maxPicArr, minPicArr) + '" border="1" class="m-1"><br/>');
            let left = (left3 * 272) / 320//公式：left3/320=oo.left/272（说明：拼多多，自已把图片缩小了。）
            if (oo.isRD) {
                this.f01(left, oo);
            }
            else {
                this.e01(left, oo);
            }
        },
        ///////////////////////////////////
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
        //和计边框颜色值。（因为如果能拼好，那边框的黑色，会比较少，那就是验证码的位置。）
        b03: function (num, maxPicArr, minPicArr) {
            let r = 0, g = 0, b = 0
            for (let i = 1; i < minPicArr.length - 1; i++) {
                for (let j = 1; j < minPicArr[0].length - 1; j++) {
                    if (minPicArr[i][j][0] == 0 && minPicArr[i][j][1] == 0 && minPicArr[i][j][2] == 0) {//透明点位置
                        //取外边框
                        if (minPicArr[i - 1][j][0] + minPicArr[i - 1][j][1] + minPicArr[i - 1][j][2] != 0 ||//上一列为非透明---取右外边框
                            minPicArr[i][j - 1][0] + minPicArr[i][j - 1][1] + minPicArr[i][j - 1][2] != 0 ||//上一行为非透明---取下外边框
                            minPicArr[i + 1][j][0] + minPicArr[i + 1][j][1] + minPicArr[i + 1][j][2] != 0 ||//下一列为非透明---取左外边框
                            minPicArr[i][j + 1][0] + minPicArr[i][j + 1][1] + minPicArr[i][j + 1][2] != 0 //下一行为非透明---取上外边框
                        ) {
                            r += maxPicArr[i][j + num][0]
                            g += maxPicArr[i][j + num][1]
                            b += maxPicArr[i][j + num][2]
                        }
                    }
                }
            }
            return (r + g + b);
        },
        //计算小图在大图中的RGB之后。
        b04: function (num, maxPicArr, minPicArr) {
            let r = 0, g = 0, b = 0
            for (let i = 0; i < minPicArr.length; i++) {
                for (let j = 0; j < minPicArr[0].length; j++) {
                    if (minPicArr[i][j][0] != 0 && minPicArr[i][j][1] != 0 && minPicArr[i][j][2] != 0) {//非透明位置
                        r += maxPicArr[i][j + num][0]
                        g += maxPicArr[i][j + num][1]
                        b += maxPicArr[i][j + num][2]
                    }
                }
            }
            return (r + g + b);
        },
        e01: function (left, oo) {
            $("#state").html("正在刷新验证码。。。");
            gg.tabs_executeScript_indexOf(2, "", ";fun.a01(" + left + ")", '没有出现验证码，验证通过。<1/>验证失败，要重新来。',true, this.e02, this, oo);
        },
        e02: function (t, oo) {
            if (t[0].indexOf("验证失败，要重新来。") != -1) {
                oo.isRD = true;
                this.d01(t[0], oo)
            }
            else if (t[0].indexOf("没有出现验证码，验证通过。") != -1) {
                oo.next.apply(oo.This, [oo.t]);
            }
            else {
                Tool.at("ffffffffffffff")
            }
        },
        //e03: function (oo) {
        //    oo.errCount++
        //    if (oo.errCount == 5) {
        //        $("#state").html("搜索同一个图片，连续" + oo.errCount + "次验证出错，就更换账号。");
        //        Tool.ChangeAccount.a01(oo.headers, this.e04, this, oo)
        //    }
        //    else {
        //        $("#state").html("搜索同一个图片，连续" + oo.errCount + "次验证出错，延时1秒后继续。")
        //        Tool.Time("name", 1000, this.a02, this, oo);
        //    }
        //},
        //e04: function (oo) {
        //    Tool.pre(["已更换账号", oo])
        //}
        ////////RENDIE软件来滑动///////////////////////////////
        f01: function (left, oo) {
            $("#state").html("正在获取位置。。。");
            gg.tabs_executeScript_indexOf(2, "", "fun.g01(" + left + ")", '位置为：',true, this.f02, this, oo);
        },
        f02: function (t, oo) {
            let str = Tool.StrSlice(t[0], "位置为：", "</title>")
            let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=\'' + str + '\' where @.js=\'拼多多滑块验证.js\'</r:>'
            Tool.ajax.a01(txt, 1, this.f03, this, oo);
        },
        f03: function (t, oo) {
            if (t == "ok") {
                oo.num = 0;//计数
                this.f04(oo)
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        f04: function (oo) {
            let str = '\
		    {\
                <r:action db="sqlite.tool" size=1 where=" where @.js=\'拼多多滑块验证.js\'">\
	                "code":<:code tag=0/>\
                </r:action>\
            }'
            Tool.ajax.a01(str, 1, this.f05, this, oo)
        },
        f05: function (t, oo) {
            if (t.code == 0) {
                $("#state").html("没数据，说明被软件处理了,还要看一下，软件是否验证成功。")
                gg.tabs_executeScript_indexOf(2, "", "fun.h01()", '没有出现验证码，验证通过。<1/>验证失败，要重新来。',true, this.e02, this, oo);
            }
            else {
                oo.num++;
                $("#state").html("等待RenDie软件【" + oo.num + "】秒。。。");
                Tool.Time("name", 1000, this.f04, this, oo)
            }
        },
        /////////////////////////////////////////
        g01: function (oo) {
            let txt = '"ok"<r: db="sqlite.tool">update @.action set @.code=\'"等待RenDie软件来操作出现验证码。"\' where @.js=\'拼多多滑块验证.js\'</r:>'
            Tool.ajax.a01(txt, 1, this.g02, this, oo);
        },
        g02: function (t, oo) {
            if (t == "ok") {
                oo.num = 0;//计数
                this.g03(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        g03: function (oo) {
            let str = '\
		    {\
                <r:action db="sqlite.tool" size=1 where=" where @.js=\'拼多多滑块验证.js\'">\
	                "code":<:code tag=0/>\
                </r:action>\
            }'
            Tool.ajax.a01(str, 1, this.g04, this, oo)
        },
        g04: function (t, oo) {
            if (t.code == 0) {
                $("#state").html("没数据，说明被软件处理了。")
                gg.tabs_executeScript_indexOf(2, "", "fun.i01()", '还有有验证码，验证失败。<1/>没有有验证码，验证成功。',true, this.g05, this, oo);
            }
            else {
                oo.num++;
                $("#state").html("等待RenDie软件【" + oo.num + "】秒。。。");
                Tool.Time("name", 1000, this.g03, this, oo);
            }
        },
        g05: function (t, oo) {
            if (t[0].indexOf("还有有验证码，验证失败。") != -1) {
                this.d01(t[0], oo);
            }
            else if (t[0].indexOf("没有有验证码，验证成功。") != -1) {
                oo.next.apply(oo.This, [oo.t]);
            }
            else {
                alert("到不了，这里。。。。")
            }
        },
    },
})