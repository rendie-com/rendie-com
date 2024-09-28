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
    let html='<header class="panel-heading">企业产品管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <th>选择        </th>\
      <th>产品名称        </th>\
      <th>添加        </th>\
      <th>产品型号        </th>\
      <th>产品价格        </th>\
      <th>属性        </th>\
      <th>状态        </th>\
      <th>管理操作        </th>\
    </tr>\
    <form name=selform method=post action="?">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td><a href="#" onclick="ShowIframe(167)">新疆零食特产&nbsp;红枣五星500g包邮&nbsp;昆仑山和田玉枣&nbsp;</a></td>\
        <td><a href=\'../space/?admin\' target=\'_blank\'>admin</a></td>\
        <td>&nbsp;&nbsp;</td>\
        <td>66 元</td>\
        <td>&nbsp;</td>\
        <td><font color=#999999>已审</font></td>\
        <td><a href="#" onclick="ShowIframe(167)">浏览</a>&nbsp;|&nbsp;<a href="?Action=Del&ID=167" onclick="return(confirm(\'确定删除吗？\'));">删除</a>&nbsp;|&nbsp;<a href="?Action=verific&id=167">审核</a></td>\
      </tr>\
      <tr>\
        <td colspan="8"><input type="button" class="pn" value="反选" />\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的记录">\
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