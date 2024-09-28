'use strict';
var fun=
{
  obj:{},
  a01:function()
  {
    let html=Tool.header('正在【创建分组】...')+'\
		<ul class="Tul list-group-item-action"><li class="w100 right">账号：</li><li id="username"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">创建分组进度：</li>'+Tool.htmlProgress('A')+'</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state"></li></ul>';
    Tool.html(this.a02,this,html);
  },
  a02:function()
	{gg.isRD(this.a02A,this);},
  a02A:function()
	{
		let html='\
    <r:APIaccount size=1 where=" where @.fromid='+obj.arr[4]+' and @.from=\'dhgate\'">\
    {\
      "username":"[APIaccount:username]",\
      "password":"[APIaccount:password]",\
      "type":"'+obj.arr[5]+'",\
      "Group":[APIaccount:Group]\
    }</r:APIaccount>'
		Tool.ajax.a01(html,1,this.a03,this)
	},
  a03:function(oo)
  {
    this.obj=oo;
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
    $("#state").html("已【登陆】，正在检查要创建哪些分组...");
    let arr1=this.obj.Group,arr2=[],num4
		arr2.push('\
    <r:smtType where=" where @.fromid='+this.obj.type+'" size=1>\
    {\
      "remark":"[smtType:fromid]",\
      "typename":"[smtType:name tag=js]",\
      "enname":"[smtType:enname tag=js]",\
      "cnname":"[smtType:name tag=js]"\
    }</r:smtType>');
    for(let i=1;i<arr1.length;i++)
		{
			num4=parseInt(arr1[i].Num4?arr1[i].Num4.replace(/\[|\]/g,""):0)//有多少【子分组】
      ////////////////////////////////////////////////////
      if(arr1[i].typename)
      {
        if(arr1[i].typename.indexOf("('"+this.obj.type+"')")!=-1&&num4==0)
        {
          $("#state").html("已找出【无子分组】的（"+this.obj.type+"）类目...【"+arr1[i].typename+"】");
          arr2.push(arr1[i]);
        }
        else if(arr1[i].remark==this.obj.type&&num4!=10)//
        {
          $("#state").html("说明已经有这个分组了。。。");
          arr2[0]=arr1[i];
        }
      }
		}
    //////////////////////////////////////////////
    this.obj={AArr:arr2,A1:1,A2:arr2.length-1,num:1};
		if(arr2[0].remark)//表示分组没满
		{
      this.a07();
    }
		else//表示要创建分组
		{
     Tool.ajax.a01(arr2[0],1,this.a06,this);
    }
  },
  a06:function(oo)
	{
    $("#state").html("已获得要创建的分组...");
    this.obj.AArr[0]=oo;
		this.obj.A2=this.obj.AArr.length-1;
    this.a07();
  },
  a07:function()
	{
		let arr1=this.obj.AArr
    let num4=arr1[0].Num4?parseInt(arr1[0].Num4.replace(/\[|\]/g,"")):0
		if(num4)//是否已有该分组
		{
      //有,那直接改就行
      this.obj.A2=1;
			let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
      $("#A1").html(p1+"%").css("width",p1+"%");
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
      let arr2={
        groupEnName:arr1[0].groupEnName,
        groupName:arr1[0].cnname,
        remark:arr1[0].remark,
        showInStore:1,sortNo:1,valid:1,
        groupId:arr1[0].groupId,childGroupList:[]}
      let A2=arr1.length-1+num4>10?10-num4:arr1.length-1
			for(let i=1;i<=A2;i++)
			{
				arr2.childGroupList.push({groupEnName:arr1[i].enname,groupName:arr1[i].cnname,remark:arr1[i].remark,showInStore:1,sortNo:1,valid:1,groupId:arr1[i].groupId});
			}
			let url='http://seller.dhgate.com/prodmanage/group/prodGroupUpdate.do'
      let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
      gg.postFetch(url,JSON.stringify(arr3),this.a18,this)
		}
		else
		{
      let enname=this.obj.num==1?arr1[0].enname:arr1[0].enname+" "+this.obj.num
      let url="https://seller.dhgate.com/prodmanage/group/checkProductGroupName.do?isBlank=true&groupName="+encodeURIComponent(enname).replace(/\%20/g,"+")+"&isEnGroupName=1"
			$("#state").html("需要创建分组，正在通过校验,看是否能创建("+enname+")。。。<hr/>"+url)
      gg.getFetch(url,"json",this.a08,this);
		}
	},
	a08:function(str)
	{
		if(str.indexOf('通过校验')!=-1)
		{
      $("#state").html("正在新增临时分组...");
			let arr1=this.obj.AArr
			arr1[0].enname=(this.obj.num==1?arr1[0].enname:arr1[0].enname+" "+this.obj.num)
			this.obj.AArr[0]=arr1[0];
			let arr2={groupEnName:arr1[0].enname,groupName:arr1[0].cnname,remark:arr1[0].remark,showInStore:1,sortNo:1,valid:1,childGroupList:[]}
      this.obj.A2=this.obj.A2>10?10:this.obj.A2
			for(let i=1;i<this.obj.A2+1;i++)
			{
        arr2.childGroupList.push({groupEnName:"____"+arr1[i].enname,groupName:arr1[i].cnname,remark:arr1[i].remark,showInStore:1,sortNo:1,valid:1});
      }
			let url='http://seller.dhgate.com/prodmanage/group/prodGroupSave.do'
      let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
      gg.postFetch(url,JSON.stringify(arr3),this.a09,this)
		}
		else if(str.indexOf("产品组名称重复！")!=-1)
		{
			this.obj.num++;
			this.a07();
		}
		else
    {
      $("#state").html("通过校验,内容不对。。。"+str)
    }
	},
	a09:function(str)
	{
		if(str.indexOf("产品组成功")!=-1)
		{
			eval("let arr1="+str)
			this.obj.AArr[0].groupId=arr1.data.groupId;
			arr1=arr1.data.childGroupList
			let arr2=this.obj.AArr
			for(let i=0;i<arr1.length;i++)
			{
				 for(let j=1;j<arr2.length;j++)
				 {
					  if(arr1[i].remark==arr2[j].remark){this.obj.AArr[j].groupId2=arr1[i].groupId;}
				 }			
			}
			this.a10();
		}
		else
		{$("#state").html("通过校验,11内容不对。。。"+str)}
	},
	a10:function()
	{
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100)
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
    let url="http://seller.dhgate.com/prodmanage/akey/modProGroupAkey.do?paramType=1&_="+(new Date).getTime()+"&byProductgroupid="+this.obj.AArr[this.obj.A1].groupId+"&toProductgroupid="+this.obj.AArr[this.obj.A1].groupId2+"&countScope=18"
		$("#state").html("正在移动分组："+url);
    gg.getFetch(url,"json",this.a11,this);
	},
	a11:function(str)
	{

		if(str.indexOf('"msg":"success"')!=-1)
		{
      $("#state").html("移动分组成功，正在更新本地数据。。。");
			let txt='<r: db="sqlite.dhgate">update @.dhUpPro set @.upGroupId=\''+this.obj.AArr[this.obj.A1].groupId2+'\' where @.upGroupId=\''+this.obj.AArr[this.obj.A1].groupId+'\' and @.from=\'dhgate\'</r:>'
     Tool.ajax.a01(txt,1,this.a12,this)
		}
		else
		{$("#state").html("通过校验,22内容不对。。。"+str);}
	},
	a12:function(t)
	{
		if(t=="")
		{
			let url="http://seller.dhgate.com/prodmanage/group/prodGroupDelete.do?isBlank=true&groupId="+this.obj.AArr[this.obj.A1].groupId
			$("#state").html("正在删除旧分组："+url);
      gg.getFetch(url,"json",this.a13,this);
		}
		else
		{alert("出错："+t)}
  },
	a13:function(str)
	{
		if(str.indexOf('删除产品组成功！')!=-1)
		{
			$("#state").html("旧分组删除成功,正在校验子分组名称。。。");
      this.obj.num=1;
      this.a14();
    }
		else
		{Tool.Time(this.a13,300,this,"1");}
  },
  a14:function()
	{
		let arr1=this.obj.AArr[this.obj.A1]
    let url='http://seller.dhgate.com/prodmanage/group/checkProductGroupName.do?isEnGroupName=1&groupName='+(this.obj.num==1?arr1.enname:arr1.enname+" "+this.obj.num)
    gg.getFetch(url,"json",this.a15,this);
  },
  a15:function(str)
	{
		if(str.indexOf('通过校验')!=-1)
		{
			let arr1=this.obj.AArr[this.obj.A1]
			this.obj.AArr[this.obj.A1].enname=(this.obj.num==1?arr1.enname:arr1.enname+" "+this.obj.num)//改名称
			this.a16();
		}
		else if(str.indexOf("产品组名称重复！")!=-1)
		{
			this.obj.num++;
			this.a14();
		}
		else
    {$("#state").html("通过校验,333内容不对。。。"+str);}
  },
  a16:function()
	{
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（完）');
		this.obj.A1++;
		if(this.obj.A1<=this.obj.A2)
		{
		  this.a10();
		}
		else
		{
			$("#state").html("开始收尾");	
      this.a17();
		}
  },
  a17:function()
	{
		let arr1=this.obj.AArr
		let arr2={groupEnName:arr1[0].enname,groupName:arr1[0].cnname,remark:arr1[0].remark,showInStore:1,sortNo:1,valid:1,groupId:arr1[0].groupId,childGroupList:[]}
		for(let i=1;i<this.obj.A2+1;i++)
		{
			arr2.childGroupList.push({groupEnName:arr1[i].enname,groupName:arr1[i].cnname,remark:arr1[i].remark,showInStore:1,sortNo:1,valid:1,groupId:arr1[i].groupId2});
		}
    let url='http://seller.dhgate.com/prodmanage/group/prodGroupUpdate.do'
    let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
    gg.postFetch(url,JSON.stringify(arr3),this.a18,this)
  },
  a18:function(str)
	{
		if(str.indexOf('修改产品组成功！')!=-1)
		{
      $("#state").html("全部完成");
      location.href=Tool.unescape(obj.arr[6])
    }
		else
		{$("#state").html("内容异常："+str);}
	}
}
fun.a01();