'use strict';
var fun =
{
    a01: function () {
        
        this.a02();
    },
    a02: function () {
        let html = Tool.header(obj.params.jsFile)+'\
		<div class="p-2">\
			<table class="table align-top table-hover">\
				<tbody><tr><td>未开发1111111111</td></tr></tbody>\
			</table>\
		</div>'
        Tool.html(null, null, html)
    },
}
fun.a01();