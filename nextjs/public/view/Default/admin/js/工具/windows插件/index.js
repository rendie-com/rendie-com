'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/工具/Windows插件/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        case "js02": Tool.scriptArr([path + 'common.js', path + '打开/index.js']); break;
        default: Tool.scriptArr([path + 'windows插件.js']); break;
    }
}();