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
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 优惠券列表 &gt; 获取【优惠券】信息") + '\
        <div class="p-2">\
        <table class="table table-hover">\
            <tbody>\
   		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "offset=" + ((this.obj.A1 - 1) * 10),//第一页为“0”    第二页为“10”        第三页为：“20”
            "limit=10",
            "promotion_type=0",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v3/voucher/list/?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.A1 + "页【优惠券】信息。。。");
        gg.getFetch(url,"json", this.a05, this);
    },
    a05: function (oo) {
        if (oo.code == 0) {
            this.obj.A2 = Math.ceil(oo.data.total_count / 10)
            this.a06(oo.data.voucher_list)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    a06: function (voucher_list) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07, this, null, voucher_list)
    },
    a07: function (voucher_list) {
        let voucher_idArr = [], insertArr = [], updateArr = [];
        for (let i = 0; i < voucher_list.length; i++) {
            voucher_idArr.push(voucher_list[i].voucher_id)
            insertArr.push("insert into @.table(@.voucher_id,@.name,@.voucher_code,@.start_time,@.end_time,@.discount,@.usage_quantity,@.min_price,@.max_value,@.value,@.site,@.addtime,@.uptime,@.fe_display_coin_amount,@.rule,@.fe_status)values(" + voucher_list[i].voucher_id + "," + Tool.rpsql(voucher_list[i].name) + "," + Tool.rpsql(voucher_list[i].voucher_code) + "," + voucher_list[i].start_time + "," + voucher_list[i].end_time + "," + voucher_list[i].discount + "," + voucher_list[i].usage_quantity + "," + voucher_list[i].min_price + "," + voucher_list[i].max_value + "," + voucher_list[i].value + ",'" + obj.params.site + "'," + voucher_list[i].ctime + "," + voucher_list[i].mtime + "," + (voucher_list[i].fe_display_coin_amount ? voucher_list[i].fe_display_coin_amount : 0) + "," + Tool.rpsql(JSON.stringify(voucher_list[i].rule)) + "," + voucher_list[i].fe_status + ")")
            updateArr.push("update @.table set @.uptime=" + voucher_list[i].mtime + ",@.fe_status=" + voucher_list[i].fe_status + "  where @.voucher_id=" + voucher_list[i].voucher_id)
        }
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/优惠券",
            sql: "select @.voucher_id as voucher_id from @.table where @.voucher_id in(" + voucher_idArr.join(",") + ") and @.site='" + obj.params.site + "'",
        }]
        let oo = {
            voucher_idArr: voucher_idArr,
            insertArr: insertArr,
            updateArr: updateArr
        }
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.a08, this, oo)
    },
    a08: function (t, oo) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].voucher_id)
        }
        this.a09(arr, oo)
    },
    a09: function (arr1, oo) {
        let arr2 = oo.voucher_idArr, data = []
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/优惠券",
                    sql: oo.insertArr[i],
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/优惠券",
                    sql: oo.updateArr[i],
                })
            }
        }
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
            this.obj.A1++;
            $("#state").html("正在进入第" + this.obj.A1 + "页。。。");
            this.a04();
        }
    },
}
fun.a01();