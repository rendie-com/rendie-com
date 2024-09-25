'use strict';
var fun=
{
  obj:{
		pro:{},//商品初始信息
		code:{}//配置信息
	},
  sql:{},//保存到商品表的语句
	sqlDes:{},//保存到商品详情表的语句
  a01:function()
  {
    //obj.arr[4]      返回URL
    //obj.arr[5]      商品编码【proid】
    let html=Tool.header("正在【重新采集】...")+'\
    <div class="p-2">\
      <table class="table table-hover mb-0">\
      <tbody>\
        <tr><td class="right w150">商品编码：</td><td colspan="2">'+obj.arr[5]+'</td></tr>\
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
    <r:gather db="sqlite.aliexpress" size=1>\
    {\
      "code":<:code/>\
    }\
    </r:gather>';
		Tool.ajax.a01(str,1,this.a04,this);
  },
  a04:function(oo)
  {
		this.obj.code=oo.code;
		Tool.ajax.a01(this.b01(),1,this.a05,this)
  },
  a05:function(arr)
  {
		this.obj.pro=arr
		let url="https://www.aliexpress.com/item/"+arr.fromid+".html"
		let html='\
		<tr><td class="right w150">内容链接：</td><td><a href="'+url+'" target="_blank">'+url+'</a></td></tr>\
		<tr><td class="right">上次【平均价】：</td><td>'+arr.price+'</td></tr>\
		<tr><td class="right">上次【更新时间】：</td><td>'+Tool.js_date_time2(arr.datetime)+'（'+Tool.dateDHM(false,arr.datetime*1000,"s")+'）</td></tr>'
		$("#body").html(html)
		this.a06(url,arr.proid);
  },
  a06:function(url,proid)
  {
		this.sql={proid:proid};
		this.sqlDes={proid:proid};
		Tool.gatherArticle(this.a07,this,url);
  },
  a07:function(oo)
  {
    if(oo.status==404)
    {
      alert("404------")
    }
    else if(oo.status=="shelf")
    {
      alert("shelf------")
    }
    else if(oo.status=="ok")
    {
      this.a08();
    }
    else
    {
      alert("不可能出现的错误")
    }
  },
  a08:function()
  {


    let html='\
    {\
    <r:prodes size=1 db="sqlite.aliexpress_prodes/'+ Tool.pronum(this.sql.proid,50) +'" where=" where @.proid=\''+this.sql.proid+'\'">\
      "aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
      "HistoryPrice":<:HistoryPrice/>\
    </r:prodes>\
    }'
    $("#state").html('正在验证价格，来判断是否需在DH更新...');
   Tool.ajax.a01(html,1,this.a13,this)
  },
  a13:function(oo)
  {
    if(oo.aeopAeProductSKUs)
    {
			let sql=this.sql,availQuantityArr=this.b02(oo,this.sqlDes.aeopAeProductSKUs);//返回值分别为：最高项库存和是否要新
      if(sql.name)
      {
				//alert("需要时再开发")
      }
			else
			{$("#state").html('("采集内容有误,没有获取到标题...');}
    }
    else
    {
			alert("没有找到该商品详情")
			//this.a019();//没有找到该商品详情
		}
  },
  b01:function()
  {
    let str='\
		{\
		<r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\''+obj.arr[5]+'\'">\
			"proid":"<:proid/>",\
			"datetime":<:datetime/>,\
			"fromid":<:fromid/>,\
			"shopid":<:shopid/>,\
			"price":<:price f=2/>,\
			"Discount":<:Discount/>,\
			"hide":<:hide/>,\
			"SaleNum":<:SaleNum/>,\
			"Review":<:Review/>\
		</r:pro>\
		}'
    return str;
  },
  b02:function(arr2,arr3)//返回值分别为：最高项库存和是否要更新
  {
    //【库存不足】 即最高项库存<20
    //当本地所有【库存<20】的组数 与 采集到的【库存<20】的组数 不同，则设置该数据【需要更新】。即：多价格中【库存<20】的组数改变。
    let isupdate=false,//是否要更新
				availQuantity1=0,//本地
				availQuantity2=0,//网络
				availQuantity3=0;//最高项库存
    for(let i=0;i<arr2.aeopAeProductSKUs[1].length;i++)//【本地】只要【库存<20】就累加
    {
      if(arr2.aeopAeProductSKUs[1][i].skuVal.availQuantity<20){availQuantity1++;}
    }
    ////////////////////////////////////////////////////
    for(let i=0;i<arr3[1].length;i++)//【网络】只要【库存<20】就累加
    {
			if(availQuantity3<arr3[1][i].skuVal.availQuantity){availQuantity3=arr3[1][i].skuVal.availQuantity;}      
      if(arr3[1][i].skuVal.availQuantity<20){availQuantity2++;}
    }
    if(availQuantity1!=availQuantity2){isupdate=true;}//【库存<20】的组数不同了，设置该数据【需要更新】
    return [availQuantity3,isupdate]
  }
}
fun.a01();