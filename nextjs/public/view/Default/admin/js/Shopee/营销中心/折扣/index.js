'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile        选择JS文件
        obj.params.site = obj.params.site ? obj.params.site : "tw";//站点
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        obj.params.status = obj.params.status ? obj.params.status : "";//状态
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "sqlite",
            database: "shopee/营销中心/折扣",
            sql: "select count(1) as total FROM @.table" + this.b03(),
        }, {
            action: "sqlite",
            database: "shopee/营销中心/折扣",
            sql: "select " + Tool.fieldAs("title,status,images,start_time,end_time,addtime") + " FROM @.table" + this.b03() + " order by @.addtime desc " + Tool.limit(10, obj.params.page),
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].title + '</td>\
                <td>'+ this.b08(arr[i].images) + '</td>\
                <td class="center">'+ this.b07(arr[i].status) + '</td>\
                <td class="p-0">'+ this.b05(arr[i].start_time, arr[i].end_time, arr[i].addtime) + '</td>\
           </tr>'
        }
        let html = Tool.header(obj.params.jsFile,obj.params.site) + '\
        <div class="p-2">\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=tw\')"' + (obj.params.site == "tw" ? ' class="hover"' : '') + '>台湾虾皮</li>\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=my\')"' + (obj.params.site == "my" ? ' class="hover"' : '') + '>马来西亚</li>\
                <li onclick="Tool.main(\'?jsFile='+ obj.params.jsFile + '&site=br\')"' + (obj.params.site == "br" ? ' class="hover"' : '') + '>巴西</li>\
            </ul>\
 			'+ this.b06() + '\
           <table class="table align-middle table-hover">\
  			    <thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html1 + '</tbody>\
            </table>' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html);
    },
    //////////////////////////////////////
    b01: function () {
        let html = '\
        <tr>\
            <th style="padding-left: 30px;position: relative;">'+ this.b02() + '促销名称</th>\
            <th>商品</th>\
            <th class="p-0 w160">\
                <select onChange="Tool.open(\'status\',this.options[this.selectedIndex].value)" class="form-select">\
                    <option value="-_-20">状态</option>\
                    <option value="1" '+ (obj.params.status == "1" ? 'selected="selected"' : '') + '>接下来的活动</option>\
                    <option value="2" '+ (obj.params.status == "2" ? 'selected="selected"' : '') + '>进行中的活动</option>\
                    <option value="3" '+ (obj.params.status == "3" ? 'selected="selected"' : '') + '>已过期</option>\
                </select>\
            </th>\
            <th class="w160 center">时间</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js07&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取【折扣】信息</a></li>\
        </ul>'
    },
    b03: function () {
        let arr = ["@.site='" + obj.params.site + "'"];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.title like '%" + obj.params.searchword + "%'"); break;//优惠券名
            }
        }
        if (obj.params.status) { arr.push("@.status=" + obj.params.status); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b04: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "促销名称"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b05: function (start_time, end_time, addtime) {
        return '\
        <table class="table mb-0">\
            <tr><td title="优惠券领取开始时间">'+ Tool.js_date_time2(start_time) + '</td></tr>\
            <tr><td title="优惠券领取结束时间">'+ Tool.js_date_time2(end_time) + '</td></tr>\
            <tr><td title="添加时间">'+ Tool.js_date_time2(addtime) + '</td></tr>\
        </table>'
    },
    b06: function () {
        return '\
          <div class="input-group w-50 m-2">\
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b04(obj.params.field) + '</button>\
              <ul class="dropdown-menu">\
                  <li class="dropdown-item pointer" onclick="fun.c01(1)">促销名称</li>\
              </ul>\
              <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
              <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
          </div>'
    },
    b07: function (val) {
        let str = ""
        if (val == 1) {
            str = '\
            <div style="position: relative;top: -8px;left: 0px;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onclick="Tool.openR(\'?jsFile=js08&site='+ obj.params.site + '&status=' + val + '\')"><a class="dropdown-item pointer">*删除</a></li>\
                </ul>\
            </div>\
            <span class="p-1" style="color:#ee4d2d;background-color:#fff1f0;">接下来的活动</span>'
        }
        else if (val == 2) {
            str = '\
            <div style="position: relative;top: -8px;left: 0px;">\
                <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
                <ul class="dropdown-menu">\
                    <li onclick="Tool.openR(\'?jsFile=js18&site='+ obj.params.site + '&status=' + val + '\')"><a class="dropdown-item pointer">*结束</a></li>\
                </ul>\
            </div>\
            <span class="p-1" style="color: #5c7;background-color:#eaf9ef;">进行中的活动</span>'
        }
        else if (val == 3) {
            str = '<span class="p-1" style="color: #666;background-color:#eee;">已过期</span>'
        }
        else {
            str = "未知：" + val
        }
        return str;
    },
    b08: function (t) {
        let html = "", arr = JSON.parse(t)
        if (arr.length == 0) {
            html = "还没有商品"
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                html += "\
                <a href=\"https://s-cf-sg.shopeesz.com/file/" + arr[i] + "\" target=\"_blank\">\
                    <img src=\"https://s-cf-sg.shopeesz.com/file/"+ arr[i] + "_tn\" class=\"img-fluid rounded w100\">\
                </a>"
            }
        }
        return html;
    },
    /////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b04("" + val);
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
}
fun.a01();