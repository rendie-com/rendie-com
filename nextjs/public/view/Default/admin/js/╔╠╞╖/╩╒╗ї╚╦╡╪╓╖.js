'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js01")//更多
    {
      Tool.scriptArr(['admin/js/商品/收货人地址/修改.js']);
    }
    else if(obj.arr[3]=="js02")
    {
      Tool.scriptArr(['admin/js/商品/收货人地址/获取敦煌订单地址.js']);
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
    <r:ShopUserorder size=20 page=2 where=" order by @.adddate desc,@.id desc">\
    ,{\
      "id":"[ShopUserorder:id]",\
      "username":"[ShopUserorder:username]",\
      "ContactMan":"[ShopUserorder:ContactMan]",\
      "countryid":"[ShopUserorder:countryid]",\
      "country":"<r:country size=1 where=" where @.countryid=\'[ShopUserorder:countryid]\'"> [country:des]([country:name]) </r:country>",\
      "proviceFirstStageName":"[ShopUserorder:proviceFirstStageName]",\
      "addressCitySecondStageName":"[ShopUserorder:addressCitySecondStageName]",\
      "addressCountiesThirdStageName":"[ShopUserorder:addressCountiesThirdStageName]",\
      "Address":"[ShopUserorder:Address]",\
      "Mobile":"[ShopUserorder:Mobile]",\
      "Phone":"[ShopUserorder:Phone]"\
    }\
    </r:ShopUserorder>\
    ]'
    Tool.ajax.a01(str,obj.arr[4],this.a03,this);
  },
  a03:function(arr)
  {
    let html=this.b01();
    for(let i=1;i<arr.length;i++)
    {
      html+='\
      <ul class="Tul list-group-item-action row">\
        <li class="w70 center">'+arr[i].id+'</li>\
        <li class="w100">'+arr[i].username+'</li>\
        <li class="w200">'+arr[i].ContactMan+'</li>\
        <li class="w200">'+arr[i].country+'</li>\
        <li class="col">'+arr[i].proviceFirstStageName+' '+arr[i].addressCitySecondStageName+' '+arr[i].addressCountiesThirdStageName+' '+arr[i].Address+'</li>\
        <li class="w150 center">'+arr[i].Phone+'</li>\
        <li class="operatBoxBtn w30">\
          <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
          <div class="operatBoxMore">\
          <span onClick="Tool.main(\'js01/'+arr[i].id+'\')">修改</span>\
          <span onClick="fun.c05('+arr[i].id+')">删除</span></div>\
        </li>\
      </ul>'
    }
    html+=Tool.page(arr[0].count,arr[0].size,4)
    Tool.html(null,null,html);
  },
  b01:function()
  {
    let html='\
    <div class="Tul thead">收货人地址</div>\
    <div class="Tul">\
    <div class="input-group w500">\
      <div class="input-group-prepend">\
      <select id="Field" class="form-select">\
        <option value="1" '+(obj.arr[9]=="1"?'selected="selected"':'')+'>商品编码</option>\
        <option value="2" '+(obj.arr[9]=="2"?'selected="selected"':'')+'>商品来源ID</option>\
        <option value="3" '+(obj.arr[9]=="3"?'selected="selected"':'')+'>运费模板ID</option>\
      </select>\
      </div>\
      <input type="text" class="form-select" id="searchword" value="" onKeyDown="javascript:if(event.keyCode==13) fun.c02();">\
      <div class="input-group-append"><button class="btn btn-outline-secondary form-control-sm" type="button" onclick="fun.c02();">搜索</button></div>\
    </div>\
    </div>\
    <ul class="Tul center row">\
      <li class="w70">ID</li>\
      <li class="w100">用户名</li>\
      <li class="w200">收货人姓名</li>\
      <li class="w200">收货人国家</li>\
      <li class="col">收货人地址</li>\
      <li class="w150">手机</li>\
      <li class="operatBoxBtn w30">\
        <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
        <div class="operatBoxMore">\
          <span onclick="fun.c03()">添加</span>\
          <span onclick="Tool.main(\'js02\')">获取敦煌订单地址</span>\
        </div>\
      </li>\
    </ul>'
    return html;
  },
  c01:function()
  {},
	c02:function()
	{
    let Field=$("#Field").val(),searchword=Tool.Trim($("#searchword").val());
    if(Field=="2"&&isNaN(searchword))
    {
      alert("【商品来源ID】必须是数字。")
    }
    else if(searchword)
    {   
      searchword=encodeURIComponent(searchword)
      Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/"+obj.arr[3]+"/1/%20/%20/%20/%20/"+Field+"/"+searchword);
    }else{alert("请输入搜索内容");}    
	},
	c03:function()
	{
    let str='<r: tag="sql">insert into @.ShopUserOrder(:UserName)values(\'请选择用户名\')</r:>'
   Tool.ajax.a01(str,1,this.c04,this);
  },
  c04:function(t)
  {
    if(t==""){window.location.reload();}
    else
    {document.write("出错:"+t);}
  },
  c05:function(id)
  {
    if(confirm('确定要删除吗'))
    {
      let str='<r: tag="sql">delete from @.ShopUserOrder where @.id='+id+'</r:>'
     Tool.ajax.a01(str,1,this.c04,this);
    }
  }
}
fun.a01();