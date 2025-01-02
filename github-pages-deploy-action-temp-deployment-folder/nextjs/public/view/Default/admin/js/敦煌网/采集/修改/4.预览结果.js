'use strict';
var fun=
{
	cache:{},//缓存信息
  obj:{
		A1:1,A2:0,
		B1:1,B2:0,
		code:{}//配置信息
	},
  sql:{},//保存到商品表的语句
	sqlDes:{},//保存到商品详情表的语句
  file:'/'+o.cacheFolder+"collect/"+obj.arr[4]+".txt",
  a01:function()
  {
    //obj.arr[4]      【采集表ID】,【allUser所有已上传店铺】,【proid商品proid】,【allshop按店铺采】【类目ID】
    //obj.arr[5]      模式【如：1:预览；2:采集；3:更新；4:采集运费模板】
    //obj.arr[6]      返回URL
    let html=this.b01(obj.arr[5])+'\
    <div class="p-2">\
		<table class="table table-hover mb-0">\
			<tbody>\
        <tr><td class="right">采集项目名称：</td><td id="name" colspan="2"></td></tr>\
				<tr><td class="right w150">页进度：</td>'+Tool.htmlProgress('A')+'</tr>\
				<tr><td class="right">条进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
				<tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
			</tbody>\
		</table>\
		<table class="table table-hover"><tbody id="body"></tbody></table>\
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
    <r:gather db="sqlite.dhgate" size=1 where=" where '+(obj.arr[5]=="3"||obj.arr[5]=="4"?'':' @.id='+obj.arr[4])+'">\
    {\
      "IsExistFile":"<.IsExistFile('+this.file+')/>",\
      "code":<:code tag=0/>,\
      "name":"<:name tag=js/>",\
      "sort":<:sort/>,\
      "note":"<:note tag=js/>"\
    }\
    </r:gather>';
		Tool.ajax.a01(str,1,this.a04,this);
  },
  a04:function(oo)
  {
		$("#name").html(oo.name)
		this.obj.code=oo.code;
		if(oo.IsExistFile=="True")
		{
			Tool.loadJS(this.a18,this,this.file)
		}
		else if(oo.IsExistFile=="False")//文件不存在
		{
			this.cache={A1:1,A2:0,B1:1,B2:0,list:[],list:[],item:[]};
			this.a05();
		}
		else
		{
			pre(oo)
			alert("未知文件是否存在："+oo.IsExistFile);
		}
  },
	a05:function()//文件不存在
  {
		if(this.obj.code.a.pageurl1){this.cache.list.push(this.obj.code.a.pageurl1);}
		this.obj.A1=parseInt(this.obj.code.a.istart)
		this.obj.A2=parseInt(this.obj.code.a.iend)
		let URL=this.obj.code.a.pageurl;
		if(this.obj.code.a.pageset=="1")//分页设置：	不分页	 批量分页	 手动分页	 直接采集内容页(分页)	 提交分页(post)
		{
			for(let i=this.obj.A1;i<=this.obj.A2;i+=parseInt(this.obj.code.a.step))
			{
				this.cache.list.push(URL.replace(/\{\$ID\}/,i));
			}
			this.a06();
		}
		else
		{alert("没做：分页设置：	不分页	 批量分页	 手动分页	 直接采集内容页(分页)	 提交分页(post)");}
  },
  a06:function()
  {
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07,this,this.a21);
  },
  a07:function()
  {
		$("#state").html('正在打开【列表页】。。。');
		$("#url").html('<a href="'+this.cache.list[0]+'" target="_blank">'+this.cache.list[0]+'</a>');
		gg.getFetch(this.cache.list[0],"text",this.a08,this);
  },
  a08:function(html)
  {
    let A=this.obj.code.b.listA,B=this.obj.code.b.listB
    let str=Tool.regSlice(html,A,B);
    if(str==false)
    {
      $("#state").html("获取【列表页内容】不对")
    }
    else
    {
      let fromidArr=Tool.StrSplits(str,this.obj.code.b.proidA,this.obj.code.b.proidB);//在列表页中去重复
			if(fromidArr.length==0)
			{
				$("#state").html('列表页没数据，或者已改版。');
				alert("列表页没数据，或者已改版。")
			}
			else
			{
				let txt='[0<r:pro db="sqlite.dhgate" where=" where @.fromid in('+fromidArr.join(",")+')" size="100">,"<:fromid/>"</r:pro>]'
				$("#state").html('正在去掉【重复商品】。。。');
				Tool.ajax.a01(txt,1,this.a09,this,fromidArr)
			}
    }
  },
  a09:function(oo,fromidArr)
  {
		oo.shift();
		///////////////////////////////////////////
		let nArr=[]
		for(let i=0;i<fromidArr.length;i++)
		{
			if(oo.indexOf(fromidArr[i])==-1){nArr.push(fromidArr[i]);}
		}
		this.cache.item=nArr
		for(let i=0;i<nArr.length;i++)
		{
			if(this.obj.code.b.isspecialmlink=="1")
			{this.cache.item[i]=this.obj.code.b.mlinkRR.replace("[变量]",this.cache.item[i])};
		}
		
		///////////////////////////////////////////////
		$("#state").html('正在去掉【重复】。。。');
		this.obj.B2=nArr.length
		this.a10();
	},
  a10:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a11,this,this.a19)
	},
  a11:function()
  {
		let url=this.cache.item[0];
		$("#body").append('\
		<tr>\
			<td class="w150 right">列表页地址：</td>\
			<td><a href="'+this.cache.list[0]+'" target="_blank">'+this.cache.list[0]+'</a></td>\
		</tr>\
		<tr>\
			<td class="right">内容页地址：</td>\
			<td><a href="'+url+'" target="_blank">'+url+'</a></td>\
		</tr>');
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		Tool.gatherArticle(this.a12,this,url);
	},
  a12:function(oo)
  {
    if(oo.status==404)
    {
       alert("该商品404");
    }
    else if(oo.status=="shelf")
    {
			//this.a16("")
      alert("该商品已下架");
    }
    else if(oo.status=="ok")
    {
      this.a13()
    }
    else
    {
      alert("不可能出现的错误")
    }
  },
	a13:function()
  {
		switch(obj.arr[5])
		{
			case "1":$("#B2").html(this.cache.B1+'/'+this.cache.B2+'（完）');$("#state").html('【预览结果】已显示完成');break;
			case "2":this.a14();break;
		}
  },
  a14:function()//生成商品ID
  {
		let ran=parseInt(Math.random()*(999999),10)//有99w的ID
		let str='<.Db(sqlite.dhgate,select count(1) from @.pro where @.proid=\'R'+(ran)+'\',count)/>'
    Tool.ajax.a01(str,1,this.a15,this,ran);
  },
  a15:function(t,ran)
  {
		if(t==0)
		{
			this.sql.proid="R"+ran;//设置编码
			this.sqlDes.proid="R"+ran;//设置编码
			let str=this.b03("pro");
     Tool.ajax.a01(str,1,this.a16,this);
		}
		else
		{this.a14();}
  },
  a16:function(t)
  {
    if(t=="")
    {
      $("#B2").html(this.cache.B1+'/'+this.cache.B2+'（完）');
      this.obj.B1++
			this.sql={}
			this.sqlDes={}
			$("#body").html("");
      this.cache.item.shift();
			this.cache.A1=this.obj.A1;
			this.cache.A2=this.obj.A2;
			this.cache.B1=this.obj.B1;
			this.cache.B2=this.obj.B2;
     Tool.ajax.a01(this.b02(),1,this.a17,this)
    }
    else
    {alert("出错01："+t);}
  },
  a17:function(t)
  {  
    if(t=="")
    {
      this.a10();
    }
    else
    {alert("出错02："+t);}
  },
  a18:function()
  {  
		this.obj.A1=this.cache.A1
		this.obj.A2=this.cache.A2
		this.obj.B1=this.cache.B1
		this.obj.B2=this.cache.B2
		this.a06()
  },
  a19:function()
  {  
		this.obj.A1++;
		$("#B1").css("width","0%");
		$("#B1,#B2").html("");
		$("#body").html("");
		this.obj.B1=1;
		this.obj.B2=0;
		this.sql={}
		this.sqlDes={}
		this.cache.A1=this.obj.A1;
		this.cache.A2=this.obj.A2;
		this.cache.B1=this.obj.B1;
		this.cache.B2=this.obj.B2;
		this.cache.list.shift();//下一步就要存了，这里要先删了
		Tool.ajax.a01(this.b02(),1,this.a20,this)
  },
  a20:function(t)
  {  
    if(t=="")
    {
      this.a06();
    }
    else
    {alert("出错02："+t);}
  },
  b01:function(val)
  {
    let head='';
    if(val=="2")
    {
      head=Tool.header("正在【采集数据】...");
    }
    else if(val=="1")
    {
      head='\
      <header class="panel-heading">\
				<a class="arrow_back" onclick="Tool.main();"></a>\
				<div onclick="Tool.main(\'js01/'+obj.arr[4]+'\');">１. 设置基本参数</div>\
				<div onclick="Tool.main(\'js02/'+obj.arr[4]+'\');">２. 列表页连接设置</div>\
				<div onclick="Tool.main(\'js03/'+obj.arr[4]+'\');">３. 内容页连接设置</div>\
				<div onclick="Tool.main(\'js04/'+obj.arr[4]+'/1\');" class="active">４. 预览结果</div>\
			</header>'
    }
    return head;
  },
  b02:function()
  {
		return '""<r: file="'+this.file+'">fun.cache='+JSON.stringify(this.cache)+'</r:>'
  },
  b03:function(table)
  {
		let props1="",props2="",str="",insert1,insert2,select1,availQuantity3=0,sql=this.sql;
		let sqlDes=this.sqlDes
   // let arr2=sqlDes.aeopAeProductSKUs
//    for(let i=0;i<arr2[1].length;i++)//库存之和
//    {
//			availQuantity3+=arr2[1][i].skuVal.availQuantity;
//		}
//    if(sql.SaleNum<20)
//		{
//			sql.hide=7;sql.err='来自这【采集商品】【销量<20】';
//		}
//    else if(sql.Review<4)
//    {
//			sql.hide=8;sql.err='评分<4';
//		}
//    else if(availQuantity3/arr2[1].length<15)
//    {
//			sql.hide=2;sql.err='库存不足【平均库存<15】';
//		}
		sql.addtime=Tool.gettime("")
		sql.datetime=Tool.gettime("")
		//////////////////////////////////////////////////
		sqlDes.aeopAeProductSKUs=JSON.stringify(sqlDes.aeopAeProductSKUs)//只有这个是以对象形式在里面。
    ///////////////////////////////////////////////////
    sqlDes.HistoryPrice=
    [
      {
        price:sql.price,
        Discount:sql.Discount,
        Review:sql.Review,
        SaleNum:sql.SaleNum,
        ReviewsNum:sql.ReviewsNum,
        time:Tool.js_date_time(new Date(),"/")
      }
    ];
    sqlDes.HistoryPrice=JSON.stringify(sqlDes.HistoryPrice)
    ///////////////////////////////////////
    for(let p in sql)
    {
      props1+=",@."+p;
      if("|Discount|price|type|weight|length|width|height|fromID|shopId|SaleNum|Review|hide|addtime|datetime|".indexOf("|"+p+"|")==-1)
      {
				props2+=","+Tool.rpsql(sql[p]);
			}
      else
      {props2+=","+sql[p];}
    }
    select1="select count(1) from @."+table+" where @.fromID="+sql.fromID;
    insert1='<r: db="sqlite.dhgate">insert into @.'+table+'('+props1.substr(1)+')values('+props2.substr(1)+')</r:>';
		///////////////////////////////////////
		props1="";props2=""
		for(let p in sqlDes)
    {
      props1+=",@."+p;
      props2+=","+Tool.rpsql(sqlDes[p]);
    }
    let proid=parseInt(sql.proid.substr(1))
		let desI=Math.ceil(proid/100000)
		if(desI>9){desI=1;}
    insert2='<r: db="sqlite.dhgateprodes'+desI+'">insert into @.prodes('+props1.substr(1)+')values('+props2.substr(1)+')</r:>';
		/////////////////////////////////
    str='""<if Fun(Db(sqlite.dhgate,'+select1+',count))==0>'+insert1+insert2+'</if>'
		return str
  }
}
fun.a01();