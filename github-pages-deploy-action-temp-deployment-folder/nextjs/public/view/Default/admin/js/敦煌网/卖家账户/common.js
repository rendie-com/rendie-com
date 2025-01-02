'use strict';
Object.assign(Tool, {
    SignIn:
    {
        obj: {},
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, [id, This]);
        },
        a02: function (t, arr) {
            let str = '\
            {<r:seller db="sqlite.dhgate" size=1 where=" where @.id='+ arr[0] + '">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:seller>}'
            Tool.ajax.a01(str, 1, this.a03, this, arr)
        },
        a03: function (oo, arr) {
            arr.push(oo.username);
            arr.push(oo.id);
            Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a04, this, arr)
        },
        a04: function (isNewTab, arr) {
            if (isNewTab) {
                var url = "http://seller.dhgate.com/mydh/index.do"
                gg.tabs_remove_create_indexOf(2, url, '<title> 我的摘要</title>',false, this.a05, this, arr)
            }
            else {
                this.a05("", arr)
            }
        },
        a05: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        },
    }
})