'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 4,
        Barr: [
            "http://seller.dhgate.com/promoweb/coupon/addcamp.do?type=7&dhpath=10004,30,3005",//领取型
            "http://seller.dhgate.com/promoweb/coupon/addcamp.do?type=2&dhpath=10004,30,3005",//买够送
            "http://seller.dhgate.com/promoweb/coupon/addcamp.do?type=31&dhpath=10004,30,3005",//收藏送
            "http://seller.dhgate.com/promoweb/coupon/addcamp.do?type=5&dhpath=10004,30,3005"//
        ],
        nowDate: "", endDate: "",
        username: "", password: "", fromid: 0, time5: 0
    },
    a01: function () {
        let html = Tool.header('正在做活动【创建店铺优惠券】...') + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
                <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">POST请求地址：</td><td id="url" colspan="2"></td></tr>\
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
        let str = Tool.DH_seller(" where @.total&gt;0 and @.time5<" + (Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 7), "username,password,fromid,time5", this.obj.A2);
        Tool.ajax.a01(str, 1, this.a04, this, 1)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        this.obj.fromid = oo.fromid;
        this.obj.time5 = oo.time5;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function () {
        if (this.b01())//是否在7天以内做活动，且修复活动开始时间
        {
            this.obj.endDate = this.obj.nowDate + 60 * 60 * 24 * 3 - 1;
            $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
            this.a06();
        }
    },
    a06: function () {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(this.a07, this);
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a000014);
    },
    a08: function () {
        $("#state").html("正在打开：添加优惠券页面。。。");
        //$("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        //gg.tabs_remove_create_indexOf(2, url, "添加优惠券",true, this.a10, this)
    },
    b01: function ()//是否在7天以内做活动，且修复活动开始时间
    {
        let isbool = false, newTime = Tool.gettime(Tool.userDate13(Date.now())) + 60 * 60 * 24 * 1;//因为每个活动都是从00:0:00到23:59:59
        this.obj.nowDate = this.obj.time5 == 0 ? newTime : this.obj.time5;
        if (this.obj.nowDate < newTime) { this.obj.nowDate = newTime; isbool = true; }
        else if (this.obj.nowDate <= newTime + 60 * 60 * 24 * 7)//7天
        { isbool = true; }
        return isbool;
    }
    //a10: function (t) {
    //    $("#state").html("正在注入JS。。。");
    //    gg.tabs_executeScript_indexOf(2, "", this.b02(), "创建成功",true, this.a12, this)
    //},
    //a12: function (t) {
    //    $("#state").html("添加优惠券-创建成功。");
    //    this.obj.B1++;
    //    this.a08();
    //},
    //a14: function () {
    //    let txt = '""<r: db="sqlite.dhgate">update @.seller set @.time5=' + (this.obj.endDate + 1) + ' where @.fromid=' + this.obj.fromid + '</r:>'
    //    Tool.ajax.a01( txt,1,this.a15, this)
    //},
    //a15: function (t) {
    //    if (t == "") {
    //        this.obj.nowDate = this.obj.endDate + 1;
    //        if (this.b03()) {
    //            this.obj.B1 = 1;
    //            this.obj.endDate = this.obj.nowDate + 60 * 60 * 24 * 3 - 1;
    //            $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
    //            $("#state").html("结束时间，还可以做活动。。。");
    //            this.a08();
    //        }
    //        else { this.a16(); }
    //    } else { alert("出错：" + t) }
    //},
    //a16: function () {
    //    this.obj.A1++;
    //    this.obj.B1 = 1;
    //    this.obj.username = ""
    //    this.obj.password = ""
    //    this.obj.fromid = 0
    //    this.obj.nowDate = 0
    //    this.obj.endDate = 0
    //    this.obj.promoId = 0
    //    this.obj.time5 = 0
    //    $("#B1").css("width", "0%");
    //    $("#B1,#B2").html("");
    //    this.a03();
    //},

    //b02: function () {
    //    let B1 = this.obj.B1, code = "";
    //    if (B1 == 1)//领取型
    //    {
    //        code = '$("#campaignname").val("' + B1 + '.领取型' + Tool.userDate13(1000 * this.obj.nowDate) + '");\
    //        $("input[name=\'startDate\']").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("input[name=\'endDate\']").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("#createDate").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("#expireDate").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("input[name=\'amount\']").val(2);\
    //        $("input[name=\'amountM\']").val(3);\
    //        $("input[name=\'ccount\']").val(10);\
    //        $("input[name=\'ccountM\']").val(10);\
    //        $("input[name=\'orderAmo\']").val(50);\
    //        $("input[name=\'validday\']").val(7);\
    //        $(".submitForm").click();'
    //    }
    //    else if (B1 == 2)//买够送
    //    {
    //        code = '$("#campaignname").val("' + B1 + '.买够送' + Tool.userDate13(1000 * this.obj.nowDate) + '");\
    //        $("input[name=\'startDate\']").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("input[name=\'endDate\']").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("#createDate").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("#expireDate").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("input[name=\'amount\']").val(1);\
    //        $("input[name=\'getcouponorderAmo\']").val(50);\
    //        $("input[name=\'orderAmo\']").val(50);\
    //        $("input[name=\'validday\']").val(7);\
    //        $(".submitForm").click();'
    //    }
    //    else if (B1 == 3)//收藏送
    //    {
    //        code = '$("#campaignname").val("' + B1 + '.收藏送' + Tool.userDate13(1000 * this.obj.nowDate) + '");\
    //        $("input[name=\'startDate\']").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("input[name=\'endDate\']").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("#createDate").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("#expireDate").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("input[name=\'amount\']").val(1);\
    //        $("input[name=\'orderAmo\']").val(20);\
    //        $("input[name=\'validday\']").val(7);\
    //        $(".submitForm").click();'
    //    }
    //    else if (B1 == 4)//直接送（店铺潜力新客、长期未下单买家 ）
    //    {
    //        code = '$("#campaignname").val("' + B1 + '.直接送' + Tool.userDate13(1000 * this.obj.nowDate) + '");\
    //        $("input[name=\'startDate\']").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("input[name=\'endDate\']").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("#createDate").val("'+ Tool.userDate13(1000 * this.obj.nowDate, "-") + '");\
    //        $("#expireDate").val("'+ Tool.userDate13(1000 * this.obj.endDate, "-") + '");\
    //        $("input[name=\'specialbuyer\'][value=2]").attr(\'checked\',\'true\');\
    //        $("input[name=\'amount\']").val(3);\
    //        $("input[name=\'orderAmo\']").val(30);\
    //        $("input[name=\'validday\']").val(7);\
    //        $(".submitForm").click();'
    //    }
    //    return code;
    //},

}
fun.a01()	