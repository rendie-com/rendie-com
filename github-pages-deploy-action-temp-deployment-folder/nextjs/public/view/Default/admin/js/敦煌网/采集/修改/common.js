'use strict';
Object.assign(Tool,{
	//获取详情内容
  temp:{next:{},This:{}},
  gatherArticle:function(next,This,url)
  {
    this.temp.next=next;
    this.temp.This=This;
    gg.getFetch(url,"json",this.gatherArticle02,this);
  },
	//是否下架或者404
  gatherArticle02:function(txt)
  {
		if(txt=="{status:404}")//下架
		{
      this.temp.next.apply(this.temp.This,[{status:404}]);
    }
		else
		{
			let isShelf=false,arrshelf=this.temp.This.obj.code.c.shelf.split("\n")
		  for(let i=0;i<arrshelf.length;i++)
			{
				if(txt.indexOf(arrshelf[i])!=-1){isShelf=true;break;}
			}
      if(isShelf)
      {
        this.temp.next.apply(this.temp.This,[{status:"shelf"}]);
      }
      else
      {
        this.gatherArticle03(txt);
      }			
    }
  },
  gatherArticle03:function(txt)
  {
    let oo=this.temp.This.obj;
		let sql=this.temp.This.sql
		sql.type=this.regSlice(txt,oo.code.c.typeA,oo.code.c.typeB);	  
		if(sql.type)
		{
			$("#body").append('<tr><td class="right">分类ID：</td><td>'+sql.type+'</td><tr>')
			sql.name=Tool.regSlice(txt,oo.code.c.nameA,oo.code.c.nameB)
			sql.name=Tool.cleanString(sql.name);
			$("#body").append('<tr><td class="right">标题：</td><td>'+sql.name+'</td><tr>')
			if(sql.name===false)
			{
				alert("002");
			}
			else
			{
				
				sql.SaleNum=Tool.regSlice(txt,oo.code.c.SaleNumA,oo.code.c.SaleNumB)//销量
				
				$("#body").append('<tr><td class="right">已销售数量：</td><td>'+sql.SaleNum+'</td><tr>')
				if(sql.SaleNum===false||sql.SaleNum==undefined)
				{
					alert("001")
					//location.reload();
				}
				else
				{
					sql.ReviewsNum=Tool.regSlice(txt,oo.code.c.ReviewsNumA,oo.code.c.ReviewsNumB)    
					$("#body").append('<tr><td class="right">评论数量：</td><td>'+sql.ReviewsNum+'</td><tr>')
					if(sql.ReviewsNum===false||sql.ReviewsNum===undefined)
					{
						this.temp.next.apply(this.temp.This,[{status:"shelf"}]);
						//location.reload();
					}
					else
					{
						if(!sql.ReviewsNum){sql.ReviewsNum=0;}
						sql.fromID=Tool.regSlice(txt,oo.code.c.productIDA,oo.code.c.productIDB)
						$("#body").append('<tr><td class="right">商品ID：</td><td>'+sql.fromID+'</td><tr>')
						//////////////////////////////////////////////////////
						sql.keywords=Tool.StrSlice(txt,oo.code.c.keywordsA,oo.code.c.keywordsB);
						$("#body").append('<tr><td class="right">关键词：</td><td>'+sql.keywords+'</td><tr>')
						//////////////////////////////////////////
						sql.description=Tool.cleanString(Tool.regSlice(txt,oo.code.c.descriptionA,oo.code.c.descriptionB));
						sql.description=sql.description.split("\nEnjoy")[0];//后面的内容没什么用，所以有了这个
						$("#body").append('<tr><td class="right">关键词描述：</td><td>'+sql.description+'</td><tr>')
						this.b07(txt,oo,sql)//单位和每包件数
						sql.Discount=Tool.regSlice(txt,oo.code.c.DiscountA,oo.code.c.DiscountB);
						if(!sql.Discount){sql.Discount=0}
						$("#body").append('<tr><td class="right">折扣率：</td><td>-'+sql.Discount+'%</td><tr>')
						this.gatherArticle04(txt,oo,sql);
					}
				}
			}
		}
		else
		{this.temp.next.apply(this.temp.This,[{status:404}]);}
  },
	gatherArticle04:function(txt,oo,sql)
  {
		let sqlDes=this.temp.This.sqlDes
		//////////以前的，从配置文件中拿配置/////////////////////////////////////////////////
		//		if(oo.code.c.videoUrlA)
		//    {
		//      sqlDes.videoUrl=Tool.regSlice(txt,oo.code.c.videoUrlA,oo.code.c.videoUrlB);
		//      if(sqlDes.videoUrl==false){sqlDes.videoUrl=""}
		//    }
		//    else
		//		{sqlDes.videoUrl=""}
		//////////////现在的，写死/////////////////////////
		//////////////////////////////////////////////////////////////////
    $("#body").append('<tr><td class="right">视频地址：</td><td>没做</td><tr>')
    sql.shopId=Tool.regSlice(txt,oo.code.c.shopIdA,oo.code.c.shopIdB)
    if(!sql.shopId){sql.shopId=0;}//店关了，产品还在
    $("#body").append('<tr><td class="right">店铺ID：</td><td>'+sql.shopId+'</td><tr>')
    sql.Review=Tool.regSlice(txt,oo.code.c.ReviewA,oo.code.c.ReviewB)
    if(sql.Review==false){sql.Review=5;}//找不到就是最好评分
    $("#body").append('<tr><td class="right">客户评分：</td><td>'+sql.Review+'</td><tr>')    
    //let Propertys=this.b04(oo.code.c,txt)//自定义属性组
    //sqlDes.aeopAeProductPropertys=Propertys[1]
    $("#body").append('<tr><td class="right">自定义属性组：</td><td class="p-0">没做</td></tr>')
    let pichtml=this.b02(oo.code.c,txt)//放大镜图   
    sqlDes.pic=pichtml[0]
    $("#body").append('<tr><td class="right">放大镜图片：</td><td>'+pichtml[1]+'</td></tr>')
    sql.pic1=pichtml[2];
    $("#body").append('<tr><td class="right">放大镜首图：</td><td><img class="border m-1 p-1" src="'+sql.pic1+'" title="点击预览" border="0" width="80"></td></tr>')
    this.gatherArticle05(txt,oo,sqlDes,sql);
  },
  gatherArticle05:function(article,oo,sqlDes,sql)
  {
	/*	let skuhtml=Tool.regSplits(article,oo.code.c.skuA,oo.code.c.skuB);
		let arr1;eval("arr1="+skuhtml)
		let arr2=[arr1.productSKUPropertyList,arr1.skuPriceList]
		sqlDes.aeopAeProductSKUs=arr2;
		let price=0,minprice=0,maxprice=0,newprice=0
		for(let i=0;i<arr2[1].length;i++)
		{
			newprice=parseFloat(arr2[1][i].skuVal.skuAmount.value);
			if(i==0){minprice=newprice;}else if(newprice<minprice){minprice=newprice;}
			if(newprice>maxprice){maxprice=newprice;}
			price+=newprice;//价格之和
		}
		sql.price=(price/arr2[1].length).toFixed(2);
		sql.minprice=minprice.toFixed(2);
		sql.maxprice=maxprice.toFixed(2);
		$("#body").append('\
		<tr><td class="right">平均价格：</td><td>'+sql.price+'</td><tr>\
		<tr><td class="right">最小价格：</td><td>'+sql.minprice+'</td><tr>\
		<tr><td class="right">最大价格：</td><td>'+sql.maxprice+'</td><tr>\
		<tr>\
			<td class="right">价格：</td><td><textarea style="height:500px;"class="form-control">'+JSON.stringify(arr2,null,2)+'</textarea></td>\
		<tr>')*/
		this.gatherArticle06(article,oo)
  },
  gatherArticle06:function(article,oo)
  {
		let des=Tool.regSlice(article,oo.code.c.desA,oo.code.c.desB);
		if(oo.code.c.desmode=="1")
		{
			let url=(oo.code.c.DesLink).replace(/\{\$ID\}/,des);
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		  $("#state").html('正在获取商品详情。。。');
      gg.getFetch(url,"json",this.gatherArticle07,this);
		}
		else
		{
			this.gatherArticle10();
		}
  },
  gatherArticle07:function(des)
  {
    $("#state").html('已获得商品详情。')
    let isdes,oo=this.temp.This.obj
    if(oo.code.c.des2A){isdes=Tool.regSlice(des,oo.code.c.des2A,oo.code.c.des2B);}else{isdes=des;}
    isdes=isdes.replace(/(<a [\S\s]*?<\/a>)/ig,"").replace(/(<map [\S\s]*?<\/map>)/ig,"").replace(/&nbsp;/ig," ").replace(/style\="([\s\S]*?)"/ig,'')
    /////////////////////////////////////////////////////////////////////
  //  let arr2=oo.code.c.shield.split("\n"),patt1,result,ret=[]
//    for(let j=0;j<arr2.length;j++)
//    {
//      patt1=new RegExp(arr2[j],"ig")
//      do
//      {
//        result=patt1.exec(isdes);
//        if(result)ret[ret.length]=result[1]
//      }while(result!=null)
//    }
//    for(let i=0;i<ret.length;i++){isdes=isdes.replace(ret[i],"");}
//    if(isdes.length>8000){isdes=isdes.substr(0,8000)}
    this.temp.This.sqlDes.des=isdes;
    this.gatherArticle08();
  },
  gatherArticle08:function()//进入【店铺详情替换】
  {
		let txt='<r:shop db="sqlite.dhgate" size=1 where=" where @.shopid='+this.temp.This.sql.shopId+'"><:replaceItem/></r:shop>'
		$("#state").html('正在进入【店铺详情替换】。。。');
		Tool.ajax.a01(txt,1,this.gatherArticle09,this)
	},
  gatherArticle09:function(t)
	{
		if(t)
		{
			let sqlDes=this.temp.This.sqlDes
			let arr2=t.split("\n"),patt1,result1,des2=sqlDes.des,ret=[]
			for(let j=0;j<arr2.length;j++)
			{
				if(arr2[j].substr(0,4)=="img:")
				{
					patt1=new RegExp('<img[^>]*?(src="[^"]*?")[^>]*?>',"ig")
					do
					{
						result1=patt1.exec(sqlDes.des);
						if(result1)
						{
							if(result1[0].indexOf(arr2[j].split("img:")[1])!=-1){ret.push(result1[0]);}
						}
					}while(result1!=null)
				}
				else
				{
					patt1=new RegExp(arr2[j],"ig")
					do
					{
						result1=patt1.exec(this.temp.This.sqlDes.des);
						if(result1){ret.push(result1[1]);}
					}while(result1!=null)
				}
			}
			for(let i=0;i<ret.length;i++){des2=des2.replace(ret[i],"");}
			$("#body").append('\
			<tr>\
				<td class="right">详情：</td><td><textarea style="height:500px;"class="form-control">'+des2+'</textarea></td>\
			<tr>')
			if(des2.indexOf(">USD ")!=-1||des2.indexOf(">US $")!=-1||des2.indexOf(">US$")!=-1)
			{
        sqlDes.des=des2;
        this.gatherArticle10();
      }
			else
			{
        sqlDes.des=des2;
        this.gatherArticle10();
      }
		}
		else
		{
      this.gatherArticle11();
    }
	},
	gatherArticle10:function()
	{
    this.temp.next.apply(this.temp.This,[{status:"ok"}]);
  },
 	gatherArticle11:function()//商品要做一个，详情替换
	{
    $("#state").html('正在插入【店铺详情替换】内容。。。')
		let html='""<r: db="sqlite.aliexpress">INSERT into @.shop(@.shopid,@.replaceItem,@.addtime)VALUES('+this.temp.This.sql.shopId+',\'(正则表达式)\','+Tool.gettime("")+')</r:>'
		Tool.ajax.a01(html,1,this.gatherArticle12,this);
  },
	gatherArticle12:function(oo)
	{
		if(oo=="")
		{
			this.gatherArticle08()
		}else{Tool.at(oo);}
  },
  b02:function(code,htmlcode)
  {
		let pichtml=[],picArr=[],html="",indeximg
		picArr=this.b03(code,htmlcode);    
		for(let i=0;i<picArr.length;i++)
		{
      html+='<a href="'+picArr[i]+'" target="_blank"><img width="80" src="'+picArr[i]+'" class="border m-1 p-1"/></a>';
    }
		if(picArr.length>=3){indeximg=picArr[2];}else{indeximg=picArr[0];}//用第三张图片
		pichtml[0]=picArr.join(';');
		pichtml[1]=html
		pichtml[2]=indeximg;
		return pichtml
  },
  b03:function(code,htmlcode)
  {
		let PicList=Tool.StrSlice(htmlcode,code.PicListA,code.PicListB); 
		if(PicList){PicList=Tool.regSplits(PicList,code.PicA,code.PicB)}
    return PicList
	},
  b04:function(code,htmlcode)
  {
		let PropertysLeft,PropertysRight,pA,pB,str,Propertys=[],val
		pA=code.PropertysListA;pB=code.PropertysListB
		if(pA.indexOf("reg:")!=-1){pA=pA.substr(4);val=Tool.strRepArr(htmlcode,pA,pB)[0];}else{val=Tool.StrSlice(htmlcode,pA,pB);}
		if(val!=null)
		{
			pA=code.PropertysLeftA;pB=code.PropertysLeftB
			if(pA.indexOf("reg:")!=-1){pA=pA.substr(4);PropertysLeft=Tool.strRepArr(val,pA,pB);}else{PropertysLeft=Tool.StrSplits(val,pA,pB);}
			pA=code.PropertysRightA;pB=code.PropertysRightB
			if(pA.indexOf("reg:")!=-1){pA=pA.substr(4);PropertysRight=Tool.strRepArr(val,pA,pB);}
			else
			{PropertysRight=Tool.StrSplits(val,pA,pB);}
			str='<table class="table mb-0 table-bordered table-hover"><thead class="table-light center"><tr><th class="w200">属性名</th><th class="left">属性值</th></tr></thead>'
			for(let i=0;i<PropertysRight.length;i++)
			{
        let attr=Object();
        attr.attrName=PropertysLeft[i];attr.attrValue=PropertysRight[i];
        Propertys[i]=attr
        str+="<tr><td align=\"right\" nowrap=\"nowrap\">"+PropertysLeft[i]+":</td><td class=\"AutoNewline\">"+PropertysRight[i]+"</td></tr>"
			}
			str=str+"</table>"
			Propertys=JSON.stringify(Propertys)
			Propertys=Tool.removeHTMLCode(Propertys,"*")
			return [str,Propertys]
		}
  },
  b07:function(htmlcode,oo,sql)//单位和每包件数
  {
		sql.unit=Tool.regSlice(htmlcode,oo.code.c.unitA,oo.code.c.unitB);
		sql.lotNum=Tool.regSlice(htmlcode,oo.code.c.lotNumA,oo.code.c.lotNumB);
    $("#body").append('\
    <tr>\
      <td class="right">单位：</td><td>'+sql.unit+'</td>\
    </tr>\
    <tr>\
		  <td class="right">每包件数：</td><td>'+sql.lotNum+'</td>\
    </tr>')
  }
})