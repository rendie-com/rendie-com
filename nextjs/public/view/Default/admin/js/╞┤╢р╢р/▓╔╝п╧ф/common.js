Object.assign(Tool, {
    header: function () {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()"'+ (obj.arr[3] == "-_-20" ? ' class="active"' : '') + '>【拼多多】主商品列表</div>\
            <div onclick="Tool.main(\'js03\')"'+ (obj.arr[3] == "js03" ? ' class="active"' : '') + '>次商品列表</div>\
        </header>'
        return html;
    },
})