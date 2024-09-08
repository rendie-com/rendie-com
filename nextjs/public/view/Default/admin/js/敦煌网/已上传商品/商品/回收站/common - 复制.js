'use strict';
Object.assign(Tool, {
	DHseller:function(A,B)
	{
		let where="",str
    if(!A.obj.A1){A.obj.A1=1;}
		str='{\
    <r:seller db="sqlite.dhgate" size=1 page=2 where="'+where+' order by @.sort asc,@.id asc">\
      "token":<:token tag=0/>,\
      "fromid":"<:fromid/>",\
      "username":"<:username/>",\
      "password":"<:password/>",\
      "shippingModel":<:shippingModel/>,\
      "afterSaleID":"<:afterSaleID/>",\
      "SizeTemplate":<:SizeTemplate/>,\
      "upmode":<:upmode/>,\
      "Group":<:Group/>,\
    </r:seller>\
    "A1":'+A.obj.A1+',"A2":<@page/>,\
		"B1":1,"B2":0,\
		"C1":1,"C2":0,"CArr":[],"CArr2":[],"CArrMD5":[],\
    "D1":1,"D2":0,\
		"time":'+Date.now()+',\
		"DH":{},\
		"googleshopping":false\
    }'
		Tool.ajax.a01(str,A.obj.A1,[A,this.DHseller02,this,B])
	},
  DHseller02:function(oo,arr)
  {
    arr[0].obj=oo;
    this.GetToken(arr[0],this.DHseller03,arr);
	},
  DHseller03:function(arr)
  {
    let p1=Math.ceil(arr[0].obj.A1/arr[0].obj.A2*100);
    $("#username").html(arr[0].obj.username);
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(arr[0].obj.A1+'/'+arr[0].obj.A2+'（个）');
		arr[1].apply(arr[0]);
	},
	////////////////////////////////////////////////////////////////////
  DHpro:function(A,B,oo)
  {
    if(oo.count==0)
    {
			A.obj.DH=false;
			B.apply(A);
    }
    else
    {
      if(oo.typebind)
      {
				$("#state").html("正在获得绑定信息");
       Tool.ajax.a01(1,A,this.DHpro02,this.b0DHAttr(oo.typebind),this,[oo,B]);
      }
      else
      {
         //alert("没有绑定分类")
				if(oo.id)
				{
					A.obj.product={}
					A.obj.product.id=oo.id
					this.DHpro24(14,"没有绑定分类",[A,B]);
				}
				else
				{
					$("#state").html("没有商品了")
					A.obj.DH=false;
					B.apply(A);
				}
      }
    }
  },
  DHpro02:function(o1,o2)
  {
    o2[0].attr=o1;
    let proid=parseInt(o2[0].proid.substr(1));
    let desI=Math.ceil(proid/100000)
    if(desI>9){desI=1;}
    let html='\
		{\
			<r:prodes db="sqlite.aliexpressprodes'+desI+'" size=1 where=" where @.proid=\''+o2[0].proid+'\'">\
				"aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
				"HistoryPrice":<:HistoryPrice/>,\
				"aeopAeProductPropertys":<:aeopAeProductPropertys/>,\
				"pic":"<:pic/>",\
				"des":<:des tag=json/>\
			</r:prodes>\
		}'
		$("#state").html("正在获得商品详情信息。。。");
   Tool.ajax.a01(html,1,this.DHpro03,this,o2);
  },
  DHpro03:function(o1,oo)
  {
		$("#state").html("正在合并商品信息。。。")
		if(o1.aeopAeProductSKUs)
		{
			oo[0].aeopAeProductSKUs=o1.aeopAeProductSKUs
			oo[0].HistoryPrice=o1.HistoryPrice
			oo[0].aeopAeProductPropertys=o1.aeopAeProductPropertys
			oo[0].pic=o1.pic
			oo[0].des=o1.des
			//////////////////将中文括号改英文括号/////////////////////////////////////
			let str=JSON.stringify(oo[0].aeopAeProductPropertys)
			if(str) oo[0].aeopAeProductPropertys=eval(str.replace(/（/g,'(').replace(/）/g,')'));
			//////////////////////////////////////////////////////////////////////
			oo[1].obj.product=oo[0];
			if(oo[1].obj.B2==0){oo[1].obj.B2=oo[0].count;}			
			if(oo[1].obj.B2==0)
			{
				alert("aaaaaaaaaaaaaaaaa")
				//A.apply(B);
			}
			else
			{
				this.DHpro04(oo);
			}
		}
		else
		{
			alert("eeeeeeeeeeeeeeee")
			this.obj.product.id=oo[0].id;
			//this.DHpro18(19,"没有找到该商品详情");
		}
  },
  DHpro04:function(oo)
  {
		let p1=Math.ceil(oo[1].obj.B1/oo[1].obj.B2*100)
		$("#B1").html(p1+"%").css("width",p1+"%");
		$("#B2").html(oo[1].obj.B1+'/'+oo[1].obj.B2+' (条)');			
		$("#body").append('\
		<tr><td class="right w200">绑定到DH的类目ID：</td><td colspan="2">'+oo[0].typebind+'</td></tr>\
		<tr>\
			<td class="w170 right">来源URL：</td>\
			<td colspan="2"><a href="https://www.aliexpress.com/item/'+oo[0].alifromid+'.html" target="_blank">https://www.aliexpress.com/item/'+oo[0].alifromid+'.html</a></td>\
		</tr>\
		<tr><td class="right">来源店铺ID：</td><td colspan="2">'+oo[0].alishopid+'</td></tr>\
		<tr><td class="right">需更新URL：</td><td colspan="2"><a href="https://www.dhgate.com/product/-/'+oo[0].fromid+'.html" target="_blank">https://www.dhgate.com/product/-/'+oo[0].fromid+'.html</a></td></tr>')
		this.DHpro05(oo[1],oo[2])
  },
  DHpro05:function(A,B)
  {
		A.obj.PriceRatio=A.obj.product.ratio;
		let off=Math.round((1-(1.5/A.obj.product.ratio))*100);
		$("#body").append('<tr><td class="right">价格倍数（折扣）：</td><td colspan="2">'+A.obj.product.ratio+'倍（-'+off+'% OFF）</td></tr>')
		let items=A.obj.product;
		if(items.typebind)//检查是否绑定
		{
			if(items.proid)//检查是否有商品编码
			{this.DHpro06(A,B,items);}
			else
			{$("#state").html("请设置商品编码");}
		}
		else
		{
      alert("没有绑定分类")
      //obj.F4=[items.type,''];
      //Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/绑定DH后类目.js']);
      //this.DHpro24(32,"没有绑定分类",[A,B]);
		} 
  },
  DHpro06:function(A,B,items)
  {
		let modelName=this.b01(items)
		let html='"<r:freight db="sqlite.aliexpress" size=1 where=" where @.name=\''+modelName+'\'"><:freightID/></r:freight>"'
	 Tool.ajax.a01(1,B,this.DHpro07,html,this,[A,modelName]);
	},
  DHpro07:function(modelName,ab)
  {
		if(modelName=="")
		{
			$("#state").html("本地速卖通没有这个运费模板【"+ab[2]+"】。");
		}
		else
		{
			let arr=ab[0].obj.shippingModel,shippingTempId=""
			for(let i=0;i<arr.length;i++)//找出免运费的模板ID
			{
				if(modelName==arr[i].modelName)
				{
					shippingTempId=arr[i].shippingTempId;
					$("#body").append('<tr><td class="right">运费模板：</td><td>'+shippingTempId+'（'+arr[i].modelName+'）</td></tr>')
					break;
				}
			}
			if(shippingTempId=="")
			{
				$("#state").html("请在DH创建要一个运费模板");
			}
			else
			{
				this.DHpro08(shippingTempId,ab);
			}
		}
	},
  DHpro08:function(shippingTempId,ab)
  {
		let items=ab[0].obj.product;
		let itemGroupId=this.DHGroup(items.type,ab[0].obj.Group).split("=")//选分组
		let DH=
		{
			afterSaleTemplateId:ab[0].obj.afterSaleID,//产品售后模板id
			sizeTemplateId:this.b0DHSizeTemplate(ab[0].obj.SizeTemplate,items.typebind),//尺码模板id
			shippingModelId:shippingTempId,//产品运费模板id
			catePubId:items.typebind,//发布类目id
			itemGroupId:itemGroupId[0],//产品所属产品组ID
			itemWholesaleRangeList:JSON.stringify([{discount:0,startQty:1},{discount:0.02,startQty:3},{discount:0.03,startQty:5},{discount:0.04,startQty:7},{discount:0.06,startQty:10},{discount:0.08,startQty:20},{discount:0.1,startQty:30}]),//产品折扣区间
			issample:3,//产品是否成人性质
			itemPackage:
			{
				length:10,width:10,height:10,grossWeight:0.1,
				measureId:this.b0DHunit(items.unit),//单位
				packingQuantity:items.lotNum
			},
			itemImgList:items.pic.split(";"),
			itemSaleSetting:{leadingTime:4,maxSaleQty:10000,priceConfigType:1}
		}
		if(DH.itemPackage.measureId=="未知单位")
		{
			alert("-------未知单位------------【"+items.unit+"】----")
      //this.DHpro24(36,"未知单位:"+items.unit,ab);
		}
		else
		{
			let itemPackage='\
			<tr><td class="right">包装后重量：</td><td>'+DH.itemPackage.grossWeight+'（KG）</td></tr>\
			<tr><td class="right">包装后长度：</td><td>'+DH.itemPackage.length+'（CM）</td></tr>\
			<tr><td class="right">包装后宽度：</td><td>'+DH.itemPackage.width+'（CM）</td></tr>\
			<tr><td class="right">包装后高度：</td><td>'+DH.itemPackage.height+'（CM）</td></tr>\
			<tr><td class="right">销售单位ID：</td><td>'+DH.itemPackage.measureId+'</td></tr>\
			<tr><td class="right">每包数量：</td><td>'+DH.itemPackage.packingQuantity+'</td></tr>\
      </table>'
			let itemSaleSetting='\
			<table>\
      <tr><td class="right">备货期：</td><td>'+DH.itemSaleSetting.leadingTime+'（天）</td></tr>\
			<tr><td class="right">最大购买量：</td><td>'+DH.itemSaleSetting.maxSaleQty+'</td></tr>\
			<tr><td class="right">设置价格类型：</td><td>'+DH.itemSaleSetting.priceConfigType+'（1分别设置价格，2 统一设置价格；若产品无规格，该字段设置为2）</td></tr>\
      </table>'
			$("#body").append('\
			<tr><td class="right">是否成人性质：</td><td colspan="2">'+DH.issample+'（2：成人性质商品 3：没有成人性质商品）</td></tr>\
			<tr><td class="right">产品售后模板ID：</td><td colspan="2">'+DH.afterSaleTemplateId+'</td></tr>\
			<tr><td class="right">产品运费模板ID：</td><td colspan="2">'+DH.shippingModelId+'</td></tr>\
			<tr><td class="right">产品尺码模板ID：</td><td colspan="2">'+DH.sizeTemplateId+'</td></tr>\
			<tr><td class="right">发布类目ID：</td><td colspan="2">'+DH.catePubId+'</td></tr>\
			<tr><td class="right">产品所属产品组ID：</td><td colspan="2">'+DH.itemGroupId+'（'+itemGroupId[1]+'）</td></tr>\
			<tr><td class="right">产品有效期：</td><td colspan="2">14 天</td></tr>\
			<tr><td class="right">产品折扣区间：</td><td colspan="2">'+DH.itemWholesaleRangeList+'</td></tr>\
			<tr><td class="right">产品包装信息：</td><td colspan="2">'+itemPackage+'</td></tr>\
			<tr><td class="right">销售属性设置：</td><td colspan="2">'+itemSaleSetting+'</td></tr>')
			if(!DH.itemGroupId)
			{
				alert("产品所属产品组ID，为空了"+DH.itemGroupId)
				//this.DHpro24(32,"产品所属产品组ID为空,且不是【新手运费模板】",ab);
			}
			else
			{
				ab[0].obj.DH=DH;
        this.DHpro09(items,ab);
      }
		}
  },
  DHpro09:function(items,ab)//输出敦煌网的购物车属性的价格
  {
		ab[0].obj.issku=false;//不用自定义规格
		let alisku=this.b25(items.aeopAeProductSKUs,items.HistoryPrice);//取3次中的最小折扣
		alisku=this.b32(alisku)//【删除Ships From这一组】   
    let dhsku=this.b06(items.attr)//取出【购物车属性】
		if(!alisku[0])
    {
      alisku[1][0].skuAttr="Not filled:Not filled";
      alisku[0]=[
        {
          "skuPropertyName":"Not filled",
          "skuPropertyId":"Not filled",
          "skuPropertyValues": 
          [
            {"propertyValueId":"Not filled","skuPropertyTips": "Not filled"}
          ]
        }];
    }
		alisku=this.b05(alisku)//【解决出现as pictrue的问题和购物车问题】   
		$("#state").html('dhsku.length:'+dhsku.length+'-----alisku[0].length:'+alisku[0].length)
		this.DHpro10(items,ab,dhsku,alisku)
  },
  DHpro10:function(items,ab,dhsku,alisku)//输出敦煌网的购物车属性的价格
  {
		let bool=true
		let itemSkuList=[]
		if(dhsku.length==0)//如果敦煌有【0】个，速卖通有【N】个价格属性则用自定义属性和敦煌的价格属性
		{
      ab[0].obj.issku=true;
      dhsku=[this.b15()];
      this.b07(alisku);//将2组3组4组合成1组
      itemSkuList=this.b08(dhsku,alisku,ab[0].obj.PriceRatio,items.proid);
    }
		else if(dhsku.length==1)//如果敦煌有【1】个
		{
			$("#state").html('dhsku.length:'+dhsku.length);
			itemSkuList=this.b27(dhsku,alisku,ab,items.proid);
		}
		else if(dhsku.length==2)//如果敦煌有【2】个
		{
			$("#state").html('dhsku.length=='+dhsku.length);
			itemSkuList=this.b26(dhsku,alisku,ab,items.proid);
		}
		else if(dhsku.length==3)//如果敦煌有【3】个
		{
			itemSkuList=this.b28(dhsku,alisku,ab,items.proid);
		}
		else
		{
			bool=false;
			$("#state").html('dhsku.length:'+dhsku.length+'---+++---alisku[0].length:'+alisku[0].length+"----itemSkuList.length:"+itemSkuList.length)
		}
		///////////////////////////////////////////////////
    if(bool&&itemSkuList.length!=0)
		{
      let inventory=0;
			for(let i=0;i<itemSkuList.length;i++)
			{
				inventory+=itemSkuList[i].inventory;
			}
      if(inventory==0)
      {
				//pre(itemSkuList)
        this.DHpro24(9,"展示库存已达上限，且库存<20",ab);
      }
      else
      {
				this.DHpro11(itemSkuList,dhsku,ab);
      }
		}  
  },
  DHpro11:function(itemSkuList,dhsku,ab)
  {
		ab[0].obj.DH.itemSkuList=itemSkuList
		let html='',inventoryQty=0
		for(let i=0;i<itemSkuList.length;i++)
		{
			let td2="",arr=itemSkuList[i].itemSkuAttrvalList
			for(let j=0;j<arr.length;j++)
			{
				td2+='<tr><td>'+arr[j].attrId+'</td><td>'+arr[j].attrValId+'</td><td>'+arr[j].sizeSpecType+'</td></tr>'
			}
			//////////////////////////////////////////////
			inventoryQty+=parseInt(itemSkuList[i].inventory)
			html+='\
      <tr>\
        <td>'+itemSkuList[i].inventory+'</td>\
        <td class="left">\
					<table class="table table-striped center">\
						<tr><th>attrId</th><th>attrValId</th><th>sizeSpecType</th></tr>\
						'+td2+'\
					</table>\
				</td>\
        <td class="left"><pre>'+JSON.stringify(itemSkuList[i].itemSkuInvenList,null,2)+'</pre></td>\
        <td>'+itemSkuList[i].retailPrice+'</td>\
        <td>'+itemSkuList[i].saleStatus+'</td>\
        <td>'+itemSkuList[i].skuCode+'</td>\
        <td>'+itemSkuList[i].skuId+'</td>\
        <td>'+itemSkuList[i].skuMD5+'</td>\
      </tr>'
		}
		ab[0].obj.DH.itemInventory={inventoryLocation:"CN",invenLocationList:[{inventoryLocation:"CN",leadingTime:4,sortVal:0}],inventoryQty:inventoryQty,inventoryStatus:1}
		$("#body").append('\
		<tr><td class="right">SKU列表：</td>\
    <td colspan="2">\
      <table class="table table-striped center mb-0">\
      <thead class="table-light">\
      <tr>\
        <th>备货数量</th>\
        <th>SKU属性值列表</th>\
        <th>备货地址关联信息</th>\
        <th>sku零售价</th>\
        <th>是否可销售</th>\
        <th>自定义编码</th>\
        <th>skuId值</th>\
        <th>skuMD5值</th>\
      </tr>\
      </thead>\
      <tbody>'+html+'</tbody></table>\
    </td></tr>\
		<tr><td class="right">产品备货信息：</td><td colspan="2">'+JSON.stringify(ab[0].obj.DH.itemInventory)+'</td></tr>')
		this.DHpro12(dhsku,ab);
  },
  DHpro12:function(dhsku,ab)
  {
		let imgArr=[],len=0,ali=[]
		for(let i=0;i<dhsku.length;i++)
		{
			ali=dhsku[i][3].skuPropertyValues
			len=ali.length<dhsku[i][2].length?ali.length:dhsku[i][2].length//取最小(不是所的图片都要上传的，因为敦煌的属性值不够)
			for(let j=0;j<len;j++)
			{
				if(ali[j].skuPropertyImagePath)
				{
					imgArr.push(ali[j].skuPropertyImagePath.replace("_640x640.jpg","").replace("_640x640.png",""));
				}
			}
		}
		ab[0].obj.C2=imgArr.length;
		ab[0].obj.CArr2=dhsku;
		if(ab[0].obj.C2==0)
		{
			this.DHpro17(dhsku,ab);
		}
		else
		{
      if(imgArr[ab[0].obj.C1-1])
      {
        ab[0].obj.CArr=imgArr;
        this.DHpro13(ab);
      }
      else
      {
				alert("aaaaaaaaa")
        //this.DHpro24(12,"图片出错。。。。",ab);
      }
		}
  },
  DHpro13:function(ab)
  {
		let p1=Math.ceil(ab[0].obj.C1/ab[0].obj.C2*100)
		$("#C1").html(p1+"%").css("width",p1+"%");
		$("#C2").html('<a href="'+ab[0].obj.CArr[ab[0].obj.C1-1]+'" target="_blank">'+ab[0].obj.C1+'</a>/'+ab[0].obj.C2+' ( 张 )');
    /////////////////////////////////////
		let pic=ab[0].obj.CArr[ab[0].obj.C1-1];
		let url40 = Tool.StrSlice(pic, "com/kf/", "/")
		////////////////////////////////////
		let html='\
		[\
			true,\
			"'+pic+'"\
		]';
		$("#state").html("图片：" + pic)
	 Tool.ajax.a01(html,1,this.DHpro14,this,ab)
  },
  DHpro14:function(imgObj,ab)
	{
		if(imgObj[0]==true)
		{
	  	Tool.ajax.a01('<.URLtoBase64('+ab[0].obj.CArr[ab[0].obj.C1-1]+')/>',1,[imgObj[1],this.DHpro15A,this,ab])
		}
		else
		{
			this.DHpro15(imgObj,ab);
		}
  },
  DHpro15A:function(t,ab1)
  {
		if(t.indexOf("执行方法错误")==-1)
		{
			let oo={}
			oo.method="dh.album.img.upload";
			oo.v="2.1";
			oo.funType="albu";
			oo.imgName=(new Date).getTime()+".jpg";
			oo.imgBase64=t;
			oo.timestamp=(new Date).getTime();
			oo.access_token=ab1[1][0].token;
			//////////////////////////////////////////
			let html='[true,"'+ab1[0]+'",<.WebClientPost(["]http://api.dhgate.com/dop/router["],["]'+JSON.stringify(oo)+'["])/>]'
			Tool.ajax.a01(html,1,[ab1[1][0],this.DHpro15,this,ab1[1][1]])
		}
		else
		{
			if(t.indexOf('Exception has been thrown by the target of an invocation')!=-1)
			{this.DHpro24(12,"上传图片失败",ab1[1]);}
			else
			{location.reload();}
		}
  },
  DHpro15:function(imgObj,ab)
  {
		$("#state").html("购物车中的图片，正在验证上传图片结果:"+(imgObj[0]==true?"上传图":"本地图"));
		if(imgObj[2].subErrors)    
		{
			if(imgObj[2].subErrors[0].message=="调用dh.album.img.upload服务超时，该服务的超时限制为12秒，请和服务平台提供商联系。"||imgObj[2].subErrors.length==0)
			{   
				//ab[0].obj.CArr[ab[0].obj.C1-1]=ab[0].obj.CArr[ab[0].obj.C1-1]+"_640x640.jpg";
				//this.DHpro13(ab);
				this.a24(0)
			}
			else if(imgObj[2].subErrors[0].message=="[{\"param-error-msg\":\"may not be empty\", \"param-error-attr\":\"imgBase64\", \"param-error-attr-value\":\"\"}")
			{
				this.DHpro24(12,imgObj[2].subErrors[0].message,ab);
			}
			else
			{
				alert("有其它错误");
			}
		}
//		else if(img.indexOf("服务超时")!=-1)
//		{
//      
//    }
//		else if(img.indexOf("URL错误")!=-1)
//		{
//			alert("----"+img);
//		}
//		else if(img.indexOf("非法的参数")!=-1)
//		{
//      $("#state").html("001:"+img);
//		  //this.DHpro24(12,img,ab);
//		}
			else
			{
				let sqltxt
				ab[0].obj.CArr[ab[0].obj.C1-1]=imgObj[2].imgUrl
				ab[0].obj.CArrMD5[ab[0].obj.C1-1]=imgObj[2].imgMd5
				$("#pic1").append('<img src="https://www.dhresource.com/'+imgObj[2].imgUrl+'" height="100" class="border" />')
				if(imgObj[0])//入库
				{
					if(imgObj[2].imgMd5)
					{
						sqltxt='insert into @.img(@.url40,@.fromurl,@.frommd5,@.uptime,@.addtime)values(\''+Tool.StrSlice(imgObj[1],"com/kf/","/")+'\',\''+imgObj[2].imgUrl+'\',\''+imgObj[2].imgMd5+'\','+Tool.gettime("")+','+Tool.gettime("")+')';
						
						Tool.ajax.a01('""<r: db="sqlite.aliexpressproupdhgateimg">'+sqltxt+'</r:>',1,this.DHpro16,this,ab)
					}
					else
					{
						this.DHpro24(12,"图片出错。。。。",ab);
					}
				}
				else
				{
					sqltxt='update @.img set @.uptime='+Tool.gettime("")+',@.fromid='+ab[0].obj.product.fromid+' where @.url40=\''+Tool.StrSlice(imgObj[1],"com/kf/","/")+'\'';
					Tool.ajax.a01('""<r: db="sqlite.aliexpressproupdhgateimg">'+sqltxt+'</r:>',1,this.DHpro16,this,ab);
				}
			}
  },
  DHpro16:function(t,ab)
  {
		if(Tool.Trim(t)=="")
		{
			$("#C2").html(ab[0].obj.C1+'/'+ab[0].obj.C2+' (<a href="http://image.dhgate.com/'+ab[0].obj.CArr[ab[0].obj.C1-1]+'" target="_blank"> 完 </a>)');
			ab[0].obj.C1++;
			if(ab[0].obj.C1<=ab[0].obj.C2)
			{this.DHpro13(ab);}
			else
			{
				///////////////////////图片回位//////////////////////////////////////////////////////
				let num=0,dhsku=ab[0].obj.CArr2,ali,len;
				for(let i=0;i<dhsku.length;i++)
				{
					ali=dhsku[i][3].skuPropertyValues
					len=ali.length<dhsku[i][2].length?ali.length:dhsku[i][2].length//取最小(不是所的图片都要上传的，因为敦煌的属性值不够)
					for(let j=0;j<len;j++)
					{if(ali[j].skuPropertyImagePath){ali[j].skuPropertyImagePath=ab[0].obj.CArr[num];num++;}}
				}
				this.DHpro17(dhsku,ab);
			}
		}
    else
		{
			$("#state").html("出错03："+t);
		}
	},
  DHpro17:function(dhsku,ab)
  {
		//////////////////////属性回位///////////////////////////////////////
		let DHattr=ab[0].obj.product.attr,num=0;
		for(let i=1;i<DHattr.length;i++)//取出【购物车属性】的所有内容用来与商品库绑定
		{
			if(DHattr[i].buyAttr=="1"){DHattr[i].js=dhsku[num];num++;}
		}
		////////////////////////////////////////////////////////////////////
		let attr=this.b12(ab[0].obj.product)//attr[0]:属性;attr[1]:写在内容里的属性
		ab[0].obj.DH.itemAttrList=attr[0]
		ab[0].obj.DH.itemBase=this.b14(ab[0].obj.product)
		//"<div class=\"div-specifications div-wrap\"><ul class=\"attrul\">"+attr[1]+"</ul><div class=\"line1\"></div></div>"+
		if(attr[1]!="") ab[0].obj.DH.itemBase.htmlContent=ab[0].obj.DH.itemBase.htmlContent
		if(ab[0].obj.DH.itemBase.keyWord1==""||ab[0].obj.DH.itemBase.keyWord2=="")
		{
      this.DHpro24(26,"搜索关键字为空",ab);
		}
		else
		{
			let itemAttrList='<thead class="table-light"><tr><th>属性Id</th><th>属性英文名称</th><th>属性中文名称</th><th>是否是品牌属性</th><th>价格属性</th><th>产品属性值列表</th></tr></thead>'
			for(let i=0;i<ab[0].obj.DH.itemAttrList.length;i++)
			{
				let itemAttrValList='\
				<thead class="table-light">\
					<tr>\
					<th>属性Id</th>\
					<th>属性英文名称</th>\
					<th>产品属性值id</th>\
					<th>产品品牌id</th>\
					<th>属性值英文名称</th>\
					<th>属性值中文名称</th>\
					<th>产品属性图片路径</th>\
					</tr>\
				</thead>',img;
				
				for(let j=0;j<ab[0].obj.DH.itemAttrList[i].itemAttrValList.length;j++)
				{
				
          if(ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].picUrl)
					{
						img='<img height="30" src="https://www.dhresource.com/'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].picUrl+'"/>';
					}else{img='';}
          itemAttrValList+='\
					<tr>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].attrId+'</td>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].attrName+'</td>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].attrValId+'</td>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].brandId+'</td>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].lineAttrvalName+'</td>\
						<td>'+ab[0].obj.DH.itemAttrList[i].itemAttrValList[j].lineAttrvalNameCn+'</td>\
          	<td>'+img+'</td>\
          </tr>'
				}
				itemAttrValList='<table class="table mb-0">'+itemAttrValList+'</table>'
				itemAttrList+='\
				<tr>\
					<td>'+ab[0].obj.DH.itemAttrList[i].attrId+'</td>\
					<td>'+ab[0].obj.DH.itemAttrList[i].attrName+'</td>\
					<td>'+ab[0].obj.DH.itemAttrList[i].attrNameCn+'</td>\
					<td>'+ab[0].obj.DH.itemAttrList[i].isbrand+'</td>\
					<td>'+ab[0].obj.DH.itemAttrList[i].isPriceAttr+'</td>\
					<td>'+itemAttrValList+'</td>\
				</tr>'
			}
			itemAttrList='<table class="table table-striped center mb-0">'+itemAttrList+'</table>'
			$("#body").append('\
      <tr><td class="right">属性列表：</td><td colspan="2">'+itemAttrList+'</td></tr>\
      <tr><td class="right">基础信息：</td>\
        <td colspan="2">\
        <table class="table mb-0"><tr><th class="right">产品名称：</th><th class="left">'+ab[0].obj.DH.itemBase.itemName+'</th></tr>\
        <tr><td class="right w150">搜索关键字1：</td><td>'+ab[0].obj.DH.itemBase.keyWord1+'</td></tr>\
        <tr><td class="right">搜索关键字2：</td><td>'+ab[0].obj.DH.itemBase.keyWord2+'</td></tr>\
        <tr><td class="right">搜索关键字3：</td><td>'+ab[0].obj.DH.itemBase.keyWord3+'</td></tr>\
        <tr><td class="right">卖点&特性：</td><td>'+ab[0].obj.DH.itemBase.shortDesc+'</td></tr>\
        <tr><td class="right">卖点&特性1：</td><td>'+ab[0].obj.DH.itemBase.shortDesc1+'</td></tr>\
        <tr><td class="right">卖点&特性2：</td><td>'+ab[0].obj.DH.itemBase.shortDesc2+'</td></tr>\
        <tr><td class="right">卖点&特性3：</td><td>'+ab[0].obj.DH.itemBase.shortDesc3+'</td></tr>\
        <tr><td class="right">卖点&特性4：</td><td>'+ab[0].obj.DH.itemBase.shortDesc4+'</td></tr>\
        <tr><td class="right">卖点&特性5：</td><td>'+ab[0].obj.DH.itemBase.shortDesc5+'</td></tr>\
        <tr><td class="right">产品视频地址：</td><td>'+ab[0].obj.DH.itemBase.videoUrl+'</td></tr>\
        <tr><td class="right">详情内容描述：</td><td>不显示</td></tr>\
        </table>\
        </td>\
      </tr>');//ab[0].obj.DH.itemBase.htmlContent
		  this.DHpro18(ab);//自定义规格列表
		}
  },
  DHpro18:function(ab)//自定义规格列表
  {
		ab[0].obj.DH.itemSpecSelfDefList=this.b03(ab[0])  
		let itemSpecSelfDefList='<tr><th>图片</th><th>规格名称</th><th>属性值ID</th><th>英文名称</th></tr>',img
		for(let i=0;i<ab[0].obj.DH.itemSpecSelfDefList.length;i++)
		{
			if(ab[0].obj.DH.itemSpecSelfDefList[i].picUrl){img='<img height="50" src="https://www.dhresource.com/'+ab[0].obj.DH.itemSpecSelfDefList[i].picUrl+'"/>';}else{img='';}
			itemSpecSelfDefList+='<tr><td>'+img+'</td><td>'+ab[0].obj.DH.itemSpecSelfDefList[i].attrValName.replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</td><td>'+ab[0].obj.DH.itemSpecSelfDefList[i].attrValId+'</td><td>'+ab[0].obj.DH.itemSpecSelfDefList[i].specAttrName+'</td></tr>'
		}
		itemSpecSelfDefList='<table class="table">'+itemSpecSelfDefList+'</table>'
		if(ab[0].obj.DH.itemSpecSelfDefList.length==0){itemSpecSelfDefList="";}
		$("#body").append('<tr><td class="right">自定义规格列表：</td><td>'+itemSpecSelfDefList+'</td></tr>')
		ab[0].obj.D2=ab[0].obj.DH.itemImgList.length;
		this.DHpro19(ab)
  },
  DHpro19:function(ab)//产品图片列表
  {
		let DHimg=ab[0].obj.DH.itemImgList
    DHimg[ab[0].obj.D1-1]=DHimg[ab[0].obj.D1-1].replace("_640x640.jpg","").replace("_640x640.png","")
		let p1=Math.ceil(ab[0].obj.D1/ab[0].obj.D2*100)
		$("#D1").html(p1+"%").css("width",p1+"%");
		$("#D2").html(''+ab[0].obj.D1+'/'+ab[0].obj.D2+' ( <a href="'+DHimg[ab[0].obj.D1-1]+'" target="_blank">张</a> )');
		///////////////////////////
		let html='\
		<if Fun(Db(sqlite.aliexpressproupdhgateimg,select count(1) from @.img where @.url40=\''+Tool.StrSlice(DHimg[ab[0].obj.D1-1],"com/kf/","/")+'\',count))==0>\
		[\
			true,\
			"'+DHimg[ab[0].obj.D1-1]+'"\
		]\
		<else/>\
		<r:img db="sqlite.aliexpressproupdhgateimg" where=" where @.url40=\''+Tool.StrSlice(DHimg[ab[0].obj.D1-1],"com/kf/","/")+'\'" size=1>\
		[\
			false,\
			"'+DHimg[ab[0].obj.D1-1]+'",\
			{\
				"imgUrl":"<:fromurl/>",\
				"imgMd5":"<:fromMd5/>"\
			}\
		]\
		</r:img>\
		</if>';
		$("#state").html("001")
		Tool.ajax.a01(html,1,this.DHpro20,this,ab)
  },
  DHpro20:function(imgObj,ab)
  {
		if(imgObj[0]==true)
		{
    	let str='<.URLtoBase64('+ab[0].obj.DH.itemImgList[ab[0].obj.D1-1]+')/>'
			Tool.ajax.a01(str,1,[imgObj[1],this.DHpro21A,this,ab])
		}
		else
		{this.DHpro21(imgObj,ab);}
  },
  DHpro21A:function(t,ab1)
  {
		if(t.indexOf("执行方法错误")==-1)
		{
			let oo={}
			oo.method="dh.album.img.upload"
			oo.v="2.1"
			oo.funType="albu"
			oo.imgName=(new Date).getTime()+'.jpg'
			oo.imgBase64=t
			oo.timestamp=(new Date).getTime()
			oo.access_token=ab1[1][0].token;
			let html='[true,"'+ab1[0]+'",<.WebClientPost(["]http://api.dhgate.com/dop/router["],["]'+JSON.stringify(oo)+'["])/>]'
			Tool.ajax.a01(html,1,[ab1[1][0],this.DHpro21,this,ab1[1][1]])
		}
		else
		{
			if(t.indexOf('Exception has been thrown by the target of an invocation')!=-1)
			{
				this.DHpro24(12,"上传图片失败",ab1[1]);
			}
			else
			{location.reload();}
		}
  },
  DHpro21:function(imgObj,ab)
  {
			if(imgObj[2].imgUrl=="null"||imgObj[2].imgUrl==null)
			{
				this.DHpro22("",ab)
			}
			else
			{
				$("#state").html("放大镜中的图片，正在验证结果："+(imgObj[0]==true?"上传图":"本地图"));
				if(imgObj[2].subErrors)//是否出错
				{
					if(imgObj[2].subErrors[0].message=="调用dh.album.img.upload服务超时，该服务的超时限制为12秒，请和服务平台提供商联系。")
					{
						//ab[0].obj.DH.itemImgList[ab[0].obj.D1-1]=ab[0].obj.DH.itemImgList[ab[0].obj.D1-1]+"_640x640.jpg";
						//this.DHpro19(ab);
						//this.a24(0)
						alert("aaaaaaaaaa")
					}
					else
					{
						if(imgObj[2].message=="非法的参数")
						{
							this.DHpro24(12,imgObj[2].subErrors[0].message,ab);
						}
						else if(imgObj.indexOf("服务目前无法使用")!=-1)
						{
							$("#state").html("007:"+Tool.pre(imgObj));
							//this.DHpro24(27,img,ab);
						}
					}
				}
				else
				{
					let sqltxt
					let type=(ab[0].obj.D1==1?3:1)        
					if(ab[0].obj.googleshopping==true){type=1;}//已上传google shopping的图片修改时不允许修改，添加google shopping图片！
					ab[0].obj.DH.itemImgList.push({type:type,imgUrl:imgObj[2].imgUrl,imgMd5:imgObj[2].imgMd5});
					$("#pic2").append('<img src="https://www.dhresource.com/'+imgObj[2].imgUrl+'" class="border" height="100" />')
					if(imgObj[0])//是否有
					{
						sqltxt='insert into @.img(@.url40,@.fromurl,@.frommd5,@.uptime,@.addtime)values(\''+Tool.StrSlice(imgObj[1],"com/kf/","/")+'\',\''+imgObj[2].imgUrl+'\',\''+imgObj[2].imgMd5+'\','+Tool.gettime("")+','+Tool.gettime("")+')';
					}
					else
					{
						sqltxt='update @.img set @.uptime='+Tool.gettime("")+',@.fromid='+ab[0].obj.product.fromid+' where @.url40=\''+Tool.StrSlice(imgObj[1],"com/kf/","/")+'\'';
					}
					Tool.ajax.a01('<r: db="sqlite.aliexpressproupdhgateimg">'+sqltxt+'</r:>',1,this.DHpro22,this,ab)
				}
			}
		
  },
  DHpro22:function(t,ab)
  {
		if(Tool.Trim(t)=="")
		{
			$("#D2").html(ab[0].obj.D1+'/'+ab[0].obj.D2+' (完)');
			ab[0].obj.D1++;
			if(ab[0].obj.D1<=ab[0].obj.D2)
			{this.DHpro19(ab);}
			else
			{this.DHpro23(ab);}
		}
    else
    {
      $("#state").html("更新或添加图片出错："+t);
      //this.DHpro24(27,t,ab);
    }
  },
  DHpro23:function(ab)
  {
    /////////////去重复///////////////////////
    let arr=ab[0].obj.DH.itemImgList,narr=[],isbool=true;
    for(let i=0;i<arr.length;i++)
    {
 			if(arr[i].imgMd5)
			{
				isbool=true;
				for(let j=0;j<narr.length;j++)
				{
					if(arr[i].imgMd5==narr[j].imgMd5){isbool=false;break;}
				}
				if(isbool){narr.push(arr[i]);}
			}
    }
    narr=this.b41(narr,[ab[0].obj.CArr,ab[0].obj.CArrMD5])//把【购物车中的图片】放到【放大镜中的图片】中去。
   /////////////////////////////////////////
    let arr2=[0,
      {
        type: 1,//1
        imgUrl: "f2/albu/g21/M00/C7/75/rBNaOWD25zqAIH7uAABCoddcJh0964.jpg",
        imgMd5: "b8b5193aec3771b34257a0112d97d004"
      },
      {
        type: 1,//2
        imgUrl: "f2/albu/g21/M01/DB/40/rBVaq2D254qAPi--AABCzYFGNQw705.jpg",
        imgMd5: "260af3a73851d66c730d6c7ee9f7b4f5"
      },
      {
        type: 1,//3
        imgUrl: "f2/albu/g21/M01/FB/B7/rBNaOWD245iADnwoAABCzGgH0Zg618.jpg",
        imgMd5: "886a4af74a5f6f85816deb1343af2204"
      },
      {
        type: 1,//4
        imgUrl: "f2/albu/g20/M01/66/0D/rBVaqGD22guAWxjiAABCvPqH7nw581.jpg",
        imgMd5: "733a336949cb6a1e23adf4f485939328"
      },
      {
        type: 1,//5
        imgUrl: "f2/albu/g20/M01/45/7D/rBNaOGD22yuAAfySAABCquTleyU488.jpg",
        imgMd5: "494231adccdcef56535c2829fb770aa3"
      },
      {
        type: 1,//6
        imgUrl: "f2/albu/g21/M00/A0/A0/rBNaOWD221uAYbJVAABCuZDesxQ096.jpg",
        imgMd5: "8f46d16753989b84eaf0c82a9cf1343e"
      },
      {
        type: 1,//7
        imgUrl: "f2/albu/g19/M00/2B/B7/rBNaN2D229CAPLxSAABCl3rumZs756.jpg",
        imgMd5: "1a653b667bc58f415013c8e53e1baadb"
      },
      {
        type: 1,//8
        imgUrl: "f2/albu/g20/M01/FB/E3/rBNaOGD23CCAFW6ZAABCu7K5zDc724.jpg",
        imgMd5: "48f5af056a54cfce48cee1ea04a2127f"
      }
    ]
    for(let i=narr.length;i<8;i++)
    {
      narr[i]=arr2[i]
    }
    ab[0].obj.DH.itemImgList=narr
    /////////////////////////////////////////////
		let len=ab[0].obj.DH.itemImgList.length
		let str=''
		for(let i=0;i<len;i++)
		{
      str+='\
      <tr align="center">\
        <td><img height="30" src="https://www.dhresource.com/'+ab[0].obj.DH.itemImgList[i].imgUrl+'"/></td>\
        <td>'+ab[0].obj.DH.itemImgList[i].imgMd5+'</td>\
        <td>'+ab[0].obj.DH.itemImgList[i].type+'</td>\
      </tr>';
    }
		str='<table class="table mb-0 table-bordered center"><thead><tr><th>图片</th><th>图片MD5值</th><th>图片来源</th></tr></thead><tbody>'+str+'</tbody></table>'
		$("#body").append('<tr><td class="right">产品图片列表：</td><td>'+str+'</td></tr>')
		ab[0].obj.DH.itemAttrGroupList="[]"//兼容属性列表	兼容属性列表信息
		if(ab[0].obj.DH.itemSpecSelfDefList.length==0){ab[0].obj.DH.itemSaleSetting.priceConfigType=2;}//单个价格为【统一设置价格】
		ab[0].obj.DH.itemAttrList=JSON.stringify(ab[0].obj.DH.itemAttrList)//产品属性列表
		ab[0].obj.DH.itemBase=JSON.stringify(ab[0].obj.DH.itemBase)//产品基础信息
		ab[0].obj.DH.itemImgList=JSON.stringify(ab[0].obj.DH.itemImgList)//产品图片列表
		ab[0].obj.DH.itemPackage=JSON.stringify(ab[0].obj.DH.itemPackage)//产品包装信息
		ab[0].obj.DH.itemSaleSetting=JSON.stringify(ab[0].obj.DH.itemSaleSetting)//产品销售属性设置
		ab[0].obj.DH.itemSkuList=JSON.stringify(ab[0].obj.DH.itemSkuList)//产品SKU列表(无备货信息)
		ab[0].obj.DH.itemInventory=JSON.stringify(ab[0].obj.DH.itemInventory)//产品备货信息，无备货时可不传
		ab[0].obj.DH.itemSpecSelfDefList=JSON.stringify(ab[0].obj.DH.itemSpecSelfDefList)//自定义规格列表
		ab[0].obj.DH.itemBase=ab[0].obj.DH.itemBase.replace(/undefined/ig,"");
		ab[1].apply(ab[0]);
  },
	DHpro24:function(hide,err,ab)
  {
		let txt='""<r: db="sqlite.aliexpress">update @.pro set @.hide='+hide+',@.err='+Tool.rpsql(err)+' where @.id='+ab[0].obj.product.id+'</r:>'
		Tool.ajax.a01(txt,1,this.DHpro25,this,ab)
  },
  DHpro25:function(r,ab)
	{
		if(r=="")
		{
			ab[0].obj.DH=false;
			ab[1].apply(ab[0]);
		}
		else
		{
			$("#state").html("出错304："+r);
		}
	},
  b01:function(items)
  {
		let nArr=[],arr1=["RU","IN","BR","SE","CA","DE","AU","IT","ES","UK","FR","US","MY"]//注：顺序不能乱调（否则就不能判断名称有重复）
		for(let i=0;i<arr1.length;i++)
		{
			if(items["shipTo"+arr1[i]]!=undefined)
			{
				if(items["shipTo"+arr1[i]]==1){nArr.push(arr1[i]);}
			}
			else
			{
				Tool.at("站点【"+arr1[i]+"]字段没有填写。")
			}
		}
		return nArr.join(",")
	},
  b02:function(dh,ali)//匹配【属性名】
  {
    //////////////完全匹配/////////////////////////
		for(let i=0;i<dh.length;i++)//绑定【属性名】
		{
		  for(let j=0;j<ali[0].length;j++)
			{
				if(ali[0][j].skuPropertyId)
				{
					if(dh[i][0].toLowerCase()==ali[0][j].skuPropertyName.toLowerCase())
					{
            dh[i][3]=ali[0][j];
            ali[0][j]=ali[0][j].skuPropertyId;
            break;
          }
				}
			}
		}
    /////////////////包含匹配/////////////////////////////
		for(let i=0;i<dh.length;i++)//绑定【属性名】
		{
			if(!dh[i][3])//如果还没匹配完，就模糊匹配
			{
				for(let j=0;j<ali[0].length;j++)
				{
					if(ali[0][j].skuPropertyId)
					{
						if(dh[i][0].toLowerCase().indexOf(ali[0][j].skuPropertyName.toLowerCase())!=-1||ali[0][j].skuPropertyName.toLowerCase().indexOf(dh[i][0].toLowerCase())!=-1)
						{dh[i][3]=ali[0][j];ali[0][j]=ali[0][j].skuPropertyId;break;}
					}
				}
			}
		}
    ////////////////////剩余匹配////////////////////////////////
    //可以保证【剩余匹配】时先选属性值多的。注：要保证速卖通的属性值也是从多到少倒序，SMT默认就是倒序
		for(let i=dh.length-1;i>-1;i--)//绑定【属性名】
		{
			if(!dh[i][3])//如果还没匹配完,那就找剩下的匹配
			{
				for(let j=0;j<ali[0].length;j++)
				{
				  if(ali[0][j].skuPropertyId)
          {
            dh[i][3]=ali[0][j];
            ali[0][j]=ali[0][j].skuPropertyId;
            break;
          }
				}
			}
		}
  },
  b03:function(This)
  {
		let itemSpecSelfDefList=[]
		if(This.obj.issku)
		{
			let selfArr=This.obj.CArr2[This.obj.CArr2.length-1],len=selfArr[3].skuPropertyValues.length<10?selfArr[3].skuPropertyValues.length:10
      
			for(let i=0;i<len;i++)
			{
				itemSpecSelfDefList.push(
				{
					attrValId:selfArr[2][i].attrValId,
					specAttrName:selfArr[3].skuPropertyName,
					attrValName:selfArr[3].skuPropertyValues[i].skuPropertyTips.length>40?"contact us before buy - "+(i+1):selfArr[3].skuPropertyValues[i].skuPropertyTips,
					picUrl:selfArr[3].skuPropertyValues[i].skuPropertyImagePath?selfArr[3].skuPropertyValues[i].skuPropertyImagePath:""
				})
			}
		}
		return itemSpecSelfDefList
  },
  b05:function(skuobj)
  {
		////////////////////【解决出现as pictrue的问题(as pictrue必须唯一，因为DH要这么做)】//////////////////////////////
		let oo={},str=''
		for(let i=0;i<skuobj[0].length;i++)
		{
			let arr=skuobj[0][i].skuPropertyValues
			for(let j=0;j<arr.length;j++)
			{
        arr[j].skuPropertyTips=Tool.Trim(arr[j].skuPropertyTips.replace(/ +/g,' '))//将多个空格转换成一个空格；因为DH上传后也是这么转的。
			  if(str.indexOf('|'+arr[j].skuPropertyTips+'|')!=-1){arr[j].skuPropertyTips+="-"+(j+1)}
				str+="|"+arr[j].skuPropertyTips+"|"
			}			
		}    
		//////////////////去掉#后面的东西////////////////////////////
		for(let i=0;i<skuobj[1].length;i++)
		{
			skuobj[1][i].skuAttr=skuobj[1][i].skuAttr.replace(/(#.*?;)/g,';').replace(/(#.*?$)/g,'')//去掉#后面的东西
			if(skuobj[1][i].skuAttr.indexOf(";200007763:")!=-1)//【200007763】表示发货地ID。  注：如果有多个发货国家，只要第一个
			{
				skuobj[1][i].skuAttr=skuobj[1][i].skuAttr.split(";200007763:")[0];//发货地，在最后一个
			}
			else if(skuobj[1][i].skuAttr.indexOf("200007763:")!=-1)
			{
				let arr=skuobj[1][i].skuAttr.split(";");
				arr.shift();
				skuobj[1][i].skuAttr=arr.join(";");//发货地，在第一个
			}
		}
		////////////////////////////////////////////////////////
    return skuobj
  },
  b06:function(dharr)//取出【购物车属性】
  {
		let skuArr=[];
		for(let i=0;i<dharr.length;i++)//取出【购物车属性】的所有内容用来与商品库绑定
		{
      //name      属性名
      //attrId    属性名ID
      //js        属性值数组
      //defined   是否可以自定义修改
      //isother   是否有other属性值
      //buyAttr   是否购买属性
			if(dharr[i].buyAttr=="1")
      {
        if(dharr[i].defined=="0")
        {
          if(dharr[i].isother=="0")//该商品：【是购买属性】【不可以自定义修改】【没有other属性值】，有这个可能吗？
          {
            //alert("该商品：【是购买属性】【不可以自定义修改】【没有other属性值】，有这个可能吗？");
          }
          else
          {
            dharr[i].js=[{"attrValId":0}]
            dharr[i].name="other"//不能用现有的属性名，否则会匹配得上。          
          }
        }
        skuArr.push([dharr[i].name,dharr[i].attrId,dharr[i].js]);
      }
		}
		return skuArr
  },
  b07:function(alisku)//将2组3组4组合成1组
  {
		if(alisku[0].length==1){}
		else if(alisku[0].length==2){alisku[0]=[this.b19(alisku,0,1)];}//俩组合成一组
		else if(alisku[0].length==3){alisku[0]=[this.b20(alisku,0,1,2)];}//三组合成一组
		else if(alisku[0].length==4){alisku[0]=[this.b21(alisku,0,1,2,3)];}//四组合成一组
		else if(alisku[0].length==5){alisku[0]=[this.b31(alisku,0,1,2,3,4)];}//五组合成一组
		else
		{alert("SMT超过5组，请与管理员联系。3");}
	},
  b08:function(dh,ali,PriceRatio,proid)//1组对1组
  {    
		this.b02(dh,ali);//匹配【属性名】
		let itemSkuList=[],retailPrice,itemA=[],itemSku=[],len1=(dh[0][3].skuPropertyValues.length<dh[0][2].length?dh[0][3].skuPropertyValues.length:dh[0][2].length);
		for(let i=0;i<len1;i++)//第一组的值
		{
			itemA=this.b10(ali,[dh[0][3].skuPropertyId],[dh[0][3].skuPropertyValues[i].propertyValueId]);
			itemSku=[{sizeSpecType:(dh[0][1]==9999?3:1),attrId:dh[0][1],attrValId:dh[0][2][i].attrValId}];
      retailPrice=parseFloat(itemA[1],2)

      //设置价格=(成本+20%税费+0.031415926手续费)*价格倍数 
			retailPrice=((retailPrice+(retailPrice*0.2)+0.031415926)*PriceRatio).toFixed(2)
			itemSkuList.push(
			{
				inventory:itemA[0],
				retailPrice:retailPrice,
				saleStatus:itemA[3],
				skuId:"",skuMD5:"",
				itemSkuInvenList:[{inventoryLocation:"CN",saleStatus:itemA[3],skuCode:proid+"-"+itemA[2],skuInventoryQty:itemA[0],skuMD5:""}],
				skuCode:proid+"-"+itemA[2],
				itemSkuAttrvalList:itemSku
			})
		}
		return itemSkuList
  },
  b09:function(val,Arr)
  {
		let rArr=[0,0,"N",0]//[库存,价格,编号,是否可销售]
		for(let i=0;i<Arr.length;i++)
		{			
			if(val==Arr[i].skuAttr)
			{
				if(Arr[i].skuVal.availQuantity<10)
				{rArr=[0,0,"N",0]}
				else
				{
					rArr=
					[
						Arr[i].skuVal.availQuantity,
						Arr[i].skuVal.skuAmount.value,
						(i+1),
						1
					];
				}
				break;
			}
		}
		return rArr
  },
  b10:function(ali,A,B)
  {  
		let reg1=[],reg2=[],reg3=[],reg4=[],reg5=[],reg6=[];
		for(let i=0;i<ali[0].length;i++)
		{
			if((""+ali[0][i]).indexOf(" - ")==-1)
			{reg1.push(ali[0][i]);}
			else
			{
				reg2=ali[0][i].split(" - ");
			  for(let j=0;j<reg2.length;j++)
				{reg1.push(reg2[j]);}
			}		  
		}
		//////////////////////////////////////
		for(let i=0;i<A.length;i++)
		{
		  if((""+A[i]).indexOf(" - ")==-1)
			{reg3.push(A[i]+":"+B[i]);}
			else
			{
				reg4=A[i].split(" - ");reg5=B[i].split(" - ");
			  for(let j=0;j<reg4.length;j++)
				{reg3.push(reg4[j]+":"+reg5[j]);}
			}
		}
		///////////////////////////
			
		for(let i=0;i<reg1.length;i++)
		{
			for(let j=0;j<reg3.length;j++)
			{
				if(reg1[i]!="x")
				{
			    if(("|"+reg3[j]).indexOf("|"+reg1[i]+":")!=-1){reg6.push(reg3[j]);break;}
				}
			}
		}
		if(reg6[0]==null){reg6=["Not filled:Not filled"];}
		return this.b11(reg6.join(";"),ali[1])
	},
  b11:function(val,Arr)
  {
		let rArr=[0,0,"N",0]//[库存,价格,编号,是否可销售]
		for(let i=0;i<Arr.length;i++)
		{			
			if(val==Arr[i].skuAttr&&Arr[i].skuVal.availQuantity>20)
			{
				rArr=[Arr[i].skuVal.availQuantity,Arr[i].skuVal.skuAmount.value,(i+1),1];
				break;
			}
		}
		return rArr
  },
  b12:function(items)
  {
    let Propertys=this.b38(items.aeopAeProductPropertys),
				DHarr=items.attr,
				itemAttrList=this.b37(Propertys,DHarr);//绑定
    /*
    DHarr.name      属性英文名
    DHarr.nameCn  	属性中文名
    DHarr.required  是否必填
    DHarr.isother   是否有other属性值
    DHarr.defined   属性的属性值是否可以自定义修改
    DHarr.buyAttr   是否购买属性（购买时，必选项）
    DHarr.ischild  	是否子属性（好加事件）
    DHarr.attrId    属性ID
    DHarr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
    DHarr.js    	  js代码
    */
		itemAttrList=this.b36(DHarr,itemAttrList);//要求必填，但还没绑定的，进行绑定
		let arr=this.b35(Propertys)//给DH上自定义属性
    if(arr[0].length)
		{
			itemAttrList.push(this.b13(arr[0]));
		}
		return [itemAttrList,arr[1]]
  },
  b13:function(itemAttrValList)
  {
		let itemAttrList={
      attrId:11,
      attrName:"self",
      attrNameCn:"自定义属性",
      isbrand:0,
      isPriceAttr:0,
      itemAttrValList:itemAttrValList
    }
		return itemAttrList
  },
  b14:function(items)
  {
	  let itemBase=Object()
	  items.keywords=items.keywords.replace(/(^\s*)|(\s*$)/g,'')
	  items.description=items.description.replace(/(^\s*)|(\s*$)/g,'');
		let des="i "
		for(let i=0;i<600;i++)
		{
			des+="i "
		}
	  itemBase.htmlContent='<a href="//rendie.com/image.dhgate.com/webp/m/0x0/f2/albu/g19/'+items.proid+'/69/93/rBNaN2HtN4yAalBEAAZJc1L5nQc931.jpg"><img src="//rendie.com/image.dhgate.com/webp/m/0x0/f2/albu/g19/'+items.proid+'/69/93/rBNaN2HtN4yAalBEAAZJc1L5nQc931.jpg"/>'+items.htmlContent+'</a><img src="//rendie.com/image.dhgate.com/webp/m/0x0/f2/albu/g19/'+items.proid+'/69/93/rBNaN2HtN4yAalBEAAZJc1L5nQc931.jpg"/><h2 class=\"div-title\" data=\"rendie\">'+items.name+'</h2>'+items.des+des
    ////////////////////////////////////////////////////////////////
		let keyArr=this.b45(items.keywords)
	  itemBase.keyWord1=keyArr[0].replace(/\+/ig,' ');
		if(keyArr[1]){itemBase.keyWord2=keyArr[1].replace(/\+/ig,' ');}
		if(keyArr[2]){itemBase.keyWord3=keyArr[2].replace(/\+/ig,' ');}
	  itemBase.videoUrl=""
		//////////////////////////////////////////////////////////////////
		items.name=items.typeenname+" "+items.name
		if(items.name.indexOf(keyArr[0])==-1){items.name=keyArr[0]+" "+items.name}
		if(items.name.indexOf(keyArr[1])==-1){items.name=keyArr[1]+" "+items.name}
		if(items.name.indexOf(keyArr[2])==-1){items.name=keyArr[2]+" "+items.name}
    items.name=items.name.replace(/Free Shipping/ig,' ');//标题中禁止存在产品无关噱头词{free shipping}，请删除！
    items.name=items.name.replace(/ best seller /ig,' ');
    items.name=items.name.replace(/ hot sale /ig,' ');
    items.name=items.name.replace(/ best price /ig,' ');// 
    items.name=items.name.replace(/ Cheap /ig,' ');//
    items.name=items.name.replace(/\+|\(|\)|-|,|\*|\~|\:|\!|\=|\”|\\|"|\）/ig,' ');//
    items.name=items.name.replace(/\s+/ig,' ');
    items.name=items.name.replace(/ñ/ig,'n');
    items.name=items.name.replace(/ó/ig,'o');
    items.name=items.name.replace(/\|/ig,' ');
	  items.name=this.yugi(items.name,1);
    let len=items.name.split(" ").length;//空格不算长度
	  if(items.name.length>140){items.name=items.name.substr(0,137)+"...";}
	  itemBase.itemName=items.name//.toLowerCase();
	  //////////////////////名称 结束////////////////////////////////产品关键词不为空的时候不能超过130个字符！
    let arr=this.b42(items,itemBase.itemName,items.description)
    itemBase.shortDesc=itemBase.keyWord1+" "+arr.shortDesc
    itemBase.shortDesc1=""//arr.shortDesc1
    itemBase.shortDesc2=""//arr.shortDesc2
    itemBase.shortDesc3=""//arr.shortDesc3
    itemBase.shortDesc4=""//arr.shortDesc4
    itemBase.shortDesc5=""//arr.shortDesc5
	  return itemBase
  },
  b15:function()
  {
		return ["self",9999,[{"attrValId":1000},{"attrValId":1001},{"attrValId":1002},{"attrValId":1003},{"attrValId":1004},{"attrValId":1005},{"attrValId":1006},{"attrValId":1007},{"attrValId":1008},{"attrValId":1009}]]
	},
  b16:function(DHarr)
  {
		let valList=[],arr=DHarr.js;
		let len=(arr[3].skuPropertyValues.length<arr[2].length?arr[3].skuPropertyValues.length:arr[2].length)
		for(let j=0;j<len;j++)
		{
			valList[j]=
			{
				attrId:arr[1],
				brandId:"",
				attrName:arr[0],
				lineAttrvalNameCn:"",
				attrValId:arr[2][j].attrValId,
				lineAttrvalName:arr[3].skuPropertyValues[j].skuPropertyTips,
				picUrl:arr[3].skuPropertyValues[j].skuPropertyImagePath?arr[3].skuPropertyValues[j].skuPropertyImagePath:""
			}
		}
		return valList
	},
  b17:function(dh,ali,PriceRatio,proid)//2组对2组
  {
		this.b02(dh,ali);//匹配【属性名】
		let itemSkuList=[],retailPrice,itemA=[],itemSku=[],len1,len2;
		len1=(dh[0][3].skuPropertyValues.length<dh[0][2].length?dh[0][3].skuPropertyValues.length:dh[0][2].length);
		len2=(dh[1][3].skuPropertyValues.length<dh[1][2].length?dh[1][3].skuPropertyValues.length:dh[1][2].length);
		for(let i=0;i<len1;i++)//第一组的值
		{
			for(let j=0;j<len2;j++)//第二组的值
			{
				itemA=this.b22(ali,
					[
						dh[0][3].skuPropertyId,
						dh[1][3].skuPropertyId
					],
					[
						dh[0][3].skuPropertyValues[i].propertyValueId,
						dh[1][3].skuPropertyValues[j].propertyValueId
					]);
				itemSku=
				[
				{sizeSpecType:1                   ,attrId:dh[0][1],attrValId:dh[0][2][i].attrValId},
				{sizeSpecType:(dh[1][1]==9999?3:1),attrId:dh[1][1],attrValId:dh[1][2][j].attrValId}
				];
        retailPrice=parseFloat(itemA[1],2)
        //设置价格=(成本+20%税费+0.031415926手续费)*价格倍数        
				retailPrice=((retailPrice+(retailPrice*0.2)+0.031415926)*PriceRatio).toFixed(2)
				itemSkuList.push(
				{
					inventory:itemA[0],
					retailPrice:retailPrice,
					saleStatus:itemA[3],
					skuId:"",skuMD5:"",
					itemSkuInvenList:
					[{
						inventoryLocation:"CN",
						saleStatus:itemA[3],
						skuCode:proid+"-"+itemA[2],
						skuInventoryQty:itemA[0],skuMD5:""
					}],
					skuCode:proid+"-"+itemA[2],
					itemSkuAttrvalList:itemSku
				})
			}
		}
		return itemSkuList
	},
  b18:function(alisku)//将3组4组合成2组
  {
		if(alisku[0].length==2){}
		else if(alisku[0].length==3){alisku[0]=[alisku[0][0],this.b19(alisku,1,2)];}//俩组合成一组
		else if(alisku[0].length==4){alisku[0]=[alisku[0][0],this.b20(alisku,1,2,3)];}//三组合成一组
    else if(alisku[0].length==5){alisku[0]=[alisku[0][0],this.b21(alisku,1,2,3,4)];}//四组合成一组
		else
    {alert("SMT超过5组，请与管理员联系。1");}
	},
  b19:function(alisku,A,B)//俩组合成一组
  {  
		let newArr={
			skuPropertyId:alisku[0][A].skuPropertyId+" - "+ alisku[0][B].skuPropertyId,
			skuPropertyName:alisku[0][A].skuPropertyName+" - "+ alisku[0][B].skuPropertyName,
			skuPropertyValues:[]
		}
		for(let i=0;i<alisku[0][A].skuPropertyValues.length;i++)
		{
			for(let j=0;j<alisku[0][B].skuPropertyValues.length;j++)
			{
				newArr.skuPropertyValues.push(
				{
					propertyValueId:alisku[0][A].skuPropertyValues[i].propertyValueId+" - "+alisku[0][B].skuPropertyValues[j].propertyValueId,
					skuPropertyTips:alisku[0][A].skuPropertyValues[i].skuPropertyTips+" - "+alisku[0][B].skuPropertyValues[j].skuPropertyTips,
					skuPropertyImagePath:(
						alisku[0][A].skuPropertyValues[i].skuPropertyImagePath?
						alisku[0][A].skuPropertyValues[i].skuPropertyImagePath:
						(
							alisku[0][B].skuPropertyValues[j].skuPropertyImagePath?
							alisku[0][B].skuPropertyValues[j].skuPropertyImagePath:""
						)
					),
				})
			}
		}
		return newArr
	},
  b20:function(alisku,A,B,C)//三组合成一组
  {  
		let newArr={
			skuPropertyId:alisku[0][A].skuPropertyId+" - "+ alisku[0][B].skuPropertyId+" - "+ alisku[0][C].skuPropertyId,
			skuPropertyName:alisku[0][A].skuPropertyName+" - "+ alisku[0][B].skuPropertyName+" - "+ alisku[0][C].skuPropertyName,
			skuPropertyValues:[]
		}
		for(let i=0;i<alisku[0][A].skuPropertyValues.length;i++)
		{
			for(let j=0;j<alisku[0][B].skuPropertyValues.length;j++)
			{
				for(let k=0;k<alisku[0][C].skuPropertyValues.length;k++)
				{
					newArr.skuPropertyValues.push(
					{
						propertyValueId:alisku[0][A].skuPropertyValues[i].propertyValueId+" - "+alisku[0][B].skuPropertyValues[j].propertyValueId+" - "+alisku[0][C].skuPropertyValues[k].propertyValueId,
						skuPropertyTips:alisku[0][A].skuPropertyValues[i].skuPropertyTips+" - "+alisku[0][B].skuPropertyValues[j].skuPropertyTips+" - "+alisku[0][C].skuPropertyValues[k].skuPropertyTips,
						skuPropertyImagePath:(
							alisku[0][A].skuPropertyValues[i].skuPropertyImagePath?
							alisku[0][A].skuPropertyValues[i].skuPropertyImagePath:
							(
								alisku[0][B].skuPropertyValues[j].skuPropertyImagePath?
								alisku[0][B].skuPropertyValues[j].skuPropertyImagePath:
								(
									alisku[0][C].skuPropertyValues[k].skuPropertyImagePath?
									alisku[0][C].skuPropertyValues[k].skuPropertyImagePath:""
								)
							)
						),
					})
				}
			}
		}
		return newArr
	},
  b21:function(alisku,A,B,C,D)//四组合成一组
  {  
		let newArr={
			skuPropertyId:alisku[0][A].skuPropertyId+" - "+ alisku[0][B].skuPropertyId+" - "+ alisku[0][C].skuPropertyId+" - "+ alisku[0][D].skuPropertyId,
			skuPropertyName:alisku[0][A].skuPropertyName+" - "+ alisku[0][B].skuPropertyName+" - "+ alisku[0][C].skuPropertyName+" - "+ alisku[0][D].skuPropertyName,
			skuPropertyValues:[]
		}
		for(let i=0;i<alisku[0][A].skuPropertyValues.length;i++)
		{
			for(let j=0;j<alisku[0][B].skuPropertyValues.length;j++)
			{
				for(let k=0;k<alisku[0][C].skuPropertyValues.length;k++)
				{
					for(let l=0;l<alisku[0][D].skuPropertyValues.length;l++)
					{
						newArr.skuPropertyValues.push(
						{
							propertyValueId:alisku[0][A].skuPropertyValues[i].propertyValueId+" - "+alisku[0][B].skuPropertyValues[j].propertyValueId+" - "+alisku[0][C].skuPropertyValues[k].propertyValueId+" - "+alisku[0][D].skuPropertyValues[l].propertyValueId,
							skuPropertyTips:alisku[0][A].skuPropertyValues[i].skuPropertyTips+" - "+alisku[0][B].skuPropertyValues[j].skuPropertyTips+" - "+alisku[0][C].skuPropertyValues[k].skuPropertyTips+" - "+alisku[0][D].skuPropertyValues[l].skuPropertyTips,
							skuPropertyImagePath:(
								alisku[0][A].skuPropertyValues[i].skuPropertyImagePath?
								alisku[0][A].skuPropertyValues[i].skuPropertyImagePath:
								(
									alisku[0][B].skuPropertyValues[j].skuPropertyImagePath?
									alisku[0][B].skuPropertyValues[j].skuPropertyImagePath:
									(
										alisku[0][C].skuPropertyValues[k].skuPropertyImagePath?
										alisku[0][C].skuPropertyValues[k].skuPropertyImagePath:
										(
											alisku[0][D].skuPropertyValues[l].skuPropertyImagePath?
											alisku[0][D].skuPropertyValues[l].skuPropertyImagePath:""
										)
									)
								)
							),
						})
					}
				}
			}
		}
		return newArr
	},
  b22:function(ali,A,B)
  {  
		let reg1=[],reg2=[],reg3=[],reg4=[],reg5=[],reg6=[];
		for(let i=0;i<ali[0].length;i++)
		{
			if((""+ali[0][i]).indexOf(" - ")==-1)
			{reg1.push(ali[0][i]);}
			else
			{
				reg2=ali[0][i].split(" - ");
			  for(let j=0;j<reg2.length;j++)
				{reg1.push(reg2[j]);}
			}		  
		}
		for(let i=0;i<A.length;i++)
		{
		  if((""+A[i]).indexOf(" - ")==-1)
			{reg3.push(A[i]+":"+B[i]);}
			else
			{
				reg4=A[i].split(" - ");reg5=B[i].split(" - ");
			  for(let j=0;j<reg4.length;j++)
				{reg3.push(reg4[j]+":"+reg5[j]);}
			}
		}
		for(let i=0;i<reg1.length;i++)
		{
			for(let j=0;j<reg3.length;j++)
			{
				if(reg1[i]!="other")
				{
			    if(("|"+reg3[j]).indexOf("|"+reg1[i]+":")!=-1){reg6.push(reg3[j]);break;}
				}
			}
		}
		if(reg6[0]==null){reg6=["other:other"];}
		return this.b09(reg6.join(";"),ali[1])
	},
  b23:function(alisku)//将4组合成3组
  {
		if(alisku[0].length==3){}
		else if(alisku[0].length==4){alisku[0]=[alisku[0][0],alisku[0][1],this.b19(alisku,2,3)];}//俩组合成一组
		else
    {alert("SMT超过4组，请与管理员联系。2");}
	},
  b24:function(dh,ali,PriceRatio,proid)//3组对3组
  {
		this.b02(dh,ali);//匹配【属性名】
		let itemSkuList=[],retailPrice,itemA=[],itemSku=[],len1,len2,len3;
		len1=(dh[0][3].skuPropertyValues.length<dh[0][2].length?dh[0][3].skuPropertyValues.length:dh[0][2].length);
		len2=(dh[1][3].skuPropertyValues.length<dh[1][2].length?dh[1][3].skuPropertyValues.length:dh[1][2].length);
		len3=(dh[2][3].skuPropertyValues.length<dh[2][2].length?dh[2][3].skuPropertyValues.length:dh[2][2].length);
		for(let i=0;i<len1;i++)//第一组的值
		{
			for(let j=0;j<len2;j++)//第二组的值
			{
				for(let k=0;k<len3;k++)
				{
					itemA=this.b22(
						ali,
						[
							dh[0][3].skuPropertyId,dh[1][3].skuPropertyId,
							dh[2][3].skuPropertyId
						],
						[
							dh[0][3].skuPropertyValues[i].propertyValueId,
							dh[1][3].skuPropertyValues[j].propertyValueId,
							dh[2][3].skuPropertyValues[k].propertyValueId
						]);
					itemSku=
					[
						{sizeSpecType:1                   ,attrId:dh[0][1],attrValId:dh[0][2][i].attrValId},
						{sizeSpecType:1                   ,attrId:dh[1][1],attrValId:dh[1][2][j].attrValId},
						{sizeSpecType:(dh[2][1]==9999?3:1),attrId:dh[2][1],attrValId:dh[2][2][k].attrValId}
					];
          retailPrice=parseFloat(itemA[1],2)
          //设置价格=(成本+18%税费+0.031415926手续费)*价格倍数
					retailPrice=((retailPrice+(retailPrice*0.18)+0.031415926)*PriceRatio).toFixed(2)
					itemSkuList.push(
					{
						inventory:itemA[0],
						retailPrice:retailPrice,
						saleStatus:itemA[3],
						skuId:"",skuMD5:"",
						itemSkuInvenList:
						[{
							inventoryLocation:"CN",
							saleStatus:itemA[3],
							skuCode:proid+"-"+itemA[2],
							skuInventoryQty:itemA[0],skuMD5:""
						}],
						skuCode:proid+"-"+itemA[2],
						itemSkuAttrvalList:itemSku
					})
				}
			}
		}
		return itemSkuList
	},
  b25:function(ali,HistoryPrice)//取3次中的最小折扣
  {
    let minDiscount=0,val;//取3次中的最小折扣
    if(HistoryPrice.length==3)
    {
      minDiscount=parseInt(HistoryPrice[0].Discount)
      for(let i=1;i<HistoryPrice.length;i++)
      {
        val=parseInt(HistoryPrice[i].Discount)
        if(val<minDiscount){minDiscount=val;}
      }
      for(let i=0;i<ali[1].length;i++)
      {
        ali[1][i].skuVal.skuAmount.value=ali[1][i].skuVal.skuAmount.value*(1-minDiscount*0.01)     
      }           
    }
    $("#body").append('<tr><td class="right">历史价格最小折扣：</td><td colspan="2">-'+minDiscount+'%</td></tr>');
    return ali;
  },
  b26:function(dh,ali,ab,proid)//敦煌只有2组
  {
    let itemSkuList=[]
    if(ali[0].length<=2)//速卖通<=2组
    {
			$("#state").html('速卖通<=2组')
      if(ali[0].length==1)
      {
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
      }
      ////////////如果购物车属性值不能被修改，就创建一个自定义分组//////////////////////////////////
      let isbool=false;
      for(let i=0;i<dh.length;i++)
      {
        if(dh[i][2][0].attrValId==0){isbool=true;break;}
      }
      if(isbool)
      {
        ab[0].obj.issku=true;
        dh.push(this.b15());
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
				$("#state").html('3组对3组')
        itemSkuList=this.b24(dh,ali,ab[0].obj.PriceRatio,proid);//3组对3组
      }
      else
      {
        itemSkuList=this.b17(dh,ali,ab[0].obj.PriceRatio,proid)//2组对2组
      }
      /////////////////////////////////////////////////////////////////////////////////////////
    }
    else if(ali[0].length>2)//速卖通有【>2】个价格属性则用自定义属性和敦煌的价格属性
    {
			$("#state").html('速卖通有【>2】个价格属性则用自定义属性和敦煌的价格属性')
      ab[0].obj.issku=true;
      dh.push(this.b15());
      this.b23(ali);//将4组合成3组
      itemSkuList=this.b24(dh,ali,ab[0].obj.PriceRatio,proid);//3组对3组
    }
    return itemSkuList;
  },
  b27:function(dh,ali,ab,proid)//敦煌只有1组
  {
    let itemSkuList=[]
    if(ali[0].length==1)//速卖通只有1组
    {
			$("#state").html('速卖通只有1组');
      ////////////是否用了购物车的自定义属性//////////////////////
      let isbool=false;
      for(let i=0;i<dh.length;i++)
      {
        if(dh[i][2][0].attrValId==0){isbool=true;break;}
      }
      ///////////////////////////////////////////////////
      if(isbool)
      {
        ab[0].obj.issku=true;dh.push(this.b15());
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
        itemSkuList=this.b17(dh,ali,ab[0].obj.PriceRatio,proid);
      }
      else 
      {
        itemSkuList=this.b08(dh,ali,ab[0].obj.PriceRatio,proid);  
      }
    }
    else if(ali[0].length>1)//速卖通有【>1】个价格属性则用自定义属性和敦煌的价格属性
    {
			$("#state").html('速卖通有【&gt;1】个价格属性则用自定义属性和敦煌的价格属性');
      ab[0].obj.issku=true;
      dh.push(this.b15());
      this.b18(ali);//将3组4组5组合成2组
      itemSkuList=this.b17(dh,ali,ab[0].obj.PriceRatio,proid);
    }
    return itemSkuList;
  },
  b28:function(dh,ali,ab,proid)//敦煌只有3组
  {
    let itemSkuList=[]
    if(ali[0].length<=3)//速卖通有【<=3】个价格属性则用自定义属性和敦煌的价格属性
    {
      if(ali[0].length==1)
      {
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
      }
      else if(ali[0].length==2)
      {
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
      }
      ////////////是否用了购物车的自定义属性//////////////////////
      let isbool=false;
      for(let i=0;i<dh.length;i++)
      {
        if(dh[i][2][0].attrValId==0){isbool=true;break;}
      }
      ///////////////////////////////////////////////////
      if(isbool)
      {
        ab[0].obj.issku=true;dh.push(this.b15());
        ali[0].push({"skuPropertyName":"other","skuPropertyId":"other","skuPropertyValues": [{"propertyValueId":"other","skuPropertyTips": "Not filled"}]})
        itemSkuList=this.b29(dh,ali,ab[0].obj.PriceRatio,proid);//4组对4组
      }
      else
      {
        itemSkuList=this.b24(dh,ali,ab[0].obj.PriceRatio,proid);//3组对3组  
      }
    }
    else
    {
      ab[0].obj.issku=true;
      dh.push(this.b15());
      this.b30(ali);//将5组合成4组
      itemSkuList=this.b29(dh,ali,ab[0].obj.PriceRatio,proid);//4组对4组
    }
    return itemSkuList;
  },
  b29:function(dh,ali,PriceRatio,proid)//4组对4组
  {
		this.b02(dh,ali);//匹配【属性名】
		let itemSkuList=[],retailPrice,itemA=[],itemSku=[],len1,len2,len3,len4;
		len1=(dh[0][3].skuPropertyValues.length<dh[0][2].length?dh[0][3].skuPropertyValues.length:dh[0][2].length);
		len2=(dh[1][3].skuPropertyValues.length<dh[1][2].length?dh[1][3].skuPropertyValues.length:dh[1][2].length);
		len3=(dh[2][3].skuPropertyValues.length<dh[2][2].length?dh[2][3].skuPropertyValues.length:dh[2][2].length);
		len4=(dh[3][3].skuPropertyValues.length<dh[3][2].length?dh[3][3].skuPropertyValues.length:dh[3][2].length);
		for(let i=0;i<len1;i++)//第一组的值
		{
			for(let j=0;j<len2;j++)//第二组的值
			{
				for(let k=0;k<len3;k++)
				{
          for(let l=0;l<len4;l++)
          {
            itemA=this.b22(ali,
            [
              dh[0][3].skuPropertyId,
              dh[1][3].skuPropertyId,
              dh[2][3].skuPropertyId,
              dh[3][3].skuPropertyId
            ],
            [
              dh[0][3].skuPropertyValues[i].propertyValueId,
              dh[1][3].skuPropertyValues[j].propertyValueId,
              dh[2][3].skuPropertyValues[k].propertyValueId,
              dh[3][3].skuPropertyValues[l].propertyValueId
            ]);
            itemSku=
            [
              {sizeSpecType:1                   ,attrId:dh[0][1],attrValId:dh[0][2][i].attrValId},
              {sizeSpecType:1                   ,attrId:dh[1][1],attrValId:dh[1][2][j].attrValId},
              {sizeSpecType:1                   ,attrId:dh[2][1],attrValId:dh[2][2][k].attrValId},
              {sizeSpecType:(dh[3][1]==9999?3:1),attrId:dh[3][1],attrValId:dh[3][2][l].attrValId}
            ];
            retailPrice=parseFloat(itemA[1],2)
            //设置价格=(成本+18%税费+0.031415926手续费)*价格倍数
            retailPrice=((retailPrice+(retailPrice*0.18)+0.031415926)*PriceRatio).toFixed(2)
            itemSkuList.push(
            {
              inventory:itemA[0],
              retailPrice:retailPrice,
              saleStatus:itemA[3],
              skuId:"",skuMD5:"",
              itemSkuInvenList:
              [{
                inventoryLocation:"CN",
                saleStatus:itemA[3],
                skuCode:proid+"-"+itemA[2],
                skuInventoryQty:itemA[0],
                skuMD5:""
              }],
              skuCode:proid+"-"+itemA[2],
              itemSkuAttrvalList:itemSku
            })
          }
				}
			}
		}
		return itemSkuList
	},
  b30:function(alisku)//将5组合成4组
  {
		if(alisku[0].length==4){}
		else if(alisku[0].length==5){alisku[0]=[alisku[0][0],alisku[0][1],alisku[0][2],this.b19(alisku,3,4)];}//俩组合成一组
		else
    {alert("SMT超过6组，请与管理员联系。");}
	},
  b31:function(alisku,A,B,C,D,E)//五组合成一组
  {  
		let newArr={
			skuPropertyId:alisku[0][A].skuPropertyId+" - "+ alisku[0][B].skuPropertyId+" - "+ alisku[0][C].skuPropertyId+" - "+ alisku[0][D].skuPropertyId+" - "+ alisku[0][E].skuPropertyId,
			skuPropertyName:alisku[0][A].skuPropertyName+" - "+ alisku[0][B].skuPropertyName+" - "+ alisku[0][C].skuPropertyName+" - "+ alisku[0][D].skuPropertyName+" - "+ alisku[0][E].skuPropertyName,
			skuPropertyValues:[]
		}
		for(let i=0;i<alisku[0][A].skuPropertyValues.length;i++)
		{
			for(let j=0;j<alisku[0][B].skuPropertyValues.length;j++)
			{
				for(let k=0;k<alisku[0][C].skuPropertyValues.length;k++)
				{
					for(let l=0;l<alisku[0][D].skuPropertyValues.length;l++)
					{
            for(let m=0;m<alisku[0][E].skuPropertyValues.length;m++)
            {
              newArr.skuPropertyValues.push(
              {
                propertyValueId:alisku[0][A].skuPropertyValues[i].propertyValueId+" - "+alisku[0][B].skuPropertyValues[j].propertyValueId+" - "+alisku[0][C].skuPropertyValues[k].propertyValueId+" - "+alisku[0][D].skuPropertyValues[l].propertyValueId+" - "+alisku[0][E].skuPropertyValues[m].propertyValueId,
                skuPropertyTips:alisku[0][A].skuPropertyValues[i].skuPropertyTips+" - "+alisku[0][B].skuPropertyValues[j].skuPropertyTips+" - "+alisku[0][C].skuPropertyValues[k].skuPropertyTips+" - "+alisku[0][D].skuPropertyValues[l].skuPropertyTips+" - "+alisku[0][E].skuPropertyValues[m].skuPropertyTips,
                skuPropertyImagePath:(
                  alisku[0][A].skuPropertyValues[i].skuPropertyImagePath?
                  alisku[0][A].skuPropertyValues[i].skuPropertyImagePath:
                  (
                    alisku[0][B].skuPropertyValues[j].skuPropertyImagePath?
                    alisku[0][B].skuPropertyValues[j].skuPropertyImagePath:
                    (
                      alisku[0][C].skuPropertyValues[k].skuPropertyImagePath?
                      alisku[0][C].skuPropertyValues[k].skuPropertyImagePath:
                      (
                        alisku[0][D].skuPropertyValues[l].skuPropertyImagePath?
                        alisku[0][D].skuPropertyValues[l].skuPropertyImagePath:
                        (
                          alisku[0][E].skuPropertyValues[m].skuPropertyImagePath?
                          alisku[0][E].skuPropertyValues[m].skuPropertyImagePath:""
                        )
                      )
                    )
                  )
                ),
              })
            }
          }
				}
			}
		}
		return newArr
	},
  b32:function(oo)//删除Ships From这一组。（保留中国）
  {
    let arr1=oo[0],arr2=oo[1],arr3=[],arr4=[]
    if(arr1)
    {
      for(let i=0;i<arr1.length;i++)
      {
        if(arr1[i].skuPropertyName=="Ships From")//如果有这一组
        {
         arr4=this.b33(arr1[i].skuPropertyValues,arr2);
        }
        else
        {
          arr3.push(arr1[i]);
        }
      }
      if(arr3.length==0){arr3=null;}
      if(arr4.length==0){arr4=arr2;}
    }else{arr3=null;arr4=arr2;}
    return [arr3,arr4]
  },
  b33:function(arr1,arr2)//
  {
    for(let j=0;j<arr1.length;j++)
    {
      if(arr1[j].propertyValueId==201336100||arr1[j].propertyValueId==201441035)//如果是中国，就去掉sku的关联,否则删除关联。
      {
        for(let k=0;k<arr2.length;k++)//去掉中国sku的关联
        {
          if(arr2[k].skuAttr.indexOf("200007763:201336100")!=-1)//去中国
          {
            let arr3=arr2[k].skuAttr.split(";");
            let arr4=[];
            for(let l=0;l<arr3.length;l++)
            {
              if(arr3[l].indexOf("200007763:201336100")==-1){arr4.push(arr3[l]);}
            }
            arr2[k].skuAttr=arr4.join(";")
          }
        }
      }
      else
      {
        for(let k=0;k<arr2.length;k++)//删除sku的关联
        {
          if(arr2[k].skuAttr.indexOf("200007763:"+arr1[j].propertyValueId)!=-1){arr2.splice(k,1);break;}
        }
      }
    }
    return arr2;
  },
  b35:function(Propertys)//给DH上自定义属性
  {
    let Repeat="",I11=0,item11="",itemAttrValList=[]
    for(let i=0;i<Propertys.length;i++)//给DH上自定义属性
		{
			if(Repeat.indexOf("|"+Propertys[i].attrName+"|")==-1)//去重复
			{
				if(I11<10&&Propertys[i].attrValue.length<=40)
				{
          if(	Propertys[i].attrValue.indexOf("as pic")==-1&&
							Propertys[i].attrValue!="undefined"&&
							Propertys[i].attrValue!="Other"&&
							Propertys[i].isbind!="已绑定"&&
							Propertys[i].attrName.toLowerCase().indexOf("brand")==-1)
          {
            itemAttrValList[I11]=Object()
            itemAttrValList[I11].attrId=11
            itemAttrValList[I11].brandId=""
            itemAttrValList[I11].attrName=Propertys[i].attrName
            itemAttrValList[I11].attrValId=(I11+1)						
            itemAttrValList[I11].lineAttrvalName=Propertys[i].attrValue.replace(/None/ig,"Not filled").replace(/Brand/ig,"Not filled").replace(/Others/ig,"Not filled")
            itemAttrValList[I11].lineAttrvalNameCn=""
            itemAttrValList[I11].picUrl=""
            I11++
          }
				}
				else
				{
					item11+="<li><strong>"+Propertys[i].attrName+": </strong><div class=\"des-wrap\">"+Propertys[i].attrValue+"</div></li>"
				}
			}
			Repeat+="|"+Propertys[i].attrName+"|"
		}
    return [itemAttrValList,item11]
  },
  b36:function(DHarr,itemAttrList)//要求必填，但还没绑定的，进行绑定
  {
    /*
    DHarr.name      属性英文名
    DHarr.nameCn  	属性中文名
    DHarr.required  是否必填
    DHarr.isother   是否有other属性值
    DHarr.defined   属性的属性值是否可以自定义修改
    DHarr.buyAttr   是否购买属性（购买时，必选项）
    DHarr.ischild  	是否子属性（好加事件）
    DHarr.attrId    属性ID
    DHarr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
    DHarr.js    	  js代码
    */
    let itemAttrValList=[]
    for(let j=1;j<DHarr.length;j++)
    {
      if(DHarr[j].buyAttr!="1"&&DHarr[j].isbind!="已绑定")
      {
        DHarr[j].isbind="已绑定"
        itemAttrList.push(this.b39({attrName:"required",attrValue:"Not filled"},DHarr[j]))
      }
      else if(DHarr[j].buyAttr=="1")
			{
        itemAttrList.push({
          attrId:DHarr[j].attrId,
          attrName:DHarr[j].name,
          attrNameCn:DHarr[j].nameCn,
          isbrand:0,
          isPriceAttr:0,
          itemAttrValList:this.b16(DHarr[j])
        })
			}
    }
    return itemAttrList
  },
  b37:function(Propertys,DHarr)//绑定属性
  {
    /*
    DHarr.name      属性英文名
    DHarr.nameCn  	属性中文名
    DHarr.required  是否必填
    DHarr.isother   是否有other属性值
    DHarr.defined   属性的属性值是否可以自定义修改
    DHarr.buyAttr   是否购买属性（购买时，必选项）
    DHarr.ischild  	是否子属性（好加事件）
    DHarr.attrId    属性ID
    DHarr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
    DHarr.js    	  js代码
    */
    let itemAttrList=[],itemAttrValList=[]
    for(let i=0;i<Propertys.length;i++)
    {
      for(let j=1;j<DHarr.length;j++)
      {
        if(Propertys[i].attrName.toLowerCase()==DHarr[j].name.toLowerCase()&&DHarr[j].buyAttr!="1")
        {
          Propertys[i].isbind="已绑定";DHarr[j].isbind="已绑定"
          itemAttrList.push(this.b39(Propertys[i],DHarr[j]))
        }
      }      
    }
    return itemAttrList
  },
  b38:function(Propertys)//属性名转换
  {
    for(let i=0;i<Propertys.length;i++)
    {
      if(Propertys[i].attrName=="Brand Name"){Propertys[i].attrName="BRAND";}
      if(Propertys[i].attrValue=="Other"||Propertys[i].attrValue=="NONE")//不替换DH不给上传
			{Propertys[i].attrValue="Not filled";}
    }
    return Propertys;
  },
  b39:function(o1,o2)
  {
    let itemAttrValList=
    [{
      attrId:o2.attrId,
      brandId:"",
      attrName:o1.attrName,
      lineAttrvalNameCn:"",
      picUrl:""
    }]
    /*
    DHarr.name      属性英文名
    DHarr.nameCn  	属性中文名
    DHarr.required  是否必填
    DHarr.isother   是否有other属性值
    DHarr.defined   属性的属性值是否可以自定义修改
    DHarr.buyAttr   是否购买属性（购买时，必选项）
    DHarr.ischild  	是否子属性（好加事件）
    DHarr.attrId    属性ID
    DHarr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
    DHarr.js    	  js代码
    */
    o1.attrValue=o1.attrValue.length>40?o1.attrValue.substr(0,37)+'...':o1.attrValue
    if(o2.type=="0"||o2.type=="1"||o2.type=="2")
    {
      if(o2.js.length!=0)
      {        
        if(o2.isother=="1")
        {
          itemAttrValList[0].attrValId=0;
        }
        else
        {itemAttrValList[0].attrValId=this.b40(o1.attrValue,o2);}
      	itemAttrValList[0].lineAttrvalName= o1.attrValue
      }
      else
      {
				itemAttrValList[0].attrValId=99;
      	itemAttrValList[0].lineAttrvalName= "Not filled"
			}
    }
    else if(o2.type=="4")
    {
      itemAttrValList[0].attrValId=""
      itemAttrValList[0].lineAttrvalName=o1.attrValue
    }
    else if(o2.type=="5")
    {
      itemAttrValList[0].attrValId="";
      itemAttrValList[0].lineAttrvalName="0"
    }
    let itemAttrList=
    {
      attrId:o2.attrId,
      attrName:o2.name,
      attrNameCn:o2.nameCn,
      isbrand:(o2.nameCn=="品牌"?1:0),
      isPriceAttr:0,
      itemAttrValList:itemAttrValList
    }
    return itemAttrList;
  },
  b40:function(val,o2)//绑定
  {
    let attrValId=0;
    for(let i=0;i<o2.js.length;i++)
    {
      if(val.toLowerCase()==o2.js[i].lineAttrvalName.toLowerCase())
      {
        attrValId=o2.js[i].attrValId
      }
    }
    if(attrValId==0){attrValId=o2.js[0].attrValId;}//如果绑定不到，那就用第一个吧
    return attrValId
  },
  b41:function(arr1,arr2)//把【购物车中的图片】放到【放大镜中的图片】中去。
  {
    let isbool=false;
    if(arr2[0].length!=0)
    {
      for(let i=0;i<arr2[0].length;i++)
      {
        //////////去重复/////////////////////
        isbool=false;
        for(let j=0;j<arr1.length;j++)
        {
          if(arr1[j].imgMd5==arr2[1][i]){isbool=true;break;}
        }
        /////////////////////////////////////
        if(!isbool)
        {
          arr1.push(
          {
            type: 1,
            imgUrl: arr2[0][i],
            imgMd5:arr2[1][i]
          })
          if(arr1.length==8){break;}
        }
        ////////////////////////////////////////////////////////////////////
      }
    }
    return arr1;
  },
  b42:function(items,name,description)
  {
    let itemBase={},arr=items.aeopAeProductPropertys
		description=description.replace(/aliexpress/ig,"dhgate");
	  itemBase.shortDesc=description
    ///////////////////////////////////////
    itemBase.shortDesc1=(items.keywords+" "+items.typeenname).replace(/\&/g," ");
    itemBase.shortDesc2=""
    itemBase.shortDesc3=""
    itemBase.shortDesc4=""
    itemBase.shortDesc5=""
    for(let i=0;i<arr.length;i++)
    {
      itemBase["shortDesc"+(i%4+2)]+=arr[i].attrName+":"+arr[i].attrValue+". "
    }
    /////////////////////产品短描与标题相似度大于50%，请修改。///////////////////////////////////////////////////
    let nameArr=name.split(" ")
    for(let i=0;i<nameArr.length;i++)
    {
      if(nameArr[i]!="")
      {
        itemBase.shortDesc=this.b43(itemBase.shortDesc,nameArr[i])
        itemBase.shortDesc1=""//this.b43(itemBase.shortDesc1,nameArr[i])
        itemBase.shortDesc2=""//this.b43(itemBase.shortDesc2,nameArr[i])
        itemBase.shortDesc3=""//this.b43(itemBase.shortDesc3,nameArr[i])
        itemBase.shortDesc4=""//this.b43(itemBase.shortDesc4,nameArr[i])
        itemBase.shortDesc5=""//this.b43(itemBase.shortDesc5,nameArr[i])
      }
    }
		///////////////////////////////产品卖点&特性之间禁止重复超过50%，请修改后再重新提交。/////////////////////////////////////////////
       // itemBase.shortDesc=this.yugi(itemBase.shortDesc,1)
//        itemBase.shortDesc1=this.yugi(itemBase.shortDesc1,1)
//        itemBase.shortDesc2=this.yugi(itemBase.shortDesc2,1)
//        itemBase.shortDesc3=this.yugi(itemBase.shortDesc3,1)
//        itemBase.shortDesc4=this.yugi(itemBase.shortDesc4,1)
//        itemBase.shortDesc5=this.yugi(itemBase.shortDesc5,1)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(let i=0;i<6;i++)
    {
      if(i==0)
      {
        itemBase.shortDesc=this.b44(itemBase.shortDesc)
      }
      else
      {
        itemBase["shortDesc"+i]+=" "+itemBase.shortDesc
        itemBase["shortDesc"+i]=this.b44(itemBase["shortDesc"+i])
        if(itemBase["shortDesc"+i].length>200)itemBase["shortDesc"+i]=itemBase["shortDesc"+i].substr(0,200)
      }
    }
    return itemBase
    /*
        let len=itemBase.shortDesc.split(" ").length;

    itemBase.shortDesc=" "+itemBase.shortDesc+" "
    if(itemBase.shortDesc.length>=500+len)
    {
      len=(itemBase.shortDesc).substr(0,500).split(" ").length
      itemBase.shortDesc=itemBase.shortDesc.substr(0,500+len)
      //alert(itemBase.shortDesc.length+"----"+len)
    }
    else
    {
      itemBase.shortDesc+="......"
      for(let i=itemBase.shortDesc.length;i<500+len;i++)
      {
        itemBase.shortDesc+="x"
      }
      itemBase.shortDesc+="......"
    }*/
        /////////////////////////////////////////////////////////////////////
	  //
	  //if(shortDescArr.length>27) itemBase.shortDesc=(shortDescArr.splice(0,27)).join(" ")+"..."	  

  },
  b43:function(des,name)
  {
    let isbool=true;
    des=des.toLowerCase().replace(/\.|\,|\+|\:/g,' ')
    name=name.toLowerCase()
    if((" "+des+" ").indexOf(" "+name+" ")!=-1)
    {
      des=des.replace(name,"");
      isbool=false;
    }
    if(isbool)
    {return des;}
    else
    {
      return this.b43(des,name);
    }
  },
  b44:function(des)
  {
    des=des.replace(/Free Shipping/ig,' ');//标题中禁止存在产品无关噱头词{free shipping}，请删除！
    des=des.replace(/ best seller /ig,' ');
    des=des.replace(/ hot sale /ig,' ');
    des=des.replace(/ best price /ig,' ');// 
    des=des.replace(/ Cheap /ig,' ');//
    des=des.replace(/ Extensions /ig,' ');//
    des=des.replace(/ Extension /ig,' ');//
    des=des.replace(/ +/ig,' ');
    return des;
  },
  b45:function(keywords)
  {
		let keyArr=keywords.split(","),len=keyArr.length,nArr=[];
		for(let i=0;i<len;i++)
		{
			keyArr[i]=Tool.Trim(keyArr[i]);
			if(keyArr[i]!="")
			{
				keyArr[i]=keyArr[i].replace(/\s+|\&|\(|\)/g," ")
				nArr.push(keyArr[i]);
				if(nArr.length==3){break;}
			}
		}
		return nArr;
  },
	yugi:function(str,num)
	{
		let array = str.match(/[a-z]+/gi),obj2 = {},obj3 = {},array3 = str.toLowerCase().match(/[a-z]+/gi);
    if(array)
    {
      for(let i=0;i<array.length;i++)
      {
        let key = array[i];obj2[key]?obj2[key]++:obj2[key]=1;
      }
      for(let i=0;i<array3.length;i++)
      {
        let key = array3[i];obj3[key]?obj3[key]++:obj3[key]=1;
      }
      for(let k in obj2)
      {
        let val = obj3[k.toLowerCase()];
        if(val > num)
        {
          for(let i=num;i<obj3[k.toLowerCase()];i++){str=str.replace(k,"");}
        }
      }
    }
		return str;
	},
  b0DHunit:function(name)//跟据英文查找，敦煌网对应的单位ID
	{
		name=(name.toLowerCase()).replace(/(^\s*)|(\s*$)/g,'')
		let ret
		switch(name){
			case "dozen":ret="00000000000000000000000000000001";break;//打(Dozen)
			case "feet":ret="00000000000000000000000000000002";break;//英尺(Feet)
			case "piece":ret="00000000000000000000000000000003";break;//件(Piece)
			case "combo":ret="00000000000000000000000000000003";break;//件(Piece)
			case "barrel":ret="00000000000000000000000000000003";break;//件(Piece)
			case "pieces":ret="00000000000000000000000000000003";break;//件(Piece)
			case "set":ret="00000000000000000000000000000004";break;//套(Set)
			case "sets":ret="00000000000000000000000000000004";break;//套(Set)
			case "pack":ret="00000000000000000000000000000004";break;//套(Set)
			case "packs":ret="00000000000000000000000000000004";break;//套(Set)
			case "lot":ret="00000000000000000000000000000004";break;//套(Set)
			case "barrels":ret="00000000000000000000000000000004";break;//套(Set)
			case "bag":ret="00000000000000000000000000000004";break;//套(Set)
			case "bags":ret="00000000000000000000000000000004";break;//套(Set)
			case "gram":ret="00000000000000000000000000000005";break;//克(Gram)
			case "inch":ret="00000000000000000000000000000008";break;//英寸(Inch)
			case "kilogram":ret="00000000000000000000000000000009";break;//千克(Kilogram)
			case "kilometre":ret="00000000000000000000000000000010";break;//千米(Kilometre)
			case "liter":ret="00000000000000000000000000000011";break;//升(Liter)
			case "liters":ret="00000000000000000000000000000011";break;//升(Liter)
			case "metrictonne":ret="00000000000000000000000000000012";break;//吨(MetricTonne)
			case "meter":ret="00000000000000000000000000000013";break;//米(Meter)
			case "milliliter":ret="00000000000000000000000000000015";break;//毫升(Milliliter)
			case "ounce":ret="00000000000000000000000000000016";break;//盎司(Ounce)
			case "pair":ret="00000000000000000000000000000017";break;//双(Pair)
			case "pound":ret="00000000000000000000000000000018";break;//磅(Pound)
			case "squareyard":ret="00000000000000000000000000000022";break;//平方码(SquareYard)
			case "squaremeter":ret="00000000000000000000000000000023";break;//平方米(SquareMeter)
			case "square meter":ret="00000000000000000000000000000023";break;//平方米(SquareMeter)
			case "squarefeet":ret="00000000000000000000000000000024";break;//平方英尺(SquareFeet)
			case "yard":ret="00000000000000000000000000000028";break;//码(Yard)
			case "yards":ret="00000000000000000000000000000028";break;//码(Yard)
			case "centimeter":ret="00000000000000000000000000000029";break;//厘米(Centimeter)
			case "carton":ret="00000000000000000000000000000033";break;//箱(Carton)
			default:ret="未知单位"
		}
		return ret
  },
	b0DHSizeTemplate:function(arr,type)
  {
    let str=""
    if(arr.type)
    {
      if(arr.type.indexOf(type)!=-1)
      {
        for(let i=0;i<arr.SizeTemplate.length;i++)
        {
          if(arr.SizeTemplate[i].templateNameCn=="通用模板"){str=arr.SizeTemplate[i].sizeTemplateId;break;}
        }
      }
    }
    return str
  },
 
	b0DHAttr:function(typebind)
  {
    return '[0\
    <r:attr db="sqlite.dhgate" where=" where @.cateId=\''+typebind+'\' order by @.sort,@.id asc" size=40>,\
		{\
      "name":"<:name tag=js/>",\
      "nameCn":"<:nameCn tag=js/>",\
      "required":"<:required/>",\
      "isother":"<:isother/>",\
      "defined":"<:defined/>",\
      "buyAttr":"<:buyAttr/>",\
      "ischild":"<:ischild/>",\
      "attrId":<:attrId/>,\
      "type":"<:type/>",\
      "js":<:js/>\
    }\
    </r:attr>]'
		//    attr.name      属性英文名
		//    attr.nameCn  	属性中文名
		//    attr.required  是否必填
		//    attr.isother   是否有other属性值
		//    attr.defined   属性的属性值是否可以自定义修改
		//    attr.buyAttr   是否购买属性（购买时，必选项）
		//    attr.ischild  	是否子属性（好加事件）
		//    attr.attrId    属性ID
		//    attr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
		//    attr.js    	  js代码  
  }
})
