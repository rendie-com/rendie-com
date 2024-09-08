'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? Tool.int(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        this.a02();
    },
    a02: function () {
        let str = '[\
        {"count":<@count/>}\
        <r:pic1 size=10 db="sqlite.ozon_img" page=2 where="' + this.b06() + '">,\
            {\
            "id":<:id/>,\
            "proid":"<:proid/>",\
            "hash":"<:hash/>",\
            "width":<:width/>,\
            "height":<:height/>,\
            "size":<:size/>,\
            "addtime":<:addtime/>,\
            "src":"<:src/>"\
            }\
        </r:pic1>]'
        Tool.ajax.a01(str, obj.arr[5], this.a03, this);
    },
    a03: function (arr) {
        let html1 = ""
        for (let i = 1; i < arr.length; i++) {
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
        html1 += '<tr><td colspan="7" class="left">' + Tool.page(arr[0].count, 10, 5) + '</td></tr>'
        ////////////////////////////////////////////////////////////
        let html = Tool.header() + '\
        <div class="p-2">\
            <div style="top: 6px;position: relative;">'+ this.b01() + '</div>\
                    <ul class="makeHtmlTab" id="picTab" style="padding-left: 20px;">\
                        <li class="hover" onclick="Tool.main(\'xxx\')">首图</li>\
                        <li onclick="Tool.main(\'xxx\')">放大镜图片</li>\
                        <li onclick="Tool.main(\'xxx\')">属性图片_aliexpress</li>\
                        <li onclick="Tool.main(\'xxx\')">属性图片_1688</li>\
                        <li onclick="Tool.main(\'xxx\')">详情图片</li>\
                    </ul>\
                    '+ this.b04() + '\
                    <table class="table align-top table-hover center">\
                <thead class="table-light">'+ this.b03() + '</thead>\
                <tbody>'+ html1 + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html)
    },
    ///////////////////////////////////////////////////////////////
    b01: function () {
        return '\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu">\
           <li onClick="Tool.open4(\'js03\');"><a class="dropdown-item pointer">*把【全球商品】的图片上传到Shopee平台</a></li>\
          </ul>'
    },
    b02: function (pic) {
        return "<a href=\"" + pic + "\" target=\"_blank\"><img src=\"" + pic + "\" class=\"img-fluid rounded\" style=\"height:100px;\"></a>"
    },
    b03: function () {
        let html = '\
          <tr>\
            <th class="w110">图片</th>\
            <th>商品编码</th>\
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
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b05(obj.arr[5]) + '</button>\
              <ul class="dropdown-menu">\
                  <li class="dropdown-item pointer" onclick="fun.c01(1)" value="1">详情ID</li>\
                  <li class="dropdown-item pointer" onclick="fun.c01(2)" value="2">hash值</a></li>\
              </ul>\
              <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
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
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.fromid=" + Tool.unescape(obj.arr[6])); break;//详情ID
                case "2": arr.push("@.hash='" + Tool.unescape(obj.arr[6]) + "'"); break;
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    ///////////////////////////////////////////////
    c01: function (val) {
        let name = this.b05("" + val);
        $("#Field").html(name).val(val);
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else { alert("请输入搜索内容"); }
    },

}
fun.a01();