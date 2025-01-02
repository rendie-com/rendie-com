'use strict';
var fun=
{
  obj:{A1:1,A2:0,username:"",password:"",NullGroup:null},
  a01:function()
  {
		let html=Tool.header('正在删除【空分组】...')+'\
		<ul class="Tul list-group-item-action"><li class="w100 right">账号：</li><li id="username"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">分组进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">提示：</li><li id="state"></li></ul>'
    Tool.html(this.a02,this,html);

  },
  a02:function()
  {
    gg.isRD(this.a02A,this);
  },
  a02A:function()
  {  
    let html='\
    <r:APIaccount size=1 where=" where @.fromid='+obj.arr[4]+' and @.from=\'dhgate\'">\
    {\
      "username":"[APIaccount:username]",\
      "password":"[APIaccount:password]",\
      "Group":[APIaccount:Group]\
    }</r:APIaccount>'
		Tool.ajax.a01(html,1,this.a03,this)
  },
  a03:function(oo)
  {	
    this.obj.username=oo.username
    this.obj.password=oo.password
    let NullGroup=[],arr=oo.Group;
    for(let i=1;i<arr.length;i++)
    {
      if(arr[i].Num1==0&&arr[i].Num4==""){NullGroup.push(arr[i].groupId);}
      ///////////////////////////////////////////////////////////////////
      for(let j=0;j<arr[i].itemChildGroupList.length;j++)
      {
        if(arr[i].itemChildGroupList[j].itemCount==0)
        {NullGroup.push(arr[i].groupId);}
      }
    }
    this.obj.NullGroup=NullGroup
		this.obj.A2=NullGroup.length;
    $("#state").html("正在退出。。。");
    Tool.SignOut(this.a04,this);
	},
  a04:function()
  {
    $("#state").html("正在登陆。。。");
    Tool.SignIn(this.a05,this);
  },
  a05:function()
  {
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
		$("#A1").html(p1+"%").css("width",p1+"%");
		$("#A2").html(this.obj.A1+'/'+this.obj.A2+"(个)")
    $("#state").html("正在判断是否为空分组...");
		let html='[<.Db(select count(1) as total from @.dhUpPro where @.upUserID='+obj.arr[4]+' and @.upGroupId=\''+this.obj.NullGroup[this.obj.A1-1]+'\',count)/>]'
		Tool.ajax.a01(html,1,this.a06,this)
  },
  a06:function(oo)
  {
    if(oo[0]==0)
    {
      let URL="http://seller.dhgate.com/prodmanage/group/prodGroupDelete.do?isBlank=true&groupId="+this.obj.NullGroup[this.obj.A1-1]
      gg.getFetch(url,"json",this.a07,this);
    }
    else
    {
      this.a08();
    }
  },
  a07:function(str)
  {
		if(str.indexOf('删除产品组成功！')!=-1||str.indexOf('该产品组下包含')!=-1)
		{this.a08();}
		else
		{$("#state").html("删除产品组出错"+str);}
	},
  a08:function()
  {
		$("#A2").html(this.obj.A1+'/'+this.obj.A2+"(完)")
		this.obj.A1++;
    if(this.obj.A1<=this.obj.A2)
		{
      this.a05();
    }
		else
		{
      $("#state").html("全部完成");
    }
	}
}
fun.a01();