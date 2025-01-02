'use strict';
var fun=
{
  obj:{A1:1,A2:1,Aarr:["0"]},
  a01:function()
  {
    let html=Tool.header('正在【速卖通】采集类目...')+'\
		<ul class="Tul list-group-item-action"><li class="w100 right">进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state">正在准备账号...</li></ul>'
    Tool.html(this.a02,this,html);
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
		  alert("请手动输入验证码登录");
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
    if(this.obj.A1<=this.obj.A2)
    {
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');    
      win.WebSetHTML("2",'body|',"加载中。。。");
      let fromid=this.obj.Aarr[0]
      $("#state").html("正在打开【分类："+fromid+"】。。。")
      let url="https://www.dianxiaomi.com/smtCategory/list.json?pcid="+fromid
      win.ajax("2",url,this.a07,this)
    }else{$("#state").html("完("+this.obj.Aarr.length+")");}
	},
  a07:function()
	{
    let str=win.WebGetHTML("2",'body|');
    if(str.indexOf(',"updateTime":')!=-1)
    {
      str=str.substr(6,str.length-13)//去掉<body>和</body>
      eval("let oo="+str)
      $("#state").html("<pre>"+JSON.stringify(oo,null,2)+"</pre>")
      this.a08(oo)
    }
    else
    {Tool.Time(this.a07,100,this,"1");}
	},
  a08:function(oo)
  {
		let html="",insertType,selectType
		for(let i=0;i<oo.length;i++)
		{			
      if(!oo[i].nameZh){oo[i].nameZh="null";}
      if(!oo[i].nameEn){oo[i].nameEn="null";}
			insertType="insert into @.smtType(@.name,:upid,:enname,:from,:fromID,:sort,:isleaf)values('"+(oo[i].nameZh).replace(/'/ig,"''")+"','"+this.obj.Aarr[0]+"','"+(oo[i].nameEn).replace(/'/ig,"''")+"','aliexpress','"+oo[i].categoryId+"',"+(i+1)+","+oo[i].isleaf+")"
			selectType="select top 1 count(1) from @.smtType where @.fromID='"+oo[i].categoryId+"'"
			html+='{if "Fun(Db('+selectType+',count))"=="0"}<r: db="sqlite.aliexpress">'+insertType+'</r:>{/if}'
      
			if(oo[i].isleaf==0)
			{
        this.obj.Aarr.push(oo[i].categoryId);
        this.obj.A2++;
      }
		}
		$("#state").html("非叶子类目"+this.obj.Aarr.length+"个(即剩于个数)。")
		Tool.ajax.a01(html,1,this.a09,this)
	},
  a09:function(txt)
	{
		if(txt=="")
		{
       $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');  
		  this.obj.A1++;
      this.obj.Aarr.shift()	
      this.a06();
		}else{$("#state").html("入库出错:<hr/>"+txt);}
	},
}.a01();