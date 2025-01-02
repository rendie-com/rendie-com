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
    <tr>\
      <td align="left" colspan="8"> 关键字\
        <input type="text" id="searchword" size="70">\
        <input type="button" id="selectBtn" value="搜 索" class="pn" />\
        <select onChange="self.location.href=\'ajax/admin_club.aspx?<action}-\'+this.options[this.selectedIndex].value" >\
          <option value="">按数据分类查看</option>\
        </select></td>\
    </tr>\
    <tr align="center">\
      <td width="60">ID</td>\
      <td>主题</td>\
      <td>数据类别</td>\
      <td>留言者</td>\
      <td>回复/查看</td>\
      <td>最后发表</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form method="post" name="clubform">\
      <tr align="center">\
        <td align="left"><input type="checkbox" name="pre_id" value="[club:id]" id="pre_id"/>\
          <label for="pre_id-[club:id]">[club:id]</label></td>\
        <td align="left"><a href="[club:id]" target="_blank">[club:UserName]</a></td>\
        <td><a href="club:typelink" target="_blank">club:typename</a></td>\
        <td>[club:username]</td>\
        <td>[club:totalreplay]/[club:hit]</td>\
        <td>[club:lastreplayuser]</td>\
        <td> --- </td>\
        <td><a href="[club:id]" target="_blank">查看</a> &nbsp;|&nbsp; <a href="ajax/admin_club.aspx?GuestBookUpdate/recycle/[club:id].html">隐藏</a></td>\
      </tr>\
      <tr>\
        <td colspan="8"><input type="button" class="pn" value="反选" onClick="checkOthers(\'input\',\'pre_id\')"/>\
          <input type="submit" value="批量隐藏" class="pn" onClick="clubform.action=\'ajax/admin_club.aspx?GuestBookUpdate/recycle.html\';">\
          <input value="审核" class="pn" type="submit" onClick="clubform.action=\'ajax/admin_club.aspx?GuestBookUpdate/check.html\';">\
          <input value="取消审核" class="pn" type="submit" onClick="clubform.action=\'ajax/admin_club.aspx?GuestBookUpdate/uncheck.html\';">\
          <select name="movetype" id="movetype" >\
            <option value="">请选择目标分类</option>\
          </select>\
          <input type="submit" value="批量移动" class="pn" onClick="if($(\'movetype\').value==\'\'){alert(\'请选择目标分类\');return false;};if(confirm(\'确定要批量移动数据吗\')){clubform.action=\'ajax/admin_club.aspx?ClubSetType.html\'}else{return false;}"/></td>\
      </tr>\
    </form>\
    </table><div class="attention"> <strong>特别提醒：</strong>只有上传图片附件的帖子才可以设置幻灯属性,建议只设置jpg格式附件的帖子为幻灯,否则可能调用不出来。 </div>'
    Tool.a01(html)
  }
}
fun.a01();