var fun=
{
	obj:{A1:1,A2:0,table:obj.arr[5]},
	a01:function() 
  {
    let html=Tool.header('正在从【客户端信息】中获取【系统信息】...')+'\
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
    let str='\
    [\
      '+(this.obj.A1==1?'<@page/>':'0')+'\
      <r:'+this.obj.table+' db="mysql.admin" size=10 page=2 where=" where @.Browser is null or @.Browser=\'\'">\
      ,{\
        "UserAgent":<:UserAgent tag=json/>,\
        "id":"<:id/>"\
      }\
      </r:'+this.obj.table+'>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this)
	},
  a03:function(oo)
	{
		if(this.obj.A1==1){this.obj.A2=oo[0];}
		oo.shift();
		this.a04(oo);
  },
  a04:function(oo)
	{
		if(this.obj.A1<=this.obj.A2)
    {
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（条）');
			this.a05(oo)
		}
		else
		{
			$("#state").html("全部完成");
		}
  },
  a05:function(arr)
	{
		$("#state").html("正在更新。。。")
		let txtArr=[],parser = new UAParser();
		for(let i=0;i<arr.length;i++)
		{
			parser.setUA(arr[i].UserAgent);
			result = parser.getResult();
			txtArr.push('update @.'+this.obj.table+' set @.os='+(result.os.name==undefined?"'Other'":Tool.rpsql(result.os.name))+',@.Browser='+(result.browser.name==undefined?"'Other'":Tool.rpsql(result.browser.name))+' where @.id='+arr[i].id)
		}
		let html='<r: db="mysql.admin">'+txtArr.join("<1/>")+'</r:>'
		Tool.ajax.a01(html,1,this.a06,this);
  },
	a06:function(t)
	{
		if(t=="")
		{
			$("#state").html("更新完。。。")
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			this.a02();
		}
		else
		{Tool.at("出错"+t);}
	}
}
fun.a01();