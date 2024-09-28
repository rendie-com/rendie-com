var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 商品列表 &gt; 全球商品 &gt; 手动审核1688状态_重新采集1688商品讲解视频') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">访问地址：</td><td id="url" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr></tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        //@.ManualReview_1688>0         手动审核1688状态， 非【0.未审核】。
        //let where = " where @.manualreview_1688_fromid=661490307988"
        //let where = " where @.proid='R605907'"
        let where = " where @.isup=1 and @.ManualReview_1688>0"
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("proid,manualreview_1688_fromid") + " FROM @.table" + where + Tool.limit(1, this.obj.A1, "sqlite"),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "select count(1) as total FROM @.table" + where,
            })
        }
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        if (t[0].length == 0) {
            $("#state").html("没有数据...")
        }
        else {
            $("#proid").html(t[0][0].proid);
            if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, t[0][0].manualreview_1688_fromid);
        }
    },
    a05: function (fromid) {
        let day10 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 0) / 1000)// and
        let data = [{
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(fromid, 99),
            sql: "select @.fromid as fromid FROM @.prodes where @.fromid=" + fromid + " and @.uptime<" + day10,
        }]
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(data, this.a06, this);
    },
    a06: function (t) {
        if (t[0].length == 0) {
            $("#state").html("还没到更新的时后");
            this.d03([[], []])
        }
        else {
            Tool.gatherDetail.a01(t[0][0].fromid, this.d01, this)
        }
    },
    ////////////////////////////
    d01: function (oo) {
        if (oo.error) {
            this.e01(oo)
        }
        else {
            this.d02(oo)
        }
    },
    d02: function (oo) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "update @.proList set @.uptime=" + Tool.gettime("") + ",@.saleNum=" + oo.saleNum + ",@.unit='" + oo.unit + "',@.unitWeight=" + oo.unitWeight + ",@.deliveryLimit=" + oo.deliveryLimit + ",@.freight=" + oo.freight + " where @.fromid=" + oo.fromid,
        }, {
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(oo.fromid, 99),
            sql: "update @.prodes set @.des=" + Tool.rpsql(oo.details) + ",@.ExplanationVideo=" + Tool.rpsql(oo.ExplanationVideo) + ",@.uptime=" + Tool.gettime("") + ",@.pic=" + Tool.rpsql(JSON.stringify(oo.pic)) + ",@.attr=" + Tool.rpsql(JSON.stringify(oo.attr)) + ",@.sku=" + Tool.rpsql(JSON.stringify(oo.sku)) + ",@.videoUrl=" + Tool.rpsql(oo.videoUrl) + " where @.fromid=" + oo.fromid,
        }]
        $("#state").html("正在更新1688商品...");
        Tool.ajax.a01(data, this.d03, this)
    },
    d03: function (t) {
        if (t[0].length == 0 && t[1].length == 0) {
            $("#state").html("等1秒后，再下一条...");
            $("#url,#proid").html("")
            this.obj.A1++;
            this.a03();
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            Tool.pre(["更新出错01：", t]);
        }
    },
    //////////////////
    e01: function (oo) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: 'update @.proList set @.state=' + oo.state + ',@.errorMsg=' + Tool.rpsql(oo.error) + ',@.uptime=' + Tool.gettime("") + ' where @.fromid=' + oo.fromid,
        }, {
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(oo.fromid, 99),
            sql: 'update @.prodes set  @.uptime=' + Tool.gettime("") + ' where @.fromid=' + oo.fromid
        }]
        Tool.ajax.a01(data, this.d03, this)
    },

}
fun.a01();







// let data = []
// for(let i=2; i<100;i++){
//     data.push({
//         action: "sqlite",
//         database: "1688_prodes/"+(String(i).padStart(2, '0')),
//         //sql: "select " + Tool.fieldAs("id") + " FROM @.prodes limit 1",
//         sql: "ALTER TABLE @.prodes ADD @.ExplanationVideo varchar(255)",
//     })
// }
// Tool.ajax.a01(data, this.a04, this);