'use strict';
$(function () {
    //obj.params.jsFile     选择JS文件  
    let path = "admin/js/Shopee/采集箱/"
    let loginPath = ["admin/js/Shopee/common.js", "admin/js/Shopee/common_login.js", "admin/js/Shopee/common_登录.js"]
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
        case "js05": Tool.scriptArr(["admin/js/Shopee/common.js", path + '粉丝/config.js', path + 'common.js', path + '粉丝/粉丝统计.js']); break;
        case "js06": Tool.scriptArr(["admin/js/Shopee/common.js", path + '粉丝/common_accounts.js', path + '粉丝/从店铺中获取粉丝.js']); break;
        case "js07": Tool.scriptArr(loginPath.concat([
            'admin/js/Shopee/任务/定时任务/启动定时任务/所有任务/采集箱/粉丝/common_follow_user.js',
            path + '粉丝/取消关注和关注.js'
        ])); break;
        case "js08": Tool.scriptArr(loginPath.concat([
            path + '粉丝/config.js',
            'admin/js/Shopee/任务/定时任务/启动定时任务/所有任务/采集箱/粉丝/common_accounts.js',
            path + '粉丝/获取关注我的用户.js'
        ])); break;
        case "js09": Tool.scriptArr(loginPath.concat([
            path + '粉丝/config.js',
            'admin/js/Shopee/任务/定时任务/启动定时任务/所有任务/采集箱/粉丝/common_accounts.js',
            path + '粉丝/获取我关注的用户.js'
        ])); break;
        case "js10": Tool.scriptArr([path + '粉丝/把一个db文件拆分成多个db文件.js']); break;
        case "js11": Tool.scriptArr([
            'admin/js/安装/PostgreSQL/默认表.js',
            "admin/js/安装/DynamoDB/Shopee/任务.js",
            "admin/js/安装/DynamoDB/Shopee/采集箱.js",
            'admin/js/Shopee/任务/定时任务/更多/把【sqlite】数据库该表同步到新的数据库.js'
        ]); break;
        case "js12": Tool.scriptArr(["admin/js/Shopee/common.js", path + 'common.js', path + '粉丝/每个站点的粉丝.js']); break;
        default: Tool.scriptArr([
            "admin/js/Shopee/common.js",
            path + 'common.js',
            path + '商品/index.js'
        ]);
    }
});