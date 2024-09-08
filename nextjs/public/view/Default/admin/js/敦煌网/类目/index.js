'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/敦煌网/类目/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '产品佣金率.js']); break;        
        default: Tool.scriptArr([path + '【敦煌网】商品类目.js']); break;
    }
}();