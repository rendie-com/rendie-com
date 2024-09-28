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
    <table class="table table-hover align-middle">\
    <tr align="center">\
      <td>勋章ID</td>\
      <td>勋章名称</td>\
      <td>启用</td>\
      <td>勋章图片地址</td>\
      <td>勋章图片</td>\
      <td>领取方式</td>\
      <td>管理操作</td>\
    </tr>\
    <form method="post" action="/<.Config(admin)/>/ajax/admin_club.aspx/GuestMedalSave.html">\
      <r:guestmedal size=100>\
        <tr align="center">\
          <td><input type="checkbox" name="pre_id" value="[guestmedal:id]" id="MedalID-[guestmedal:id]">\
            <label for="MedalID-[guestmedal:id]">[guestmedal:id]</label></td>\
          <td><input type="text" style="text-align:center" size="20" name="MedalName[guestmedal:id]" value="[guestmedal:name]" /></td>\
          <td><input type="checkBox" size="10" name="Status[guestmedal:id]" value="1" id="Status-[guestmedal:id]"\
            <if "[guestmedal:status]"=="1">\
            checked="checked"{/if}/>\
            <label for="Status-[guestmedal:id]">&nbsp;</label></td>\
          <td><input type="text"  size="10" name="ico[guestmedal:id]" value="[guestmedal:pic]" /></td>\
          <td><img align="absmiddle" src="/<.Path/>admin/img/club/medal/[guestmedal:pic]" /></td>\
          <td><if "[guestmedal:lqfs]"=="0">管理员发放\
              <else/>\
              <font color=green>用户申请发放</font></if></td>\
          <td><a href="[guestmedal:id]">详情</a>&nbsp;|&nbsp; <a href="ajax/admin_club.aspx?GuestMedalDel/[guestmedal:id].html" onClick="return(confirm(\'确定删除吗?\'))">删除</a></td>\
        </tr>\
      </r:guestmedal>\
      <tr>\
        <td colspan="7"><input type="button" class="pn" value="反选"  />\
          <input class="pn" type="submit" value="批量保存设置"/></td>\
      </tr>\
    </form>\
    <form action="ajax/admin_club.aspx?GuestMedalAdd.html" method="post">\
      <tr class="thead">\
        <td colspan="7">&nbsp;&nbsp;<strong>&gt;&gt;新增勋章</strong><<</td>\
      </tr>\
      <tr align="center">\
        <td></td>\
        <td><input name="MedalName" style="text-align:center" type="text" id="MedalName" size="25"></td>\
        <td><input name="Status" type="checkbox" value="1"id="Status-0" checked="checked" >\
          <label for="Status-0">&nbsp;</label></td>\
        <td><input style="text-align:center" name="ico" type="text" value="medal1.gif"  id="ico" size="10"></td>\
        <td><img align="absmiddle" src="/<.Path/>admin/img/club/medal/medal1.gif" /></td>\
        <td>管理员发放</td>\
        <td><input class="pn" type="submit" value="确认添加"></td>\
      </tr>\
    </form>\
    </table><div class="attention" style="color:#FF0000"> <strong>说明:</strong>勋章图片请上传到../img/club/medal/目录下,这里填写图片名称即可。 </div>'
    Tool.a01(html)
  }
}
fun.a01();