'use strict';
var fun=
{
  obj:{A1:1,A2:0,B1:1,B2:0,BArr:[],nArr:[],num:0},
  a01:function()
  {
    let html=Tool.header('正在正常商品中扫描非正常商品...')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">商品页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">商品条进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">产品地址：</td><td id="prourl" colspan="2"></td></tr>\
        <tr><td class="right">店铺ID：</td><td id="shopid" colspan="2"></td></tr>\
        <tr><td class="right">请求地址：</td><td id="url"  colspan="2"></td></tr>\
        <tr><td class="right">产品运费：</td><td id="proArr"  colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state"  colspan="2"></td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html)
  },
  a02:function()
  {
		let newTime=Tool.gettime("")-60*60*24*7;
		//扫描时间。主要判断【是否404】【是否已下架】
		$("#state").html("扫描时间 &lt; "+Tool.js_date_time2(newTime))
    let str='\
    [\
      {"page":<@page/>}\
      <r:pro db="sqlite.aliexpress" size=1 page=2 where=" where @.hide=0 and @.time1<'+newTime+' order by @.shopid asc,@.id asc">\
      ,{\
        "shopid":<:shopid/>,\
        "hide":<:hide/>,\
        <r:freight db="sqlite.aliexpress" size=1 where=" where @.shopid=<:shopid/>">\
        	"proArr":<:proArr/>,\
        </r:freight>\
        "fromid":<:fromid/>\
      }\
      </r:pro>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(oo)
	{
    if(oo[0].page==0)
    {$("#state").html("没有可以【扫描正常商品】");}
    else
		{
      if(!this.obj.A2)this.obj.A2=oo[0].page;
      oo.shift();
      this.obj.B2=oo.length
      this.obj.BArr=oo
      let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（页）');
      this.a04()
		}
  },
  a04:function()
	{
    let arr=this.obj.BArr[this.obj.B1-1]
    let p1=Math.ceil(this.obj.B1/this.obj.B2*100);
    $("#B1").html(p1+"%").css("width",p1+"%");
    $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（条）');
		let URL='https://www.aliexpress.com/item/'+arr.fromid+'.html'
    $("#prourl").html('<a href="'+URL+'" target="_blank">'+URL+'</a>')
    $("#shopid").html(arr.shopid)
    $("#url").html(URL);
		gg.getFetch(url,"json",this.a05,this)
	},
  a05:function(t)
	{

	},
  a06:function(t)
	{
		/*
		$("#state").html("<pre>"+JSON.stringify(oo,null,2)+"</pre>")
    if(oo.body)
    {
      this.obj.num=0;
      if(oo.body.freightResult)//如果有物流
      {
        this.obj.nArr.push("update @.pro set @.time1=GETDATE() where @.fromid="+this.obj.BArr[this.obj.B1-1].fromid);
        //this.a09(oo.body.freightResult);        
				alert("qwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
      }
      else//不到
      {
        let hide=this.obj.BArr[this.obj.B1-1].hide==7?63:7
        this.obj.nArr.push("update @.pro set @.time1="+Tool.gettime("")+",:hide="+hide+",@.err='来自【在正常商品中扫描非正常商品】,因为不送货到美国' where @.fromid="+this.obj.BArr[this.obj.B1-1].fromid);
        Tool.pre(this.obj.nArr)
        //this.a06();
      }
    }
    else
    {
			alert("22222222222")
     
			//this.obj.num++;
//      if(this.obj.num>100)
//      {
//        this.obj.nArr.push("update @.pro set @.time1=GETDATE(),:hide=3,:err='来自【在正常商品中扫描非正常商品】,因为商品已不存在。' where @.fromid="+this.obj.BArr[this.obj.B1-1].fromid);
//        this.a06();
//      }
//      else
//      {Tool.Time(this.a04,0,this,"1");}
			 
    }*/
	},
  /*a06:function()
	{
    $("#B2").html(this.obj.B1+'/'+this.obj.B2+'（完）');
    this.obj.B1++;
    if(this.obj.B1<=this.obj.B2)
    {
      Tool.Time(this.a04,0,this,"1");
    }
    else
    {this.a07();}		
	},
  a07:function()
	{
    let html='<r: db="sqlite.aliexpress">'+this.obj.nArr.join("<1/>")+'</r:>'
    Tool.ajax.a01(html,1,this.a08,this)
	},
  a08:function(t)
	{
    if(t=="")
		{
      $("#B2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
      this.obj.A1++;
		  if(this.obj.A1<=this.obj.A2)
			{
        this.obj.B1=1;
        this.obj.B2=0
        this.obj.BArr=[]
        this.obj.nArr=[];
        $("#B1").css("width","0%");
        $("#B1,#B2").html("")
        ///////////////////////////////////////////
        this.a02();
      }
			else
			{$("#state").text("全部完成");}
		}else{$("#state").text("出错:"+t);}
  },
  a09:function(arr2)
	{
    let arr1=this.obj.BArr[this.obj.B1-1].proArr
    if(arr1)
    {
      arr1.push({fromid:this.obj.BArr[this.obj.B1-1].fromid,time:arr2[0].time,addtime:Tool.js_date_time(new Date(),"/"),company:arr2[0].company,freightAmount:arr2[0].freightAmount.value})
      arr1=Tool.objsort(arr1,"freightAmount");
      if(arr1.length>5){arr1.shift();}
      $("#proArr").html("<pre>"+JSON.stringify(arr1,null,2)+"</pre>")
      this.obj.nArr.push("update @.freight set @.time1=null,@.proArr='"+JSON.stringify(arr1).replace(/'/g,"''")+"' where @.shopid="+this.obj.BArr[this.obj.B1-1].shopid);
      this.a06();
    }
    else
    {
      let html='<r: db="sqlite.aliexpress">insert into @.freight(@.shopid)values('+this.obj.BArr[this.obj.B1-1].shopid+')</r:>'
      Tool.ajax.a01(html,1,this.a02,this)
    }
  },
  a10:function(t)
	{
    if(t==""){this.a02();}else{$("#state").text("出错:"+t);}
  }*/
}
fun.a01();