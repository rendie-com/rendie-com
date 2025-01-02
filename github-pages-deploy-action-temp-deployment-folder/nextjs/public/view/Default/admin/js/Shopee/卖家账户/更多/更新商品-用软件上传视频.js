'use strict';
var fun =
{
	obj:
	{
		A1: 1, A2: 0,
		B1: 1, B2: 0,
		C1: 1, C2: 0, Carr: [], C2arr: [],
		where: " where @.hide=0"
	},
	pro: {},
	a01: function () {
		let html = Tool.header("Shopee -&gt; 卖家账户 -&gt; 更多 -&gt; 更新商品-用软件上传视频") + '\
    <div class="p-2">\
      <table class="table table-hover align-middle mb-0">\
      <tbody>\
		<tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		<tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		<tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		<tr><td class="right">放大镜的图片：</td><td id="pic1" colspan="2"></td></tr>\
		<tr><td class="right">放大镜的图片进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		<tr><td class="right">购物车中的图片：</td><td id="pic2" colspan="2"></td></tr>\
		<tr><td class="right">该账号统计：</td><td  id="doTime" colspan="2"></td></tr>\
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
		$("#state").html("正在打开【发布商品】页面。。。");
		let url = "https://seller.shopee.cn/portal/product/mtsku/new"
		gg.tabs_remove_create_indexOf(2, url, "基本信息</a></li>", true, this.a06, this)
	},
	a06: function (t) {
		if (t.indexOf('>' + this.obj.username + '</div>') != -1) { this.a07(); }
		else { alert("上传的账号不对。"); }
	},
	a07: function () {
		Tool.ajax.a01(this.b01(), 1, this.a08, this);
	},
	a08: function (oo) {
		this.pro = oo;
		if (this.obj.B2 == 0) { this.obj.B2 = oo.B2; }
		Tool.x1x2("B", this.obj.B1, this.obj.C2, this.a09, this)
	},
	a09: function () {
		if (this.pro.type_bindShopee == 0) {
			alert("没绑定类目")
			//gg.highlightTab(1,this.a17,this)
		}
		else {
			this.a10();
		}
	},
	a10: function () {
		if (this.pro.videoUrl != "") {
			Tool.upVideo.a01(this.pro.videoUrl, this.a11, this)//上传视频
		}
		else {
			this.a15(11, "没有视频")
		}
	},
	a11: function (arr) {
		if (this.pro.shopeePic.indexOf(";") != -1) {
			if (arr == "视频时长无效") {
				this.a15(12, "视频时长无效");
			}
			else if (arr == "错误。请稍后再试") {
				this.a15(12, "错误。请稍后再试");
			}
			else {
				this.a12(arr)
			}
		}
		else {
			alert("已上传表中，必须要有Shopee的图片。")
		}
	},
	a12: function (arr) {
		let url = 'https://seller.shopee.cn/api/v3/mtsku/update_mtsku/?SPC_CDS_VER=2'
		let arr3 = {
			"name": this.pro.name,
			"brand_id": 0,
			"description": this.pro.description,
			"description_type": "normal",
			"images": this.pro.shopeePic.split(";"),
			"video_list": arr,
			"category_path": [100009, 100026],
			"attributes": [
				{ "attribute_id": 100134, "attribute_value_id": 1318 },
				{ "attribute_id": 100022, "attribute_value_id": 652 },
				{ "attribute_id": 100194, "attribute_value_id": 1634 }
			],
			"size_chart": "",
			"tier_variation": [{ "name": "", "options": [""], "images": [] }],
			"model_list": [{ "tier_index": [0], "is_default": true, "mtsku_model_id": 0, "normal_price": "100", "stock_setting_list": [{ "sellable_stock": 0 }] }],
			"weight": "1.00",
			"dimension": { "width": 0, "height": 0, "length": 0 },
			"days_to_ship": 8,
			"condition": 1,
			"seller_sku": this.pro.proid,
			"mtsku_item_id": this.pro.fromid,
			"ds_cat_rcmd_id": ""
		}
		let data = JSON.stringify(arr3).replace(/aliexpress/ig, "shopee")
		gg.postFetch(url, JSON.stringify(data), this.a13, this, arr)
	},
	a13: function (t, arr) {
		let oo; eval("oo=" + t)
		if (oo.code == 0) {
			let html = '""<r: db="sqlite.aliexpress">update @.proupShopee set @.video=' + Tool.rpsql(JSON.stringify(arr)) + ',@.uptime=' + Tool.gettime("") + ',@.examine=1,@.status=0 where @.fromid=' + this.pro.fromid + '</r:>'
			$("#state").html("更新成功，正在保存结果。。。")
			Tool.ajax.a01(html, 1, this.a14, this)
		}
		else {
			pre(["更新出错", oo])
		}
	},
	a14: function (t) {
		this.obj.B1++;
		this.pro = {};
		this.obj.C1 = 1;
		this.obj.C2 = 0;
		this.obj.Carr = [];
		this.obj.C2arr = [];
		$("#C1").css("width", "0%");
		$("#C1,#C2,#pic1").html("")
		$("#state").html("更新成功，下一条。。。")
		this.a07();
	},
	a15: function (hide, err) {
		let html = '""<r: db="sqlite.aliexpress">update @.pro set @.hide=' + hide + ',@.err=\'' + err + '\' where @.proid=\'' + this.pro.proid + '\'</r:>'
		Tool.ajax.a01(html, 1, this.a14, this)
	},
	b01: function () {
		return '\
    {\
      <r:proupshopee db="sqlite.aliexpress" size=1 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+ this.obj.fromid + ' and b.@.hide=0 and a.@.examine=2">\
      '+ this.b02("b.@.") + '\
       "shopeePic":"<:a.@.pic/>",\
       "shopeeAttrPic":"<:a.@.attrpic/>",\
       "shopeeVideo":<:a.@.video tag=0/>,\
       "minDiscount":<:a.@.minDiscount/>,\
       "fromid":<:a.@.fromid/>,\
    	</r:proupshopee>\
    	"B2":'+ (this.obj.B2 == 0 ? '<@page/>' : '0') + '\
    }'
	},
	b02: function (val) {
		return '\
		"type":<:'+ val + 'type/>,\
		<r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:'+ val + 'type/>\'" size=1>\
			"type_enname":<:enname tag=json/>,\
			"type_bindShopee":<:bindShopee/>,\
		</r:type>\
		"id":<:'+ val + 'id/>,\
		"unit":"<:'+ val + 'unit tag=js/>",\
		"name":<:'+ val + 'name tag=json/>,\
		"fromid":<:'+ val + 'fromid/>,\
		"examine":<:'+ val + 'examine/>,\
    "shipToUS":<:'+ val + 'shipToUS/>,\
    "shipToAU":<:'+ val + 'shipToAU/>,\
    "shipToRU":<:'+ val + 'shipToRU/>,\
    "shipToCA":<:'+ val + 'shipToCA/>,\
    "shipToIT":<:'+ val + 'shipToIT/>,\
    "shipToFR":<:'+ val + 'shipToFR/>,\
    "shipToSE":<:'+ val + 'shipToSE/>,\
    "shipToUK":<:'+ val + 'shipToUK/>,\
    "shipToIN":<:'+ val + 'shipToIN/>,\
    "shipToDE":<:'+ val + 'shipToDE/>,\
    "shipToES":<:'+ val + 'shipToES/>,\
    "shipToBR":<:'+ val + 'shipToBR/>,\
		"minprice":<:'+ val + 'minprice/>,\
		"proid":"<:'+ val + 'proid/>",\
		"shopid":<:'+ val + 'shopid/>,\
		"fromid":<:'+ val + 'fromid/>,\
		"lotNum":<:'+ val + 'lotNum/>,\
    "keywords":"<:'+ val + 'keywords tag=js/>",\
		"description":"<:'+ val + 'description tag=js/>",\
		<r:prodes db="sqlite.aliexpress_prodes<:'+ val + 'proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:' + val + 'proid/>\'">\
			"pic":"<:pic/>",\
			"videoUrl":"<:videoUrl/>",\
			"HistoryPrice":<:HistoryPrice tag=0/>,\
			"aeopAeProductSKUs":<:aeopAeProductSKUs tag=0/>,\
			"aeopAeProductPropertys":<:aeopAeProductPropertys tag=0/>,\
			"des":<:des tag=json/>,\
		</r:prodes>'
	},
}
fun.a01();