'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 99,
        B1: 1, B2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 重新采集商品详情") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">数据库：</td><td>'+ this.b01() + '</td><td></td></tr>\
                <tr><td class="right w150">数据库进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">详情地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">详情内容地址：</td><td id="detailUrl" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(null, null, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null);
    },
    a04: function () {
        let day60 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 60) / 1000)
        let str = '{\
        "B2":'+ (this.obj.B2 == 0 ? '<@page/>' : '0') + ',\
        <r:prodes size=1 page=2 db="sqlite.1688_prodes/'+ this.obj.A1.toString().padStart(2, '0') + '" where=" where @.uptime<' + day60 + '">\
            "fromid":<:fromid/>\
        </r:prodes>}'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, 1, this.a05, this);
    },
    a05: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo.B2; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.e01, oo);
    },
    a06: function (oo) {
        if (oo.fromid) {
            Tool.gatherDetail.a01(oo.fromid, this.a07, this)
        }
        else {
            $("#state").html("出错了，等1秒后，再来...");
            Tool.Time("name", 1000, this.a04, this)
            //Tool.pre(["出错了...", oo]);
        }
    },
    a07: function (oo) {
        if (oo.error) {
            this.d01(oo)
        }
        else {
            this.a08(oo)
        }
    },
    a08: function (oo) {
        let update1 = '<r: db="sqlite.1688">update @.proList set @.uptime=' + Tool.gettime("") + ',@.saleNum=' + oo.saleNum + ',@.unit=\'' + oo.unit + '\',@.unitWeight=' + oo.unitWeight + ',@.deliveryLimit=' + oo.deliveryLimit + ',@.freight=' + oo.freight + ' where @.fromid=' + oo.fromid + '</r:>'
        let update2 = '<r: db="sqlite.1688_prodes/' + Tool.remainder(oo.fromid, 99) + '">update @.prodes set @.des=' + Tool.rpsql(oo.details) + ',@.uptime=' + Tool.gettime("") + ',@.pic=' + Tool.rpsql(JSON.stringify(oo.pic)) + ',@.attr=' + Tool.rpsql(JSON.stringify(oo.attr)) + ',@.sku=' + Tool.rpsql(JSON.stringify(oo.sku)) + ',@.videoUrl=' + Tool.rpsql(oo.videoUrl) + ' where @.fromid=' + oo.fromid + '</r:>';
        Tool.ajax.a01('"ok"' + update1 + update2, 1, this.a09, this)
    },
    a09: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            $("#url,#detailUrl").html("")
            this.obj.B1++;
            this.a04();
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
    /////////////////////////////////////////////////
    b01: function () {
        let nArr = [];
        for (let i = 1; i <= this.obj.A2; i++) {
            nArr.push('<option value="' + i + '">从第' + i + '个数据库开始执行</option>');
        }
        return '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择从第几个数据库开始执行</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    ///////////////////////
    c01: function (This, val) {
        This.attr("disabled", "disabled")
        this.obj.A1 = val;
        this.a02();
    },
    /////////////////////////////////////////////////
    d01: function (oo) {
        let sql = 'update @.proList set @.state=' + oo.state + ',@.errorMsg=' + Tool.rpsql(oo.error) + ',@.uptime=' + Tool.gettime("") + ' where @.fromid=' + oo.fromid
        let update1 = '"ok"<r: db="sqlite.1688">' + sql + '</r:>';
        let update2 = '<r: db="sqlite.1688_prodes/' + Tool.remainder(oo.fromid, 99) + '">update @.prodes set  @.uptime=' + Tool.gettime("") + ' where @.fromid=' + oo.fromid + '</r:>';
        Tool.ajax.a01(update1 + update2, 1, this.a09, this);
    },
    /////////////////////////////
    e01: function (t) {
        this.obj.B1 = 1; this.obj.B2 = 0;
        $("#B1").css("width", "0%"); $("#B1,#B2").html("");
        this.obj.A1++;
        this.a03()
        //if (confirm("确定要进入下一个数据库吗？\n\n按\"确定\"继续，或按\"取消\"留在当前页面。")) {
        //}
    },
}
fun.a01();