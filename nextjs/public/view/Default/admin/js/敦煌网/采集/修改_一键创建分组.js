'use strict';
let F3=
{
  obj:{A1:1,A2:0,AArr:[]},
  a01:function()
  {
    let html='\
		<tr>\
      <td class="w150 right">分组进度：</td>'+Tool.htmlProgress('A')+'\
    </tr>\
    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>'
    let html='\
    <header class="panel-heading"><a href="javascript:;" onclick="location.reload()" class="arrow_back"></a>正在创建分组...</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(this.a02,this,html);
  },
  a02:function()
  {
      let types=obj.arr[5].replace(/,/g,"','")
      let txt='[\
      <r:APIaccount where=" where @.fromid='+obj.arr[4]+'">\
      {\
        "username":"[APIaccount:UserName]",\
        "password":"[APIaccount:password]"\
      }\
      </r:APIaccount>\
      <r:smtType size="200" where=" where @.fromid in(\''+types+'\')">,\
      {\
        "remark":"[smtType:fromid]",\
        "cnname":"[smtType:name]",\
        "enname":"[smtType:enname tag=js]"\
      }\
      </r:smtType>]'
     Tool.ajax.a01(txt,1,this.a03,this)
  },
  a03:function(oo)
  {
    this.obj.A2=oo.length-1;
    this.obj.AArr=oo;
    this.obj.username=oo[0].username
    this.obj.password=oo[0].password
    gg.isRD(this.a04,this); 
  },
  a04:function()
  { 
    if(this.obj.A2==0)
		{
      $("#state").html("没有可【创建的分组】");
    }
		else if(this.obj.A2<=this.obj.A2)
		{
      $("#state").html("正在退出。。。");
      Tool.SignOut(this.a05,this);     
      //this.a06();
		}
    else
    {$("#state").html("完");}    
  },
	a05:function()
	{
    $("#state").html("正在登陆。。。");
		Tool.SignIn(this.a06,this);
  },
	a06:function()
	{
    this.a07(0)
  },
	a07:function(num)
	{
    let p1=Math.ceil(this.obj.A1/this.obj.A2*100);
    $("#A1").html(p1+"%").css("width",p1+"%");
    $("#A2").html(this.obj.A1+'/'+this.obj.A2+'（个）');
		let enname=this.obj.AArr[this.obj.A1].enname
    enname=num==0?enname:enname+" "+num
    this.obj.temp=[enname,num];
		let url='http://seller.dhgate.com/prodmanage/group/checkProductGroupName.do?isBlank=true&isEnGroupName1&groupName='+enname
		$("#state").html("分给名称【"+enname+"】正在校验("+num+")");
    gg.getFetch(url,"json",this.a08,this)
  },
	a08:function(str)
	{
    let oo=this.obj.temp;
		if(str.indexOf('通过校验')!=-1)
		{
			let arr1=this.obj.AArr[this.obj.A1]
			arr1.enname=oo[0];
      let arr2={"class":"com.dhgate.prod.dto.ProductGroupDTO","groupEnName":arr1.enname,"groupName":arr1.cnname,"remark":arr1.remark,"createDate":null,"groupId":null,"parentGroupId":null,"productCount":null,"showInStore":1,"sortNo":1,"supplierid":null,"updateDate":null,"valid":1,"childGroupList":null}
      let arr3={isBlank:true,jsonstr:JSON.stringify(arr2)}
			let url='http://seller.dhgate.com/prodmanage/group/prodGroupSave.do'//提交
      gg.postFetch(url,JSON.stringify(arr3),this.a09,this)
		}
		else if(str.indexOf("产品组名称重复！")!=-1)
		{
			this.obj.temp[1]++;
			this.a07(this.obj.temp[1]);
		}
		else
    {
      $("#state").html("内容异常：<hr>"+str);
    }
	},
  a09:function(str)
	{
		if(str.indexOf("产品组成功")!=-1)//"msg":"保存产品组成功！" 或 "msg":"修改产品组成功！"
		{
      $("#A2").html(this.obj.A1+'/'+this.obj.A2+"(完)");
      this.obj.A1++;
      if(this.obj.A1<=this.obj.A2)
      {this.a07(0);}
      else
      {
        window.location.reload();
      }
    }
		else if(str.indexOf("产品组名称重复！")!=-1)
		{
			this.obj.temp[1]++;
			this.a07(this.obj.temp[1]);
		}
		else
		{$("#state").html("内容异常02：<hr>"+str);}
	}
}
F3.a01();