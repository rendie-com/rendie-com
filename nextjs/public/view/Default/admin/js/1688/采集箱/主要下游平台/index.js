'use strict';
var fun =
{
    a01: function () {
        this.a02();
    },
    a02: function () {
        let html1 = "", arr = MainDownstreamPlatforms;
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td> ' + (i + 1) + '</td>\
                <td> ' + arr[i].name + '</td>\
                <td class="left">'+ arr[i].count + '</td>\
            </tr>'
        }
        let html2 = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
        	<table class="table center table-hover">\
        		<thead class="table-light">'+ this.b01() + '</thead>\
        		<tbody>'+ html1 + '</tbody>\
        	</table>\
        </div>'
        Tool.html(null, null, html2)
    },
    ////////////////////////////////////
    b01: function (oo) {
        let html = '\
          <tr>\
            <th class="w70">编号</th>\
            <th class="w200">平台</th>\
            <th class="left">使用次数</th>\
          </tr>'
        return html;
    },
}
fun.a01()