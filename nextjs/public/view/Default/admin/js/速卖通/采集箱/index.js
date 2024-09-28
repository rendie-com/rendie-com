'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/速卖通/采集箱/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '在正常商品中扫描非正常商品.js']); break;
        case "js02": Tool.scriptArr([path + '商品/查看内容.js']); break;
        case "js03": Tool.scriptArr(['admin/js/速卖通/商品采集/商品采集/修改/common.js', path + '商品/重新采集.js']); break;
        case "js04": Tool.scriptArr([path + '商品/删除商品表中多余的详情.js']); break;
        case "js05": Tool.scriptArr([path + 'common.js', path + '商品审核.js']); break;
        case "js06": Tool.scriptArr([path + 'common.js', path + '店铺/index.js']); break;
        case "js07": Tool.scriptArr([path + 'common.js', path + '禁限/index.js']); break;
        case "js08": Tool.scriptArr([path + '禁限/禁限该组.js']); break;
        case "js09": Tool.scriptArr([path + '店铺/更新【店铺】信息.js']); break;
        case "js10": Tool.scriptArr([path + '商品/设置type1_type2_type3字段内容.js']); break;
        case "js11": Tool.scriptArr(['admin/js/速卖通/common.js', "admin/js/速卖通/common_验证登录.js", path + '商品/按国家获取商品价格和运费.js']); break;
        case "js12": Tool.scriptArr([path + '商品/记录【品牌名称】.js']); break;
        case "js13": Tool.scriptArr([path + '商品/config.js?' + Math.random() + ',' + path + '商品/状态_更新数量.js']); break;
        case "js14": Tool.scriptArr([path + '店铺/删除已关闭的店铺及商品.js']); break;
        case "js15": Tool.scriptArr([path + '店铺/从商品表中获取店铺ID.js']); break;
        case "js16": Tool.scriptArr([path + '店铺/按店铺ID统计商品数量.js']); break;
        case "js17": Tool.scriptArr([path + '商品/归类【店铺评分】.js']); break;
        case "js18": Tool.scriptArr([path + '商品/归类【店铺关注量】.js']); break;
        case "js19": Tool.scriptArr([path + '商品/按条件删除商品.js']); break;
        case "js20": Tool.scriptArr([path + '商品/把【类目表】名称添加到商品关键词中.js']); break;
        case "js21": Tool.scriptArr([path + '商品/记录【是否有视频】.js']); break;
        case "js22": Tool.scriptArr([path + '商品/修复运费模板和【attrValue】字段.js']); break;
        case "js23": Tool.scriptArr([path + '商品/归类【敦煌网品牌】.js']); break;
        case "js24": Tool.scriptArr([path + '商品/获取类目完整路径.js']); break;
        case "js25": Tool.scriptArr([path + 'common.js', path + '折扣/index.js']); break;
        case "js26": Tool.scriptArr([path + '折扣/从商品表中获取折扣.js']); break;
        case "js27": Tool.scriptArr([path + '商品/把详情的10个数据库内容复制到新版详情的50个数据库中.js']); break;
        default: Tool.scriptArr([
            path + '商品/config.js?' + Math.random(),
            path + 'common.js',
            path + '商品/index.js'
        ]);
    }
}();