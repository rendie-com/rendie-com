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
    <header class="panel-heading">线下充值卡管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="12"><a href="ajax/admin_user.aspx?cardtype=0">所有充值卡</a> | <a href="ajax/admin_user.aspx?status=1&cardtype=0">未使用充值卡</a> | <a href="ajax/admin_user.aspx?status=2&cardtype=0">已使用充值卡</a> | <a href="ajax/admin_user.aspx?status=3&cardtype=0">已失效充值卡</a> | <a href="ajax/admin_user.aspx?status=4&cardtype=0">未失效充值卡</a> | <a href="ajax/admin_user.aspx?action=Add&cardtype=0">添加充值卡</a> | <a href="ajax/admin_user.aspx?action=AddMore&cardtype=0">批量生成充值卡</a></td>\
    </tr>\
    <tr align="center">\
      <td>ID</td>\
      <td>名称</td>\
      <td>充值卡号</td>\
      <td>密码</td>\
      <td>面值</td>\
      <td>点数/天数</td>\
      <td>过期时间</td>\
      <td>出售</td>\
      <td>使用</td>\
      <td>使用者</td>\
      <td>充值时间</td>\
      <td>操作</td>\
    </tr>\
    <form name="selform" method="post" action="admin_user.aspx?UserCardDel.html">\
      <r:usercard size=15 page=4>\
        <tr align="center">\
          <td align="left"><input type="checkbox" name="pre_id" value="[usercard:id]" id="pre_id-[usercard:id]">\
            <label for="pre_id-[usercard:id]">[usercard:id]</label></td>\
          <td>[usercard:GroupName]</td>\
          <td>[usercard:CardNum]</td>\
          <td>[usercard:CardPass]</td>\
          <td>[usercard:money]元</td>\
          <td>[usercard:ValidNum]点</td>\
          <td>[usercard:EndDate]</td>\
          <td>{if [usercard:IsSale]==0}未出售\
            <else/>\
            已出售\
            </if></td>\
          <td>{if [usercard:IsUsed]==0}未使用\
            <else/>\
            已使用\
            </if></td>\
          <td>[usercard:UserName]</td>\
          <td>[usercard:UseDate]</td>\
          <td><a href="ajax/admin_user.aspx?action=Edit&ID=110&cardtype=0">修改</a>&nbsp;|&nbsp;<a href="ajax/admin_user.aspx?action=Del&cardtype=0&ID=110">删除</a></td>\
        </tr>\
      </r:usercard>\
      <tr>\
        <td colspan=13><input type="button" class="pn" value="反选" onClick="checkOthers(\'input\',\'pre_id\')" />\
          <input class="pn" type="button" value="批量删除" onClick="if(confirm(\'此操作不可逆，确定要删除选中的记录吗?\')){this.document.selform.submit();return true;}">\
          <input type=\'button\' value=\' 打 印 \' onclick=\'window.print()\' class="pn"></td>\
      </tr>\
    </form>\
    </table>\
     <table>\
    <form action="KS.Card.asp" name="myform" method="post">\
      <tr>\
        <td><div style="border:1px dashed #cccccc;margin:3px;padding:4px"><b>快速搜索=></b>:\
            &nbsp;\
            <select name=\'groupname\' >\
              <option value="">====选择分类====</option>\
              <option value="">asdasd</option>\
              <option value="">asdf</option>\
              <option value="">asdfafas</option>\
              <option value="">asdfasd</option>\
              <option value="">asdfasdf</option>\
              <option value="">asdfasdfasd</option>\
              <option value="">fasdf</option>\
              <option value="">ffffff</option>\
              <option value="">sdfasdf</option>\
            </select>\
            卡号\
            <input type="text" name="keyword" value=""  size="20">\
            &nbsp;\
            <input type="submit" value="开始搜索" class="pn">\
          </div></td>\
      </tr>\
    </form>\
    <tr>\
      <td><br>\
        <Font color=red><strong>提示：</strong> 已售出或已使用的充值卡，不允许删除，修改等操作。</font></td>\
    </tr>\
  </table></div>'
    Tool.html(null,null,html)
  }
}
fun.a01();