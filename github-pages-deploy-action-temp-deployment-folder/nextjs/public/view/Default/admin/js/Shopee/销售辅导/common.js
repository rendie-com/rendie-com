Object.assign(Tool, {
    header: function (jsFile) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()"'+ (!jsFile ? ' class="active"' : '') + '>【Shopee】最畅销商品</div>\
            <div onclick="Tool.main(\'js01\')"'+ (jsFile == "js01" ? ' class="active"' : '') + '>热门商品</div>\
            <div onclick="Tool.main(\'js02\')"'+ (jsFile == "js02" ? ' class="active"' : '') + '>相似商品</div>\
            <div onclick="Tool.main(\'js04\')"'+ (jsFile == "js04" ? ' class="active"' : '') + '>热门关键词</div>\
        </header>'
        return html;
    },
})