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
    let html='<header class="panel-heading">论坛等级头衔设置</header>\
    <table class="table table-hover align-middle">\
    <tr align="center">\
      <td>等级ID</td>\
      <td>用户等级头衔</td>\
      <td>颜色</td>\
      <td>图标</td>\
      <td>论坛帖子数</td>\
      <td>所需积分数</td>\
      <td>用户数</td>\
      <td>管理操作</td>\
    </tr>\
    <form action="ajax/admin_club.aspx?AskGradeSave.html" method="post">\
      <r:askgrade size=50 where=" where @.TypeFlag=1">\
        <tr align="center">\
          <td><input type="checkbox" name="pre_id" id="GradeID-[askgrade:id]" value="[askgrade:id]">\
            <label for="GradeID-[askgrade:id]">[askgrade:id]</label></td>\
          <td> {if [askgrade:special]==0}\
            <input type="text" size="20" name="name[askgrade:id]" style="text-align:center" value="[askgrade:name]" />\
            <else/>\
            [askgrade:name]&nbsp;(<font color=red>系统</font>)\
            <input type="hidden" name="name[askgrade:id]" value="[askgrade:name]" />\
            \
            </if></td>\
          <td><input  type="text" size="10" name="color[askgrade:id]" value="[askgrade:color]" /></td>\
          <td align="left"><input  type="text" size="10" name="ico[askgrade:id]" value="[askgrade:pic]"/>\
            &nbsp;<img src="/<.Path/>admin/img/club/[askgrade:pic]" /></td>\
          <td> {if [askgrade:special]==0}\
            <input type="text" size="5" name="ClubPostNum[askgrade:id]" style="text-align:center" value="[askgrade:ClubPostNum]" />\
            </if></td>\
          <td> {if [askgrade:special]==0}\
            <input type="text" style="text-align:center" size="5" name="Score[askgrade:id]" value="[askgrade:score]" />\
            分\
            </if></td>\
          <td><r:user where=" where @.clubgradeid=[askgrade:id]"> [user:count(:id)]位 </r:user></td>\
          <td><a href="ajax/admin_club.aspx?AskGradeDel-[askgrade:id].html"onClick="return(confirm(\'确定删除吗?\'))">删除</a></td>\
        </tr>\
      </r:askgrade>\
      <tr>\
        <td colspan="8"><input type="button" class="pn" value="反选"  />\
          <input class="pn" type="submit" name="submit_button" value="批量保存设置"/></td>\
      </tr>\
    </form>\
    <tr class="thead">\
      <td colspan="8">&nbsp;&nbsp;<strong>&gt;&gt;新增等级头衔</strong><<</td>\
    </tr>\
    <form action="ajax/admin_club.aspx?AskGradeAdd.html" method="post">\
      <tr align="center">\
        <td>&nbsp;</td>\
        <td><input name="name" type="text"  id="name" size="25" style="text-align:center"></td>\
        <td><input style="text-align:center" name="color" type="text" value="#000000"  id="color" size="10"></td>\
        <td align="left"><input style="text-align:center" name="rank" type="text" value="rank0.gif"  id="rank" size="10">\
          &nbsp;<img src="/<.Path/>admin/img/club/rank0.gif" /></td>\
        <td><input style="text-align:center" name="clubpostnum" type="text" value="100"  size="5"></td>\
        <td><input style="text-align:center" name="Score" type="text" value="1000"  id="Score" size="5">\
          分</td>\
        <td><input name="Submit3" class="pn" type="submit" value="确认添加"></td>\
      </tr>\
    </form>\
    </table><div class="attention" style="color:#FF0000"> <strong>说明：</strong><br/>\
    <li>等级图标必须放于<.Path/>admin/club/目录下；</li>\
  </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();