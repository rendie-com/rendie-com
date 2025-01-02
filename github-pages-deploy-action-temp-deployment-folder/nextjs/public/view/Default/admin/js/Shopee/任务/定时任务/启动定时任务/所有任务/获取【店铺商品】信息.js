'use strict';
var task = {
    obj:
    {
        C1: 1, C2: 0,
    },
    a01: function (seller, site, next, This, t) {
        let oo = {
            seller: seller,
            site: site,
            next: next,
            This: This,
            t: t
        }
        $("#tbody").html('\
        <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
        <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">更新字段：</td><td id="updateFields" colspan="2"></td></tr>');
        this.a02(oo);
    },
    a02: function (oo) {
        $("#state").html("正在初始化。。。");
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "update @.table set @.is" + oo.site + "=0",
        }, {
            action: "sqlite",
            database: "shopee/商品/店铺商品/" + oo.site,
            sql: "update @.table set @.status=0",
        }]
        Tool.ajax.a01(data, this.a03, this, oo);
    },
    a03: function (t, oo) {
        if (t[0].length == 0 && t[1].length == 0) {
            this.d01(oo);
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    //////////////////////////////////////////   
    b01: function (oo) {
        let isUnlisted = 1//0表示不能下架 1：可以下架
        if (oo.ongoing_campaigns) {
            let arr = oo.ongoing_campaigns;
            if (oo.upcoming_campaigns) {
                arr = arr.concat(oo.upcoming_campaigns);
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].campaign_type != 4 && arr[i].campaign_type != 8) {
                    isUnlisted = 0;
                    break;
                }
            }
        }
        return isUnlisted
    },
    b02: function (oo) {
        let isTrueSignUp = 0//0 表示未报名活动 1：表示已报名活动
        if (oo.ongoing_campaigns) {
            let arr = oo.ongoing_campaigns;
            if (oo.upcoming_campaigns) {
                arr = arr.concat(oo.upcoming_campaigns);
            }
            ///////////////////////////////////////
            //arr[i].campaign_type值如下：
            //1:"报名商品活动"
            //4:"加购优惠"
            //6:"报名Shopee直播"
            //7:"店内秒杀"
            //8:"折扣"
            /////////////////////////////
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].campaign_type == 1) {
                    isTrueSignUp = 1;
                    break;
                }
            }
        }
        return isTrueSignUp
    },
    b03: function (arr) {
        let Rarr = [];
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i]) {//选择JS文件
                case "@.fromid": Rarr.push(arr[i] + "==来源ID"); break;
                case "@.name": Rarr.push(arr[i] + "==标题"); break;
                case "@.status": Rarr.push(arr[i] + "==状态"); break;
                case "@.pic": Rarr.push(arr[i] + "==首图"); break;
                case "@.proid": Rarr.push(arr[i] + "==全球商品货号"); break;
                case "@.addtime": Rarr.push(arr[i] + "==添加时间"); break;
                case "@.uptime": Rarr.push(arr[i] + "==更新时间"); break;
                case "@.input_normal_price": Rarr.push(arr[i] + "==原价"); break;
                case "@.promotion": Rarr.push(arr[i] + "==活动信息"); break;
                case "@.model_list": Rarr.push(arr[i] + "==价格和价格ID信息"); break;
                case "@.isUnlisted": Rarr.push(arr[i] + "==能不能下架"); break;
                case "@.isTrueSignUp": Rarr.push(arr[i] + "==是否已报名活动"); break;
                default: Rarr.push(arr[i] + "==未知"); break;
            }
        }
        return Rarr.join("<br/>")
    },
    //////////////////////////////////////////   
    d01: function (oo) {
        let arr = [
            "SPC_CDS=" + oo.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "page_number=" + this.obj.C1,
            "page_size=12",
            "list_type=all",
            "count_list_types=sold_out,banned,deboosted,deleted,unlisted,reviewing",
            "cnsc_shop_id=" + oo.seller[oo.site].shopId,
            "cbsc_shop_region=" + oo.site
        ]
        let url = "https://seller.shopee.cn/api/v3/mpsku/list/get_product_list?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.C1 + "页商品。。。");
        gg.getFetch(url, "json", this.d02, this, oo);
    },
    d02: function (o1, o2) {
        if (o1.code == 0) {
            this.obj.C2 = Math.ceil(o1.data.page_info.total / o1.data.page_info.page_size)
            o2.products = o1.data.products
            this.d03(o2)
        }
        else if (o1.code == 429) {
            $("#state").html("请不要要求太频繁");
            //Tool.Time("1" 500,,this.d03, this,);
        }
        else {
            Tool.pre(["出错001", o1])
        }
    },
    d03: function (oo) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d04, this, this.e01, oo)
    },
    d04: function (oo) {
        let arrL = [
            "@.fromid",//来源ID
            "@.name",//标题
            "@.status",//状态
            "@.pic",//首图
            "@.proid",//全球商品货号
            "@.addtime",//添加时间
            "@.uptime",//更新时间
            "@.input_normal_price",//原价
            "@.promotion",//活动信息
            "@.model_list",//价格和价格ID信息
            "@.isUnlisted",//能不能下架
            "@.isTrueSignUp",//是否已报名活动
        ], data = []
        for (let i = 0; i < oo.products.length; i++) {
            let arrR = [
                oo.products[i].id,
                Tool.rpsql(oo.products[i].name),
                oo.products[i].status,
                Tool.rpsql(oo.products[i].cover_image),
                Tool.rpsql(oo.products[i].parent_sku),
                oo.products[i].create_time,
                oo.products[i].modify_time,
                oo.products[i].model_list[0].price_info.input_normal_price,
                Tool.rpsql(JSON.stringify(oo.products[i].promotion)),
                Tool.rpsql(JSON.stringify(oo.products[i].model_list)),
                this.b01(oo.products[i].promotion),
                this.b02(oo.products[i].promotion), //是否已报名活动
            ]
            ////////////////////////////////////////////////////           
            //self_uptime   本地更新时间（在添加商品时，目的就是要【该时间】大于【shopee更新时间】）
            let updateArr = []
            for (let i = 0; i < arrL.length; i++) {
                if (arrL[i] != "@.fromid") {
                    updateArr.push(arrL[i] + "=" + arrR[i]);
                }
            }
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + oo.site,
                sql: "select @.fromid as fromid from @.table where @.fromid=" + oo.products[i].id,
                list: [{
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/" + oo.site,
                    sql: "update @.table set " + updateArr.join(",") + "  where @.fromid=" + oo.products[i].id,
                }],
                elselist: [{
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/" + oo.site,
                    sql: "insert into @.table(@.self_uptime," + arrL.join(",") + ")values(" + Tool.gettime("") + "," + arrR.join(",") + ")",
                }]
            })
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "update @.table set @.is" + oo.site + "=1 where @.proid=" + Tool.rpsql(oo.products[i].parent_sku),
            })
        }
        $("#updateFields").html(this.b03(arrL));
        oo.products = null;
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.d05, this, oo);
    },
    d05: function (t, oo) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0 && t[i][0].list[0].length != 0) {
                Tool.pre(t[i][0].list)
                iserr = true;
                break;
            }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.C1++;
            $("#state").html("正在进入第" + this.obj.C1 + "页。。。");
            Tool.Time("name", 0, this.d01, this, oo);
        }
    },
    //////////////////////////////
    e01: function (oo) {
        this.obj = {
            C1: 1, C2: 0,
        }
        $("#C1").css("width", "0%");
        $("#C1,#C2").html("");
        oo.next.apply(oo.This, [oo.t]);
    },
}