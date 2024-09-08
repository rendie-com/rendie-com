Object.assign(Tool, {
    searchImg: {
        obj: {
            headers: [],
        },
        a01: function (picObj, dom1, dom2, next, This, t) {
            let oo = {
                picObj: picObj,
                dom1: dom1,
                dom2: dom2,
                next: next,
                This: This,
                t: t,
                num: 0//计数。如果有多次同时报这个错误，就一定是有验证码的。
            }
            if (this.obj.headers.length == 0) {
                this.a02(oo)
            }
            else {
                $("#state").html('有headers');
                this.a05("", oo)
            }
        },
        a02: function (oo) {
            gg.tabs_remove_create_getHeaders(2, "https://pifa.pinduoduo.com/", ["https://pifa.pinduoduo.com/pifa/search/queryHotWords"],true, this.a03, this, oo)
        },
        a03: function (t, oo) {
            t = t.requestHeaders
            let headers = []
            for (let i = 0; i < t.length; i++) {
                if (t[i].name == "Anti-Content") {
                    headers.push(t[i]);
                }
            }
            this.obj.headers = headers;
            this.a04(oo)
        },
        a04: function (oo) {
            gg.highlightTab(1, this.a05, this, oo)
        },
        a05: function (t, oo) {
            let fileurl = "https://image.dhgate.com/" + oo.picObj.picB.fileurl;
            $("#state").html('上传前图片打不开。。。<a href="' + fileurl + '" target="_blank">' + fileurl + '</a>');
            Tool.imgToPng(fileurl, 1000, this.a06, this, oo)
        },
        a06: function (pic, oo) {
            if (pic) {
                $("#state").html('<a href="' + pic + '" target="_blank">' + pic + '</a>')
                this.d01(pic, oo)
            }
            else {
                $("#state").html("敦煌的图片也打不开，程序终止。。。");
                //Tool.pre(pic)
            }
        },
        //////////////////////////////
        b01: function (salesTipAmount) {
            let pAmount = 0;
            if (salesTipAmount.lastIndexOf("万") != -1) {
                pAmount = parseInt(salesTipAmount.split("万")[0]) * 10000
            }
            else if (salesTipAmount.lastIndexOf("+") != -1) {
                pAmount = parseInt(salesTipAmount.split("+")[0])
            }
            else if (salesTipAmount == "") {
                pAmount = 0;
            }
            else {
                pAmount = salesTipAmount
            }
            return pAmount;
        },
        /////////////////////////////////////////////////////////
        d01: function (pic, oo) {
            oo.dom1.append('<a href="' + pic + '" target="_blank"><img src="' + pic + '" class="img-fluid rounded m-1" style="height: 100px;"></a>')
            $("#state").html("正在上传图片...");
            let data = [{
                name: "file",
                value: "（二进制）" + pic,
                fileName: pic.substring(pic.lastIndexOf("/"))
            }]
            //this.obj.headers.concat([
            //    {
            //        "name": "Origin",
            //        "value": "https://pifa.pinduoduo.com"
            //    },
            //    {
            //        "name": "Referer",
            //        "value": "https://pifa.pinduoduo.com"
            //    },
            //    {
            //        "name": "Cache-Control",
            //        "value": "max-age=0"
            //    }])
            gg.uploadFile("https://pifa.pinduoduo.com/mille/slow/upload/uploadSearchImage", this.obj.headers, data, this.d02, this, oo)
        },
        d02: function (t, oo) {
            if (t.result && t.success) {
                let pic = t.result.imageUrl;
                oo.picObj.picA.pinduoduo = { pic: pic }//更新时要用
                $("#state").html("上传后图片...");
                oo.dom2.append('<a href="' + pic + '" target="_blank"><img src="' + pic + '" class="img-fluid rounded m-1" style="height: 100px;"></a>')
                this.d04(pic, oo);
            }
            else if (t.errorCode == 1000000) {
                this.a02(oo);
            }
            else if (t.error_code == 54001) {
                $("#state").html("上传图片出现54001错误...延时1秒后继续");
                Tool.Time("name", 1000, this.d03, this, oo);
            }
            else if (t.error) {
                if (t.error.indexOf("操作太过频繁，请稍后再试！") != -1) {
                    $("#state").html("操作太过频繁，请稍后再试！...");
                    Tool.ChangeAccount.a01(this.obj.headers, this.a02, this, oo);//更换卖家账号
                }
                else {
                    Tool.pre(["上传图片出错02：", t])
                }
            }
            else if (t.status == 0) {
                this.a02(oo);
            }
            else {
                Tool.pre(["上传图片出错01：", t])
            }
        },
        d03: function (oo) {
            oo.num++;
            if (oo.num == 2) {
                oo.num = 0;
                $("#state").html("俩次都进来了，说明是有验证码。");
                let url2 = "https://pifa.pinduoduo.com/search?imgUrl=" + encodeURIComponent("https://img.pddugc.com/mille-pifa-photo-search/search/2024-01-30/searchProcess-d8b0ca5a-230f-4bfb-ae6e-2952e21f5452")
                $("#captchaLink").html('<a href="' + url2 + '" target="_blank">' + url2 + '</a>')
                Tool.captcha.a01(url2, this.obj.headers, this.a02, this, oo)
            }
            else {
                this.a02(oo);
            }
        },
        d04: function (pic, oo) {
            let url = "https://pifa.pinduoduo.com/pifa/search/searchImageGoods"
            let data = {
                "page": 1,
                "size": 20,
                "sort": 0,
                "optId": 0,
                "level": 1,
                "url": pic,
                "propertyItems": []
            }
            let arr1 = [
                {
                    "name": "Origin",
                    "value": "https://pifa.pinduoduo.com"
                },
                {
                    "name": "Referer",
                    "value": "https://pifa.pinduoduo.com"
                },
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
                {
                    "name": "Cache-Control",
                    "value": "max-age=0"
                }
            ]
            let url2 = "https://pifa.pinduoduo.com/search?imgUrl=" + encodeURIComponent(pic)
            $("#captchaLink").html('<a href="' + url2 + '" target="_blank">' + url2 + '</a>')
            gg.setHeaders_postHtml(url, this.obj.headers.concat(arr1), JSON.stringify(data), this.d05, this, oo)
        },
        d05: function (t, oo) {
            if (t.success) {
                if (t.result) {
                    let arr = t.result.goodsList
                    oo.num = 0;//成功了就复位
                    this.e01(arr, oo)
                }
                else {
                    $("#state").html("没搜出一条数据");
                    this.e03("", oo)
                }
            }
            else if (t.error == 54001 || t.error_code == 54001) {
                $("#state").html("搜货源时出现54001错误...延时1秒后继续");
                Tool.Time("name", 1000, this.d03, this, oo);
            }
            else if (t.error) {
                $("#state").html("出错002：" + t.error);
                if (t.error.indexOf("操作太过频繁，请稍后再试！") != -1) {
                    Tool.ChangeAccount.a01(this.obj.headers, this.a02, this, oo)//更换卖家账号
                }
                else {
                    Tool.pre(["出错005:", t])
                    //Tool.Time("name", 1000*10, this.d03, this, oo);
                }
            }
            else {
                Tool.pre(["搜图出错", t])
            }
        },
        ////////////////////////////////////
        e01: function (arr, oo) {
            let len = arr.length < 5 ? arr.length : 5;
            let newArr = [], goodsIdArr = [];
            for (let i = 0; i < len; i++) {
                let valL = [
                    "@.addtime",//添加时间
                    "@.goodsId",//详情ID（打开详情要用的ID，如：2744026324）
                    "@.goodsName",//标题（如：年年有鱼招财汽车钥匙扣女精致可爱韩创意包挂件钥匙链圈礼品批发【6天内发货】）
                    "@.goodsImgUrl",//图片地址（如：https://img.pddpic.com/mms-material-img/2022-02-08/ee596ee3-46a0-4e26-b7fb-32f42d3b777d.jpeg）
                    "@.salesTipAmount",//已售1432件（如：1432 、100万）
                    "@.goodsStagePrices",//价格组（包括起批量和价格）
                    "@.minDiscount",//9.5折（如：95）
                    "@.mallName",//店铺名（如：朵朵创意饰品）
                    "@.mallGoodsRegion"//发货地（如：广东深圳）
                ]
                let valR = [
                    Tool.gettime(""),//添加时间
                    arr[i].goodsId,//详情ID（打开详情要用的ID，如：2744026324）
                    Tool.rpsql(arr[i].goodsName),//标题（如：年年有鱼招财汽车钥匙扣女精致可爱韩创意包挂件钥匙链圈礼品批发【6天内发货】）
                    Tool.rpsql(arr[i].goodsImgUrl),//图片地址（如：https://img.pddpic.com/mms-material-img/2022-02-08/ee596ee3-46a0-4e26-b7fb-32f42d3b777d.jpeg）
                    this.b01(arr[i].salesTipAmount),//已售1432件（如：1432）
                    Tool.rpsql(JSON.stringify(arr[i].goodsStagePrices)),//价格组（包括起批量和价格）
                    arr[i].minDiscount,//9.5折（如：95）
                    Tool.rpsql(arr[i].mallName),//店铺名（如：朵朵创意饰品）
                    Tool.rpsql(arr[i].mallGoodsRegion)//发货地（如：广东深圳）
                ]
                newArr.push('\
                <if "Fun(Db(sqlite.pinduoduo,select count(1) from @.goodsList where @.goodsId=' + arr[i].goodsId + ',count))"=="0">\
                    <r: db="sqlite.pinduoduo">insert into @.goodsList('+ valL.join(",") + ') values(' + valR.join(",") + ')</r:>\
                </if>')
                ///////////////////////////////
                goodsIdArr.push(arr[i].goodsId)
            }
            oo.picObj.picA.pinduoduo.goodsIdArr = goodsIdArr;//更新时要用
            this.e02(newArr, oo)
        },
        e02: function (newArr, oo) {
            $("#state").html("正在更新数据...");
            Tool.ajax.a01('"ok"' + newArr.join(""), 1, this.e03, this, oo)
        },
        e03: function (t, oo) {
            if (t == "ok") {
                $("#state").html("完");
                Tool.apply(oo.picObj, oo.next, oo.This, oo.t);
            }
            else {
                $("#state").html("如果有俩个SQL语句同时运行，就出这个错。");
                this.a02(oo)
                //Tool.pre(["更新出错001：",t])
            }
        },
    },
    ChangeAccount: {
        a01: function (headers, next, This, t) {
            let url = "https://pifa.pinduoduo.com/pifa/user/queryUserInfo";
            let arr1 = [
                {
                    "name": "Origin",
                    "value": "https://pifa.pinduoduo.com"
                },
                {
                    "name": "Referer",
                    "value": "https://pifa.pinduoduo.com"
                },
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
                {
                    "name": "Cache-Control",
                    "value": "max-age=0"
                }
            ]
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.setHeaders_postHtml(url, headers.concat(arr1), "{}", this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (t.success) {
                this.a03(t.result.userName, oo)
            }
            else {
                Tool.pre(["出错001：", t])
            }
        },
        a03: function (userName, oo) {
            let str = '\
            {\
                <r:seller db="sqlite.pinduoduo" size=1 where=" where @.userName<&gt;\''+ userName + '\'">\
                    "pifauser":"<:pifauser tag=js/>",\
                    "username":"<:username tag=js/>",\
                    "password":"<:password tag=js/>",\
                    "cookies":<:cookies tag=0/>\
                </r:seller>\
            }'
            Tool.ajax.a01(str, 1, this.a04, this, oo);
        },
        a04: function (t, oo) {
            Tool.loginPinduoduo.a01(t.username, t.password, t.cookies, t.pifauser, $("#state"), this.a05, this, oo)
        },
        a05: function (t, oo) {
            $("#state").html("已更换账号。。。");
            oo.next.apply(oo.This, [oo.t]);
        },
    }
})