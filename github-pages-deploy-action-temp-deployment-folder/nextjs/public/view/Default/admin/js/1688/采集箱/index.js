'use strict';
!function () {
    let path = "admin/js/1688/采集箱/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '主商品列表/获取敦煌网【手动审核通过】的商品.js']); break;
        case "js02": Tool.scriptArr([path + '主商品列表/计算自动匹配的【详情ID】【相似度】.js']); break;
        case "js03": Tool.scriptArr([
            path + 'common.js',
            path + '次商品列表/config.js',
            path + '次商品列表/index.js']);
            break;
        case "js04":
            Tool.scriptArr([
                'admin/js/common_img/index.js',
                path + 'common_以图搜商品.js',
                path + 'common_滑块验证码.js',
                'admin/js/1688/买家账户/common_登录.js',
                path + '主商品列表/给【首图】【放大镜图】【属性图】【详情图】搜货源.js'
            ]);
            break;
        case "js05":
            Tool.scriptArr([
                path + 'common_滑块验证码.js',
                path + '次商品列表/common_采集商品详情.js',
                path + '次商品列表/首次采集商品详情.js'
            ]);
            break;
        case "js06": Tool.scriptArr([path + '主商品列表/把【拼多多】和【淘宝】自动匹配的【详情ID】（相似度）同步过来.js']); break;
        case "js07": Tool.scriptArr([path + '次商品列表/把【offerList表】复制到【proList表】中.js']); break;
        case "js08": Tool.scriptArr(['admin/js/敦煌网/已上传商品/商品/common.js', path + '主商品列表/config.js?' + Math.random(), path + 'common.js', path + '货源图片审核/index.js']); break;
        case "js09": Tool.scriptArr([path + 'common.js', path + '图片/index.js']); break;
        case "js10":
            Tool.scriptArr([
                'admin/js/common_img/index.js',
                'admin/js/common_img/img.onload.js',
                'admin/js/common_img/均值哈希.js',
                path + '图片/为图片生成hash值便于【以图搜图】.js'
            ]);
            break;
        case "js11": Tool.scriptArr([path + 'common.js', path + '图片/属性图片.js']); break;
        case "js12": Tool.scriptArr([
            path + 'common_滑块验证码.js',
            path + '次商品列表/common_采集商品详情.js',
            path + '次商品列表/重新采集商品详情.js'
        ]); break;
        case "js13": Tool.scriptArr([path + '次商品列表/把详情的99个旧数据库复制到新版详情的99个数据库中.js']); break;
        case "js14": Tool.scriptArr([path + 'common.js', path + '图片/详情图片.js']); break;
        case "js15": Tool.scriptArr([path + '主商品列表/config.js?' + Math.random(), path + '主商品列表/敦煌手动审核状态_更新数量.js']); break;
        case "js16": Tool.scriptArr([path + '主商品列表/敦煌手动审核状态_获取【敦煌手动审核状态】.js']); break;
        case "js17": Tool.scriptArr([path + '主商品列表/config.js?' + Math.random(), path + '主商品列表/敦煌审核后本地状态_更新数量.js']); break;
        case "js18": Tool.scriptArr([path + '主商品列表/config.js?' + Math.random(), path + '主商品列表/手动审核1688状态_更新数量.js']); break;
        case "js19": Tool.scriptArr([path + '次商品列表/从data字段中提取信息【prodes】.js']); break;
        case "js20": Tool.scriptArr([path + '次商品列表/从data字段中提取信息【prolist】.js']); break;
        case "js21": Tool.scriptArr([path + '次商品列表/config.js', path + '次商品列表/状态_更新数量.js']); break;
        case "js22": Tool.scriptArr([path + '主商品列表/config.js', path + '主商品列表/速卖通类目_更新数量.js']); break;
        case "js23": Tool.scriptArr([path + '主商品列表/config.js', path + 'common.js', path + '视频审核/index.js']); break;
        case "js24": Tool.scriptArr([path + '主商品列表/config.js', path + '视频审核/人工审核视频状态_更新数量.js']); break;
        case "js25": Tool.scriptArr([path + '视频审核/人工审核视频状态_修复有无视频.js']); break;
        case "js26": Tool.scriptArr([path + '次商品列表/获取属性内有【主要下游平台】.js']); break;
        case "js27": Tool.scriptArr([path + 'common.js', path + '主要下游平台/config.js', path + '主要下游平台/index.js']); break;
        default: Tool.scriptArr([
            'admin/js/敦煌网/已上传商品/商品/common.js',
            path + 'common.js',
            path + '主商品列表/config.js',
            path + '主商品列表/index.js']); break;
    }
}();