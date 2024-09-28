'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,// 页进度
        seller: {},
    },
    a01: function () {
        //obj.params.site           站点
        let html = Tool.header(obj.params.return, "Shopee &gt; 营销中心 &gt; 折扣列表 &gt; 获取【店内秒杀】信息") + '\
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
            "offset=" + ((this.obj.A1 - 1) * 10),//第一页为“0”    第二页为“10”        第三页为：“20”
            "limit=10",
            "type=0",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/marketing/v4/shop_flash_sale/list/?" + arr.join("&")
        $("#url").html(url);
        $("#state").html("正在获取第" + this.obj.A1 + "页【店内秒杀】信息。。。");
        gg.getFetch(url,"json", this.a05, this);
    },
    a05: function (oo) {
        if (oo.message == "success") {
            if (this.obj.A2 == 0) this.obj.A2 = Math.ceil(oo.data.total_count / 10)
            this.a06(oo.data.flash_sale_list)
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    a06: function (flash_sale_list) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, flash_sale_list)
    },
    //////////////////////////////////////////////////
    d01: function (flash_sale_list) {
        let flash_sale_idArr = [], insertArr = [], updateArr = [];
        for (let i = 0; i < flash_sale_list.length; i++) {
            flash_sale_idArr.push(flash_sale_list[i].flash_sale_id)
            let ins1 = "@.flash_sale_id,@.addtime,@.start_time,@.end_time,@.item_count,@.uptime,@.status,@.site,@.timeslot_id,@.type"
            let ins2 = flash_sale_list[i].flash_sale_id + "," + flash_sale_list[i].ctime + "," + flash_sale_list[i].start_time + "," + flash_sale_list[i].end_time + "," + flash_sale_list[i].item_count + "," + flash_sale_list[i].mtime + "," + flash_sale_list[i].status + " ,'" + obj.params.site + "'," + flash_sale_list[i].timeslot_id + "," + flash_sale_list[i].type
            insertArr.push("insert into @.table(" + ins1 + ")values(" + ins2 + ")");
            updateArr.push("update @.table set @.uptime=" + flash_sale_list[i].mtime + ", @.status=" + flash_sale_list[i].status + ", @.type=" + flash_sale_list[i].type + "  where @.flash_sale_id=" + flash_sale_list[i].flash_sale_id + " and @.site='" + obj.params.site + "'");
        }
        let oo = {
            flash_sale_idArr: flash_sale_idArr,
            insertArr: insertArr,
            updateArr: updateArr
        }
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/店内秒杀",
            sql: "select @.flash_sale_id as flash_sale_id from @.table where @.flash_sale_id in(" + flash_sale_idArr.join(",") + ") and @.site='" + obj.params.site + "'",
        }]
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.d02, this, oo);
    },
    d02: function (t, oo) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].flash_sale_id)
        }
        this.d03(arr, oo)
    },
    d03: function (arr1, oo) {
        let arr2 = oo.flash_sale_idArr, data = []
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/店内秒杀",
                    sql: oo.insertArr[i],
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/营销中心/店内秒杀",
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
            this.obj.A1++;
            $("#state").html("正在进入第" + this.obj.A1 + "页。。。");
            Tool.Time("name", 0, this.a04, this);
        }
    },
}
fun.a01();