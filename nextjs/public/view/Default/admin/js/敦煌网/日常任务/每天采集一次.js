'use strict';
var fun =
{
    obj:
    {
        A1: 0, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    a01: function () {
        this.obj.A1 = obj.arr[5] ? Tool.int(obj.arr[5]) : 1;//账号进度
        let html = Tool.header('正在执行【每天采集一次】任务。。。') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right w150">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">任务项目：</td><td id="taskName" colspan="2"></td></tr>\
            <tr><td class="right">任务进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">任务说明：</td><td id="taskDes" colspan="2"></td></tr>\
            <tr><td class="right">C进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
            <tr><td class="right">D进度：</td>'+ Tool.htmlProgress('D') + '</tr>\
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
        let str = Tool.DH_seller("", "username,password,cookies,fromid", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        this.obj.cookies = oo.cookies;
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        this.obj.Barr = [
            ["采集订单", "F2"],
            ["请款", "F8"],
            ["更新店铺状态", "F4"],
            ["发货"],
            //["催款", "F6"],
            //["更新【审核不通过原因】", "F5"],
            ["采集店铺统计信息", "F10"],
            ["采集站内信", "F3"]
        ];
        this.obj.B1 = 1;
        this.obj.B2 = this.obj.Barr.length;
        this.a06();
    },
    a06: function () {
        $("#state").html("正在确认登陆。。。");
        let oo = this.obj;
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a07, this)
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a11)
    },
    a09: function () {
        let arr = this.obj.Barr[this.obj.B1 - 1];
        $("#taskName").html(this.b01())
        $("#state").html("正在准备去【" + arr[0] + "】。。。");
        if (arr[1] == "F2") { F2.a01(this.a10, this); }
        else if (arr[1] == "F3") { F3.a01(this.a10, this); }
        else if (arr[1] == "F4") { F4.a01(this.a10, this); }
        else if (arr[1] == "F5") { F5.a01(this.a10, this); }
        else if (arr[1] == "F6") { F6.a01(this.a10, this); }
        else if (arr[0] == "发货") { Tool.OrderDelivery.a01(this.obj.username, this.a10, this); }
        else if (arr[1] == "F8") { F8.a01(this.a10, this); }
        else if (arr[1] == "F9") { F9.a01(this.a10, this); }
        else if (arr[1] == "F10") { F10.a01(this.a10, this); }
        else {
            alert("未知操作类型：" + arr[1]);
        }
    },
    a10: function () {
        this.obj.B1++;
        this.a07();
    },
    a11: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        this.obj.username = ""
        this.obj.password = ""
        this.obj.fromid = 0;
        $("#B1,#C1").css("width", "0%");
        $("#B1,#B2,#C1,#C2").html("");
        $("#state").html("正在准备下一个账号...");
        Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/" + this.obj.A1)
    },
    a12: function () {
        Tool.showMsgNotification("每天采集一次", "全部完成");
    },
    b01: function () {
        let arr = this.obj.Barr, newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == this.obj.B1 - 1) {
                newArr.push('<b><font color="red">（' + (i + 1) + '）' + arr[i][0] + '</font></b>');
            }
            else {
                newArr.push('（' + (i + 1) + '）' + arr[i][0]);
            }
        }
        return newArr.join(' <i class="fa fa-long-arrow-right"></i> ');
    }
}
fun.a01();