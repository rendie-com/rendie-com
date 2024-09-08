'use strict';
!function () {
    //obj.params.jsFile     选择JS文件  
    let path = "admin/js/Shopee/订单/"
    let loginPath = [
        "admin/js/Shopee/common.js",
        "admin/js/Shopee/商品/common_login.js",
        "admin/js/Shopee/卖家账户/common_登录.js"
    ]
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr(loginPath.concat([
            path + '获取订单信息/common.js',
            path + '获取订单信息/common_更新或添加订单.js',
            path + '获取订单信息/index.js'
        ])); break;
        case "js02": Tool.scriptArr(loginPath.concat([
            path + 'common.js',
            path + '订单详情/index.js'
        ])); break;
        default: Tool.scriptArr(["admin/js/Shopee/common.js",path + 'common.js', path + '首页.js']);
    }
}();