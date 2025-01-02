'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header('正在归类【店铺关注量&lt;1000】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">店铺页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[\
		{"A2":'+ (this.obj.A1 == 1 ? '<@page/>' : 0) + '}\
		<r:shop db="sqlite.aliexpress" size=50 page=2 where=" where @.Followers<1000">,<:shopid/></r:shop>]'
        $("#state").html("正在获取店铺ID...");
        Tool.ajax.a01(str, this.obj.A1,this.a03,  this)
    },
    a03: function (oo) {
        if (this.obj.A1 == 1) { this.obj.A2 = oo[0].A2; }
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100);
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（页）');
            this.a04(oo);
        }
        else {
            $("#state").html("全部完成");
        }
    },
    a04: function (oo) {
        oo.shift()
        let str = '""<r: db="sqlite.aliexpress">update @.pro set @.hide=42,@.err=\'归类【店铺关注量<1000】\' where @.shopid in(' + oo.join(",") + ')</r:>'
       Tool.ajax.a01( str,1,this.a05,this)
    },
    a05: function (t) {
        if (t == "") {
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            this.a02();
        }
        else { Tool.pre(["出错", t]); }
    }
}
fun.a01()