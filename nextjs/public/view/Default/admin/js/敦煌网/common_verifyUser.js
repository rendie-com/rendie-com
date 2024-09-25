'use strict';
Object.assign(Tool, {
    verifyUser:
    {
        //输出：是否要打开新窗口
        a01: function (username, password, cookies, next, This, t) {
            let arr = [username, password, cookies, next, This, t]
            if (cookies == 0) {
                this.a02(arr)//去登录
            }
            else {
                this.d01(arr)
            }
        },
        a02: function (arr) {
            gg.delAllCookies(["https://dhgate.com/", "https://seller.dhgate.com/", "https://secure.dhgate.com/", "https://d1.dhgate.com/", "https://dhfinet.dhgate.com/dhfinetportal/assets/assetsTotal.do"], this.a03, this, arr)
        },
        a03: function (t, arr) {
            $("#state").html("开始登陆。");
            let url = "https://secure.dhgate.com/passport/login?service=http%3A%2F%2Fseller.dhgate.com%2Fmerchant%2Flogin%2Fssologin.do%3FreturnUrl%3DaHR0cDovL3NlbGxlci5kaGdhdGUuY29tL21lcmNoYW50L2xvZ2luL2xvZ2luc2lnbi5kbw..#hp-head-1";
            gg.tabs_remove_create_indexOf(2, url, '请拖动滑块完成拼图', false, this.a04, this, arr);
        },
        a04: function (t, arr) {
            Tool.ajax.text("/view/Default/admin/js/敦煌网/common_注入_登陆敦煌网.js", this.a05, this, arr);
        },
        a05: function (t, arr) {
            $("#state").html("正在填写账号密码,再点登陆。");
            let code = t + "\nrendie_fun.c01('" + arr[0] + "','" + arr[1] + "')"
            gg.tabs_executeScript_indexOf(2, null, code, 'geetest_freeze_wait" style="display: block;"', false, this.a06, this, arr);//正在填写账号密码,再点登陆
        },
        a06: function (t, arr) {
            let picArr = Tool.StrSplits(t, 'https://static.geetest.com/pictures/', '.png');
            let minPic = "https://static.geetest.com/pictures/" + picArr[0] + ".png";//小图
            let maxPic = "https://static.geetest.com/pictures/" + picArr[1] + ".png";//大图
            let top1 = Tool.StrSlice(t, 'geetest_window\"><div class=\"geetest_slice_', '"><div');
            let top2 = parseInt(Tool.StrSlice(top1, "top: ", "px"));//高度
            $("#state").html("计算geetest.com网站验证码的滑动位置。");
            Tool.geetest.a01(minPic, maxPic, top2, this.a07, this, arr)//计算geetest.com网站验证码的滑动位置
        },
        a07: function (oo, arr) {
            $("#state").html("...");
            if (oo == "需要刷新验证码") {               
                gg.tabs_executeScript_indexOf(2, null, "rendie_fun.d01()", '请拖动滑块完成拼图', false, this.a06, this, arr);
            }
            else {
                gg.tabs_executeScript_indexOf(2, null, "rendie_fun.a01(" + oo.location + ")", '<title> 我的摘要</title><1/>验证失败 请重新尝试</div>',true, this.a08, this, [oo, arr]);//请拖动滑块完成拼图
            }
        },
        a08: function (t, arr) {
            if (t[0].indexOf("验证失败 请重新尝试") != -1) {
                Tool.pre(["验证失败 请重新尝试：", arr[0]])
            }
            else {
                this.a09(arr[1])
            }
        },
        /////////////////////////////////////
        a09: function (arr) {
            let urlArr = ["https://dhgate.com/", "https://seller.dhgate.com/", "https://secure.dhgate.com/", "https://d1.dhgate.com/", "https://dhfinet.dhgate.com/dhfinetportal/assets/assetsTotal.do"]
            gg.getAllCookies(urlArr, this.a10, this, arr);
        },
        a10: function (t, arr) {
            let sql = 'update @.seller set @.cookies=' + Tool.rpsql(JSON.stringify(t)) + ' where @.username=' + Tool.rpsql(arr[0]) + ''
            let str = '"ok"<r: db="sqlite.dhgate">' + sql + '</r:>';
            Tool.ajax.a01(str, 1, this.a11, this, arr)
        },
        a11: function (t, arr) {
            if (t == "ok") {
                Tool.apply(false, arr[3], arr[4], arr[5]);
            }
            else {
                alert("出错")
            }
        },
        ///////////////////////////////////////
        d01: function (arr) {
            gg.delAllCookies(["https://dhgate.com/", "https://seller.dhgate.com/", "https://secure.dhgate.com/", "https://d1.dhgate.com/", "https://dhfinet.dhgate.com/dhfinetportal/assets/assetsTotal.do"], this.d02, this, arr)
        },
        d02: function (t, arr) {
            gg.setAllCookies(arr[2], this.d03, this, arr)
        },
        d03: function (t, arr) {
            $("#state").html("延时0.1少,再看是否登录。");
            //超时时间为10次
            this.d04(arr)
        },
        d04: function (arr) {
            Tool.Time("name", 500, this.d05, this, arr);
        },
        d05: function (arr) {
            let url = 'https://seller.dhgate.com/merchant/im/config.do?' + Math.random()
            gg.getFetch(url,"json", this.d06, this, arr);
        },
        d06: function (oo, arr) {
            if (typeof (oo) == "string") {
                $("#state").html("没有登录，等到超时去登录。");
                this.a02(arr);
            }
            else {
                $("#state").html("已经登陆。");
                if (oo.data.sellerName == arr[0].toLowerCase()) {
                    $("#state").html("可以跳出。")
                    Tool.apply(true, arr[3], arr[4], arr[5]);
                }
                else {
                    $("#state").html("账号不对,延时0.1秒后再找。。。")
                    //this.d04(arr);
                }
            }
        },
    }
})

