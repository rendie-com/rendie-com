'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header('正在【从商品表中获取店铺ID】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">商品进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备商品...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
		let str='[\
		{"A2":'+(this.obj.A1==1?'<@page/>':0)+'}\
		<r:pro db="sqlite.aliexpress" size=100 page=2 where=" order by @.shopid asc,@.id asc">,\
			{"shopid":<:shopid/>}\
		</r:pro>]'
		$("#state").html("正在获取shopid...");
	  Tool.ajax.a01(str, this.obj.A1,this.a03,this)
  },
  a03:function(oo)
  {
		if(this.obj.A1==1){this.obj.A2=oo[0].A2;}
		let o1={};for(let i=1;i<oo.length;i++){o1[oo[i].shopid]=true;}
		this.obj.Aarr=o1
		this.a04();
  },
  a04:function()
  {
		if(this.obj.A1<=this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			this.a05();
		}
		else
		{
			$("#state").html("全部完成");
		}
  },
  a05:function()
  {
		let arr=[],o1=this.obj.Aarr
		for(let k in o1)
		{
			arr.push('<.Db(sqlite.aliexpress,select count(1) from @.shop where @.shopid='+k+',count)/>');
		}
		$("#state").html("正在查看是否存在...");
		Tool.ajax.a01("["+arr.join(",")+"]",1,this.a06,this)
  },
  a06:function(oo)
  {
		let arr=[],o1=this.obj.Aarr,i=0
		for(let k in o1)
		{
			if(oo[i]==0)
			{
				arr.push('insert into @.shop(@.shopid,@.addtime)values('+k+','+Tool.gettime("")+')')
			}
			i++;
		}
		if(arr.length==0)
		{this.a07("");}
		else
		{
			let str='""<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>'
			$("#state").html("正在插入...");
			Tool.ajax.a01(str,1,this.a07,this)
		}
  },
  a07:function(t)
  {
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			this.obj.Aarr=[];
			this.obj.A1++;
			this.a02();
		}
		else
		{Tool.pre(["出错",t]);}
	}
}
fun.a01();