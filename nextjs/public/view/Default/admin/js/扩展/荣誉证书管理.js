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
    let html='<header class="panel-heading">企业荣誉证书管理</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td>选择</td>\
      <td>证书名称</td>\
      <td>添加</td>\
      <td>发证机构</td>\
      <td>生效日期</td>\
      <td>截止日期</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform method=post action="?">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td><a href="#" onclick="ShowIframe(7)">营业执照</a></td>\
        <td><a href=\'../space/?admin\' target=\'_blank\'>admin</a></td>\
        <td>营业执照</td>\
        <td>2012-05-02 15:5:49</td>\
        <td>2012-05-18 15:5:50</td>\
        <td><font color=#999999>已审</font></td>\
        <td><a href="#" onclick="ShowIframe(7)">浏览</a>&nbsp;|&nbsp; <a href="?Action=Del&ID=7" onclick="return(confirm(\'确定删除吗？\'));">删除</a>&nbsp;|&nbsp; <a href="?Action=verific&id=7">审核</a></td>\
      </tr>\
      <tr>\
        <td colspan="8"><input type="button" class="pn" value="反选"/>\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的证书" onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){this.form.Action.value=\'Del\';this.form.submit();return true;}return false;}">\
          <input type="button" value="批量审核" class="pn" onclick="this.form.Action.value=\'verific\';this.form.submit();">\
          <input type="button" value="批量取消审核" class="pn" onclick="this.form.Action.value=\'unverific\';this.form.submit();">\
          <input type="hidden" value="Del" name="Action"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();