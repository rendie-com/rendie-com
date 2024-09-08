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
    <header class="panel-heading">用户有效期明细</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr align="center">\
      <td>ID</td>\
      <td>用户名</td>\
      <td>操作时间</td>\
      <td>IP地址</td>\
      <td>增加</td>\
      <td>减少</td>\
      <td>操作员</td>\
      <td>备注</td>\
    </tr>\
    <r:logedays size=15 page=4 where=" order by @.id desc">\
      <tr align="center">\
        <td>[logedays:id]</td>\
        <td>[logedays:UserName]</td>\
        <td>[logedays:AddDate]</td>\
        <td>[logedays:ip]</td>\
        <td>{if [logedays:InOrOutFlag]==1}[logedays:edays]天\
          <else/>\
          -\
          </if></td>\
        <td>{if [logedays:InOrOutFlag]==2}[logedays:edays]天\
          <else/>\
          -\
          </if></td>\
        <td>[logedays:user]</td>\
        <td>[logedays:descript]</td>\
      </tr>\
    </r:logedays>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();