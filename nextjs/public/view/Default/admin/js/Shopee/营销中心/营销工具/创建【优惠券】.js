'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 8,// 活动进度
        start_time: 0,
        end_time: 0,
        seller: {},
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件        
        //obj.params.site           站点
        //obj.params.return         返回URL 
        let html = Tool.header(obj.params.return,"SHOPEE &gt; 营销中心 &gt; 营销工具 &gt; 创建【优惠券】") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">活动开始时间：</td><td id="timeA" colspan="2"></td></tr>\
                <tr><td class="right">活动结束时间：</td><td id="timeB" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        this.obj.start_time = config[obj.params.site].coupon_time[this.obj.A1 - 1]
        if (this.obj.start_time < Tool.gettime("")) {
            this.obj.start_time = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 2
        }
        $("#timeA").html(Tool.js_date_time2(this.obj.start_time))
        ////////////////////////////////////////////
        if (this.b02(this.obj.start_time)) {
            this.a06();
        }
        else {
            $("#state").html("活动不在30天以内，程序已终止。")
            this.g02(["写入成功"]);
        }
    },
    a06: function () {
        if (this.obj.A1 == 6) {//关注礼优惠券
            this.obj.end_time = this.obj.start_time + 60 * 60 * 24 * 30 - 1;
            $("#timeB").html(Tool.js_date_time2(this.obj.end_time) + "（30天）")
            this.f01()
        }
        else {
            this.obj.end_time = this.obj.start_time + 60 * 60 * 24 * 3 - 1;
            $("#timeB").html(Tool.js_date_time2(this.obj.end_time) + "（3天）")
            this.d01()
        }
    },
    /////////////////////////////////////////
    b01: function (timeStr) {
        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let oo = {
            "name": "【" + this.obj.A1 + "】店铺优惠券1 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": null,
            "max_value": null,
            "discount": null,
            "min_price": 15,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "items": [],
                "coin_cashback_voucher": {
                    "coin_percentage_real": 3,//15% Shopee币回扣
                    "max_coin": 1//最高上限数额
                },
                "voucher_landing_page": 0,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": null,
                "hide": 0,
                "reward_type": 1,//奖励类型：0:折扣；1:Shopee币回扣
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 0,
                    "shop_order_count_period": 0
                }
            }
        }
        return oo;
    },
    b02: function (time) {
        let isbool = false, newTime = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24;//因为每个活动都是从00:0:00到23:59:59
        if (time < newTime) {
            time = newTime; isbool = true;
        }
        else if (time <= newTime + 60 * 60 * 24 * 3)//3天
        {
            isbool = true;
        }
        return isbool;
    },
    b03: function (timeStr) {
        let oo = {
            "name": "【" + this.obj.A1 + "】直播优惠券 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": null,
            "value": 3,//折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 50,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 0,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": 1,
                "hide": 0,
                "reward_type": 0,//奖励类型：0:折扣；1:Shopee币回扣
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 0,
                    "shop_order_count_period": 0
                }
            }
        }
        return oo;
    },
    b04: function (timeStr) {
        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let oo = {
            "name": "【" + this.obj.A1 + "】非公开优惠券 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": 3,//折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 50,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 0,
                "display_from": null,
                "exclusive_channel_type": null,
                "hide": 1,//隐藏
                "reward_type": 0,//奖励类型：0:折扣；1:Shopee币回扣
                "backend_created": 0,
                "choose_users": {
                    "shop_order_count": 0,
                    "shop_order_count_period": 0
                }
            }
        }
        return oo;
    },
    b05: function (timeStr) {
        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let oo = {
            "name": "【" + this.obj.A1 + "】店铺优惠券2 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": 1, //折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 20,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "items": [],
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 0,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": null,
                "hide": 0,
                "reward_type": 0,//奖励类型：0:折扣；1:Shopee币回扣
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 0,
                    "shop_order_count_period": 0
                }
            }
        }
        return oo;
    },
    b06: function (timeStr) {
        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let oo = {
            "name": "【" + this.obj.A1 + "】新买家优惠券 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": 2,//折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 30,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 0,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": null,
                "hide": 0,
                "reward_type": 0,
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 1,//0:表示【店铺优惠券】；1:表示【新买家优惠券】；2:表示【回购买家优惠券】3:表示【回购买家优惠券】二次；
                    "shop_order_count_period": 0
                }
            }
        }
        return oo
    },
    b07: function (timeStr) {
        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let oo = {
            "name": "【" + this.obj.A1 + "】回购买家优惠券 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": 3,//折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 50,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 0,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": null,
                "hide": 0,
                "reward_type": 0,
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 2,//0:表示【店铺优惠券】；1:表示【新买家优惠券】；2:表示【回购买家优惠券】3:表示【回购买家优惠券】二次；
                    "shop_order_count_period": 1//在过去多少天购买过的买家。1:30天；2:90天；3:180天；4:365天；
                }
            }
        }
        return oo;
    },
    ////////////////////////////////
    d01: function () {
        if (this.obj.A1 == 5) {
            //（5）【商品优惠券】：折扣金额10，最低消费100，可使用总数100。（3天一个活动，做30天，选100个销量大的商品）
            this.e01()
        }
        else {
            this.d02()
        }
    },
    d02: function () {
        let data = {}, timeStr = Tool.userDate13(this.obj.start_time * 1000, "/").substr(5) + " - " + Tool.userDate13(this.obj.end_time * 1000 + 1000, "/").substr(5)
        switch (this.obj.A1) {
            case 1: data = this.b01(timeStr); break;//（1）【店铺优惠券1】：3% Shopee币回扣，最高上限数额1，最低消费15，可使用总数100。（3天一个活动，做30天）
            case 2: data = this.b05(timeStr); break;//（2）【店铺优惠券2】：折扣金额1，最低消费20，可使用总数100。（3天一个活动，做30天）
            case 3: data = this.b06(timeStr); break;//（3）【新买家优惠券】：折扣金额2，最低消费30，可使用总数100。（3天一个活动，做30天）
            case 4: data = this.b07(timeStr); break;//（4）【回购买家优惠券】：折扣金额3，最低消费50，可使用总数100。（30天一个活动，做30天）
            case 7: data = this.b04(timeStr); break;//（7）【非公开优惠券】：折扣金额3，最低消费50，可使用总数100。（3天一个活动，做30天）
            case 8://（8）【直播优惠券】：最低消费25，扣除百分比25%，可使用总数100。
                data = this.b03(timeStr); break;
        }
        this.d03(data)
    },
    d03: function (data) {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/voucher/?" + pArr.join("&");
        gg.postFetch(url, JSON.stringify(data), this.d04, this)
    },
    d04: function (oo) {
        if (oo.code == 0) {
            $("#state").html("添加优惠券-创建成功。");
            this.g01()
        }
        else if (oo.message == "please create a new shop welcome voucher after the existing one is expired") {
            //请在现有优惠券过期后创建一个新的商店欢迎券
            this.g02(["写入成功"])
        }
        else if (oo.message == "please create a new second order voucher after the existing one is expired") {
            //请在现有的第二张订单凭证过期后创建新的第二个订单凭证
            this.g02(["写入成功"])
        }
        else {            
            Tool.pre(["出错222：", oo]);
            this.g01()
        }
    },
    //////////////////////////////////////////////////////////
    e01: function () {
        //@.status=1        表示【上架商品】
        let data=[{
            action: "sqlite",
            database: "shopee/商品/店铺商品/"+ obj.params.site,
            sql: "select @.fromid as itemid from @.table where @.status=1 order by @._1688_saleNum desc limit 100",
        }]          
        $("#state").html("正在获取本地商品。。。");        
        Tool.ajax.a01(data, this.e02, this);
    },
    e02: function (t) {   
        let items=t[0]
        // for(let i=0;i<t[0].length;i++){
        //     items.push(t[0][i].fromid)
        // }

        let shopName = this.obj.seller[obj.params.site].shopName.replace(/\_/g, "")
        let voucher_code = shopName.substring(0, 4).toUpperCase() + Tool.userDate13(this.obj.start_time * 1000, "").substr(4) + this.obj.A1;
        let timeStr = Tool.userDate13(this.obj.start_time * 1000, "/").substr(5) + " - " + Tool.userDate13(this.obj.end_time * 1000 + 1000, "/").substr(5)
        let data = {
            "name": "【" + this.obj.A1 + "】商品优惠券 —— " + timeStr,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "voucher_code": voucher_code,
            "value": 10,//折扣金额
            "max_value": null,
            "discount": null,
            "min_price": 100,//最低消费金额
            "usage_quantity": 100,//100张---可使用总数
            "rule": {
                "usage_limit_per_user": 1,
                "items": items,//商品
                "coin_cashback_voucher": {
                    "coin_percentage_real": null,
                    "max_coin": null
                },
                "voucher_landing_page": 1,
                "display_from": Tool.gettime(""),//提前显示优惠券  时间
                "exclusive_channel_type": null,
                "hide": 0,
                "reward_type": 0,
                "backend_created": 0,
                "display_voucher_early": false,//提前显示优惠券
                "choose_users": {
                    "shop_order_count": 0,
                    "shop_order_count_period": 0
                }
            }
        }
        this.d03(data)
    },
    ////////////////////////////////
    f01: function () {
        //关注礼优惠券
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site,
            "start_time=" + this.obj.start_time,
            "end_time=" + this.obj.end_time
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/follow_prize/overlap/?" + pArr.join("&")
        gg.getFetch(url,"json", this.f02, this);
    },
    f02: function (t) {
        if (t.code == 0) {
            this.f03()
        }
        else {
            Tool.pre(["出错333", t])
        }
    },
    f03: function (t) {
        let data = {
            "shopid": this.obj.seller[obj.params.site].shopId,
            "follow_prize_name": "【" + this.obj.A1 + "】关注礼优惠券",
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "quota": 100,
            "min_spend": 20,
            "reward_type": 0,
            "discount": { "value": 2 }
        }
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/follow_prize/create/?" + pArr.join("&");
        let headers = [
            {
                "name": "content-type",
                "value": "application/json;charset=UTF-8"
            },
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d04, this)
    },

    ///////////////////////////////////////////////////
    g01: function () {
        $("#state").html("正在更新活动时间。")
        config[obj.params.site].coupon_time[this.obj.A1 - 1] = this.obj.end_time + 1;       
        let data = [{
            action: "fs",
            fun: "writeFile",
            path: "public/" + o.path + "admin/js/Shopee/营销中心/config.js",
            data: "let config=" + JSON.stringify(config, null, 2),
        }]       
        Tool.ajax.a01(data, this.g02, this);
    },
    g02: function (t) {
        if (t[0] == "写入成功") {
            $("#state").html("更新活动时间成功。")
            this.obj.A1++;
            this.a04();
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01();