'use strict';
let F3=
{
  obj:{},
  a01:function()
  {
    this.obj.username=fun.obj.username
    this.obj.password=fun.obj.password
    this.obj.Group=fun.obj.Group;
    this.obj.groupId=fun.obj.groupId
    let html=Tool.header('正在【解散分组】...')+'\
		<ul class="Tul list-group-item-action"><li class="w100 right">账号：</li><li>'+this.obj.username+'</li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">解散分组进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state"></li></ul>';
    Tool.html(this.a02,this,html);
  },
  a02:function()
	{gg.isRD(this.a02A,this);},
  a02A:function()
	{
    let arr1=this.obj.Group,DelGroupId="",AArr=[];
    for(let i=1;i<arr1.length;i++)
    {
      for(let j=0;j<arr1[i].itemChildGroupList.length;j++)
      {
        if(arr1[i].itemChildGroupList[j].groupId==this.obj.groupId){DelGroupId=arr1[i].groupId;break;}
      }
      if(DelGroupId){AArr=arr1[i].itemChildGroupList;break;}
    }
   
		if(DelGroupId)
		{
      this.obj={AArr:AArr,A1:1,A2:AArr.length,DelGroupId:DelGroupId,username:this.obj.username,password:this.obj.password,num:1};
      $("#state").html("正在退出。。。");
      Tool.SignOut(this.a03,this);
    }
		else
		{$("#state").html("找不到分组，不能解散。");}
  },
	a03:function()
	{
    $("#state").html("正在登陆。。。");
    Tool.SignIn(this.a04,this);
  },
	a04:function()
	{
		let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
    $("#state").html("正在添加临时分组。。。");
    let arr2={groupEnName:"_"+this.obj.AArr[this.obj.A1-1].groupEnName,remark:this.obj.AArr[this.obj.A1-1].remark,showInStore:1,sortNo:1,valid:1}
    let url="http://seller.dhgate.com/prodmanage/group/prodGroupSave.do"
    let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
    gg.postFetch(url,JSON.stringify(arr3),this.a05,this);
  },
	a05:function(str)
	{
		if(str.indexOf("保存产品组成功")!=-1)
		{
			let groupId2=Tool.StrSlice(str,'"groupId":"','"')
			this.obj.AArr[this.obj.A1-1].groupId2=groupId2
			let url="https://seller.dhgate.com/prodmanage/akey/modProGroupAkey.do?countScope=1&paramType=1&_="+(new Date).getTime()+"&byProductgroupid="+this.obj.AArr[this.obj.A1-1].groupId+"&toProductgroupid="+groupId2
      $("#state").html("正在移动分组："+url);
      gg.getFetch(url,"json",this.a06,this)
		}
		else
		{$("#state").html("保存产品组，内容不对。"+str);}
  },
	a06:function(str)
	{
		if(str.indexOf('"code":"1","msg":"success","jobId"')!=-1)
		{
      $("#state").html("移动分组成功，正在更新本地数据。。。");
			let txt='<r: db="sqlite.dhgate">update @.dhUpPro set @.upGroupId=\''+this.obj.AArr[this.obj.A1-1].groupId2+'\' where @.upGroupId=\''+this.obj.AArr[this.obj.A1-1].groupId+'\' and @.from=\'dhgate\'</r:>'
			Tool.ajax.a01(txt,1,this.a07,this)
		}
		else
		{$("#state").html("移动分组，内容不对。"+str);}
  },
	a07:function(t)
	{
		if(t=="")
		{
			let url="http://seller.dhgate.com/prodmanage/group/prodGroupDelete.do?isBlank=true&groupId="+this.obj.AArr[this.obj.A1-1].groupId
      $("#state").html("正在删除旧分组："+url);
      gg.getFetch(url,"json",this.a08,this)
		}
		else
		{alert("出错："+t)}
  },
	a08:function(str)
	{
		if(str.indexOf('删除产品组成功！')!=-1)
		{
      $("#state").html("旧分组删除成功,正在校验分组名称。。。");
      this.obj.num=1;
      this.a09();
    }
		else
		{$("#state").html("删除产品组，内容不对。"+str);}
  },
  a09:function()
	{
		let arr1=this.obj.AArr[this.obj.A1-1],num=this.obj.num;
    $("#state").html("正在通过校验("+num+")")
    let url="http://seller.dhgate.com/prodmanage/group/checkProductGroupName.do"
    let arr3={isEnGroupName:1,groupName:(num==1?arr1.groupEnName:arr1.groupEnName+" "+num)}
    gg.postFetch(url,JSON.stringify(arr3),this.a10,this); 
  },
  a10:function(str)
	{
		if(str.indexOf('通过校验')!=-1)
		{
			let arr1=this.obj.AArr[this.obj.A1-1]
			this.obj.AArr[this.obj.A1-1].groupEnName=(this.obj.num==1?arr1.groupEnName:arr1.groupEnName+" "+this.obj.num)//改名称
			this.a11();
		}
		else if(str.indexOf("产品组名称重复！")!=-1)
		{
			this.obj.num++;
			this.a09();
		}
		else
    {$("#state").html("校验，内容不对。"+str);}
    
    
  },
  a11:function()
	{
    $("#state").html("正在修改为正确名称。。。");
    let url="http://seller.dhgate.com/prodmanage/group/prodGroupUpdate.do"
    let arr2={"groupEnName":this.obj.AArr[this.obj.A1-1].groupEnName,"groupName":this.obj.AArr[this.obj.A1-1].groupName,"remark":this.obj.AArr[this.obj.A1-1].remark,"groupId":this.obj.AArr[this.obj.A1-1].groupId2,"showInStore":1,"sortNo":1,"valid":1}
    let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
    gg.postFetch(url,JSON.stringify(arr3),this.a12,this); 
  },
  a12:function(str)
	{
		if(str.indexOf("修改产品组成功")!=-1)
		{
      this.a13();
    }
    else
    {$("#state").html("修改为正确名称，内容不对。"+str);}
  },
  a13:function()
	{
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
    this.obj.A1++;
    if(this.obj.A1<=this.obj.A2)
    {this.a04();}
    else
    {
     	let url="http://seller.dhgate.com/prodmanage/group/prodGroupDelete.do?isBlank=true&groupId="+this.obj.DelGroupId
      $("#state").html("正在删除旧父分组："+url);
      gg.getFetch(url,"json",this.a14,this)
    }
  },
  a14:function(str)
  {
		if(str.indexOf('删除产品组成功！')!=-1)
		{
      $("#state").html("全部完成");
      location.reload();
    }
		else
		{$("#state").html("删除产品组成功，内容不对。"+str);}
  }
}
F3.a01();