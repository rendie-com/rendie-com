'use strict';
var task = {
    obj:
    {
        C1: 1, C2: 100,
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
        <tr><td class="right">数据库进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
        <tr><td class="right">粉丝页进度：</td>'+ Tool.htmlProgress('D') + '</tr>')
        this.a02(oo);
    },
    a02: function (oo) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a03, this, this.d01, oo)
    },
    a03: function (oo) {
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + oo.site + "/" + (this.obj.C1.toString().padStart(3, '0')),
            sql: "update @.table set @.is_my_following=0 where @.is_my_following=1",
        }]
        Tool.ajax.a01(data, this.a04, this, oo);
    },
    a04: function (t, oo) {
        this.obj.C1++;
        this.a02(oo);
    },
    d01: function (oo) {
        Tool.x1x2("D", this.obj.D1, this.obj.D2, this.d02, this, this.e01, oo)
    },
    d02: function (oo) {
        //【我关注的】来源：https://my.xiapibuy.com/shop/896010703/following/?__classic__=1
        let url = "https://" + (oo.site == "tw" ? "xiapi" : oo.site) + ".xiapibuy.com/api/v4/pages/get_followee_list?limit=20&offset=" + ((this.obj.D1 - 1) * 20) + "&shopid=" + oo.seller[oo.site].shopId;
        $("#state").html("正在获取店铺的粉丝。。。")
        gg.getFetch(url, "json", this.d03, this, oo)
    },
    d03: function (t, oo) {
        if (t.data) {
            if (!t.data.nomore) { this.obj.D2++; }
            if (t.data.accounts) {
                Tool.accounts.a01(t.data.accounts, {}, "@.is_my_following", oo.site, this.d04, this, oo)
            }
            else {
                $("#state").html("店铺的粉丝隐藏了，跳过。。。")
            }
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d04: function (dbnameObj, oo) {
        this.obj.D1++;
        this.d01(oo)
    },
    e01: function (oo) {
        this.obj = {
            C1: 1, C2: 100,
            D1: 1, D2: 1,
        }
        $("#C1,#D1").css("width", "0%");
        $("#C1,#C2,#D,#D2").html("");
        oo.next.apply(oo.This, [oo.t])
    },
}