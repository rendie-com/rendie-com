'use strict';
!function () {
    //obj.params.jsFile      选择JS文件
    let path = "admin/js/工具/freenom.com账号/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '账号/修改.js']); break;
        case "js02": Tool.scriptArr([path + 'common.js', path + '域名/index.js']); break;
        case "js03": Tool.scriptArr([
            path + '账号/common_登录.js',
            path + '域名/获取所有域名.js'
        ]); break;
        default: Tool.scriptArr([
            path + 'common.js',
            path + '账号/common.js',
            path + '账号/common_登录.js',
            path + '账号/index.js'
        ]); break;
    }
}();