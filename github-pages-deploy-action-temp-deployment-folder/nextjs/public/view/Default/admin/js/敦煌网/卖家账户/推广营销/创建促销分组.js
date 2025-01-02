'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    a01: function () {
        let html = Tool.header("正在创建促销分组...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">分组进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
          </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let str = Tool.DH_seller("", "username,password", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01( str, this.obj.A1,this.a04, this)
    },
    a04: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.username = oo.username;
        this.obj.password = oo.password;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
    },
    a05: function (t) {
        $("#state").html("正在登陆。。。");
        Tool.verifyUser.a01(this.a06, this);
    },
    a06: function () {
        //90%off 即1折,例如原价为100元,折扣后为10元
        //80%off 即2折,例如原价为100元,折扣后为20元
        //70%off 即2折,例如原价为100元,折扣后为30元
        //......
        //30%off 即7折,例如原价为100元,折扣后为70元
        //20%off 即8折,例如原价为100元,折扣后为80元
        //10%off 即9折,例如原价为100元,折扣后为90元
        //为什么size=26？答：敦煌只能创建19个分组，且折扣值0.1-9.5之间（0.1折 即99% OFF）（9.5折 即5% OFF），所以【0%off】到【5%off】有6个不能用。
        //敦煌6个不给用，分别为：0%off,1%off,2%off,3%off,4%off,5%off，则在我数据库中跳过，所以共计19+6=25个。（注：0%off就是100%off就是不打折。）
        //敦煌只能创建19个分组？答：默认值“other”我主要用来观查异常用的。敦煌说的：全店铺折扣是针对分组进行折扣设置，未设置分组的产品将自动加入到“other”中。
        let str = '[0<r:discount db="sqlite.aliexpress" size=25 where=" order by @.count desc,@.id asc">,<:discount/></r:discount>]';
       Tool.ajax.a01( str,1,this.a07,this)
    },
    a07: function (arr) {
        arr.shift();
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 5 && nArr.length < 19) { nArr.push(arr[i]); }
        }
        this.obj.Barr = nArr;
        this.obj.B2 = nArr.length;
        this.a08();
    },
    a08: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09, this, this.a11)
    },
    a09: function () {
        let url = "http://seller.dhgate.com/promoweb/groupManage/savepromogroup.do?groupName=" + encodeURIComponent(this.obj.Barr[this.obj.B1 - 1] + "% OFF") + "&groupId="
        $("#state").html("正在创建折扣分组。。。");
        gg.getFetch(url,"json", this.a10, this);
    },
    a10: function (t) {
        if (t.indexOf(this.obj.Barr[this.obj.B1 - 1] + "% OFF") != -1) {
            this.obj.B1++;
            this.a08();
        }
        else if (t.indexOf('<p>创建产品组失败,已创建产品组的数量已上限</p>') != -1) {
            Tool.at(this.obj.Barr[this.obj.B1 - 1] + "% OFF 创建产品组失败,已创建产品组的数量已上限")
        }
        else {
            Tool.at("创建折扣分组失败\n\n" + t)
        }
    },
    a11: function () {
        this.obj.A1++;
        this.obj.username = "";
        this.obj.password = "";
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("");
        this.a03();
    }
}
fun.a01();