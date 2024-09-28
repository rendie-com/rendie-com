'use strict';
var fun=
{
  obj:
	{
		A1:1,A2:0,B1:1,B2:0,Barr:[],
		where:" where @.upshelf&gt;0 and @.fromid="+obj.arr[5],
		username:"",password:"",shippingModel:0,fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在能删除【空运费模板】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">空模板进度：</td>'+Tool.htmlProgress('B')+'</tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
			</tbody>\
      </table>\
    </div>';
    Tool.html(this.a02,this,html);
  },
	a02:function()
	{
		gg.isRD(this.a03,this);
  },
	a03:function()
	{
    Tool.getDHuser(this.a04,this);//获得账号等信息
  },
	a04:function()
	{
    $("#username").html(this.obj.username);
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
  a05:function()
  {
		let nArr=[],arr=this.obj.shippingModel
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].modelName.indexOf("-")==-1&&arr[i].upNum1==0)
			{
				nArr.push(arr[i].shippingTempId);
			}
		}
		this.obj.Barr=nArr;
		this.obj.B2=nArr.length
		this.a06()
	},
  a06:function()
  {
    $("#state").html("正在退出。。。");
    Tool.SignOut(this.a07,this);
  },
  a07:function()
  {
    $("#state").html("正在登陆。。。");
    Tool.SignIn(this.a08,this);
  },
  a08:function()
  {
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09,this,this.a11);
  },
  a09:function()
  {
    let url="http://seller.dhgate.com/frttemplate/delete.do?shippingmodelid="+this.obj.Barr[this.obj.B1-1]+"&myhp=0"
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在删除运费模板。。。");
    gg.getFetch(url,"json",this.a10,this);
  },
  a10:function(t)
  {
		if(t.indexOf("<title>运费模板 </title>")!=-1)
    {
      this.obj.B1++;
			this.a08();
    }
    else if (t.indexOf("<title> 我的摘要</title>")!=-1)
    {
			alert("aaaaaaaaaaaa")
      //this.a14();
    }
    else{$("#state").html("DH删除出错222");Tool.at(t);}
  },
  a11:function()
  {
		this.obj.A1++;
		this.obj.B1=1;
		this.obj.B2=0;
		this.obj.Barr=[];
		this.obj.shippingModel=0;
		this.obj.username=""
		this.obj.password=""
		this.obj.fromid=0
		$("#B1").css("width","0%");
		$("#B1,#B2").html("");
		this.a03();
	}
}
fun.a01();