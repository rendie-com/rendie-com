'use strict';
var fun=
{
  time:new Date(),
	obj:
	{
		A1:1,A2:0,
		B1:1,B2:0,Barr:[],
		where:" where @.upshelf&gt;0",username:"",password:"",fromid:0
	},
  a01:function()
  {
    let html=Tool.header("正在【参与权益】...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">页进度：</td>'+Tool.htmlProgress('B')+'</tr>\
        <tr><td class="right">统计：</td><td  id="doTime" colspan="2"></td></tr>\
		    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
				</tbody>\
      </table>\
    </div>'
		Tool.html(this.a02,this,html)
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
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
	a05:function()
	{
		$("#state").html("正在验证登陆。。。");
		Tool.verifyUser.a01(this.a07, this);
  },
  a07:function()
  {
		let url="https://seller.dhgate.com/prodmanage/ajax/ajaxProductFsfrPage.do?fsfrMarkType=0&pagesize=20&page=1&itemcode=";
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在【权益中心-未参与权益】找商品。。。");
		gg.getFetch(url,"json",this.a08,this);
  },
  a08:function(t)
  {
		let arr1,arr2,arr3=[]
		eval("arr1="+t)
		arr2=arr1.data;
		if(arr2!=null)
		{
			if(this.obj.B2==0){this.obj.B2=Math.ceil(arr1.total/arr2.length);}
			for(let i=0;i<arr2.length;i++)
			{
				arr3.push(arr2[i].itemcode)
			}
			this.obj.Barr=arr3
		}
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a09,this,this.a11);
  },
  a09:function()
  {
		let url="https://seller.dhgate.com/prodmanage/ajax/ajaxBatchUpdateProductFsfr.do?itemcodes="+this.obj.Barr.join(",")+"&statusMark=2"
    $("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    $("#state").html("正在【权益中心第1页】找商品。。。");
		gg.getFetch(url,"json",this.a10,this);
  },
  a10:function(t)
  {
		if(t.indexOf('"msg":"ok",')!=-1)
		{
			this.obj.Barr=[]
			this.obj.B1++;
			this.a07();
		}
		else
		{Tool.at("出错："+t)}
  },
  a11:function(t)
  {
		$("#doTime").html(Tool.doTime(this.time,this.obj.A1,this.obj.A2));
		this.obj.A1++;
		this.obj.B1=1;
		this.obj.B2=0;
		this.obj.Barr=[];
		$("#B1").html("0%").css("width","0%");
		$("#B2,#typename,#url").html('');
		this.a03();
  },
}
fun.a01();