'use strict';
Object.assign(Tool, {
    header: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>replit.com账号</div>\
            <div onclick="Tool.main(\'?jsFile=js04\')"'+ (jsFile == "js04" ? ' class="active"' : '') + '>sh文件编码解码</div>\
            <div onclick="Tool.main(\'?jsFile=js07\')"'+ (jsFile == "js07" ? ' class="active"' : '') + '>节点转换</div>\
        </header>'
        return html;
    },
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, {id:id, This:This});
        },
        a02: function (t, oo) {
            let data = [{
                action: "sqlite",
                database: "tool",
                sql: "select " + Tool.fieldAs("username,password,loginmode,cookies") + " FROM @.replit  where @.id="+ oo.id,
              }]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, o2) {            
            let o1=t[0][0]
            o2.username=o1.username
            Tool.loginReplit.a01(o1.username, o1.password, JSON.parse(o1.cookies), o1.loginmode, o2.This, this.a04, this, o2)
        },
        a04: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        }
    },
})