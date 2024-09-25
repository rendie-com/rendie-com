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
    <header class="panel-heading">商品评论管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="6"> 关键字：\
        <input name="keyword" type="text" id="keyword" size="50" >\
        <input type="submit" name="selectBtn" value="查 询..." class="pn" onClick="location.href=\'ajax/admin_webhelper.aspx?action=comment&where=1&keyword=\'+escape($(\'keyword\').value);" />\
        &nbsp;&nbsp;搜索IP:192.168.1.* </td>\
    </tr>\
    <form method="post">\
      <tr align="center">\
        <td nowrap="nowrap">ID</td>\
        <td>评论内容</td>\
        <td>评论数据名称(ID)</td>\
        <td>时间</td>\
        <td>评论者IP</td>\
        <td>操作</td>\
      </tr>\
      <r:review size=25 page=3 where=" r Inner Join @.product p on r.:fromid=p.:id where r.:from=\'product\'">\
      <tr align="center">\
        <td align="left"><input type="checkbox" value="[review:r.:id]" name="pre_id" id="pre_id-[review:r.:id]" />\
          <label for="pre_id-[review:r.:id]">[review:r.:id]</label></td>\
        <td align="left"> [review:r.:des len=70]&nbsp; \
          （<a href="[review:r.:id]">查看详情</a>） </td>\
        <td><a href="[review:p.:id]" target="_blank" title="[review:p.:name]">[review:p.:name len=40]([review:r.:fromid])</a></td>\
        </td>\
        <td>[review:r.:addtime]</td>\
        <td>([review:r.:ip])</td>\
        <td><a onClick="if(confirm(\'确定要删除吗\')){return true;}else{return false;}" href="ajax/admin_webhelper.aspx?CommentDelProduct/[review:r.:id]" >删除</a></td>\
      </tr>\
      </r:review>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" />\
          <input type="submit" value="批量删除" class="pn"/>\
          <input type="submit" value="全部删除"  class="pn"/>\
      </tr>\
    </form>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();