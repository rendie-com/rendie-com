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
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//类型
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//暂停或重启广告
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 旧版 &gt; 类型 &gt; 暂停或重启广告') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="right w150">说明：</td><td colspan="2">如果是【重启广告】，那就把【最小购买量】<=2的广告【重启广告】，否则不限制</td></tr>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
  		            <tr><td class="right">类型：</td><td colspan="2">'+ this.b01(obj.arr[6]) + '</td></tr>\
  		            <tr><td class="right">执行功能：</td><td colspan="2">'+ this.b02(obj.arr[7]) + '</td></tr>\
                    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function (t) {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
        // @.state      paused:暂停中；ongoing:进行中；scheduled:已预设；ended:已结束；closed:已结束； and @.state<&gt;\'closed\'
        let str = '[\
        ' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:ads size=50 db="sqlite.shopee" page=2 where=" where @.site=\''+ obj.arr[5] + '\' and @.product_placement=\'' + obj.arr[6] + '\'">,\
        {\
            "fromid":<:fromid/>,\
             <r:shopPro_'+ obj.arr[5] + ' size=1 db="sqlite.shopee" where=" where @.fromid=<:productID/>">\
 			    "MinimumOrder":<:MinimumOrder/>,\
 			    "input_normal_price":<:input_normal_price/>,\
 			    "newDiscount":<:newDiscount/>-6,\
 			    "_1688_saleNum":<:_1688_saleNum/>,\
 			    "unitWeight":<:unitWeight/>*1000,\
            </r:shopPro_'+ obj.arr[5] + '>\
        }\
		</r:ads>]'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[0]; }
        t.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t);
    },
    b01: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "all": str = "全部"; break;
            case "search_product": str = "搜索"; break;
            case "targeting": str = "关联"; break;
        }
        return str
    },
    b02: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "3": str = "重启广告"; break;
            case "1": str = "暂停广告"; break;
        }
        return str
    },
    b03: function (type, arr) {
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (type == "3") {//如果是【重启广告】，那就把【最小购买量】<=2的广告【重启广告】，否则不限制
                let price = (Math.round((arr[i].input_normal_price * (1 - arr[i].newDiscount / 100)) * 10000) / 10000)
                if (arr[i].MinimumOrder <= 2 && price < this.obj.seller[obj.arr[5]].fullPrice && arr[i].unitWeight < 90 && arr[i]._1688_saleNum > 5000) {
                    nArr.push(arr[i].fromid)
                }
            }
            else {
                nArr.push(arr[i].fromid)
            }
        }
        return nArr
    },
    ///////////////////////////////////////////////
    d01: function (t) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/mass_edit/?" + arr.join("&")
        let campaignid_list = this.b03(obj.arr[7], t)
        let data = {
            "campaignid_list": campaignid_list,
            "action": Tool.int(obj.arr[7]),
            "need_campaign": true,
            "start_time": 0,
            "end_time": 0
        }
        if (campaignid_list.length == 0) {
            this.d04("ok")
        }
        else {
            $("#state").html("正在" + this.b02(obj.arr[7]) + "。。。");
            gg.typeHtml(url, "PUT", JSON.stringify(data), this.d02, this)
        }
    },
    d02: function (t) {
        if (t.code == 0) {
            this.d03(t.data.campaign_list)
        }
        else {
            Tool.pre(["出错11", t])
        }
    },
    d03: function (arr) {
        let updateArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].campaign.state) {
                //@.state       广告状态：	进行中
                updateArr.push('update @.ads set @.state=\'' + arr[i].campaign.state + '\' where @.site=\'' + obj.arr[5] + '\' and @.fromid=' + arr[i].campaign.campaignid)
            }
        }
        let str = '<r: db="sqlite.shopee">' + updateArr.join("<1/>") + '</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.d04, this)
    },
    d04: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a04();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d05: function (t) {
        let str = '<r: db="sqlite.shopee">update @.ads set @.state=\'paused\' where @.fromid in (' + t.join(",") + ')</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.d04, this)
    },
}
fun.a01();