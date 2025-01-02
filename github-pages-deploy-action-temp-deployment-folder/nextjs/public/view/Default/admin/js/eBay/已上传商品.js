'use strict';
var fun =
{
  a01:function()
  {
    let html = '\
    <header class="panel-heading">eBay -&gt; 已上传商品</header>\
		<div class="p-2">\
			<table class="table align-top table-hover">\
				<thead class="table-light">'+this.b01()+'</thead>\
				<tbody></tbody>\
			</table>\
		</div>'
    Tool.html(null,null,html);
	},
  b01:function()
  {
    return '\
    <tr>\
			<th>编码/状态/店铺</th>\
			<th>图片</th>\
			<th>标题</th>\
    </tr>'
  }
}
fun.a01();