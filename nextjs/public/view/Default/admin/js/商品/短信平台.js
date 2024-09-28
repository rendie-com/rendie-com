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
    <header class="panel-heading">短信平台&nbsp;&nbsp;(短信还剩：条；当日发送短 条；)</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
        <td align="right" width="350">是否启用短信功能：</td>\
        <td align="left"><input type="radio" name="isSMS" \
          {if "[config:isSMS]"=="True"}checked="checked"\
          {/if}\
          value="1" id="enable-1" >\
          <label for="enable-1">启用</label>\
          <input type="radio" name="isSMS" value="0" id="enable-0" \
          {if "[config:isSMS]"=="False"}checked="checked"{/if}>\
          <label for="enable-0">不启用</label>\
          &nbsp;&nbsp;&nbsp;&nbsp;\
          若设置为<font color="#FF0000">&quot;启用&quot;</font>，则用户注册成功或在线支付成功将自动发送手机短信通知用户 </td>\
      </tr>\
      <tr>\
        <td align="right">短信平台账号：</td>\
        <td align="left"><input type="text" id="SMSuser" value="[config:SMSuser]"size="50">\
          <font color=red>如果还没有短信平台账号&nbsp;<a href="http://www.c123.cm/" target="_blank">点此申请</a></font></td>\
      </tr>\
      <tr>\
        <td align="right">短信平台密码：</td>\
        <td align="left"><input type="text" id="SMSpwd" value="[config:SMSpwd]"size="50"></td>\
      </tr>\
      <tr>\
        <td align="right"> 会员注册成功后发送的短消息：<br/>\
          可用标签{$UserName},{$PassWord},{$NiceName}<br/>\
          <font color=blue>说明：留空表示不发送</font></td>\
        <td align="left"><textarea id="SMSuserReg" cols=80 rows=4>[config:SMSuserReg]</textarea></td>\
      </tr>\
      <tr>\
        <td align="right">在线支付完成后发送的短消息：<br/>\
          可以用标签 {$ContactMan},{$InputTime},{$OrderID},{$Money}<br/>\
          <font color=blue>说明：留空表示不发送</font></td>\
        <td align="left"><textarea id="SMSPaycomplete" cols=80 rows=4>[config:SMSPaycomplete]</textarea></td>\
      </tr>\
      <tr>\
        <td align="right">委托金额不足发送的短消息：<br/>\
          可以用标签 {$ContactMan},{$InputTime},{$OrderID},{$Money}<br/>\
          <font color=blue>说明：留空表示不发送</font></td>\
        <td align="left"><textarea id="SMSInsufficientAmount" cols=80 rows=4>[config:SMSInsufficientAmount]</textarea></td>\
      </tr>\
    </r:config>\
    <tr>\
      <td align="right"></td>\
      <td align="left"><input type="button" class="pn" value="确定保存" id="smssave"></td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();