'use strict';
var fun =
{
    a01: function () {
        let html = '\
		<table cellpadding="0" cellspacing="0" class="table_list">\
		<tr><th class="col1">检查项目</th><th class="col2">当前环境</th><th class="col3">RenDie 建议</th>\
		<th class="col4">功能影响</th></tr><tr><td>操作系统</td><td></td><td>Windows_NT</td><td><span><img src="/' + o.path + 'admin/img/install/correct.gif" /></span></td></tr>\
		<tr><td>WEB 服务器</td><td></td><td>IIS</td><td><span><img src="/' + o.path + 'admin/img/install/correct.gif" /></span></td></tr>\
		</table>'
        $(".nr").html(html);
        $(".bz").attr("class", "bz a2")
        $("title").html("运行环境检测 - rendie 安装向导");
        $(".btn_box").html('<a href="?step=" class="s_btn pre">上一步</a><a href="?step=3"  class="x_btn">下一步</a>')
    }
}
fun.a01();