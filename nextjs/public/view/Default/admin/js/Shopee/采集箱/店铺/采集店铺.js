var fun =
{
    obj:
    {
        A1: 1, A2: 1,
    },
    a01: function () {
        //obj.params.return         返回URL
        //obj.params.site           站点
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 商品 &gt; 采集店铺") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		        <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		        <tr><td class="right">请选择关键词：</td><td colspan="2">'+ this.b01(obj.params.site) + '</td></tr>\
		        <tr><td class="right">关键词页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    //////////////////////////////////////////////
    b01: function (site) {
        let arr = []
        if (site == "my") {
            arr = config_my
        }
        else if (site == "br") {
            arr = config_br
        }
        else if (site == "tw") {
            arr = config_tw
        }
        let str1 = ""
        for (let i = 0; i < arr.length; i++) {
            str1 += '<option value="' + arr[i][0] + '">' + (i + 1) + '.' + arr[i][0] + '(' + arr[i][2] + ')</option>'
        }
        let str2 = '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择关键词</option>'+ str1 + '\
        </select>';
        return str2;
    },
    ///////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", true);
        this.obj.key = val;
        this.d01()
    },
    ////////////////////////////////////////
    d01: function () {
        gg.isRD(this.d02, this);
    },
    d02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this)
    },
    d03: function () {
        let url = "https://" + (obj.params.site == "tw" ? "xiapi" : obj.params.site) + ".xiapibuy.com/search_user/?keyword=" + this.obj.key//搜索
        $("#state").html('<a href="' + url + '" target="_blank">' + url + '</a>')
        //这个必须要获取“Headers”信息。。。。。。
        //gg.tabs_remove_create_getHeaders(2, url, ["/api/v4/search/search_user"], false, this.d04, this)
    },
    d04: function (t) {
        $("#state").html(t.url)
        gg.setHeaders_getHtml(t.url, t.requestHeaders, this.d05, this)
    },
    d05: function (t) {
        if (t.data) {
            this.obj.A2 = Math.ceil(t.data.total_count / 6)
            this.e01(t.data.users)
        }
        else {
            Tool.pre(["内容不对1111", t])
        }
    },
    //////////////////
    e01: function (arr) {
        let sqlArr = []
        for (let i = 0; i < arr.length; i++) {
            let arrL = [
                "@.site",//站点（如：my）
                "@.status",//状态（如：1）----还不知道有什么用
                "@.shopname",//店铺名称（如：Skullreaper Digital）
                "@.follower_count",//粉丝数量
                "@.following_count",//关注中
                "@.is_official_shop",//是否为官方店
                "@.last_login_time",//最后登陆时间
                "@.nickname",//昵称（如：Skullreaper Digital）
                "@.portrait",//肖像（如：595170becdb25bccda3e19a3840e6e8d）
                "@.products",//商品数量
                "@.response_rate",//聊天回应率（如：47）
                "@.response_time",//聊天时间（如：8501（几小时内））
                "@.shop_rating",//评分（如：4.90206）
                "@.shopee_verified_flag",//评级标志
                "@.show_official_shop_label",//是否显示官方标志
                "@.show_shopee_verified_label",//未知---还不知道做用
                "@.userid",//用户ID
                "@.shopid",//店铺ID
                "@.username",//用户名（如：jianshao.my）
                "@.is_in_fss",//是否报了免运活动
                "@.ps_plus",//是否为【Preferred+】
                "@.rating_good",//好评数量（如：136372）
                "@.rating_normal",//中评数量（如：5001）
                "@.rating_bad",//差评数量（如：2040）
                "@.is_shopee_choice",//是否为choice标志
            ]
            let arrR = [
                Tool.rpsql(obj.params.site),//站点（如：my）
                arr[i].status,//状态（如：1）----还不知道有什么用
                Tool.rpsql(arr[i].shopname),//店铺名称（如：Skullreaper Digital）
                arr[i].follower_count,//粉丝数量
                arr[i].following_count,//关注中
                arr[i].is_official_shop ? 1 : 0,//是否为官方店
                arr[i].last_login_time,//最后登陆时间
                Tool.rpsql(arr[i].nickname),//昵称（如：Skullreaper Digital）
                Tool.rpsql(arr[i].portrait),//肖像（如：595170becdb25bccda3e19a3840e6e8d）
                arr[i].products,//商品数量
                arr[i].response_rate,//聊天回应率（如：47）
                arr[i].response_time ? arr[i].response_time : 0,//聊天时间（如：8501（几小时内））
                arr[i].shop_rating ? arr[i].shop_rating : 0,//评分（如：4.90206）
                arr[i].shopee_verified_flag ? arr[i].shopee_verified_flag : 0,//评级标志
                arr[i].show_official_shop_label ? 1 : 0,//是否显示官方标志
                arr[i].show_shopee_verified_label ? 1 : 0,
                arr[i].userid,//用户ID
                arr[i].shopid,//店铺ID
                Tool.rpsql(arr[i].username),//用户名（如：jianshao.my）
                arr[i].is_in_fss ? 1 : 0,//是否报了免运活动
                arr[i].ps_plus ? 1 : 0,//是否为【Preferred+】
                arr[i].rating_good,//好评数量（如：136372）
                arr[i].rating_normal,//中评数量（如：5001）
                arr[i].rating_bad,//差评数量（如：2040）
                arr[i].is_shopee_choice ? 1 : 0,//是否为choice标志
            ]
            let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
            let sel = "select count(1) from @.users where @.shopid=" + arr[i].shopid + " and @.site='" + obj.params.site + "'"
            sqlArr.push('\
		    <if Fun(Db(sqlite.shopee,'+ sel + ',count))==0>\
			    <r: db="sqlite.shopee">insert into @.users('+ arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>\
		    <else/>\
			    <r: db="sqlite.shopee">update @.users set '+ arrUp.join(",") + ' where @.shopid=' + arr[i].shopid + ' and @.site=\'' + obj.params.site + '\'</r:>\
		    </if>')
        }
        Tool.ajax.a01('"ok"' + sqlArr.join(""), 1, this.e02, this);
    },
    e02: function (t) {
        if (t == "ok") {
            Tool.ajax.text("/" + o.path + "admin/js/Shopee/采集箱/店铺/注入_翻页.js", this.e03, this);
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    e03: function (t) {
        gg.tabs_executeScript_getHeaders(2, t, ["/api/v4/search/search_user"], false, this.e04, this)
    },
    e04: function (t) {
        Tool.pre(t)
        //this.obj.A1++;
        //this.d02()

    },

}
fun.a01();