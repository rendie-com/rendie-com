'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, { id: id, This: This });
        },
        a02: function (t, oo) {
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "select " + Tool.fieldAs("email,firstname,password,cookies") + " FROM @.freenom where @.id=" + oo.id,
            }]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, o2) {
            let o1 = t[0][0]
            o2.email = o1.email
            Tool.loginFreenom.a01(o1.email, o1.password, o1.firstname, JSON.parse(o1.cookies), o2.This, this.a04, this, o2)
        },
        a04: function (t, oo) {
            oo.This.html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + oo.id + ',$(this).parent())" title="点击登陆">' + oo.email + '</a>')
        }
    },
})