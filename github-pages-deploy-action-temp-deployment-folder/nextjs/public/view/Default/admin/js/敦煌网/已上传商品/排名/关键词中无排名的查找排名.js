'use strict';
var fun=
{	
	next:null,
	obj:{A1:1},
  a01:function()
	{
    let html='\
		<header class="panel-heading"><a href="javascript:" onclick="Tool.main(\''+Tool.unescape(obj.arr[5])+'\')" class="arrow_back"></a>正在执行【已上传商品 -&gt; 关键词中<font color="red">'+(obj.arr[4]=="1"?"有":"无")+'排名</font>的查找排名】任务。。。</header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">商品进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">第几个关键词：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">翻到第几页：</td>'+Tool.htmlProgress('C')+'</tr>\
        <tr><td class="right">账号：</td><td id="upuser" colspan="2"></td></tr>\
        <tr><td class="right">商品编码：</td><td id="proid" colspan="2"></td></tr>\
        <tr><td class="right">SMT商品ID：</td><td id="smtfromid" colspan="2"></td></tr>\
        <tr><td class="right">DH商品ID：</td><td id="dhfromid" colspan="2"></td></tr>\
        <tr><td class="right">原生关键词：</td><td id="keywords" colspan="2"></td></tr>\
        <tr><td class="right">关键词1：</td><td id="keys1" colspan="2"></td></tr>\
        <tr><td class="right">关键词2：</td><td id="keys2" colspan="2"></td></tr>\
        <tr><td class="right">关键词3：</td><td id="keys3" colspan="2"></td></tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
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
		let dayN=parseInt((new Date().getTime() - 1000*60*60*24*Number(obj.arr[4]))/1000);
		let where=' and @.keysScanTime<'+dayN+' and @.isRanking='+(obj.arr[4]=="1"?1:0)
    let str='\
    {\
      <r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" where @.status=0'+where+'">\
				<r:pro db="sqlite.dhgate" size=1 where=" where @.proid=\'<:proid/>\'">\
					"smtfromid":"<:fromid/>",\
					"proid":"<:proid/>",\
					"keywords":<:keywords tag=json/>,\
				</r:pro>\
				"dhfromid":"<:fromid/>",\
				"upuser":"<:upuser/>",\
			</r:proupdhgate>\
			"A2":'+(this.obj.A1==1?'<@count/>':0)+'\
    }'
   Tool.ajax.a01(str,1,this.a04,this)
  },
	a04:function(oo)
  {
		oo.A1=this.obj.A1;
		oo.A2=oo.A1==1?oo.A2:this.obj.A2;
		oo.B1=1;oo.B2=3;oo.Barr=[];//表示3个关键词
		oo.C1=1;oo.C2=10;oo.Carr=[];//翻到第几页
		oo.isRanking=0;
		this.obj=oo;		
		if(this.obj.A1<=this.obj.A2)
		{
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
			$("#A1").html(p1+"%").css("width",p1+"%");
			$("#A2").html(this.obj.A1+'/'+this.obj.A2+" (条)");
			$("#upuser").html(oo.upuser);
			$("#ranking").html(Tool.pre(oo.ranking));
			$("#proid").html(oo.proid);
			let url="https://www.dhgate.com/product/----/"+oo.dhfromid+".html"
			$("#dhfromid").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			url="https://www.aliexpress.com/item/"+oo.smtfromid+".html"
			$("#smtfromid").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			$("#keywords").html(oo.keywords);
			$("#state").html("已获取商品信息。。。");
			this.obj.Barr=this.b01(oo.keywords)
			if(this.obj.Barr.length==3)
			{
				$("#keys1").html(this.obj.Barr[0]);
				$("#keys2").html(this.obj.Barr[1]);
				$("#keys3").html(this.obj.Barr[2]);
				this.a05();
			}
			else
			{
				$("#state").html('关键词的个数不对。。。');
			}		
		}
		else
		{
			$("#state").html('全部完成');
		}
  },
	a05:function()
  {
		if(this.obj.B1<=this.obj.B2)
		{
			let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
			$("#B1").html(p1+"%").css("width",p1+"%");
			$("#B2").html(this.obj.B1+'/'+this.obj.B2+" (个)");
			$("#state").html("正在查询【keys"+this.obj.B1+"】。。。");
			this.a06()
		}
		else
		{
			this.obj.B1=1;
			$("#B1").html("0%").css("width","0%");
			$("#B2").html("");
			this.a09();
		}
  },
	a06:function()
  {
		if(this.obj.C1<=this.obj.C2)
		{
			let p1=Math.ceil(this.obj.C1/this.obj.C2*100);
			$("#C1").html(p1+"%").css("width",p1+"%");
			$("#C2").html(this.obj.C1+'/'+this.obj.C2+" (页)");
			let url="https://www.dhgate.com/w/"+this.obj.Barr[this.obj.B1-1]+(this.obj.C1==1?"":"/"+(this.obj.C1-1))+".html?leftpars=c2hpcGNvdW50cnk9dXNkaGdhdGU"		
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
			gg.getFetch(url,"json",this.a07,this)		
		}
		else
		{
			this.obj.B1++;
			this.obj.C1=1;
			$("#C1").html("0%").css("width","0%");
			$("#C2").html("");
			this.a05()
		}		
  },
	a07:function(t)
  {
		if(t.indexOf("{status:403}")!=-1)
		{
			$("#state").html("您无权访问在这台服务器上。");
			alert("您无权访问在这台服务器上。")
		}
		else
		{
			if(t.indexOf("Can't find what you're looking for?")==-1)
			{
				if(t.indexOf(this.obj.dhfromid+".html")!=-1)
				{
					$("#state").html("关键词【"+this.obj.Barr[this.obj.B1-1]+"】，第"+this.obj.C1+"页找到了。。。")
					this.a08(t);
				}
				else
				{
					$("#state").html("关键词【"+this.obj.Barr[this.obj.B1-1]+"】，第"+this.obj.C1+"页没有找到。。。")
					this.obj.C1++;this.a06();
				}
			}
			else
			{
				$("#state").html("在敦煌网关键词【"+this.obj.Barr[this.obj.B1-1]+"】一个都搜不到。");
				this.obj.C1=this.obj.C2+1;
				this.a06();
			}
		}
  },
	a08:function(t)
  {
		let arr=Tool.StrSplits(t,'<a supplierid="','>'),ranking=0,url="";
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf(this.obj.dhfromid+".html")!=-1)
			{
				ranking=i+1;
				url=Tool.StrSlice(arr[i],'href="','"');
				break;
			}
		}
		if(ranking==0)
		{this.obj.C1++;this.a06();}
		else
		{
			this.obj.isRanking=1;
			let keys=this.obj.Barr[this.obj.B1-1];
			this.obj.Barr[this.obj.B1-1]={
				keys:keys,
				ranking:ranking+((this.obj.C1-1)*48)//48  表示每页48条
			}
			$("#state").html("第"+this.obj.C1+"页的"+ranking+"名。");
			this.obj.C1=this.obj.C2+1;//表示不用去下一页了
			this.a06();
		}
  },
	a09:function()
  {
		let time=Tool.userDate13(Date.now(),"/")
		let arr=["update @.proupdhgate set @.keysScanTime="+Tool.gettime(time)+",@.isRanking="+this.obj.isRanking+" where @.proid='"+this.obj.proid+"'"]
		if(this.obj.isRanking==1)
		{
			let keys1Arr=this.obj.Barr[0]
			let keys1,keys1Ranking
			if(keys1Arr.keys)
			{keys1=keys1Arr.keys;keys1Ranking=keys1Arr.ranking;}
			else
			{keys1=keys1Arr;keys1Ranking=1000;}
			keys1=keys1.replace(/\'/g,"''")
			////////////////////////////////////////////////////
			let keys2Arr=this.obj.Barr[1]
			let keys2,keys2Ranking
			if(keys2Arr.keys)
			{keys2=keys2Arr.keys;keys2Ranking=keys2Arr.ranking;}
			else
			{keys2=keys2Arr;keys2Ranking=1000;}
			keys2=keys2.replace(/\'/g,"''")
			//////////////////////////////////////////////
			let keys3Arr=this.obj.Barr[2]
			let keys3,keys3Ranking
			if(keys3Arr.keys)
			{keys3=keys3Arr.keys;keys3Ranking=keys3Arr.ranking;}
			else
			{keys3=keys3Arr;keys3Ranking=1000;}
			keys3=keys3.replace(/\'/g,"''")
			/////////////////////////////////////////////
			arr.push("insert into @.proupdhkeysranking(@.proid,@.addtime,@.keys1,@.keys1Ranking,@.keys2,@.keys2Ranking,@.keys3,@.keys3Ranking)VALUES('"+this.obj.proid+"',"+Tool.gettime(time)+",'"+keys1+"',"+keys1Ranking+",'"+keys2+"',"+keys2Ranking+",'"+keys3+"',"+keys3Ranking+")")
		}
		let str='""<r: db="sqlite.aliexpress">'+arr.join('<1/>')+'</r:>'
		Tool.ajax.a01(str,1,this.a10,this)
  },
	a10:function(t)
  {
	  if(t=="")
		{
			this.obj.A1++;
			this.a03();				
		}
		else
		{Tool.pre(t);}
	},
  b01:function(keywords)
  {
		let keyArr=keywords.split(","),len=keyArr.length-1,nArr=[];
		for(let i=len;i>=0;i--)
		{
			keyArr[i]=Tool.Trim(keyArr[i]);
			if(keyArr[i]!="")
			{
				keyArr[i]=keyArr[i].replace(/ \& /g," ").replace(/ /g,"+");
				nArr.push(keyArr[i]);
				if(nArr.length==3){break;}
			}
		}
		return nArr;
	}
}
fun.a01();
