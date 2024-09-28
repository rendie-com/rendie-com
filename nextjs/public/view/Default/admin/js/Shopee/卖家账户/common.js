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
                database: "shopee/卖家账户",
                sql: "select " + Tool.fieldAs("username,password,localstorage,cookies") + " FROM @.table where @.id=" + oo.id,
            }]
            Tool.ajax.a01(data, this.a03, this, oo)
        },
        a03: function (t, o1) {
            let oo = t[0][0]
            o1.username = oo.username;
            let cookies=oo.cookies?JSON.parse(oo.cookies):cookies
            ///////////////////////////////
            Tool.loginShopee.a01(oo.username, oo.password, cookies, JSON.parse(oo.localstorage), o1.This, this.a04, this, o1)
        },
        a04: function (t, oo) {
            let url = "https://seller.shopee.cn/"
            oo.This.html("正在打开页面...");
            gg.tabs_remove_create_indexOf(2, url, '> ' + oo.username + ' <', false, this.a05, this, oo)
        },
        a05: function (t, oo) {
            oo.This.html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + oo.id + ',$(this).parent(),\'' + "sqlite" + '\')" title="点击登陆">' + oo.username + '</a>')
        }
    },
})