'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/拼多多/采集箱/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([
            path + '主商品列表/获取敦煌网【手动审核通过】的商品.js'
        ]); break;
        case "js02": Tool.scriptArr([
            path + '主商品列表/计算自动匹配的【详情ID】【相似度】.js'
        ]); break;
        case "js03": Tool.scriptArr([
            path + 'common.js',
            path + '次商品列表/index.js']); break;
        case "js04": Tool.scriptArr([
            'admin/js/common_img/index.js',
            'admin/js/拼多多/卖家账户/common_登录.js',
            path + 'common_滑块验证码.js',
            path + 'common_以图搜商品.js',
            path + '主商品列表/给【首图】【放大镜图】【属性图】【详情图】搜货源.js'
        ]); break;
        case "js05": Tool.scriptArr([
            'admin/js/拼多多/卖家账户/common_登录.js',
            'admin/js/common_img/index.js',
            path + 'common_滑块验证码.js',
            path + '次商品列表/采集商品详情.js'
        ]); break;
        case "js06": Tool.scriptArr([
            path + '主商品列表/把【1688】和【淘宝】自动匹配的【详情ID】（相似度）同步过来.js'
        ]); break;
        default: Tool.scriptArr([
            'admin/js/敦煌网/已上传商品/商品/common.js',
            path + 'common.js',
            path + '主商品列表/index.js']); break;
    }
}();