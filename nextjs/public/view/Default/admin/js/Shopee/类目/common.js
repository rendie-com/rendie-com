Object.assign(Tool, {
  header: function (jsFile) {
    let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'\')"'+ (jsFile == null ? ' class="active"' : '') + '>【Shopee】类目</div>\
          <div onclick="Tool.main(\'?jsFile=js03\')"'+ (jsFile == "js03" ? ' class="active"' : '') + '>属性名</div>\
        </header>'
    return html;
  },
})