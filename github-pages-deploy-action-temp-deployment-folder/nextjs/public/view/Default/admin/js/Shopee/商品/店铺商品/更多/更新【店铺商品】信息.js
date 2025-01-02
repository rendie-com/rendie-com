'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
        mode: "",
    },
    a01: function () {
        //obj.params.return        返回URL
        //obj.params.site          站点
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 更多 &gt; 更新【店铺商品】信息") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="w190 right">更新站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">更新条件：</td><td colspan="2">'+ this.b06() + '</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">参数：</td><td colspan="2" class="p-0" id="parameter"></td></tr>\
            <tr><td class="right">物流方式：</td><td colspan="5" id="logistics" class="p-0"></td></tr>\
            <tr><td class="right">更新条件：</td><td id="where" colspan="2"></td></tr>\
		    <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          <tbody id="tbody"></tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        $("#parameter").html(this.b04(t))
        $("#state").html("已登陆。。。")
        Tool.logistics.a01(obj.params.site, $("#logistics"), this.a04, this, t)
    },
    a04: function (logistics, t) {
        t.logistics = logistics;
        this.obj.seller = t;
        this.d01()
    },
    ////////////////////////////////////////////////////////////
    b01: function (mode) {
        //本地更新时间大于平台更新时间，就说明要更新该商品
        let where = ""
        if (mode == "2") {
            where = " where @.MinimumOrder<>@.min_purchase_limit"
        }
        else {
            where = " where @.self_uptime>=@.uptime"
        }
        //where =" where @.proid='R972191'"
        //where =" order by @.self_uptime desc"
        //where = " where @.price_uptime=1"
        //where =" where @.price_uptime=0"
        //where =" where @.status=8"
        $("#where").html(where);
        return where;
    },
    b02: function (tw, ms, en, pt) {
        let name = "";
        if (obj.params.site == "my") {
            name = en;
        }
        else if (obj.params.site == "br") {
            name = pt;
        }
        else if (obj.params.site == "tw") {
            name = tw;
        }
        return name;
    },
    b03: function () {
        let logistics_channels = false;
        if (obj.params.site == "my") {
            logistics_channels = [
                { "size": 0, "price": "4.90", "cover_shipping_fee": false, "enabled": true, "channelid": 28016, "sizeid": 0 },//Standard Delivery (最大 30公斤)
                { "size": 0, "price": "0.00", "cover_shipping_fee": false, "enabled": false, "channelid": 28052, "sizeid": 0 },//Economy Delivery (Sea Shipping)(最大 100公斤)
                { "size": 0, "price": "3.50", "cover_shipping_fee": false, "enabled": false, "channelid": 28056, "sizeid": 0 }//Self Collection (Shopee Xpress)(最大 12公斤)
            ]
        }
        else if (obj.params.site == "tw") {
            logistics_channels = [
                { "channelid": 38066, "sizeid": 0, "size": 0, "price": "45", "cover_shipping_fee": false, "enabled": false },//蝦皮海外 - 蝦皮店到店
                { "channelid": 38017, "sizeid": 0, "size": 0, "price": "0", "cover_shipping_fee": false, "enabled": false },//蝦皮海外 - OK MART（海運）
                { "channelid": 38010, "sizeid": 0, "size": 0, "price": "20", "cover_shipping_fee": false, "enabled": false },//蝦皮海外 - 宅配（海運）
                { "channelid": 38025, "sizeid": 0, "size": 0, "price": "10", "cover_shipping_fee": false, "enabled": false },//蝦皮海外 - 萊爾富（海運）
                { "channelid": 38018, "sizeid": 0, "size": 0, "price": "10", "cover_shipping_fee": false, "enabled": true }//蝦皮海外 - 7-11（海運）
            ]
        }
        else if (obj.params.site == "br") {
            logistics_channels = [
                { "size": 0, "price": "13.00", "cover_shipping_fee": false, "enabled": true, "channelid": 90001, "sizeid": 0 }//Expresso padrão (最大 30公斤)
            ]
        }
        return logistics_channels;
    },
    b04: function (oo) {
        return '\
        <table class="table mb-0 align-middle">\
            <tr class="table-light center">\
                <th class="w120"></th>\
                <th class="w100">台湾虾皮</th>\
                <th class="w100">马来西亚</th>\
                <th class="w100">巴西</th>\
                <th></th>\
            </tr>\
            <tr>\
                <td class="right">汇率：</td>\
                <td><input type="text" class="form-control center" value="'+ oo.tw.exchangeRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.my.exchangeRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.br.exchangeRate + '")" disabled="disabled"></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">佣金费率：</td>\
                <td><input type="text" class="form-control center" value="'+ oo.tw.commissionRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.my.commissionRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.br.commissionRate + '")" disabled="disabled"></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">活动服务费率：</td>\
                <td><input type="text" class="form-control center" value="'+ oo.tw.activityServiceRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.my.activityServiceRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.br.activityServiceRate + '")" disabled="disabled"></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">满多少免运费：</td>\
                <td><input type="text" class="form-control center" value="'+ oo.tw.fullPrice + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.my.fullPrice + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.br.fullPrice + '")" disabled="disabled"></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">税率：</td>\
                <td><input type="text" class="form-control center" value="'+ oo.tw.taxRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.my.taxRate + '")" disabled="disabled"></td>\
                <td><input type="text" class="form-control center" value="'+ oo.br.taxRate + '")" disabled="disabled"></td>\
                <td></td>\
            </tr>\
            <tr>\
                <td class="right">说明：</td>\
                <td colspan="4">以这里的"参数"为准，如果不对，那就把shopee的"参数"复制过来。（注：在shopee填的参数，不会对这里的价格产生影响。）</td>\
            </tr>\
        </table>'
    },
    b05: function () {
        //马来语
        let ms = '\n\n\
    Hello dan terima kasih kerana melawat kedai kami!\n\
    Kami memastikan perkhidmatan dan produk kami adalah berkualiti dan boleh dipercayai.\n\
    Jika anda mempunyai sebarang pertanyaan tentang produk ini, sila tinggalkan mesej kepada kami! 🥰 ❤️\n\
    \n\
    ♥️1. Apabila kami menerima tempahan anda, kami akan menghantar bungkusan itu secepat mungkin.\n\
    ♥️2 Apabila anda mendapat pakej, dan sama ada anda berpuas hati dengan barangan dan perkhidmatan. Sila tinggalkan kami maklum balas lima bintang dan gambar yang hebat. Sebarang bantuan amatlah dihargai. Tunjukkan kepada kami dan menangi hadiah rahsia!\n\
    ♥️3 Jika anda mempunyai sebarang pertanyaan, sila hubungi kami sebelum membangkitkan pertikaian atau meninggalkan maklum balas negatif kepada kami. Kami akan cuba sedaya upaya untuk menyelesaikan masalah tersebut.\n\
    ♥️4 Anda boleh tinggalkan mesej di Shopee untuk menghubungi kami\n\
    \n\
    ✨ Jika anda menyukai produk kami, sila ingat untuk mengikuti kami❤️'
        //台湾
        let tw = '\n\n\
    你好，謝謝你光臨我們的商店！\n\
    我們確保我們的服務和產品品質良好，值得信賴。\n\
    如果您對該產品有任何疑問，請隨時給我們留言！ 🥰 ❤️\n\
    \n\
    ♥️1.當我們收到你的訂單時，我們會盡快把包裹寄出去。\n\
    ♥️2.當你拿到包裹時，以及你對物品和服務是否滿意。請給我們留下五星反饋和精美的圖片。我們將不勝感激。向我們展示，贏得秘密禮物！\n\
    ♥️3.如有任何問題，請在提出爭議或給我們留下負面反饋之前與我們聯繫。我們將盡力解決問題。\n\
    ♥️4.您可以在Shopee上留言與我們聯繫\n\
    \n\
    ✨ 如果你喜歡我們的產品，請記得關注我們❤️'
        //英语
        let en = '\n\n\
    Hello and thank you for visiting our store!\n\
    We ensure that our services and products are of good quality and trustworthy.\n\
    If you have any questions about this product, please feel free to leave us a message! 🥰 ❤️\n\
    \n\
    ♥️1. When we receive your order, we will send the package out as soon as possible.\n\
    ♥️2. When you get the package, and whether you are satisfied with the items and services.Please leave us five - star feedback and great pictures.Any help would be greatly appreciated.Show us and win a secret gift!\n\
    ♥️3. If you have any questions, please contact us before raising a dispute or leaving us negative feedback.We will try our best to solve the problem.\n\
    ♥️4. You can leave a message on Shopee to contact us\n\
    \n﻿\
    ✨ If you like our products, please remember to follow us❤️';
        //巴西站点，不可以说“礼物”。
        let pt = '\n\n\
    Olá e obrigado por visitar nossa loja!\n\
    Garantimos que nossos serviços e produtos sejam de boa qualidade e confiáveis.\n\
    Se você tiver alguma dúvida sobre este produto, sinta - se à vontade para nos deixar uma mensagem! 🥰 ❤️\n\
    \n\
    ✨ Se você gosta de nossos produtos, lembre - se de nos seguir❤️'
        return this.b02(tw, ms, en, pt);
    },
    b06: function () {
        let str = '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择更新条件</option>\
            <option value="1">本地更新时间 &gt;= 同步的更新时间</option>\
            <option value="2">以前最低购买量 &lt;&gt; 现在最低购买量</option>\
        </select>';
        return str;
    },
    ////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", true);
        this.obj.mode = val;
        this.a02()
    },
    ////////////////////////////////
    d01: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + obj.params.site,
            sql: "select @.fromid as fromid,@.proid as proid,@.MinimumOrder,@.min_purchase_limit FROM @.table" + this.b01(this.obj.mode) + "  order by @.self_uptime desc limit 1",
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select count(1) as total FROM @.table" + this.b01(this.obj.mode),
            })
        }
        $("#state").html("获取店铺信息")
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this, null, t[0][0])
    },
    d03: function (oo) {
        let url = 'https://seller.shopee.cn/portal/product/' + oo.fromid + '?cnsc_shop_id=' + this.obj.seller[obj.params.site].shopId
        let html = '\
        <tr><td class="right">店铺商品ID：</td><td colspan="2"><a href="' + url + '" target="_blank">' + oo.fromid + '</a></td></tr>\
        <tr><td class="right">商品编码：</td><td colspan="2">' + oo.proid + '</td></tr>'
        $("#tbody").html(html);
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("pic,manualreview_1688_fromid,manualreview_1688_unitweight,tw_name,ms_name,en_name,pt_name,tw_description,ms_description,en_description,pt_description,video,fromid,discount,proid") + " FROM @.table where @.proid='" + oo.proid + "'",
        }]
        //获取全球商品信息
        Tool.ajax.a01(data, this.d04, this, oo.fromid);
    },
    d04: function (t, shopPro_fromid) {
        let oo = t[0][0]
        let url1 = 'https://seller.shopee.cn/portal/product/mtsku/' + oo.fromid
        let url2 = 'https://detail.1688.com/offer/' + oo.manualreview_1688_fromid + '.html';
        let name = this.b02(oo.tw_name, oo.ms_name, oo.en_name, oo.pt_name)
        let description = this.b02(oo.tw_description, oo.ms_description, oo.en_description, oo.pt_description)
        oo.video = oo.video ? JSON.parse(oo.video) : null
        let html = '\
        <tr><td class="right">1688详情页地址：</td><td colspan="2"><a href="' + url2 + '" target="_blank">' + url2 + '</a></td></tr>\
        <tr><td class="right">全球商品ID：</td><td colspan="2"><a href="' + url1 + '" target="_blank">' + oo.fromid + '</a></td></tr>\
        <tr><td class="right">标题：</td><td colspan="2">' + name + '</td></tr>\
        <tr><td class="right">折扣：</td><td colspan="2">-' + oo.discount + '%</td></tr>\
        <tr><td class="right">详情：</td><td colspan="2"><textarea rows="10" class="form-control form-control-sm">' + description + '</textarea></td></tr>\
        <tr><td class="right">视频：</td><td colspan="2"><textarea rows="10" class="form-control form-control-sm">' + JSON.stringify(oo.video, null, 2) + '</textarea></td></tr>'
        $("#tbody").append(html);
        oo.tmpObj = {
            name: name,//标题
            description: description,//详情
            shopPro_fromid: shopPro_fromid,//店铺ID
        }

        this.d05(oo)
    },
    d05: function (oo) {
        if (oo.tmpObj.name) {
            if (oo.tmpObj.description) {
                this.d06(oo);
            }
            else {
                Tool.at("没有商品详情,程序终止。");
            }
        }
        else {
            Tool.at("没有商品标题,程序终止。");
        }
    },
    d06: function (oo) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("freight,unit") + " FROM @.proList where @.fromid=" + oo.manualreview_1688_fromid,
        }, {
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(oo.manualreview_1688_fromid, 99),
            sql: "select @.sku as sku FROM @.prodes where @.fromid=" + oo.manualreview_1688_fromid,
        }]
        $("#state").html("获取1688商品信息")
        Tool.ajax.a01(data, this.d07, this, oo);
    },
    d07: function (t, oo) {
        let sku = JSON.parse(t[1][0].sku);
        let unit = (sku.sellunit ? '按' + sku.sellunit + '起批1' + sku.sellunit + '=' + sku.startAmount : '')
        let html = '\
        <tr><td class="right">1688的sku：</td><td colspan="2"><textarea rows="10" class="form-control form-control-sm">' + JSON.stringify(sku, null, 2) + '</textarea></td></tr>\
        <tr><td class="right">售卖方式：</td><td colspan="2">' + unit + t[0][0].unit + '</td></tr>'
        $("#tbody").append(html);
        this.e01(sku, t[0][0].freight, oo)
    },
    //////////////////////////////////////////////  
    e01: function (sku, freight, oo) {
        if (sku) {
            if (sku.skuMap)//有多个价格属性
            {
                this.e02(sku, freight, oo)
            }
            else {
                //只有一个价格
                this.e02(sku, freight, oo)
            }
        }
        else {
            Tool.pre('sku格式不对')
        }
    },
    e02: function (sku, freight, oo) {
        let o2 = {
            shopPro_fromid: oo.tmpObj.shopPro_fromid,//店铺商品ID
            proid: oo.proid,//商品编码
            pic: oo.pic,//原始首图
            manualreview_1688_fromid: oo.manualreview_1688_fromid,//1688的来源ID
            GlobalPro_fromid: oo.fromid,
            GlobalPro_video: oo.video,//视频
            startAmount: sku.startAmount,//件倍数
            name: oo.tmpObj.name,//标题
            description: oo.tmpObj.description + this.b05(),//详情
            discount: oo.discount,//准备好的折扣
            unitWeight: oo.manualreview_1688_unitweight,//重量
        }
        if (o2.description.length > 3000) {
            o2.description = oo.tmpObj.description;
        }
        Tool.common_price.a01(
            this.obj.seller.logistics,
            this.obj.seller[obj.params.site],
            sku,
            freight,
            oo.discount,
            oo.manualreview_1688_unitweight,
            $("#tbody"),
            this.e03,
            this,
            o2)
    },
    e03: function (o1, o2) {
        let oo = Object.assign(o1, o2);
        Tool.common_update_product_info.a01(
            o2.pic,
            o2.proid,
            o2.manualreview_1688_fromid,
            o2.GlobalPro_fromid,
            o2.startAmount,
            o2.shopPro_fromid,
            this.obj.seller,
            obj.params.site,
            o1.min_purchase_limit,
            o2.discount,
            o1.upPrice,
            this.e04,
            this,
            oo)
    },
    e04: function (t, oo) {
        $("#tbody").append('\
            <tr><td class="right">属性和属性图：</td><td colspan="2"><textarea rows="10" class="form-control form-control-sm">' + JSON.stringify(t.std_tier_variation_list, null, 2) + '</textarea></td></tr>\
            <tr><td class="right">shopee的SKU：</td><td colspan="2"><textarea rows="10" class="form-control form-control-sm">' + JSON.stringify(t.model_list, null, 2) + '</textarea></td></tr>\
        ');
        //总结经验：修改价格，容易被冻结店铺。
        //修改商品都会被审核，要少修改。
        let logistics_channels = this.b03()//shopee的物流方式
        let data = {
            "product_id": oo.shopPro_fromid,//店铺商品ID
            "product_info": {
                "logistics_channels": logistics_channels,//运费
                "name": oo.name,//标题
                "description_info": {
                    "description": oo.description,//详情
                    "description_type": "normal"
                },
                "min_purchase_limit": oo.min_purchase_limit,//最低购买数量
                "max_purchase_limit": {//最高购买数量
                    "type": 1,//依订单
                    "purchase_limit": oo.min_purchase_limit * 100//最低购买数量 * 100
                },
                "images": t.images,//放大镜
                "std_tier_variation_list": t.std_tier_variation_list,//属性和属性图
                "model_list": t.model_list,//价格
                "wholesale_list": oo.wholesale_list,//批发
                "video_list": oo.GlobalPro_video ? oo.GlobalPro_video : undefined//视频
            },
            "is_draft": false
        }
        if (logistics_channels) {
            this.e05(data, oo)
        }
        else {
            Tool.pre(["运费出错", logistics_channels])
        }
    },
    e05: function (data, oo) {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/v3/product/update_product_info?" + pArr.join("&")
        $("#state").html("正在更新。。。");
        let o1 = {
            min_purchase_limit: oo.min_purchase_limit,
            shopPro_fromid: oo.shopPro_fromid,
            discount: oo.discount,
            unitWeight: oo.unitWeight,
            startAmount: oo.startAmount,
        }
        gg.postFetch(url, JSON.stringify(data), this.e06, this, o1)
    },
    e06: function (t, oo) {
        if (t.msg == "success") {
            //@.price_uptime=' + Tool.gettime("")+ ',
            let data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: 'update @.table set @.self_uptime=@.uptime-1,@.scale=' + oo.startAmount + ',@.unitWeight=' + oo.unitWeight + ',@.MinimumOrder=' + oo.min_purchase_limit + ',@.min_purchase_limit=' + oo.min_purchase_limit + ',@.discount=' + oo.discount + ' where @.fromid=' + oo.shopPro_fromid,
            }]
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01(data, this.d08, this);
        }
        else if (t.code = 1000100252) {
            //由于产品有促销活动，无法更新变量C Anel de Letrab的价格。
            let data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: 'update @.table set @.self_uptime=@.uptime-1,@.scale=' + oo.startAmount + ',@.unitWeight=' + oo.unitWeight + ',@.MinimumOrder=' + oo.min_purchase_limit + ',@.min_purchase_limit=' + oo.min_purchase_limit + ',@.discount=' + oo.discount + ' where @.fromid=' + oo.shopPro_fromid,
            }]
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01(data, this.d08, this);
        }
        else if (t.user_message = "Cannot update price for variationN Anel de Letrabecause the product has promotion") {
            //参加“折扣活动”，就会出现这个错误，删除活动就可以修改了。
            $("#state").html("由于产品有促销活动，无法更新变量C Anel de Letrab的价格。");
            Tool.pre(["aaaaaaaaa", t])
            //this.obj.A1++;
            //this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    d08: function (t) {
        if (t[0].length == 0) {
            $("#state").html("更新成功。");
            this.obj.A1++;
            this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
}
fun.a01();