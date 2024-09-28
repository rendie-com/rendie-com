'use strict';
var fun=
{
  pageA:obj.pageA==""?1:parseInt(obj.pageA),
  nextlink:obj.nextlink,
  pageB:0,pageBcount:0,pageAcount:0,
  itemLissql:[],
  a01:function()
  {
	let str='<r:APIaccount size=1 page=2 where=" where @.hide=0 and @.from=\'dhgate\' order by @.sort asc,@.id asc">{username:"[APIaccount::username]",password:"[APIaccount::password]",apiID:"[APIaccount::id]",note:"[APIaccount:note]"</r:APIaccount>,pageAcount:"<@page/>"}'
	Tool.ajax.a01(str,this.pageA,this.a02,this)
  },
  a02:function(txt)
  {
	eval("let apiobj="+txt)
	this.tokenID=apiobj.apiID
	this.username=apiobj.username
	this.pageAcount=apiobj.pageAcount
	let html='<tr class="thead"><td colspan="2">正在【同步审核未通过】...</td></tr><tr><td class="label" width="100">总进度：</td><td id="A"><progress style="width:80%" max="'+apiobj.pageAcount+'" value="'+this.pageA+'"/> '+this.pageA+'/'+apiobj.pageAcount+'</td></tr><tr><td class="label">细节：</td><td><table class="tb2" width="100%"><tr><th width="30">账号</th><th width="180">备注</th><th align="left">进度</th></tr><tr align="center"><td>'+apiobj.username+'</td><td>'+apiobj.note+'</td><td align="left" id="B"><progress style="width:60%"/></td></tr></table></td></tr>'
	$("#table").html(html)
	if(this.pageA<=parseInt(apiobj.pageAcount))
	{
		this.token=Tool.getCookie("_____"+this.tokenID);
		if(this.token=="")
		{
		  let URL='https://secure.dhgate.com/dop/oauth2/access_token?grant_type=password&username='+apiobj.username+'&password='+apiobj.password+'&client_secret={r.Config(dhgate_client_secret)}&client_id={r.Config(dhgate_client_id)}&scope=basic'
		 Tool.ajax.a01("{rr.WebRequestGet("+URL+")}",1,this.a03,this)
		}
		else
		{this.a04();}
	}else{$("#B").html("同步完成");}
  },
  a03:function(txt)
  {
		alert("------------------------------------")
		/*if(txt.indexOf("\",\"access_token\":\"")>-1)
		{
			eval("let getToken="+txt)
			Tool.setCookie("_____"+this.tokenID,getToken.access_token,24)
			this.token=getToken.access_token
			this.a04()
		}else{Tool.main(this.nextlink+(parseInt(this.pageA)+1));}*/
  },
  a04:function()
  {
	let today=new Date()
	let startDate=Tool.js_date_time(today.setDate(today.getDate()-365));
	let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.list&timestamp=" + new Date().getTime() + "&v=2.0&pages="+this.pageB+"&pageSize=60&operateDateStart="+startDate+"&state=100300"
	Tool.ajax.a01("{r.WebClientPost("+escape(URL)+")}",1,this.a05,this)
  },
  a05:function(txt)
  {
	eval("let obj2="+txt)
	if(obj2.status.code=="00000000")
	{
	  this.pageBcount=obj2.pageTotal;
	  $("#B").html('<progress style="width:60%" value="'+this.pageB+'" max="'+obj2.pageTotal+'"/> '+this.pageB+'/'+obj2.pageTotal)
	  if(obj2.pageTotal==0){Tool.main(this.nextlink+(parseInt(this.pageA)+1));}
	  else
	  {this.itemList=obj2.itemList;this.a06();}
	}
	else{alert("有错误。"+txt)}
  },
  a06:function()//产品sku列表接口(得到编码)
  {
	if(this.itemList[0])
	{
	  let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.item.sku.list&timestamp=" + new Date().getTime() + "&v=2.0&itemCode="+this.itemList[0].itemCode
	 Tool.ajax.a01("{r.WebClientPost("+escape(URL)+")}",1,this.a07,this)
	}else{this.a08();}
  },
  a07:function(txt)
  {
	eval("let obj2="+txt);let skuCode=(obj2.itemSkuList[0].skuCode).split("-")[0]
	this.sql[this.sql.length]="update @.product set @.hide=3,:err='"+this.itemList[0].unpassCause+"' where @.proid='"+skuCode+"'"
	$("#B").html('<progress style="width:60%" value="'+this.pageB+'" max="'+this.pageBcount+'"/> '+this.pageB+'/'+this.pageBcount)
	this.pageB++;this.itemList.shift();this.a06();
  },
  a08:function()
  {
	let str='<r: tag="sql">'+this.sql.join("<1/>")+'</r:>'
	Tool.ajax.a01(str,1,this.a09,this)
  },
  a09:function(txt)
  {
	if(txt=="")
	{Tool.main(this.nextlink+(parseInt(this.pageA)+1));}
	else
	{alert("同步出错，请与管理员联系。"+txt);document.write(txt);}
  }
}
fun.a01();