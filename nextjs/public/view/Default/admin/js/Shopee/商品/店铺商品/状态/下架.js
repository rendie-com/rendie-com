'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        mode: 0,
        seller: {}
    },
    a01: function () {
        //obj.params.return        返回URL
        //obj.params.site          站点
        //obj.params.status        状态       
        let html = Tool.header(obj.params.return,"Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 状态_下架") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
            <tbody>\
 		        <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
 		        <tr><td class="right">当前商品状态：</td><td colspan="2">'+ this.b01(obj.params.status) + '</td></tr>\
 		        <tr><td class="right">下架数量：</td><td colspan="2">'+ this.b02() + '</td></tr>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html)
    },
    /////////////////////////////////////////
    b01: function (status) {
        let arr = Tool.shopPro_statusArr, str = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == status) {
                str = arr[i][1];
                break;
            }
        }
        return str;
    },
    b02: function () {
        let str = '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择下架数量</option>\
            <option value="1">不限制</option>\
            <option value="2">下架10条1688中销量低的商品</option>\
            <option value="3">下架100条【需要改价】的商品</option>\
            <option value="4">下架【shopee更新时间】小于【本地更新时间】的商品</option>\
        </select>';
        return str;
    },
    b03: function () {
        let data = [];
        //@.isUnlisted=1        表示【能下架】
        if (this.obj.mode == 1) {
            data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "select @.fromid as fromid from @.table where  @.status=" + obj.params.status + " and @.isUnlisted=1 order by @._1688_saleNum asc" + Tool.limit(12, this.obj.A1),
            }]
            if (this.obj.A2 == 0) {
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/"+ obj.params.site,
                    sql: "select count(1) as total FROM @.table where @.status=" + obj.params.status + " and @.isUnlisted=1",
                })
            }
        }
        else if (this.obj.mode == 2) {
            data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "select @.fromid as fromid from @.table where  @.status=" + obj.params.status + " and @.isUnlisted=1 order by @._1688_saleNum asc limit 10",
            }]           
        }
        else if (this.obj.mode == 3) {
            //@.status=1       表示【上架商品】
            data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "select @.fromid as fromid from @.table where  @.status=1 and @.price_uptime>0 limit 100",
            }]            
        }
        else if (this.obj.mode == 4) {
            //@.status=1       表示【上架商品】
            data = [{
                action: "sqlite",
                database: "shopee/商品/店铺商品/"+ obj.params.site,
                sql: "select @.fromid as fromid from @.table where  @.status=1 and @.price_uptime>@.uptime"+ Tool.limit(12, this.obj.A1),
            }]  
            if (this.obj.A2 == 0) {
                data.push({
                    action: "sqlite",
                    database: "shopee/商品/店铺商品/"+ obj.params.site,
                    sql: "select count(1) as total FROM @.table where @.status=1 and @.price_uptime>@.uptime",
                })
            }
        }
        return data;
    },
    //////////////////////
    c01: function (This, val) {
        This.attr("disabled", true);
        this.obj.mode = val;
        this.d01()
    },
    ///////////////////////////////////////
    d01: function () {
        Tool.login.a01(this.d02, this)
    },
    d02: function (t) {
        this.obj.seller = t;
        this.d03()
    },
    d03: function () {
        $("#state").html("正在获取商品信息。。。");
        Tool.ajax.a01(this.b03(), this.d04, this);
    },
    d04: function (t) {
        if (this.obj.A2 == 0) {
            if(t[1]){
                this.obj.A2 = t[1][0].total; 
            }
            else{
                this.obj.A2 = 1; 
            }             
        }       
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.e01, this, null, t[0])
    },
    //////////////////////////////////////////
    e01: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            data.push({
                id: arr[i].fromid,
                unlisted: true
            })
        }
        let pArr = [
            "version=3.1.0",
            "source=seller_center",
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller[obj.params.site].shopId,
            "cbsc_shop_region=" + obj.params.site
        ]
        let url = "https://seller.shopee.cn/api/v3/product/update_product/?" + pArr.join("&")
        $("#state").html("正在下架。。。");
        let headers = [
            {
                "name": "Content-Type",
                "value": 'application/json'
            }
        ]
        gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e02, this)
    },
    e02: function (oo) {
        //oo.code == 1000100007     表示部分上架成功。（当上架超限就会这样子）
        //oo.code == 1000100006     表示全部失败。（当上架超限就会这样子）
        if (oo.code == 0 || oo.code == 1000100007 || oo.code == 1000100006) {
            $("#state").html("正在更新下架。。。");
            this.e03(oo.data.result)
        }
        else {
            Tool.pre(["出错：", oo])
        }
    },
    e03: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            // @.status=-3       表示【-3.问题数据】
            // @.status=8        表未【未上架】
            // @.status=-4       表示【-4.下架失败】
            data.push({
                action: "sqlite",
                database:"shopee/商品/店铺商品/"+ obj.params.site,
                sql:"update @.table set @.status=" + (arr[i].code ? -4 : 8) + ", @.uptime=" + Tool.gettime("") + " where @.fromId=" + arr[i].id
            })
        }
        Tool.ajax.a01(data, this.e04, this);
    },
    e04: function (t) {
        let isErr = false;       
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            $("#state").html("这一页下架完成。。。");
            this.obj.A1++;
            Tool.Time("name", 0, this.d03, this)
        }        
    },
}
fun.a01();