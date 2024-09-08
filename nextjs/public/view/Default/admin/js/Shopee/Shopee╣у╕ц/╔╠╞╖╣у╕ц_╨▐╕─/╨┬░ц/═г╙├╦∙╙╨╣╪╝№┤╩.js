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
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 搜索广告_修改 &gt; 停用所有关键词') + '\
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
        let str = '{\
        "A2":' + (this.obj.A2 == 0 ? '<@count/>' : '0') + ',\
        <r:ads size=1 db="sqlite.shopee" where=" where @.site=\''+ obj.arr[5] + '\' and @.type=\'keyword\'" page="2">\
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
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/search/?" + pArr.join("&")
        $("#url").html(url + ' [post]');
        $("#state").html("正在获取商品关键词。。。");
        let arr = t.keywords, nArr = [];
        for (let i = 0; i < arr.length; i++) {
            nArr.push({
                "status": 0,
                "price": arr[i].price,
                "match_type": 1,
                "keyword": arr[i].keyword,
                "algorithm": ""
            })
        }
        let data = {
            "campaignid": t.fromid,
            "placement": 0,
            "keyword_list": nArr
        }
        if (t.keywords.length == 0) {
            this.e02("ok");
        }
        else {
            gg.typeHtml(url, "PUT", JSON.stringify(data), this.d05, this, data)
        }
    },
    d05: function (t, data) {
        if (t.message == "success") {
            $("#state").html("说明：重复添加，不会报错。");
            this.e01(data)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    ///////////////////////////////////////////////
    e01: function (oo) {
        let update = '<r: db="sqlite.shopee">update @.ads set @.keywords=' + Tool.rpsql(JSON.stringify(oo.keyword_list)) + ' where @.fromid=' + oo.campaignid + '</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + update, 1, this.e02, this)
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            $("#state").html("下一条。。。");
            this.a04();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();