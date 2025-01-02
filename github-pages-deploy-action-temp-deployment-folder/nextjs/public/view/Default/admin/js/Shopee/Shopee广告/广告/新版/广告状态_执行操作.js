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
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//广告状态
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//执行操作
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 新版 &gt; 版位_执行操作') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
  		            <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
  		            <tr><td class="right">广告状态：</td><td colspan="2">'+ this.b01(obj.arr[6]) + '</td></tr>\
  		            <tr><td class="right">执行操作：</td><td colspan="2">'+ this.b02(obj.arr[7]) + '</td></tr>\
                    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
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
        this.d01()
    },
    b01: function (state) {
        let txt = "未知:" + state;
        switch (state) {
            case "paused": txt = '<span style="color:#eda500;background:#fff7e0;" class="p-1">暂停中</span>'; break;
            case "ongoing": txt = '<span style="color: #5c7;background:#ebf9ef;" class="p-1">进行中</span>'; break;
            case "scheduled": txt = '<span style="color: #2673dd;background:#e5eefb;" class="p-1">已预设</span>'; break;
            case "ended": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已结束</span>'; break;
            case "closed": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已关闭</span>'; break;
            case "deleted": txt = '<span style="color:#999;background:hsla(0, 0%, 60%, .12); " class="p-1">已删除</span>'; break;
        }
        return txt
    },
    b02: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "1": str = "立即开始"; break;
            case "2": str = "暂停"; break;
            case "3": str = "重启"; break;
            case "4": str = "删除"; break;
        }
        return str
    },
    b03: function (type) {
        let str = "未知:" + type;
        switch (type) {
            case "1": str = "start"; break;
            case "2": str = "pause"; break;
            case "3": str = "resume"; break;
            case "4": str = "delete"; break;
        }
        return str
    },
    b04: function (type) {
        let str = "";
        switch (type) {
            case "1": str = "@.end_time=0,@.state='ongoing'"; break; //@.end_time = 0;//设置为0，就表示不限制
            case "2": str = "@.state='paused'"; break;
            case "3": str = "@.state='ongoing'"; break;
            case "4": str = "@.state='deleted'"; break;
        }
        return str;
    },
    b05: function (type, arr) {
        let n1Arr = [],//达标
            n2Arr = [];//不达标
        for (let i = 0; i < arr.length; i++) {
            if (type == "3") {//如果是【重启广告】
                let price = (Math.round((arr[i].input_normal_price * (1 - arr[i].newDiscount / 100)) * 10000) / 10000)
                if (arr[i].MinimumOrder <= 2 && price < this.obj.seller[obj.arr[5]].fullPrice && arr[i].unitWeight < 90 && arr[i]._1688_saleNum > 5000) {
                    n1Arr.push(arr[i].fromid)
                }
                else {
                    n2Arr.push(arr[i].fromid)
                }
            }
            else {
                n1Arr.push(arr[i].fromid)
            }
        }
        return [n1Arr, n2Arr]
    },
    //////////////////////////////
    d01: function () {
        // @.state      paused:暂停中；ongoing:进行中；scheduled:已预设；ended:已结束；closed:已结束
        let str = '[\
        ' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:ads size=50 db="sqlite.shopee" page=2 where=" where @.site=\''+ obj.arr[5] + '\' and @.state=\'' + obj.arr[6] + '\'">,\
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
        Tool.ajax.a01(str, 1, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[0]; }
        t.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, t);
    },
    d03: function (t) {
        let nArr = this.b05(obj.arr[7], t)
        if (nArr[1].length) {//不达标有数据
            //为什么还要这么一出？答：因为第次都是第一页，所以必需要改动一下。
            //self_NoStandard       表示【重启不达标】
            let str = '<r: db="sqlite.shopee">update @.ads set @.state=\'self_NoStandard\' where @.fromid in(' + nArr[1].join(",") + ')</r:>'
            $("#state").html("正在更新。。。");
            Tool.ajax.a01('"ok"' + str, 1, this.d04, this, nArr[0])
        }
        else {
            this.e01(nArr[0])
        }
    },
    d04: function (t, arr) {
        if (t == "ok") {
            this.e01(arr)
        }
        else {
            Tool.pre(["出更新出错", t])
        }
    },
    ////////////////////////////////////////////////////////
    e01: function (t) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/homepage/mass_edit/?" + arr.join("&")
        let data = {
            "campaign_id_list": t,
            "type": this.b03(obj.arr[7])
        }
        if (t.length == 0) {
            this.e04("ok")
        }
        else {
            $("#state").html("正在【" + this.b02(obj.arr[7]) + "】。。。");
            gg.postFetch(url, JSON.stringify(data), this.e02, this, t)
        }
    },
    e02: function (t, arr) {
        if (t.msg == "OK") {
            this.e03(arr)
        }
        else if (t.code == 9) {
            $("#state").html("启动不了，设置为【异常】。。。");
            this.f01(t.data.fail_list)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    e03: function (arr) {
        let str = '<r: db="sqlite.shopee">update @.ads set ' + this.b04(obj.arr[7]) + ' where @.fromid in(' + arr.join(",") + ')</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.e04, this)
    },
    e04: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    //////////////////////////////
    f01: function (arr) {
        let campaign_idArr = []
        for (let i = 0; i < arr.length; i++) {
            campaign_idArr.push(arr[i].campaign_id)
        }
        // @.state=\'self_abnormal\'        表示异常
        let str = '<r: db="sqlite.shopee">update @.ads set @.state=\'self_abnormal\' where @.fromid in(' + campaign_idArr.join(",") + ')</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.e04, this)
    }
}
fun.a01();