'use strict';
Object.assign(Tool, {
    aliexpressDefaultLogin: {
        a01: function (next, This, t) {
            let arr = [next, This, t]
            let str = '\
            {<r:buyer db="sqlite.aliexpress" size=1 where=" where @.isDefault=1">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}'
            $("state").html("正在获取默认账号信息")
            Tool.ajax.a01(str, 1, this.a02, this, arr)
        },
        a02: function (oo, arr) {
            Tool.verifyAliexpressUser.a01(oo.username, oo.password, oo.cookies, $("#state"), this.a03, this, arr)
        },
        a03: function (isNewTab, arr) {


            alert("wwww666666666wwwwwww")


        }

    },
})
