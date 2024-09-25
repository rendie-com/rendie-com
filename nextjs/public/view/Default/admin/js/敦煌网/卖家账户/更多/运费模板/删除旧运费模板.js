'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        isB1: true,//B1能否加1
        username: "", password: "", fromid: 0,
        where: ""
    },
    a01: function () {
        let html = Tool.header("删除旧标准运费模板...") + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">模板页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">地址：</td><td id="url" colspan="2"></td></tr>\
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
        Tool.getDHuser(this.a04, this);//获得账号等信息
    },
    a04: function () {
        $("#username").html(this.obj.username);
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        let url = "http://seller.dhgate.com/frttemplate/pageload.do?page=" + this.obj.B1 + "&dhpath=10001,79,7902"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在运费模板列表页。。。");
        gg.getFetch(url,"json", this.a07, this)
    },
    a07: function (t) {
        let count = parseInt(Tool.StrSlice(t, '<span>共有', '条记录'));
        let size = parseInt(Tool.StrSlice(t, '每页显示', '条'));
        this.obj.B2 = Math.ceil(count / size);
        /////////////////////////////////////////////////////////////		
        let nArr = [], arr1 = [], arr2 = Tool.StrSplits(t, 'onclick="delShippingModel(\'', '\')">删除');
        for (let i = 0; i < arr2.length; i++) {
            arr1 = arr2[i].split("', '")
            if (arr1[1].length == 5)//5位是最新的模板，不删除。
            {

            }
            else { nArr.push(arr1); }
        }
        this.obj.Barr = nArr;
        this.a08();
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a12);
    },
    a09: function () {
        if (this.obj.Barr[0]) {
            let url = "http://seller.dhgate.com/frttemplate/checkdelete.do?shippingmodelid=" + this.obj.Barr[0][0] + "&_=" + Date.now()
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("是否可以删除：" + this.obj.Barr[0][1]);
            gg.getFetch(url,"json", this.a10, this)
        }
        else {
            if (this.obj.isB1 == true) { this.obj.B1++; }
            else { this.obj.isB1 = true; }//这次不加1，下次加1。
            this.a06()
        }
    },
    a10: function (oo) {
        if (oo.flag == 1)//可以删除
        {
            $("#state").html("正在删除模板名称为：" + this.obj.Barr[0][1]);
            let url = "http://seller.dhgate.com/frttemplate/delete.do?shippingmodelid=" + this.obj.Barr[0][0] + "&myhp=0"
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            gg.getFetch(url,"json", this.a11, this)
        }
        else if (oo.flag == 0)//不能删除
        {
            this.obj.Barr.shift();
            this.a09();
        }
        else { Tool.pre(["出错：", oo]) }
    },
    a11: function (oo) {
        this.obj.isB1 = false;//能删除就在这个页面再打开一次
        this.obj.Barr.shift();
        this.a09();
    },
    a12: function () {
        this.obj.isB1 = true;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        $("#state").html("正在准备下一个账号...");
        this.obj.username = ""
        this.obj.password = ""
        this.obj.fromid = 0
        this.obj.A1++;
        this.a03();
    }
}
fun.a01();