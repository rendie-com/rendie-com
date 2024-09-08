var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header('正在【按条件隐藏三级类目】...')+'\
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
		let str='[0<r:type db="sqlite.aliexpress" where=" where @.upid=0 and @.hide=0" size=50>,<:fromID/></r:type>]'
		Tool.ajax.a01(str,1,this.a03,  this);
  },
  a03:function(oo)
	{
		oo.shift();
		this.obj.A2=oo.length;
		this.obj.Aarr=oo;
		this.a04();
  },
  a04:function()
	{
		if(this.obj.A1<=this.obj.A2)
    {
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（类）');
			this.a05()
		}
		else
		{
			$("#state").html("全部完成...");
		}
  },
  a05:function()
	{
		$("#state").html("来源ID："+this.obj.Aarr[this.obj.A1-1]);
		let str='[0<r:type db="sqlite.aliexpress" where=" where @.upid='+this.obj.Aarr[this.obj.A1-1]+' and @.hide=0" size=50>,<:fromID/></r:type>]'
		Tool.ajax.a01( str,1,this.a06, this);
  },
  a06:function(oo)
	{
		oo.shift();
		let html='""<r: db="sqlite.aliexpress">update @.type set @.hide=1 where @.upid in('+oo.join(",")+') and @.sort<1</r:>'
		Tool.ajax.a01(html,1,this.a07,this)	
  },
  a07:function(t)
	{
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			this.a04();
		}
		else
		{Tool.pre(["出错",t]);}
	}
}
fun.a01();