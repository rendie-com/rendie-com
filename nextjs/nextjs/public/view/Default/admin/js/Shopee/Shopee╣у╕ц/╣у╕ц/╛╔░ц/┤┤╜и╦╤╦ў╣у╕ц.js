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
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 旧版  &gt; 创建搜索广告') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">广告进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品ID：</td><td id="fromid" colspan="2"></td></tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                    <tr><td class="right">说明：</td><td colspan="2">只有上架的商品可以【创建广告】，否则跳过。</td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        let price, daily_quota
        if (obj.arr[5] == "my") {
            price = 0.07;//最低价限制
            daily_quota = 2;//每日预算限制
        }
        else if (obj.arr[5] == "br") {
            price = 0.11;//最低价限制
            daily_quota = 3;//每日预算限制
        }
        t[obj.arr[5]].price = price
        t[obj.arr[5]].daily_quota = daily_quota
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
        // @.status=1       表示：上架商品
        let str = '{\
        "count":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + '\
        <r:shopPro_' + obj.arr[5] + ' size=1 db="sqlite.shopee" page=2 where=" where @.status=1">,\
            "fromid":<:fromid/>,\
            <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.productId=<:fromid/> and @.product_placement=\'search_product\'">\
			    "trait_list":<:trait_list tag=json/>,\
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
        if (t.trait_list) {
            //下一步
            this.e01()
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
            "placement": 0,
            "suggest_log_data": { "page": "suggest_creation" },
            "item_id": fromid
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
        for (let i = 0; i < arr.length; i++) {
            keyArr.push({
                "match_type": 1,
                "is_recommended": true,
                "keyword": arr[i].keyword,
                "log_key": "",
                "product_suggest_log_data": arr[i].product_suggest_log_data,
                "recommended_price": Math.round(arr[i].recommended_price * 0.00001 * 100) / 100,
                "relevance": arr[i].relevance,
                "search_volume": arr[i].search_volume,
                "state": arr[i].state,
                "price": this.obj.seller[obj.arr[5]].price,
                "type": "recommended",
                "status": 0
            })
        }
        this.d05(keyArr, fromid)
    },
    d05: function (keyArr, fromid) {
        let data = {
            "campaign_ads_list": [
                {
                    "campaign": {
                        "start_time": Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 30,
                        "end_time": Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 31,
                        "daily_quota": this.obj.seller[obj.arr[5]].daily_quota,
                        "total_quota": 0,
                        "status": 1
                    },
                    "advertisements": [
                        {
                            "itemid": fromid,
                            "status": 1,
                            "placement": 0,
                            "extinfo": {
                                "keywords": keyArr,
                                "pricing_type": 0
                            }
                        }
                    ]
                }
            ],
            "ads_audit_event": 4
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
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/campaign/?" + arr.join("&")
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d06, this);
    },
    d06: function (t) {
        /*
        {
          "message": "success",
          "code": 0,
          "data": {
            "res_list": [
              {
                "itemid": 24780626092,
                "adsids": [
                  86055373
                ],
                "err_code": 0,
                "campaignid": 83330156
              }
            ]
          }
        }
        */
        if (t.message == "success") {
            let insert = '<r: db="sqlite.shopee">insert into @.ads(@.productId,@.fromid,@.site,@.trait_list,@.product_placement)values(' + t.data.res_list[0].itemid + ',' + t.data.res_list[0].campaignid + ',\'' + obj.arr[5] + '\',\'normal\',\'search_product\')</r:>'
            $("#state").html("正在更新。。。");
            Tool.ajax.a01('"ok"' + insert, 1, this.d07, this)
        }
        else if (t.code == 1400109600) {
            $("#state").html("这个广告已存在了。。。");
            this.e01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d07: function (t) {
        if (t == "ok") {
            this.e01()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    ///////////////////////////////
    e01: function () {
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();