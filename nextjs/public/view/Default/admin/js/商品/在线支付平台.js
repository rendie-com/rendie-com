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
    <header class="panel-heading">友情提示：本系统集成多家在线支付接口，您可以在此管理所有的支付平台</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <ul class="Tul center">\
      <li class="w40">编号</li>\
      <li class="w200">支付平台</li>\
      <li class="w200">商家ID</li>\
      <li class="w200">备注说明</li>\
      <li class="w40">手续费</li>\
      <li class="w40">默认</li>\
      <li class="w40">启用</li>\
      <li class="w100">操作</li>\
      <li class="w100">申请商户</li>\
    </ul>\
  <r:paymentplat size=50>\
    <ul class="Tul center tr">\
      <li class="w40">[paymentplat:orderid]</li>\
      <li class="w200">[paymentplat:name]</li>\
      <li class="w200">[paymentplat:accountid]</li>\
      <li class="w200">[paymentplat:des]</li>\
      <li class="w40">[paymentplat:Rate]%</li>\
      <li class="w40"><input type=\'radio\' name=\'IsDefault\' value=\'[paymentplat:id]\'{if [paymentplat:isdefault]==[paymentplat:id]} checked="checked"{/if}class="checkbox" id="radio-[paymentplat:id]"/><label for="radio-[paymentplat:id]">&nbsp;</label></li>\
      <li class="w40"><input type=\'checkbox\' name=\'IsDisabled[paymentplat:id]\' value=\'10\'{if [paymentplat:isdisabled]==1} checked="checked"{/if} class="checkbox" id="check-[paymentplat:id]"/><label for="check-[paymentplat:id]">&nbsp;</label></li>\
      <li class="w100"><a href=\'javascript:;\' onclick="Tool.main(\'{r:arr(3)/>/[paymentplat:id].html\');">修改</a>&nbsp;|&nbsp;\
      {if [paymentplat:isdisabled]==1}\
      <a href=\'ajax/admin_system.aspx?PayMentPlatDisabled/0/[paymentplat:id].html\'>关闭</a>\
      <else/>\
      <a href=\'ajax/admin_system.aspx?PayMentPlatDisabled/1/[paymentplat:id].html\'>启用</a>\
      </if></li>\
      <li class="w100"><a href="[paymentplat:platreg]" target="_blank">申请商户</a></li>\
    </ul>\
  </r:paymentplat>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();