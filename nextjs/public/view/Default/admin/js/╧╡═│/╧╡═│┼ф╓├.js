'use strict';
var fun =
{
    a01: function () {
        let str = '{\
        "isInstall":"<.Config(isInstall)/>",\
        "isErr":"<.Config(isErr)/>",\
        "admin":"<.Config(admin)/>",\
        "defaultView":"<.Config(defaultView)/>",\
        "mysqlConn":"<.Config(mysqlConn)/>",\
        "mssql2012":"<.Config(mssql2012)/>",\
        "sqlite":"<.Config(sqlite)/>",\
        "oracle":"<.Config(oracle)/>",\
        "mssql2005_2008":"<.Config(mssql2005_2008)/>",\
        "TablePre":"<.Config(TablePre)/>",\
        "ExchangeRate":"<.Config(ExchangeRate)/>",\
        "ProfitMargin":"<.Config(ProfitMargin)/>",\
        "SMTP_server_address":"<.Config(SMTP_server_address)/>",\
        "SMTP_name":"<.Config(SMTP_name)/>",\
        "SMTP_password":"<.Config(SMTP_password)/>",\
        "gbookStart":"<.Config(gbookStart)/>",\
        "gbookTime":"<.Config(gbookTime)/>",\
        "gbookUser":"<.Config(gbookUser)/>",\
        "gbookPwd":"<.Config(gbookPwd)/>",\
        "commentStart":"<.Config(commentStart)/>",\
        "commentTime":"<.Config(commentTime)/>",\
        "waterMark":"<.Config(waterMark)/>",\
        "waterMarkPic":"<.Config(waterMarkPic)/>",\
        "isFileCache":"<.Config(isFileCache)/>",\
        "fileCacheTime":"<.Config(fileCacheTime)/>",\
        "cacheFolder":"<.Config(cacheFolder)/>",\
        "dirtyWords":"<.Config(dirtyWords)/>",\
        "getBanWords":"<.Config(getBanWords)/>",\
        "getBanIPS":"<.Config(getBanIPS)/>",\
        "NoAccess1":"<.Config(NoAccess1)/>",\
        "NoAccess2":"<.Config(NoAccess2)/>",\
        "LockIP":"<.Config(LockIP)/>"\
        }'
        Tool.ajax.a01(str,1, this.a02, this)
    },
    a02: function (oo) {
        let html = ''
        html = '\
		<header class="panel-heading">\
      <div val="1" onclick="fun.c01(\'1\');" class="active">基本设置</div>\
      <div val="2" onclick="fun.c01(\'2\');">数据库设置</div>\
      <div val="3" onclick="fun.c01(\'3\');">插件设置</div>\
      <div val="4" onclick="fun.c01(\'4\');">其它设置</div>\
      <div val="5" onclick="fun.c01(\'5\');">nginx配置</div>\
    </header>\
    <div class="p-2">'+ this.b02(oo) + this.b03(oo) + this.b04(oo) + this.b05(oo) + this.b06(oo) + '</div>'
        Tool.html(null, null, html);
    },
    b01: function (L) {
        let str = ""
        switch (L) {
            case "mssql2012": str = "sql server 2012"; break;
            case "sqlite": str = "access"; break;
            case "Conn4": str = "mysql"; break;
            case "oracle": str = "oracle"; break;
            case "mssql2005_2008": str = "sql server 2005/2008"; break;
            default: alert("未知内容");
        }
        return str;
    },
    b02: function (oo) {
        return '\
    <table id="t1_body" class="table table-bordered table-hover align-middle">\
      <tr>\
        <td class="w200 right">是否需要安装：</td>\
        <td>'+ Tool.switch('isInstall', oo.isInstall, 'fun.c07') + '该能功能在需要安装时打开。</td>\
      </tr>\
      <tr>\
        <td class="w200 right">出错提示开关：</td>\
        <td>'+ Tool.switch('isErr', oo.isErr, 'fun.c07') + '该能功能关闭时，出错只提示503错误。</td>\
      </tr>\
      <tr>\
        <td class="w200 right">后台登陆地址：</td>\
        <td><input type="text" class="form-control w200" value="'+ oo.admin + '" onblur="fun.c0xx2($(this),\'admin\',\'' + oo.admin + '\')"/></td>\
      </tr>\
      <tr>\
        <td class="right">模板选择：</td>\
        <td class="p-3">'+ oo.defaultView + '</td>\
      </tr>\
      <tr>\
        <td class="right">数据表前缀：</td>\
        <td class="p-3">'+ oo.TablePre + '</td>\
      </tr>\
      <tr>\
        <td class="right">视图缓存开关：</td>\
        <td class="p-3">&nbsp;\
          <table id="isView" '+ (oo.isView == "true" ? '' : 'style="display:none"') + '>\
            <tr>\
						<td>'+ Tool.switch('isView', oo.isView, 'fun.c07') + '</td>\
            <td>缓存过期时间</td>\
            <td class="w80"><input type="text"  class="form-control center" value="'+ oo.ViewTime + '" onblur="fun.c13($(this),\'ViewTime\',\'' + oo.ViewTime + '\')"/></td>\
            <td>分钟，缓存数量限制</td>\
            <td class="w80"><input type="text"  class="form-control center" value="'+ oo.ViewNum + '" onblur="fun.c13($(this),\'ViewNum\',\'' + oo.ViewNum + '\')"/></td>\
            <td>条。如果超出，则删除早期缓存。（主要用于缓存模板文件）</td>\
            </tr>\
          </table>\
        </td>\
      </tr>\
      <tr>\
        <td class="right">SQL缓存开关：</td>\
        <td class="p-3">&nbsp;\
          <table id="IsSQL" '+ (oo.IsSQL == "true" ? '' : 'style="display:none"') + '>\
						<td>'+ Tool.switch('IsSQL', oo.IsSQL, 'fun.c07') + '</td>\
            <td>缓存过期时间</td>\
            <td class="w80"><input type="text" class="form-control center" value="'+ oo.SQLTime + '" onblur="fun.c13($(this),\'SQLTime\',\'' + oo.SQLTime + '\')"/></td>\
            <td>分钟，执行SQL时间超过</td>\
            <td class="w80"><input type="text" class="form-control center" value="'+ oo.SQLNum + '" onblur="fun.c13($(this),\'SQLNum\',\'' + oo.SQLNum + '\')"/></td>\
            <td>毫秒,才会被缓存。（主要用于缓存数据库）</td>\
          </table>\
        </td>\
      </tr>\
      <tr>\
        <td class="right" nowrap>临时文件缓存开关：</td>\
        <td class="p-3">&nbsp;\
          <table id="isFileCache" '+ (oo.isFileCache == "true" ? '' : 'style="display:none"') + '>\
          <tr>\
					<td>'+ Tool.switch('isFileCache', oo.isFileCache, 'fun.c07') + '</td>\
            <td>缓存过期时间</td>\
            <td class="w80"><input type="text" class="form-control center" value="'+ oo.fileCacheTime + '" onblur="fun.c13($(this),\'fileCacheTime\',\'' + oo.fileCacheTime + '\')"/></td>\
            <td>分钟，访问量过大建议打开，有效减少前台搜索压力</td>\
          </tr>\
          </table>\
        </td>\
      </tr>\
      <tr>\
        <td class="right">临时文件缓存目录：</td>\
        <td>\
					<div class="input-group w400">\
						<input type="text" class="form-control" id="mssql2005_2008" value="'+ oo.cacheFolder + '" onblur="fun.c02($(this),\'cacheFolder\',\'' + oo.cacheFolder + '\')">\
						<button class="btn btn-outline-secondary" type="button"onclick="fun.c08(\'/'+ oo.cacheFolder + '/\')">清空临时文件缓存目录</button>\
					</div>\
				</td>\
      </tr>\
    </table>'
    },
    b03: function (oo) {
        return '\
		<table id="t2_body" class="table table-bordered table-hover align-middle" style="display:none"><tr>\
			<td class="right w200">【1】连接字符串：</td>\
			<td>\
				<div class="input-group">\
					<span class="input-group-text" id="inputGroup-sizing">mysql</span>\
					<input type="text" class="form-control" id="mysqlConn" value="'+ oo.mysqlConn + '">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c14()" title="只对接数据库用户【admin】，设置当前公网IP。">允许远程连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04($(this),\'mysqlConn\',decodeURI(\''+ encodeURI(oo.mysqlConn) + '\'));">测式连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c11(\'mysqlConn\');">保存</button>\
				</div>\
			</td>\
		</tr>\
		<tr>\
			<td class="right">【2】连接字符串：</td>\
			<td>\
				<div class="input-group">\
					<span class="input-group-text">sql server 2012</span>\
					<input type="text" class="form-control" id="mssql2012" value="'+ oo.mssql2012 + '">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04($(this),\'mssql2012\',decodeURI(\''+ encodeURI(oo.mssql2012) + '\'));">测式连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c11(\'mssql2012\');">保存</button>\
				</div>\
			</td>\
		</tr>\
		<tr>\
		 <td class="right">【3】连接字符串：</td>\
		 <td>\
				<div class="input-group">\
					<span class="input-group-text">sqlite</span>\
					<input type="text" class="form-control" id="sqlite" value="'+ oo.sqlite + '">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04($(this),\'sqlite\',decodeURI(\''+ encodeURI(oo.sqlite) + '\'));">测式连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c11(\'sqlite\');">保存</button>\
				</div>\
		 </td>\
		</tr>\
		</div>\
		<tr>\
			<td class="right">【5】连接字符串：</td>\
			<td>\
				<div class="input-group">\
					<span class="input-group-text" id="inputGroup-sizing">oracle</span>\
					<input type="text" class="form-control" id="oracle" value="'+ oo.oracle + '">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04($(this),\'oracle\',decodeURI(\''+ encodeURI(oo.oracle) + '\'));">测式连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c11(\'oracle\');">保存</button>\
				</div>\
			</td>\
		</tr>\
		<tr>\
			<td class="right">【6】连接字符串：</td>\
			<td>\
				<div class="input-group">\
					<span class="input-group-text" id="inputGroup-sizing">sql server 2005/2008</span>\
					<input type="text" class="form-control" id="mssql2005_2008" value="'+ oo.mssql2005_2008 + '">\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c04($(this),\'mssql2005_2008\',decodeURI(\''+ encodeURI(oo.mssql2005_2008) + '\'));">测式连接</button>\
					<button class="btn btn-outline-secondary" type="button" onclick="fun.c11(\'mssql2005_2008\');">保存</button>\
				</div>\
			</td>\
		</tr>\
		</table>'
    },
    b04: function (oo) {
        return '\
    <table id="t3_body" class="table table-bordered table-hover align-middle" style="display:none">\
      <tr>\
        <td class="right w200">美元汇率：</td>\
        <td class="w300"><input type="text" class="form-control" value="'+ oo.ExchangeRate + '" onblur="fun.c06($(this),\'ExchangeRate\',\'' + oo.ExchangeRate + '\')"/></td>\
        <td>例如：1美元=6.50人民币元</td>\
      </tr>\
      <tr>\
        <td class="right">利润率：</td>\
        <td><input type="text" class="form-control" value="'+ oo.ProfitMargin + '" onblur="fun.c06($(this),\'ProfitMargin\',\'' + oo.ProfitMargin + '\')"/></td>\
        <td>商品成本价格乘以【利润率】。（例如：10美元商品*1.05利润率=10.05美元商品价格）</td>\
      </tr>\
      <tr>\
        <td class="right">SMTP服务器地址：</td>\
        <td><input type="text" class="form-control" value="'+ oo.SMTP_server_address + '" onblur="fun.c06($(this),\'SMTP_server_address\',\'' + oo.SMTP_server_address + '\')"/></td>\
        <td>用来发送邮件的SMTP服务器如果你不清楚此参数含义，请联系你的空间商 </td>\
      </tr>\
      <tr>\
        <td class="right">SMTP登录用户名：</td>\
        <td><input type="text" class="form-control" value="'+ oo.SMTP_name + '" onblur="fun.c06($(this),\'SMTP_name\',\'' + oo.SMTP_name + '\')"/></td>\
        <td>用来发送邮件的SMTP服务器如果你不清楚此参数含义，请联系你的空间商 </td>\
      </tr>\
      <tr>\
        <td class="right">SMTP登录密码：</td>\
        <td><input type="text" class="form-control" value="'+ oo.SMTP_password + '" onblur="fun.c06($(this),\'SMTP_password\',\'' + oo.SMTP_password + '\')"/></td>\
        <td>当你的服务器需要SMTP身份验证时还需设置此参数</td>\
      </tr>\
      <tr>\
        <td class="right">留言开关：</td>\
        <td>'+ Tool.switch('gbookStart', oo.gbookStart, 'fun.c07') + '</td>\
        <td>\
          <table id="gbookStart" '+ (oo.gbookStart == "true" ? '' : 'style="display:none"') + '>\
          <tr>\
            <td>留言时间间隔</td>\
            <td class="w60"><input type="text" class="form-control center" onblur="fun.c02($(this),\'gbookTime\',\''+ oo.gbookTime + '\')" value="' + oo.gbookTime + '"/></td>\
            <td>秒;留言管理账号</td>\
            <td class="w150"><input type="text" class="form-control" onblur="fun.c02($(this),\'gbookUser\',\''+ oo.gbookUser + '\')" value="' + oo.gbookUser + '"/></td>\
            <td>留言密码管理</td>\
            <td class="w150"><input type="text" class="form-control" onblur="fun.c02($(this),\'gbookPwd\',\''+ oo.gbookPwd + '\')" value="' + oo.gbookPwd + '"/></td>\
            </tr>\
          </table>\
        </td>\
      </tr>\
      <tr>\
        <td class="right">评论开关：</td>\
        <td>'+ Tool.switch('commentStart', oo.commentStart, 'fun.c07') + '</td>\
        <td>\
          <table id="commentStart" '+ (oo.commentStart == "true" ? '' : 'style="display:none"') + '>\
          <tr>\
            <td>评论时间间隔</td>\
            <td><input type="text"  class="form-control w60" onblur="fun.c02($(this),\'commentTime\',\''+ oo.commentTime + '\')" value="' + oo.commentTime + '"/></td>\
            <td>秒;在数据库负载过重情况下，可以关闭评论功能</td>\
        </table>\
        </td>\
      </tr>\
      <tr>\
        <td class="right">图片水印开关：</td>\
        <td>'+ Tool.switch('waterMark', oo.waterMark, 'fun.c07') + '</td>\
        <td colspan="2">\
          <table id="waterMark" '+ (oo.waterMark == "true" ? '' : 'style="display:none"') + ' class="w-100">\
            <tr>\
            <td class="w60">图片地址</td>\
            <td><input type="text" class="form-control" onblur="fun.c02($(this),\'waterMarkPic\',\''+ oo.waterMarkPic + '\')" value="' + oo.waterMarkPic + '"></td>\
            </tr>\
          </table>\
        </td>\
      </tr>\
    </table>'
    },
    b05: function (oo) {
        return '\
    <table id="t4_body" class="table table-bordered table-hover align-middle" style="display:none">\
      <tr>\
        <td class="w200 right">禁止访问：</td>\
        <td class="p-0">\
					<table class="table align-middle mb-0">\
						<tr class="table-light"><th>客户瑞信息禁止（访问的【客户瑞信息】包括以下信息，则被禁止访问。以换行分隔）</th></tr>\
						<tr><td class="p-0"><textarea rows="20" class="form-control" onblur="fun.c02($(this),\'NoAccess1\',\'\')">'+ unescape(oo.NoAccess1) + '</textarea></td></tr>\
						<tr class="table-light"><th>公网IP禁止 （从【IP库】中添加）</th></tr>\
						<tr><td class="p-0"><textarea  rows="5" class="form-control" disabled="disabled">'+ unescape(oo.NoAccess2) + '</textarea></td></tr>\
					</table>\
				</td>\
      </tr>\
      <tr>\
        <td class="w200 right">脏字过滤：</td>\
        <td><input type="text" class="form-control" value="'+ oo.dirtyWords + '" onblur="fun.c02($(this),\'dirtyWords\',\'' + oo.dirtyWords + '\')"/>请以英文逗号,分离</td>\
      </tr>\
      <tr>\
        <td class="right">禁止留言：</td>\
        <td><input type="text" class="form-control" value="'+ oo.getBanWords + '" onblur="fun.c02($(this),\'getBanWords\',\'' + oo.getBanWords + '\')"/>请以英文逗号,分离</td>\
      </tr>\
      <tr>\
        <td class="right">禁止IP登陆：</td>\
        <td><input type="text" class="form-control" value="'+ oo.getBanIPS + '" onblur="fun.c02($(this),\'getBanIPS\',\'' + oo.getBanIPS + '\')"/>请以英文逗号,分离。支持通配符*(例：192.168.1.*)</td>\
      </tr>\
      <tr>\
        <td class="right">禁止留言：</td>\
        <td><input type="text" class="form-control" value="'+ oo.LockIP + '" onblur="fun.c02($(this),\'LockIP\',\'' + oo.LockIP + '\')"/>请以英文逗号,分离。支持通配符*(例：192.168.1.*)</td>\
      </tr>\
    </table>'
    },
    b06: function (oo) {
        return '\
		<table id="t5_body" class="table table-bordered table-hover align-middle" style="display:none">\
			<tr>\
        <td class="right w200">配置文件路径：</td>\
        <td><input type="text" class="form-control" value="/usr/local/nginx/conf/nginx.conf"/></td>\
      </tr>\
			<tr>\
        <td class="right">文件内容：</td>\
        <td><textarea id="code" rows="30" class="form-control"></textarea></td>\
      </tr>\
    </table>'
    },
    c01: function (val) {
        $('.panel-heading div').removeClass()
        $(".panel-heading div[val=" + val + "]").addClass("active");
        $("table[id$='_body']").hide();
        $("#t" + val + "_body").show();
    },
    c02: function (This, L) {
        if (!This.prop("disabled")) {
            This.attr("disabled", true);
            let V = escape(This.val())
            Tool.ajax.a01( '<.ConfigSave(' + L + ',' + V + ')/>',1,this.c03, this, This);
        }
    },
    c03: function (t, This) {
        This.attr("disabled", false);
        if (Tool.Trim(t) != "") { Tool.at("出错：" + t) }
    },
    c04: function (This, L, V) {
        let val = $("#" + L).val();
        if (!This.attr("disabled")) {
            This.val("加载加...");
            This.attr("disabled", true);
            if (val == '') { alert('请输入连接字符串!'); }
            else {
                Tool.ajax.a01( "[<.Conn2(" + this.b01(L) + "," + val + ")/>]",1,this.c05, this,  [This, L, val]);
            }
        }
    },
    c05: function (o1, oo) {
        if (o1[0] == null) {
            Tool.Modal("数据库配置", "数据库配置成功。", '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>', 'modal-l');
        }
        else {
            Tool.Modal("连接数据库出错", "连接字符串：<textarea style=\"height: 200px;\" class=\"form-control\">" + oo[2] + "</textarea>出错原因:<textarea style=\"height: 200px;\" class=\"form-control\">" + o1 + '</textarea>', '<button type="button"data-bs-dismiss="modal" aria-label="Close">关闭</button>', 'modal-xl');
        }
        oo[0].attr("disabled", false);
    },
    c06: function (This, L, V) {
        let val = This.val(), html = '';
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            if (This.html().indexOf('<option') != -1) {
                let oo = This.find("option:selected"); This.find("option").attr("selected", false); oo.attr("selected", true); html = This.html();//先选中，再取代码
                This.html("<option>加载加...</option>");
            }
            else { html = val; This.val("加载加..."); }
            let txt = "\"\"<r: tag=\"sql\">update @.config set @." + L + "='" + val + "'</r:>"
            Tool.ajax.a01(txt,1, this.c03, this, [This, html]);
        }
    },
    c07: function (This, L) {
        if (!This.prop("disabled")) {
            This.attr("disabled", true);
            let V = This.prop('checked')
            Tool.ajax.a01( '<.ConfigSave(' + L + ',' + V + ')/>',1, this.c03,this,  This);
        }
        else { alert("正在修改设置，请稍等。"); }
    },
    c08: function (Folder) {
        Tool.ajax.a01( "\"\"<.DelFolder(" + Folder + ")/>",1,this.c09, this,  Folder);
    },
    c09: function (t, Folder) {
        if (t == "") { alert('【' + Folder + '】目录删除成功！') } else { alert("出错:" + t) }
    },
    c10: function (t, oo) {
        if (t == "") {
            oo[0].val(oo[2]);
            oo[0].attr("disabled", false);
        }
        else { alert("修改连接字符串出错：" + t) }
    },
    c11: function (name, conn) {
        let str = ""
        if (!conn) {
            conn = "Conn";
            if (name == "mssql2012") { str = '<.ConfigEdit(ConnType,mssql2012)/>'; }
            else if (name == "sqlite") { str = '<.ConfigEdit(ConnType,sqlite)/>'; }
            else if (name == "Conn4") { str = '<.ConfigEdit(ConnType,mysql)/>'; }
            else if (name == "oracle") { str = '<.ConfigEdit(ConnType,oracle)/>'; }
            else if (name == "mssql2005_2008") { str = '<.ConfigEdit(ConnType,sql server 2005/2008)/>'; }
        }
        /////////////////////////////////////
        str += '""<.ConfigEdit(' + conn + ',' + $("#" + name).val() + ')/>'
        Tool.ajax.a01( str, 1,this.c12,this);
    },
    c12: function (t) {
        if (t == "") { alert("操作成功"); top.location.reload(); }
        else { alert("出错：" + t); }
    },
    c13: function (This, L, V) {
        let val = This.val();
        if (val != V && !This.prop("disabled")) {
            This.attr("disabled", true);
            Tool.ajax.a01( '<.ConfigEdit(' + L + ',' + val + ')/>',1, this.c03,this, This);
        }
    },
    c14: function () {
        let sql = "update user set host='Fun(GetIp)' where user='admin' and Grant_priv='Y'"
        Tool.ajax.a01('""<r: db="mysql.mysql">' + sql + '<1/>flush privileges;</r:>',1,this.c12,  this);
    }
}
fun.a01();