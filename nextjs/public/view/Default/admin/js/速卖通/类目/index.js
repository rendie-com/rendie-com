'use strict';
!function () {
    let path = "admin/js/速卖通/类目/"
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + '绑定到【敦煌网】类目/index.js']); break;
        case "js2": Tool.scriptArr([path + '采集类目.js']); break;
        case "js3": Tool.scriptArr([path + '采集类目属性.js']); break;
        case "js04": Tool.scriptArr([path + '统计一级二级三级类目的商品数量.js']); break;
        case "js05": Tool.scriptArr([path + '统计叶子类目的商品数量.js']); break;
        case "js06": Tool.scriptArr([path + '按条件隐藏三级类目.js']); break;
        case "js07": Tool.scriptArr([path + '统计一级类目数量.js']); break;
        case "js08": Tool.scriptArr([path + '绑定到【敦煌网】类目/获取绑定到敦煌网类路径.js']); break;
        case "js09": Tool.scriptArr([path + '绑定到【敦煌网】类目/同步【敦煌网佣金率】.js']); break;
        default: Tool.scriptArr([path + '首页.js']);
    }
}();