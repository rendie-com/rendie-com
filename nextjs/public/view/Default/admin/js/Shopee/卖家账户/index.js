'use strict';
!function () {
    //obj.params.jsFile         选择JS文件
    let path = "admin/js/Shopee/卖家账户/"
    let loginUrl = "admin/js/Shopee/common_登录.js";
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '修改.js']); break;
        case "js02": Tool.scriptArr([path + '更多/index.js']); break;
        case "js03": Tool.scriptArr(['admin/js/Shopee/通用/把一个db文件拆分成多个db文件.js']); break;
        case "js04": Tool.scriptArr([path + '更多/common.js', path + '更多/修复商品数量.js']); break;
        case "js06": Tool.scriptArr([path + '更多/common.js,', path + '更多/更新商品-用软件上传视频.js']); break;
        case "js08": Tool.scriptArr([path + '更多/common.js,', path + '更多/删除【有品牌】的商品.js']); break;
        case "js12": Tool.scriptArr([path + '更多/common.js,', path + '更多/删除【马来西亚】店铺中的商品.js']); break;
        case "js18": Tool.scriptArr([path + '更多/common.js,', path + '更多/【删除】非正常的商品.js']); break;
        case "js20": Tool.scriptArr([path + '更多/common.js,', path + '更多/删除10个【马来西亚】店铺中【不活跃】的商品.js']); break;
        case "js21": Tool.scriptArr([
            'admin/js/安装/PostgreSQL/默认表.js',
            "admin/js/安装/DynamoDB/Shopee/卖家账户.js",
            "admin/js/Shopee/任务/定时任务/更多/把【sqlite】数据库该表同步到新的数据库.js"
        ]); break;
        default: Tool.scriptArr([loginUrl, path + 'common.js', path + '首页.js']);
    }
}();