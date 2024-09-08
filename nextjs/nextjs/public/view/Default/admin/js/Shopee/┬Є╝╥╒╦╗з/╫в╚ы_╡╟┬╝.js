'use strict';
var fun01 =
{
    a01: function (username, password) {
        this.c01($('input[name="loginKey"]'), username);
        this.c01($('input[name="password"]'), password);
        $('.vvOL40').click();
        $("title").html("已点登录");
    },
    c01: function (oo, value) {
        let casess = oo.get(0);
        casess.value = value;
        var event = document.createEvent('HTMLEvents');
        event.initEvent("input", true, true);
        event.eventType = 'message';
        casess.dispatchEvent(event);
    }
}