 'use strict';
var fun=
{
	obj:
	{
		A1:1,A2:0,Aarr:[],
		where:" where @.upshelf&gt;0 and @.time6<="+(Tool.gettime(Tool.userDate13(Date.now()))+60*60*24*7),
		username:"",password:"",fromid:0,
		nowDate:0,endDate:0,
		promoId:0,//活动选商品要用
		time6:0,
		newTime:Tool.gettime(Tool.userDate13(Date.now()))+ 60*60*24//因为每个活动都是从00:0:00到23:59:59
	},
  a01:function()
  {
    let html=Tool.header("正在做活动【满几件打几折】（活动一次7天）...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
        <tr><td class="right">上次活动结束时间：</td><td id="time6" colspan="2"></td></tr>\
        <tr><td class="right">活动时间：</td><td id="time" colspan="2"></td></tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
				</tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
	a02:function()
	{
    gg.isRD(this.a03,this);
  },
	a03:function()
	{
    Tool.getDHuser(this.a04,this);
  },
	a04:function()
	{
		$("#username").html(this.obj.username);
    $("#time6").html(Tool.js_date_time2(this.obj.time6));		
		this.obj.nowDate=this.obj.time6<this.obj.newTime?this.obj.newTime:this.obj.time6//;//要加一天，是因为不加做了不活动
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
	a05:function()
	{
		if(this.b03())//是否在7天以内做活动，且修复活动开始时间
		{
			this.obj.endDate = this.obj.nowDate+60*60*24*7-1;//7天
			$("#time").html("从【"+Tool.js_date_time2(this.obj.nowDate)+"】开始到【"+Tool.js_date_time2(this.obj.endDate)+"】结束。")
			this.a06();
		}
  },
	a06:function()
	{
    $("#state").html("正在验证登陆。。。");
    Tool.verifyUser.a01(this.a07,this);
  },
  a07:function()
  {
		let url="http://seller.dhgate.com/promoweb/pieceDiscount/createPieceDiscount.do";
    $("#url").html('post 提交中。。。');
    $("#state").html("正在【1.设置活动信息】。。。");
		let oo={
		createPromoRequest:
		JSON.stringify({
				"promoName":Tool.userDate13(this.obj.nowDate*1000,"-")+"-7天-满2件8折",
				"startDate":Tool.userDate13(this.obj.nowDate*1000,"-"),
				"endDate":Tool.userDate13(this.obj.endDate*1000,"-"),
				"startHour":Tool.userTime13(this.obj.nowDate*1000),
				"endHour":Tool.userTime13(this.obj.endDate*1000),
				"promoPolicy":3
			})
		}
		gg.postFetch(url,oo,this.a08,this);
  },
  a08:function(oo)
  {
		//{"data":12088066,"message":"success","serverTime":1664365941566,"state":"00000"}
		if(oo.state=="00000")
		{
			this.obj.promoId=oo.data
			this.a09();
		}
		else
		{
			$("#state").html("创建活动失败，程序终止。");
			Tool.pre(oo);
		}
  },
  a09:function()
  {
		//用update为了是先复位活动商品。
    let html='\
    [0<r: db="sqlite.aliexpress">update @.proupdhgate set @.isActivity1=0 where @.isActivity1=1</r:>\
    <r:proupdhgate size=100 db="sqlite.dhgate" where=" where @.upuserid='+this.obj.fromid+' and @.status=0 order by @.SaleNum desc">,\
   "<:fromid/>"\
    </r:proupdhgate>]'
		$("#state").html("正在准备100条数据。。。");
   Tool.ajax.a01(html,1,this.a10,this)
  },
  a10:function(oo)
  {
		oo.shift();
		this.obj.Aarr=oo;
		let url="https://seller.dhgate.com/promoweb/pieceDiscount/saveChooseProduct.do";	
		$("#url").html(url+'[post]');
		let data={
			saveRequest:
			JSON.stringify(
			{
				promoId:""+this.obj.promoId,
				itemList:oo
			})
		}
		//saveRequest: {"promoId":"12537755","itemList":["826032223","826033000"]}
		$("#state").html("3.设置促销信息");
		gg.postFetch(url,data,this.a11,this);
  },
  a11:function(oo)
  {
		//{"data":true,"message":"success","serverTime":1664416097547,"state":"00000"}
		if(oo.data==true)
		{
			let url="https://seller.dhgate.com/promoweb/pieceDiscount/addProductToPromo.do";	
			$("#url").html('<a href="'+url+'" target="_blank">'+url+'[post]</a>');
			let data={addRequest:
				JSON.stringify(
				{
					promoId:this.obj.promoId,
					discountList:[{piecesNumber:"2",discountRate:"8"}]
				})
			}
			$("#state").html("4.完成");
			gg.postFetch(url,data,this.a12,this);
		}
		else
		{$("#state").html("3.设置促销信息，失败，程序终止。");Tool.pre(oo);}
  },
  a12:function(oo)
  {
		//{"data":"success","message":"success","serverTime":1664417022555,"state":"00000"}
		if(oo.data=="success")
		{
			let txt='<r: db="sqlite.dhgate">update @.seller set @.time6='+(this.obj.endDate+1)+' where @.fromid='+this.obj.fromid+'</r:><r: db="sqlite.aliexpress">update @.proupdhgate set @.isActivity1=1 where @.fromid in('+this.obj.Aarr.join(",")+')</r:>'
			Tool.ajax.a01(txt,1,this.a13,this)
		}
		else
		{$("#state").html("4.完成，失败，程序终止。");Tool.pre(oo);}
  },
  a13:function(t)
  {
		if(t=="")
		{
			this.obj.A1++;
			this.obj.Aarr=[];
			this.obj.username=""
			this.obj.password=""
			this.obj.fromid=0
			this.obj.nowDate=0
			this.obj.endDate=0
			this.obj.promoId=0
			this.obj.time6=0
			this.a03();
		}
		else
		{alert("出错001");}
  },
  b03:function()//是否在7天以内做活动，且修复活动开始时间
	{
    let isbool=false
    if(this.obj.nowDate<this.obj.newTime)
		{this.obj.nowDate=this.obj.newTime;isbool=true;}
		else if(this.obj.nowDate<=this.obj.newTime+ 60*60*24*7)//7天
		{isbool=true;}
		return isbool;
  }
}
fun.a01();