'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        //obj.params.return        返回URL
        //obj.params.site          站点
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 更多 &gt; 获取【店铺商品】信息") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="w150 right">获取站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        $("#state").html("正在初始化。。。");
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "update @.table set @.is" + obj.params.site + "=0",
        }, {
            action: "sqlite",
            database: "shopee/商品/店铺商品/"+ obj.params.site,
            sql: "update @.table set @.status=0",
        }]
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        if (t[0].length == 0 && t[1].length == 0) {
            this.d01();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    /////////////////////
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
    //////////////////////////////////////////   
    d01: function () {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "page_number=" + this.obj.A1,
            "page_size=12",
            "list_type=all",
            "count_list_types=sold_out,banned,deboosted,deleted,unlisted,reviewing",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/v3/mpsku/list/get_product_list?" + arr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在获取第" + this.obj.A1 + "页商品。。。");
        gg.getFetch(url,"json", this.d02, this);
    },
    d02: function (oo) {
        if (oo.code == 0) {
            this.obj.A2 = Math.ceil(oo.data.page_info.total / oo.data.page_info.page_size)
            this.d03(oo.data.products)
        }
        else if (oo.code == 429) {
            $("#state").html("请不要要求太频繁");
            //Tool.Time("1" 500,,this.d03, this,);
        }
        else {
            Tool.pre(["出错001", oo])
        }
    },
    d03: function (products) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d04, this, null, products)
    },
    d04: function (products) {
        let proidArr = [], fromidArr = [], insertObj = {}, updateObj = {};
        for (let i = 0; i < products.length; i++) {
            let arrL = [
                "@.fromid",
                "@.name",
                "@.status",
                "@.pic",
                "@.proid",
                "@.addtime",
                "@.uptime",
                "@.input_normal_price",//原价
                "@.promotion",//活动信息
                "@.model_list",//价格和价格ID信息
                "@.isUnlisted",//能不能下架
                "@.isTrueSignUp",//是否已报名活动
            ]
            let arrR = [
                products[i].id,
                Tool.rpsql(products[i].name),
                products[i].status,
                Tool.rpsql(products[i].cover_image),
                Tool.rpsql(products[i].parent_sku),
                products[i].create_time,
                products[i].modify_time,
                products[i].model_list[0].price_info.input_normal_price,
                Tool.rpsql(JSON.stringify(products[i].promotion)),
                Tool.rpsql(JSON.stringify(products[i].model_list)),
                this.b01(products[i].promotion),
                this.b02(products[i].promotion), //是否已报名活动
            ]
            ////////////////////////////////////////////////////           
            //self_uptime   本地更新时间（在添加商品时，目的就是要【该时间】大于【shopee更新时间】）
            insertObj[products[i].id] = "insert into @.table(@.self_uptime," + arrL.join(",") + ")values(" + Tool.gettime("") + "," + arrR.join(",") + ")";
            let updateArr = []
            for (let i = 0; i < arrL.length; i++) {
                if (arrL[i] != "@.fromid") {
                    updateArr.push(arrL[i] + "=" + arrR[i]);
                }
            }
            updateObj[products[i].id] = "update @.table set " + updateArr.join(",") + "  where @.fromid=" + products[i].id
            proidArr.push(Tool.rpsql(products[i].parent_sku));
            fromidArr.push(products[i].id);
        }
        let data = [{
            action: "sqlite",
            database: "shopee/商品/店铺商品/"+ obj.params.site,
            sql: "select @.fromid as fromid from @.table where @.fromid in(" + fromidArr.join(",") + ")",
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "update @.table set @.is" + obj.params.site + "=1 where @.proid in(" + proidArr.join(",") + ")",
        }]
        $("#state").html("正在更新本地商品状态。。。");
        Tool.ajax.a01(data, this.d05, this, [insertObj, updateObj]);
    },
    d05: function (t, sqlArr) {
        if (t[1].length == 0) {
            let arr = []
            for (let i = 0; i < t[0].length; i++) {
                arr.push(t[0][i].fromid)
            }
            this.d06(arr, sqlArr)
        }
        else {
            Tool.pre(["出错02", t]);
        }
    },
    d06: function (arr, sqlArr) {
        let data = []
        for (let k in sqlArr[0]) {
            let sql = ""
            if (arr.indexOf(Tool.int(k)) == -1) {
                sql = sqlArr[0][k]
            }
            else {
                sql = sqlArr[1][k]
            }
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: sql,
            })
        }
        Tool.ajax.a01(data, this.d07, this);
    },
    d07: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.A1++;
            $("#state").html("正在进入第" + this.obj.A1 + "页。。。");
            Tool.Time("name", 0, this.d01, this);
        }
    },
}
fun.a01();