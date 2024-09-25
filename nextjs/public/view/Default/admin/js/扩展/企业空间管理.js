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
    let html='<header class="panel-heading">企业空间管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td colspan="6">企业管理&nbsp;|&nbsp;模板管理&nbsp;|&nbsp;企业新闻&nbsp;|&nbsp;企业产品</td>\
    </tr>\
    <tr>\
      <td>选择</td>\
      <td>公司名称</td>\
      <td>创建者</td>\
      <td>创建时间</td>\
      <td>站点状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform method=post action=?action=Del>\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'2\' id="ID-2">\
          <label for="ID-2">2</label></td>\
        <td><a href="../space/?admin" target="_blank">漳州市芗城区科科兴信息技术有限公司</a> <font color=red>荐</font></td>\
        <td>admin</td>\
        <td>&nbsp;2012/6/11 18:29:24&nbsp;</td>\
        <td><font color=red>已审</font></td>\
        <td><a href="../space/?admin" target="_blank">浏览</a>&nbsp;|&nbsp;<a href="?action=Edit&username=admin">修改</a> <a href="?Action=Del&ID=70" onclick="return(confirm(\'确定删除该企业吗？\'));">删除</a>&nbsp;|&nbsp;<a href="?Action=Cancelrecommend&id=70"><font color=red>取消推荐</font></a>&nbsp;|&nbsp;<a href="?Action=lock&id=70">锁定</a></td>\
      </tr>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选" />\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的企业 " onclick="">\
          <input type="button" class="pn" value="开通企业空间"/></td>\
      </tr>\
    </form>\
    </table><div>\
    <form action="KS.EnterPrise.asp" name="myform" method="get">\
      <div style="border:1px dashed #cccccc;margin:3px;padding:4px"> &nbsp;<strong>快速搜索=></strong> &nbsp;关键字:\
        <input type="text"  name="keyword">\
        &nbsp;条件:\
        <select name="condition">\
          <option value=1>公司名称</option>\
          <option value=2>用 户 名</option>\
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