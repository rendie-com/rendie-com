'use strict';
$(function () {
  //obj.params.jsFile     选择JS文件  
  let path = "admin/js/系统/系统账号/"
  switch (obj.params.jsFile) {
    case "js01":Tool.scriptArr(["../../plugins/forge-sha256-master/build/forge-sha256.min.js", path + '修改.js']);break;
    default: Tool.scriptArr([
      path + '首页.js'
    ]);
  }
});