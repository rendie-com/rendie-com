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
    let html='<header class="panel-heading">用户相册管理</header>\
    <table class="table table-hover align-middle">\
      <tr>      <td colspan="7">相册管理&nbsp;|&nbsp;照片管理&nbsp;|&nbsp;相册分类</td>    </tr>\
    <tr>\
      <td>选择</td>\
      <td>相册名称</td>\
      <td>创 建 者</td>\
      <td>创建时间</td>\
      <td>状 态</td>\
      <td>类 型</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform method=post action="KS.SpaceAlbum.asp">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'2\' id="ID-2">\
          <label for="ID-2">2</label></td>\
        <td><img src="http://demo.rendie.com/UploadFiles/User/240/xc/201206/2012061212113964907.jpg" width="32" height="32" style="padding:2px;border:1px solid #f1f1f1"> <a href="../space/?240/showalbum/14" target="_blank">柳岩领衔十大女星化身欧洲杯性感足球宝贝(图)(<font color=red>5</font>)</a></td>\
        <td>test123</td>\
        <td>2012/6/12 12:11:41</td>\
        <td><font color=red>已审</font></td>\
        <td><font color=red>完全公开</font></td>\
        <td><a href="?action=modify&id=14">编辑</a> &nbsp;|&nbsp; <a href="../space/?240/showalbum/14" target="_blank">浏览</a> &nbsp;|&nbsp; <a href="?Action=Del&ID=14" onclick="return(confirm(\'删除相册将删除相册里的所有照片，确定删除吗？\'));">删除</a> &nbsp;|&nbsp; <a href="?Action=recommend&id=14">设为推荐</a> &nbsp;|&nbsp; <a href="?Action=lock&id=14">锁定</a></td>\
      </tr>\
      <tr>\
        <td colspan="7"><input type="button" class="pn" value="反选" />\
          <input type="hidden" name="action" value="Del" />\
          <input class="pn" type="submit" name="Submit2" value="批量删除" onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\'))\{document.getElementById(\'action\').value=\'Del\';this.document.selform.submit();return true;}return false;}">\
          <input class="pn" type="submit" name="vbutton" value="批量审核" onclick="document.getElementById(\'action\').value=\'verific\';">\
          <input class="pn" type="submit" name="vbutton" value="批量锁定" onclick="document.getElementById(\'action\').value=\'lock\';">\
          <input class="pn" type="submit" name="vbutton" value="批量解锁" onclick="document.getElementById(\'action\').value=\'unlock\';"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();