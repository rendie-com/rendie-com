'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     表示选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/类目/属性名翻译",
            sql: "select count(1) as total FROM @.table" + this.b03(),
        }, {
            action: "sqlite",
            database: "shopee/类目/属性名翻译",
            sql: "select " + Tool.fieldAs("fromid,cnname,enname") + " FROM @.table" + this.b03() + Tool.limit(20, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html2 = "", arr = t[1];
        for (let i = 0; i < arr.length; i++) {
            html2 += '\
            <tr>\
                <td class="center">'+ arr[i].fromid + '</td>\
                <td>'+ arr[i].cnname + '</td>\
                <td>'+ arr[i].enname + '</td>\
            </tr>'
        }
        let html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
            <div class="m-2 p-2">这个用来干什么？答：暂时没什么用，可能要删除。</div>\
            '+ this.b02() + '\
            <table class="table table-hover align-middle">\
                <thead class="table-light">\
                    <tr>\
                        <th class="w100" style="padding-left: 30px;position: relative;">'+ this.b01() + '来源ID</th>\
                        <th>中文属性名</th>\
                        <th>英文属性名</th>\
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
            <li onClick="Tool.open4(\'js04\')"><a class="dropdown-item pointer">从类目属性中提取属性名</a></li>\
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
        let where = "";
        if (obj.params.searchword) {
            where = " where @.cnname like'%" + obj.params.searchword + "%'"
        }
        return where;
    },
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