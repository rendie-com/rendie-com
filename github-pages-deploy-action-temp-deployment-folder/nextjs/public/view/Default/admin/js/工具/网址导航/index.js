'use strict';
$(function () {
  //obj.params.jsFile     选择JS文件  
  let path = "admin/js/工具/网址导航/"
  switch (obj.params.jsFile) {
    case "js01": Tool.scriptArr([path + '修改.js']); break;
    default: Tool.scriptArr([path + '首页.js']);
  }
});