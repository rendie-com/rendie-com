'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    switch (obj.arr[3]) {
        case "js01":
            obj.arr[4] = "proid";//采集的方式【allshop/allUser/proid】【按SMT的店铺采集/按DH已上传的所有店铺采集/按proID采集】
            obj.arr[5] = "3";//开打方式【1/2/3】【预览/采集/更新】
            obj.arr[6] = obj.arr[0] + '/' + obj.arr[1] + '/' + obj.arr[2];//返回地址
            obj.arr[7] = obj.arr[5];//商品编码
            Tool.scriptArr(['admin/js/速卖通/商品采集/商品采集/修改/common.js', 'admin/js/速卖通/商品采集/商品采集/修改/4.预览结果.js']);
            break;
        default: Tool.scriptArr(['admin/js/敦煌网/采集箱/config.js?' + Math.random(), 'admin/js/敦煌网/采集箱/商品列表.js']);
    }
}()