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
    let html='<header class="panel-heading">问答认证专家管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td colspan="12"><b>查看：</b><a href="KS.AskZJ.asp"><font color=#999999>全部</font></a> - <a href="?status=0"><font color=#999999>未审核</font></a> - <a href="?status=1"><font color=#999999>已审核</font></a></td>\
    </tr>\
    <tr>\
      <td width="5%">选择</td>\
      <td>姓名</td>\
      <td>用户名</td>\
      <td>电话/手机</td>\
      <td>回答数</td>\
      <td>申请时间</td>\
      <td>照片</td>\
      <td>身份证</td>\
      <td>执业证</td>\
      <td>推荐</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name="myform" id="myform" method="post" action="?">\
      <input type="hidden" name="action" id="action" value="del">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td>王玉兰</td>\
        <td>test001</td>\
        <td>18982363426</td>\
        <td>1</td>\
        <td>2012/4/1</td>\
        <td><a href=\'\' target=\'_blank\'><img border=\'0\' src=\'\' width=\'40\' height=\'40\'/></a></td>\
        <td>---</td>\
        <td>---</td>\
        <td><a href="?action=Recommend&id=4&v=1"><font color=red>X</font></a></td>\
        <td class="splittd"><a href=\'?action=unverify&id=4\'><font color=blue>已审核</font></a></td>\
        <td class="splittd" noWrap="noWrap"><a href="?action=modify&ID=4">查看编辑</a> | <a href="?action=del&ID=4" onClick="return confirm(\'删除后将不能恢复，您确定要删除吗?\')">删除</a></td>\
      </tr>\
      <tr>\
        <td colspan="12"><input type="button" class="pn" value="反选"" />\
          <input class="pn" type="submit" name="submit_button1" value="批量删除" onClick="$(\'action\').value=\'del\';return confirm(\'您确定执行该操作吗?\');">\
          <input type="submit" value="批量审核" class="pn" onClick="$(\'#action\').val(\'verify\');return(confirm(\'确定批量审核吗?\'));">\
          <input type="submit" value="取消审核" class="pn" onClick="$(\'#action\').val(\'unverify\');return(confirm(\'确定批量取消审核吗?\'));"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();