'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header('正在【按条件删除商品】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">商品进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">条件：</td><td id="state" colspan="2">'+Tool.unescape(obj.arr[5])+'</td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
		if(confirm('确定要删除吗？'))
    {
			this.a03();
		}
	},
  a03:function()
  { 
		let str='[\
		{"A2":'+(this.obj.A1==1?'<@page/>':0)+'}\
		<r:pro db="sqlite.aliexpress" size=20 page=2 where=" where '+Tool.unescape(obj.arr[5])+'">,"<:proid/>"</r:pro>]'
		$("#state").html("正在获取商品ID...");
   Tool.ajax.a01(str,1,this.a04,this)
  },
  a04:function(oo)
  {
		if(this.obj.A1==1){this.obj.A2=oo[0].A2;}
		this.obj.Aarr=oo
		this.a05();
  },
  a05:function()
  {
		if(this.obj.A1<=this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
			this.a06();
		}
		else
		{
			$("#state").html("全部完成...");
		}
  },
  a06:function()
  {
		let desArr={},oo=this.obj.Aarr,proid,desI
		for(let i=1;i<oo.length;i++)
		{
      proid=parseInt(oo[i].substr(1))
      desI=Math.ceil(proid/100000)
      if(desI>9){desI=1;}
			if(!desArr[desI]){desArr[desI]=[];}
      desArr[desI].push(oo[i]);		
		}
		this.a07(desArr)
  },
  a07:function(desArr)
  {
	  alert("要用再说")
		//let arr=[],arr2=this.obj.Aarr;
		//for(let k in desArr)
		//{
		//	arr.push('<r: db="sqlite.aliexpress_prodes/' + Tool.pronum(this.sql.proid, 50) k+'">delete from @.prodes where @.proid in(\''+desArr[k].join("','")+'\')</r:>')
		//}		
		//arr2.shift();
		//arr.push('<r: db="sqlite.aliexpress">delete from @.pro where @.proid in(\''+arr2.join("','")+'\')</r:>')
		//Tool.ajax.a01(arr.join(""),1,this.a08,this)
  },
  a08:function(t)
  {
		if(t=="")
		{
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
			this.obj.A1++;
			this.a03();
		}
		else
		{Tool.pre(["出错：",t])}
  }
}
fun.a01();