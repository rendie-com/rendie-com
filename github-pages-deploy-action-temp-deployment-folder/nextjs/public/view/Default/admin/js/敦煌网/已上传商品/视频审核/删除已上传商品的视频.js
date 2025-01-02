'use strict';
var fun =
{
    obj:
    {
        A1: 0, A2: 0,
        B1: 1, B2: 0,
        C1: 1, C2: 0, Carr: []
    },
    a01: function () {
        this.obj.A1 = obj.arr[5] ? Tool.int(obj.arr[5]) : 1;//账号进度
        let html = Tool.header("正在【删除已上传商品的视频】...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">删除页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">删除条进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let str = Tool.DH_seller("", "username,password,fromid,note", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01( str, this.obj.A1,this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        $("#state").html("正在登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        $("#state").html("正在打开【商品主图视频】这个页面。。。");
        let data = [
            {
                "name": "video_approval_status",
                "value": ""
            },
            {
                "name": "video_name",
                "value": ""
            },
            {
                "name": "pageNo",
                "value": "1"
            },
            {
                "name": "pageSize",
                "value": "20"
            }
        ], url = "https://seller.dhgate.com/merchant/video_list_new.do";
        gg.postFetch(url, Tool.postData(data), this.a07, this)
    },
    a07: function (data) {
        this.obj.B2 = data.data.pageCount;
        let arr = data.data.data, videoIdArr = [];
        for (let i = 0; i < arr.length; i++) {
            videoIdArr.push(arr[i].videoId)
        }
        this.obj.C2 = videoIdArr.length;
        this.obj.Carr = videoIdArr
        this.a08();
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a13)
    },
    a09: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a10, this, this.a12)
    },
    a10: function () {
        let data = [
            {
                "name": "modify",
                "value": "disable_video"
            },
            {
                "name": "videoId",
                "value": this.obj.Carr[this.obj.C1 - 1]
            }
        ], url = "https://seller.dhgate.com/merchant/del_video_status.do";
        $("#state").html("正在删除。。。");
        gg.postFetch(url, Tool.postData(data), this.a11, this);
    },
    a11: function (oo) {
        if (typeof (oo) == "object") {
            if (oo.msg == "删除成功") {
                this.obj.C1++;
                this.a09();
            }
            else if (oo.status == "201") {
                location.reload();
            }
            else {
                Tool.pre(["删除出错001", oo])
            }
        }
        else if (typeof (oo) == "string") {
            if (oo.indexOf("很抱歉，您本次访问的网页出现问题，无法显示") != -1) {
                location.reload();
            }
        }
        else {
            Tool.pre("-----------"+typeof (oo));
           
        }
    },
    a12: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        this.obj.Carr = [];
        $("#C1").css("width", "0%");
        $("#C1,#C2").html("")
        $("#state").html("准备下一页...");
        this.a06();
    },
    a13: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("")
        $("#state").html("准备下一个账号...");
        Tool.main(obj.arr[3] + "/" + obj.arr[4] + "/" + this.obj.A1);
    },

}
fun.a01();