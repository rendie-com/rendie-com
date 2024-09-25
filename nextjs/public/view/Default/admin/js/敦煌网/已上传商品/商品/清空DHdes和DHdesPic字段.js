'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("清空DHdes和DHdesPic字段...") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="right w150">进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        //ManualReview=16           表示：详情异常
        let str = '[' + (this.obj.A2 == 0 ? '<@page/>' : '0') + '\
        <r:proupdhgate page=2 size=10 db="sqlite.dhgate" where=" where @.ManualReview=16">\
            ,"<:proid/>"\
        </r:proupdhgate>]'
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0]; }
        arr.shift();
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        let str = '""'
        for (let i = 0; i < arr.length; i++) {
            str += '<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(arr[i],50) + '">update @.prodes set @.DHdes=null,@.DHdesPic=null where @.proid=\'' + arr[i] + '\'</r:>';
        }
        $("#state").html("正清空详情内容【" + arr.join(" , ") + "】。。。");
        Tool.ajax.a01(str, 1, this.a05, this);
    },
    a05: function (t) {
        if (t == "") {
            this.obj.A1++;
            this.a02();
        }
        else { Tool.at(t); }
    }
}
fun.a01();