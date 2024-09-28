var fun =
{
    obj:
    {
        seller: {},//提交要用
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//站点
        let html = Tool.header('Shopee &gt; Shopee广告 &gt; 广告 &gt; 新版 &gt; 删除重复商品广告') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="right">说明：</td><td colspan="2">重复的只保留一个</td></tr>\
  		            <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">商品ID：</td><td id="fromid" colspan="2"></td></tr>\
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
    d01: function () {
        //为什么没有进度条？答：sql语句GROUP合计，算不出总条数。
        let str = '[0\
        <r:ads size=10 db="sqlite.shopee" where="  where @.site=\''+ obj.arr[5] + '\' and not(@.state=\'deleted\' or @.state=\'closed\') GROUP BY @.productID HAVING COUNT(1) &gt;1">\
			,<:fromid/>\
		</r:ads>\
        ]'
        Tool.ajax.a01(str, this.obj.A1, this.d02, this);
    },
    d02: function (t) {
        t.shift();
        if (t.length == 0) {
            $("#state").html("删除重复完成。");
        }
        else {
            $("#fromid").html(t.join(" , "))
            this.d03(t)
        }
    },
    d03: function (t) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.arr[5]].shopId,
            "cbsc_shop_region=" + obj.arr[5]
        ]
        let url = "https://seller.shopee.cn/api/pas/v1/homepage/mass_edit/?" + arr.join("&")
        let data = {
            "campaign_id_list": t,
            "type": "delete"
        }
        $("#state").html("正在【删除】。。。");
        gg.postFetch(url, JSON.stringify(data), this.d04, this, t)
    },
    d04: function (t, arr) {
        if (t.msg == "OK") {
            this.d05(arr);
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d05: function (arr) {
        let str = '<r: db="sqlite.shopee">update @.ads set @.state=\'deleted\' where @.fromid in(' + arr.join(",") + ')</r:>'
        $("#state").html("正在更新。。。");
        Tool.ajax.a01('"ok"' + str, 1, this.d06, this)
    },
    d06: function (t) {
        if (t == "ok") {
            this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },

}
fun.a01();