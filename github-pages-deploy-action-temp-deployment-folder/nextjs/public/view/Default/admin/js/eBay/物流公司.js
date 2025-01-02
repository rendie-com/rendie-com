'use strict';
var fun =
{
  a01:function()
  {
    let html = '\
    <header class="panel-heading">eBay -&gt; 物流公司</header>\
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
			<th>编号</th>\
			<th>物流公司名称</th>\
			<th>绑定到【速卖通】</th>\
			<th>物流公司代码</th>\
			<th>APIkey</th>\
			<th>来源</th>\
			<th>排序</th>\
			<th>默认</th>\
		</tr>'
  }
}
fun.a01();