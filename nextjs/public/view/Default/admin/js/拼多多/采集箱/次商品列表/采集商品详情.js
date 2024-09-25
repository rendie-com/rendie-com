'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0,
        headers: [],
        headersNum: 0//如果连续俩次要验证，那就从重给【"Anti-Content"】
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("拼多多 &gt; 采集箱 &gt; 采集商品详情。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">账号循环进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02A, this, html);
    },
    a02A: function () {
        gg.isRD(this.a02, this)
    },
    a02: function () {
        //obj.arr[4]    返回URL
        let day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 20) / 1000)
        let str = '\
        {\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
            <r:goodsList size=1 page=2 db="sqlite.pinduoduo" where=" where @.uptime<'+ day20 + '">,\
		        "uptime":<:uptime/>,\
		        "goodsId":<:goodsId/>\
            </r:goodsList>\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a03, this);
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo);
    },
    a04: function (oo) {
        let url = "https://pifa.pinduoduo.com/goods/detail/?gid=" + oo.goodsId
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        //////////////////////////////////////
            this.d01(oo);
        /*
        if (this.obj.headers.length == 0) {
        }
        else {
            $("#state").html('有headers');
            this.a05("", oo);
        }
        */
        //////////////////////////////////////
    },
    a05: function (t, oo) {
        $("#state").html("正在获取详情...");
        let headers = [
            {
                "name": "Origin",
                "value": "https://pifa.pinduoduo.com"
            },
            {
                "name": "Referer",
                "value": "https://pifa.pinduoduo.com/goods/detail/?gid=" + oo.goodsId
            },
            {
                "name": "Content-Type",
                "value": 'application/json'
            }
        ];
        this.obj.headers = this.obj.headers.concat(headers);
        gg.setHeaders_postHtml("https://pifa.pinduoduo.com/pifa/goods/queryGoodsDetail", this.obj.headers, '{"goodsId":"' + oo.goodsId + '"}', this.a06, this, oo);
    },
    a06: function (t, oo) {
        if (t.success) {
            this.obj.headersNum = 0;
            this.a07(t.result);
        }
        else {
            this.e01(t, oo);
        }
    },
    a07: function (oo) {
        $("#state").html("正在更新数据...");
        let str2 = '<r: db="sqlite.pinduoduo">update @.goodsList set @.uptime=' + Tool.gettime("") + ' where @.goodsId=' + oo.goodsId + '</r:>'
        let str = '\
        <if "Fun(Db(sqlite.pinduoduo_prodes/'+ Tool.remainder(oo.goodsId, 10) + ',select count(1) from @.prodes where @.goodsId=' + oo.goodsId + ',count))"=="0">\
            <r: db="sqlite.pinduoduo_prodes/'+ Tool.remainder(oo.goodsId, 10) + '">insert into @.prodes(@.goodsId,@.goodsCarouselInfos,@.addtime,@.goodsSkuInfos)values(' + oo.goodsId + ',' + Tool.rpsql(JSON.stringify(oo.goodsCarouselInfos)) + ',' + Tool.gettime("") + ',' + Tool.rpsql(JSON.stringify(oo.goodsSkuInfos)) + ')</r:>\
        </if>';
        Tool.ajax.a01('"ok"' + str2 + str, 1, this.a08, this, oo)
    },
    a08: function (t, oo) {
        if (t == "ok") {
            $("#state").html("等0.1秒后，再下一条...");
            Tool.Time("name", 100, this.a09, this)
        }
        else {
            Tool.Time("name", 100, this.a07, this, oo)
            //Tool.pre(["更新出错01：", t]);
        }
    },
    a09: function (t) {
        this.obj.A1++;
        //Tool.open(5, this.obj.A1);
        this.a02();
    },
    ///////////////////////////////////////
    d01: function (oo) {
        this.obj.headersNum++;
        gg.tabs_remove_create_getHeaders(2, "https://pifa.pinduoduo.com/goods/detail/?gid=" + oo.goodsId, ["https://pifa.pinduoduo.com/pifa/goods/queryGoodsDetail"],true, this.d02, this, oo)
    },
    d02: function (t, oo) {
        t = t.requestHeaders
        let headers = []
        for (let i = 0; i < t.length; i++) {
            if (t[i].name == "Anti-Content") {
                headers.push(t[i]);
                break;
            }
        }
        this.obj.headers = headers;
        this.d03(oo)
    },
    d03: function (oo) {
        gg.highlightTab(1, this.a05, this, oo);
    },
    //////////////////////////////////////
    e01: function (t, oo) {
        if (t.errorMsg == "很抱歉，此商品不存在" || t.errorMsg == "该商品已售罄") {
            this.e02(1, t.errorMsg, oo.goodsId);
        }
        else if (t.code == 400 || t.code === 0) {
            $("#state").html("参数不合法，重试一次就可以了。");
            Tool.Time("name", 100, this.a02, this)
        }
        else if (t.code == 429) {
            $("#state").html("操作太过频繁，请稍后再试！");
            //this.f01();
        }
        else if (t.error_code == 54001) {
            if (this.obj.headersNum == 2) {//如果连续俩次要验证，那就从重给【"Anti-Content"】
                $("#state").html("上传图片出现54001错误，表示要验证。。。");
                let url = "https://pifa.pinduoduo.com/goods/detail/?gid=" + oo.goodsId
                Tool.captcha.a01(url, this.obj.headers, this.d01, this, oo);
                this.d01(oo);
            }
            else {
                $("#state").html("再来一次。。。");
                this.a05("", oo);
            }            
        }
        else {
            Tool.pre(["出错", t]);
        }
    },
    e02: function (state, errorMsg, goodsId) {
        let str1 = 'update @.goodsList set @.state=' + state + ',@.errorMsg=' + Tool.rpsql(errorMsg) + ',@.uptime=' + Tool.gettime("") + ' where @.goodsId=' + goodsId
        let str2 = '<r: db="sqlite.pinduoduo">' + str1 + '</r:>';
        Tool.ajax.a01('"ok"' + str2, 1, this.a08, this);
    },
    ////////////////////////////////////
    f01: function () {
        let str = '{\
        <r:seller db="sqlite.pinduoduo" size=1 page=2 where=" where @.hide=0">\
            "pifauser":"<:pifauser tag=js/>",\
            "username":"<:username tag=js/>",\
            "password":"<:password tag=js/>",\
            "cookies":<:cookies tag=0/>,\
        </r:seller>\
        "B2":<@page/>\
        }'
        Tool.ajax.a01(str, this.obj.B1, this.f02, this)
    },
    f02: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo.B2; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.f03, this, this.f05, oo);
    },
    f03: function (oo) {
        Tool.loginPinduoduo.a01(oo.username, oo.password, oo.cookies, oo.pifauser, $("#state"), this.f04, this);
    },
    f04: function (oo) {
        this.obj.B1++;
        this.a02();
    },
    f05: function (oo) {
        this.f06(60 * 3)
    },
    f06: function (num) {
        $("#state").html("延时" + num + "秒，再来。因为账号已经试完了！");
        Tool.Time("name", 1000, this.f07, this, num)
    },
    f07: function (num) {
        num--
        if (num == 0) {
            this.obj.B1 = 1;
            this.a02();
        }
        else {
            this.f06(num);
        }
    },
}
fun.a01();