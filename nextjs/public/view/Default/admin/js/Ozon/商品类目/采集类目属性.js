'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('Ozon -&gt; 类目列表 -&gt; 采集类目属性') + '\
		<div class="p-2"><table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr><tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        $("#state").html("正在获取叶子类目。。。");
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '<r:type db="sqlite.ozon" size=1 page=2 where=" where @.isleaf=1">,<:fromid/></r:type>]'
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo[0]; }
        this.a05(oo[1]);
    },
    a05: function (fromid) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, fromid)
    },
    a06: function (fromid) {
        let url = "https://seller.ozon.ru/api/site/product/attribute-model"
        $("#url").html(url + '[post]');
        let data = JSON.stringify({
            dictionary_values_limit: 100,
            is_show_at_creation: true,
            item_id: 0,
            description_category_id: fromid
        })
        let headers = [
            //{
            //    "name": "Origin",
            //    "value": "https://seller.ozon.ru"
            //},
            //{
            //    "name": "Referer",
            //    "value": "https://seller.ozon.ru/app/products/add/general-info"
            //},
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
            {
                "name": "X-O3-App-Name",
                "value": 'seller-ui'
            },
            {
                "name": "X-O3-Company-Id",
                "value": '1036832'
            },
            {
                "name": "X-O3-Language",
                "value": 'zh-Hans'
            },
            {
                "name": "X-O3-Page-Type",
                "value": 'products-other'
            }
        ]
        gg.setHeaders_postHtml(url, headers, data, this.a07, this, fromid)
    },
    a07: function (t1, t2) {
        let selectType = "select count(1) from @.attr where @.cateId=" + t2
        let html = '"ok"<if Fun(Db(sqlite.ozon,' + selectType + ',count))==0><r: db="sqlite.ozon">insert into @.attr(@.cateId,@.json)values(' + t2 + ',' + Tool.rpsql(JSON.stringify(t1)) + ')</r:></if>'
        Tool.ajax.a01(html, 1, this.a08, this)
    },
    a08: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a03();
        }
        else {
            Tool.pre(["出错01：", t])
        }
    }
}
fun.a01();