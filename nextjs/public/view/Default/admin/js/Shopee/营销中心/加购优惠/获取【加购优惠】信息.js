'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        //obj.params.site       站点       
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 折扣列表 &gt; 获取【加购优惠】信息") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
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
        this.obj.seller = t
        this.a04();
    },
    a04: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "count=50",
            "offset=" + ((this.obj.A1 - 1) * 50),//第一页为“0”    第二页为“50”        第三页为：“100”
            "status=0",
            "sub_type=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/add_on_deal/list/?" + arr.join("&")
        $("#url").html(url);
        $("#state").html("正在获取第" + this.obj.A1 + "页【加购优惠】信息。。。");
        gg.getFetch(url,"json", this.a05, this);
    },
    a05: function (oo) {
        if (oo.message == "success") {
            this.obj.A2 = oo.data.has_more ? this.obj.A1 + 1 : this.obj.A1
            this.a06(oo.data.add_on_deal_list)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    a06: function (add_on_deal_list) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, add_on_deal_list)
    },
    ////////////////////////////////////////////////////
    d01: function (add_on_deal_list) {
        let insertArr = [], updateArr = [], add_on_deal_idArr = [];
        for (let i = 0; i < add_on_deal_list.length; i++) {
            add_on_deal_idArr.push(add_on_deal_list[i].add_on_deal_id)
            let arrL = [
                "@.add_on_deal_id",
                "@.add_on_deal_name",
                "@.start_time",
                "@.end_time",
                "@.addtime",
                "@.sub_item_limit",
                "@.sub_item_priority",
                "@.sub_type",
                "@.purchase_min_spend",
                "@.per_gift_num",
                "@.source",
                "@.status",
                "@.site"
            ]
            let arrR = [
                add_on_deal_list[i].add_on_deal_id,
                Tool.rpsql(add_on_deal_list[i].add_on_deal_name),
                add_on_deal_list[i].start_time,
                add_on_deal_list[i].end_time,
                add_on_deal_list[i].create_time,
                add_on_deal_list[i].sub_item_limit,
                Tool.rpsql(JSON.stringify(add_on_deal_list[i].sub_item_priority)),
                add_on_deal_list[i].sub_type,
                add_on_deal_list[i].purchase_min_spend,
                add_on_deal_list[i].per_gift_num,
                add_on_deal_list[i].source,
                add_on_deal_list[i].status,
                "'" + obj.params.site + "'"
            ]
            updateArr.push("update @.table set @.status=" + add_on_deal_list[i].status + " where @.add_on_deal_id=" + add_on_deal_list[i].add_on_deal_id + " and @.site='" + obj.params.site + "'");
            insertArr.push("insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")")
        }
        let oo = {
            add_on_deal_idArr: add_on_deal_idArr,
            insertArr: insertArr,
            updateArr: updateArr
        }
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/加购优惠",
            sql: "select @.add_on_deal_id as add_on_deal_id from @.table where @.add_on_deal_id in(" + add_on_deal_idArr.join(",") + ") and @.site='" + obj.params.site + "'",
        }]
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.d02, this, oo)
    },
    d02: function (t, oo) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].add_on_deal_id)
        }
        this.d03(arr, oo)
    },
    d03: function (arr1, oo) {
        let arr2 = oo.add_on_deal_idArr, data = []
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/加购优惠",
                    sql: oo.insertArr[i],
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/加购优惠",
                    sql: oo.updateArr[i],
                })
            }
        }
        Tool.ajax.a01(data, this.d04, this)
    },
    d04: function (t) {
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
            this.d05()
        }
    },
    d05: function (t) {
        this.obj.A1++;
        if (this.obj.A1 <= this.obj.A2) {
            $("#state").html("正在进入第" + this.obj.A1 + "页。。。");
            this.a04();
        }
        else {
            $("#state").html("全部完成。")
        }
    },
}
fun.a01();