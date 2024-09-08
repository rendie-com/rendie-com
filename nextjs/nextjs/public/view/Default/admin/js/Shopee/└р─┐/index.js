'use strict';
!function () {
    let path = "admin/js/Shopee/类目/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '【shopee】类目/采集类目.js']); break;
        case "js02": Tool.scriptArr([path + '【shopee】类目/采集类目属性.js']); break;
        case "js03": Tool.scriptArr([path + "common.js", path + '属性名/index.js']); break;
        case "js04": Tool.scriptArr([path + '属性名/从类目属性中提取属性名.js']); break;
        default: Tool.scriptArr([path + "common.js", path + '【shopee】类目/index.js']);
    }
}();