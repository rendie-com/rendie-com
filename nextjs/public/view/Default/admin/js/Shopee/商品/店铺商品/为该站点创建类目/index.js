'use strict';
var fun =
{
    a01: function () {
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 为该站点创建类目") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">获取站点：</td><td colspan="2">'+ Tool.site(obj.arr[5]) + '</td></tr>\
		    <tr><td class="w200 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">关键词进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">关键词类目进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">价格类目进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		    <tr><td class="right">最低购买数量进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
		    <tr><td class="right">最低购买数量商品页进度：</td>'+ Tool.htmlProgress('E') + '</tr>\
		    <tr><td class="right">单位重量进度：</td>'+ Tool.htmlProgress('F') + '</tr>\
		    <tr><td class="right">单位重量商品页进度：</td>'+ Tool.htmlProgress('G') + '</tr>\
		    <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a04, this)
    },
    //a03: function (t) {
    //    //common_创建单位重量类目---有很多都是我自已设置的重量，不态对的，所以这要了。
    //    Tool.common_create_UnitWeight_category.a01(t, obj.arr[5], this.a04, this, t);
    //},
    a04: function (t) {
        //common_创建最低购买数量类目
        Tool.common_create_MinimumOrder_category.a01(t, obj.arr[5], this.a05, this, t);
    },
    a05: function (t) {
        //common_创建价格类目
        Tool.common_create_price_category.a01(t, obj.arr[5], this.a06, this, t);
    },
    a06: function (t) {
        //common_创建热门关键词类目
        Tool.common_create_key_category.a01(t, obj.arr[5], this.a07, this, t);
    },
    a07: function (t) {
        //common_创建新品类目
        Tool.common_create_NewArrival_category.a01(t, obj.arr[5], this.a08, this, t);
    },
    a08: function (t) {
        $("#state").html("全部完成。。。")
    },
}
fun.a01();