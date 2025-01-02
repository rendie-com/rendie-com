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
        <td align="left" colspan="6"> 关键字&nbsp;\
          <input type="text" id="searchword"   value="<.unarr(4)/>"size="70">\
          <input type="button" id="selectBtn" value="搜 索" class="pn" /></td>\
      </tr>\
      <TR align="center">\
        <TD>ID</TD>\
        <TD align="left">名称</TD>\
        <TD align="left">标签代码</TD>\
        <TD align="left">描述</TD>\
        <TD align="center">添加时间</TD>\
        <TD align="center">操作</TD>\
      </TR>\
      <r:selflabel size=25 page=4>\
        <TR name="adtr" id="adtr[selflabel:id]">\
          <TD><input type="checkbox" value="[selflabel:id]" name="pre_id"  class="checkbox" id="check-[selflabel:id]"/>\
            <label for="check-[selflabel:id]">[selflabel:id]</label></TD>\
          <TD>[selflabel:name]</TD>\
          <TD align="left">self([selflabel:name])</TD>\
          <TD>[selflabel:des]</TD>\
          <TD align="center">[selflabel:addtime]</TD>\
          <TD align="center"><a href="[selflabel:id]">编辑</a>&nbsp;|&nbsp; <a onClick="if(confirm(\'确定要删除吗\')){return true;}else{return false;}" href="ajax/admin_template.aspx?SelfLabelDelAll/[selflabel:id].html">删除</a></TD>\
        </TR>\
      </r:selflabel>\
      <tr align="left">\
        <td colspan="6"><input type="button" class="pn" value="反选"  />\
          <input type="submit" value="批量删除" onClick="if(confirm(\'确定要批量删除吗\')){selflabelform.action=\'ajax/admin_template.aspx?SelfLabelDelAll\'}else{return false}" class="pn" /></td>\
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