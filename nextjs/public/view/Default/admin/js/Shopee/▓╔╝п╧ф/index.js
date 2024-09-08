'use strict';
$(function () {
    //obj.params.jsFile     选择JS文件  
    let path = "admin/js/Shopee/采集箱/"
    let loginPath = ["admin/js/Shopee/common.js", "admin/js/Shopee/商品/common_login.js", "admin/js/Shopee/卖家账户/common_登录.js"]
    switch (obj.params.jsFile) {
        case "js01":
            Tool.scriptArr(loginPath.concat([
                path + 'config_tw.js',
                path + 'config_my.js',
                path + 'config_br.js',
                path + '商品/采集商品.js'
            ]));
            break;
        case "js02": Tool.scriptArr([
            "admin/js/Shopee/common.js",
            path + 'common.js',
            path + '店铺/index.js'
        ]); break;
        case "js03": Tool.scriptArr(loginPath.concat([
            path + 'config_tw.js',
            path + 'config_my.js',
            path + 'config_br.js',
            path + '店铺/采集店铺.js'
        ])); break;
        case "js04": Tool.scriptArr(["admin/js/Shopee/common.js", path + '店铺/从商品中获取店铺ID.js']); break;
        case "js05": Tool.scriptArr(["admin/js/Shopee/common.js",path + 'common.js', path + '粉丝/index.js']); break;
        case "js06": Tool.scriptArr(["admin/js/Shopee/common.js",path + '粉丝/common_accounts.js', path + '粉丝/从店铺中获取粉丝.js']); break;
        case "js07": Tool.scriptArr(loginPath.concat([path + '粉丝/common_follow_user.js',path + '粉丝/取消关注和关注.js'])); break;
        case "js08": Tool.scriptArr(loginPath.concat([path + '粉丝/common_accounts.js',path + '粉丝/获取关注我的用户.js'])); break;
        case "js09": Tool.scriptArr(loginPath.concat([path + '粉丝/common_accounts.js',path + '粉丝/获取我关注的用户.js'])); break;  
        case "js10": Tool.scriptArr(['admin/js/Shopee/通用/把旧表复制到新表.js']); break;      
        default: Tool.scriptArr([
            "admin/js/Shopee/common.js",
            path + 'common.js',
            path + '商品/index.js'
        ]);
    }
});