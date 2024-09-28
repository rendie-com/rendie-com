'use strict';
var fun =
{
  //注意事项：
  //目前不能按销量做活动，如果想，就要一个一个搜索，这样做太慢了。现在的做法是翻前面4页的数据。
  //什么不能调快？
  //答：被限制了。
  //原因：本地会话中找了没有，cookies中找了没有。没存在本地，存在他的服务器上会话上（错不了）。
  obj:
  {
    A1: 1, A2: 0,
    B1: 1, B2: 2,//分别为：【直接降价】和【打折】
    where: " where @.upshelf&gt;0 and @.time2<" + parseInt((new Date().getTime() + 1000 * 60 * 60 * 24 * 7) / 1000),
    C1: 1, C2: 4, Carr: [],//4页累计40条
    nowDate: "", endDate: "",
    username: "", password: "", fromid: 0,
    time2: 0,
    promoId: 0,//活动ID
    newTime: Tool.gettime(Tool.userDate13(Date.now()))//因为每个活动都是从00:0:00到23:59:59
  },
  a01: function () {
    let html = Tool.header('正在做活动【创建限时限量】...') + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
        <tr><td class="right">上次活动结束时间：</td><td id="time2" colspan="2"></td></tr>\
        <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
        <tr><td class="right">活动进度说明：</td><td colspan="2">【直接降价】和【打折】</td></tr>\
        <tr><td class="right">活动进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
        <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02, this, html);
  },
  a02: function () {
    gg.isRD(this.a03, this);
  },
  a03: function () {
    this.obj._A1 = 1;//因为更新完一个后会少一个，所以每次A1进去时要要为“1”。
    Tool.getDHuser(this.a04, this);
  },
  a04: function () {
    this.obj.time2 = Tool.gettime(Tool.userDate13(this.obj.time2*1000));
    $("#username").html(this.obj.username);
    $("#time2").html(Tool.js_date_time2(this.obj.time2));
    this.obj.nowDate = this.obj.time2 == 0 ? this.obj.newTime : this.obj.time2;
    Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this);
  },
  a05: function () {
    if (this.b03())//是否在7天以内做活动，且修复活动开始时间
    {
      this.obj.endDate = this.obj.nowDate + 60 * 60 * 24 * 2 - 1;//2天
      $("#time").html("从【" + Tool.js_date_time2(this.obj.nowDate) + "】开始到【" + Tool.js_date_time2(this.obj.endDate) + "】结束。")
      this.a06();
    }
    else {

      alert("aaaaaaaaaa---------------a")
    }
  },
  a06: function () {
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a07, this);
  },
  a07: function () {
    Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08A, this, this.a25)
  },
  a08A: function () {
    
    let url = "http://seller.dhgate.com/promoweb/storelimittime/createStep1.do?dhpath=10004,3005";
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    $("#state").html("必须要访问这个链接，否则不能【创建限时限量】。。。");
    gg.getFetch(url,"json", this.a08, this);
  },
  a08: function (t) {


    $("#state").html("正在【创建限时限量】。。。")
    let promoTypeId = this.obj.B1 == 1 ? 10 : 0//【10】直接降价    【0】:打折
    let url = "http://seller.dhgate.com/promoweb/storelimittime/saveStep1.do?promoDto.name=" + (this.obj.B1 == 1 ? "直接降价" : '打折') + "_" + Tool.userDate13(this.obj.nowDate * 1000, "-") + "&startDate=" + Tool.js_date_time2(this.obj.nowDate, "-") + "&endDate=" + Tool.js_date_time2(this.obj.endDate, "-") + "&promoDto.promoTypeId=" + promoTypeId + "&promoDto.promoPolicy=2"
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');

    gg.getFetch(url,"json", this.a09, this);
  },
  a09: function (t) {
    if (t.indexOf('id="promoId"') != -1) {
      this.obj.promoId = Tool.StrSlice(t, 'id="promoId" name="promoId" value="', '"');
      this.a10()
    }
    else if (t.indexOf('店铺促销扣减促销个数和时长-当月扣减失败') != -1) {
      this.obj.B1 = this.obj.B2;
      //this.a23();
      alert("店铺促销扣减促销个数和时长-当月扣减失败")
    } else { alert("出错：" + t); }
  },
  a10: function () {
    Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a11, this, this.a14)
  },
  a11: function () {
    $("#state").html("2.选择产品");
    let url = "http://seller.dhgate.com/promoweb/storelimittime/createStep2.do?&promoId=" + this.obj.promoId + "&from=create&page=" + this.obj.C1
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json", this.a12, this);
  },
  a12: function (t) {
    $("#state").html("（第" + this.obj.C1 + "页）正在【准备商品】。。。");
    let chk = Tool.StrSplits(t, 'data-prono="', '"');
    if (chk.length == 0) {
      $("#state").html("没有可做的[创建限时限量]");
      //this.obj.B1=this.obj.B2;
      //this.a23();
      alert("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }
    else {
      for (let i = 0; i < chk.length; i++) { this.obj.Carr.push(chk[i]); }
      $("#state").html("(第" + this.obj.C1 + "页）限时限量有：" + chk.join(" , "));
      let url = "http://seller.dhgate.com/promoweb/storelimittime/createStep2.do?promoId=" + this.obj.promoId + "&from=create&page=" + this.obj.C1 + "&itemcodes=" + chk.join("&itemcodes=");
      $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
      gg.getFetch(url,"json", this.a13, this);
    }
  },
  a13: function (t) {
    $("#state").html("（第" + this.obj.C1 + "页）已加入...");
    if (t.indexOf("个，还可选择") != -1) {
      this.obj.C1++;
      this.a10();
    }
    else if (t.indexOf('</b>\n																				<span class="disablebtn">') != -1)//表示到了最后一页了
    {
      //this.a16();
      alert("wwwwwwwwwwwwwwwwwwwwww")
    }
    else {
      Tool.at("出错：" + t);
    }
  },
  a14: function () {
    $("#state").html("正在准备提交...");
    let url = "http://seller.dhgate.com/promoweb/storelimittime/createStep3.do?promoId=" + this.obj.promoId + "&from=create&dhpath=10004,30,3005"
    $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
    gg.getFetch(url,"json", this.a15, this);
  },
  a15: function (t) {
    //这个 “t” 有什么用？
    //答：有【90天均价】【当前的卖最高价】在里面。
    if (this.obj.Carr.length == 0) {
      this.a24('');
    }
    else {
      let html = '\
			[0<r: db="sqlite.dhgate">update @.proupdhgate set '+ this.b02() + '=0 where ' + this.b02() + '=1</r:>\
			<r:proupdhgate db="sqlite.dhgate" size=40 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where a.@.fromid in('+ this.obj.Carr.join(",") + ') and a.@.upuserid=' + this.obj.fromid + '">,\
			{\
				"fromid":"<:a.@.fromid/>",\
				"ratio":<:a.@.ratio/>,\
				"price":<:b.@.price/>\
			}</r:proupdhgate>]'
      $("#state").html("正在准备本地数据...");
     Tool.ajax.a01( html, 1,this.a16, this, t)

    }
  },
  a16: function (oo, t) {
    if (this.obj.Carr.length == oo.length - 1) {
      $("#state").html("3.设置促销规则");
      let chk = Tool.StrSplits(t, '											                                            <tr data-same-product="', '"')//敦煌产品ID
      let avprice = Tool.StrSplits(t, '<span class="j-avprice colorf50">$', '</span>')//90天均价
      let allprice = Tool.StrSplits(t, '<li>$ ', ')')//当前的卖最高价组
      this.a17(oo, chk, avprice, allprice);
    }
    else {
      let nArr = [], isbool = true;
      for (let i = 0; i < this.obj.Carr.length; i++) {
        isbool = true;
        for (let j = 1; j < oo.length; j++) {
          if (this.obj.Carr[i] == oo[j].fromid) { isbool = false; break; }
        }
        if (isbool) { nArr.push(this.obj.Carr[i]); }//找不到，就进来
      }
      $("#state").html("DH的商品本地没有，无法继续...<hr/>【敦煌:" + this.obj.Carr.length + " 个】<hr/>【本地:" + (oo.length - 1) + "个】<hr/>本地没有：" + Tool.pre(nArr));
      Tool.pre([this.obj.Carr, "----------", oo])
    }
  },
  a17: function (oo, chk, avprice, allprice) {
    let maxprice = [], minprice = []
    for (let i = 0; i < allprice.length; i++) {
      if (allprice[i].indexOf("(1-2") != -1) {
        allprice[i] = allprice[i].substr(0, allprice[i].indexOf("(") - 1);
        if (allprice[i].indexOf("-") != -1) { allprice[i] = allprice[i].substr(allprice[i].indexOf("-") + 2); }
        maxprice.push(parseFloat(allprice[i]))
      }
      else if (allprice[i].indexOf("(30+") != -1) {
        allprice[i] = allprice[i].substr(0, allprice[i].indexOf("(") - 1);
        if (allprice[i].indexOf("-") != -1) { allprice[i] = allprice[i].substr(0, allprice[i].indexOf("-")); }
        minprice.push(parseFloat(allprice[i]))
      }
    }
    ////////////////////////////////////////
    if (chk.length == avprice.length && avprice.length == maxprice.length && maxprice.length == minprice.length) {
      this.a18(chk, maxprice, avprice, minprice, oo);
    }
    else { $("#state").html("商品【编码】的数量必需与商品【价格】的数量一样，否则就是DH改版了。" + chk.length + "----" + avprice.length + "----" + maxprice.length); }
  },
  a18: function (chk, maxprice, avprice, minprice, arr) {
    $("#state").html("已获得该页面数据。。。");
    let deliverData = [], errid = [], price1, price2, price3, price4, nArr = [];
    for (let k = 0; k < chk.length; k++) {
      price1 = this.b01(arr, chk[k]);//【计划卖价】或【计划折扣】,只要20%的利润。
      if (price1 == 0) {
        alert("不可能找不到:" + arr.length);
      }
      else {
        if (this.obj.B1 == 1)//直降范围
        {
          price2 = parseInt(minprice[k] - price1);//应直降多少
          price3 = (maxprice[k] - price2).toFixed(2)
          price4 = (minprice[k] - price2).toFixed(2)
          //          DH商品编码:chk[k]
          //          DH最高价:maxprice[k]
          //          DH低高价:minprice[k]
          //          90天均价:avprice[k]
          //          计划卖价:price1
          //          全站降价:(price2-1)
          //          APP降价:price2\
          //          实际APP卖价:高:price3 低:price4

          if (price3 <= parseFloat(avprice[k]) && price2 > 2) {
            deliverData.push(chk[k] + "_" + (price2 - 1) + "_" + parseInt(price2) + "_10_2");
            nArr.push(chk[k])
          }
          else { errid.push(chk[k]); }
        }
        else//打折
        {
          //          DH商品编码:chk[k]
          //          DH最高价:maxprice[k]
          //          DH低高价:minprice[k]
          //          90天均价:avprice[k]
          //          计划折扣:price1
          //          全站折扣:(price1+0.1).toFixed(1)
          //          APP折扣:price1
          //          高:(maxprice[k]*(price1)*0.1).toFixed(2)
          //          低:(minprice[k]*(price1)*0.1).toFixed(2)

          if ((maxprice[k] * (price1) * 0.1).toFixed(2) <= parseFloat(avprice[k])) {
            deliverData.push(chk[k] + "_" + (price1).toFixed(1) + "_" + (price1 + 0.1).toFixed(1) + "_10_2");
            nArr.push(chk[k])
          }
          else { errid.push(chk[k]); }
        }
      }
    }
    this.obj.Carr = nArr;
    this.a19(deliverData, errid)
  },
  a19: function (deliverData, errid) {
    if (errid.length == 0) {
      $("#state").html("开始提交...");
      //////////////////////////////////////////////////////////
      let url = 'http://seller.dhgate.com/promoweb/storelimittime/validate.do?promoId=' + this.obj.promoId + '&deliverData=' + deliverData.join(",")
      $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
      gg.getFetch(url,"json", this.a22, this)
    }
    else {
      this.obj.errid = errid;
      $("#state").html("有错误errid：（" + errid.length + "）" + errid.join(" , "));
      this.a20();
    }
  },
  a20: function () {
    if (this.obj.errid.length == 0) { this.a14(); }
    else {
      $("#state").html("正在删除不合格的商品 (" + this.obj.errid.length + ")");
      let url = "http://seller.dhgate.com/promoweb/storelimittime/cancelone.do?itemcode=" + this.obj.errid[0] + "&promoId=" + this.obj.promoId;
      gg.getFetch(url,"json", this.a21, this);
    }
  },
  a21: function (t) {
    this.obj.errid.shift();
    this.a20();
  },
  /////////////////////////////////////////
  a22: function (oo) {
    if (oo.validate == 1) { this.a23(); }
    else {
      /*
      {
        "result": [
          {
            "errorInfo": "商品编码：543301534,促销价不能高于90天均价哦！"
          }
        ],
        "validate": "0"
      }
      */
      if (oo.result[0].errorInfo.indexOf('设置的直降金额必须必产品最低价小') != -1) {
        Tool.pre(oo)
        /*this.obj.errid=[Tool.StrSlice(t,'temcode":"商品编码:','"')]
        if(this.obj.errid[0])
        {this.a20();}
        else
        {alert("活动创建【失败】");}*/
      }
      else if (oo.result[0].errorInfo.indexOf('商品编码：') != -1) {
        this.obj.errid = [Tool.StrSlice(oo.result[0].errorInfo, '商品编码：', ',')]
        if (this.obj.errid[0]) { this.a20(); }
        else { Tool.pre(["获取商品编码【失败】", oo]); }
      }
      else if (oo.result[0].errorInfo.indexOf('错误信息:未设置折扣') != -1)//抱歉，您没有符合该活动要求的产品'
      {
        alert("aaaaaaaaaaaaaaaaaaa")
        //this.a23();
      }
      else {
        Tool.pre(["出错02：", oo])
      }
    }

  },
  a23: function () {
    $("#state").html("记录做了什么活动。。。");
    let txt = '<r: db="sqlite.aliexpress">update @.proupdhgate set ' + this.b02() + '=1 where @.fromid in(' + this.obj.Carr.join(",") + ')</r:>'
   Tool.ajax.a01( txt,1,this.a24,this)
  },
  a24: function (t) {
    if (t == "") {
      this.obj.B1++;
      this.obj.promoId = 0;
      this.obj.C1 = 1;
      this.obj.Carr = []
      $("#C1").css("width", "0%");
      $("#C1,#C2").html("")
      $("#state").html("准备下一个活动...");
      this.a07()
    }
    else { alert("出错001"); }
  },
  //////////////////////////////////////////////////////////////////////// 
  a25: function () {
    $("#state").html("正在更新时间...");
    let txt = '""<r: db="sqlite.dhgate">update @.seller set @.time2=' + this.obj.endDate + ' where @.fromid=' + this.obj.fromid + '</r:>'
   Tool.ajax.a01( txt,1,this.a28,this)
  },
  a28: function () {
    if (!this.b03()) this.obj.A1++;
    this.obj.B1 = 1;
    this.obj.password = ""
    this.obj.fromid = 0
    this.obj.nowDate = 0
    this.obj.endDate = 0
    this.obj.time2 = 0
    $("#B1").css("width", "0%");
    $("#B1,#B2").html("")
    $("#state").html("正在准备下一个账号...");
    this.a03();
  },
  b01: function (arr, DHid)//【计划卖价】或【计划折扣】,只要20%的利润。
  {
    let price1 = 0;
    for (let j = 1; j < arr.length; j++) {
      if (DHid == arr[j].fromid) {
          if (this.obj.B1 == 1) {
              price1 = (arr[j].price) * 1.20
          }
        else
        {
            price1 = (1.20 / arr[j].ratio) * 10;
        }
        break;
      }
    }
    return price1;
  },
  b02: function () {
    let str = "@.isActivity"
    if (this.obj.B1 == 1) { str += '3'; }
    else if (this.obj.B1 == 2) { str += '4'; }
    else { alert("B1的值不对。"); }
    return str
  },
  b03: function ()//是否在7天以内做活动，且修复活动开始时间
  {
    let isbool = false
    if (this.obj.nowDate < this.obj.newTime) { this.obj.nowDate = this.obj.newTime; isbool = true; }
    else if (this.obj.nowDate <= this.obj.newTime + 60 * 60 * 24 * 7)//7天
    { isbool = true; }
    return isbool;
  }
}
fun.a01();