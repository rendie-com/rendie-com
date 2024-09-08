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
    <header class="panel-heading">所有发票记录</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr align="center">\
      <td width="70">ID</td>\
      <td>发票抬头</td>\
      <td>日期</td>\
      <td>客户名称</td>\
      <td>用户名</td>\
      <td width="150">订单编号</td>\
      <td width="90">发票类型</td>\
      <td width="90">发票号码</td>\
      <td width="90">订单金额</td>\
      <td align="left">开票人</td>\
    </tr>\
    <r:loginvoice size=20 page=4>\
      <tr align="center">\
        <td align="left"><input type="checkbox" value="[loginvoice:id]" name="pre_id"  class="checkbox" id="check-[loginvoice:id]"/>\
          <label for="check-[loginvoice:id]">[loginvoice:id]</label></td>\
        <td align="left"><a href="[loginvoice:id]">[loginvoice:InvoiceContent]</a></td>\
        <td>[loginvoice:InputTime]</td>\
        <td>[loginvoice:clientname]</td>\
        <td>[loginvoice:username]</td>\
        <td>[loginvoice:orderid]</td>\
        <td>{if [loginvoice:InvoiceType]==2}增值税发票{elseif [loginvoice:InvoiceType]==1}普通发票\
          <else/>\
          不需要发票\
          </if></td>\
        <td>[loginvoice:InvoiceNum]</td>\
        <td>[loginvoice:MoneyTotal f=2] 元</td>\
        <td align="left">[loginvoice:handlername]</td>\
      </tr>\
    </r:loginvoice>\
    <tr>\
      <td colspan="10"><input type="button" class="pn" value="反选"/>\
        <input id="loginvoiceDel" type="button" class="pn" value="批量删除"/>\
        </td>\
    </tr>\
    </table>\
    <div>'
    Tool.html(null,null,html)
  }
}
fun.a01();

/*$(function(){
                $("#loginvoiceDel").click(function(){
                  let ids=""
                  if(confirm('将删除日志不可恢复,确定删除该日志吗？'))
                  {
                    $('input[name="pre_id"]:checked').each(function(){
                        if(ids=="")
                        {
                          ids=$(this).val()
                        }
                        else
                        {
                          ids=ids+","+$(this).val()
                        }
                    });
                    if(ids==""){alert("请选择ID");return false}
                    $.get("ajax/admin_shop.aspx?loginvoiceDel/"+ids+Math.random(),function(result)
                    {
                        window.location.reload();
                    });
                  }
                });
              })*/