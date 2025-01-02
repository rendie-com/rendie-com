'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('正在同步【敦煌网佣金率】...') + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
		        <tr><td class="right w150">进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0?'<@page/>':'0')+'<r:typebind db="sqlite.aliexpress" size=100 page=2>,"<:dhType/>"</r:typebind>]'
        Tool.ajax.a01( str, this.obj.A1,this.a03, this);
    },
    a03: function (oo) {
        if(this.obj.A2==0) this.obj.A2 = oo[0];
        oo.shift()
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo)
    },
    a04: function (arr) {
        $("#state").html("找出二级类目。。。");
        let o1 = {};
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length <= 6) {
                o1[arr[i]] = true;
            }
            else {
                o1[arr[i].substr(0, 6)] = true;
            }
        }
        this.a05(arr, o1)
    },
    a05: function (arr, o1) {
        $("#state").html("获取佣金率。。。")
        let arr2 = [];
        for (let k in o1) { arr2.push(k); }
        let str = '[0\
        <r:type db="sqlite.dhgate" size=100 where=" where @.fromid in(\'' + arr2.join("','") + '\')">,\
           {\
            "fromid":"<:fromid/>",\
           "c0_300":<:c0_300/>,\
           "c300_1000":<:c300_1000/>,\
           "c1000_":<:c1000_/>\
            }\
        </r:type>]'
        Tool.ajax.a01( str,1,this.a06, this, arr);
    },
    a06: function (oo, arr) {
        let sql = []
        for (let i = 0; i < arr.length; i++) {
            let o1 = this.b01(oo, arr[i]);
            sql.push("update @.typebind set @.c0_300=" + o1.c0_300 + ",@.c300_1000=" + o1.c300_1000 + ",@.c1000_=" + o1.c1000_ + " where @.dhType='" + arr[i] + "'")
        }
        let html = '<r: db="sqlite.aliexpress">' + sql.join("<1/>") + '</r:>'
        Tool.ajax.a01( html,1, this.a07,this);
    },
    a07: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at("更新出错。" + t)
        }

    },
    b01: function (oo, fromid) {
        let NewObj = {}
        if (fromid.length > 6) { fromid = fromid.substr(0, 6); }
        for (let i = 1; i < oo.length; i++) {
            if (oo[i].fromid == fromid) {
                NewObj = oo[i];
                break;
            }
        }
        if (!NewObj.c0_300) {
            //来源无【佣金率】,给它用“-1”
            NewObj = {
                "fromid": fromid,
                "c0_300": -1,
                "c300_1000": -1,
                "c1000_": -1
            }
            //Tool.pre(["来源无【佣金率】", fromid, oo])
            //aaaaaaaaaaaaaaa
        }
        return NewObj
    },

}
fun.a01();