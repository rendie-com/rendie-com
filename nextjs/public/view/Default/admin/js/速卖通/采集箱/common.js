Object.assign(Tool, {
    header: function (val) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main()"'+ (val == "-_-20" ? ' class="active"' : '') + '>商品</div>\
            <div onclick="Tool.main(\'xxxx\')"'+ (val == "xxx" ? ' class="active"' : '') + '>运费</div>\
            <div onclick="Tool.main(\'js05\')"'+ (val == "js05" ? ' class="active"' : '') + '>商品审核</div>\
            <div onclick="Tool.main(\'js06\')"'+ (val == "js06" ? ' class="active"' : '') + '>店铺</div>\
            <div onclick="Tool.main(\'js07\')"'+ (val == "js07" ? ' class="active"' : '') + '>禁限</div>\
            <div onclick="Tool.main(\'js25\')"'+ (val == "js25" ? ' class="active"' : '') + '>折扣</div>\
        </header>'
        return html;
    },
})