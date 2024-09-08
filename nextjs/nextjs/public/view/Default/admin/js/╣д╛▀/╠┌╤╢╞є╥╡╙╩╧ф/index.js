'use strict';
!function () {
    //obj.params.jsFile     选择JS文件 
    let path = "admin/js/工具/腾讯企业邮箱/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '获取成员并修改密码.js']); break;
        case "js02": Tool.scriptArr([path + '修改.js']); break;
        case "js03": Tool.scriptArr([path + '设置成员别名.js']); break;
        default: Tool.scriptArr([path + 'common_登录.js', path + 'common.js', path + '首页.js']); break;
    }
}();