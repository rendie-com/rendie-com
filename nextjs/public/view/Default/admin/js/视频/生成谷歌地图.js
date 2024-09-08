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
    <header class="panel-heading">生成google地图</header>\
    <table class="table table-hover align-middle">\
      <tr>\
      <td  align="right">生成视频google地图：</td>\
      <td> 每页数量&nbsp;\
        <input type=\'text\' id=\'makenumvideo\' value=\'1000\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onClick="location.href=\'ajax/admin_make.aspx?MakeGoogle/video/1/\'+$(\'#makenumvideo\').val()+\'.html\'"/></td>\
    </tr>\
    <tr>\
      <td align="right">生成新闻google地图：</td>\
      <td> 每页数量&nbsp;\
        <input type=\'text\' id=\'makenumnews\' value=\'1000\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onClick="location.href=\'ajax/admin_make.aspx?MakeGoogle/news/1/\'+$(\'#makenumnews\').val()+\'.html\'"/></td>\
    </tr>\
    <tr>\
      <td align="right">生成图片google地图：</td>\
      <td> 每页数量&nbsp;\
        <input type=\'text\' id=\'makenumphoto\' value=\'1000\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onClick="location.href=\'ajax/admin_make.aspx?MakeGoogle/photo/1/\'+$(\'#makenumphoto\').val()+\'.html\'"/></td>\
    </tr>\
    <tr>\
      <td align="right">生成商品google地图：</td>\
      <td> 每页数量&nbsp;\
        <input type=\'text\' id=\'makenumproduct\' value=\'1000\'>\
        <input type=\'button\' class="pn" value=\'开始生成\' onClick="location.href=\'ajax/admin_make.aspx?MakeGoogle/product/1/\'+$(\'#makenumproduct\').val()+\'.html\'"/></td>\
    </tr>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();