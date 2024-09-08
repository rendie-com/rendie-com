'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/TikTok/类目/"
    let loginUrl = 'admin/js/TikTok/卖家账户/common_登录.js';
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([loginUrl, 'admin/js/TikTok/common_login.js', path + '采集类目.js']); break;
        case "js02": Tool.scriptArr([loginUrl, 'admin/js/TikTok/common_login.js', path + '采集类目属性.js']); break;
        default: Tool.scriptArr([path + '类目.js']);
    }
}();