Object.assign(Tool, {
  header2: function (jsFile, site) {
    let html = '\
        <header class="panel-heading">\
          <div onclick="Tool.main(\'?site='+ site + '\')"' + (!jsFile ? ' class="active"' : '') + '>商品</div>\
          <div onclick="Tool.main(\'?jsFile=js02&site='+ site + '\')"' + (jsFile == "js02" ? ' class="active"' : '') + '>店铺</div>\
          <div onclick="Tool.main(\'?jsFile=js05\')"' + (jsFile == "js05" || jsFile == "js12" ? ' class="active"' : '') + '>粉丝</div>\
        </header>'
    return html;
  },
  header4: function (site, mode) {
    let html = '\
      <ul class="makeHtmlTab">\
          <li'+ (site == "tw" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=js05&site=tw\')">台湾虾皮</li>\
          <li'+ (site == "my" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=js05&site=my\')">马来西亚</li>\
          <li'+ (site == "br" ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=js05&site=br\')">巴西</li>\
      </ul>\
      <div style="top:6px;position:relative;">'+ this.header4_b01() + '</div>\
      <ul class="makeHtmlTab" style="padding-left:20px;">\
          <li '+ (mode == 1 ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=js05&site=' + site + '\')">粉丝统计</li>\
          <li '+ (mode == 2 ? ' class="hover"' : '') + ' onclick="Tool.main(\'?jsFile=js12&site=' + site + '\')">粉丝信息</li>\
      </ul>'
    return html;
  },
  header4_b01: function () {
    return '\
    <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
    <ul class="dropdown-menu">\
        <li onClick="Tool.openR(\'?jsFile=js06&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*从店铺中获取粉丝</a></li>\
        <li onClick="Tool.openR(\'?jsFile=js07&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*取消关注和关注</a></li>\
        <li onClick="Tool.openR(\'?jsFile=js08&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取关注我的用户</a></li>\
        <li onClick="Tool.openR(\'?jsFile=js09&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取我关注的用户</a></li>\
        <li onClick="Tool.openR(\'?jsFile=js10&table=table&database=shopee/采集箱/粉丝/' + obj.params.site + '&count=100&field=rd_userid\');"><a class="dropdown-item pointer">把一个db文件拆分成多个db文件</a></li>\
    </ul>'
  },
})