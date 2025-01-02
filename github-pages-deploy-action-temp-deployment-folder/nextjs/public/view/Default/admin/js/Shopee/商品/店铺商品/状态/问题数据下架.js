'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        seller: {},
    },
    a01: function () {
        //obj.params.jsFile       选择JS文件      
        //obj.params.return       返回URL
        //obj.params.site         站点
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品列表 &gt; 店铺商品 &gt; 状态_问题数据下架") + '\
        <div class="p-2">\
          <table class="table table-hover align-middle mb-0">\
          <tbody>\
		    <tr><td class="right">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
		    <tr><td class="right w150">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">条件：</td><td id="where" colspan="2"></td></tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this);
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
        $("#state").html("正在获取商品信息。。。");
        let arr = [
            "@.ManualReview<>9",//敦煌手动审核状态 <> 9.图片且详情审核通过
            "@.DHAfterReview<>0",//敦煌审核后本地状态 <> 0.正常
            "@.BeforeReview<>1",//更新前本地状态 <> 1.更新成功
            "@.penalty_type<>0",//更新后违规类型 <> 0.未违规
            "@.ManualReview_1688<>1",//手动审核1688状态 <> 1.使用1688属性图
            "@.ManualReview_1688_state<>0",//手动审核后1688商品状态 <> 0.正常
            //"@.ManualReview_1688_video_status<>7",//人工审核1688视频状态 <> 7.审核通过
            "@.editStatus>2",//修改状态 > 2  （	0：未修改 1：第一次修改 2：第二次修改 3：货源不对）
        ]
        $("#where").html(arr.join(" or "))
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select @.proid as proid FROM @.table where @.is" + obj.params.site + "=1 and (" + arr.join(" or ") + ")" + Tool.limit(12, this.obj.A1),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select count(1) as total FROM @.table where @.is" + obj.params.site + "=1 and (" + arr.join(" or ") + ")",
            })
        }
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = Math.ceil(t[1][0].total / 12); }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, t[0])
    },
    a06: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "select @.fromid as fromid FROM @.table  where @.proid='" + arr[i].proid + "'",
            })
        }
        Tool.ajax.a01(data, this.a07, this);
    },
    a07: function (arr) {
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length != 0) {
                data.push({
                    id: arr[i][0].fromid,
                    unlisted: true
                })
            }
        }
        this.d01(data)
    },
    ///////////////////////////////////  
    d01: function (data) {
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
        gg.postFetch(url, JSON.stringify(data), this.d02, this)
    },
    d02: function (oo) {
        if (oo.code == 0) {
            $("#state").html("正在更新下架。。。");
            this.d03(oo.data.result)
        }
        else if (oo.code == 1000100007) {//部分成功
            this.d03(oo.data.result)
        }
        else if (oo.code == 1000100006) {//全部失败
            this.d03(oo.data.result)
        }
        else {
            Tool.pre(["出错：", oo])
        }
    },
    d03: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            // @.status=-3       表示【-3.问题数据】
            // @.status=-4       表示【-4.下架失败】
            data.push({
                action: "sqlite",
                database: "shopee/商品/店铺商品/" + obj.params.site,
                sql: "update @.table set @.status=" + (arr[i].code ? -4 : -3) + ", @.uptime=" + Tool.gettime("") + " where @.fromId=" + arr[i].id,
            })
        }
        Tool.ajax.a01(data, this.d04, this);
    },
    d04: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            $("#state").html("这一页下架完成。。。");
            this.obj.A1++;
            this.a04();
        }
    },
}
fun.a01();