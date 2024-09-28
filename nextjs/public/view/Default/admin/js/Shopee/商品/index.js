'use strict';
!function () {
    let path = "admin/js/Shopee/商品/"
    let loginPath = ["admin/js/Shopee/common.js", "admin/js/Shopee/common_login.js", "admin/js/Shopee/common_登录.js"]
    switch (obj.params.jsFile) {//选择JS文件
        case "js01": Tool.scriptArr([path + '商品/把速卖通信息同步过来.js']); break;
        case "js02": Tool.scriptArr(loginPath.concat([path + '全球商品/更多/删除【Shopee全球商品】中【没被记录】的商品.js'])); break;
        case "js03": Tool.scriptArr([
            'admin/js/Shopee/卖家账户/更多/common.js',
            path + '商品/从Shopee获取【马来西亚站点】商品信息.js'
        ]); break;
        case "js04": Tool.scriptArr([
            "admin/js/Shopee/common.js",
            path + 'common.js',
            path + '店铺商品/config.js',
            path + 'common_logistics.js',
            path + '店铺商品/index.js'
        ]); break;
        case "js05": Tool.scriptArr([path + '全球商品/更多/获取敦煌网【手动审核通过】的商品.js']); break;
        case "js06": Tool.scriptArr(loginPath.concat([path + '全球商品/更多/将【未上传】的商品上传到【Shopee全球商品】.js'])); break;
        case "js07": Tool.scriptArr(loginPath.concat([
            'admin/js/common_img/index.js',
            'admin/js/common_img/img.onload.js',
            'admin/js/common_img/均值哈希.js',
            'admin/js/common_img/压缩图像到指定大小.js',
            path + '图片/common_shopee_img/pic1.js',
            path + '图片/common_shopee_img/pic_attrPic_desPic.js',
            path + '图片/common_新upPic.js',
            //path + '图片/common_hash.js',
            //path + '图片/common_uuid.js',
            //'../../plugins/js实现AES加密/crypto-js-4.1.1/crypto-js.js',
            path + '图片/把【全球商品】的图片上传到Shopee平台.js'
        ])); break;
        case "js08": Tool.scriptArr(loginPath.concat([
            path + '全球商品/common_attributes.js',
            path + '全球商品/common_sku.js',
            path + '全球商品/更新前本地状态_更新商品.js'
        ])); break;
        case "js09": Tool.scriptArr(loginPath.concat([path + '全球商品/更多/重新记录【已上传】的商品.js'])); break;
        case "js10": Tool.scriptArr(["admin/js/Shopee/common.js", path + '店铺商品/1688信息_把1688信息同步过来.js']); break;
        case "js11": Tool.scriptArr([path + '全球商品/config.js', path + 'common.js', path + '全球商品/更新前本地状态_更新数量.js']); break;
        case "js12": Tool.scriptArr([path + '全球商品/config.js?' + Math.random(), path + '全球商品/敦煌手动审核状态_更新数量.js']); break;
        case "js13": Tool.scriptArr([path + '全球商品/敦煌手动审核状态_获取【敦煌手动审核状态】.js']); break;
        case "js14": Tool.scriptArr(loginPath.concat([
            path + 'common_logistics.js',
            path + '全球商品/common_price.js',
            path + '全球商品/更多/common_发布.js',
            path + '全球商品/更多/发布到【店铺商品】中去.js'
        ])); break;
        case "js15": Tool.scriptArr(["admin/js/Shopee/common.js", path + 'common.js', path + '店铺商品/config.js', path + '店铺商品/状态/更新数量.js']); break;
        case "js16": Tool.scriptArr(loginPath.concat([path + '店铺商品/更多/获取【店铺商品】信息.js'])); break;
        case "js17": Tool.scriptArr(loginPath.concat([path + 'common.js', path + '店铺商品/状态/下架.js'])); break;
        case "js18": Tool.scriptArr(loginPath.concat([path + 'common.js', path + '店铺商品/状态/上架.js'])); break;
        case "js19": Tool.scriptArr([path + 'common.js', path + '违规或删除/config.js', path + '违规或删除/index.js']); break;
        case "js20": Tool.scriptArr(loginPath.concat([path + '违规或删除/获取【违规或删除】信息.js'])); break;
        case "js21": Tool.scriptArr([path + 'common.js', path + '违规或删除/config.js', path + '违规或删除/状态_更新数量.js']); break;
        case "js22": Tool.scriptArr([path + '图片/index.js']); break;
        case "js23": Tool.scriptArr(loginPath.concat([path + '店铺商品/状态/置顶推广.js'])); break;
        case "js24": Tool.scriptArr([path + '平台关联/更新后违规类型/从【违规或删除】中同步该信息.js']); break;
        case "js25": Tool.scriptArr([path + '平台关联/config.js', path + '平台关联/更新后违规类型_更新数量.js']); break;
        case "js26": Tool.scriptArr([path + '全球商品/更多/把1688的【手动审核1688状态】同步过来.js']); break;
        case "js27": Tool.scriptArr([path + '全球商品/config.js', path + '全球商品/手动审核1688状态_更新数量.js']); break;
        case "js28": Tool.scriptArr([path + 'common.js', path + '图片/index.js']); break;
        case "js29": Tool.scriptArr(loginPath.concat([
            'admin/js/common_img/index.js',
            'admin/js/common_img/img.onload.js',
            'admin/js/common_img/均值哈希.js',
            'admin/js/common_img/压缩图像到指定大小.js',
            'admin/js/common_img/uploadFile.js',
            path + '图片/common_新upPic.js',
            //path + '图片/common_hash.js',
            //path + '图片/common_uuid.js',
            //'../../plugins/js实现AES加密/crypto-js-4.1.1/crypto-js.js',
            path + '图片/把【使用1688属性图】上传到Shopee平台.js'
        ])); break;
        case "js30": Tool.scriptArr([path + 'common.js', path + '图片/属性图片_1688.js']); break;
        case "js31": Tool.scriptArr([path + '全球商品/config.js', path + '全球商品/敦煌审核后本地状态_更新数量.js']); break;
        case "js32": Tool.scriptArr([path + '全球商品/config.js?' + Math.random(), path + '全球商品/手动审核后1688商品状态_更新数量.js']); break;
        case "js33": Tool.scriptArr([path + '全球商品/config.js?' + Math.random(), path + '全球商品/速卖通类目_更新数量.js']); break;
        case "js34": Tool.scriptArr(loginPath.concat([path + '店铺商品/状态/删除.js'])); break;
        case "js35": Tool.scriptArr([path + '全球商品/手动审核1688状态_重新采集1688商品状态.js']); break;
        case "js36": Tool.scriptArr([path + '违规或删除/config.js', path + '违规或删除/违规类型_更新数量.js']); break;
        case "js37": Tool.scriptArr(loginPath.concat([path + '店铺商品/状态/问题数据下架.js'])); break;
        case "js38": Tool.scriptArr(loginPath.concat([path + '违规或删除/获取【搜索排名降低】的商品.js'])); break;
        case "js39": Tool.scriptArr([path + '全球商品/更多/把速卖通的【折扣】同步过来.js']); break;
        case "js40": Tool.scriptArr([
            path + '全球商品/config.js',
            'admin/js/敦煌网/已上传商品/商品/common.js',
            path + 'common.js',
            path + '全球商品/common_绑定类目.js',
            path + '全球商品/index.js'
        ]); break;
        case "js41": Tool.scriptArr(loginPath.concat([
            'admin/js/common_img/index.js',
            'admin/js/common_img/uploadFile.js',
            path + '全球商品/common_self_ArrayBuffer.js',
            path + '全球商品/手动审核1688状态_上传视频.js'
        ])); break;
        case "js42": Tool.scriptArr([path + '全球商品/config.js?' + Math.random(), path + '平台关联/人工审核1688视频状态_更新数量.js']); break;
        case "js43": Tool.scriptArr([
            path + '全球商品/config.js',
            path + '全球商品_修改/common_delPic.js',
            path + '全球商品_修改/common_翻译.js',
            path + '全球商品/common_绑定类目.js',
            path + 'common.js',
            path + '全球商品_修改/common_indexB.js',
            path + '全球商品_修改/common_indexC.js',
            path + '全球商品_修改/index.js'
        ]); break;
        case "js44": Tool.scriptArr(["admin/js/Shopee/common.js", path + '全球商品_修改/翻译【已发布站点】标题和详情.js']); break;
        case "js45": Tool.scriptArr(loginPath.concat([
            path + 'common_logistics.js',
            path + '店铺商品/更多/common_更新【店铺商品】信息.js',
            path + '全球商品/common_price.js',
            path + '店铺商品/更多/更新【店铺商品】信息.js'
        ])); break;
        case "js46": Tool.scriptArr(loginPath.concat([
            'admin/js/common_img/给图片增加水印.js',
            'admin/js/common_img/index.js',
            'admin/js/common_img/img.onload.js',
            'admin/js/common_img/压缩图像到指定大小.js',
            //path + '图片/common_hash.js',
            //path + '图片/common_uuid.js',
            //'../../plugins/js实现AES加密/crypto-js-4.1.1/crypto-js.js',
            path + '图片/common_新upPic.js',
            'admin/js/common_img/uploadFile.js',
            path + '店铺商品/更多/common_attrPic_waterMark.js',
            path + '店铺商品/更多/common_desPic_waterMark.js',
            path + '店铺商品/更多/为该站点图片生成水印.js'
        ])); break;
        case "js47": Tool.scriptArr([
            path + 'common.js',
            path + '全球商品/config.js?' + Math.random(),
            path + '全球商品/修改状态_更新数量.js'
        ]); break;
        case "js48": Tool.scriptArr(loginPath.concat([
            'admin/js/common_img/给首图增加水印.js',
            'admin/js/common_img/index.js',
            'admin/js/common_img/img.onload.js',
            'admin/js/common_img/压缩图像到指定大小.js',
            'admin/js/common_img/均值哈希.js',
            path + '图片/common_新upPic.js',
            //path + '图片/common_hash.js',
            //path + '图片/common_uuid.js',
            //'../../plugins/js实现AES加密/crypto-js-4.1.1/crypto-js.js',
            'admin/js/common_img/uploadFile.js',
            path + '店铺商品/更多/common_pic1_waterMark.js',
            path + '店铺商品/更多/为该站点首图生成关键词水印.js'
        ])); break;
        case "js49": Tool.scriptArr(loginPath.concat([
            path + 'common.js',
            path + '店铺商品/为该站点创建类目/common_创建热门关键词类目.js',
            path + '店铺商品/为该站点创建类目/common_创建单位重量类目.js',
            path + '店铺商品/为该站点创建类目/common_创建价格类目.js',
            path + '店铺商品/为该站点创建类目/common_创建最低购买数量类目.js',
            path + '店铺商品/为该站点创建类目/common_创建新品类目.js',
            path + '店铺商品/为该站点创建类目/index.js'
        ])); break;
        case "js50": Tool.scriptArr(loginPath.concat([path + '店铺商品/更多/删除该站点类目.js'])); break;
        case "js51": Tool.scriptArr([
            path + 'common.js',
            "admin/js/Shopee/common.js",
            path + '店铺商品/config.js',
            path + '店铺商品/最低购买量_更新数量.js'
        ]); break;
        case "js52": Tool.scriptArr([path + '全球商品/更多/把【Shopee广告】中的关键词同步过来.js']); break;
        case "js53": Tool.scriptArr([path + 'common_logistics.js', "admin/js/Shopee/common.js", path + '店铺商品/活动/选出能做活动的商品.js']); break;
        case "js54": Tool.scriptArr([path + 'common.js', "admin/js/Shopee/common.js", path + '店铺商品/config.js', path + '店铺商品/单位重量_更新数量.js']); break;
        case "js55": Tool.scriptArr([
            'admin/js/1688/采集箱/common_滑块验证码.js',
            'admin/js/1688/采集箱/次商品列表/common_采集商品详情.js',
            path + '全球商品/手动审核1688状态_重新采集1688商品.js'
        ]); break;
        case "js56": Tool.scriptArr(["admin/js/Shopee/common.js", path + '店铺商品/更多/选出要修改价格的商品.js']); break;
        case "js57": Tool.scriptArr([
            path + 'common.js',
            "admin/js/Shopee/common.js",
            path + '店铺商品/config.js',
            path + '店铺商品/标题_更新数量.js'
        ]); break;
        case "js58": Tool.scriptArr([path + 'common_logistics.js', "admin/js/Shopee/common.js", path + '店铺商品/定价/重新计算新折扣.js']); break;
        case "js59": Tool.scriptArr([
            path + 'common.js',
            "admin/js/Shopee/common.js",
            path + '店铺商品/config.js',
            path + '店铺商品/定价/更新数量.js'
        ]); break;
        case "js60": Tool.scriptArr(loginPath.concat([path + '店铺商品/定价/删除新折扣.js'])); break;
        case "js61": Tool.scriptArr([
            path + 'common.js',
            "admin/js/Shopee/common.js",
            path + '店铺商品/config.js',
            path + '店铺商品/活动/更新数量.js'
        ]); break;
        case "js62": Tool.scriptArr(['admin/js/Shopee/任务/定时任务/更多/把该表同步到【PostgreSQL】数据库.js']); break;
        case "js63": Tool.scriptArr(['admin/js/Shopee/通用/把旧表复制到新表.js']); break;
        case "js64": Tool.scriptArr([
            'admin/js/1688/采集箱/次商品列表/common_采集商品详情_tabs_remove_create_indexOf.js',
            path + '全球商品/手动审核1688状态_重新采集1688商品讲解视频.js'
        ]); break;
        default: Tool.scriptArr([
            'admin/js/敦煌网/已上传商品/商品/common.js',
            path + '平台关联/config.js',
            path + 'common.js',
            path + '平台关联/index.js']); break;
    }
}();