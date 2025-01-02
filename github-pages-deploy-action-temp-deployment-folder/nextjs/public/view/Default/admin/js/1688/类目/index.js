'use strict';
!function () {
    let path = "admin/js/1688/类目/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([
            'admin/js/1688/买家账户/common_登录.js',
            path + 'tmp_category0.js',
            path + 'tmp_category1.js',
            path + '采集类目.js']);
            break;
        case "js02": Tool.scriptArr(['admin/js/1688/买家账户/common_登录.js', path + '采集类目属性.js']); break;
        case "js03": Tool.scriptArr(['admin/js/Shopee/通用/把旧表复制到新表.js']); break;      
        default: Tool.scriptArr([path + '【1688】类目.js']); break;
    }
}();