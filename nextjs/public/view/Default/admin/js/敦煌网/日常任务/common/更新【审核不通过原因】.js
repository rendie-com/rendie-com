'use strict';
let F5=
{
	next:null,This:null,
	obj:{C1:1,C2:0,Carr:[],D1:1,D2:0,Darr:[]},
  a01:function(next,This)
  {
    this.obj.Carr=this.b01();
		this.obj.C2=this.obj.Carr.length;//任务说明
		this.next=next;
		this.This=This;
		this.a02()
  },
  a02:function()
  {
		Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a03,this,this.a04)
  },
  a03:function()
  {
		$("#taskDes").html(this.b02());
		let url=this.obj.Carr[this.obj.C1-1][0]+this.obj.D1;
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
		$("#state").html("正在打开【"+this.obj.Carr[this.obj.C1-1][1]+"】页面。。。");
		gg.getFetch(url,"json",this.a05,this);
  },
  a04:function()
  {
		$("#taskDes,#url").html("");
		$("#state").html("订单已采集完成");
		this.obj={C1:1,C2:0,Carr:[],D1:1,D2:0,Darr:[]};//下次还要用
		$("#C1").css("width","0%");
		$("#C1,#C2").html("")
		this.next.apply(this.This)
	},
	a05:function(t)
	{
		if(t.indexOf('没有找到符合条件的信息。')!=-1)
		{
			this.a12();
		}
		else
		{
			let fromidArr=Tool.StrSplits(t,'<span class="lsWrapOne">产品编号：','</span>');
			let errArr=Tool.StrSplits(t,'<td  class="auditThFive">','</li>')
			for(let i=0;i<errArr.length;i++)
			{
				errArr[i]=errArr[i].split('<li>')[1]
			}
			////////////////////////////
			if(this.obj.D2==0)
			{
				let D2=Tool.strRepArr(t,'共有\\s*([0-9]+)\\s*条记录',1)[0];
				D2=Math.ceil(parseInt(D2)/fromidArr.length);
				this.obj.D2=D2;
			}
			if(fromidArr.length==errArr.length)
			{
				this.obj.Darr=[fromidArr,errArr]
				this.a06();
			}
			else
			{alert("页面已改版，请与管理员联系。。。");Tool.pre([fromidArr,errArr]);}
		}
		
	},
  a06:function()
  {
		Tool.x1x2("D", this.obj.D1, this.obj.D2, this.a07,this,this.a12)
	},
  a07:function()
  {
		let err="",arr=this.obj.Darr,nArr=[],fromidArr=[],hide=-1,isbool=true;
		for(let i=0;i<arr[0].length;i++)
		{
			err=Tool.Trim(this.obj.Darr[1][i].replace(/<.*?>|\n| +/ig,""));
			if(err.indexOf("评分为：差")!=-1||err=="站内外推广图不符合规则，请修改后重新提交。"){hide=46}
			else if (err == "此产品为涉嫌侵犯此产品为违规产品品牌的违规产品" || err == "此产品为侵权产品" || err.indexOf("管制单刃") != -1 || err.indexOf("品牌的违规产品") != -1 ||err.indexOf("烟酒类禁售产品")!=-1||err.indexOf("侵权品：产品标题、简短描述")!=-1||err=="产品信息涉嫌侵权，请修改后再上架"||err.indexOf("武器类禁售产品")!=-1||err.indexOf("侵权品：产品图片中含有品牌注册商标")!=-1||err.indexOf("其他类禁售产品")!=-1||err.indexOf("药品类禁售产品")!=-1||err.indexOf("平台禁止发布处方药")!=-1||err.indexOf("的禁售产品")!=-1){hide=47}
			else if(err=="详描图片与商品主图重复，请修改后重新提交。"){hide=48}
			else if(err=="违规品：产品发布时选择的类目与产品实际类目不一致"){hide=10}
			else
			{
				isbool=false;
				Tool.at("请对异常商品进行分类："+err);
				break;
			}
			fromidArr.push(arr[0][i]);
			nArr.push(
			{
				fromid:arr[0][i],
				err:err,
				hide:hide
			})
		}
		if(isbool){this.a08(nArr,fromidArr);}
  },
  a08:function(nArr,fromidArr)
  {
		let str='[0\
		<r:proupdhgate db="sqlite.dhgate" where=" where @.fromid in('+fromidArr.join(",")+')" size=100>,\
			{\
				"fromid":"<:fromid/>",\
				"proid":"<:proid/>"\
			}\
		</r:proupdhgate>]'
		$("#state").html("正在获取【proid】...");
	  Tool.ajax.a01(str,1,this.a09,this,nArr);		
  },
  a09:function(oo,nArr)
  {
		let proid
		for(let i=0;i<nArr.length;i++)
		{
			proid=""
			for(let j=1;j<oo.length;j++)
			{
				if(nArr[i].fromid==oo[j].fromid)
				{proid=oo[j].proid;break;}
			}
			if(proid=="")
			{
				$("#state").html("DH的商品ID【"+nArr[i].fromid+"】，正在【proupdh表】找不到...");
				//alert("DH的商品ID【"+nArr[i].fromid+"】，正在【proupdh表】找不到...");
			}
			nArr[i].proid=proid;
		}
		this.a10(nArr);
  },
  a10:function(nArr)
  {
		let sqlArr=[]
		for(let i=0;i<nArr.length;i++)
		{
			if(nArr[i].hide==46)//评分为：差
			{sqlArr.push("update @.proupdhgate set @.examine=2 where @.proid='"+nArr[i].proid+"'");}
			else
			{sqlArr.push("update @.pro set @.err="+Tool.rpsql(nArr[i].err)+",@.hide="+nArr[i].hide+" where @.proid='"+nArr[i].proid+"'");}
		}
		let str='<r: db="sqlite.aliexpress">'+sqlArr.join("<1/>")+'</r:>'
	 Tool.ajax.a01(str,1,this.a11,this);		
  },
  a11:function(t)
  {
    if(t=="")
    {
      this.obj.D1++;
			this.obj.Darr=[];
			this.a03();
    }
    else
    {
      $("#state").html('出错：'+t);
    }
  },
  a12:function()
  {
		this.obj.D1=1;
		this.obj.D2=0;
		this.obj.Darr=[];
		this.obj.C1++;
		$("#D1").css("width","0%");
		$("#D1,#D2").html("")
		this.a02();
  },
	b01:function()
  {
		return [
			["https://seller.dhgate.com/prodmanage/audit/prodAuditFail.do?dhpath=10001,21001,0202&page=","未通过审核的产品","aaaaaaaaaaaaaa"]
			//,["https://seller.dhgate.com/prodmanage/audit/prodBrandComplaint.do","品牌商投诉产品","aaaaaaaaaaaaaaaa"]
		]
	},
  b02:function()
	{
		let arr=this.obj.Carr,newArr=[];
		for(let i=0;i<this.obj.C2;i++)
		{
			if(i==this.obj.C1-1)
			{newArr.push('<b><font color="red" title="'+arr[i][2]+'">'+arr[i][1]+'</font></b>')}
			else
			{newArr.push('<span title="'+arr[i][2]+'">'+arr[i][1]+'</span>')}
		}
		return newArr.join(' <i class="fa fa-long-arrow-right"></i> ');
	},
}
//  a008:function()
//  {
//    this.obj.C1++;
//    this.a002();
//  },
//	/////////////////////////////////////////////////////////////////////////////////
//	a009:function()
//  {
//    $("#state").html("正在获得店铺ID...")
//    let html='{\
//    <r:proupdhgate db="sqlite.dhgate" where=" where @.fromid='+this.obj.Earr[0][this.obj.E1-1]+'" size="1">\
//      <r:pro db="sqlite.aliexpress" where=" where @.proid=\'<:proid/>\'" size="1">\
//				"shopid":<:shopid/>,\
//				"UpTortNum":<r:shop db="sqlite.aliexpress" where=" where @.shopid=<:shopid/>" size="1"><:UpTortNum/></r:shop>,\
//      </r:pro>\
//      "proid":"<:proid/>"\
//    </r:proupdhgate>}'
//   Tool.ajax.a01(html,1,this.a010,this);
//  },
//  a010:function(oo)
//  {
//    if(oo.proid)
//    {
//			this.obj.E2arr=oo;
//      if(oo[1]>=4)
//      {
//				$("#state").html("审核不通过，超过4次。");
//				this.a011(oo.shopid);//删除一个店的产品
//      }
//      else
//      {
//				$("#state").html("审核不通过，记录次数。");
//        this.c01([this.obj.Earr[0][this.obj.E1-1]],this.a012,oo)//删除一个产品,并记录
//      }
//    }
//    else
//    {
//      $("#state").html("从地本数据库中找不到店铺，说明是同一个店铺，被前面一个删除掉了,程序已停止。");
//    }
//  },
//  a011:function()//
//  {
//    //let html='[1,<@page><r:proupdhgate db="sqlite.dhgate" page=2 size=60 where=" where @.shopid='+this.obj.E2arr.shopid+'">,<:fromid/></r:proupdhgate>]'
//    //Tool.ajax.a01(html,1,this.xxxxx,this);
//		alert("要删除店铺，没做")
//  },
//  a012:function(oo)//【店铺侵权+1】 并本地删除该产品
//  {
//		let str='[<r: db="sqlite.dhgate">update @.shop set @.UpTortNum=@.UpTortNum+1 where @.shopid='+oo.shopid+'<1/>delete from @.pro where @.proid=\''+oo.proid+'\'</r:>]'
//		Tool.ajax.a01(str,1,this.a013,this);
//	},
//  a013:function(t)
//  {
//    if(t[0]==null)
//    {
//      let html="["+this.b04(this.This.obj.fromid,this.This.obj.username)+"]";//统计表【审核不通过量+1】
//     Tool.ajax.a01(html,1,this.a014,this);
//    }else{$("#state").html('出错：'+t);}
//	},
//  a014:function()
//  {
//    this.a007([])
//  },
//  /*
//  a016:function(oo)
//  {
//    let str='[\
//    <r: db="sqlite.aliexpress">delete from @.pro where @.shopid='+this.obj.shopid+'<1/>insert into @.restriction (:mode,@.name,@.des,@.time)values(3,\''+this.obj.shopid+'\',\'已侵权4次，来自：更新【审核不通过原因】。'+this.obj.Earr[1][this.obj.E1-1].replace(/'/ig,"''")+'\',"+Tool.gettime("")+")</r:>\
//    \
//    ]'
//    //Tool.ajax.a01(str,1,this.b02,this);
//  },
//	*/
//  b03:function(err)
//	{
//	  let isbool=false,arr=[
//		"侵权品：产品图片中含有品牌注册商标（文字、图形、数字、颜色等），例如：品牌Logo，CL颜色商标的红色鞋底等。",
//		"侵权品：产品图片中含有品牌注册商标（文字、图形、数字、颜色等），例如：品牌Logo等。",
//		"违规品：产品图片水印与卖家店铺名不一致或图片上有两个不同的敦煌水印",
//		"侵权品：侵犯版权、肖像权、专利权，如Celine（设计款式）、无扇叶风扇（实用新型专利）、性感内衣模特（肖像权、官网版权）、婚纱(官网图)等。",
//		"1、侵权品：侵犯版权、肖像权、专利权，如Celine（设计款式）、无扇叶风扇（实用新型专利）、性感内衣模特（肖像权、官网版权）、婚纱(官网图)等。																																				2、侵权Disney的产品",
//		"1、侵权品：侵犯版权、肖像权、专利权，如Celine（设计款式）、无扇叶风扇（实用新型专利）、性感内衣模特（肖像权、官网版权）、婚纱(官网图)等。																																				2、侵权davidyurman的产品",
//		"违规品：产品图片未使用指定遮挡素材或遮挡不完全、出现人体隐私部位或不文雅姿势、模特或真人展示裸露、涉及局部敏感部位特写、图片本身带有性爱姿势等。",
//		"侵权品：产品与品牌产品相似且描述中包含暗示产品为侵权产品的描述，例如1:1、Replica等",
//		"侵权品：产品与品牌产品相似且图片Logo处有涂抹痕迹",
//		"侵权品：产品标题、简短描述、详细描述等文字描述中含有品牌注册商标或注册商标的变形词，例如：品牌注册商标、NFL(NBA)球队名称等。",
//		"禁销品：产品属于禁止销售的医疗器械类产品，例如：真空采血管、针头、手术用具等",
//		"违规品：产品信息中包含侵权信息",
//		"涉黄",
//		"侵权品：产品图片或者文字中含有品牌注册商标（文字、图形、数字、颜色等)，且乱放类目",
//		"禁销品：出版物类产品属于平台禁销品。如：教科书、电子书、期刊、杂志、着色书、乐谱、地图、食谱、早教类书籍、DVD、VCD、CD等电视剧、电影、、音乐、电脑软件、魔术视频、游戏软件、游戏卡、游戏盘、早教机、学习机、电子书阅读器等",
//		"产品图片展示有药",
//		"禁销品：特殊化妆品属于平台禁销类产品，特殊化妆品类别包含：育发、睫毛增长液、染发、烫发、脱毛、美乳、健美、除臭、祛斑、防晒、美白、祛皱、消炎的化妆品等。",
//		"1、侵权品：产品标题、简短描述、详细描述等文字描述中含有品牌注册商标或注册商标的变形词，例如：品牌注册商标等。																																				2、侵权MickeyMouse的产品",
//		"图片展示有药",
//		"展示有药",
//		"大麻叶",
//		"图片展示大麻叶",
//		"麻叶",
//		"印第安",
//		"违规品：产品中留有私人网址、电话、邮箱或同类平台店铺链接等联系方式",
//		"信号放大器",
//		"禁销品：枪支及枪支附配件产品属于平台禁销品。如：枪托、枪瞄仪、握把、枪支架、子弹匣、扳机、扳机护圈、消音器、闪光抑制器等。",
//		"信号助推器",
//		"政治信息物品",
//		"图片展示有药品",
//		"侵权品：产品图片中含有与已注册品牌相同或相似的图形商标或文字商标",
//		"易燃易爆",
//		"易燃易爆品",
//		"禁销品：处方药、非处方药、口服性药、中药材类产品或其他带有治疗治愈性质的产品属于平台禁销类产品（包含宠物用药）",
//		"违规品：产品文字描述中使用与此产品无关的关键词，如使用多个品牌词、型号词或aliexpress等与上传产品无关的词语",
//		"侵权品：产品与品牌产品相似且只展示产品的一部分、图片Logo处有遮挡、故意不展示logo部位或只展示部分Logo",
//		"侵权品：产品标题、简短描述、详细描述等文字描述中含有品牌注册商标或注册商标的变形词，例如：品牌注册商标等。",
//		"侵权品：产品图片中含有品牌注册商标（文字、图形、数字、颜色等）",
//		"水晶泥",
//		"产品描述或产品图片中含有宣传可预防、治疗或治愈新冠病毒的描述",
//		"产品描述中未展示产品的质量检验合格证明或相关检测报告证明。",
//		"GermanFederaleagle",
//		"纳粹",
//		"产品水印不符",
//		"开锁工具",
//		"mario",
//		"indian",
//		"成人产品乱放类目",
//		"此产品为涉嫌侵犯此产品为违规产品品牌的违规产品",
//		"此产品为侵权产品"
//		]
//		for(let i=0;i<arr.length;i++)//完全相同
//		{
//		  if(arr[i]==err){isbool=true;}
//		}
//		/////////////////////////////////////////////////////////
//		let arr2=
//		[
//			"品牌注册商标、NFL(NBA)球队名称等",
//			"违规品：刀具产品未使用尺子做对比测量刀身，描述中未写明刀身长度及刀尖角度",
//			"违规品：产品详细描述过短或未表达产品特性、产品标题、产品简短描述，产品无详细描述等，相关违规类型详见",
//			"违规品：产品图片、描述中含有中文字符，相关违规类型详见",
//			"违规品：产品图片未使用指定遮挡素材或遮挡不完全、出现人体隐私部位或不文雅姿势",
//			"禁销品：产品（含宠物食品）属于平台限售类产品，销售该类产品需要提供食品卫生许可证",
//			"违规品：产品图片模糊不清、刀具展示没有尺子、无图片、图片与名称描述不符等，常见违规类型详见（点击查看）",
//			"禁销品：电击功能的宠物训练设备属于平台禁销类产品，相关公告详见",
//			"产品与品牌产品相似且图片Logo处有涂抹痕迹",
//			"侵权品：产品图片中含有品牌注册商标"
//		]
//		for(let i=0;i<arr2.length;i++)//包含
//		{
//		  if(err.indexOf(arr2[i])!=-1){isbool=true;}
//		}
//		return isbool;
//	},
//	b04:function(fromid,username)//审核不通过量+1
//  {
//    let time=Tool.userDate13(new Date(),"-")
//		let arr=time.split("-")
//    let insert="insert into @.shopanalysis(@.fromid,@.name,@.year,@.month,@.day,@.AuditFailed,@.uptime)values("+fromid+",'"+username+"',"+arr[0]+","+arr[1]+","+arr[2]+",1,"+Tool.gettime("")+")"
//    let update="update @.shopanalysis set @.uptime="+Tool.gettime("")+",@.AuditFailed=@.AuditFailed+1 where @.fromid="+fromid+" and @.year="+arr[0]+" and @.month="+arr[1]+" and @.day="+arr[2]
//    let isinsert="select count(1) from @.shopanalysis where @.fromid="+fromid+" and @.year="+arr[0]+" and @.month="+arr[1]+" and @.day="+arr[2]
//    return '<if Fun(Db(sqlite.dhgate,'+isinsert+',count))==0><r: db="sqlite.dhgate">'+insert+'</r:><else/><r: db="sqlite.dhgate">'+update+'</r:></if>';
//  },
//  b05:function(fromid,username,num)//删除量+N
//  {
//    let time=Tool.userDate13(new Date(),"-")
//		let arr=time.split("-")
//    let insert="insert into @.shopanalysis(@.fromid,@.name,@.year,@.month,@.day,@.DelVolume,@.uptime)values("+fromid+",'"+username+"',"+arr[0]+","+arr[1]+","+arr[2]+","+num+","+Tool.gettime("")+")"
//    let update="update @.shopanalysis set @.uptime="+Tool.gettime("")+",@.DelVolume=@.DelVolume+"+num+" where @.fromid="+fromid+" and @.year="+arr[0]+" and @.month="+arr[1]+" and @.day="+arr[2]
//    let isinsert="select count(1) from @.shopanalysis where @.fromid="+fromid+" and @.year="+arr[0]+" and @.month="+arr[1]+" and @.day="+arr[2]
//		
//    return '<if Fun(Db(sqlite.dhgate,'+isinsert+',count))==0><r: db="sqlite.dhgate">'+insert+'</r:><else/><r: db="sqlite.dhgate">'+update+'</r:></if>';
//  },
//  c01:function(arr,next,t)
//  {
//    $("#state").html("正在【删除敦煌商品】...");
//    let url="https://seller.dhgate.com/prodmanage/audit/prodAuditFail.do?dhpath=10001,21001,0202"
//    let post='\
//    {\
//      "prodAuditFailForm.dispatcheOperation":"batchDelete",\
//      "prodAuditFailForm.hasOperationTip":0,\
//      "prodAuditFailForm.sortType":"sortType",\
//      "prodAuditFailForm.isStudentSupplier":0,\
//      "prodAuditFailForm.isMoreSearchConditions":1,\
//      "csrftoken":"'+this.obj.csrftoken+'",\
//      "prodAuditFailForm.itemcodeChecked":'+arr.join(',"prodAuditFailForm.itemcodeChecked":')+',\
//      "selectpagesize":60\
//    }'
//		this.temp=[arr,next,t];
//    gg.postJson(url,post,this.c02,this)
//  },
//  c02:function(str)
//  {
//    if(str.indexOf('value="您选择的产品已经删除" id="operationTip"')!=-1)
//		{
//      let str='<r: db="sqlite.aliexpress">delete from @.proupdhgate where @.fromid in('+this.temp[0].join(",")+')</r:>'
//     Tool.ajax.a01("["+str+"]",1,this.c03,this);
//    }
//    else
//    {alert("删除失败，请与管理员联系。");Tool.at(str);}
//  },
//  c03:function(t)
//  {
//    if(t[0]==null)
//    {
//      let str=this.b05(this.This.obj.fromid,this.This.obj.username,this.temp[0].length);//删除量+N
//     Tool.ajax.a01("["+str+"]",1,this.c04,this);
//    }
//    else
//    {$("#state").html('出错：'+t[0]);}
//  },
//  c04:function(t)
//  {
//    if(t[0]==null)
//    {
//    	this.temp[1].apply(this,[this.temp[2]]);
//    }
//    else{$("#state").html('出错：'+t[0]);}
//  },
//  ///////////////////////////////////////////////////////
//  c05:function(t,key)//关键词禁限
//  {
//		if(key)
//		{
//			key=key.replace(/\'/ig,"''")
//			let sql=" and @.aeopAeProductPropertys like '% "+key+" %'"//左右空格
//			sql+=" and @.aeopAeProductPropertys like '%\""+key+" %'"//左双引右空格
//			sql+=" and @.aeopAeProductPropertys like '% "+key+"\"%'"//在空格左双引
//			sql+=" and @.aeopAeProductPropertys like '%\""+key+"\"%'"//左右双引
//			let str='\
//			[\
//				<if "Fun(Db(sqlite.aliexpress,select count(1) from @.restriction where @.mode=0 and @.name=\''+key+'\',count))"=="0">\
//					<r: db="sqlite.aliexpress">insert into @.restriction(:mode,@.name,@.des,@.time)values(0,\''+key+'\',\'同步【审核不通过】:'+t.replace(/'/ig,"''")+'\','+Tool.gettime("")+')</r:>\
//				<else/>\
//					<r: db="sqlite.dhgate">update @.restriction set @.time='+Tool.gettime("")+' where @.mode=0 and @.name=\''+key+'\'</r:>\
//				</if>\
//				<r: db="sqlite.aliexpress">update @.pro set @.hide=53,@.err=\'同步【审核不通过】:'+t.replace(/'/ig,"''")+'\' where @.hide<51 and (@.name like \'%'+key+'%\' or @.keywords like \'% '+key+' %\')</r:>\
//			]';
//			Tool.ajax.a01(str,1,this.c06,this);		
//		}
//		else
//		{alert("关键词错误："+key);}
//  },
//  c06:function(t)
//  {
//		if(t[0]==null)
//		{
//      this.a009();
//    }
//		else
//		{$("#state").html("出错02:"+Tool.pre(t));}
//	}