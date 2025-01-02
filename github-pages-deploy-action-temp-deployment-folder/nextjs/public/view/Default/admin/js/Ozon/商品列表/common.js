'use strict';
Object.assign(Tool, {
    header: function () {
        let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main()"'+ (obj.arr[3] == "-_-20" ? ' class="active"' : '') + '>【Ozon】商品列表</div>\
          <div onclick="Tool.main(\'js04\')"'+ (obj.arr[3] == "js04" ? ' class="active"' : '') + '>图片</div>\
        </header>'
        return html;
    },
})