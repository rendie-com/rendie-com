'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     选择JS文件
        obj.params.db = obj.params.db ? obj.params.db : "01";//数据库
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        this.a02();
    },
    a02: function () {
        let where = this.b06();
        let data = [{
            action: "sqlite",
            database: "1688_img/" + obj.params.db,
            sql: "select count(1) as total FROM @.pic " + where,
        }, {
            action: "sqlite",
            database: "1688_img/" + obj.params.db,
            sql: "select " + Tool.fieldAs("id,fromid,hash,width,height,size,addtime,src") + " FROM @.pic " + where + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ this.b02(arr[i].src) + '</td>\
                <td>'+ arr[i].fromid + '</td>\
                <td>'+ arr[i].hash + '</td>\
                <td>'+ arr[i].width + '</td>\
                <td>'+ arr[i].height + '</td>\
                <td>'+ arr[i].size + '</td>\
                <td>'+ Tool.js_date_time2(arr[i].addtime) + '</td>\
            </tr>'
        }
        ////////////////////////////////////////////////////////////
        let html = Tool.header(obj.params.jsFile) + '\
		<div class="p-2">\
			<div style="top: 6px;position: relative;">'+ this.b01() + '</div>\
            <ul class="makeHtmlTab" id="picTab" style="padding-left: 20px;">\
                <li class="hover" onclick="Tool.main(\'?jsFile=js09\')">放大镜图片</li>\
                <li onclick="Tool.main(\'?jsFile=js11\')">属性图片</li>\
                <li onclick="Tool.main(\'?jsFile=js14\')">详情图片</li>\
            </ul>\
			'+ this.b04() + '\
            <table class="table align-top table-hover center">\
				<thead class="table-light">'+ this.b03() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
			</table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
		</div>'
        Tool.html(null, null, html)
    },
    a04: function () {


    },
    b01: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
	        <li onClick="Tool.open4(\'js10\');"><a class="dropdown-item pointer">为图片生成hash值便于【以图搜图】</a></li>\
        </ul>'
    },
    b02: function (pic) {
        return "<a href=\"" + pic + "\" target=\"_blank\"><img src=\"" + pic + "\" class=\"img-fluid rounded\" style=\"height:100px;\"></a>"
    },
    b03: function () {
        let html = '\
        <tr>\
          <th class="w110">图片</th>\
          <th>详情ID</th>\
          <th>hash值</th>\
          <th>宽</th>\
          <th>高</th>\
          <th>大小</th>\
          <th class="w170">时间</th>\
        </tr>'
        return html;
    },
    b04: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">已选择数据库【1688_img/'+ obj.params.db + '】</button>\
            <ul class="dropdown-menu">'+ this.b07() + '</ul>\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b05(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">详情ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">hash值</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "详情ID"; break;
            case "2": name = "hash值"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function () {
        let arr = [];
        if (obj.params.searchword != "") {
            switch (obj.params.field) {
                case "1": arr.push("@.fromid=" + obj.params.searchword); break;//详情ID
                case "2": arr.push("@.hash='" + obj.params.searchword + "'"); break;
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b07: function () {
        let arr = []
        for (let i = 1; i < 100; i++) {
            let name = i.toString().padStart(2, '0')
            arr.push('<li class="dropdown-item pointer" onclick="Tool.main(\'?jsFile='+ obj.params.jsFile+'&db=' + name + '\')">数据库【1688_img/' + name + '】</li>')
        }
        return arr.join("")
    },
    c01: function (val) {
        let name = this.b05("" + val);
        $("#field").html(name).val(val);
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            //Tool.main(obj.arr[3] + "/" + obj.params.db + "/1/" + field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },

}
fun.a01();