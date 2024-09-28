var fun={
	obj: {
		A1: 1, A2: 0, Aarr: [],
		where: "" 
	},
	token: "",
  a01:function()
  {
    let html=Tool.header('正在获取【运费模板】。。。')+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="right w100">账号：</td><td id="username" colspan="2"></td></tr>\
        <tr><td class="right w100">账号进度：</td>'+ Tool.htmlProgress('A') +'</tr>\
        <tr><td class="right">提示：</td><td id="state" colspan="2">正在获取token...</td></tr>\
      </tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
	},
  a02:function()
	{
		Tool.getDHuser(this.a03, this);//获得账号等信息
	},
  a03:function()
	{
		$("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this);
	},
  a04:function()
	{
		Tool.GetToken(this, this.a05);
	},
	a05: function () {
		let oo={}
		oo.access_token=this.token
		oo.method="dh.shipping.template.list"
		oo.timestamp=new Date().getTime()
		oo.v="2.0"
		$("#state").html('正在获取【运费模板】。。。');
		gg.postFetch("http://api.dhgate.com/dop/router", oo, this.a06, this)
	},
	a06:function(oo)
  {
		$("#state").html('正在更新【运费模板】。。。');
		let str = '<r: db="sqlite.dhgate">update @.seller set @.shippingModel=' + Tool.rpsql(JSON.stringify(oo.shippingModelList)) + ' where @.fromid=' + this.obj.fromid + '</r:>';
		Tool.ajax.a01(str,1,this.a07,this)
	},
	a07: function (t)
  {
		if(t=="")
		{
			this.obj.A1++;
			this.token = "";
			this.obj.fromid = 0;
			this.obj.username = "";
			this.a02();
		}
		else
		{Too.at("出错："+t);}
  }
}
fun.a01();
//a06:function(oo)
 // {

	//	this.obj.Aarr=oo.shippingModelList;
	//	this.obj.A2=this.obj.Aarr.length;
	//	//this.a06();
	//},// a006:function()
 // {
	//	if(this.obj.A1<=this.obj.A2)
	//	{
	//		let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
	//		$("#A1").html(p1+"%").css("width",p1+"%");
	//		$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
	//		/////////////////////////////////
	//		let oo=this.obj.Aarr[this.obj.A1-1]
	//		$("#modelName").html(oo.modelName);
	//		$("#shippingTempId").html(oo.shippingTempId);
	//		if(this.obj.Aarr[this.obj.A1-1].modelType=="11")
	//		{
	//			this.a07();
	//		}
	//		else
	//		{this.obj.A1++;this.a06();}
	//		///////////////////////////////////////////
	//	}
	//	else
	//	{
	//		this.a09();
	//	}
	//},
 // a007:function()
 // {
	//	let str='\
	//	{\
	//		<r:freight db="sqlite.aliexpress" size=1 where=" where @.freid=\''+this.obj.Aarr[this.obj.A1-1].modelName+'\'">\
	//			"upNum2":<:shopid Fun=Db(sqlite.aliexpress,select count(1) as total from @.pro a where a.@.shopid=$1 and a.@.hide=0 and not EXISTS(select 0 from @.proupdhgate b where b.@.upUserID='+obj.arr[5]+' and b.@.upFreightId=\''+this.obj.Aarr[this.obj.A1-1].shippingTempId+'\' and a.@.proid=b.@.proid),count)/>,\
	//			"upNum4":<:shopid Fun=Db(sqlite.aliexpress,select count(1) as total from @.pro where @.shopid=$1 and @.hide>0,count)/>,\
	//			"upNum5":<:shopid Fun=Db(sqlite.aliexpress,select count(1) as total from @.pro where @.shopid=$1,count)/>,\
	//		</r:freight>\
	//		"upNum1":<.Db(sqlite.aliexpress,select count(1) from @.proupdhgate where @.upUserID='+obj.arr[5]+'  and @.upFreightId=\''+this.obj.Aarr[this.obj.A1-1].shippingTempId+'\',count)/>,\
	//		"upNum3":<.Db(sqlite.aliexpress,select count(1) from @.proupdhgate where @.upUserID='+obj.arr[5]+' and @.upFreightId=\''+this.obj.Aarr[this.obj.A1-1].shippingTempId+'\' and @.status=1,count)/>\
	//	}'
	//	$("#state").html('正在统计相关数据。。。');
	//	Tool.ajax.a01('""',1,this.a08,this)
	//},
 // a008:function(oo)
 // {
	//	this.obj.Aarr[this.obj.A1-1].upNum1=oo.upNum1
	//	this.obj.Aarr[this.obj.A1-1].upNum2=oo.upNum2
	//	this.obj.Aarr[this.obj.A1-1].upNum3=oo.upNum3
	//	this.obj.Aarr[this.obj.A1-1].upNum4=oo.upNum4
	//	this.obj.Aarr[this.obj.A1-1].upNum5=oo.upNum5
	//	this.obj.Aarr[this.obj.A1-1].shopid=oo.shopid
	//	$("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
	//	this.obj.A1++;
	//	this.a06();
	//},
 //