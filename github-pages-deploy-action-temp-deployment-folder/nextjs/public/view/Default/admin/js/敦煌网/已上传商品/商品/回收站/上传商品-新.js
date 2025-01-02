'use strict';
var fun =
{
  obj: {
    A1: 1, A2: 0,
    B1: 1, B2: 0, Barr: [],
    where: "",
    DH: [], pro: {},
    username: "", password: "", fromid: 0
  }, token: "",
  a01:function()
  {
    let html = Tool.header("正在【上传商品-新】...")+'\
    <div class="p-2">\
      <table class="table table-hover mb-0">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">商品进度：</td>'+Tool.htmlProgress('B')+'</tr>\
			  <tr><td class="right">该账号统计：</td><td  id="doTime" colspan="2"></td></tr>\
        <tr><td class="right">来源地址：</td><td id="urlA" colspan="2"></td></tr>\
        <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
      </tbody>\
      </table>\
	  <table class="table table-hover"><tbody id="body"></tbody></table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    gg.isRD(this.a03, this);
  },
  a03: function () {
    Tool.getDHuser(this.a04, this);//获得账号等信息
  },
  a04: function () {
    $("#username").html(this.obj.username);
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
  },
  a05: function () {
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a06, this);
  },
  a06:function()
  {
   Tool.ajax.a01( this.b01(),1,this.a07,this);
  },
  a07: function (oo) {
    oo.ratio = this.b02(oo);
    if (this.obj.B2==0)this.obj.B2 = oo.count;
    this.obj.Barr = oo;
    let urlA = "//www.aliexpress.com/item/" + oo.alifromid + ".html";
    $("#urlA").html('<a href="' + urlA + '" target="_blank">' + urlA + '</a>');
    /////////////////////////////////////////////////////////
    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, null);
  },
  a08: function () {
    $("#state").html("正在商品详情信息");
   Tool.ajax.a01( this.b04(this.obj.Barr.proid),1,this.a09,this);
  },
  a09: function (oo) {
    this.obj.Barr.prodes = oo;
    if (oo.DHpicB == 0) {
      $("#state").html("没有上传图片，先标记好，等上传完图片后，再来上传商品。");
      this.a10();
    }
    else
    {
      $("#state").html("正在获取运费模板ID.");
      Tool.shippingmodelid.a01(this.a12, this, this.obj.Barr, this.obj.shippingModel)
    }
  },
  a10: function () {
    //注：@.fromid  是错的，因为默认值，不能重复，所有用了SMT的fromid。
    let sel = "select count(1) from @.proupdhgate where @.proid='" + this.obj.Barr.proid + "'"
    let upd = 'update @.pro set @.isUpDHgate=1 where @.proid=\'' + this.obj.Barr.proid + '\'';
    let sql1 = 'insert into @.proupdhgate(@.upuserid,@.upuser,@.fromid,@.proid,@.proStatus)values(' + this.obj.fromid + ',\'' + this.obj.username + '\',' + this.obj.Barr.alifromid + ',\'' + this.obj.Barr.proid + '\',37)'
    let str = '<if "Fun(Db(sqlite.aliexpress,' + sel + ',count))"=="0"><r: db="sqlite.aliexpress">' + sql1 + '</r:><else/><r: db="sqlite.aliexpress">' + upd + '</r:></if>';
   Tool.ajax.a01( str,1,this.a11,this)
  },
  a11: function (t) {

    if (Tool.Trim(t) == "") {
      this.obj.B1++;
      this.obj.Barr = [];
      this.obj.DH = [];
      this.a06();
    }
    else
    {
      Tool.pre(["出错001",t])
    }

  },
  a12: function (shippingmodelid) {
   

    let oo = this.obj.Barr;
    let productgroupid = Tool.productgroupid(oo.type, this.obj.group).split("=")[0]//选分组产品所属产品组ID
    //this.obj.DH = this.obj.DH.concat(this.b07(productgroupid, shippingmodelid, this.obj.afterSaleID, "", oo.typebind));//其它
    /////////////////////////////////////////////////////////
    this.obj.DH = Tool.productname_keyword(oo.name, oo.keywords, oo.typeenname);//组装标题和关键词
    this.obj.DH = this.obj.DH.concat(Tool.imglist_googleshoppingimagelist(oo.prodes.DHpicB, oo.prodes.DHattrPicB));//组装主图+站内外推广图片
    //this.obj.DH = this.obj.DH.concat(Tool.sortby_packquantity_measureid(oo.unit, oo.lotNum));//单位 和 销售方式（按件卖，按包卖）
    //this.obj.DH = this.obj.DH.concat(Tool.shortDesc12345(oo.description));//产品卖点&特性
    //this.obj.DH = this.obj.DH.concat(Tool.other1());//不重要的信息
    this.a15(oo);
  },
  a15: function (oo)
  {
    if (oo.count == 0) {
      alert("没有数据了");
    }
    else
    {
      
        $("#state").html("正在获得绑定信息");
       Tool.ajax.a01( this.b03(oo.typebind),1,this.a16,this);
     //if (oo.typebind)
     // { }
     // else
     // {
     //   alert("没有绑定分类");
     // }
    }
  },
  a16: function (attr) {
    $("#state").html("正在获得【attrlist】信息");
    Tool.attrlist.a01(this.a17, this, attr)
  },
  a17: function (attrArr, desArr) {
    //attrArr[0]---表示拼装后敦煌的系统属性组
    //attrArr[1]---表示拼装后购物车属性（购买时，必选项）
    //desArr    ---自定义属性超出10个的放到详情中去
    let oo = this.obj.Barr;
    this.obj.DH = this.obj.DH.concat(Tool.productDes(desArr, oo.prodes.DHdes, oo.prodes.des, oo.proid, oo.name));//产品详情
    this.a20();
    //if (Tool.DHattrPicB_fileurl(oo.prodes))//把上传好的属性图片写到,正常的话返回true,否则返回false
    //{
    //  this.a18(attrArr)
    //}
    //else {
    //  $("#state").html('SMT与DH属性图片不一致');
    //  let sql1 = 'update @.pro set @.hide=11,@.err=' + Tool.rpsql("临时放一下") + ' where @.proid=\'' + this.obj.Barr.proid + '\'';
    //  let str = '<r: db="sqlite.aliexpress">' + sql1 + '</r:>';
    // Tool.ajax.a01( str,1,this.a11,this)
    //}
  },
  a18: function (attrArr)
  {
    $("#state").html('敦煌有' + attrArr[1].length + "组购物车属性。");
    //attrArr[0]---表示拼装后敦煌的系统属性组
    //attrArr[1]---表示拼装后购物车属性（购买时，必选项）
    //Tool.SkuInfo.a01(this.a19, this, attrArr);
    this.a20();
  },
  a19: function (proSkuInfo, oldSkuInfo, attrlist, specselfDef) {
    let oo = [];
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //oo.push({ "name": "specselfDef", "value": JSON.stringify(specselfDef) });//自定义购物车属性，包括图片
    //oo.push({ "name": "proSkuInfo", "value": JSON.stringify(proSkuInfo) });//价格，编码，库存信息
    //oo.push({ "name": "oldSkuInfo", "value": JSON.stringify(oldSkuInfo) });//价格，编码，库存信息---有商品编码在里面
    //oo.push({ "name": "attrlist", "value": JSON.stringify(attrlist) });
    ///////////////////////////////////////////////////////////////////////////
    //oo.push({ "name": "specselfDef", "value":"[]" });//自定义购物车属性，包括图片
    //oo.push({ "name": "proSkuInfo", "value": "{\"prodInvenLocationList\":[{\"class\":\"###\",\"inventoryLocation\":\"CN\",\"leadingTime\":\"4\"}],\"skuInfoList\":[{\"class\":\"#\",\"attrList\":[{\"attrId\":\"1236509\",\"attrVid\":\"2316317\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"1236802\",\"attrVid\":\"2316556\",\"type\":\"1\",\"class\":\"##\"},{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"\",\"stock\":\"\",\"skuCode\":\"\",\"id\":\"1236509_2316317A1236802_2316556A8888_CN\"}]}" });//价格，编码，库存信息
    //oo.push({ "name": "oldSkuInfo", "value": "" });//价格，编码，库存信息---有商品编码在里面
    //oo.push({ "name": "attrlist", "value": "[{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1236803,\"attrName\":\"Gender\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":2316299,\"lineAttrvalName\":\"Women\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"},{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":2316561,\"lineAttrvalName\":\"Men\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1236807,\"attrName\":\"BRAND\",\"isbrand\":\"1\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1236808,\"attrName\":\"Best use\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":2316588,\"lineAttrvalName\":\"Rugby\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1236509,\"attrName\":\"Size\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":2316317,\"lineAttrvalName\":\"XXS\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]},{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1236802,\"attrName\":\"Color\",\"isbrand\":\"0\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":2316556,\"lineAttrvalName\":\"Gray\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]}]" });
    ///////////////////////////////////////////////////////////////////////////
    Tool.bodyAppend(oo);
    this.obj.DH = this.obj.DH.concat(oo);//商品属性
    this.a20();
  },
  a20: function () {

    //gg.postFetch("http://seller.dhgate.com/syi/ajaxSavedraftboxV2.do?isblank=true&prodDraftId=850239260", this.b06(), this.a21, this);
    gg.postFetch("http://seller.dhgate.com/syi/save.do", this.b06(), this.a21, this);
  },
  a21: function (t) {
    if (t.indexOf("详细描述改变") != -1) {
      this.a22(t);
    }
    else if (t.indexOf('erifycode":"验证码错误"') != -1) {
      $("#state").html("上传结果0001：" + t);
    }
    else if (t.indexOf('产品完全重复') != -1) {
      $("#state").html("上传结果0002：" + t);
      this.a25(55, "您产品的标题与产品编号为xxxxxxxx的产品完全重复，请修改后再上传产品")
    }
    else if (t.indexOf('不符合平台产品信息发布规范') != -1) {
      $("#state").html("上传结果0003：" + t);
      this.a25(10, "不符合平台产品信息发布规范")
    }
    else if (t.indexOf('请选择其他的图作为产品首图！') != -1) {
      $("#state").html("上传结果0004：" + t);
      this.a25(55, "请选择其他的图作为产品首图！")
    }
    else if (t.indexOf('java.lang.reflect.UndeclaredThrowableException') != -1) {
      $("#state").html("上传结果0005：" + t);
      this.a25(27, "DH内部错误java.lang.reflect.UndeclaredThrowableException")
    }
    else if (t.indexOf('产品标题中包含堆砌词组') != -1) {
      $("#state").html("上传结果0005：" + t);
      this.a25(24, "产品标题中包含堆砌词组")
    }
    else if (t.indexOf('标题中禁止存在产品无关噱头词，请删除') != -1) {
      $("#state").html("上传结果0005：" + t);
      this.a25(24, "标题中禁止存在产品无关噱头词，请删除")
    }
    else if (t.indexOf('产品图片最小上传数量不足3张。') != -1) {
      $("#state").html("上传结果0005：" + t);
      this.a25(8, "产品图片最小上传数量不足3张。")
    }
    else if (t.indexOf('您无当前类目发布产品权限，请先进行经营品类绑定！') != -1) {
      $("#state").html("上传结果00050：" + t);
      //this.a25(31, "您无当前类目发布产品权限，请先进行经营品类绑定！")
    }
    else
    {
      //Tool.pre(t)
      $("#state").html("上传结果：" + t);
    }
  },
  a22: function (t)
  {
    let examine = 41//刚上传还不能用
    let itemCode = Tool.StrSlice(t, '"itemcode":', ",");
    let sel = "select count(1) from @.proupdhgate where @.proid='" + this.obj.Barr.proid + "'"
    let upd = 'update @.proupdhgate set @.fromid=' + itemCode +' where @.proid=\'' + this.obj.Barr.proid + '\'';
    let str01 = 'insert into @.proupdhgate(@.upuserid,@.upuser,@.shopid,@.proid,@.fromid,@.ratio,@.proStatus,@.upGroupId,@.upFreightId)values(' + this.obj.fromid + ',\'' + this.obj.username + '\',' + this.obj.Barr.alishopid + ',\'' + this.obj.Barr.proid + '\',' + itemCode + ',' + this.obj.Barr.ratio + ',' + examine + ',\'' + this.obj.DH.itemGroupId + '\',\'' + this.obj.DH.shippingModelId + '\')'
    let str02 = 'update @.pro set @.isUpDHgate=1 where @.proid=\'' + this.obj.Barr.proid + '\'';
   Tool.ajax.a01(count))"=="0"><r: db="sqlite.aliexpress">' + str01 + '<1/>' + str02 + '</r:><else/><r: db="sqlite.aliexpress">' + upd + '<1/>' + str02 + '</r:></if>', 1,this.a23, '<if "Fun(Db(sqlite.aliexpress,' + sel + ', this, itemCode);

  },
  a23: function (t, itemCode) {
    if (t == "") {
      $("#state").html("这条更新完成");
      gg.postFetch("http://seller.dhgate.com/prodmanage/audit/prodAudit.do?dhpath=10001,21001,0202", this.b10(itemCode), this.a24, this);
    }
    else {
      Tool.at("出错002："+t)
    }
  },
  a24: function (t) {
    if (t.indexOf("预计收入") != -1) {
     
      this.a11("")
    }
    else
    {
      Tool.at("xxxxxxxx"+t)
    }
  },
  a25: function (hide, err) {
    let sql1 = 'update @.pro set @.hide=' + hide + ',@.err=' + Tool.rpsql(err) + ' where @.proid=\'' + this.obj.Barr.proid + '\'';
    let str = '<r: db="sqlite.aliexpress">' + sql1 + '</r:>';
   Tool.ajax.a01( str,1,this.a11,this)
  },
  a016: function (fromid) {
    
    //let oo=[]
    //eval("oo="+t)
    //this.a16(oo.data)

    let sql1 = 'update @.proupdhgate set @.fromid=' + fromid + ',@.proStatus=40 where @.proid=\'' + this.obj.Barr.proid + '\'';
    let str = '<r: db="sqlite.aliexpress">' + sql1 + '</r:>';
   Tool.ajax.a01( str,1,this.a11,this)
  },
  b01: function () {
    return '\
    {\
      <r:pro db="sqlite.aliexpress" size=1 where=" where @.isUpDHgate=0 and @.hide=0 and @.shipToUS=1 and @.type1='+ this.obj.upmode.types + ' order by @.isVideo desc,@.SaleNum desc,@.id desc" page=2>\
		    "id":<:ID/>,\
		    "type":<:type/>,\
		    "unit":"<:unit tag=js/>",\
		    "name":"<:name tag=js/>",\
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
        "typeenname":"<r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:type/>\'" size=1><r:type db="sqlite.aliexpress" where=" where @.fromid=\'<:upid/>\'" size=1><:enname tag=js/></r:type> <:enname tag=js/></r:type>",\
		    "description":"<:description tag=js/>",\
        <r:typebind  db="sqlite.aliexpress" size=1 where=" where @.type=<:type/>">\
          "typebind": "169005010", \
          "typebind_运动": "024026023", \
          "temp_typebind": "<:dhtype/>", \
        </r:typebind>\
			</r:pro>\
			"count":"<@count/>"\
		}';
    //
  },
  b02: function (oo) {
    let arr = ["5% OFF", "10% OFF", "15% OFF", "15% OFF", "20% OFF", "20% OFF", "25% OFF", "25% OFF", "30% OFF", "30% OFF", "35% OFF", "35% OFF", "35% OFF", "40% OFF", "40% OFF", "45% OFF", "45% OFF", "45% OFF", "50% OFF", "50% OFF", "50% OFF", "50% OFF", "50% OFF", "55% OFF", "55% OFF", "55% OFF", "60% OFF", "65% OFF", "70% OFF", "75% OFF", "80% OFF", "85% OFF"]
    //"90% OFF","95% OFF"   这个不要，因为有的活动只能打【1-9.5折】，
    //例1： 当折扣为【5% OFF】时，50%利润 它打9.5折，那20%利润 它小于9.5折。
    //例2： 当折扣为【90% OFF】时，50%利润 它打1折，那20%利润 它小于1折。
    let ran = Math.floor(Math.random() * arr.length), PriceRatio, arrI
    arrI = parseInt(arr[ran].split("%")[0]) * 0.01;
    //1.5  				  表示50%利润
    //PriceRatio		预设【价格倍数】
    PriceRatio = (1.5 / (1 - arrI)).toFixed(2);
    //产品零售价格或批发区间价格不可低于该类目最低价格限制US 0.01 $
    //if ((oo.minprice +(oo.minprice*0.2)) * PriceRatio / oo.lotNum >= 0.01) { break; }
    $("#body").html('\
    <tr><td class="w150 right">最小价格：</td><td>' + oo.minprice + '</td></tr>\
    <tr><td class="right">每包件数：</td><td>' + oo.lotNum + '</td></tr>\
    <tr><td class="right">预设【价格倍数】：</td><td>' + PriceRatio + ' (' + arr[ran] + ')</td></tr>')
    return PriceRatio;
  },
  //敦煌所有属性
  b03: function (typebind) {
    return '[0\
    <r:attr db="sqlite.dhgate" where=" where @.cateId=\''+ typebind + '\' order by @.sort,@.id asc" size=40>,\
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
    //attr.name      属性英文名
    //attr.nameCn  	 属性中文名
    //attr.required  是否必填
    //attr.isother   是否有other属性值
    //attr.defined   属性的属性值是否可以自定义修改
    //attr.buyAttr   是否购买属性（购买时，必选项）
    //attr.ischild   是否子属性（好加事件）
    //attr.attrId    属性ID
    //attr.type      DH:1:多选框 2:下拉框 4:字符型输入框 5:数值型输入框
    //attr.js    	   js代码  
  },
  //商品详情
  b04: function (proid) {
    return '{\
    <r:prodes db="sqlite.aliexpress_prodes/' + Tool.pronum(proid,50) + '" where=" where @.proid=\'' + proid + '\'" size=1>\
      "aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
			"HistoryPrice":<:HistoryPrice/>,\
			"aeopAeProductPropertys":<:aeopAeProductPropertys/>,\
      "DHpicB":<:DHpicB tag=0/>,\
      "DHattrPicB":<:DHattrPicB tag=0/>,\
      "DHdes":<:DHdes tag=json/>,\
      "des":<:des tag=json/>\
    </r:prodes>}'
  },
  b05: function () {
    return [
      {
        "name": "verifyCode",
        "value": "pp34"
      },
      {
        "name": "cpsAgreeStatus",
        "value": "1"
      },
      {
        "name": "productJoinCps",
        "value": "0"
      },
      {
        "name": "firstCPSJoinStatus",
        "value": "0"
      },
      {
        "name": "secondCPSJoinStatus",
        "value": ""
      },
      {
        "name": "userCPSBehaviorRecord",
        "value": "0"
      },
      {
        "name": "isOverseasWarehouseSeller",
        "value": ""
      },

      {
        "name": "gtin",
        "value": ""
      },
      {
        "name": "brandid",
        "value": "99"
      },
      {
        "name": "brandValid",
        "value": ""
      },
      {
        "name": "brandName",
        "value": ""
      },
      {
        "name": "functionname_avim",
        "value": "avim"
      },
      {
        "name": "imagebannername_avim",
        "value": ""
      },
      {
        "name": "chooseCustomized",
        "value": "0"
      },
      {
        "name": "noSpecWholeSaleIncome",
        "value": ""
      },
      {
        "name": "cateMinPrice",
        "value": "1.0"
      },
      {
        "name": "noSpecPrice",
        "value": "11.00"
      },
      {
        "name": "minAkPrice",
        "value": ""
      },
      {
        "name": "maxAkPrice",
        "value": ""
      },
      {
        "name": "measureid",
        "value": "00000000000000000000000000000003"
      },
      {
        "name": "sortby",
        "value": "1"
      },
      {
        "name": "packquantity",
        "value": "1"
      },
      {
        "name": "inventoryStatus",
        "value": "1"
      },
      {
        "name": "subtractStockType",
        "value": "1"
      },
      {
        "name": "inventoryLocation",
        "value": "CN"
      },
      {
        "name": "inventory",
        "value": "11"
      },
      {
        "name": "proLeadingtime",
        "value": "4"
      },
      {
        "name": "proLeadingtime",
        "value": ""
      },
      {
        "name": "price",
        "value": ""
      },
      {
        "name": "leadingtime",
        "value": ""
      },
      {
        "name": "minbuyernum",
        "value": "1"
      },
      {
        "name": "maxbuyernum",
        "value": "100000"
      },
      {
        "name": "prodcode",
        "value": ""
      },
      {
        "name": "setdiscounttype",
        "value": "1"
      },
      {
        "name": "skuCode",
        "value": ""
      },
      {
        "name": "s_albums_winid",
        "value": "2e531081-b405-4711-a1d4-09957ad0c19e"
      },
      {
        "name": "functionname",
        "value": "albu"
      },
      {
        "name": "imagebannername",
        "value": ""
      },
      {
        "name": "supplierid",
        "value": "ff8080815fbe392b01608264ffbc779e"
      },
      {
        "name": "waterMark",
        "value": ""
      },
      {
        "name": "imgtoken",
        "value": "-hwBEsUCl5XyIYsFzQ8sOUKOd4UeTq1PU03y3-Ryx369csJKcagjax3ITeT1bBPsm15SvLgyphrdlcDEEKsw6lhfnPsOSZOSY_8yF9PgrTU"
      },
      {
        "name": "oldproduct",
        "value": "0"
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/336c9152-acec-4973-97b5-16feff08c567.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "72a812925c5d7444fa03e2ec254e595e"
      },
      {
        "name": "inp_picAIScore",
        "value": "100.0"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/0f273d9a-96a2-43dd-b78c-832acba27e8d.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "924d62f94efb57d19c1b81ef31b71803"
      },
      {
        "name": "inp_picAIScore",
        "value": "99.94"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/c81cf68e-ebba-4591-9baa-ca134c669be5.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "665d006b4f1bba260d4fcc7305d12ee9"
      },
      {
        "name": "inp_picAIScore",
        "value": "99.44"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/84fb2e3e-ed77-4db1-8134-2951d6406ac5.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "489dbdef069befb5a1473a1ff9453cd2"
      },
      {
        "name": "inp_picAIScore",
        "value": "93.7"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/3ed21ec8-95ef-4c4c-917f-73ef031235d7.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "2774eb13f26ffe55641d05acc505ebae"
      },
      {
        "name": "inp_picAIScore",
        "value": "99.99"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/08/17301ffa-03c7-4011-af03-b92058aab870.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "f31a2c963c03e11c0da2388a404a211d"
      },
      {
        "name": "inp_picAIScore",
        "value": "95.19"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/07/f0d7c811-73c3-4a63-aff8-b172faf1db3b.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "9af5c6ddf85250d9ccef4667f6248d16"
      },
      {
        "name": "inp_picAIScore",
        "value": "98.81"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "inp_imgurl",
        "value": "f3/albu/km/l/07/e9e5ab33-3526-4c1f-b72f-b4eb472d3f7d.jpg"
      },
      {
        "name": "inp_imgmd5",
        "value": "7f228698d54b97603697b9d8c430c276"
      },
      {
        "name": "inp_picAIScore",
        "value": "84.52"
      },
      {
        "name": "inp_picAItype",
        "value": "0"
      },
      {
        "name": "inp_width",
        "value": ""
      },
      {
        "name": "inp_height",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "pu_imgurl",
        "value": ""
      },
      {
        "name": "pu_imgmd5",
        "value": ""
      },
      {
        "name": "pu_localfilename",
        "value": ""
      },
      {
        "name": "pu_imgsize",
        "value": ""
      },
      {
        "name": "pu_state",
        "value": ""
      },
      {
        "name": "puw_albums_winid",
        "value": "2e531081-b405-4711-a1d4-09957ad0c19e"
      },
      {
        "name": "current_oper_index",
        "value": "1"
      },
      {
        "name": "current_oper_imgurls",
        "value": ""
      },

      {
        "name": "vedio",
        "value": "1"
      },
      {
        "name": "videoId",
        "value": ""
      },
      {
        "name": "taskId",
        "value": ""
      },
      {
        "name": "videoName",
        "value": ""
      },
      {
        "name": "videoIntroduction",
        "value": ""
      },
      {
        "name": "timeStamp",
        "value": "1678871221"
      },
      {
        "name": "cloudvToken",
        "value": "576ffad8af0b0d6e3f052efe8c579d18"
      },
      {
        "name": "issample_adult",
        "value": "3"
      },
      {
        "name": "productgroupid",
        "value": ""
      },
      {
        "name": "shortDesc1",
        "value": "carabiner clip buy carabiner clip with and return online carabiner clip is durable for long lasting use find products of with high quality"
      },
      {
        "name": "shortDesc2",
        "value": ""
      },
      {
        "name": "shortDesc3",
        "value": ""
      },
      {
        "name": "shortDesc4",
        "value": ""
      },
      {
        "name": "shortDesc5",
        "value": ""
      },
      {
        "name": "productHtmlmodelid",
        "value": "251827917391675392"
      },
      {
        "name": "productweight",
        "value": "0.1"
      },
      {
        "name": "baseqt",
        "value": ""
      },
      {
        "name": "stepqt",
        "value": ""
      },
      {
        "name": "stepweight",
        "value": ""
      },
      {
        "name": "sizelen",
        "value": "10.0"
      },
      {
        "name": "sizewidth",
        "value": "10.0"
      },
      {
        "name": "sizeheight",
        "value": "10.0"
      },
      {
        "name": "shippingmodelname",
        "value": "F1670201705024"
      },
      {
        "name": "shippingScore",
        "value": "3"
      },
      {
        "name": "isPostAriMail",
        "value": "0"
      },
      {
        "name": "saleTemplateId",
        "value": "433348661851148288"
      },
      {
        "name": "saleTemplateName",
        "value": "默认模板"
      },
      {
        "name": "rid",
        "value": "7iZvJrRaxalAE4xgr"
      },
      {
        "name": "requestid",
        "value": ""
      },
      {
        "name": "productid",
        "value": "8aaaaf9c86da85760186e3a1e8e6554a"
      },
      //{
      //  "name": "itemcode",
      //  "value": "850161907"
      //},
      {
        "name": "catepubid",
        "value": "024002"
      },
      {
        "name": "vasItemcode",
        "value": ""
      },

      {
        "name": "prospeclist",
        "value": "[]"
      },
      {
        "name": "shippingmodelid",
        "value": "8aaa8e8f8418a04d0184dffbc7980afe"
      },
      {
        "name": "isquickup",
        "value": "0"
      },
      {
        "name": "isprivate",
        "value": "0"
      },
      {
        "name": "viewSource",
        "value": ""
      },
      {
        "name": "repeatGroupId",
        "value": ""
      },
      {
        "name": "textPattern",
        "value": "%5E%5BA-Za-z0-9%25%23%3B%26%20'.%2F%CE%A9%C2%B2%C2%B3%5C%22%C2%B0%E2%89%A4%E2%89%A5%3E%3C%5C-%5D%2B%24"
      },
      {
        "name": "oldSkuInfo",
        "value": "{\"prodInvenLocationList\":[{\"createDate\":null,\"invenLocationId\":null,\"inventoryLocation\":\"CN\",\"inventoryLocationEn\":\"China\",\"inventoryLocationName\":\"中国\",\"itemcode\":850161907,\"leadingTime\":4,\"skuInfoList\":null,\"sortVal\":null,\"supplierId\":\"ff8080815fbe392b01608264ffbc779e\",\"updateDate\":null}],\"skuInfoList\":[{\"attrList\":[{\"attrId\":\"8888\",\"attrValCode\":\"CN\",\"attrValName\":\"中国\",\"attrVid\":\"6778\",\"type\":\"4\"}],\"id\":\"05014f1b4991cc7fd46320dec75084a8_CN\",\"oriPrice\":\"\",\"preWarehouseInfo\":null,\"price\":\"11.00\",\"realIncome\":null,\"skuCode\":\"\",\"status\":\"1\",\"stock\":\"11\"}]}"
      },
      {
        "name": "noStockLeadingtime",
        "value": "4"
      },
      {
        "name": "forEditOldCatePubid",
        "value": "024002"
      },
      {
        "name": "proSkuInfo",
        "value": "{\"prodInvenLocationList\":[{\"class\":\"###\",\"inventoryLocation\":\"CN\",\"leadingTime\":\"4\"}],\"skuInfoList\":[{\"class\":\"#\",\"attrList\":[{\"attrId\":\"8888\",\"attrVid\":\"CN\",\"type\":\"1\",\"class\":\"##\"}],\"status\":\"1\",\"price\":\"11.00\",\"stock\":\"11\",\"skuCode\":\"\",\"id\":\"8888_CN\"}]}"
      },
      {
        "name": "prodCustomInfo",
        "value": "{}"
      },
      {
        "name": "shiptoSkuInfo",
        "value": ""
      },
      {
        "name": "specselfDef",
        "value": "[]"
      },
      {
        "name": "discountRange",
        "value": "[{\"startqty\":\"1\",\"discount\":\"0\"}]"
      },
      {
        "name": "productInventorylist",
        "value": "[{\"class\":\"com.dhgate.syi.model.ProductInventoryVO\",\"productInventoryId\":\"\",\"quantity\":231,\"hasBuyAttr\":\"0\",\"hasSaleAttr\":\"0\",\"commonSpec\":\"0\",\"supplierid\":\"\"}]"
      },
      {
        "name": "sourceItemcode",
        "value": ""
      },
      {
        "name": "sourceSiteId",
        "value": ""
      },
      {
        "name": "claimSource",
        "value": ""
      },
      {
        "name": "claimMethod",
        "value": ""
      },
      {
        "name": "attrlist",
        "value": "[{\"class\":\"com.dhgate.syi.model.ProductAttributeVO\",\"attrId\":1127178,\"attrName\":\"BRAND\",\"isbrand\":\"1\",\"valueList\":[{\"class\":\"com.dhgate.syi.model.ProductAttributeValueVO\",\"attrValId\":0,\"lineAttrvalName\":\"\",\"lineAttrvalNameCn\":\"\",\"iscustomsized\":\"0\",\"picUrl\":\"\",\"brandValId\":\"\"}]}]"
      },
      {
        "name": "tdProSaleSetId",
        "value": ""
      },
      {
        "name": "sourcetype",
        "value": "8"
      },
      {
        "name": "recruitActivityId",
        "value": ""
      },
      {
        "name": "recruitProdPreId",
        "value": ""
      },
      {
        "name": "attrGroupDetail",
        "value": ""
      },
      {
        "name": "cmSzTableJson",
        "value": ""
      },
      {
        "name": "cmszAdviseTableJson",
        "value": ""
      },
      {
        "name": "szTemplateClassId",
        "value": ""
      },
      {
        "name": "prodDraftId",
        "value": ""
      },
      {
        "name": "isDisableCategoryForGS",
        "value": ""
      },
      {
        "name": "claimItemcode",
        "value": ""
      },
      {
        "name": "isCustomCatepubid",
        "value": "false"
      },
      {
        "name": "customType",
        "value": ""
      },
      {
        "name": "preWarehouse",
        "value": ""
      },
      {
        "name": "preWarehouseLocations",
        "value": ""
      }      
    ]
  },
  b06: function () {
    let arr = this.obj.DH.concat(this.b05()), nArr = [];
    for (let i = 0; i < arr.length; i++) {
      nArr[i] = arr[i].name + "=" + encodeURIComponent(arr[i].value)
    }
    return nArr.join("&")
  },
  //其它-知道是什么
  b07: function (productgroupid, shippingmodelid, saleTemplateId, itemcode, catepubid) {
    let arr = [{
      "name": "timeStamp",
      "value": Tool.gettime("")
    },
    {
      "name": "productgroupid",//商品分组ID
      "value": productgroupid
    },
    {
      "name": "shippingmodelid",//运费模板ID
      "value": shippingmodelid
    },
    {
      "name": "gtin",//全球贸易商品代码，用于以不重复的方式标识商品，提供此类标识码可以让您的商品更方便用户查找，更有机会获得免费的站内外流量。
      "value": ""
    },
    {
      "name": "brandid",//品牌ID
      "value": "99"
    },
    {
      "name": "brandValid",//品牌值ID
      "value": ""
    },
    {
      "name": "brandName",//品牌名称
      "value": ""
    },
    {
      "name": "customType",//当customType（定制类型不为空并且大于0）卖家已定制过，需要显示定制的--默认选择否，不展示定制类型
      "value": ""
    },
    {
      "name": "isCustomCatepubid",//是否支持定制
      "value": "false"
    },
    {
      "name": "prodDraftId",//产品草稿ID
      "value": ""
    },
    ///////属性图片上传入口参数/////////////
    {
      "name": "functionname_avim",//功能名   	不可以为空
      "value": "avim"
    },
    {
      "name": "imagebannername_avim",//水印名  现在是用户名
      "value": ""
    },
    /////////////////////////////////////////
    {
      "name": "videoId",//视频ID
      "value": ""
    },
    {
      "name": "taskId",//任务Id
      "value": ""
    },
    {
      "name": "videoName",//视频名称
      "value": ""
    },
    {
      "name": "videoIntroduction",//视频详情
      "value": ""
    },
    {
      "name": "discountRange",//折扣阶梯
      "value": "[{\"startqty\":\"1\",\"discount\":\"0\"},{\"startqty\":\"3\",\"discount\":\"2\"},{\"startqty\":\"5\",\"discount\":\"3\"},{\"startqty\":\"7\",\"discount\":\"4\"}]"
    },
    {
      "name": "minbuyernum",//最小购买量
      "value": "1"
    },
    {
      "name": "maxbuyernum",//最大购买量
      "value": "100000"
    },
    {
      "name": "saleTemplateId",//售后服务
      "value": saleTemplateId
    },
    //下面为，不加也没事
    //{
    //  "name": "productid",
    //  "value": "2c93644f84cd3dbf0184ec5ad512685b"
    //},
    //{
    //  "name": "itemcode",
    //  "value": itemcode
    //},
    {
      "name": "catepubid",
      "value": catepubid
    },
   
    ];
    Tool.bodyAppend(arr);
    return arr;
  },

  
  b10:function(itemcode) {
    return [
              {
                "name": "prodAuditForm.changeProdGroupId",
                "value": ""
              },
              {
                "name": "prodAuditForm.dispatcheOperation",
                "value": "productDownShelf"
              },
              {
                "name": "prodAuditForm.hasOperationTip",
                "value": "0"
              },
              {
                "name": "prodAuditForm.operationTip",
                "value": ""
              },
              {
                "name": "prodAuditForm.shippingmodelid",
                "value": ""
              },
              {
                "name": "prodAuditForm.selectedItemcode",
                "value": itemcode
              },
              {
                "name": "prodAuditForm.sortType",
                "value": "asc"
              },
              {
                "name": "prodAuditForm.sortField",
                "value": ""
              },
              {
                "name": "prodAuditForm.isNewVersion",
                "value": ""
              },
              {
                "name": "prodAuditForm.searchUsedFlag",
                "value": ""
              },
              {
                "name": "prodAuditForm.hasGoldStallAuthority",
                "value": ""
              },
              {
                "name": "prodAuditForm.isStudentSupplier",
                "value": "0"
              },
              {
                "name": "prodAuditForm.totalShelfProductNum",
                "value": "233"
              },
              {
                "name": "prodAuditForm.isHonestSeller",
                "value": "0"
              },
              {
                "name": "prodAuditForm.isMoreSearchConditions",
                "value": "1"
              },
              {
                "name": "csrftoken",
                "value": "cgr687iv3g"
              },
              {
                "name": "isOverseasWarehouseSeller",
                "value": ""
              },
              {
                "name": "prodAuditForm.productName",
                "value": ""
              },
              {
                "name": "prodAuditForm.itemcode",
                "value": ""
              },
              {
                "name": "prodAuditForm.skuCode",
                "value": ""
              },
              {
                "name": "prodAuditForm.selectedProdGroupId",
                "value": ""
              },
              {
                "name": "prodAuditForm.operateDateBeginStr",
                "value": ""
              },
              {
                "name": "prodAuditForm.operateDateEndStr",
                "value": ""
              },
              {
                "name": "prodAuditForm.prodSupportPlan",
                "value": ""
              },
              {
                "name": "prodAuditForm.myshopSale",
                "value": ""
              },
              {
                "name": "prodAuditForm.sourceType",
                "value": ""
              },
              {
                "name": "prodAuditForm.googleStatus",
                "value": "0"
              },
              {
                "name": "prodAuditForm.ifShipToPrice",
                "value": ""
              },
              {
                "name": "prodAuditForm.itemcodeChecked",
                "value": itemcode
              },
              {
                "name": "selectpagesize",
                "value": "60"
              },
              {
                "name": "page",
                "value": ""
              }
            ]
  },

}
fun.a01();