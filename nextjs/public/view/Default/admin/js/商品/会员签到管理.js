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
    <header class="panel-heading">会员签到管理</header>\
    <div class="p-2">\
    <table class="table table-hover align-middle">\
      <tr>\
      <td colspan="7"> 签到明细: <a href=\'KS.qiandao.asp\'>所有签到明细</a> | <a href="KS.qiandao.aspx?Action=day" >今日签到明细</a> | <a href="KS.qiandao.aspx?Action=month">本月签到明细</a> | <a href="javascript:void(0);" onClick="if(confirm(\'是否删除所有签到!\')){location.href=\'KS.qiandao.aspx?Action=delall\'};" >点击删除所有签到</a></td>\
    </tr>\
    <tr>\
      <td colspan="7"><form action="?" name="myform" method="post" >\
          <div style="border:1px dashed #cccccc;margin:3px;padding:4px"> &nbsp;<strong>按用户搜索=></strong> &nbsp;用户名:\
            <input type="text"  name="keyword" >\
            &nbsp;\
            <input type="submit" value="开始搜索" class="pn" name="s1">\
          </div>\
        </form></td>\
    </tr>\
    <tr align="center">\
      <td>用户名</td>\
      <td>签到时间</td>\
      <td>IP地址</td>\
      <td>签到心情</td>\
      <td>签到内容</td>\
      <td>状态</td>\
      <td><strong>操作</strong></td>\
    </tr>\
    <r:Qiandao size=25 page=4>\
      <tr>\
        <td class="splittd" width="80" align="center">[Qiandao:username]</td>\
        <td class="splittd" align="center">[Qiandao:addDate]</td>\
        <td class="splittd" align="center">[Qiandao:ip]</td>\
        <td class="splittd" align="center"><img src="/<.Path/>admin/emot/1.gif"  style="border:1px solid  #ccc;width:24px;height:24px;"></td>\
        <td class="splittd" align="center">[Qiandao:des]</td>\
        <td class="splittd" align="center"><font color="green">已签到</font></td>\
        <td class="splittd" align="center"><a href="javascript:void(0);" onClick="if(confirm(\'是否删除!\')){location.href=\'KS.qiandao.aspx?Action=del&id=1649\'};">删除</a></td>\
      </tr>\
    </r:Qiandao>\
    </table>\
    </div>'
    Tool.html(null,null,html)
  }
}
fun.a01();