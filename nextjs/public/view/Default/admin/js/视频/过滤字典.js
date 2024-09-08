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
      <r:Filters size=20 page=2>\
      ,{\
        "id":[Filters:id]\
        \
      }\
      </r:Filters>\
    ]'
    Tool.ajax.a01(str,1,this.a03,this);
  },
  a03:function(arr)
  {
    let tbody="";
    for(let i=1;i<arr.length;i++)
    {
      tbody+='\
      <tr align="center">\
          <td align="left"><input type="checkbox"   class="checkbox" value="[Filterslist:id]" name="pre_id" id="pre_id-[Filterslist:id]"/>\
            <label for="pre_id-[Filterslist:id]">[Filters:id]</label></td>\
          <td>[Filters:name]</td>\
          <td>{if [Filters:type]==0}简单替换{elseif [Filters:type]==1/}高级替换\
            <else/>\
            正则替换\
            </if></td>\
          <td></td>\
          <td>{if [Filters:Flag]==0}√\
            <else/>\
            <font color=red>×</font>")\
            </if>\
            <!--√--></td>\
          <td><a href="#">修改</a> &nbsp;|&nbsp; <a href="ajax/admin_gathersoft.aspx?action=filtersdel&id=<%=id%>">删除</a></td>\
        </tr>'
    }
    tbody+='\
    <tr>\
      <td colspan="6">\
        <input type="button" class="pn" value="反选"/>\
        <input type="submit" value="批量删除" class="pn"/>\
      </td>\
    </tr>'
    let html='<table class="table table-hover align-middle">'+this.b01()+'<tbody>'+tbody+'</tbody></table>'
    Tool.a01(html)
  },
  b01:function(t)
  {
    let str='\
    <thead class="table-light center">\
    <tr>\
      <td width="50">ID</td>\
      <td>过滤名称</td>\
      <td>过滤模式</td>\
      <td>过滤字段</td>\
      <td>状态</td>\
      <td>操作</td>\
    </tr>\
    </thead>'
    return str
  }
}
fun.a01();