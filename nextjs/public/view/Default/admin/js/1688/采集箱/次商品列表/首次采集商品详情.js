'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 首次采集商品详情。。。") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">详情内容地址：</td><td id="detailUrl" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        //@.fromid=594196944168
        //@.uptime=0
        let str = '\
        {\
            <r:proList size=1 page=2 db="sqlite.1688" where=" where @.uptime=0">\
		        "fromid":<:fromid/>,\
            </r:proList>\
            "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a04, this);
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        if (oo.fromid) {
            Tool.gatherDetail.a01(oo.fromid, this.a06, this)
        }
        else {
            $("#state").html("出错了...");
            Tool.pre(["出错了...", oo]);
        }
    },
    a06: function (oo) {
        if (oo.error) {
            this.d01(oo)
        }
        else {
            this.a07(oo)
        }
    },
    a07: function (oo) {
        $("#state").html("正在更新数据...");
        let update1Arr = [
            "@.uptime=" + Tool.gettime(""),
            "@.saleNum=" + oo.saleNum,
            "@.unit='" + oo.unit + "'",
            "@.unitWeight=" + oo.unitWeight,
            "@.deliveryLimit=" + oo.deliveryLimit,
            "@.freight=" + oo.freight
        ]
        let update1 = '<r: db="sqlite.1688">update @.proList set '+update1Arr.join(",")+' where @.fromid=' + oo.fromid + '</r:>'
        //////////////////////////////////////////////////////////////////////////
        let arrL = ["@.fromid", "@.addtime", "@.des", "@.attr", "@.sku", "@.videoUrl", "@.pic"]
        let arrR = [
            oo.fromid,
            Tool.gettime(""),
            Tool.rpsql(oo.details),
            Tool.rpsql(JSON.stringify(oo.attr)),
            Tool.rpsql(JSON.stringify(oo.sku)),
            Tool.rpsql(oo.videoUrl),
            Tool.rpsql(JSON.stringify(oo.pic))
        ]
        let insert = '<r: db="sqlite.1688_prodes/' + Tool.remainder(oo.fromid, 99) + '">insert into @.prodes(' + arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>'
        /////////////////////////////////////////////////////////////////////////
        let update2Arr = [];
        for (let i = 0; i < arrL.length; i++) {
            update2Arr.push(arrL[i] + "=" + arrR[i]);
        }
        let update2 = '<r: db="sqlite.1688_prodes/' + Tool.remainder(oo.fromid, 99) + '">update @.prodes set ' + update2Arr.join(",") + ' where @.fromid=' + oo.fromid + '</r:>'
        /////////////////////////////////////////////////////////////////////////
        let select = 'Fun(Db(sqlite.1688_prodes/' + Tool.remainder(oo.fromid, 99) + ',select count(1) from @.prodes where @.fromid=' + oo.fromid + ',count))'
        Tool.ajax.a01('"ok"<if ' + select + '==0>' + insert + '<else/>'+update2+'</if>' + update1, 1, this.a08, this)
    },
    a08: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            $("#url,#detailUrl").html("")
            this.obj.A1++;
            this.a02();
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
    /////////////////////////////////////////////////
    d01: function (oo) {
        let str1 = 'update @.proList set @.state=' + oo.state + ',@.errorMsg=' + Tool.rpsql(oo.error) + ',@.uptime=' + Tool.gettime("") + ' where @.fromid=' + oo.fromid
        let str2 = '"ok"<r: db="sqlite.1688">' + str1 + '</r:>';
        Tool.ajax.a01(str2, 1, this.a08, this);
    },
}
fun.a01();