'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页        
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        this.a02();
    },
    a02: function () {
        let data = [
            {
                action: "sqlite",
                database: "shopee/违禁词/店小秘",
                sql: "select count(1) as total FROM @.table" + this.b04(),
            },
            {
                action: "sqlite",
                database: "shopee/违禁词/店小秘",
                sql: "select " + Tool.fieldAs("name,count,addtime") + " FROM @.table" + this.b04() + Tool.limit(20, obj.params.page),
            }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html = "", arr1 = t[1]
        for (let i = 1; i < arr1.length; i++) {
            html += '\
            <tr>\
                <td>'+ arr1[i].name + '</td>\
                <td>'+ arr1[i].count + '</td>\
                <td>'+ Tool.js_date_time2(arr1[i].addtime) + '</td>\
            </tr>';
        }
        html = Tool.header(obj.params.jsFile) + '\
		<div class="p-2">\
			<div class="m-2 p-2">采这个用来干什么？答：把1688商品翻译成英文后，如果出现这些词，就人工审核一下。</div>\
			'+ this.b01() + '\
			<table class="table table-hover">\
				<thead class="table-light">'+ this.b02() + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>' + Tool.page(t[0][0].total, 20, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    ////////////////////////////////////////////////
    b01: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c01();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c01();">搜索</button>\
        </div>'
    },
    b02: function () {
        let html = '\
        <tr>\
          <th style="padding-left:25px;position: relative;">'+ this.b03() + '违禁词</th>\
          <th>违禁次数</th>\
          <th>添加时间</th>\
        </tr>'
        return html;
    },
    b03: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js03\');"><a class="dropdown-item pointer">*获取【店小秘】的违禁词</a></li>\
		</ul>'
    },
    b04: function () {
        let arr = [];
        if (obj.params.searchword) { arr.push("@.name like '%" + obj.params.searchword + "%'"); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    ////////////////////////////////////////
    c01: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            let urlParams = Tool.setQueryParam(location.search, "page", 1)
            urlParams = Tool.setQueryParam(urlParams, "searchword", searchword)
            Tool.url(location.href.split("?")[0] + "?" + urlParams);
        }
        else {
            alert("请输入搜索内容");
        }
    },

}
fun.a01();