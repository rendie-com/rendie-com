'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    a01: function () {
        let html = Tool.header("正在删除促销分组...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">删除进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
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
        let str = Tool.DH_seller("", "username,password,fromid,note", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01( str, this.obj.A1,this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        this.obj.fromid = oo.fromid;
        this.obj.note = oo.note;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        $("#state").html("正在登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        $("#state").html("正在打开【促销分组】这个页面。。。");
        gg.getFetch("https://seller.dhgate.com/promoweb/groupManage/groupList.do?dhpath=10004,30,3006","text", this.a07, this)
    },
    a07: function (str) {
        if (typeof (str) == "string") {
            let groupidArr = Tool.StrSplits(str, 'groupid="', '"');
            this.obj.B2 = groupidArr.length;
            this.obj.Barr = groupidArr;
            this.a08()
        }
        else {
            Tool.pre(["没获得网页内容，程序停止", str])
        }
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a11, "");
    },
    a09: function () {
        let oo = [
            {
                "name": "groupName",
                "value": ""
            },
            {
                "name": "groupId",
                "value": this.obj.Barr[this.obj.B1 - 1]
            }
        ], url = "https://seller.dhgate.com/promoweb/groupManage/delpromogroup.do"
        $("#state").html("正在删除分组。。。");
        gg.postFetch(url, Tool.postData(oo), this.a10, this)
    },
    a10: function (t) {
        if (t.indexOf('<p>全店铺折扣活动待展示或进行中状态时不能操作“促销分组”哦！</p>') != -1) {
            if (this.obj.note.indexOf('[删除促销分组失败]') != -1) {
                this.a11('');
            }
            else {
                let note = '[删除促销分组失败]' + this.obj.note
                $("#state").html("正在【更新活动时间】。。。");
                let txt = '<r: db="sqlite.dhgate">update @.seller set @.note=' + Tool.rpsql(note) + ' where @.fromid=' + this.obj.fromid + '</r:>'
               Tool.ajax.a01( txt,1,this.a11,this)
            }
        }
        else {
            this.obj.B1++;
            this.a08();
        }
    },
    a11: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.obj.username = "";
            this.obj.password = "";
            this.obj.fromid = "";
            this.obj.note = "";
            this.obj.B1 = 1;
            this.obj.B2 = 0;
            this.obj.Barr = [];
            $("#B1").css("width", "0%");
            $("#B1,#B2").html("");
            this.a03();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    }
}
fun.a01();