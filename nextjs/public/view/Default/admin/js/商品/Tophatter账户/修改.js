'use strict';
var fun=
{
	token:"",obj:{},
  a01:function()
	{
		let html='\
    <r:APIaccount size=1 where=" where @.fromid='+obj.arr[4]+' and @.from=\'tophatter\'">\
    {\
      "UserName":"[APIaccount:UserName]",\
      "password":"[APIaccount:password]",\
      "name":"[APIaccount:name]",\
      "industry":"[APIaccount:industry]",\
      "shippingModel":[APIaccount:shippingModel],\
      "afterSaleID":"[APIaccount:afterSaleID]",\
      "Group":[APIaccount:Group],\
      "token":[APIaccount:token],\
      "SizeTemplate":[APIaccount:SizeTemplate],\
      "fromid":[APIaccount:fromid],\
      "upmode":[APIaccount:upmode]\
    }</r:APIaccount>'
		Tool.ajax.a01(html,1,this.a02,this)
	},
  a02:function(oo)
  {
    this.obj=oo;
    if(!oo.upmode.types){oo.upmode.types="";}
		let html='<div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>修改Tophatter账户</div>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">用户名：</li>\
      <li class="w250"><input type="text" class="form-select" value="'+this.obj.UserName+'" onblur="fun.c01($(this),\'UserName\',\''+this.obj.UserName+'\')"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">密码：</li>\
      <li class="w250"><input type="password" class="form-select" value="******" onblur="fun.c01($(this),\'password\',\'******\')"></li>\
    </ul>\
    <ul class="Tul list-group-item-action">\
      <li class="w150 right">提现人：</li>\
      <li class="w250"><input class="form-select" type="text" value="'+this.obj.name+'" onblur="fun.c01($(this),\'name\',\''+this.obj.name+'\')"></li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w150 right">行业：</li>\
      <li class="w150"></li>\
    </ul>\
		<ul class="Tul list-group-item-action">\
      <li class="w150 right">按类目上传：</li>\
      <li><button type="button" class="btn form-control-sm btn-outline-secondary" id="uptype" onclick="fun.c14($(this),\''+oo.upmode.types+'\');" title="注：每个店铺只上传一个产品，这是为了先创建【运费模板】，然后再按【运费模板】上传。">'+(oo.upmode.types?oo.upmode.typesname:'未选择')+'</button></li>\
    </ul>'
		let This=this;
		Tool.html(null,null,html);
  },
  c01:function(This,L,V)
  {
		let val=This.val();
		if(val!=V&&!This.attr("disabled"))
		{
			This.val("加载加...");
			This.attr("disabled",true);
			let txt="<r: tag=\"sql\">update @.APIaccount set @."+L+"='"+val+"' where @.fromid="+obj.arr[4]+" and @.from='tophatter'</r:>"
			Tool.ajax.a01(txt,1,this.c02,this,[This,val]);
		}
  },
  c02:function(t,This)
	{
		if(t=="")
    {This[0].attr("disabled",false);This[0].val(This[1]);}
    else
    {alert("出错："+t);}
  },
}
fun.a01()