'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/Ozon/商品类目/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '采集类目.js']); break;
        case "js02": Tool.scriptArr([path + '采集类目属性.js']); break;
        default: Tool.scriptArr([path + '商品类目.js']);
    }
}();