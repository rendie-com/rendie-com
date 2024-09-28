'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0,
        where: " where @.hide=0",//Seller表的 where语句
        post: {},//post提交的信息
        pro: {}//一个数据库的商品（包括已上传的信息）
    },
    a01: function () {
        let html = Tool.header("Shopee -&gt; 卖家账户 -&gt; 更多 -&gt; 【删除】非正常的商品") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle mb-0">\
      <tbody>\
				<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
				<tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
				<tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
				<tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
    </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获得配置参数");
        Tool.shopeeSeller(this.a04, this);
    },
    a04: function () {
        $("#username").html(this.obj.username);
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this)
    },
    a05: function () {
        $("#state").html("正在获取商品信息。。。");
        Tool.ajax.a01(this.b01(), 1, this.a06, this);
    },
    a06: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo[0]; }
        oo.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.C2, this.a07, this, null, oo)
    },
    a07: function (arr) {
        let url = "https://seller.shopee.cn/api/v3/mtsku/delete_mtsku/?SPC_CDS_VER=2"
        $("#state").html("正在删除。。。");
        gg.postJson(url, { "mtsku_item_id_list": arr }, this.a08, this)
    },
    a08: function (oo) {
        if (oo.code == 0) {
            $("#state").html("这一页删除完成。。。");
            let arr = oo.data.result, nArr = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].code == 0) {
                    nArr.push(arr[i].data.id)
                }
            }
            this.a09(nArr);
        }
        else { Tool.pre(["出错：", oo]) }

    },
    a09: function (idArr) {
        let str = '""<r: db="sqlite.aliexpress">update @.pro set @.isUpShopee=0 where @.proid in(\'' + idArr.join("','") + '\')<1/>delete from @.proUpShopee where @.fromid in(' + idArr.join(",") + ')</r:>';
        $("#state").html("正在更新...");
        Tool.ajax.a01(str, 1, this.a10, this);
    },
    a10: function () {
        this.obj.B1++;
        this.a05();
    },
    b01: function () {
        return '[' + (this.obj.B2 == 0 ? '<@page/>' : '0') + '\
      <r:proUpShopee db="sqlite.aliexpress" size=10 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+ this.obj.fromid + ' and b.@.hide&gt;0">\
       ,<:a.@.fromid/>\
    	</r:proUpShopee>]'
    },
}
fun.a01();