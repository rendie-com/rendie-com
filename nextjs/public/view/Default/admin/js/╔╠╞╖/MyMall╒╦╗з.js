'use strict';
var fun=
{
  token:"",obj:{},
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    if(obj.arr[3]=="js1")//修改
    { 
      //obj.arr[4]    账号来源ID
      Tool.scriptArr(['admin/js/MyMall/MyMall账户/修改js']);
    }
    else{this.a02();}
    
  },
  a02:function(t)
  {
    let str='[\
    {}\
    <r:APIaccount size=50 page=5 where=" where @.from=\'mymall\' order by @.sort asc,@.id asc">,\
    {\
      "sort":[APIaccount:sort],\
      "id":[APIaccount:id],\
      "note":"[APIaccount:note]",\
      "name":"[APIaccount:name]",\
      "UserName":"[APIaccount:UserName]",\
      "password":"[APIaccount:password]",\
      "hide":[APIaccount:hide],\
      "fromid":[APIaccount:fromid]\
    }\
    </r:APIaccount>]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(arr)
  {
    let html=this.b01();
    for(let i=1;i<arr.length;i++)
    {
      html+='<ul class="Tul center list-group-item-action">\
      <li class="w40">\
        <input type="text" class="form-select center" value="'+arr[i].sort+'" onblur="fun.c44($(this),'+arr[i].id+',\'sort\',\''+arr[i].sort+'\')"/>\
      </li>\
      <li class="w150">'+arr[i].UserName+'</li>\
      <li class="w150">'+arr[i].password+'</li>\
      <li class="w100">\
        <input type="text" value="'+arr[i].note+'" class="form-select" onblur="fun.c44($(this),'+arr[i].id+',\'note\',\''+arr[i].note+'\')"/>\
      </li>\
      <li class="w70">'+arr[i].name+'</li>\
      <li class="w40"></li>\
      <li class="w150"></li>\
      <li class="w130"></li>\
      <li class="w50"></li>\
      <li class="w60"></li>\
      <li class="w40"></li>\
      <li class="w70"></li>\
      <li class="w60">'+(arr[i].hide==0?'<a href="javascript:;" onclick="fun.c42($(this),'+arr[i].id+',1)" title="点击【禁用】">正常</a>':'<a href="javascript:;" onclick="fun.c42($(this),'+arr[i].id+',0)" title="点击【正常】">已禁用</a>')+'</li>\
      <li class="operatBoxBtn w30">\
        <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
        <div class="operatBoxMore">\
        <span onClick="Tool.main(\'js3/'+arr[i].fromid+'\')">更多</span>\
        <span onclick="fun.c04($(this),'+arr[i].fromid+')">同步</span>\
        <span onClick="Tool.main(\'js1/'+arr[i].fromid+'\')">修改</span>\
        <span onClick="fun.c26('+arr[i].id+')">删除</span></div>\
      </li>\
      </ul>'
    }
    Tool.html(null,null,html)
  },
  b01:function(t)
  {
    let str='\
    <div class="Tul thead">MyMall账户（<a href="https://mall.my.com/" target="_blank">https://mall.my.com/</a>）</div>\
    <ul class="Tul center Title">\
      <li class="w40">编号</li>\
      <li class="w150">用户名</li>\
      <li class="w150">密码</li>\
      <li class="w100">备注</li>\
      <li class="w70">提现人</li>\
      <li class="w40">行业</li>\
      <li class="w150" title="交易违规/产品信息违规/知识产权禁限售/知识产权禁限售(第三方投诉)/待查看处罚/可解除处罚/需申诉处理的处罚">处罚</li>\
      <li class="w130">上架/总数/上限</li>\
      <li class="w50">下架</li>\
      <li class="w60">未通过</li>\
      <li class="w40">投诉</li>\
      <li class="w70">提现金额</li>\
      <li class="w60">状态</li>\
      <li class="operatBoxBtn w40">\
        <button title="操作" class="menu-button"><div></div><div></div><div></div></button>\
        <div class="operatBoxMore">\
          <span onClick="Tool.main(\'js4\')">更多</span>\
          <span onclick="fun.c04($(this),\'all\')" title="包括【上架】【下架】【待审核】【审核未通过】【品牌商投诉】">同步商品状态</span>\
          <span onclick="fun.c01()">添加账户</span>\
        </div>\
      </li>\
    </ul>'
    return str
  },
	c01:function()
	{
    let fromid=parseInt(Math.random()*999)
		let html='{if "Fun(Db(select top 1 count(1) from @.APIaccount where @.fromid='+fromid+',count))"=="0"}<r: tag="sql">INSERT into @.APIaccount(:from,:sort,:fromid)VALUES(\'mymall\',(SELECT count(1)+1 from @.APIaccount where @.from=\'mymall\'),'+fromid+')</r:>{else/}重设{/if}'
		Tool.ajax.a10(html,1,this.c02,this)
  },
  c02:function(t)
	{
		if(t==""){location.reload();}else if(t=="重设"){this.c01();}else{alert("出错："+t);}
  },
}
fun.a01();