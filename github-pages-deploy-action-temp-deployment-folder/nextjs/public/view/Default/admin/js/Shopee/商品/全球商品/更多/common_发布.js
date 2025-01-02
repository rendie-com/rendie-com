'use strict';
Object.assign(Tool, {
    release:
    {
        obj: {
            A1: 1, A2: 0,//商品页进度
            B1: 1, B2: 0,//商品条进度
        },
        a01: function (obj, logistics, seller, dom, next, This, t) {
            let oo = {
                obj: obj,
                logistics: logistics,//物流方式
                seller: seller,
                dom: dom,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo);
        },
        a02: function (oo) {
            $("#state").html("正在获取商品信息。。。");
            let data = this.b01(oo.dom, oo.obj.mode, oo.obj.type1, oo.obj.site)
            Tool.ajax.a01(data, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (this.obj.A2 == 0) {
                if (t[1]) {
                    this.obj.A2 = Math.ceil(t[1][0].total / 10);
                }
                else {
                    this.obj.A2 = 1;
                }
            }
            this.obj.B2 = t[0].length
            oo.GlobalPro = t[0];
            this.a04(oo)
        },
        a04: function (oo) {
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.g02, oo)
        },
        a05: function (oo) {
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d01, this, this.g01, oo)
        },
        ////////////////////////////////
        b01: function (dom, mode, type1, site) {
            let whereArr = [
                "@.type1=" + type1,//速卖通一级类目
                "@.ManualReview=9",//敦煌手动审核状态【9.图片且详情审核通过】
                "@.DHAfterReview=0",//敦煌审核后本地状态【0.正常】
                "@.BeforeReview=1",//更新前本地状态【1.更新成功】
                "@.penalty_type=0",//更新后违规类型【0.未违规】
                "@.ManualReview_1688=1",//手动审核1688状态【1.使用1688属性图】
                "@.ManualReview_1688_state=0",//手动审核后1688商品状态【0.正常】
                "@.is" + site + "=0 ",//站点更新状态【0.未更新】
                //"@.ManualReview_1688_video_status=7",//人工审核1688视频状态【7.审核通过】
                "@.editStatus<3",//修改状态 < 3  （	0：未修改 1：第一次修改 2：第二次修改 3：货源不对）
            ]
            //whereArr = ["@.proid='R257389'"]
            dom.append('<tr><td class="right">发布条件：</td><td colspan="2">' + whereArr.join(" <br/> ") + '</td></tr>');
            let data = [];
            if (mode == 1) {
                data = [{
                    action: "sqlite",
                    database: "shopee/商品/全球商品",
                    sql: "select " + Tool.fieldAs("manualreview_1688_fromid,discount,manualreview_1688_unitweight,proid") + " FROM @.table where " + whereArr.join(" and ") + " limit 10",
                }]
                if (this.obj.A2 == 0) {
                    data.push({
                        action: "sqlite",
                        database: "shopee/商品/全球商品",
                        sql: "select count(1) as total FROM @.table where " + whereArr.join(" and ")
                    })
                }
            }
            else if (mode == 2 || mode == 3) {
                let size = mode == 2 ? 10 : 20;
                data = [{
                    action: "sqlite",
                    database: "shopee/商品/全球商品",
                    sql: "select " + Tool.fieldAs("manualreview_1688_fromid,discount,manualreview_1688_unitweight,proid") + " FROM @.table where " + whereArr.join(" and ") + " limit " + size,
                }]
            }
            return data;
        },
        /////////////////////////////////////
        d01: function (oo) {
            let GlobalPro = oo.GlobalPro[this.obj.B1 - 1]
            oo.dom.append('<tr><td class="right">商品编码：</td><td colspan="2">' + GlobalPro.proid + '</td></tr>');
            let data = [{
                action: "sqlite",
                database: "1688",
                sql: "select @.freight as freight FROM @.proList where @.fromid=" + GlobalPro.manualreview_1688_fromid,
            }, {
                action: "sqlite",
                database: "1688_prodes/" + Tool.remainder(GlobalPro.manualreview_1688_fromid, 99),
                sql: "select @.sku as sku FROM @.prodes where @.fromid=" + GlobalPro.manualreview_1688_fromid,
            }]
            Tool.ajax.a01(data, this.d02, this, oo);
        },
        d02: function (t, oo) {
            let GlobalPro = oo.GlobalPro[this.obj.B1 - 1]
            GlobalPro._1688_prodes_sku = JSON.parse(t[1][0].sku);//后面要用
            if (GlobalPro.manualreview_1688_unitweight <= 0) {
                Tool.pre(["重量小于0，程序终止。", GlobalPro])
            }
            else {
                //说明：在这里用“Tool.common_price.a01”，的批发价是没什么用的，主要是要用到他的“上调价格”,“定原价”,“起订量”。
                Tool.common_price.a01(oo.logistics,
                    oo.seller[oo.obj.site],
                    GlobalPro._1688_prodes_sku,
                    t[0][0].freight,
                    GlobalPro.discount,
                    GlobalPro.manualreview_1688_unitweight,
                    oo.dom,
                    this.d03, this, oo)
            }
        },
        d03: function (t, oo) {
            let GlobalPro = oo.GlobalPro[this.obj.B1 - 1]
            GlobalPro.common_price = t;
            //打折前定价不能小于0.1，shopee平台有这个限制。
            if (t.discount_normal_price < 0.1) {
                //说明：加大折扣，好让定价高于0.1。
                let price1 = t.discount_normal_price * (1 - GlobalPro.discount / 100)//退回打折前的价格
                let newDiscount = 0;//重新打折。
                for (let i = GlobalPro.discount; i < 100; i++) {
                    let price2 = price1 / (1 - i / 100)
                    if (price2 >= 0.1) {
                        newDiscount = i;
                        break;
                    }
                }
                /////////////////////////
                if (newDiscount) {
                    //说明：这里只是在发布时改折扣。（如果是调价，应该改店铺折扣。）
                    GlobalPro.discount = newDiscount;//说明：这个会改“oo.GlobalPro”内的值 。
                    let data = [{
                        action: "sqlite",
                        database: "shopee/商品/全球商品",
                        sql: "update @.table set @.discount=" + newDiscount + " where @.proid='" + GlobalPro.proid + "'",
                    }]
                    Tool.ajax.a01(data, this.d04, this, oo)
                }
                else {
                    Tool.pre(["打99%的折扣，都没到0.1，说明有问题。"])
                }
            }
            else {
                //说明大于0.1
                this.d05(oo);
            }
        },
        d04: function (t, oo) {
            if (t[0].length == 0) {
                this.d05(oo);
            }
            else {
                Tool.pre(["更新出错", t])
            }
        },
        d05: function (oo) {
            let GlobalPro = oo.GlobalPro[this.obj.B1 - 1]
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "shop_id=" + oo.seller[oo.obj.site].shopId,
                "cursor=",
                "page_size=30",
                "search_type=sku",
                "keyword=" + GlobalPro.proid,
                "selectable=1",
                "cnsc_shop_id=" + oo.seller[oo.obj.site].shopId,
                "cbsc_shop_region=" + oo.obj.site
            ]
            let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_list_by_selector?" + pArr.join("&")
            let _1688Url = "https://detail.1688.com/offer/" + GlobalPro.manualreview_1688_fromid + ".html"
            oo.dom.append('\
                <tr><td class="right">1688详情页地址：</td><td colspan="2"><a href="' + _1688Url + '" target="_blank">' + _1688Url + '</a></td></tr>\
                <tr><td class="right">请求地址：</td><td colspan="2"><a href="' + url + '" target="_blank">' + url + '</a></td></tr>\
                ');
            $("#state").html("正在【全球商品】中搜索，获取商品SKU。。。");
            gg.getFetch(url,"json", this.d06, this, oo)
        },
        d06: function (o1, oo) {
            if (o1.code == 0) {
                if (o1.data.page_info.total == 0) {
                    //就是没有搜索到结果，会来到这里。
                    //当商品已售完，会来到这里
                    //当商品中已发布，会来到这里
                    Tool.pre(["就是没有搜索到结果，会来到这里：", o1])
                }
                else {
                    //为什么是“list[0]”？答：因为只搜索一个，所以就是第一个。
                    this.d07(o1.data.list[0], oo);
                }
            }
            else {
                Tool.pre(["出错001：", oo])
            }
        },
        d07: function (search_data, oo) {
            let model_price_list = [], model_info_list = [];
            let GlobalPro = oo.GlobalPro[this.obj.B1 - 1];
            for (let i = 0; i < search_data.model_list.length; i++) {
                model_price_list.push({
                    mtsku_model_id: search_data.model_list[i].mtsku_model_id,
                    mpsku_model_price: Tool.common_price.b03(
                        (parseFloat(search_data.model_list[i].price_info.normal_price) + GlobalPro.common_price.upPrice) * GlobalPro._1688_prodes_sku.startAmount,
                        oo.seller[oo.obj.site],
                        GlobalPro.discount
                    ).toFixed(oo.seller[oo.obj.site].scale),
                });
                model_info_list.push({
                    "mtsku_model_id": search_data.model_list[i].mtsku_model_id,
                    //库存必须大于【最小购买量】，否则不可销售。
                    "mpsku_status": (search_data.model_list[i].stock_info.normal_stock < GlobalPro.common_price.min_purchase_limit ? 2 : 1) //1:正常销售；2：不可销售；
                })
            }
            oo.dom.append('<tr><td class="right">【全球商品】价格：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(search_data.model_list, null, 2) + '</textarea></td></tr>');
            this.d08(search_data.mtsku_item_id, model_price_list, model_info_list, oo)
        },
        d08: function (mtsku_item_id, model_price_list, model_info_list, oo) {
            let data = {
                "mtsku_item_id": mtsku_item_id,
                "publish_shop_list": [
                    {
                        "shop_id": oo.seller[oo.obj.site].shopId,
                        "user_name": oo.seller[oo.obj.site].shopName,
                        "region": oo.obj.site.toUpperCase(),
                        "model_price_list": model_price_list,
                        "model_info_list": model_info_list
                    }],
                "scene_token": "在下面的代码中获取该信息"
            }
            oo.dom.append('<tr><td class="right">修改后价格：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(data, null, 2) + '</textarea></td></tr>');
            oo.GlobalPro[this.obj.B1 - 1].post = data;
            this.e01(oo)
        },
        //////////////////////////////////////////////////////////
        e01: function (oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.obj.site].shopId,
                "cbsc_shop_region=" + oo.obj.site
            ]
            let url = "https://seller.shopee.cn/api/v3/mtsku/get_scene_token?" + pArr.join("&")
            let data = {
                shop_id: oo.seller[oo.obj.site].shopId,
                region: oo.obj.site.toUpperCase(),
                user_name: oo.seller[oo.obj.site].shopName,
                scene: "create_mpsku_by_mtsku"
            }
            $("#state").html("正在获取token");
            gg.postFetch(url, JSON.stringify(data), this.e02, this, oo)
        },
        e02: function (o1, oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.obj.site].shopId,
                "cbsc_shop_region=" + oo.obj.site
            ]
            let url = "https://seller.shopee.cn/api/v3/mtsku/create_mpsku_by_single_mtsku" + pArr.join("&")
            oo.GlobalPro[this.obj.B1 - 1].post.scene_token = o1.data.token
            $("#url").html(url + "[post]");
            $("#state").html("正在提交。。。");
            //问：为什么不用批量发布？答：如果用了，那就不知道是哪个发布失败了。
            gg.postFetch(url, JSON.stringify(oo.GlobalPro[this.obj.B1 - 1].post), this.e03, this, oo)
        },
        e03: function (o1, oo) {
            if (o1.code == 0) {
                this.e04(oo);
            }
            else {
                Tool.pre(["出错：", o1]);
            }
        },
        e04: function (oo) {
            $("#state").html("延时0.5秒等发布结果。。。");
            Tool.Time("name", 500, this.e05, this, oo)
        },
        e05: function (oo) {
            let pArr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.obj.site].shopId,
                "cbsc_shop_region=" + oo.obj.site,
                "page_number=1",
                "page_size=1",
            ]
            let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_publish_record" + pArr.join("&")
            $("#state").html("正在获取发布结果。。。");
            gg.getFetch(url,"json", this.e06, this, oo)
        },
        e06: function (t, oo) {
            if (t.code == 0) {
                //说明:只要是发布成功，那就一定有进度条。
                this.e07(t.data.list[0], oo);//为什么是数组的第一个？因为最新发布的在前面。
            }
            else {
                Tool.pre(["出错11：", t]);
            }
        },
        e07: function (t, oo) {
            if (t.publish_result.progress == 100) {
                this.f01(t.publish_result, oo)
            }
            else {
                this.e04(oo);
            }
        },
        //////////////////////////////////////
        f01: function (publish_result, oo) {
            if (publish_result.published_count == 1) {
                this.f02("update @.table set @.is" + oo.obj.site + "=1 where @.proid='" + oo.GlobalPro[this.obj.B1 - 1].proid + "'", oo)
            }
            else if (publish_result.failed_count == 1) {
                // @.penalty_type=8         更新后违规类型【8.发布商品失败】
                this.f02("update @.table set @.penalty_type=8 where @.proid in ('" + oo.GlobalPro[this.obj.B1 - 1].proid + "')", oo)
            }
            else if (publish_result.unpublished_count == 1) {
                $("#state").html("不能发布了。");
                this.g02(oo);
            }
            else {
                Tool.pre(["未知发布结果", publish_result])
            }
        },
        f02: function (sql, oo) {
            let data = [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: sql,
            }]
            $("#state").html("正在更新本地商品状态。。。");
            Tool.ajax.a01(data, this.f03, this, oo);
        },
        f03: function (t, oo) {
            if (t[0].length == 0) {
                this.obj.B1++;
                this.a05(oo);
            }
            else {
                Tool.pre(["更新出错", t])
            }
        },
        g01: function (oo) {
            $("#state").html("该页发布完成。");
            this.obj.B1 = 1; this.obj.B2 = 0;
            $("#B1").html("0%").css("width", "0%");
            $("#B2").html("");
            oo.dom.html("");
            this.obj.A1++;
            this.a02(oo)
        },
        g02: function (oo) {
            this.obj.A1 = 1; this.obj.A2 = 0;
            Tool.apply("ok", oo.next, oo.This, oo.t);
        },
    },
})