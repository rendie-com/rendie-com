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
    let html='<header class="panel-heading">空间博文管理</header>\
    <table class="table table-hover align-middle">\
      <tr>\
        <th>选择</th>\
        <th>标题</th>\
        <th>用户名</th>\
        <th>添加时间</th>\
        <th>状 态</th>\
        <th>管理操作</th>\
      </tr>\
    <form name=selform method=post action="ks.spacelog.asp">\
      <tr>\
        <td>\
          <input type="checkbox" name="ID" value=\'2\' id="ID-2">\
          <label for="ID-2">2</label>\
        </td>\
        <td><a href="#" target="_blank">dsdsdsds</a></td>\
        <td>admin</td>\
        <td>2013/1/16 13:04:09</td>\
        <td>正常</td>\
        <td>\
          <a href="../space/?admin/log/2" target="_blank">浏览</a> &nbsp;|&nbsp; <a href="?Action=Del&ID=2" onclick="return(confirm(\'确定删除该日志吗？\'));">删除</a> \
          &nbsp;|&nbsp; \
          <a href="?Action=Best&id=2">设为精华</a> \
          &nbsp;|&nbsp; <a href="?Action=verific&flag=2&id=2" title="取消审核">取审</a>\
          &nbsp;|&nbsp; <a href="?action=modify&id=2" onclick="window.$(parent.document).find(\'#BottomFrame\')[0].src=\'KS.Split.aspx?OpStr=\'+escape(\'空间门户管理 >><font color=red>修改日志</font>\')+\'&ButtonSymbol=GOSave\';">修改</a>\
          &nbsp;|&nbsp; <a href="javascript:;" onclick="topicpush(2,\'dsdsdsds\');">推送</a>\
        </td>\
      </tr>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" onclick="checkOthers(\'input\',\'pre_id\')" />\
          <input type="hidden" name="action" value="Del">\
          <input type="hidden" name="flag" value="0">\
          <input type="hidden" name="istalk" value="">\
          <input class="pn" type="submit" name="Submit2" value="批量删除" onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\'))\{document.selform.action.value=\'Del\';this.document.selform.submit();return true;}return false;}">\
          <input class="pn" type="submit" value="批量审核" onclick="document.selform.action.value=\'verific\';document.selform.flag.value=\'0\';this.document.selform.submit();return true;">\
          <input class="pn" type="submit" value="批量取消审核" onclick="document.selform.action.value=\'verific\';document.selform.flag.value=\'2\';this.document.selform.submit();return true;">\
        </td>\
      </tr>\
    </form>\
    <tr>\
      <td  class=\'list\' onMouseOver="this.className=\'listmouseover\'" onMouseOut="this.className=\'list\'" colspan=7 align=right><div id=\'fenye\' class=\'fenye\'>\
          <table border="0" align="right">\
            <form action="?1=1" name="pageform" method="post">\
              <tr>\
                <td><a href="?page=1" class="prev">首 页</a><a href="#" class="curr">1</a></td>\
                <td> 转到:\
                  <input  type=\'text\' value=\'1\' name=\'page\' style=\'width:30px;text-align:center;\'>\
                  &nbsp;\
                  <input style=\'height:18px;border:1px #a7a7a7 solid;background:#fff;\' type=\'submit\' value=\'GO\' name=\'sb\'></td>\
              </tr>\
            </form>\
          </table>\
        </div></td>\
    </tr>\
  </table>\
  <div>\
    <form action="KS.SpaceLog.asp" name="myform" method="post">\
      <div style="border:1px dashed #cccccc;margin:3px;padding:4px"> &nbsp;<strong>快速搜索=></strong> &nbsp;关键字:\
        <input type="text"  name="keyword">\
        &nbsp;条件:\
        <select name="condition">\
          <option value=1>日志标题</option>\
          <option value=2>创建者</option>\
        </select>\
        &nbsp;\
        <input type="submit" value="开始搜索" class="pn" name="s1">\
      </div>\
    </form>\
  </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();