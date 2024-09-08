'use strict';
var fun=
{
  obj:{A1:1,A2:0,fromid:0},
  a01:function()
  {
    let html=Tool.header('正在【速卖通】采集类目属性...')+'\
		<ul class="Tul list-group-item-action"><li class="w100 right">进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state">正在准备账号...</li></ul>'
    Tool.html(this.a02,this,html)
  },
  a02:function()
  {
    win.isRD(this.a03,this)
  },
  a03:function()
  {
    $("#state").html("正在打开【店小秘】。。。")
    win.WebNewUrl("2","https://www.dianxiaomi.com/home.htm",this.a04,this)	
  },
  a04:function()
  {
    let str=win.WebGetHTML("2",'body|');
		if(str.indexOf("登录</button>")!=-1)
		{
      $("#state").html("正在登陆。。。")
			win.WebSet('2','input|id="exampleInputName"',"huangxingjl02");
			win.WebSet('2','input|id="exampleInputPassword"',"Abc123456");
		  alert("请手动输入验证码登录")	;
			Tool.Time(this.a05,2000,this,"1");
		}
		else if(str.indexOf("huangxingjl02")!=-1)
		{this.a06();}
		else
		{Tool.Time(this.a04,100,this,"1");}
  },
  a05:function()
	{
		let str=win.WebGetHTML("2",'body|');
		if(str.indexOf("huangxingjl02")!=-1)
		{this.a06();}
		else
		{Tool.Time(this.a05,200,this,"1");}
	},
  a06:function()
	{
		let str='<@page/>\
    <r:smtType size=1 page=2 where=" where @.isleaf=1">\
      ,[smtType:fromid],\
      <r:smtAttr size=1 where=" where @.cateId=\'<:fromid/>\'">\
      [smtAttr:id]\
      </r:smtAttr>\
    </r:smtType>'
	  Tool.ajax.a01(str, this.obj.A1,this.a07,this)
	},
  a07:function(t)
	{
  	let arr=t.split(",")
		this.obj.A2=arr[0];
    this.obj.fromid=arr[1]
		if(this.obj.A1<=this.obj.A2)
		{
		  let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
			$("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）'); 
      if(Tool.Trim(arr[2])=="")
			{
				this.a08();
			}
			else{this.obj.A1++;this.a06();}
		}
    else
    {$("#state").html("完");}    
  },
	a08:function()
	{
		win.WebSetHTML("2",'title|',"加载中。。。");
		let url="https://www.dianxiaomi.com/smtCategory/attributeList.json?categoryId="+this.obj.fromid
		let str='$.ajax({type:"POST",url:"'+url+'",success:function(r){$("title").text(JSON.stringify(r));}});';
		win.WebFun("2",str);
		Tool.Time(this.a09,100,this,"1")
	},
	a09:function()
	{
		let str=win.WebGetHTML("2",'title|');
		if(str.indexOf(',"categoryId":"')!=-1)
		{
      this.a10(str);
    }
		else if(str=="<title>[]</title>")
		{
      this.obj.A1++;this.a06();
    }
		else
		{Tool.Time(this.a09,100,this,"1");}
	},
	a10:function(str)
	{
		let sql=[],js
	  eval("let arr="+str.substr(7,str.length-15))
    $("#state").html("<pre>"+JSON.stringify(arr,null,2)+"</pre>")
		for(let i=0;i<arr.length;i++)
		{
			js=arr[i].values==null?null:"'"+arr[i].values.replace(/\'/g,"''")+"'"
		  sql.push("insert into @.smtAttr(:from,:name,:namecn,:attrId,:cateId,:buyAttr,:isshow,:type,:sort,:js)values('aliexpress','"+(arr[i].nameEn).replace(/\'/g,"''")+"','"+arr[i].nameZh+"',"+arr[i].arrtNameId+","+this.obj.fromid+","+arr[i].sku+","+arr[i].visible+",'"+arr[i].attributeShowTypeValue+"',"+(i+1)+","+js+")")
		}
		let html='<r: db="sqlite.aliexpress">'+sql.join("<1/>")+'</r:>'
		Tool.ajax.a01(html,1,this.a11,this)
	},
	a11:function(t)
	{
		if(t=="")
		{
      $("#state").html("完")
      this.obj.A1++;this.a06();
    }
		else
		{$("#state").text(t);}
	}
}
fun.a01();