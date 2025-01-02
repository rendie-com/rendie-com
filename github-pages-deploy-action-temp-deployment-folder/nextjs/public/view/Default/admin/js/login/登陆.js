'use strict';
var fun =
{
    c01: function () {
        let arr = [$("[name='luci_username']").val(), $("[name='luci_password']").val()]
        if (arr[0] == '') { alert('请输入登录用户名!'); return false; }
        if (arr[1] == '') { alert('请输入登录密码!'); return false; }
        var time = Tool.gettime("");//加上时间，是为了每次结果不一样，同时与服务器时间比较
        var data = {
            time: time,
            name: arr[0],
            pwd: forge_sha256(time + forge_sha256(arr[0] + arr[1])),
            action: "getToken"
        }
        Tool.getToken.a01(data, this.c02, this);
    },
    c02: function (oo) {
        if (oo.status == "success") {
            if (!window.localStorage) {
                alert("你的浏览器不支持localstorage，无法登陆。");
            }
            else {
                var storage = window.localStorage;
                storage.setItem("username", oo.username);
                storage.setItem("access_token", oo.access_token);
                storage.setItem("expires_in", oo.expires_in);
                storage.setItem("refresh_token", oo.refresh_token);
                top.location.href = window.location.search.substring(1);
            }
        }
        else {
            Tool.pre(oo)
            if ($(".warning").length == 0) {
                //$(".container").before('<div class="alert-message warning" style="display: none;"><p>' + JSON.stringify(oo) + '</p></div> ')

            }
            else {
                //$(".warning").hide().html('<p>' + JSON.stringify(oo) + '</p>');
            }
            $(".warning").slideDown(200);
        }
    }
}
//回车登陆
document.onkeydown = function (e) { let ev = document.all ? window.event : e; if (ev.keyCode == 13) { fun.c01() } }
