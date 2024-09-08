'use strict';
var fun =
{
    a01: function () {
        $(".bz").attr("class", "bz a5")
        $("title").html("帐号设置 - rendie 安装向导");
        $(".btn_box").html('<a href="?step=4" class="s_btn pre">上一步</a><a href="?step=6" class="x_btn">下一步</a>');
        Tool.ajax.a01('<.Config(Conn)/>={r:Config(TablePre)/>',1,this.a02,  this);
    },
    a02: function (t) {
        let arr = t.split("=")
        let html = '\
        <fieldset>\
        <legend>填写数据库信息</legend>\
        <div class="content">\
          <table width="100%" cellspacing="1" cellpadding="0" >\
            <tr>\
              <th align="right">连接字符串：</th>\
              <td>\
              <textarea id="datasourcestr" cols="68" rows="3" class="input-text">' + arr[0] + '</textarea>\
              <img src="/' + o.path + 'admin/img/install/help.png" style="cursor:pointer;" title="SQL连接字符串:\nData Source=(local);Initial Catalog=db;User ID=sa;Password=xxx;Max Pool Size=512;\n\nAccess连接字符串:\nProvider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\xxx\\xxx\\xxx\\bak.mdb" align="absmiddle" /></td>\
            </tr>\
            <tr>\
              <th align="right">数据表前缀：</th>\
              <td>\
              <input type="text" id="TablePre" value="' + arr[1] + '" class="input-text" />\
              <img src="/' + o.path + 'admin/img/install/help.png" style="cursor:pointer;" title="如果一个数据库安装多个rendie，请修改表前缀" align="absmiddle" />\
              </td>\
            </tr>\
          </table>\
        </div>\
        </fieldset>\
        <fieldset>\
          <legend>填写帐号信息</legend>\
          <div class="content">\
            <table width="100%" cellspacing="1" cellpadding="0">\
              <tr>\
                <th width="20%" align="right">超级管理员帐号：</th>\
                <td><input name="username" type="text" id="username" value="admin" class="input-text"/></td>\
              </tr>\
              <tr>\
                <th align="right">管理员密码：</th>\
                <td><input type="password" id="password" value="admin888" class="input-text"/></td>\
              </tr>\
              <tr>\
                <th align="right">确认密码：</th>\
                <td><input type="password" id="pwdconfirm" value="admin888" class="input-text"/></td>\
              </tr>\
            </table>\
          </div>\
        </fieldset>'
        $(".nr").html(html);
    },
    c01: function () {
        let str = $('#datasourcestr').val();
        if (str == '') {
            alert('请输入连接字符串!');
            $('#datasourcestr').focus();
            return false;
        }
        this.c03("");
        $(".l").html('<p id="chkdata"style="padding-top:240px;text-align:center;color:white;">正在检测数据库设置...</p>')
        //Tool.ajax.a01("<.connect(" + str + ")/>",1, this.c02, this);
    },
    c02: function (t) {
        if (t == "") {
            this.c03("");
            //Tool.ajax.a01( "<.ConfigEdit(Conn," + $('#datasourcestr').val() + ")/>{r:ConfigEdit(TablePre," + $('#TablePre').val() + ")/>",1,this.c03, this);
        } else {
            $("#chkdata").html("字符串连接有误!" + t);
        }
    },
    c03: function (t) {
        if (t == "") {
            location.href = '?step=6';
        } else {
            alert("修改出错" + t);
        }
    }
}
fun.a01();