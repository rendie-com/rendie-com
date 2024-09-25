var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        this.a02()
    },
    a02: function () {
        let html = Tool.header("Shopee &gt; 采集箱 &gt; 粉丝 &gt; 把旧数据同步过来") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		        <tr><td class="right w150">关键词页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a03, this, html);
    },
    a03: function () {
        Tool.at("要的时后再开发")
        //   let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        //   <r:accounts_' + obj.arr[5] + ' size=100 db="sqlite.shopee" page=2>,\
        //{\
        // "last_active_time":<:last_active_time/>,\
        // "follow_time":<:follow_time/>,\
        // "userid":<:userid/>,\
        // "shopid":<:shopid/>,\
        // "status":<:status/>,\
        // "follow_count":<:follow_count/>,\
        // "notFollow_count":<:notFollow_count/>,\
        // "is_preferred_plus":<:is_preferred_plus/>,\
        // "is_official_shop":<:is_official_shop/>,\
        // "is_shopee_verified":<:is_shopee_verified/>,\
        // "is_following":<:is_following/>,\
        // "is_my_following":<:is_my_following/>,\
        // "is_seller":<:is_seller/>,\
        // "portrait":<:portrait tag=json/>,\
        // "shopname":<:shopname tag=json/>,\
        // "username":<:username tag=json/>,\
        //}\
        //   </r:accounts_' + obj.arr[5] + '>]'
        //   Tool.ajax.a01(str, this.obj.A1, this.a04, this);
    },
    a04: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        arr.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, arr)
    },
    a05: function (arr) {
        let sqlArr = [];
        for (let i = 0; i < arr.length; i++) {
            let arrL = [
                "@.last_active_time",
                "@.follow_time",
                "@.userid",
                "@.shopid",
                "@.status",
                "@.follow_count",
                "@.notFollow_count",
                "@.is_preferred_plus",
                "@.is_official_shop",
                "@.is_shopee_verified",
                "@.is_following",
                "@.is_my_following",
                "@.is_seller",
                "@.portrait",
                "@.shopname",
                "@.username",
            ]
            let arrR = [
                arr[i].last_active_time,
                arr[i].follow_time,
                arr[i].userid,
                arr[i].shopid,
                arr[i].status,
                arr[i].follow_count,
                arr[i].notFollow_count,
                arr[i].is_preferred_plus,
                arr[i].is_official_shop,
                arr[i].is_shopee_verified,
                arr[i].is_following,
                arr[i].is_my_following,
                arr[i].is_seller,
                Tool.rpsql(arr[i].portrait),
                Tool.rpsql(arr[i].shopname),
                Tool.rpsql(arr[i].username),
            ]
            /////////////////////////////////////////////////
            let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
            let sel = "select count(1) from @.accounts_" + obj.arr[5] + " where @.userid=" + arr[i].userid
            sqlArr.push('\
            <if Fun(Db(sqlite.shopee_gather,'+ sel + ',count))==0>\
                <r: db="sqlite.shopee_gather">insert into @.accounts_'+ obj.arr[5] + '(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>\
            </if>')
        }
        Tool.ajax.a01('"ok"' + sqlArr.join(""), 1, this.a06, this);
    },
    a06: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a03()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();