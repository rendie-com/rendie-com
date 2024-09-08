'use strict';
var fun=
{
	token:"",obj:{},
  a01:function()
	{
		let html='\
    <r:seller size=1 db="mysql.eBay" where=" where @.fromid='+obj.arr[4]+'">\
    {\
      "UserName":"<:UserName/>",\
      "password":"<:password/>",\
      "name":"<:name/>",\
      "industry":"<:industry/>",\
      "fromid":<:fromid/>,\
      "upmode":<:upmode tag=0/>\
    }</r:seller>'
		Tool.ajax.a01(html,1,this.a02,this)
	},
  a02:function(oo)
  {
    this.obj=oo;
		let html='\
		<header class="panel-heading"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>eBay账户_修改</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle center">\
        <tbody>\
				<tr>\
					<td class="w150 right">用户名：</td>\
					<td><input type="text" class="form-control w250" value="'+this.obj.UserName+'" onblur="fun.c01($(this),\'UserName\',\''+this.obj.UserName+'\')"></td>\
				</tr>\
				<tr>\
					<td class="right">密码：</td>\
					<td><input type="password" class="form-control w250" value="******" onblur="fun.c01($(this),\'password\',\'******\')"></td>\
				</tr>\
				<tr>\
					<td class="right">提现人：</td>\
					<td><input class="form-control w250" type="text" value="'+this.obj.name+'" onblur="fun.c01($(this),\'name\',\''+this.obj.name+'\')"></td>\
				</tr>\
				<tr>\
					<td class="right">行业：</td>\
					<td></td>\
				</tr>\
				<tr>\
					<td class="right">按类目上传：</td>\
					<td></td>\
				</tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(null,null,html);
  },
  c01:function(This,L,V)
  {
		let val=This.val();
		if(val!=V&&!This.attr("disabled"))
		{
			This.val("加载加...");
			This.attr("disabled",true);
			let txt="\"\"<r: db=\"mysql.eBay\">update @.seller set @."+L+"='"+val+"' where @.fromid="+obj.arr[4]+"</r:>"
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