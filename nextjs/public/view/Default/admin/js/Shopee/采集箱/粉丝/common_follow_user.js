Object.assign(Tool, {
    follow_user: {
        a01: function (target_user_id, is_follow, seller, site, next, This, t) {
            let pArr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/v3/order/follow_user?" + pArr.join("&")
            let data = {
                "target_user_id": target_user_id,
                "is_follow": is_follow
            }
            let oo = {
                is_follow: is_follow,
                site: site,
                target_user_id: target_user_id,
                next: next,
                This: This,
                t: t
            }
            this.a02(url, data, oo)
        },
        a02: function (url, data, oo) {           
            $("#state").html("正在" + (oo.is_follow ? '' : '取消') + "关注粉丝。。。")
            gg.postFetch(url,  JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
            if (t.message == "success") {
                this.a04(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        a04: function (oo) {
            let setField
            if (oo.is_follow) {
                //o.is_follow=true          表示要关注用户
                //@.follow_count            表示关注次数
                //@.follow_time             表示关注时的时间
                setField = "@.follow_count=@.follow_count+1,@.is_my_following=1,@.follow_time=" + Tool.gettime("");
            }
            else {
                //o.is_follow=false             表示要取消关注用户
                //@.notFollow_count             表示取关次数
                //@.is_my_following=0           表示没被我关注的用户
                setField = "@.notFollow_count=@.notFollow_count+1,@.is_my_following=0"
            }
            this.a05(setField, oo)
        },
        a05: function (setField, oo) {
            let data = [{
                action: "sqlite",
                database: "shopee/采集箱/粉丝/"+oo.site,
                sql: "update @.table set " + setField + ' where @.userid=' + oo.target_user_id,                
            }]
            $("#state").html("正在更新数据。。。")
            Tool.ajax.a01(data, this.a06, this, oo);
        },
        a06: function (t, oo) {
            if (t[0].length == 0) {
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["有错误", t])
            }
        },
    },
})