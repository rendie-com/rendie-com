var fun=
{
	obj:{A1:1,A2:0},
	a01:function()
	{
    let html=Tool.header('正在【统计叶子类目的商品数量】...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr></tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
	{
		let str='[<@page/><r:type db="sqlite.aliexpress" page=2 where=" where @.isleaf=1 order by @.id asc" size=10>,<:fromID/></r:type>]'
		Tool.ajax.a01( str,this.obj.A1,this.a03, this);
  },
	a03:function(oo)
	{
		this.obj.A2=oo[0];
		oo.shift();
		this.a04(oo);
  },
  a04:function(oo)
	{
		if(this.obj.A1<=this.obj.A2)
    {
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（类）');
			this.a05(oo)
		}
		else
		{
			$("#state").html("全部完成...");
		}
  },
  a05:function(oo)
	{
		$("#state").html("正在统计商品数量。。。");
		let arr=[];
		for(let i=0;i<oo.length;i++)
		{
			arr.push('{\
									"fromID":'+oo[i]+',\
									"sort":<r:pro db="sqlite.aliexpress" where=" where @.type='+oo[i]+'" size=1><:count(1)/></r:pro>\
								}');
		}
		Tool.ajax.a01( "["+arr.join(",")+"]",1,this.a06, this);
  },
  a06:function(oo)
	{
		let arr=[]
		for(let i=0;i<oo.length;i++)
		{
			arr.push('update @.type set @.sort='+oo[i].sort+' where @.fromID='+oo[i].fromID)
		}
		$("#state").html("正在更新类目数量。。。");
		let html='<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>'
		Tool.ajax.a01(html,1,this.a07,this)	
  },
  
  a07:function(t)
	{
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			this.a02();
		}
		else
		{Tool.pre(["出错",t]);}
	}
}
fun.a01();