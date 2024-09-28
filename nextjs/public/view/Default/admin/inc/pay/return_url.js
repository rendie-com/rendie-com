function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {return unescape(r[2]);}
	return null;
}
$(function(){
	switch (o.arr2) {
    case "7":
		  if(o.arr3=="notify")
			{
			  var str='<r: tag="sql">update @.order set @.contactman=\'11111111111\' where @.id=1</r:>'
					$.ajax({type:"post",url:o.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(t){
					  
					}});
			}
			else
			{
				var URL="{rr:WebRequestGet(Fun(P(http://notify.alipay.com/trade/notify_query.do?partner=[paymentplat:Key]&notify_id="+getQueryString("notify_id")+")))}"
				URL='<r:paymentplat where=" where @.id='+o.arr2+'">'+URL+'[分隔符]{r:PP('+window.location.search.substr(1)+')}[分隔符][paymentplat:MD5Key]</r:paymentplat>'
				$.ajax({type:"post",url:o.mode+"exe.html?"+Math.random(),data:{data:escape(URL)},success:function(result){
					var sign=getQueryString("sign")
					var myArr=result.split("[分隔符]"),sortArr=[],myA=myArr[1].split("&")
					for(var i=0;i<myA.length;i++)
					{
						if(myA[i].indexOf("sign=")==0||myA[i].indexOf("sign_type=")==0){continue;}
						else{sortArr[sortArr.length]=myA[i];}
					}
					sortArr.sort();
					var mysign=CryptoJS.MD5(sortArr.join("&").replace(/\//g,"%2F").replace(/\+/g,"%2B")+myArr[2]).toString()
					if(myArr[0]=="true"&&mysign==sign)
					{
						var str='<r: tag="sql">update @.order set @.contactman=\''+getQueryString("buyer_email")+'\',:Status=\'103001\',:PayTime=\''+getQueryString("notify_time")+'\' where @.orderid=\''+getQueryString("out_trade_no")+'\'</r:>'
						$.ajax({type:"post",url:o.mode+"exe.html?"+Math.random(),data:{data:escape(str)},success:function(t){
							document.write("恭喜你！在线支付成功！"+t);
						}});
					}else{document.write("在线支付失败！");}
				}});
			
			}
			break;
    case "2":
		/*
		Dim v_mid, v_oid, v_pmode, v_pstatus, v_pstring, v_amount, v_md5, v_date, v_moneytype
		Dim md5string
		v_mid = AccountID
		
		Dim cmdno, pay_result, pay_info, bill_date, bargainor_id, transaction_id, sp_billno, total_fee, fee_type, md5_sign, attach
		cmdno = KS.S("cmdno")
		pay_result = Request("pay_result")
		pay_info = Request("pay_info")
		bill_date = Request("date")
		bargainor_id = Request("bargainor_id")
		transaction_id = Request("transaction_id")
		sp_billno = KS.S("sp_billno")
		total_fee = Request("total_fee")
		fee_type = Request("fee_type")
		attach = Request("attach")
		md5_sign = Request("sign")
		
		md5string = MD5("cmdno=" & cmdno & "&pay_result=" & pay_result & "&date=" & bill_date & "&transaction_id=" & transaction_id & "&sp_billno=" & sp_billno & "&total_fee=" & total_fee & "&fee_type=" & fee_type & "&attach=" & attach & "&key=" & MD5Key, 32)
		
		If bargainor_id = v_mid And UCase(md5string) = md5_sign And pay_result = 0 Then
			v_oid = sp_billno
			v_amount = total_fee / 100
			v_pstring = ""
			v_pmode = ""
			Call UpdateOrder(v_amount,"在线充值，订单号为:" & v_oid,v_oid,v_pmode)
			Call ShowResult("恭喜你！在线支付成功！")
		Else
			Call ShowResult("在线支付失败！")
		End If
		*/
    break;
    case 3:
		/*
		dim str1,str2,str,paypalurl,objHttp,ResponseTxt,sParts,iParts,sKey,sValue,sResults,Msg
		str1=Trim(KS.S("tx"))
		str2="&at=" &MD5Key                             '这里是Paypal身份标
		str = "?tx="&str1& "&cmd=_notify-synch"&str2
		'paypalurl="https://www.sandbox.paypal.com/cgi-bin/webscr"   '测试接口专用，正式使用要使用以下接口
		paypalurl="https://www.paypal.com/cgi-bin/webscr"            '正式环境使用此接口
		paypalurl=paypalurl&str
		Set objHttp=Server.CreateObject("Msxml2.ServerXMLHTTP.3.0")
		objHttp.setOption 2, 13056 
		objHttp.open "POST",paypalurl,False,"","" 
		objHttp.send()
		ResponseTxt = objHttp.ResponseText           '示例下面有写
		Set objHttp=Nothing
		'-------------------------------------------------核对取得值
		ResponseTxt=UrlDecodes(ResponseTxt)                '将返回值解码并赋给 responsetxt 
		
		'ks.echo ResponseTxt
		
		If Mid(ResponseTxt,1,7) = "SUCCESS" Then          '取得返回值的状态, sucess表示支付成功 ! Fail 表示支付失败 ! 返回值只有这两种情况 !
		ResponseTxt = Mid(ResponseTxt,9)                  '取得除了前9个字符的返回值,并返回给responsetxt
		sParts = Split(ResponseTxt, vbLf)                 '将返回值以vbLf(在vb里面这是回车<换行>的意思)分开,并赋给一个数组sParts
		iParts = UBound(sParts) - 1                      '对这个数组分离取值, 后面的应该都可以看得懂的吧!
		ReDim sResults(iParts, 1)
		dim v_oid,usdmoney,v_amount,remark2,v_pmode,i,aParts
		For i = 0 To iParts
		aParts = Split(sParts(i), "=")
		sKey = aParts(0)
		sValue = aParts(1)
		sResults(i, 0) = sKey
		sResults(i, 1) = sValue
		
		Select Case sKey
		Case "item_number"
		v_oid = Replace(Replace(KS.DelSQL(sValue),"'",""),"%","")
		Case "mc_gross"
		usdmoney = sValue
		v_amount=round(usdmoney*KS.Setting(81),2)
		Case "txn_id"
		dim liushuihao:liushuihao = Trim(sValue)
		Case "payer_email"
		dim payeremail: payeremail=Trim(sValue)
		End Select
		Next
		remark2="支付订单：" & v_oid &"费用!" 
		v_pmode="PayPal"
		Call UpdateOrder(v_amount,remark2,v_oid,v_pmode)
		Msg="恭喜，支付成功！"
		Else
		Msg="对不起支付失败，请联系本站管理员！"
		End If
		Call ShowResult(Msg)
		*/
    break;
  }
})