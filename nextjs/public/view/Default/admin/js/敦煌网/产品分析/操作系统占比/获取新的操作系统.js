var fun=
{
	obj:{A1:1,A2:0,Aobj:{},table:obj.arr[5]},
	a01:function()
	{
    let html=Tool.header('正在获取新的操作系统...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">入库查询表：</td><td colspan="2">【'+this.obj.table+'】和【'+this.obj.table+'_os】</td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
			</tbody>\
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
    <r:'+this.obj.table+' db="mysql.admin" size=100 page=2>,\
		{\
      "OS":"<:OS/>"\
    }\
    </r:'+this.obj.table+'>]';
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
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（条）');
			this.a05(oo)
		}
		else
		{
			$("#state").html("正准备添加...");
			this.a06();
		}
  },
  a05:function(oo)
	{
		$("#state").html("正在去重复。。。");
		for(let i=0;i<oo.length;i++)
		{
			oo[i].OS=Tool.titleCase(oo[i].OS);
			this.obj.Aobj[oo[i].OS]=true;
		}
		////////////////////////////////////////////////////////////
		$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
		this.obj.A1++;
		this.a02();
  },
  a06:function()
	{
		let arr=[],sel='';
		for(let k in this.obj.Aobj)
		{
			if(k!='')
			{
				sel='select count(1) from @.'+this.obj.table+'_os where @.os=\''+k+'\''
				arr.push('<if Fun(Db(mysql.admin,'+sel+',count))==0><r: db="mysql.admin">insert into @.'+this.obj.table+'_os(@.os)values(\''+k+'\')</r:></if>\
				');
			}
		}
		$("#state").html("正在添加。。。");
		Tool.ajax.a01(arr.join(""),1,this.a07,this)	
  },
	a07:function(t)
	{
		if(Tool.Trim(t)=="")
		{
			$("#state").html("全部完成");
		}
		else
		{Tool.at("出错"+t);}
	}
}
fun.a01()