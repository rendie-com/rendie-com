'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/速卖通/卖家账户/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '更多/common.js' , path + '更多/上传商品.js']); break;
        case "js03": Tool.scriptArr([path + '更多/更多.js']); break;
        case "js04": Tool.scriptArr([path + '更多/更多_all.js']); break;
        default: Tool.scriptArr([path + '卖家账户.js']);
    }
}();