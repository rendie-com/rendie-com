var fun=
{
	obj:{A1:1,A2:0,Aobj:{},table:obj.arr[5]},
	a01:function()
	{
    let html=Tool.header('正在统计操作系统的访问次数...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">入库查询表：</td><td colspan="2">【'+this.obj.table+'_os】 和 【'+this.obj.table+'】。</td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
	{
		let str='[\
    {\
      "A2":<@page/>\
    }\
    <r:'+this.obj.table+'_os db="mysql.admin" size=1 page=2>,\
		{\
       "id":<:id/>,\
			 "count":<:OS Fun=Db(mysql.admin,select count(1) as total from @.'+this.obj.table+' where @.os=\'$1\',count)/>\
    }\
    </r:'+this.obj.table+'_os>]';
		$("#state").html("正在统计。。。");
		Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
	a03:function(oo)
	{
		this.obj.A2=oo[0].A2;
		oo.shift();
		this.a04(oo);
	},
  a04:function(oo)
	{
		if(this.obj.A1<=this.obj.A2)
    {
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			this.a05(oo)
		}
		else
		{
			$("#state").html("全部完成.");
		}
  },
	a05:function(oo)
	{
		$("#state").html("正在更新。。。");
		let html='<r: db="mysql.admin">update @.'+this.obj.table+'_os set @.count='+oo[0].count+' where @.id='+oo[0].id+'</r:>'
		Tool.ajax.a01(html,1,this.a06,this)	
		
  },
	a06:function(t)
	{
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			this.a02();
		}
		else
		{Tool.at("出错"+t);}
	}
}
fun.a01();