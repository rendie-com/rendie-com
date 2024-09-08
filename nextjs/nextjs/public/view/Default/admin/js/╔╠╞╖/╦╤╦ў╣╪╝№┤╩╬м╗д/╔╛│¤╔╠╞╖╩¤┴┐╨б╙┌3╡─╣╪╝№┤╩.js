'use strict';
var fun=
{
	obj:{A1:1,A2:0,Aarr:[]},
	a01:function()
	{
    let html=Tool.header("正在【删除商品数量小于3的关键词】任务。。。")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">关键词进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
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
    let str = '[\
		{"A2":'+(this.obj.A2==0?'<@page/>':'0')+'}\
		<r:keys size=10 page=2 db="sqlite.pro" where=" where @.proNum<3">,\
		{\
			"id":<:id/>,\
			"keys":<:keys tag=json/>,\
			"pro":[0\
				<r:pro db="sqlite.aliexpress" size=10 where=" where @.keywords like \'%,<:keys tag=sql/>,%\'">,\
				{\
					"id":<:id/>,\
					"keywords":<:keywords tag=json/>\
				}\
				</r:pro>\
			]\
		}\
		</r:keys>]'
		$("#state").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 正在获取商品。。。')
    Tool.ajax.a01($2,$4,$1,$3)
	},
  a04:function(oo)
	{
    if(this.obj.A2==0){this.obj.A2=oo[0].A2;}
		this.obj.Aarr=oo;
		this.a05();
	},
  a05:function()
  {
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06,this)
	},
  a06:function()
  {
		let oo=this.obj.Aarr,sqlArr1=[],sqlArr2=[]
		for(let i=1;i<oo.length;i++)
		{
			for(let j=1;j<oo[i].pro.length;j++)
			{
				oo[i].pro[j].keywords=oo[i].pro[j].keywords.replace(","+oo[i].keys+",",",")
				sqlArr2.push("update @.pro set @.keywords="+Tool.rpsql(oo[i].pro[j].keywords)+" where @.id="+oo[i].pro[j].id)
			}
			sqlArr1.push("delete from @.keys where @.id="+oo[i].id);
		}
		//////////////////////////////////////////
		this.a07(sqlArr1,sqlArr2)
	},
  a07:function(sqlArr1,sqlArr2)
  {
		let str = '""<r: db="sqlite.pro">'+sqlArr1.join("<1/>")+'</r:><r: db="sqlite.aliexpress">'+sqlArr2.join("<1/>")+'</r:>'
		Tool.ajax.a01(str,1,this.a08,this);
	},
  a08:function(t)
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
fun.a01()