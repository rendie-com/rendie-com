'use strict';
var fun =
{
	obj: {
		default_db: "",
	},
	a01: function () {
		//obj.params.jsFile			选择JS文件
		//obj.params.id			选择JS文件
		let data = [{
			action: "config",
			name: "default_db"
		}]
		Tool.ajax.a01(data, this.a02, this);
	},
	a02: function (t) {
		this.obj.default_db = t[0]
		let data = [{
			action: this.obj.default_db,
			database: "main",
			sql: "select " + Tool.fieldAs("id,name") + " FROM @.usergroup",
		}, {
			action: this.obj.default_db,
			database: "main",
			sql: "select " + Tool.fieldAs("access_token,expires_in,refresh_token,id,realname,groupid,logintime,loginip,logintimes,state,name,telphone,email,sex,des,state") + " FROM @.manager" + " where @.id=" + obj.params.id
		}]
		Tool.ajax.a01(data, this.a03, this);
	},
	a03: function (t) {
		let oo = t[1][0];
		let token = {
			access_token: oo.access_token,
			expires_in: oo.expires_in,
			refresh_token: oo.refresh_token
		}
		let html = Tool.header(obj.params.return, '系统 &gt; 系统账号 &gt; 修改') + '\
		<div class="p-2">\
		<table class="table table-hover align-middle">\
			<tbody>\
			<tr>\
				<td class="w100 right">用户名：</td>\
				<td><input type="text" value="'+ oo.name + '" id="name" class="form-control" onblur="fun.c01($(this),' + oo.id + ',\'name\')"/></td>\
				<td style="color:#FF0000">＊</td>\
				<td class="right">密码：</td>\
				<td><input type="password" value="" class="form-control" onblur="fun.c03($(this),'+ oo.id + ',$(\'#name\').val())"/></td>\
				<td style="color:#FF0000">＊</td>\
			</tr>\
			<tr>\
				<td class="right">是否激活：</td>\
				<td>\
					<div class="form-check form-check-inline">\
						<input class="form-check-input" type="radio" name="pre_state" id="pre_state-0"'+ (oo.state == 1 ? ' checked="checked"' : '') + ' value="1" onclick="fun.c01($(this),' + oo.id + ',\'state\')">\
						<label class="form-check-label" for="pre_state-0">激活</label>\
					</div>\
					<div class="form-check form-check-inline">\
						<input class="form-check-input" type="radio" value="0" name="pre_state" id="pre_state-1"'+ (oo.state == 0 ? ' checked="checked"' : '') + ' onclick="fun.c01($(this),' + oo.id + ',\'state\')">\
						<label class="form-check-label" for="pre_state-1">锁定</label>\
					</div>\
				</td>\
				<td style="color:#FF0000">＊</td>\
				<td class="right">所属用户组：</td>\
				<td>\
					<select id="GroupID" class="form-select">\
						<option value="0">选择所属用户组</option>'+ this.b01(t[0], oo.groupid) + '\
					</select>\
				</td>\
				<td></td>\
			</tr>\
			<tr>\
				<td class="right">真实姓名：</td>\
				<td><input type="text" value="'+ oo.realname + '" id="realname" size="30" class="form-control"></td>\
				<td></td>\
				<td class="right">性 别：</td>\
				<td>\
					<div class="form-check form-check-inline">\
						<input type="radio" class="form-check-input" value="男" name="pre_sex" id="pre_sex-1"'+ (oo.sex == '男' ? ' checked="checked"' : '') + '>\
						<label class="form-check-label" for="pre_sex-1">男</label>\
					</div>\
					<div class="form-check form-check-inline">\
						<input type="radio" class="form-check-input" value="女" name="pre_sex" id="pre_sex-0"'+ (oo.sex == '女' ? ' checked="checked"' : '') + '>\
						<label class="form-check-label" for="pre_sex-0">女</label>\
					</div>\
				</td>\
				<td></td>\
			</tr>\
			<tr>\
				<td class="right">联系电话：</td>\
				<td><input type="text" value="'+ oo.telphone + '" id="telphone" class="form-control"></td>\
				<td></td>\
				<td class="right">电子信箱：</li>\
				<td><input type="text" id="email" value="'+ oo.email + '" class="form-control"></td>\
				<td></td>\
			</tr>\
			<tr>\
				<td class="right">简要说明：</td>\
				<td colspan="5">\
				<textarea id="des" rows="3" class="form-control">'+ oo.des + '</textarea>\
				</td>\
			</tr>\
			<tr>\
				<td class="right">token：</td>\
				<td colspan="5">\
				<textarea id="des" rows="5" class="form-control" disabled>'+ JSON.stringify(token, null, 2) + '</textarea>\
				</td>\
			</tr>\
			</tbody>\
		</table>\
		</div>'
		Tool.html(null, null, html)
	},
	b01: function (arr, groupid) {
		let str = "";
		for (let i = 0; i < arr.length; i++) {
			str += '<option value="' + arr[i].id + '" ' + (groupid == arr[i].id ? ' selected="selected"' : '') + '>' + (i + 1) + "." + arr[i].name + '</option>'
		}
		return str;
	},
	///////////////////////
	c01: function (This, id, name) {
		This.attr("disabled", true);
		let data = [{
			action: this.obj.default_db,
			database: "main",
			sql: "update @.manager set @." + name + "=" + Tool.rpsql(This.val()) + " where @.id=" + id,
		}]
		Tool.ajax.a01(data, this.c02, this, This);
	},
	c02: function (t, This) {
		if (t[0].length == 0) {
			This.attr("disabled", false);
		}
		else {
			Tool.pre(["出错", t])
		}
	},
	c03: function (This, id, name) {
		let val = This.val()
		if (val) {
			This.attr("disabled", true);
			let pwd = forge_sha256(name + val);
			let data = [{
				action: this.obj.default_db,
				database: "main",
				sql: "update @.manager set @.pwd=" + Tool.rpsql(pwd) + " where @.id=" + id,
			}]
			Tool.ajax.a01(data, this.c02, this, This);
		}
	},
}
fun.a01();
//c01: function () {
// 	let pre_username, pre_pwd, pre_state, txt, GroupID = $("#GroupID").val()
// 	pre_username = $("#pre_username").val()
// 	pre_pwd = $("#pre_pwd").val()
// 	pre_state = $("[name='pre_state']:checked").val();
// 	let Sex = $("[name='pre_sex']:checked").val(); if (!Sex) { Sex = "男" }
// 	if (pre_username != "") {
// 		txt = '""<r: db="sqlite.main">update @.manager set @.des=\'' + $("#des").val() + '\',@.email=\'' + $("#email").val() + '\',@.realname=\'' + $("#realname").val() + '\',@.telphone=\'' + $("#telphone").val() + '\',@.Sex=\'' + Sex + '\',@.GroupID=' + GroupID + ',@.name=\'' + pre_username + '\',@.pwd=\'' + forge_sha256(pre_username + pre_pwd) + '\',@.state=' + pre_state + ' where @.id=' + obj.arr[4] + '</r:>';
// 		Tool.ajax.a01(txt, 1, this.c02, this);
// 	}
// 	else { alert("用户名或密码为空！"); }
// },
// c02: function (t) {
// 	if (t == "") {
// 		alert('修改成功！'); location.reload();
// 	}
// 	else { alert(txt); }
// }