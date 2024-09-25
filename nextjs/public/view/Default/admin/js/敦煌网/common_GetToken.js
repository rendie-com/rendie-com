'use strict';
Object.assign(Tool, {
    //来源：https://open.dhgate.com/docs/getting-started/oauth2
    //得到token    Tool.GetToken.a01(oo.fromid, oo.username, oo.token, this.a04, this);
    GetToken: {
        a01: function (fromid, username, token, next, This, t) {
            let state = Tool.getQueryString("state")//name="rendie"
            if (username == state) {//验证账号
                this.a05(fromid);
            }
            else {
                if (token == 0) {
                    this.a03(fromid);//重新授权
                }
                else {
                    this.a02(fromid, token, next, This, t);
                }
            }
        },
        a02: function (fromid, token, next, This, t) {
            //refresh_token不能超过30天,所以减29天，就可以做到一天刷新一次，【expires_in】就能无限延长
            $("#state").html("【expires_in】到期时间为：" + Tool.js_date_time(token.expires_in, "-"))
            if (new Date().getTime() > new Date(token.expires_in - 1000 * 60 * 60 * 24 * 29).getTime()) {
                this.d01(fromid, token.refresh_token);//刷新令牌
            }
            else if (new Date().getTime() > token.expires_in)//access_token不能超过1天【expires_in:为access_token的到期时间戳】
            {
                this.a03(fromid);//重新授权
            }
            else {
                next.apply(This, [token.access_token, t]);
            }
        },
        //重新授权
        a03: function (fromid) {
            let URL = '<r:seller db="sqlite.dhgate" size=1 where=" where @.fromid=' + fromid + '">["<:APPKEY/>","<:username/>"]</r:seller>'
            Tool.ajax.a01(URL, 1, this.a04, this)
        },
        a04: function (t) {
            let arr = [
                "client_id=" + t[0],//创建应用时获得的App Key
                "state=" + t[1],//[长度在20个字符以内] 用于保持请求和回调的状态，防止第三方应用受到CSRF攻击。授权服务器在回调时（重定向用户浏览器到“redirect_uri”时），会原样回传该参数
                "response_type=code",//此值固定为“code”
                "scope=basic",//以空格分隔的权限列表，目前仅支持basic权限，传递“basic”即可
                "redirect_uri=https://rendie.com/html/apidh.html?" + top.location.href,//授权后要回调的URI，即接收Authorization Code的URI。
                "display=mobile",//登录和授权页面的展现样式，默认为page；page: 适用于web应用；mobile: 适用于手机等智能移动终端应用
                "force_login=1"//是否强制登录；force_login=1 强制登陆；不强制登录，无需此参数，默认为0
            ]
            let url = "https://secure.dhgate.com/dop/oauth2/authorize?" + arr.join("&");
            top.location.href = url;
        },
        a05: function (fromid) {
            Tool.ajax.a01(this.b01(fromid), 1, this.a06, this);
        },
        a06: function (oo) {
            if (oo.client_id == "" || oo.client_secret == "") {
                Tool.at("你还没有填写【APPKEY】或【APPSECRET】。");
            }
            else {
                let arr = [
                    "grant_type=authorization_code",
                    "code=" + Tool.getQueryString("code"),
                    "client_id=" + oo.client_id,
                    "client_secret=" + oo.client_secret,
                    "redirect_uri=https://rendie.com/html/apidh.html"
                ]
                let url = "https://secure.dhgate.com/dop/oauth2/access_token?" + arr.join("&")
                gg.getFetch(url,"json", this.a07, this, oo.fromid)
            }
        },
        a07: function (getToken, fromid) {
            $("#state").html("新令牌到期时间为：" + Tool.js_date_time(getToken.expires_in, "-"))
            if (getToken.access_token) {
                let str = '""<r: db="sqlite.dhgate">update @.seller set @.token=' + Tool.rpsql(JSON.stringify(getToken)) + ' where @.fromid=' + fromid + '</r:>';
                Tool.ajax.a01(str, 1, this.a08, this);
            }
            else {
                Tool.pre(["获取token出错", getToken]);
            }
        },
        a08: function (t) {
            if (t == "") {
                top.location.href = top.location.href.split("?")[0];
            } else {
                Tool.pre(["出错：", t]);
            }
        },
        b01: function (fromid) {
            let str = '{\
            <r:seller db="sqlite.dhgate" size=1 where=" where  @.fromid=' + fromid + '">\
                "fromid":<:fromid/>,\
                "client_id":"<:APPKEY/>",\
                "client_secret":"<:APPSECRET/>"\
            </r:seller>}'
            return str;
        },
        d01: function (fromid, refresh_token) {
            Tool.ajax.a01(this.b01(fromid), 1, this.d02, this, refresh_token);
        },
        d02: function (oo, refresh_token) {
            let arr = [
                "grant_type=refresh_token",
                "refresh_token=" + refresh_token,
                "client_id=" + oo.client_id,
                "client_secret=" + oo.client_secret,
                "scope=basic"
            ]
            let url = "https://secure.dhgate.com/dop/oauth2/access_token?" + arr.join("&");
            gg.getFetch(url,"json", this.d03, this, oo.fromid);
        },
        d03: function (oo, fromid) {
            if (oo.status = "error") {
                //这个到期时间，我不知道有没有用，因为token没变，时间变了。明天看一下，会不会“刷新令牌成功”？
                //也有可能是到期就要登陆，刷新是没用的。
                $("#state").html("刷新后，令牌到期时间为：" + Tool.js_date_time(oo.expires_in, "-"))
                this.a07(oo, fromid)
            }
            else {
                $("#state").html("刷新令牌成功。还没开始做")
                Tool.pre(["刷新令牌成功", oo])
            }

        },
    }
})