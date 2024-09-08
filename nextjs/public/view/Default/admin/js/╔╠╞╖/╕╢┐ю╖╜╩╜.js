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
    <header class="panel-heading">付款方式</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
       <tr align="center">\
      <td>编号</td>\
      <td>付款方式名称</td>\
      <td>折扣率</td>\
      <td>排序</td>\
      <td>是否默认</td>\
      <td>管理操作</td>\
    </tr>\
    <form method="post" name="editform">\
      <r:Paymenttype size=50>\
        <tr align="center">\
          <td><input type="checkbox" name="pre_id" value="[Paymenttype:id]" id="check-[Paymenttype:id]"/>\
            <label for="check-[Paymenttype:id]">[Paymenttype:id]</label></td>\
          <td><input  name="Name[Paymenttype:id]" type="text"  value="[Paymenttype:name]" size="25"></td>\
          <td><input style="text-align:center" name="Discount[Paymenttype:id]" type="text" id="Discount" value="[Paymenttype:Discount]" size="8">\
            %</td>\
          <td><input style="text-align:center" name="OrderID[Paymenttype:id]" type="text"  id="OrderID" value="[Paymenttype:OrderID]" size="8"></td>\
          <td><input type="radio" name="isDefault" value="[Paymenttype:id]" id="radio-[Paymenttype:id]" {if 1==[Paymenttype:isDefault]}checked="checked"{/if}/>\
            <label for="radio-[Paymenttype:id]">&nbsp;</label></td>\
          <td><a href="ajax/admin_shop.aspx?PaymentType/del/[Paymenttype:id].html">删除</a></td>\
        </tr>\
      </r:Paymenttype>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" />\
          <input type="submit" value="批量删除"  class="pn"/>\
          <input type="submit" value="批量修改选中" class="pn" /></td>\
      </tr>\
    </form>\
    <form action="ajax/admin_shop.aspx?PaymentType/add.html" method="post">\
      <tr class="thead">\
        <td colspan="6">&gt;&gt;新增付款方式<<</td>\
      </tr>\
      <tr align="center">\
        <td>&nbsp;</td>\
        <td>付款方式名称<br/>\
          <input name="TypeName" type="text"  id="TypeName" size="25"></td>\
        <td>折扣率<br/>\
          <input style="text-align:center" name="Discount" type="text"  size="8">\
          %</td>\
        <td>排序<br/>\
          <input style="text-align:center" name="OrderID" type="text"  id="orderid" size="8">\
        <td>&nbsp;</td>\
        <td><input name="Submit3" class="pn" type="submit" value="OK,提交"></td>\
      </tr>\
    </form>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();