'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/敦煌网/卖家账户/", urlArr
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '推广营销/index.js']); break;
        case "js02": Tool.scriptArr([path + '推广营销/平台活动报名/【秒杀】我要报名.js']); break;
        case "js03": Tool.scriptArr([path + '更多/更多.js']); break;
        case "js04": Tool.scriptArr([path + '更多/更多_all.js']); break;
        case "js05": Tool.scriptArr([path + '修改/index.js']); break;
        case "js06":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + '更多/修复状态.js'
            ]
            Tool.scriptArr(urlArr); break;
        case "js07":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + '更多/上下架操作.js'
            ]
            Tool.scriptArr(urlArr); break;
        case "js08": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '更多/运费模板/创建运费模板.js'
        ]); break;
        case "js09": Tool.scriptArr([
            path + '推广营销/平台活动报名/【普通促销】我要报名.js'
        ]); break;
        case "js10": Tool.scriptArr([
            path + '推广营销/平台活动报名/【新人专享价】我要报名.js'
        ]); break;
        case "js11": Tool.scriptArr([
            'admin/js/速卖通/采集/商品采集/修改/common.js',
            path + '更多/将【20天外】没更新的【来源数据】进行更新.js'
        ]); break;
        case "js12":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + '推广营销/创建全店铺打折_停止活动.js'
            ]
            Tool.scriptArr(urlArr);
            break;
        case "js13": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '推广营销/整理分组商品.js'
        ]); break;
        case "js14":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                 path + '推广营销/创建全店铺满立减.js'
            ]
            Tool.scriptArr(urlArr);
            break;
        case "js15":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + '推广营销/创建全店铺打折.js'
            ]
            Tool.scriptArr(urlArr);
            break;
        case "js16": Tool.scriptArr([path + '推广营销/创建拼团.js']); break;
        case "js17": Tool.scriptArr([path + '推广营销/创建限时限量.js']); break;
        case "js18": Tool.scriptArr([path + '推广营销/平台活动报名/【跨店满减】我要报名.js']); break;
        case "js19": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '推广营销/创建店铺优惠券.js'
        ]); break;
        case "js20": Tool.scriptArr([path + '修改/删除空运费模板.js']); break;
        case "js21": Tool.scriptArr(['admin/js/速卖通/商品列表/店铺详情替换/演示.js']); break;
        case "js22": Tool.scriptArr([
            'admin/js/敦煌网/通用.js',
            'admin/js/速卖通/运费模板/查看.js'
        ]); break;
        case "js23": Tool.scriptArr([path + '推广营销/添加产品到橱窗.js']); break;
        case "js24": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '推广营销/删除促销分组.js'
        ]); break;
        case "js25": Tool.scriptArr([path + '处理侵权.js']); break;
        case "js26": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '推广营销/创建促销分组.js'
        ]); break;
        case "js27": Tool.scriptArr([path + '修改/删除空分组.js']); break;
        case "js28": Tool.scriptArr([path + '推广营销/重新设置商品价格倍数.js']); break;
        case "js29": Tool.scriptArr([path + '修改/在DH创建分组.js']); break;
        case "js30": Tool.scriptArr([path + '推广营销/添加商品到流量快车.js']); break;
        case "js31": Tool.scriptArr([path + '推广营销/骆驼客添加商品.js']); break;
        case "js32": Tool.scriptArr([path + '推广营销/购物车营销_创建活动.js']); break;
        case "js33": Tool.scriptArr([path + '更多/common.js', path + '更多/更新商品.js']); break;
        case "js34": Tool.scriptArr([path + '更多/运费模板/获取【运费模板】.js']); break;
        case "js35": Tool.scriptArr([path + '推广营销/参与权益.js']); break;
        case "js36": Tool.scriptArr([path + '推广营销/满几件打几折.js']); break;
        case "js37":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + "推广营销/创建智能优惠券.js"
            ]
            Tool.scriptArr(urlArr); break;
        case "js38": Tool.scriptArr([
            path + '推广营销/报名优惠券活动.js'
        ]); break;
        case "js39": Tool.scriptArr([
            '../../plugins/md5.js',
            'admin/js/common_img/index.js',
            path + '更多/运费模板/删除旧运费模板.js'
        ]); break;
        case "js40":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/common_img/img.onload.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + "同步状态.js"
            ]
            Tool.scriptArr(urlArr); break;
        case "js41":
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + "更多/侵权产品申诉.js"
            ]
            Tool.scriptArr(urlArr); break;
        default:
            urlArr = [
                "../../plugins/md5.js",
                "admin/js/common_img/index.js",
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + "common.js",
                path + "首页.js"
            ]
            Tool.scriptArr(urlArr); break;
    }
}();