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
    <header class="panel-heading">所有资金明细记录</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr align="center">\
      <td>ID<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/ID.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>交易时间<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/time.html"><img src="/{r:Path/>admin/img/minus.gif" title="按时间排序" /></a></td>\
      <td>用户名<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/username.html"><img src="/{r:Path/>admin/img/minus.gif" title="按用户名排序" /></a></td>\
      <td>交易方式<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/type.html"><img src="/{r:Path/>admin/img/minus.gif" title="按交易方式排序" /></a></td>\
      <td>收入金额</td>\
      <td>支出金额</td>\
      <td>余额<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/money.html"><img src="/{r:Path/>admin/img/minus.gif" title="按余额排序" /></a></td>\
      <td align="left">备注/说明</td>\
    </tr>\
    <r:logmoney size=30 page=4 where=" order by @.id desc">\
      <tr align="center">\
        <td>[logmoney:id]</td>\
        <td>[logmoney:time]</td>\
        <td><r:user where=" where @.id=[logmoney:userid]" size=1>[user:name]</r:user></td>\
        <td> {if [logmoney:MoneyType]==1}\
          现金{elseif [logmoney:MoneyType]==2/}\
          汇款{elseif [logmoney:MoneyType]==3/}\
          在线支付{elseif [logmoney:MoneyType]==4/}\
          虚拟货币\
          <else/>\
          未知\
          </if></td>\
        <td>{if [logmoney:IncomeOrPayOut]==1}[logmoney:money f=2] 元\
          <else/>\
          -\
          </if></td>\
        <td>{if [logmoney:IncomeOrPayOut]==2}[logmoney:money f=2] 元\
          <else/>\
          -\
          </if></td>\
        <td>[logmoney:currmoney f=2]</td>\
        <td align="left">[logmoney:remark]</td>\
      </tr>\
    </r:logmoney>\
    <tr align="center">\
      <td colspan="4" align="right">总计金额：</td>\
      <td><r:logmoney size=1 where=" where @.IncomeOrPayOut=1">[logmoney:sum(@.Money) f=2] 元</r:logmoney></td>\
      <td><r:logmoney size=1 where=" where @.IncomeOrPayOut=2">[logmoney:sum(@.Money) f=2] 元</r:logmoney></td>\
      <td></td>\
      <td></td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();