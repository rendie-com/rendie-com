'use strict';
var fun =
{
  obj:{},token:"",
  a01:function()
  {
    let html=Tool.header("正在【上传商品】...")+'\
    <div class="p-2">\
      <table class="table table-hover mb-0">\
      <tbody>\
      <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
      <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
      <tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
			<tr><td class="right">购物车图片：</td>'+Tool.htmlProgress('C')+'</tr>\
			<tr><td class="right">购物车中的图片：</td><td id="pic1" colspan="2"></td></tr>\
      <tr><td class="right">放大镜图片：</td>'+Tool.htmlProgress('D')+'</tr>\
			<tr><td class="right">放大镜中的图片：</td><td id="pic2" colspan="2"></td></tr>\
			<tr><td class="right">该账号统计：</td><td  id="doTime" colspan="2"></td></tr>\
      <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
			<table class="table table-hover"><tbody id="body"></tbody></table>\
    </div>'
    Tool.html(this.a02,this,html)
  },
  a02:function()
  {
    Tool.DHseller(this,this.a03);//获得配置参数，且获得token
  },
  a03:function()
  {
		Tool.ajax.a01(this.b06(),1,this.a04,this); 
  },
  a04:function(oo)
  {
    oo.ratio=this.b03(oo);
		Tool.DHpro(this,this.a05,oo)
  },
  a05:function()
  {
    let DH = this.obj.DH, arr = []
    if (DH == false)
    {
      this.a08("");      
    }
    else
    {
			DH.method="dh.item.add";
			DH.v="2.0";
			DH.timestamp=(new Date).getTime();
			DH.siteId="EN";
			DH.access_token=this.token;
			DH.vaildDay=14;
     	let param=JSON.stringify(DH);	
			param=param.replace(/aliexpress/ig,"dhgate");
      if(param.indexOf("undefined") != -1)
      {
        $("#state").text('提交结果中有：undefined--------' + param)
        this.a09(27,"提交结果中有：undefined")
      }
      else
      {
        $("#state").html('正在上传数据...')
				param=param.replace(/\/>/g,"/&gt;");
       Tool.ajax.a01(["]'+param+'["])/>',1,this.a06, '<.WebClientPost(["]http://api.dhgate.com/dop/router["],this)
      }
    }
  },
  a06: function (oo) 
  {
    $("#state").html("上传结果：<pre>"+JSON.stringify(oo,null,2)+"</pre>");
    if (oo.status.code=="00000000")
    {
      this.a07(oo);
    }
    else if(oo.status.code=="44")
    {
      if(oo.status.subErrors[0])
      {
        if(oo.status.subErrors[0].message.indexOf("的完全重复，请修改后再上传产品。")!=-1)
        {
          this.a09(56,oo.status.subErrors[0].message);
        }
        else if(oo.status.subErrors[0].message.indexOf("产品标题不能包含有")!=-1||oo.status.subErrors[0].message.indexOf("产品标题中必须至少包含一个关键词")!=-1)
        {
          this.a09(56,oo.status.subErrors[0].message);
        }
        else if(oo.status.subErrors[0].message.indexOf("重复上传，请修改。")!=-1)
        {
					 this.a09(56,oo.status.subErrors[0].message);
        }
        else if(oo.status.subErrors[0].message.indexOf("无关噱头词")!=-1)
        {
					 this.a09(56,oo.status.subErrors[0].message);
        }
        else if(oo.status.subErrors[0].message.indexOf("您无当前类目发布产品权限，请先进行经营品类绑定！")!=-1)
        {
					this.a09(31,oo.status.subErrors[0].message);
          //alert(oo.status.subErrors[0].message)
          //obj.F4=[this.obj.product.type,this.obj.DH.catePubId];
          //Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/绑定DH后类目.js']);
        }
        else
        {
          switch(oo.status.subErrors[0].message)
          {
            case "产品存在非法属性。":this.a09(16,oo.status.subErrors[0].message);break;
  //          case "颜色的白色的属性值长度不能超过40。":
            case "所选产品规格值与产品销售信息-价格列表展示内容不一致":this.a09(30,oo.status.subErrors[0].message);break;
            case "产品详细描述上传不成功！":this.a09(36,oo.status.subErrors[0].message);break;
            case "产品图片最小上传数量不足3张":
              alert("aaaaaaaa")
              //this.a09(64,oo.status.subErrors[0].message);
              break;
            case "此商品和您关联账户下已提交商品重复铺货， 不可直接上架，请重新填写商品信息":
            case "产品首图不能重复，请选择其他的图作为产品首图！":this.a09(56,oo.status.subErrors[0].message);break;
            case "自定义属性值不能含有中文":
            case "产品名称和简短描述不能包含中文字符，请返回修改。":this.a09(37,oo.status.subErrors[0].message);break;
            case "产品标题中重复的单词超过三个为单词堆积！":this.a09(17,oo.status.subErrors[0].message);break;
            case "产品零售价格或批发区间价格不可低于该类目最低价格限制US 300.0 $":
            case "产品零售价格或批发区间价格不可低于该类目最低价格限制US 1.0 $":
            case "产品零售价格或批发区间价格不可低于该类目最低价格限制US 0.01 $":this.a09(22,oo.status.subErrors[0].message);break;
            case "产品详细描述过大，不能超过80000字符。":
            case "产品名称内容超长，请返回修改。":this.a09(20,oo.status.subErrors[0].message);break;
            case "核心关键词必须出现在前8个单词中。":
            case "产品卖点&特性禁止与产品标题单词重复超过50%，请修改好再重新提交。":
							this.a09(26,oo.status.subErrors[0].message);break;
            case "产品短描与标题相似度大于50%，请修改。":
            case "请填写产品标题最少50个字符。":
            case "产品标题内容不符合平台产品信息发布规范，请核实并修改。":
							this.a09(19,oo.status.subErrors[0].message);break;
            case "调用dh.item.add服务超时，该服务的超时限制为12秒，请和服务平台提供商联系。":this.c01(0);break;
            case "【您当前处于限制类目经营的处罚期间，不允许进行此操作】":this.a15();break;
            default:alert(oo.status.subErrors[0].message)
          } 
        }
      }
      else
      {
        //alert("空错误")
        this.a09(14,"空错误");
      }
    }
    
//    else if (txt.indexOf('首图不能重复') != -1 || txt.indexOf("您产品的标题与产品编号为") != -1)
//    {
//      this.obj.DH.itemImgList = this.b05(this.obj.DH.itemImgList);
//      if (!this.obj.num) { this.obj.num = 1; }
//      if (this.obj.num <= 6)//因为SMT放大镜只有6个图
//      { this.a06(); this.obj.num++; }
//      else {
//      this.obj.num = 1;
//      if (txt.indexOf("您产品的标题与产品编号为") != -1) {
//      let fromid = Tool.StrSlice(txt, "您产品的标题与产品编号为", "的完全重复");
//      let str = '<r: db="sqlite.dhgate">update @.proupdhgate set @.examine=2 where @.from=\'dhgate\' and @.fromid=\'' + fromid + '\'</r:>';
//      Tool.ajax.a01( str, 1,this.a14,this, [56, txt]);
//      }
//      else { this.a09(56, txt); }
//      }
//    }
//    if (txt == '{"status":{"code":"44","message":"回调业务服务异常: methodv=dh.item.add$2.0","solution":"业务服务调用不成功，请查看具体错误subErrors","subErrors":[{"code":"error.empty.error.html5000","message":"产品详细描述过大，不能超过80000字符。"}]},"itemId":null,"itemCode":null}') { this.a09(20, txt); }
//    //else if(txt.indexOf('请填写产品的')!=-1){this.a09(16,txt);}
//    //
//    else if (txt.indexOf('产品标题中必须至少包含一个关键词') != -1) { this.a09(26, txt); }
//    else if (txt.indexOf("您今天在敦煌平台已上传了") != -1) { this.a03(); }
//    else if (txt.indexOf("您当前身份只能上传") != -1) { this.a03(); }
//    else if (txt.indexOf('展示内容不一致') != -1) { this.a09(30, txt); }
//    else if (txt.indexOf("中文") != -1) { this.a09(16, txt); }
//    else if (txt.indexOf("单词堆积") != -1) { this.a09(17, txt); }
//    else if (txt.indexOf("有中文") != -1) { this.a09(37, txt); }
//    else if (txt.indexOf('执行函数错误3') != -1) { location.reload(); }
//
//    else if (txt.indexOf("不能包含") != -1) { this.a09(23, txt); }
//    else if (txt == '{"status":{"code":"44","message":"回调业务服务异常: methodv=dh.item.add$2.0","solution":"业务服务调用不成功，请查看具体错误subErrors","subErrors":[{"code":"error.empty.productproductnamelen","message":"产品名称内容超长，请返回修改。"}]},"itemId":null,"itemCode":null}') { $("#E").html(txt); this.a09(20, txt); }
//    else if (txt.indexOf("不能超过") > 0) { this.a09(36, txt); }

    //		else if(txt.indexOf("当前身份只能上传")!=-1){this.a03();}
    //		else if(txt.indexOf("的处罚期间")!=-1){this.a03();}
    //		else if(txt.indexOf("您无当前类目发布产品权限")!=-1){this.a09(31,txt);}
    //		else if(txt.indexOf("特别类目限制")!=-1){this.a09(13,txt);}
    //		else if(txt=='{"status":{"code":"44","message":"回调业务服务异常: methodv=dh.item.add$2.0","solution":"业务服务调用不成功，请查看具体错误subErrors","subErrors":[{"code":"error.empty.error.html5000","message":"产品详细描述过大，不能超过80000字符。"}]},"itemId":null,"itemCode":null}'){this.a09(20,txt);}
    //		else if(txt.indexOf("发布类目不正确")>0){$("#state").html(txt);updateProHide(10,txt,this.ID);}
    //		else if(txt=='{"status":{"code":"44","message":"回调业务服务异常: methodv=dh.item.add$2.0","solution":"业务服务调用不成功，请查看具体错误subErrors","subErrors":[{"code":"error.productentry.attrvalidcorrect","message":"适用品牌属性选择不正确。"}]},"itemId":null,"itemCode":null}'){$("#state").html(txt);this.a09(16,txt);}
    //		
    //		else if(txt.indexOf("自定义规格属性名称不能为空")>0){$("#fromurl").html(txt);this.a09(15,txt);}
    //		else if(txt.indexOf("产品关键词不为空的时候不能超过130个字符")>0){$("#state").html(txt);this.a09(11,txt);}
    //		else if(txt.indexOf('请重新设置物流模板')>0){$("#state").html(txt);this.a09(33,txt);}
    //		else if(txt=='{"status":{"code":"44","message":"回调业务服务异常: methodv=dh.item.add$2.0","solution":"业务服务调用不成功，请查看具体错误subErrors","subErrors":[{"code":"error.empty.picurl1","message":"产品图片至少要有三张图片即一张首图两张细节图"}]},"itemId":null,"itemCode":null}'){$("#state").html(txt);this.a09(29,txt);}
    //		//	else if(txt.indexOf("自定义规格")>0){$("#state").html(txt);updateProHide(20,txt,this.ID);}
    
      //str='<r: db="sqlite.dhgate">update @.pro set @.hide=2,@.err=\''+txt.replace(/'/ig,"''")+'\' where @.id='+obj.DH[this.I].ID+'</r:>'
      //updateTempproduct(this.I,str);
      //alert(this.I)
      //dh_item_delete_list(txt,this.I,0,this.ID)
      //DelAttributes(DH.catePubId)
   
  },
  a07: function (addObj)
  {
		let down=parseInt((new Date().getTime() + 1000*60*60*24*14)/1000),now=Tool.gettime("")
		let str = '<r: db="sqlite.aliexpress">update @.pro set @.isUpDHgate=1 where @.proid=\'' + this.obj.product.proid + '\'<1/>insert into @.proupdhgate(@.upuserid,@.upuser,@.shopid,@.proid,@.fromid,@.ratio,@.downtime,@.examine,@.upGroupId,@.upFreightId)values(' + this.obj.fromid + ',\'' + this.obj.username + '\',' + this.obj.product.alishopid + ',\'' + this.obj.product.proid + '\',' + addObj.itemCode + ',' + this.obj.product.ratio + ','+down+',' + this.obj.product.examine + ',\'' + this.obj.DH.itemGroupId + '\',\'' + this.obj.DH.shippingModelId + '\')</r:>'
		///////////////////////////////////////////////////////////////
		let timeArr=Tool.userDate13(new Date(),"-").split("-")
		let insert="insert into @.shopanalysis(@.fromid,@.name,@.UploadVolume,@.uptime,@.year,@.month,@.day)values("+this.obj.fromid+",'"+this.obj.username+"',1,"+now+","+timeArr[0]+","+Number(timeArr[1])+","+Number(timeArr[2])+")"
		let update="update @.shopanalysis set @.uptime="+Tool.gettime("")+",@.UploadVolume=@.UploadVolume+1 where @.fromid="+this.obj.fromid+" and @.year="+timeArr[0]+" and @.month="+Number(timeArr[1])+" and @.day="+Number(timeArr[2])
		let isinsert="select count(1) from @.shopanalysis where @.fromid="+this.obj.fromid+" and @.year="+timeArr[0]+" and @.month="+Number(timeArr[1])+" and @.day="+Number(timeArr[2]);
		let html=str+'""<if Fun(Db(sqlite.dhgate,'+isinsert+',count))==0><r: db="sqlite.dhgate">'+insert+'</r:><else/><r: db="sqlite.dhgate">'+update+'</r:></if>';
		Tool.ajax.a01( html,1,this.a08, this)
  },
  a08: function(t)
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
				Tool.Time(this.a03,400,this,"1");
			}
			else
      {
        Tool.pre(t)
				alert("aaaaaaaaaaaaaaaaaaa")
			}
		}
		else
		{
			alert("qqqqqqqqqqqqqq")			
			
		}
  },
  a09:function(hide,err)
  {
    let txt='""<r: db="sqlite.aliexpress">update @.pro set @.hide=' + hide + ',@.err=\'' + err.replace(/'/ig, "''") + '\' where @.id=' + this.obj.product.id + '</r:>'
   Tool.ajax.a01( txt,1,this.a08,this)
  },
  b02:function() 
  {
    return '\
		"type":<:type/>,\
		"id":<:ID/>,\
    "typeenname":"<r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:type/>\'" size=1><r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1><:enname tag=js/></r:type> <:enname tag=js/></r:type>",\
		"unit":"<:unit tag=js/>",\
		"name":"<:name tag=js/>",\
		"fromid":<:fromid/>,\
		"examine":<:examine/>,\
    "shipToUS":<:shipToUS/>,\
    "shipToAU":<:shipToAU/>,\
    "shipToRU":<:shipToRU/>,\
    "shipToCA":<:shipToCA/>,\
    "shipToIT":<:shipToIT/>,\
    "shipToFR":<:shipToFR/>,\
    "shipToSE":<:shipToSE/>,\
    "shipToUK":<:shipToUK/>,\
    "shipToIN":<:shipToIN/>,\
    "shipToDE":<:shipToDE/>,\
    "shipToES":<:shipToES/>,\
    "shipToBR":<:shipToBR/>,\
    "shipToMY":<:shipToMY/>,\
		"minprice":<:minprice/>,\
		"proid":"<:proid/>",\
		"alishopid":<:shopid/>,\
		"alifromid":<:fromid/>,\
		"lotNum":<:lotNum/>,\
    "keywords":"<:keywords tag=js/>",\
		"description":"<:description tag=js/>",\
		<r:typebind  db="sqlite.aliexpress" size=1 where=" where @.type=<:type/>">\
		"typebind":"<:dhtype/>",\
		<r:type db="sqlite.dhgate" size=1 where=" where @.fromID=\'<:dhtype/>\'">\
			"excludeKeywords":"<:excludeKeywords/>",\
			"inlucdeKeywords":"<:inlucdeKeywords/>",\
		</r:type>\
		"attr":\
		  [0\
				<r:attr db="sqlite.dhgate" where=" where @.cateId=\'<:dhtype/>\' order by @.sort,@.id asc" size=40>,\
				{\
					"name":"<:name tag="js"/>",\
					"nameCn":"<:nameCn tag=js/>",\
					"required":"<:required tag=js/>",\
					"defined":"<:defined tag=js/>",\
					"isother":"<:isother tag=js/>",\
					"buyAttr":"<:buyAttr tag=js/>",\
					"ischild":"<:ischild tag=js/>",\
					"attrId":<:attrId/>,\
					"type":"<:type/>",\
					"js":<:js tag=0/>\
				}\
				</r:attr>\
		  ],\
		</r:typebind>'
  },
  b03: function (oo)
  {
    let arr = ["5% OFF", "10% OFF", "15% OFF", "15% OFF", "20% OFF",  "20% OFF", "25% OFF", "25% OFF", "30% OFF", "30% OFF", "35% OFF", "35% OFF", "35% OFF", "40% OFF", "40% OFF", "45% OFF", "45% OFF", "45% OFF", "50% OFF", "50% OFF", "50% OFF", "50% OFF", "50% OFF", "55% OFF", "55% OFF", "55% OFF", "60% OFF", "65% OFF", "70% OFF", "75% OFF", "80% OFF", "85% OFF"]
		//"90% OFF","95% OFF"   这个不要，因为有的活动只能打【1-9.5折】，
		//例1： 当折扣为【5% OFF】时，50%利润 它打9.5折，那20%利润 它小于9.5折。
		//例2： 当折扣为【90% OFF】时，50%利润 它打1折，那20%利润 它小于1折。
    let ran = Math.floor(Math.random() * arr.length),PriceRatio,arrI
		arrI=parseInt(arr[ran].split("%")[0])* 0.01;
		//1.5  				  表示50%利润
		//PriceRatio		预设【价格倍数】
		PriceRatio = (1.5/(1-arrI)).toFixed(2);
		//产品零售价格或批发区间价格不可低于该类目最低价格限制US 0.01 $
		//if ((oo.minprice +(oo.minprice*0.2)) * PriceRatio / oo.lotNum >= 0.01) { break; }
    $("#body").html('\
    <tr><td class="w150 right">最小价格：</td><td>' + oo.minprice + '</td></tr>\
    <tr><td class="right">每包件数：</td><td>' + oo.lotNum + '</td></tr>\
    <tr><td class="right">预设【价格倍数】：</td><td>' + PriceRatio + ' (' + arr[ran] + ')</td></tr>')
		return PriceRatio;
  },
  b06:function()
  {
    //and @.isBrand=0 
    return '\
    {\
      <r:pro db="sqlite.aliexpress" size=1 where=" where @.isUpDHgate=0 and @.hide=0 and @.shipToUS=1 and @.type1='+this.obj.upmode.types+' order by @.isVideo desc,@.SaleNum desc,@.id desc" page=2>\
				'+this.b02()+'\
			</r:pro>\
			"count":"<@count/>"\
		}';
  },
}
fun.a01();