'use strict';
var fun=
{
  token:"",obj:{username:"",fromid:0,token:[]},
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?obj.arr[4]:1;//翻页
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//切换账户
    F2.a01(this,this.a02);
  },
  a02:function()
  {
		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.user.seller.get&timestamp=" + new Date().getTime() + "&v=1.1"
		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.a03,this,'&amp;'))
	},
  a03:function(txt,URL)
  {
		eval("let obj2="+ txt);
		obj2=obj2.supplier
	  let html="<tr>\
			<td align=\"right\"width=\"200\">卖家ID:</td><td>"+obj2.supplierid+"</td>\
			<td align=\"right\">卖家编号:</td><td>"+obj2.supplierno+"</td>\
			<td align=\"right\">卖家名称:</td><td>"+obj2.suppliername+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">是否是企业:</td><td>"+obj2.isenterprice+"</td>\
			<td align=\"right\">金银铜牌标志位:</td><td>"+this.a04(obj2.grade)+"</td>\
			<td align=\"right\">seller 当前等级标识:</td><td>"+this.a05(obj2.curlevel)+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">是否为工厂用户:</td><td>"+this.a06(obj2.isfactory)+"</td>\
			<td align=\"right\">卖家认证状态:</td><td>"+this.a07(obj2.verify)+"</td>\
			<td align=\"right\">是否是POWER SELLER:</td><td>"+this.a06(obj2.ispowerseller)+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">记录时间:</td><td>"+obj2.createdon+"</td>\
			<td align=\"right\">联系人职务:</td><td>"+obj2.department+"</td>\
			<td align=\"right\">商业类型:</td><td>"+obj2.businesstypeid+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">联系人:</td><td>"+obj2.contactpersonid+"</td>\
			<td align=\"right\">行业:</td><td>"+obj2.industryid+"</td>\
			<td align=\"right\">邮政编码:</td><td>"+obj2.zip+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">城市:</td><td>"+obj2.city+"</td>\
			<td align=\"right\">省份:</td><td>"+obj2.provincestate+"</td>\
			<td align=\"right\">网址:</td><td>"+obj2.webaddress+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">获知来源:</td><td>"+obj2.learnaboutid+"</td>\
			<td align=\"right\">区号:</td><td>"+obj2.areacode+"</td>\
			<td align=\"right\">国家代码:</td><td>"+obj2.countrycode+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">Account manager:</td><td>"+obj2.owninguserid+"</td>\
			<td align=\"right\">AM部门:</td><td>"+obj2.owningbusinessunitid+"</td>\
			<td align=\"right\">国家编码:</td><td>"+obj2.countryname+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">修改时间:</td><td>"+obj2.modifiedon+"</td>\
			<td align=\"right\">记录人:</td><td>"+obj2.createdby+"</td>\
			<td align=\"right\">修改人:</td><td>"+obj2.modifiedby+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">卖家状态:</td><td>"+obj2.supplierstatusid+"</td>\
			<td align=\"right\">是否是ESCROW:</td><td>"+this.a06(obj2.isescrow)+"</td>\
			<td align=\"right\">推荐人:</td><td>"+obj2.recommendor+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">企业法人:</td><td>"+obj2.corporator+"</td>\
			<td align=\"right\">认证时间:</td><td>"+obj2.verifydate+"</td>\
			<td align=\"right\">来源:</td><td>"+obj2.fromtype+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">是否开通商铺:</td><td>"+obj2.storeopened+"</td>\
			<td align=\"right\">注册来源类型:</td><td>"+obj2.visitfromtype+"</td>\
			<td align=\"right\">注册来源:</td><td>"+obj2.fromdetailinfo+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">是否已经审核身份证:</td><td>"+(obj2.idcardconfirm==0?"否":"是")+"</td>\
			<td align=\"right\">是否已经上传身份证图片:</td><td>"+obj2.imageuploaded+"</td>\
			<td align=\"right\">解封时间:</td><td>"+obj2.frozendate+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">1手动解封 2 自动解封:</td><td>"+obj2.frozenstate+"</td>\
			<td align=\"right\">vip折扣标志位:</td><td>"+obj2.vipdiscountflag+"</td>\
			<td align=\"right\">mic产品所占百分比:</td><td>"+obj2.pervalue+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">selller mic度级别:</td><td>"+obj2.gradelevel+"</td>\
			<td align=\"right\">是否有促销产品:</td><td>"+obj2.haspromotionproducts+"</td>\
			<td align=\"right\">广告系列:</td><td>"+obj2.adSeries+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">广告组:</td><td>"+obj2.adGroup+"</td>\
			<td align=\"right\">关键词:</td><td>"+obj2.adKeywords+"</td>\
			<td align=\"right\">是否阅读chinaPost协议状态位:</td><td>"+(obj2.isreadchina==0?"未阅读":" 已阅读")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">公司成立时间:</td><td>"+obj2.foundedtime+"</td>\
			<td align=\"right\">第三方认证报告文档:</td><td>"+obj2.verifyreport+"</td>\
			<td align=\"right\">卖家积分:</td><td>"+obj2.sellerscore+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">卖家等级:</td><td>"+obj2.gradenumber+"</td>\
			<td align=\"right\">卖家认证详细信息:</td><td>"+obj2.verifydetail+"</td>\
			<td align=\"right\">支付方式:</td><td>"+(obj2.payway==1?"线上支付":"线下支付")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">表增加支付账款流水号字段:</td><td>"+obj2.payseqno+"</td>\
			<td align=\"right\">第三方认证申请时间:</td><td>"+obj2.thirdauthdate+"</td>\
			<td align=\"right\">第三方认证通过时间:</td><td>"+obj2.thirdauthpassdate+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">公司类型:</td><td>"+obj2.companytype+"</td>\
			<td align=\"right\">主营行业:</td><td>"+obj2.mainbusinessover+"</td>\
			<td align=\"right\">主要产品类型:</td><td>"+obj2.mainbusinessproduct+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">用户店铺:</td><td>"+obj2.wherehadoperate+"</td>\
			<td align=\"right\">如何得知dhgate:</td><td>"+obj2.howtofinddhgate+"</td>\
			<td align=\"right\">工厂注册生效时间:</td><td>"+obj2.factoryvalidtime+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">工厂支付类型:</td><td>"+obj2.factorypaytype+"</td>\
			<td align=\"right\">用户:</td><td>"+(obj2.factoryregtype==1?"factory类型用户":"普通seller用户")+"</td>\
			<td align=\"right\">是否重复:</td><td>"+(obj2.isrepeat==1?"有重复":"无重复")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">保存城市ID:</td><td>"+obj2.citystate+"</td>\
			<td align=\"right\">seller 最高等级标识:</td><td>"+this.a05(obj2.maxlevel)+"</td>\
			<td align=\"right\">评审是否通过:</td><td>"+this.a08(obj2.evaluatestatus)+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">企业注册号:</td><td>"+obj2.companycode+"</td>\
			<td align=\"right\">sellers是否同意海运协议标志:</td><td>"+(obj2.isreadocean==1?"同意":"不同意")+"</td>\
			<td align=\"right\">用户是否有网店:</td><td>"+(obj2.haswebstore==1?"有":"没有")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">sellers是否同意HK Post协议标志:</td><td>"+(obj2.isreadhkpost==1?"同意":"不同意")+"</td>\
			<td align=\"right\">seller放款标志:</td><td>"+(obj2.payouttype==1?"人民币放款":"美元放款")+"</td>\
			<td align=\"right\">seller是否读过人民币放款使用说明和FAQ:</td><td>"+(obj2.isreadrmb==1?"读过":"没读过")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">账户位于TNSSeller黑名单中:</td><td>"+this.a09(obj2.tnsrelationstatus)+"</td>\
			<td align=\"right\">用户通过TNS验证的信息是否显示:</td><td>"+(obj2.tnssendmsgflg==1?"不显示":"显示")+"</td>\
			<td align=\"right\">新老用户:</td><td>"+(obj2.regstatus==1?"新用户":"老用户")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">给seller看的级别	:</td><td>"+obj2.checktype4seller+"</td>\
			<td align=\"right\">卖家主营行业(gmv最高的行业):</td><td>"+obj2.maincata+" (一天更新一次)</td>\
			<td align=\"right\">是否需要物理地址验证:</td><td>"+(obj2.isaddressvalidate==1?"需要":"不需要")+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">seller 经营级别 用于识别seller:</td><td>"+obj2.operatelevel+"</td>\
			<td align=\"right\">是否绑定独立系统:</td><td>"+(obj2.isDhportUser==1?"有":"没有")+"</td>\
			<td align=\"right\">独立系统用户ID:</td><td>"+obj2.dhportUserId+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">seller最早list产品时间:</td><td>"+obj2.firstListproDate+"</td>\
			<td align=\"right\">是否等过其他网站目前值为ali或ebay:</td><td>"+obj2.visitaliflag+"</td>\
			<td align=\"right\">根据listing计算的最多的类目:</td><td>"+obj2.maincatabylist+" (一天更新一次 )</td>\
		</tr>\
		<tr>\
			<td align=\"right\">联系人:</td><td>"+obj2.ecContactperson+"</td>\
			<td align=\"right\">email地址:</td><td>"+obj2.ecEmail+"</td>\
			<td align=\"right\">传真:</td><td>"+obj2.ecFaxno+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">邮寄地址:</td><td>"+obj2.ecMailingaddress+"</td>\
			<td align=\"right\">移动电话:</td><td>"+obj2.ecMobilephone+"</td>\
			<td align=\"right\">电话:</td><td>"+obj2.ecTel+"</td>\
		</tr>\
		<tr>\
			<td align=\"right\">是否读取过新版syi的说明:</td><td>"+(obj2.readNewsyiInstruction==1?"是":"否")+"</td>\
			<td align=\"right\">是否同意开通LOCAL_RETURN的开通协议:</td><td>"+(obj2.agreeLr==1?"是":"否")+"</td>\
			<td align=\"right\"></td><td></td>\
		</tr>"
		html='\
			<ul class="makeHtmlTab">\
				<li val="1_tbody" onclick="fun.b01()">卖家信息1.0</li>\
				<li val="2_tbody" class="hover" onclick="fun.a01()">卖家信息1.1</li>\
				<li val="3_tbody" onclick="fun.c01()">卖家信息2.0</li>\
			</ul>\
			<div id="URL"class="Tul">'+URL+'</div>\
			<table class="tb">'+html+'</table>'
		F2.b01(html,this.obj.fromid)
  },
	a04:function(name)
	{
		switch(name)
		{
			case "N":return "未设置";break;
			case "S":return "银牌";break;
			case "G":return "金牌";break;
			default:return "未知"
		}
	},
	a05:function(name)
	{
		switch(name)
		{ 
			case "TS":return "Top Seller";break;
			case "OS":return "Onramp Seller";break;
			case "NS":return "New Seller";break;
			case "BS":return "Baby Seller";break;
			default:return "未知"
		}
	},
	a06:function(name)
	{
		switch(name)
		{ 
			case 1:return "是";break;
			case "1":return "是";break;
			case 0:return "不是";break;
			case "0":return "不是";break;
			default:return "未知-"+name
		}
	},
	a07:function(name)
	{
		switch(name)
		{  
			case "N":return "未认证";break;
			case "Y":return "认证";break;
			case "F":return "冻结";break;
			case "T":return "终止";break;
			case "S":return "第三方认证通过";break;
			case "U":return "老用户";break;
			case "M":return "老用户";break;
			case "C":return "取消";break;
			default:return "未知"
		}
	},
	a08:function(name)
	{
		switch(name)
		{  
			case 0:return "老用户";break;
			case 1:return "新用户待审";break;
			case 2:return "新用户通过";break;
			case 3:return "新用户审核失败";break;
			case 4:return "地址验证通过";break;
			case 5:return "TNS 通过 产品数少于5";break;
			default:return "未知"
		}
	},
	a09:function(name)
	{
		switch(name)
		{  
			case "0":return "老数据";break;
			case "1":return "等待检测";break;
			case "2":return "有";break;
			case "3":return "没有";break;
			default:return "未知"
		}
	},
  b01:function(){F.a01(this.b02,this);},
  b02:function(tokenID,token)
  {
		this.tokenID=tokenID;this.token=token;
		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.user.base.get&timestamp=" + new Date().getTime() + "&v=1.0"
		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.b03,this,'&amp;'))
	},
  b03:function(txt,URL)
  {
		eval("let obj2="+ txt);
		obj2=obj2.systemuserbase
	  let html="\
		<tr><td align=\"right\">systemuserid:</td><td>"+obj2.systemuserid+"</td><td align=\"right\">territoryid:</td><td>"+obj2.territoryid+"</td><td align=\"right\">organizationid:</td><td>"+obj2.organizationid+"</td></tr>\
		<tr><td align=\"right\">businessunitid:</td><td>"+obj2.businessunitid+"</td><td align=\"right\">firstname:</td><td>"+obj2.firstname+"</td><td align=\"right\">salutation:</td><td>"+obj2.salutation+"</td></tr>\
		<tr><td align=\"right\">middlename:</td><td>"+obj2.middlename+"</td><td align=\"right\">lastname:</td><td>"+obj2.lastname+"</td><td align=\"right\">fullname:</td><td>"+obj2.fullname+"</td></tr>\
		<tr><td align=\"right\">nickname:</td><td>"+obj2.nickname+"</td><td align=\"right\">title:</td><td>"+obj2.title+"</td><td align=\"right\">jobtitle:</td><td>"+obj2.jobtitle+"</td></tr>\
		<tr><td align=\"right\">homephone:</td><td>"+obj2.homephone+"</td><td align=\"right\">isdisabled:</td><td>"+obj2.isdisabled+"</td><td align=\"right\">gender:</td><td>"+obj2.gender+"</td></tr>\
		<tr><td align=\"right\">skype:</td><td>"+obj2.skype+"</td><td align=\"right\">fromip:</td><td>"+obj2.fromip+"</td><td align=\"right\">idcard:</td><td>"+obj2.idcard+"</td></tr>\
		<tr><td align=\"right\">idcardurl:</td><td>"+obj2.idcardurl+"</td><td align=\"right\">cellphoneisvalid:</td><td>"+obj2.cellphoneisvalid+"</td><td align=\"right\">emailisvalid:</td><td>"+obj2.emailisvalid+"</td></tr>\
		<tr><td align=\"right\">validupdatedate:</td><td>"+obj2.validupdatedate+"</td><td align=\"right\">lastlogondate:</td><td>"+obj2.lastlogondate+"</td><td align=\"right\">logoncount:</td><td>"+obj2.logoncount+"</td></tr>\
		<tr><td align=\"right\">usertype:</td><td>"+obj2.usertype+"</td><td align=\"right\">contactpersonid:</td><td>"+obj2.contactpersonid+"</td><td align=\"right\">appid:</td><td>"+obj2.appid+"</td></tr>\
		<tr><td align=\"right\">mobileisvalid:</td><td>"+obj2.mobileisvalid+"</td><td align=\"right\">ecInternalemailaddress:</td><td>"+obj2.ecInternalemailaddress+"</td><td align=\"right\">ecMobilephone:</td><td>"+obj2.ecMobilephone+"</td></tr>\
		<tr><td align=\"right\">ecPersonalemailaddress:</td><td>"+obj2.ecPersonalemailaddress+"</td><td align=\"right\">ecPremail:</td><td>"+obj2.ecPremail+"</td><td align=\"right\">ecQq:</td><td>"+obj2.ecQq+"</td></tr>\
		"
		html='\
			<div class="tb"><ul class="makeHtmlTab">\
				<li val="1_tbody" class="hover" onclick="fun.b01()">卖家信息1.0</li>\
				<li val="2_tbody" onclick="fun.a01()">卖家信息1.1</li>\
				<li val="3_tbody" onclick="fun.c01()">卖家信息2.0</li>\
			</ul>\
			<table class="tb">\
			<tr><td colspan="6" id="URL">'+URL+'</td></tr>\
			'+html+'\
			</table></div>'
		F.b01(html)
	},
  c01:function(){F.a01(this.c02,this);},
  c02:function(tokenID,token)
  {
		this.tokenID=tokenID;this.token=token;
		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.user.seller.get&timestamp=" + new Date().getTime() + "&v=2.0"
		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.c03,this,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,'&amp;'))
	},
  c03:function(txt,URL)
  {
		eval("let obj2="+ txt);
	  let html="\
		<tr><td align=\"right\">supplierId:</td><td>"+obj2.supplierId+"</td><td align=\"right\">supplierNo:</td><td>"+obj2.supplierNo+"</td><td align=\"right\">supplierName:</td><td>"+obj2.supplierName+"</td></tr>\
		<tr><td align=\"right\">supplierStatusId:</td><td>"+obj2.supplierStatusId+"</td><td align=\"right\">curLevel:</td><td>"+obj2.curLevel+"</td><td align=\"right\">reviewScore:</td><td>"+obj2.reviewScore+"</td></tr>\
		<tr><td align=\"right\">isPowerSeller:</td><td>"+obj2.isPowerSeller+"</td><td align=\"right\">sellerScore:</td><td>"+obj2.sellerScore+"</td><td align=\"right\">grade:</td><td>"+obj2.grade+"</td></tr>\
		<tr><td align=\"right\">verify:</td><td>"+obj2.verify+"</td><td align=\"right\">thirdAuthDate:</td><td>"+obj2.thirdAuthDate+"</td><td align=\"right\">thirdAuthPassDate:</td><td>"+obj2.thirdAuthPassDate+"</td></tr>\
		"
		html='\
			<div class="tb"><ul class="makeHtmlTab">\
				<li val="1_tbody" onclick="fun.b01()">卖家信息1.0</li>\
				<li val="2_tbody" onclick="fun.a01()">卖家信息1.1</li>\
				<li val="3_tbody" class="hover" onclick="fun.c01()">卖家信息2.0</li>\
			</ul>\
			<table class="tb">\
			<tr><td colspan="6" id="URL">'+URL+'</td></tr>\
			'+html+'\
			</table></div>'
		F.b01(html)
	},
}
fun.a01();