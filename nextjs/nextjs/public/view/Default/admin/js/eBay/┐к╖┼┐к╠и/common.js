'use strict';
let F1={
  a01:function(A,B)
  {
		let cur=Tool.getCookie("ebay_curID"),str="<r:APIaccount size=1 where=\" where @.from='ebay' "+(cur==""?"order by :sort asc,@.id asc":" and @.fromid="+cur)+"\">{fromid:[APIaccount:fromid],token:[APIaccount:token]}</r:APIaccount>";
		Tool.ajax.a01(str,1,this.a02,this,1,[A,B]);
  },
  a02:function(t,arr)
  {
		eval("arr[0].obj="+t);
		if(arr[0].obj.token.length==0)
		{this.a03(arr);}
		else
		{this.a06(arr);}
		Tool.setCookie("ebay_curID",arr[0].obj.fromid,24);
  },
  a03:function(arr)
  {
		let code=Tool.getQueryString("code"),url,postString,head
		if(code==null)//是否要登陆
		{
			url="https://auth"+(arr[0].mode?"":".sandbox")+".ebay.com/oauth2/authorize?client_id="+arr[0].api[arr[0].mode].client_id+"&redirect_uri="+arr[0].api[arr[0].mode].redirect_uri+"&response_type=code&scope="+arr[0].api[arr[0].mode].scope;
			top.location.href=url;
		}
		else
		{
			url="https://api"+(arr[0].mode?"":".sandbox")+".ebay.com/identity/v1/oauth2/token"
			postString="grant_type=authorization_code&code="+code+"&redirect_uri="+arr[0].api[arr[0].mode].redirect_uri
			head="Content-Type=application/x-www-form-urlencoded&Authorization=Basic "+new Base64().encode(arr[0].api[arr[0].mode].client_id+":"+arr[0].api[arr[0].mode].client_secret);
			Tool.ajax.a01("<.ebayPost(" + url + "," + postString + "," + head + ")/>", 1, this.a04,this,arr)
		}
  },
  a04:function(t,arr)
	{
		/*
		{
			"access_token": "......",
			"expires_in": 7200,
			"refresh_token": "v^1.1#i^1#I^3#r^1#p^3#f^0#t^Ul4xMF8xMDpBQkVDMDA5Rjk4QThCQThBNTM5MjU2MTU2NTRCRkRCNF8zXzEjRV4xMjg0",
			"refresh_token_expires_in": 47304000,
			"token_type": "User Access Token",
			"time1": "2019-06-15 06:22:39"
		}	
		*/
  	if(t.indexOf('"access_token"')!=-1)
		{
			eval("let oo="+t)
			oo.expires=Tool.js_date_time(new Date(new Date().getTime() + 1000*oo.expires_in));//7200 秒(2小时)
			oo.refresh_token_expires=Tool.js_date_time(new Date(new Date().getTime() + 1000*oo.refresh_token_expires_in));//47304000秒（1.5年）
			let str="<r: tag=\"sql\">update @.APIaccount set @.token='" + JSON.stringify(oo)+"' where @.fromid="+arr[0].obj.fromid+" and @.from='ebay'</r:>";
			arr[0].obj.token[0]=oo;arr[0].token=oo.access_token
			Tool.ajax.a01(str,1,this.a05,this,arr);
		}
		else
		{document.write("出错001："+t);}
	},
  a05:function(t,arr){if(t==""){this.a06(arr);}else{document.write("出错002："+t);}},
  a06:function(arr)
	{
		if(new Date().getTime()>new Date(arr[0].obj.token[0].refresh_token_expires).getTime())//超过1.5年
		{alert("超过1.5年");}
		else if(new Date().getTime()>new Date(arr[0].obj.token[0].expires).getTime())//超过10小时
		{
			let url="https://api"+(arr[0].mode?"":".sandbox")+".ebay.com/identity/v1/oauth2/token"
			let postString="grant_type=refresh_token&refresh_token="+arr[0].obj.token[0].refresh_token+"&scope="+arr[0].api[arr[0].mode].scope;
			head="Content-Type=application/x-www-form-urlencoded&Authorization=Basic "+new Base64().encode(arr[0].api[arr[0].mode].client_id+":"+arr[0].api[arr[0].mode].client_secret);
			Tool.ajax.a01("<.ebayPost(" + url + "," + postString + "," + head + ")/>", 1, this.a07,this,arr)
		}
		else
		{arr[0].token=arr[0].obj.token[0].access_token;arr[1].apply(arr[0]);}
	},
  a07:function(t,arr)
	{
		/*
		{
			"access_token": "......",
			"expires_in": 7200,
			"token_type": "User Access Token"
		}		
		*/
		if(t.indexOf('"access_token"')!=-1)
		{
			eval("let oo2="+t)
			arr[0].token=oo2.access_token;
			arr[0].obj.token[0].access_token=oo2.access_token;
			arr[0].obj.token[0].expires=Tool.js_date_time(new Date(new Date().getTime() + 1000*oo2.expires_in));//7200 秒(2小时)
			let str="<r: tag=\"sql\">update @.APIaccount set @.token='" + JSON.stringify(arr[0].obj.token[0])+"' where @.fromid="+arr[0].obj.fromid+" and @.from='ebay'</r:>";
			Tool.ajax.a01(str, 1, this.a05,this,arr);
		}
		else
		{document.write("出错001："+t);}
	},
}