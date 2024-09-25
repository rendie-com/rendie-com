'use strict';
!function () {
    //obj.params.jsFile     选择JS文件 
    let path = "admin/js/工具/cpolar.com账号/"
    let loginUrl = path + 'common_登录.js';
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr(['admin/js/工具/腾讯企业邮箱/common_登录.js', path + '企业邮箱注册账号.js']); break;
        case "js02": Tool.scriptArr([path + '修改.js']); break;
        case "js03": Tool.scriptArr([loginUrl, path + '修改密码.js']); break;
        default: Tool.scriptArr([loginUrl, path + 'common.js', path + '首页.js']); break;
    }
}();