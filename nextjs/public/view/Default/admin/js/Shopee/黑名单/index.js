'use strict';
!function () {
    //obj.params.jsFile     选择JS文件   
    let path = "admin/js/Shopee/黑名单/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '获取【客优云】的黑名单.js']); break;
        default: Tool.scriptArr([path + '首页.js']);
    }
}();