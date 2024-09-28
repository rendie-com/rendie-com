'use strict';
!function () {
    //obj.params.jsFile     选择JS文件  
    let path = "admin/js/Shopee/商业分析/"
    let loginPath = ["admin/js/Shopee/common.js", "admin/js/Shopee/common_login.js", "admin/js/Shopee/common_登录.js"]
    switch (obj.params.jsFile) {
        case "js01": Tool.scriptArr([path + 'common.js', path + '营销/index.js']); break;
        case "js02": Tool.scriptArr([path + 'common.js', path + '相似商品/index.js']); break;
        case "js03": Tool.scriptArr(loginPath.concat([path + '相似商品/获取相似商品.js'])); break;
       default: Tool.scriptArr([path + 'common.js', path + '商品/index.js']);
    }
}();