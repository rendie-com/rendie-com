'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0, Aarr: {},
        B1: 1, B2: 0,
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("填充未上传数据...") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
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
        this.obj.Aarr.fromid = oo.fromid;
        this.obj.Aarr.types = oo.upmode.types;
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null);
    },
    a04: function () {
        let str = '{\
        "pro":[0<r:pro size=10 where=" where @.type1=' + this.obj.Aarr.types + ' and @.hide=0 and @.isUpDHgate=0" db="sqlite.aliexpress">,"<:proid/>"</r:pro>],\
        "proupdhgate":['+ (this.obj.B2 == 0 ? '<@page/>' : '0') + '<r:proupdhgate page=2 size=10 db="sqlite.dhgate" where=" where @.upuserid=' + this.obj.Aarr.fromid + ' and @.ManualReview=2">,<:fromID/></r:proupdhgate>]\
        }'
        Tool.ajax.a01(str, 1, this.a05, this)
    },
    a05: function (oo) {
        if (this.obj.B2 == 0) { this.obj.B2 = oo.proupdhgate[0]; }
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a06, this, this.a09, oo);
    },
    a06: function (oo) {
        let proArr = oo.pro;
        proArr.shift();
        if (proArr.length == 0) {
            Tool.at("没有数据填充了。")
        }
        else {
            oo.proupdhgate.shift();
            this.a07(proArr, oo.proupdhgate)
        }
    },
    a07: function (proArr, proupdhgateArr) {
        let len = proArr.length > proupdhgateArr.length ? proupdhgateArr.length : proArr.length;//选最小
        let sqlArr = [];
        for (let i = 0; i < len; i++) {
            sqlArr.push('update @.proupdhgate set @.pic=null,@.err=null,@.ManualReview=0,@.proStatus=0,@.proid=\'' + proArr[i] + '\' where @.fromid=' + proupdhgateArr[i]);
            sqlArr.push('update @.pro set @.isUpDHgate=1 where @.proid=\'' + proArr[i] + '\'');
        }
        let str = '""<r: db="sqlite.aliexpress">' + sqlArr.join('<1/>') + '</r:>'
        Tool.ajax.a01(str, 1, this.a08, this);
    },
    a08: function (t) {
        if (t == "") {
            this.obj.B1++;
            this.a04();
        }
        else {
            Tool.at("更新出错：" + t)
        }
    },
    a09: function (oo) {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.a02();
    },
}
fun.a01();