Object.assign(Tool, {
  header2: function (jsFile,site) {
    let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'?site='+site+'\')"'+ (!jsFile ? ' class="active"' : '') + '>商品</div>\
          <div onclick="Tool.main(\'?jsFile=js02&site='+site+'\')"'+ (jsFile == "js02" ? ' class="active"' : '') + '>店铺</div>\
          <div onclick="Tool.main(\'?jsFile=js05&site='+site+'\')"'+ (jsFile == "js05" ? ' class="active"' : '') + '>粉丝</div>\
        </header>'
    return html;
  },  
})