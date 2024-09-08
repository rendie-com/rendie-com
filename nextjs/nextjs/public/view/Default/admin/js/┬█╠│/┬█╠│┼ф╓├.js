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
    let html='<header class="panel-heading">论坛配置</header>\
    <table class="table table-hover align-middle">\
    <tr>  \
  <td align="right">发帖是否需要登录：</td>   \
  <td>\
    <input  name="bbs_Post_login" type="radio" value="1" id="bbs_Post_login-1">\
    <label for="bbs_Post_login-1">是</label>\
    <input name="bbs_Post_login" type="radio" value="0"id="bbs_Post_login-0">\
    <label for="bbs_Post_login-0">否</label>\
  </td>\
  <td>建议开启要登录才能发帖以增强发帖机的干扰。</td>\
  </tr>   \
  <tr>   \
    <td align="right"><div>是否开放游客使用论坛搜索：</div></td>\
    <td> \
      <input  name="bbs_Tourists_search" type="radio" value="1" id="bbs_Tourists_search-1" />\
      <label for="bbs_Tourists_search-1">是</label>\
      <input name="bbs_Tourists_search" type="radio" value="0" id="bbs_Tourists_search-0" />\
      <label for="bbs_Tourists_search-0">否</label>\
    </td>\
    <td>搜索功能是较占用资源的搜索，如果访问量较大建议设置为不开放游客搜索</td>\
  </tr>\
  <tr>      \
    <td align="right">是否允许游客回复主题：</td>      \
    <td>\
      <input name="bbs_Tourists_back" type="radio" value="1" id="bbs_Tourists_back-1" >\
      <label for="bbs_Tourists_back-1">只允许管理员回复</label><br>\
      <input name="bbs_Tourists_back" type="radio" value="2" id="bbs_Tourists_back-2">\
      <label for="bbs_Tourists_back-2">所有会员可回复,游客不可回复</label><br>\
      <input name="bbs_Tourists_back" type="radio" value="3" id="bbs_Tourists_back-3" >\
      <label for="bbs_Tourists_back-3">所有人都可以回复，包括游客</label>\
    </td>\
    <td>如果各个版面启用用户组限制,则以版面设置为准</td>\
  </tr>   \
  <tr>\
  <td></td>\
  <td><input type=\'submit\' class="pn" value=\'确定保存\'></td>\
  <td></td>\
  </tr>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();