'use strict';
var fun=
{	
	obj:{A1:1},
  a01:function()
	{
    let html='\
		<header class="panel-heading"><a href="javascript:" onclick="Tool.main(\''+Tool.unescape(obj.arr[5])+'\')" class="arrow_back"></a>正在执行【关键词中有排名的打开浏览】任务。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w120">商品页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">商品条进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">第几个关键词：</td>'+Tool.htmlProgress('C')+'</tr>\
        <tr><td class="right">翻到第几页：</td>'+Tool.htmlProgress('D')+'</tr>\
        <tr><td class="right">点击次数：</td>'+Tool.htmlProgress('E')+'</tr>\
        <tr><td class="right">打开/更新：</td>'+Tool.htmlProgress('F')+'</tr>\
        <tr><td class="right">账号：</td><td id="upuser" colspan="2"></td></tr>\
        <tr><td class="right">DH商品ID：</td><td id="dhfromid" colspan="2"></td></tr>\
        <tr><td class="right">列表页地址：</td><td id="ListUrl" colspan="2"></td></tr>\
        <tr><td class="right">内容页页地址：</td><td id="desUrl" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备商品...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
  {
    gg.isRD(this.a03,this);
  },
  a03:function()
  {
		let time=Tool.userDate13(Date.now(),"/")
		let where='@.keysClickTime<'+Tool.gettime(time)+' and @.isRanking=1'//只不是当天
    let str='[{"A2":'+(this.obj.A1==1?'<@page/>':0)+'}\
		<r:proupdhgate db="sqlite.dhgate" size=10 page=2 where=" where '+where+'">,\
		{\
			"dhfromid":"<:fromid/>",\
			"upuser":"<:upuser/>",\
    	"ranking":\
			{\
				<r:proupdhkeysranking size=1 db="sqlite.dhgate" where=" where @.proid=\'<:proid/>\' order by @.id desc">\
					"keys1":"<:keys1/>",\
					"keys2":"<:keys2/>",\
					"keys3":"<:keys3/>",\
					"addtime":<:addtime/>\
				</r:proupdhkeysranking>\
			}\
		}\
		</r:proupdhgate>]'
   Tool.ajax.a01(str,1,this.a04,this)
  },
	a04:function(oo)
  {
		oo.A1=this.obj.A1;
		oo.A2=oo.A1==1?oo[0].A2:this.obj.A2;
		oo.B1=1;oo.B2=oo.length-1;
		oo.C1=1;oo.C2=3;//表示3个关键词
		oo.Carr=[];
		oo.D1=1;oo.D2=10;//表示10个列表页
		oo.E1=1;oo.E2=20;//表示点20次
		oo.EArr=[];
		oo.F1=1;oo.F2=0;//表示点10次
		oo.TimeNum=3
		this.obj=oo;
		this.a05();
	},
	a05:function()//商品页进度
  {
		if(this.obj.A1<=this.obj.A2)
		{
			let oo=this.obj[this.obj.A1];
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+"（页）");
			$("#state").html("已获取商品信息。。。");
			this.a06();
		}else{$("#state").html('全部完成');}
  },
	a06:function()
  {
		if(this.obj.B1<=this.obj.B2)//商品条进度
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（条）");
			let oo=this.obj[this.obj.B1];
			this.obj[this.obj.B1].Carr=[oo.ranking.keys1,oo.ranking.keys2,oo.ranking.keys3]
			$("#upuser").html(oo.upuser);
			let url="https://www.dhgate.com/product/----/"+oo.dhfromid+".html"
			$("#dhfromid").html('<a href="'+url+'" target="_blank">'+oo.dhfromid+'</a>');
			$("#state").html("当前关键词的添加时间为【"+Tool.js_date_time2(oo.ranking.addtime)+"】。");
			this.a07();			
		}
		else
		{
			this.a12();
		}
  },
	a07:function()//第几个关键词
  {
		if(this.obj.C1<=this.obj.C2)
		{
			let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
			$("#C1").html(p1+"%").css("width",p1+"%");
			$("#C2").html(this.obj.C1+'/'+this.obj.C2+"（个）");
			this.a08();
		}
		else
		{
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（完）");
			this.obj.B1++;
			this.obj.C1=1;
			$("#C1").html("0%").css("width","0%");
			$("#C2").html("");
			this.a06()
		}
	},
	a08:function()//翻到第几页
  {
		if(this.obj.D1<=this.obj.D2)
		{
			let p1=Math.ceil(this.obj.D1/this.obj.D2*100);
			$("#D1").html(p1+"%").css("width",p1+"%");
			$("#D2").html(this.obj.D1+'/'+this.obj.D2+"（页）");
			let url=this.b01(this.obj.D1,this.obj[this.obj.B1].Carr[this.obj.C1-1]);
			$("#ListUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a09,this);
		}
		else
		{
			this.a11();
		}
	},
	a09:function(t)
  {
		if(t.indexOf("{status:403}")!=-1)
		{
			$("#state").html("您无权访问在这台服务器上。"+t);
		}
		else
		{
			if(t.indexOf("Can't find what you're looking for?")==-1)
			{
				let arr=Tool.StrSplits(t,'<a supplierid="','>')
				if(t.indexOf(this.obj[this.obj.B1].dhfromid+".html")!=-1)
				{
					this.a10(arr,t);
				}
				else
				{
					$("#D2").html(this.obj.D1+'/'+this.obj.D2+"（完）");
					$("#state").html("这一页没有。。。");
					if(arr.length>=40)
					{
						this.obj.D1++;
						this.a08();
					}
					else
					{
						$("#D2").html(this.obj.D1+'/'+this.obj.D2+"（完）");
						$("#state").html("不能翻到下一页了。。。");
						this.obj.D1=this.obj.D2+1;
						this.a08();
					}
				}
			}
			else
			{
				$("#D2").html(this.obj.D1+'/'+this.obj.D2+"（完）");
				$("#state").html("敦煌这一页就没有数据了。。。");
				this.obj.D1=this.obj.D2+1;
				this.a08();
			}
		}
  },
	a10:function(arr,t)
  {
		let Num=0,url="";
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(this.obj[this.obj.B1].dhfromid+".html")!=-1)
			{
				Num=i+1;
				url=Tool.StrSlice(arr[i],'href="','"');
				break;
			}
		}
		//////////////////////////////////////////////////
		if(Num==0)
		{
			$("#state").html("这一页没有。。。");
			this.obj.D1++;
			//this.a08();
			alert("aaaaaaaaaaaaaaqqqqqqqqqqq")
		}
		else
		{
			let oo=this.obj[this.obj.B1];
			let keys=oo.Carr[this.obj.C1-1]
			let ListUrl=this.b01(this.obj.D1,keys);
			/////////////////////////////////////////
			oo.Carr[this.obj.C1-1]=
			{
				keys:keys,
				ListUrl:ListUrl,
				DesUrl:url,
				Num:Num+((this.obj.D1-1)*48),
				dhfromid:oo.dhfromid
			};
			//////////////////////////////////////////////
			$("#desUrl").html('<a href="'+url+'" target="_blank">'+url+'</a> （排名：'+oo.Carr[this.obj.C1-1].Num+'）');
			$("#state").html("【keys"+this.obj.C1+"】已经找到了。。。");
			this.a11();
		}
  },
	a11:function()
  {
		$("#C2").html(this.obj.C1+'/'+this.obj.C2+"（完）");
		this.obj.D1=1;
		$("#D1").html("0%").css("width","0%");
		$("#D2").html("");
		this.obj.C1++;
		this.a07();
  },
	a12:function()
  {
		this.obj.B1=1;
		$("#B1").html("0%").css("width","0%");
		$("#B2").html("");
		let arr1=this.obj,arr2=[],nArr=[]
		for(let i=1;i<arr1.length;i++)
		{
			arr2=arr1[i].Carr;
			for(let j=0;j<arr2.length;j++)
			{
				if(typeof arr2[j]=="object")	
				{
					nArr.push(arr2[j])
				}
			}
		}
		this.obj.Earr=nArr;
		this.obj.F2=nArr.length;
		this.a13();
  },
	a13:function()
  {
		if(this.obj.E1<=this.obj.E2)
		{
			let p1=Math.ceil(this.obj.E1/this.obj.E2*100);
			$("#E1").html(p1+"%").css("width",p1+"%");
			$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（次）");
			this.a14();
		}
		else
		{
			$("#state").html("正在更新数据库。。。");
			this.a23();
		}
  },
	a14:function()
  {
		$("#state").html("删除1以上的选项卡。。。")
		gg.tabs_remove(2,"fun.a15")
	},
	a15:function()
  {
		if(this.obj.F2==0)
		{
			$("#state").html('一个关键词，都没有找到。。。');
			this.a23();
		}
		else
		{
			if(this.obj.F1<=this.obj.F2)
			{
				let p1=Math.ceil(this.obj.F1/this.obj.F2*100);
				$("#F1").html(p1+"%").css("width",p1+"%");
				$("#F2").html(this.obj.F1+'/'+this.obj.F2+"（打开-条）");
				$("#state").html('正在创建选项卡【'+(this.obj.F1+1)+'】。。。');
				gg.tabs_create(this.obj.F1+1,this.obj.Earr[this.obj.F1-1].DesUrl,"fun.a16")
			}
			else
			{
				$("#state").html('已全部点开。。。');
				gg.highlightTab(1,"fun.a17");
			}
		
		}
  },
	a16:function()
  {
		$("#F2").html(this.obj.F1+'/'+this.obj.F2+"（打开-完）");
		this.obj.F1++;
		this.a15();
	},
	a17:function()
  {
		$("#state").html("等待"+this.obj.TimeNum+"秒后继续。。。");
		if(this.obj.TimeNum>0)
		{
			this.obj.TimeNum--;
			Tool.Time(this.a17,1000,this,"1")
		}
		else
		{
			this.obj.TimeNum=3;
			this.a18();
		}
	},
	a18:function()
  {
		$("#state").html("正在获取网页内容。。。");
		gg.executeScript(2,"","document.body.parentNode.outerHTML;","fun.a19");
	},
	a19:function(t)
  {
		if(t.indexOf('<img class="bgFullImg"')==-1)
		{
			this.obj.F1=1;
			$("#F1").html("0%").css("width","0%");
			$("#F2").html('');
			//this.a20()
			gg.cookie_remove(2,this.a20,this)
		}
		else
		{
			Tool.Modal("需要手动验证",'请【手动验证通过】后，再请点【确定】按扭，自动继续。。。','<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="fun.a18()" data-bs-dismiss="modal">忽略提示【继续】</button>','');
		}
	},
	a20:function()
  {
		if(this.obj.F1<=this.obj.F2)
		{
			let p1=Math.ceil(this.obj.F1/this.obj.F2*100);
			$("#F1").html(p1+"%").css("width",p1+"%");
			$("#F2").html(this.obj.F1+'/'+this.obj.F2+"（更新-条）");
			let url=this.obj.Earr[this.obj.F1-1].ListUrl
			$("#ListUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a21,this)
		}
		else
		{
			$("#state").html('更新完Carr完成。。。');
			this.obj.F1=1;
			$("#F1").html("0%").css("width","0%");
			$("#F2").html('');
			$("#E2").html(this.obj.E1+'/'+this.obj.E2+"（完）");
			this.obj.E1++;
			this.a13();
		}
	},
	a21:function(t)
  {
		if(t.indexOf("Can't find what you're looking for?")==-1)
		{
			if(t.indexOf(this.obj.Earr[this.obj.F1-1].dhfromid+".html")!=-1)
			{
				this.a22(t);
			}
			else
			{
				let url=this.b01(this.b02()+1,this.obj.Earr[this.obj.F1-1].keys)
				$("#state").html("这一页没有找到，排名可能提前了。。。")
				$("#ListUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
				gg.getFetch(url,"json",this.a21,this)
			}
		}
		else
		{alert("什么都没11111111有");}
	},
	a22:function(t)
  {
		let arr=Tool.StrSplits(t,'<a supplierid="','>'),Num=0,url="";
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(this.obj.Earr[this.obj.F1-1].dhfromid+".html")!=-1)
			{
				Num=i+1;
				url=Tool.StrSlice(arr[i],'href="','"');
				break;
			}
		}
		$("#F2").html(this.obj.F1+'/'+this.obj.F2+"（更新-完）");
		if(url=="")
		{
			$("#state").html("没有找到URL。。。")
			this.obj.Earr[this.obj.F1-1].DesUrl+=this.obj.F1;
			this.obj.F1++;
			this.a20();
		}
		else
		{
			$("#state").html("更新URL。。。")
			this.obj.Earr[this.obj.F1-1].DesUrl=url;
			this.obj.Earr[this.obj.F1-1].Num=Num+this.b02()*48;
			$("#desUrl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			this.obj.F1++;
			this.a20();
		}
  },
	a23:function()
	{
		$("#state").html("更新排名。。。")
		this.a24()
  },
	a24:function()
  {
		let time=Tool.userDate13(Date.now(),"/")
		$("#state").html("更新排名数据。。。")
		let arr=[],arr2=[],select1,insert1,update1,arr3={},Carr=[]
		for(let i=1;i<this.obj.length;i++)
		{
			arr.push("update @.proupdhgate set @.keysClickTime="+Tool.gettime(time)+",@.keysScanTime="+Tool.gettime(time)+" where @.fromid="+this.obj[i].dhfromid)
			/////////////////////////////////////////////////////
			arr3=this.obj[i].ranking
			Carr=this.obj[i].Carr
			select1="select count(1) from @.proupdhkeysranking where @.addtime="+Tool.gettime(time)
			/////////////////////////////////////////
			insert1='insert into @.proupdhkeysranking(@.keys1,@.keys2,@.keys3,@.keys1ClickNum,@.keys2ClickNum,@.keys3ClickNum,@.addtime,@.keys1ranking,@.keys2ranking,@.keys3ranking)values(\''+arr3.keys1+'\',\''+arr3.keys2+'\',\''+arr3.keys3+'\','+(typeof Carr[0]=="object"?this.obj.E2:0)+','+(typeof Carr[1]=="object"?this.obj.E2:0)+','+(typeof Carr[2]=="object"?this.obj.E2:0)+','+Tool.gettime(time)+','+(typeof Carr[0]=="object"?Carr[0].Num:1000)+','+(typeof Carr[1]=="object"?Carr[1].Num:1000)+','+(typeof Carr[2]=="object"?Carr[2].Num:1000)+')'
			/////////////////////////
			update1='update @.proupdhkeysranking set @.keys1ClickNum='+(typeof Carr[0]=="object"?this.obj.E2:0)+',@.keys2ClickNum='+(typeof Carr[1]=="object"?this.obj.E2:0)+',@.keys3ClickNum='+(typeof Carr[2]=="object"?this.obj.E2:0)+',@.keys1ranking='+(typeof Carr[0]=="object"?Carr[0].Num:1000)+',@.keys2ranking='+(typeof Carr[1]=="object"?Carr[1].Num:1000)+',@.keys3ranking='+(typeof Carr[2]=="object"?Carr[2].Num:1000)+' where @.addtime='+Tool.gettime(time)
			arr2.push('\
			<if Fun(Db('+select1+',count))==0>\
				<r: db="sqlite.aliexpress">'+insert1+'</r:>\
			<else/>\
				<r: db="sqlite.aliexpress">'+update1+'</r:>\
			</if>')
		}
		let str='""<r: db="sqlite.aliexpress">'+arr.join("<1/>")+'</r:>'+arr2.join("")
		Tool.ajax.a01(str,1,this.a25,this)
  },
	a25:function(t)
  {
	  if(t=="")
		{
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+"（完）");
			$("#E1").html("0%").css("width","0%");
			$("#E2").html('');
			this.obj.A1++;
			this.a03();				
		}
		else
		{alert("出错："+t);}
	},
	b01:function(i,keys)
	{
		let url;
		if(i==1)
		{url="https://www.dhgate.com/wholesale/search.do?act=search&dspm=pcen.hp.search.1.UISls2DAhqrbDfcFuCG0%26resource_id%3D&sus=&searchkey="+keys+"&catalog=#pusearch1812";}
		else
		{url="https://www.dhgate.com/w/"+keys+"/"+(i-1)+".html?leftpars=c2hpcGNvdW50cnk9dXNkaGdhdGU"}
		return url;
	},
	b02:function()
	{
		//从列表页地址中算出第几页。
		let ListUrl=this.obj.Earr[this.obj.F1-1].ListUrl,page=0,arr
		if(ListUrl.indexOf(".html")!=-1)//找不到说明是第一页
		{
			ListUrl=ListUrl.split(".html")[0];
			arr=ListUrl.split("/")
			page=parseInt(arr[arr.length-1]);
		}
		//注：0表示第1页，1表示第二页。。。。。。
		return page
	}
}
fun.a01();