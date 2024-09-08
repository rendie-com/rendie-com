'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/TikTok/卖家账户/"
    let loginUrl = path + 'common_登录.js';
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        default: Tool.scriptArr([loginUrl, path + 'common.js', path + '首页.js']); break;
    }
}();