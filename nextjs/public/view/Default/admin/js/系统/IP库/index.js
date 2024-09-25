'use strict';
!function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    let path = "admin/js/系统/IP库/"
    switch (obj.arr[3]) {
        case "js01": Tool.scriptArr([path + 'common.js', '../../plugins/flot-0.8.3/jquery.flot.js', '../../plugins/flot-0.8.3/jquery.flot.pie.js', '../../plugins/flot-0.8.3/demo/jquery.flot.tooltip.min.js', '../../plugins/jqvmap/jquery.vmap.js', '../../plugins/jqvmap/maps/jquery.vmap.world.js', path + '国家分布.js']); break;
        case "js02": Tool.scriptArr([path + '从【rendie.com】IP库中获取IP.js']); break;
        default: Tool.scriptArr([path + 'common.js', path + '/IP库.js']); break;
    }
}()