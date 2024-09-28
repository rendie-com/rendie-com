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
    <header class="panel-heading">会员积分明细</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="10"> 用户名\
        <input type="text"  name="keyword">\
        <input type="button" value="开始搜索" class="pn"></td>\
    </tr>\
    <tr align="center">\
      <td>ID</td>\
      <td>用户名</td>\
      <td>类型</td>\
      <td>产生时间</td>\
      <td>IP地址</td>\
      <td>收入</td>\
      <td>支出</td>\
      <td>余额</td>\
      <td>操作员</td>\
      <td>备注</td>\
    </tr>\
    <r:logscore size=20 page=4 where=" order by @.id desc">\
      <tr align="center">\
        <td>[logscore:id]</td>\
        <td>[logscore:Name]</td>\
        <td> {if [logscore:type]==0}\
          手工添加\
          {elseif [logscore:type]==1}\
          点广告\
          <else/>\
          点友情链接\
          </if></td>\
        <td>[logscore:AddDate]</td>\
        <td>[logscore:ip]</td>\
        <td>{if [logscore:InOrOutFlag]==1}[logscore:score] 分\
          <else/>\
          -\
          </if></td>\
        <td>{if [logscore:InOrOutFlag]==2}[logscore:score] 分\
          <else/>\
          -\
          </if></td>\
        <td>[logscore:CurrScore] 分</td>\
        <td>[logscore:user]</td>\
        <td>[logscore:descript]</td>\
      </tr>\
    </r:logscore>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();