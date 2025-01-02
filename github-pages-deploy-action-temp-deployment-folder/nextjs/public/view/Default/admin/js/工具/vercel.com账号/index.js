'use strict';
!function () {
    //obj.params.jsFile     选择JS文件 
    let path = "admin/js/工具/vercel.com账号/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr(['admin/js/工具/腾讯企业邮箱/common_登录.js', 'admin/js/工具/github.com账号/common_登录.js', path + '用github.com账号去注册账号.js']); break;
        case "js02": Tool.scriptArr([path + '修改.js']); break;
        default: Tool.scriptArr(['admin/js/工具/github.com账号/common_登录.js', path + 'common.js', path + '首页.js']); break;
    }
}();