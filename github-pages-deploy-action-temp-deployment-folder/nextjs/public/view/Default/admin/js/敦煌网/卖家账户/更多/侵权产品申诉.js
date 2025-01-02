'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,//账号进度
        B1: 1, B2: 0, //商品页进度
        C1: 1, C2: 0,//商品条进度
        fromid: 0//店铺的【fromid】---更新数据库要用
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("正在侵权产品申诉...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">商品条进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
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
        let str = Tool.DH_seller("", "username,password,fromid,cookies", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)//获得账号等信息
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;//店铺的【fromid】---更新数据库要用
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a06, this);
    },
    a06: function () {
        $("#state").html("正在获取【商品列表--审核未通过】...")
        let url = "http://seller.dhgate.com/prodmanage/audit/prodAuditFail.do?dhpath=10001,21001,0202&selectpagesize=60&page=" + this.obj.B1
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a07, this)
    },
    a07: function (str) {
        if (str.indexOf('条记录') != -1) {
            this.d01(str);
        }
        else if (str.indexOf('<title> 我的摘要</title>') != -1) {
            $("#state").html("进入不了【已下架】，比如：店被关了...")
            this.a08()
        }
        else if (str.indexOf('没有找到符合条件的信息。') != -1) {
            $("#state").html("没有找到符合条件的信息。")
            this.a08()
       }
        else {
            Tool.at("出错001：\n" + str);
        }
    },
    a08: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        $("#C1").css("width", "0%");
        $("#C1,#C2").html("")
        this.a03();
    },
    ///////////////////////////////////
    d01: function (str) {
        if (this.obj.B2 == 0) {
            let rcount = Tool.Trim(Tool.StrSlice(str, '				共有', '条记录'));
            this.obj.B2 = Math.ceil(parseInt(rcount) / 60);
        }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d02, this, this.a08, str);
    },
    d02: function (str) {
        let itemCodes = Tool.StrSplits(str, '<span class="lsWrapOne">产品编号：', "</span>");
        let showDetailInfoArr = Tool.StrSplits(str, '<td  class="auditThFive">', "</td>");
        if (itemCodes.length == showDetailInfoArr.length) {
            this.d03(itemCodes, showDetailInfoArr)
        }
        else {
            Tool.at("DH已改版。。。")
        }
    },
    d03: function (itemCodes, showDetailInfoArr) {
        let arr = [];
        for (let i = 0; i < itemCodes.length; i++) {
            //有【此产品为侵权产品】且不包括【待处理】
            if (showDetailInfoArr[i].indexOf("此产品为侵权产品") != -1 && showDetailInfoArr[i].indexOf("待处理") == -1) {
                arr.push(itemCodes[i])
            }
        }
        this.obj.C2 = arr.length;
        this.d04(arr);
    },
    d04: function (arr) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.d05, this, this.d07, arr)
    },
    d05: function (arr) {
        $("#state").html("正在设置成员别名...")
        let oo = [
            {
                "name": "prodAppealForm.itemcode",
                "value": arr[0]
            },
            {
                "name": "prodAppealForm.appealreson",
                "value": "要修改"
            }
        ]
        let url = "https://seller.dhgate.com/prodmanage/appeal/addProductAppeal.do?dhpath=10001,21001,0202"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '[post]</a>');
        gg.postFetch(url, Tool.postData(oo), this.d06, this, arr);
    },
    d06: function (oo, arr) {
        if (oo.status == true) {
            this.obj.C1++;
            arr.shift();
            this.d04(arr);
        }
        else if (oo.message == "您目前本月的申诉机会已用尽，暂时不能提交申诉！") {
            this.a08();
        }
        else {
            Tool.pre(["出错002：", oo])
        }
    },
    d07: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.a06();
    },
}
fun.a01();