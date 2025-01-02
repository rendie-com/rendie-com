'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0, B1: 1, B2: 10, Barr: [], errid: [],
        where: " where @.upshelf&gt;0 and @.time1<" + parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 7) / 1000),
        nowDate: 0, endDate: 0,
        username: "", password: "", fromid: 0, time1: 0,
        promoId: 0//活动要用
    },
    a01: function () {
        let html = Tool.header("正在做活动【创建拼团】...") + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
		    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
			</tbody>\
      </table>\
    </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        this.obj._A1 = this.obj.A1;//因为更新完一个后会少一个，所以每次A1进去时要要为“1”。
        this.obj.A1 = 1;
        Tool.getDHuser(this.a04, this);//获得账号等信息
    },
    a04: function () {
        this.obj.A1 = this.obj._A1;
        $("#username").html(this.obj.username);
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        let isbool = false, newTime = Tool.gettime("");;
        this.obj.nowDate = this.obj.time1 != 0 ? this.obj.time1 : newTime;
        if (this.obj.nowDate < newTime) { this.obj.nowDate = newTime; isbool = true; }
        else if (this.obj.nowDate < newTime + 60 * 60 * 24 * 7)//7天
        { isbool = true; }
        else { alert("不可能到这里002"); }
        if (isbool) { this.a06(); }
    },
    a06: function () {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(this.a07, this);
    },
    a07: function () {
        this.obj.nowDate = this.obj.nowDate + 60;
        this.obj.endDate = this.obj.nowDate + 60 * 60 * 24 * 7;//7天
        $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
        $("#state").html("1.设置活动信息");
        let url = "http://seller.dhgate.com/promoweb/storeteamshopping/createStep1.do?dhpath=10004,30,3005"//这个是必须的，不然会出现出错
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a09, this);
    },
    a09: function (t) {
        $("#state").html("2.选择产品。")
        let url = "http://seller.dhgate.com/promoweb/storeteamshopping/saveStep1.do?promoDto.name=" + Tool.userDate13(this.obj.nowDate * 1000, "-") + "&startDate=" + Tool.js_date_time2(this.obj.nowDate, "-") + "&endDate=" + Tool.js_date_time2(this.obj.endDate, "-") + "&promoDto.promoPolicy=1";
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a10, this);
    },
    a10: function (t) {
        if (t.indexOf('<input type="hidden" id="promoId"') != -1) {
            this.obj.promoId = Tool.StrSlice(t, 'name="promoId" value="', '"');
            this.a11();
        }
        else if (t.indexOf('<p>店铺促销扣减促销个数和时长-当月扣减失败 </p>') != -1) {
            alert("店铺促销扣减促销个数和时长-当月扣减失败")
        }
        else { alert("出错：" + t) }
    },
    a11: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a12, this, this.a16)
    },
    a12: function () {
        $("#state").html("正在准备（第" + this.obj.B1 + "页）商品。。。");
        let url = "http://seller.dhgate.com/promoweb/storeteamshopping/createStep2.do?dhpath=10004,30,3005&promoId=" + this.obj.promoId + "&page=" + this.obj.B1
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a13, this);
    },
    a13: function (t) {
        $("#state").html("已拿到（第" + this.obj.B1 + "页）商品。。。");
        let chk = Tool.StrSplits(t, 'data-prono="', '"');
        if (chk.length == 0) {
            $("#state").html("没有可做的拼团商品");
        }
        else {
            $("#state").html("已拿到商品编码。。。<hr/>" + chk.join(" , "));
            this.a14(chk);
        }
    },
    a14: function (chk) {
        for (let i = 0; i < chk.length; i++) { this.obj.Barr.push(chk[i]); }
        $("#state").html("（第" + this.obj.B1 + "页）正在【加入拼团】...");
        let url = "http://seller.dhgate.com/promoweb/storeteamshopping/createStep2.do?&promoId=" + this.obj.promoId + "&page=" + this.obj.B1 + "&from=create&itemcodes=" + chk.join("&itemcodes=");
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a15, this);
    },
    a15: function (t) {
        if (t.indexOf(">" + (this.obj.B1 * 10) + "</b> 个，还可选择") != -1) {
            this.obj.B1++;
            this.a11();
        }
        else if (t.indexOf('</b>\n																				<span class="disablebtn">') != -1)//表示到了最后一页了
        {
            $("#state").html("到了最后一页了...");
            //this.obj.B1=this.obj.B2;
            //this.obj.B1++;
            //this.a11();
            alert("aaaaaaaaaaaaaqqqqqq")
        }
        else {
            Tool.at(t)
        }
    },
    a16: function () {
        $("#state").html("【商品准备完成】正在准备提交。。。<hr/>【" + this.obj.Barr.length + "个】" + this.obj.Barr.join(" , "));
        let url = "http://seller.dhgate.com/promoweb/storeteamshopping/createStep3.do?promoId=" + this.obj.promoId + "&from=create&dhpath=10004,30,3005";
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a17, this);
    },
    a17: function (t) {
        let html = '\
    [0<r: db="sqlite.dhgate">update @.proupdhgate set @.isActivity2=0 where @.isActivity2=1</r:>\
    <r:proupdhgate size=100 db="sqlite.dhgate" where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.fromid in('+ this.obj.Barr.join(",") + ') and a.@.upuserid=' + this.obj.fromid + '">,\
    {\
      "fromid":"<:a.@.fromid/>",\
      "maxprice":<:b.@.maxprice/>\
    }\
    </r:proupdhgate>]'
        Tool.ajax.a01(html, 1, this.a18, this, t)
    },
    a18: function (oo, t) {
        if (this.obj.Barr.length == oo.length - 1) {
            this.a19(oo, t);
        }
        else {
            $("#state").html("DH的商品本地没有，无法继续...【DH:" + this.obj.Barr.length + " 个】<hr/>【本地:" + (oo.length - 1) + " 个】<hr/>本地没有：" + Tool.pre(oo));
            pre(oo)
        }
    },
    a19: function (oo, t) {
        if (t.indexOf('type="button" value="提 交"') != -1) {
            let chk = Tool.StrSplits(t, 'class="j-chk" type="hidden" value="', '"');
            let avprice = Tool.StrSplits(t, '<span class="j-avprice color44">$', '</span>');
            if (chk.length == avprice.length) { this.a20(oo, chk, avprice); }
            else {
                $("#state").html("商品【编码】的数量必需与商品【价格】的数量一样，否则就是DH改版了,程序已终止。");
            }
        }
        else if (t.indexOf('很抱歉，您本次访问的网页出现问题，无法显示') != -1) {
            alert("qqqwwww")
            //this.a14();

        }
        else { alert("已改版"); }
    },
    a20: function (arr, chk, avprice) {
        let price, errid = [], nArr = []
        for (let i = 0; i < chk.length; i++)//选出大于以前的活动价格，用来删掉
        {
            price = 0;
            for (let j = 1; j < arr.length; j++) {
                if (chk[i] == arr[j].fromid) {
                    price = ((arr[j].maxprice) * 1.20).toFixed(2);
                    break;
                }
            }
            if (price == 0) { alert("不可能找不到001"); }
            else {
                if (price > parseFloat(avprice[i])) { errid.push(chk[i]); }
                else { nArr.push(chk[i]); }
            }
        }
        this.obj.Barr = nArr
        /////////////////////////////////////
        if (errid.length == 0) {
            this.a23(chk, avprice)
        }
        else {
            this.obj.errid = errid;
            $("#state").html("拼团价高于平均价：" + errid.join(" , `"));
            this.a21();
        }
    },
    a21: function () {
        if (this.obj.errid.length == 0) {
            $("#state").html("3.设置促销规则");
            this.a16();
        }
        else {
            let url = "http://seller.dhgate.com/promoweb/storeteamshopping/cancelone.do?itemcode=" + this.obj.errid[0] + "&promoId=" + this.obj.promoId;
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("还剩" + this.obj.errid.length + "个要删除。");
            gg.getFetch(url,"json", this.a22, this);
        }
    },
    a22: function (t) {
        if (t == "") {
            this.obj.errid.shift();
            this.a21();
        }
        else { alert("删除失败。") }
    },
    a23: function (chk, avprice) {
        let Arr = []
        for (let i = 0; i < chk.length; i++) {
            Arr[i] = chk[i] + "__" + avprice[i] + "_10_2_2"
        }
        let url = 'http://seller.dhgate.com/promoweb/storeteamshopping/validate.do?promoId=' + this.obj.promoId + '&deliverData=' + Arr.join(",")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a24, this)
    },
    a24: function (oo) {
        if (oo.validate == "1") {
            let txt = '<r: db="sqlite.dhgate">update @.seller set @.time1=' + this.obj.endDate + ' where @.fromid=' + this.obj.fromid + '</r:><r: db="sqlite.aliexpress">update @.proupdhgate set @.isActivity2=1 where @.fromid in(' + this.obj.Barr.join(",") + ')</r:>'
            Tool.ajax.a01(txt, 1, this.a25, this)
        }
        else {
            $("#state").html("拼团活动创建【失败】" + Tool.pre(oo));
        }
    },
    a25: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.obj.B1 = 1;
            this.obj.Barr = [];
            this.obj.username = ""
            this.obj.password = ""
            this.obj.fromid = 0
            this.obj.nowDate = 0
            this.obj.endDate = 0
            this.obj.promoId = 0
            this.obj.time1 = 0
            $("#B1").css("width", "0%");
            $("#B1,#B2").html("")
            $("#state").html("正在准备下一个账号...");
            this.a03();
        }
        else { alert("出错：" + t) }
    },
}
fun.a01()