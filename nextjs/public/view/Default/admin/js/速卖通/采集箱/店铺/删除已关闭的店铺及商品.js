'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[],B1:1,B2:0,Barr:[]},
	a01:function()
	{
    let html=Tool.header('正在【删除已关闭的店铺及商品】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr>\
					<td class="right w150">店铺进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr>\
					<td class="right w150">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
		let str='[\
		{"A2":'+(this.obj.A1==1?'<@count/>':0)+'}\
		<r:shop db="sqlite.aliexpress" size=1 page=2 where=" where @.name=\'店铺已关闭\'">,<:shopid/></r:shop>]'
		$("#state").html("正在获取shopid...");
   Tool.ajax.a01(str,1,this.a03,this)
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
		let str='[\
		{"B2":'+(this.obj.B1==1?'<@page/>':0)+'}\
		<r:pro db="sqlite.aliexpress" size=50 page=2 where=" where @.shopid='+this.obj.Aarr[1]+'">,"<:proid/>"</r:pro>]'
		$("#state").html("正在获取商品ID...");
   Tool.ajax.a01(str,1,this.a06,this)
  },
  a06:function(oo)
  {
		if(this.obj.B1==1){this.obj.B2=oo[0].B2;}
		this.obj.Barr=oo
		this.a07();
  },
  a07:function()
  {
		if(this.obj.B1<=this.obj.B2)
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
			this.a08();
		}
		else
		{
			this.obj.B1=1;
			this.obj.B2=0;
			this.obj.Barr=[];
			$("#state").html("商品删除完成,准备删除店铺...");
			this.a11();
		}
  },
  a08:function()
  {
		let desArr={},oo=this.obj.Barr,proid,desI
		for(let i=1;i<oo.length;i++)
		{
      proid=parseInt(oo[i].substr(1))
      desI=Math.ceil(proid/100000)
      if(desI>9){desI=1;}
			if(!desArr[desI]){desArr[desI]=[];}
      desArr[desI].push(oo[i]);		
		}
		this.a09(desArr)
  },
  a09:function(desArr)
  {
	  alert("要用再说")
		//let arr=[],arr2=this.obj.Barr;
		//for(let k in desArr)
		//{
		//	arr.push('<r: db="sqlite.aliexpressprodes' + Tool.pronum(this.obj.proid, 50) +'">delete from @.prodes where @.proid in(\''+desArr[k].join("','")+'\')</r:>')
		//}		
		//arr2.shift();
		//arr.push('<r: db="sqlite.aliexpress">delete from @.pro where @.proid in(\''+arr2.join("','")+'\')</r:>')
		//Tool.ajax.a01('""'+arr.join(""),1,this.a10,this)
  },
  a10:function(t)
  {
		if(t=="")
		{
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
			this.obj.B1++;
			this.a05();
		}
		else
		{Tool.pre(["出错：",t])}
  },
  a11:function()
  {
		let str='""<r: db="sqlite.aliexpress">delete from @.shop where @.shopid='+this.obj.Aarr[1]+'</r:>'
		Tool.ajax.a01(str,1,this.a12,this)
  },
  a12:function(t)
  {
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
			this.obj.A1++;
			this.a02();
		}
		else
		{Tool.pre(["出错：",t])}
	}
}
fun.a01();