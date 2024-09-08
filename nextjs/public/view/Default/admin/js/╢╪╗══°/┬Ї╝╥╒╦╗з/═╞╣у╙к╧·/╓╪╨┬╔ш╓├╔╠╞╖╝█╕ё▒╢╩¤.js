'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0
    },
    a01: function () {
        let html = Tool.header("正在重新设置商品价格倍数...") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		    <tr><td class="right w100">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        if (confirm("确定要【重新设置商品价格倍数】吗？\n\n如果选择确定，请在【设置商品价格倍数】后，更新所有【已上传商品】且要确保【全店铺打折】是停止状态，否则在【全店铺打折】没结束状态下，可能会让你亏本。")) {
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
           Tool.ajax.a01( str,1,this.a03,this)
        }
    },
    //提取19个折扣
    a03: function (arr) {
        arr.shift();
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 5 && nArr.length < 19) { nArr.push(arr[i]); }
        }
        this.obj.Aarr = nArr;
        this.a04();
    },
    a04: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : 0) + '\
        <r:proupdhgate size=19 db="sqlite.dhgate" page=2>,<:id/></r:proupdhgate>]'
        $("#state").html("正在获取折扣。。。")
        Tool.ajax.a01( str, this.obj.A1,this.a05, this);
    },
    a05: function (arr) {
        if (this.obj.A2 == 0) this.obj.A2 = arr[0];
        arr.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, arr);
    },
    a06: function (arr) {
        let sqlArr = [], offArr = this.obj.Aarr;
        for (let i = 0; i < arr.length; i++) {
            let ran = Tool.randomRange(0, i + 1)//注：0和1之间，结果只会是0。
            //价格倍数=1.5/(1-x*0.01)      如：需要50%利润，还要"x"OFF，需要价格的多少倍？
            let ratio = (1.5 / (1 - offArr[ran] * 0.01)).toFixed(5);
            sqlArr.push("update @.proupdhgate set @.ratio=" + ratio + " where @.id=" + arr[i])
        }
        $("#state").html("正在设置折扣。。。")
       Tool.ajax.a01( '<r: db="sqlite.aliexpress">' + sqlArr.join("<1/>") + '</r:>',1,this.a07,this);
    },
    a07: function (t) {
        if (t == "") {
            $("#state").html("设置折扣成功。。。")
            this.obj.A1++;
            this.a04()
        }
        else {
            Tool.at("更新出错：" + t)
        }
    }
}
fun.a01();