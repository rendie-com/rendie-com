'use strict';
var fun=
{
	obj:{A1:1},token:"",
  a01:function()
  {
		let title=""
    switch(obj.arr[5])
    {
      case "1":title="问题数据【下架】";break;
      case "2":title="问题数据【替换】";break;
      case "3":title="未更新数据【下架】";break;
      case "4":title="未更新数据【更新】";break;
      case "5":title="消失数据【下架】";break;
      case "6":title="消失数据【替换】";break;
      case "7":title="【300天以上】未更新数据【下架】";break;
      case "8":title="【300天以上】未更新数据【更新】";break;
      default:title="未知:"+obj.arr[5]
    } 
    let html=Tool.header(title)+'\
    <div class="p-2">\
      <table class="table table-hover align-middle mb-0">\
      <tbody>\
        <tr><td class="w200 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
				<tr><td class="right" nowrap>购物车中的图片：</td>'+Tool.htmlProgress('C')+'</tr>\
				<tr><td class="w200 right">购物车中的图片：</td><td id="pic1" colspan="2"></td></tr>\
				<tr><td class="right">放大镜中的图片：</td>'+Tool.htmlProgress('D')+'</tr>\
        <tr><td class="w200 right">放大镜中的图片：</td><td id="pic2" colspan="2"></td></tr>\
        <tr><td class="right">该账号统计：</td><td  id="doTime" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
	  <table class="table table-hover align-middle"><tbody id="body"></tbody></table>\
    </div>'
		Tool.html(this.a02,this,html);
  },
	a02:function()
  {
    Tool.DHseller(this,this.a03);//获得配置参数，且获得token
  },
  a03:function()
  {
		$("#state").html("正在获得商品信息。。。");
		switch(obj.arr[5])
    {
      case "1":break;//问题数据【下架】//this.a04("and b.@.hide&gt;0");
      case "2":
				if(this.obj.upmode.types)
				{
					Tool.ajax.a01(this.b05(),1,this.a04,this);//问题数据【替换】
				}
				else
				{
					$("#state").html("请选择，替换的商品类目...");
				}
				break;
      case "3":break;//未更新数据【下架】//this.a04("and a.@.examine=2");
      case "4":Tool.ajax.a01(this.b01(),1,this.a04,this);break;//未更新数据【更新】
      case "5":Tool.ajax.a01(this.b04(),1,this.a15,this);break;//消失数据【下架】
      case "6":
				if(this.obj.upmode.types)
				{Tool.ajax.a01(this.b03(),1,this.a04,this);}
				else
				{$("#state").html("请选择，替换的商品类目...");}
				break;//消失数据【替换】
      case "7":break;//300天以上】未更新数据【下架】//this.a04(2);				
      case "8":break;//【300天以上】未更新数据【更新】//this.a09();				
    } 
  },
  a04:function(oo)
  {
		$("#body").html("");//清空代码
		Tool.DHpro(this,this.a05,oo)
  },
  a05:function()
  {
    let DH=this.obj.DH,arr=[]
		if(DH==false)
		{
			this.a11("")
		}
		else
		{
			DH.itemCode=this.obj.product.fromid;
			DH.method="dh.item.update";
			DH.v="2.0";
			DH.timestamp=(new Date).getTime();
			DH.siteId="EN";
			DH.access_token=this.token;
			DH.vaildDay=14;
			DH.itemSkuList=DH.itemSkuList.replace(/"itemSkuAttrvalList"/ig,'"itemSkuAttrValueList"');//更新的与上传的不一样
			DH.itemSkuList=DH.itemSkuList.replace(/"itemSkuInvenList"/ig,'"itemSkuInventoryList"');//更新的与上传的不一样
			DH.itemInventory=DH.itemInventory.replace(/"invenLocationList"/ig,'"inventoryLocationList"');
			let param=JSON.stringify(DH);	
			param=param.replace(/aliexpress/ig,"dhgate");
			param=param.replace(/free shipping/ig,"");
			param=param.replace(/hot sale/ig,"");
			if(param.indexOf("undefined")!=-1)
			{
				$("#state").html('提交结果中有：undefined<hr/>'+param)
				//this.a07(27,"提交结果中有：undefined")
			}
			else
			{
				$("#state").text('正在更新数据...')
				param=param.replace(/\/>/g,"/&gt;")
				Tool.ajax.a01('<.WebClientPost(["]http://api.dhgate.com/dop/router["],["]'+param+'["])/>',1,this.a06,this)
			}
		}
  },
  a06:function(oo)
  {
		$("#state").html("正在验证更新结果..."+Tool.pre(oo));
		if(oo.status.message=="OK")
    {
      this.obj.googleshopping=false;//已上传google shopping的图片修改时不允许修改，添加google shopping图片！
      this.obj.num=1;
			this.a07(oo);
			//this.a09();
    }
    else if(oo.status.code=="44")
    {
	    if(oo.status.subErrors[0]==null)
			{
				//alert("aaaaaqqqqqqqqqqqq")
				//this.a02();
				location.reload();
			}
			else if(oo.status.subErrors[0].message=="发布类目不正确，请重新选择类目"||oo.status.subErrors[0].message=="您无当前类目发布产品权限，请先进行经营品类绑定！")
			{
				this.a12(10,oo.status.subErrors[0].message);
			}
      else if(oo.status.subErrors[0].message.indexOf("首图不能重复")!=-1||
							oo.status.subErrors[0].message.indexOf("的完全重复，请修改后再上传产品。")!=-1||
							oo.status.subErrors[0].message.indexOf("的完全重复，请修改后再上传产品。")!=-1)
      {
        this.a12(54,oo.status.subErrors[0].message);
      }
	    else if(oo.status.subErrors[0].message=="产品标题中重复的单词超过三个为单词堆积！")
			{
				this.a12(17,oo.status.subErrors[0].message);
      }
	    else if(oo.status.subErrors[0].message=="所选产品规格值与产品销售信息-价格列表展示内容不一致")
			{
				this.a12(30,oo.status.subErrors[0].message);
      }
	    else if(oo.status.subErrors[0].message=="请填写产品标题最少50个字符。")
			{
				this.a12(44,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message=="产品标题内容不符合平台产品信息发布规范，请核实并修改。"||oo.status.subErrors[0].message=="产品关键词内容不符合平台产品信息发布规范，请核实并修改。")
			{
				this.a12(43,oo.status.subErrors[0].message);
			}
      else if(oo.status.subErrors[0].message.indexOf("卖点&特性")!=-1)
      {
        this.a12(40,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message.indexOf("产品类目输入不合法，行业准入特别类目限制！")!=-1)
      {
        this.a12(45,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message=="自定义属性属性存在空属性值。"||
							oo.status.subErrors[0].message.indexOf("产品存在非法属性")!=-1||
							oo.status.subErrors[0].message.indexOf("填写属性[")!=-1||
							oo.status.subErrors[0].message.indexOf("动力类型属性。")!=-1||
							oo.status.subErrors[0].message.indexOf("]禁止上传，请修改")!=-1
							){
								//alert("qqqqqqqqqqqqqqqqqqqqq")
								this.a12(16,oo.status.subErrors[0].message);
							}
      else if(oo.status.subErrors[0].message.indexOf("不能包含")!=-1){this.a12(23,oo.status.subErrors[0].message);}
	    else if(oo.status.subErrors[0].message.indexOf("必须至少包含")!=-1){this.a12(24,oo.status.subErrors[0].message);}
	    else if(oo.status.subErrors[0].message.indexOf("产品零售价格或批发区间价格不可低于该类目最低价格限制")!=-1)
			{this.a12(22,oo.status.subErrors[0].message);}
      else if(oo.status.subErrors[0].message=="侵权产品，不可以做修改操作，只可以删除！"||oo.status.subErrors[0].message=="禁销产品，不可以做修改操作，只可以删除！"||oo.status.subErrors[0].message=="操作失败，请确认当前的产品是否是当前用户的。"||oo.status.subErrors[0].message=="处于品牌商投诉与知识产权投诉的商品不能被操作。")
			{
				this.a13(oo.status.subErrors[0].message);
			}	
	    else if(oo.status.subErrors[0].message.indexOf("不能超过")>0)
			{this.a12(36,oo.status.subErrors[0].message);}
      else if(oo.status.subErrors[0].message=="产品名称和简短描述不能包含中文字符，请返回修改。"||
							oo.status.subErrors[0].message=="自定义属性值不能含有中文"||
							oo.status.subErrors[0].message=="尺寸的大号的的属性值不能含有中文。"||
							oo.status.subErrors[0].message=="尺寸的Other的的属性值不能含有中文。"||
							oo.status.subErrors[0].message=="尺寸的S的的属性值不能含有中文。")
      {this.a12(37,oo.status.subErrors[0].message);}	
	    else if(oo.status.subErrors[0].message.indexOf("该产品正在参加促销活动，报名活动直至活动结束期间无法进行修改，可下架商品进行修改")!=-1)
			{
				this.a15([1,this.obj.product.fromid]);
			}
      else if(oo.status.subErrors[0].message=="此商品和您关联账户下已提交商品重复铺货， 不可直接上架，请重新填写商品信息"){this.a12(56,oo.status.subErrors[0].message);}
			else
			{
				pre(oo)
				alert("有新错误--- "+oo.status.subErrors[0].message)
			}
			
    }
    else
    {
      alert("aaaaaaaaaaaaaaaaaqqqqq")
    }
		/*
		else if(oo.status.subErrors.length==0)//空错误，DH自已没做这个错没提示
    {
      this.a12(14,"空错误，DH自已没做这个错没提示");
      //this.a07(14,Tool.pre(oo));
    }
		if(oo.status.subErrors.length!=0)
    {
      else if(oo.status.subErrors[0].message=="产品质量等级为差，不允许提交发布，请修改完善相关产品信息再提交")
      {
        this.a12(14,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message=="核心关键词必须出现在前8个单词中。"||
							oo.status.subErrors[0].message=="产品关键词内容不符合平台产品信息发布规范，请核实并修改。")
      {
        this.a12(27,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message=="无效治理商品不可编辑上架")
      {
				alert("aaaaaaaaaaa")
        //this.a12(53,oo.status.subErrors[0].message);
      }
      else if(oo.status.subErrors[0].message.indexOf("无法进行修改，可下架商品进行修改")!=-1)
      {
        this.a18();
      }
      else if(oo.status.subErrors[0].message=="产品短描与标题相似度大于50%，请修改。"||
							oo.status.subErrors[0].message=="请填写产品标题最少50个字符。"||
							oo.status.subErrors[0].message=="产品标题内容不符合平台产品信息发布规范，请核实并修改。")
			{
				this.a12(19,oo.status.subErrors[0].message);
			}
      else if(oo.status.subErrors[0].message=="产品详细描述上传不成功！"){this.a12(20,oo.status.subErrors[0].message);}
      else if(oo.status.subErrors[0].message=="发布类目不正确，请重新选择类目"){this.a12(22,oo.status.subErrors[0].message);}
	    else if(oo.status.subErrors[0].message=="处于品牌商投诉与知识产权投诉的商品不能被操作。"){this.a12(51,oo.status.subErrors[0].message);}
      else if(oo.status.subErrors[0].message=="【您当前处于关闭账户的处罚期间，不允许进行此操作】"||oo.status.subErrors[0].message=="【您当前处于店铺屏蔽的处罚期间，不允许进行此操作】"||oo.status.subErrors[0].message=="【您当前处于限制类目经营的处罚期间，不允许进行此操作】")
      {
        this.a14();
      }
      
//      
//      if(oo.status.subErrors[0].message=='已上传google shopping的图片修改时不允许修改，添加google shopping图片！')
//      {this.obj.googleshopping=true;this.a03();}
//      
//      else if(oo.status.subErrors[0].message=="产品图片最小上传数量不足3张")
//      {
//        this.a07(64,Tool.pre(oo));
//      }
//      else 
//      else if(oo.status.subErrors[0].message=="产品名称内容超长，请返回修改。"){this.a07(20,Tool.pre(oo));}
//	    else if(oo.status.subErrors[0].message=="产品零售价格或批发区间价格不可低于该类目最低价格限制US 13.0 $"){this.a07(22,Tool.pre(oo));}
//	    else if(oo.status.subErrors[0].message=="产品零售价格或批发区间价格不可低于该类目最低价格限制US 300.0 $"){this.a07(22,Tool.pre(oo));}
//      
//      
      else
      {
        
        $("#state").html("更新结果有错误...<hr/>"+Tool.pre(oo));
        //this.a12(14,"更新结果有错误"+Tool.pre(oo));
      }
      
   
		*/
  },
  a07:function(arr)//上架
  {
		if(arr.itemCode==this.obj.DH.itemCode)
		{
			let param ='{"method":"dh.item.upshelf.list","v":"2.0","timestamp":'+(new Date).getTime()+',"access_token":"'+this.token+'","itemCodes":'+arr.itemCode+'}'
			Tool.ajax.a01('<.WebClientPost(["]http://api.dhgate.com/dop/router["],["]'+param+'["])/>',1,this.a08,this,arr)
		}
		else
		{alert("fromid不同："+arr.itemCode+"---"+this.obj.DH.itemCode)}
  },
  a08:function(oo,arr)//上架
  {
    if(oo.isSuccess==true)
	  {
      $("#state").html("上架成功");
      this.a09();
    }
	  else if(Tool.pre(oo).indexOf("数量超限")!=-1)
    {
      $("#state").html("003:"+Tool.pre(oo));
      //this.a09();
    }
		else
    {
      $("#state").html("上架出错：<hr>"+Tool.pre(oo));
			this.a09();
      //this.a12(14,oo.status.subErrors[0].message);
      //location.reload();
    }
  },
  a09:function()
  {
		let down=parseInt((new Date().getTime() + 1000*60*60*24*14)/1000),now=Tool.gettime("")
    //【需要更新】改为【审核通过】 
    let update='update @.pro set @.isUpDHgate=1 where @.proid=\''+this.obj.product.proid+'\'<1/>update @.proupdhgate set @.uptime='+now+',@.downtime='+down+',@.proid=\''+this.obj.product.proid+'\',@.upuser=\''+this.obj.username+'\',@.ratio='+this.obj.product.ratio+',@.shopid='+this.obj.product.alishopid+',@.upGroupId=\''+this.obj.DH.itemGroupId+'\',@.upFreightId=\''+this.obj.DH.shippingModelId+'\',@.examine=1,@.status=0 where @.fromid='+this.obj.DH.itemCode;
   Tool.ajax.a01('""<r: db="sqlite.aliexpress">'+update+'</r:>',1,this.a10,this);
  },
  a10:function(t)
  {
    if(t=="")
    {
      ///////////////////记录上传数量////////////////
      let timeArr=Tool.userDate13(new Date(),"-").split("-"),now=Tool.gettime("")
      let insert="insert into @.shopanalysis(@.fromid,@.name,@.UpdateVolume,@.uptime,@.year,@.month,@.day)values("+this.obj.fromid+",'"+this.obj.username+"',1,"+now+","+timeArr[0]+","+Number(timeArr[1])+","+Number(timeArr[2])+")"
      let update1="update @.shopanalysis set @.uptime="+now+",@.UpdateVolume=@.UpdateVolume+1 where @.fromid="+this.obj.fromid+" and @.year="+timeArr[0]+" and @.month="+Number(timeArr[1])+" and @.day="+Number(timeArr[2])
      let isinsert="select count(1) from @.shopanalysis where @.fromid="+this.obj.fromid+" and @.year="+timeArr[0]+" and @.month="+Number(timeArr[1])+" and @.day="+Number(timeArr[2])
      let html='""<if Fun(Db("sqlite.dhgate","'+isinsert+'","count"))==0><r: db="sqlite.dhgate">'+insert+'</r:><else/><r: db="sqlite.dhgate">'+update1+'</r:></if>';
      ////////////////////////////////////////////////////////
     Tool.ajax.a01(html,1,this.a11,this);
    }
		else
		{$("#state").html("出错005:"+t);}
  },
  a11:function(t)
  {
		$("#doTime").html(Tool.doTime(this.obj.time,this.obj.B1,this.obj.B2));
    if(t=="")
    {
			this.obj.B1++;
			if(this.obj.B1<=this.obj.B2)
			{
				$("#C1,#D1").html("0%").css("width","0%");
    		$("#C2,#D2,#pic1,#pic2").html("");
				this.obj={
					token:this.token,
					username:this.obj.username,
					password:this.obj.password,
					fromid:this.obj.fromid,
					shippingModel:this.obj.shippingModel,
					afterSaleID:this.obj.afterSaleID,
					SizeTemplate:this.obj.SizeTemplate,
					upmode:this.obj.upmode,
					Group:this.obj.Group,
					A1:this.obj.A1,
					A2:this.obj.A2,
					time:this.obj.time,
					B1:this.obj.B1,B2:this.obj.B2,
					C1:1,C2:0,CArr:[],CArr2:[],CArrMD5:[],
					D1:1,D2:0,DH:{}
				};
				this.a03();
			}
			else
			{
				this.a14();
			}
		}
		else
		{
			alert("qqqqqqqqqqqqqq")
			//this.a12(56,Tool.pre(t))
		}
  },
  a12:function(hide,err)
  {
	  let txt='""<r: db="sqlite.aliexpress">update @.pro set @.hide='+hide+',@.err=\''+err.replace(/'/ig,"''")+'\' where @.id='+this.obj.product.id+'</r:>'
	 Tool.ajax.a01(txt,1,this.a11,this)
	},
  a13:function(err)
  {
		alert("没有原因："+err)
	  let txt='""'//<r: db="sqlite.aliexpress">delete from @.proupdhgate where @.fromid='+this.obj.product.fromid+'</r:>
	 Tool.ajax.a01(txt,1,this.a13A,this,err)
	},
  a13A:function(err)
  {
		this.a12(47,err);
	},
  a14:function()
  {
		$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
		if(obj.arr[6]=="all")
		{
			this.obj.A1++;
			if(this.obj.A1<=this.obj.A2)
			{
				$("#B1").html("0%").css("width","0%");
    		$("#B2").html("");
				this.token = "";
				this.obj={A1:this.obj.A1,B1:1};
				this.a02();
			}
		}
		else
		{
			$("#state").html("当前账号完成。");
		}
	},
	//////////消失数据【下架】  开始////////////////////////////////////////////////////
  a15:function(oo)
  {
		if(this.obj.B1==1){this.obj.B2=oo[0]}
		oo.shift();
		this.obj.Barr=oo
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a16,this,this.a14);
	},
  a16:function()
  {
		let oo=this.obj.Barr
		$("#state").html("下架敦煌商品ID:"+oo.join(" , "));
		let ids=oo.join(","),URL="http://api.dhgate.com/dop/router"
		let o1={}
		o1.method="dh.item.downshelf.list"
		o1.v="2.0"
		o1.timestamp=(new Date).getTime()
		o1.access_token=this.token
		o1.itemCodes=ids			
		Tool.ajax.a01('<.WebClientPost(["]'+URL+'["],["]'+JSON.stringify(o1)+'["])/>',1,this.a17,this,ids)
		
	},
  a17:function(oo,ids)
  {
	  if(oo.isSuccess)
	  {
		  let txt='""<r: db="sqlite.aliexpress">update @.proupdhgate set @.status=1 where @.fromid in('+ids+')</r:>';
			Tool.ajax.a01(txt,1,this.a11,this)
	  }
		else if(oo.message=="令牌Access Token过期或不存在"||oo.message=="应用调用服务的次数超限")
		{
			alert("aaaaaaaaaaaa")
			//this.c01();
		
		}
		else
		{$("#state").html('下架错误001：<hr>'+ids+'<pre>'+JSON.stringify(oo,null,2)+"</pre>");}
  },
	////////消失数据【下架】  结束//////////////////////////////////////////////////////
  b01:function()
  {
    return '\
    {\
      <r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.upUserID='+this.obj.fromid+' and b.@.hide=0 and a.@.examine=2">\
		'+this.b02("b.@.")+'\
		"ratio":<:a.@.ratio/>,\
		"fromid":<:a.@.fromid/>,\
    	</r:proupdhgate>\
    	"count":<@count/>\
    }'
  },
  b02:function(itme)
  {
    return '\
    "type":"<:'+itme+'type/>",\
    "typeenname":"<r:type db="sqlite.aliexpress" where=" where @.fromid=<:'+itme+'type/>" size=1><r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1><:enname/></r:type><:enname/></r:type>",\
    "unit":"<:'+itme+'unit/>",\
    "name":"<:'+itme+'name tag=js/>",\
    "id":"<:'+itme+'ID/>",\
    "examine":"<:'+itme+'examine/>",\
    "alifromid":"<:'+itme+'fromid/>",\
    "alishopid":"<:'+itme+'shopid/>",\
    "hide":"<:'+itme+'hide/>",\
    "shipToUS":<:'+itme+'shipToUS/>,\
    "shipToAU":<:'+itme+'shipToAU/>,\
    "shipToRU":<:'+itme+'shipToRU/>,\
    "shipToCA":<:'+itme+'shipToCA/>,\
    "shipToIT":<:'+itme+'shipToIT/>,\
    "shipToFR":<:'+itme+'shipToFR/>,\
    "shipToSE":<:'+itme+'shipToSE/>,\
    "shipToUK":<:'+itme+'shipToUK/>,\
    "shipToIN":<:'+itme+'shipToIN/>,\
    "shipToDE":<:'+itme+'shipToDE/>,\
    "shipToES":<:'+itme+'shipToES/>,\
    "shipToBR":<:'+itme+'shipToBR/>,\
    "proid":"<:'+itme+'proid/>",\
    "lotNum":"<:'+itme+'lotNum/>",\
    "keywords":"<:'+itme+'keywords tag=js/>",\
    "description":"<:'+itme+'description tag=js/>",\
    <r:typebind size=1 db="sqlite.aliexpress" where=" where @.type=<:'+itme+'type/>">\
    	"typebind":"<:dhtype/>",\
    </r:typebind>'
  },
  b03:function()
  {
		return '\
		{\
			<r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" where @.upUserID='+this.obj.fromid+' and not EXISTS(select 0 from @.pro where @.proupdh.@.proid=@.pro.@.proid and @.proupdh.@.upuserid='+this.obj.fromid+')">\
				<r:pro db="sqlite.aliexpress" size=1 where=" where @.isUpDHgate=0 and @.hide=0 and @.shipToUS=1 and @.type1='+this.obj.upmode.types+'">\
					'+this.b02("")+'\
				</r:pro>\
				"fromid":<:fromid/>,\
				"ratio":<:ratio/>,\
			</r:proupdhgate>\
			"count":<@count/>\
		}'
  },
  b04:function()
  {
		return'\
		[\
			'+(this.obj.B2==0?'<@page/>':'0')+'\
			<r:proupdhgate db="sqlite.dhgate" size=60 page=2 where=" where @.upUserID='+this.obj.fromid+' and @.status=0 and not EXISTS(select 1 from @.pro where @.proupdh.@.proid=@.pro.@.proid and @.proupdh.@.upuserid='+this.obj.fromid+')">,<:fromid/></r:proupdhgate>\
		]'
  },
  b05:function()
  {
		return '\
		{\
			<r:proupdhgate db="sqlite.dhgate" size=1 page=2 where=" where @.upUserID='+this.obj.fromid+' and EXISTS(select 0 from @.pro where @.proupdh.@.proid=@.pro.@.proid and @.proupdh.@.upuserid='+this.obj.fromid+' and @.pro.@.hide<&gt;0)">\
			<r:pro db="sqlite.aliexpress" size=1 where=" where @.isUpDHgate=0 and @.hide=0 and @.shipToUS=1 and @.type1='+this.obj.upmode.types+'">\
				'+this.b02("")+'\
			</r:pro>\
			"fromid":<:fromid/>,\
			"ratio":<:ratio/>,\
			</r:proupdhgate>\
			"count":<@count/>\
		}'
  }
}
fun.a01();