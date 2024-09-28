'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    a01: function () {
        let html = Tool.header("正在全店铺打折_停止活动...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">停止进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
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
        let str = Tool.DH_seller("", "username,password,fromid", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01( str, this.obj.A1,this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        $("#state").html("正在登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        $("#state").html("正在打开【全店铺打折】这个页面。。。");
        gg.getFetch("https://seller.dhgate.com/promoweb/storediscount/storeDisActyList.do?ptype=1&dhpath=10004,3005","text", this.a07, this)
    },
    a07: function (str) {
        if (typeof (str) == "string") {
            let urlArr = Tool.StrSplits(str, '<a class="j-ac-stop" data-href="/', '"');
            if (urlArr.length >= 8) {
                Tool.at("要停止的活动可能大于8个，我没开发。")
            }
            else {
                this.obj.B2 = urlArr.length;
                this.obj.Barr = urlArr;
                this.a08()
            }
        }
        else {
            Tool.pre(["没获得网页内容，程序停止", str])
        }
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a11);
    },
    a09: function () {
        let url = "https://seller.dhgate.com/" + this.obj.Barr[this.obj.B1 - 1]
        $("#state").html("正在打开【" + url + "】");
        gg.getFetch(url,"json", this.a10, this)
    },
    a10: function (t) {
        if (t.indexOf(this.obj.Barr[this.obj.B1 - 1]) == -1)//找不到之前的URL，就说明停止成功了
        {
            this.obj.B1++;
            this.a08();
        }
        else {
            Tool.at("停止活动出错：\n" + t);
        }
    },
    a11: function () {
        $("#state").html("正在【更新活动时间】。。。");
        let txt = '<r: db="sqlite.dhgate">update @.seller set @.time3=0 where @.fromid=' + this.obj.fromid + '</r:>'
       Tool.ajax.a01( txt,1,this.a12,this)
    },
    a12: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.obj.username = "";
            this.obj.password = "";
            this.obj.fromid = 0;
            this.obj.B1 = 1;
            this.obj.B2 = 0;
            this.obj.Barr = [];
            $("#B1").css("width", "0%");
            $("#B1,#B2").html("");
            this.a03();
        }
        else {
            Tool.at("更新活动时间出错：" + t)
        }
    }
}
fun.a01();