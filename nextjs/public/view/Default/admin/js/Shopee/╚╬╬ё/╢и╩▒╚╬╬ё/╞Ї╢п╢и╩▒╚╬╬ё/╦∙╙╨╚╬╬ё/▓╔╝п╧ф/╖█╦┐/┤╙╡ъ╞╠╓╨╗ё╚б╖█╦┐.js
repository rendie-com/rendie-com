'use strict';
var task = {
    obj: {
        C1: 1, C2: 0,
        Cobj: {
            shopid: 0,//店铺ID
            get_follower_time: 0,//上次的获取粉丝时间
            new_get_follower_time: 0,//这次的获取粉丝时间
        },
        D1: 1, D2: 1,
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
        <tr><td class="right">店铺ID：</td><td id="shopid" colspan="2"></td></tr>\
        <tr><td class="right">店铺ID进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
        <tr><td class="right">粉丝页进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
        <tr><td class="right">上次的获取粉丝时间：</td><td id="get_follower_time" colspan="2"></td></tr>\
        <tr><td class="right">这次的获取粉丝时间：</td><td id="new_get_follower_time" colspan="2"></td></tr>\
        <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>')
        this.a02(oo);
    },
    a02: function (oo) {
        $("#state").html("正在获取店铺信息。。。");
        let where = this.b01(oo.site)
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + oo.site,
            sql: "select " + Tool.fieldAs("shopid,get_follower_time") + " from @.table" + where + " order by @.get_follower_time asc limit 1",
        }]
        if (this.obj.C2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/采集箱/店铺/" + oo.site,
                sql: "select count(1) as total FROM @.table" + where,
            })
        }
        Tool.ajax.a01(data, this.a03, this, oo);
    },
    a03: function (t, oo) {
        //一次执行只获取前1个店铺的粉丝
        if (this.obj.C2 == 0) { this.obj.C2 = t[1][0].total > 3 ? 3 : t[1][0].total; }
        this.obj.Cobj = t[0][0];
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a04, this, this.e03, oo)
    },
    a04: function (oo) {
        this.obj.Cobj.new_get_follower_time = Tool.gettime("")
        $("#shopid").html(this.obj.Cobj.shopid)
        $("#get_follower_time").html(Tool.js_date_time2(this.obj.Cobj.get_follower_time))
        $("#new_get_follower_time").html(Tool.js_date_time2(this.obj.Cobj.new_get_follower_time))
        this.d01(oo);
    },
    ////////////////////////////////
    b01: function (site) {
        let time24H = Tool.gettime("") - 60 * 60 * 24
        let arr = []
        if (site == "tw") {
            arr = ["'中国大陆'", "'中國大陸'", "'Mainland China'"]
        }
        else if (site = "my") {
            arr = ["'中国大陆'", "'Mainland China'"]
        }
        else if (site = "br") {
            arr = ["'Mainland China'", "'China Continental'"]
        }
        //@.get_follower_time           获取粉丝时间
        return " where @.shop_location in(" + arr.join(",") + ") and @.get_follower_time<" + time24H
    },
    ///////////////////////////////////////////////////////////
    d01: function (oo) {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.d02, this, this.e01, oo)
    },
    d02: function (oo) {
        let url = "https://" + (oo.site == "tw" ? "xiapi" : oo.site) + ".xiapibuy.com/api/v4/pages/get_follower_list?limit=20&offset=" + ((this.obj.D1 - 1) * 20) + "&shopid=" + this.obj.Cobj.shopid
        $("#url").html(url);
        $("#state").html("正在获取店铺的粉丝。。。")
        gg.getHtml(url, this.d03, this, oo)
    },
    d03: function (t, oo) {
        if (t.data) {
            if (t.data.accounts) {
                if (t.data.accounts[0].last_active_time < this.obj.Cobj.get_follower_time) {
                    //表示活跃时间小于我的采集时间，就不用采集了。
                    this.e01(oo);
                }
                else {
                    if (!t.data.nomore) { this.obj.D2++; }
                    Tool.accounts.a01(t.data.accounts, false, oo.site, this.d04, this,oo);
                }
            }
            else {
                $("#state").html("店铺的粉丝隐藏了，跳过。。。")
                this.e01(oo);
            }
        }
        else {
            Tool.pre(["出错222", t])
        }
    },
    d04: function (oo) {
        this.obj.D1++;
        this.d01(oo);
    },
    //////////////////////
    e01: function (oo) {
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/店铺/" + oo.site,
            sql: "update @.table set @.get_follower_time=" + this.obj.Cobj.new_get_follower_time + " where @.shopid=" + this.obj.Cobj.shopid,
        }]
        $("#state").html("正在更新数据。。。")
        Tool.ajax.a01(data, this.e02, this, oo);
    },
    e02: function (t, oo) {
        if (t[0].length == 0) {
            this.obj.C1++; this.obj.Cobj = {};
            this.obj.D1 = 1; this.obj.D2 = 1;
            this.a02(oo);
        }
        else {
            Tool.pre(["出错11", t])
        }
    },
    e03: function (oo) {
        this.obj = {
            C1: 1, C2: 0,
            Cobj: {
                shopid: 0,//店铺ID
                get_follower_time: 0,//上次的获取粉丝时间
                new_get_follower_time: 0,//这次的获取粉丝时间
            },
            D1: 1, D2: 1,
        }
        oo.next.apply(oo.This, [oo.t])
    },
}