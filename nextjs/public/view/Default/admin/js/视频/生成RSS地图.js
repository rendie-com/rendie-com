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
    <header class="panel-heading">生成RSS地图</header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td> 输出数量\
        <input type=\'text\' id=\'makenum\' value=\'100\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onclick="javascript:location.href=\'ajax/admin_make.aspx?makeRss/\'+$(\'#makenum\').val()+\'.html\'" /></td>\
    </tr>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();