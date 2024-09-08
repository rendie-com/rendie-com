var fun =
{
    obj:
    {
        A1: 0, A2: 0,
        B1: 0, B2: 5000,
        seller: {},
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件
        //obj.params.return         返回URL  
        //obj.params.site           站点
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 粉丝 &gt; 取消关注和关注") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		        <tr>\
                    <td class="right w170">说明：</td>\
                    <td colspan="2">\
                        （1）取消关注超过4000会被锁定，不让操作。<br/>\
                        （2）最多只能关注5000个用户。<br/>\
                        所以我打算每天取消关注1000，然后关注1000。\
                    </td>\
                </tr>\
		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		        <tr><td class="right">取消关注进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">关注进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">用户ID：</td><td id="userid" colspan="2"></td></tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        Tool.login.a01(this.a04, this);
    },
    a04: function (t) {
        this.obj.seller = t;
        this.d01();
    },
    ///////////////////////////////////////////////////////
    d01: function () {
        //@.is_my_following=1      表示被我关注的用户
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + obj.params.site,
            sql: "select count(1) as total FROM @.table where @.is_my_following=1"            
        }]
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        this.obj.A2 = t[0][0].total
        this.obj.A1 = this.obj.A2
        this.d03()
    },
    d03: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d04, this)
    },
    d04: function () {
        if (this.obj.A1 <= 4000) {
            $("#state").html("不用取关了")
            this.e01()
        }
        else {
            //去取关
            //@.is_following=0      表示不是我的粉丝
            //@.is_my_following     表示是否被我关注
            let data = [{
                action: "sqlite",
                database: "shopee/采集箱/粉丝/"+ obj.params.site,
                sql: "select @.userid as userid FROM @.table where @.is_my_following=1 order by @.follow_time asc limit 1",
            }]
            Tool.ajax.a01(data, this.d05, this);
        }
    },
    d05: function (t) {
        $("#userid").html(t[0][0].userid)
        Tool.follow_user.a01(t[0][0].userid, false, this.obj.seller, obj.params.site, this.d06, this)
    },
    d06: function () {
        this.obj.A1--;
        this.d03();
    },
    //////////////////////////////////////////////////////////
    e01: function () {
        this.obj.B1 = this.obj.A1 + 1
        this.e02()
    },
    e02: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e03, this, this.f01)
    },
    e03: function () {
        //@.is_my_following=0      表示没被我关注的用户
        //@.follow_count           关注次数
        //@.is_following           是否关注我  
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/"+obj.params.site,
            sql: "select @.userid as userid FROM @.table where @.is_my_following=0 and @.follow_count=0 and @.is_following=0 order by @.last_active_time desc limit 1"
        }]
        Tool.ajax.a01(data, this.e04, this);
    },
    e04: function (t) {
        if (t[0].length == 0) {
            $("#state").html("没有用户可以关注了")
            Tool.at("没有用户可以关注了.")
        }
        else {
            $("#userid").html(t[0][0].userid)
            Tool.follow_user.a01(t[0][0].userid, true, this.obj.seller, obj.params.site, this.e05, this)
        }
    },
    e05: function () {
        this.obj.B1++;
        this.e02();
    },
    ////////////////////////////////////////
    f01: function () {
        $("#state").html("全部完成.")
    },
}
fun.a01();