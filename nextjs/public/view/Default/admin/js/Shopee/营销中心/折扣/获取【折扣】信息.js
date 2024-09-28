'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 3,//1:接下来的活动；2:进行中的活动；3:已过期；
        B1: 1, B2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 折扣列表 &gt; 获取【折扣】信息") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
   		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
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
        this.a04();
    },
    a04: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null)
    },
    d01: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/discount/get_discount_list/?" + arr.join("&")
        $("#url").html(url + '[post]');
        $("#state").html("正在获取第" + this.obj.A1 + "页【折扣】信息。。。");
        let data = {
            "need_count": true,
            "need_image": true,
            "offset": + ((this.obj.B1 - 1) * 10),//第一页为“0”    第二页为“10”        第三页为：“20”
            "limit": 10,
            "schedule_status": this.obj.A1,
            "primary_key": "DiscountList"
        }
        gg.postFetch(url, JSON.stringify(data), this.d02, this);
    },
    d02: function (oo) {
        if (oo.error == 0) {
            this.obj.B2 = Math.ceil(oo.data.total_count / 10)
            this.d03(oo.data.discount_list)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d03: function (discount_list) {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d04, this, this.e01, discount_list)
    },
    d04: function (discount_list) {
        //说明：discount_list[i].status  这个没什么用。
        let promotion_idArr = [], insertArr = [], updateArr = [];
        for (let i = 0; i < discount_list.length; i++) {
            promotion_idArr.push(discount_list[i].promotion_id)
            let ins1 = "@.promotion_id,@.title,@.status,@.start_time,@.end_time,@.site,@.addtime,@.images,@.total_product"
            let ins2 = discount_list[i].promotion_id + "," + Tool.rpsql(discount_list[i].title) + "," + this.obj.A1 + "," + discount_list[i].start_time + "," + discount_list[i].end_time + ",'" + obj.params.site + "'," + Tool.gettime("") + "," + Tool.rpsql(JSON.stringify(discount_list[i].images)) + "," + discount_list[i].total_product
            insertArr.push("insert into @.table(" + ins1 + ")values(" + ins2 + ")")
            updateArr.push("update @.table set @.status=" + this.obj.A1 + ",@.images=" + Tool.rpsql(JSON.stringify(discount_list[i].images)) + "  where @.promotion_id=" + discount_list[i].promotion_id)
        }
        let oo = {
            promotion_idArr: promotion_idArr,
            insertArr: insertArr,
            updateArr: updateArr
        }
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/折扣",
            sql: "select @.promotion_id as promotion_id from @.table where @.promotion_id in(" + promotion_idArr.join(",") + ") and @.site='" + obj.params.site + "'",
        }]
        Tool.ajax.a01(data, this.d05, this, oo)
    },
    d05: function (t, oo) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].promotion_id);
        }
        this.d06(arr, oo)
    },
    d06: function (arr1, oo) {
        let arr2 = oo.promotion_idArr, data = []
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/折扣",
                    sql: oo.insertArr[i],
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/折扣",
                    sql: oo.updateArr[i],
                })
            }
        }
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.a10, this)
    },
    a10: function (t) {
        let isErr = false;
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
            this.obj.B1++;
            $("#state").html("正在进入第" + this.obj.B1 + "页。。。");
            this.d01();
        }
    },
    e01: function () {
        this.obj.B1 = 1;this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();