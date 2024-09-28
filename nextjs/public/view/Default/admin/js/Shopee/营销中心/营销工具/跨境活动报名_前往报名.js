'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0,
        where: " where @.hide=0",
        start_time: 0, end_time: 0,
        username: "", password: "", fromid: 0
    },
    a01: function () {
        let html = Tool.header("正在做活动【SHOPEE -> 卖家账户 -> 营销中心 -> 跨境活动报名_前往报名】...") + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
				<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
				<tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
				<tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
				<tr><td class="right">报名名称：</td><td colspan="2"><h5 id="task_name"></h5></td></tr>\
				<tr><td class="right">报名描述：</td><td id="description" colspan="2"></td></tr>\
				<tr><td class="right">可报名店铺：</td><td id="shop_name" colspan="2"></td></tr>\
				<tr><td class="right">报名活动类型：</td><td id="task_type" colspan="2"></td></tr>\
				<tr><td class="right">状态：</td><td id="task_status" colspan="2"></td></tr>\
				<tr><td class="right">报名时间：</td><td id="time" colspan="2"></td></tr>\
				<tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
				<tr><td class="right">操作：</td><td id="operation" colspan="2"></td></tr>\
				<tr><td class="right">选品条件：</td><td colspan="2">价格小于0.03 美元（1 USD= 4.58 MYR）</td></tr>\
				<tr><td class="right">选品编码：</td><td colspan="2" id="proid"></td></tr>\
      </tbody>\
      </table>\
    </div>'
        Tool.html(this.a02, this, html);
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
        this.obj.start_time = this.obj.time3 == 0 ? Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 : this.obj.time3;//初始化 开始时间
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let url = "https://seller.shopee.cn/api/mkt/cbcmt/sellerapi/task/list?SPC_CDS_VER=2"
        let oo = { "site": "MY", "shop_ids": [896010703], "task_end_period_start_time": 202211, "task_end_period_end_time": 202212, "task_status": ["Ongoing"], "page_num": 1, "page_size": 10 }
        $("#state").html("正在获得活动列表。。。");
        gg.postJson(url, JSON.stringify(oo), this.a06, this)
    },
    a06: function (oo) {
        if (oo.code == 0) {
            if (oo.data.total >= 10) { alert("首次出现10个活动，请与管理员联系。"); }
            else {
                this.obj.Barr = oo.data.rows
                this.obj.B2 = oo.data.total
                this.a07();
            }
        }
        else { alert("不可能到这里来"); }
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this)
    },
    a08: function () {
        let oo = this.obj.Barr[this.obj.B1 - 1]
        $("#task_name").html(oo.task_name);
        $("#description").html(oo.description.replace(/\n/g, "<br/>"));
        $("#shop_name").html(oo.available_shops[0].shop_name);
        $("#task_type").html(oo.task_type);
        $("#task_status").html(this.b01(oo.task_status));
        $("#time").html(Tool.js_date_time(oo.task_start_time, "/") + " - " + Tool.js_date_time(oo.seller_feedback_end_time, "/"));
        $("#state").html("等待用户选择。");
        $("#operation").html('<div class="btn-group">\
			<button type="button" class="btn btn-secondary" onclick="fun.c02()">前往报名</button>\
			<button type="button" class="btn btn-secondary" onclick="fun.c01()">下一个活动</button>\
		</div>')
    },
    b01: function (val) {
        let name = "未知"
        switch (val) {
            case "Ongoing": name = "正在进行"; break;
        }
        return name
    },
    b02: function () {
        return '[0\
      <r:proUpShopee db="sqlite.aliexpress" size=100 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.hide=0 and a.@.examine=2 and a.@.minprice<0.03">,\
			{\
				"fromid":<:a.@.fromid/>,\
				"minprice":<:b.@.minprice/>,\
				"aliexpressFromid":<:b.@.fromid/>\
			}\
    	</r:proUpShopee>]'
        //		"aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
    },
    c01: function () {
        this.obj.B1++;
        this.a07();
    },
    c02: function () {
        Tool.ajax.a01(this.b02(), 1, this.c03, this)
    },
    c03: function (oo) {
        pre(oo)
    }
}
fun.a01();