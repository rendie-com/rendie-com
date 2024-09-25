'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header("正在【从速卖通提取商品关键词】任务。。。")+'\
		<div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">商品页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
    let str = '[\
		{\
      "A2":'+(this.obj.A2==0?'<@page/>':'0')+'\
		}\
		<r:pro size=10 page=2 db="sqlite.aliexpress" where=" order by @.keywords desc,@.id desc">,\
		{\
			"keywords":<:keywords tag=json/>\
		}\
		</r:pro>]'
		$("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 正在获取商品。。。')
    Tool.ajax.a01(str,this.obj.A1,this.a03, this)
  },
  a03:function(oo)
	{
    if(this.obj.A2==0){this.obj.A2=oo[0].A2;}
		this.obj.Aarr=oo;
		this.a04();
	},
  a04:function()
  {
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this)
	},
  a05:function()
  {
		$("#state").html("正在去重复。。。");
		let nArr=[],arr=[],key='',oo=this.obj.Aarr
		for(let i=1;i<oo.length;i++)
		{
			arr=oo[i].keywords.toLowerCase().split(",")
			for(let j=0;j<arr.length;j++)
			{
				key=Tool.Trim(arr[j])
				if(key.indexOf("[")==-1&key.indexOf(")")==-1&&key.indexOf("&")==-1&&key!=""&&key!="1"&&key!="/"&&key.length<50&&key.length!=1)
				{
					if(nArr.indexOf(key)==-1)
					{
						nArr.push(key);				
					}
				}
			}
		}		
		this.a06(nArr)
	},
  a06:function(nArr)
  {
		$("#state").html("正在组装SQL。。。");
		let sql='""',sel='',ins=''
		for(let i=0;i<nArr.length;i++)
		{
			sel='select count(1) from @.keys where @.keys='+Tool.rpsql(nArr[i])
			ins='insert into @.keys(@.keys)values('+Tool.rpsql(nArr[i])+')'
			sql+='<if Fun(Db(sqlite.pro,'+sel+',count))==0><r: db="sqlite.pro">'+ins+'</r:></if>'
		}
		Tool.ajax.a01(sql,1,this.a07,this);
	},
  a07:function(t)
  {
		if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');				
			this.obj.A1++;
			this.obj.Aarr=[];
			this.a02();
		}
		else
		{Tool.at("出错："+t);}
	}
}
fun.a01();