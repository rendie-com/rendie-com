var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        start_time: Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 30,
        end_time: 0,
        seller: {},//提交要用
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//类型
        this.obj.end_time = this.obj.start_time + 60 * 60 * 24 * 1 - 1
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 旧版 &gt; 类型 &gt; 修改广告时间') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
  		            <tr><td class="right">类型：</td><td colspan="2">'+ this.b01(obj.arr[6]) + '</td></tr>\
  		            <tr><td class="right">编辑时长：</td><td colspan="2" class="p-0">'+ this.b02() + '</td></tr>\
                    <tr><td class="right">操作：</td><td colspan="2"><button type="button" class="btn btn-secondary" onclick="fun.c01($(this))">提交</button></td></tr>\
                    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "search_product": str = "搜索"; break;
            case "targeting": str = "关联广告"; break;
            case "boost_ads": str = "推广"; break;
        }
        return str
    },
    b02: function () {
        return '\
        <table class="table mb-0 align-middle">\
        <tr>\
            <td>\
                <div class="form-check">\
                    <input class="form-check-input" type="radio" checked value="0" name="typeTime" id="typeTime1">\
                    <label class="form-check-label" for="typeTime1">不限时</label>\
                </div>\
            </td>\
            <td></td>\
        </tr>\
        <tr>\
            <td class="w200">\
                <div class="form-check">\
                    <input class="form-check-input" type="radio" value="1" name="typeTime" id="typeTime2">\
                    <label class="form-check-label" for="typeTime2">设定开始日期/结束日期</label>\
                </div>\
            </td>\
            <td>'+ this.b03() + '</td>\
        </tr>\
        </table>'
    },
    b03: function () {
        return '\
        <table class="">\
            <tr>\
                <td class="right w100">开始时间：</td>\
                <td><input type="datetime-local" id="start_time" value="' + Tool.js_date_time2(this.obj.start_time, "-") + '" class="form-control w250"></td>\
            </tr>\
            <tr>\
                <td class="right">结束时间：</td>\
                <td><input type="datetime-local" id="end_time" value="'+ Tool.js_date_time2(this.obj.end_time, "-") + '" class="form-control w250"></td>\
            </tr>\
        </table>'
    },
    ///////////////////////////////////
    c01: function (This) {
        let start_time = $("#start_time")
        let end_time = $("#end_time")
        let typeTime = $("[name='typeTime']")
        if (typeTime.val() == "0") {
            this.obj.start_time = Tool.gettime(Tool.userDate13(Date.now()));
            this.obj.end_time = 0;//设置为0，就表示不限制
        }
        else {
            this.obj.start_time = Tool.gettime(start_time.val());
            this.obj.end_time = Tool.gettime(end_time.val());
        }
        This.attr("disabled", "disabled");
        start_time.attr("disabled", "disabled");
        end_time.attr("disabled", "disabled");
        this.d01()
    },
    //////////////////////////////
    d01: function (t) {
        Tool.login.a01(this.d02, this)
    },
    d02: function (t) {
        this.obj.seller = t;
        this.d03()
    },
    d03: function () {
        // @.state      paused:暂停中；ongoing:进行中；scheduled:已预设；ended:已结束；closed:已结束； and @.state<&gt;\'closed\'
        let str = '[\
        ' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:ads size=20 db="sqlite.shopee" page=2 where=" where @.site=\''+ obj.arr[5] + '\' and @.product_placement=\'' + obj.arr[6] + '\'">,\
            <:fromid/>\
		</r:ads>]'
        Tool.ajax.a01(str, this.obj.A1, this.d04, this);
    },
    d04: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[0]; }
        t.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.e01, this, null, t);
    },
    ///////////////////////////////////////////////
    e01: function (t) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/pas/mass_edit/?" + arr.join("&")
        let data = {
            "campaignid_list": t,
            "action": 5,
            "start_time": this.obj.start_time,
            "end_time": this.obj.end_time,
            "need_campaign": true
        }
        $("#state").html("正在修改时间。。。");
        gg.typeHtml(url, "PUT", JSON.stringify(data), this.e02, this)
    },
    e02: function (t) {
        if (t.message == "success") {
            this.e03(t.data.campaign_list)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    e03: function (arr) {
        let updateArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].campaign.campaignid) {
                updateArr.push('update @.ads set @.start_time=' + arr[i].campaign.start_time + ',@.end_time=' + arr[i].campaign.end_time + ', @.state=\'' + arr[i].campaign.state + '\'  where @.fromid=' + arr[i].campaign.campaignid)
            }
        }
        let str = '<r: db="sqlite.shopee">' + updateArr.join("<1/>") + '</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.e04, this)
    },
    e04: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.d03();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();