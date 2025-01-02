var fun=
{
	obj:{A1:1,A2:3,B1:1,B2:1,Barr:[0],C1:1,C2:0,Carr:[],Narr:[]},
  a01:function()
  {
    let html=Tool.header('正在【统计一级二级三级类目的商品数量】...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">层进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right w150">父类目进度：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right w150">子类目进度：</td>'+Tool.htmlProgress('C')+'</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在第一层类目...</td></tr></tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
	a02:function()
	{
		if(this.obj.A1<=this.obj.A2)
    {
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（层）');
			this.a03()
		}
		else
		{
			$("#state").html("全部完成...");
		}
  },
	a03:function()
	{
		if(this.obj.B1<=this.obj.B2)
    {
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100)
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（条）');
			this.a04()
		}
		else
		{
			$("#state").html("第"+this.obj.A1+"层完成...");
			this.obj.Barr=this.obj.Narr;
			this.obj.Narr=[];
			this.obj.B1=1
			this.obj.B2=this.obj.Barr.length
			this.obj.A1++;
			this.a02();
		}
  },
	a04:function()
	{
		let html='\
		{\
			"Carr":[0\
				<r:type db="sqlite.aliexpress" where=" where @.upid='+this.obj.Barr[this.obj.B1-1]+' order by @.sort desc" size=50>,\
					<:fromid/>\
				</r:type>]\
		}';
		$("#state").html("正在获取类目...");
   	Tool.ajax.a01(html,1,this.a05,this);
  },
	a05:function(oo)
	{
		this.obj.Carr=oo.Carr
		this.obj.C2=oo.Carr.length-1;
		this.a06()
  },
	a06:function()
	{
		if(this.obj.C1<=this.obj.C2)
    {
			let p1=Math.ceil(this.obj.C1/this.obj.C2*100)
			$("#C1").html(p1+"%").css("width",p1+"%");
			$("#C2").html(this.obj.C1+'/'+this.obj.C2+'（条）');
			this.a07()
		}
		else
		{
			$("#state").html("。。。");
			this.obj.C1=1;
			this.obj.C2=0;
			this.obj.Carr=[]
			this.obj.B1++;
			this.a03();
		}		
  },
	a07:function()
	{
		$("#state").html("正在【统计商品数量】。。。");
		let html='"<r:pro db="sqlite.aliexpress" size="1" where=" where @.type'+this.obj.A1+'='+this.obj.Carr[this.obj.C1]+'"><:count(1)/></r:pro>"'
		this.obj.Narr.push(this.obj.Carr[this.obj.C1]);
		Tool.ajax.a01(html,1,this.a08,this);
  },
	a08:function(t)
	{
		$("#state").html("正在【更新分类】。。。");
		let html='<r: db="sqlite.aliexpress">update @.type set @.sort='+t+' where @.fromid='+this.obj.Carr[this.obj.C1]+'</r:>'
		Tool.ajax.a01(html,1,this.a09,this)
  },
	a09:function(t)
	{
		if(t=="")
		{
			$("#C2").html(this.obj.C1+'/'+this.obj.C2+'（完）');
			this.obj.C1++;
      this.a06();
		}else{alert("出错："+t)}
	}
}.a01();