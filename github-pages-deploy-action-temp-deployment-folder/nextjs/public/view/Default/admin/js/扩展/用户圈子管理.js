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
    let html='<header class="panel-heading">用户圈子管理</header>\
    <table class="table table-hover align-middle">\
      <tr>      <td colspan="6">圈子管理&nbsp;|&nbsp;帖子管理&nbsp;|&nbsp;模板管理&nbsp;|&nbsp;圈子分类</td>    </tr>\
    <tr>\
      <td>选择</td>\
      <td>圈子名称</td>\
      <td>创建者</td>\
      <td>创建时间</td>\
      <td>圈子状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform metdod=post action="KS.SpaceTeam.asp">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'2\' id="ID-2">\
          <label for="ID-2">2</label></td>\
        <td><a href="../space/group.aspx?id=1" target="_blank">dsfddf</a></td>\
        <td>admin</td>\
        <td>2013/1/16 13:02:51</td>\
        <td><font color=red>已审</font></td>\
        <td><a href="../space/group.aspx?id=1" target="_blank">浏览</a>&nbsp;|&nbsp;<a href="?Action=Del&ID=1" onclick="return(confirm(\'删除圈子将删除圈子下的所有信息，确定删除吗？\'));">删除</a>&nbsp;|&nbsp;<a href="?Action=lock&id=1">锁定</a>&nbsp;|&nbsp;<a href="?Action=recommend&id=1">设为推荐</a></td>\
      </tr>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选"/>\
          <input type="hidden" name="action" value="Del">\
          <input class="pn" type="submit" name="Submit2" value="批量删除" onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){document.getElementById(\'action\').value=\'Del\';tdis.document.selform.submit();return true;}return false;}">\
          <input class="pn" type="submit" value="批量审核" onclick="document.getElementById(\'action\').value=\'verific\';">\
          <input class="pn" type="submit" value="批量锁定" onclick="document.getElementById(\'action\').value=\'lock\';">\
          <input class="pn" type="submit" value="批量解锁" onclick="document.getElementById(\'action\').value=\'unlock\';"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();