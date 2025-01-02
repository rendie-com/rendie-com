'use strict';
var fun=
{
	obj:{A1:1,A2:3,Aarr:[],B1:1,B2:10,leftpars:"",C1:1,C2:0,Carr:[],dhfromid:0,TimeNum:5,Num:0},
	a01:function()
	{
    let html='\
		<header class="panel-heading"><a href="javascript:" onclick="Tool.main(\''+Tool.unescape(obj.arr[5])+'\')" class="arrow_back"></a>正在执行【搜索关键词然后模拟点击】任务。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w120">关键词进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">查找页进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">账号：</td><td id="upuser" colspan="2"></td></tr>\
        <tr><td class="right">DH商品ID：</td><td id="dhfromid" colspan="2"></td></tr>\
        <tr><td class="right">商品编码：</td><td colspan="2">'+obj.arr[4]+'</td></tr>\
        <tr><td class="right">关键词：</td><td id="keys" colspan="2"></td></tr>\
        <tr><td class="right">当前排名：</td><td id="ranking" colspan="2"></td></tr>\
        <tr><td class="right">模拟点击次数：</td><td id="clickNum" colspan="2"></td></tr>\
        <tr><td class="right">列表页地址：</td><td id="listurl" colspan="2"></td></tr>\
        <tr><td class="right">内容页地址：</td><td id="desurl" colspan="2"></td></tr>\
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
    let str='\
		<r:proupdhgate db="sqlite.dhgate" size=1 where=" where @.proid=\''+obj.arr[4]+'\'">\
		{\
			"dhfromid":"<:fromid/>",\
			"upuser":"<:upuser/>",\
    	"Aarr":[\
				<r:proupdhkeysranking size=1 db="sqlite.dhgate" where=" where @.proid=\'<:proid/>\' order by @.id desc">\
					"<:keys1/>","<:keys2/>","<:keys3/>"\
				</r:proupdhkeysranking>]\
		}\
		</r:proupdhgate>'
   Tool.ajax.a01(str,1,this.a04,this)
  },
	a04:function(oo)
  {
		$("#upuser").html(oo.upuser);
		let url="https://www.dhgate.com/product/----/"+oo.dhfromid+".html"
		$("#dhfromid").html('<a href="'+url+'" target="_blank">'+oo.dhfromid+'</a>');
		this.obj.Aarr=oo.Aarr;
		this.obj.dhfromid=oo.dhfromid;
		$("#keys").html(oo.Aarr.join(" , "));
		$("#state").html("已获取商品信息。。。");
		this.a05()
  },
	a05:function()
  {
		if(this.obj.A1<=this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+"（个）");
			$("#state").html("正在准备去首面搜索列表页。。。");
			this.a06();
		}
		else
		{
			$("#B1").html("0%").css("width","0%");
			$("#B2").html("");
			$("state").html("最后一个关键词了完成。。。");
			this.obj.C2=this.obj.Carr.length;
			this.a12();
		}
	},
	a06:function()
  {
		if(this.obj.B1<=this.obj.B2)
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（页）");
			$("#state").html("正在准备去首面搜索列表页001。。。");
			let rand1 = Math.floor(Math.random() * 10000 + 1);
			gg.tabs_remove_create_indexOf(2,"https://www.dhgate.com/w/bag.html?_="+rand1+"#listing_his-bag",'<h1><span>Wholesale Bag </span></h1>',true,this.a07,this)//无则创建有则更新再查找(返回网页内容)
		}
		else
		{
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（完）");
			$("#state").html("都到最后一页了，还没有找到。。。");
			alert("aaaaaaaaaaaa")
			//this.a10();
		}
	},
	a07:function()
  {
		$("#state").html("等待提交结果。。。");
		let keys=Tool.Trim(this.obj.Aarr[this.obj.A1-1].replace(/\+/g," "));
		let code='\
		$(function(){\
			$("#searchkey").val("'+keys+'");\
			$("#searchBarButton").click();\
		})'
		let str='<title>Wholesale '+keys
		gg.tabs_executeScript_indexOf(2,null,code,str,true,this.a08,this);
	},
	a08:function(t)
  {
		if(t.indexOf("Can't find what you're looking for?")==-1)
		{
			if(t.indexOf(this.obj.dhfromid+".html")!=-1)
			{
				this.a10(t);
			}
			else
			{
				$("#state").html("这一页【"+this.obj.B1+"】没有找到。。。")
				if(this.obj.B1==1)
				{
					this.obj.leftpars=Tool.StrSlice(t,'leftpars=','"');
				}
				if(this.obj.leftpars)
				{
					this.obj.B1++;
					this.a09();				
				}
				else
				{alert("没有找到【leftpars】。");}				
			}
		}
		else
		{alert("什么都没有");}
	},
	a09:function()
  {
		if(this.obj.B1<=this.obj.B2)
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+"（页）");
			let keys=Tool.Trim(this.obj.Aarr[this.obj.A1-1]);
			let url="https://www.dhgate.com/w/"+keys+"/"+(this.obj.B1-1)+".html?leftpars="+this.obj.leftpars
			$("#listurl").html('下一页为：<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a08,this)
		}
		else
		{
			this.a11()
		}
	},
	a10:function(t)
  {
		let arr=Tool.StrSplits(t,'<a supplierid="','>'),desurl="";
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(this.obj.dhfromid+".html")!=-1)
			{
				desurl=Tool.StrSlice(arr[i],'href="','"');
				break;
			}
		}
		if(desurl=="")
		{alert("没有找到02");}
		else
		{
			let listurl="https://www.dhgate.com/w/"+this.obj.Aarr[this.obj.A1-1]+(this.obj.B1==1?"":"/"+(this.obj.B1-1))+".html?leftpars="+this.obj.leftpars
			this.obj.Carr.push([this.obj.B1,listurl,desurl]);
			$("#desurl").html('<a href="'+desurl+'" target="_blank">'+desurl+'</a>');
			this.a11();
		}
	},
	a11:function()
  {
		$("#listurl").html('');
		this.obj.B1=1;
		this.obj.leftpars=""
		this.obj.A1++;
		this.a05()
	},
	a12:function()
  {
		$("#state").html("删除1以上的选项卡。。。")
		this.obj.C1=1;
		gg.tabs_remove(2,"fun.a13")
	},
	a13:function()
  {
		if(this.obj.C1<=this.obj.C2)
		{
			$("#state").html('正在创建选项卡【'+this.obj.C1+1+'】。。。');
			gg.tabs_create(this.obj.C1+1,this.obj.Carr[this.obj.C1-1][2],"fun.a14")
		}
		else
		{
			$("#state").html('已全部点开。。。');
			gg.highlightTab(1,"fun.a15");
		}
  },
	a14:function()
  {
		this.obj.C1++;
		this.a13();
  },
	a15:function()
  {
		$("#state").html("等待"+this.obj.TimeNum+"秒后继续。。。");
		if(this.obj.TimeNum>0)
		{
			this.obj.TimeNum--;
			Tool.Time(this.a15,1000,this,"1")
		}
		else
		{
			this.obj.TimeNum=5;
			this.obj.Num++;
			this.a16();			
		}
  },
	a16:function()
  {
		$("#Num").html(this.obj.Num+"*"+this.obj.C2+"="+(this.obj.Num*this.obj.C2)+"(次)");
		gg.executeScript(2,"","document.body.parentNode.outerHTML;","fun.a17");
	},
	a17:function(t)
  {
		if(t.indexOf('<img class="bgFullImg"')==-1)
		{
			this.obj.C1=1;
			gg.cookie_remove(2,this.a18,this)
		}
		else
		{
			Tool.Modal("需要手动验证",'请【手动验证通过】后，再请点【确定】按扭，自动继续。。。','<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" onclick="fun.a12()" data-bs-dismiss="modal">忽略提示【继续】</button>','');
		}
  },
	a18:function()
  {
		if(this.obj.C1<=this.obj.C2)
		{
			gg.getFetch(this.obj.Carr[this.obj.C1-1][1],"text",this.a19,this)
		}
		else
		{
			$("#state").html('更新完Carr完成。。。');
			this.a12();
		}
  },
	a19:function(t)
  {
		if(t.indexOf("Can't find what you're looking for?")==-1)
		{
			if(t.indexOf(this.obj.dhfromid+".html")!=-1)
			{
				this.a20(t);
			}
			else
			{
				$("#state").html("这一页没有找到，排名可能提前了。。。")
				this.obj.B1=1
				this.obj.A1=1;
				this.obj.C1=1;
				this.obj.Carr=[];
				this.a05();
			}
		}
		else
		{alert("什么都没11111111有");}
  },
	a20:function(t)
  {
		let arr=Tool.StrSplits(t,'<a supplierid="','>'),url="";
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(this.obj.dhfromid+".html")!=-1)
			{
				url=Tool.StrSlice(arr[i],'href="','"');
				break;
			}
		}
		if(url=="")
		{alert("没有找到02");}
		else
		{
			$("#state").html("更新URL。。。")
			this.obj.Carr[this.obj.C1-1][2]=url;
			$("#desurl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			this.a21();
		}
	},
	a21:function()
  {
		this.obj.C1++;
		this.a18();
	}
}
fun.a01();
	/*
					let listurl=""
				let desurl=""
				this.obj.Carr.push([this.obj.B1,listurl,desurl]);
				$("#desurl").html('<a href="'+url+'" target="_blank">'+url+'</a>');
				alert("aaaaaaaaaaaaa33333333aaaaaaaa")

	*/