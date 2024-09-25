'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    this.a02();
  },
  a02:function()
	{
    let html='\
    <table class="table table-hover align-middle">\
      <tr>\
      <td align="right" width="150">URL：</td>\
      <td align="left"><input type="text" id="API_URL" size="60" value="<:attr(API_URL)/>">\
        &nbsp;在 mp.weixin.qq.com 申请到的appID&nbsp;<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl&lang=zh_CN" target="_blank">点此申请</a></td>\
    </tr>\
    <tr>\
      <td align="right">Token：</td>\
      <td align="left"><input type="text" id="API_Token" size="60" value="{EFun(attr(API_Token))}"></td>\
    </tr>\
    <tr>\
      <td align="right">AppId：</td>\
      <td align="left"><input type="text" id="API_AppId" size="60" value="{EFun(attr(API_AppId))}"></td>\
    </tr>\
    <tr>\
      <td align="right">AppSecret：</td>\
      <td align="left"><input type="text" id="API_AppSecret" size="60" value="{EFun(attr(API_AppSecret))}"></td>\
    </tr>\
    <tr>\
      <td align="right">PaySignKey：</td>\
      <td align="left"><input type="text" id="API_PaySignKey" size="60" value="{EFun(attr(API_PaySignKey))}">\
        支付专用签名串 (<a href="https://mp.weixin.qq.com/paymch/readtemplate?t=mp/business/course2_tmpl#1"  target="_blank">支付开发教程</a>) </td>\
    </tr>\
    <tr>\
      <td align="right">PartnerID：</td>\
      <td align="left"><input type="text" id="API_PartnerID" size="60" value="{EFun(attr(API_PartnerID))}">\
        商户号 </td>\
    </tr>\
    <tr>\
      <td align="right">PartnerKey：</td>\
      <td align="left"><input type="text" id="API_PartnerKey" size="60" value="{EFun(attr(API_PartnerKey))}">\
        初始密钥 </td>\
    </tr>\
    <tr>\
      <td align="right">自动回复消息：（<a href="http://mp.weixin.qq.com/wiki/index.php?title=%E5%8F%91%E9%80%81%E8%A2%AB%E5%8A%A8%E5%93%8D%E5%BA%94%E6%B6%88%E6%81%AF"  target="_blank">参考</a>）</td>\
      <td><textarea  id="API_ReplyMessage" style="width:95%;font-family: Arial, Helvetica, sans-serif;font-size: 14px;" wrap="off" rows="25" dataType="Require" msg="请填写回复消息">\{EFun(attr(API_ReplyMessage))}</textarea>\
    <tr>\
      <td align="right"></td>\
      <td align="left"><input type="button" class="pn" value=\'确定保存\' id="OKSave"></td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();

/*

$(document).ready(function(){
	$('#OKSave').click(function(){
	let arr1 = ["API_URL","API_Token", "API_AppId", "API_AppSecret","API_PaySignKey","API_PartnerID","API_PartnerKey"]; 
	let str="{"
	for(let i=0;i<arr1.length;i++)
	{ 
	  val=arr1[i]
	  str+="\""+val+"\":\"" + $("#"+val).val() +"\","
	}
	str+="\"API_ReplyMessage\":\""+escape($("#API_ReplyMessage").val())+"\""
	str+="}"
      $.post("/<.Config(admin)/>/ajax/admin_webhelper.aspx/WeixinSaveConfig.html?rad="+Math.random(),getjson(str),function(result){
          alert(result);
          location.reload();
      });
		
		
	})
})
*/