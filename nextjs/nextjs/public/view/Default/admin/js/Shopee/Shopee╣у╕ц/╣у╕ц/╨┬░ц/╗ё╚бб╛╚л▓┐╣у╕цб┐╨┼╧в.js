var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        seller: {},//提交要用
    },
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        //obj.params.site
        let html = Tool.header(obj.params.return, 'Shopee &gt; Shopee广告 &gt; 广告 &gt; 新版 &gt; 获取【全部广告】信息') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
 		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
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
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/homepage/query/?" + pArr.join("&")

        $("#url").html(url + '【post】');
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json;charset=UTF-8'
            },
        ]
        $("#state").html("正在获取广告信息。。。");
        let data = {
            "start_time": (Tool.gettime(Tool.userDate13(Date.now())) - 60 * 60 * 24 * 30),//30天
            "end_time": (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1 - 1),//当天结束
            "filter": {
                "campaign_type": "new_cpc_homepage",
                "state": "all",
                "search_term": ""
            },
            "offset": + ((this.obj.A1 - 1) * 20),//第一页为“0”    第二页为“20”        第三页为：“40”
            "limit": 20
        }
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a05, this)
    },
    a05: function (oo) {
        if (oo.msg == "OK") {
            this.obj.A2 = Math.ceil(oo.data.total / 20)
            this.obj.B2 = oo.data.entry_list.length;
            this.obj.Barr = oo.data.entry_list;
            this.a06()
        }
        else {
            Tool.pre(["出错11", oo])
        }
    },
    a06: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null);
    },
    /////////////////////////
    d01: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.e01);
    },
    d02: function () {
        let Barr = this.obj.Barr[this.obj.B1 - 1]
        if (Barr.type == "product_manual") {
            //商品广告
            Tool.common_keyword.a01(this.obj.seller, obj.params.site, Barr.campaign.campaign_id, this.d03, this)
        }
        else {
            Tool.pre(["出错", Barr])
        }
    },
    d03: function (t) {
        this.obj.Barr[this.obj.B1 - 1].keywords = t;
        this.obj.B1++;
        $("#state").html("正在进入第" + this.obj.B1 + "条。。。");
        this.d01();
    },
    ////////////////////////////////////////////
    e01: function () {
        let arr = this.obj.Barr, oo = { insertArr: [], updateArr: [], fromidArr: [] };
        for (let i = 0; i < arr.length; i++) {
            let arrL = [
                "@.site",
                "@.fromid",
                "@.daily_budget",
                "@.total_budget",
                "@.start_time",
                "@.state",
                "@.end_time",
                "@.type",
                "@.keywords",
                "@.productID",
                "@.image",
                "@.title",
                "@.product_placement",//搜索广告或关联广告
                "@.trait_list",//商品状态数组
                "@.key_uptime",
                "@.report_impression",
                "@.report_click",
            ]
            let arrR = [
                "'" + obj.params.site + "'",
                arr[i].campaign.campaign_id,
                arr[i].campaign.daily_budget,
                arr[i].campaign.total_budget,
                arr[i].campaign.start_time,
                Tool.rpsql(arr[i].state),
                arr[i].campaign.end_time,
                Tool.rpsql(arr[i].type),
                Tool.rpsql(JSON.stringify(arr[i].keywords)),
                arr[i].manual_product_ads.item_id,
                Tool.rpsql(arr[i].image),
                Tool.rpsql(arr[i].title),
                Tool.rpsql(arr[i].manual_product_ads.product_placement),
                arr[i].trait_list[0] ? Tool.rpsql(arr[i].trait_list[0]) : "'normal'",
                0,
                arr[i].report.impression,
                arr[i].report.click,
            ];
            //////////////////////////////////////////////////////
            oo.insertArr.push('insert into @.table(' + arrL.join(",") + ')values(' + arrR.join(",") + ')')
            let updateArr = []; for (let i = 0; i < arrL.length; i++) { updateArr.push(arrL[i] + "=" + arrR[i]); }
            oo.updateArr.push('update @.table set ' + updateArr.join(",") + ' where @.fromid=' + arr[i].campaign.campaign_id)
            oo.fromidArr.push(arr[i].campaign.campaign_id);
        }
        this.e02(oo);
    },
    e02: function (oo) {
        let data = [{
            action: "sqlite",
            database: "shopee/Shopee广告/广告",
            sql: "select @.fromid as fromid from @.table where @.fromid in('" + oo.fromidArr.join("','") + "')",
        }]
        $("#state").html("正在获取广告ID。。。");
        Tool.ajax.a01(data, this.e03, this, oo);
    },
    e03: function (t, oo) {
        if (t[0].length == 0) {
            $("#state").html("正在插入。。。");
            this.e04(oo.insertArr, oo)
        }
        else {
            $("#state").html("正在插入2。。。");
            let fromidArr = [], sqlArr = [];
            for (let i = 0; i < t[0].length; i++) {
                fromidArr.push(t[0][i].fromid)
            }
            for (let i = 0; i < oo.fromidArr.length; i++) {
                if (fromidArr.indexOf(oo.fromidArr[i]) == -1) {
                    sqlArr.push(oo.insertArr[i])
                }
                else {
                    sqlArr.push(oo.updateArr[i])
                }
            }
            this.e04(sqlArr, oo)
        }
    },
    e04: function (sqlArr, oo) {
        let data = []
        for (let i = 0; i < sqlArr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/Shopee广告/广告",
                sql: sqlArr[i]
            })
        }
        Tool.ajax.a01(data, this.e05, this, oo)
    },
    e05: function (t) {
        let isErr = false
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.e06()
        }
    },
    e06: function (t) {
        this.obj.B1 = 1; this.obj.B2 = 0; this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();