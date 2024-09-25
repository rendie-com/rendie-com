'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "my";//站点
        obj.arr[5] = obj.arr[5] ? parseInt(obj.arr[5]) : 1;//翻页
        this.a02();
    },
    a02: function () {
        let str = '\
        [{\
            "size":10,\
            "count":<@count/>\
        }\
		<r:similarProduct db="sqlite.shopee" page=2 size="10" where=" where @.site=\''+ obj.arr[4] + '\'">,\
        {\
			"item_id":<:item_id/>,\
			"image":<:image tag=json/>,\
			"title":<:title tag=json/>,\
			"similarProduct":<:similarProduct tag=0/>,\
        }\
        </r:similarProduct>]'
        Tool.ajax.a01(str, obj.arr[5], this.a03, this);
    },
    a03: function (t) {
        let tr = []
        for (let i = 1; i < t.length; i++) {
            tr.push('\
            <tr>\
                <td>'+ t[i].item_id+'</td>\
                <td class="p-0"><img src="https://s-cf-sg.shopeesz.com/file/'+ t[i].image +'_tn" class="w100"></td>\
                <td class="left">'+ t[i].title +'</td>\
                <td class="left">'+ t[i].similarProduct +'</td>\
            </tr>')
        }
        let html = Tool.header() + '\
		<div class="p-2">\
            <ul class="makeHtmlTab">\
                <li'+ (obj.arr[4] == "my" ? ' class="hover"' : '') + ' onclick="Tool.main(\'' + obj.arr[3] + '/my\')">【马来西亚】站点</li>\
                <li'+ (obj.arr[4] == "br" ? ' class="hover"' : '') + ' onclick="Tool.main(\'' + obj.arr[3] + '/br\')">【巴西】站点</li>\
            </ul>\
			<table class="table align-top table-hover center align-middle">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w120" style="padding-left: 30px;position: relative;">'+ this.b01() + '商品ID</th>\
                        <th class="w100">图片</th>\
                        <th class="w200 left">标题</th>\
                        <th class="left">类似产品</th>\
                    </tr>\
                </thead>\
				<tbody>'+ tr.join("") + '</tbody>\
			</table>\
            <div class="m-2">' + Tool.page(t[0].count, 10, 5) + '</div>\
		</div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
            <li onClick="Tool.open5(\'js03\',\''+ obj.arr[4] + '\')"><a class="dropdown-item pointer">*获取相似商品</a></li>\
        </ul>'
    },
}
fun.a01();