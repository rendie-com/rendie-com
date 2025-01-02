Object.assign(Tool, {
    login: {
        a01: function (next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.isRD(this.a02, this, oo);
        },
        a02: function (t, oo) {
            $("#state").html("正在获得配置参数");
            let str = '\
            {<r:seller db="sqlite.tiktok" size=1>\
              "email":"<:email tag=js/>",\
              "password":"<:password tag=js/>",\
              "cookies":<:cookies tag=0/>\
            </r:seller>}'
            Tool.ajax.a01(str, 1, this.a03, this, oo)
        },
        a03: function (oo, o2) {
            $("#email").html(oo.email);
            Tool.loginTikTok.a01(oo.email, oo.password, oo.cookies, $("#state"), this.a04, this, o2)
        },
        a04: function (t, oo) {
            Tool.apply(null, oo.next, oo.This, oo.t);
        },
    },
})