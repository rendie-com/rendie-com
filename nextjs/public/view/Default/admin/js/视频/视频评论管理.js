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
    let str='[{}\
      <r:review size=20 page=4 where=" r Inner Join @.product p on r.:fromid=p.:id where r.:from=\'video\'">\
      ,{\
        "id":[review:r.:id]\
        \
      }\
      </r:review>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(arr)
  {
    let tbody="";
    for(let i=1;i<arr.length;i++)
    {
      tbody+='\
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
        </tr>'
    }
    let html='\
    <header class="panel-heading">视频评论管理</header>\
    <tr>\
      <td colspan="6"> 关键字：\
        <input name="keyword" type="text" id="keyword" size="50" >\
        <input type="submit" name="selectBtn" value="查 询..." class="pn" onClick="location.href=\'ajax/admin_webhelper.aspx?action=comment&where=1&keyword=\'+escape($(\'keyword\').value);" />\
        &nbsp;&nbsp;搜索IP:192.168.1.* </td>\
    </tr><div class="p-2"><table class="table table-hover align-middle">'+this.b01()+'<tbody>'+tbody+'</tbody></table></div>'
    Tool.html(null,null,html)
  },
  b01:function(t)
  {
    let str='\
    <thead class="table-light center">\
    <tr align="center">\
        <td width="60" nowrap="nowrap">ID</td>\
        <td>评论内容</td>\
        <td nowrap="nowrap" width="300">评论数据名称(ID)</td>\
        <td nowrap="nowrap" width="140">时间</td>\
        <td nowrap="nowrap" width="80">评论者IP</td>\
        <td nowrap="nowrap" width="50">操作</td>\
      </tr>\
    </thead>'
    return str
  }
}
fun.a01();