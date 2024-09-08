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
    let html='<header class="panel-heading">删除指定来源</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
       <tr>\
      <td>选择来源：\
        <select  name="from" id="from" >\
          <option value="">请选择删除的来源</option>\
          <r:makePlayerSelect}\
        </select></td>\
    </tr>\
    <tr>\
      <td>处理每页数据间隔时间：\
        <input type="text" id="wtime" size="5" value="5" />\
        秒&nbsp;(默认5)</td>\
    </tr>\
    <tr>\
      <td>按特征删除：\
        <input type="text" id="domain" value=""  />\
        提示：留空为不限制，可以输入网址、域名、包含的字符特征</td>\
    </tr>\
    <tr>\
      <td><input type="button" value="确认删除"  class="pn"/></td>\
    </tr>\
    <tr>\
      <td>注意：为了防止意外、请操作前务必先备份数据库 </td>\
    </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();
/*

$(function(){
  $(".btn").click(function(){
	let fromvalue
	fromvalue=escape($("#from").val());
	if(fromvalue!='')
	{
		location.href='ajax/admin_tool.aspx?delByFrom-'+fromvalue+'-1-'+$("#wtime").val()+'-'+$("#domain").val();
	}else{alert('请选择删除的来源!')}
  })
})

*/