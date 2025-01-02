'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        nowDate: 0, endDate: 0, fromid: 0
    },
    a01: function () {
        let html = Tool.header("正在做活动【创建全店铺打折】(活动一次2天)...") + '\
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
        let str = Tool.DH_seller(" where @.total&gt;0 and @.time3<" + (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 7), "username,password,fromid,time3,cookies", this.obj.A2);
        Tool.ajax.a01(str, 1, this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, null, oo);
    },
    a05: function (oo) {
        let isbool = false, newTime = Tool.gettime(Tool.userDate13(Date.now()));//因为每个活动都是从00:0:00到23:59:59
        this.obj.nowDate = oo.time3 == 0 ? newTime : oo.time3;
        if (this.obj.nowDate < newTime) { this.obj.nowDate = newTime; isbool = true; }
        else if (this.obj.nowDate < newTime + 60 * 60 * 24 * 7)//7天
        { isbool = true; }
        else {
            alert("到不了这里")
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
        this.obj.endDate = this.obj.nowDate - 1 + 60 * 60 * 24 * 2;//2天
        $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。。")
        $("#state").html("做活动之前必须打开这个页面。。。");
        gg.getFetch("https://seller.dhgate.com/promoweb/storediscount/storeDisActyList.do?ptype=1&dhpath=10004,3005","text", this.a08, this)
    },
    a08: function () {
        //主要解决活动时长不够的问题（因为活动是按月做的）
        let timeA = Tool.userDate13(this.obj.nowDate * 1000).substr(0, 7)
        let timeB = Tool.userDate13(this.obj.endDate * 1000).substr(0, 7)
        $("#state").html("时间【" + timeA + "】--【" + timeB + "】");
        $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
        if (timeA == timeB) {
            $("#state").html("正在打开【促销分组】页面。。。");
            gg.getFetch("http://seller.dhgate.com/promoweb/groupManage/groupList.do?dhpath=10004,30,3006","text", this.a09, this)
        }
        else {
            this.obj.endDate = this.obj.endDate - 60 * 60 * 24;//减1天
            this.a08();
        }
    },
    a09: function (str) {
        //90%off 即1折,例如原价为100元,折扣后为10元
        //80%off 即2折,例如原价为100元,折扣后为20元
        //70%off 即2折,例如原价为100元,折扣后为30元
        //......
        //30%off 即7折,例如原价为100元,折扣后为70元
        //20%off 即8折,例如原价为100元,折扣后为80元
        //10%off 即9折,例如原价为100元,折扣后为90元
        let promoGroups = Tool.StrSplits(str, 'groupid="', '</td>'), arr, off
        for (let i = 0; i < promoGroups.length; i++) {
            arr = promoGroups[i].split('">')
            if (arr[1] == "other") {
                off = 9.5;
                promoGroups[i] = { "groupId": arr[0], "discountRate": "" + off }
            }
            else {
                off = (100 - parseInt(arr[1].split("%")[0])) / 10;
                promoGroups[i] = { "groupId": arr[0], "discountRate": "" + off }
            }
        }

        let o1 = {
            "promoDto": {
                name: "全店铺打折：" + Tool.userDate13(this.obj.nowDate * 1000, "-").substr(5) + " 至 " + Tool.userDate13(this.obj.endDate * 1000, "-").substr(5),
                promoPolicy: "1"
            },
            "promoGroupDiscountDtoList": promoGroups
        }, o2 = [
            {
                "name": "allStoreSaveRequestVO",
                "value": JSON.stringify(o1)
            },
            {
                "name": "startDate",
                "value": Tool.js_date_time2(this.obj.nowDate, "-")
            },
            {
                "name": "endDate",
                "value": Tool.js_date_time2(this.obj.endDate, "-")
            }
        ], url = "https://seller.dhgate.com/promoweb/storediscount/preSaveAllStore.do";
        $("#state").html("正在【创建全店铺打折】。。。");
        gg.postFetch(url, Tool.postData(o2), this.a10, this)
    },
    a10: function (oo) {
        if (oo.message == "success") {
            this.a11();
        }
        else {
            Tool.pre(["出错01", t]);
        }
    },
    a11: function () {
        let newTime = Tool.gettime(Tool.userDate13(Date.now()));//因为每个活动都是从00:0:00到23:59:59
        if (this.obj.nowDate < newTime + 60 * 60 * 24 * 7)//7天
        {
            this.obj.nowDate = this.obj.endDate + 1
            this.a07()
        }
        else {
            $("#state").html("正在【更新活动时间】。。。");
            let txt = '""<r: db="sqlite.dhgate">update @.seller set @.time3=' + (this.obj.endDate + 1) + ' where @.fromid=' + this.obj.fromid + '</r:>'
            //因为每个活动都是从00:0:00到23:59:59 ,所以存的是下次的开始时间。
            Tool.ajax.a01(txt, 1, this.a12, this)
        }
    },
    a12: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.obj.fromid = 0
            this.obj.nowDate = 0
            this.obj.endDate = 0
            this.a03();
        } else { alert("出错：" + t) }
    }
}
fun.a01();