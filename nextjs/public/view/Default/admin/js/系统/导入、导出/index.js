'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/系统/导入、导出/";
    let pathArr = [
        "admin/js/安装/默认表.js",
        "admin/js/安装/扩展表.js",
        "admin/js/安装/视频表.js",
        "admin/js/安装/敦煌表.js",
        "admin/js/安装/速卖通表.js",
        "admin/js/安装/商品表.js",
        "admin/js/安装/工具表.js",
        "admin/js/安装/Amazon表.js",
        "admin/js/安装/Shopee表.js",
        "admin/js/安装/Wish表.js",
        "admin/js/安装/eBay表.js"
    ]
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + '第2步.js']); break;
        case "js02": Tool.scriptArr([path + '第3步.js']); break;
        case "js03":
            pathArr.push(path + '导出SQL脚本文件/index.js')
            Tool.scriptArr(pathArr); break;
        case "js04":
            pathArr.push(path + '从SQL脚本文件导入.js')
            Tool.scriptArr(pathArr);
            break;
        case "js05":
            pathArr.push(path + '导出SQL脚本文件/开始导出.js')
            Tool.scriptArr(pathArr);
            break;
        case "js06": Tool.scriptArr([path + '导入/从SQL脚本文件导入.js']); break;
        default: Tool.scriptArr([path + '导入/index.js']); break;
    }
}();