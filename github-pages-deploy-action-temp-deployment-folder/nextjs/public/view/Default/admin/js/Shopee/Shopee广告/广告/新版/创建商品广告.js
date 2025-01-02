var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},//提交要用
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 新版 &gt; 创建商品广告') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="right">说明：</td><td colspan="2">只有上架的商品可以【创建商品广告】。</td></tr>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">广告进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品ID：</td><td id="fromid" colspan="2"></td></tr>\
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
        let price, daily_quota, isErr = false;
        if (obj.arr[5] == "my") {
            price = 0.07;//最低价限制
            daily_quota = 2;//每日预算限制
        }
        else if (obj.arr[5] == "br") {
            price = 0.11;//最低价限制
            daily_quota = 3;//每日预算限制
        }
        else if (obj.arr[5] == "tw") {
            price = 1.2;//最低价限制
            daily_quota = 40;//每日预算限制
        }
        else {
            Tool.at("没开发");
        }
        if (!isErr) {
            t[obj.arr[5]].price = price
            t[obj.arr[5]].daily_quota = daily_quota
            this.obj.seller = t;
            this.a04()
        }
    },
    a04: function () {
        //@.status=1        表示：上架商品
        //state             表示广告状态
        let str = '{\
        "count":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '\
        <r:shopPro_' + obj.arr[5] + ' size=1 db="sqlite.shopee" page=2 where=" where @.status=1">,\
            "fromid":<:fromid/>,\
            <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.productId=<:fromid/> and @.product_placement=\'all\' and not(@.state=\'deleted\' or @.state=\'closed\')">\
			    "state":<:state tag=json/>,\
		    </r:ads>\
        </r:shopPro_'+ obj.arr[5] + '>}'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t.count; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t);
    },
    ////////////////////////
    d01: function (t) {
        $("#fromid").html(t.fromid)
        if (t.state) {
            $("#state").html("过")
            this.d07("ok")
        }
        else {
            this.d02(t.fromid)
        }
    },
    d02: function (fromid) {
        $("#fromid").html(fromid)
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/setup_helper/list_recommended_keyword/?" + arr.join("&")
        $("#url").html(url + ' [post]');
        $("#state").html("正在获取商品关键词。。。");
        let data = {
            "campaign_type": "product",
            "item_id": fromid,
            "suggest_log_data": {
                "page": "suggest_creation",
                "campaign_id": null
            }
        }
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d03, this, fromid)
    },
    d03: function (oo, fromid) {
        if (oo.code == 0) {
            this.d04(oo.data, fromid)
        }
        else if (oo.code == 429) {
            $("#state").html("请不要要求太频繁");
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d04: function (arr, fromid) {
        let keyArr = []
        for (let i = 0; i < 1; i++) {
            keyArr.push({
                "bid_price": Tool.int(this.obj.seller[obj.arr[5]].price * 100000),
                "keyword": arr[i].keyword,
                "match_type": "exact"
            })
        }
        this.d05(keyArr, fromid)
    },
    d05: function (keyArr, fromid) {
        let data = {
            "reference_id": Tool.guid(),//_1746(),
            "campaign": {
                "daily_budget": 0,
                "product_placement": "all",
                "ecpc": true,
                "keyword_list": keyArr,
                "display_location": {
                    "daily_discover": {
                        "state": "active", "bid_price": Tool.int(this.obj.seller[obj.arr[5]].price * 100000),
                    },
                    "you_may_also_like": {
                        "state": "active", "bid_price": Tool.int(this.obj.seller[obj.arr[5]].price * 100000),
                    }
                },
                "bidding_strategy": "manual",
                "product_selection": "manual",
                "start_time": Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 30,
                "end_time": Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 31 - 1,
                "new_product_boost_toggle": false
            },
            "ads_list": [
                {
                    "item_id": fromid
                }
            ], "header": {}
        }
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/product/publish/?" + arr.join("&")
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d06, this);
    },
    d06: function (t) {
        if (t.msg == "OK") {
            let insert = '<r: db="sqlite.shopee">insert into @.ads(@.productId,@.fromid,@.site,@.state,@.trait_list,@.product_placement)values(' + t.data.result_list[0].ads_list[0].item_id + ',' + t.data.result_list[0].campaign_id + ',\'' + obj.arr[5] + '\',\'scheduled\',\'normal\',\'all\')</r:>'
            $("#state").html("正在更新。。。");
            Tool.ajax.a01('"ok"' + insert, 1, this.d07, this)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d07: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();