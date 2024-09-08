'use strict';
var fun =
{
  a01:function()
  {
    let html = '\
    <header class="panel-heading">eBay -&gt; 国家列表</header>\
		<div class="p-2">\
			<table class="table table-hover align-middle">\
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
			<th>来源ID</th>\
			<th>代码</th>\
			<th>国家名称</th>\
			<th>描述</th>\
			<th>显隐</th>\
			<th>区域</th>\
			<th>区域洲</th>\
			<th>国家代码</th>\
			<th>币种</th>\
			<th>区号代码</th>\
			<th>排序</th>\
    </tr>'
  }
}
fun.a01();