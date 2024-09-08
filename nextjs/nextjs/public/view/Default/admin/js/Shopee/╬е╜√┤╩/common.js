Object.assign(Tool, {
  header: function (jsFile) {
    let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'\')"'+ (!jsFile ? ' class="active"' : '') + '>【客优云】违禁词</div>\
          <div onclick="Tool.main(\'?jsFile=js01\')"'+ (jsFile == "js01" ? ' class="active"' : '') + '>【店小秘】违禁词</div>\
        </header>'
    return html;
  },
})