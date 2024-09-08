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
        <TD width="70">&nbsp;&nbsp;ID</TD>\
        <TD align="left">名称</TD>\
        <TD align="left">标识(文件名)</TD>\
        <TD>描述</TD>\
        <TD>文件存在?</TD>\
        <TD>添加时间</TD>\
        <TD>操作</TD>\
      </TR>\
      <r:ads size=15 page=4>\
        <tr id="adtr[ads:id]" name="adtr" align="center">\
          <td align="left" nowrap="nowrap"><input type="checkbox" value="[ads:id]" name="pre_id"  class="checkbox" id="check-[ads:id]"/>\
            <label for="check-[ads:id]">[ads:id]</label></TD>\
          <td align="left">[ads:name]</TD>\
          <td align="left">[ads:enname]</TD>\
          <td>[ads:des]</TD>\
          <td> {if 1==1} <a href=\'[ads:file]\'><img src=\'<.Path/>admin/img/yes.gif\' border=\'0\'/></a>\
            <else/>\
            <a href=\'ajax/admin_ads.aspx?single/[ads:id].html\'><img src=\'<.Path/>admin/img/no.gif\' border=\'0\'/></a>\
            </if></TD>\
          <td>[ads:addtime]</TD>\
          <td><a href="javascript:" onClick="viewCurrentAdTr(\'[ads:id]\');openAdWin(\'callad\',\'[ads:file]\',\'/<.Config(sitePath)/>\')">调用广告</a> &nbsp;|&nbsp; <a href="?article/<.arr(2)/>/[ads:id].html">编辑</a> &nbsp;|&nbsp; <a href="?del-[ads:id].html" onClick="if(confirm(\'确定要删除吗\')){return true;/>else{return false;/>">删除</a></TD>\
        </tr>\
      </r:ads>\
    </table><div id="callad" style="top:100px; display:none;" class="popdiv">\
    <div class="poptitie"><img src="../pic/btn_close.gif" alt="关闭" onClick="S(\'callad\').style.display=\'none\'" />广告调用路径 </div>\
    <div class="popbody">\
      <div>\
        <table width="100%" border="0" cellspacing="0" cellpadding="0">\
          <tr>\
            <td  width="60" valign="top">调用代码</td>\
            <td><textarea cols="75" rows="4" id="adpath" onFocus="this.select();" ></textarea></td>\
          </tr>\
          <tr>\
            <td align="center" colspan="2"><font color="red">请手动复制以上文本框中的广告调用代码，粘贴到模板文件相应位置即可</font></td>\
          </tr>\
        </table>\
      </div>\
    </div>\
  </div>\
  </div>'
    Tool.a01(html)
  }
}
fun.a01();