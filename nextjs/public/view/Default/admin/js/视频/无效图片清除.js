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
    let html='<header class="panel-heading">无效数据图片清除工具</header>\
    <div class=p-2"">\
    <table class="table table-hover align-middle">\
     <tr>\
      <td><input type="button" class="pn" value="查询无图片的数据" onClick="location.href=\'admin_video.aspx?action=nullpic\';">\
        &nbsp;&nbsp;\
        <input type="button" class="pn" value="清空数据图片不存在地址" onClick="location.href=\'ajax/admin_tool.aspx?action=existpic\';" >\
        &nbsp;&nbsp;\
        <input type="button" class="pn" value="删除多余数据图片" onClick="if(confirm(\'注意：使用此功能前,务必确认数据图片文件夹是/pic/\')){location.href=\'ajax/admin_tool.aspx?action=sumitcheck\';}else{return false}"></td>\
    </tr>\
    <tr>\
      <td><input type="button" class="pn" value="查询无图片的新闻" onClick="location.href=\'admin_news.aspx?action=nullpic\';">\
        &nbsp;&nbsp;\
        <input type="button" class="pn" value="清空新闻图片不存在地址" onClick="location.href=\'ajax/admin_tool.aspx?action=existpic&table=news\';">\
        &nbsp;&nbsp;\
        <input type="button" class="pn" value="删除多余新闻图片" onClick="if(confirm(\'注意：使用此功能前,务必确认数据图片文件夹是/pic/newspic/\')){location.href=\'ajax/admin_tool.aspx?action=sumitcheck&table=news\';}else{return false}"></td>\
    </tr>\
    <tr>\
      <td>说明：对比数据库中图片名称，删除多余图片文件，节省服务器空间！<br />\
        注意：使用此功能前,务必确认数据图片文件夹是/pic//</td>\
    </tr>\
    <tr class="thead">\
      <td>在线截图</td>\
    </tr>\
    <tr>\
      <td><input type="text" value="http://localhost/admin/" id="url" size="100" />\
        <input type="button" class="pn" value="生成图片1" onClick="Screenshot(1)">\
        <input type="button" class="pn" value="生成图片2" onClick="Screenshot(2)"></td>\
    </tr>\
    <tr align="center" id="img" style="display:none">\
      <td><img src=\'<.Path/>admin/img/loading.gif\' align=\'absmiddle\'/></td>\
    </tr>\
    <tr class="thead">\
      <td>图片生成网页</td>\
    </tr>\
    <tr>\
      <td>将图片：\
        <input type="text" value="<.Path/>原图/首页.png" id="src" size="100" />\
        <input type="button" class="pn" value="所有颜色导入数据库" onClick="GetImg()">\
        &nbsp;&nbsp;<span id="resultImg"></span></td>\
    </tr>\
    <tr>\
      <td><input type="button" class="pn" value="↓→绘矩形，并生成网页框架" onClick="DrawRectangle()">\
        &nbsp;&nbsp;<span id="Painting"></span></td>\
    </tr>\
  </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();