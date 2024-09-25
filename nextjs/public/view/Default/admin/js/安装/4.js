'use strict';
var fun =
{
    a01: function () {
        let html = '\
        <table cellpadding="0" cellspacing="0" class="table_list">\
        <tr><th class="col1">目录文件</th><th class="col2">所需状态</th><th class="col3">当前状态</th></tr>\
        <tr>\
        <td>index.html</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>caches/</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>html/</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>uploadfile/</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>phpsso_server/caches/</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>phpsso_server/uploadfile/</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        <tr>\
        <td>网站根目录</td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        <td><span><img src="/' + o.path + 'admin/img/install/correct.gif" />&nbsp;可写</span></td>\
        </tr>\
        </table>'
        $(".nr").html(html);
        $(".bz").attr("class", "bz a4")
        $("title").html("文件权限设置 - rendie 安装向导");
        $(".btn_box").html('<a href="?step=3" class="s_btn pre">上一步</a><a href="?step=5"  class="x_btn">下一步</a>')
    }
}
fun.a01();