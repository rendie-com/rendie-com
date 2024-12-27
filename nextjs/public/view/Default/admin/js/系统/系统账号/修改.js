'use strict';
var fun =
{
	obj: {
		DEFAULT_DB: "",
	},
	a01: function () {
		//obj.params.jsFile			选择JS文件
		//obj.params.id				选择JS文件
		this.a02()
	},
	a02: function () {
		let data = [{
			action: "process",
			fun: "env",
			name: "NEXTJS_CONFIG_DEFAULT_DB"
		}]
		Tool.ajax.a01(data, this.a03, this);
	},
	a03: function (t) {
		this.obj.DEFAULT_DB = t[0];
		Tool.ajax.a01(this.b02(t[0], obj.params.id), this.a04, this);
	},
	a04: function (t) {
		let oo = Tool.getObj(t[1], this.obj.DEFAULT_DB);
		let html = Tool.header(obj.params.return, '系统 &gt; 系统账号 &gt; 修改') + '\
		<div class="p-2">\
		<table class="table table-hover align-middle">\
			<tbody>\
			<tr>\
				<td class="w100 right">用户名：</td>\
				<td><input type="text" value="'+ oo.username + '" id="username" class="form-control" onblur="fun.c01($(this),\'' + oo.id + '\',\'username\')"/></td>\
				<td style="color:#FF0000">＊</td>\
				<td class="right">密码：</td>\
				<td><input type="password" value="" class="form-control" onblur="fun.c03($(this),\''+ oo.id + '\',$(\'#username\').val())"/></td>\
				<td style="color:#FF0000">＊</td>\
			</tr>\
			<tr>\
				<td class="right">是否激活：</td>\
				<td>\
					<div class="form-check form-check-inline">\
						<input class="form-check-input" type="radio" name="pre_islocked" id="pre_islocked-0"'+ (oo.islocked == 1 ? ' checked="checked"' : '') + ' value="1" onclick="fun.c01($(this),\'' + oo.id + '\',\'islocked\')">\
						<label class="form-check-label" for="pre_islocked-0">激活</label>\
					</div>\
					<div class="form-check form-check-inline">\
						<input class="form-check-input" type="radio" value="0" name="pre_islocked" id="pre_islocked-1"'+ (oo.islocked == 0 ? ' checked="checked"' : '') + ' onclick="fun.c01($(this),\'' + oo.id + '\',\'islocked\')">\
						<label class="form-check-label" for="pre_islocked-1">锁定</label>\
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
				<td><input type="text" value="'+ (oo.realname ? oo.realname : '') + '" id="realname" size="30" class="form-control"></td>\
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
				<td><input type="text" value="'+ (oo.telphone ? oo.telphone : '') + '" id="telphone" class="form-control"></td>\
				<td></td>\
				<td class="right">电子信箱：</li>\
				<td><input type="text" id="email" value="'+ (oo.email ? oo.email : '') + '" class="form-control"></td>\
				<td></td>\
			</tr>\
			<tr>\
				<td class="right">简要说明：</td>\
				<td colspan="5"><textarea id="des" rows="3" class="form-control">'+ (oo.des ? oo.des : '') + '</textarea></td>\
			</tr>\
			<tr>\
				<td class="right">token：</td>\
				<td colspan="5">\
				<textarea id="des" rows="5" class="form-control" disabled>'+ JSON.stringify({
			access_token: oo.access_token,
			expires_in: oo.expires_in,
			refresh_token: oo.refresh_token
		}, null, 2) + '</textarea>\
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
	b02: function (DEFAULT_DB, id) {
		if (DEFAULT_DB == "dynamodb") {
			return this.b04(DEFAULT_DB, id)
		}
		else {
			return this.b03(DEFAULT_DB, id)
		}
	},
	b03: function (DEFAULT_DB, id) {
		return [{
			action: DEFAULT_DB,
			database: "main",
			sql: "select " + Tool.fieldAs("id,groupname") + " FROM @.usergroup",
		}, {
			action: DEFAULT_DB,
			database: "main",
			sql: "select " + Tool.fieldAs("access_token,expires_in,refresh_token,id,realname,groupid,logintime,loginip,logintimes,islocked,username,telphone,email,sex,des") + " FROM @.manager" + " where @.id=" + id
		}]
	},
	b04: function (DEFAULT_DB, id) {
		return [{
			action: DEFAULT_DB,
			fun: "scan",
			params: {
				ProjectionExpression: 'groupid,groupname', // 只获取这些字段
				TableName: 'main_usergroup',
			},
		},
		{
			action: DEFAULT_DB,
			fun: "getItem",
			params: {
				TableName: 'main_manager',
				ProjectionExpression: 'access_token,expires_in,refresh_token,id,realname,groupid,logintime,loginip,logintimes,islocked,username,telphone,email,sex,des', // 只获取这些字段
				Key: {
					id: { S: id }
				}
			},
		}]
	},
	/////////////////////////////////////////////////////
	c01: function (This, id, name) {
		This.attr("disabled", true);
		let data = [], DEFAULT_DB = this.obj.DEFAULT_DB;
		if (DEFAULT_DB == "dynamodb") {
			data = [{
				action: DEFAULT_DB,
				fun: "updateItem",
				params: {
					TableName: 'main_manager',
					Key: { id: { S: id } },
					UpdateExpression: 'SET #attrName = :attrValue',
					ExpressionAttributeNames: { '#attrName': name },
					ExpressionAttributeValues: { ':attrValue': { S: This.val() } }
				}
			}]
		}
		else {
			data = [{
				action: DEFAULT_DB,
				database: "main",
				sql: "update @.manager set @." + name + "=" + Tool.rpsql(This.val()) + " where @.id=" + id,
			}]
		}
		Tool.ajax.a01(data, this.c02, this, This);
	},
	c02: function (t, This) {
		if (t[0] == "更新成功" || t[0].length == 0) {
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
			let data = [], DEFAULT_DB = this.obj.DEFAULT_DB, pwd = forge_sha256(name + val);;
			if (DEFAULT_DB == "dynamodb") {
				data = [{
					action: DEFAULT_DB,
					fun: "updateItem",
					params: {
						TableName: 'main_manager',
						Key: { id: { S: id } },
						UpdateExpression: 'SET #attrName = :attrValue',
						ExpressionAttributeNames: { '#attrName': "pwd" },
						ExpressionAttributeValues: { ':attrValue': { S: pwd } }
					}
				}]
			}
			else {
				data = [{
					action: DEFAULT_DB,
					database: "main",
					sql: "update @.manager set @.pwd=" + Tool.rpsql(pwd) + " where @.id=" + id,
				}]
			}
			Tool.ajax.a01(data, this.c02, this, This);
		}
	},
}
fun.a01();




//c01: function () {
// 	let pre_username, pre_pwd, pre_islocked, txt, GroupID = $("#GroupID").val()
// 	pre_username = $("#pre_username").val()
// 	pre_pwd = $("#pre_pwd").val()
// 	pre_islocked = $("[name='pre_islocked']:checked").val();
// 	let Sex = $("[name='pre_sex']:checked").val(); if (!Sex) { Sex = "男" }
// 	if (pre_username != "") {
// 		txt = '""<r: db="sqlite.main">update @.manager set @.des=\'' + $("#des").val() + '\',@.email=\'' + $("#email").val() + '\',@.realname=\'' + $("#realname").val() + '\',@.telphone=\'' + $("#telphone").val() + '\',@.Sex=\'' + Sex + '\',@.GroupID=' + GroupID + ',@.name=\'' + pre_username + '\',@.pwd=\'' + forge_sha256(pre_username + pre_pwd) + '\',@.islocked=' + pre_islocked + ' where @.id=' + obj.arr[4] + '</r:>';
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