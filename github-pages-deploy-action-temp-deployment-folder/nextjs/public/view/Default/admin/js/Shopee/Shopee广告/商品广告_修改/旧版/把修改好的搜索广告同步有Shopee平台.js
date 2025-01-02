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
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 搜索广告_修改 &gt; 旧版 &gt; 把修改好的搜索广告同步有Shopee平台') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">广告进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
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
        //and @.productID=27102389668
        let str = '{\
        "A2":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + ',\
        <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.product_placement=\'search_product\'" page="2">\
            "fromid":<:fromid/>,\
            "keywords":<:keywords tag=0/>,\
        </r:ads>\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t);
    },
    //////////////////////////
    d01: function (t) {
        if (t.keywords.length == 0) {
            this.d09();
        }
        else {
            this.d02(t)
        }
    },
    d02: function (oo) {
        //获取广告关键词
        Tool.common_keyword_br.a01(this.obj.seller, obj.arr[5], oo.fromid, this.d03, this, oo)
    },
    d03: function (t, oo) {
        $("#state").html("把shopee平台启用的关键词提取出来。")
        let arr1 = [],//启用的
            arr2 = []//删除的
        for (let i = 0; i < t.length; i++) {
            if (t[i].keyword.state == "active") {
                arr1.push(t[i]);
            }
            else {
                arr2.push(t[i]);
            }
        }
        this.d04(arr1, arr2, oo)
    },
    d04: function (arr1, arr2, oo) {
        $("#state").html("把本地启用的关键词提取出来。")
        let t = oo.keywords;
        let nArr = []//本地启用的关键词
        for (let i = 0; i < t.length; i++) {
            if (t[i].keyword.state == "active") {
                nArr.push(t[i]);
            }
        }
        this.d05(arr1, arr2, nArr, oo);
    },
    d05: function (arr1, arr2, arr3, oo) {
        //arr1      为shopee启用的
        //arr2      为shopee没启用的
        //arr3      为本地启用的
        $("#state").html("shopee启用，本地没启用，就要删除shopee的关键词。")
        let keyword_edit_list = []
        for (let i = 0; i < arr1.length; i++) {
            let isDel = true;//是否能删除
            for (let j = 0; j < arr3.length; j++) {
                if (arr1[i].keyword.keyword == arr3[j].keyword.keyword) {
                    isDel = false;
                    break;
                }
            }
            if (isDel) {
                //删除
                keyword_edit_list.push({
                    "status": 0,//0：表示删除的；1：表示正常的；
                    "price": "" + (arr1[i].keyword.bid_price / 100000),
                    "match_type": 0,//0表示精准匹配；1表示广泛匹配
                    "algorithm": "",
                    "keyword": arr1[i].keyword.keyword
                })
            }
        }
        this.d06(arr1, arr2, arr3, oo, keyword_edit_list)
    },
    d06: function (arr1, arr2, arr3, oo, keyword_edit_list) {
        //arr1      为shopee启用的
        //arr2      为shopee没启用的
        //arr3      为本地启用的
        $("#state").html("本地启用，shopee没启用，有则就要恢复。")
        for (let i = 0; i < arr3.length; i++) {
            let isRestore = false;
            for (let j = 0; j < arr2.length; j++) {
                if (arr3[i].keyword.keyword == arr2[j].keyword.keyword) {
                    isRestore = true;
                    break;
                }
            }
            /////////////////////////////////////////
            if (arr3[i].keyword.bid_price != 11000) {
                Tool.pre(["异常", arr3[i]])
                arr3[i].keyword.bid_price = 11000
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            }
            if (isRestore) {
                //恢复
                keyword_edit_list.push({
                    "status": 1,//0：表示删除的；1：表示正常的；
                    "price": "" + (arr3[i].keyword.bid_price / 100000),
                    "match_type": 0,//0表示精准匹配；1表示广泛匹配
                    "algorithm": "",
                    "keyword": arr3[i].keyword.keyword
                })
            }
            else {
                //////shopee也是启用的，就是跳过，否则添加///////////////////////////////////////
                let isAdd = true;
                for (let j = 0; j < arr1.length; j++) {
                    if (arr3[i].keyword.keyword == arr1[j].keyword.keyword) {
                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    //添加
                    keyword_edit_list.push({
                        "status": 1,//0：表示删除的；1：表示正常的；
                        "price": "" + (arr3[i].keyword.bid_price / 100000),
                        "match_type": 0,//0表示精准匹配；1表示广泛匹配
                        "algorithm": "",
                        "keyword": arr3[i].keyword.keyword
                    })
                }
            }
        }
        if (keyword_edit_list.length == 0) {
            this.d09();
        }
        else {
            this.d07(oo.fromid, keyword_edit_list)
        }
    },
    d07: function (campaign_id, keyword_edit_list) {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/search/?" + pArr.join("&")
        $("#url").html(url + ' [post]');
        $("#state").html("正在获取商品关键词。。。");
        let data = {
            "campaignid": campaign_id,
            "placement": 0,
            "keyword_list": keyword_edit_list
        }
        gg.typeHtml(url, "PUT", JSON.stringify(data), this.d08, this)
    },
    d08: function (t) {
        if (t.message == "success") {
            $("#state").html("说明：重复添加，不会报错。");
            this.d09()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d09: function () {
        this.obj.A1++;
        $("#state").html("下一条。。。");
        this.a04();
    },
}
fun.a01();