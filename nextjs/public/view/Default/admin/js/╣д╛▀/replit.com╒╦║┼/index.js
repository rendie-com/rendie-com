'use strict';
!function () {
    //obj.params.jsFile         选择JS文件
    let path = "admin/js/工具/replit.com账号/"
    let loginUrl = path + 'common_登录.js';
    let githubLogin = 'admin/js/工具/github.com账号/common_登录.js'
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr(['admin/js/工具/腾讯企业邮箱/common_登录.js', path + '企业邮箱注册账号.js']); break;
        case "js02": Tool.scriptArr([path + '修改.js']); break;
        case "js03": Tool.scriptArr([loginUrl, githubLogin, path + '同步信息.js']); break;
        case "js04": Tool.scriptArr(['admin/js/sys/base64.js', path + 'common.js', path + 'sh文件编码解码.js']); break;
        case "js05": Tool.scriptArr(['admin/js/sys/base64.js', loginUrl, githubLogin, path + 'Xray/安装Xray/index.js']); break;
        case "js06": Tool.scriptArr(['../../plugins/qrcodejs-master/qrcode.min.js', 'admin/js/sys/base64.js', '../../plugins/clipboard.js-master/dist/clipboard.min.js', path + 'Xray/查看Xray配置.js']); break;
        case "js07": Tool.scriptArr(['admin/js/sys/base64.js', path + 'common.js', path + '节点转换.js']); break;
        case "js08": Tool.scriptArr(['admin/js/sys/base64.js', loginUrl, githubLogin, path + 'Xray/修复Xray.js']); break;
        case "js09": Tool.scriptArr([path + '从github.com获取已授权账号.js']); break;
        case "js10": Tool.scriptArr(['admin/js/sys/base64.js', loginUrl, githubLogin, path + 'rendie网站/部署rendie网站.js']); break;
        case "js11": Tool.scriptArr(['admin/js/sys/base64.js', loginUrl, githubLogin, path + 'rendie网站/修复rendie网站.js']); break;
        default: Tool.scriptArr([loginUrl, githubLogin, path + 'common.js', path + '首页.js']); break;
    }
}(); 
