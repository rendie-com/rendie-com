'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("Shopee &gt; 商品列表 &gt; 全球商品 &gt; 更多 &gt; 把速卖通的【折扣】同步过来") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr>\
                <td class="right">说明：</td><td colspan="2">\
(1).如果没有折扣那就给50%的折扣。<br/>\
(2).只有折扣为0，才会要同步。<br/>\
(3).当折扣“<15”，则改为15。答：折扣太小，可能还是原价，shopee平台还报错。（例如：原价0.22打2%的折扣，结果还是0.22，因为平台会四舍五入保留俩位小数。）<br/>\
(4)当折扣“>80”，则改为79。在报商品活动的时候，折扣太大或太小报不了。\
</td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        //@.discount=0  只有折扣为0，才会要同步。
        //因为：发布到各个站点后，都是用折扣来调价的。
        //例如1：1688的价格涨了，我就少打的折，反之就多打的折。
        //例如2：shopee限制最低只能填0.1，那我定价要低于0.1，我就多打点折，定价就会高于0.1了。
        let str = '[\
            {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
            <r:GlobalPro size=10 db="sqlite.shopee" page=2 where=" where @.discount=0">,\
            {\
               <r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'<:proid/>\'">\
                    "discount":<:discount/>,\
                </r:pro>\
                "proid":"<:proid/>",\
            }\
            </r:GlobalPro>\
        ]'
        $("#state").html("正在获取商品...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0].A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let newArr = [];
        for (let i = 1; i < arr.length; i++) {
            let discount = 50
            //为什么要“<15”?答：折扣太小，可能还是原价，shopee平台还报错。（例如：原价0.22打2%的折扣，结果还是0.22，因为平台会四舍五入保留俩位小数。）
            if (arr[i].discount < 15) {
                discount = 15
            }
            else if (arr[i].discount >= 80) {
                //在报商品活动的时候，折扣太大或太小报不了。
                discount = 79;
            }
            else {
                discount = arr[i].discount
            }
            newArr.push("update @.GlobalPro set @.discount=" + discount + " where @.proid='" + arr[i].proid + "'")
        }
        let str = '<r: db="sqlite.shopee">' + newArr.join("<1/>") + '</r:>'
        Tool.ajax.a01('"ok"' + str, 1, this.a05, this)
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
}
fun.a01();