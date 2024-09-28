'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        this.a02();
    },
    a02: function () {
        Tool.header02.a01(obj.arr[3], this.a03, this);
    },
    a03: function (header, fromid, username, token) {
        let html = header + '\
		<div class="p-2">\
            <ul class="makeHtmlTab">\
                <li class="hover" onclick="fun.c01($(this),\'b01\')">基础API</li>\
		    </ul>\
            <table class="table table-hover border">\
              <thead class="table-light">\
              <tr>\
                <th class="w300">API名称</th>\
                <th>API描述</th>\
              </tr>\
              </thead>\
              <tbody id="tbody">'+ this.b01() + '</tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    //公共API>基础API
    b01: function () {
        return '\
    <tr>\
      <td><a href="/docs/api/detail/ca141f2202f4485dbee305b8b528e1b8" target="_blank">dh.base.countrys.get$1.0</a></td>\
      <td>获取国家列表</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/69956f9af2c34b1a9b1201c1dc68c5c6" target="_blank">dh.base.exchangerate.get$2.0</a></td>\
      <td>获取汇率信息接口</td>\
    </tr>\
    <tr>\
      <td><a href="/docs/api/detail/8c1b74105f554afaa8ed2e657217744c" target="_blank">dh.base.measures.get$1.0</a></td>\
      <td>获取单位列表</td>\
    </tr>\
    <tr>\
      <td class="right">来源：</td>\
      <td><a href="https://open.dhgate.com/docs/api/003001" target="_blank">https://open.dhgate.com/docs/api/003001</a>（公共API &gt; 基础API）</td>\
    </tr>';
    },
    c01: function (This, val) {
        $(".makeHtmlTab li").attr("class", "");
        This.attr("class", "hover");
        ///////////////////////////////////////
        let str = "";
        switch (val) {
            case "b01": str = this.b01(); break;
            default: str = '<tr><td colspan="2">未知</td></tr>'; break;
        }
        $("#tbody").html(str)
    }
}
fun.a01();