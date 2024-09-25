'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header("正在【统计关键词的商品数量】任务。。。")+'\
		<div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">关键词进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
		let str='""<r: db="sqlite.pro">update @.keys set @.proNum=0</r:>'
		$("#state").html("正在复位点击量。。。")
		Tool.ajax.a01(str,1,this.a03,this);
	},
  a03:function()
  {
    let str = '[\
		{\
      "size":10,\
      "A2":'+(this.obj.A2==0?'<@page/>':'0')+'\
		}\
		<r:keys size=10 page=2 db="sqlite.pro">,\
		{\
			<r:pro size=1 db="sqlite.aliexpress" where=" where @.keywords like \'%,<:keys tag=sql/>,%\'">\
			"proNum":<:count(1)/>,\
			</r:pro>\
			"keys":<:keys tag=json/>\
		}\
		</r:keys>]'
		$("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 正在统计关键词的商品数量。。。')
    Tool.ajax.a01(str,this.obj.A1,this.a04, this)	
	},
  a04:function(oo)
	{
    if(this.obj.A2==0){this.obj.A2=oo[0].A2;}
		oo.shift()
		this.obj.Aarr=oo;
		this.a05();
	},
  a05:function()
  {
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06,this);
	},
  a06:function()
  {
		$("#state").html("正在组装SQL。。。");
		let arr=[],oo=this.obj.Aarr
		for(let i=0;i<oo.length;i++)
		{
			arr.push("update @.keys set @.proNum="+oo[i].proNum+" where @.keys="+Tool.rpsql(oo[i].keys))
		}
		let str='""<r: db="sqlite.pro">'+arr.join("<1/>")+'</r:>'
		Tool.ajax.a01(str,1,this.a07,this);
	},
  a07:function(t)
  {
		if(t=="")
		{
			this.obj.A1++;
			this.obj.Aarr=[];
			this.a03();
		}
		else
		{Tool.at("出错："+t);}
	}
}
fun.a01();