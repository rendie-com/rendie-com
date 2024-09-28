'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/Ozon/商品列表/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '获取敦煌网【手动审核通过】的商品.js']); break;
        case "js02": Tool.scriptArr([
            'admin/js/Ozon/卖家账户/common_登录.js',
            path + '将【未上传】的商品上传到【Ozon平台】.js'
        ]); break;
        case "js03": Tool.scriptArr([
            path + '图片/common.js',
            'admin/js/Ozon/卖家账户/common_登录.js',
            path + '图片/把【Ozon】商品列表的图片上传到Ozon平台.js'
        ]); break;
        case "js04": Tool.scriptArr([
            path + 'common.js',
            path + '图片/index.js'
        ]); break;
        case "js05": Tool.scriptArr([
            'admin/js/Ozon/卖家账户/common_登录.js',
            path + '【Ozon】商品列表/将【已上传】的商品进行【归档】.js'
        ]); break;
        default: Tool.scriptArr([
            'admin/js/敦煌网/已上传商品/商品/common.js',
            path + 'common.js',
            path + '【Ozon】商品列表/index.js']);
    }
}();