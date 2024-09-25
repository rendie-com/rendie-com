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
    <header class="panel-heading">短信推广</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <FORM name=myform action="ajax/admin_system.aspx?SMSsend.html" method="post">\
      <tr>\
        <td align="right">对方手机号码：</td>\
        <td align="left"><textarea name="phone" cols="100" rows="20">15914295774,13058073477</textarea></td>\
      </tr>\
      <tr>\
        <td align="right">发送的短信内容：</td>\
        <td align="left"><textarea name="content" cols="100" rows="3"></textarea>\
          <font color="red">&nbsp;控制在67个字以内</font></td>\
      </tr>\
      <tr>\
        <td align="right"></td>\
        <td align="left"><input type=\'submit\' class="pn" value=\'发送\'></td>\
      </tr>\
    </FORM>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();