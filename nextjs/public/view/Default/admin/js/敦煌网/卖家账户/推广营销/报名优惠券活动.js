'use strict';
var fun=
{
	obj:
	{
		A1:1,A2:0,B1:1,B2:0,Barr:[],
		where:" where @.upshelf&gt;0",
		username:"",password:"",fromid:0,
	},
  a01:function()
  {
    let html=Tool.header("正在【报名优惠券活动】（每个月底做一次）...")+'\
    <div class="p-2">\
      <table class="table table-hover">\
      <tbody>\
        <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+Tool.htmlProgress('A')+'</tr>\
		    <tr><td class="right">报名进度：</td>'+Tool.htmlProgress('B')+'</tr>\
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
		Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05,this);
  },
	a05:function()
	{
		$("#state").html("正在验证登陆。。。");
		Tool.verifyUser.a01(this.a07, this);
	},
	a07:function()
	{
		let url="https://seller.dhgate.com/promoweb/coupon/activity_list.do?dhpath=10004,3005"
    $("#state").html("正在打开【优惠券活动列表】。。。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.getFetch(url,"json",this.a08,this);
	},
	a08:function(t)
	{
		let nArr=[],arr=Tool.StrSplits(t,'couponactivityid=','"');
		for(let i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf('&show=yes')!=-1){nArr.push(arr[i].split('&show=yes')[0])}
		}
		this.obj.Barr=nArr
		this.obj.B2=nArr.length;
		this.a09();
	},
	a09:function()
	{
		Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a10,this,this.a12);
	},
	a10:function()
	{
		let url="https://seller.dhgate.com/promoweb/coupon/activity_join.do?couponactivityid="+this.obj.Barr[this.obj.B1-1]
    $("#state").html("正在打开【优惠券活动列表】。。。");
		$("#url").html('<a href="'+url+'" target="_blank">'+url+'</a>');
    gg.getFetch(url,"json",this.a11,this);
	},
	a11:function(t)
	{
		this.obj.B1++;
		this.a09();
	},
	a12:function()
	{
		this.obj.A1++;
		this.obj.B1=1
		this.obj.B2=0;
		this.obj.Barr=[];
		this.obj.username=""
		this.obj.password=""
		this.obj.fromid=0
		$("#B1").css("width","0%");
		$("#B1,#B2").html("")
		$("#state").html("正在准备下一个账号...");		
		this.a03();		       
  }
}
fun.a01();