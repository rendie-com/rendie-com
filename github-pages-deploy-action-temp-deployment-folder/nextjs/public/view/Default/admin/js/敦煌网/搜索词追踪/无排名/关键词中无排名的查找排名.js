'use strict';
var fun=
{
	obj:{A1:1,A2:0,B1:1,B2:10},
	a01:function()
	{
    let html=Tool.header('正在关键词中无排名的查找排名。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w120">关键词进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right w120">页进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">关键词：</td><td id="keys" colspan="2"></td></tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">上次更新时间：</td><td id="time" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
    gg.isRD(this.a03,this);
  },
  a03:function()//提取账户
  {
		$("#state").html('正在提取账户。。。')
    let str = '[{}\
		<r:seller size=50 db="sqlite.dhgate">,\
		{\
			"username":"<:username/>",\
			"fromid":<:fromid/>\
		}</r:seller>]'
   Tool.ajax.a01(str,1,this.a04,this)
	},
  a04:function(oo)
	{
		if(oo.length==51)
		{$("#state").html('提取账户不能超过50个。')}
		else
		{
			oo.shift()
			this.obj.seller=oo;
			this.a05()
		}
	},
  a05:function()
	{
		// order by @.myRanking desc,@.searchIdx desc
		// order by @.searchIdx desc,@.id desc
		let dayN=parseInt((new Date().getTime() - 1000*60*60*24*7)/1000);
		let where=' where @.rankingtime<'+dayN+' and @.myRanking=0'
    let str = '\
		{\
		"count":'+(this.obj.A1==1?'<@count/>':0)+'\
		<r:keys size=1 db="sqlite.dhgate" page=2 where="'+where+' order by @.searchIdx desc,@.id desc">,\
			"id":<:id/>,\
			"rankingtime":<:rankingtime/>,\
			"keys":"<:keys/>"\
		</r:keys>\
		}'
   Tool.ajax.a01(str,1,this.a06,this)
	},
  a06:function(oo)
	{
		if(this.obj.A1==1){this.obj.A2=oo.count;}
		if(this.obj.A1<=this.obj.A2)
		{
			this.obj.keys=oo
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
			$("#keys").html(oo.keys)
			$("#time").html(Tool.js_date_time2(oo.rankingtime))
			this.a07();
		}
		else
		{
			$("#state").html('全部完成。');
		}
	},
  a07:function()
	{
		if(this.obj.B1<=this.obj.B2)
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+'（页）');
			let keys=encodeURI(this.obj.keys.keys.replace(/\s+/g,"+").replace(/\//g,"%252F")),url
			if(this.obj.B1==1)
			{
				url="https://www.dhgate.com/wholesale/search.do?act=search&dspm=pcen.hp.search.1.UISls2DAhqrbDfcFuCG0%26resource_id%3D&sus=&searchkey="+keys+"&catalog=#pusearch1812";
			}
			else
			{
				url='https://www.dhgate.com/w/'+keys+'/'+(this.obj.B1-1)+'.html?leftpars=c2hpcGNvdW50cnk9dXNkaGdhdGU'
			
			}
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>')
			gg.getFetch(url,"json",this.a08,this);
		}
		else
		{
			$("#state").html('这个关键词没有。');
			let str='""<r: db="sqlite.dhgate">update @.keys set @.rankingtime='+Tool.gettime("")+' where @.id='+this.obj.keys.id+'</r:>'
			Tool.ajax.a01(str,1,this.a10,this);
		}
	},
  a08:function(t)
	{
		if(t.indexOf('<dd class="look-for">Can\'t find what you\'re looking for?</dd>')!=-1)//找不到您要找的东西？
		{
			$("#state").html('找不到您要找的东西');
			let str='""<r: db="sqlite.dhgate">delete from @.keys where @.id='+this.obj.keys.id+'</r:>'
			this.obj.A1--;
			Tool.ajax.a01(str,1,this.a10,this);
		}
		else if(t.indexOf('<i class="arr-right"></i>')!=-1)
		{
			let arr=this.obj.seller,name="";
			for(let i=0;i<arr.length;i++)
			{
				if(t.indexOf('>'+arr[i].username+' <i class="arr-right"></i>')!=-1)
				{
					$("#state").html('找到了【'+arr[i].username+'】。');
					name=arr[i].username
					break;
				}
			}
			//////////////////////////////////
			if(name!="")
			{
				let arr=t.split('<i class="arr-right"></i>'),num=0;
				for(let i=0;i<arr.length;i++)
				{
					if(arr[i].indexOf('>'+name+' ')!=-1)
					{
						num=((this.obj.B1-1)*48)+i+1
						$("#state").html('账号【'+name+'】页码【'+this.obj.B1+'】排名：【'+num+'】');
						break;
					}
				}
				if(num!=0)
				{
					this.a09(name,num)
				}
				else
				{$("#state").html('可能已改版。');}
			}
			else
			{
				$("#state").html('这页【'+this.obj.B1+'】没有。');
				this.obj.B1++;				
				this.a07();
			}
		}
		else
		{$("#state").html('页面打开失败。')}
	},
  a09:function(name,num)
	{
		//每页48条。注：每一页有三个广告位时（页总数为51）
		let str='""<r: db="sqlite.dhgate">update @.keys set @.myshop=\''+name.replace(/'/g,"''")+'\',@.myRanking='+num+',@.rankingtime='+Tool.gettime("")+' where @.id='+this.obj.keys.id+'</r:>'
		Tool.ajax.a01(str,1,this.a10,this);
	},
  a10:function(t)
	{
		if(t=="")
		{
			this.obj.B1=1;
			$("#B1").html("0%").css("width","0%");
			$("#B2").html("");
			this.obj.A1++;
			this.a05();
		}
		else
		{alert("出错："+t);}		
	}
}
fun.a01();