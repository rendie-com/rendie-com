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
    let html='<header class="panel-heading">修复数据格式</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
    <tr>      <td><input type="button" class="pn"  value="修复数据数据"></td>    </tr>\
    <tr>      <td>注意：为了防止意外、请操作前务必先备份数据库</td>    </tr>\
    <tr class="thead">      <td>修复"分类表(:type)"排序号相同问题</td>    </tr>\
    <tr>\
      <td><input type="button" class="pn"  value="修复分类排序" ></td>\
    </tr>\
    <tr>\
      <td> 注意：当你的分类比较多时，且有很多同一级别的目录的排序号相同时，可使用"修复分类排序"进行排序比较快些。<br/>\
        目的：当你想调出X条数据，并且使用了排序，同时排序号还相同了。此时你调出来的就不是X条数据，而是Y条数据，这时就出错了，使用"修复分类排序"可以快速解决。也可以SQL的二次排序。 </td>\
    </tr>\
    <tr class="thead">\
      <td>修复商品价格数据</td>\
    </tr>\
    <tr>\
      <td><input type="button" class="pn"  value="修复商品价格数据"/></td>\
    </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();