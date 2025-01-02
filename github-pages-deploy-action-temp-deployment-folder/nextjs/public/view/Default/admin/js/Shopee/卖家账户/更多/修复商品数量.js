'use strict';
var fun =
{
	obj:
	{
		A1: 1, A2: 0,
		B1: 1, B2: 0, Barr: [],
		cursor: "",//下一页的字符串
		where: " where @.hide=0"
	},
	a01: function () {
		let html = Tool.header("Shopee -&gt; 卖家账户 -&gt; 更多 -&gt; 正在修复商品数量...") + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
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
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this)
	},
	a05: function () {
		$("#state").html("正在验证账号。。。");
		let url = "https://seller.shopee.cn/api/cnsc/selleraccount/get_session/"
		$("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
		gg.getFetch(url, "json", this.a06, this)
	},
	a06: function (oo) {
		if (oo.code == 0) {
			if (oo.sub_account_info.account_name == this.obj.username) {
				this.a07();
			}
			else { alert("上传的账号不对。"); }
		}
		else {
			alert("可能是没有登陆");
		}
	},
	a07: function () {
		$("#state").html("正在验证账号。。。");
		let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_list/?SPC_CDS_VER=2&page_size=24&cnsc_shop_id=896010703&cbsc_shop_region=my&cursor=" + encodeURIComponent(this.obj.cursor)
		$("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
		gg.getFetch(url, "json", this.a08, this)
	},
	a08: function (oo) {
		if (oo.code == 0) {
			this.obj.B2 = Math.ceil(oo.data.page_info.total / oo.data.page_info.page_size)
			this.obj.cursor = oo.data.page_info.cursor
			let arr = oo.data.list, nArr = []
			for (let i = 0; i < arr.length; i++) {
				nArr.push(arr[i].mtsku_item_id)
			}
			this.obj.Barr = nArr;
			this.a09()
		}
		else { Tool.pre(["不可能到这里。", oo]); }

	},
	a09: function () {
		Tool.x1x2("B", this.obj.B1, this.obj.C2, this.a10, this)
	},
	a10: function () {
		let html = '[0<r:proupshopee db="sqlite.aliexpress" size=' + this.obj.Barr.length + ' where=" where @.fromid in(' + this.obj.Barr.join(",") + ')">,<:fromid/></r:proupshopee>]'
		$("#state").html("正在检查本地商品是否存在。。。");
		Tool.ajax.a01(html, 1, this.a11, this)
	},
	a11: function (arr) {
		arr.shift()
		let html = '""<r: db="sqlite.aliexpress">update @.proupshopee set @.status=0 where @.fromid in(' + arr.join(",") + ')</r:>'
		$("#state").html("正在更新本地商品状态。。。");
		Tool.ajax.a01(html, 1, this.a12, this, arr)
	},
	a12: function (t, arr) {
		if (arr.length == this.obj.Barr.length) {
			$("#state").html("本地都有，可以下一页。。。");
			this.a13();
		}
		else {
			let arr2 = this.obj.Barr, bool, arr3 = []
			for (let i = 0; i < arr2.length; i++) {
				bool = true;
				for (let j = 1; j < arr.length; j++) {
					if (arr2[i] == arr[j]) { bool = false; break; }
				}
				if (bool) { arr3.push(parseInt(arr2[i])); }
			}
			$("#state").html("本地商品有不存在的【" + arr3.join(" , ") + "】。。。");
			alert("aaaaaaaaaaaaaaaaaaaaaaaa")
			//this.a012(arr3)
		}
	},
	a13: function ()//点下一页
	{
		this.obj.B1++;
		this.obj.Barr = []
		$("#state").html("正在进入第" + this.obj.B1 + "页。。。");
		this.a07();
	},
	a012: function (arr) {
		let url = "https://seller.shopee.cn/api/v3/mtsku/delete_mtsku/?SPC_CDS_VER=2&cnsc_shop_id=896010703"
		$("#url").html(url + '【post提交】');
		let data = { "mtsku_item_id_list": arr }
		gg.postJson(url, JSON.stringify(data), this.a013, this)
	},
	a013: function (oo) {
		if (oo.code == 0) {
			this.a011()
		}
		else {
			Tool.at("删除失败\n\n" + t)
		}
		//正常返回值 {"code":0,"message":"success","user_message":"success","data":{"result":[{"code":0,"message":"success","user_message":"success","data":{"id":18462438330}}]}}
	},
}
fun.a01();