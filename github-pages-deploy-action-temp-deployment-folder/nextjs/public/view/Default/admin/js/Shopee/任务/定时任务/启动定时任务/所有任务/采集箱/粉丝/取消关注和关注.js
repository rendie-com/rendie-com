'use strict';
var task = {
    obj: {
        C1: 1, C2: 0,
        D1: 1, D2: 5000,
    },
    a01: function (seller, site, next, This, t) {
        let oo = {
            seller: seller,
            site: site,
            next: next,
            This: This,
            t: t
        }
        $("#tbody").html('\
        <tr><td class="right">取消关注进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
        <tr><td class="right">关注进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
        <tr><td class="right">用户ID：</td><td id="userid" colspan="2"></td></tr>')
        this.a02(oo);
    },
    a02: function (oo) {
        let data = [{
            action: "fs",
            fun: "access_sqlite",
            database: "shopee/采集箱/粉丝/" + oo.site,
            mode: 0,
            elselist: [{
                action: "fs",
                fun: "download_sqlite",
                url: "https://github.com/rendie-com/rendie-com/releases/download/1/shopee_gather_fans_" + oo.site + ".db",
                database: "shopee/采集箱/粉丝/" + oo.site,
            }]
        }]
        Tool.ajax.a01(data, this.a03, this, oo);
    },
    a03: function (t, oo) {
        //@.is_my_following=1      表示被我关注的用户
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + oo.site,
            sql: "select count(1) as total FROM @.table where @.is_my_following=1"
        }]
        Tool.ajax.a01(data, this.a04, this, oo);
    },
    a04: function (t, oo) {
        this.obj.C2 = t[0][0].total
        this.obj.C1 = this.obj.C2
        this.a05(oo)
    },
    a05: function (oo) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d01, this, null, oo)
    },
    ////////////////////
    d01: function (oo) {
        if (this.obj.C1 <= 4900) {
            $("#state").html("不用取关了")
            this.e01(oo)
        }
        else {
            //去取关
            //@.is_following=0      表示不是我的粉丝
            //@.is_my_following     表示是否被我关注
            let data = [{
                action: "sqlite",
                database: "shopee/采集箱/粉丝/" + oo.site,
                sql: "select @.userid as userid FROM @.table where @.is_my_following=1 order by @.follow_time asc limit 1",
            }]
            Tool.ajax.a01(data, this.d02, this, oo);
        }
    },
    d02: function (t, oo) {
        $("#userid").html(t[0][0].userid)
        Tool.follow_user.a01(t[0][0].userid, false, oo.seller, oo.site, this.d03, this, oo)
    },
    d03: function (oo) {
        this.obj.C1--;
        this.a05(oo);
    },
    ///////////////////////////////////////////////////////////////////
    e01: function (oo) {
        this.obj.D1 = this.obj.C1 + 1
        this.e02(oo)
    },
    e02: function (oo) {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.e03, this, this.f01, oo)
    },
    e03: function (oo) {
        //@.is_my_following=0      表示没被我关注的用户
        //@.follow_count           关注次数
        //@.is_following           是否关注我  
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + oo.site,
            sql: "select @.userid as userid FROM @.table where @.is_my_following=0 and @.follow_count=0 and @.is_following=0 order by @.last_active_time desc limit 1"
        }]
        
        Tool.ajax.a01(data, this.e04, this, oo);
    },
    e04: function (t, oo) {
        if (t[0].length == 0) {
            $("#state").html("没有用户可以关注了")
            this.f01(oo)
        }
        else {
            $("#userid").html(t[0][0].userid)
            Tool.follow_user.a01(t[0][0].userid, true, oo.seller, oo.site, this.e05, this, oo)
        }
    },
    e05: function (oo) {
        this.obj.D1++;
        this.e02(oo);
    },
    ////////////////////////////////////////
    f01: function (oo) {
        oo.next.apply(oo.This, [oo.t])
    },
}