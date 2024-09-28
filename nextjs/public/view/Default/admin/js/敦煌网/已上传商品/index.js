'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/敦煌网/已上传商品/"
    switch (obj.arr[3]) {
        case "js01":
            Tool.scriptArr([
                '../../plugins/md5.js', //图形验证要用
                'admin/js/common_img/index.js', //登陆要用
                'admin/js/common_img/img.onload.js', //登陆要用
                "admin/js/敦煌网/common.js",
                "admin/js/敦煌网/common_verifyUser.js",
                "admin/js/敦煌网/common_geetest.js",
                path + '商品/更新_上传/0.准备信息_getAliexpressSKU.js',
                path + '商品/更新_上传/0.准备信息_AliexpressSKUtoDHgateSKU.js',
                path + '商品/更新_上传/1.基本信息.js',
                path + '商品/更新_上传/1.基本信息_attrlist.js',
                path + '商品/更新_上传/2.销售信息.js',
                path + '商品/更新_上传/2.销售信息_proSkuInfo_shiptoSkuInfo.js',
                path + '商品/更新_上传/3.内容描述.js',
                path + '商品/更新_上传/4.包装信息.js',
                path + '商品/更新_上传/5.设置运费.js',
                path + '商品/更新_上传/6.其他信息.js',
                path + '商品/更新_上传/7.隐藏必填信息.js',
                path + '商品/更新_上传/更新商品.js']);
            break;
        case "js02": Tool.scriptArr([
            path + 'common.js',
            path + '商品/common.js',
            path + '商品/config.js?' + Math.random(),
            path + '图片审核/common.js',
            path + '图片审核/common_首图.js',
            path + '图片审核/common_放大镜图片.js',
            path + '图片审核/common_属性图片.js',
            path + '图片审核/common_详情图片.js',
            path + '图片审核/index.js']); break;
        case "js03": Tool.scriptArr([path + 'common.js', path + '商品/config.js?' + Math.random() + '', path + '详情审核/index.js']); break;
        case "js04": Tool.scriptArr([path + '排名/关键词中无排名的查找排名.js']); break;
        case "js05": Tool.scriptArr([path + '排名/搜索关键词然后模拟点击.js']); break;
        case "js06": Tool.scriptArr([path + '排名/关键词中有排名的打开浏览.js']); break;
        case "js07": Tool.scriptArr([path + '排名/index.js']); break;
        case "js08": Tool.scriptArr(['/plugins/flot-0.8.3/jquery.flot.js,/plugins/flot-0.8.3/demo/jquery.flot.tooltip.min.js', path + '平均排名.js']); break;
        case "js09": Tool.scriptArr([path + '店铺.js']); break;
        case "js10": Tool.scriptArr([path + '历史价格.js']); break;
        case "js11": Tool.scriptArr([path + '视频/上传产品主图视频到敦煌网.js']); break;
        case "js12": Tool.scriptArr([path + 'common.js', path + '视频审核/index.js']); break;
        case "js13": Tool.scriptArr([path + '视频/获取已上传商品的视频地址.js']); break;
        case "js14":
            Tool.scriptArr([
                'admin/js/common_img/限制图片最大度度.js',
                'admin/js/common_img/压缩图像到指定大小.js',
                'admin/js/common_img/给图片增加水印.js',
                path + '图片审核/common.js',
                path + '图片审核/把速卖通的图片上传到敦煌网.js']);
            break;
        case "js15": Tool.scriptArr([path + '视频/获取上传后的视频ID.js']); break;
        case "js16": Tool.scriptArr([path + '图片审核/归类【劣质图片】/common.js', path + '图片审核/归类【劣质图片】/index.js']); break;
        case "js17": Tool.scriptArr([path + '详情审核/把【DHdes字段】调整为水印图片.js']); break;
        case "js18": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + '商品/审核后本地状态_更新数量.js']); break;
        case "js19": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + '商品/手动审核状态_更新数量.js']); break;
        case "js20": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + '商品/审核前本地状态_更新数量.js']); break;
        case "js21": Tool.scriptArr([path + '图片审核/归类【详情不存在】.js']); break;
        case "js22": Tool.scriptArr(['admin/js/common_img/index.js', path + '视频审核/删除已上传商品的视频.js']); break;
        case "js23": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + 'common.js', path + '图片属性审核/index.js']); break;
        case "js24": Tool.scriptArr(['admin/js/common_img/index.js', path + '图片属性审核/把【属性图片未上传】上传到敦煌网.js']); break;
        case "js25": Tool.scriptArr([path + '商品/填充未上传数据.js']); break;
        case "js26": Tool.scriptArr([path + '商品/清空DHdes和DHdesPic字段.js']); break;
        case "js27": Tool.scriptArr([path + '商品/把【25.待认领商品】填进去.js']); break;
        case "js28": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + '商品/敦煌状态_更新数量.js']); break;
        case "js29": Tool.scriptArr([path + '商品/config.js?' + Math.random() + '', path + '商品/类目_更新数量.js']); break;
        case "js30": Tool.scriptArr([path + '商品/按【条件1】把【25.待认领商品】填进去.js']); break;
        case "js31": Tool.scriptArr([path + '商品/按【条件1】把【未上传数据】填进去.js']); break;
        case "js32": Tool.scriptArr([path + '商品/手动审核状态_归类【18.成人用品】.js']); break;
        case "js33": Tool.scriptArr([path + '商品/config.js?' + Math.random(), path + '商品/common.js', path + '商品/按【条件】采集来源商品价格和运费.js']); break;
        default: Tool.scriptArr([path + '商品/config.js?' + Math.random(), path + 'common.js', path + '商品/common.js', path + '商品/index.js']); break;
    }
}();