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
    <header class="panel-heading">点券明细</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="9"><input type="text"  name="keyword">\
        <input type="submit" value="开始搜索" class="pn" name="s1"></td>\
    </tr>\
    <tr align="center">\
      <td>ID</td>\
      <td>用户名</td>\
      <td>消费时间</td>\
      <td>IP地址</td>\
      <td>收入</td>\
      <td>支出</td>\
      <td>余额</td>\
      <td>操作员</td>\
      <td>备注</td>\
    </tr>\
    <r:logpoint size=30 page=4  where=" order by @.id desc">\
      <tr align="center">\
        <td>[logpoint:id]</td>\
        <td>[logpoint:User]</td>\
        <td>[logpoint:Addtime]</td>\
        <td>[logpoint:ip]</td>\
        <td>{if [logpoint:InOrOutFlag]==1}[logpoint:point]点\
          <else/>\
          -\
          </if></td>\
        <td>{if [logpoint:InOrOutFlag]==2}[logpoint:point]点\
          <else/>\
          -\
          </if></td>\
        <td>[logpoint:CurrPoint]</td>\
        <td>[logpoint:user]</td>\
        <td>[logpoint:des]</td>\
      </tr>\
    </r:logpoint>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();