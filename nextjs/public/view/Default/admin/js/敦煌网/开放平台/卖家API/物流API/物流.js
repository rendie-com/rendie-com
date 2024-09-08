'use strict';
var fun=
{
	token:"",obj:{username:"",fromid:0,token:[]},
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?obj.arr[4]:1;//翻页
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"-_-20";//切换账户
    F2.a01(this,this.a02);
  },
  a02:function()
  {
		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.shipping.typelist&timestamp=" + new Date().getTime() + "&v=2.0"
		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.a03,this,'&amp;'))
	},
  a03:function(t,URL)
  {
		let html=''
		eval("let arr="+t)		
		if(arr.status.code=="00000000")
		{
			arr=arr.shippingTypeList
		  for(let i=0;i<arr.length;i++)
			{
			  html+="<tr align=\"center\">\
				<td>"+(i+1)+"</td>\
				<td>"+arr[i].shippingTypeId+"</td>\
				<td>"+arr[i].name+"</td>\
				<td>"+arr[i].description+"</td>\
				</tr>"
			}
			html='<table class="tb">\
			<tr>\
			<td>\
				<ul class="makeHtmlTab">\
					<li val="1_tbody" class="hover" onclick="fun.b03()">物流方式(2.0)</li>\
					<li val="2_tbody" onclick="fun.b01()">物流方式(1.0)</li>\
					<li val="3_tbody" onclick="fun.c01()">运费模版</li>\
				</ul>\
				<table class="tb" id="1_tbody">\
				<tr><td colspan="7" id="URL">'+URL+'</td></tr>\
				<tr align="center">\
					<td>编号</td>\
					<td>运输方式主键ID</td>\
					<td>运输方式名称</td>\
					<td>运输方式描述</td>\
					</tr>'+html+'\
				</table>\
			</td>\
			</tr>\
			</table>'
			F2.b01(html,this.obj.fromid)
		}else{alert(t);}
	},
  b01:function()
  {
		$(".tb .makeHtmlTab li").removeAttr('class')
		$("#1_tbody").hide();$("#3_tbody").hide();
		$("[val='2_tbody']").attr("class","hover")
		if($("#2_tbody").length==0)
		{
			let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.shipping.types.get&timestamp=" + new Date().getTime() + "&v=1.0"
			Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.b02,this,'&amp;'))
		}
		else
		{$("#2_tbody").show();}
	},
  b02:function(t,URL)
  {
		let html='',sql=[]
		eval("let arr="+t)		
		if(arr.status.code=="00000000")
		{
			arr=arr.shippingtypeList
		  for(let i=0;i<arr.length;i++)
			{
				sql.push("insert into @.Deliverytype(@.name,:APIopen,:from)values('"+arr[i].name+"','"+arr[i].shippingtypeid+"','dhgate')")
			  html+="<tr align=\"center\">\
				<td>"+(i+1)+"</td>\
				<td>"+arr[i].shippingtypeid+"</td>\
				<td>"+arr[i].vaild+"</td>\
				<td>"+arr[i].deliverytime+"</td>\
				<td>"+(arr[i].website==null?arr[i].name:"<a href=\""+arr[i].website+"\" target=\"_blank\">"+arr[i].name+"</a>")+"</td>\
				<td><img src=\"http://image.dhgate.com/b/shippingcost/"+arr[i].webimage+"\"></td>\
				<td>"+arr[i].scode+"</td>\
				<td nowrap=\"nowrap\">"+arr[i].optiontype+"</td>\
				<td>"+arr[i].shippingtypecode+"</td>\
				<td>"+(arr[i].priceCardUrl==null?"":"<a href=\""+arr[i].priceCardUrl+"\">下载</a>")+"</td>\
				<td align=\"left\">"+arr[i].detail+"<hr/>"+arr[i].description+"<hr/>(快递公司支持国家总数:"+arr[i].countryCount+")(是否支持敦煌网仓库发货:"+arr[i].issupportdhgatewarehouse+")(是否支持自定义运费设置:"+arr[i].issupportself+")(是否支持Dhgate合作物流运费设置:"+arr[i].issupportdhgate+")(是否支持标准运费设置:"+arr[i].issupportstandard+")(是否支持免运费设置:"+arr[i].issupportfree+")</td>\
				</tr>"
			}
			this.sql=sql;
			html='<table class="tb" id="2_tbody">\
				<tr><td colspan="11" id="URL">'+URL+'</td></tr>\
				<tr align="center">\
					<td nowrap="nowrap">编号</td>\
					<td>主键ID</td>\
					<td nowrap="nowrap">合法</td>\
					<td nowrap="nowrap">收货期</td>\
					<td>名称</td>\
					<td>运输方式的图</td>\
					<td title="国际快递编码">编码</td>\
					<td>运输设置模式</td>\
					<td nowrap="nowrap">简码</td>\
					<td nowrap="nowrap">价卡</td>\
					<td>详情</td>\
					</tr>'+html+'\
					<tr><td colspan="11"><a href="javascript:" class="button left" onclick="fun.e01()">采集【物流方式】</a></td></tr>\
				</table>'
			$("#1_tbody").parent().append(html);
		}else{alert(t);}
  },
  b03:function()
	{
		$("#1_tbody").show();$("#2_tbody").hide();$("#3_tbody").hide();
		$(".tb .makeHtmlTab li").removeAttr('class');
		$("[val='1_tbody']").attr("class","hover");
	},
  c01:function()
  {
		$(".tb .makeHtmlTab li").removeAttr('class')
		$("#1_tbody").hide();$("#2_tbody").hide();
		$("[val='3_tbody']").attr("class","hover")
		if($("#3_tbody").length==0)
		{
			let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.shipping.template.list&timestamp=" + new Date().getTime() + "&v=2.0"
			Tool.ajax.a01("<.WebClientPost("+URL+")/>",URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,'&amp;'),this.c02,this,1)
		}
		else
		{$("#3_tbody").show();}
	},
  c02:function(t,URL)
  {
		let html=''
		eval("let arr="+t)		
		if(arr.status.code=="00000000")
		{
			arr=arr.shippingModelList
		  for(let i=0;i<arr.length;i++)
			{
			  html+="<tr align=\"center\">\
				<td>"+(i+1)+"</td>\
				<td><a href=\"javascript:;\" onclick=\"fun.d01('"+arr[i].shippingTempId+"')\">"+arr[i].shippingTempId+"</a></td>\
				<td>"+arr[i].modelName+"</td>\
				<td>"+arr[i].modelDesc+"</td>\
				<td>"+arr[i].createDate+"</td>\
				<td>"+arr[i].modelType+"</td>\
				</tr>"
			}
			html='<table class="tb" id="3_tbody">\
				<tr><td colspan="6" id="URL">'+URL+'</td></tr>\
				<tr align="center">\
					<td>编号</td>\
					<td>模版ID</td>\
					<td>模版名称</td>\
					<td>模版描述</td>\
					<td>创建时间</td>\
					<td>模板类型</td>\
					</tr>'+html+'\
				</table>'
			$("#1_tbody").parent().append(html);
		}else{alert(t);}
	},
  d01:function(id)
  {
		let URL = "http://api.dhgate.com/dop/router?access_token=" + this.token + "&method=dh.shipping.template.get&timestamp=" + new Date().getTime() + "&v=2.0&shippingTempId="+id
		Tool.ajax.a01("<.WebClientPost("+URL+")/>",1,URL.replace(/\[=\]/ig,'=').replace(/\[&\]/ig,this.d02,this,'&amp;'))
	},
  d02:function(t,URL)
  {
		let html='',obj,obj2,html2
		eval("let arr="+t)		
		if(arr.status.code=="00000000")
		{
			obj=arr.shippingModelType
			for(let i=0;i<obj.length;i++)
			{
				html2="";
				obj2=obj[i].shippingModelTypeList
				for(let j=0;j<obj2.length;j++)
				{
				  html2+='<tr align="center">\
					<td>'+obj2[j].startQuantity+'</td>\
					<td>'+obj2[j].endQuantity+'</td>\
					<td>'+obj2[j].quantityStep+'</td>\
					<td>'+obj2[j].startPrice+'</td>\
					<td>'+obj2[j].priceStep+'</td>\
					<td>'+obj2[j].supportGlobal+'</td>\
					<td>'+obj2[j].countryCode+'</td>\
					<td align="left">'+obj2[j].countryName+'</td></tr>'
				}
			  html+='\
				<tr>\
				<td align="right">运费模板类型(shippingModelTypeList):</td>\
				<td>\
				  <table>\
					<tr class="thead"><td colspan="8">运输方式:'+obj[i].shippingTypeId+'</td></tr>\
					<tr align="center">\
					<td nowrap="nowrap">起始数量</td>\
					<td nowrap="nowrap">截至数量</td>\
					<td nowrap="nowrap">数量阶梯</td>\
					<td nowrap="nowrap">起始价格</td>\
					<td nowrap="nowrap">价格阶梯</td>\
					<td nowrap="nowrap">支持到世界各地</td>\
					<td nowrap="nowrap">国家Id列表</td>\
					<td>国家Name列表</td>\
					</tr>'+html2+'</table>\
				</td>\
				</tr>'
			}
			html='\
			<tr><td colspan="6" id="URL">'+URL+'</td></tr>\
			<tr><td align="right" width="200">模版名称(modelName):</td><td>'+arr.modelName+'</td></tr>\
			<tr><td align="right">模版描述(modelDesc):</td><td>'+arr.modelDesc+'</td></tr>\
			<tr><td align="right">创建时间(createDate):</td><td>'+arr.createDate+'</td></tr>\
			<tr><td align="right">模板类型(modelType):</td><td>'+arr.modelType+'</td></tr>\
			'+html
			$("#3_tbody").html(html);
		}else{alert(t);}
	},
  e01:function()
  {//
		let str='<if "<.Db(select count(1) from @.Deliverytype where @.from=\'dhgate\',count)/>"=="0"><r: db="sqlite.dhgate">'+this.sql.join("<1/>")+'</r:><else/>已存在，不添加。</if>'
		Tool.ajax.a01(str,1,this.e02,this)
	},
  e02:function(t)
  {
		if(t=="")
		{window.location.reload();}
		else
		{alert(t);}
	  
	}
}
fun.a01();