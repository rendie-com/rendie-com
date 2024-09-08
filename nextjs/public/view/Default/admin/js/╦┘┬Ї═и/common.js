'use strict';
Object.assign(Tool, {
    aliexpressLogin: {
        obj: {
            B1: 1, B2: 0,//采购账号进度（因为每次访问商品，都必须命账号，才能访问。）
        },
        a01: function (B1) {
            this.obj.B1 = B1;
            let html = '{\
            <r:buyer db="sqlite.aliexpress" page=2 size=1 where=" where @.isdefault=0 order by @.sort asc,@.id asc">\
                "username":"<:username/>",\
                "password":"<:password/>",\
                "cookies":<:cookies tag=0/>,\
            </r:buyer>\
            "B2":'+ (this.obj.B2 == 0 ? '<@count/>' : 0) + '\
            }';
            Tool.ajax.a01(html, B1, this.a02, this)
        },
        a02: function (oo) {
            if (this.obj.B2 == 0) this.obj.B2 = oo.B2;
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a03, this, null, oo)
        },
        a03: function (oo) {
            Tool.verifyAliexpressUser.a01(oo.username, oo.password, oo.cookies, $("#state"), this.a04, this)
        },
        a04: function () {
            location.reload()
        },
        //////////////////////////////////////////////////////////////
        //滑块验证
        d01: function () {
            Tool.ajax.text("/view/Default/admin/js/速卖通/common_注入_移动滑块_iframe.js", this.d02, this);
        },
        d02: function (t) {
            $("#state").html("正在填写账号密码,再点登陆。");
            gg.tabs_executeScript_indexOf(2, null, t + "\nfun.a01()", 'AliExpress - Online Shopping for Popular',true, this.d03, this);//请拖动滑块
        },
        d03: function () {
            gg.highlightTab(1, this.d04, this)
        },
        d04: function () {
            Tool.open(6, this.obj.B1)
        },

    },
    SignIn:
    {
        a01: function (id, This) {
            This.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
            gg.isRD(this.a02, this, [id, This]);
        },
        a02: function (t, arr) {
            let str = '\
            {<r:buyer db="sqlite.aliexpress" size=1 where=" where @.id='+ arr[0] + '">\
              "username":"<:username tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:buyer>}'
            Tool.ajax.a01(str, 1, this.a03, this, arr)
        },
        a03: function (oo, arr) {
            arr[2] = oo.username;
            Tool.verifyAliexpressUser.a01(oo.username, oo.password, oo.cookies, arr[1], this.a04, this, arr)
        },
        a04: function (isTab, arr) {
            //isTab     是否有打开新窗口
            if (isTab) {
                this.a05("", arr)
            }
            else {
                let url = "https://www.aliexpress.com/account/index.html"
                gg.tabs_remove_create_indexOf(2, url, '<title>', true,this.a05, this, arr);
            }
        },
        a05: function (t, arr) {
            arr[1].html('* <a href="javascript:;" onclick="Tool.SignIn.a01(' + arr[0] + ',$(this).parent())" title="点击登陆">' + arr[2] + '</a>')
        }
    },
})
