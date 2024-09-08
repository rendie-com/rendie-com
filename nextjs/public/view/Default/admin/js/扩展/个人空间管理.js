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
    <header class="panel-heading">个人空间管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
        <th colspan="6">空间管理&nbsp;|&nbsp;模板管理&nbsp;|&nbsp;空间分类</th>\
      </tr>\
      <tr>\
        <th>选择</th>\
        <th>站点名称</th>\
        <th>创建者</th>\
        <th>创建时间</th>\
        <th>状态</th>\
        <th>管理操作</th>\
      </tr>\
      <tr>\
        <td colspan="6">没有用户申请个人空间！</td>\
      </tr>\
      <tr>\
        <td colspan="6"><input type="button" class="pn" value="反选"/>\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的空间 " onclick="{if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){$(\'#action\').val(\'Del\');this.document.selform.submit();return true;}return false;}">\
          <input type="submit" value="批量审核/解锁" onclick="$(\'#action\').val(\'verific\');" class="pn">\
          <input type="submit" value="批量锁定" onclick="$(\'#action\').val(\'lock\');" class="pn">\
          <input type="button" value="开通个人空间" onclick="window.$(parent.document).find(\'#BottomFrame\')[0].src=\'KS.Split.aspx?OpStr=\'+escape(\'空间门户管理 >><font color=red>开通个人空间</font>\')+\'&ButtonSymbol=GO\';location.href=\'KS.Space.aspx?action=add\';" class="pn"></td>\
      </tr>\
      </form>\
    </table>\
    <div>\
      <form action="KS.Space.asp" name="myform" method="get">\
        <div style="border:1px dashed #cccccc;margin:3px;padding:4px"> &nbsp;<strong>快速搜索=></strong> &nbsp;关键字:\
          <input type="text"  name="keyword">\
          &nbsp;条件:\
          <select name="condition">\
            <option value=1>站点名称</option>\
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