'use strict';
var fun=
{
	
  a01:function()
	{
    let html='<@page/><r:product where=" where @.proid is null and @.from=\'aliexpress\'" size="50" page="2">,<:id/></r:product>'
	  Tool.ajax.a01(html,1,this.a02,this);
	},
  a02:function(txt)
	{
		if(txt=="0")
		{alert("设置编码完成。")}
		else
		{
			let arr=txt.split(","),txtArr=[];
		  $("#table").html("总共余数量："+arr[0]+"<br/>当页余数量："+(arr.length-1))
			let ran=parseInt(Math.random()*(999999),10)//有99w的ID
			for(let i=1;i<arr.length;i++)
			{
			  txtArr[txtArr.length]='{if "Fun(Db(select top 1 count(1) from @.product where @.proid=\'R'+(ran+i)+'\',count))"=="0"}<1/>update @.product set @.proID=\'R'+(ran+i)+'\' where @.from=\'aliexpress\' and @.id='+arr[i]+'{/if}'
			}
			Tool.ajax.a01(txtArr.join(""),1,this.a03,this);
		}
	},
  a03:function(txt)
	{
		let html='<r: tag="sql">'+txt.substr(5)+'</r:>'
		Tool.ajax.a01(html,1,this.a04,this);
	},
  a04:function(txt)
	{
		if(txt==""){Tool.Time(this.a01,500,this,"1")}else{alert(txt);}
	},
	a05:function()
	{
		this.a06([0]);
	},
	a06:function(arr)
	{
		if(arr.length==0)
		{alert("完");}
		else
		{
			let html='<r:type where=" where @.from=\'aliexpress\' and @.upid=\''+arr[0]+'\' order by @.sort asc" size=200>,[<:isleaf tag=True/>,"<:fromID/>",<:id/>]</r:type>]';
			arr.shift();
			Tool.ajax.a01(html,1,this.a07,this,arr);
		}
	},
	a07:function(t,arr)
	{
		let oo2=[]
		eval("let oo=["+t.substr(1));
		for(let i=0;i<oo.length;i++)
		{
		  if(oo[i][0]==0){arr.push(oo[i][1])}else{oo2.push("update @.product set @.typeid="+oo[i][2]+" where @.from='aliexpress' and @.type='"+oo[i][1]+"'")}
		}
		let html='<div class="m-2 shadow p-2 bg-white rounded">\
		<div class="thead">正在获取SMT类目...</div>\
		<ul class="Tul tr"><li class="w100 right">非叶子类目个数：</li><li>'+arr.length+'</li></ul>\
		<ul class="Tul tr"><li class="w100 right">叶子类目个数：</li><li>'+oo2.length+'</li></ul>\
		</div>'
		$("body").html(html);
		if(oo2.length==0)
		{this.a06(arr);}
		else
		{
		  Tool.ajax.a01('<r: tag="sql">'+oo2.join("<1/>")+'</r:>',1,this.a08,this,arr);
		}		
	},
	a08:function(t,arr)
	{
		if(t==""){this.a06(arr);}else{alert("出错："+t);}
	},
	b01:function(This)
	{
		let str='<r: tag="sql">update @.product set @.hide=9,:err=\'首图重复\' where @.from=\'aliexpress\' and @.pic1 in (select @.pic1 from @.product where @.from=\'aliexpress\' group by :pic1 having count(:pic1) > 1) and @.id not in (select min(:id) from @.product where @.from=\'aliexpress\' group by :pic1 having count(:pic1)>1)</r:>'
		This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>")
		$.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){alert("提示："+txt);location.reload();}});
	}
}
//
/*
function repairPrice()
{
  let html='[<@page/><r:product where=" where @.minprice=0 and @.from=\'aliexpress\'" page=2 size=1000>,{"sku":"<:aeopAeProductSKUs tag=js/>","id":"<:id/>"}</r:product>]'
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt){
	 eval("let obj2="+txt)
	 html='<tr class="thead"><td colspan="2">正在修复价格...</td></tr><tr><td class="label" width="100">总进度：</td><td id="progress"><progress style="width:80%" max="'+obj2[0]+'" value="1"/> '+obj2[0]+'</td></tr>'
	 $("#table").html(html);
	 if(obj2[0]!=0)
	 {
	   let sql=[],SKU
	   for(let i=1;i<obj2.length;i++)
	   {
		   SKU=aeopAeProductSKUs(obj2[i].sku)
		   if(SKU[0]==0)
		   {sql[sql.length]="update @.product set @.minprice=-1,:hide=1,:err='价格为0' where @.id="+obj2[i].id}
		   else
		   {
			 sql[sql.length]="update @.product set @.minPrice="+SKU[0]+",:maxPrice="+SKU[1]+",:Price="+SKU[2]+" where @.id="+obj2[i].id
		   }
	   }
	   html='<r: tag="sql">'+sql.join("<1/>")+'</r:>'
	   $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt2){
		   setTimeout("repairPrice();",500);
	   }});
	 }
  }});
}
function repairPic1()
{
  let html='[<@page/><r:product where=" where @.pic1 is null and @.from=\'aliexpress\'" page=2 size=1000>,{"pic":"<:pic/>","id":"<:id/>"}</r:product>]'
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt){
	 eval("let obj2="+txt)
	 html='<tr class="thead"><td colspan="2">正在修复首图...</td></tr><tr><td class="label" width="100">总进度：</td><td id="progress"><progress style="width:80%" max="'+obj2[0]+'" value="1"/> '+obj2[0]+'</td></tr>'
	 $("#table").html(html);
	 if(obj2[0]!=0)
	 {
	   let pic1,arr,sql=[]
	   for(let i=1;i<obj2.length;i++)
	   {
		   arr=obj2[i].pic.split(";")
		   if(arr.length>1){pic1=arr[1];}else{pic1=arr[0];}
		   if(pic1=="")
		   {
			   sql[sql.length]="update @.product set @.hide=1,:pic1='',:err='图片为空' where @.id="+obj2[i].id
		   }
		   else
		   {
			 pic1=pic1.replace("_640x640.jpg","")
			 pic1=pic1.replace("_640x640.jpeg","")
			 sql[sql.length]="update @.product set @.pic1='"+pic1+"' where @.id="+obj2[i].id
		   }
	   }
	   html='<r: tag="sql">'+sql.join("<1/>")+'</r:>'
	   $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(html)},success:function(txt2){
		   setTimeout("repairPic1();",500);
	   }});
	 }
  }});
}
function aeopAeProductSKUs(des)
{
	let minPrice,maxPrice,Price=0
	try{ 
		eval("let obj2="+des)
		if(obj2[0])
		{
			for(let i=0;i<obj2.length;i++)
			{
				if(i==0)
				{
					minPrice=parseFloat(obj2[0].skuPrice)
					maxPrice=parseFloat(obj2[0].skuPrice)
				}
				else
				{
					if(obj2[i].skuPrice<minPrice)minPrice=parseFloat(obj2[i].skuPrice)
					if(obj2[i].skuPrice>maxPrice)maxPrice=parseFloat(obj2[i].skuPrice)
				}
				Price+=parseFloat(obj2[i].skuPrice)
			}
			return [minPrice,maxPrice,(Price/obj2.length).toFixed(2)];		
		}else{return [0,0,0];}
	 }catch(e){return [0,0,0];}
}
function pagelist()
{
	let URL,html="<option value=\"\">请选择该用户分组</option>"
	URL = "http://api.dhgate.com/dop/router?method=dh.item.group.list&v=2.0&timestamp="+(new Date).getTime()+"&pageNo=1&pageSize=50&access_token="+obj.token
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<.WebClientPost("+escape(URL)+")/>")/>,success:function(txt){
		eval("let obj2="+txt);
		obj2=obj2.itemGroupList
		for(let i=0;i<obj2.length;i++)
		{
			html+="<option value=\""+obj2[i].groupId+"\">"+obj2[i].groupName+"（"+obj2[i].groupEnName+"）</option>"
		}
		$("#DH_itemGroupId").show()
		$("#DH_itemGroupId").html(html)
		dh_shipping_template_list()
	}});
}
function dh_shipping_template_list(){
	let URL,html="<option value=\"\">请选择该用户运费模板</option>"
	URL = "http://api.dhgate.com/dop/router?access_token=" + obj.token + "&method=dh.shipping.template.list&timestamp="+new Date().getTime()+"&v=2.0"
	$.ajax({type:"POST",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape("<.WebClientPost("+URL+")/>")/>,success:function(txt){
		eval("let obj2="+txt);
		obj2=obj2.shippingModelList
		for(let i=0;i<obj2.length;i++){html+="<option value=\""+obj2[i].shippingTempId+"\">"+obj2[i].modelName+"</option>";}
		$("#DH_shippingModelId").show()
		$("#DH_shippingModelId").html(html)
	}});
}
function productSearch()
{
  let txt,searchword=$("#searchword").val(),type=$("#selectcheckboxtype_banjia").attr("val")
	if(searchword){searchword=searchword.replace(/'/g,"''");searchword=" :name like '%"+searchword+"%' and ";}
	if(type=="0"){type="";}
	else{type=" Fun(run(productwhere("+type+")))";}
	txt=$("#areaBaoJia").text()
	txt=txt.replace(" where "," where "+searchword)
	txt=txt.replace(" where "," where "+type)
	$("#areaBaoJia").html(txt)
}
function UploadDhgate(){
	let userid=$("#DhgateUser").val()
	if(!userid){alert("请选择上传账号")}
	else
	{location.href=obj.mode+obj.arr1+"/list/"+obj.type2+"/"+$("#DhgateType").attr("val")+"/"+userid+"/"+$("#DH_itemGroupId").val()+"/"+$("#DH_shippingModelId").val()+"/"+$("#DH_price").val();}
}
function UploadAliexpress(){
	let userid=$("#aliexpressUser").val()
	if(!userid){alert("请选择上传账号")}
	else
	{location.href="<.arr(1)/>/list/<:attr(type3)/>/"+$("#AliproductType").attr("val")+"/"+userid;/>
}
function gerther(val)
{
  let datetime=encodeURIComponent($("#datetime").val()).replace(/\%/g,"_")
  maincontent(val+"time/"+$("#productHide").val()+"/"+$("#AliproductType1").attr("val")+"/"+datetime);
}
function gerther2(val)
{
  let id=$("#pre_id").val()
  if(id!="")
  {location.href=val+id}
  else
  {alert("请输入商品ID")}
}
function FunHide8(This)
{
  let str='<r: tag="sql">update @.product set @.hide=8,:err=\'标题重复\' where @.from=\'aliexpress\' and @.name in (select @.name from @.product where @.from=\'aliexpress\' group by :name having count(@.name) > 1) and @.id not in (select min(:id) from @.product where @.from=\'aliexpress\' group by :name having count(@.name)>1)</r:>'
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>")
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){
	   location.reload();
  }});
}
function FunHide12(This)
{
  let str='<r: tag="sql">update @.product set @.hide=12,:err=\'有速卖通的网址\' where @.from=\'aliexpress\' and @.des like \'%www.aliexpress%\'and :hide=0</r:>'
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>");
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){location.reload();}});
}
function FunHide5(This)
{
  This.html("<img src='"+obj.path+"admin/img/loading.gif' align='absmiddle'/>");
  let str='<r: tag="sql">update @.product set @.product.:pic1Md5=:images.:fromMd5 from @.product,:images where @.product.:pic1=:images.:url and @.product.:pic1md5 is null</r:>'
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){
	  setTimeout("FunHide5_ajax();",500);
  }});
}
function FunHide5_ajax()
{
  let str='<r: tag="sql">update @.product set @.hide=5,:err=\'手动审核不通过\' where @.from=\'aliexpress\' and @.pic1md5 in (select @.pic1md5 from @.product where @.from=\'aliexpress\' group by :pic1md5 having count(:pic1md5) > 1) and @.id not in (select min(:id) from @.product where @.from=\'aliexpress\' group by :pic1md5 having count(:pic1md5)>1)</r:>'
  $.ajax({type:"post",url:obj.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(txt){location.reload();}});
}*/