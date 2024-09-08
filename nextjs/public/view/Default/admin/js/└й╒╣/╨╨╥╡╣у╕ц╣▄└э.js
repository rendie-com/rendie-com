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
    let html='<header class="panel-heading"><div class="active">行业关键词广告管理管理</div><div>未审核广告</div> <div>已过期广告</div></header>\
    <table class="table table-hover align-middle">\
    <tr>\
      <td>选择</td>\
      <td>广告名称</td>\
      <td>申请者</td>\
      <td>播放位置</td>\
      <td>生效日期</td>\
      <td>播放天数</td>\
      <td>状态</td>\
      <td>管理操作</td>\
    </tr>\
    <form name=selform method=post action="?">\
      <input type="hidden" name="type" value="0">\
      <tr>\
        <td><input type="checkbox" name="ID" value=\'180\' id="ID-180">\
          <label for="ID-180">180</label></td>\
        <td><a href="#" onclick="ShowIframe(1)">sdsdsdsds</a></td>\
        <td><a href=\'../space/?admin\' target=\'_blank\'>admin</a></td>\
        <td> 企业库</td>\
        <td>2013/1/16 13:03:29</td>\
        <td>15 天</td>\
        <td><font color=red>未审</font></td>\
        <td><a href="#" onclick="ShowIframe(1)">浏览</a>&nbsp;|&nbsp; <a href="?type=0&Action=Edit&ID=1">修改</a>&nbsp;|&nbsp; <a href="?type=0&Action=Del&ID=1" onclick="return(confirm(\'确定删除吗？\'));">删除</a>&nbsp;|&nbsp; <a href="?type=0&Action=verific&id=1">审核</a></td>\
      </tr>\
      <tr>\
        <td colspan=8><input type="button" class="pn" value="反选" />\
          <input class="pn" type="submit" name="Submit2" value=" 删除选中的广告">\
          <input type="button" value="批量审核" class="pn">\
          <input type="button" value="批量取消审核" class="pn">\
          <input type="hidden" value="Del" name="Action">\
          <input type="button" class="pn" value="添加广告"></td>\
      </tr>\
    </form>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();