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
      <tr align="center">\
      <td width="100">选择</td>\
      <td>属性名称</td>\
      <td align="center">来源</td>\
      <td align="center">来源ID</td>\
      <td align="center">序号</td>\
      <td align="left">管理操作</td>\
    </tr>\
    <tr>\
      <td colspan="6"><input type="button" class="pn" value="反选"  />\
        <input type="button" value="批量修改选中分类" class="pn" id="TemplateEdit" />\
        <input class="pn" type="button" value=" 删除选中的属性 "></td>\
    </tr>\
    </table>'
    Tool.a01(html)
  }
}
fun.a01();

/*



$(function(){
  $('#TemplateEdit').live('click',function(){	  
	let pre_id,pre_sort,id
	$("input[type='checkbox'][name='pre_id']:checked").each(function()
	{
	  id=$(this).val();
	  pre_id=pre_id+","+id;
	  pre_sort=pre_sort+"⒜"+$("#pre_sort"+id).val()
   }); 
	$.post("ajax/admin_shop.aspx?attributesEdit.html",{pre_id:pre_id,pre_sort:pre_sort},function(r){
	  location.reload();
	});
  });
});



*/