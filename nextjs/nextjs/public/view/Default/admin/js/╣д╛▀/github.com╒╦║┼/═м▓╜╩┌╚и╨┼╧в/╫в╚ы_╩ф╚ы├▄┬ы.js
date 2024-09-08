'use strict';
var fun =
{
    a01: function (password) {
        this.c01($('#sudo_password'), password);        
        $('button[data-view-component="true"]').click();
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