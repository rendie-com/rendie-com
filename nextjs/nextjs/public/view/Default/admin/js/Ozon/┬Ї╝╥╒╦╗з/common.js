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
            {<r:seller db="sqlite.ozon" size=1 where=" where @.id='+ arr[0] + '">\
              "sellerId":"<:sellerId tag=js/>",\
              "email":"<:email tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:seller>}'
            Tool.ajax.a01(str, 1, this.a03, this, arr)
        },
        a03: function (oo, arr) {
            arr.push(oo.email);
            Tool.loginOzon.a01(oo.email, oo.sellerId, oo.cookies, arr[1], this.a04, this, arr)
        },
        a04: function (t, arr) {
            let url = "https://seller.ozon.ru/app/dashboard/main"
            arr[1].html("正在打开页面...");
            gg.tabs_remove_create_indexOf(2, url, '欢迎来到Ozon Seller',false, this.a05, this, arr)
        },
        a05: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        }
    },
})