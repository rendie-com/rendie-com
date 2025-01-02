'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            let oo = {
                id: id,
                This: This,
            }
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "select " + Tool.fieldAs("username,password,cookies") + " FROM @.cpolar where @.id=" + oo.id,
            }]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, o1) {
            let oo=t[0][0]
            o1.username = oo.username
            Tool.loginCpolar.a01(oo.username, oo.password, JSON.parse(oo.cookies), o1.This, this.a04, this, o1)
        },
        a04: function (t, oo) {
            oo.This.html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + oo.id + ',$(this).parent())" title="点击登陆">' + oo.username + '</a>')
        }
    },
})