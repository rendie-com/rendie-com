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
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 搜索广告_修改 &gt; 修改广告的版位为【全部】') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">广告进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品ID：</td><td id="productID" colspan="2"></td></tr>\
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
        // and @.productID=28550599147
        // and @.state in(\'scheduled\',\'ongoing\',\'paused\',\'paused\')
        let str = '{\
        "A2":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + ',\
        <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.product_placement=\'search_product\' and @.state=\'ongoing\'" page="2">\
            "productID":<:productID/>,\
            "fromid":<:fromid/>,\
        </r:ads>\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t);
    },
    //////////////////////////////
    d01: function (t) {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/product/edit/?" + pArr.join("&")
        $("#url").html(url + ' [post]');
        $("#productID").html(t.productID)
        $("#state").html("正在获取商品关键词。。。");
        let data = {
            "campaign_id": t.fromid,
            "type": "change_product_placement",
            "change_product_placement": {
                "product_placement": "all",
                "display_location": {
                    "daily_discover": {
                        "state": "active",
                        "bid_price": 7000
                    }, "you_may_also_like": {
                        "state": "active",
                        "bid_price": 7000
                    }
                }
            }, "header": {}
        }
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]

        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d02, this)
    },
    d02: function (t) {
        if (t.msg == "OK") {
            this.d03()
        }
        else if (t.code == 500) {
            this.d03()
        }
        //else if (t.code == 0) {
        //    this.d03()
        //}
        else {
            Tool.pre(["出错", t])
        }
    },
    d03: function () {
        this.obj.A1++;
        $("#state").html("下一条。。。");
        this.a04();
    },
}
fun.a01();