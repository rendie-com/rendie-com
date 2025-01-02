'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (mode, id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, [mode, id, This]);
        },
        a02: function (t, arr) {
            let str = '\
            {<r:github db="sqlite.tool" size=1 where=" where @.id='+ arr[1] + '">\
              "name":"<:name tag=js/>",\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:github>}';
            Tool.ajax.a01(str, 1, this.a03, this, arr);
        },
        a03: function (oo, arr) {
            arr.push(oo.username);
            if (arr[0] != 1) {
                oo.cookies = 0;
            }
            Tool.loginGithub.a01(oo.username, oo.password, oo.cookies, oo.name, arr[2], this.a04, this, arr);
        },
        a04: function (t, arr) {
            if (arr[0] == 1) {
                arr[2].html('*<a href="javascript:;" onclick="Tool.SignIn.a01(1,' + arr[1] + ',$(this).parent())" title="点击登陆">' + arr[3] + '</a>')
            }
            else {
                arr[2].html('<a class="dropdown-item pointer">*正常登陆</a>')
            }

        }
    }
})