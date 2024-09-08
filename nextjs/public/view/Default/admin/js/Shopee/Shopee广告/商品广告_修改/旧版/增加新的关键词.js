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
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 搜索广告_修改 &gt; 增加新的关键词') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">广告进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品ID：</td><td id="productID" colspan="2"></td></tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                    <tr><td class="right">说明：</td><td colspan="2">当商品名称修改了，可能会有新的关键词进来，同时会新增关键词，需要翻译后，再调整关键词。</td></tr>\
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
            price = 7000;//最低价限制
            daily_quota = 2;//每日预算限制
        }
        else if (obj.arr[5] == "br") {
            price = 11000;//最低价限制
            daily_quota = 3;//每日预算限制
        }
        else if (obj.arr[5] == "tw") {
            price = 120000;//最低价限制
            daily_quota = 40;//每日预算限制
        }
        else {
            Tool.at("未开发")
            isErr = true;
        }
        if (!isErr) {
            t[obj.arr[5]].price = price
            t[obj.arr[5]].daily_quota = daily_quota
            this.obj.seller = t;
            this.a04()
        }
    },
    a04: function () {
        let str = '{\
        "A2":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + ',\
        <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.product_placement=\'search_product\'" page="2">\
            "fromid":<:fromid/>,\
 			"trait_list":<:trait_list tag=json/>,\
            "productID":<:productID/>,\
            "keywords":<:keywords tag=0/>,\
        </r:ads>\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t);
    },
    //////////////////////////////////
    //关键词是否在数组中存在。
    b01: function (keyword, arr) {
        let oo = false;
        for (let j = 0; j < arr.length; j++) {
            if (keyword == arr[j].keyword.keyword) {
                oo = arr[j];
                break;
            }
        }
        return oo;
    },
    ///////////////////////////////////
    d01: function (t) {
        $("#productID").html(t.productID)
        if (t.trait_list[0] == "item_deleted") {
            $("#state").html("商品已删除，可以跳过。");
            this.e02("ok");
        }
        else {
            this.d02(t)
        }
    },
    d02: function (t) {
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
        let data = {
            "campaign_type": "product",
            "item_id": t.productID,
            "suggest_log_data": {
                "campaign_id": t.fromid,
                "page": "suggest_after_creation"
            }
        }
        $("#url").html(url + ' [post]');
        $("#state").html("正在获取商品关键词。。。");
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d03, this, t)
    },
    d03: function (oo, t) {
        if (oo.code == 0) {
            t.data = oo.data
            Tool.common_add_keyword.a01(oo.data, obj.arr[5], this.d04, this, t)
        }
        else if (oo.code == 429) {
            $("#state").html("请不要要求太频繁");
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d04: function (t) {
        let arr = t.data;
        let nArr = [], isUpTime = false;
        for (let i = 0; i < arr.length; i++) {
            let keyObj = this.b01(arr[i].keyword, t.keywords)//关键词是否在数组中存在。
            if (keyObj) {
                keyObj.self_title_keyword = true;//表示为商品联想词。
                nArr.push(keyObj)
            }
            else {
                //先保存到本地，选中后，再启用。
                nArr.push({
                    "keyword": {
                        "bid_price": this.obj.seller[obj.arr[5]].price,//最低价限制,
                        "keyword": arr[i].keyword,
                        "match_type": "broad",//broad表示广泛匹配;   exact表示精准匹配
                        "recommended_price": arr[i].recommended_price,
                        "state": "deleted"//deleted：表示已删除；active：表示正常
                    },
                    "self_addtime": Tool.gettime(""),
                    "self_title_keyword": true,//表示为商品联想词。
                })
                isUpTime = true;
            }
        }
        this.d05(nArr, t, isUpTime)
    },
    d05: function (nArr, t, isUpTime) {
        //把以前的词填进去
        for (let i = 0; i < t.keywords.length; i++) {
            let keyObj = this.b01(t.keywords[i].keyword.keyword, nArr)//关键词是否在数组中存在。
            if (!keyObj) {
                nArr.push(t.keywords[i])
            }
        }
        this.e01(nArr, t, isUpTime)
    },
    e01: function (nArr, t, isUpTime) {
        let update = '<r: db="sqlite.shopee">update @.ads set @.keywords=' + Tool.rpsql(JSON.stringify(nArr)) + (isUpTime ? ',@.key_uptime=' + Tool.gettime("") :'')+' where @.fromid=' + t.fromid + '</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + update, 1, this.e02, this)
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();

//d05: function (keyword_list, t) {
//    //https://seller.shopee.cn/api/pas/v1/product/manual/mass_edit_keyword/?SPC_CDS=2cef042d-8ca5-4034-8a24-fddc09ebdab2&SPC_CDS_VER=2&cnsc_shop_id=896010703&cbsc_shop_region=my
//    //let data = {
//    //    "campaign_id": 86570046,
//    //    "keyword_edit_list": [
//    //        {
//    //            "keyword": "cincin lelaki",
//    //            "type": "add",
//    //            "add": {
//    //                "bid_price": 7000,
//    //                "match_type": "broad"
//    //            }
//    //        }], "header": {}
//    //}
//    //{"campaign_id":86570046,"keyword_edit_list":[{"keyword":"cincin lelaki","type":"add","add":{"bid_price":7000,"match_type":"exact"}}],"header":{}}
//    //let data = {
//    //    "campaignid": t.fromid,
//    //    "placement": 0,
//    //    "keyword_list": keyword_list
//    //}
//    //let arr = [
//    //    "SPC_CDS=" + this.obj.seller.SPC_CDS,
//    //    "SPC_CDS_VER=2",
//    //    "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
//    //    "cbsc_shop_region=" + obj.arr[5]
//    //]
//    //let url = "https://seller.shopee.cn/api/marketing/v3/pas/search/?" + arr.join("&")
//    //t.keyword_list = keyword_list;
//    //gg.typeHtml(url, "PUT", JSON.stringify(data), this.d06, this, t)
//},
//d06: function (t, oo) {
//    if (t.message == "success") {
//        $("#state").html("说明：重复添加，不会报错。");
//        this.e01(oo)
//    }
//    else {
//        Tool.pre(["添加关键词出错", t])
//    }
//},