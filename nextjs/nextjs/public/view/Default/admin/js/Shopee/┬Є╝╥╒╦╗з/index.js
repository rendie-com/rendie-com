'use strict';
!function () {    
    let path = "admin/js/Shopee/买家账户/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        case "js02": Tool.scriptArr(['admin/js/Shopee/通用/把旧表复制到新表.js']); break;      
        default: Tool.scriptArr([
            path + 'common_登录.js',
            path + 'common.js',
            path + '首页.js'
        ]); break;
    }
}();