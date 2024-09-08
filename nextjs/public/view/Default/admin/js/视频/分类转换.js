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
    let str='[{}\
      <r:cls size=20 page=2>\
      ,{\
        "id":[cls:id]\
        \
      }\
      </r:cls>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(arr)
  {
    let tbody="";
    for(let i=1;i<arr.length;i++)
    {
      tbody+='\
      <tr>\
        <td align="left"><input type="checkbox" value="[cls:id]" name="pre_id" id="pre_id-[cls:id]" />\
          <label for="pre_id-[cls:id]">[cls:id]</label></td>\
        <td><input type="text" name="clsName[cls:id]" value="[cls:name]"/></td>\
        <td><select name="m_type[cls:id]">\
            <option value="">请选择数据分类</option>\
            <rendiload admin/html/数据/商品分类_option.html}\
          </select></td>\
        <td><a href="ajax/admin_gathersoft.aspx?customerdelcls/[cls:id]">删除</a></td>\
      </tr>'
    }
    tbody+='\
    <tr>\
      <td colspan="4">\
        <input type="button" class="pn" value="反选"/>\
        <input type="submit" value="批量删除" class="pn"/>\
        <input type="submit" value="批量修改选中分类" name="Submit" class="pn"/>\
      </td>\
    </tr>'
    let html='\
    <header class="panel-heading">分类转换</header>\
    <div class="p-2"><table class="table table-hover align-middle">'+this.b01()+'<tbody>'+tbody+'</tbody></table>\
    <tr class="thead">\
      <td colspan="4">添加分类转换</td>\
    </tr>\
    <form action="ajax/admin_gathersoft.aspx?customernewcls" method="post" name="form2">\
      <tr align="center">\
        <td></td>\
        <td><input type="text" name="clsName"  /></td>\
        <td><select name="m_type" id="m_type">\
            <option value="">请选择数据分类</option>\
          </select></td>\
        <td><input type="submit" value="确定添加" name="Submit" class="pn"/></td>\
      </tr></div>'
    Tool.html(null,null,html)
  },
  b01:function(t)
  {
    let str='\
    <thead class="table-light center">\
    <tr>\
      <td width="50">ID</td>\
      <td>要转换的分类名</td>\
      <td>影射到系统分类</td>\
      <td>操作</td>\
    </tr>\
    </thead>'
    return str
  }
}
fun.a01();