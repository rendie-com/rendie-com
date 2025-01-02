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
    let html='<header class="panel-heading">留言管理</header>\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="9"> 关键字：\
        <input name="keyword" type="text" id="keyword" size="50" value="" >\
        <input type="submit" name="selectBtn" value="查 询..." class="pn" onClick="location.href=\'ajax/admin_webhelper.aspx?action=comment&where=gbook&keyword=\'+escape($(\'keyword\').value);" />\
        &nbsp;&nbsp;搜索IP:192.168.1.* </td>\
    </tr>\
    <form method="post">\
      <tr align="center">\
        <td>ID</td>\
        <td>留言内容</td>\
        <td>留言者IP</td>\
        <td>手机</td>\
        <td>邮箱</td>\
        <td>评分</td>\
        <td>时间</td>\
        <td>评论人</td>\
        <td>操作</td>\
      </tr>\
      <r:leaveword size=25 page=4>\
        <tr align="center">\
          <td align="left"><input type="checkbox" value="[leaveword:id]" name="pre_id" id="check-[leaveword:id]"/>\
            <label for="check-[leaveword:id]">[leaveword:id]</label></td>\
          <td align="left">[leaveword:des]</td>\
          <td>[leaveword:ip]</td>\
          <td>[leaveword:mobile]</td>\
          <td>[leaveword:email]</td>\
          <td align="left">[leaveword:state]</td>\
          <td>[leaveword:addtime]</td>\
          <td>[leaveword:author]</td>\
          <td><a onClick="if(confirm(\'确定要删除吗\')){return true;}else{return false;}" href="ajax/admin_webhelper.aspx?GbookDel-[leaveword:id].html">删除</a></td>\
        </tr>\
      </r:leaveword>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选"  />\
          <input type="submit" value="批量删除" onClick="if(confirm(\'确定要删除吗\')){this.form.action=\'ajax/admin_webhelper.aspx?GbookDel.html\';}else{return false}" class="pn"  />\
          <input type="submit" value="全部删除" onClick="if(confirm(\'确定要删除全部吗\')){this.form.action=\'ajax/admin_webhelper.aspx?GbookDel-all.html\'}" class="pn"/></td>\
      </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();