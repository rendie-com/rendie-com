'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     选择JS文件       
        let path = "admin/js/Shopee/"
        switch (obj.params.jsFile) {
            case "js01": Tool.scriptArr(['admin/js/Shopee/common_登录.js', path + 'common_login.js', path + '品牌/获取Shopee品牌.js']); break;
            default:
                obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页        
                obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
                this.a02();
        }
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/品牌",
            sql: "select count(1) as total FROM @.table" + this.b03(),
        }, {
            action: "sqlite",
            database: "shopee/品牌",
            sql: "select "+Tool.fieldAs("brand_id,name,category_ids,addtime")+" FROM @.table" + this.b03() + Tool.limit(20, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let arr = t[1]
        let html2 = "";
        for (let i = 0; i < arr.length; i++) {
            html2 += '\
            <tr>\
                <td class="center">'+ arr[i].brand_id + '</td>\
                <td>'+ arr[i].name + '</td>\
                <td>有'+ arr[i].category_ids.length + '个类目ID</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        let html = '\
        <header class="panel-heading">【Shopee】品牌</header>\
        <div class="p-2">\
            '+ this.b02() + '\
            <table class="table table-hover align-middle">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w100" style="padding-left: 30px;position: relative;">'+ this.b01() + '品牌ID</th>\
                        <th class="w200">品牌名称</th>\
                        <th>品牌有哪些分类ID的个数</th>\
                        <th>添加时间</th>\
                    </tr>\
                </thead>\
                <tbody>'+ html2 + '</tbody>\
            </table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function (id) {
        return '\
        <button title = "操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js01\')"><a class="dropdown-item pointer">获取Shopee品牌</a></li>\
        </ul>'
    },
    b02: function () {
        return '\
        <div class="input-group w-50 mb-2">\
        <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
        <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
        </div>'
    },
    b03: function () {
        let arr = [];
        if (obj.params.searchword) { arr.push("@.name like '%" + obj.params.searchword + "%'"); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    /////////////////////////////////////////
    c01: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            let urlParams = Tool.setQueryParam(location.search, "page", 1)
            urlParams = Tool.setQueryParam(urlParams, "searchword", searchword)
            Tool.url(location.href.split("?")[0] + "?" + urlParams);
        } else { alert("请输入搜索内容"); }
    },
}
fun.a01();