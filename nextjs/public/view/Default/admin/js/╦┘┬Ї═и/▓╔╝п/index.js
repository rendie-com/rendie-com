'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/速卖通/采集/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '商品采集/修改/1.设置基本参数.js']); break;
        case "js02": Tool.scriptArr([path + '商品采集/修改/2.列表页连接设置.js']); break;
        case "js03": Tool.scriptArr([path + '商品采集/修改/3.内容页连接设置.js']); break;
        case "js04": Tool.scriptArr([path + '商品采集/修改/common.js,' + path + '商品采集/修改/4.预览结果.js']); break;
        case "js05": Tool.scriptArr([path + '商品采集/批量替换.js']); break;
        case "js06": Tool.scriptArr([path + '商品采集/文本编辑.js']); break;
        default: Tool.scriptArr([path + '商品采集/index.js']); break;
    }
}();