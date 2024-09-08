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
    <header class="panel-heading">多系统整合接口设置</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <r:config size=1>\
    <li class="Tul thead"></li>\
    <ul class="Tul tr">\
      <li class="w250 right">微信登录AppID：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'API_WeiXinAppId\',\'[config:API_WeiXinAppId]\')">[config:API_WeiXinAppId]</li>\
      <li><font color="red">open.weixin.qq.com 申请到的appid,<a href="https://open.weixin.qq.com/" target="_blank">点此申请</a>。</font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">微信登录AppSecret：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'API_WeiXinAppKey\',\'[config:API_WeiXinAppKey]\')">[config:API_WeiXinAppKey]</li>\
      <li><font color="red">open.weixin.qq.com 申请到的AppSecret。</font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">微信登录后跳转的地址：</li>\
      <li class="w500 txtli" ondblclick="input_text($(this),\'API_WeiXinCallBack\',\'[config:API_WeiXinCallBack]\')">[config:API_WeiXinCallBack]</li>\
      <li><font class="tips">微信账号登录成功后跳转的地址,不可改。</font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">QQ登录AppID：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'api_qqappid\',\'[config:api_qqappid]\')">[config:api_qqappid]</li>\
      <li> 申请到的appID&nbsp;<a href="http://connect.opensns.qq.com/apply" target="_blank">点此申请</a></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">QQ登录AppKey：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'api_qqappkey\',\'[config:api_qqappkey]\')">[config:api_qqappkey]</li>\
      <li> 申请到的appkey</li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">QQ登录后跳转的地址：</li>\
      <li class="w500 txtli" ondblclick="input_text($(this),\'api_qqcallback\',\'[config:api_qqcallback]\')">[config:api_qqcallback]</li>\
      <li> QQ登录成功后跳转的地址,不可改。</li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">支付宝合作者身份ID：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'api_alipaypartner\',\'[config:api_alipaypartner]\')">[config:api_alipaypartner]</li>\
      <li><font color=red>如果还没有与支付宝签约&nbsp;<a href="https://b.alipay.com/newIndex.htm" target="_blank">点此申请</a></font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">支付宝安全检验码Key：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'api_alipaykey\',\'[config:api_alipaykey]\')">[config:api_alipaykey]</li>\
      <li></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">支付宝快捷登录后跳转的地址：</li>\
      <li class="w500 txtli" ondblclick="input_text($(this),\'api_alipayreturnurl\',\'[config:api_alipayreturnurl]\')">[config:api_alipayreturnurl]</li>\
      <li> 支付宝快捷登录成功后跳转的地址,不可改。</li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">新浪微博登录App Key：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'API_SinaId\',\'[config:API_SinaId]\')">[config:API_SinaId]</li>\
      <li><font color="red">新浪微博登录API<a href="http://open.weibo.com/" target="_blank">点此申请</a>。</font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">新浪微博登录App Secret：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'API_SinaKey\',\'[config:API_SinaKey]\')">[config:API_SinaKey]</li>\
      <li><font color="red">新浪微博登录申请到的App Secret</font></li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">新浪微博登录后跳转的地址：</li>\
      <li class="w500 txtli" ondblclick="input_text($(this),\'API_SinaCallBack\',\'[config:API_SinaCallBack]\')">[config:API_SinaCallBack]</li>\
      <li> 新浪微博登录成功后跳转的地址,不可改。</li>\
    </ul>\
    <ul class="Tul tr">\
      <li class="w250 right">物流跟踪身份授权key：</li>\
      <li class="w350 txtli" ondblclick="input_text($(this),\'API_DeliveryAPI_Key\',\'[config:API_DeliveryAPI_Key]\')">[config:API_DeliveryAPI_Key]</li>\
      <li><font color="red">如果还没有快递查询身份授权key，请<a href="http://www.kuaidi100.com/openapi/applyapi.shtml" target="_blank">点此申请</a> 。</font></li>\
    </ul>\
  </r:config>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();