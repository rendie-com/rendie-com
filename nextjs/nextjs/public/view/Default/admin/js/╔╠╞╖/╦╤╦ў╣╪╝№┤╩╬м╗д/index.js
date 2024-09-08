'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
		if(obj.arr[3]=="js01")
		{
			Tool.scriptArr(['admin/js/商品/搜索关键词维护/从速卖通提取商品关键词.js']);
		}
		else if(obj.arr[3]=="js02")
		{
			Tool.scriptArr(['admin/js/商品/搜索关键词维护/统计关键词的商品数量.js']);
		}
		else if(obj.arr[3]=="js03")
		{
			Tool.scriptArr(['admin/js/商品/搜索关键词维护/删除商品数量小于3的关键词.js']);
		}
		else
		{
			obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
			obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//搜索关键词
			this.a02();
		}
  },
  a02:function()
	{
    let str='[\
		{\
      "size":20,\
      "count":<@count/>\
		}\
    <r:keys size=20 db="sqlite.pro" page=2 where=" '+this.b02()+' order by @.proNum desc,@.id asc">,\
    {\
      "keys":<:keys tag=json/>,\
      "proNum":<:proNum/>,\
      "hit":<:hit/>,\
      "addDate":<:addDate/>,\
      "LastUseTime":<:LastUseTime/>,\
      "id":<:id/>\
    }\
    </r:keys>]'
    Tool.ajax.a01( str,obj.arr[4],this.a03,this)
  },
  a03:function(oo)
	{
    let html='\
    <header class="panel-heading">搜索关键词维护</header>\
    <div class="input-group w-50 m-2">\
			<input type="text" class="form-control" id="searchword" value="'+Tool.Trim(Tool.unescape(obj.arr[5]))+'" onkeydown="if(event.keyCode==13) fun.c02();">\
			<button class="btn btn-outline-secondary" type="button" onclick="fun.c02();">搜索</button>\
		</div>\
    <div class="p-2">\
			<table class="table table-hover align-middle center">\
			<thead class="table-light">\
			<tr>\
				<th class="w70">ID</th>\
				<th>关键词</th>\
				<th>搜索频率(次)</th>\
				<th>商品数量</th>\
				<th>最后搜索时间</th>\
				<th>第一次搜索时间</th>\
				<th class="w30" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onClick="Tool.open4(\'js01\')"><a class="dropdown-item pointer">从速卖通提取商品关键词</a></li>\
						<li onClick="fun.c04()"><a class="dropdown-item pointer">统计关键词的商品数量</a></li>\
						<li onClick="Tool.open4(\'js03\')"><a class="dropdown-item pointer" title="包括：商品是的关键词">删除商品数量小于3的关键词</a></li>\
					</ul>\
				</th>\
			</tr>\
			</thead>\
			<tbody>'+this.b01(oo)+'</tbody>\
			</table>\
		</div>'
    Tool.html(null,null,html)
  },
  b01:function(oo)
	{
		let str=''
		for(let i=1;i<oo.length;i++)
		{
			str+='\
			<tr>\
				<td>'+oo[i].id+'</td>\
				<td>'+oo[i].keys+'</td>\
				<td>'+oo[i].hit+'</td>\
				<td>'+oo[i].proNum+'</td>\
				<td>'+oo[i].LastUseTime+'</td>\
				<td>'+oo[i].addDate+'</td>\
				<td style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onClick="fun.c06('+oo[i].id+')"><a class="dropdown-item pointer">删除</a></li>\
					</ul>\
				</td>\
			</tr>'
		}
    str+='<tr><td colspan="7" class="left">'+Tool.page(oo[0].count, oo[0].size,4) +'</td></tr>'
		return str;
  },
  b02:function()
	{
		let str='';
		if(obj.arr[5]!="-_-20")
    {
			str=" where @.keys like '%"+Tool.sql01(Tool.unescape(obj.arr[5]))+"%'";
		}
		return str
	},
  c01:function(){},
  c02:function()
  {
    let searchword=Tool.Trim($("#searchword").val());
    if(searchword)
    {        
      searchword=encodeURIComponent(searchword);
      Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/"+obj.arr[3]+"/1/"+searchword);
    }else{alert("请输入搜索内容");}  
  },
  c03:function()
	{
    let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
    Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/js01/"+r);
  },
  c04:function()
	{
    let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
    Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/js02/"+r);
  },
  c05:function()
	{

  },
  c06:function(id)
	{
    if(confirm('确定要删除吗？'))
    {
      let str = '""<r: db="sqlite.pro">delete from @.keys where @.id='+id+'</r:>'
		Tool.ajax.a01(str,1,Tool.reload);
    }
	}
}
fun.a01();