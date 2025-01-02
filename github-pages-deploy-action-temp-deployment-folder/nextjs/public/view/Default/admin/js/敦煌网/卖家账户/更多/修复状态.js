'use strict';
var fun =
{
    obj:
    {
        A1: 10, A2: 0,//账号进度
        B1: 1, B2: 0, Barr: [],
        _Barr: [
            [1, "已上架", "http://seller.dhgate.com/prodmanage/shelf/prodShelf.do?dhpath=10001,21001,0202&selectpagesize=60&page="],
            [2, "待审核", "http://seller.dhgate.com/prodmanage/audit/prodAudit.do?dhpath=10001,21001,0202&selectpagesize=60&page="],
            [3, "审核未通过", "http://seller.dhgate.com/prodmanage/audit/prodAuditFail.do?dhpath=10001,21001,0202&selectpagesize=60&page="],
            [4, "已下架", "http://seller.dhgate.com/prodmanage/downshelf/prodDownShelf.do?dhpath=10001,21001,0202&selectpagesize=60&page="]
        ],//状态进度
        C1: 1, C2: 0,//商品页进度
        fromid: 0//店铺的【fromid】---更新数据库要用
    },
    a01: function () {
        //obj.arr[4]    返回URL
        //obj.arr[5]    账号来源ID
        //obj.arr[6]    修复敦煌网[以下所有状态]
        //obj.arr[7]    对应已上传商品的[状态]
        let html = Tool.header("正在修复状态...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">状态进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
            <tr><td class="right">操作内容：</td><td id="des" colspan="2"></td></tr>\
            <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let where = "";
        if (obj.arr[5] != "all") { where = " where @.fromid=" + obj.arr[5]; }
        let str = Tool.DH_seller(where, "username,password,fromid,cookies", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)//获得账号等信息
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;//店铺的【fromid】---更新数据库要用
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.e03, oo);
    },
    a05: function (oo) {
        let isbool = true;
        if (obj.arr[6] == "0") { this.obj.Barr = this.obj._Barr; }//以下所有状态
        else if (obj.arr[6] == "1") { this.obj.Barr = [this.obj._Barr[0]]; }//1.已上架
        else if (obj.arr[6] == "2") { this.obj.Barr = [this.obj._Barr[1]]; }//2.待审核
        else if (obj.arr[6] == "3") { this.obj.Barr = [this.obj._Barr[2]]; }//3.审核未通过
        else if (obj.arr[6] == "4") { this.obj.Barr = [this.obj._Barr[3]]; }//4.已下架
        else { isbool = false; }
        if (isbool) {
            this.obj.B2 = this.obj.Barr.length;
            this.a06(oo);
        }
        else {
            $("#state").html("修复未知状态：" + obj.arr[6]);

        }
    },
    a06: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a07, this);
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.e02);
    },
    a08: function () {
        $("#des").html('正在对敦煌网【' + this.obj.Barr[this.obj.B1 - 1][1] + '】对应已上传商品的【' + this.b01(obj.arr[7]) + '】进行修复...')
        $("#state").html("正在获取【商品列表】...")
        let url = this.obj.Barr[this.obj.B1 - 1][2] + this.obj.C1
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a09, this)
    },
    a09: function (str) {
        if (str.indexOf('条记录') != -1) {
            this.d01(str);
        }
        else if (str.indexOf('<title> 我的摘要</title>') != -1) {
            $("#state").html("进入不了【已下架】，比如：店被关了...")
            this.e02();
        }
        else if (str.indexOf('没有找到符合条件的信息。') != -1) {
            $("#state").html("没有找到符合条件的信息。")
            this.e01();
        }
        //else if (str.indexOf('<h3>很抱歉，您本次访问的网页出现问题，无法显示。</h3>') != -1) {
        //    $("#state").html("如果不过，那就是DH的问题。")
        //    //this.a007();
        //}
        //else if (str == '{status:0}') {
        //    alert("aaaaaaaaaaaaaaa")
        //    //Tool.Time(this.a007, 300, this, "1");
        //}
        //else if (str.indexOf('没有找到符合条件的信息。') != -1) {
        //    this.a14();
        //}
        else {
            Tool.at("出错001：\n" + str);
        }
    },
    ////////////////////////////////////////////////

    b01: function (mode) {
        let str = ""
        switch (mode) {
            case "0": str = "状态"; break;
            case "1": str = "丢失的编码进行删除"; break;
            case "2": str = "丢失的编码进行修复"; break;
            default: str = "未知：" + mode;
        }
        return str
    },
    //////////////////////////////////////////////////////////////////////////////////////////
    d01: function (str) {
        if (this.obj.C2 == 0) {
            let rcount = Tool.Trim(Tool.StrSlice(str, '				共有', '条记录'));
            this.obj.C2 = Math.ceil(parseInt(rcount) / 60);
        }
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d02, this, this.e01, str)
    },
    d02: function (str) {
        let itemCodes = Tool.StrSplits(str, '<span class="lsWrapOne">产品编号：', "</span>");
        if (this.obj.Barr[this.obj.B1 - 1][0] == 3) {//审核后本地状态：3.审核不通过
            let showDetailInfoArr = Tool.StrSplits(str, '<td  class="auditThFive">', "</td>");
            if (itemCodes.length == showDetailInfoArr.length) {
                this.d03(itemCodes, showDetailInfoArr)
            }
            else {
                Tool.at("DH已改版。。。")
            }
        }
        else {
            //为什么要填俩个【itemCodes】？答：只是为了不出错，所以这么写。
            this.d03(itemCodes, itemCodes)
        }

    },
    d03: function (itemCodes, showDetailInfoArr) {
        let Carr = [], isInfringement;
        for (let i = 0; i < itemCodes.length; i++) {
            if (showDetailInfoArr[i].indexOf("此产品为侵权产品") != -1) {
                isInfringement = true;
            }
            else {
                isInfringement = false;
            }
            Carr.push({
                itemCode: itemCodes[i],
                isInfringement: isInfringement,
                err: Tool.StrSplits(showDetailInfoArr[i], '<li>', "</li>")[0]
            })
        }
        this.d04(Carr);
    },
    d04: function (Carr) {
        $("#state").html("正在更新本地数据。。。");
        switch (obj.arr[7])//对应已上传商品的[状态、丢失的编码进行删除、丢失的编码进行修复]
        {
            case "0": this.d05(Carr); break;//0：状态；
            //case "1": this.d01(); break;//1：丢失的编码进行删除；
            //case "2": this.e01(); break;// 2：丢失的编码进行修复；
            default: $("#state").html("出错异常arr[7]:" + obj.arr[7]); break;
        }
    },
    d05: function (Carr) {
        let sqlArr = [], status = this.obj.Barr[this.obj.B1 - 1][0]
        for (let i = 0; i < Carr.length; i++) {
            let arr = ['@.status=' + status]
            if (status == 3) {//审核后本地状态：3.审核不通过-----如果是【审核不通过】，就修改多修改几个地方
                arr.push('@.AfterReview=1')//审核后本地状态：3.审核不通过
                arr.push('@.err=' + Tool.rpsql(Carr[i].err))//【审核不通过】原因
                if (Carr[i].isInfringement) {//是否为“侵权产品”
                    arr.push('@.AfterReview=2')//审核后本地状态：4.侵权产品
                }
            }
            sqlArr.push('update @.proupdhgate set ' + arr.join(",") + ',@.upUserID=' + this.obj.fromid + ' where  @.fromid=' + Carr[i].itemCode)
        }
        let str = '"ok"<r: db="sqlite.dhgate">' + sqlArr.join('<1/>') + '</r:>'
        Tool.ajax.a01(str, 1, this.d06, this);
    },
    d06: function (t) {
        if (t == "ok") {
            this.obj.C1++;
            this.a08();
        }
        else { Tool.at("出错。" + t); }
    },
    ////////////////////////////////////////////////////
    e01: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        $("#C1").css("width", "0%");
        $("#C1,#C2").html("")
        this.a07();
    },
    e02: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.C1 = 1; this.obj.C2 = 0;
        this.obj.fromid = 0;
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("");
        this.a03();
    },
    e03: function () {
        gg.highlightTab(1, this.e04, this)
    },
    e04: function () {
        Tool.url(Tool.unescape(obj.arr[4]))
    },
}
fun.a01();







//b05: function () {
//    let time = Tool.userDate13(new Date(), "-")
//    let insert = "insert into @.shopanalysis(@.fromid,@.name,@.time,@.DelVolume,@.uptime)values(" + this.obj.fromid + ",'" + this.obj.username + "','" + time + "'," + this.obj.Carr.length + "," + Tool.gettime("") + ")"
//    let update = "update @.shopanalysis set @.uptime=" + Tool.gettime("") + ",@.DelVolume=@.DelVolume+" + this.obj.Carr.length + " where @.fromid=" + this.obj.fromid + " and @.time=" + Tool.gettime("")
//    let isinsert = "select count(1) from @.shopanalysis where @.fromid=" + this.obj.fromid + " and @.time=" + Tool.gettime("")
//    return '""<if Fun(Db(sqlite.dhgate,' + isinsert + ',count))==0><r: db="sqlite.dhgate">' + insert + '</r:><else/><r: db="sqlite.dhgate">' + update + '</r:></if/>';
//},
//d01: function () {
//    let html = '[0<r:proupdhgate db="sqlite.dhgate" size=60 where=" where @.fromid in(' + this.obj.Carr.join(",") + ')">,<:fromid/></r:proupdhgate>]'
//    $("#state").html("正在检查本地商品是否存在。。。");
//    Tool.ajax.a01(html, 1, this.d02, this)
//},
//d02: function (arr) {
//    if (arr.length - 1 == this.obj.Carr.length) {
//        $("#state").html("本地都有，可以下一页。。。");
//        this.a16("");
//    }
//    else {
//        let arr2 = this.obj.Carr, bool, arr3 = []
//        for (let i = 0; i < arr2.length; i++) {
//            bool = true;
//            for (let j = 1; j < arr.length; j++) {
//                if (arr2[i] == arr[j]) { bool = false; break; }
//            }
//            if (bool) { arr3.push(arr2[i]); }
//        }
//        $("#state").html("本地商品有不存在的【" + arr3.join(" , ") + "】。。。");
//        this.d03(arr3)
//    }
//},
//d03: function (arr) {
//    let url = "http://seller.dhgate.com/prodmanage/downshelf/prodDownShelf.do?dhpath=10001,21001,0202&csrftoken=" + this.obj.csrftoken + "&downShelfForm.dispatcheOperation=batchDelete&downShelfForm.itemcodeChecked=" + arr.join("&downShelfForm.itemcodeChecked=")
//    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
//    $("#state").html("正在【删除】。。。");
//    gg.getFetch(url,"json", this.d04, this)
//},
//d04: function (str) {
//    if (str.indexOf('value="您选择的产品已经删除" id="operationTip"') != -1) {
//        this.d05();
//    }
//    else if (str.indexOf('<h3>很抱歉，您本次访问的网页出现问题，无法显示。</h3>') != -1) {
//        alert("wwwwwwww")
//        //this.c01()
//    }
//    else { alert("002"); Tool.at(str) }
//},
//d05: function () {
//    //删除后不能下一页
//    this.obj.Carr = [];
//    this.obj.csrftoken = ""
//    this.a09();
//},
//e01: function () {
//    let html = '[0<r:proupdhgate db="sqlite.dhgate" size=60 where=" where @.fromid in(' + this.obj.Carr.join(",") + ')">,<:fromid/></r:proupdhgate>]'
//    $("#state").html("正在检查本地商品是否存在。。。");
//    Tool.ajax.a01(html, 1, this.e02, this)
//},
//e02: function (arr) {
//    if (arr.length - 1 == this.obj.Carr.length) {
//        $("#state").html("本地都有，可以下一页。。。");
//        this.a16("");
//    }
//    else {
//        let arr2 = this.obj.Carr, bool, arr3 = []
//        for (let i = 0; i < arr2.length; i++) {
//            bool = true;
//            for (let j = 1; j < arr.length; j++) {
//                if (arr2[i] == arr[j]) { bool = false; break; }
//            }
//            if (bool) { arr3.push(arr2[i]); }
//        }
//        $("#state").html("本地商品有不存在的【" + arr3.join(" , ") + "】。。。");
//        this.obj.Darr = arr3;
//        this.obj.D2 = arr3.length;
//        this.e03()
//    }
//},
//e03: function () {
//    Tool.x1x2("D", this.obj.D1, this.obj.D2, this.e04, this, this.e07)
//},
//e04: function () {
//    let url = "https://seller.dhgate.com/syi/skuEdit.do?pid=" + this.obj.Darr[this.obj.D1 - 1] + "&isblank=true&_=" + Tool.gettime("")
//    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
//    $("#state").html("正在找商品编码。。。");
//    gg.getFetch(url,"json", this.e05, this)
//},
//e05: function (t) {
//    let proid = Tool.StrSlice(t, ",\"skuCode\":\"", "\"");
//    if (proid == "") { proid = "_" + this.obj.Darr[this.obj.D1 - 1] }//因为proid不能重复，所以有了这一个
//    else { proid = proid.split("-")[0]; }
//    /////////////////////////////////////////////////////////////
//    let isinsert = "select count(1) from @.proupdhgate where @.proid='" + proid + "'"
//    let sql1 = '<r: db="sqlite.aliexpress">insert into @.proupdhgate(@.upuserid,@.upuser,@.fromid,@.proid)values(' + this.obj.fromid + ',\'' + this.obj.username + '\',' + this.obj.Darr[this.obj.D1 - 1] + ',\'' + proid + '\')</r:>';
//    let sql2 = '<r: db="sqlite.aliexpress">insert into @.proupdhgate(@.upuserid,@.upuser,@.fromid,@.proid)values(' + this.obj.fromid + ',\'' + this.obj.username + '\',' + this.obj.Darr[this.obj.D1 - 1] + ',\'_' + proid + '\')</r:>';
//    let str = '<if Fun(Db(sqlite.aliexpress,' + isinsert + ',count))==0>' + sql1 + '<else/>' + sql2 + '</if>'
//    Tool.ajax.a01(str, 1, this.e06, this)
//},
//e06: function (t) {
//    if (t == "") {
//        this.obj.D1++;
//        this.e03();
//    }
//    else {
//        Tool.at("出错：" + t)
//    }
//},
//e07: function () {
//    this.obj.D1 = 1;
//    this.obj.D2 = 0;
//    this.obj.Darr = [];
//    $("#D1").css("width", "0%");
//    $("#D1,#D2").html("")
//    $("#state").html("可以下一页。。。");
//    this.a16("");
//},