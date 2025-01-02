'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        this.a02();
    },
    a02: function () {
        let html = Tool.header()+'\
		<div class="p-2">\
			<table class="table align-top table-hover">\
				<tbody><tr><td>未开发44444</td></tr></tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html)
    },
}
fun.a01();