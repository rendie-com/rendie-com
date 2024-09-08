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
        <td align="left" colspan="8">\
        关键字 <input type="text" id="searchword" size="50" value="<.unarr(4)/>">\
        <input type="button" value="查 询..." class="pn" id="selectBtn" />\
        </td>\
    </tr>\
    <tr align="center">\
      <td width="70">编号<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/id.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>联系人<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/contact.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>邮箱<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/email.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>移动电话<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/Fixed.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>固定电话<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/mobile.html"><img src="/{r:Path/>admin/img/minus.gif" title="按ID排序" /></a></td>\
      <td>状态<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/id.html"><img src="/{r:Path/>admin/img/minus.gif" title="按状态排序" /></a></td>\
      <td>公司网址<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/CompanyWeb.html"><img src="/{r:Path/>admin/img/minus.gif" title="按公司网址排序" /></a></td>\
      <td>来源网址<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/fromurl.html"><img src="/{r:Path/>admin/img/minus.gif" title="按来源网址排序" /></a></td>\
      <td>最近发送时间<a href="?<.arr(0)/>/<.arr(2)/>/<.arr(3)/>/<.arr(4)/>/{r:arr(5)/>/sendtime.html"><img src="/{r:Path/>admin/img/minus.gif" title="按时间排序" /></a></td>\
      <td align="center">操作</td>\
    </tr>\
    <form method="post">\
    <r:client size=20 page=4>\
    <tr align="center">\
      <td align="left"><input type="checkbox" value="[client:id]" name="pre_id"  class="checkbox" id="check-[client:id]"/><label for="check-[client:id]">[client:id]</label></td>\
      <td align="left">[client:contact]</td>\
      <td>[client:email]</td>\
      <td>[client:Fixed]</td>\
      <td>[client:mobile]</td>\
      <td>{if [client:inbase]==2}已订阅{elseif [client:inbase]==1}<font color="red">取消订阅</font><else/>系统订阅</if></td>\
      <td><a href="[client:CompanyWeb]" target="_blank">[client:CompanyWeb len=20]</a></td>\
      <td><a href="[client:fromurl]" target="_blank">[client:fromurl len=20]</a></td>\
      <td>[client:sendtime]</td>\
      <td align="center">\
        <a href="[client:id]">编辑</a>&nbsp;|&nbsp;\
        <a href="ajax/admin_gathersoft.aspx?TempNewsDel/[client:id].html" onClick="return confirm(\'确定要删除吗\')">删除</a>\
      </td>\
    </tr>\
    </r:client>\
    <tr>\
      <td colspan="10">\
       <input type="button" class="pn" value="反选"  />  \
       <input type="submit" value="批量删除"class="pn" />\
       <input type="submit" value="全部删除"  class="pn" />\
      </td>\
    </tr>\
  </form>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();