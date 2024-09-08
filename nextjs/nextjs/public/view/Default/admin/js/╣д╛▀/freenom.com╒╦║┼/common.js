Object.assign(Tool, {
    header: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>【freenom.com】账号</div>\
            <div onclick="Tool.main(\'?jsFile=js02\')"'+ (jsFile == "js02" ? ' class="active"' : '') + '>域名</div>\
        </header>'
        return html;
    },
})