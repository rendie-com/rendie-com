var fun=
{
	obj:{A1:1,A2:0},
  a01:function()
  {
    let html=Tool.header("正在【设置type1_type2_type3字段内容】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">商品进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在商品分类...</td></tr></tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
	a02:function()
	{
		let html='{\
		"A2":<@count/>\
		<r:pro db="sqlite.aliexpress" size="1" page="2" where=" where @.type1=0">,\
			"type":"<:type/>",\
			"typeArr":[\
				<r:type db="sqlite.aliexpress" where=" where @.fromid=<:type/>" size=1>\
					<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
						<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
							<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
								<:fromid/>,\
							</r:type>\
							<:fromid/>,\
						</r:type>\
						<:fromid/>,\
					</r:type>\
					<:fromid/>\
				</r:type>]\
		</r:pro>}';
		$("#state").html("正在获取分类");
   	Tool.ajax.a01(html,1,this.a03,this);
  },
	a03:function(oo)
	{
		if(oo.A2==0)
		{$("#state").html("全部完成");}
		else
		{
			this.obj.A2=oo.A2
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（条）');
			this.a04(oo)
		}
  },
	a04:function(oo)
	{
		$("#state").html("正在【更新分类】。。。");
		let type1=oo.typeArr[0]?'@.type1='+oo.typeArr[0]:'@.type1=-1';
		let type2=oo.typeArr[1]?',@.type2='+oo.typeArr[1]:'';
		let type3=oo.typeArr[2]?',@.type3='+oo.typeArr[2]:'';
		let txt='<r: db="sqlite.aliexpress">update @.pro set '+type1+type2+type3+' where @.type='+oo.type+'</r:>'
		Tool.ajax.a01(txt,1,this.a05,this)
  },
	a05:function(t)
	{
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
       this.a02();
		}else{alert("出错："+t)}
  }
}.a01();