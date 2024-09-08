'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, [id, This]);
        },
        a02: function (t, arr) {
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "select " + Tool.fieldAs("username,password,cookies,sid") + " FROM @.exmail  where @.id=" + arr[0],
            }]
            Tool.ajax.a01(data, this.a03, this, arr)
        },
        a03: function (t, arr) {
            let oo = t[0][0];
            arr.push(oo.username);
            Tool.loginExmail.a01(2, oo.username, oo.password, oo.sid, JSON.parse(oo.cookies), arr[1], this.a04, this, arr)
        },
        a04: function (sid, arr) {
            //【进入收件箱】页面
            let url = "https://exmail.qq.com/cgi-bin/mail_list?sid=" + sid + "&page=0&folderid=1&showinboxtop=1&loc=today,,,6"
            gg.tabs_remove_create_indexOf(2, url, "<title>腾讯企业邮箱</title>", true, this.a05, this, arr)
        },
        a05: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        }
    },
})