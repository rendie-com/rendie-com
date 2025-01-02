'use strict';
var fun=
{	
	obj:{A1:1,A2:0,B1:1,B2:0,Barr:[],C1:1,C2:10,D1:1,D2:10,E1:1,E2:0,Earr:[],TimeNum:3,seller:[]},
  a01:function()
	{
    let html=Tool.header('正在执行【搜索词追踪-关键词中有排名的打开浏览】任务。。。')+'\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
      <tbody>\
        <tr><td class="right w120">关键词页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">关键词条进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">翻到第几页：</td>'+Tool.htmlProgress('C')+'</tr>\
        <tr><td class="right">点击次数：</td>'+Tool.htmlProgress('D')+'</tr>\
        <tr><td class="right">打开/更新数量：</td>'+Tool.htmlProgress('E')+'</tr>\
        <tr><td class="right">操作：</td><td colspan="2" class="p-0"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="gg.resetProxy()">*重置为默认代理</button></td></tr>\
        <tr><td class="right">关键词：</td><td id="keys" colspan="2"></td></tr>\
        <tr><td class="right">列表页地址：</td><td id="ListUrl" colspan="2"></td></tr>\
        <tr><td class="right">找到的账号：</td><td id="myshop" colspan="2"></td></tr>\
        <tr><td class="right">内容页页地址：</td><td id="DesUrl" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备商品...</td></tr>\
        <tr><td class="right">现在的排名：</td><td id="NewRanking" colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
    gg.isRD(this.a02A,this);
	},
  a02A:function()
  {
		this.a03();
		//gg.proxy("HTTPS hkbgp.mssstatic.com:55443;HTTPS node1134664662.api.steamgamepowered.com:19443;HTTPS PP1134664662.netvigatorscdn.com:22443;","fun.a03")
  },
  a03:function()
  {
		$("#state").html('正在提取账户。。。')
    let str = '[{}\
		<r:seller size=50 db="sqlite.dhgate">,\
		{\
			"myshop":"<:username/>",\
			"fromid":<:fromid/>\
		}</r:seller>]'
    Tool.ajax.a01(str,1, this.a04,this)
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
		let dayN=parseInt((new Date().getTime() - 1000*60*60*24*1)/1000);
		let where=' where @.rankingtime<'+dayN+' and not(@.myRanking=0)'
    let str = '[\
		{\
			'+(this.obj.A1==1?'"page":<@page/>':'')+'\
		}\
		<r:keys size=30 db="sqlite.dhgate" page=2 where="'+where+' order by @.searchIdx desc,@.id desc">,\
		{\
			"id":<:id/>,\
			"keys":"<:keys/>",\
			"myshop":""\
		}\
		</r:keys>]'
   Tool.ajax.a01(str,1,this.a06,this)
	},
  a06:function(oo)
	{
		if(this.obj.A1==1){this.obj.A2=oo[0].page;}
		if(this.obj.A1<=this.obj.A2)
		{
			oo.shift();
			this.obj.Barr=oo;
			this.obj.B2=oo.length
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
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
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（条）");
			$("#state").html("已准备好【B1/B2】数据。");
			this.a08();
		}
		else
		{
			this.a11();
		}
  },
  a08:function()
	{
		if(this.obj.C1<=this.obj.C2)
		{
			let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
			$("#C1").html(p1+"%").css("width",p1+"%");
			$("#C2").html(this.obj.C1+'/'+this.obj.C2+"（页）");
			$("#state").html("正在打开列表页...");
			gg.getFetch(this.b02(),"text",this.a09,this);
		}
		else
		{
			if(this.obj.Earr.length==0)
			{
				this.obj.C1=1;
				this.a19()
			}
			else
			{this.a10();}
		}
  },
  a09:function(t)
	{
		if(t.indexOf('<dd class="look-for">Can\'t find what you\'re looking for?</dd>')!=-1)//找不到您要找的东西？
		{
			$("#state").html('找不到您要找的东西');
			let str='""<r: db="sqlite.dhgate">delete from @.keys where @.id='+this.obj.keys.id+'</r:>'
			this.obj.A1--;
			Tool.ajax.a01(str,1,this.a05,this);
		}
		else if(t.indexOf('<i class="arr-right"></i>')!=-1)
		{
			let oo=this.b03(t,this.obj.C1);
			if(oo.myshop!="")
			{
				
					$("#C2").html(this.obj.C1+'/'+this.obj.C2+"（完）");
					let oo=
					{
						ListUrl:this.b02(),
						DesUrl:oo.DesUrl,
						myshop:oo.myshop,
						keys:this.obj.Barr[this.obj.B1-1].keys,
						id:this.obj.Barr[this.obj.B1-1].id
					}
					this.obj.Earr.push(oo);
					this.a10()
			}
			else
			{
				$("#C2").html(this.obj.C1+'/'+this.obj.C2+"（完）");
				$("#state").html('这页【'+this.obj.B1+'】没有。');
				this.obj.C1++;				
				this.a08();
			}
		}
		else
		{$("#state").html('页面打开失败。')}
  },
  a10:function()
	{
		$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（完）");
		$("#C1").html("0%").css("width","0%");$("#C2").html("");
		this.obj.C1=1;
		this.obj.B1++;
		this.a07();
  },
  a11:function()//点击次数
	{
		if(this.obj.D1<=this.obj.D2)
		{
			let p1=Math.ceil(this.obj.D1/this.obj.D2*100);
			$("#D1").html(p1+"%").css("width",p1+"%");
			$("#D2").html(this.obj.D1+'/'+this.obj.D2+"（次）");
			$("#state").html("正准备去点击。。。");
			this.obj.E2=this.obj.Earr.length;
			$("#state").html("删除1以上的选项卡。。。")
			gg.tabs_remove(2,"fun.a12")
		}
		else
		{
			this.obj.D1=1;
			$("#D1").html("0%").css("width","0%");
			$("#D2").html('');
			$("#state").html("点完，正在更新数据库。。。");
			this.a19();
		}
  },
  a12:function()
	{
		if(this.obj.E1<=this.obj.E2)
		{
			let p1=Math.ceil(this.obj.E1/this.obj.E2*100);
			$("#E1").html(p1+"%").css("width",p1+"%");
			$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（打开-条）");
			let oo=this.obj.Earr[this.obj.E1-1]
			$("#ListUrl").html('<a href="'+oo.ListUrl+'" target="_blank">'+oo.ListUrl+'</a>');
			$("#DesUrl").html('<a href="'+oo.DesUrl+'" target="_blank">'+oo.DesUrl+'</a>');
			$("#keys").html(oo.keys);
			$("#myshop").html(oo.myshop);
			$("#NewRanking").html(Tool.pre(oo));
			$("#state").html('正在创建选项卡【'+(this.obj.E1+1)+'】。。。');
			gg.tabs_create(this.obj.E1+1,oo.DesUrl,"fun.a13")
		}
		else
		{
			$("#state").html('已全部点开。。。');
			this.obj._TimeNum=this.obj.TimeNum
			gg.highlightTab(1,"fun.a14");
		}
  },
  a13:function()
	{
		$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（打开-完）");
		this.obj.E1++;
		this.a12();
  },
  a14:function()
	{
		$("#state").html("等待"+this.obj.TimeNum+"秒后继续。。。");
		if(this.obj.TimeNum>0)
		{
			this.obj.TimeNum--;
			Tool.Time(this.a14,1000,this,"1")
		}
		else
		{
			this.obj.TimeNum=this.obj._TimeNum;
			this.a15();
		}
  },
	a15:function()
  {
		$("#state").html("正在获取网页内容。。。");
		gg.executeScript(2,"","document.body.parentNode.outerHTML;","fun.a16");
	},
	a16:function(t)
  {
		if(t.indexOf('<img class="bgFullImg"')==-1)
		{
			this.obj.E1=1;
			$("#E1").html("0%").css("width","0%");
			$("#E2").html('');
			this.a17();
			//gg.cookie_remove(2,this.a17,this)
		}
		else
		{
			Tool.Modal("需要手动验证",'请【手动验证通过】后，再请点【确定】按扭，自动继续。。。','<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="fun.a15()" data-bs-dismiss="modal">忽略提示【继续】</button>','');
		}
	},
	a17:function()
  {
		if(this.obj.E1<=this.obj.E2)
		{
			let p1=Math.ceil(this.obj.E1/this.obj.E2*100);
			$("#E1").html(p1+"%").css("width",p1+"%");
			$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（更新-条）");
			let url=this.obj.Earr[this.obj.E1-1].ListUrl
			$("#ListUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			$("#DesUrl,#myshop,#keys").html('');
			gg.getFetch(url,"json",this.a18,this)
		}
		else
		{
			$("#state").html('更新完Carr完成。。。');
			this.obj.E1=1;
			$("#E1").html("0%").css("width","0%");
			$("#E2").html('');
			$("#ListUrl").html('');
			this.obj.D1++;
			this.a11();
		}
	},
  a18:function(t)
	{
		if(t.indexOf('<dd class="look-for">Can\'t find what you\'re looking for?</dd>')!=-1)//找不到您要找的东西？
		{
			$("#state").html('找不到您要找的东西');
			this.obj.Barr[this.obj.E1-1].DesUrl+=this.obj.D1;
			this.obj.E1++;
			this.a17();
		}
		else if(t.indexOf('<i class="arr-right"></i>')!=-1)
		{
			let oo=this.b03(t,this.b04());
			if(oo.myshop!="")
			{
					$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（更新-完）");
					this.obj.Barr[this.obj.E1-1].DesUrl=oo.DesUrl
					this.obj.Barr[this.obj.E1-1].myshop=oo.myshop
					$("#NewRanking").html(Tool.pre(this.obj.Earr[this.obj.E1-1]));
					this.obj.E1++;
					this.a17();
			}
			else
			{
				$("#state").html('这页没有，内容地址改一下。。。');
				this.obj.Barr[this.obj.E1-1].DesUrl+=this.obj.D1;
				this.obj.E1++;
				this.a17();
			}
		}
		else
		{
			$("#state").html('页面打开失败。。。')
			this.obj.Barr[this.obj.E1-1].DesUrl+=this.obj.D1;
			this.obj.E1++;
			this.a17();
		}
  },
	a19:function()
	{
		$("#state").html("更新排名。。。")
		let arr1=this.obj.Barr,arr2=this.obj.Earr
		for(let i=1;i<arr1.length;i++)
		{
			let oo={time:Tool.userDate13(Date.now(),"/")}
			for(let j=0;j<arr2.length;j++)
			{
				if(arr1[i].id==arr2[j].id)
				{
					arr1[i].myshop=arr2[j].myshop;
					break;
				}
			}
		}
		$("#NewRanking").html(Tool.pre(arr1))
		this.a20(arr1)
  },
	a20:function(arr)
	{
		let time=Tool.userDate13(Date.now(),"/")
		$("#state").html("更新排名数据。。。")
		let newarr=[]
		for(let i=0;i<arr.length;i++)
		{
			newarr.push("update @.keys set @.rankingtime="+Tool.gettime(time)+",@.myshop='"+arr[i].myshop+"' where @.id="+arr[i].id)
		}
		let str='""<r: db="sqlite.dhgate">'+newarr.join("<1/>")+'</r:>'
		Tool.ajax.a01(str,1,this.a21,this)
	},
	a21:function(t)
  {
	  if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+"（完）");
			this.obj.B1=1;
			this.obj.Barr=[];
			this.obj.Earr=[];
			$("#B1").html("0%").css("width","0%");
			$("#B2").html('');
			this.obj.A1++;
			this.a05();				
		}
		else
		{alert("出错："+t);}
	},
	b01:function(t)
	{
		let url="",arr=Tool.StrSplits(t,'" href="','"');
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(';searl|')!=-1)
			{
				url=arr[i];
				break;
			}
		}
		return url;
  },
  b02:function()
	{
		let keys=this.obj.Barr[this.obj.B1-1].keys
		$("#keys").html(keys);
		let keys2=encodeURI(keys.replace(/\s+/g,"+").replace(/\//g,"%252F")),url
		if(this.obj.C1==1)
		{
			url="https://www.dhgate.com/wholesale/search.do?act=search&dspm=pcen.hp.search.1.UISls2DAhqrbDfcFuCG0%26resource_id%3D&sus=&searchkey="+keys2+"&catalog=#pusearch1812";
		}
		else
		{
			url='https://www.dhgate.com/w/'+keys2+'/'+(this.obj.C1-1)+'.html?leftpars=c2hpcGNvdW50cnk9dXNkaGdhdGU'
		}
		$("#ListUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		return url;
	},
  b03:function(t,page)
	{
		let arr1=this.obj.seller,myshop="";
		for(let i=0;i<arr1.length;i++)
		{
			if(t.indexOf('>'+arr1[i].myshop+' <i class="arr-right"></i>')!=-1)
			{
				$("#state").html('找到了【'+arr1[i].myshop+'】。');
				myshop=arr1[i].myshop
				break;
			}
		}
		if(myshop!="")
		{
			let arr2=t.split('<i class="arr-right"></i>'),DesUrl="";
			for(let i=0;i<arr2.length;i++)
			{
				if(arr2[i].indexOf('>'+myshop+' ')!=-1)
				{
					DesUrl=this.b01(arr2[i]);
					$("#state").html('账号【'+myshop+'】页码【'+page+'】');
					break;
				}
			}
		}
		return {myshop:myshop,DesUrl:DesUrl};
	},
	b04:function()
	{
		//从列表页地址中算出第几页。
		let ListUrl=this.obj.Earr[this.obj.E1-1].ListUrl,page=1,arr
		if(ListUrl.indexOf(".html")!=-1)//找不到说明是第一页
		{
			ListUrl=ListUrl.split(".html")[0];
			arr=ListUrl.split("/")
			page=parseInt(arr[arr.length-1])+1;
		}
		//注：1表示第1页，2表示第2页。。。。。。
		return page
	}
}
fun.a01();