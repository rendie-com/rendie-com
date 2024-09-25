Object.assign(Tool, {
    searchImg: {
        a01: function (picObj, dom1, dom2, next, This, t) {
            let oo = {
                picObj: picObj,
                dom1: dom1,
                dom2: dom2,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            oo.num = 5//超时次数
            let fileurl = "https://image.dhgate.com/" + oo.picObj.picB.fileurl;
            oo.dom1.append('<a href="' + fileurl + '" target="_blank"><img src="' + fileurl + '" class="img-fluid rounded m-1" style="height: 100px;"></a>')
            $("#state").html("正在获取图片Base64...");
            Tool.setImageWH.a01(fileurl, true,800, 800, "png", this.a03, this, oo);
        },
        a03: function (base64, oo) {
            let url = "https://api.keyouyun.com/tui/api/cps/pic/async/search?size=20&page=0";
            let data = {
                platformCode: "1",
                picContent: base64.split("base64,")[1],
                url: base64
            }
            let arr = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                }
            ]
            $("#state").html("正在上传图片...");
            gg.setHeaders_postHtml(url, arr, JSON.stringify(data), this.a04, this, oo);
        },
        a04: function (t, oo) {
            if (t.msg === null) {
                oo.picObj.picA.taobao = {
                    taskId: t.taskId
                }//更新时要用
                $("#state").html("延时500毫秒。");
                oo.dom2.append(t.taskId + "</br>")
                Tool.Time("name", 500, this.d01, this, oo);
            }
            else if (t.status == "error" && t.code == 400) {
                oo.picObj.picA.taobao = {
                    taskId: false//因为上传图片失败，所以用“false”
                }//更新时要用
                this.d05("ok", oo)

            }
            else {
                Tool.pre(["出错", t])
            }
        },
        /////////////////////////////////////////////////////////////
        d01: function (oo) {
            let url = "https://api.keyouyun.com/tui/api/cps/pic/async/search/task?taskId=" + oo.picObj.picA.taobao.taskId
            $("#state").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.d02, this, oo)
        },
        d02: function (t, oo) {
            if (t.msg == null && t.data != null) {
                this.d03(t.data, oo)
            }
            else if (t.data == null) {
                if (oo.num == 0) {
                    if (t.msg == "The specified pixels is not supported, plesae retry after replacement") {
                        //不支持指定的像素，请在替换后重试
                        this.d05("ok", oo)
                    }
                    else {
                        $("#state").html("从新来上传图片。");
                        this.a02(oo)
                    }
                }
                else {
                    $("#state").html("【" + oo.num + "】延时1秒，再来。");
                    oo.num--;
                    Tool.Time("name", 1000, this.d01, this, oo);
                }
            }
            else {
                Tool.pre(["搜图出错", t])
            }
        },
        d03: function (arr, oo) {
            let len = arr.length < 5 ? arr.length : 5;
            let newArr = [], idArr = [];
            for (let i = 0; i < len; i++) {
                ////////////////////////////////////
                arr[i].itemId = arr[i].itemId.split("-")[1]
                let valL = [
                    "@.addtime",//添加时间
                    "@.itemId",//商品ID(如：nODM6D4cof38MO3anKsmVQc0tP-BxwXY4IgwwRJOxJuz)
                    "@.shortTitle",//短标题(如：mo cercoo莫奈花园小径系列复古耳环)
                    "@.categoryName",//类目名(如：耳环)
                    "@.levelOneCategoryName",//类型名(如：饰品/流行首饰/时尚饰品新)
                    "@.shopTitle",//店名(如：cercoo奢蔻饰品旗舰店)
                    "@.picUrl",//图片地址(如：//img.alicdn.com/i2/3990918216/O1CN0116X3d22AYyta4xtcS_!!0-item_pic.jpg)
                    "@.provcity",//发货地(如：广东 深圳)
                    "@.reservePrice",//原价（如：296.00）
                    "@.sellerId",//店铺ID(如：3990918216)
                    "@.title",//标题(如：Mo&Cercoo莫奈花园小径系列复古流苏耳环s925银长款气质耳坠女款)
                    "@.url",//详情URL(如：https://api.keyouyun.com/tui/api/huo/item?u=Ly9zLmNsaWNrLnRhb2Jhby5jb20vdD9lPW0lM0QyJTI2cyUzRGFoMGp4MEYzT3o5dzR2RkI2dDJaMnVlRURyWVZWYTY0ZkNuRWtZSFUlMkIydHlJTnRrVWhzdjBCeGNFbWhreWh1MWpUajRLSzV0SElPUmJxVlF4OGdoamtpT3B0dWVXRjZHNEMzV1hlWiUyRjZrV0RKUklsMEJSSSUyRk1MbVFvSlFVV24wa2JBSiUyQjMwMFViTjFXWVVxT1V5M25laWU3NW9WUENPbzQlMkJ5TFJQRVo3RjczVWpkWGtLZGZjR3IzbW1lWUZXbjMydSUyRnphdUtrZlJNdXZkS3pXbnZVVlkydE54VUkzT3Z3RWlNJTJGbFNHJTJGYlpUaW1EWGQ0MnVtdkVPRGczWlEzUFdGeGlYdkRmOERhUnMlM0QmdW5pb25fbGVucz1sZW5zSWQlM0FPUFQlNDAxNzA3NTczMDU1JTQwMjEzM2NmZTFfMGRhM18xOGQ5MzQ5MGZlMF9iMDMwJTQwMDElNDBleUptYkc5dmNrbGtJam8yT1RNME9IMGll)
                    "@.priceAfterCoupon"//优惠券后的价格（如：5.86）
                ]
                /////////////////////////////////////
               let valR = [
                    Tool.gettime(""),//添加时间
                    Tool.rpsql(arr[i].itemId),//商品ID(如：nODM6D4cof38MO3anKsmVQc0tP-BxwXY4IgwwRJOxJuz)
                    Tool.rpsql(arr[i].shortTitle),//短标题(如：mo cercoo莫奈花园小径系列复古耳环)
                    Tool.rpsql(arr[i].categoryName),//类目名(如：耳环)
                    Tool.rpsql(arr[i].levelOneCategoryName),//类型名(如：饰品/流行首饰/时尚饰品新)
                    Tool.rpsql(arr[i].shopTitle),//店名(如：cercoo奢蔻饰品旗舰店)
                    Tool.rpsql(arr[i].picUrl),//图片地址(如：//img.alicdn.com/i2/3990918216/O1CN0116X3d22AYyta4xtcS_!!0-item_pic.jpg)
                    Tool.rpsql(arr[i].provcity),//发货地(如：广东 深圳)
                    arr[i].reservePrice,//原价（如：296.00）
                    arr[i].sellerId,//店铺ID(如：3990918216)
                    Tool.rpsql(arr[i].title),//标题(如：Mo&Cercoo莫奈花园小径系列复古流苏耳环s925银长款气质耳坠女款)
                    Tool.rpsql(new Base64().decode(arr[i].url.split('item?u=')[1])),//详情URL(如：https://api.keyouyun.com/tui/api/huo/item?u=Ly9zLmNsaWNrLnRhb2Jhby5jb20vdD9lPW0lM0QyJTI2cyUzRGFoMGp4MEYzT3o5dzR2RkI2dDJaMnVlRURyWVZWYTY0ZkNuRWtZSFUlMkIydHlJTnRrVWhzdjBCeGNFbWhreWh1MWpUajRLSzV0SElPUmJxVlF4OGdoamtpT3B0dWVXRjZHNEMzV1hlWiUyRjZrV0RKUklsMEJSSSUyRk1MbVFvSlFVV24wa2JBSiUyQjMwMFViTjFXWVVxT1V5M25laWU3NW9WUENPbzQlMkJ5TFJQRVo3RjczVWpkWGtLZGZjR3IzbW1lWUZXbjMydSUyRnphdUtrZlJNdXZkS3pXbnZVVlkydE54VUkzT3Z3RWlNJTJGbFNHJTJGYlpUaW1EWGQ0MnVtdkVPRGczWlEzUFdGeGlYdkRmOERhUnMlM0QmdW5pb25fbGVucz1sZW5zSWQlM0FPUFQlNDAxNzA3NTczMDU1JTQwMjEzM2NmZTFfMGRhM18xOGQ5MzQ5MGZlMF9iMDMwJTQwMDElNDBleUptYkc5dmNrbGtJam8yT1RNME9IMGll)
                    arr[i].priceAfterCoupon//优惠券后的价格（如：5.86）
                ]
                ////////////////////////////////////
                newArr.push('\
                <if "Fun(Db(sqlite.taobao,select count(1) from @.proList where @.itemId=\'' + arr[i].itemId + '\',count))"=="0">\
                    <r: db="sqlite.taobao">insert into @.proList('+ valL.join(",") + ')values(' + valR.join(",") + ')</r:>\
                </if>')
                ////////////////////////////////////
                idArr.push(arr[i].itemId)
            }
            oo.picObj.picA.taobao.idArr = idArr;//更新时要用
            this.d04(newArr, oo);
        },
        d04: function (newArr, oo) {
            $("#state").html("正在更新数据...");
            Tool.ajax.a01('"ok"' + newArr.join(""), 1, this.d05, this, oo)
        },
        d05: function (t, oo) {
            if (t == "ok") {
                $("#state").html("完");
                Tool.apply(oo.picObj, oo.next, oo.This, oo.t);
            }
            else {
                $("#state").html("如果有俩个SQL语句同时运行，就出这个错。");
                //Tool.pre(["更新出错001：", t])
                Tool.Time("name", 100, this.d01, this, oo);
            }
        },
    },
})