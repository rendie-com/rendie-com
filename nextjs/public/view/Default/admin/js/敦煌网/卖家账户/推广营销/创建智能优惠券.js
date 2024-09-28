'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        nowDate: 0, endDate: 0,
        fromid: 0, time7: 0
    },
    a01: function () {
        let html = Tool.header('正在【创建智能优惠券】...') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
                <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let str = Tool.DH_seller(" where @.total&gt;0 and @.time7<=" + (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 7), "username,password,fromid,time7,cookies", this.obj.A2);
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        let isbool = false, newTime = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1;//因为每个活动都是从00:0:00到23:59:59
        this.obj.nowDate = oo.time7 == 0 ? newTime : oo.time7;
        ////////////////////////////
        if (this.obj.nowDate < newTime) { this.obj.nowDate = newTime; isbool = true; }
        else if (this.obj.nowDate <= newTime + 60 * 60 * 24 * 7)//7天
        { isbool = true; }
        else {
            alert("还没到做活动的时后。")
        }
        if (isbool) {
            this.a06(oo);
        }
    },
    a06: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a07, this);
    },
    a07: function () {
        this.obj.endDate = this.obj.nowDate + 60 * 60 * 24 * 7 - 1;//7天
        $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。");
        let params = [
            {
                "name": "aiCouponId",
                "value": ""
            },
            {
                "name": "amoId",
                "value": ""
            },
            {
                "name": "name",
                "value": "智能优惠券-" + Tool.userDate13(this.obj.nowDate * 1000, "-").substr(5) + " 至 " + Tool.userDate13(this.obj.endDate * 1000, "-").substr(5)
            },
            {
                "name": "startDate",
                "value": Tool.userDate13(this.obj.nowDate * 1000, "-")
            },
            {
                "name": "modifyStarHour",
                "value": ""
            },
            {
                "name": "startHour",
                "value": Tool.userTime13(this.obj.nowDate * 1000, "-")
            },
            {
                "name": "modifyEndHour",
                "value": ""
            },
            {
                "name": "endDate",
                "value": Tool.userDate13(this.obj.endDate * 1000, "-")
            },
            {
                "name": "endHour",
                "value": Tool.userTime13(this.obj.endDate * 1000, "-")
            },
            {
                "name": "budget",
                "value": "10"
            },
            {
                "name": "amoInfo0",
                "value": "10,500,10"
            },
            {
                "name": "amoInfo1",
                "value": ""
            },
            {
                "name": "amoInfo2",
                "value": ""
            },
            {
                "name": "amoInfo3",
                "value": ""
            },
            {
                "name": "amoInfo4",
                "value": ""
            }
        ], url = "https://seller.dhgate.com/promoweb/aicoupon/save.do"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在创建活动。。。");
        gg.postFetch(url, Tool.postData(params), this.a08, this)
    },
    a08: function (t) {
        if (t.indexOf('<span class="s">AiCoupon创建成功。</span>') != -1) {
            $("#state").html("创建成功。。。");
            this.a09()
        }
        else if (t.indexOf('<p>当前时间已存在活动！</p>') != -1) {
            $("#state").html("当前时间已存在活动。。。");
            alert("在时间上应该不会出现了")
            //this.a09()
        }
        else {
            $("#state").html("活动创建【失败】");
            Tool.at(t)
        }
    },
    a09: function () {
        let txt = '""<r: db="sqlite.dhgate">update @.seller set @.time7=' + (this.obj.endDate + 1) + ' where @.fromid=' + this.obj.fromid + '</r:>'
        Tool.ajax.a01(txt, 1, this.a10, this)

    },
    a10: function () {
        this.obj.A1++;
        this.obj.fromid = 0
        this.obj.nowDate = 0
        this.obj.endDate = 0
        this.a03();
    }
}
fun.a01();