'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header("Ozon &gt; 商品列表 &gt; 将【未上传】的商品上传到【Ozon平台】") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="email" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">...</td></tr>\
                </tbody>\
            </table>\
            <table class="table table-hover"><tbody id="body"></tbody></table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        $("#state").html("正在获得配置参数");
        let str = '\
        {<r:seller db="sqlite.ozon" size=1>\
            "sellerId":"<:sellerId/>",\
            "email":"<:email tag=js/>",\
            "cookies":<:cookies tag=0/>\
         </r:seller>}'
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        $("#email").html(oo.email);
        Tool.loginOzon.a01(oo.email, oo.sellerId, oo.cookies, $("#state"), this.a05, this)
    },
    a05: function (t) {
        let str = '\
        {\
            <r:product size=1 page=2 db="sqlite.ozon" where=" where @.isup=0">\
                "proid":"<:proid/>",\
            </r:product>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(str, 1, this.a06, this);
    },
    a06: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, oo)
    },
    d01: function (oo) {
        $("#proid").html(oo.proid);
        let url = 'https://seller.ozon.ru/api/site/product/create/v2'
        let data =
        {
            "attributes": [
                {
                    "unit": 0,
                    "values": [{ "complex_sequence": 0, "dictionary_value_id": 95218, "sequence": 1, "value": "" }],
                    "complex_id": 0,
                    "attribute_id": 8229
                },
                {
                    "unit": 0,
                    "values": [{ "complex_sequence": 0, "dictionary_value_id": 33755, "sequence": 1, "value": "" }],
                    "complex_id": 0,
                    "attribute_id": 4958
                },
                {
                    "unit": 0,
                    "values": [{ "complex_sequence": 0, "dictionary_value_id": 126745801, "sequence": 1, "value": "" }],
                    "complex_id": 0,
                    "attribute_id": 85
                },
                {
                    "unit": 0,
                    "values": [{ "complex_sequence": 0, "dictionary_value_id": 0, "sequence": 0, "value": "888" }],
                    "complex_id": 0,
                    "attribute_id": 9048
                },
                {
                    "unit": 0,
                    "values": [],
                    "complex_id": 100001,
                    "attribute_id": 21837
                },
                {
                    "unit": 0,
                    "values": [],
                    "complex_id": 100001,
                    "attribute_id": 22273
                },
                {
                    "unit": 0,
                    "values": [],
                    "complex_id": 100001,
                    "attribute_id": 21841
                },
                {
                    "unit": 0,
                    "values": [],
                    "complex_id": 100002,
                    "attribute_id": 21845
                }
            ],
            "description_category_id": 43430199,
            "depth": 100,
            "width": 100,
            "height": 200,
            "weight": 300,
            "offer_id": oo.proid,
            "price": "100",
            "name": "OneDrive ",
            "vat": 0,
            "images": [],
            "company_id": 1036832,
            "contract_id": 11680860103440,
            "spu": 0,
            "variant_id": 0,
            "currency": "USD",
            "promotions": [{ "operation": "disable", "type": 0 }]
        }
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
            },
            {
                "name": "X-O3-Product-Log-Extra",
                "value": 'simplified_form'
            }
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d02, this, oo)
    },
    d02: function (o1, o2) {
        if (o1.item_id) {
            let html = '"ok"<r: db="sqlite.ozon">update @.product set @.isup=1,@.fromID=' + o1.item_id + ',@.uptime=' + Tool.gettime("") + ' where @.proid=\'' + o2.proid + '\'</r:>'
            Tool.ajax.a01(html, 1, this.d03, this)
        }
        else if (o1.code == 409) {
            $("#state").html("商品编码已经上传过了。")
            this.d04(o1.error, o2)
        }
        else if (o1.code == 400) {
            $("#state").html("超过总创建限制。")
        }
        else {
            Tool.pre(["出错", o1])
        }
    },
    d03: function (t) {
        this.obj.A1++;
        Tool.Time("name", 0, this.a05, this, "")
    },
    d04: function (t, o2) {
        let o1 = {}
        eval("o1=" + t)
        if (o1.message == "OfferID or quant_code for this company already exists") {
            alert("请手动删除编码【" + o2.proid + "】,再来上传商品。")
        }
        else {
            Tool.pre(["出错", o1])
        }
    },
}
fun.a01()