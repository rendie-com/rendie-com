'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header('正在【按店铺ID统计商品数量】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">店铺进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备店铺...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
		let str='[\
		{"A2":'+(this.obj.A1==1?'<@page/>':0)+'}\
		<r:shop db="sqlite.aliexpress" size=50 page=2>,\
			{\
				"id":<:id/>,\
				"count1":<:shopid Fun=Db(sqlite.aliexpress,select count(1) from @.pro where @.shopid=$1,count)/>,\
				"count2":<:shopid Fun=Db(sqlite.aliexpress,select count(1) from @.pro where @.shopid=$1 and @.hide=0,count)/>\
			}\
		</r:shop>]'
		$("#state").html("正在统计数量...");
    Tool.ajax.a01(str,this.obj.A1,this.a03,this)
	},
  a03:function(oo)
  {
		if(this.obj.A1==1){this.obj.A2=oo[0].A2;}
		this.obj.Aarr=oo
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
		for(let i=1;i<o1.length;i++)
		{
			arr.push('update @.shop set @.count1='+o1[i].count1+',@.count2='+o1[i].count2+' where @.id='+o1[i].id);
		}
		$("#state").html("正在更新数量...");
		let str='""<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>'
		Tool.ajax.a01(str,1,this.a06,this)
  },
  a06:function(t)
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