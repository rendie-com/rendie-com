'use strict';
var fun=
{
  a01:function()
  {
    obj.arr[3]=obj.arr[3]?obj.arr[3]:"-_-20";//选择JS文件
    obj.arr[4]=obj.arr[4]?parseInt(obj.arr[4]):1;//翻页
    obj.arr[5]=obj.arr[5]?obj.arr[5]:"1";//搜索字段
    obj.arr[6]=obj.arr[6]?obj.arr[6]:"-_-20";//  搜索关键词
    this.a02();
  },
  a02:function()
	{
		let html='\
    [\
      {\
        "size":20,\
        "count":<@count/>\
      }\
      <r:province size=20 page=2 where="">,\
      {\
        "id":[province:id],\
      }</r:province>]'
		Tool.ajax.a01(html,obj.arr[4],this.a03,this);
	},
	a03:function(list)
	{
    let html=''
    for(let i=1;i<list.length;i++)
    {
      html+='\
      <tr>\
        <td align="center" width="60"><input type="checkbox" value="[province:id]" name="pre_id"  class="checkbox" id="check-[province:id]"/>\
          <label for="check-[province:id]">[province:id]</label></td>\
        <td><a href="?<.arr(0)/>/{r:arr(2)/>/1/[province:id].html">[province:city]</a></td>\
        <td align="center">[province:orderid]</td>\
        <td><a href="#">编辑</a> &nbsp;|&nbsp; <a href="ajax/admin_tool.aspx?Provincedel/[province:id]" onClick="return confirm(\'是否删除该记录\');">删除</a> &nbsp;|&nbsp; <a href="ajax/admin_tool.aspx?Provincedel/[province:id]" onClick="return confirm(\'是否删除该记录\');">下属地区</a></td>\
      </tr>'
    }
    html='<header class="panel-heading">地区管理</header>\
    <div class="p-2">\
      <table class="table table-hover center">\
      <thead class="table-light">'+this.b02()+'</thead>\
      <tbody>'+html+'</tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html)
  },
	b02:function()
	{
    return '\
    <tr>\
      <td width="60" align="center">编号</td>\
      <td align="left">地区名称</td>\
      <td align="center">顺序</td>\
      <td>管理操作</td>\
    </tr>'
  }
}
fun.a01();