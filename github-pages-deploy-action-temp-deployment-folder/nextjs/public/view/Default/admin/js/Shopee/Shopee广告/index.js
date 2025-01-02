'use strict';
!function () {
    //obj.params.jsFile     选择JS文件  
    let path = "admin/js/Shopee/Shopee广告/"
    let loginPath = [
        "admin/js/Shopee/common.js",
        "admin/js/Shopee/common_login.js",
        "admin/js/Shopee/common_登录.js"
    ]
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr(loginPath.concat([path + '广告/common_keyword.js', path + '广告/新版/获取【全部广告】信息.js'])); break;
        case "js02": Tool.scriptArr(["admin/js/Shopee/common.js", path + 'common.js', path + '搜索关键词/index.js']); break;
        case "js03": Tool.scriptArr(loginPath.concat([path + '广告/旧版/创建搜索广告.js'])); break;
        case "js04": Tool.scriptArr(loginPath.concat([path + '广告/旧版/类型/修改广告时间.js'])); break;
        case "js05": Tool.scriptArr(loginPath.concat([path + '广告/旧版/创建关联广告.js'])); break;
        case "js06": Tool.scriptArr(loginPath.concat([path + 'common.js', path + '搜索关键词/获取【店铺商品】的关键词.js'])); break;
        case "js07": Tool.scriptArr(loginPath.concat([path + '搜索关键词/翻译关键词.js'])); break;
        case "js08": Tool.scriptArr([path + "config.js", path + 'common.js', path + '商品广告_修改/新版/index.js']); break;
        case "js09": Tool.scriptArr(loginPath.concat([path + 'common.js', path + '商品广告_修改/旧版/增加新的关键词.js'])); break;
        case "js10": Tool.scriptArr(loginPath.concat([path + '商品广告_修改/新版/停用所有关键词.js'])); break;
        case "js11": Tool.scriptArr(loginPath.concat([path + '广告/旧版/类型/暂停或重启广告.js'])); break;
        case "js12": Tool.scriptArr(["admin/js/Shopee/common.js", path + 'common.js', path + "config.js", path + '广告/广告状态_更新数量.js']); break;
        case "js13": Tool.scriptArr(["admin/js/Shopee/common.js", path + 'common.js', path + "config.js", path + '广告/版位_更新数量.js']); break;
        case "js14": Tool.scriptArr(["admin/js/Shopee/common.js", path + "config.js", path + '商品广告_修改/新版/修改状态_更新数量.js']); break;
        case "js15": Tool.scriptArr(loginPath.concat([path + 'common.js', path + '商品广告_修改/新版/增加新的关键词.js'])); break;
        case "js16": Tool.scriptArr(["admin/js/Shopee/common.js", path + "config.js", path + '商品广告_修改/新版/新增关键词时间_更新数量.js']); break;
        case "js17": Tool.scriptArr(loginPath.concat([path + '广告/common_keyword.js', path + '商品广告_修改/新版/把修改好的搜索广告同步有Shopee平台.js'])); break;
        case "js18": Tool.scriptArr(loginPath.concat([path + '商品广告_修改/新版/修改广告的版位为【全部】.js'])); break;
        case "js19": Tool.scriptArr([path + "config.js", path + 'common.js', path + '广告/旧版/index.js']); break;
        case "js20": Tool.scriptArr(loginPath.concat([path + '广告/common_keyword.js', path + '广告/旧版/获取【全部广告】信息.js'])); break;
        case "js21": Tool.scriptArr([path + "config.js", path + 'common.js', path + '商品广告_修改/旧版/index.js']); break;
        case "js22": Tool.scriptArr(loginPath.concat([path + '广告/common_keyword.js', path + '商品广告_修改/旧版/把修改好的搜索广告同步有Shopee平台.js'])); break;
        case "js23": Tool.scriptArr(loginPath.concat([path + '广告/新版/创建商品广告.js'])); break;
        case "js24": Tool.scriptArr(loginPath.concat([path + '广告/新版/广告状态_执行操作.js'])); break;
        case "js25": Tool.scriptArr(loginPath.concat([path + '广告/新版/删除重复商品广告.js'])); break;
        case "js26": Tool.scriptArr(['admin/js/Shopee/通用/把旧表复制到新表.js']); break;
        default: Tool.scriptArr([path + "config.js", path + 'common.js', path + '广告/index.js']); break;
    }
}();