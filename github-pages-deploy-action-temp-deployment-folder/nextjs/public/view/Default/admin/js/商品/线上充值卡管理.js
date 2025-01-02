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
    <header class="panel-heading">线上充值卡管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="12"><a href="?cardtype=1">所有充值卡</a> | <a href="?action=AddMore&cardtype=1">生成在线充值卡</a></td>\
    </tr>\
    <tr>\
      <td width="38" align="center"><strong>选中</strong></td>\
      <td align="center"><strong>充值卡名称</strong></td>\
      <td width="75" align="center"><strong>面值</strong></td>\
      <td width="79" align="center" nowrap="nowrap"><strong>点数/天数</strong></td>\
      <td align="center"><strong>过期时间</strong></td>\
      <td align="center"><strong>操作</strong></td>\
    </tr>\
    <tr>\
      <td colspan=11 align=center height=25>没有充值卡！</td>\
    </tr>\
    <tr>\
      <td colspan=13 background=\'<.Path/>admin/line.gif\'></td>\
    </tr>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();