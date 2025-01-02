'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header("Shopee &gt; 已上传商品 &gt; 全球商品 &gt; 更多 &gt; 将【未上传】的商品上传到【Shopee全球商品】") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
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
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        let str = '\
        {\
            <r:GlobalPro size=1 page=2 db="sqlite.shopee" where=" where @.isup=0">\
                "proid":"<:proid/>",\
            </r:GlobalPro>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取敦煌商品...");
        Tool.ajax.a01(str, 1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, oo)
    },
    /////////////////////////////////////////////////
    d01: function (oo) {
        $("#proid").html(oo.proid);
        let url = 'https://seller.shopee.cn/api/v3/mtsku/create_mtsku/&SPC_CDS_VER=2'
        let data =
        {
            "name": "Maximumcatch High Quality ECO 2/3/4/5/6/7/8WT Fly Reel Large Arbor Aluminum Fly Fishing Reel Hand-Changed Fishing Reel",
            "brand_id": 0,
            "description": "Maximumcatch High Quality ECO 2/3/4/5/6/7/8WT Fly Reel Large Arbor Aluminum Fly Fishing Reel Hand-Changed Fishing Reel",
            "description_type": "normal",
            "images": ["sg-11134201-22110-8qgbt0vgrvjv46"],
            "video_list": [],
            "category_path": [100009, 100026],
            "attributes": [{ "attribute_id": 100134, "attribute_value_id": 1318 }, { "attribute_id": 100022, "attribute_value_id": 652 }, { "attribute_id": 100194, "attribute_value_id": 1634 }],
            "size_chart": "",
            "tier_variation": [{ "name": "", "options": [""], "images": [] }],
            "model_list": [{ "tier_index": [0], "is_default": true, "mtsku_model_id": 0, "normal_price": "100", "stock_setting_list": [{ "sellable_stock": 0 }] }],
            "weight": "1",
            "dimension": { "width": 0, "height": 0, "length": 0 },
            "days_to_ship": 7,
            "condition": 1,
            "mtsku_item_id": 0,
            "seller_sku": oo.proid,
            "ds_cat_rcmd_id": "12a6a310-8757-4454-aeb7-83d26965c871",
            "ds_attr_rcmd_id": "2d80b1a8-0eaa-4606-9d37-e79a0b037186"
        }
        gg.postFetch(url, JSON.stringify(data), this.d02, this, oo)
    },
    d02: function (o1, o2) {
        if (o1.code == 0) {
            let html = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.isup=1,@.fromID=' + o1.data.mtsku_item_id + ',@.uptime=' + Tool.gettime("") + ' where @.proid=\'' + o2.proid + '\'</r:>'
            Tool.ajax.a01(html, 1, this.d03, this)
        }
        else {
            Tool.pre(["出错", o1])
        }
    },
    d03: function (t) {
        this.obj.A1++;
        Tool.Time("name", 0, this.a05, this, "")
    },
}
fun.a01()