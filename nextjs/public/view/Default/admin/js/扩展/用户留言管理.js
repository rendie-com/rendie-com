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
    let html='<header class="panel-heading">用户留言管理</header>\
    <table class="table table-hover align-middle">\
      <tr>\
      <td>选择</td>\
      <td>留言标题</td>\
      <td>用 户</td>\
      <td>留言人</td>\
      <td>留言时间</td>\
      <td>回复与否</td>\
      <td>审核与否</td>\
      <td>管理操作</td>\
    </tr>\
    <tr>\
      <td align=center colspan="8">没有人发表留言！</td>\
    </tr>\
    <tr>\
      <td colspan="8"><input type="button" class="pn" value="反选"  />\
        <input class="pn" type="submit" name="Submit2" value=" 删除选中的留言 " onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){$(\'#action\').val(\'Del\');this.document.selform.submit();return true;}return false;}">\
        <input type="submit" class="pn" value=" 批量审核 " onclick="$(\'#action\').val(\'verify\')">\
        <input type="submit" class="pn" value=" 批量取消审核 " onclick="$(\'#action\').val(\'unverify\')"></td>\
    </tr>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();