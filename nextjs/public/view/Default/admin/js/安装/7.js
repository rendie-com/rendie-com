'use strict';
var fun =
{
    a01: function () {
       Tool.ajax.a01( "<.ConfigEdit(IsInstall, this,this.a02,false)/><r:Config(admin)/>", "/ajax/install");
    },
    a02: function (t) {
        let html = '\
		<div class="gxwc"><h1>恭喜您，安装成功！</h1></div>\
		<div class="clj"><ul><li><a href="/' + t + '" title="后台管理" class="htgl">后台管理</a></li></ul></div>'
        $(".nr").html(html);
        $(".bz").attr("class", "bz a7")
        $("title").html("安装完成 - rendie 安装向导");
    }
}
fun.a01();