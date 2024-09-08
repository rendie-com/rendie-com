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
    let html='<header class="panel-heading">数据批量替换</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
       <tr>\
      <td> 将数据表\
        【\
        <select id="pre_table" onChange="onChangeTable(this.value)">\
          <option value=\'\'>请选择要替换的数据表</option>\
          <option value=\'[area:name tag=1]\'>[area:name tag=1]</option>\
        </select>\
        】\
        的字段名：\
        【\
        <select id="pre_field" >\
          <option value=\'\'>请选择要替换的字段名</option>\
        </select>\
        】\
        中的内容：\
        <input type="text" size="25" id="pre_str1" />\
        替换成：\
        <input type="text" size="25" id="pre_str2" />\
        <input class="pn" type="button" value="确认替换" onClick="BatchReplace()" /></td>\
    </tr>\
    <tr>\
      <td><font color=#FF0000>注意，程序遇到待替换的字符就会立即替换且不可恢复，请小心处理。</font></td>\
    </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();
/*
function onChangeTable(val){
$("#pre_field").html($.ajax({url:"/<.Config(admin)/>/ajax/admin_tool.aspx/TableField/"+val+".html?"+Math.random(),async:false/>).responseText)
}
function BatchReplace(){
let txt=$.ajax({type:"POST",url:"/<.Config(admin)/>/ajax/admin_tool.aspx/BatchReplace.html?"+Math.random(),data:{pre_table:$("#pre_table").val(),pre_field:$("#pre_field").val(),pre_str1:$("#pre_str1").val(),pre_str2:$("#pre_str2").val()},async:false/>).responseText
alert(txt)
}
*/