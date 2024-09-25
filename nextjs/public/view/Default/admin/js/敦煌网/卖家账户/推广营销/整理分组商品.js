'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: [],
        C1: 1, C2: 0
    },
    a01: function () {
        let html = Tool.header('正在整理分组商品...') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
                <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
                <tr><td class="right w150">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">分组进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
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
        let str = Tool.DH_seller(" where @.total&gt;0", "username,password,fromid", this.obj.A2);
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
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        $("#state").html("已登陆账号，正在打开分组页面。。。")
        let url = "http://seller.dhgate.com/promoweb/groupManage/groupList.do?dhpath=10004,30,3006"
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.a07, this)
    },
    a07: function (str) {
        if (str.indexOf(">other</td>") != -1) {
            $("#state").html("先把所有商品移动到other组中？答：本来other组就没数据，先把所有移过去，再分别移到重各各组，这时，如果other还有数据，说明有问题。。。")
            let Barr = [], groupArr = Tool.StrSplits(str, 'groupid="', '</td>');
            for (let i = 0; i < groupArr.length - 1; i++) {
                let DHarr = groupArr[i].split('">');
                Barr.push([DHarr[1].split("%")[0], DHarr[0]]);
            }
            this.obj.B2 = Barr.length;
            this.obj.Barr = Barr
            this.a08();

        }
        else {
            $("#state").html("内容不对01。。。");
        }
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a16);
    },
    a09: function () {
        //90%off 即1折,例如原价为100元,折扣后为10元
        //80%off 即2折,例如原价为100元,折扣后为20元
        //70%off 即2折,例如原价为100元,折扣后为30元
        //......
        //30%off 即7折,例如原价为100元,折扣后为70元
        //20%off 即8折,例如原价为100元,折扣后为80元
        //10%off 即9折,例如原价为100元,折扣后为90元
        //价格倍数=1.5/(1-x*0.01)       需要50%利润，还要"x"OFF，需要价格的多少倍？
        let ratio = (1.5 / (1 - this.obj.Barr[this.obj.B1 - 1][0] * 0.01)).toFixed(5);
        let str = '[' + (this.obj.C2 == 0 ? '<@page/>' : 0) + '\
        <r:proupdhgate size=60 db="sqlite.dhgate" page=2 where=" where @.upuserid=' + this.obj.fromid + ' and @.ratio=' + ratio + '">,<:fromID/></r:proupdhgate>]'
        $("#state").html("正在获取敦煌商品。。。");
        Tool.ajax.a01( str, this.obj.C1,this.a10, this);
    },
    a10: function (arr) {
        if (this.obj.C2 == 0) this.obj.C2 = arr[0];
        arr.shift();
        this.a11(arr);
    },
    a11: function (arr) {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a12, this, this.a15, arr);
    },
    a12: function (arr) {
        let url = "http://seller.dhgate.com/promoweb/groupManage/changeprod.do?groupId=" + this.obj.Barr[this.obj.B1 - 1][1] + "&remove=no&additemcode=" + decodeURIComponent(arr.join(","))
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html('正在把商品加入分组。。。')
        gg.getFetch(url,"json", this.a13, this)
    },
    a13: function (str) {
        if (str.indexOf("组内管理") != -1) {
            this.a14();
        }
        else if (str.indexOf("非常抱歉") != -1) {
            $("#state").html("全店铺折扣活动待展示或进行中状态时不能操作“促销分组”哦！");
            //this.a14();
        }
        else {
            $("#state").html("内容不对:" + str);
        }
    },
    a14: function () {
        this.obj.C1++;
        this.a09();
    },
    a15: function () {
        this.obj.B1++;
        this.obj.C1 = 1;
        this.obj.C2 = 0;
        $("#C1").css("width", "0%");
        $("#C1,#C2").html('')
        this.a08();
    },
    a16: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html('')
        this.a03();
    }
}
fun.a01();
