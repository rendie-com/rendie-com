'use strict';
var fun=
{
	token:"",obj:{},
  a01:function()
	{
		F1.b01(this,this.a02,false);
	},
  a02:function()
	{
		let urlPath,Param,URL
		urlPath="param2/1/aliexpress.open/api.findorderQuery/"+this.obj.APPKEY
		Param="page=1&pageSize=50&access_token="+this.token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		Tool.ajax.a01("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",)/>",1,this.a03,this)
	},
  a03:function(t)
	{
		alert(t)
	},
}
fun.a01();
/*	let page,pcount,pagelen,productCount,aliexpress_APPKEY,aliexpress_APPSECRET
	page=1;pcount=20;pagelen=8-1;
	<r:APIaccount size=1 where=" where @.from='aliexpress' order by @.sort asc">
	aliexpress_APPKEY="[APIaccount:APPKEY]"
	aliexpress_APPSECRET="[APIaccount:APPSECRET]"
	</r:APIaccount>
	<r:type where=" where @.from='rendie' and @.upid='Fun(arr(3))' order by @.sort asc" size=2}
		let list<:i/>url='<.arr(1)/>/list/<:id/>/'
	</r:type>
	function product(){//显示产品列表
		let urlPath,Param,URL,txt,access_token=getCookie("aliexpress_access_token")
		urlPath="param2/1/aliexpress.open/api.findorderQuery/"+aliexpress_APPKEY
		Param="pageSize="+pcount+"&page="+page+"&createDateStart=3/08/2013 00:00:00&createDateEnd=12/08/2014 00:00:00&access_token="+access_token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param
		txt=$.ajax({type:"POST",url:"exe.html?"+Math.random(),data:{data:escape("{"+"Fun(WebClientPost("+URL+"))}")},async:false}).responseText;
		eval("let obj="+txt);
		productCount=obj.totalItem
		let htmlstr="",gmtPayTime
		if(productCount!=0)
		{
			for(let i=0;i<obj.order.length;i++)
			{
				gmtPayTime=obj.order[i].gmtPayTime;if(!gmtPayTime){gmtPayTime=""}else{gmtPayTime=gmtCreate(gmtPayTime)}
				htmlstr+="<tr align=\"center\">\
				<td nowrap=\"nowrap\"><a href=\""+list1url+obj.order[i].orderId+".html\" >"+obj.order[i].orderId+"</a></td>\
				<td align=\"left\">"+products(obj.order[i].product)+"</td>\
				<td>"+gmtCreate(obj.order[i].gmtCreate)+"</td>\
				<td>"+gmtPayTime+"</td>\
				<td>"+(obj.order[i].payAmount.amount).toFixed(2)+"</td>\
				<td nowrap=\"nowrap\">"+CNorderStatus(obj.order[i])+FuntimeoutLeftTime(obj.order[i].timeoutLeftTime)+"</td>\
				</tr>"
			}
		}
		htmlstr+="<tr><td colspan=\"6\">"+pageshow(productCount,pcount,page,pagelen)+"</td></tr>"//显示分页
		$("#findAeProductById").html(htmlstr)
	}
	function pagelist(p){page=p;product();return false;}
	function products(obj){
		let str="<table width=\"100%\">",memo
		for(let i=0;i<obj.length;i++)
		{
			memo=obj[i].memo
			if(!memo){memo=""}else{memo="<hr>产品备注:"+memo}
			str+='<tr>\
					<td>\
					<a target="_blank" href="'+obj[i].productSnapUrl+'">\
					<img style="margin:2px;padding:1px;border:1px solid #ccc" src="'+obj[i].productImgUrl+'" title="点击预览" border="0" width="50" height="50" align="left">\
					</a>\
					</td>\
					<td>\
					<a href="'+obj[i].productSnapUrl+'" target="_blank">'+obj[i].productName+'</a><hr/>\
					产品数量:'+obj[i].productCount+'（'+obj[i].productUnit+'）&nbsp;&nbsp;\
					物流金额:'+(obj[i].logisticsAmount.amount).toFixed(2)+'（'+obj[i].logisticsAmount.currencyCode+'）&nbsp;&nbsp;\
					产品金额:'+(obj[i].productUnitPrice.amount).toFixed(2)+'（'+obj[i].productUnitPrice.currencyCode+'）&nbsp;&nbsp;\
					物流服务:'+obj[i].logisticsServiceName+'&nbsp;&nbsp;'+memo+'\
					</td>\
				</tr>'
		}
		return str+"</table>"
	}
	function CNorderStatus(obj){
		switch(obj.orderStatus)
		{
			case "PLACE_ORDER_SUCCESS":return "等待买家付款";break;
			case "IN_CANCEL":return "买家申请取消";break;
			case "WAIT_SELLER_SEND_GOODS":return "等待您发货<br/><input type='button' class=\"pn\" value='立即发货'onClick=\"window.location.href='"+list2url+obj.orderId+"/"+escape(obj.product[0].logisticsServiceName).replace(/\%/g,"_")+".html'\"><br/><font color=red>剩余发货时间:"+obj.leftSendGoodDay+"天"+obj.leftSendGoodHour+"时"+obj.leftSendGoodMin+"分钟</font>";	break;
			case "SELLER_PART_SEND_GOODS":return "部分发货";break;
			case "WAIT_BUYER_ACCEPT_GOODS":return "等待买家收货";break;
			case "FUND_PROCESSING":return "买家确认收货后，等待退放款处理的状态";break;
			case "FINISH":return "已结束的订单";break;
			case "IN_ISSUE":return "含纠纷的订单";break;
			case "IN_FROZEN":return "冻结中的订单";break;
			case "WAIT_SELLER_EXAMINE_MONEY":return "等待您确认金额";break;
			case "RISK_CONTROL":return "订单处于风控24小时中，从买家在线支付完成后开始，持续24小时";break;
			default:return "未知"
		}
	}
	function FuntimeoutLeftTime(ss){
		if(ss)
		{
		  let now=new Date().getTime()+ss
		  return "<br/>超时时间:"+js_date_time(now/1000)
		}else{return ""}
	}
*/