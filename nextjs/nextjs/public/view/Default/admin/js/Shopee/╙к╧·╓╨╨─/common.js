Object.assign(Tool, {
    header: function (jsFile,site) {
        let html = '\
        <header class="panel-heading">\
            <div onclick="Tool.main(\'?site='+site+'\')"'+ (!jsFile ? ' class="active"' : '') + '>【Shopee】营销中心</div>\
            <div onclick="Tool.main(\'?jsFile=js02&site='+site+'\')"'+ (jsFile == "js02" ? ' class="active"' : '') + '>优惠券</div>\
            <div onclick="Tool.main(\'?jsFile=js06&site='+site+'\')"'+ (jsFile == "js06" ? ' class="active"' : '') + '>折扣</div>\
            <div onclick="Tool.main(\'?jsFile=js14&site='+site+'\')"'+ (jsFile == "js14" ? ' class="active"' : '') + '>加购优惠</div>\
            <div onclick="Tool.main(\'?jsFile=js10&site='+site+'\')"'+ (jsFile == "js10" ? ' class="active"' : '') + '>店内秒杀</div>\
        </header>'
        return html;
    },
})