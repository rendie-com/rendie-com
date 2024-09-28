'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : "-_-20";//返回URL
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//是单个【fromid】，还是所有【all】
        obj.arr[6] = obj.arr[6] ? parseInt(obj.arr[6]) : 1;//翻页
        this.obj.A1 = obj.arr[6];
        let html = Tool.header("同步状态") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
                <tr><td class="w200 right">同步信息为：</td><td colspan="2">【上架/下架/待审核/审核未通过】和【余额/冻结/欠款】数量</td></tr>\
                <tr><td class="w200 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02A, this, html);
    },
    a02A: function () {
        gg.isRD(this.a02, this)
    },
    a02: function () {
        let where = "";
        if (obj.arr[5] != "all") { where = " where @.fromid=" + obj.arr[5]; }
        let str = Tool.DH_seller(where, "username,password,fromid,cookies", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)//获得账号等信息
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, this.a11, oo);
    },
    a04: function (oo) {
        $("#state").html("正在验证登陆。。。");
        //为什么要从a02开始？答：因为打开【我的资金账户】，必须是刚登录才行。
        Tool.verifyUser.a02([oo.username, oo.password, oo.cookies, this.a05, this]);
    },
    a05: function () {
        $("#state").html("正在打开【草稿箱】...")
        let url = "https://seller.dhgate.com/prodmanage/draft/prodDraftBox.do?dhpath=10001,21001,0202"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a06, this)
    },
    a06: function (t) {
        if (t.indexOf('我的摘要</title>') != -1) {
            $("#state").html("【草稿箱】进不去...")
            this.a08("")
        }
        else {
            let upshelf = Tool.StrSlice(t, "已上架<b>", "</b></span>").replace(",", "");
            let Pending = Tool.StrSlice(t, "待审核<b>", "</b>").replace(",", "");
            let downshelf = Tool.StrSlice(t, "已下架<b>", "</b></span>").replace(",", "");
            let NotThrough = Tool.StrSlice(t, "审核未通过<b>", "</b>").replace(",", "");
            let DHtotal = Tool.int(upshelf) + Tool.int(Pending) + Tool.int(downshelf) + Tool.int(NotThrough)
            this.a07(upshelf, Pending, downshelf, NotThrough, DHtotal);
        }
    },
    a07: function (upshelf, Pending, downshelf, NotThrough, DHtotal) {
        let str = "update @.seller set @.Pending=" + Pending + ",@.upshelf=" + upshelf + ",@.downshelf=" + downshelf + ",@.NotThrough=" + NotThrough + ",@.DHtotal=" + DHtotal + ",@.total=<1:count(1)/> where @.fromid=" + this.obj.fromid
        str = '"<r:proupdhgate  db="sqlite.dhgate" size=1 where=" where @.upuserid=' + this.obj.fromid + '"><r: db="sqlite.dhgate">' + str + '</r:></r:proupdhgate>"'
        Tool.ajax.a01(str, 1, this.a08, this);
    },
    a08: function (t) {
        if (t == "") {
            $("#state").html("正在打开【我的资金账户】...")
            let url = "https://dhfinet.dhgate.com/dhfinetportal/assets/assetsTotal.do"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a09, this, url)
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    a09: function (t, url) {
        if (t.indexOf('<title></title>') != -1) {
            $("#state").html('要重新登录。。。');
            alert("手动登录，也打不开")
        }
        else if (t.indexOf("US $") == -1) {
            Tool.pre(t)
            Tool.at("打不开，敦煌自己的原因")
        }
        else {
            let arr = Tool.StrSplits(t, 'US $', "</div>")//可用额度
            let Cash1 = arr[0].replace(",", "");//可用余额
            let Cash2 = arr[1].replace(",", "");//冻结余额
            let Cash3 = arr[2].replace(",", "");//账户欠款
            $("#state").html('正在更新数据。。。');
            let str = '""<r: db="sqlite.dhgate">update @.seller set @.Cash1=' + Cash1 + ',@.Cash2=' + Cash2 + ',@.Cash3=' + Cash3 + ' where @.fromid=' + this.obj.fromid + '</r:>';
            Tool.ajax.a01(str, 1, this.a10, this)
        }
    },
    a10: function (t) {
        if (t == "") {
            $("#state").html('更新成功。。。');
            this.obj.A1++;
            Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/" + obj.arr[5] + "/" + this.obj.A1)
        } else { alert(t); }
    },
    a11: function () {
        gg.highlightTab(1, this.a12, this)
    },
    a12: function () {
        Tool.url(Tool.unescape(obj.arr[4]))
    },
}
fun.a01();