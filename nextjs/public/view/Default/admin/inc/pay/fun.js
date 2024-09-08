function paypal(cartArr,obj2)
{
	//ITEMAMT	订单所有物品的价格
	var TOKEN,ITEMAMT,obj=Object(),txt
	//var paypalurl="https://api-3t.sandbox.paypal.com/nvp"//测试接口专用，正式使用要使用以下接口
	//var paypalwebscr="https://www.sandbox.paypal.com/webscr"//测试接口专用，正式使用要使用以下接口
	var paypalurl="https://api-3t.paypal.com/nvp"//正试接口专用，正式使用要使用以下接口
	var paypalwebscr="https://www.paypal.com/webscr"//正试接口专用，正式使用要使用以下接口
	ITEMAMT=obj2.AllTotal
	obj.TAXAMT=0//parseFloat((ITEMAMT*0.05).toFixed(2))//税费+5%
	obj.SHIPPINGAMT=0//订单的邮费总额
	obj.SHIPDISCAMT=0//订单的邮费折扣，
	obj.INSURANCEAMT=0//订单的邮寄保费总额
	obj.AMT=(parseFloat(ITEMAMT)+obj.SHIPPINGAMT+obj.SHIPDISCAMT+parseFloat(obj.TAXAMT)+obj.INSURANCEAMT).toFixed(2)
	obj.MAXAMT=25+obj.AMT
	obj.SHIPPINGAMT=obj.SHIPPINGAMT.toFixed(2)
	URL=paypalurl+"?METHOD[=]SetExpressCheckout[&]\
ADDRESSOVERRIDE[=]1[&]\
SHIPTONAME[=]"+obj2.contactName+"[&]\
SHIPTOSTREET[=]"+obj2.streetAddress+"[&]\
SHIPTOCITY[=]"+obj2.addressCity+"[&]\
SHIPTOSTATE[=]"+obj2.province+"[&]\
SHIPTOCOUNTRYCODE[=]"+obj2.countryRegion+"[&]\
SHIPTOZIP[=]"+obj2.adressPostalCode+"[&]\
"+cartArr.join("[&]")+"[&]\
L_SHIPPINGOPTIONAMOUNT0[=]"+obj.SHIPPINGAMT+"[&]\
L_SHIPPINGOPTIONLABEL0[=]null[&]\
L_SHIPPINGOPTIONNAME0[=]null[&]\
L_SHIPPINGOPTIONISDEFAULT0[=]true[&]\
MAXAMT[=]"+obj.MAXAMT+"[&]\
AMT[=]"+obj.AMT+"[&]\
ITEMAMT[=]"+ITEMAMT+"[&]\
CALLBACKTIMEOUT[=]4[&]\
INSURANCEAMT[=]"+obj.INSURANCEAMT+"[&]\
INSURANCEOPTIONOFFERED[=]true[&]\
CALLBACK[=]https://d-sjn-00513807/callback.pl[&]\
SHIPPINGAMT[=]"+obj.SHIPPINGAMT+"[&]\
SHIPDISCAMT[=]"+obj.SHIPDISCAMT+"[&]\
TAXAMT[=]"+obj.TAXAMT+"[&]\
RETURNURL[=]http://"+obj2.siteUrl+"/Default.aspx/en/product/Receive.html?AMT="+obj.AMT+"&orderid="+obj2.orderid+"[&]\
CANCELURL[=]http://"+obj2.siteUrl+"/SetExpressCheckout.asp?paymentType=Sale[&]\
CURRENCYCODE[=]USD[&]\
PAYMENTACTION[=]Sale[&]\
USER[=]"+obj2.accountid+"[&]\
PWD[=]"+(obj2.MD5Key).split("|")[0]+"[&]\
SIGNATURE[=]"+(obj2.MD5Key).split("|")[1]+"[&]\
VERSION[=]65.1"
	txt=$.ajax({type:"POST",url:o.mode+"exe.html?"+Math.random(),data:{data:escape("{r:WebClientPost("+URL+")}")},async:false}).responseText;
	location.href=paypalwebscr+"?cmd=_express-checkout&token="+(txt.split("&")[0]).split("=")[1]
}
function bodyBackground()
{
	var E=window.parent.document;
	var C=E.createElement('div');
	var H=E.body
	C.style.cssText='margin:0px; padding:0px;border:0px;background-color:rgb(255, 255, 255);background-image:none;position: absolute;z-index:11000;top:0px;left:0px;opacity:0.5; width:'+(Math.max(H.scrollWidth,H.clientWidth,E.scrollWidth||0)-1)+'px; height:'+(Math.max(H.scrollHeight,H.clientHeight,E.scrollHeight||0)-15)+'px;';
	E.body.appendChild(C)
}