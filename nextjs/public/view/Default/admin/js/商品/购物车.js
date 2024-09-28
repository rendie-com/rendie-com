'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")//更多
    {
      Tool.scriptArr(['admin/js/商品/购物车/修改.js']);
    }
    else
    {
      obj.arr[4]=obj.arr[4]?obj.arr[4]:1;//翻页
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
    <r:ShoppingCart size=20 page=2 where=" order by @.id desc">\
    ,{\
      "id":"[ShoppingCart:id]",\
      "attr":"[ShoppingCart:attr]",\
      "username":"[ShoppingCart:username]",\
      "userid":"[ShoppingCart:userid]",\
      "proid":"[ShoppingCart:proid]",\
      "amount":[ShoppingCart:amount],\
      "adddate":"[ShoppingCart:adddate]"\
    }\
    </r:ShoppingCart>\
    ]'
    Tool.ajax.a01(str,obj.arr[4],this.a03,this);
  },
  a03:function(arr)
  {
    let html=this.b01();
    for(let i=1;i<arr.length;i++)
    {
      html+='\
      <ul class="Tul center list-group-item-action row">\
        <li class="w70">'+arr[i].id+'</li>\
        <li class="w100">'+arr[i].username+'（'+arr[i].userid+'）</li>\
        <li class="w100">'+arr[i].attr+'</li>\
        <li class="w100">'+arr[i].proid+'</li>\
        <li class="w100">'+arr[i].amount+'</li>\
        <li class="w150">'+arr[i].adddate+'</li>\
        <li class="operatBoxBtn w40">\
        <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
        <div class="operatBoxMore">\
        <span onClick="">修改</span>\
        <span onClick="fun.c02('+arr[i].id+')">删除</span></div>\
      </li>\
      </ul>'
    }
    html+=Tool.page(arr[0].count,arr[0].size,4)
    Tool.html(null,null,html);
  },
  b01:function()
  {
    let html='\
    <div class="Tul thead">购物车</div>\
    <div class="Tul">\
    <div class="input-group w500">\
      <div class="input-group-prepend">\
      <select id="Field" class="form-select">\
        <option value="1" '+(obj.arr[9]=="1"?'selected="selected"':'')+'>用户名</option>\
        <option value="2" '+(obj.arr[9]=="2"?'selected="selected"':'')+'>用户名ID</option>\
      </select>\
      </div>\
      <input type="text" class="form-select" id="searchword" value="" onKeyDown="javascript:if(event.keyCode==13) fun.c02();">\
      <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="fun.c02();">搜索</button></div>\
    </div>\
    </div>\
    <ul class="Tul center row">\
      <li class="w70">ID</li>\
      <li class="w100">用户名(ID)</li>\
      <li class="w100">购买后的属性</li>\
      <li class="w100">商品编码</li>\
      <li class="w100">数量</li>\
      <li class="w150">添加时间</li>\
      <li class="w40">操作</li>\
    </ul>'
    return html;
  },
  c01:function()
  {},
  c02:function(id)
	{
		if(confirm('确定删除吗?'))
		{
			let html="[<r: tag=\"sql\">delete from @.ShoppingCart where @.id="+id+"</r:>]"
			Tool.ajax.a01(html,1,this.c03,this)
		}
	},
  c03:function(t)
	{
		if(t[0]==null){location.reload();}else{alert("出错："+t);}
  },
}
fun.a01();