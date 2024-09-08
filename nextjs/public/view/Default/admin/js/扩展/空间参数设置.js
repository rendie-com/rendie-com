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
    <header class="panel-heading">\
      <div rel="1" class="active" >空间基本设置</div>\
      <div rel="2">空间参数配置</div>\
      <div rel="3">发表设置</div>\
    </header>\
    <table class="table table-hover align-middle" id="tbody_1">\
    <tbody>\
      <tr>\
        <td align="right">频道状态：</td>\
        <td>\
          <input type="radio" name="Setting1" value="1" checked="checked" id="Setting1-1" class="form-check-input"/>\
          <label for="Setting1-1" class="form-check-label pointer me-2">开通</label>\
          <input type="radio" name="Setting1" value="0" id="Setting1-0" class="form-check-input"/>\
          <label for="Setting1-0" class="form-check-label pointer me-2">关闭</label>\
        </td>\
        <td>只有开通状态，前台会员才可以发布微博广播。</td>\
      </tr>\
      <tr>\
        <td align="right">广播字数限制：</td>\
        <td class="p-0">\
          <table><tbody><tr><td>最少</td>\
          <td><input type="text"  name="Setting2" value="2" class="form-control form-control-sm center"></td>\
          <td>个字符，&nbsp;&nbsp;最多</td>\
          <td><input type="text"  name="Setting3" value="255" class="form-control form-control-sm center"></td>\
          <td>个字符</td></tr></tbody></table>\
        </td>\
        <td>不能超过255个字符。</td>\
      </tr>\
      <tr>\
        <td align="right">允许上传图片：</td>\
        <td>\
            <table class="table table-hover align-middle mb-0">\
            <tr>\
              <td colspan="3">\
                <input type="radio" name="Setting4" value="1"  checked="checked" id="Setting4-1" class="form-check-input">\
                <label for="Setting4-1" class="form-check-label pointer me-2">允许</label>\
                <input type="radio" name="Setting4" value="0" id="Setting4-0" class="form-check-input">\
                <label for="Setting4-0" class="form-check-label pointer me-2">不允许</label></td>\
            </tr>\
            <tr>\
              <td align="right">允许上传的图片文件大小：</td>\
              <td><input type="text" name="Setting51" value="1024" class="form-control form-control-sm center"/></td>\
               <td>KB</td>\
            </tr>\
            <tr>\
              <td align="right">每天上传文件个数限制：</td>\
              <td><input style="text-align:center" type="text" name="Setting52" value="3" class="form-control form-control-sm center"/></td>\
              <td>个，不限制请输入"0"</td>\
            </tr>\
            <tr>\
              <td align="right">允许上传图片的用户组：</td>\
              <td colspan="2">\
                <r:usergroup size=50>\
                  <input type="checkbox" name="Setting5" value="<:id/>" id="Setting5-<:id/>" class="form-check-input">\
                  <label for="Setting5-<:id/>" class="form-check-label pointer me-2"><:name/></label>\
                </r:usergroup>\
              </td>\
            </tr>\
          </table>\
        </td>\
        <td>选择允许，在广播里才能上传图片,如果允许所有会员组上传图片，请不要勾选用户组</td>\
      </tr>\
      <tr>\
        <td align="right">上传总目录：</td>\
        <td><input type="text" name="Setting6" value="weibofiles" class="form-control form-control-sm"/></td>\
        <td>如WeiboFiles则表示微博里所有上传文件都上传到UploadFiles/WeiboFiles/目录下,后面不要带"/"。</td>\
      </tr>\
      <tr>\
        <td align="right">广播同步设置：</td>\
        <td>\
          <input type="checkbox" name="Synch" checked="checked" value="1" id="Synch-1" class="form-check-input">\
          <label for="Synch-1" class="form-check-label pointer me-2">论坛新帖</label>\
          <input type="checkbox" name="Synch" checked="checked" value="2" id="Synch-2" class="form-check-input">\
          <label for="Synch-2" class="form-check-label pointer me-2">空间博文</label>\
          <input type="checkbox" name="Synch" checked="checked" value="3" id="Synch-3" class="form-check-input">\
          <label for="Synch-3" class="form-check-label pointer me-2">空间照片</label>\
          <input type="checkbox" name="Synch" checked="checked" value="4" id="Synch-4" class="form-check-input">\
          <label for="Synch-4" class="form-check-label pointer me-2">空间圈子</label>\
          <input type="checkbox" name="Synch" checked="checked" value="5" id="Synch-5" class="form-check-input">\
          <label for="Synch-5" class="form-check-label pointer me-2">模型投稿</label>\
          <input type="checkbox" name="Synch" checked="checked" value="6" id="Synch-6" class="form-check-input">\
          <label for="Synch-6" class="form-check-label pointer me-2">更换头像</label>\
          <input type="checkbox" name="Synch" checked="checked" value="7" id="Synch-7" class="form-check-input">\
          <label for="Synch-7" class="form-check-label pointer me-2">企业新闻</label>\
          <input type="checkbox" name="Synch" checked="checked" value="8" id="Synch-8" class="form-check-input">\
          <label for="Synch-8" class="form-check-label pointer me-2">企业证书</label>\
          <input type="checkbox" name="Synch" checked="checked" value="9" id="Synch-9" class="form-check-input">\
          <label for="Synch-9" class="form-check-label pointer me-2">招聘频道</label>\
        </td>\
        <td class="tips">设置同步的频道，当有会员发布时，自动截取一定介绍到微博广播大厅发布。</td>\
      </tr>\
    </tbody>\
    </table>\
    <table class="table table-hover align-middle" id="tbody_2" style="display:none">\
    <tbody>\
    <tr>\
      <td align="right">允许升级为企业空间的用户组：</td>\
      <td>\
        <input type="hidden" value="Edit" name="Flag">\
        <input type="hidden" name="SynchOption" id="SynchOption" value="1111111110000000000000000000000000"/>\
        <r:usergroup size=50>\
          <input type="checkbox" name="Setting7" value="<:id/>" id="Setting7-<:id/>" class="form-check-input">\
          <label for="Setting7-<:id/>"><:name/></label>\
        </r:usergroup>\
      </td>\
      <td><font color=red>不限制,请不要选</font></td>\
    </tr>\
    <tr>\
      <td align="right">发布企业新闻是否需要审核：</td>\
      <td>\
        <input type="radio" name="Setting8" value="1" id="Setting8-1" class="form-check-input">\
        <label for="Setting8-1" class="form-check-label pointer me-2">是</label>\
        <input type="radio" name="Setting8" value="0"  checked="checked" id="Setting8-0" class="form-check-input">\
        <label for="Setting8-0" class="form-check-label pointer me-2">否</label>\
      </td>\
      <td></td>\
    </tr>\
    <tr>\
      <td align="right">发布企业产品是否需要审核：</td>\
      <td><input type="radio" name="Setting9" value="1" id="Setting9-1" class="form-check-input">\
        <label for="Setting9-1" class="form-check-label pointer me-2">是</label>\
        <input type="radio" name="Setting9" value="0"  checked="checked"id="Setting9-0" class="form-check-input">\
        <label for="Setting9-0" class="form-check-label pointer me-2">否</label></td>\
      <td></td>\
    </tr>\
    <tr>\
      <td align="right">发布荣誉证书是否需要审核：</td>\
      <td><input type="radio" name="Setting10" value="1"  id="Setting10-1" class="form-check-input">\
        <label for="Setting10-1" class="form-check-label pointer me-2">是</label>\
        <input type="radio" name="Setting10" value="0"  checked="checked" id="Setting10-0" class="form-check-input">\
        <label for="Setting10-0" class="form-check-label pointer me-2">否</label></td>\
      <td></td>\
    </tr>\
    <tr>\
      <td align="right">空间状态：</td>\
      <td><input type="radio" name="Setting11" value="1"  checked="checked" id="Setting11-1" class="form-check-input">\
        <label for="Setting11-1" class="form-check-label pointer me-2">打开</label>\
        <input type="radio" name="Setting11" value="0" id="Setting11-0" class="form-check-input">\
        <label for="Setting11-0" class="form-check-label pointer me-2">关闭</label></td>\
      <td>如果选择"关闭"那么前台注册会员将无法使用空间站点功能。</td>\
    </tr>\
    <tr>\
      <td align="right">运行模式：</td>\
      <td><input type="radio" name="Setting12" onclick="$(\'#ext\').hide();" value="0"  checked="checked" id="Setting12-0">\
        <label for="Setting12-0">动态模式</label>\
        <input type="radio" name="Setting12" onclick="$(\'#ext\').show();" value="1"  id="Setting12-1">\
        <label for="Setting12-1">伪静态</label>\
        &nbsp; <span id=\'ext\' style=\'display:none\'> 伪静态扩展名:\
        <input  type=\'text\' size=\'8\' name=\'Setting13\' value=\'.html\'>\
        ,更改此配置,需要修改ISAPI_Rewrite的配置文件httpd.ini </span></td>\
      <td>选择伪静态功能需要服务器安装ISAPI_Rewrite组件。</td>\
    </tr>\
    <tr>\
      <td align="right">是否启用二级域名：</td>\
      <td><input type="radio" name="Setting14" value="0" id="Setting14-0"/>\
        <label for="Setting14-0">否(不支持)</label>\
        <br/>\
        <input type="radio" name="Setting14" value="1" checked="checked" id="Setting14-1"/>\
        <label for="Setting14-1">允许绑定本站的二级域名</label>\
        <br/>\
        <input type="radio" name="Setting14" value="2" id="Setting14-2"/>\
        <label for="Setting14-2">允许绑定本站二级域名和独立域名(<span style=\'color:green\'>独立域名需解释到我的服务器</span>)</label></td>\
      <td>此功能必须自己有独立服务器或是您的空间支持泛域名解释,若不支持请选择否,仅限商业版本使用。</td>\
    </tr>\
    <tr>\
      <td align="right">空间首页域名：</td>\
      <td><input type="text"  name="Setting15" size=15 value="space.aaa.com">\
        <font color=blue>如:space.rendie.com</font></td>\
      <td>此项功能需要开启二级域名才生效</td>\
    </tr>\
    <tr>\
      <td align="right">空间站点二级域名：</td>\
      <td><input type="text"  name="Setting16" size=15 value="aaa.com">\
        <font color=blue>如:三级域名:space.rendie.com或二级域名rendie.com</font></td>\
      <td>关闭二级域名功能请留空,若设置为三级域名则用户站点访问形如:user.space.rendie.com,若设置二级域名则用户站点访问形如:user.rendie.com</td>\
    </tr>\
    <tr>\
      <td align="right">会员注册是否自动注册个人空间：</td>\
      <td><input type="radio" name="Setting17" value="1" checked="checked" id="Setting17-1"/>\
        <label for="Setting17-1">是</label>\
        <input type="radio" name="Setting17" value="0" id="Setting17-0"/>\
        <label for="Setting17-0">否</label></td>\
      <td>如果选择"是"那么注册会员的同时将同时拥有一个个人空间站点。</td>\
    </tr>\
    <tr>\
      <td align="right">申请空间是否需要审核：</td>\
      <td><input type=\'radio\' name=\'Setting18\' value=\'0\' id="Setting18-0"/>\
        <label for="Setting18-0">不需要审核</label>\
        <br/>\
        <input type=\'radio\' name=\'Setting18\' value=\'1\' checked="checked" id="Setting18-1"/>\
        <label for="Setting18-1">申请个人空间不需要审核，申请企业空间要审核</label>\
        <br/>\
        <input type=\'radio\' name=\'Setting18\' value=\'2\' id="Setting18-2"/>\
        <label for="Setting18-2">申请个人和企业空间都需要审核</label>\
        <br/></td>\
      <td>建议设置为"申请个人空间不需要审核，申请企业空间要审核"</td>\
    </tr>\
    <tr>\
      <td align="right">副模板更多每页显示设置：</td>\
      <td colspan="2"> 空间每页显示\
        <input type="text" name="Setting19"  style="text-align:center" size=5 value="15">\
        个 日志每页显示\
        <input type="text" name="Setting20"  style="text-align:center" size=5 value="15">\
        篇 圈子每页显示\
        <input type="text" name="Setting21"  style="text-align:center" size=5 value="15">\
        个 </td>\
    </tr>\
    <tr>\
      <td align="right">副模板更多相册每页显示：</td>\
      <td><input type="text" name="Setting22"  style="text-align:center" size=5 value="15">\
        本相册 每行显示\
        <input type="text" name="Setting23"  style="text-align:center" size=5 value="3">\
        本 </td>\
      <td></td>\
    </tr>\
    </tbody>\
    <tbody id="tbody_3" style="display:none">\
      <tr>\
        <td align=\'right\'>积分限制：</td>\
        <td><table class="tb2">\
            <tr>\
              <td>发表日志要求达到\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting24\' value=\'0\' />\
                分积分</td>\
            </tr>\
            <tr>\
              <td>上传照片要求达到\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting25)\' value=\'0\' />\
                分积分</td>\
            </tr>\
            <tr>\
              <td>创建圈子要求达到积分\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting26\' value=\'0\' />\
                分积分</td>\
            </tr>\
            <tr>\
              <td>发布企业新闻要求达到积分\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting27\' value=\'0\' />\
                分积分</td>\
            </tr>\
            <tr>\
              <td>上传企业荣誉证书要求达到积分\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting28\' value=\'0\' />\
                分积分</td>\
            </tr>\
            <tr>\
              <td>添加音乐要求达到积分\
                <input type=\'text\' style=\'width:40px;text-align:center\' name=\'Setting29\' value=\'0\' />\
                分积分</td>\
            </tr>\
          </table></td>\
        <td>可以有效启用防止发帖机发布作用，不限制，请输入"0"。</td>\
      </tr>\
      <tr>\
        <td align=\'right\'>发表日志是否需要审核：</td>\
        <td><input type="radio" name="Setting30" value="1" id="Setting30-1" />\
          <label for="Setting30-1">是</label>\
          <input type="radio" name="Setting30" value="0" checked="checked" id="Setting30-0"/>\
          <label for="Setting30-0">否</label></td>\
        <td></td>\
      </tr>\
      <tr>\
        <td align=\'right\'>发表日志是否允许上传附件：</td>\
        <td><table class="tb2">\
            <tr>\
              <td colspan="2"><input type="radio" onclick="$(\'#fj\').show();" name="Setting31" value="1" checked="checked" id="Setting31-1"/>\
                <label for="Setting31-1">允许</label>\
                <input type="radio" onclick="$(\'#fj\').hide();" name="Setting31" value="0" id="Setting31-0"/>\
                <label for="Setting31-0">不允许</label></td>\
            </tr>\
            <tbody id=\'fj\'>\
              <tr>\
                <td>允许上传的附件扩展名:</td>\
                <td><input  type=\'text\' value=\'gif|jpg|rar\' name=\'Setting32\' />\
                  多个扩展名用 |隔开,如gif|jpg|rar等</td>\
              </tr>\
              <tr>\
                <td>允许上传的文件大小：</td>\
                <td><input  name="Setting33" type="text" value="100" style="text-align:center" size=\'8\'>\
                  KB </td>\
              </tr>\
              <tr>\
                <td>每天上传文件个数：</td>\
                <td><input  name="Setting34" type="text" value="20" style="text-align:center" size=\'8\'>\
                  个,不限制请填0</font></td>\
              </tr>\
              <tr>\
                <td>允许上传附件的用户组:</td>\
                <td><r:usergroup size=50>\
                    <input type="checkbox" name="Setting35" value="<:id/>" id="Setting35-<:id/>">\
                    <label for="Setting35-<:id/>"><:name/></label>\
                  </r:usergroup></td>\
              </tr>\
            </tbody>\
          </table></td>\
        <td>如果允许所有会员组上传附件，请不要勾选用户组</td>\
      </tr>\
      <tr>\
        <td align="right">发表日志远程图片是否自动保存到本地：</td>\
        <td><input type="radio" name="Setting36" value="1" id="Setting36-1"/>\
          <label for="Setting36-1">是</label>\
          <input type="radio" name="Setting36" value="0"  checked="checked"id="Setting36-0"/>\
          <label for="Setting36-0">否</label></td>\
        <td>选择"是"，则用户转载的日志里含有远程图片将自动保存到您的服务器上</td>\
      </tr>\
      <tr>\
        <td align="right">创建相册是否需要审核：</td>\
        <td><input type="radio" name="Setting37" value="1" id="Setting37-1"/>\
          <label for="Setting37-1">是</label>\
          <input type="radio" name="Setting37" value="0"  checked="checked" id="Setting37-0">\
          <label for="Setting37-0">否</label></td>\
        <td></td>\
      </tr>\
      <tr>\
        <td align="right">最大允许上传的单张照片：</td>\
        <td><input type="text"  name="Setting38"  size=\'5\' style=\'text-align:center\' value="1000">\
          K </td>\
        <td>建议不要超过1024K</td>\
      </tr>\
      <tr>\
        <td align="right">创建圈子是否需要审核：</td>\
        <td><input type="radio" name="Setting39" value="1" id="Setting39-1"/>\
          <label for="Setting39-1">是</label>\
          <input type="radio" name="Setting39" value="0"  checked="checked" id="Setting39-0"/>\
          <label for="Setting39-0">否</label></td>\
        <td></td>\
      </tr>\
      <tr>\
        <td align="right">用户留言是否需要审核：</td>\
        <td><input type="radio" name="Setting40" value="1"  checked="checked" id="Setting40-1"/>\
          <label for="Setting40-1">是</label>\
          <input type="radio" name="Setting40" value="0" id="Setting40-0"/>\
          <label for="Setting40-0">否</label></td>\
        <td>启用后,用户的留言只有经过后台管理员审核后,前台的空间才可以看到</td>\
      </tr>\
      <tr>\
        <td align="right">允许游客在空间里评论/留言：</td>\
        <td><input type="radio" name="Setting41" value="1" checked="checked" id="Setting41-1"/>\
          <label for="Setting41-1">允许</label>\
          <input type="radio" name="Setting41" value="0" id="Setting41-0"/>\
          <label for="Setting41-0">不允许</label></td>\
        <td>建议设置不允许,可以有效阻止一些注册机留言</td>\
      </tr>\
      <tr>\
        <td align="right">每个会员允许创建圈子数：</td>\
        <td><input type="text" name="Setting42"  style="text-align:center" size=5 value="5">\
          个 </td>\
        <td>如果不想限制请输入"0"</td>\
      </tr>\
    </tbody>\
  </table>'
    Tool.html(null,null,html)
  }
}
fun.a01()
/*<div class="m-2 shadow p-2 bg-white rounded">
  
  <script language="javascript">
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
</script> 
</div>
<template admin/html/通用模板.html/>*/