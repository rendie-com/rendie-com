'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/敦煌网/订单/", urlArr
    switch (obj.arr[3]) {
        case "js01":
            let path2 = '订单/订单信息/';
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                'admin/js/速卖通/common_验证登录.js',
                'admin/js/速卖通/common_默认账号登录.js',
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + 'common.js',
                path + path2 + '1.核对商品.js',
                path + path2 + '2.加入购物车.js',
                path + path2 + '3.复制地址.js',
                path + path2 + '3.复制地址_common.js',
                path + path2 + '4.提交待付.js',
                path + path2 + '5.获取采购信息-新版.js',
                path + path2 + '假运单号发货.js',
                path + path2 + '同步运单号到敦煌网.js',
                path + path2 + 'index.js'
            ]
            break;
        case "js02": urlArr = ['admin/js/敦煌网/站内信/站内信/内容信息.js']; break;
        case "js03":
            urlArr = [
                "admin/js/敦煌网/common.js",
                path + 'common.js',
                path + '发货/index.js'
            ]; break;
        case "js04": urlArr = [path + '发货管理/获取【采购方】信息.js']; break;
        default:
            urlArr = [
                "admin/js/敦煌网/common.js",
                path + 'common.js',
                path + '订单/index.js'
            ]
    }
    Tool.scriptArr(urlArr);
}();