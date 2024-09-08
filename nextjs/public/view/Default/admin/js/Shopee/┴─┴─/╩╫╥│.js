'use strict';
var fun =
{
    a01: function () {

        this.a02();
    },
    a02: function () {
        let html = '<header class="panel-heading">Shopee &gt; 聊聊</header>\
		<div class="p-2">\
			<table class="table align-top table-hover">\
				<tbody><tr><td>未开发</td></tr></tbody>\
			</table>\
		</div>'

        Tool.html(null, null, html)
    },
}
$(function () {
    fun.a01();
})
