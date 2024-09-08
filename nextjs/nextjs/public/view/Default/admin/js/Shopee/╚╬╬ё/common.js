'use strict';
Object.assign(Tool, {
    header2: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>日常任务</div>\
          <div onclick="Tool.main(\'?jsFile=js04\')"'+ (jsFile == "js04" ? ' class="active"' : '') + '>定时任务</div>\
        </header>'
        return html;
    },
})