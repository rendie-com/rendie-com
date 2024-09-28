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
    let html='<header class="panel-heading">伪原创-同义词批量替换(本功能只替换数据介绍)</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
    <tr>\
      <td align="right">替换字符设置：</td>\
      <td><textarea name="txt" style="width:300px;height:100px;"></textarea>\
        <input type="submit" class="pn" value="保存设置" /></td>\
    </tr>\
    <tr>\
      <td align="right">数据起始ID：</td>\
      <td><input type="text" id="iStart" value="不限" size="20" />\
        到\
        <input type="text" id="iEnd" value="不限" size="20" />\
        <input type="button" class="pn" value="执行字词替换" onclick="location.href=\'admin_tool.aspx?doReplace///\'+$(\'#iStart\').val()+\'/\'+$(\'#iEnd\').val()+\'.html\';"/></td>\
    </tr>\
    <tr>\
      <td colspan="2">功能说明：<br />\
        &nbsp;&nbsp;1.每个要替换的字词占一行&nbsp;&nbsp;2.格式：<font color="blue">要替换=替换后</font>,&nbsp;&nbsp;<font color="red">以上文本区域内的替换字符为范例,请删除并根据需要自行设置</font><br />\
        &nbsp;&nbsp;2.采集来的内容雷同太多，不易被搜索引擎收录。可以用本功能把一些特定的词替换成自己的词，如替换成自己的方言或同义词 <br />\
        &nbsp;&nbsp;3.举个例子：<font color="blue">广东话(为什么=点解)</font>&nbsp;&nbsp;<font color="blue">广东台山话(为什么=几解)</font>,经过替换，就让你的站拥有独特的风格。<br />\
        注意事项:<br>\
        &nbsp;&nbsp;<font color=red>程序遇到待替换的字符就会立即替换且不可恢复，请小心处理。</font></td>\
    </tr>\
  </table>\
  </form>\
  <br/>\
  <table class="tb">\
    <tr class="thead">\
      <td colspan="3">伪原创-随机内容</td>\
    </tr>\
    <tr class="thead">\
      <td colspan="3">添加内容</td>\
    </tr>\
    <tr>\
      <td colspan="3"><textarea name="newtxt" style="width:100%;height:100px;"></textarea>\
        <br/>\
        <input type="submit" class="pn" value="确认添加" /></td>\
    </tr>\
    <else/>\
    <tr class="thead" id="newtxt">\
      <td colspan="3">修改内容</td>\
    </tr>\
    <tr>\
      <td colspan="3"><textarea name="newtxt" style="width:100%;height:100px;"></textarea>\
        <br/>\
        <input type="submit" class="pn" value="确认修改" /></td>\
    </tr>\
    </if>\
    <tr>\
      <td colspan="3"><p>注意：</p>\
        <p>1.如果收录已经非常良好，无需使用本功能<br/>\
          2.请一次性添加20条以上伪原创文本段,可以是20段笑话。别写得太长，建议不超过300字，注意是一次性添加相应数目、之后不要再新增、修改、删除文本段<br/>\
          <font color="red">3</font> <font color="red">.最好别经常改动文本段设置(添加、修改或删除)。搜索引擎对这个非常敏感。如果它发现每次来收录的内容都不一样，会影响收录或降权<br />\
          4.每段内容由系统随机抽出并随机插入到简介的首部、尾部、或中间，而且并不改动数据库，也不会每次都随机改变 </font> </p></td>\
    </tr>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();