'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/速卖通/采购账户/", urlArr
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        case "js02": Tool.scriptArr(['admin/js/工具/腾讯企业邮箱/common_登录.js', path + '企业邮箱注册账号.js']); break;
        default:
            urlArr = [
                "admin/js/速卖通/common.js",
                "admin/js/速卖通/common_验证登录.js",
                path + "首页.js"
            ]
            Tool.scriptArr(urlArr); break;
    }
}();