'use strict';
var fun=
{
  pro:[],
  obj:{A1:1,A2:0,Aarr:[]},
  token:"",
  a01:function()
  {
		obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
		obj.arr[5]=obj.arr[5]?obj.arr[5]:"1";//搜索字段
		obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//搜索关键词
		obj.arr[7]=obj.arr[7]?obj.arr[7]:"-_-20";//审核状态
		obj.arr[8]=obj.arr[8]?obj.arr[8]:"-_-20";//【上传/更新/下架】时间
		obj.arr[9]=obj.arr[9]?obj.arr[9]:"-_-20";//来源/账户/来源ID/折扣
		obj.arr[10]=obj.arr[10]?obj.arr[10]:"-_-20";//
		this.a02();
  },
  a02:function()
  {
		let html2='<header class="panel-heading">Amazon - 已上传商品</header>\
		<div class="p-2">\
			<table class="table align-top table-hover">\
				<thead class="table-light">'+this.b01()+'</thead>\
				<tbody></tbody>\
			</table>\
		</div>'
		Tool.html(null,null,html2)
	},
  b01:function()
  {
    let html='\
    <tr>\
      <th>短信息</th>\
      <th>长信息</th>\
    </tr>'
    return html;
  }
}
fun.a01();