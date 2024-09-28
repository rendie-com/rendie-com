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
    let html='<header class="panel-heading">企业新闻管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td colspan="6">企业管理&nbsp;|&nbsp;模板管理&nbsp;|&nbsp;企业产品</td>\
    </tr>\
    <tr>\
      <td>选择</td>\
      <td>新闻标题</td>\
      <td>添加</td>\
      <td>添加时间</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform method=post action="?">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td><a href="#" onclick="ShowIframe(21)">国台办回应谢长廷"民进党与中共无冤仇"说法</a></td>\
        <td>admin</td>\
        <td>2012-6-13 17:21:54</td>\
        <td><font color=red>已审</font></td>\
        <td><a href="?action=modify&id=21">修改</a> &nbsp;|&nbsp; <a href="#" onclick="ShowIframe(21)">浏览</a> &nbsp;|&nbsp; <a href="?Action=Del&ID=21" onclick="return(confirm(\'确定删除吗？\'));">删除</a> &nbsp;|&nbsp; <a href="?Action=verific&id=21">审核</a></td>\
      </tr>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" />\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的新闻">\
          <input type="button" value="批量审核" class="pn">\
          <input type="button" value="批量取消审核" class="pn">\
          <input type="hidden" value="Del" name="Action"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();