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
    <TR align="center">\
      <TD width="50">ID</TD>\
      <TD>名称</TD>\
      <TD>网址</TD>\
      <TD>类型</TD>\
      <TD>排序</TD>\
      <TD>操作</TD>\
    </TR>\
    <r:link size=20 page=3 where=" order by @.sort asc">\
      <TR align="center">\
        <TD align="left"><input type="checkbox" value="[link:id]" name="pre_id" class="checkbox" id="check-[link:id]"/>\
          <label for="check-[link:id]">[link:id]</label></TD>\
        <TD><input type="text" id="pre_name[link:id]" value="[link:name]" size="40"/></TD>\
        <TD><input id="pre_url[link:id]" type="text" value="[link:url]"  size="40"/></TD>\
        <td><if "[link:type]"=="font"}文字链接<elseif "[link:type]"=="pic"}图片链接\
          <else/>\
          已被隐藏\
          </if></td>\
        <TD><input id="pre_sort[link:id]" type="text" value="[link:sort]"  size="10"/></TD>\
        <TD><a href="javascript:" name="LinkMoveToNext">上移</a>&nbsp;|&nbsp;<a href="javascript:" name="LinkMoveToNext">下移</a>&nbsp;|&nbsp;<a href="javascript:">编辑</a>&nbsp;|&nbsp;<a href="javascript:" name="LinkDel" val="[link:id]">删除</a>&nbsp;|&nbsp;<a href="javascript:" name="LinkHide" val="[link:id]">\
          <if "[link:type]".indexOf("hide")>0}<font color="red">解除隐藏</font>\
            <else/>\
            隐藏链接</if>\
          </a></TD>\
      </TR>\
    </r:link>\
    <tr>\
      <td colspan="6"><input type="button" class="pn" value="反选" />\
        <input type="button" value="批量修改选中友情链接" id="LinkEditAll"  class="pn"/>\
        <input type="button" value="批量删除" onClick="if(confirm(\'确定要删除吗\')){linkform.action=\'ajax/admin_ads.aspx?LinkDelAll\';}else{return false}" class="pn"  /></td>\
    </tr>\
    </table><div id="selflabel" style="top:100px; display:none;" class="popdiv">\
    <div class="poptitie"><img src="../pic/btn_close.gif" alt="关闭" onClick="S(\'selflabel\').style.display=\'none\'" />自定义标签路径 </div>\
    <div class="popbody">\
      <div>\
        <textarea cols="80" rows="14" id="labelcontent" style="width:516px"></textarea>\
      </div>\
    </div>\
  </div>'
    Tool.a01(html)
  }
}
fun.a01();