'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        nowDate: 0, endDate: 0, fromid:0
    },
    a01: function () {
        let html = Tool.header('正在做活动【创建全店铺满立减】...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
            <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
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
        let str = Tool.DH_seller(" where @.total&gt;0 and @.time4<" + (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 7), "username,password,fromid,time4,cookies", this.obj.A2);
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        let isbool = false, newTime = Tool.gettime(Tool.userDate13(Date.now()));
        this.obj.nowDate = oo.time4 == 0 ? newTime : Tool.gettime(Tool.userDate13(oo.time4 * 1000))
        if (this.obj.nowDate < newTime) {
            this.obj.nowDate = newTime;
            isbool = true;
        }
        else if (this.obj.nowDate < newTime + 60 * 60 * 24 * 7)//7天
        { isbool = true; }
        else {
            $("#state").html("还没到做活动的时后【" + Tool.js_date_time2(this.obj.nowDate) + "】。");

        }
        if (isbool) {
            this.obj.endDate = this.obj.nowDate - 1 + 60 * 60 * 24 * 10;//10天
            this.a06(oo);
        }
    },
    a06: function (oo) {
        $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
        //主要解决活动时长不够的问题（因为活动是按月做的）
        let timeA = Tool.userDate13(this.obj.nowDate * 1000).substr(0, 7)
        let timeB = Tool.userDate13(this.obj.endDate * 1000).substr(0, 7)
        $("#state").html("时间【" + timeA + "】--【" + timeB + "】");
        if (timeA == timeB) {
            this.a07(oo);
        }
        else {
            this.obj.endDate = this.obj.endDate - 60 * 60 * 24;//减1天
            this.a06(oo);
        }
    },
    a07: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a08, this);
    },
    a08: function () {
        let oo = [
            {
                "name": "promoFullReductionDto.name",
                "value": "全店铺满立减：" + Tool.userDate13(this.obj.nowDate * 1000, "-").substr(5) + " 至 " + Tool.userDate13(this.obj.endDate * 1000, "-").substr(5)
            },
            {
                "name": "promoFullReductionDto.startDate",
                "value": Tool.userDate13(1000 * this.obj.nowDate, "-")
            },
            {
                "name": "startDate",
                "value": Tool.js_date_time2(this.obj.nowDate, "-")
            },
            {
                "name": "promoFullReductionDto.endDate",
                "value": Tool.userDate13(1000 * this.obj.endDate, "-")
            },
            {
                "name": "endDate",
                "value": Tool.js_date_time2(this.obj.endDate, "-")
            },
            {
                "name": "promoFullReductionDto.full",
                "value": "100"
            },
            {
                "name": "promoFullReductionDto.reduction",
                "value": "10"
            },
            {
                "name": "accumulate",
                "value": "on"
            }
        ], url = "https://seller.dhgate.com/promoweb/fullreduceacty/saveActy.do"
        $("#state").html("正在【创建全店铺满立减】。。。");
        gg.postFetch(url, Tool.postData(oo), this.a09, this)
    },
    a09: function (t) {
        if (t.indexOf("创建的全店铺活动同一时间段内只能创建一个，请修改活动时间") != -1) {
            $("#state").html("创建的全店铺活动同一时间段内只能创建一个，请修改活动时间")
            this.a10();//就是不给创建。找不到原因--可能是被处罚
        }
        else if (t.indexOf("店铺促销扣减促销个数和时长-当月扣减失败") != -1) {
            $("#state").html("店铺促销扣减促销个数和时长-当月扣减失败")
            this.a10();
        }
        else if (t.indexOf("全店铺满立减活动创建成功。</span>") != -1) {
            this.a10();
        }
        else {
            Tool.at("出错001：\n" + t);
        }
    },
    a10: function () {
        $("#state").html("正在【更新活动时间】。。。");
        let txt = '""<r: db="sqlite.dhgate">update @.seller set @.time4=' + (this.obj.endDate + 1) + ' where @.fromid=' + this.obj.fromid + '</r:>'
        Tool.ajax.a01(txt, 1, this.a11, this)
    },
    a11: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.a03();
            this.obj.fromid = 0
            this.obj.nowDate = 0
            this.obj.endDate = 0
        } else { Tool.at("出错：" + t) }
    }
}
fun.a01();