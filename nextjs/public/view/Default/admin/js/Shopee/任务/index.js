'use strict';
!function () {
    //obj.params.jsFile         选择JS文件
    let path = "admin/js/Shopee/任务/"
    let loginPath = ["admin/js/Shopee/common.js", "admin/js/Shopee/common_login.js", "admin/js/Shopee/common_登录.js"]
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '定时任务/修改.js']); break;
        case "js02": Tool.scriptArr(loginPath.concat([
            path + 'common.js',
            'admin/js/Shopee/买家账户/common_登录.js',           
            path + '定时任务/启动定时任务/index.js'
        ])); break;
        case "js03": Tool.scriptArr([
            'admin/js/安装/PostgreSQL/默认表.js',
            "admin/js/安装/DynamoDB/Shopee/任务.js",          
            'admin/js/Shopee/任务/定时任务/更多/把【sqlite】数据库该表同步到新的数据库.js'
        ]); break;
        case "js04": Tool.scriptArr([path + 'common.js', path + '定时任务/index.js']); break;
        case "js05": Tool.scriptArr(['admin/js/Shopee/通用/把一个db文件拆分成多个db文件.js']); break;      
        default: Tool.scriptArr([path + 'common.js', path + '日常任务/index.js']);
    }
}();