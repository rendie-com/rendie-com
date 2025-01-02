Object.assign(Tool, {
    header: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()"'+ (!jsFile? ' class="active"' : '') + '>【Shopee】商品</div>\
            <div onclick="Tool.main(\'js01\')"'+ (jsFile == "js01" ? ' class="active"' : '') + '>营销</div>\
        </header>'
        return html;
    },
})