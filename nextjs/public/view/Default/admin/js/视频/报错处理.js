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
    let html='<header class="panel-heading">报错处理</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="7"><input name="keyword" type="text" id="keyword" size="50" value="" >\
        <input type="submit" name="selectBtn" value="查 询..." class="pn" onClick="location.href=\'ajax/admin_tool.aspx?action=reporterror&where=reporterror&keyword=\'+escape($(\'keyword\').value);" />\
        &nbsp;&nbsp;搜索IP:192.168.1.* </td>\
    </tr>\
      <tr align="center">\
        <td width="60">ID</td>\
        <td>报错内容</td>\
        <td>错误数据名称(ID)</td>\
        <td>报错IP</td>\
        <td>时间</td>\
        <td>报错者</td>\
        <td>操作</td>\
      </tr>\
      <r:type where=" where @.from=\'rendie\' and @.upid=\'Fun(arr(3))\' order by @.sort asc" size=1>\
        <r:info size=25 page=4>\
          <tr align="center">\
            <td align="left"><input type="checkbox" value="[info:id]" name="pre_id" id="pre_id-[info:id]" />\
              <label for="pre_id-[info:id]">[info:id]</label></td>\
            <td align="left">[info:des]&nbsp;<a href="?list-<:id/>-[info:id].html">查看详情</a></td>\
            <td align="left"><r:video id=[info:videoid]> <a href=\'[video:id]\' target=\'_blank\'>[video:name]</a> ([info:videoid])\
                &nbsp;<a href=\'[video:id]\'><font color="#FF0000">处理</font></a> </r:video></td>\
            <td>[info:ip]</td>\
            <td>[info:addtime]</td>\
            <td>[info:author]</td>\
            <td><a onClick="if(confirm(\'确定要删除吗\')){return true;}else{return false;}" href="ajax/admin_tool.aspx?InfoDel-[info:id]" >删除</a></td>\
          </tr>\
        </r:info>\
      </r:type>\
      <tr>\
        <td colspan="7"><input type="button" class="pn" value="反选"  />\
          <input type="submit" value="批量删除" class="pn"/></td>\
      </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();