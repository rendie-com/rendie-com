'use strict';
var fun =
{
    a01: function (username, password) {
        this.c01($('input[name="login"]'), username);
        this.c01($('input[name="password"]'), password);
        $('input[name="commit"]').click();
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