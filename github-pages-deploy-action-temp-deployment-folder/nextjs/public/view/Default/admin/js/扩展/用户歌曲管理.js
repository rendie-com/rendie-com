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
      <td>歌曲名称</td>\
      <td>上传用户</td>\
      <td>歌 手</td>\
      <td>上传时间</td>\
      <td>管理操作</td>\
    </tr>\
    <tr>\
      <td align=center colspan="6">没有人发表歌曲！</td>\
    </tr>\
    <tr>\
      <td colspan="6"><input type="button" class="pn" value="反选" />\
        <input class="pn" type="submit" name="Submit2" value=" 删除选中的歌曲 " onClick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){this.document.selform.submit();return true;}return false;}"></td>\
    </tr>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();