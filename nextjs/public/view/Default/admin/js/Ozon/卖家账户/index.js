'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/Ozon/卖家账户/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        default:
            Tool.scriptArr([
                'admin/js/工具/腾讯企业邮箱/common_登录.js',
                path + 'common_登录.js',
                path + 'common.js',
                path + '首页.js']); break;
    }
}();