var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        seller: {},//提交要用
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : 1;//翻页
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 旧版 &gt; 获取【全部广告】信息') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
 		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        this.obj.A1 = Tool.int(obj.arr[6]);
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
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5],
            "campaign_type=cpc_homepage",
            "campaign_state=all",
            "sort_key=performance",
            "sort_direction=1",
            "search_content=",
            "start_time=" + (Tool.gettime(Tool.userDate13(Date.now())) - 60 * 60 * 24 * 7),//7天
            "end_time=" + (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1 - 1),//当天结束
            "offset=" + ((this.obj.A1 - 1) * 20),//第一页为“0”    第二页为“20”        第三页为：“40”
            "limit=20",
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/homepage/?" + pArr.join("&")
        $("#url").html(url);
        $("#state").html("正在获取广告信息。。。");
        gg.getFetch(url,"json", this.a05, this)
    },
    a05: function (oo) {
        if (oo.message == "success") {
            this.obj.A2 = Math.ceil(oo.data.total_count / 20)
            this.obj.B2 = oo.data.campaign_ads_list.length;
            this.obj.Barr = oo.data.campaign_ads_list;
            this.a06()
        }
        else {
            Tool.pre(["出错11", oo])
        }
    },
    a06: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null);
    },
    /////////////////////////////////
    b01: function (type) {
        let str = ""
        if (type == "keyword") {
            str = "search_product"
        }
        else if (type == "targeting") {
            str = "targeting";
        }
        else {
            Tool.pre(["ffffff", type])
            aaaaaaaaaaaaaaa
        }
        return str;
    },
    ///////////////////////////
    d01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.e01);
    },
    d02: function () {
        let Barr = this.obj.Barr[this.obj.B1 - 1]
        if (Barr.campaign.type == "keyword") {
            Tool.common_keyword_br.a01(this.obj.seller, obj.arr[5], Barr.campaign.campaignid, this.d03, this)
        }
        else if (Barr.campaign.type == "targeting") {
            this.d03([]);
        }
        else {
            Tool.pre(["出错01", Barr])
        }
    },
    d03: function (t) {
        this.obj.Barr[this.obj.B1 - 1].keywords = t;
        this.obj.B1++;
        $("#state").html("正在进入第" + this.obj.B1 + "条。。。");
        this.d01();
    },
    //////////////////////////////////////////////
    e01: function () {
        let nArr = [], arr = this.obj.Barr;
        for (let i = 0; i < arr.length; i++) {
            let arrL = [
                "@.site",
                "@.fromid",
                "@.daily_budget",
                "@.total_budget",
                "@.start_time",
                "@.end_time",
                "@.productID",
                "@.image",
                "@.product_placement",//搜索广告或关联广告
                "@.state",
                "@.title",
                "@.key_uptime",
                "@.trait_list",//商品状态
                "@.keywords",
                "@.report_impression",
                "@.report_click",
            ]
            let arrR = [
                "'" + obj.arr[5] + "'",
                arr[i].campaign.campaignid,
                arr[i].campaign.daily_quota,
                arr[i].campaign.total_quota,
                arr[i].campaign.start_time,
                arr[i].campaign.end_time,
                arr[i].product.itemid,
                Tool.rpsql(arr[i].product.images.split(",")[0]),
                Tool.rpsql(this.b01(arr[i].campaign.type)),
                Tool.rpsql(arr[i].campaign.state),
                Tool.rpsql(arr[i].product.name),
                0,
                Tool.rpsql(arr[i].product.state),
                Tool.rpsql(JSON.stringify(arr[i].keywords)),
                arr[i].report.impression.value,
                arr[i].report.click.value,
            ];
            let insert = '<r: db="sqlite.shopee">insert into @.ads(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>'
            let updateArr = []; for (let i = 0; i < arrL.length; i++) { updateArr.push(arrL[i] + "=" + arrR[i]); }
            let update = '<r: db="sqlite.shopee">update @.ads set ' + updateArr.join(",") + ' where @.fromid=' + arr[i].campaign.campaignid + '</r:>'
            let select = 'Fun(Db(sqlite.shopee,select count(1) from @.ads where @.fromid=' + arr[i].campaign.campaignid + ',count))'
            nArr.push('<if ' + select + '==0>' + insert + '<else/>' + update + '</if>')
        }
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + nArr.join(""), 1, this.e02, this)
    },
    e02: function (t) {
        if (t == "ok") {
            this.obj.B1 = 1; this.obj.B2 = 0; this.obj.Barr = [];
            $("#B1").css("width", "0%");
            $("#B1,#B2").html("")
            this.obj.A1++;
            Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/" + obj.arr[5] + "/" + this.obj.A1)
        }
        else {
            Tool.pre(["出错333", t])
        }
    },
}
fun.a01();