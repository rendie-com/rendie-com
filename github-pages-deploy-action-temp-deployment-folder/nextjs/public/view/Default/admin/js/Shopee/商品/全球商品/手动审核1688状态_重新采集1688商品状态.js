var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 全球商品 &gt; 手动审核1688状态_重新采集1688商品状态') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr></tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        //@.ManualReview_1688&gt;0  手动审核1688状态， 非【0.未审核】。
        let str = '\
        {\
            <r:GlobalPro size=1 page=2 db="sqlite.shopee" where=" where @.ManualReview_1688&gt;0">\
		        "fromid":<:ManualReview_1688_fromid/>,\
            </r:GlobalPro>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        if (oo.fromid) {
            this.d01(oo.fromid)
        }
        else {
            $("#state").html("出错了...");
            Tool.pre(["出错了...", oo]);
        }
    },
    //////////////////////////
    d01: function (fromid) {
        let url = 'https://detail.1688.com/offer/' + fromid + '.html';
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在打开详情...");
        gg.getFetch(url,"json", this.d02, this, fromid)
    },
    d02: function (t, fromid) {
        if (t.indexOf("_____tmd_____/verify") != -1) {
            $("#state").html("验证码拦截。")
            //let url = 'https://detail.1688.com/offer/' + oo.fromid + '.html'
            //Tool.captcha.a01(url, this.a02, this, oo)
        }
        else if (t.indexOf('<title>404-阿里巴巴</title>') != -1) {
            this.d03(1, "404错误", fromid);
        }
        else if (t.indexOf('>商品已下架<') != -1) {
            this.d03(2, "商品已下架", fromid);
        }
        else if (t.indexOf('<meta name="b2c_auction" content="') != -1) {
            this.d03(3, "采集内容已改变");
        }
        else if (t.indexOf(':' + fromid + ',') != -1) {
            this.d03(0, "", fromid);
        }
        else {
            Tool.at("出错002：\n" + t)
        }
    },
    d03: function (state, errorMsg, fromid) {
        let update1 = 'update @.proList set @.state=' + state + ',@.errorMsg=' + Tool.rpsql(errorMsg) + ' where @.fromid=' + fromid
        let update2 = 'update @.GlobalPro set @.ManualReview_1688_state=' + state + ' where @.ManualReview_1688_fromid=' + fromid
        let str = '"ok"<r: db="sqlite.1688">' + update1 + '</r:><r: db="sqlite.shopee">' + update2 + '</r:>';
        Tool.ajax.a01(str, 1, this.d04, this);
    },
    d04: function (t) {
        if (t == "ok") {
            $("#state").html("下一条...");
            $("#url").html("")
            this.obj.A1++;
            this.a03();
        }
        else {
            //$("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
}
fun.a01();
