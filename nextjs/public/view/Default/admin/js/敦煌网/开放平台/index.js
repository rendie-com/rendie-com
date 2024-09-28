'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
    obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//切换账户
    let path = "admin/js/敦煌网/开放平台/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '卖家API/类目API/common.js', path + '卖家API/类目API/index.js']); break;
        case "js02": Tool.scriptArr([path + '买家API/index.js']); break;
        case "js03": Tool.scriptArr([path + '公共API/index.js']); break;
        case "js04": Tool.scriptArr([path + '分销API/index.js']); break;
        case "js05": Tool.scriptArr([path + '平台错误码.js']); break;
        case "js06": Tool.scriptArr([path + '授权错误响应.js']); break;
        case "js07": Tool.scriptArr([path + '卖家API/客户评论API/index.js']); break;
        case "js08": Tool.scriptArr([path + '卖家API/在线发货API/index.js']); break;
        case "js09": Tool.scriptArr([path + '卖家API/物流API/index.js']); break;
        case "js10": Tool.scriptArr([path + '卖家API/站内信API/index.js']); break;
        case "js11": Tool.scriptArr([path + '卖家API/订单API/common.js', path + '卖家API/订单API/index.js']); break;
        case "js12": Tool.scriptArr([path + '卖家API/产品API/common.js', path + '卖家API/产品API/index.js']); break;
        case "js13": Tool.scriptArr([path + '卖家API/用户API/index.js']); break;
        case "js14": Tool.scriptArr([path + '卖家API/类目API/一键采集所有类目.js']); break;
        default: Tool.scriptArr([path + '卖家API/相册API/common.js', path + '卖家API/相册API/index.js']); break;
    }
}();