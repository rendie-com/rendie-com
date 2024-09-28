'use strict';
var fun=
{
	obj:
	{
		A1:1,A2:0,
		Aarr:[],//入库的数据
		A2arr:[]//入库的【proid】数组
	},
  a01:function()
  {
   let html=Tool.header("正在【正在获取已上传商品的视频地址】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
		    <tr><td class="right w150">视频进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(this.a02,this,html)
  },
	a02:function()
	{
    let str='[\
    '+(this.obj.A1==1?'<@page/>':'0')+'\
    <r:pro db="sqlite.aliexpress" size=25 page=2 where=" where @.isUpDHgate=1">,\
    {\
			<r:prodes db="sqlite.aliexpress_prodes/<:proid Fun=ProidNum($1,50)/>" size=1 where=" where @.proid=\'<:proid/>\'">\
				"videoUrl":"<:videoUrl/>",\
			</r:prodes>\
      "proid":"<:proid/>"\
    }\
    </r:pro>]'
    $("#state").html("正在已上传商品的视频地址。。。");
    Tool.ajax.a01(str,this.obj.A1,this.a03,this);
  },
	a03:function(oo)
	{
    $("#state").html("正在传参。。。");
		if(this.obj.A1==1){this.obj.A2=oo[0];}
		let nArr=[],n2Arr=[];
		for(let i=1;i<oo.length;i++)
		{
			if(oo[i].videoUrl)
			{
				nArr.push(oo[i]);
				n2Arr.push(oo[i].proid)
			}
		}
		this.obj.Aarr=nArr;
		this.obj.A2arr=n2Arr;
		this.a04();
  },
	a04:function()
	{
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
  a05:function()
	{
    $("#state").html("正在已上传商品的用户信息。。。");
		let str='[0\
		<r:proupdhgate size=25 db="sqlite.dhgate" where=" where @.proid in(\''+this.obj.A2arr.join("','")+'\')">,\
		{\
			"proid":"<:proid/>",\
			"fromID":<:fromID/>,\
			"status":<:status/>,\
			"upuserid":<:upuserid/>\
		}\
		</r:proupdhgate>]'
   Tool.ajax.a01(str,1,this.a06,this);
  },
  a06:function(oo)
	{
		oo.shift();
		let arr1=this.obj.Aarr
		if(oo.length==arr1.length)
		{
			this.a07(oo,arr1)
		}
		else
		{
			alert("已上传商品表，有商品丢失。")
		}
  },
  a07:function(oo,arr1)
	{
    $("#state").html("正在合并信息。。。");
		let o2={}
		for(let i=0;i<arr1.length;i++)
		{
			o2={}
			for(let j=0;j<oo.length;j++)
			{
				if(arr1[i].proid==oo[j].proid)
				{
					o2={fromID:oo[j].fromID,status:oo[j].status,upuserid:oo[j].upuserid}
					break;
				}
			}
			arr1[i].status=o2.status
			arr1[i].fromID=o2.fromID
			arr1[i].upuserid=o2.upuserid
		}
		this.a08(arr1)
  },
  a08:function(arr1)
	{
		let sqlArr=[],select1="",insert="";
		for(let i=0;i<arr1.length;i++)
		{
			select1="select count(1) from @.proupdhgatevideo where @.fromID="+arr1[i].fromID;
			insert="insert into @.proupdhgatevideo(@.fromID,@.upuserid,@.proid,@.srcA,@.status,@.addtime)values("+arr1[i].fromID+","+arr1[i].upuserid+",'"+arr1[i].proid+"','"+arr1[i].videoUrl+"',"+arr1[i].status+","+Tool.gettime("")+")"
			sqlArr.push('<if Fun(Db(sqlite.aliexpress,'+select1+',count))==0><r: db="sqlite.aliexpress">'+insert+'</r:><else/><r: db="sqlite.aliexpress">update @.proupdhgatevideo set @.status='+arr1[i].status+',@.uptime='+Tool.gettime("")+' where @.fromID='+arr1[i].fromID+'</r:></if>')
		}
    $("#state").html("正在写入数据库。。。");
   Tool.ajax.a01('""'+sqlArr.join(""),1,this.a09,this)
 	},
  a09:function(t)
  {
		if(t=="")
    {
    	$("#state").html("正在写入成功。。。");
			this.obj.A1++;
			this.obj.Aarr=[];
			this.obj.A2arr=[];
			this.a02();		
    }
    else
    {$("#state").html("出错："+t);}
  },
}
fun.a01();