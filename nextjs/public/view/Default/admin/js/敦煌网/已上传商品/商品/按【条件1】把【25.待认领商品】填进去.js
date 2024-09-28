'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: {},
        B1: 1, B2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("按【条件1】把【25.待认领商品】填进去...") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="w150 right">条件1说明：</td><td colspan="2">敦煌卖家账户：非【0.未知】<br/>审核前本地状态：大于1<br/>审核后本地状态：【0.正常】</td></tr>\
		    <tr><td class="right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">填充进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '\
        {\
            <r:seller db="sqlite.dhgate" size=1 page=2 where=" order by @.sort asc,@.id asc">\
		        "username":"<:username/>",\
		        "upmode":<:upmode/>,\
                "fromid":"<:fromid/>",\
            </r:seller>\
           "A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        $("#username").html(oo.username);
        if (oo.upmode) {
            this.obj.Aarr.fromid = oo.fromid;
            this.obj.Aarr.types = oo.upmode.types;
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null);
        }
        else {
            this.a10();
        }
    },
    a04: function () {
        //ManualReview=9    手动审核状态：图片且详情审核通过
        //proupdhgateA      表示【待认领商品】
        //proupdhgateB      表示要被替换的商品
        //BeforeReview=25   表示【审核前本地状态】的【待认领商品】
        //意思就是，没更新成功的，且不包括【审核后本地状态：还是正常】的商品，都要替换掉。
        //【审核后本地状态：还是正常】？如果要替换非正常，可能会出现异常---要人工确认后再来开发。
        if (this.obj.Aarr.types) {
            let str = '{\
            "proupdhgateA":[0\
                <r:proupdhgate size=10 db="sqlite.dhgate" where=" where @.type1=' + this.obj.Aarr.types + ' and @.BeforeReview=25 and @.ManualReview=9">,\
                {\
                    "fromid":<:fromid/>,\
                    "proid":"<:proid/>",\
                    "ManualReview":<:ManualReview/>\
                }\
                </r:proupdhgate>\
            ],\
            "proupdhgateB":[\
                '+ (this.obj.B2 == 0 ? '<@page/>' : '0') + '\
                <r:proupdhgate page=2 size=10 db="sqlite.dhgate" where=" where @.upuserid=' + this.obj.Aarr.fromid + ' and @.BeforeReview&gt;1 and @.AfterReview=0">,\
                {\
                    "proid":"<:proid/>",\
                    "fromid":<:fromid/>\
                }\
                </r:proupdhgate>\
            ]}'
            Tool.ajax.a01(str, 1, this.a05, this)
        }
        else {
            $("#state").html("没有选择类目,选择跳过")
            this.a10()
        }
    },
    a05: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo.proupdhgateB[0]; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.a10, oo);
    },
    a06: function (oo) {
        let proupdhgateA = oo.proupdhgateA;
        proupdhgateA.shift();
        if (proupdhgateA.length == 0) {
            $("#state").html("没有数据填充了,下一个账号吧。")
            this.a10()
        }
        else {
            oo.proupdhgateB.shift();
            this.a07(proupdhgateA, oo.proupdhgateB)
        }
    },
    a07: function (proupdhgateA, proupdhgateB) {
        let len = proupdhgateA.length > proupdhgateB.length ? proupdhgateB.length : proupdhgateA.length;//选最小
        let sqlArr1 = [], sqlArr2 = [];
        for (let i = 0; i < len; i++) {
            sqlArr1.push('delete from @.proupdhgate where @.fromid=' + proupdhgateA[i].fromid);//删除【待认领商品】，因为已认领了。
            sqlArr2.push('update @.proupdhgate set @.pic=null,@.err=null,@.ManualReview=' + proupdhgateA[i].ManualReview + ',@.BeforeReview=0,@.proid=\'' + proupdhgateA[i].proid + '\' where @.fromid=' + proupdhgateB[i].fromid);
            sqlArr2.push('update @.pro set @.isUpDHgate=0 where @.proid=\'' + proupdhgateB[i].proid + '\'');//取消之前的记录，因为被【待认领商品】替换了
        }
        let str = '""<r: db="sqlite.aliexpress">' + sqlArr1.join('<1/>') + '</r:>';//先删除，因为@.proid有唯一索引的约束。
        Tool.ajax.a01(str, 1, this.a08, this, sqlArr2);
    },
    a08: function (t, sqlArr2) {
        if (t == "") {
            let str = '""<r: db="sqlite.aliexpress">' + sqlArr2.join('<1/>') + '</r:>';//再修改
            Tool.ajax.a01(str, 1, this.a09, this);
        }
        else {
            Tool.at("更新出错11：" + t)
        }
    },
    a09: function (t) {
        if (t == "") {
            this.obj.B1++;
            this.a04();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    a10: function () {
        this.obj.A1++;
        this.obj.Aarr = {};
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.a02();
    },
}
fun.a01();