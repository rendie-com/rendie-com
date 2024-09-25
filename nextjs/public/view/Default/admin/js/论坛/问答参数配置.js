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
    let html='<header class="panel-heading"><div rel="1" class="active">问答参数配置</div>\
    <div rel="2">积分设置</div></header>\
    <table class="table table-hover align-middle">\
    <tbody id="tbody_1">\
      <tr>\
        <td align="right">问答系统状态：</td>\
        <td><input type="radio" name="Setting1" value="1" checked="checked" id="Setting1-1"/>\
          <label for="Setting1-1">打开</label>\
          <input type="radio" name="Setting1" value="0" id="Setting1-0"/>\
          <label for="Setting1-0">关闭</label></td>\
      </tr>\
      <tr>\
        <td align="right">安装目录：</td>\
        <td><input type="text"   name="Setting2" size="20" value="ask/">\
          <span style=\'color:#999999\'>--如ask等,必须以"/"结束。</span></td>\
      </tr>\
      <tr>\
        <td align="right">模块名称：</td>\
        <td><input type="text"  name="Setting3" size="20" value="问吧">\
          <span style=\'color:#999999\'>--如"问吧"等。</span></td>\
      </tr>\
      <tr>\
        <td align="right">运行模式：</td>\
        <td><input type="radio" name="Setting4" value="0"  checked="checked" id="Setting4-0"/>\
          <label for="Setting4-0">动态</label>\
          <input type="radio" name="Setting4" value="1" id="Setting4-1"/>\
          <label for="Setting4-1">伪静态</label>\
          (<font color=red>需要服务器支持Rewrite组件</font>)\
          &nbsp;扩展名\
          <input   type=\'text\' name=\'Setting5\' value=\'.html\' size=\'10\'>\
          <span style=\'color:#999999\'>--更改此配置,需要修改ISAPI_Rewrite的配置文件httpd.ini</span></td>\
      </tr>\
      <tr>\
        <td align="right">是否开启提问：</td>\
        <td><input type="radio" name="Setting5" value="1"  checked="checked" id="Setting5-1"/>\
          <label for="Setting5-1">是</label>\
          <input type="radio" name="Setting5" value="0" id="Setting5-0"/>\
          <label for="Setting5-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">问题描述/回答长度控制：</td>\
        <td> 大于等于\
          <input type="text"  name="Setting6" size="5" value="1">\
          小于等于\
          <input type="text"  name="Setting7" size="5" value="1000">\
          <span style=\'color:#999999\'>--不想控制,请填写0</span></td>\
      </tr>\
      <tr>\
        <td align="right">提问题是否启用验证码：</td>\
        <td><input type="radio" name="Setting8" value="1" id="Setting8-1"/>\
          <label for="Setting8-1">是</label>\
          <input type="radio" name="Setting8" value="0" checked="checked" id="Setting8-0">\
          <label for="Setting8-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">审核模式：</td>\
        <td><input type="radio" name="Setting9" value="1" checked="checked" id="Setting9-1"/>\
          <label for="Setting9-1">提问和回答都不需要审核</label>\
          <br/>\
          <input type="radio" name="Setting9" value="0" id="Setting9-0"/>\
          <label for="Setting9-0">提问需要审核，回答不需要审核</label>\
          <br/>\
          <input type="radio" name="Setting9" value="2" id="Setting9-2"/>\
          <label for="Setting9-2">提问和回答都需要审核</label>\
          <br/>\
          <input type="radio" name="Setting9" value="3" id="Setting9-3"/>\
          <label for="Setting9-3">提问不需要审核，回答需要\审核</label>\
          <br/>\
          <span style=\'color:#999999\'>--启用需要审核,则只有审核通过的问题或回答才会及时显示</span></td>\
      </tr>\
      <tr>\
        <td align="right">允许上传附件：</td>\
        <td><input type="radio" name="Setting10" onclick="document.getElementById(\'fj\').style.display=\'\';" value="1"  checked="checked" id="Setting10-1"/>\
          <label for="Setting10-1">允许</label>\
          <input type="radio" name="Setting10" onclick="document.getElementById(\'fj\').style.display=\'none\';" value="0"id="Setting10-0"/>\
          <label for="Setting10-0">不允许 </label>\
          <span style=\'color:#999999\'>--启用上传附件功能，提问或回答可以附加上传附件</span>\
          <div id=\'fj\'> <font color=green> 允许上传的文件类型：\
            <input  name="Setting11" type="text" value="rar|jpg|gif|wmv|flv|rm|rmvb" size=\'30\'>\
            多个类型用|线隔开<br/>\
            允许上传的文件大小：\
            <input  name="Setting12" type="text" value="1001222" style="text-align:center" size=\'8\'>\
            KB<br/>\
            每天上传文件个数：\
            <input  name="Setting13" type="text" value="12" style="text-align:center" size=\'8\'>\
            个,不限制请填0 </font> <br/>\
            允许在此版本上传附件的用户组:<br/>\
            <r:usergroup size=50>\
              <input type="checkbox" name="Setting14" value="<:id/>" id="Setting14-<:id/>">\
              <label for="Setting14-<:id/>"><:name/></label>\
            </r:usergroup>\
            <br/>\
            <font color=blue>不限制请不要勾选</font> </div></td>\
      </tr>\
      <tr>\
        <td align="right">允许查看最佳答案的用户组：</td>\
        <td><r:usergroup size=50>\
            <input type="checkbox" name="Setting15" value="<:id/>" id="Setting15-<:id/>">\
            <label for="Setting15-<:id/>"><:name/></label>\
          </r:usergroup>\
          <br/>\
          <font color=blue>不限制请不要勾选</font></td>\
      </tr>\
      <tr>\
        <td align="right">提问题最长可设置的有效天数：</td>\
        <td><input  type=\'text\' name=\'Setting16\' value=\'100\' style=\'text-align:center;width:50px\'>\
          天 </td>\
      </tr>\
      <tr>\
        <td align="right">是否允许回答：</td>\
        <td><input type="radio" name="Setting17" value="1" checked="checked" id="Setting17-1"/>\
          <label for="Setting17-1">是</label>\
          <input type="radio" name="Setting17" value="0" id="Setting17-0"/>\
          <label for="Setting17-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">回答问题是否启用验证码：</td>\
        <td><input type="radio" name="Setting18" value="1" id="Setting18-1"/>\
          <label for="Setting18-1">是</label>\
          <input type="radio" name="Setting18" value="0" checked="checked" id="Setting18-0"/>\
          <label for="Setting18-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">是否只能回答一次：</td>\
        <td><input type="radio" name="Setting19" value="1" id="Setting19-1"/>\
          <label for="Setting19-1">是</label>\
          <input type="radio" name="Setting19" value="0" checked="checked" id="Setting19-0"/>\
          <label for="Setting19-0">否</label>\
          <span style=\'color:#999999\'>--在每个问题中是否每个人只能回答一次</span></td>\
      </tr>\
      <tr>\
        <td align="right">提问者是否允许问题补充：</td>\
        <td><input type="radio" name="Setting20" value="1" checked="checked" id="Setting20-1"/>\
          <label for="Setting20-1">是</label>\
          <input type="radio" name="Setting20" value="0"id="Setting20-0"/>\
          <label for="Setting20-0">否</label>\
          <span style=\'color:#999999\'>--提问人可以进一步的补充问题</span></td>\
      </tr>\
      <tr>\
        <td align="right">提问人可以回答自己提问的问题：</td>\
        <td><input type="radio" name="Setting21" value="1" checked="checked" id="Setting21-1"/>\
          <label for="Setting21-1">是</label>\
          <input type="radio" name="Setting21" value="0" id="Setting21-0"/>\
          <label for="Setting21-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">提问人可以删除用户的回答：</td>\
        <td><input type="radio" name="Setting22" value="1"  checked="checked" id="Setting22-1"/>\
          <label for="Setting22-1">是</label>\
          <input type="radio" name="Setting22" value="0" id="Setting22-0"/>\
          <label for="Setting22-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">是否允许游客提问题：</td>\
        <td><input type="radio" name="Setting23" value="1" checked="checked" id="Setting23-1"/>\
          <label for="Setting23-1">是</label>\
          <input type="radio" name="Setting23" value="0" id="Setting23-0"/>\
          <label for="Setting23-0">否</label>\
          <span style=\'color:#999999\'>--游客提问题的问题只能由管理员设置最佳答案，并且使用系统函数标签查询调用问题时性能有所影响，常规情况下建议不要开启游客提问</span></td>\
      </tr>\
      <tr>\
        <td align="right"><div>是否允许游客回答问题：</div></td>\
        <td><input type="radio" name="Setting24" value="1" id="Setting24-1"/>\
          <label for="Setting24-1">是</label>\
          <input type="radio" name="Setting24" value="0"  checked="checked" id="Setting24-0"/>\
          <label for="Setting24-0">否</label></td>\
      </tr>\
      <tr>\
        <td align="right">列表页每页显示条数：</td>\
        <td><input  type="text" name="Setting25" value="20" size="6">\
          条 <span style=\'color:#999999\'>--对应前台的showlist.asp</span></td>\
      </tr>\
      <tr>\
        <td align="right">问题详情每页显示条数：</td>\
        <td><input  type="text" name="Setting26" value="30" size="6">\
          条 <span style=\'color:#999999\'>--对应前台的q.asp</span></td>\
      </tr>\
    </tbody>\
    <tbody id="tbody_2" style="display:none">\
      <tr>\
        <td align="right">用户回答一个问题所得的积分：</td>\
        <td><input  type="text" name="Setting27" size="10" value="2">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">回答被提问者采纳所额外奖励的积分：</td>\
        <td><input type="text"  name="Setting28" size="10" value="30">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">用户处理问题所得的积分：</td>\
        <td><input type="text"  name="Setting29" size="10" value="3">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">问题被选为精彩推荐提问者所得的积分：</td>\
        <td><input  type="text" name="Setting30" size="10" value="3">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">问题被选为精彩推荐最佳回答者所得的积分：</td>\
        <td><input type="text"  name="Setting31" size="10" value="3">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">用户发表一个问题所获的积分：</td>\
        <td><input type="text" name="Setting32" size="10" value="-3">\
          分 <span style=\'color:#999999\'>设置成负数则表示提问题要消费</span></td>\
      </tr>\
      <tr>\
        <td align="right">匿名提问减去积分：</td>\
        <td><input type="text"  name="Setting33" size="10" value="10">\
          分 </td>\
      </tr>\
      <tr>\
        <td align="right">问题被删除减去提问者积分：</td>\
        <td><input type="text"  name="Setting34" size="10" value="2">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">删除答案减去回答者积分：</td>\
        <td><input type="text"  name="Setting35" size="10" value="1">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">删除最佳答案减去回答者积分：</td>\
        <td><input type="text"  name="Setting36" size="10" value="2">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">删除未解决问题减去积分：</td>\
        <td><input type="text"  name="Setting37" size="10" value="1">\
          分</td>\
      </tr>\
      <tr>\
        <td align="right">删除已解决问题减去积分：</td>\
        <td><input type="text"  name="Setting38" size="10" value="1">\
          分</td>\
      </tr>\
    </tbody>\
    </table>'
    Tool.html(null,null,html)
  }
}
fun.a01();

/*
  $(".makeHtmlTab li").click(function()//显示列表、隐藏列表
  {
	$(".makeHtmlTab li").removeAttr('class')
	$(this).attr("class","hover")
	let i,rel=$(this).attr("rel")
	for (i=1;i<=3;i++)
	{
      if(i==rel)
	  {$("#tbody_"+i).show()}
	  else
	  {$("#tbody_"+i).hide()}
	}
  })
*/