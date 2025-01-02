'use strict';
var fun =
{
    a01: function (passwd) {
        $('a[ck="pswShow"]').get(0).dispatchEvent(this.c01('click', [0, 0]))//点修改
        this.a02(passwd);
    },
    a02: function (passwd) {
        $('input[name="passwd"]').val(passwd)//修改密码
        $('input[name="passwd2"]').val(passwd)//确认密码
        $('#iscpwdlogin').attr("checked", false)//用户重新登录时重设密码
        if ($("#wxtoken_show").attr("checked")) {//强制启用安全登录---如果启用了就关闭
            //因为启用了，就要绑定微信才能陆陆。
            $("#wxtoken_show").get(0).dispatchEvent(this.c01('click', [0, 0]))
            //(强制启用后，若该账号未启用安全登录，将关闭其客户端发信功能)
        }
        $(".btnSubmit").click();
    },
    c01: function (name, ArrXY) {
        return event = new MouseEvent(name,
            {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: ArrXY[0],
                clientY: ArrXY[1],
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                button: 0,
                relatedTarget: null,
            });
    },
}