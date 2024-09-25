'use strict';
/*
用法：
F1.a01(this,this.a03);
参数：
输入：this.obj.fromid=xxx
     this.obj.token[0]={expires_in:xxx,access_token:xxx:,refresh_token:xxx}
输出：this.token  
*/
let F1=
{
  a01:function(arr)
	{
		if(arr[0].obj.token.length==0)
		{this.a03(arr);}
		else
		{this.a02(arr);}
	},
  a02:function(arr)
	{
		if(new Date().getTime()>new Date(arr[0].obj.token[0].time2).getTime())//超过半年
		{
			let URL="https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/postponeToken/"+arr[0].obj.APPKEY+"?client_id="+arr[0].obj.APPKEY+"&client_secret="+arr[0].obj.APPSECRET+"&refresh_token="+arr[0].obj.token[0].refresh_token+"&access_token="+arr[0].obj.token[0].access_token;
			alert("超过半年,看有没有错误："+URL)
			Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.a05,this,arr)
		}
		else if(new Date().getTime()>new Date(arr[0].obj.token[0].time2).getTime())//超过10小时
		{
			let URL="https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/getToken/"+arr[0].obj.APPKEY+"?grant_type=refresh_token&client_id="+arr[0].obj.APPKEY+"&client_secret="+arr[0].obj.APPSECRET+"&refresh_token="+arr[0].obj.token[0].refresh_token
			Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.a05,this,arr)
		}			
		else
		{arr[0].token=arr[0].obj.token[0].access_token;arr[1].apply(arr[0]);}
	},
  a03:function(arr)
	{
		let code=Tool.getQueryString("code"),URL,url=window.location.href
		url=url.substr(0,url.indexOf("/"+obj.arr[1]+"/")) 
		if(code==null)//是否要登陆
		{
			let Param="client_id="+arr[0].obj.APPKEY+"&site=aliexpress&redirect_uri="+url
			URL="http://gw.api.alibaba.com/auth/authorize.htm?"+Param+"&_aop_signature=[$1]"
			Tool.ajax.a01("<.httpRequestPostParam("+URL+",,"+Param+","+arr[0].obj.APPSECRET+",code)/>",1,this.a04,this)
		}
		else
		{
			URL="https://gw.api.alibaba.com/openapi/http/1/system.oauth2/getToken/"+arr[0].obj.APPKEY+"?grant_type=authorization_code&need_refresh_token=true&client_id="+arr[0].obj.APPKEY+"&client_secret="+arr[0].obj.APPSECRET+"&redirect_uri="+url.split("?")[0]+"&code="+ code
			Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,this.a05,this,arr)
		}
	},
  a04:function(t){top.location.href=t;},
  a05:function(t,arr)
	{
		/*
		{
			"access_token": "69949d2a-4361-4966-9200-ea11252e87df",
			"aliId": "193705345",
			"refresh_token": "73631603-7861-4358-8820-21ae18f13bbf",
			"resource_owner": "cn1515434281oqro",
			"expires_in": "35999",
			"refresh_token_timeout": "20191001113427000+0800"
		}
		/////////////////////////////////////
		{
			"access_token": "8c6662f2-3f68-4c95-89c3-3b82269cd5d0",
			"aliId": "193705345",
			"resource_owner": "cn1515434281oqro",
			"expires_in": "35999"
    }
		*/
		eval("let getToken="+t)
		let time=getToken.refresh_token_timeout,token={};
		token.access_token=getToken.access_token;
		arr[0].token=getToken.access_token;
		token.time1=Tool.js_date_time(new Date(new Date().getTime() + 1000*60*60*10));//10小时
		if(getToken.refresh_token)
		{
			token.refresh_token=getToken.refresh_token
			token.time2= time.slice(0,4)+"/"+time.slice(4,6)+"/"+time.slice(6,8)+" "+time.slice(8,10)+":"+time.slice(10,12)+":"+time.slice(12,14)//半年
		}
		else
		{
			token.refresh_token=arr[0].obj.token[0].refresh_token
			token.time2=arr[0].obj.token[0].time2
		}
		let str="<r: db=\"sqlite.aliexpress\">update @.seller set @.token='" + JSON.stringify(token) + "' where @.fromid=" +arr[0].obj.fromid + "</r:>";
		Tool.ajax.a01(str,1,this.a06,this,arr);
	},
  a06:function(t,arr){if(t==""){arr[1].apply(arr[0]);}else{Tool.echo(t);}},
	///////////////////////////////////////////////////////////////////////////////////////////////
  b01:function(A,B,bool)
	{
		let str='\
		[[0],[\
		<r:seller db="sqlite.dhgate" size=50 where=" where @.from=\'aliexpress\' order by @.sort asc">\
		,{APPKEY:"<:APPKEY/>",APPSECRET:"<:APPSECRET/>",UserName:"<:UserName/>",token:['+(bool?'':'<:token/>')+'],fromid:<:fromid/>}\
		</r:seller>\
		]]'
	 Tool.ajax.a01(str,1,this.b02,this,[A,B]);
	},
  b02:function(t,arr)
	{
		eval("let oo="+t)
		let html=''
		for(let i=1;i<oo[0].length;i++)
		{html+='<li '+(oo[0][i].id==obj.arr[2]?'class="active"':'')+' onclick="Tool.main(\''+oo[0][i].id+'\');">'+oo[0][i].name+'</li>';}
		html+='<li style="float:right">切换账户:<select>'
		for(let i=1;i<oo[1].length;i++)
		{html+='<option value="'+oo[1][i].fromid+'">'+oo[1][i].UserName+'</option>';}
		html+='</select></li>'
		html='<ul class="Tul thead">'+html+'</ul><ul class="Mo0"><li class="center"><img src="/'+o.path+'admin/img/loading.gif" align="absmiddle"/></li></ul>'
		$("#table").html(html)
		arr[0].obj.APPKEY=oo[1][1].APPKEY;
		arr[0].obj.APPSECRET=oo[1][1].APPSECRET;
		arr[0].obj.UserName=oo[1][1].UserName;
		arr[0].obj.token=oo[1][1].token;
		arr[0].obj.fromid=oo[1][1].fromid;
		this.a01(arr)
	},
  b03:function()
	{
    return '\
    <header class="panel-heading">\
    <div class="active">配置</div>\
    <div onclick="">产品</div>\
    <div onclick="">公共</div>\
    <div onclick="">图片银行</div>\
    <div onclick="">数据</div>\
    <div onclick="">物流</div>\
    <div onclick="">站内信</div>\
    <div onclick="">类目</div>\
    <div onclick="">营销</div>\
    <div onclick="">评价</div>\
    <div onclick="">运费</div>\
    </header>'
  }
}