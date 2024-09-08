'use strict';
!function () {
    //obj.params.jsFile     选择JS文件
    let path = "admin/js/Shopee/违禁词/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([
            path + 'common.js',
            path + '【店小秘】违禁词/index.js']);
            break;
        case "js02": Tool.scriptArr([path + '【客优云】违禁词/获取【客优云】的违禁词.js']); break;
        case "js03": Tool.scriptArr([path + '【店小秘】违禁词/获取【店小秘】的违禁词.js']); break;
        default: Tool.scriptArr([
            path + 'common.js',
            path + '【客优云】违禁词/index.js'
        ]);
    }
}();