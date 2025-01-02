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
		urlPath="param2/1/aliexpress.open/api.queryMsgRelationList/"+this.obj.APPKEY
		Param="msgSources=message_center&pageSize=30&currentPage=1&access_token="+this.token
		URL="https://gw.api.alibaba.com/openapi/"+urlPath+"?"+Param+"&_aop_signature=[$1]"
		Tool.ajax.a01("<.httpRequestPostParam("+URL+","+urlPath+","+Param+","+this.obj.APPSECRET+",)/>",1,this.a03,this)
	},
  a03:function(t)
	{
		alert(t)
	},
}
fun.a01();
/*

	function Message(){
		eval("let obj=" + txt);
		productCount=obj.total
		msgList=obj.msgList
		let htmlstr=""
		for(let x in msgList)
		{
			if(msgList[x].messageType=="product")
			{
				des="<a href='"+msgList[x].productUrl+"'target=\"_blank\">"+msgList[x].productName + "</a><br/>"+msgList[x].content
			}
			else if(msgList[x].messageType=="order")
			{
				des="<a href='"+msgList[x].orderUrl+"'target=\"_blank\">"+msgList[x].content+ "</a>"
			}
			else
			{
				des=msgList[x].content
			}
			htmlstr+="<tr align=\"center\">\
			<td title=\"接收者账号:"+msgList[x].receiverLoginId + "\n该字段请直接忽略:"+msgList[x].messageType + "\n(如果是针对产品的，则有产品ID值同typeId,如果不是则为0):"+msgList[x].productId + "\n是否含图片:"+msgList[x].haveFile + "\n订单地址:"+msgList[x].orderUrl + "\n接收者账号:"+msgList[x].receiverLoginId + "\n图片地址:"+msgList[x].fileUrl + "\n发送者账号:"+msgList[x].senderLoginId + "\n（类型ID，如果messageTyp是针对订单的，就是订单ID，如果是针对产品的就是产品ID，以此类推,messageType为member，typeId为0）:"+msgList[x].typeId + "\n订单号:"+msgList[x].orderId + "\n一对用户关系ID:"+msgList[x].relationId + "\n产品名:"+msgList[x].productName+"\n产品地址："+msgList[x].productUrl+"\">"+msgList[x].id + "</td>\
			<td nowrap=\"nowrap\">"+msgList[x].senderName + "</td>\
			<td>"+msgList[x].read+"</td>\
			<td nowrap=\"nowrap\">"+msgList[x].receiverName+"</td>\
			<td align=\"left\">"+des+"</td>\
			<td>"+gmtCreate(msgList[x].gmtCreate)+ "</td>\
			</tr>"
		}
		htmlstr+="<tr><td colspan=\"6\">"+pageshow(productCount,pcount,page,pagelen)+"</td></tr>"//显示分页
		$("#queryMessage").html(htmlstr)
	}
*/