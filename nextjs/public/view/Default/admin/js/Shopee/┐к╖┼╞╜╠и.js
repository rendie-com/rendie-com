'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile     选择JS文件  
    switch (obj.params.jsFile) {
      case "js02": Tool.scriptArr(['admin/js/敦煌网/开放平台/类目.js']); break;
      default: this.a02();
    }
  },
  a02: function (data) {
    let html = '\
        <header class="panel-heading">Shopee -&gt; 开放平台</header>\
        <div class="p-2">\
		    <table class="table table-hover">\
        <tbody>\
          <tr>\
            <td class="w150 right">账号：</td>\
            <td class="w350"></td>\
            <td></td>\
          </tr>\
          <tr>\
            <td class="right">密码：</td>\
            <td></td>\
            <td></td>\
          </tr>\
          <tr>\
            <td class="right">入口：</td>\
            <td colspan="2"><a href="https://open.shopee.com/" target="_blank">https://open.shopee.com/</a></td>\
          </tr>\
        </tbody>\
        </table>\
		</div>'
    Tool.html(null, null, html)
  }
}
$(function () {
  fun.a01();
})
