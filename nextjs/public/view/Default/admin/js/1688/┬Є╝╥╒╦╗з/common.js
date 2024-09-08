'use strict';
Object.assign(Tool, {
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, [id, This]);
        },
        a02: function (t, arr) {
            let str = '\
            {<r:buyer db="sqlite.1688" size=1 where=" where @.id='+ arr[0] + '">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}'
            Tool.ajax.a01(str, 1, this.a03, this, arr)
        },
        a03: function (oo, arr) {
            arr.push(oo.username);
            Tool.login1688.a01(oo.username, oo.password, oo.cookies, arr[1], this.a04, this, arr)
        },
        a04: function (t, arr) {
            let url = "https://work.1688.com/home/page/index.htm?tracelog=login_target_is_blank_1688"
            arr[1].html("正在打开页面...");
            gg.tabs_remove_create_indexOf(2, url, '%3d' + arr[2] + '%7c',false, this.a05, this, arr)
        },
        a05: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        }
    },
})