'use strict';
Object.assign(Tool, {
    OpenNotepad:
    {
        c30: function (val) {
            Tool.ajax.a01( '<.OpenNotepad(' + val + ')/>',1,this.c31, this);
        },
        c31: function (t) {
            Tool.at(t);
        }
    },
})