'use strict';
var fun=
{
  obj:{A1:1,A2:0,Aarr:[]},
  a01:function()
  {
    let html=Tool.header('把【类目表】名称添加到商品关键词中...')+'\
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
    let html='[\
		{"A2":'+(this.obj.A2==0?'<@page/>':'0')+'}\
		<r:pro db="sqlite.aliexpress" page=2 size=20>,\
		{\
			"id":<:id/>,\
			"typename":[\
				<r:type db="sqlite.aliexpress" where=" where @.fromid=<:type/>" size=1>\
					"<:enname tag=js/>"\
					<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>,\
						"<:enname tag=js/>"\
						<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>,\
							"<:enname tag=js/>"\
							<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>,\
							"<:enname tag=js/>"\
							</r:type>\
						</r:type>\
					</r:type>\
				</r:type>],\
			"proid":"<:proid/>",\
			"keywords":<:keywords tag=json/>\
		}\
		</r:pro>\
		]';
    Tool.ajax.a01(html,this.obj.A1,this.a03,this)
  },
  a03:function(oo)
  {
    if(this.obj.A2==0){this.obj.A2=oo[0].A2;}
		oo.shift();
		this.obj.Aarr=oo
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04,this)
  },
  a04:function()
  {
		let oo=this.obj.Aarr,arr1,nArr=[],sqlArr=[];;
		for(let i=0;i<oo.length;i++)
		{
			oo[i].keywords=oo[i].keywords.replace(/aliexpress.com/ig,"")
			oo[i].keywords=oo[i].keywords.replace(/aliexpress/ig,"")
			oo[i].keywords=oo[i].keywords+","+oo[i].typename.join(",")
			oo[i].keywords=oo[i].keywords.replace(/&amp;/ig,",")
			oo[i].keywords=oo[i].keywords.replace(/&/ig,",")
			//////////////////////////////////////////////////
			arr1=oo[i].keywords.split(",")
			nArr=[]
			for(let j=0;j<arr1.length;j++)
			{
				arr1[j]=Tool.Trim(arr1[j])
				if(arr1[j])
				{
				  nArr.push(arr1[j])
				}
			}
			nArr=Tool.unique(nArr)
			sqlArr.push("update @.pro set @.keywords="+Tool.rpsql(","+nArr.join(",")+",")+" where @.id="+oo[i].id)
		}
		let html='""<r: db="sqlite.aliexpress">'+sqlArr.join("<1/>")+'</r:>'
   Tool.ajax.a01(html,1,this.a05,this)
	},
  a05:function(t)
  {
		if(t=="")
		{
			this.obj.A1++;
			this.obj.Aarr=[]
			this.a02();
		}
		else
		{Tool.pre(["出错:\n",t])}
  }
}
fun.a01();